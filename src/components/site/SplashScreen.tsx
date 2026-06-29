import { useEffect, useState } from "react";
import logoAsset from "@/assets/travel-links-logo.png.asset.json";

const SESSION_KEY = "tls_splash_shown";
const MIN_SHOW_MS = 1600;
const FADE_MS = 700;

export function SplashScreen() {
  const [mounted, setMounted] = useState(false);
  const [hide, setHide] = useState(false);
  const [progress, setProgress] = useState(8);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Always land at the top on initial load — strip any hash (e.g. /#contact)
    if (window.location.hash) {
      history.replaceState(null, "", window.location.pathname + window.location.search);
    }
    window.scrollTo(0, 0);
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";

    if (sessionStorage.getItem(SESSION_KEY)) return;

    setMounted(true);
    document.body.style.overflow = "hidden";
    const t0 = performance.now();

    const creep = window.setInterval(() => {
      setProgress((p) => (p < 85 ? p + (85 - p) * 0.08 : p));
    }, 180);

    const bump = (to: number) => setProgress((p) => Math.max(p, to));

    if (document.readyState !== "loading") bump(35);
    document.addEventListener("DOMContentLoaded", () => bump(45), { once: true });

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

    if (document.readyState === "complete") {
      requestAnimationFrame(() => requestAnimationFrame(finish));
    } else {
      window.addEventListener("load", finish, { once: true });
    }

    const safety = window.setTimeout(finish, 6000);

    return () => {
      window.clearInterval(creep);
      window.clearTimeout(safety);
      window.removeEventListener("load", finish);
      document.body.style.overflow = "";
    };
  }, []);

  if (!mounted) return null;

  const today = new Date();
  const dateStr = today.toLocaleDateString("en-GB", { day: "2-digit", month: "short" }).toUpperCase();

  return (
    <div
      aria-hidden="true"
      role="status"
      className={`fixed inset-0 z-[100] overflow-hidden transition-opacity ${
        hide ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
      style={{
        transitionDuration: `${FADE_MS}ms`,
        background:
          "radial-gradient(120% 80% at 50% 0%, #102a6b 0%, #0a1538 55%, #050a22 100%)",
      }}
    >
      {/* faint grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
        }}
      />

      {/* dotted flight arc behind the pass */}
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full"
        viewBox="0 0 1200 800"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id="bp-arc" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0%" stopColor="#38d8e8" stopOpacity="0" />
            <stop offset="50%" stopColor="#38d8e8" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#34e5c5" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path
          className="bp-arc"
          d="M 80 540 Q 600 120 1120 540"
          fill="none"
          stroke="url(#bp-arc)"
          strokeWidth="2"
          strokeDasharray="2 9"
          strokeLinecap="round"
        />
        <circle cx="80" cy="540" r="5" fill="#38d8e8" />
        <circle cx="1120" cy="540" r="5" fill="#34e5c5" />
      </svg>

      {/* Boarding pass */}
      <div className="relative z-10 flex h-full items-center justify-center px-4">
        <div className="bp-card relative w-[min(720px,94vw)] rounded-3xl bg-white shadow-[0_40px_120px_-20px_rgba(0,0,0,0.55)] overflow-hidden">
          {/* top color bar */}
          <div className="h-2 bg-gradient-to-r from-brand-deep via-brand-royal to-brand-cyan" />

          <div className="flex">
            {/* MAIN STUB */}
            <div className="flex-1 p-6 sm:p-7">
              {/* Airline header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <img src={logoAsset.url} alt="" className="h-8 w-auto object-contain" />
                  <div className="leading-tight">
                    <p className="font-display text-[13px] font-bold text-slate-900">TRAVEL LINKS</p>
                    <p className="text-[9px] font-semibold tracking-[0.22em] text-slate-500">SOLUTION • BOARDING PASS</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-[9px] font-semibold tracking-[0.22em] text-slate-400">FLIGHT</p>
                  <p className="font-mono text-sm font-bold text-slate-900">TLS · 2026</p>
                </div>
              </div>

              {/* Route — FROM ✈ TO */}
              <div className="mt-5 flex items-end justify-between gap-4">
                <div>
                  <p className="text-[9px] font-semibold tracking-[0.22em] text-slate-400">FROM</p>
                  <p className="font-display text-3xl sm:text-4xl font-extrabold text-slate-900 leading-none">LHR</p>
                  <p className="mt-1 text-[11px] text-slate-500">London</p>
                </div>

                <div className="relative flex-1 px-2 pb-1">
                  <div className="relative h-px w-full bg-slate-300">
                    <span className="absolute -left-1 -top-[3px] h-2 w-2 rounded-full bg-brand-deep" />
                    <span className="absolute -right-1 -top-[3px] h-2 w-2 rounded-full bg-brand-cyan" />
                    <svg
                      className="bp-plane absolute -top-3 left-0 text-brand-deep"
                      width="22"
                      height="22"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M21 16v-2l-8-5V3.5a1.5 1.5 0 0 0-3 0V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1L15 22v-1.5L13 19v-5.5l8 2.5z" />
                    </svg>
                  </div>
                </div>

                <div className="text-right">
                  <p className="text-[9px] font-semibold tracking-[0.22em] text-slate-400">TO</p>
                  <p className="font-display text-3xl sm:text-4xl font-extrabold text-slate-900 leading-none">WLD</p>
                  <p className="mt-1 text-[11px] text-slate-500">The World</p>
                </div>
              </div>

              {/* Meta row */}
              <div className="mt-6 grid grid-cols-4 gap-3 border-t border-dashed border-slate-200 pt-4">
                <Meta label="PASSENGER" value="YOU" />
                <Meta label="DATE" value={dateStr} />
                <Meta label="GATE" value="A1" />
                <Meta label="SEAT" value="01A" />
              </div>

              {/* Progress / boarding */}
              <div className="mt-5">
                <div className="mb-2 flex items-center justify-between text-[10px] font-semibold tracking-[0.18em] text-slate-500">
                  <span>BOARDING</span>
                  <span className="font-mono text-slate-700">{Math.round(progress)}%</span>
                </div>
                <div className="h-[6px] w-full overflow-hidden rounded-full bg-slate-100">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-brand-deep via-brand-royal to-brand-cyan transition-[width] duration-300 ease-out"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            </div>

            {/* PERFORATION */}
            <div className="relative w-[2px] my-4 bg-transparent">
              <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 border-l-2 border-dashed border-slate-300" />
              <span className="absolute -top-6 left-1/2 -translate-x-1/2 h-5 w-5 rounded-full bg-[#050a22]" />
              <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 h-5 w-5 rounded-full bg-[#050a22]" />
            </div>

            {/* TEAR STUB */}
            <div className="w-[150px] sm:w-[180px] bg-slate-50 p-5 flex flex-col justify-between">
              <div>
                <p className="text-[9px] font-semibold tracking-[0.22em] text-slate-400">FLIGHT</p>
                <p className="font-mono text-sm font-bold text-slate-900">TLS · 2026</p>
                <div className="mt-3 flex items-baseline gap-1.5">
                  <span className="font-display text-xl font-extrabold text-slate-900">LHR</span>
                  <span className="text-slate-400">→</span>
                  <span className="font-display text-xl font-extrabold text-slate-900">WLD</span>
                </div>
                <p className="mt-1 text-[10px] text-slate-500">{dateStr} · GATE A1</p>
              </div>

              {/* Barcode */}
              <div className="mt-4">
                <div className="flex h-10 items-end gap-[2px]">
                  {Array.from({ length: 28 }).map((_, i) => (
                    <span
                      key={i}
                      className="block bg-slate-900"
                      style={{
                        width: i % 3 === 0 ? 3 : 2,
                        height: `${50 + ((i * 37) % 50)}%`,
                        opacity: i % 5 === 0 ? 0.6 : 1,
                      }}
                    />
                  ))}
                </div>
                <p className="mt-1 text-center font-mono text-[9px] tracking-[0.2em] text-slate-500">
                  TLS · 0001 · 2026
                </p>
              </div>
            </div>
          </div>

          {/* STAMP */}
          <div className="bp-stamp pointer-events-none absolute right-[42%] top-6 sm:right-[44%] sm:top-8">
            <div className="rotate-[-14deg] rounded-md border-[3px] border-brand-deep/70 px-3 py-1 text-brand-deep/80">
              <p className="font-display text-[11px] font-extrabold tracking-[0.22em]">APPROVED</p>
              <p className="text-center font-mono text-[8px] tracking-[0.2em]">{dateStr}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tagline */}
      <div className="splash-fade-up absolute inset-x-0 bottom-10 text-center" style={{ animationDelay: "0.55s" }}>
        <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-brand-cyan/90">
          Around the world with you
        </p>
      </div>
    </div>
  );
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[9px] font-semibold tracking-[0.22em] text-slate-400">{label}</p>
      <p className="font-display text-sm font-bold text-slate-900">{value}</p>
    </div>
  );
}
