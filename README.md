Tabii ki! Hocanızın istediği tüm bölümleri içeren profesyonel bir `README.md` dosyası hazırlıyorum. Ben dosyayı `/app/README.md` olarak kaydediyorum, böylece GitHub'a push ettiğinde otomatik olarak repo'nun ana sayfasında görünecek.
Action: file_editor create /app/README.md --file-text "# 🚛 TRUCK SERVİS — Ağır Vasıta Servis Yönetim Sistemi

> Yapay zekâ destekli, modüler servis takip sistemi ile çalışan profesyonel bir ağır vasıta (kamyon, tır, otobüs) ve ticari araç servis yönetim platformu.

---

## 👤 Öğrenci Bilgileri

| Bilgi              | Değer                          |
|--------------------|--------------------------------|
| **Ad Soyad**       | Emrehan Etci                   |
| **Öğrenci No**     | 24010502035                    |
| **Ders**           | Programlamada Yeni Eğilimler   |
| **Dönem**          | 2025 – 2026 Bahar              |

---

## 🎯 Projenin Amacı ve Kısa Açıklaması

**TRUCK SERVİS**, ağır vasıta servis merkezlerinin günlük operasyonlarını dijitalleştirmek için geliştirilmiş, **uçtan uca** çalışan bir web uygulamasıdır.

Geleneksel servis kayıt sistemlerinin aksine bu platform:

- **7 farklı servis modülünü** (Motor, Turbo, Şanzıman, Fren, Elektrik, Periyodik Bakım, AI Diagnostik) tek tek takip edilebilir, tıklanabilir kartlar olarak sunar.
- **Yapay zekâ entegrasyonu** ile (Claude Sonnet 4.5) müşterinin servis geçmişini analiz eder, tekrarlayan arızaları tespit eder, olası nedenleri açıklar ve önleyici bakım önerileri sunar.
- **Streaming tabanlı** AI sohbet asistanı sayesinde kullanıcılar uyarı ışığı, çekiş kaybı, fren tutukluğu gibi sorunlar hakkında anlık teknik destek alabilir.
- Müşteriler, yöneticiler ve teknisyenler için **rol-tabanlı** ayrı paneller içerir.

### Sistemin Çözdüğü Problem

Ağır vasıta sahipleri (filo operatörleri, nakliyeciler, otobüs işletmeleri) servis geçmişlerini genellikle kâğıt fatura veya Excel dosyalarında tutar. Bu durum:

- Tekrarlayan arızaların gözden kaçmasına neden olur.
- Önleyici bakım takvimi yapılamaz.
- Toplam araç başına maliyet hesaplanamaz.

Bu proje bu sorunları **modüler dijital takip + AI analizi** ile çözer.

---

## 🛠 Kullanılan Teknolojiler / Kütüphaneler

### Frontend
| Teknoloji              | Sürüm    | Açıklama                                       |
|------------------------|----------|------------------------------------------------|
| **React**              | 19.0.0   | UI kütüphanesi                                 |
| **React Router**       | 7.5.1    | Sayfa yönlendirme (SPA)                        |
| **Tailwind CSS**       | 3.4.17   | Utility-first CSS framework                    |
| **Shadcn UI**          | latest   | Hazır UI bileşen kütüphanesi (Radix UI tabanlı)|
| **Lucide React**       | 0.507.0  | Modern SVG ikon seti                           |
| **Axios**              | 1.8.4    | HTTP istemcisi                                 |
| **Sonner**             | 2.0.3    | Toast bildirimleri                             |
| **CRACO**              | 7.1.0    | Create React App konfigürasyonu                |

### Backend
| Teknoloji                 | Sürüm   | Açıklama                                       |
|---------------------------|---------|------------------------------------------------|
| **FastAPI**               | 0.110.1 | Modern Python web framework                    |
| **Uvicorn**               | 0.25.0  | ASGI sunucusu                                  |
| **Motor**                 | 3.3.1   | MongoDB için async driver                      |
| **PyMongo**               | 4.5.0   | MongoDB Python sürücüsü                        |
| **Pydantic**              | 2.6.4   | Veri doğrulama / model tanımlama               |
| **PyJWT**                 | 2.10.1  | JSON Web Token kimlik doğrulama                |
| **Bcrypt**                | 4.0.1   | Güvenli şifre hash'leme                        |
| **emergentintegrations**  | 0.2.0   | Claude Sonnet 4.5 entegrasyonu                 |
| **python-dotenv**         | 1.0.1   | Ortam değişkenleri yönetimi                    |

