import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Truck, Menu, X, LogOut } from "lucide-react";
import { useAuth } from "../lib/auth";
import ThemeToggle from "./ThemeToggle";

const NAV_PUBLIC = [
  { to: "/", label: "Ana Sayfa", testid: "nav-home" },
  { to: "/hizmetler", label: "Hizmetler", testid: "nav-services" },
  { to: "/iletisim", label: "İletişim", testid: "nav-contact" },
];

const NAV_CUSTOMER = [
  { to: "/panel", label: "Müşteri Paneli", testid: "nav-dashboard" },
  { to: "/randevular", label: "Randevular", testid: "nav-appointments" },
  { to: "/servis-gecmisi", label: "Servis Geçmişi", testid: "nav-history" },
  { to: "/ai-asistan", label: "AI Asistan", testid: "nav-ai" },
];

const NAV_ADMIN = [
  { to: "/yonetim", label: "Yönetim Paneli", testid: "nav-admin" },
];

export default function Header() {
  const { user, logout } = useAuth();
  const nav = useNavigate();
  const [open, setOpen] = useState(false);

  const items = user
    ? (user.role === "admin"
        ? [...NAV_CUSTOMER, ...NAV_ADMIN]
        : NAV_CUSTOMER)
    : NAV_PUBLIC;

  const handleLogout = () => { logout(); nav("/"); };

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-[1400px] items-center justify-between px-4 md:px-8 h-16">
        <Link to="/" data-testid="brand-link" className="flex items-center gap-3 group">
          <div className="flex h-9 w-9 items-center justify-center bg-brand text-white">
            <Truck className="h-5 w-5" strokeWidth={2.5} />
          </div>
          <div className="flex flex-col leading-none">
            <span className="font-heading text-lg font-black tracking-tighter">TRUCK SERVİS</span>
            <span className="label-mono">AĞIR VASITA YÖNETİM SİSTEMİ</span>
          </div>
        </Link>

        <nav className="hidden lg:flex items-center gap-1">
          {items.map((it) => (
            <NavLink
              key={it.to}
              to={it.to}
              data-testid={it.testid}
              className={({ isActive }) =>
                `px-3 py-2 text-sm font-heading font-bold uppercase tracking-wider border-b-2 transition-colors ${
                  isActive ? "border-brand text-brand" : "border-transparent hover:text-brand"
                }`
              }
            >
              {it.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-2">
          <ThemeToggle />
          {user ? (
            <>
              <span className="label-mono hidden xl:block">{user.name}</span>
              <button
                data-testid="logout-btn"
                onClick={handleLogout}
                className="inline-flex items-center gap-2 border border-border px-3 py-2 text-sm font-bold uppercase tracking-wider hover:border-brand hover:text-brand transition-colors"
              >
                <LogOut className="h-4 w-4" /> Çıkış
              </button>
            </>
          ) : (
            <>
              <Link
                to="/giris"
                data-testid="header-login-btn"
                className="border border-border px-4 py-2 text-sm font-bold uppercase tracking-wider hover:border-brand hover:text-brand transition-colors"
              >
                Giriş
              </Link>
              <Link
                to="/kayit"
                data-testid="header-register-btn"
                className="bg-brand text-white px-4 py-2 text-sm font-bold uppercase tracking-wider hover:bg-brand-dark transition-colors"
              >
                Kayıt Ol
              </Link>
            </>
          )}
        </div>

        <button
          onClick={() => setOpen(!open)}
          data-testid="mobile-menu-btn"
          className="lg:hidden inline-flex h-9 w-9 items-center justify-center border border-border"
          aria-label="Menü"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden border-t border-border bg-background">
          <div className="px-4 py-4 flex flex-col gap-2">
            {items.map((it) => (
              <NavLink
                key={it.to}
                to={it.to}
                data-testid={`mobile-${it.testid}`}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `py-2 px-3 text-sm font-heading font-bold uppercase tracking-wider border-l-4 ${
                    isActive ? "border-brand text-brand" : "border-transparent"
                  }`
                }
              >
                {it.label}
              </NavLink>
            ))}
            <div className="flex items-center gap-2 pt-2 border-t border-border">
              <ThemeToggle />
              {user ? (
                <button onClick={handleLogout} data-testid="mobile-logout-btn" className="flex-1 border border-border px-3 py-2 text-sm font-bold uppercase">
                  Çıkış Yap
                </button>
              ) : (
                <>
                  <Link to="/giris" onClick={() => setOpen(false)} className="flex-1 border border-border px-3 py-2 text-sm font-bold uppercase text-center">Giriş</Link>
                  <Link to="/kayit" onClick={() => setOpen(false)} className="flex-1 bg-brand text-white px-3 py-2 text-sm font-bold uppercase text-center">Kayıt</Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
