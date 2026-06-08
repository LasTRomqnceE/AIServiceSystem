"""
Heavy Vehicle Service Management - FastAPI Backend
"""
import os
import uuid
import logging
from pathlib import Path
from datetime import datetime, timezone, timedelta
from typing import List, Optional, Literal

import bcrypt
import jwt
from fastapi import FastAPI, APIRouter, HTTPException, Depends, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from fastapi.responses import StreamingResponse
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
from dotenv import load_dotenv
from pydantic import BaseModel, Field, EmailStr, ConfigDict

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / ".env")

# ---------- Config ----------
MONGO_URL = os.environ["MONGO_URL"]
DB_NAME = os.environ["DB_NAME"]
EMERGENT_LLM_KEY = os.environ.get("EMERGENT_LLM_KEY", "")
JWT_SECRET = os.environ["JWT_SECRET"]
JWT_ALG = os.environ.get("JWT_ALGORITHM", "HS256")
JWT_EXPIRE_HOURS = int(os.environ.get("JWT_EXPIRE_HOURS", "72"))

client = AsyncIOMotorClient(MONGO_URL)
db = client[DB_NAME]

logging.basicConfig(level=logging.INFO, format="%(asctime)s - %(name)s - %(levelname)s - %(message)s")
logger = logging.getLogger("backend")

app = FastAPI(title="Ağır Vasıta Servis Yönetimi")
api = APIRouter(prefix="/api")
bearer = HTTPBearer(auto_error=False)


# ---------- Models ----------
def now_iso() -> str:
    return datetime.now(timezone.utc).isoformat()


def new_id() -> str:
    return str(uuid.uuid4())


class User(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=new_id)
    email: EmailStr
    name: str
    phone: Optional[str] = None
    role: Literal["customer", "admin"] = "customer"
    password_hash: str
    created_at: str = Field(default_factory=now_iso)


class UserPublic(BaseModel):
    id: str
    email: EmailStr
    name: str
    phone: Optional[str] = None
    role: str
    created_at: str


class RegisterReq(BaseModel):
    email: EmailStr
    name: str
    phone: Optional[str] = None
    password: str


class LoginReq(BaseModel):
    email: EmailStr
    password: str


class TokenResp(BaseModel):
    token: str
    user: UserPublic


class Vehicle(BaseModel):
    id: str = Field(default_factory=new_id)
    customer_id: str
    plate: str
    brand: str
    model: str
    year: int
    vin: Optional[str] = None
    km: int = 0
    created_at: str = Field(default_factory=now_iso)


class VehicleCreate(BaseModel):
    plate: str
    brand: str
    model: str
    year: int
    vin: Optional[str] = None
    km: int = 0
    customer_id: Optional[str] = None  # admin can set


class Appointment(BaseModel):
    id: str = Field(default_factory=new_id)
    customer_id: str
    vehicle_id: str
    date: str  # YYYY-MM-DD
    time: str  # HH:MM
    issue: str
    status: Literal["beklemede", "onaylandı", "tamamlandı", "iptal"] = "beklemede"
    notes: Optional[str] = None
    created_at: str = Field(default_factory=now_iso)


class AppointmentCreate(BaseModel):
    vehicle_id: str
    date: str
    time: str
    issue: str
    customer_id: Optional[str] = None


class AppointmentUpdate(BaseModel):
    status: Optional[Literal["beklemede", "onaylandı", "tamamlandı", "iptal"]] = None
    notes: Optional[str] = None
    date: Optional[str] = None
    time: Optional[str] = None


class ServiceRecord(BaseModel):
    id: str = Field(default_factory=new_id)
    customer_id: str
    vehicle_id: str
    date: str
    repairs: str
    parts_replaced: List[str] = []
    technician_name: str
    technician_notes: Optional[str] = None
    cost: float = 0.0
    created_at: str = Field(default_factory=now_iso)


