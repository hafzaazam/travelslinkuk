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
          <div className="absolute inset-0 bg-gradient-to-br from-[#050b1f]/85 via-[#081637]/75 to-[#0a1e4a]/80" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#04081a]/95 via-[#06112b]/55 to-[#04081a]/40" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_35%,rgba(61,99,255,0.28)_0%,transparent_55%),radial-gradient(circle_at_85%_75%,rgba(33,87,243,0.22)_0%,transparent_55%)]" />
        </div>
      ))}

      {/* glow orbs */}
      <div className="pointer-events-none absolute -top-32 -right-20 h-96 w-96 rounded-full bg-brand-cyan/25 blur-3xl animate-float" />
      <div className="pointer-events-none absolute bottom-10 -left-24 h-96 w-96 rounded-full bg-brand-aqua/20 blur-3xl animate-float" />

      <div className="relative mx-auto flex min-h-[100svh] max-w-7xl flex-col justify-center px-5 pt-32 pb-28 lg:px-8">
        {/* soft scrim behind text for legibility */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-full lg:w-3/5 bg-gradient-to-r from-[#04081a]/85 via-[#04081a]/50 to-transparent" />


        <div key={i} className="relative max-w-3xl animate-fade-up">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.22em] text-white shadow-soft backdrop-blur-xl">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-aqua opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-aqua" />
            </span>
            <span className="text-brand-aqua">{SLIDES[i].eyebrow}</span>
          </span>
          <h1 className="mt-7 font-display text-4xl font-extrabold leading-[1.05] tracking-tight text-white drop-shadow-[0_4px_24px_rgba(8,18,48,0.45)] sm:text-5xl lg:text-6xl xl:text-7xl">
            {SLIDES[i].title[0]}{" "}
            <span className="block bg-gradient-to-r from-brand-aqua via-brand-cyan to-white bg-clip-text text-transparent">
              {SLIDES[i].title[1]}
            </span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg font-medium leading-relaxed text-white/85 sm:text-xl">
            {SLIDES[i].subtitle}
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-3">
            <a
              href="#contact"
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-xl bg-gradient-brand px-7 py-4 text-sm font-bold text-white shadow-[0_18px_40px_-12px_rgba(33,87,243,0.7)] transition-all hover:-translate-y-0.5 hover:shadow-[0_22px_50px_-12px_rgba(61,99,255,0.85)]"
            >
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-white/0 via-white/25 to-white/0 transition-transform duration-700 group-hover:translate-x-full" />
              <span className="relative">{SLIDES[i].primary}</span>
              <ArrowRight className="relative h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/5 px-7 py-4 text-sm font-bold text-white backdrop-blur-md transition hover:border-white/40 hover:bg-white/10"
            >
              <PhoneCall className="h-4 w-4 text-brand-aqua" /> {SLIDES[i].secondary}
            </a>
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
