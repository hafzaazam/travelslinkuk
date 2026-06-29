import { useEffect, useRef, useState } from "react";
import { ArrowRight, PhoneCall, Star, MapPin, Users, ChevronDown } from "lucide-react";

import heroAirport from "@/assets/hero-airport.jpg";
import heroLondon from "@/assets/hero-london.jpg";
import heroTraveler from "@/assets/hero-traveler.jpg";

const SLIDES = [
  {
    image: heroAirport,
    eyebrow: "UK-Based · Trusted Since 2014",
    title: ["Your Trusted UK Visa Consultancy", "for Global Opportunities"],
    subtitle: "Helping tourists, families and business travellers obtain visas quickly and confidently.",
    primary: "Consult Now",
    secondary: "Free Consultation",
    spotlight: { place: "London Gateway · UK", tag: "From £0 assessment" },
  },
  {
    image: heroLondon,
    eyebrow: "25+ Destinations",
    title: ["Visit the World's", "Top Destinations"],
    subtitle: "Expert visa assistance with high approval guidance and complete documentation support.",
    primary: "Start Your Journey",
    secondary: "Explore Countries",
    spotlight: { place: "Canada · Tourist Visa", tag: "98% approval guidance" },
  },
  {
    image: heroTraveler,
    eyebrow: "98% Client Satisfaction",
    title: ["Fast. Reliable.", "Professional Visa Services"],
    subtitle: "From application to approval, we simplify your travel visa journey end-to-end.",
    primary: "Book Consultation",
    secondary: "Our Process",
    spotlight: { place: "Australia · Tourist Visa", tag: "End-to-end handling" },
  },
];


