import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { motion } from "framer-motion";
import {
  Calendar, CreditCard, Landmark, CheckCircle2, Copy, ArrowRight,
  Sparkles, ShieldCheck, Clock,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useBookingSettings } from "@/hooks/useBookingSettings";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";

export const Route = createFileRoute("/book")({
  head: () => ({
    meta: [
      { title: "Book a Consultation — Travel Links Solution" },
      { name: "description", content: "Book a UK visa consultation with Travel Links Solution. Pay directly to your consultant or via bank transfer." },
      { property: "og:title", content: "Book a Consultation — Travel Links Solution" },
      { property: "og:description", content: "Reserve your consultation slot with Travel Links Solution's OISC-partnered advisors." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://travellinks.uk/book" },
      { property: "og:image", content: "https://travellinks.uk/__l5e/assets-v1/26637276-3809-4947-9ff5-b2c2ad5ac675/travel-suitcase.png" },
      { property: "og:image:alt", content: "Book a UK visa consultation — Travel Links Solution" },
      { name: "twitter:image", content: "https://travellinks.uk/__l5e/assets-v1/26637276-3809-4947-9ff5-b2c2ad5ac675/travel-suitcase.png" },
      { property: "og:site_name", content: "Travel Links Solution" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Book a Consultation — Travel Links Solution" },
      { name: "twitter:description", content: "Reserve your consultation slot with Travel Links Solution's OISC-partnered advisors." },
    ],
    links: [{ rel: "canonical", href: "https://travellinks.uk/book" }],
  }),
  component: BookPage,
});

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
  phone: z.string().trim().max(40).optional().or(z.literal("")),
  service: z.string().max(80).optional().or(z.literal("")),
  preferred_date: z.string().max(20).optional().or(z.literal("")),
  preferred_time: z.string().max(20).optional().or(z.literal("")),
  message: z.string().trim().max(1500).optional().or(z.literal("")),
  payment_method: z.enum(["direct", "bank_transfer"]),
  transaction_reference: z.string().trim().max(80).optional().or(z.literal("")),
  transaction_date: z.string().max(20).optional().or(z.literal("")),
  amount: z.union([z.number(), z.string()]).optional(),
});

