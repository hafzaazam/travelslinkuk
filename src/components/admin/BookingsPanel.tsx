import { useEffect, useState, useCallback } from "react";
import { toast } from "sonner";
import {
  Save, RefreshCw, Check, X, Trash2, Landmark, Calendar,
  Mail, Phone, CreditCard, Clock, Filter, Search,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { invalidateBookingSettingsCache, type BookingSettings, DEFAULT_BOOKING_SETTINGS } from "@/hooks/useBookingSettings";

type Booking = {
  id: string;
  full_name: string;
  email: string;
  phone: string | null;
  service: string | null;
  preferred_date: string | null;
  preferred_time: string | null;
  message: string | null;
  payment_method: "direct" | "bank_transfer";
  transaction_reference: string | null;
  transaction_date: string | null;
  amount: number | null;
  currency: string | null;
  payment_status: "pending" | "verified" | "rejected" | "not_required";
  booking_status: "new" | "confirmed" | "cancelled" | "completed";
  admin_notes: string | null;
  created_at: string;
};

export function BookingsPanel() {
  return (
    <div className="space-y-8">
      <BookingSettingsCard />
      <BookingsList />
    </div>
  );
}

/* ---------------- Settings ---------------- */
function BookingSettingsCard() {
  const [form, setForm] = useState<BookingSettings>(DEFAULT_BOOKING_SETTINGS);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [id, setId] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    const { data } = await supabase.from("booking_settings" as never).select("*").limit(1).maybeSingle();
    if (data) {
      const row = data as unknown as BookingSettings & { id: string };
      setId(row.id);
      setForm({ ...DEFAULT_BOOKING_SETTINGS, ...row });
    }
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const payload = {
      active: form.active,
      consultation_fee: Number(form.consultation_fee) || 0,
      currency: form.currency || "GBP",
      bank_name: form.bank_name || null,
      account_name: form.account_name || null,
      account_number: form.account_number || null,
      sort_code: form.sort_code || null,
      iban: form.iban || null,
      swift: form.swift || null,
      reference_prefix: form.reference_prefix || null,
      payment_notes: form.payment_notes || null,
      singleton: true,
    };
    const { error } = id
      ? await supabase.from("booking_settings" as never).update(payload as never).eq("id", id)
      : await supabase.from("booking_settings" as never).insert(payload as never);
    setSaving(false);
    if (error) return toast.error(error.message || "Save failed");
    invalidateBookingSettingsCache();
    toast.success("Booking settings saved");
    load();
  };

  if (loading) return <div className="text-sm text-muted-foreground">Loading settings…</div>;

  return (
    <form onSubmit={save} className="rounded-3xl border border-border bg-white p-6 shadow-card">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h2 className="font-display text-lg font-bold flex items-center gap-2">
            <Landmark className="h-5 w-5 text-primary" /> Booking configuration
          </h2>
          <p className="text-xs text-muted-foreground mt-1">Toggle the booking page, set the fee, and manage bank details for pre-payment.</p>
        </div>
        <label className={`inline-flex items-center gap-3 rounded-xl border px-4 py-2 cursor-pointer transition ${form.active ? "border-primary bg-primary/5" : "border-border bg-white"}`}>
          <span className="text-sm font-semibold">{form.active ? "Bookings are OPEN" : "Bookings are CLOSED"}</span>
          <input type="checkbox" className="sr-only" checked={form.active} onChange={(e) => setForm({ ...form, active: e.target.checked })} />
          <span className={`relative inline-block h-5 w-9 rounded-full transition ${form.active ? "bg-primary" : "bg-muted"}`}>
            <span className={`absolute top-0.5 h-4 w-4 rounded-full bg-white shadow transition ${form.active ? "left-4" : "left-0.5"}`} />
          </span>
        </label>
      </div>

      <div className="mt-6 grid md:grid-cols-3 gap-4">
        <TextField label="Consultation fee" type="number" value={String(form.consultation_fee)} onChange={(v) => setForm({ ...form, consultation_fee: Number(v) || 0 })} />
        <TextField label="Currency" value={form.currency} onChange={(v) => setForm({ ...form, currency: v.toUpperCase() })} />
        <TextField label="Reference prefix" value={form.reference_prefix ?? ""} onChange={(v) => setForm({ ...form, reference_prefix: v })} placeholder="TL" />
      </div>

      <h3 className="mt-8 text-xs font-bold uppercase tracking-[0.18em] text-primary">Bank details (shown to users choosing bank transfer)</h3>
      <div className="mt-3 grid md:grid-cols-2 gap-4">
        <TextField label="Bank name" value={form.bank_name ?? ""} onChange={(v) => setForm({ ...form, bank_name: v })} />
        <TextField label="Account name" value={form.account_name ?? ""} onChange={(v) => setForm({ ...form, account_name: v })} />
        <TextField label="Account number" value={form.account_number ?? ""} onChange={(v) => setForm({ ...form, account_number: v })} />
        <TextField label="Sort code" value={form.sort_code ?? ""} onChange={(v) => setForm({ ...form, sort_code: v })} />
        <TextField label="IBAN" value={form.iban ?? ""} onChange={(v) => setForm({ ...form, iban: v })} />
        <TextField label="SWIFT / BIC" value={form.swift ?? ""} onChange={(v) => setForm({ ...form, swift: v })} />
      </div>

      <label className="block mt-4">
        <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Payment notes (shown under bank details)</span>
        <textarea
          rows={2}
          value={form.payment_notes ?? ""}
          onChange={(e) => setForm({ ...form, payment_notes: e.target.value })}
          placeholder="e.g. Use your full name as the transaction reference."
          className="mt-1.5 w-full rounded-xl border border-border px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/30"
        />
      </label>

      <div className="mt-6 flex justify-end">
        <button type="submit" disabled={saving}
          className="inline-flex items-center gap-2 rounded-xl bg-gradient-brand px-5 py-2.5 text-sm font-semibold text-white shadow-glow hover:-translate-y-0.5 transition disabled:opacity-60">
          <Save className="h-4 w-4" /> {saving ? "Saving…" : "Save settings"}
        </button>
      </div>
    </form>
  );
}

