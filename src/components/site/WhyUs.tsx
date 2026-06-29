import {
  ShieldCheck,
  Trophy,
  FileCheck2,
  Zap,
  Wallet,
  Eye,
  UserCheck,
  Headphones,
  ArrowRight,
} from "lucide-react";
import { Reveal } from "./Reveal";
import { openApplyDialog } from "./ApplyDialog";

type Tone = "primary" | "cyan" | "emerald" | "orange";

const toneStyles: Record<Tone, string> = {
  primary: "bg-primary/10 text-primary",
  cyan: "bg-brand-cyan/15 text-brand-cyan",
  emerald: "bg-emerald-100 text-emerald-600",
  orange: "bg-orange-100 text-orange-600",
};

const SMALL_CARDS: { icon: typeof UserCheck; title: string; text: string; tone: Tone }[] = [
  {
    icon: UserCheck,
    title: "Experienced Consultants",
    text: "Decades of collective expertise in international immigration law.",
    tone: "cyan",
  },
  {
    icon: FileCheck2,
    title: "Complete Documentation",
    text: "We handle the heavy lifting, ensuring every form is perfect.",
    tone: "primary",
  },
  {
    icon: Zap,
    title: "Fast Processing",
    text: "Streamlined systems that cut down waiting times significantly.",
    tone: "emerald",
  },
  {
    icon: Wallet,
    title: "Affordable Packages",
    text: "Quality service shouldn't break the bank. Flexible plans available.",
    tone: "cyan",
  },
  {
    icon: Eye,
    title: "Transparent Fees",
    text: "No hidden charges. Clear, upfront pricing from day one.",
    tone: "orange",
  },
];

export function WhyUs() {
  return (
    <section
      id="why"
      className="relative bg-gradient-soft py-24 px-5 lg:px-8 overflow-hidden"
    >
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
            style={{
              top: p.t,
              left: p.l,
              width: p.s,
              height: p.s,
              animationDelay: p.d,
            }}
          />
        ))}
      </div>

      <div className="relative mx-auto max-w-7xl">
        <div className="flex flex-col lg:flex-row gap-12 items-start">
          {/* Left: Intro */}
          <Reveal className="lg:w-1/3 lg:sticky lg:top-24 space-y-6">
            <div className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary font-semibold text-xs tracking-[0.18em] uppercase">
              Why Choose Us
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground leading-tight">
              Your trusted partner in{" "}
              <span className="text-gradient-brand">global mobility</span>
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              We simplify complex visa processes with expert guidance and
              transparent solutions tailored to your unique journey.
            </p>
            <div className="pt-2">
              <button
                onClick={openApplyDialog}
                className="group inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground font-semibold rounded-xl shadow-soft hover:shadow-glow transition-all"
              >
                Get Started Now
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </Reveal>

          {/* Right: Feature Bento */}
          <div className="lg:w-2/3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Big card: High Success Rate */}
            <Reveal
              direction="up"
              delay={80}
              duration={800}
              className="md:col-span-2 p-8 rounded-3xl bg-card border border-border/60 shadow-soft hover:shadow-glow transition-all group relative overflow-hidden"
            >
              <div
                aria-hidden
                className="absolute -right-6 -top-6 opacity-[0.06] group-hover:opacity-10 transition-opacity"
              >
                <Trophy className="w-36 h-36 text-primary" strokeWidth={1.25} />
              </div>
              <div className="w-12 h-12 rounded-2xl bg-gradient-brand grid place-items-center mb-6 shadow-soft">
                <ShieldCheck className="w-6 h-6 text-primary-foreground" />
              </div>
              <h3 className="font-display text-xl font-bold mb-2">
                High Success Rate
              </h3>
              <p className="text-muted-foreground">
                Our meticulous approach delivers a{" "}
                <span className="font-semibold text-foreground">98% approval rate</span>{" "}
                across study, work, and tourist visas worldwide.
              </p>
              <div className="mt-5 h-1.5 w-full bg-muted rounded-full overflow-hidden">
                <div className="h-full w-[98%] bg-gradient-brand" />
              </div>
            </Reveal>

            {/* Small cards */}
            {SMALL_CARDS.map(({ icon: Icon, title, text, tone }, i) => (
              <Reveal
                key={title}
                direction={i % 3 === 0 ? "left" : i % 3 === 1 ? "up" : "right"}
                delay={140 + i * 90}
                duration={750}
                className="p-6 rounded-3xl bg-card border border-border/60 shadow-soft hover:shadow-glow hover:-translate-y-1 transition-all"
              >
                <div
                  className={`w-10 h-10 rounded-xl grid place-items-center mb-4 ${toneStyles[tone]}`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-display text-lg font-semibold mb-1.5">
                  {title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {text}
                </p>
              </Reveal>
            ))}

            {/* Big card: Personalised + 24/7 */}
            <Reveal
              direction="zoom"
              delay={600}
              duration={850}
              className="md:col-span-2 p-8 rounded-3xl bg-gradient-brand text-primary-foreground shadow-glow relative overflow-hidden group"
            >
              <div className="relative z-10">
                <div className="flex gap-3 mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md grid place-items-center">
                    <UserCheck className="w-6 h-6" />
                  </div>
                  <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md grid place-items-center">
                    <Headphones className="w-6 h-6" />
                  </div>
                </div>
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                  <div>
                    <h3 className="font-display text-2xl font-bold mb-2">
                      Personalised Guidance & 24/7 Support
                    </h3>
                    <p className="text-primary-foreground/85 max-w-md">
                      A dedicated advisor for your journey, plus round-the-clock
                      help over WhatsApp and email — whenever you need us.
                    </p>
                  </div>
                </div>
              </div>
              <div
                aria-hidden
                className="absolute -bottom-12 -right-12 w-56 h-56 bg-white/15 rounded-full blur-3xl"
              />
              <div
                aria-hidden
                className="absolute -top-10 -left-10 w-40 h-40 bg-brand-aqua/30 rounded-full blur-3xl"
              />
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
