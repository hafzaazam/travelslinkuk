import { useEffect } from "react";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { z } from "zod";
import { SectionHeading } from "./Section";
import { toast } from "sonner";
import { useForm } from "@formspree/react";

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

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
    await handleFormspreeSubmit({
      name: parsed.data.name,
      email: parsed.data.email,
      phone: parsed.data.phone,
      country: parsed.data.country,
      visa: parsed.data.visa,
      subject,
      message: messageBody,
      _subject: subject,
    });
  };

  useEffect(() => {
    if (state.succeeded) {
      toast.success("Application received! Our team will contact you within 24 hours.");
    }
  }, [state.succeeded]);

  useEffect(() => {
    if (state.errors) {
      toast.error("Could not send. Please try again or email us directly.");
    }
  }, [state.errors]);

  const loading = state.submitting;



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
          <form onSubmit={onSubmit} className="rounded-3xl glass shadow-glow p-6 sm:p-8 space-y-4">
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
              disabled={loading}
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-brand px-6 py-3.5 text-sm font-semibold text-white shadow-glow hover:translate-y-[-1px] transition disabled:opacity-70"
            >
              {loading ? "Sending…" : "Apply Now"} <Send className="h-4 w-4" />
            </button>
          </form>
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