### Veritabanı
- **MongoDB** (NoSQL doküman veritabanı)
- Koleksiyonlar: `users`, `vehicles`, `appointments`, `service_records`, `issues`, `maintenance_tasks`, `chat_messages`, `ai_analyses`

### Yapay Zekâ
- **Claude Sonnet 4.5** (Anthropic) — Emergent Universal LLM Key üzerinden
- Server-Sent Events (SSE) ile **streaming** yanıt
- Modül-bazlı bağlamsal analiz

---

## 📂 Proje Klasör Yapısı

```
heavy-vehicle-service/
│
├── backend/                          # FastAPI backend
│   ├── server.py                     # Tüm API endpoint'leri + AI entegrasyonu
│   ├── requirements.txt              # Python bağımlılıkları
│   ├── .env                          # Ortam değişkenleri (git'e dahil değil)
│   └── tests/
│       ├── backend_test.py           # Temel API testleri
│       └── test_modules.py           # Modüler sistem testleri
│
├── frontend/                         # React SPA
│   ├── package.json                  # Node bağımlılıkları
│   ├── tailwind.config.js            # Tailwind tema konfigürasyonu
│   ├── public/
│   │   └── index.html
│   └── src/
│       ├── App.js                    # Ana router
│       ├── index.js                  # Giriş noktası
│       ├── index.css                 # Tema değişkenleri (CSS custom props)
│       ├── components/               # Paylaşılan bileşenler
│       │   ├── Header.jsx
│       │   ├── Footer.jsx
│       │   ├── ThemeToggle.jsx
│       │   ├── ProtectedRoute.jsx
│       │   ├── ServiceSectionPanel.jsx   # Etkileşimli servis bölümü paneli
│       │   └── ui/                   # Shadcn UI bileşenleri
│       ├── pages/                    # Sayfa bileşenleri
│       │   ├── Home.jsx              # Ana sayfa
│       │   ├── Services.jsx          # Hizmetler kataloğu
│       │   ├── Contact.jsx           # İletişim
│       │   ├── Login.jsx
│       │   ├── Register.jsx
│       │   ├── Dashboard.jsx         # Müşteri paneli
│       │   ├── VehicleDetail.jsx     # Araç detay (7 modül kartı)
│       │   ├── ModuleDetail.jsx      # Modül detay paneli
│       │   ├── Appointments.jsx      # Randevu yönetimi
│       │   ├── ServiceHistory.jsx    # Servis geçmişi
│       │   ├── AIAssistant.jsx       # AI Sohbet asistanı
│       │   └── Admin.jsx             # Yönetici paneli
│       └── lib/
│           ├── api.js                # Axios instance
│           ├── auth.jsx              # AuthContext (JWT yönetimi)
│           ├── modules.js            # Servis modülü kataloğu
│           └── serviceSections.js    # Servis bölümleri detay verisi
│
├── memory/
│   ├── PRD.md                        # Ürün gereksinim dokümanı
│   └── test_credentials.md           # Test hesap bilgileri
│
└── README.md                         # Bu dosya
```

---

## ⚙️ Kurulum Adımları

### Ön Gereksinimler

Sisteminizde şunların kurulu olması gerekir:

- **Node.js** ≥ 18 ve **Yarn**
- **Python** ≥ 3.11 ve **pip**
- **MongoDB** ≥ 6.0 (lokal veya MongoDB Atlas)

### 1️⃣ Depoyu Klonlayın

```bash
git clone https://github.com/<KULLANICI_ADI>/heavy-vehicle-service.git
cd heavy-vehicle-service
```

### 2️⃣ Backend Kurulumu

