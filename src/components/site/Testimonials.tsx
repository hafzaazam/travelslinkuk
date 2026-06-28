import { useEffect, useState } from "react";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { SectionHeading } from "./Section";

const REVIEWS = [
  { name: "Aamir K.", role: "Canada Study Visa", text: "Excellent service. My Canada visa was approved smoothly and the team guided me at every step." },
  { name: "Sophia M.", role: "UK Family Visa", text: "They handled all documentation professionally. I never felt lost in the process." },
  { name: "Daniel R.", role: "Australia Skilled", text: "Highly recommended for student and skilled visas. Truly transparent and supportive." },
  { name: "Priya S.", role: "Schengen Tourist", text: "Quick turnaround, very organised. Got my Schengen visa within weeks." },
];

export function Testimonials() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setI((p) => (p + 1) % REVIEWS.length), 5500);
    return () => clearInterval(id);
  }, []);

  return (
    <section id="testimonials" className="py-24 px-5 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <SectionHeading
          eyebrow="Testimonials"
          title={<>Stories from <span className="text-gradient-brand">happy travellers</span></>}
        />

        <div className="mt-14 relative">
          <div className="rounded-3xl bg-gradient-brand p-1 shadow-glow">
            <div className="rounded-[calc(var(--radius)+8px)] bg-white p-8 sm:p-12">
              <Quote className="h-10 w-10 text-brand-cyan" />
              <p className="mt-4 font-display text-xl sm:text-2xl lg:text-3xl font-medium leading-snug text-foreground">
                "{REVIEWS[i].text}"
              </p>
              <div className="mt-6 flex items-center justify-between">
                <div>
                  <div className="font-semibold">{REVIEWS[i].name}</div>
                  <div className="text-sm text-muted-foreground">{REVIEWS[i].role}</div>
                </div>
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <Star key={j} className="h-4 w-4 fill-brand-aqua text-brand-aqua" />
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-center gap-3">
            <button onClick={() => setI((p) => (p - 1 + REVIEWS.length) % REVIEWS.length)} aria-label="Previous" className="grid h-10 w-10 place-items-center rounded-full border border-border bg-white hover:bg-secondary">
              <ChevronLeft className="h-5 w-5" />
            </button>
            <div className="flex gap-2">
              {REVIEWS.map((_, idx) => (
                <button key={idx} onClick={() => setI(idx)} aria-label={`Review ${idx + 1}`} className={`h-1.5 rounded-full transition-all ${idx === i ? "w-8 bg-primary" : "w-2.5 bg-border"}`} />
              ))}
            </div>
            <button onClick={() => setI((p) => (p + 1) % REVIEWS.length)} aria-label="Next" className="grid h-10 w-10 place-items-center rounded-full border border-border bg-white hover:bg-secondary">
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
