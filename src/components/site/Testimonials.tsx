import { useEffect, useState } from "react";
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

  const current = reviews[i % reviews.length];

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
                "{current.comment}"
              </p>
              <div className="mt-6 flex items-center justify-between">
                <div>
                  <div className="font-semibold">{current.name}</div>
                  {current.country && (
                    <div className="text-sm text-muted-foreground">{current.country}</div>
                  )}
                </div>
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <Star
                      key={j}
                      className={`h-4 w-4 ${
                        j < current.rating
                          ? "fill-brand-aqua text-brand-aqua"
                          : "text-border"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-center gap-3">
            <button onClick={() => setI((p) => (p - 1 + reviews.length) % reviews.length)} aria-label="Previous" className="grid h-10 w-10 place-items-center rounded-full border border-border bg-white hover:bg-secondary">
              <ChevronLeft className="h-5 w-5" />
            </button>
            <div className="flex gap-2">
              {reviews.map((_, idx) => (
                <button key={idx} onClick={() => setI(idx)} aria-label={`Review ${idx + 1}`} className={`h-1.5 rounded-full transition-all ${idx === (i % reviews.length) ? "w-8 bg-primary" : "w-2.5 bg-border"}`} />
              ))}
            </div>
            <button onClick={() => setI((p) => (p + 1) % reviews.length)} aria-label="Next" className="grid h-10 w-10 place-items-center rounded-full border border-border bg-white hover:bg-secondary">
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
