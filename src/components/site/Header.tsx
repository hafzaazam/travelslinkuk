import { useEffect, useState } from "react";
import { useRouterState } from "@tanstack/react-router";
import { Menu, X, ArrowRight, PhoneCall } from "lucide-react";
import { Logo } from "./Logo";
import { openApplyDialog } from "./ApplyDialog";

const NAV: { label: string; href: string; route?: boolean }[] = [
  { label: "Home", href: "#home" },
  { label: "About", href: "/about", route: true },
  { label: "Services", href: "/services", route: true },
  { label: "Countries", href: "#countries" },
  { label: "Why Us", href: "#why" },
  { label: "Process", href: "#process" },
  { label: "Reviews", href: "#testimonials" },
  { label: "FAQ", href: "#faq" },
  { label: "Book", href: "/book", route: true },
  { label: "Contact", href: "/contact", route: true },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("#home");
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const isHome = pathname === "/";
  const hrefFor = (href: string) => {
    if (href.startsWith("/")) return href;
    return isHome ? href : `/${href}`;
  };

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 24);
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(1, y / max) : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scroll-spy — only hash anchors on the home page
  useEffect(() => {
    if (!isHome) return;
    const ids = NAV.filter((n) => !n.route && n.href.startsWith("#")).map((n) => n.href.slice(1));
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
  }, [isHome]);

  // Close dropdown on outside click
  useEffect(() => {
    if (!open) return;
    const onDocClick = (e: MouseEvent) => {
      const target = e.target as Node | null;
      if (target && !(target as HTMLElement).closest?.("[data-header-root]")) setOpen(false);
    };
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, [open]);

  // dropdown menu — no body scroll lock


  const onLight = isHome && !scrolled; // header sits on dark hero only on home
  const textBase = onLight ? "text-white/80 hover:text-white" : "text-foreground/70 hover:text-foreground";
  const navWrap = onLight
    ? "border-white/15 bg-white/10 backdrop-blur-xl"
    : "border-border/50 bg-white/60 backdrop-blur-xl";

  return (
    <header
      data-header-root
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled || !isHome
          ? "bg-white/85 backdrop-blur-xl border-b border-border/60 shadow-[0_8px_30px_-12px_rgba(8,18,48,0.18)]"
          : "bg-gradient-to-b from-[#04081a]/40 via-[#04081a]/15 to-transparent"
      }`}
    >
      {/* scroll progress bar */}
      <div
        className="absolute left-0 top-0 h-[2px] bg-gradient-brand transition-[width] duration-150 ease-out"
        style={{ width: `${progress * 100}%` }}
      />

      {/* hairline */}
      <div
        className={`pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-brand-cyan/50 to-transparent transition-opacity duration-500 ${
          scrolled || !isHome ? "opacity-100" : "opacity-0"
        }`}
      />

      <div
        className={`mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 lg:px-8 transition-all duration-300 ${
          scrolled || !isHome ? "h-20" : "h-28"
        }`}
      >

        <Logo light={onLight} />


        <div className="hidden md:flex items-center gap-2 lg:gap-3">
          <a
            href="tel:+447879465341"
            className={`group hidden lg:inline-flex items-center gap-2 h-10 pl-2.5 pr-3.5 text-[12px] font-semibold rounded-full border transition-all hover:-translate-y-0.5 ${
              onLight
                ? "border-white/15 bg-white/5 text-white/90 hover:bg-white/10 hover:border-white/25"
                : "border-border/60 bg-white/70 text-foreground/80 hover:text-foreground hover:border-primary/30"
            }`}
          >
            <span className="relative grid h-6 w-6 place-items-center rounded-full bg-gradient-brand text-white shadow-soft">
              <PhoneCall className="h-3 w-3" />
              <span className="absolute inset-0 rounded-full bg-brand-cyan/40 opacity-0 group-hover:opacity-100 group-hover:animate-ping" />
            </span>
            <span className="tracking-wide">+44 787 946 5341</span>
          </a>

          <span
            aria-hidden
            className={`hidden lg:block h-6 w-px ${onLight ? "bg-white/15" : "bg-border"}`}
          />


          <button
            type="button"
            onClick={openApplyDialog}
            className="group relative inline-flex items-center gap-1.5 overflow-hidden h-10 px-5 text-[13px] font-semibold text-white rounded-full bg-gradient-brand shadow-soft hover:shadow-glow transition-all hover:-translate-y-0.5"
          >
            <span
              aria-hidden
              className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 -skew-x-12 bg-white/25 blur-md opacity-0 transition-all duration-700 group-hover:opacity-100 group-hover:translate-x-[400%]"
            />
            <span className="relative">Consult Now</span>
            <ArrowRight className="relative h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
          </button>
        </div>


        <button
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="header-dropdown-menu"
          onClick={() => setOpen((o) => !o)}
          className={`relative grid place-items-center h-10 w-10 rounded-xl border shadow-soft transition ${
            onLight
              ? "border-white/20 bg-white/10 backdrop-blur-md text-white hover:bg-white/20"
              : "border-border/60 bg-white/70 backdrop-blur-md hover:bg-white"
          }`}
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

      {/* Dropdown menu (right-aligned) */}
      <div
        id="header-dropdown-menu"
        role="menu"
        aria-hidden={!open}
        className={`absolute right-4 lg:right-8 top-full mt-2 w-72 origin-top-right rounded-2xl border border-border/60 bg-white/95 backdrop-blur-xl shadow-[0_20px_60px_-20px_rgba(8,18,48,0.25)] transition-all duration-300 ${
          open ? "opacity-100 scale-100 pointer-events-auto" : "opacity-0 scale-95 pointer-events-none"
        }`}
      >
        <div className="px-4 py-4 grid gap-1">

          {NAV.map((item, i) => {
            const isActive = active === item.href;
            return (
              <a
                key={item.href}
                href={hrefFor(item.href)}
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
          <div className="mt-3 flex justify-center">
            <button
              type="button"
              onClick={() => { setOpen(false); openApplyDialog(); }}
              className="text-center px-5 py-3 text-sm font-semibold text-white rounded-xl bg-gradient-brand shadow-soft"
            >
              Consult Now
            </button>
          </div>

        </div>
      </div>
    </header>
  );
}