class ServiceRecordCreate(BaseModel):
    customer_id: str
    vehicle_id: str
    date: str
    repairs: str
    parts_replaced: List[str] = []
    technician_name: str
    technician_notes: Optional[str] = None
    cost: float = 0.0


class AIAnalysis(BaseModel):
    id: str = Field(default_factory=new_id)
    customer_id: str
    vehicle_id: str
    analysis: str
    created_at: str = Field(default_factory=now_iso)


class ChatReq(BaseModel):
    session_id: str
    message: str


# ---------- Auth helpers ----------
def hash_password(pw: str) -> str:
    return bcrypt.hashpw(pw.encode("utf-8"), bcrypt.gensalt()).decode("utf-8")


def verify_password(pw: str, hashed: str) -> bool:
    try:
        return bcrypt.checkpw(pw.encode("utf-8"), hashed.encode("utf-8"))
    except Exception:
        return False


def create_token(user_id: str, role: str) -> str:
    payload = {
        "sub": user_id,
        "role": role,
        "exp": datetime.now(timezone.utc) + timedelta(hours=JWT_EXPIRE_HOURS),
        "iat": datetime.now(timezone.utc),
    }
    return jwt.encode(payload, JWT_SECRET, algorithm=JWT_ALG)


async def get_current_user(creds: Optional[HTTPAuthorizationCredentials] = Depends(bearer)) -> User:
    if not creds:
        raise HTTPException(status_code=401, detail="Yetkilendirme gerekli")
    try:
        payload = jwt.decode(creds.credentials, JWT_SECRET, algorithms=[JWT_ALG])
        user_id = payload["sub"]
    except jwt.PyJWTError:
        raise HTTPException(status_code=401, detail="Geçersiz token")
    doc = await db.users.find_one({"id": user_id}, {"_id": 0})
    if not doc:
        raise HTTPException(status_code=401, detail="Kullanıcı bulunamadı")
    return User(**doc)


async def require_admin(user: User = Depends(get_current_user)) -> User:
    if user.role != "admin":
        raise HTTPException(status_code=403, detail="Yönetici yetkisi gerekli")
    return user


def public(user: User) -> UserPublic:
    return UserPublic(id=user.id, email=user.email, name=user.name, phone=user.phone, role=user.role, created_at=user.created_at)


# ---------- Auth Routes ----------
@api.post("/auth/register", response_model=TokenResp)
async def register(req: RegisterReq):
    existing = await db.users.find_one({"email": req.email.lower()})
    if existing:
        raise HTTPException(status_code=400, detail="Bu e-posta zaten kayıtlı")
    user = User(
        email=req.email.lower(),
        name=req.name,
        phone=req.phone,
        password_hash=hash_password(req.password),
        role="customer",
    )
    await db.users.insert_one(user.model_dump())
    return TokenResp(token=create_token(user.id, user.role), user=public(user))


@api.post("/auth/login", response_model=TokenResp)
async def login(req: LoginReq):
    doc = await db.users.find_one({"email": req.email.lower()}, {"_id": 0})
    if not doc or not verify_password(req.password, doc["password_hash"]):
        raise HTTPException(status_code=401, detail="E-posta veya şifre hatalı")
    user = User(**doc)
    return TokenResp(token=create_token(user.id, user.role), user=public(user))


@api.get("/auth/me", response_model=UserPublic)
async def me(user: User = Depends(get_current_user)):
    return public(user)


# ---------- Vehicles ----------
@api.get("/vehicles", response_model=List[Vehicle])
async def list_vehicles(user: User = Depends(get_current_user)):
    query = {} if user.role == "admin" else {"customer_id": user.id}
    docs = await db.vehicles.find(query, {"_id": 0}).sort("created_at", -1).to_list(1000)
    return [Vehicle(**d) for d in docs]