```bash
cd backend
python -m venv venv
source venv/bin/activate          # Windows: venv\Scripts\activate
pip install -r requirements.txt
```

Ardından `backend/.env` dosyasını oluşturun:

```env
MONGO_URL=\"mongodb://localhost:27017\"
DB_NAME=\"heavy_vehicle_service\"
CORS_ORIGINS=\"*\"
EMERGENT_LLM_KEY=\"<EMERGENT_UNIVERSAL_KEY>\"
JWT_SECRET=\"<rastgele-uzun-bir-string>\"
JWT_ALGORITHM=\"HS256\"
JWT_EXPIRE_HOURS=\"72\"
```

> 🔐 **Not:** `EMERGENT_LLM_KEY` Emergent platformu üzerinden temin edilir. JWT_SECRET için en az 32 karakterlik rastgele bir değer kullanın.

### 3️⃣ Frontend Kurulumu

```bash
cd ../frontend
yarn install
```

`frontend/.env` dosyasını oluşturun:

```env
REACT_APP_BACKEND_URL=http://localhost:8001
```

### 4️⃣ MongoDB'yi Başlatın

Lokal kurulum için:

```bash
mongod --dbpath ~/data/db
```

veya MongoDB Atlas bulut servisini kullanabilirsiniz.

---

## ▶️ Çalıştırma ve Kullanım Talimatları

### Backend'i Başlat

```bash
cd backend
source venv/bin/activate
uvicorn server:app --host 0.0.0.0 --port 8001 --reload
```

API artık `http://localhost:8001/api` adresinde çalışıyor olacak.

### Frontend'i Başlat

Yeni bir terminal açın:

```bash
cd frontend
yarn start
```

Tarayıcı otomatik olarak `http://localhost:3000` adresini açacaktır.

### 🔑 Demo Hesaplar

İlk açılışta otomatik olarak iki demo hesap seed edilir:

| Rol         | E-posta                       | Şifre        |
|-------------|-------------------------------|--------------|
| **Yönetici** | `admin@truckservis.com`       | `Admin123!`  |
| **Müşteri**  | `musteri@truckservis.com`     | `Musteri123!`|

Müşteri hesabıyla giriş yaptığınızda hazır olarak:
- 3 araç (Mercedes Actros, Scania R500, Volvo FH460)
- 7 servis kaydı
- 13 modül bazlı sorun
- 7 periyodik bakım görevi
- 2 randevu

verisi yüklü gelir.

### 📌 Temel Kullanım Akışı

1. **Ana Sayfa** → \"Servis Bölümlerimiz\" başlığı altındaki kartlardan birine tıklayın → detay paneli açılır.
2. **Kayıt / Giriş** → `musteri@truckservis.com` ile giriş yapın.
3. **Müşteri Paneli** → araçlarınızdan birine tıklayın.
4. **Araç Detay** → 7 servis modülünden birini seçin (örn. Turbo Sistemi).
5. **Modül Detay Paneli**'nde:
   - Açık ve geçmiş sorunları görebilirsiniz.
   - Onarım geçmişini inceleyebilirsiniz.
   - \"**AI ile Analiz Et**\" butonuyla Claude AI'dan o modüle özel teşhis alabilirsiniz.
   - Tekrarlayan arıza uyarısı (varsa) renkli banner ile görünür.
6. **Randevu** → \"Yeni Randevu\" ile servis talebi oluşturabilirsiniz.
7. **AI Asistan** → genel sohbet tabanlı teknik danışmanlık.

---

## 📸 Ekran Görüntüleri

> Aşağıdaki ekran görüntüleri `screenshots/` klasöründe yer almaktadır. README'de görmek için göreceli yolla ekleyin.

### Ana Sayfa
![Ana Sayfa](screenshots/home.png)

### Müşteri Paneli (Dashboard)
![Müşteri Paneli](screenshots/dashboard.png)

### Araç Detay — 7 Servis Modülü
![Araç Detay](screenshots/vehicle-detail.png)

### Modül Detay — Turbo Sistemi (Tekrarlayan Arıza Uyarısı)
![Modül Detay](screenshots/module-turbo.png)

