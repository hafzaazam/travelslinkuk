import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Calendar, FileText } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Eyebrow } from "@/components/site/Eyebrow";
import { Reveal } from "@/components/site/Reveal";

type PostRow = {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  cover_image: string | null;
  tags: string[];
  published_at: string | null;
  created_at: string;
};

export function BlogPreview() {
  const [posts, setPosts] = useState<PostRow[] | null>(null);

  useEffect(() => {
    (async () => {
      const { data } = await supabase
        .from("blog_posts")
        .select("id, slug, title, excerpt, cover_image, tags, published_at, created_at")
        .eq("published", true)
        .order("published_at", { ascending: false, nullsFirst: false })
        .order("created_at", { ascending: false })
        .limit(3);
      setPosts((data as PostRow[]) ?? []);
    })();
  }, []);

  if (posts !== null && posts.length === 0) return null;

  return (
    <section id="blog" className="py-24 px-5 lg:px-8 bg-secondary/30">
      <div className="mx-auto max-w-7xl">
        <Reveal className="mx-auto max-w-2xl text-center">
          <Eyebrow label="From the Journal" />
          <h2 className="mt-4 font-display text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
            Visa insights & <span className="text-gradient-brand">travel guides</span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Practical advice from our consultants — updated as embassies change their rules.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {(posts ?? Array.from({ length: 3 })).map((p: any, i: number) => (
            <Reveal key={p?.id ?? i} delay={i * 100}>
              {p ? (
                <Link
                  to="/blog/$slug"
                  params={{ slug: p.slug }}
                  className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-white shadow-card transition hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="aspect-[16/10] overflow-hidden bg-secondary">
                    {p.cover_image ? (
                      <img
                        src={p.cover_image}
                        alt={p.title}
                        loading="lazy"
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="grid h-full w-full place-items-center text-muted-foreground/40">
                        <FileText className="h-10 w-10" />
                      </div>
                    )}
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <div className="mb-2 flex flex-wrap gap-1.5">
                      {p.tags?.slice(0, 3).map((t: string) => (
                        <span
                          key={t}
                          className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-semibold text-primary"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                    <h3 className="font-display text-lg font-bold leading-snug group-hover:text-primary">
                      {p.title}
                    </h3>
                    {p.excerpt && (
                      <p className="mt-2 line-clamp-3 flex-1 text-sm text-muted-foreground">
                        {p.excerpt}
                      </p>
                    )}
                    <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
                      <span className="inline-flex items-center gap-1">
                        <Calendar className="h-3.5 w-3.5" />
                        {new Date(p.published_at ?? p.created_at).toLocaleDateString(undefined, {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </span>
                      <span className="inline-flex items-center gap-1 font-semibold text-primary">
                        Read <ArrowRight className="h-3.5 w-3.5" />
                      </span>
                    </div>
                  </div>
                </Link>
              ) : (
                <div className="h-full animate-pulse rounded-2xl border border-border bg-white">
                  <div className="aspect-[16/10] bg-secondary" />
                  <div className="p-5 space-y-3">
                    <div className="h-4 w-3/4 rounded bg-secondary" />
                    <div className="h-3 w-full rounded bg-secondary" />
                    <div className="h-3 w-2/3 rounded bg-secondary" />
                  </div>
                </div>
              )}
            </Reveal>
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-brand px-6 py-3 text-sm font-bold text-white shadow-soft hover:shadow-glow hover:-translate-y-0.5 transition"
          >
            View all articles
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
