import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Logo } from "./Logo";

const NAV = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Countries", href: "#countries" },
  { label: "Why Us", href: "#why" },
  { label: "Process", href: "#process" },
  { label: "Reviews", href: "#testimonials" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white/85 backdrop-blur-xl border-b border-border shadow-soft" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between gap-4 px-5 py-3 lg:px-8">
        <Logo />

        <nav className="hidden xl:flex items-center gap-1">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="px-3 py-2 text-sm font-medium text-foreground/75 hover:text-foreground transition-colors rounded-md"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-2">
          <a
            href="#contact"
            className="px-4 py-2.5 text-sm font-semibold text-primary border border-primary/25 rounded-xl hover:bg-primary/5 transition"
          >
            Free Assessment
          </a>
          <a
            href="#contact"
            className="px-5 py-2.5 text-sm font-semibold text-white rounded-xl bg-gradient-brand shadow-soft hover:shadow-glow transition-shadow"
          >
            Apply Now
          </a>
        </div>

        <button
          aria-label="Toggle menu"
          onClick={() => setOpen((o) => !o)}
          className="xl:hidden grid place-items-center h-10 w-10 rounded-lg border border-border bg-white/70"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="xl:hidden border-t border-border bg-white/95 backdrop-blur-xl">
          <div className="mx-auto max-w-7xl px-5 py-4 grid gap-1">
            {NAV.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="px-3 py-2.5 text-sm font-medium text-foreground/80 rounded-md hover:bg-secondary"
              >
                {item.label}
              </a>
            ))}
            <div className="mt-2 grid grid-cols-2 gap-2">
              <a href="#contact" onClick={() => setOpen(false)} className="text-center px-4 py-2.5 text-sm font-semibold text-primary border border-primary/25 rounded-xl">Free Assessment</a>
              <a href="#contact" onClick={() => setOpen(false)} className="text-center px-4 py-2.5 text-sm font-semibold text-white rounded-xl bg-gradient-brand">Apply Now</a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
