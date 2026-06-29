import { useState } from "react";
import { Star, Send } from "lucide-react";
import { z } from "zod";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { SectionHeading } from "./Section";

const schema = z.object({
  name: z.string().trim().min(2, "Enter your name").max(80),
  country: z.string().trim().max(80).optional().or(z.literal("")),
  rating: z.number().int().min(1).max(5),
  comment: z.string().trim().min(10, "Share a few words").max(1000),
});

export function ReviewForm() {
  const [rating, setRating] = useState(5);
  const [hover, setHover] = useState(0);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const parsed = schema.safeParse({
      name: fd.get("name"),
      country: fd.get("country") ?? "",
      rating,
      comment: fd.get("comment"),
    });
    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? "Check the form");
      return;
    }
    setLoading(true);
    const { error } = await supabase.from("reviews").insert({
      name: parsed.data.name,
      country: parsed.data.country || null,
      rating: parsed.data.rating,
      comment: parsed.data.comment,
    });
    setLoading(false);
    if (error) {
      toast.error("Could not submit your review. Please try again.");
      return;
    }
    toast.success("Thank you! Your review will appear after a quick review.");
    (e.target as HTMLFormElement).reset();
    setRating(5);
  };

  return (
    <section id="leave-review" className="py-24 px-5 lg:px-8 bg-secondary/40">
      <div className="mx-auto max-w-3xl">
        <SectionHeading
          eyebrow="Share Your Story"
          title={<>Leave a <span className="text-gradient-brand">review</span></>}
          description="Helping others by sharing your experience with Travel Links Solution."
        />
        <form
          onSubmit={onSubmit}
          className="mt-12 rounded-3xl bg-white border border-border shadow-card p-6 sm:p-8 space-y-5"
        >
          <div className="grid sm:grid-cols-2 gap-4">
            <Field name="name" label="Your Name" placeholder="Jane Doe" required />
            <Field name="country" label="Country / Visa (optional)" placeholder="e.g. Canada Study Visa" />
          </div>

          <div>
            <div id="rating-label" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Rating
            </div>
            <div
              role="radiogroup"
              aria-labelledby="rating-label"
              className="mt-2 flex items-center gap-1"
            >
              {[1, 2, 3, 4, 5].map((n) => {
                const active = (hover || rating) >= n;
                return (
                  <button
                    key={n}
                    type="button"
                    role="radio"
                    aria-checked={rating === n}
                    onMouseEnter={() => setHover(n)}
                    onMouseLeave={() => setHover(0)}
                    onClick={() => setRating(n)}
                    aria-label={`${n} star${n > 1 ? "s" : ""}`}
                    className="p-1"
                  >
                    <Star
                      className={`h-7 w-7 transition ${
                        active ? "fill-brand-aqua text-brand-aqua" : "text-border"
                      }`}
                    />
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <label htmlFor="review-comment" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Your Review
            </label>
            <textarea
              id="review-comment"
              name="comment"
              required
              rows={4}
              maxLength={1000}
              placeholder="Tell us about your experience…"
              className="mt-1.5 w-full rounded-xl border border-border bg-white px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/40"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-brand px-6 py-3.5 text-sm font-bold text-white shadow-glow hover:-translate-y-0.5 transition disabled:opacity-60"
          >
            {loading ? "Submitting…" : "Submit Review"} <Send className="h-4 w-4" />
          </button>
        </form>
      </div>
    </section>
  );
}

function Field({
  name,
  label,
  placeholder,
  required,
}: {
  name: string;
  label: string;
  placeholder?: string;
  required?: boolean;
}) {
  const id = `review-${name}`;
  return (
    <div>
      <label htmlFor={id} className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{label}</label>
      <input
        id={id}
        name={name}
        required={required}
        placeholder={placeholder}
        className="mt-1.5 w-full rounded-xl border border-border bg-white px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/40"
      />
    </div>
  );
}
