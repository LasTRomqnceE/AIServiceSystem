import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "sonner";
import "./App.css";

import { AuthProvider } from "./lib/auth";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";

import Home from "./pages/Home";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Appointments from "./pages/Appointments";
import ServiceHistory from "./pages/ServiceHistory";
import AIAssistant from "./pages/AIAssistant";
import Admin from "./pages/Admin";

// init theme before render
(() => {
  const t = localStorage.getItem("hv_theme") || "dark";
  if (t === "dark") document.documentElement.classList.add("dark");
})();

function Shell({ children }) {
  return (
    <div className="App flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Shell>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/hizmetler" element={<Services />} />
            <Route path="/iletisim" element={<Contact />} />
            <Route path="/giris" element={<Login />} />
            <Route path="/kayit" element={<Register />} />
            <Route path="/panel" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/randevular" element={<ProtectedRoute><Appointments /></ProtectedRoute>} />
            <Route path="/servis-gecmisi" element={<ProtectedRoute><ServiceHistory /></ProtectedRoute>} />
            <Route path="/ai-asistan" element={<ProtectedRoute><AIAssistant /></ProtectedRoute>} />
            <Route path="/yonetim" element={<ProtectedRoute adminOnly><Admin /></ProtectedRoute>} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Shell>
        <Toaster position="top-right" theme="dark" />
      </BrowserRouter>
    </AuthProvider>
  );
}
