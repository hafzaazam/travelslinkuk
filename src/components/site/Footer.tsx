import { useState } from "react";
import { Facebook, Instagram, Linkedin, MessageCircle, Mail, Phone, MapPin, ArrowRight } from "lucide-react";
import { z } from "zod";
import { toast } from "sonner";
import { Logo } from "./Logo";
import { supabase } from "@/integrations/supabase/client";

const emailSchema = z.string().trim().email("Enter a valid email").max(255);

export function Footer() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubscribe = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const parsed = emailSchema.safeParse(email);
    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? "Enter a valid email");
      return;
    }
    setLoading(true);
    const { error } = await supabase
      .from("newsletter_subscribers")
      .insert({ email: parsed.data.toLowerCase() });
    setLoading(false);
    if (error) {
      if (error.code === "23505") {
        toast.success("You're already on the list — thank you!");
        setEmail("");
        return;
      }
      toast.error("Could not subscribe. Please try again.");
      return;
    }
    toast.success("Subscribed! Look out for our updates.");
    setEmail("");
  };

  return (
    <footer className="bg-[oklch(0.16_0.04_260)] text-white pt-16 pb-8 px-5 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Newsletter strip */}
        <div className="mb-14 rounded-3xl border border-white/10 bg-white/[0.04] p-6 sm:p-8 lg:p-10 backdrop-blur-md flex flex-col lg:flex-row gap-6 lg:items-center lg:justify-between">
          <div className="max-w-xl">
            <h3 className="font-display text-2xl sm:text-3xl font-bold leading-tight">
              Visa news, tips & destination updates
            </h3>
            <p className="mt-2 text-sm text-white/65">
              Join our newsletter for monthly insights — no spam, unsubscribe anytime.
            </p>
          </div>
          <form onSubmit={onSubscribe} className="flex w-full max-w-md gap-2">
            <label htmlFor="newsletter-email" className="sr-only">Email address</label>
            <input
              id="newsletter-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@email.com"
              aria-label="Email address"
              className="flex-1 rounded-xl border border-white/15 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-white/40 outline-none focus:border-brand-aqua/60"
            />
            <button
              type="submit"
              disabled={loading}
              className="group inline-flex items-center gap-1.5 rounded-xl bg-gradient-brand px-5 py-3 text-sm font-bold text-white shadow-glow hover:-translate-y-0.5 transition disabled:opacity-60"
            >
              {loading ? "…" : "Subscribe"}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </button>
          </form>
        </div>

        <div className="grid gap-10 lg:grid-cols-4">
          <div className="space-y-4">
            <Logo light />
            <p className="text-sm text-white/70 max-w-xs">
              UK-based visa consultancy guiding tourists, families and business travellers to destinations across the globe.
            </p>
            <div className="flex gap-2">
              {[Facebook, Instagram, Linkedin, MessageCircle].map((Icon, i) => (
                <a key={i} href="#" aria-label="Social link" className="grid h-9 w-9 place-items-center rounded-lg bg-white/10 hover:bg-gradient-brand transition">
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-display text-sm font-semibold uppercase tracking-wider text-white">Quick Links</h4>
            <ul className="mt-4 space-y-2.5 text-sm text-white/70">
              {["Home", "About", "Services", "Countries", "Process", "Contact"].map((l) => (
                <li key={l}><a href={`#${l.toLowerCase()}`} className="hover:text-white transition">{l}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display text-sm font-semibold uppercase tracking-wider text-white">Visa Services</h4>
            <ul className="mt-4 space-y-2.5 text-sm text-white/70">
              {["Tourist Visa", "Business Visa", "Family Visa"].map((l) => (
                <li key={l}><a href="#services" className="hover:text-white transition">{l}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display text-sm font-semibold uppercase tracking-wider text-white">Contact</h4>
            <ul className="mt-4 space-y-3 text-sm text-white/75">
              <li className="flex items-start gap-2.5"><MapPin className="h-4 w-4 mt-0.5 text-brand-aqua shrink-0" /> 138 Milton Street, Northampton, NN2 7DE, United Kingdom</li>
              <li className="flex items-start gap-2.5"><Mail className="h-4 w-4 mt-0.5 text-brand-aqua" /> info@travellinks.uk</li>
              <li className="flex items-start gap-2.5"><Phone className="h-4 w-4 mt-0.5 text-brand-aqua" /> +44 787 946 5341</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row gap-3 justify-between items-center text-xs text-white/60">
          <p>© 2025 Travel Links Solution. All Rights Reserved.</p>
          <div className="flex gap-5">
            <a href="#" className="hover:text-white transition">Privacy Policy</a>
            <a href="#" className="hover:text-white transition">Terms</a>
            <a href="/admin" className="hover:text-white transition opacity-60">Admin</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
