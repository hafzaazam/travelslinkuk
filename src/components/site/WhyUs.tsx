import { ShieldCheck, Trophy, FileCheck2, Zap, Wallet, Eye, UserCheck, Headphones } from "lucide-react";
import { SectionHeading } from "./Section";
import { Reveal } from "./Reveal";
import whyUsPlane from "@/assets/why-us-plane.png.asset.json";
import { useEffect, useRef, useState } from "react";

const ITEMS = [
  { icon: UserCheck, title: "Experienced Consultants", text: "Decade-long expertise in UK and global immigration." },
  { icon: Trophy, title: "High Success Rate", text: "98% approval rate across visa categories." },
  { icon: FileCheck2, title: "Complete Documentation", text: "We handle every form, letter and certified copy." },
  { icon: Zap, title: "Fast Processing", text: "Optimised workflows for quicker turnarounds." },
  { icon: Wallet, title: "Affordable Packages", text: "Transparent pricing with flexible plans." },
  { icon: Eye, title: "Transparent Fees", text: "No hidden charges — ever." },
  { icon: ShieldCheck, title: "Personalised Guidance", text: "A dedicated advisor for your entire journey." },
  { icon: Headphones, title: "24/7 Support", text: "Round-the-clock assistance via WhatsApp & email." },
];

function ScrollWheel() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0); // 0..ITEMS.length-1 (fractional)

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const el = wrapRef.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const vh = window.innerHeight;
        const total = rect.height - vh;
        const scrolled = Math.min(Math.max(-rect.top, 0), total);
        const p = total > 0 ? scrolled / total : 0;
        setProgress(Math.min(ITEMS.length - 1, p * (ITEMS.length - 0.001)));
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const active = Math.round(progress);

  return (
    <div ref={wrapRef} className="relative" style={{ height: `${ITEMS.length * 60}vh` }}>
      <div className="sticky top-0 h-screen flex items-center">
        <div className="relative w-full h-[460px] [perspective:1400px]">
          {/* soft glow behind active card */}
          <div
            aria-hidden
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-72 w-[28rem] rounded-full bg-gradient-brand opacity-25 blur-3xl pointer-events-none"
          />

          {ITEMS.map(({ icon: Icon, title, text }, i) => {
            const offset = i - progress;
            const abs = Math.abs(offset);
            const visible = abs <= 2.5;
            if (!visible) return null;
            const translateY = offset * 96;
            const scale = Math.max(0.7, 1 - abs * 0.11);
            const opacity = Math.max(0, 1 - abs * 0.45);
            const blur = Math.min(6, abs * 2);
            const rotX = offset * -6;
            const z = 50 - Math.round(abs * 10);
            const isActive = Math.round(progress) === i;
            return (
              <div
                key={title}
                className="absolute inset-x-0 mx-auto max-w-md will-change-transform"
                style={{
                  top: "50%",
                  transform: `translateY(calc(-50% + ${translateY}px)) scale(${scale}) rotateX(${rotX}deg)`,
                  opacity,
                  filter: `blur(${blur}px)`,
                  zIndex: z,
                  pointerEvents: isActive ? "auto" : "none",
                  transition: "filter 400ms ease-out",
                  transformStyle: "preserve-3d",
                }}
                aria-hidden={!isActive}
              >
                <div
                  className={`relative rounded-2xl p-6 overflow-hidden border transition-shadow duration-500 ${
                    isActive
                      ? "shadow-glow border-brand-cyan/40 bg-white"
                      : "shadow-soft border-white/50 bg-white/60 backdrop-blur-md"
                  }`}
                >
                  {/* gradient edge highlight */}
                  {isActive && (
                    <div
                      aria-hidden
                      className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-cyan to-transparent"
                    />
                  )}
                  <div className="flex items-center justify-between gap-4">
                    <div className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-brand text-white shrink-0 shadow-soft">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="text-[11px] font-semibold tracking-[0.18em] text-muted-foreground uppercase">
                      {String(i + 1).padStart(2, "0")} / {String(ITEMS.length).padStart(2, "0")}
                    </div>
                  </div>
                  <h3 className="mt-5 font-display text-xl font-semibold leading-tight">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{text}</p>
                </div>
              </div>
            );
          })}

          {/* progress rail */}
          <div className="absolute right-3 top-1/2 -translate-y-1/2 hidden md:flex flex-col gap-2.5">
            {ITEMS.map((_, i) => (
              <span
                key={i}
                className={`block w-1 rounded-full transition-all duration-300 ${
                  i === active
                    ? "h-7 bg-gradient-brand"
                    : i < active
                    ? "h-2 bg-brand-blue/40"
                    : "h-2 bg-foreground/15"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function WhyUs() {
  return (
    <section id="why" className="relative bg-gradient-soft py-24 px-5 lg:px-8 overflow-hidden">
      {/* twinkle field */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        {[
          { t: "12%", l: "8%", d: "0s", s: 6 },
          { t: "22%", l: "92%", d: "0.6s", s: 4 },
          { t: "68%", l: "5%", d: "1.2s", s: 5 },
          { t: "82%", l: "88%", d: "1.8s", s: 7 },
          { t: "45%", l: "50%", d: "2.4s", s: 4 },
        ].map((p, i) => (
          <span
            key={i}
            className="absolute rounded-full bg-brand-cyan/60 twinkle-dot"
            style={{ top: p.t, left: p.l, width: p.s, height: p.s, animationDelay: p.d }}
          />
        ))}
      </div>

      <div className="relative mx-auto max-w-7xl">
        <Reveal>
          <SectionHeading
            eyebrow="Why Choose Us"
            title={<>The reasons clients <span className="text-gradient-brand">trust Travel Links</span></>}
            description="A UK-registered consultancy combining experience, transparency and a personal touch. Scroll to explore."
          />
        </Reveal>

        <div className="mt-14 grid lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          <div className="lg:col-span-5 order-first lg:order-none">
            <div className="sticky top-24 flex justify-center">
              <div className="relative">
                <div className="absolute -inset-8 rounded-[2.5rem] bg-gradient-brand opacity-20 blur-3xl" aria-hidden />
                <img
                  src={whyUsPlane.url}
                  alt="3D illustration of an airplane with passport and boarding passes"
                  className="relative w-full max-w-md h-auto drop-shadow-[0_30px_60px_rgba(33,87,243,0.35)] animate-float"
                  loading="lazy"
                />
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <ScrollWheel />
          </div>
        </div>
      </div>
    </section>
  );
}

