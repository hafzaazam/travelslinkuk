import { MessageSquare, ClipboardList, FileText, Send, Loader2, CheckCircle2 } from "lucide-react";
import { motion, useScroll, useTransform, useInView } from "motion/react";
import { useRef } from "react";
import { SectionHeading } from "./Section";

const STEPS = [
  { icon: MessageSquare, title: "Free Consultation", text: "Tell us your goal and we'll outline your options." },
  { icon: ClipboardList, title: "Profile Evaluation", text: "We assess your eligibility and best pathway." },
  { icon: FileText, title: "Document Preparation", text: "Forms, letters and certified copies — all handled." },
  { icon: Send, title: "Application Submission", text: "Filed correctly the first time." },
  { icon: Loader2, title: "Visa Processing", text: "We track your case and respond to queries." },
  { icon: CheckCircle2, title: "Visa Approval", text: "Receive your visa and travel with confidence." },
];

function Step({ step, index, total }: { step: typeof STEPS[number]; index: number; total: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.5, margin: "-10% 0px -10% 0px" });
  const Icon = step.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60, scale: 0.85 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -40, scale: 0.9 }}
      viewport={{ amount: 0.3, margin: "-10% 0px -10% 0px" }}
      transition={{
        duration: 0.7,
        delay: index * 0.06,
        type: "spring",
        stiffness: 90,
        damping: 16,
      }}
      className="relative text-center"
    >
      <motion.div
        animate={{
          scale: inView ? 1.12 : 1,
          y: inView ? -6 : 0,
        }}
        transition={{ type: "spring", stiffness: 200, damping: 18 }}
        className="mx-auto grid h-20 w-20 place-items-center rounded-2xl bg-white border border-border shadow-card relative z-10"
        style={{
          boxShadow: inView
            ? "0 20px 50px -15px oklch(0.6 0.21 268 / 0.45)"
            : undefined,
        }}
      >
        <Icon className="h-7 w-7 text-primary" />
        <motion.span
          animate={{ scale: inView ? 1.15 : 1, rotate: inView ? [0, -8, 0] : 0 }}
          transition={{ duration: 0.5 }}
          className="absolute -top-2 -right-2 grid h-7 w-7 place-items-center rounded-full bg-gradient-brand text-white text-xs font-bold shadow-glow"
        >
          {index + 1}
        </motion.span>
        {inView && (
          <motion.span
            initial={{ scale: 0.6, opacity: 0.7 }}
            animate={{ scale: 1.6, opacity: 0 }}
            transition={{ duration: 1.4, repeat: Infinity }}
            className="absolute inset-0 rounded-2xl border-2 border-primary/40"
          />
        )}
      </motion.div>
      <motion.h3
        animate={{ scale: inView ? 1.05 : 1, color: inView ? "var(--brand-deep)" : "var(--foreground)" }}
        transition={{ duration: 0.3 }}
        className="mt-4 font-display text-base font-semibold"
      >
        {step.title}
      </motion.h3>
      <p className="mt-1.5 text-sm text-muted-foreground">{step.text}</p>
    </motion.div>
  );
}

export function Process() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const lineProgress = useTransform(scrollYProgress, [0.15, 0.75], ["0%", "100%"]);

  return (
    <section ref={sectionRef} id="process" className="py-24 px-5 lg:px-8 overflow-hidden">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Our Process"
          title={<>Six simple steps to your <span className="text-gradient-brand">approved visa</span></>}
        />

        <div className="mt-16 relative">
          {/* Track */}
          <div className="absolute left-0 right-0 top-10 hidden lg:block h-0.5 bg-border" />
          {/* Animated progress line */}
          <motion.div
            style={{ width: lineProgress }}
            className="absolute left-0 top-10 hidden lg:block h-0.5 bg-gradient-to-r from-brand-deep via-brand-cyan to-brand-aqua"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-6">
            {STEPS.map((s, i) => (
              <Step key={s.title} step={s} index={i} total={STEPS.length} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
