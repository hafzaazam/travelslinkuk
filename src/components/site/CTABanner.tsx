import { ArrowRight, MessageCircle } from "lucide-react";
import { Reveal } from "./Reveal";
import { openApplyDialog } from "./ApplyDialog";

export function CTABanner() {
  return (
    <section className="px-5 lg:px-8 py-12">
      <Reveal direction="zoom">
        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-3xl bg-gradient-flow p-10 sm:p-14 shadow-glow">
          {/* Animated halo */}
          <div className="absolute -top-20 -right-20 h-72 w-72 rounded-full bg-white/15 blur-3xl animate-float" />
          <div className="absolute -bottom-24 -left-10 h-72 w-72 rounded-full bg-brand-aqua/40 blur-3xl animate-float" style={{ animationDelay: "1.5s" }} />

          {/* Twinkles */}
          <div aria-hidden className="pointer-events-none absolute inset-0">
            {[
              { t: "20%", l: "15%", d: "0s" },
              { t: "70%", l: "30%", d: "0.8s" },
              { t: "35%", l: "75%", d: "1.4s" },
              { t: "85%", l: "60%", d: "2.0s" },
            ].map((p, i) => (
              <span
                key={i}
                className="absolute h-1.5 w-1.5 rounded-full bg-white/80 twinkle-dot"
                style={{ top: p.t, left: p.l, animationDelay: p.d }}
              />
            ))}
          </div>

          <div className="relative flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            <div className="max-w-2xl">
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
                Start your international journey today
              </h2>
              <p className="mt-3 text-white/85 text-lg">
                Book a free consultation with our visa experts and travel with confidence.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <a
                href="#contact"
                className="group relative inline-flex items-center gap-2 overflow-hidden rounded-xl bg-white px-6 py-3.5 text-sm font-semibold text-primary shadow-soft transition hover:-translate-y-0.5 hover:shadow-glow"
              >
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 -skew-x-12 bg-primary/15 blur-md opacity-0 transition-all duration-700 group-hover:opacity-100 group-hover:translate-x-[400%]"
                />
                <span className="relative">Apply Now</span>
                <ArrowRight className="relative h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
              <a
                href={`https://wa.me/447879465341?text=${encodeURIComponent("Hi Travel Links Solution, I'd like to enquire about a visa application.")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl glass-dark text-white px-6 py-3.5 text-sm font-semibold transition hover:bg-white/15 hover:-translate-y-0.5"
              >
                <MessageCircle className="h-4 w-4" /> WhatsApp
              </a>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
