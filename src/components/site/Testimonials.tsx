import { useEffect, useRef, useState } from "react";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { SectionHeading } from "./Section";
import { supabase } from "@/integrations/supabase/client";

type Review = {
  id: string;
  name: string;
  country: string | null;
  rating: number;
  comment: string;
};

const FALLBACK: Review[] = [
  { id: "f1", name: "Aamir K.", country: "Canada Study Visa", rating: 5, comment: "Excellent service. My Canada visa was approved smoothly and the team guided me at every step." },
  { id: "f2", name: "Sophia M.", country: "UK Family Visa", rating: 5, comment: "They handled all documentation professionally. I never felt lost in the process." },
  { id: "f3", name: "Daniel R.", country: "Australia Skilled", rating: 5, comment: "Highly recommended for student and skilled visas. Truly transparent and supportive." },
  { id: "f4", name: "Priya S.", country: "Schengen Tourist", rating: 5, comment: "Quick turnaround, very organised. Got my Schengen visa within weeks." },
];

export function Testimonials() {
  const [reviews, setReviews] = useState<Review[]>(FALLBACK);
  const [i, setI] = useState(0);
  const cardRef = useRef<HTMLDivElement>(null);
  const [hovering, setHovering] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(mq.matches);
    update();
    mq.addEventListener?.("change", update);
    return () => mq.removeEventListener?.("change", update);
  }, []);

  useEffect(() => {
    supabase
      .from("reviews")
      .select("id,name,country,rating,comment")
      .eq("approved", true)
      .order("created_at", { ascending: false })
      .limit(20)
      .then(({ data }) => {
        if (data && data.length > 0) setReviews(data as Review[]);
      });
  }, []);

  useEffect(() => {
    const id = setInterval(() => setI((p) => (p + 1) % reviews.length), 5500);
    return () => clearInterval(id);
  }, [reviews.length]);

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    el.style.setProperty("--mx", `${x}px`);
    el.style.setProperty("--my", `${y}px`);
    if (reducedMotion) return;
    const px = x / rect.width;
    const py = y / rect.height;
    el.style.setProperty("--rx", `${(0.5 - py) * 6}deg`);
    el.style.setProperty("--ry", `${(px - 0.5) * 8}deg`);
  };

  const onMouseLeave = () => {
    setHovering(false);
    const el = cardRef.current;
    if (!el) return;
    el.style.setProperty("--rx", `0deg`);
    el.style.setProperty("--ry", `0deg`);
  };


  const current = reviews[i % reviews.length];

  return (
    <section id="testimonials" className="relative py-16 sm:py-20 lg:py-24 px-4 sm:px-5 lg:px-8 overflow-hidden">
      {/* Ambient premium background */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-32 left-1/2 h-96 w-[60rem] -translate-x-1/2 rounded-full bg-gradient-brand opacity-[0.07] blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-brand-cyan/10 blur-3xl" />
      </div>

      <div className="mx-auto max-w-5xl">
        <SectionHeading
          eyebrow="Testimonials"
          title={<>Stories from <span className="text-gradient-brand">happy travellers</span></>}
        />

        <div className="mt-14 relative" style={{ perspective: "1200px" }}>
          {/* Animated gradient border wrapper */}
          <div
            ref={cardRef}
            onMouseEnter={() => setHovering(true)}
            onMouseMove={onMouseMove}
            onMouseLeave={onMouseLeave}
            className="group relative rounded-3xl p-[1.5px] shadow-glow transition-transform duration-300 ease-out will-change-transform"
            style={{
              transform: reducedMotion
                ? undefined
                : "rotateX(var(--rx,0deg)) rotateY(var(--ry,0deg))",
              transformStyle: "preserve-3d",
              backgroundImage:
                "linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--brand-cyan, 190 90% 55%)) 50%, hsl(var(--primary)) 100%)",
            }}
          >
            <div
              className="relative overflow-hidden rounded-[calc(var(--radius)+10px)] bg-white p-8 sm:p-12"
              style={{ transform: "translateZ(30px)" }}
            >
              {/* Cursor spotlight */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 transition-opacity duration-300"
                style={{
                  opacity: hovering && !reducedMotion ? 1 : 0,
                  background:
                    "radial-gradient(450px circle at var(--mx,50%) var(--my,50%), hsl(var(--primary)/0.10), transparent 55%)",
                }}
              />
              {/* Subtle grid sheen */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 opacity-[0.04]"
                style={{
                  backgroundImage:
                    "linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)",
                  backgroundSize: "32px 32px",
                  maskImage:
                    "radial-gradient(400px circle at var(--mx,50%) var(--my,50%), black, transparent 70%)",
                }}
              />

              <div className="relative">
                <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-brand shadow-glow transition-transform duration-500 group-hover:-translate-y-1 group-hover:rotate-[-6deg]">
                  <Quote className="h-6 w-6 text-white" />
                </div>

                <p
                  key={current.id}
                  className="mt-6 font-display text-xl sm:text-2xl lg:text-[1.85rem] font-medium leading-snug text-foreground animate-in fade-in slide-in-from-bottom-2 duration-500"
                >
                  "{current.comment}"
                </p>

                <div className="mt-8 flex items-center justify-between border-t border-border/60 pt-6">
                  <div className="flex items-center gap-3">
                    <div className="grid h-11 w-11 place-items-center rounded-full bg-gradient-brand text-sm font-bold text-white shadow-soft">
                      {current.name.charAt(0)}
                    </div>
                    <div>
                      <div className="font-semibold tracking-tight">{current.name}</div>
                      {current.country && (
                        <div className="text-xs uppercase tracking-wider text-muted-foreground">{current.country}</div>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, j) => (
                      <Star
                        key={j}
                        className={`h-4 w-4 transition-transform duration-300 ${
                          j < current.rating
                            ? "fill-brand-aqua text-brand-aqua group-hover:scale-110"
                            : "text-border"
                        }`}
                        style={{ transitionDelay: `${j * 40}ms` }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 flex items-center justify-center gap-3">
            <button
              onClick={() => setI((p) => (p - 1 + reviews.length) % reviews.length)}
              aria-label="Previous"
              className="grid h-11 w-11 place-items-center rounded-full border border-border bg-white shadow-soft transition hover:-translate-y-0.5 hover:border-primary/40 hover:text-primary"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <div className="flex gap-2">
              {reviews.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setI(idx)}
                  aria-label={`Review ${idx + 1}`}
                  className={`h-1.5 rounded-full transition-all duration-500 ${
                    idx === (i % reviews.length) ? "w-10 bg-gradient-brand" : "w-2.5 bg-border hover:bg-muted-foreground/40"
                  }`}
                />
              ))}
            </div>
            <button
              onClick={() => setI((p) => (p + 1) % reviews.length)}
              aria-label="Next"
              className="grid h-11 w-11 place-items-center rounded-full border border-border bg-white shadow-soft transition hover:-translate-y-0.5 hover:border-primary/40 hover:text-primary"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
