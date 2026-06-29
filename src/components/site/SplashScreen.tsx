import { useEffect, useState } from "react";
import logoAsset from "@/assets/travel-links-logo.png.asset.json";

const SESSION_KEY = "tls_splash_shown";
const MIN_SHOW_MS = 1400;
const FADE_MS = 700;

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
          "linear-gradient(180deg, #04081a 0%, #0b1850 38%, #1e3fb0 65%, #38d8e8 100%)",
      }}
    >
      {/* Soft sun glow */}
      <div className="pointer-events-none absolute left-1/2 top-[58%] -translate-x-1/2 h-[420px] w-[420px] rounded-full bg-brand-cyan/20 blur-[120px]" />

      {/* Twinkling stars */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-1/2 opacity-60"
        style={{
          backgroundImage:
            "radial-gradient(1px 1px at 20% 30%, #fff, transparent), radial-gradient(1px 1px at 70% 20%, #fff, transparent), radial-gradient(1.5px 1.5px at 40% 60%, #fff, transparent), radial-gradient(1px 1px at 85% 50%, #fff, transparent), radial-gradient(1px 1px at 10% 70%, #fff, transparent)",
          backgroundSize: "600px 400px",
        }}
      />

      {/* Drifting clouds */}
      <Cloud className="splash-cloud-l absolute top-[18%] left-0 w-44 opacity-80" />
      <Cloud className="splash-cloud-r absolute top-[32%] left-0 w-32 opacity-60" style={{ animationDuration: "34s" }} />
      <Cloud className="splash-cloud-l absolute top-[46%] left-0 w-52 opacity-50" style={{ animationDuration: "40s", animationDelay: "-8s" }} />
      <Cloud className="splash-cloud-r absolute top-[10%] left-0 w-24 opacity-70" style={{ animationDuration: "26s", animationDelay: "-6s" }} />

      {/* Airplane flying across the sky */}
      <div className="absolute left-1/2 top-[28%] -translate-x-1/2">
        <div className="splash-plane">
          <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
            {/* trail */}
            <path
              className="splash-trail"
              d="M -300 70 Q -120 30 0 60"
              stroke="rgba(255,255,255,0.7)"
              strokeWidth="2"
              strokeLinecap="round"
              fill="none"
            />
            {/* plane */}
            <g transform="translate(40 36)">
              <path
                d="M2 22 L40 14 L52 4 L58 4 L50 18 L62 18 L70 12 L74 14 L66 24 L74 34 L70 36 L62 30 L50 30 L58 44 L52 44 L40 34 L2 26 Z"
                fill="#ffffff"
                stroke="#0b1850"
                strokeWidth="1.2"
                strokeLinejoin="round"
              />
              <circle cx="46" cy="22" r="2" fill="#38d8e8" />
              <circle cx="52" cy="22" r="2" fill="#38d8e8" />
              <circle cx="58" cy="22" r="2" fill="#38d8e8" />
            </g>
          </svg>
        </div>
      </div>

      {/* 7 Wonders silhouette band */}
      <div className="splash-wonders absolute inset-x-0 bottom-0" style={{ animationDelay: "0.2s" }}>
        <svg viewBox="0 0 1440 260" preserveAspectRatio="none" className="block w-full h-[240px] sm:h-[280px]">
          <defs>
            <linearGradient id="ground" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#04081a" stopOpacity="0.55" />
              <stop offset="100%" stopColor="#04081a" stopOpacity="1" />
            </linearGradient>
          </defs>

          {/* far ground haze */}
          <path d="M0 200 L1440 200 L1440 260 L0 260 Z" fill="url(#ground)" />

          <g fill="#04081a" stroke="rgba(56,216,232,0.35)" strokeWidth="1.2">
            {/* Great Pyramid of Giza */}
            <polygon points="60,200 160,90 260,200" />
            <polygon points="200,200 270,120 340,200" opacity="0.85" />

            {/* Taj Mahal (dome + minarets) */}
            <g transform="translate(330 0)">
              <rect x="40" y="160" width="140" height="40" />
              <path d="M40 160 Q110 80 180 160 Z" />
              <rect x="20" y="120" width="14" height="80" />
              <rect x="186" y="120" width="14" height="80" />
              <circle cx="110" cy="92" r="8" />
            </g>

            {/* Great Wall of China */}
            <g transform="translate(560 0)">
              <path d="M0 200 L0 170 L30 170 L30 150 L60 150 L60 175 L100 175 L100 155 L140 155 L140 180 L180 180 L180 160 L210 160 L210 200 Z" />
              <rect x="28" y="135" width="4" height="20" />
              <rect x="98" y="140" width="4" height="20" />
              <rect x="178" y="145" width="4" height="20" />
            </g>

            {/* Colosseum */}
            <g transform="translate(790 0)">
              <path d="M0 200 Q90 110 180 200 Z" />
              <rect x="10" y="170" width="160" height="30" />
              {[0,1,2,3,4,5,6].map((i) => (
                <rect key={i} x={20 + i*22} y={150} width="10" height="22" rx="3" fill="rgba(56,216,232,0.15)" stroke="none" />
              ))}
            </g>

            {/* Christ the Redeemer on a peak */}
            <g transform="translate(990 0)">
              <polygon points="0,200 70,120 140,200" />
              <g transform="translate(63 95)">
                <rect x="6" y="0" width="4" height="30" />
                <rect x="0" y="8" width="16" height="3" />
                <circle cx="8" cy="-3" r="3" />
              </g>
            </g>

            {/* Petra (treasury facade) */}
            <g transform="translate(1130 0)">
              <rect x="0" y="120" width="140" height="80" />
              <polygon points="0,120 70,80 140,120" />
              <rect x="60" y="150" width="20" height="50" fill="rgba(56,216,232,0.18)" stroke="none" />
              <rect x="20" y="135" width="10" height="40" fill="rgba(56,216,232,0.12)" stroke="none" />
              <rect x="110" y="135" width="10" height="40" fill="rgba(56,216,232,0.12)" stroke="none" />
            </g>

            {/* Chichen Itza pyramid */}
            <g transform="translate(1290 0)">
              <polygon points="0,200 35,170 35,150 60,130 60,110 75,95 90,110 90,130 115,150 115,170 150,200" />
              <rect x="65" y="80" width="20" height="15" />
            </g>
          </g>
        </svg>
      </div>

      {/* Brand + progress */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center gap-6 px-8 text-center">
        <div className="relative splash-pop">
          <span className="absolute inset-0 rounded-full border border-brand-cyan/40 splash-ring" />
          <span
            className="absolute inset-0 rounded-full border border-brand-aqua/30 splash-ring"
            style={{ animationDelay: "0.8s" }}
          />
          <div className="relative grid h-24 w-24 sm:h-28 sm:w-28 place-items-center rounded-full bg-white/10 backdrop-blur-xl border border-white/20 shadow-glow">
            <img
              src={logoAsset.url}
              alt=""
              className="h-14 sm:h-16 w-auto object-contain drop-shadow-[0_4px_24px_rgba(56,216,232,0.55)]"
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
          <p className="mt-2 text-[11px] font-bold uppercase tracking-[0.32em] text-brand-cyan/90">
            Around the world with you
          </p>
        </div>

        <div
          className="splash-fade-up h-[3px] w-44 overflow-hidden rounded-full bg-white/15"
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

function Cloud({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 120 50" className={className} style={style} fill="white">
      <ellipse cx="30" cy="32" rx="22" ry="14" />
      <ellipse cx="55" cy="24" rx="26" ry="18" />
      <ellipse cx="85" cy="32" rx="22" ry="14" />
      <ellipse cx="70" cy="38" rx="30" ry="10" />
    </svg>
  );
}