/* ---------------- Bookings list ---------------- */
function BookingsList() {
  const [rows, setRows] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [q, setQ] = useState("");
  const [filter, setFilter] = useState<"all" | "pending" | "verified" | "rejected" | "new" | "confirmed" | "cancelled" | "completed">("all");
  const [openId, setOpenId] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase.from("bookings" as never).select("*").order("created_at", { ascending: false });
    if (error) toast.error(error.message);
    setRows((data as unknown as Booking[]) || []);
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  const filtered = rows.filter((r) => {
    const matchQ = !q ||
      r.full_name.toLowerCase().includes(q.toLowerCase()) ||
      r.email.toLowerCase().includes(q.toLowerCase()) ||
      (r.transaction_reference ?? "").toLowerCase().includes(q.toLowerCase());
    const matchF = filter === "all" ||
      r.payment_status === filter || r.booking_status === filter;
    return matchQ && matchF;
  });

  const updateRow = async (id: string, patch: Partial<Booking>) => {
    const { error } = await supabase.from("bookings" as never).update(patch as never).eq("id", id);
    if (error) return toast.error(error.message);
    toast.success("Updated");
    setRows((rs) => rs.map((r) => (r.id === id ? { ...r, ...patch } : r)));
  };

  const remove = async (id: string) => {
    if (!confirm("Delete this booking?")) return;
    const { error } = await supabase.from("bookings" as never).delete().eq("id", id);
    if (error) return toast.error(error.message);
    setRows((rs) => rs.filter((r) => r.id !== id));
    toast.success("Deleted");
  };

  return (
    <div className="rounded-3xl border border-border bg-white shadow-card overflow-hidden">
      <div className="p-6 border-b border-border flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="font-display text-lg font-bold flex items-center gap-2">
            <Calendar className="h-5 w-5 text-primary" /> Bookings ({rows.length})
          </h2>
          <p className="text-xs text-muted-foreground mt-1">Verify payments and moderate bookings.</p>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search name, email, ref…"
              className="pl-8 pr-3 py-2 rounded-lg border border-border text-sm outline-none focus:ring-2 focus:ring-primary/30 w-56" />
          </div>
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
            <select value={filter} onChange={(e) => setFilter(e.target.value as typeof filter)}
              className="pl-8 pr-3 py-2 rounded-lg border border-border text-sm outline-none focus:ring-2 focus:ring-primary/30 bg-white">
              <option value="all">All</option>
              <option value="pending">Payment pending</option>
              <option value="verified">Payment verified</option>
              <option value="rejected">Payment rejected</option>
              <option value="new">New booking</option>
              <option value="confirmed">Confirmed</option>
              <option value="cancelled">Cancelled</option>
              <option value="completed">Completed</option>
            </select>
          </div>
          <button onClick={load} className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-white px-3 py-2 text-xs font-semibold hover:bg-secondary">
            <RefreshCw className="h-3.5 w-3.5" /> Refresh
          </button>
        </div>
      </div>

      {loading ? (
        <div className="p-8 text-center text-sm text-muted-foreground">Loading bookings…</div>
      ) : !filtered.length ? (
        <div className="p-8 text-center text-sm text-muted-foreground">No bookings yet.</div>
      ) : (
        <ul className="divide-y divide-border">
          {filtered.map((b) => (
            <li key={b.id} className="p-5 hover:bg-secondary/40 transition">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-display font-bold">{b.full_name}</span>
                    <StatusBadge label={b.booking_status} kind="booking" />
                    <StatusBadge label={b.payment_status} kind="payment" />
                    {b.service && <span className="text-xs rounded-full bg-secondary px-2 py-0.5">{b.service}</span>}
                  </div>
                  <div className="mt-1 text-xs text-muted-foreground flex flex-wrap gap-x-4 gap-y-1">
                    <span className="inline-flex items-center gap-1"><Mail className="h-3 w-3" /> {b.email}</span>
                    {b.phone && <span className="inline-flex items-center gap-1"><Phone className="h-3 w-3" /> {b.phone}</span>}
                    {b.preferred_date && <span className="inline-flex items-center gap-1"><Calendar className="h-3 w-3" /> {b.preferred_date}{b.preferred_time ? ` · ${b.preferred_time}` : ""}</span>}
                    <span className="inline-flex items-center gap-1"><Clock className="h-3 w-3" /> {new Date(b.created_at).toLocaleString()}</span>
                    <span className="inline-flex items-center gap-1"><CreditCard className="h-3 w-3" /> {b.payment_method === "direct" ? "Pay direct" : "Bank transfer"}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => setOpenId(openId === b.id ? null : b.id)} className="rounded-lg border border-border px-3 py-1.5 text-xs font-semibold hover:bg-secondary">
                    {openId === b.id ? "Hide" : "Manage"}
                  </button>
                  <button onClick={() => remove(b.id)} className="rounded-lg border border-border px-2 py-1.5 text-xs font-semibold hover:bg-destructive/10 text-destructive" aria-label="Delete">
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>

              {openId === b.id && (
                <div className="mt-4 grid lg:grid-cols-2 gap-4 rounded-2xl border border-border bg-secondary/30 p-4">
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-[0.18em] text-primary mb-2">Message</h4>
                    <p className="text-sm whitespace-pre-wrap">{b.message || <em className="text-muted-foreground">No message.</em>}</p>

                    {b.payment_method === "bank_transfer" && (
                      <>
                        <h4 className="mt-4 text-xs font-bold uppercase tracking-[0.18em] text-primary mb-2">Payment details</h4>
                        <div className="text-sm space-y-1">
                          <div><span className="text-muted-foreground">Reference:</span> <span className="font-mono">{b.transaction_reference || "—"}</span></div>
                          <div><span className="text-muted-foreground">Date:</span> {b.transaction_date || "—"}</div>
                          <div><span className="text-muted-foreground">Amount:</span> {b.amount ? `${b.currency ?? ""} ${b.amount}` : "—"}</div>
                        </div>
                      </>
                    )}
                  </div>

                  <div className="space-y-3">
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-[0.18em] text-primary mb-2">Payment status</h4>
                      <div className="flex flex-wrap gap-2">
                        <ActionBtn active={b.payment_status === "verified"} onClick={() => updateRow(b.id, { payment_status: "verified" })} icon={<Check className="h-3.5 w-3.5" />} label="Verified" tone="ok" />
                        <ActionBtn active={b.payment_status === "pending"} onClick={() => updateRow(b.id, { payment_status: "pending" })} icon={<Clock className="h-3.5 w-3.5" />} label="Pending" tone="warn" />
                        <ActionBtn active={b.payment_status === "rejected"} onClick={() => updateRow(b.id, { payment_status: "rejected" })} icon={<X className="h-3.5 w-3.5" />} label="Rejected" tone="bad" />
                      </div>
                    </div>
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-[0.18em] text-primary mb-2">Booking status</h4>
                      <div className="flex flex-wrap gap-2">
                        <ActionBtn active={b.booking_status === "confirmed"} onClick={() => updateRow(b.id, { booking_status: "confirmed" })} icon={<Check className="h-3.5 w-3.5" />} label="Confirm" tone="ok" />
                        <ActionBtn active={b.booking_status === "completed"} onClick={() => updateRow(b.id, { booking_status: "completed" })} icon={<Check className="h-3.5 w-3.5" />} label="Complete" tone="ok" />
                        <ActionBtn active={b.booking_status === "cancelled"} onClick={() => updateRow(b.id, { booking_status: "cancelled" })} icon={<X className="h-3.5 w-3.5" />} label="Cancel" tone="bad" />
                      </div>
                    </div>
                    <label className="block">
                      <span className="text-xs font-bold uppercase tracking-[0.18em] text-primary">Admin notes</span>
                      <textarea
                        rows={2}
                        defaultValue={b.admin_notes ?? ""}
                        onBlur={(e) => e.target.value !== (b.admin_notes ?? "") && updateRow(b.id, { admin_notes: e.target.value || null })}
                        className="mt-1.5 w-full rounded-xl border border-border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/30 bg-white"
                      />
                    </label>
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function StatusBadge({ label, kind }: { label: string; kind: "booking" | "payment" }) {
  const color = ({
    new: "bg-blue-100 text-blue-700",
    confirmed: "bg-green-100 text-green-700",
    completed: "bg-emerald-100 text-emerald-700",
    cancelled: "bg-red-100 text-red-700",
    pending: "bg-amber-100 text-amber-700",
    verified: "bg-green-100 text-green-700",
    rejected: "bg-red-100 text-red-700",
    not_required: "bg-slate-100 text-slate-700",
  } as Record<string, string>)[label] ?? "bg-slate-100 text-slate-700";
  return <span className={`text-[10px] font-bold uppercase tracking-wider rounded-full px-2 py-0.5 ${color}`}>{kind === "payment" ? "pay: " : ""}{label.replace("_", " ")}</span>;
}

function ActionBtn({ active, onClick, icon, label, tone }: { active: boolean; onClick: () => void; icon: React.ReactNode; label: string; tone: "ok" | "warn" | "bad" }) {
  const bg = active
    ? tone === "ok" ? "bg-green-600 text-white border-green-600"
      : tone === "warn" ? "bg-amber-500 text-white border-amber-500"
      : "bg-red-600 text-white border-red-600"
    : "bg-white text-foreground border-border hover:bg-secondary";
  return (
    <button onClick={onClick} className={`inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-semibold transition ${bg}`}>
      {icon} {label}
    </button>
  );
}

function TextField({ label, value, onChange, type = "text", placeholder }: { label: string; value: string; onChange: (v: string) => void; type?: string; placeholder?: string }) {
  return (
    <label className="block">
      <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{label}</span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="mt-1.5 w-full rounded-xl border border-border px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/30"
      />
    </label>
  );
}
