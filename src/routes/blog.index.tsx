import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { ArrowRight, ChevronLeft, ChevronRight, FileText, Search, X } from "lucide-react";

import { supabase } from "@/integrations/supabase/client";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";

type BlogSearch = {
  q: string;
  tag: string;
  page: number;
};

export const Route = createFileRoute("/blog/")({
  validateSearch: (search: Record<string, unknown>): BlogSearch => {
    const rawPage = Number(search.page);
    return {
      q: typeof search.q === "string" ? search.q : "",
      tag: typeof search.tag === "string" ? search.tag : "",
      page: Number.isFinite(rawPage) && rawPage > 0 ? Math.floor(rawPage) : 1,
    };
  },
  head: () => ({
    meta: [
      { title: "The Journal — Travel Links Solution | Visa Tips & Destination Guides" },
      {
        name: "description",
        content:
          "Perspectives from the UK's trusted visa consultancy — guides, embassy updates, and destination inspiration from Travel Links Solution.",
      },
      { property: "og:title", content: "The Journal — Travel Links Solution" },
      {
        property: "og:description",
        content: "Visa guides, embassy updates, and travel inspiration from the UK's trusted visa consultancy.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://travellinks.uk/blog" },
      { property: "og:image", content: "https://travellinks.uk/__l5e/assets-v1/3c87610d-e03b-4302-b077-b7b31f0027e7/why-us-plane.png" },
      { property: "og:image:alt", content: "The Journal — Travel Links Solution visa insights" },
      { name: "twitter:image", content: "https://travellinks.uk/__l5e/assets-v1/3c87610d-e03b-4302-b077-b7b31f0027e7/why-us-plane.png" },
      { property: "og:site_name", content: "Travel Links Solution" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "The Journal — Travel Links Solution" },
      { name: "twitter:description", content: "Visa guides, embassy updates, and travel inspiration from the UK's trusted visa consultancy." },
    ],
    links: [{ rel: "canonical", href: "https://travellinks.uk/blog" }],
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

const formatDate = (d: string) =>
  new Date(d).toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });

function BlogIndex() {
  const { q, tag: activeTag, page } = Route.useSearch();
  const navigate = useNavigate({ from: "/blog" });

  const [posts, setPosts] = useState<PostRow[] | null>(null);
  const [queryInput, setQueryInput] = useState(q);

  useEffect(() => {
    setQueryInput(q);
  }, [q]);

  useEffect(() => {
    if (queryInput === q) return;
    const t = setTimeout(() => {
      navigate({
        search: (prev: BlogSearch) => ({ ...prev, q: queryInput, page: 1 }),
        replace: true,
      });
    }, 250);
    return () => clearTimeout(t);
  }, [queryInput, q, navigate]);

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
    const needle = q.trim().toLowerCase();
    return posts.filter((p) => {
      if (activeTag && !p.tags?.includes(activeTag)) return false;
      if (!needle) return true;
      return (
        p.title.toLowerCase().includes(needle) ||
        (p.excerpt ?? "").toLowerCase().includes(needle) ||
        p.tags?.some((t) => t.toLowerCase().includes(needle))
      );
    });
  }, [posts, q, activeTag]);

  const totalPages = filtered ? Math.max(1, Math.ceil(filtered.length / PAGE_SIZE)) : 1;
  const currentPage = Math.min(page, totalPages);
  const paginated = useMemo(() => {
    if (!filtered) return null;
    const start = (currentPage - 1) * PAGE_SIZE;
    return filtered.slice(start, start + PAGE_SIZE);
  }, [filtered, currentPage]);

  const goToPage = (n: number) => {
    navigate({ search: (prev: BlogSearch) => ({ ...prev, page: n }) });
    if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const setTag = (next: string) => {
    navigate({
      search: (prev: BlogSearch) => ({ ...prev, tag: next, page: 1 }),
      replace: true,
    });
  };

  const clearSearch = () => {
    setQueryInput("");
    navigate({ search: (prev: BlogSearch) => ({ ...prev, q: "", page: 1 }), replace: true });
  };

  const resetAll = () => {
    setQueryInput("");
    navigate({ search: () => ({ q: "", tag: "", page: 1 }), replace: true });
  };

  // Featured + secondary tiles
  const featured = paginated?.[0];
  const secondary = paginated?.slice(1, 3) ?? [];
  const rest = paginated?.slice(3) ?? [];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main className="mx-auto max-w-7xl px-5 pt-28 pb-20 lg:px-12 lg:pt-32">
        {/* Themed header */}
        <header className="relative overflow-hidden rounded-2xl border border-border bg-gradient-hero text-primary-foreground p-8 md:p-12 mb-12 shadow-[var(--shadow-glow)]">
          <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(circle_at_top_right,white,transparent_60%)]" />
          <div className="relative flex flex-col md:flex-row md:items-end justify-between gap-10">
            <div className="space-y-4 max-w-2xl">
              <span className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] font-semibold text-primary-foreground/80">
                <span className="h-px w-8 bg-primary-foreground/60" /> The Journal
              </span>
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-[1.05]">
                Perspectives
              </h1>
              <p className="text-sm md:text-base text-primary-foreground/75 leading-relaxed">
                Visa insights, embassy updates and destination guides from our senior consultants.
              </p>
            </div>

            <div className="w-full md:w-auto flex flex-col md:items-end gap-5">
              <div className="relative w-full md:w-80">
                <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="search"
                  value={queryInput}
                  onChange={(e) => setQueryInput(e.target.value)}
                  placeholder="Search articles..."
                  aria-label="Search articles"
                  className="w-full bg-white text-foreground border border-white/40 rounded-full py-2.5 pl-10 pr-10 text-sm placeholder:text-muted-foreground shadow-md focus:outline-none focus:ring-2 focus:ring-primary-foreground/60 transition"
                />
                {queryInput && (
                  <button
                    type="button"
                    onClick={clearSearch}
                    aria-label="Clear search"
                    className="absolute right-2 top-1/2 -translate-y-1/2 grid h-7 w-7 place-items-center rounded-full text-muted-foreground hover:bg-muted hover:text-foreground"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
            </div>
          </div>

          {allTags.length > 0 && (
            <nav className="relative mt-8 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setTag("")}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition ${
                  !activeTag
                    ? "bg-primary-foreground text-primary"
                    : "bg-primary-foreground/10 text-primary-foreground/80 hover:bg-primary-foreground/20"
                }`}
              >
                All Posts
              </button>
              {allTags.slice(0, 8).map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setTag(activeTag === t ? "" : t)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition ${
                    activeTag === t
                      ? "bg-primary-foreground text-primary"
                      : "bg-primary-foreground/10 text-primary-foreground/80 hover:bg-primary-foreground/20"
                  }`}
                >
                  {t}
                </button>
              ))}
            </nav>
          )}
        </header>

        {posts === null ? (
          <div className="py-24 text-center text-sm text-[#0c2340]/60">Loading articles…</div>
        ) : posts.length === 0 ? (
          <div className="mx-auto max-w-md border border-dashed border-[#0c2340]/20 bg-white/40 p-10 text-center">
            <FileText className="mx-auto h-10 w-10 text-[#0c2340]/30" />
            <p className="mt-4 font-semibold">No articles yet</p>
            <p className="mt-1 text-sm text-[#0c2340]/60">We're preparing our first guides — check back soon.</p>
          </div>
        ) : filtered && filtered.length === 0 ? (
          <div className="mx-auto max-w-md border border-dashed border-[#0c2340]/20 bg-white/40 p-10 text-center">
            <Search className="mx-auto h-10 w-10 text-[#0c2340]/30" />
            <p className="mt-4 font-semibold">No matching articles</p>
            <p className="mt-1 text-sm text-[#0c2340]/60">Try a different keyword or clear filters.</p>
            <button
              type="button"
              onClick={resetAll}
              className="mt-5 border border-[#0c2340] px-4 py-2 text-[10px] font-bold uppercase tracking-widest hover:bg-[#0c2340] hover:text-white transition-colors"
            >
              Reset filters
            </button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 auto-rows-[minmax(200px,auto)]">
              {/* FEATURED */}
              {featured && (
                <Link
                  to="/blog/$slug"
                  params={{ slug: featured.slug }}
                  className="md:col-span-8 md:row-span-2 group cursor-pointer relative overflow-hidden rounded-2xl bg-primary min-h-[420px] md:min-h-[560px] shadow-lg"
                >
                  <div className="absolute inset-0 z-0">
                    {featured.cover_image ? (
                      <img
                        src={featured.cover_image}
                        alt={featured.title}
                        loading="eager"
                        className="w-full h-full object-cover opacity-70 group-hover:scale-105 transition-transform duration-1000"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-primary/80 to-primary" />
                    )}
                  </div>
                  <div className="relative z-10 h-full flex flex-col justify-end p-8 md:p-12 text-primary-foreground bg-gradient-to-t from-primary via-primary/50 to-transparent">
                    <span className="text-[10px] uppercase tracking-widest font-semibold mb-4 inline-block px-2.5 py-1 rounded-full bg-primary-foreground text-primary w-fit">
                      Featured Article
                    </span>
                    <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.05] mb-6 max-w-2xl">
                      {featured.title}
                    </h2>
                    <div className="flex items-center gap-3 text-xs opacity-85">
                      {featured.author && <span>By {featured.author}</span>}
                      {featured.author && <span className="w-1 h-1 bg-primary-foreground/60 rounded-full" />}
                      <span>{formatDate(featured.published_at ?? featured.created_at)}</span>
                    </div>
                  </div>
                </Link>
              )}

              {/* SECONDARY SPOTLIGHT 1 (text-only) */}
              {secondary[0] && (
                <Link
                  to="/blog/$slug"
                  params={{ slug: secondary[0].slug }}
                  className="md:col-span-4 md:row-span-1 rounded-2xl border border-border bg-card p-8 flex flex-col justify-between hover:shadow-lg hover:border-primary/30 transition-all group"
                >
                  <div>
                    <span className="text-[10px] uppercase tracking-widest font-semibold text-primary mb-4 block">
                      {secondary[0].tags?.[0] ?? "Insight"}
                    </span>
                    <h3 className="text-xl md:text-2xl font-semibold leading-tight text-foreground group-hover:text-primary transition-colors">
                      {secondary[0].title}
                    </h3>
                  </div>
                  {secondary[0].excerpt && (
                    <p className="text-sm text-muted-foreground mt-4 line-clamp-2">
                      {secondary[0].excerpt}
                    </p>
                  )}
                </Link>
              )}

              {/* SECONDARY SPOTLIGHT 2 (image bg) */}
              {secondary[1] && (
                <Link
                  to="/blog/$slug"
                  params={{ slug: secondary[1].slug }}
                  className="md:col-span-4 md:row-span-1 rounded-2xl border border-border overflow-hidden group relative min-h-[220px]"
                >
                  <div className="absolute inset-0">
                    {secondary[1].cover_image ? (
                      <img
                        src={secondary[1].cover_image}
                        alt={secondary[1].title}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-primary/20 to-primary/5" />
                    )}
                  </div>
                  <div className="relative z-10 p-6 h-full flex flex-col justify-end bg-gradient-to-t from-primary/95 via-primary/70 to-transparent text-primary-foreground">
                    <h3 className="text-lg md:text-xl font-semibold mb-2 leading-snug">
                      {secondary[1].title}
                    </h3>
                    <span className="text-[10px] uppercase tracking-widest font-semibold inline-flex items-center gap-1 opacity-90">
                      Read Article <ArrowRight className="h-3 w-3" />
                    </span>
                  </div>
                </Link>
              )}

              {/* SUPPORTING GRID */}
              {rest.map((p, i) => {
                const pattern = i % 3;
                if (pattern === 2 && p.cover_image) {
                  return (
                    <Link
                      key={p.id}
                      to="/blog/$slug"
                      params={{ slug: p.slug }}
                      className="md:col-span-6 rounded-2xl border border-border bg-card p-6 flex items-center gap-6 group hover:shadow-lg hover:border-primary/30 transition-all"
                    >
                      <div className="w-28 h-28 md:w-32 md:h-32 flex-shrink-0 overflow-hidden rounded-xl">
                        <img
                          src={p.cover_image}
                          alt={p.title}
                          loading="lazy"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <div className="min-w-0">
                        <span className="text-[10px] uppercase tracking-widest font-semibold text-primary mb-2 block">
                          {p.tags?.[0] ?? "Article"}
                        </span>
                        <h4 className="text-lg md:text-xl font-semibold leading-tight text-foreground group-hover:text-primary transition-colors">
                          {p.title}
                        </h4>
                      </div>
                    </Link>
                  );
                }
                return (
                  <Link
                    key={p.id}
                    to="/blog/$slug"
                    params={{ slug: p.slug }}
                    className="md:col-span-3 rounded-2xl border border-border bg-card p-6 flex flex-col justify-between group hover:shadow-md hover:border-primary/30 transition-all min-h-[200px]"
                  >
                    <h4 className="text-base md:text-lg font-semibold leading-snug text-foreground group-hover:text-primary transition-colors">
                      {p.title}
                    </h4>
                    <div className="mt-6 flex justify-between items-center border-t border-border pt-4">
                      <span className="text-[10px] uppercase font-semibold tracking-widest text-primary truncate max-w-[70%]">
                        {p.tags?.[0] ?? "Article"}
                      </span>
                      <span className="text-[10px] text-muted-foreground shrink-0">
                        {formatDate(p.published_at ?? p.created_at)}
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <nav
                aria-label="Blog pagination"
                className="mt-20 flex items-center justify-between border-t border-border pt-10"
              >
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => goToPage(currentPage - 1)}
                    disabled={currentPage === 1}
                    aria-label="Previous page"
                    className="w-10 h-10 flex items-center justify-center rounded-full border border-border hover:border-primary hover:text-primary transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
                    <button
                      key={n}
                      type="button"
                      onClick={() => goToPage(n)}
                      aria-label={`Page ${n}`}
                      aria-current={n === currentPage ? "page" : undefined}
                      className={`w-10 h-10 flex items-center justify-center rounded-full text-xs font-semibold transition-colors ${
                        n === currentPage
                          ? "bg-primary text-primary-foreground"
                          : "border border-border hover:bg-muted"
                      }`}
                    >
                      {n}
                    </button>
                  ))}
                  <button
                    type="button"
                    onClick={() => goToPage(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    aria-label="Next page"
                    className="w-10 h-10 flex items-center justify-center rounded-full border border-border hover:border-primary hover:text-primary transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
                <span className="text-[10px] uppercase tracking-widest font-semibold text-muted-foreground">
                  Page {currentPage} of {totalPages}
                </span>
              </nav>
            )}
          </>
        )}
      </main>
      <Footer />
    </div>
  );
}
