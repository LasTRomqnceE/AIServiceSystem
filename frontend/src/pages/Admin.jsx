import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { Users, Truck, Calendar, ClipboardList, Plus, X, CheckCircle, Clock } from "lucide-react";
import { api } from "../lib/api";

const STATUS_COLORS = {
  "beklemede": "border-yellow-500/50 text-yellow-500",
  "onaylandı": "border-blue-500/50 text-blue-500",
  "tamamlandı": "border-green-500/50 text-green-500",
  "iptal": "border-red-500/50 text-red-500",
};
const STATUS_OPTIONS = ["beklemede", "onaylandı", "tamamlandı", "iptal"];

export default function Admin() {
  const [tab, setTab] = useState("dashboard");
  const [stats, setStats] = useState({});
  const [customers, setCustomers] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [appts, setAppts] = useState([]);
  const [records, setRecords] = useState([]);
  const [showRec, setShowRec] = useState(false);
  const [recForm, setRecForm] = useState({
    customer_id: "", vehicle_id: "", date: new Date().toISOString().slice(0, 10),
    repairs: "", parts_replaced: "", technician_name: "", technician_notes: "", cost: 0,
  });

  const load = async () => {
    try {
      const [s, c, v, a, r] = await Promise.all([
        api.get("/admin/stats"), api.get("/admin/customers"),
        api.get("/vehicles"), api.get("/appointments"), api.get("/service-records"),
      ]);
      setStats(s.data); setCustomers(c.data); setVehicles(v.data); setAppts(a.data); setRecords(r.data);
    } catch (e) { toast.error("Veriler yüklenemedi"); }
  };
  useEffect(() => { load(); }, []);

  const updateApptStatus = async (id, status) => {
    try { await api.patch(`/appointments/${id}`, { status }); toast.success("Durum güncellendi"); load(); }
    catch (e) { toast.error("Hata"); }
  };

  const createRecord = async (e) => {
    e.preventDefault();
    try {
      await api.post("/service-records", {
        ...recForm,
        parts_replaced: recForm.parts_replaced.split(",").map(s => s.trim()).filter(Boolean),
        cost: Number(recForm.cost),
      });
      toast.success("Servis kaydı oluşturuldu");
      setShowRec(false);
      setRecForm({ ...recForm, repairs: "", parts_replaced: "", technician_notes: "", cost: 0 });
      load();
    } catch (e) { toast.error(e?.response?.data?.detail || "Hata"); }
  };

  const filteredVehicles = recForm.customer_id ? vehicles.filter(v => v.customer_id === recForm.customer_id) : [];

  const TABS = [
    { k: "dashboard", l: "Özet" },
    { k: "customers", l: "Müşteriler" },
    { k: "vehicles", l: "Araçlar" },
    { k: "appointments", l: "Randevular" },
    { k: "records", l: "Servis Kayıtları" },
  ];

  return (
    <div className="mx-auto max-w-[1400px] px-4 md:px-8 py-10">
      <div className="label-mono mb-2">// admin kontrol paneli</div>
      <h1 className="font-heading text-4xl sm:text-5xl font-black uppercase tracking-tighter mb-8">Yönetim Paneli</h1>

      <div className="flex flex-wrap gap-1 mb-8 border-b border-border">
        {TABS.map((t) => (
          <button
            key={t.k}
            data-testid={`admin-tab-${t.k}`}
            onClick={() => setTab(t.k)}
            className={`px-4 py-3 font-heading font-bold uppercase tracking-wider text-sm border-b-2 transition-colors ${
              tab === t.k ? "border-brand text-brand" : "border-transparent hover:text-brand"
            }`}
          >
            {t.l}
          </button>
        ))}
      </div>

      {tab === "dashboard" && (
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {[
            { icon: Users, v: stats.customers || 0, l: "Müşteri" },
            { icon: Truck, v: stats.vehicles || 0, l: "Araç" },
            { icon: Calendar, v: stats.appointments || 0, l: "Randevu" },
            { icon: Clock, v: stats.pending_appointments || 0, l: "Bekleyen" },
            { icon: ClipboardList, v: stats.service_records || 0, l: "Servis Kaydı" },
          ].map((s) => (
            <div key={s.l} className="stat-block">
              <div className="flex items-start justify-between">
                <s.icon className="h-6 w-6 text-brand" />
                <span className="font-heading text-4xl font-black">{s.v}</span>
              </div>
              <div className="label-mono mt-3">{s.l}</div>
            </div>
          ))}
        </div>
      )}

      {tab === "customers" && (
        <div className="border border-border bg-card overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-secondary/50">
              <tr>{["Ad", "E-posta", "Telefon", "Kayıt"].map(h => <th key={h} className="label-mono text-left p-4">{h}</th>)}</tr>
            </thead>
            <tbody className="divide-y divide-border">
              {customers.map((c) => (
                <tr key={c.id} className="hover:bg-secondary/30">
                  <td className="p-4 font-bold">{c.name}</td>
                  <td className="p-4 font-mono text-xs">{c.email}</td>
                  <td className="p-4 font-mono text-xs">{c.phone || "—"}</td>
                  <td className="p-4 font-mono text-xs text-muted-foreground">{c.created_at?.slice(0, 10)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {tab === "vehicles" && (
        <div className="border border-border bg-card overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-secondary/50">
              <tr>{["Plaka", "Marka/Model", "Yıl", "KM", "Müşteri"].map(h => <th key={h} className="label-mono text-left p-4">{h}</th>)}</tr>
            </thead>
            <tbody className="divide-y divide-border">
              {vehicles.map((v) => (
                <tr key={v.id} className="hover:bg-secondary/30">
                  <td className="p-4 font-mono font-bold">{v.plate}</td>
                  <td className="p-4">{v.brand} {v.model}</td>
                  <td className="p-4 font-mono text-xs">{v.year}</td>
                  <td className="p-4 font-mono text-xs">{v.km.toLocaleString("tr-TR")}</td>
                  <td className="p-4 text-xs">{customers.find(c => c.id === v.customer_id)?.name || "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {tab === "appointments" && (
        <div className="border border-border bg-card overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-secondary/50">
              <tr>{["Tarih", "Müşteri", "Araç", "Şikayet", "Durum", "İşlem"].map(h => <th key={h} className="label-mono text-left p-4">{h}</th>)}</tr>
            </thead>
            <tbody className="divide-y divide-border">
              {appts.map((a) => {
                const v = vehicles.find(x => x.id === a.vehicle_id);
                const c = customers.find(x => x.id === a.customer_id);
                return (
                  <tr key={a.id} className="hover:bg-secondary/30">
                    <td className="p-4 font-mono text-xs whitespace-nowrap">{a.date} · {a.time}</td>
                    <td className="p-4 text-xs">{c?.name || "—"}</td>
                    <td className="p-4 text-xs">{v ? `${v.brand} ${v.model} (${v.plate})` : "—"}</td>
                    <td className="p-4 text-xs max-w-xs truncate">{a.issue}</td>
                    <td className="p-4"><span className={`pill ${STATUS_COLORS[a.status]}`}>{a.status}</span></td>
                    <td className="p-4">
                      <select
                        value={a.status} onChange={(e) => updateApptStatus(a.id, e.target.value)}
                        data-testid={`admin-status-${a.id}`}
                        className="bg-card border border-border focus:border-brand outline-none px-2 py-1 font-mono text-xs"
                      >
                        {STATUS_OPTIONS.map(s => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {tab === "records" && (
        <div>
          <div className="flex justify-end mb-4">
            <button
              onClick={() => setShowRec(true)} data-testid="admin-new-record-btn"
              className="inline-flex items-center gap-2 bg-brand text-white px-4 py-2 text-xs font-bold uppercase tracking-wider hover:bg-brand-dark"
            >
              <Plus className="h-4 w-4" /> Yeni Servis Kaydı
            </button>
          </div>
          <div className="border border-border bg-card overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-secondary/50">
                <tr>{["Tarih", "Müşteri", "Araç", "Onarım", "Teknisyen", "Maliyet"].map(h => <th key={h} className="label-mono text-left p-4">{h}</th>)}</tr>
              </thead>
              <tbody className="divide-y divide-border">
                {records.map((r) => {
                  const v = vehicles.find(x => x.id === r.vehicle_id);
                  const c = customers.find(x => x.id === r.customer_id);
                  return (
                    <tr key={r.id} className="hover:bg-secondary/30">
                      <td className="p-4 font-mono text-xs whitespace-nowrap">{r.date}</td>
                      <td className="p-4 text-xs">{c?.name || "—"}</td>
                      <td className="p-4 text-xs">{v ? `${v.brand} ${v.model}` : "—"}</td>
                      <td className="p-4 text-xs max-w-xs truncate">{r.repairs}</td>
                      <td className="p-4 text-xs">{r.technician_name}</td>
                      <td className="p-4 font-mono font-bold text-brand">{r.cost.toLocaleString("tr-TR")} ₺</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {showRec && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setShowRec(false)}>
          <div className="bg-background border border-brand max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="p-5 border-b border-border flex items-center justify-between">
              <h3 className="font-heading text-xl font-bold uppercase">Yeni Servis Kaydı</h3>
              <button onClick={() => setShowRec(false)}><X className="h-5 w-5" /></button>
            </div>
            <form onSubmit={createRecord} className="p-6 grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <label className="label-mono block mb-2">Müşteri</label>
                <select required value={recForm.customer_id}
                  onChange={(e) => setRecForm({ ...recForm, customer_id: e.target.value, vehicle_id: "" })}
                  data-testid="record-customer-select"
                  className="w-full bg-card border border-border focus:border-brand outline-none px-3 py-2 font-mono text-sm">
                  <option value="">— Müşteri Seç —</option>
                  {customers.map(c => <option key={c.id} value={c.id}>{c.name} ({c.email})</option>)}
                </select>
              </div>
              <div className="col-span-2">
                <label className="label-mono block mb-2">Araç</label>
                <select required value={recForm.vehicle_id} onChange={(e) => setRecForm({ ...recForm, vehicle_id: e.target.value })}
                  data-testid="record-vehicle-select"
                  className="w-full bg-card border border-border focus:border-brand outline-none px-3 py-2 font-mono text-sm">
                  <option value="">— Araç Seç —</option>
                  {filteredVehicles.map(v => <option key={v.id} value={v.id}>{v.brand} {v.model} ({v.plate})</option>)}
                </select>
              </div>
              <div>
                <label className="label-mono block mb-2">Tarih</label>
                <input type="date" required value={recForm.date} onChange={(e) => setRecForm({ ...recForm, date: e.target.value })}
                  className="w-full bg-card border border-border focus:border-brand outline-none px-3 py-2 font-mono text-sm" />
              </div>
              <div>
                <label className="label-mono block mb-2">Teknisyen</label>
                <input required value={recForm.technician_name} onChange={(e) => setRecForm({ ...recForm, technician_name: e.target.value })}
                  className="w-full bg-card border border-border focus:border-brand outline-none px-3 py-2 font-mono text-sm" />
              </div>
              <div className="col-span-2">
                <label className="label-mono block mb-2">Onarım Açıklaması</label>
                <textarea required rows={2} value={recForm.repairs} onChange={(e) => setRecForm({ ...recForm, repairs: e.target.value })}
                  className="w-full bg-card border border-border focus:border-brand outline-none px-3 py-2 font-mono text-sm" />
              </div>
              <div className="col-span-2">
                <label className="label-mono block mb-2">Değişen Parçalar (virgülle ayır)</label>
                <input value={recForm.parts_replaced} onChange={(e) => setRecForm({ ...recForm, parts_replaced: e.target.value })}
                  placeholder="Yağ filtresi, Balata, ..."
                  className="w-full bg-card border border-border focus:border-brand outline-none px-3 py-2 font-mono text-sm" />
              </div>
              <div className="col-span-2">
                <label className="label-mono block mb-2">Teknisyen Notları</label>
                <textarea rows={2} value={recForm.technician_notes} onChange={(e) => setRecForm({ ...recForm, technician_notes: e.target.value })}
                  className="w-full bg-card border border-border focus:border-brand outline-none px-3 py-2 font-mono text-sm" />
              </div>
              <div>
                <label className="label-mono block mb-2">Maliyet (₺)</label>
                <input type="number" min="0" required value={recForm.cost} onChange={(e) => setRecForm({ ...recForm, cost: e.target.value })}
                  className="w-full bg-card border border-border focus:border-brand outline-none px-3 py-2 font-mono text-sm" />
              </div>
              <div className="col-span-2">
                <button type="submit" data-testid="record-submit-btn"
                  className="w-full bg-brand text-white py-3 font-heading font-bold uppercase tracking-wider hover:bg-brand-dark">
                  Kaydet
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
