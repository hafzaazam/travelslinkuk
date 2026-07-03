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
    <div className="min-h-screen bg-[#fdfbf7] text-[#0c2340]" style={{ fontFamily: "'Work Sans', system-ui, sans-serif" }}>
      <Header />
      <main className="mx-auto max-w-7xl px-5 pt-28 pb-20 lg:px-12 lg:pt-32">
        {/* Editorial header */}
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-10 border-b border-[#0c2340]/10 pb-10 mb-12">
          <div className="space-y-3">
            <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-teal-600">The Journal</span>
            <h1
              className="text-5xl md:text-7xl lg:text-8xl font-normal tracking-tight leading-none"
              style={{ fontFamily: "'Instrument Serif', 'Cormorant Garamond', Georgia, serif" }}
            >
              Perspectives
            </h1>
            <p className="max-w-md text-sm text-[#0c2340]/60 pt-2">
              Visa insights, embassy updates and destination guides from our senior consultants.
            </p>
          </div>

          <div className="w-full md:w-auto flex flex-col md:items-end gap-6">
            <div className="relative w-full md:w-72">
              <input
                type="search"
                value={queryInput}
                onChange={(e) => setQueryInput(e.target.value)}
                placeholder="Search archives..."
                aria-label="Search articles"
                className="w-full bg-transparent border-b border-[#0c2340]/20 py-2 pr-8 focus:border-[#0c2340] focus:outline-none placeholder:text-[#0c2340]/40 text-sm transition-colors"
              />
              {queryInput ? (
                <button
                  type="button"
                  onClick={clearSearch}
                  aria-label="Clear search"
                  className="absolute right-0 top-1.5 grid h-7 w-7 place-items-center text-[#0c2340]/50 hover:text-[#0c2340]"
                >
                  <X className="h-4 w-4" />
                </button>
              ) : (
                <Search className="pointer-events-none absolute right-0 top-3 h-4 w-4 opacity-40" />
              )}
            </div>

            {allTags.length > 0 && (
              <nav className="flex flex-wrap gap-x-6 gap-y-3 text-[11px] font-bold uppercase tracking-widest">
                <button
                  type="button"
                  onClick={() => setTag("")}
                  className={`pb-1 transition ${
                    !activeTag
                      ? "text-teal-600 border-b border-teal-600"
                      : "text-[#0c2340]/40 hover:text-[#0c2340]"
                  }`}
                >
                  All Posts
                </button>
                {allTags.slice(0, 6).map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setTag(activeTag === t ? "" : t)}
                    className={`pb-1 transition ${
                      activeTag === t
                        ? "text-teal-600 border-b border-teal-600"
                        : "text-[#0c2340]/40 hover:text-[#0c2340]"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </nav>
            )}
          </div>
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
                  className="md:col-span-8 md:row-span-2 group cursor-pointer relative overflow-hidden bg-[#0c2340] min-h-[420px] md:min-h-[560px]"
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
                      <div className="w-full h-full bg-gradient-to-br from-[#1a4a6e] to-[#0c2340]" />
                    )}
                  </div>
                  <div className="relative z-10 h-full flex flex-col justify-end p-8 md:p-12 text-white bg-gradient-to-t from-[#0c2340] via-[#0c2340]/40 to-transparent">
                    <span className="text-[10px] uppercase tracking-widest mb-4 inline-block px-2 py-1 bg-teal-600 w-fit">
                      Featured Article
                    </span>
                    <h2
                      className="text-3xl md:text-5xl lg:text-6xl leading-[0.95] mb-6 max-w-2xl"
                      style={{ fontFamily: "'Instrument Serif', 'Cormorant Garamond', Georgia, serif" }}
                    >
                      {featured.title}
                    </h2>
                    <div className="flex items-center gap-4 text-xs font-light opacity-80">
                      {featured.author && <span>By {featured.author}</span>}
                      {featured.author && <span className="w-1 h-1 bg-teal-500 rounded-full" />}
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
                  className="md:col-span-4 md:row-span-1 border border-[#0c2340]/10 p-8 flex flex-col justify-between hover:bg-white hover:shadow-xl transition-all group"
                >
                  <div>
                    <span className="text-[10px] uppercase tracking-widest text-[#0c2340]/40 mb-4 block">
                      {secondary[0].tags?.[0] ?? "Insight"}
                    </span>
                    <h3
                      className="text-2xl leading-tight group-hover:text-teal-600 transition-colors"
                      style={{ fontFamily: "'Instrument Serif', serif" }}
                    >
                      {secondary[0].title}
                    </h3>
                  </div>
                  {secondary[0].excerpt && (
                    <p className="text-sm text-[#0c2340]/60 mt-4 line-clamp-2 font-light">
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
                  className="md:col-span-4 md:row-span-1 border border-[#0c2340]/10 overflow-hidden group relative min-h-[220px]"
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
                      <div className="w-full h-full bg-gradient-to-br from-teal-100 to-[#0c2340]/10" />
                    )}
                  </div>
                  <div className="relative z-10 p-8 h-full flex flex-col justify-end bg-white/90 backdrop-blur-sm group-hover:bg-[#0c2340]/90 group-hover:text-white transition-all">
                    <h3
                      className="text-xl mb-2 italic"
                      style={{ fontFamily: "'Instrument Serif', serif" }}
                    >
                      {secondary[1].title}
                    </h3>
                    <span className="text-[10px] uppercase tracking-widest opacity-60 inline-flex items-center gap-1">
                      Read Article <ArrowRight className="h-3 w-3" />
                    </span>
                  </div>
                </Link>
              )}

              {/* SUPPORTING GRID */}
              {rest.map((p, i) => {
                // Alternate tile widths: two small (3/12) then one wide (6/12) with image
                const pattern = i % 3;
                if (pattern === 2 && p.cover_image) {
                  return (
                    <Link
                      key={p.id}
                      to="/blog/$slug"
                      params={{ slug: p.slug }}
                      className="md:col-span-6 border border-[#0c2340]/10 bg-white p-6 flex items-center gap-6 group hover:shadow-lg transition-shadow"
                    >
                      <div className="w-32 h-32 flex-shrink-0 overflow-hidden">
                        <img
                          src={p.cover_image}
                          alt={p.title}
                          loading="lazy"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <div className="min-w-0">
                        <span className="text-[10px] uppercase tracking-widest text-teal-600 mb-2 block">
                          {p.tags?.[0] ?? "Article"}
                        </span>
                        <h4
                          className="text-xl md:text-2xl leading-tight group-hover:text-teal-700 transition-colors"
                          style={{ fontFamily: "'Instrument Serif', serif" }}
                        >
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
                    className="md:col-span-3 border border-[#0c2340]/10 p-6 flex flex-col justify-between group hover:bg-white hover:shadow-md transition-all min-h-[200px]"
                  >
                    <h4
                      className="text-lg leading-snug group-hover:text-teal-700 transition-colors"
                      style={{ fontFamily: "'Instrument Serif', serif" }}
                    >
                      {p.title}
                    </h4>
                    <div className="mt-8 flex justify-between items-center border-t border-[#0c2340]/10 pt-4">
                      <span className="text-[10px] uppercase font-bold text-teal-600 truncate max-w-[70%]">
                        {p.tags?.[0] ?? "Article"}
                      </span>
                      <span className="text-[10px] opacity-40 shrink-0">
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
                className="mt-20 flex items-center justify-between border-t border-[#0c2340]/10 pt-10"
              >
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => goToPage(currentPage - 1)}
                    disabled={currentPage === 1}
                    aria-label="Previous page"
                    className="w-10 h-10 flex items-center justify-center border border-[#0c2340]/10 hover:border-[#0c2340] transition-colors disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:border-[#0c2340]/10"
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
                      className={`w-10 h-10 flex items-center justify-center text-xs font-bold transition-colors ${
                        n === currentPage
                          ? "bg-[#0c2340] text-white"
                          : "border border-[#0c2340]/10 hover:bg-[#0c2340]/5"
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
                    className="w-10 h-10 flex items-center justify-center border border-[#0c2340]/10 hover:border-[#0c2340] transition-colors disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:border-[#0c2340]/10"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
                <span className="text-[10px] uppercase tracking-widest font-bold opacity-40">
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