### AI Asistan (Streaming Sohbet)
![AI Asistan](screenshots/ai-assistant.png)

### Etkileşimli Servis Bölümü Paneli
![Servis Paneli](screenshots/service-panel.png)

### Yönetici Paneli
![Yönetici Paneli](screenshots/admin.png)

---

## 🔗 GitHub Proje Bağlantısı

> **Repo URL:** `https://github.com/<KULLANICI_ADI>/heavy-vehicle-service`
>
> _Buraya kendi GitHub repo bağlantınızı ekleyiniz._

---

## ✨ Öne Çıkan Özellikler

- ✅ **7 Modüler Servis Sistemi** — her biri tıklanabilir, bağımsız panel
- ✅ **AI Diagnostik** — Claude Sonnet 4.5 ile Türkçe streaming yanıt
- ✅ **Tekrarlayan Arıza Tespiti** — son 6 ayda 2+ kez tekrarlayan sorunları otomatik işaretler
- ✅ **Renk Kodlu Şiddet Sistemi** — düşük (yeşil), orta (sarı), yüksek (turuncu), kritik (kırmızı)
- ✅ **Periyodik Bakım Takvimi** — KM bazlı gecikmiş/yaklaşıyor/uygun durumları
- ✅ **JWT Tabanlı Güvenli Kimlik Doğrulama** — bcrypt ile şifre hash'leme
- ✅ **Rol Bazlı Erişim** — müşteri ve yönetici farklı yetkilere sahip
- ✅ **Karanlık / Aydınlık Tema** — kullanıcı tercihine göre otomatik
- ✅ **Tamamen Türkçe Arayüz**
- ✅ **Responsive Tasarım** — masaüstü, tablet ve mobilde sorunsuz

---

## 🧪 Test

Backend testlerini çalıştırmak için:

```bash
cd backend
pytest tests/ -v
```

Mevcut test kapsama oranı: **31 backend testi + 28 modül testi = 59 test başarılı**

---

## 📚 Kaynakça ve Yararlanılan Bağlantılar

### Resmi Dokümantasyonlar
- [React Resmi Dokümantasyonu](https://react.dev/)
- [FastAPI Documentation](https://fastapi.tiangolo.com/)
- [MongoDB Manual](https://www.mongodb.com/docs/manual/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Shadcn UI](https://ui.shadcn.com/)
- [Motor (async MongoDB)](https://motor.readthedocs.io/)
- [Pydantic v2](https://docs.pydantic.dev/latest/)
- [JWT (JSON Web Tokens)](https://jwt.io/introduction)
- [Lucide Icons](https://lucide.dev/)

### Yapay Zekâ
- [Anthropic Claude Sonnet 4.5](https://www.anthropic.com/claude)
- [Emergent Universal LLM Key Dokümantasyonu](https://emergent.sh/)

### Tasarım İlhamları
- [Refactoring UI](https://www.refactoringui.com/)
- [Vercel Design System](https://vercel.com/design)
- Endüstriyel/otomotiv tema esinlenmeleri: Mercedes-Benz Trucks, Volvo Trucks resmi siteleri

### Görseller
- [Pexels](https://www.pexels.com/) — Ücretsiz stok fotoğraflar
- [Unsplash](https://unsplash.com/) — Ücretsiz stok fotoğraflar

### Öğretici Makaleler
- [JWT Authentication with FastAPI](https://fastapi.tiangolo.com/tutorial/security/oauth2-jwt/)
- [Server-Sent Events (SSE) ile Streaming](https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events)
- [React Router v7 Migration Guide](https://reactrouter.com/start/changelog)

---

## 📝 Lisans

Bu proje eğitim amaçlı geliştirilmiştir.

---

## 👨‍💻 Geliştirici

Proje, **Emergent platformu** üzerinde React + FastAPI + MongoDB teknoloji yığını kullanılarak geliştirilmiştir.

> Soru veya geri bildirim için: _e-posta adresiniz / GitHub profil bağlantınız_

---

**🚛 Yolda Asla Yalnız Değilsin.**
"
Observation: Overwrite successful: /app/README.md
