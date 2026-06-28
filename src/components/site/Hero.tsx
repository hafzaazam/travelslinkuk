import { useEffect, useState } from "react";
import { ArrowRight, PhoneCall, ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import heroAirport from "@/assets/hero-airport.jpg";
import heroLondon from "@/assets/hero-london.jpg";
import heroTraveler from "@/assets/hero-traveler.jpg";

const SLIDES = [
  {
    image: heroAirport,
    eyebrow: "UK-Based · Trusted Since 2014",
    title: ["Your Trusted UK Visa Consultancy", "for Global Opportunities"],
    subtitle: "Helping students, professionals, families and tourists obtain visas quickly and confidently.",
    primary: "Apply Now",
    secondary: "Free Consultation",
  },
  {
    image: heroLondon,
    eyebrow: "25+ Destinations",
    title: ["Study, Work & Visit", "the World's Top Destinations"],
    subtitle: "Expert visa assistance with high approval guidance and complete documentation support.",
    primary: "Start Your Journey",
    secondary: "Explore Countries",
  },
  {
    image: heroTraveler,
    eyebrow: "98% Client Satisfaction",
    title: ["Fast. Reliable.", "Professional Visa Services"],
    subtitle: "From application to approval, we simplify your immigration journey end-to-end.",
    primary: "Book Consultation",
    secondary: "Our Process",
  },
];

export function Hero() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setI((p) => (p + 1) % SLIDES.length), 6500);
    return () => clearInterval(id);
  }, []);

  return (
    <section id="home" className="relative min-h-[100svh] overflow-hidden">
      {SLIDES.map((s, idx) => (
        <div
          key={idx}
          className={`absolute inset-0 transition-opacity duration-1000 ${idx === i ? "opacity-100" : "opacity-0"}`}
          aria-hidden={idx !== i}
        >
          <img
            src={s.image}
            alt=""
            className="absolute inset-0 h-full w-full object-cover scale-105"
            loading={idx === 0 ? "eager" : "lazy"}
          />
          <div className="absolute inset-0 bg-gradient-hero" />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-deep/60 via-transparent to-brand-deep/30" />
        </div>
      ))}

      {/* glow orbs */}
      <div className="pointer-events-none absolute -top-32 -right-20 h-96 w-96 rounded-full bg-brand-cyan/40 blur-3xl animate-float" />
      <div className="pointer-events-none absolute bottom-10 -left-24 h-96 w-96 rounded-full bg-brand-aqua/30 blur-3xl animate-float" />

      <div className="relative mx-auto flex min-h-[100svh] max-w-7xl flex-col justify-center px-5 pt-32 pb-24 lg:px-8">
        <div key={i} className="max-w-3xl animate-fade-up">
          <span className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-white">
            <Sparkles className="h-3.5 w-3.5 text-brand-aqua" />
            {SLIDES[i].eyebrow}
          </span>
          <h1 className="mt-6 font-display text-4xl font-bold leading-[1.05] text-white sm:text-5xl lg:text-6xl xl:text-7xl">
            {SLIDES[i].title[0]}{" "}
            <span className="block bg-gradient-to-r from-brand-aqua via-brand-cyan to-white bg-clip-text text-transparent">
              {SLIDES[i].title[1]}
            </span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-white/85 sm:text-xl">{SLIDES[i].subtitle}</p>
          <div className="mt-9 flex flex-wrap items-center gap-3">
            <a
              href="#contact"
              className="group inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-semibold text-primary shadow-glow transition hover:translate-y-[-1px]"
            >
              {SLIDES[i].primary}
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-xl glass px-6 py-3.5 text-sm font-semibold text-white hover:bg-white/20 transition"
            >
              <PhoneCall className="h-4 w-4" /> {SLIDES[i].secondary}
            </a>
          </div>

          <div className="mt-12 flex flex-wrap items-center gap-6 text-white/85">
            {[
              ["12,000+", "Visas Approved"],
              ["98%", "Success Rate"],
              ["25+", "Countries"],
            ].map(([n, l]) => (
              <div key={l} className="flex items-center gap-3">
                <span className="font-display text-2xl font-bold text-white">{n}</span>
                <span className="text-sm opacity-80">{l}</span>
              </div>
            ))}
          </div>
        </div>

        {/* controls */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-3">
          <button
            aria-label="Previous slide"
            onClick={() => setI((p) => (p - 1 + SLIDES.length) % SLIDES.length)}
            className="grid h-10 w-10 place-items-center rounded-full glass text-white hover:bg-white/20"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <div className="flex gap-2">
            {SLIDES.map((_, idx) => (
              <button
                key={idx}
                aria-label={`Slide ${idx + 1}`}
                onClick={() => setI(idx)}
                className={`h-1.5 rounded-full transition-all ${idx === i ? "w-8 bg-white" : "w-2.5 bg-white/50"}`}
              />
            ))}
          </div>
          <button
            aria-label="Next slide"
            onClick={() => setI((p) => (p + 1) % SLIDES.length)}
            className="grid h-10 w-10 place-items-center rounded-full glass text-white hover:bg-white/20"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
