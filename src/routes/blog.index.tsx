import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowRight, Calendar, FileText } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { Eyebrow } from "@/components/site/Eyebrow";

export const Route = createFileRoute("/blog/")({
  head: () => ({
    meta: [
      { title: "Blog — Travel Links Solution | Visa Tips & Destination Guides" },
      {
        name: "description",
        content:
          "Visa guides, travel tips, and destination inspiration from Travel Links Solution — the UK's trusted visa consultancy.",
      },
      { property: "og:title", content: "Blog — Travel Links Solution" },
      {
        property: "og:description",
        content: "Visa guides, travel tips, and destination inspiration from the UK's trusted visa consultancy.",
      },
      { rel: "canonical", href: "https://travellinks.uk/blog" } as never,
    ],
  }),
  component: BlogIndex,
});

type PostRow = {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  cover_image: string | null;
  author: string | null;
  tags: string[];
  published_at: string | null;
  created_at: string;
};

function BlogIndex() {
  const [posts, setPosts] = useState<PostRow[] | null>(null);

  useEffect(() => {
    (async () => {
      const { data } = await supabase
        .from("blog_posts")
        .select("id, slug, title, excerpt, cover_image, author, tags, published_at, created_at")
        .eq("published", true)
        .order("published_at", { ascending: false, nullsFirst: false })
        .order("created_at", { ascending: false });
      setPosts((data as PostRow[]) ?? []);
    })();
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="mx-auto max-w-6xl px-5 pt-28 pb-16 lg:px-8 lg:pt-32">
        <div className="mx-auto max-w-2xl text-center">
          <Eyebrow label="The Journal" />
          <h1 className="mt-4 font-display text-4xl font-bold leading-tight md:text-5xl">
            Visa tips, destination guides, and travel stories
          </h1>
          <p className="mt-4 text-muted-foreground">
            Practical advice from our consultants — updated as embassies change their rules.
          </p>
        </div>

        <section className="mt-12">
          {posts === null ? (
            <div className="py-16 text-center text-sm text-muted-foreground">Loading articles…</div>
          ) : posts.length === 0 ? (
            <div className="mx-auto max-w-md rounded-2xl border border-dashed border-border bg-secondary/40 p-10 text-center">
              <FileText className="mx-auto h-10 w-10 text-muted-foreground/50" />
              <p className="mt-4 font-semibold">No articles yet</p>
              <p className="mt-1 text-sm text-muted-foreground">
                We're preparing our first guides — check back soon.
              </p>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {posts.map((p) => (
                <Link
                  key={p.id}
                  to="/blog/$slug"
                  params={{ slug: p.slug }}
                  className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-white shadow-card transition hover:-translate-y-1 hover:shadow-xl"
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
                      {p.tags.slice(0, 3).map((t) => (
                        <span
                          key={t}
                          className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-semibold text-primary"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                    <h2 className="font-display text-lg font-bold leading-snug group-hover:text-primary">
                      {p.title}
                    </h2>
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
              ))}
            </div>
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
}
