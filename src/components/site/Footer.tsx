import { Facebook, Instagram, Linkedin, MessageCircle, Mail, Phone, MapPin } from "lucide-react";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="bg-[oklch(0.16_0.04_260)] text-white pt-16 pb-8 px-5 lg:px-8">
      <div className="mx-auto max-w-7xl grid gap-10 lg:grid-cols-4">
        <div className="space-y-4">
          <Logo light />
          <p className="text-sm text-white/70 max-w-xs">
            UK-based visa consultancy guiding students, professionals and families to destinations across the globe.
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
            {["Student Visa", "Work Visa", "Tourist Visa", "Business Visa", "Family Visa", "Permanent Residency"].map((l) => (
              <li key={l}><a href="#services" className="hover:text-white transition">{l}</a></li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-display text-sm font-semibold uppercase tracking-wider text-white">Contact</h4>
          <ul className="mt-4 space-y-3 text-sm text-white/75">
            <li className="flex items-start gap-2.5"><MapPin className="h-4 w-4 mt-0.5 text-brand-aqua" /> United Kingdom</li>
            <li className="flex items-start gap-2.5"><Mail className="h-4 w-4 mt-0.5 text-brand-aqua" /> info@travellinkssolution.co.uk</li>
            <li className="flex items-start gap-2.5"><Phone className="h-4 w-4 mt-0.5 text-brand-aqua" /> +44 XXXX XXX XXX</li>
          </ul>
        </div>
      </div>

      <div className="mx-auto max-w-7xl mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row gap-3 justify-between items-center text-xs text-white/60">
        <p>© 2025 Travel Links Solution. All Rights Reserved.</p>
        <div className="flex gap-5">
          <a href="#" className="hover:text-white transition">Privacy Policy</a>
          <a href="#" className="hover:text-white transition">Terms</a>
        </div>
      </div>
    </footer>
  );
}
