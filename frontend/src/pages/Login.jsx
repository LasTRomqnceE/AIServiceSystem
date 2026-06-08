import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { toast } from "sonner";
import { Truck, ArrowRight } from "lucide-react";
import { useAuth } from "../lib/auth";

const BG = "https://images.unsplash.com/photo-1551522435-a13afa10f103?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA2MDV8MHwxfHNlYXJjaHwxfHxhdXRvbW90aXZlJTIwZ2FyYWdlJTIwaW50ZXJpb3J8ZW58MHx8fHwxNzgwOTIwMjY4fDA&ixlib=rb-4.1.0&q=85";

export default function Login() {
  const { login, loading } = useAuth();
  const nav = useNavigate();
  const loc = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    try {
      const user = await login(email, password);
      toast.success(`Hoş geldiniz, ${user.name}`);
      const dest = loc.state?.from || (user.role === "admin" ? "/yonetim" : "/panel");
      nav(dest, { replace: true });
    } catch (err) {
      toast.error(err?.response?.data?.detail || "Giriş başarısız");
    }
  };

  return (
    <div className="grid lg:grid-cols-2 min-h-[calc(100vh-4rem)]">
      <div className="relative hidden lg:block">
        <img src={BG} alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-br from-black/85 via-black/60 to-brand/30" />
        <div className="relative p-12 flex flex-col justify-between h-full text-white">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center bg-brand"><Truck className="h-5 w-5" /></div>
            <span className="font-heading text-xl font-black">TRUCK SERVİS</span>
          </div>
          <div>
            <div className="label-mono text-white/70 mb-3">// güvenli erişim</div>
            <h2 className="font-heading text-5xl font-black uppercase leading-none">
              Müşteri<br /><span className="text-brand">Portalı</span>
            </h2>
            <p className="mt-4 text-white/70 max-w-md">Araç filonuzu, randevularınızı ve AI önerilerinizi tek panelden yönetin.</p>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center p-6 md:p-12 bg-background">
        <div className="w-full max-w-md">
          <div className="label-mono mb-3">Giriş Yap</div>
          <h1 className="font-heading text-4xl font-black uppercase tracking-tighter mb-2">Tekrar Hoş Geldin</h1>
          <p className="text-sm text-muted-foreground mb-8">Hesabınız yoksa <Link to="/kayit" className="text-brand font-bold underline">ücretsiz kayıt</Link> olun.</p>

          <form onSubmit={submit} className="space-y-5">
            <div>
              <label className="label-mono block mb-2">E-posta</label>
              <input
                type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
                data-testid="login-email-input"
                className="w-full bg-card border border-border focus:border-brand outline-none px-4 py-3 font-mono text-sm"
                placeholder="ornek@firma.com"
              />
            </div>
            <div>
              <label className="label-mono block mb-2">Şifre</label>
              <input
                type="password" required value={password} onChange={(e) => setPassword(e.target.value)}
                data-testid="login-password-input"
                className="w-full bg-card border border-border focus:border-brand outline-none px-4 py-3 font-mono text-sm"
                placeholder="••••••••"
              />
            </div>
            <button
              type="submit" disabled={loading}
              data-testid="login-submit-btn"
              className="w-full bg-brand text-white py-4 font-heading font-bold uppercase tracking-wider hover:bg-brand-dark transition-colors disabled:opacity-50 inline-flex items-center justify-center gap-2"
            >
              {loading ? "Giriş yapılıyor..." : (<>Giriş Yap <ArrowRight className="h-4 w-4" /></>)}
            </button>
          </form>

          <div className="mt-8 border border-border p-4 bg-card">
            <div className="label-mono mb-2">Demo Hesaplar</div>
            <div className="font-mono text-xs space-y-1 text-muted-foreground">
              <div>Müşteri: musteri@truckservis.com / Musteri123!</div>
              <div>Yönetici: admin@truckservis.com / Admin123!</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
