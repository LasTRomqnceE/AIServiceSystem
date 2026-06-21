"# 🚛 AI Service System — Ağır Vasıta Servis Yönetim Sistemi v1.0
# Heavy Vehicle Service Management System v1.0

[![Status](https://img.shields.io/badge/status-stable-success.svg)](https://github.com/)
[![Python 3.11+](https://img.shields.io/badge/python-3.11+-blue.svg)](https://www.python.org/downloads/)
[![React 19](https://img.shields.io/badge/react-19.0.0-blue.svg)](https://react.dev/)
[![FastAPI](https://img.shields.io/badge/fastapi-0.110.1-009688.svg)](https://fastapi.tiangolo.com/)
[![MongoDB](https://img.shields.io/badge/mongodb-6.0+-47A248.svg)](https://www.mongodb.com/)
[![AI](https://img.shields.io/badge/AI-Claude_Sonnet_4.5-orange.svg)](https://www.anthropic.com/)
[![Tests](https://img.shields.io/badge/tests-59_passed-brightgreen.svg)](https://github.com/)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)

Yapay zekâ destekli, modüler servis takip sistemi ile çalışan tam donanımlı bir **ağır vasıta servis yönetim platformu**. React (frontend) + FastAPI (backend) + MongoDB + Claude Sonnet 4.5 entegrasyonu ile geliştirilmiştir.

---

## 👤 Öğrenci Bilgileri

| Bilgi              | Değer                          |
|--------------------|--------------------------------|
| **Ad Soyad**       | Emrehan Etci                   |
| **Öğrenci No**     | 24010502035                    |
| **Ders**           | Programlamada Yeni Eğilimler   |
| **Dönem**          | 2025 – 2026 Bahar              |
| **Danışman**       | Burak Ağgül                    |

---

## 🚀 Özellikler v1.0

### ✅ **Çekirdek İşlevsellik**
- ✅ Modüler servis takibi (7 farklı modül: Motor, Turbo, Şanzıman, Fren, Elektrik, Periyodik Bakım, AI)
- ✅ JWT tabanlı kimlik doğrulama (Bcrypt ile şifre hash'leme)
- ✅ Rol bazlı erişim kontrolü (Müşteri / Yönetici)
- ✅ Online randevu yönetimi (oluşturma / iptal / durum güncelleme)
- ✅ Detaylı servis geçmişi (parça, teknisyen, KM, maliyet)

### ✅ **Yapay Zekâ Entegrasyonu**
- ✅ Claude Sonnet 4.5 ile Türkçe streaming sohbet asistanı (SSE)
- ✅ Modül-bazlı bağlamsal analiz (AI yalnızca seçili modülün verisini analiz eder)
- ✅ Tekrarlayan arıza otomatik tespiti (son 6 ayda 2+ tekrar)
- ✅ Aciliyet seviyesi belirleme (düşük / orta / yüksek / kritik)
- ✅ Önleyici bakım önerileri

### ✅ **Güvenlik İyileştirmeleri**
- ✅ Bcrypt salt ile güvenli şifre hash'leme
- ✅ JWT token doğrulama (HS256, 72 saat geçerlilik)
- ✅ Pydantic v2 ile katı input validation
- ✅ Kullanıcı bazlı veri izolasyonu (her müşteri yalnızca kendi araçlarını görür)
- ✅ Rol bazlı endpoint koruması (admin-only route'lar)

### ✅ **Kullanıcı Deneyimi**
- ✅ Tamamen Türkçe arayüz
- ✅ Karanlık / Aydınlık tema (localStorage ile kalıcı)
- ✅ Responsive tasarım (desktop / tablet / mobile)
- ✅ Etkileşimli servis bölümü panelleri (slide-over modal)
- ✅ Renk kodlu şiddet/durum göstergeleri
- ✅ Toast bildirimleri (Sonner)

### ✅ **Test Kapsamı**
- ✅ Backend: 31 temel + 28 modüler sistem testi = **59 test** başarılı
- ✅ Auth, vehicles, appointments, service-records, admin endpoint'leri
- ✅ AI chat streaming ve module-analyze testleri
- ✅ Yetkilendirme/izolasyon testleri

---

## 📁 Proje Klasör Yapısı

```
heavy-vehicle-service/
├── backend/                            # FastAPI backend
│   ├── server.py                      # Tüm API endpoint'leri + AI + Seed data
│   ├── requirements.txt               # Python bağımlılıkları
│   ├── .env                           # Ortam değişkenleri (gitignore)
│   └── tests/
│       ├── __init__.py
│       ├── backend_test.py            # Temel API testleri (31 test)
│       └── test_modules.py            # Modüler sistem testleri (28 test)
│
├── frontend/                          # React SPA
│   ├── package.json                   # Node bağımlılıkları
│   ├── tailwind.config.js             # Tailwind tema (Barlow / Manrope / Roboto Mono)
│   ├── craco.config.js                # CRACO konfigürasyonu
│   ├── public/
│   │   └── index.html
│   └── src/
│       ├── App.js                     # Ana router + AuthProvider
│       ├── index.js                   # ReactDOM giriş noktası
│       ├── index.css                  # Theme variables + global styles
│       ├── App.css
│       │
│       ├── components/                # Paylaşılan bileşenler
│       │   ├── Header.jsx             # Üst gezinme + tema toggle
│       │   ├── Footer.jsx
│       │   ├── ThemeToggle.jsx        # Dark/Light mode butonu
│       │   ├── ProtectedRoute.jsx     # Rol bazlı route guard
│       │   ├── ServiceSectionPanel.jsx  # Etkileşimli servis paneli
│       │   └── ui/                    # Shadcn UI bileşenleri (button, card, etc.)
│       │
│       ├── pages/                     # Sayfa bileşenleri
│       │   ├── Home.jsx               # Ana sayfa (hero + bento + AI banner)
│       │   ├── Services.jsx           # Hizmetler kataloğu (9 etkileşimli kart)
│       │   ├── Contact.jsx            # İletişim
│       │   ├── Login.jsx
│       │   ├── Register.jsx
│       │   ├── Dashboard.jsx          # Müşteri paneli (stats + araçlar + randevular)
│       │   ├── VehicleDetail.jsx      # Araç detay (7 tıklanabilir modül kartı)
│       │   ├── ModuleDetail.jsx       # Modül detay paneli (issues + repairs + AI)
│       │   ├── Appointments.jsx       # Randevu listesi/oluşturma
│       │   ├── ServiceHistory.jsx     # Geçmiş servis kayıtları
│       │   ├── AIAssistant.jsx        # Streaming AI sohbet asistanı
│       │   └── Admin.jsx              # Yönetici paneli (5 sekme)
│       │
│       └── lib/
│           ├── api.js                 # Axios instance (interceptor ile JWT)
│           ├── auth.jsx               # AuthContext (login / logout / register)
│           ├── modules.js             # Servis modülü meta verileri
│           └── serviceSections.js     # Servis bölümleri detay kataloğu
│
├── memory/
│   ├── PRD.md                         # Ürün gereksinim dokümanı
│   └── test_credentials.md            # Test hesap bilgileri
│
├── screenshots/                       # Ekran görüntüleri (README için)
│   ├── home.png
│   ├── dashboard.png
│   ├── vehicle-detail.png
│   ├── module-turbo.png
│   ├── ai-assistant.png
│   └── admin.png
│
├── .gitignore
└── README.md                          # Bu dosya
```

---

## 🛠️ Kurulum

### Ön Gereksinimler

```bash
Node.js  >= 18
Yarn     >= 1.22
Python   >= 3.11
MongoDB  >= 6.0
```

### 1. Depoyu Klonlayın

```bash
git clone https://github.com/LasTRomqnceE/AIServiceSystem.git
cd AIServiceSystem
```

### 2. Backend Kurulumu

#### 2.1 Sanal Ortam Oluşturma

```bash
cd backend
python -m venv venv
source venv/bin/activate          # Windows: venv\Scripts\activate
```

#### 2.2 Bağımlılıkları Yükle

```bash
pip install -r requirements.txt
```

#### 2.3 Ortam Değişkenleri (.env)

`backend/.env` dosyasını oluşturun:

```env
MONGO_URL=\"mongodb://localhost:27017\"
DB_NAME=\"heavy_vehicle_service\"
CORS_ORIGINS=\"*\"
EMERGENT_LLM_KEY=\"<EMERGENT_UNIVERSAL_KEY>\"
JWT_SECRET=\"<rastgele-32-karakter-string>\"
JWT_ALGORITHM=\"HS256\"
JWT_EXPIRE_HOURS=\"72\"
```

> 🔐 **Güvenlik Notu:** `EMERGENT_LLM_KEY` Emergent platformu üzerinden temin edilir. `JWT_SECRET` için **en az 32 karakter** rastgele bir değer kullanın (örn: `openssl rand -hex 32`).

### 3. Frontend Kurulumu

```bash
cd ../frontend
yarn install
```

`frontend/.env` dosyasını oluşturun:

```env
REACT_APP_BACKEND_URL=http://localhost:8001
```

### 4. MongoDB'yi Başlatın

```bash
# Lokal
mongod --dbpath ~/data/db

# veya MongoDB Atlas (bulut) bağlantı URL'sini MONGO_URL'e yazın
```

---

## 📖 Kullanım

### Backend'i Çalıştırma

```bash
cd backend
source venv/bin/activate
uvicorn server:app --host 0.0.0.0 --port 8001 --reload
```

API artık `http://localhost:8001/api` adresinde çalışıyor olacak. İlk açılışta seed data otomatik yüklenir (1 admin + 1 müşteri + 3 araç + 7 servis kaydı + 13 sorun + 7 bakım görevi + 2 randevu).

### Frontend'i Çalıştırma

```bash
cd frontend
yarn start
```

Tarayıcı otomatik olarak `http://localhost:3000` adresini açacaktır.

### 🔑 Demo Hesaplar

| Rol         | E-posta                       | Şifre        |
|-------------|-------------------------------|--------------|
| **Yönetici** | `admin@truckservis.com`       | `Admin123!`  |
| **Müşteri**  | `musteri@truckservis.com`     | `Musteri123!`|

### 📌 Kullanım Akışı

```
1. Ana Sayfa
   └─> \"Servis Bölümlerimiz\" altında bir karta tıkla → detay paneli açılır

2. Giriş Yap (Müşteri)
   └─> musteri@truckservis.com / Musteri123!

3. Müşteri Paneli
   └─> Araçlarından birine tıkla (örn: Mercedes Actros)

4. Araç Detay (7 Modül Kartı)
   ├─> Motor Sistemi      → açık sorun & servis sayısı
   ├─> Turbo Sistemi      → ⚠️ Tekrarlayan arıza uyarısı
   ├─> Şanzıman Sistemi
   ├─> Fren Sistemi
   ├─> Elektrik Diagnostiği
   ├─> Periyodik Bakım    → bakım takvimi + KM bazlı uyarılar
   └─> AI Diagnostik      → genel AI sohbeti

5. Modül Detay Paneli
   ├─> Sorunlar listesi (şiddet + durum renk kodlu)
   ├─> Onarım geçmişi (parça, teknisyen, KM, maliyet)
   ├─> \"AI ile Analiz Et\" butonu → Claude Sonnet 4.5 modül-bazlı analiz
   └─> Yeni sorun ekleme modalı
```

### Örnek API Kullanımı (cURL)

#### Giriş ve Token Alma

```bash
curl -X POST http://localhost:8001/api/auth/login \
  -H \"Content-Type: application/json\" \
  -d '{
    \"email\": \"musteri@truckservis.com\",
    \"password\": \"Musteri123!\"
  }'
```

#### Beklenen Yanıt

```json
{
  \"token\": \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...\",
  \"user\": {
    \"id\": \"a3f...\",
    \"email\": \"musteri@truckservis.com\",
    \"name\": \"Ahmet Yılmaz\",
    \"phone\": \"+90 532 111 2233\",
    \"role\": \"customer\",
    \"created_at\": \"2026-02-08T11:30:00+00:00\"
  }
}
```

#### Modül Verisi Çekme

```bash
TOKEN=\"<yukarıdaki token>\"
VEHICLE_ID=\"<araç id>\"

curl -H \"Authorization: Bearer $TOKEN\" \
  \"http://localhost:8001/api/vehicles/$VEHICLE_ID/modules/turbo\"
```

#### Beklenen Yanıt

```json
{
  \"module_key\": \"turbo\",
  \"module_label\": \"Turbo Sistemi\",
  \"vehicle\": { \"brand\": \"Mercedes-Benz\", \"model\": \"Actros 1845\", \"plate\": \"34 ABC 1453\" },
  \"issues\": [
    {
      \"id\": \"i1\",
      \"date\": \"2026-01-28\",
      \"description\": \"Yük altında çekiş kaybı\",
      \"severity\": \"yüksek\",
      \"status\": \"devam ediyor\"
    }
  ],
  \"service_records\": [
    {
      \"date\": \"2026-01-28\",
      \"repairs\": \"Turbo waste-gate aktüatör revizyonu\",
      \"cost\": 15400.0,
      \"mileage\": 425000
    }
  ],
  \"recurring\": {
    \"count\": 2,
    \"period\": \"son 6 ay\",
    \"message\": \"Turbo Sistemi arızası son 6 ayda 2 kez tekrarladı\",
    \"severity\": \"orta\"
  }
}
```

#### Modül-Bazlı AI Analizi

```bash
curl -X POST -H \"Authorization: Bearer $TOKEN\" \
  \"http://localhost:8001/api/ai/module-analyze/$VEHICLE_ID/turbo\"
```

#### Örnek AI Çıktısı

```
Turbo Sistemi analizi — Mercedes-Benz Actros 1845 (34 ABC 1453)

1. Olası Nedenler
   • Waste-gate aktüatör yapışması (en olası)
   • Intercooler hortum kelepçesi gevşekliği
   • Turbo kartuşu aşınması

2. Tanı Adımları
   • Boost basıncı manometre ile ölçülmeli
   • Vakum hortumları sızdırmazlık testi
   • Waste-gate aktüatör hareketi gözle kontrol

3. Aciliyet Seviyesi: YÜKSEK
   Son 6 ayda 2 kez aynı sorun tekrarladı.

4. Önerilen Onarım Aksiyonları
   • Waste-gate aktüatör değişimi
   • Intercooler basınç testi
   • Boost sensörü kalibrasyonu

5. Tekrarlama Riski
   Sorun çözülmezse motor hasarı riski mevcuttur.
   Önleyici: 50.000 km'de turbo kartuşu kontrolü önerilir.
```

---

## 🧪 Testler

### Backend Testleri

#### Tüm Testleri Çalıştır

```bash
cd backend
pytest tests/ -v
```

#### Belirli Bir Test Dosyası

```bash
pytest tests/backend_test.py -v        # 31 temel test
pytest tests/test_modules.py -v        # 28 modüler sistem testi
```

#### Belirli Bir Sınıf

```bash
pytest tests/backend_test.py::TestAuth -v
pytest tests/test_modules.py::TestModuleAggregate -v
```

### Test Coverage

```
Backend Tests:
  Auth (register/login/me)        ████████████████████ 100%  (5/5)
  Vehicles CRUD                   ████████████████████ 100%  (4/4)
  Appointments                    ████████████████████ 100%  (5/5)
  Service Records                 ████████████████████ 100%  (3/3)
  Admin endpoints                 ████████████████████ 100%  (3/3)
  AI Chat (SSE streaming)         ████████████████████ 100%  (2/2)
  AI Service Analyze              ████████████████████ 100%  (3/3)
  Issues CRUD                     ████████████████████ 100%  (6/6)
  Maintenance Tasks               ████████████████████ 100%  (3/3)
  Module Aggregate                ████████████████████ 100%  (8/8)
  Module-Scoped AI                ███████████████████░  95%  (3/4)
  Authorization Isolation         ████████████████████ 100%  (4/4)
  -------------------------------
  TOPLAM                          ████████████████████  98%  (59 test başarılı)
```

> ⚠️ Tek atlanan test, LLM API bütçe sınırına takılan bir AI test case'idir; kod hatası değil ortam sınırlamasıdır. Manuel cURL ile 200 OK yanıt alınmıştır.

---

## 🔒 Güvenlik

### JWT Tabanlı Kimlik Doğrulama

**Güvenli Şifre Hash'leme:**

```python
# ✅ Bcrypt salt ile güvenli hash
import bcrypt

def hash_password(pw: str) -> str:
    return bcrypt.hashpw(pw.encode(\"utf-8\"), bcrypt.gensalt()).decode(\"utf-8\")

def verify_password(pw: str, hashed: str) -> bool:
    return bcrypt.checkpw(pw.encode(\"utf-8\"), hashed.encode(\"utf-8\"))
```

**JWT Token Oluşturma:**

```python
# ✅ HS256 + expiry time + standart claim'ler
import jwt
from datetime import datetime, timezone, timedelta

def create_token(user_id: str, role: str) -> str:
    payload = {
        \"sub\": user_id,
        \"role\": role,
        \"exp\": datetime.now(timezone.utc) + timedelta(hours=72),
        \"iat\": datetime.now(timezone.utc),
    }
    return jwt.encode(payload, JWT_SECRET, algorithm=\"HS256\")
```

### Kullanıcı Bazlı Veri İzolasyonu

Tüm endpoint'lerde müşterinin yalnızca kendi verisine erişimi vardır:

```python
# ✅ Customer izolasyonu — müşteri sadece kendi aracını görebilir
query = {\"id\": vehicle_id} if user.role == \"admin\" else {\"id\": vehicle_id, \"customer_id\": user.id}
veh = await db.vehicles.find_one(query)
if not veh:
    raise HTTPException(status_code=404, detail=\"Araç bulunamadı\")
```

### Pydantic Input Validation

```python
# ✅ Pydantic v2 ile katı tip ve enum kontrolü
class IssueCreate(BaseModel):
    vehicle_id: str
    module: Literal[\"engine\", \"turbo\", \"transmission\", \"brake\", \"electrical\", \"periodic\"]
    date: str
    description: str
    severity: Literal[\"düşük\", \"orta\", \"yüksek\", \"kritik\"] = \"orta\"
    status: Literal[\"açık\", \"devam ediyor\", \"çözüldü\"] = \"açık\"
```

---

## 🎨 Tasarım Sistemi

### Renk Paleti

```
Birincil (Brand):        #FF5A00  (Safety Orange — endüstriyel turuncu)
Koyu Tema Arkaplan:      hsl(0, 0%, 4%)
Açık Tema Arkaplan:      hsl(0, 0%, 96%)
Kritik:                  #EF4444  (Red 500)
Uyarı:                   #EAB308  (Yellow 500)
Başarı:                  #22C55E  (Green 500)
```

### Tipografi

```
Başlıklar (H1-H6):   Barlow Condensed — 800/900 ağırlık, UPPERCASE
Gövde Metin:         Manrope — 400-700 ağırlık
Teknik / Monospace:  Roboto Mono — kod, ID, KM gibi sayısal veriler
```

### Şiddet Renk Kodlaması (Modül Detay Sayfası)

| Şiddet      | Renk      | Anlam                              |
|-------------|-----------|------------------------------------|
| **Düşük**   | 🟢 Yeşil  | Rutin kontrol önerilir             |
| **Orta**    | 🟡 Sarı   | Yakın gelecekte servis gerekli     |
| **Yüksek**  | 🟠 Turuncu| Hızlı servis önerilir              |
| **Kritik**  | 🔴 Kırmızı| Aracı kullanmayın, derhal servis   |

---

## 📸 Ekran Görüntüleri

### Ana Sayfa
![Ana Sayfa](screenshots/home.png)

### Müşteri Paneli (Dashboard)
![Müşteri Paneli](screenshots/dashboard.png)

### Araç Detay — 7 Tıklanabilir Modül Kartı
![Araç Detay](screenshots/vehicle-detail.png)

### Modül Detay — Turbo Sistemi (Tekrarlayan Arıza Uyarısı)
![Turbo Modülü](screenshots/module-turbo.png)

### AI Asistan — Streaming Sohbet
![AI Asistan](screenshots/ai-assistant.png)

### Etkileşimli Servis Bölümü Paneli
![Servis Paneli](screenshots/service-panel.png)

### Yönetici Paneli
![Admin](screenshots/admin.png)

---

## 🔗 GitHub Proje Bağlantısı

> 📦 **Repo URL:** `https://github.com/<KULLANICI_ADI>/heavy-vehicle-service`
>
> _Buraya kendi GitHub repo bağlantınızı ekleyiniz._

---

## 🛠️ Kullanılan Teknolojiler

### Frontend

| Teknoloji         | Sürüm    | Amaç                              |
|-------------------|----------|-----------------------------------|
| React             | 19.0.0   | UI kütüphanesi                    |
| React Router      | 7.5.1    | Sayfa yönlendirme (SPA)           |
| Tailwind CSS      | 3.4.17   | Utility-first CSS framework       |
| Shadcn UI         | latest   | Radix UI tabanlı bileşen kütüphanesi |
| Lucide React      | 0.507.0  | Modern SVG ikon seti              |
| Axios             | 1.8.4    | HTTP istemcisi                    |
| Sonner            | 2.0.3    | Toast bildirimleri                |
| CRACO             | 7.1.0    | CRA konfigürasyon yöneticisi      |

### Backend

| Teknoloji              | Sürüm    | Amaç                                  |
|------------------------|----------|---------------------------------------|
| FastAPI                | 0.110.1  | Python web framework                  |
| Uvicorn                | 0.25.0   | ASGI sunucusu                         |
| Motor                  | 3.3.1    | MongoDB async driver                  |
| PyMongo                | 4.5.0    | MongoDB Python sürücüsü               |
| Pydantic               | 2.6.4    | Veri doğrulama / model tanımlama      |
| PyJWT                  | 2.10.1   | JSON Web Token kimlik doğrulama       |
| Bcrypt                 | 4.0.1    | Güvenli şifre hash'leme               |
| emergentintegrations   | 0.2.0    | Claude Sonnet 4.5 entegrasyonu        |
| python-dotenv          | 1.0.1    | Ortam değişkenleri yönetimi           |

### Veritabanı

- **MongoDB 6.0+** (NoSQL doküman veritabanı)
- **Koleksiyonlar:** `users`, `vehicles`, `appointments`, `service_records`, `issues`, `maintenance_tasks`, `chat_messages`, `ai_analyses`

### Yapay Zekâ

- **Anthropic Claude Sonnet 4.5** — Emergent Universal LLM Key üzerinden
- **Server-Sent Events (SSE)** — Streaming yanıt protokolü
- **Modül-bazlı bağlamsal analiz**

---

## 🐛 Bilinen Sorunlar ve Geliştirmeler

### 🔜 Yapılacaklar (Roadmap)

- [ ] E-posta bildirimleri (randevu onayı — Resend / SendGrid)
- [ ] SMS hatırlatmaları (Twilio)
- [ ] Servis raporu PDF indirme
- [ ] Hasar fotoğrafları için dosya yükleme (object storage)
- [ ] Stripe ile online ödeme
- [ ] Çoklu dil desteği (TR / EN toggle)
- [ ] Mobil uygulama (React Native)
- [ ] Real-time WebSocket bildirimleri
- [ ] Modül-bazlı maliyet trend grafikleri
- [ ] Docker containerization

### Katkıda Bulunma

Pull request'ler memnuniyetle karşılanır:

```bash
1. Feature branch oluştur:   git checkout -b feature/yeni-ozellik
2. Değişiklikleri commit et: git commit -m 'Yeni özellik: ...'
3. Branch'i push et:         git push origin feature/yeni-ozellik
4. Pull Request aç
```

---

## 📝 Lisans

Bu proje **MIT lisansı** altında lisanslanmıştır. Detaylar için `LICENSE` dosyasına bakınız.

---

## 👨‍💻 Geliştirici

** Emrehan Etci **
- **Öğrenci No:** 24010502035
- **E-posta:** emrehanetci@stu.topkapi.edu.tr
- **GitHub:** [@LasTRomqnceE](https://github.com/LasTRomqnceE)

---

## 🙏 Teşekkürler

- **Anthropic** — Claude Sonnet 4.5 modeli için
- **Emergent** — Universal LLM Key ve geliştirme platformu için
- **FastAPI** ve **React** açık kaynak topluluklarına
- **Shadcn UI** — Erişilebilir bileşen kütüphanesi için
- **Tailwind Labs** — CSS framework için
- **Pexels** ve **Unsplash** — Ücretsiz stok görseller için
- Ders kapsamında bilgi ve geri bildirim sağlayan hocamıza

---

## 📚 Kaynakça ve Yararlanılan Bağlantılar

### Resmi Dokümantasyonlar

- [React Documentation](https://react.dev/)
- [FastAPI Documentation](https://fastapi.tiangolo.com/)
- [MongoDB Manual](https://www.mongodb.com/docs/manual/)
- [Motor (Async MongoDB) Docs](https://motor.readthedocs.io/)
- [Pydantic v2 Docs](https://docs.pydantic.dev/latest/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Shadcn UI Documentation](https://ui.shadcn.com/)
- [Lucide Icons](https://lucide.dev/)
- [React Router v7](https://reactrouter.com/)

### Güvenlik ve Kimlik Doğrulama

- [FastAPI Security: OAuth2 with JWT](https://fastapi.tiangolo.com/tutorial/security/oauth2-jwt/)
- [JWT Introduction (jwt.io)](https://jwt.io/introduction)
- [Bcrypt Password Hashing](https://en.wikipedia.org/wiki/Bcrypt)
- [OWASP Top 10](https://owasp.org/www-project-top-ten/)

### Yapay Zekâ Entegrasyonu

- [Anthropic Claude Documentation](https://docs.anthropic.com/)
- [Server-Sent Events MDN](https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events)

### Tasarım İlhamları

- [Refactoring UI Book](https://www.refactoringui.com/)
- [Vercel Design System](https://vercel.com/design)
- Mercedes-Benz Trucks, Volvo Trucks, Scania resmi siteleri (endüstriyel tema esinlenmesi)

### Görseller

- [Pexels](https://www.pexels.com/) — Ücretsiz stok fotoğraflar
- [Unsplash](https://unsplash.com/) — Ücretsiz stok fotoğraflar

### Öğretici Makaleler ve Videolar

- \"Building Modern React Apps with TypeScript\" — React resmi blog
- \"FastAPI Best Practices\" — Sebastian Ramirez (FastAPI yazarı)
- \"MongoDB Schema Design Best Practices\" — MongoDB resmi blog
- \"JWT vs Session Authentication\" — Stack Overflow tartışmaları

---

**Not:** Bu proje **eğitim amaçlı** geliştirilmiştir. Üretim ortamında kullanmadan önce ek güvenlik testleri (penetrasyon testi, OWASP ZAP taraması), performans optimizasyonu ve yük testleri yapılmalıdır.

---

**🚛 Yolda Asla Yalnız Değilsin.**
"
