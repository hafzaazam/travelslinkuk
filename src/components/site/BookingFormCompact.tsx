import { useState } from "react";
import { Calendar, CreditCard, Landmark, CheckCircle2, Copy, Send } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import type { BookingSettings } from "@/hooks/useBookingSettings";

const SERVICES = [
  "Student Visa",
  "Skilled Worker Visa",
  "Visitor Visa",
  "Family / Spouse Visa",
  "Business / Innovator Visa",
  "Settlement / ILR",
  "Other",
];

const schema = z.object({
  full_name: z.string().trim().min(2, "Please enter your full name").max(120),
  email: z.string().trim().email("Enter a valid email").max(255),
  phone: z.string().trim().max(40).optional(),
  service: z.string().max(80).optional(),
  preferred_date: z.string().max(20).optional(),
  preferred_time: z.string().max(20).optional(),
  message: z.string().trim().max(1500).optional(),
});

export function BookingFormCompact({ settings }: { settings: BookingSettings }) {
  const [method, setMethod] = useState<"direct" | "bank_transfer">("direct");
  const [saving, setSaving] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    full_name: "", email: "", phone: "", service: "",
    preferred_date: "", preferred_time: "", message: "",
    transaction_reference: "", transaction_date: "", amount: "",
  });

  const copy = (text: string) =>
    navigator.clipboard.writeText(text).then(() => toast.success("Copied"));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse(form);
    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message || "Please check the form");
      return;
    }
    if (method === "bank_transfer" && !form.transaction_reference.trim()) {
      toast.error("Please add the transaction reference so we can verify your payment");
      return;
    }
    setSaving(true);
    const payload = {
      full_name: form.full_name.trim(),
      email: form.email.trim(),
      phone: form.phone.trim() || null,
      service: form.service || null,
      preferred_date: form.preferred_date || null,
      preferred_time: form.preferred_time || null,
      message: form.message.trim() || null,
      payment_method: method,
      transaction_reference: method === "bank_transfer" ? form.transaction_reference.trim() || null : null,
      transaction_date: method === "bank_transfer" ? (form.transaction_date || null) : null,
      amount: method === "bank_transfer" && form.amount ? Number(form.amount) : settings.consultation_fee ?? null,
      currency: settings.currency ?? "GBP",
      payment_status: method === "direct" ? "not_required" : "pending",
    };
    const { error } = await supabase.from("bookings" as never).insert(payload as never);
    setSaving(false);
    if (error) {
      toast.error(error.message || "Could not submit booking");
      return;
    }
    toast.success("Booking submitted — we'll be in touch shortly.");
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="rounded-3xl glass shadow-glow p-8 text-center">
        <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-gradient-brand text-white shadow-glow">
          <CheckCircle2 className="h-8 w-8" />
        </div>
        <h3 className="mt-5 font-display text-2xl font-bold">Booking received</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          We'll confirm your consultation slot within one business day.
        </p>
        <button
          type="button"
          onClick={() => setSubmitted(false)}
          className="mt-6 inline-flex items-center gap-2 rounded-xl border border-primary/30 bg-white px-5 py-2.5 text-sm font-semibold text-primary hover:bg-primary/5 transition"
        >
          Book another
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="rounded-3xl glass shadow-glow p-6 sm:p-8 space-y-5">
      <div className="flex items-center gap-2">
        <Calendar className="h-5 w-5 text-primary" />
        <h3 className="font-display text-lg font-bold">Book a consultation</h3>
        {settings.consultation_fee > 0 && (
          <span className="ml-auto text-xs font-semibold rounded-full bg-primary/10 text-primary px-2.5 py-1">
            {settings.currency} {settings.consultation_fee}
          </span>
        )}
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="Full name *" value={form.full_name} onChange={(v) => setForm({ ...form, full_name: v })} />
        <Field label="Email *" type="email" value={form.email} onChange={(v) => setForm({ ...form, email: v })} />
        <Field label="Phone / WhatsApp" value={form.phone} onChange={(v) => setForm({ ...form, phone: v })} />
        <Select label="Service" value={form.service} onChange={(v) => setForm({ ...form, service: v })} options={SERVICES} />
        <Field label="Preferred date" type="date" value={form.preferred_date} onChange={(v) => setForm({ ...form, preferred_date: v })} />
        <Field label="Preferred time" type="time" value={form.preferred_time} onChange={(v) => setForm({ ...form, preferred_time: v })} />
      </div>

      <label className="block">
        <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Message (optional)</span>
        <textarea
          rows={3}
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          placeholder="Anything we should know before the call?"
          className="mt-1.5 w-full rounded-xl border border-border bg-white px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/40"
        />
      </label>

      <div>
        <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">Payment method</div>
        <div className="grid sm:grid-cols-2 gap-3">
          <MethodCard
            selected={method === "direct"}
            onSelect={() => setMethod("direct")}
            icon={<CreditCard className="h-4 w-4" />}
            title="Pay directly"
            desc="Settle on the call."
          />
          <MethodCard
            selected={method === "bank_transfer"}
            onSelect={() => setMethod("bank_transfer")}
            icon={<Landmark className="h-4 w-4" />}
            title="Bank transfer"
            desc="Pre-pay & share ref."
          />
        </div>
      </div>

      {method === "bank_transfer" && (
        <div className="space-y-4">
          <div className="rounded-2xl border border-border bg-white/70 p-4 text-sm space-y-1.5">
            {settings.bank_name && <BankRow label="Bank" value={settings.bank_name} onCopy={copy} />}
            {settings.account_name && <BankRow label="Account name" value={settings.account_name} onCopy={copy} />}
            {settings.account_number && <BankRow label="Account number" value={settings.account_number} onCopy={copy} />}
            {settings.sort_code && <BankRow label="Sort code" value={settings.sort_code} onCopy={copy} />}
            {settings.iban && <BankRow label="IBAN" value={settings.iban} onCopy={copy} />}
            {settings.swift && <BankRow label="SWIFT" value={settings.swift} onCopy={copy} />}
            {settings.payment_notes && (
              <p className="text-xs text-muted-foreground pt-2">{settings.payment_notes}</p>
            )}
          </div>
          <div className="grid sm:grid-cols-3 gap-4">
            <Field label="Transaction ref *" value={form.transaction_reference} onChange={(v) => setForm({ ...form, transaction_reference: v })} placeholder="e.g. FT2401234567" />
            <Field label="Date" type="date" value={form.transaction_date} onChange={(v) => setForm({ ...form, transaction_date: v })} />
            <Field label={`Amount (${settings.currency})`} type="number" value={form.amount} onChange={(v) => setForm({ ...form, amount: v })} placeholder={String(settings.consultation_fee)} />
          </div>
        </div>
      )}

      <button
        type="submit"
        disabled={saving}
        className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-brand px-6 py-3.5 text-sm font-semibold text-white shadow-glow hover:translate-y-[-1px] transition disabled:opacity-70"
      >
        {saving ? "Submitting…" : "Confirm booking"} <Send className="h-4 w-4" />
      </button>
    </form>
  );
}

