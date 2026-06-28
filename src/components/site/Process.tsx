import { MessageSquare, ClipboardList, FileText, Send, Loader2, CheckCircle2 } from "lucide-react";
import { motion, useScroll, useTransform, useMotionValueEvent } from "motion/react";
import { useRef, useState } from "react";
import { SectionHeading } from "./Section";

const STEPS = [
  { icon: MessageSquare, title: "Free Consultation", text: "Tell us your goal and we'll outline your options." },
  { icon: ClipboardList, title: "Profile Evaluation", text: "We assess your eligibility and best pathway." },
  { icon: FileText, title: "Document Preparation", text: "Forms, letters and certified copies — all handled." },
  { icon: Send, title: "Application Submission", text: "Filed correctly the first time." },
  { icon: Loader2, title: "Visa Processing", text: "We track your case and respond to queries." },
  { icon: CheckCircle2, title: "Visa Approval", text: "Receive your visa and travel with confidence." },
];

function StepCard({
  step,
  index,
  active,
  passed,
}: {
  step: typeof STEPS[number];
  index: number;
  active: boolean;
  passed: boolean;
}) {
  const Icon = step.icon;
  return (
    <motion.div
      animate={{
        scale: active ? 1.15 : passed ? 1 : 0.92,
        opacity: active ? 1 : passed ? 0.85 : 0.45,
        y: active ? -8 : 0,
      }}
      transition={{ type: "spring", stiffness: 180, damping: 20 }}
      className="relative text-center"
    >
      <motion.div
        animate={{
          boxShadow: active
            ? "0 25px 60px -15px oklch(0.6 0.21 268 / 0.55)"
            : "0 8px 24px -10px oklch(0.45 0.08 250 / 0.18)",
          borderColor: active ? "var(--brand-deep)" : "var(--border)",
        }}
        className="mx-auto grid h-20 w-20 place-items-center rounded-2xl bg-white border-2 relative z-10"
      >
        <Icon className={`h-7 w-7 transition-colors ${active ? "text-primary" : "text-muted-foreground"}`} />
        <motion.span
          animate={{ scale: active ? 1.2 : 1 }}
          className="absolute -top-2 -right-2 grid h-7 w-7 place-items-center rounded-full bg-gradient-brand text-white text-xs font-bold shadow-glow"
        >
          {index + 1}
        </motion.span>
        {active && (
          <>
            <motion.span
              initial={{ scale: 0.7, opacity: 0.6 }}
              animate={{ scale: 1.7, opacity: 0 }}
              transition={{ duration: 1.6, repeat: Infinity }}
              className="absolute inset-0 rounded-2xl border-2 border-primary/50"
            />
            <motion.span
              initial={{ scale: 0.7, opacity: 0.6 }}
              animate={{ scale: 1.7, opacity: 0 }}
              transition={{ duration: 1.6, repeat: Infinity, delay: 0.6 }}
              className="absolute inset-0 rounded-2xl border-2 border-brand-cyan/50"
            />
          </>
        )}
      </motion.div>

      <motion.h3
        animate={{ scale: active ? 1.08 : 1 }}
        className={`mt-4 font-display text-base font-semibold transition-colors ${
          active ? "text-primary" : "text-foreground"
        }`}
      >
        {step.title}
      </motion.h3>
      <p className="mt-1.5 text-sm text-muted-foreground">{step.text}</p>
    </motion.div>
  );
}

export function Process() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ["start start", "end end"],
  });

  const lineWidth = useTransform(
    scrollYProgress,
    [0, 1],
    [`${100 / (STEPS.length * 2)}%`, "100%"]
  );

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const idx = Math.min(STEPS.length - 1, Math.max(0, Math.floor(v * STEPS.length)));
    setActiveIndex(idx);
  });

  return (
    <section id="process" ref={scrollRef} className="relative process-snap" style={{ height: `${STEPS.length * 90}vh` }}>
      {/* Snap sentinels — each one viewport tall, drives proximity snapping */}
      {STEPS.map((s, i) => (
        <div
          key={`snap-${s.title}`}
          aria-hidden
          className="process-snap-stop absolute left-0 right-0 h-screen pointer-events-none"
          style={{ top: `${i * 90}vh` }}
        />
      ))}
      {/* Sticky stage — pins while user scrolls through the step track */}
      <div className="sticky top-0 h-screen flex flex-col justify-center px-5 lg:px-8 bg-gradient-soft overflow-hidden">
        {/* dot pattern */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.4]"
          style={{
            backgroundImage:
              "radial-gradient(hsl(var(--foreground)/0.08) 1px, transparent 1px)",
            backgroundSize: "22px 22px",
            maskImage:
              "radial-gradient(ellipse at center, black 30%, transparent 75%)",
          }}
        />
        <div className="relative mx-auto max-w-7xl w-full">
          <SectionHeading
            eyebrow="Our Process"
            title={
              <>
                Six simple steps to your <span className="text-gradient-brand">approved visa</span>
              </>
            }
          />

          <div className="mt-6 flex justify-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-white px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.22em] text-muted-foreground shadow-soft">
              <span className="h-1.5 w-1.5 rounded-full bg-gradient-brand" />
              Step {String(activeIndex + 1).padStart(2, "0")} / {String(STEPS.length).padStart(2, "0")}
            </span>
          </div>


          <div className="mt-16 relative">
            <div className="absolute left-0 right-0 top-10 hidden lg:block h-0.5 bg-border" />
            <motion.div
              style={{ width: lineWidth }}
              className="absolute left-0 top-10 hidden lg:block h-0.5 bg-gradient-to-r from-brand-deep via-brand-cyan to-brand-aqua"
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-6">
              {STEPS.map((s, i) => (
                <StepCard
                  key={s.title}
                  step={s}
                  index={i}
                  active={i === activeIndex}
                  passed={i < activeIndex}
                />
              ))}
            </div>

            <div className="mt-12 flex items-center justify-center gap-2">
              {STEPS.map((_, i) => (
                <motion.span
                  key={i}
                  animate={{
                    width: i === activeIndex ? 32 : 8,
                    backgroundColor: i <= activeIndex ? "var(--brand-deep)" : "var(--border)",
                  }}
                  className="h-2 rounded-full"
                />
              ))}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
