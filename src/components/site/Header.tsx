import { useEffect, useState } from "react";
import { Menu, X, ArrowRight } from "lucide-react";
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
  const [active, setActive] = useState<string>("#home");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scroll-spy: highlight current section in nav
  useEffect(() => {
    const ids = NAV.map((n) => n.href.slice(1));
    const els = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => !!el);
    if (!els.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(`#${visible.target.id}`);
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: [0, 0.25, 0.5, 1] }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-white/80 backdrop-blur-xl border-b border-border/60 shadow-soft"
          : "bg-transparent"
      }`}
    >
      {/* gradient hairline */}
      <div
        className={`absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-brand-cyan/50 to-transparent transition-opacity duration-500 ${
          scrolled ? "opacity-100" : "opacity-0"
        }`}
      />

      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between gap-4 px-5 py-3 lg:px-8">
        <Logo />

        <nav className="hidden xl:flex items-center gap-1 rounded-full border border-border/50 bg-white/40 backdrop-blur-md px-1.5 py-1 shadow-soft">
          {NAV.map((item) => {
            const isActive = active === item.href;
            return (
              <a
                key={item.href}
                href={item.href}
                className={`relative px-3.5 py-2 text-[13px] font-medium rounded-full transition-colors ${
                  isActive
                    ? "text-white"
                    : "text-foreground/70 hover:text-foreground"
                }`}
              >
                {isActive && (
                  <span className="absolute inset-0 rounded-full bg-gradient-brand shadow-soft -z-0" />
                )}
                <span className="relative z-10">{item.label}</span>
              </a>
            );
          })}
        </nav>

        <div className="hidden md:flex items-center gap-2.5">
          <a
            href="#contact"
            className="px-4 py-2.5 text-[13px] font-semibold text-foreground/80 hover:text-primary transition-colors"
          >
            Free Assessment
          </a>
          <a
            href="#contact"
            className="group inline-flex items-center gap-1.5 px-5 py-2.5 text-[13px] font-semibold text-white rounded-full bg-gradient-brand shadow-soft hover:shadow-glow transition-all hover:-translate-y-0.5"
          >
            Apply Now
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
          </a>
        </div>

        <button
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
          className="xl:hidden relative grid place-items-center h-10 w-10 rounded-xl border border-border/60 bg-white/70 backdrop-blur-md shadow-soft transition hover:bg-white"
        >
          <Menu
            className={`absolute h-5 w-5 transition-all ${
              open ? "opacity-0 rotate-90 scale-75" : "opacity-100 rotate-0 scale-100"
            }`}
          />
          <X
            className={`absolute h-5 w-5 transition-all ${
              open ? "opacity-100 rotate-0 scale-100" : "opacity-0 -rotate-90 scale-75"
            }`}
          />
        </button>
      </div>

      {/* Mobile drawer */}
      <div
        className={`xl:hidden overflow-hidden border-t border-border/60 bg-white/95 backdrop-blur-xl transition-[max-height,opacity] duration-500 ${
          open ? "max-h-[80vh] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="mx-auto max-w-7xl px-5 py-4 grid gap-1">
          {NAV.map((item, i) => {
            const isActive = active === item.href;
            return (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                style={{ transitionDelay: open ? `${i * 30}ms` : "0ms" }}
                className={`flex items-center justify-between px-4 py-3 text-sm font-medium rounded-xl transition-all ${
                  isActive
                    ? "bg-gradient-brand text-white shadow-soft"
                    : "text-foreground/80 hover:bg-secondary"
                }`}
              >
                {item.label}
                <ArrowRight className={`h-4 w-4 ${isActive ? "opacity-100" : "opacity-30"}`} />
              </a>
            );
          })}
          <div className="mt-3 grid grid-cols-2 gap-2">
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="text-center px-4 py-3 text-sm font-semibold text-primary border border-primary/25 rounded-xl"
            >
              Free Assessment
            </a>
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="text-center px-4 py-3 text-sm font-semibold text-white rounded-xl bg-gradient-brand shadow-soft"
            >
              Apply Now
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