function Field({ label, value, onChange, type = "text", placeholder }: { label: string; value: string; onChange: (v: string) => void; type?: string; placeholder?: string }) {
  return (
    <label className="block">
      <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{label}</span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="mt-1.5 w-full rounded-xl border border-border bg-white px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/40"
      />
    </label>
  );
}

function Select({ label, value, onChange, options }: { label: string; value: string; onChange: (v: string) => void; options: string[] }) {
  return (
    <label className="block">
      <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1.5 w-full rounded-xl border border-border bg-white px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/40"
      >
        <option value="">Select…</option>
        {options.map((o) => <option key={o} value={o}>{o}</option>)}
      </select>
    </label>
  );
}

function MethodCard({ selected, onSelect, icon, title, desc }: { selected: boolean; onSelect: () => void; icon: React.ReactNode; title: string; desc: string }) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`text-left rounded-2xl border p-4 transition ${selected ? "border-primary bg-primary/5 shadow-glow" : "border-border bg-white hover:border-primary/40"}`}
    >
      <div className="flex items-center gap-2 text-sm font-semibold">
        <span className="grid h-7 w-7 place-items-center rounded-lg bg-gradient-brand text-white">{icon}</span>
        {title}
      </div>
      <p className="mt-1.5 text-xs text-muted-foreground">{desc}</p>
    </button>
  );
}

function BankRow({ label, value, onCopy }: { label: string; value: string; onCopy: (t: string) => void }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <span className="text-xs uppercase tracking-wider text-muted-foreground">{label}</span>
      <span className="flex items-center gap-2 font-medium">
        {value}
        <button type="button" onClick={() => onCopy(value)} className="text-primary hover:opacity-70" aria-label={`Copy ${label}`}>
          <Copy className="h-3.5 w-3.5" />
        </button>
      </span>
    </div>
  );
}