function BookPage() {
  const { data: settings, loading } = useBookingSettings();
  const [submitted, setSubmitted] = useState(false);
  const [saving, setSaving] = useState(false);
  const [method, setMethod] = useState<"direct" | "bank_transfer">("direct");
  const [form, setForm] = useState({
    full_name: "", email: "", phone: "", service: "",
    preferred_date: "", preferred_time: "", message: "",
    transaction_reference: "", transaction_date: "", amount: "",
  });

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse({ ...form, payment_method: method });
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
      amount: method === "bank_transfer" && form.amount ? Number(form.amount) : (settings?.consultation_fee ?? null),
      currency: settings?.currency ?? "GBP",
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

  const copy = (text: string) => {
    navigator.clipboard.writeText(text).then(() => toast.success("Copied"));
  };

  return (
    <div className="min-h-screen bg-secondary/30">
      <Header />

      <main className="pt-28 pb-20">
        <div className="mx-auto max-w-6xl px-5 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-primary">
              <Sparkles className="h-3.5 w-3.5" /> Book a consultation
            </span>
            <h1 className="mt-4 font-display text-4xl md:text-5xl font-bold tracking-tight">
              Reserve your slot with our visa advisors
            </h1>
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
              Fill in your details, pick a payment method, and our team will confirm your booking within one business day.
            </p>
          </motion.div>

          {loading ? (
            <div className="mt-12 text-center text-sm text-muted-foreground">Loading…</div>
          ) : !settings?.active ? (
            <BookingClosed />
          ) : submitted ? (
            <SubmittedCard email={form.email} />
          ) : (
            <div className="mt-10 grid lg:grid-cols-[minmax(0,1fr)_360px] gap-8">
              {/* Form */}
              <motion.form
                onSubmit={submit}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.05 }}
                className="rounded-3xl border border-border bg-white p-6 md:p-8 shadow-card space-y-6"
              >
                <section>
                  <h2 className="font-display text-lg font-bold flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-primary" /> Your details
                  </h2>
                  <div className="mt-4 grid sm:grid-cols-2 gap-4">
                    <Field label="Full name *" value={form.full_name} onChange={(v) => setForm({ ...form, full_name: v })} required />
                    <Field label="Email *" type="email" value={form.email} onChange={(v) => setForm({ ...form, email: v })} required />
                    <Field label="Phone / WhatsApp" value={form.phone} onChange={(v) => setForm({ ...form, phone: v })} />
                    <Select label="Service" value={form.service} onChange={(v) => setForm({ ...form, service: v })} options={SERVICES} />
                    <Field label="Preferred date" type="date" value={form.preferred_date} onChange={(v) => setForm({ ...form, preferred_date: v })} />
                    <Field label="Preferred time" type="time" value={form.preferred_time} onChange={(v) => setForm({ ...form, preferred_time: v })} />
                    <label className="sm:col-span-2">
                      <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Message (optional)</span>
                      <textarea
                        rows={3}
                        value={form.message}
                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                        placeholder="Anything we should know before the call?"
                        className="mt-1.5 w-full rounded-xl border border-border px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/30"
                      />
                    </label>
                  </div>
                </section>

                <section>
                  <h2 className="font-display text-lg font-bold flex items-center gap-2">
                    <CreditCard className="h-5 w-5 text-primary" /> Payment method
                  </h2>
                  <div className="mt-4 grid sm:grid-cols-2 gap-3">
                    <MethodCard
                      selected={method === "direct"}
                      onSelect={() => setMethod("direct")}
                      icon={<CreditCard className="h-4 w-4" />}
                      title="Pay to consultant directly"
                      desc="Settle the fee with your consultant on the call — cash, card, or as agreed."
                    />
                    <MethodCard
                      selected={method === "bank_transfer"}
                      onSelect={() => setMethod("bank_transfer")}
                      icon={<Landmark className="h-4 w-4" />}
                      title="Pre-pay via bank transfer"
                      desc="Transfer to the account below and submit the transaction reference to confirm."
                    />
                  </div>

                  {method === "bank_transfer" && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-6 space-y-4"
                    >
                      <BankBox settings={settings} onCopy={copy} />
                      <div className="grid sm:grid-cols-3 gap-4">
                        <Field label="Transaction reference *" value={form.transaction_reference} onChange={(v) => setForm({ ...form, transaction_reference: v })} placeholder="e.g. FT2401234567" />
                        <Field label="Transaction date" type="date" value={form.transaction_date} onChange={(v) => setForm({ ...form, transaction_date: v })} />
                        <Field label={`Amount (${settings.currency})`} type="number" value={form.amount} onChange={(v) => setForm({ ...form, amount: v })} placeholder={String(settings.consultation_fee)} />
                      </div>
                    </motion.div>
                  )}
                </section>

                <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-border">
                  <p className="text-xs text-muted-foreground flex items-center gap-1.5">
                    <ShieldCheck className="h-3.5 w-3.5 text-primary" /> Your details are encrypted and only visible to our advisors.
                  </p>
                  <button
                    type="submit"
                    disabled={saving}
                    className="inline-flex items-center gap-2 rounded-xl bg-gradient-brand px-6 py-3 text-sm font-semibold text-white shadow-glow hover:-translate-y-0.5 transition disabled:opacity-60"
                  >
                    {saving ? "Submitting…" : "Submit booking"} <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </motion.form>

              {/* Sidebar */}
              <motion.aside
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="space-y-4"
              >
                <div className="rounded-3xl border border-border bg-gradient-to-br from-primary/10 to-white p-6 shadow-card">
                  <div className="text-xs font-bold uppercase tracking-[0.18em] text-primary">Consultation fee</div>
                  <div className="mt-2 font-display text-4xl font-bold">
                    {settings.currency} {Number(settings.consultation_fee).toLocaleString()}
                  </div>
                  <p className="mt-2 text-xs text-muted-foreground">
                    Deductible from your full case fee if you proceed with our services.
                  </p>
                </div>
                <div className="rounded-3xl border border-border bg-white p-6 shadow-card space-y-3">
                  <InfoRow icon={<Clock className="h-4 w-4" />} title="Confirmation" text="Within 1 business day by email." />
                  <InfoRow icon={<ShieldCheck className="h-4 w-4" />} title="Refund" text="Full refund if we can't accommodate your slot." />
                  <InfoRow icon={<Sparkles className="h-4 w-4" />} title="Expert advisors" text="OISC-partnered qualified consultants." />
                </div>
              </motion.aside>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}

function BookingClosed() {
  return (
    <div className="mt-12 max-w-xl mx-auto rounded-3xl border border-border bg-white p-8 shadow-card text-center">
      <div className="mx-auto h-12 w-12 rounded-2xl bg-primary/10 grid place-items-center text-primary">
        <Clock className="h-6 w-6" />
      </div>
      <h2 className="mt-4 font-display text-xl font-bold">Bookings are currently closed</h2>
      <p className="mt-2 text-sm text-muted-foreground">
        Our booking calendar is temporarily unavailable. Please get in touch and we'll arrange a consultation for you.
      </p>
      <Link
        to="/contact"
        className="mt-6 inline-flex items-center gap-2 rounded-xl bg-gradient-brand px-5 py-2.5 text-sm font-semibold text-white shadow-glow"
      >
        Contact us <ArrowRight className="h-4 w-4" />
      </Link>
    </div>
  );
}

