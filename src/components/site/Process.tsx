import { MessageSquare, ClipboardList, FileText, Send, Loader2, CheckCircle2, ArrowRight, ArrowDown } from "lucide-react";
import { motion } from "motion/react";
import { Fragment, useState } from "react";
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
  onHover,
}: {
  step: typeof STEPS[number];
  index: number;
  active: boolean;
  passed: boolean;
  onHover: () => void;
}) {
  const Icon = step.icon;
  return (
    <motion.div
      onMouseEnter={onHover}
      onFocus={onHover}
      tabIndex={0}
      animate={{
        scale: active ? 1.15 : passed ? 1 : 0.94,
        opacity: active ? 1 : passed ? 0.9 : 0.6,
        y: active ? -8 : 0,
      }}
      transition={{ type: "spring", stiffness: 180, damping: 20 }}
      className="relative text-center cursor-pointer outline-none"
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
  const [activeIndex, setActiveIndex] = useState(0);
  const progress = STEPS.length > 1 ? activeIndex / (STEPS.length - 1) : 0;

  return (
    <section id="process" className="relative">
      <div className="relative flex flex-col justify-center px-5 lg:px-8 bg-gradient-soft overflow-hidden py-24">
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

          <div
            className="mt-16 relative"
            onMouseLeave={() => setActiveIndex(0)}
          >
            <div className="absolute left-0 right-0 top-10 hidden lg:block h-0.5 bg-border" />
            <motion.div
              animate={{ width: `${progress * 100}%` }}
              transition={{ type: "spring", stiffness: 120, damping: 22 }}
              className="absolute left-0 top-10 hidden lg:block h-0.5 bg-gradient-to-r from-brand-deep via-brand-cyan to-brand-aqua"
            />
            {/* Mobile / tablet: 2-per-row grid */}
            <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:gap-x-6 sm:gap-y-10 lg:hidden">
              {STEPS.map((s, i) => (
                <StepCard
                  key={s.title}
                  step={s}
                  index={i}
                  active={i === activeIndex}
                  passed={i < activeIndex}
                  onHover={() => setActiveIndex(i)}
                />
              ))}
            </div>


            {/* Desktop: single row */}
            <div className="hidden lg:grid grid-cols-6 gap-6">
              {STEPS.map((s, i) => (
                <StepCard
                  key={s.title}
                  step={s}
                  index={i}
                  active={i === activeIndex}
                  passed={i < activeIndex}
                  onHover={() => setActiveIndex(i)}
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
                  className="h-2 rounded-full cursor-pointer"
                  onMouseEnter={() => setActiveIndex(i)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
