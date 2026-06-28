import { ArrowRight, MessageCircle } from "lucide-react";

export function CTABanner() {
  return (
    <section className="px-5 lg:px-8 py-12">
      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-3xl bg-gradient-brand p-10 sm:p-14 shadow-glow">
        <div className="absolute -top-20 -right-20 h-72 w-72 rounded-full bg-white/15 blur-3xl" />
        <div className="absolute -bottom-24 -left-10 h-72 w-72 rounded-full bg-brand-aqua/40 blur-3xl" />
        <div className="relative flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
          <div className="max-w-2xl">
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
              Start your international journey today
            </h2>
            <p className="mt-3 text-white/85 text-lg">Book a free consultation with our visa experts and travel with confidence.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a href="#contact" className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-semibold text-primary shadow-soft hover:translate-y-[-1px] transition">
              Apply Now <ArrowRight className="h-4 w-4" />
            </a>
            <a href="#contact" className="inline-flex items-center gap-2 rounded-xl glass-dark text-white px-6 py-3.5 text-sm font-semibold hover:bg-white/15 transition">
              <MessageCircle className="h-4 w-4" /> WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
