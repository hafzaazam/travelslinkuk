import { useEffect, useRef, useState } from "react";
import { Send, CheckCircle2 } from "lucide-react";
import { z } from "zod";
import { toast } from "sonner";
import { useForm } from "@formspree/react";
import { supabase } from "@/integrations/supabase/client";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

const schema = z.object({
  name: z.string().trim().min(2, "Enter your name").max(100),
  phone: z.string().trim().min(6, "Enter a valid phone").max(30),
  email: z.string().trim().email("Invalid email").max(255),
  country: z.string().trim().min(2).max(80),
  visa: z.string().trim().min(2).max(80),
  message: z.string().trim().max(1000).optional(),
});

export const APPLY_EVENT = "open-apply-dialog";

export function openApplyDialog() {
  window.dispatchEvent(new CustomEvent(APPLY_EVENT));
}

export function ApplyDialog() {
  const [open, setOpen] = useState(false);
  const [state, handleFormspreeSubmit] = useForm("xvzjreol");
  const formRef = useRef<HTMLFormElement>(null);
  const [submitted, setSubmitted] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const onOpen = () => {
      setSubmitted(false);
      setOpen(true);
    };
    window.addEventListener(APPLY_EVENT, onOpen);
    return () => window.removeEventListener(APPLY_EVENT, onOpen);
  }, []);

  useEffect(() => {
    if (state.errors) console.warn("Formspree notification failed", state.errors);
  }, [state.errors]);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (submitted || saving) return;
    const fd = new FormData(e.currentTarget);
    const parsed = schema.safeParse(Object.fromEntries(fd.entries()));
    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? "Please check the form");
      return;
    }
    const subject = `${parsed.data.country} · ${parsed.data.visa}`;
    const messageBody = parsed.data.message?.trim()
      ? parsed.data.message
      : `Interested in ${parsed.data.visa} visa for ${parsed.data.country}.`;

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
    setSubmitted(true);
    formRef.current?.reset();
    toast.success("Application received! We'll be in touch within 24 hours.");
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

  const loading = saving;
  const lockSubmit = submitted || loading;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-lg p-0 overflow-hidden">
        <div className="p-6 sm:p-8">
          <DialogHeader>
            <DialogTitle className="font-display text-2xl">Consult for your visa</DialogTitle>
            <DialogDescription>
              Share a few details and our team will respond within 24 hours.
            </DialogDescription>
          </DialogHeader>

          {submitted ? (
            <div className="mt-6 text-center py-6">
              <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-gradient-brand text-white shadow-glow">
                <CheckCircle2 className="h-7 w-7" />
              </div>
              <h3 className="mt-4 font-display text-xl font-bold">Application received</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Our visa team will reach out within 24 hours.
              </p>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="mt-5 inline-flex items-center gap-2 rounded-xl bg-gradient-brand px-5 py-2.5 text-sm font-semibold text-white shadow-glow"
              >
                Close
              </button>
            </div>
          ) : (
            <form ref={formRef} onSubmit={onSubmit} className="mt-5 space-y-4">
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
                <label htmlFor="apply-message" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Message
                </label>
                <textarea
                  id="apply-message"
                  name="message"
                  rows={3}
                  placeholder="Tell us briefly about your goal…"
                  className="mt-1.5 w-full rounded-xl border border-border bg-white px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/40"
                />
              </div>
              <button
                type="submit"
                disabled={lockSubmit}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-brand px-6 py-3.5 text-sm font-semibold text-white shadow-glow hover:translate-y-[-1px] transition disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loading ? "Sending…" : "Consult Now"} <Send className="h-4 w-4" />
              </button>
            </form>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

function Field({ name, label, type = "text", placeholder }: { name: string; label: string; type?: string; placeholder?: string }) {
  const id = `apply-${name}`;
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
