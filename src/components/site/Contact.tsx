import { useEffect, useRef, useState } from "react";
import { Mail, Phone, MapPin, Send, CheckCircle2 } from "lucide-react";
import { z } from "zod";
import { SectionHeading } from "./Section";
import { toast } from "sonner";
import { useForm } from "@formspree/react";
import { supabase } from "@/integrations/supabase/client";

const schema = z.object({
  name: z.string().trim().min(2, "Enter your name").max(100),
  phone: z.string().trim().min(6, "Enter a valid phone").max(30),
  email: z.string().trim().email("Invalid email").max(255),
  country: z.string().trim().min(2).max(80),
  visa: z.string().trim().min(2).max(80),
  message: z.string().trim().max(1000).optional(),
});

export function Contact() {
  const [state, handleFormspreeSubmit] = useForm("xvzjreol");
  const formRef = useRef<HTMLFormElement>(null);
  const [submitted, setSubmitted] = useState(false);
  const [saving, setSaving] = useState(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (submitted || saving) return;
    const form = e.currentTarget;
    const fd = new FormData(form);
    const data = Object.fromEntries(fd.entries());
    const parsed = schema.safeParse(data);
    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? "Please check the form");
      return;
    }
    const subject = `${parsed.data.country} · ${parsed.data.visa}`;
    const messageBody = parsed.data.message?.trim()
      ? parsed.data.message
      : `Interested in ${parsed.data.visa} visa for ${parsed.data.country}.`;

    // Save to backend so the admin panel can manage the enquiry.
    const { error: dbError } = await supabase.from("contact_submissions").insert({
      name: parsed.data.name,
      email: parsed.data.email,
      phone: parsed.data.phone,
      subject,
      message: messageBody,
    });
    if (dbError) {
      toast.error("Could not save your enquiry. Please try again.");
      return;
    }

    // Mark success based on DB save; email notification is best-effort.
    setSubmitted(true);
    formRef.current?.reset();
    toast.success("Application received! We'll be in touch within 24 hours.");

    // Also notify the team via Formspree email (non-blocking).
    handleFormspreeSubmit({
      name: parsed.data.name,
      email: parsed.data.email,
      phone: parsed.data.phone,
      country: parsed.data.country,
      visa: parsed.data.visa,
      subject,
      message: messageBody,
      _subject: subject,
    }).catch(() => {});
  };

  useEffect(() => {
    if (state.errors) {
      // Email side failed but the enquiry was still saved.
      console.warn("Formspree notification failed", state.errors);
    }
  }, [state.errors]);

  const loading = state.submitting;
  const lockSubmit = submitted || loading;




  return (
    <section id="contact" className="py-24 px-5 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Get in Touch"
          title={<>Start your visa journey <span className="text-gradient-brand">today</span></>}
          description="Tell us about your goals and we'll get back within 24 hours with a tailored plan."
        />

        <div className="mt-14 grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Map + info */}
          <div className="space-y-6">
            <div className="overflow-hidden rounded-3xl shadow-card border border-border h-80">
              <iframe
                title="Office location"
                src="https://www.google.com/maps?q=138%20Milton%20Street%2C%20Northampton%2C%20NN2%207DE&output=embed"
                className="h-full w-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            <div className="grid sm:grid-cols-3 gap-4">
              {[
                { icon: MapPin, label: "Office", value: "138 Milton Street, Northampton, NN2 7DE" },
                { icon: Mail, label: "Email", value: "info@travellinks.uk" },
                { icon: Phone, label: "Phone", value: "+44 787 946 5341" },
              ].map(({ icon: Icon, label, value }) => (
                <div key={label} className="rounded-2xl bg-white border border-border p-5 shadow-soft">
                  <div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-brand text-white">
                    <Icon className="h-4.5 w-4.5" />
                  </div>
                  <div className="mt-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">{label}</div>
                  <div className="text-sm font-medium break-words">{value}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Form */}
          <div className="relative">
            <form
              ref={formRef}
              onSubmit={onSubmit}
              onInput={() => submitted && setSubmitted(false)}
              className={`rounded-3xl glass shadow-glow p-6 sm:p-8 space-y-4 transition-opacity ${submitted ? "opacity-40 pointer-events-none" : ""}`}
              aria-hidden={submitted}
            >
              <div className="grid sm:grid-cols-2 gap-4">
                <Field name="name" label="Full Name" placeholder="Jane Doe" />
                <Field name="phone" label="Phone" placeholder="+44 ..." />
              </div>
              <Field name="email" type="email" label="Email" placeholder="you@example.com" />
              <div className="grid sm:grid-cols-2 gap-4">
                <Field name="country" label="Country Interested" placeholder="e.g. Canada" />
                <Field name="visa" label="Visa Type" placeholder="e.g. Student" />
              </div>
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Message</label>
                <textarea
                  name="message"
                  rows={4}
                  placeholder="Tell us briefly about your goal…"
                  className="mt-1.5 w-full rounded-xl border border-border bg-white px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/40"
                />
              </div>
              <button
                type="submit"
                disabled={lockSubmit}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-brand px-6 py-3.5 text-sm font-semibold text-white shadow-glow hover:translate-y-[-1px] transition disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loading ? "Sending…" : submitted ? "Submitted" : "Apply Now"} <Send className="h-4 w-4" />
              </button>
            </form>

            {submitted && (
              <div
                role="status"
                aria-live="polite"
                className="absolute inset-0 grid place-items-center rounded-3xl bg-white/95 backdrop-blur-md border border-border shadow-glow p-8 animate-fade-up"
              >
                <div className="text-center max-w-sm">
                  <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-gradient-brand text-white shadow-glow">
                    <CheckCircle2 className="h-8 w-8" />
                  </div>
                  <h3 className="mt-5 font-display text-2xl font-bold">Application received</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Thanks — our visa team will review your details and reach out within 24 hours.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(false);
                      formRef.current?.reset();
                      requestAnimationFrame(() =>
                        formRef.current?.querySelector<HTMLInputElement>("input[name=name]")?.focus()
                      );
                    }}
                    className="mt-6 inline-flex items-center gap-2 rounded-xl border border-primary/30 bg-white px-5 py-2.5 text-sm font-semibold text-primary hover:bg-primary/5 transition"
                  >
                    Submit another enquiry
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({ name, label, type = "text", placeholder }: { name: string; label: string; type?: string; placeholder?: string }) {
  return (
    <div>
      <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{label}</label>
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        className="mt-1.5 w-full rounded-xl border border-border bg-white px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/40"
      />
    </div>
  );
}
