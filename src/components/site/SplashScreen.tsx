import { useEffect, useState } from "react";
import logoAsset from "@/assets/travel-links-logo.png.asset.json";

const SESSION_KEY = "tls_splash_shown";

export function SplashScreen() {
  const [mounted, setMounted] = useState(false);
  const [hide, setHide] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    // Show once per browser session
    if (sessionStorage.getItem(SESSION_KEY)) return;

    setMounted(true);
    document.body.style.overflow = "hidden";

    const fade = setTimeout(() => setHide(true), 1800);
    const unmount = setTimeout(() => {
      setMounted(false);
      sessionStorage.setItem(SESSION_KEY, "1");
      document.body.style.overflow = "";
    }, 2500);

    return () => {
      clearTimeout(fade);
      clearTimeout(unmount);
      document.body.style.overflow = "";
    };
  }, []);

  if (!mounted) return null;

  return (
    <div
      aria-hidden="true"
      className={`fixed inset-0 z-[100] grid place-items-center bg-[#04081a] transition-opacity duration-700 ${
        hide ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      {/* Glow orbs */}
      <div className="pointer-events-none absolute -left-24 top-1/4 h-96 w-96 rounded-full bg-brand-cyan/25 blur-[120px] animate-float" />
      <div className="pointer-events-none absolute -right-24 bottom-1/4 h-96 w-96 rounded-full bg-primary/30 blur-[120px] animate-float" />

      {/* Subtle grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
          maskImage: "radial-gradient(ellipse at center, black 30%, transparent 75%)",
        }}
      />

      <div className="relative flex flex-col items-center gap-8 px-8 text-center">
        {/* Pulsing ring around logo */}
        <div className="relative">
          <span className="absolute inset-0 rounded-full border border-brand-cyan/40 splash-ring" />
          <span
            className="absolute inset-0 rounded-full border border-brand-aqua/30 splash-ring"
            style={{ animationDelay: "0.8s" }}
          />
          <div className="relative grid h-32 w-32 sm:h-40 sm:w-40 place-items-center rounded-full bg-white/5 backdrop-blur-xl border border-white/10 shadow-glow splash-pop">
            <img
              src={logoAsset.url}
              alt=""
              className="h-20 sm:h-24 w-auto object-contain drop-shadow-[0_4px_24px_rgba(56,216,232,0.55)]"
            />
          </div>
        </div>

        {/* Wordmark */}
        <div className="splash-fade-up" style={{ animationDelay: "0.25s" }}>
          <p className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-white">
            Travel Links{" "}
            <span className="bg-gradient-to-r from-brand-aqua via-brand-cyan to-white bg-clip-text text-transparent">
              Solution
            </span>
          </p>
          <p className="mt-2 text-[11px] font-bold uppercase tracking-[0.32em] text-brand-cyan/80">
            UK Visa Consultancy
          </p>
        </div>

        {/* Progress bar */}
        <div className="splash-fade-up h-[3px] w-44 overflow-hidden rounded-full bg-white/10" style={{ animationDelay: "0.45s" }}>
          <div className="h-full w-full bg-gradient-to-r from-brand-deep via-brand-cyan to-brand-aqua splash-progress" />
        </div>
      </div>
    </div>
  );
}
