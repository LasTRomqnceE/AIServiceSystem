import React from "react";
import { Cog, Wrench, ShieldCheck, Activity, Truck, Bot, Zap, Snowflake, Settings } from "lucide-react";

const ITEMS = [
  { icon: Cog, code: "01", title: "Motor Revizyonu", desc: "Komple motor revizyonu, segman, supap taşlama, krank ve kam mili işleri." },
  { icon: Zap, code: "02", title: "Turbo Onarımı", desc: "Turbo balans, kartuş değişimi, intercooler kontrol ve VTG ayarı." },
  { icon: Wrench, code: "03", title: "Şanzıman & Diferansiyel", desc: "Manuel/otomatik şanzıman revizyonu, debriyaj seti ve diferansiyel servisi." },
  { icon: ShieldCheck, code: "04", title: "Fren Sistemleri", desc: "ABS/EBS arıza kodları, hava sistemleri, balata-disk ve ana hava deposu." },
  { icon: Activity, code: "05", title: "Elektrik & Diagnostik", desc: "OBD/EOBD diagnostik, ECU yeniden programlama, aydınlatma ve şarj sistemleri." },
  { icon: Snowflake, code: "06", title: "Klima & Soğutma", desc: "Klima kompresör değişimi, gaz dolumu, radyatör ve hortum revizyonu." },
  { icon: Settings, code: "07", title: "Yağlama & Hidrolik", desc: "Direksiyon, hidrolik silindir, yağ ve gres istasyonu." },
  { icon: Truck, code: "08", title: "Şasi & Süspansiyon", desc: "Makas, amortisör, kingpin, dingil ve şasi kaynak işleri." },
  { icon: Bot, code: "09", title: "AI Destekli Tanı", desc: "Servis geçmişinize göre tekrarlayan arıza analizi ve proaktif bakım önerileri." },
];

export default function Services() {
  return (
    <div className="mx-auto max-w-[1400px] px-4 md:px-8 py-16 md:py-24">
      <div className="flex items-center gap-3 mb-3"><span className="brand-line" /><span className="label-mono">Hizmet Kataloğu</span></div>
      <h1 className="font-heading text-5xl sm:text-6xl font-black uppercase tracking-tighter mb-6">Tüm Hizmetler</h1>
      <p className="text-muted-foreground max-w-2xl mb-12">Atölye kapasitesi, orijinal parça stoğu ve sertifikalı teknisyen kadrosu ile aşağıdaki tüm hizmetleri tek noktada sunuyoruz.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-border">
        {ITEMS.map((s, i) => (
          <div key={s.code} className="bg-card p-8 hover:bg-secondary transition-colors" data-testid={`services-item-${i}`}>
            <div className="flex items-start justify-between mb-6">
              <s.icon className="h-10 w-10 text-brand" strokeWidth={1.5} />
              <span className="font-mono text-xs text-muted-foreground">// {s.code}</span>
            </div>
            <h3 className="font-heading text-2xl font-bold uppercase mb-2">{s.title}</h3>
            <p className="text-sm text-muted-foreground">{s.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
