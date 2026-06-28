import { useEffect, useRef, useState } from "react";
import { MessageSquare, ClipboardList, FileText, Send, Loader2, CheckCircle2 } from "lucide-react";
import { SectionHeading } from "./Section";

const STEPS = [
  { icon: MessageSquare, title: "Free Consultation", text: "Tell us your goal and we'll outline your options." },
  { icon: ClipboardList, title: "Profile Evaluation", text: "We assess your eligibility and best pathway." },
  { icon: FileText, title: "Document Preparation", text: "Forms, letters and certified copies — all handled." },
  { icon: Send, title: "Application Submission", text: "Filed correctly the first time." },
  { icon: Loader2, title: "Visa Processing", text: "We track your case and respond to queries." },
  { icon: CheckCircle2, title: "Visa Approval", text: "Receive your visa and travel with confidence." },
];

export function Process() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0); // 0..STEPS.length

  useEffect(() => {
    const onScroll = () => {
      const el = wrapRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      // total scrollable distance inside the pinned wrapper
      const total = el.offsetHeight - vh;
      const scrolled = Math.min(Math.max(-rect.top, 0), total);
      const p = total > 0 ? (scrolled / total) * STEPS.length : 0;
      setProgress(p);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const activeIndex = Math.min(STEPS.length - 1, Math.floor(progress));
  const localProgress = progress - activeIndex; // 0..1 within current step

  return (
    <section id="process" className="px-5 lg:px-8">
      {/* Tall wrapper drives the scroll animation; height = (steps + 1) * 100vh for a smooth exit */}
      <div ref={wrapRef} style={{ height: `${(STEPS.length + 1) * 100}vh` }} className="relative">
        <div className="sticky top-0 h-screen flex flex-col justify-center mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Our Process"
            title={<>Six simple steps to your <span className="text-gradient-brand">approved visa</span></>}
          />

          {/* Progress track */}
          <div className="mt-10 mx-auto w-full max-w-3xl">
            <div className="relative h-1 rounded-full bg-border overflow-hidden">
              <div
                className="absolute inset-y-0 left-0 bg-gradient-brand transition-[width] duration-300 ease-out"
                style={{ width: `${Math.min(100, (progress / STEPS.length) * 100)}%` }}
              />
            </div>
            <div className="mt-3 flex justify-between text-[11px] font-medium text-muted-foreground">
              {STEPS.map((s, i) => (
                <span
                  key={s.title}
                  className={`transition-colors duration-300 ${i <= activeIndex ? "text-primary" : ""}`}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
              ))}
            </div>
          </div>

          {/* Stage: steps rise up and fall out as scroll progresses */}
          <div className="mt-12 relative h-[320px]">
            {STEPS.map((s, i) => {
              const delta = i - (activeIndex + localProgress);
              // Position relative to active step
              const translateY = delta * 60; // px
              const opacity = Math.max(0, 1 - Math.abs(delta) * 0.9);
              const scale = 1 - Math.min(0.15, Math.abs(delta) * 0.08);
              const isActive = i === activeIndex;
              const Icon = s.icon;
              return (
                <div
                  key={s.title}
                  className="absolute inset-x-0 mx-auto max-w-2xl text-center will-change-transform"
                  style={{
                    transform: `translateY(${translateY}px) scale(${scale})`,
                    opacity,
                    pointerEvents: isActive ? "auto" : "none",
                    transition: "transform 500ms cubic-bezier(0.22,1,0.36,1), opacity 500ms ease-out",
                    zIndex: 100 - Math.abs(Math.round(delta * 10)),
                  }}
                >
                  <div className="mx-auto grid h-24 w-24 place-items-center rounded-3xl bg-white border border-border shadow-card relative">
                    <Icon className="h-9 w-9 text-primary" />
                    <span className="absolute -top-2 -right-2 grid h-8 w-8 place-items-center rounded-full bg-gradient-brand text-white text-sm font-bold shadow-md">
                      {i + 1}
                    </span>
                  </div>
                  <h3 className="mt-6 font-display text-2xl md:text-3xl font-semibold">{s.title}</h3>
                  <p className="mt-3 text-base text-muted-foreground max-w-md mx-auto">{s.text}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