@api.post("/vehicles", response_model=Vehicle)
async def create_vehicle(body: VehicleCreate, user: User = Depends(get_current_user)):
    customer_id = body.customer_id if (user.role == "admin" and body.customer_id) else user.id
    v = Vehicle(customer_id=customer_id, plate=body.plate.upper(), brand=body.brand,
                model=body.model, year=body.year, vin=body.vin, km=body.km)
    await db.vehicles.insert_one(v.model_dump())
    return v


@api.delete("/vehicles/{vid}")
async def delete_vehicle(vid: str, user: User = Depends(get_current_user)):
    q = {"id": vid} if user.role == "admin" else {"id": vid, "customer_id": user.id}
    res = await db.vehicles.delete_one(q)
    if res.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Araç bulunamadı")
    return {"ok": True}


# ---------- Appointments ----------
@api.get("/appointments", response_model=List[Appointment])
async def list_appointments(user: User = Depends(get_current_user)):
    query = {} if user.role == "admin" else {"customer_id": user.id}
    docs = await db.appointments.find(query, {"_id": 0}).sort("date", -1).to_list(1000)
    return [Appointment(**d) for d in docs]


@api.post("/appointments", response_model=Appointment)
async def create_appointment(body: AppointmentCreate, user: User = Depends(get_current_user)):
    customer_id = body.customer_id if (user.role == "admin" and body.customer_id) else user.id
    veh = await db.vehicles.find_one({"id": body.vehicle_id})
    if not veh:
        raise HTTPException(status_code=404, detail="Araç bulunamadı")
    a = Appointment(customer_id=customer_id, vehicle_id=body.vehicle_id,
                    date=body.date, time=body.time, issue=body.issue)
    await db.appointments.insert_one(a.model_dump())
    return a


@api.patch("/appointments/{aid}", response_model=Appointment)
async def update_appointment(aid: str, body: AppointmentUpdate, user: User = Depends(get_current_user)):
    q = {"id": aid} if user.role == "admin" else {"id": aid, "customer_id": user.id}
    update = {k: v for k, v in body.model_dump(exclude_none=True).items()}
    if not update:
        raise HTTPException(status_code=400, detail="Güncellenecek alan yok")
    # Customers can only cancel their own
    if user.role != "admin" and "status" in update and update["status"] != "iptal":
        raise HTTPException(status_code=403, detail="Sadece yöneticiler durum güncelleyebilir")
    res = await db.appointments.find_one_and_update(q, {"$set": update}, return_document=True)
    if not res:
        raise HTTPException(status_code=404, detail="Randevu bulunamadı")
    res.pop("_id", None)
    return Appointment(**res)


# ---------- Service Records ----------
@api.get("/service-records", response_model=List[ServiceRecord])
async def list_service_records(vehicle_id: Optional[str] = None, user: User = Depends(get_current_user)):
    query: dict = {}
    if user.role != "admin":
        query["customer_id"] = user.id
    if vehicle_id:
        query["vehicle_id"] = vehicle_id
    docs = await db.service_records.find(query, {"_id": 0}).sort("date", -1).to_list(1000)
    return [ServiceRecord(**d) for d in docs]


@api.post("/service-records", response_model=ServiceRecord)
async def create_service_record(body: ServiceRecordCreate, _: User = Depends(require_admin)):
    sr = ServiceRecord(**body.model_dump())
    await db.service_records.insert_one(sr.model_dump())
    return sr


@api.delete("/service-records/{sid}")
async def delete_service_record(sid: str, _: User = Depends(require_admin)):
    res = await db.service_records.delete_one({"id": sid})
    if res.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Kayıt bulunamadı")
    return {"ok": True}


# ---------- Admin: Customers ----------
@api.get("/admin/customers", response_model=List[UserPublic])
async def admin_list_customers(_: User = Depends(require_admin)):
    docs = await db.users.find({"role": "customer"}, {"_id": 0, "password_hash": 0}).to_list(1000)
    return [UserPublic(**d) for d in docs]