export function Hero() {
  const [i, setI] = useState(0);
  const [drag, setDrag] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const startX = useRef<number | null>(null);
  const pausedRef = useRef(false);

  const go = (dir: 1 | -1) =>
    setI((p) => (p + dir + SLIDES.length) % SLIDES.length);

  useEffect(() => {
    const id = setInterval(() => {
      if (!pausedRef.current) setI((p) => (p + 1) % SLIDES.length);
    }, 6500);
    return () => clearInterval(id);
  }, []);

  const onPointerDown = (e: React.PointerEvent) => {
    startX.current = e.clientX;
    setIsDragging(true);
    pausedRef.current = true;
    (e.target as Element).setPointerCapture?.(e.pointerId);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (startX.current === null) return;
    setDrag(e.clientX - startX.current);
  };
  const endDrag = () => {
    const threshold = 60;
    if (drag > threshold) go(-1);
    else if (drag < -threshold) go(1);
    startX.current = null;
    setDrag(0);
    setIsDragging(false);
    setTimeout(() => (pausedRef.current = false), 800);
  };

  const slide = SLIDES[i];

  return (
    <section
      id="home"
      className="relative min-h-[100svh] overflow-hidden touch-pan-y select-none bg-[#04081a]"
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
      onPointerLeave={() => startX.current !== null && endDrag()}
    >
      {/* Background slides */}
      {SLIDES.map((s, idx) => (
        <div
          key={idx}
          className={`absolute inset-0 transition-opacity duration-1000 ${idx === i ? "opacity-100" : "opacity-0"}`}
          aria-hidden={idx !== i}
        >
          <img
            src={s.image}
            alt=""
            className={`absolute inset-0 h-full w-full object-cover scale-105 transition-transform duration-[8000ms] ease-out ${
              idx === i ? "scale-110" : "scale-105"
            }`}
            loading={idx === 0 ? "eager" : "lazy"}
            fetchPriority={idx === 0 ? "high" : "auto"}
            decoding={idx === 0 ? "sync" : "async"}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#04081a] via-[#04081a]/75 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#04081a] via-[#04081a]/40 to-transparent" />
        </div>
      ))}

      {/* Glow orbs */}
      <div className="pointer-events-none absolute top-1/4 -left-20 h-96 w-96 rounded-full bg-brand-cyan/20 blur-[120px] animate-float" />
      <div className="pointer-events-none absolute bottom-1/4 -right-20 h-96 w-96 rounded-full bg-primary/15 blur-[120px] animate-float" />

      {/* Subtle grain */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.05] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)' opacity='0.55'/></svg>\")",
        }}
      />

      {/* Main content grid */}
      <div className="relative mx-auto grid min-h-[100svh] max-w-7xl items-center gap-10 px-5 pt-32 pb-40 lg:grid-cols-2 lg:px-8 lg:pb-32">
        {/* Left column */}
        <div
          key={i}
          className="relative max-w-xl animate-fade-up will-change-transform"
          style={{
            transform: `translateX(${drag * 0.25}px)`,
            transition: isDragging ? "none" : "transform 400ms cubic-bezier(0.2,0.8,0.2,1)",
          }}
        >
          {/* Eyebrow */}
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.22em] text-white shadow-soft backdrop-blur-xl">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-aqua opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-aqua" />
            </span>
            <span className="text-brand-aqua">{slide.eyebrow}</span>
          </span>

          {/* Headline */}
          <h1 className="mt-7 font-display text-4xl font-extrabold leading-[1.05] tracking-tight text-white drop-shadow-[0_4px_24px_rgba(8,18,48,0.45)] sm:text-5xl lg:text-6xl xl:text-7xl">
            {slide.title[0]}{" "}
            <span className="block bg-gradient-to-r from-brand-aqua via-brand-cyan to-white bg-clip-text text-transparent">
              {slide.title[1]}
            </span>
          </h1>

          {/* Subtitle */}
          <p className="mt-6 max-w-lg text-base font-medium leading-relaxed text-white/80 sm:text-lg">
            {slide.subtitle}
          </p>

          {/* CTAs */}
          <div className="mt-10 flex flex-wrap items-center gap-5">
            <button
              type="button"
              onClick={() => import("./ApplyDialog").then(m => m.openApplyDialog())}
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-xl bg-gradient-brand px-7 py-4 text-sm font-bold text-white shadow-[0_18px_40px_-12px_rgba(33,87,243,0.7)] transition-all hover:-translate-y-0.5 hover:shadow-[0_22px_50px_-12px_rgba(61,99,255,0.85)]"
            >
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-white/0 via-white/25 to-white/0 transition-transform duration-700 group-hover:translate-x-full" />
              <span className="relative">{slide.primary}</span>
              <ArrowRight className="relative h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
            <a
              href="tel:+447879465341"
              className="group inline-flex items-center gap-3 text-sm font-semibold text-white transition-colors hover:text-brand-aqua"
            >
              <span className="grid h-12 w-12 place-items-center rounded-full border border-white/20 bg-white/5 backdrop-blur-md transition-colors group-hover:border-brand-aqua/60 group-hover:bg-brand-aqua/10">
                <PhoneCall className="h-5 w-5 text-brand-aqua" />
              </span>
              {slide.secondary}
            </a>
          </div>
        </div>

        {/* Right visual column */}
        <div className="relative hidden lg:flex justify-center items-center h-full">
          {/* Floating destination card */}
          <div
            key={`card-${i}`}
            className="relative z-20 w-80 rounded-3xl border border-white/10 bg-white/5 p-4 rotate-3 shadow-2xl backdrop-blur-xl transition-transform duration-500 hover:rotate-0 animate-fade-up"
          >
            <div className="relative h-48 w-full overflow-hidden rounded-2xl">
              <img src={slide.image} alt="" loading="lazy" decoding="async" className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#04081a]/60 to-transparent" />
              <div className="absolute top-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-white/10 backdrop-blur-md px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-white border border-white/15">
                <MapPin className="h-3 w-3 text-brand-aqua" />
                Featured
              </div>
            </div>
            <div className="mt-4 flex items-end justify-between">
              <div className="min-w-0">
                <h4 className="font-display text-lg font-bold text-white truncate">{slide.spotlight.place}</h4>
                <p className="text-sm font-medium text-brand-aqua">{slide.spotlight.tag}</p>
              </div>
              <div className="inline-flex shrink-0 items-center gap-1 rounded-lg border border-white/10 bg-white/10 px-2 py-1 text-xs font-bold text-white">
                <Star className="h-3 w-3 fill-brand-aqua text-brand-aqua" />
                4.9
              </div>
            </div>
          </div>

          {/* Decor stat card */}
          <div className="absolute -bottom-2 -left-6 w-64 -rotate-6 rounded-2xl border border-brand-cyan/20 bg-[#06112b]/60 p-4 shadow-xl backdrop-blur-lg">
            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-full bg-brand-cyan/20">
                <Users className="h-5 w-5 text-brand-cyan" />
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-brand-cyan/70">Total Travellers</p>
                <p className="font-bold text-white">12,482 Approved</p>
              </div>
            </div>
          </div>
        </div>
      </div>


    </section>
  );
}
