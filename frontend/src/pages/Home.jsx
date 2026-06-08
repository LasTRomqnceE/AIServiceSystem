import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Phone, ChevronRight } from "lucide-react";
import ServiceSectionPanel from "../components/ServiceSectionPanel";
import { SERVICE_SECTIONS } from "../lib/serviceSections";

const HERO_IMG = "https://images.pexels.com/photos/6563903/pexels-photo-6563903.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940";
const SERVICE_IMG = "https://images.unsplash.com/photo-1615906655593-ad0386982a0f?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzl8MHwxfHNlYXJjaHwxfHxtZWNoYW5pYyUyMHJlcGFpcmluZyUyMHRydWNrJTIwZW5naW5lfGVufDB8fHx8MTc4MDkyMDI2OHww&ixlib=rb-4.1.0&q=85";

const SERVICES = SERVICE_SECTIONS; // 6 items, full content lives in lib/serviceSections.js

const STATS = [
  { v: "25+", l: "Yıllık Tecrübe" },
  { v: "12.4K", l: "Tamamlanan Servis" },
  { v: "94%", l: "Müşteri Memnuniyeti" },
  { v: "7/24", l: "Yol Yardım" },
];

export default function Home() {
  const [selected, setSelected] = useState(null);
  return (
    <div>
      {/* HERO */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0">
          <img src={HERO_IMG} alt="" className="w-full h-full object-cover opacity-25 dark:opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/85 to-background/40" />
        </div>
        <div className="relative grid-bg dark:grid-bg-light">
          <div className="mx-auto max-w-[1400px] px-4 md:px-8 py-20 md:py-32 grid lg:grid-cols-12 gap-10">
            <div className="lg:col-span-8 animate-fade-up">
              <div className="flex items-center gap-3 mb-6">
                <span className="brand-line" />
                <span className="label-mono">Sertifikalı Ağır Vasıta Servisi · Est. 2000</span>
              </div>
              <h1 className="font-heading text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-black uppercase leading-[0.9] tracking-tighter">
                Yolda <span className="text-brand">Asla</span><br />
                Yalnız Değilsin.
              </h1>
              <p className="mt-6 max-w-2xl text-base md:text-lg text-muted-foreground leading-relaxed">
                Kamyon, tır, otobüs ve hafif ticari araçlarınız için 6 marka yetkilisi seviyesinde
                onarım. Yapay zeka destekli arıza tahmini ile bakım maliyetinizi <span className="text-foreground font-semibold">%32&apos;ye varan</span> oranda düşürün.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  to="/kayit"
                  data-testid="hero-cta-appointment"
                  className="inline-flex items-center gap-2 bg-brand text-white px-6 py-4 font-heading font-bold uppercase tracking-wider hover:bg-brand-dark transition-colors"
                >
                  Hemen Randevu Al <ArrowRight className="h-5 w-5" />
                </Link>
                <Link
                  to="/hizmetler"
                  data-testid="hero-cta-services"
                  className="inline-flex items-center gap-2 border border-border px-6 py-4 font-heading font-bold uppercase tracking-wider hover:border-brand hover:text-brand transition-colors"
                >
                  Hizmetlerimiz
                </Link>
              </div>
              <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
                {STATS.map((s) => (
                  <div key={s.l} className="border-l-2 border-brand pl-4">
                    <div className="font-heading text-3xl md:text-4xl font-black">{s.v}</div>
                    <div className="label-mono mt-1">{s.l}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="lg:col-span-4 hidden lg:block">
              <div className="border border-border bg-card p-6 sticky top-24">
                <div className="label-mono mb-3">7/24 İletişim Hattı</div>
                <a href="tel:+908502221453" className="flex items-center gap-3 group">
                  <Phone className="h-6 w-6 text-brand group-hover:animate-pulse-brand" />
                  <span className="font-heading text-3xl font-black">0850 222 1453</span>
                </a>
                <div className="my-6 h-px bg-border" />
                <div className="label-mono mb-3">Sertifikalar</div>
                <ul className="space-y-2 text-sm">
                  <li>✓ ISO 9001:2015</li>
                  <li>✓ TSE Hizmet Yeterlilik</li>
                  <li>✓ Bosch Diesel Service</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES BENTO */}
      <section className="mx-auto max-w-[1400px] px-4 md:px-8 py-20 md:py-28">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="brand-line" />
              <span className="label-mono">Hizmetler</span>
            </div>
            <h2 className="font-heading text-4xl sm:text-5xl font-black uppercase tracking-tighter">
              Servis Bölümlerimiz
            </h2>
          </div>
          <p className="max-w-md text-muted-foreground">
            Tek bir adreste tam donanımlı atölye, orijinal parça stoku ve sertifikalı teknisyen kadrosu.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-border">
          {SERVICES.map((s, i) => (
            <button
              key={s.title}
              type="button"
              onClick={() => setSelected(s)}
              data-testid={`service-card-${i}`}
              className="bg-card p-8 hover:bg-secondary transition-colors group text-left focus:outline-none focus:ring-2 focus:ring-brand focus:ring-inset"
            >
              <div className="flex items-start justify-between mb-6">
                <s.icon className="h-10 w-10 text-brand" strokeWidth={1.5} />
                <span className="font-mono text-xs text-muted-foreground">// {s.code}</span>
              </div>
              <h3 className="font-heading text-2xl font-bold uppercase mb-2">{s.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{s.short}</p>
              <div className="mt-6 inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-brand opacity-0 group-hover:opacity-100 transition-opacity">
                Detay <ChevronRight className="h-3 w-3" />
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* AI BANNER */}
      <section className="border-y border-border bg-card">
        <div className="mx-auto max-w-[1400px] px-4 md:px-8 py-20 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="brand-line" />
              <span className="label-mono">Yapay Zeka Destekli Diagnostik</span>
            </div>
            <h2 className="font-heading text-4xl sm:text-5xl font-black uppercase tracking-tighter mb-6">
              Aracın <span className="text-brand">Konuşur</span>,<br /> Biz <span className="text-brand">Dinleriz.</span>
            </h2>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              Claude Sonnet destekli AI asistanımız uyarı ışığı, turbo basınç düşüşü, fren tutukluğu gibi şikayetleri analiz eder, olası nedenleri açıklar ve acil müdahale gerektiren durumları işaretler.
            </p>
            <Link
              to="/kayit"
              data-testid="ai-cta-btn"
              className="inline-flex items-center gap-2 bg-brand text-white px-6 py-4 font-heading font-bold uppercase tracking-wider hover:bg-brand-dark transition-colors"
            >
              AI Asistanı Dene <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
          <div className="relative">
            <img src={SERVICE_IMG} alt="Mekanik" className="w-full aspect-[4/3] object-cover border border-border" />
            <div className="absolute -bottom-6 -left-6 hidden md:block bg-background border border-border p-4 w-64">
              <div className="label-mono mb-2">// ai_diagnose v2.1</div>
              <div className="font-mono text-xs leading-relaxed">
                &gt; turbo_pressure_drop<br />
                &gt; analyzing 6 history records...<br />
                <span className="text-brand">&gt; ACİL: intercooler kaçağı</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-[1400px] px-4 md:px-8 py-20 text-center">
        <h2 className="font-heading text-4xl sm:text-5xl font-black uppercase tracking-tighter mb-4">
          Aracınız İçin <span className="text-brand">Hazırız.</span>
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
          Müşteri portalımıza kayıt olun; araçlarınızı tanımlayın, randevu oluşturun, geçmiş servis kayıtlarınıza ve AI önerilerine her an erişin.
        </p>
        <div className="flex flex-wrap gap-3 justify-center">
          <Link to="/kayit" data-testid="bottom-cta-register" className="bg-brand text-white px-6 py-4 font-heading font-bold uppercase tracking-wider hover:bg-brand-dark transition-colors">
            Ücretsiz Kayıt
          </Link>
          <Link to="/giris" data-testid="bottom-cta-login" className="border border-border px-6 py-4 font-heading font-bold uppercase tracking-wider hover:border-brand hover:text-brand transition-colors">
            Giriş Yap
          </Link>
        </div>
      </section>

      <ServiceSectionPanel section={selected} onClose={() => setSelected(null)} />
    </div>
  );
}
