import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { ArrowRight, Calendar, ChevronLeft, ChevronRight, FileText, Search, X } from "lucide-react";

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

const PAGE_SIZE = 9;

function BlogIndex() {
  const [posts, setPosts] = useState<PostRow[] | null>(null);
  const [query, setQuery] = useState("");
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [page, setPage] = useState(1);

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

  const allTags = useMemo(() => {
    if (!posts) return [];
    const set = new Set<string>();
    posts.forEach((p) => p.tags?.forEach((t) => set.add(t)));
    return Array.from(set).sort((a, b) => a.localeCompare(b));
  }, [posts]);

  const filtered = useMemo(() => {
    if (!posts) return null;
    const q = query.trim().toLowerCase();
    return posts.filter((p) => {
      if (activeTag && !p.tags?.includes(activeTag)) return false;
      if (!q) return true;
      return (
        p.title.toLowerCase().includes(q) ||
        (p.excerpt ?? "").toLowerCase().includes(q) ||
        p.tags?.some((t) => t.toLowerCase().includes(q))
      );
    });
  }, [posts, query, activeTag]);

  useEffect(() => {
    setPage(1);
  }, [query, activeTag]);

  const totalPages = filtered ? Math.max(1, Math.ceil(filtered.length / PAGE_SIZE)) : 1;
  const currentPage = Math.min(page, totalPages);
  const paginated = useMemo(() => {
    if (!filtered) return null;
    const start = (currentPage - 1) * PAGE_SIZE;
    return filtered.slice(start, start + PAGE_SIZE);
  }, [filtered, currentPage]);

  const goToPage = (n: number) => {
    setPage(n);
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };


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

        {posts && posts.length > 0 && (
          <div className="mx-auto mt-10 max-w-3xl">
            <div className="relative">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search articles by title, tag, or keyword…"
                aria-label="Search articles"
                className="w-full rounded-full border border-border bg-white py-3 pl-11 pr-11 text-sm shadow-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  aria-label="Clear search"
                  className="absolute right-3 top-1/2 grid h-7 w-7 -translate-y-1/2 place-items-center rounded-full text-muted-foreground transition hover:bg-secondary hover:text-foreground"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>

            {allTags.length > 0 && (
              <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
                <button
                  type="button"
                  onClick={() => setActiveTag(null)}
                  className={`rounded-full px-3 py-1 text-xs font-semibold transition ${
                    activeTag === null
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-muted-foreground hover:bg-secondary/70"
                  }`}
                >
                  All
                </button>
                {allTags.map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setActiveTag(activeTag === t ? null : t)}
                    className={`rounded-full px-3 py-1 text-xs font-semibold transition ${
                      activeTag === t
                        ? "bg-primary text-primary-foreground"
                        : "bg-primary/10 text-primary hover:bg-primary/20"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        <section className="mt-10">
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
          ) : filtered && filtered.length === 0 ? (
            <div className="mx-auto max-w-md rounded-2xl border border-dashed border-border bg-secondary/40 p-10 text-center">
              <Search className="mx-auto h-10 w-10 text-muted-foreground/50" />
              <p className="mt-4 font-semibold">No matching articles</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Try a different keyword or clear the filters.
              </p>
              <button
                type="button"
                onClick={() => {
                  setQuery("");
                  setActiveTag(null);
                }}
                className="mt-4 rounded-full bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground transition hover:bg-primary/90"
              >
                Reset filters
              </button>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filtered!.map((p) => (

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