# ---------- AI Assistant (Claude Sonnet 4.5) ----------
AI_SYSTEM_PROMPT = """Sen ağır vasıta (kamyon, tır, otobüs, çekici) ve ticari araç tamirinde uzmanlaşmış deneyimli bir teknik danışmansın. 
TÜM yanıtların TÜRKÇE olmalıdır. Kullanıcılar arızalar, bakım, uyarı ışıkları, motor, turbo, fren, şanzıman ve genel servis konularında soru sorar.
Yanıtlarında şunları kapsa:
1) Olası nedenler (madde halinde)
2) Yapılması gereken kontroller / inceleme adımları
3) Önerilen servis aksiyonları
4) ACİL servis gerektiriyorsa açıkça uyar (örn. "⚠️ ACİL: Aracı sürmeyin").
Net, kısa ve teknik bir dille konuş. Madde işaretleri ve başlıklar kullan."""

ANALYSIS_PROMPT = """Aşağıdaki ağır vasıta servis geçmişini analiz et. TÜRKÇE yanıt ver:
1) Tekrarlayan arızaları tespit et
2) Sık değişen parçaları öne çıkar
3) Olası kök nedenleri tahmin et
4) Önleyici bakım önerileri sun
5) Risk seviyesini değerlendir (DÜŞÜK / ORTA / YÜKSEK)

Servis Geçmişi:
{history}
"""


def _llm_chat(session_id: str, system_msg: str = AI_SYSTEM_PROMPT):
    from emergentintegrations.llm.chat import LlmChat
    return LlmChat(
        api_key=EMERGENT_LLM_KEY,
        session_id=session_id,
        system_message=system_msg,
    ).with_model("anthropic", "claude-sonnet-4-5-20250929")


@api.post("/ai/chat")
async def ai_chat(req: ChatReq, user: User = Depends(get_current_user)):
    from emergentintegrations.llm.chat import UserMessage, TextDelta, StreamDone

    # persist user message
    await db.chat_messages.insert_one({
        "id": new_id(), "customer_id": user.id, "session_id": req.session_id,
        "role": "user", "content": req.message, "created_at": now_iso()
    })

    chat = _llm_chat(req.session_id)

    async def event_gen():
        full = ""
        try:
            async for ev in chat.stream_message(UserMessage(text=req.message)):
                if isinstance(ev, TextDelta):
                    full += ev.content
                    # SSE-safe: encode newlines so multi-line tokens don't split the frame
                    safe = ev.content.replace("\\", "\\\\").replace("\n", "\\n")
                    yield f"data: {safe}\n\n"
                elif isinstance(ev, StreamDone):
                    break
        except Exception as e:
            logger.exception("AI chat error")
            err_safe = str(e).replace("\n", " ")
            yield f"data: [HATA] {err_safe}\n\n"
        # persist assistant message
        await db.chat_messages.insert_one({
            "id": new_id(), "customer_id": user.id, "session_id": req.session_id,
            "role": "assistant", "content": full, "created_at": now_iso()
        })
        yield "event: done\ndata: [DONE]\n\n"

    return StreamingResponse(
        event_gen(),
        media_type="text/event-stream",
        headers={"Cache-Control": "no-cache", "X-Accel-Buffering": "no", "Connection": "keep-alive"},
    )


@api.get("/ai/chat/{session_id}")
async def get_chat_history(session_id: str, user: User = Depends(get_current_user)):
    docs = await db.chat_messages.find(
        {"customer_id": user.id, "session_id": session_id}, {"_id": 0}
    ).sort("created_at", 1).to_list(1000)
    return docs


