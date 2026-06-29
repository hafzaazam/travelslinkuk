import { useEffect, useRef, useState } from "react";
import { Mail, Phone, MapPin, Send, CheckCircle2, MessageCircle, Cookie } from "lucide-react";
import { z } from "zod";
import { SectionHeading } from "./Section";
import { toast } from "sonner";
import { useForm } from "@formspree/react";
import { supabase } from "@/integrations/supabase/client";
import { openCookiePreferences } from "./CookieConsent";

const CONSENT_KEY = "tls-cookie-consent-v1";

function useFunctionalConsent() {
  const [allowed, setAllowed] = useState(false);
  useEffect(() => {
    const read = () => {
      try {
        const raw = localStorage.getItem(CONSENT_KEY);
        if (!raw) return setAllowed(false);
        const parsed = JSON.parse(raw) as { categories?: { functional?: boolean } };
        setAllowed(Boolean(parsed?.categories?.functional));
      } catch {
        setAllowed(false);
      }
    };
    read();
    const onChange = () => read();
    window.addEventListener("cookieconsent:change", onChange);
    window.addEventListener("storage", onChange);
    return () => {
      window.removeEventListener("cookieconsent:change", onChange);
      window.removeEventListener("storage", onChange);
    };
  }, []);
  return allowed;
}

function MapEmbed() {
  const allowed = useFunctionalConsent();
  if (allowed) {
    return (
      <iframe
        title="Office location"
        src="https://www.google.com/maps?q=138%20Milton%20Street%2C%20Northampton%2C%20NN2%207DE&output=embed"
        className="h-full w-full"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    );
  }
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-3 bg-secondary/50 px-6 py-8 text-center">
      <span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-brand text-white">
        <Cookie className="h-5 w-5" aria-hidden="true" />
      </span>
      <p className="max-w-sm text-sm text-muted-foreground">
        The embedded Google map is blocked until you allow <span className="font-semibold text-foreground">Functional cookies</span>. Google may set cookies and read your IP when the map loads.
      </p>
      <div className="flex flex-wrap items-center justify-center gap-2">
        <button
          type="button"
          onClick={openCookiePreferences}
          className="inline-flex items-center justify-center rounded-xl bg-gradient-brand px-4 py-2 text-xs font-bold text-white shadow-sog hover:-translate-y-0.5 transition shadow-glow"
        >
          Manage cookies
        </button>
        <a
          href="https://www.google.com/maps?q=138%20Milton%20Street%2C%20Northampton%2C%20NN2%207DE"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center rounded-xl border border-border bg-white px-4 py-2 text-xs font-semibold text-foreground hover:bg-accent"
        >
          Open in Google Maps
        </a>
      </div>
    </div>
  );
}

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
    setSaving(true);
    const { error: dbError } = await supabase.from("contact_submissions").insert({
      name: parsed.data.name,
      email: parsed.data.email,
      phone: parsed.data.phone,
      subject,
      message: messageBody,
    });
    setSaving(false);
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

  const loading = saving;
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
              <MapEmbed />
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                {
                  icon: MapPin,
                  label: "Office",
                  value: "138 Milton Street, Northampton, NN2 7DE",
                  href: "https://www.google.com/maps?q=138%20Milton%20Street%2C%20Northampton%2C%20NN2%207DE",
                  external: true,
                },
                {
                  icon: Mail,
                  label: "Email",
                  value: "info@travellinks.uk",
                  href:
                    "mailto:info@travellinks.uk" +
                    "?subject=" +
                    encodeURIComponent("Visa enquiry — Travel Links Solution") +
                    "&body=" +
                    encodeURIComponent(
                      "Hi Travel Links team,\n\n" +
                        "I'd like to enquire about a visa application.\n\n" +
                        "• Full name: \n" +
                        "• Destination country: \n" +
                        "• Visa type (Tourist / Family / Business): \n" +
                        "• Preferred travel dates: \n" +
                        "• Best phone number to reach me: \n\n" +
                        "A short note about my situation:\n\n\n" +
                        "Thank you,\n"
                    ),
                },
                {
                  icon: Phone,
                  label: "Phone",
                  value: "+44 787 946 5341",
                  href: "tel:+447879465341",
                },
                {
                  icon: MessageCircle,
                  label: "WhatsApp",
                  value: "Chat with us",
                  href:
                    "https://wa.me/447879465341?text=" +
                    encodeURIComponent(
                      "Hi Travel Links Solution, I'd like to enquire about a visa application."
                    ),
                  external: true,
                },
              ].map(({ icon: Icon, label, value, href, external }) => (
                <a
                  key={label}
                  href={href}
                  target={external ? "_blank" : undefined}
                  rel={external ? "noopener noreferrer" : undefined}
                  className="group rounded-2xl bg-white border border-border p-5 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-glow"
                >
                  <div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-brand text-white transition-transform group-hover:scale-110">
                    <Icon className="h-4.5 w-4.5" />
                  </div>
                  <div className="mt-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">{label}</div>
                  <div className="text-sm font-medium break-words group-hover:text-primary transition-colors">{value}</div>
                </a>
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
                <Field name="visa" label="Visa Type" placeholder="e.g. Tourist" />
              </div>
              <div>
                <label htmlFor="contact-message" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Message</label>
                <textarea
                  id="contact-message"
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
                {loading ? "Sending…" : submitted ? "Submitted" : "Consult Now"} <Send className="h-4 w-4" />
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
  const id = `contact-${name}`;
  return (
    <div>
      <label htmlFor={id} className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{label}</label>
      <input
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
        className="mt-1.5 w-full rounded-xl border border-border bg-white px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/40"
      />
    </div>
  );
}
