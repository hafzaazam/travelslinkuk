import { useState } from "react";
import { MessageCircle, Mail, Phone, MapPin, ArrowRight } from "lucide-react";
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
              <a
                href="https://wa.me/447879465341"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Chat with Travel Links on WhatsApp"
                className="grid h-9 w-9 place-items-center rounded-lg bg-white/10 hover:bg-gradient-brand transition"
              >
                <MessageCircle className="h-4 w-4" aria-hidden="true" />
              </a>
              <a
                href="mailto:contact@travellinks.uk"
                aria-label="Email Travel Links"
                className="grid h-9 w-9 place-items-center rounded-lg bg-white/10 hover:bg-gradient-brand transition"
              >
                <Mail className="h-4 w-4" aria-hidden="true" />
              </a>
              <a
                href="tel:+447879465341"
                aria-label="Call Travel Links"
                className="grid h-9 w-9 place-items-center rounded-lg bg-white/10 hover:bg-gradient-brand transition"
              >
                <Phone className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-display text-sm font-semibold uppercase tracking-wider text-white">Quick Links</h4>
            <ul className="mt-4 space-y-2.5 text-sm text-white/70">
              {[
                { label: "Home", href: "/" },
                { label: "About", href: "/about" },
                { label: "Services", href: "/services" },
                { label: "Countries", href: "/countries" },
                { label: "Compare", href: "/compare" },
                { label: "Contact", href: "/contact" },
              ].map((l) => (
                <li key={l.label}><a href={l.href} className="hover:text-white transition">{l.label}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display text-sm font-semibold uppercase tracking-wider text-white">Visa Services</h4>
            <ul className="mt-4 space-y-2.5 text-sm text-white/70">
              {["Tourist Visa", "Business Visa", "Family Visa"].map((l) => (
                <li key={l}><a href="/services" className="hover:text-white transition">{l}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display text-sm font-semibold uppercase tracking-wider text-white">Contact</h4>
            <ul className="mt-4 space-y-3 text-sm text-white/75">
              <li className="flex items-start gap-2.5"><MapPin className="h-4 w-4 mt-0.5 text-brand-aqua shrink-0" /> 138 Milton Street, Northampton, NN2 7DE, United Kingdom</li>
              <li className="flex items-start gap-2.5"><Mail className="h-4 w-4 mt-0.5 text-brand-aqua" /> contact@travellinks.uk</li>
              <li className="flex items-start gap-2.5"><Phone className="h-4 w-4 mt-0.5 text-brand-aqua" /> +44 787 946 5341</li>
            </ul>
          </div>
        </div>

        {/* Trust & citation strip — external profiles to build entity authority */}
        <div className="mt-12 rounded-2xl border border-white/10 bg-white/[0.03] p-5 sm:p-6 text-xs text-white/65">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <p className="max-w-2xl">
              Travel Links Solution is a UK-registered visa consultancy based in Northampton. We provide
              advisory and documentation support; for OISC-regulated immigration advice we work with
              registered partners. Find us across the web:
            </p>
            <ul className="flex flex-wrap gap-x-4 gap-y-2 font-medium">
              <li><a href="https://g.page/travel-links-solution-northampton" target="_blank" rel="noopener noreferrer" className="hover:text-white">Google Business</a></li>
              <li><a href="https://uk.trustpilot.com/review/travellinks.uk" target="_blank" rel="noopener noreferrer" className="hover:text-white">Trustpilot</a></li>
              <li><a href="https://www.yell.com/biz/travel-links-solution-northampton" target="_blank" rel="noopener noreferrer" className="hover:text-white">Yell</a></li>
              <li><a href="https://www.bing.com/maps?q=Travel+Links+Solution+Northampton" target="_blank" rel="noopener noreferrer" className="hover:text-white">Bing Places</a></li>
              <li><a href="https://www.linkedin.com/company/travel-links-solution" target="_blank" rel="noopener noreferrer" className="hover:text-white">LinkedIn</a></li>
              <li><a href="https://www.facebook.com/travellinksuk" target="_blank" rel="noopener noreferrer" className="hover:text-white">Facebook</a></li>
              <li><a href="https://www.instagram.com/travellinksuk" target="_blank" rel="noopener noreferrer" className="hover:text-white">Instagram</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row gap-3 justify-between items-center text-xs text-white/60">
          <p>© 2025 Travel Links Solution. All Rights Reserved.</p>
          <div className="flex flex-wrap gap-5">
            <a href="/privacy" className="hover:text-white transition">Privacy Policy</a>
            <a href="/terms" className="hover:text-white transition">Terms</a>
            <a href="/cookies" className="hover:text-white transition">Cookies</a>
            <button
              type="button"
              onClick={() => {
                import("./CookieConsent").then((m) => m.openCookiePreferences());
              }}
              className="hover:text-white transition"
            >
              Cookie preferences
            </button>
            <a href="/admin" className="hover:text-white transition opacity-60">Admin</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