@api.post("/ai/analyze/{vehicle_id}", response_model=AIAnalysis)
async def ai_analyze(vehicle_id: str, user: User = Depends(get_current_user)):
    from emergentintegrations.llm.chat import UserMessage
    veh_q = {"id": vehicle_id} if user.role == "admin" else {"id": vehicle_id, "customer_id": user.id}
    veh = await db.vehicles.find_one(veh_q, {"_id": 0})
    if not veh:
        raise HTTPException(status_code=404, detail="Araç bulunamadı")
    records = await db.service_records.find({"vehicle_id": vehicle_id}, {"_id": 0}).sort("date", -1).to_list(500)
    if not records:
        raise HTTPException(status_code=400, detail="Bu araç için servis kaydı yok")

    history_text = "\n".join([
        f"- {r['date']} | Onarım: {r['repairs']} | Parçalar: {', '.join(r.get('parts_replaced', []))} | Notlar: {r.get('technician_notes','')} | Maliyet: {r.get('cost',0)} TL"
        for r in records
    ])
    veh_label = f"Araç: {veh['brand']} {veh['model']} ({veh['year']}) - Plaka {veh['plate']}"
    prompt = f"{veh_label}\n\n" + ANALYSIS_PROMPT.format(history=history_text)

    chat = _llm_chat(f"analysis-{vehicle_id}", system_msg="Sen ağır vasıta servis veri analisti uzmanısın. Her zaman TÜRKÇE cevap ver.")
    full = ""
    try:
        resp = await chat.send_message(UserMessage(text=prompt))
        full = resp if isinstance(resp, str) else str(resp)
    except Exception as e:
        logger.exception("AI analyze error")
        raise HTTPException(status_code=500, detail=f"AI analizi başarısız: {e}")

    rec = AIAnalysis(customer_id=veh["customer_id"], vehicle_id=vehicle_id, analysis=full)
    await db.ai_analyses.insert_one(rec.model_dump())
    return rec


@api.get("/ai/analyses/{vehicle_id}", response_model=List[AIAnalysis])
async def list_analyses(vehicle_id: str, user: User = Depends(get_current_user)):
    veh_q = {"id": vehicle_id} if user.role == "admin" else {"id": vehicle_id, "customer_id": user.id}
    veh = await db.vehicles.find_one(veh_q, {"_id": 0})
    if not veh:
        raise HTTPException(status_code=404, detail="Araç bulunamadı")
    docs = await db.ai_analyses.find({"vehicle_id": vehicle_id}, {"_id": 0}).sort("created_at", -1).to_list(100)
    return [AIAnalysis(**d) for d in docs]


# ---------- Stats (admin dashboard) ----------
@api.get("/admin/stats")
async def admin_stats(_: User = Depends(require_admin)):
    customers = await db.users.count_documents({"role": "customer"})
    vehicles = await db.vehicles.count_documents({})
    appointments = await db.appointments.count_documents({})
    pending = await db.appointments.count_documents({"status": "beklemede"})
    completed = await db.service_records.count_documents({})
    return {"customers": customers, "vehicles": vehicles, "appointments": appointments,
            "pending_appointments": pending, "service_records": completed}


