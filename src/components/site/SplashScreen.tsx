import { useEffect, useState } from "react";
import logoAsset from "@/assets/travel-links-logo.png.asset.json";

const SESSION_KEY = "tls_splash_shown";
const MIN_SHOW_MS = 600; // avoid a jarring flash on fast loads
const FADE_MS = 600;

export function SplashScreen() {
  const [mounted, setMounted] = useState(false);
  const [hide, setHide] = useState(false);
  const [progress, setProgress] = useState(8);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem(SESSION_KEY)) return;

    setMounted(true);
    document.body.style.overflow = "hidden";
    const t0 = performance.now();

    // Idle creep so the bar always feels alive while we wait
    const creep = window.setInterval(() => {
      setProgress((p) => (p < 85 ? p + (85 - p) * 0.08 : p));
    }, 180);

    const bump = (to: number) => setProgress((p) => Math.max(p, to));

    // Milestones
    if (document.readyState !== "loading") bump(35);
    document.addEventListener("DOMContentLoaded", () => bump(45), { once: true });

    // Fonts ready
    const fontsReady = (document as Document & { fonts?: FontFaceSet }).fonts?.ready;
    if (fontsReady) fontsReady.then(() => bump(70)).catch(() => bump(70));

    const finish = () => {
      window.clearInterval(creep);
      setProgress(100);

      const elapsed = performance.now() - t0;
      const wait = Math.max(0, MIN_SHOW_MS - elapsed);

      window.setTimeout(() => setHide(true), wait + 250);
      window.setTimeout(() => {
        setMounted(false);
        sessionStorage.setItem(SESSION_KEY, "1");
        document.body.style.overflow = "";
      }, wait + 250 + FADE_MS);
    };

    // Window 'load' = images, stylesheets, and route data have all settled
    if (document.readyState === "complete") {
      // Defer a frame so React has time to paint above-the-fold content
      requestAnimationFrame(() => requestAnimationFrame(finish));
    } else {
      window.addEventListener("load", finish, { once: true });
    }

    // Safety net — never trap the user behind the splash
    const safety = window.setTimeout(finish, 6000);

    return () => {
      window.clearInterval(creep);
      window.clearTimeout(safety);
      window.removeEventListener("load", finish);
      document.body.style.overflow = "";
    };
  }, []);

  if (!mounted) return null;

  return (
    <div
      aria-hidden="true"
      role="status"
      className={`fixed inset-0 z-[100] grid place-items-center bg-[#04081a] transition-opacity ${
        hide ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
      style={{ transitionDuration: `${FADE_MS}ms` }}
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

        {/* Real progress bar — width driven by load milestones */}
        <div
          className="splash-fade-up h-[3px] w-44 overflow-hidden rounded-full bg-white/10"
          style={{ animationDelay: "0.45s" }}
          aria-label="Loading"
        >
          <div
            className="h-full rounded-full bg-gradient-to-r from-brand-deep via-brand-cyan to-brand-aqua transition-[width] duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}