function SubmittedCard({ email }: { email: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      className="mt-12 max-w-xl mx-auto rounded-3xl border border-border bg-white p-8 shadow-card text-center"
    >
      <div className="mx-auto h-12 w-12 rounded-2xl bg-green-100 grid place-items-center text-green-600">
        <CheckCircle2 className="h-6 w-6" />
      </div>
      <h2 className="mt-4 font-display text-2xl font-bold">Booking received</h2>
      <p className="mt-2 text-sm text-muted-foreground">
        Thanks — we've sent a confirmation to <span className="font-semibold text-foreground">{email}</span>.
        Our team will verify and reply within one business day.
      </p>
      <Link to="/" className="mt-6 inline-flex items-center gap-2 rounded-xl border border-border bg-white px-5 py-2.5 text-sm font-semibold hover:bg-secondary">
        Back to home
      </Link>
    </motion.div>
  );
}

function MethodCard({ selected, onSelect, icon, title, desc }: { selected: boolean; onSelect: () => void; icon: React.ReactNode; title: string; desc: string }) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`text-left rounded-2xl border-2 p-4 transition ${
        selected ? "border-primary bg-primary/5 shadow-glow/40" : "border-border bg-white hover:border-primary/40"
      }`}
    >
      <div className="flex items-center gap-2">
        <div className={`h-8 w-8 rounded-lg grid place-items-center ${selected ? "bg-primary text-white" : "bg-secondary text-foreground"}`}>{icon}</div>
        <span className="font-display font-bold text-sm">{title}</span>
      </div>
      <p className="mt-2 text-xs text-muted-foreground">{desc}</p>
    </button>
  );
}

function BankBox({ settings, onCopy }: { settings: NonNullable<ReturnType<typeof useBookingSettings>["data"]>; onCopy: (t: string) => void }) {
  const items: Array<[string, string | null]> = [
    ["Bank", settings.bank_name],
    ["Account name", settings.account_name],
    ["Account number", settings.account_number],
    ["Sort code", settings.sort_code],
    ["IBAN", settings.iban],
    ["SWIFT / BIC", settings.swift],
  ];
  const shown = items.filter(([, v]) => !!v);
  if (!shown.length) {
    return (
      <div className="rounded-2xl border border-dashed border-border p-4 text-sm text-muted-foreground">
        Bank details will be provided by email after you submit — please still fill in the transaction fields once you've paid.
      </div>
    );
  }
  return (
    <div className="rounded-2xl border border-border bg-gradient-to-br from-secondary to-white p-5">
      <div className="text-xs font-bold uppercase tracking-[0.18em] text-primary mb-3">Bank details</div>
      <dl className="grid sm:grid-cols-2 gap-3">
        {shown.map(([k, v]) => (
          <div key={k} className="rounded-xl bg-white border border-border px-3 py-2">
            <dt className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">{k}</dt>
            <dd className="mt-0.5 flex items-center justify-between gap-2">
              <span className="font-mono text-sm truncate">{v}</span>
              <button type="button" onClick={() => onCopy(v!)} className="text-muted-foreground hover:text-primary shrink-0" aria-label={`Copy ${k}`}>
                <Copy className="h-3.5 w-3.5" />
              </button>
            </dd>
          </div>
        ))}
      </dl>
      {settings.payment_notes && (
        <p className="mt-4 text-xs text-muted-foreground border-t border-border pt-3">{settings.payment_notes}</p>
      )}
    </div>
  );
}

function Field({ label, value, onChange, type = "text", required, placeholder }: { label: string; value: string; onChange: (v: string) => void; type?: string; required?: boolean; placeholder?: string }) {
  return (
    <label className="block">
      <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{label}</span>
      <input
        type={type}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="mt-1.5 w-full rounded-xl border border-border px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/30"
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
        className="mt-1.5 w-full rounded-xl border border-border px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/30 bg-white"
      >
        <option value="">Select…</option>
        {options.map((o) => <option key={o} value={o}>{o}</option>)}
      </select>
    </label>
  );
}

function InfoRow({ icon, title, text }: { icon: React.ReactNode; title: string; text: string }) {
  return (
    <div className="flex items-start gap-3">
      <div className="h-8 w-8 shrink-0 rounded-lg bg-primary/10 grid place-items-center text-primary">{icon}</div>
      <div>
        <div className="text-sm font-semibold">{title}</div>
        <div className="text-xs text-muted-foreground">{text}</div>
      </div>
    </div>
  );
}