# ---------- Seed Data ----------
async def seed():
    # Admin
    admin_email = "admin@truckservis.com"
    if not await db.users.find_one({"email": admin_email}):
        admin = User(email=admin_email, name="Yönetici", phone="+90 555 000 0000",
                     role="admin", password_hash=hash_password("Admin123!"))
        await db.users.insert_one(admin.model_dump())
        logger.info("Seeded admin user")

    # Demo customer
    demo_email = "musteri@truckservis.com"
    cust_doc = await db.users.find_one({"email": demo_email})
    if not cust_doc:
        customer = User(email=demo_email, name="Ahmet Yılmaz", phone="+90 532 111 2233",
                        role="customer", password_hash=hash_password("Musteri123!"))
        await db.users.insert_one(customer.model_dump())
        cust_doc = customer.model_dump()
        logger.info("Seeded demo customer")

    cust_id = cust_doc["id"]

    # Demo vehicles
    if await db.vehicles.count_documents({"customer_id": cust_id}) == 0:
        v1 = Vehicle(customer_id=cust_id, plate="34 ABC 1453", brand="Mercedes-Benz",
                     model="Actros 1845", year=2020, vin="WDB9340371L123456", km=425000)
        v2 = Vehicle(customer_id=cust_id, plate="06 TIR 0641", brand="Scania",
                     model="R 500", year=2019, vin="YS2R6X20002123456", km=612000)
        v3 = Vehicle(customer_id=cust_id, plate="35 KMY 2024", brand="Volvo",
                     model="FH 460", year=2021, vin="YV2RT40A1MA111111", km=287000)
        for v in (v1, v2, v3):
            await db.vehicles.insert_one(v.model_dump())

        # Service records
        srs = [
            ServiceRecord(customer_id=cust_id, vehicle_id=v1.id, date="2025-09-12",
                          repairs="Turbo arızası giderildi, intercooler temizliği",
                          parts_replaced=["Turbo kompresör", "Hortum seti"],
                          technician_name="Mehmet Demir", cost=42500.0,
                          technician_notes="Turbo basınç kaçağı tespit edildi"),
            ServiceRecord(customer_id=cust_id, vehicle_id=v1.id, date="2025-11-03",
                          repairs="Fren balata ve disk değişimi",
                          parts_replaced=["Ön fren balatası", "Arka fren balatası", "Fren diski (x2)"],
                          technician_name="Hasan Kaya", cost=18750.0,
                          technician_notes="Disk eskimişti"),
            ServiceRecord(customer_id=cust_id, vehicle_id=v1.id, date="2026-01-15",
                          repairs="Yağ değişimi ve filtre seti",
                          parts_replaced=["Motor yağı", "Yağ filtresi", "Hava filtresi", "Yakıt filtresi"],
                          technician_name="Mehmet Demir", cost=6800.0),
            ServiceRecord(customer_id=cust_id, vehicle_id=v2.id, date="2025-08-20",
                          repairs="Şanzıman revizyonu",
                          parts_replaced=["Senkromeç seti", "Şanzıman yağı"],
                          technician_name="Hasan Kaya", cost=58200.0,
                          technician_notes="3. vites geçişinde sorun vardı"),
            ServiceRecord(customer_id=cust_id, vehicle_id=v2.id, date="2025-12-08",
                          repairs="Marş motoru değişimi",
                          parts_replaced=["Marş motoru"],
                          technician_name="Ali Çelik", cost=14300.0),
            ServiceRecord(customer_id=cust_id, vehicle_id=v3.id, date="2025-10-22",
                          repairs="Klima kompresörü değişimi",
                          parts_replaced=["Klima kompresörü", "Soğutucu gaz"],
                          technician_name="Mehmet Demir", cost=12750.0),
        ]
        for sr in srs:
            await db.service_records.insert_one(sr.model_dump())

        # Appointments
        appts = [
            Appointment(customer_id=cust_id, vehicle_id=v1.id, date="2026-02-25",
                        time="09:30", issue="Motor uyarı lambası yanıyor, çekiş azaldı",
                        status="beklemede"),
            Appointment(customer_id=cust_id, vehicle_id=v2.id, date="2026-03-02",
                        time="14:00", issue="Periyodik 80.000 km bakım",
                        status="onaylandı"),
        ]
        for a in appts:
            await db.appointments.insert_one(a.model_dump())
        logger.info("Seeded demo data (vehicles, service records, appointments)")


@app.on_event("startup")
async def on_startup():
    try:
        await seed()
    except Exception as e:
        logger.exception(f"Seed failed: {e}")


@app.on_event("shutdown")
async def on_shutdown():
    client.close()


# Health
@api.get("/")
async def health():
    return {"status": "ok", "service": "heavy-vehicle-service-api"}


app.include_router(api)
app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get("CORS_ORIGINS", "*").split(","),
    allow_methods=["*"],
    allow_headers=["*"],
)
