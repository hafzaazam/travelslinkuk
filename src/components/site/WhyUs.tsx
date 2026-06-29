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
  const [active, setActive] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const el = wrapRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      // progress: 0 when top of wrapper hits top of viewport, 1 when bottom hits bottom
      const total = rect.height - vh;
      const scrolled = Math.min(Math.max(-rect.top, 0), total);
      const p = total > 0 ? scrolled / total : 0;
      const idx = Math.min(ITEMS.length - 1, Math.floor(p * ITEMS.length));
      setActive(idx);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div ref={wrapRef} className="relative" style={{ height: `${ITEMS.length * 70}vh` }}>
      <div className="sticky top-0 h-screen flex items-center">
        <div className="relative w-full h-[420px] [perspective:1200px]">
          {ITEMS.map(({ icon: Icon, title, text }, i) => {
            const offset = i - active;
            const abs = Math.abs(offset);
            const visible = abs <= 2;
            const translateY = offset * 90;
            const scale = 1 - abs * 0.12;
            const opacity = abs === 0 ? 1 : abs === 1 ? 0.45 : abs === 2 ? 0.15 : 0;
            const blur = abs === 0 ? 0 : abs;
            const z = 50 - abs;
            return (
              <div
                key={title}
                className="absolute inset-x-0 mx-auto max-w-md transition-all duration-500 ease-out will-change-transform"
                style={{
                  top: "50%",
                  transform: `translateY(calc(-50% + ${translateY}px)) scale(${scale})`,
                  opacity,
                  filter: `blur(${blur}px)`,
                  zIndex: z,
                  pointerEvents: abs === 0 ? "auto" : "none",
                }}
                aria-hidden={!visible}
              >
                <div
                  className={`rounded-2xl p-6 h-full transition-all duration-500 ${
                    abs === 0
                      ? "glass shadow-glow border border-brand-cyan/30"
                      : "glass shadow-soft"
                  }`}
                  style={{ backgroundColor: abs === 0 ? undefined : "rgba(255,255,255,0.35)" }}
                >
                  <div className="flex items-center gap-4">
                    <div className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-brand text-white shrink-0">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="text-xs font-medium text-muted-foreground">
                      {String(i + 1).padStart(2, "0")} / {String(ITEMS.length).padStart(2, "0")}
                    </div>
                  </div>
                  <h3 className="mt-4 font-display text-xl font-semibold">{title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{text}</p>
                </div>
              </div>
            );
          })}

          {/* progress rail */}
          <div className="absolute right-2 top-1/2 -translate-y-1/2 hidden md:flex flex-col gap-2">
            {ITEMS.map((_, i) => (
              <span
                key={i}
                className={`block w-1 rounded-full transition-all duration-300 ${
                  i === active ? "h-6 bg-brand-blue" : "h-2 bg-foreground/20"
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

