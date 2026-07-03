import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowLeft, Calendar, User } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { supabase } from "@/integrations/supabase/client";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";

type Post = {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  content: string;
  cover_image: string | null;
  author: string | null;
  tags: string[];
  published_at: string | null;
  created_at: string;
  meta_title?: string | null;
  meta_description?: string | null;
  meta_keywords?: string | null;
  og_image?: string | null;
  canonical_url?: string | null;
  noindex?: boolean | null;
};

const SITE = "https://travellinks.uk";

async function fetchPost(slug: string): Promise<Post | null> {
  const { data } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("slug", slug)
    .eq("published", true)
    .maybeSingle();
  return (data as Post) ?? null;
}

export const Route = createFileRoute("/blog/$slug")({
  loader: async ({ params }) => {
    const post = await fetchPost(params.slug);
    if (!post) throw notFound();
    return { post };
  },
  head: ({ params, loaderData }) => {
    if (!loaderData) {
      return {
        meta: [
          { title: "Article not found — Travel Links Solution" },
          { name: "robots", content: "noindex" },
        ],
      };
    }
    const { post } = loaderData;
    const title = post.meta_title?.trim() || `${post.title} — Travel Links Solution Blog`;
    const desc =
      post.meta_description?.trim() ||
      post.excerpt ||
      (post.content ? post.content.replace(/[#*_`>[\]()!-]|<[^>]+>/g, "").trim().slice(0, 155) : "");
    const FALLBACK_OG = "https://travellinks.uk/__l5e/assets-v1/3c87610d-e03b-4302-b077-b7b31f0027e7/why-us-plane.png";
    const rawImage = post.og_image?.trim() || post.cover_image || undefined;
    const image = rawImage
      ? (rawImage.startsWith("http") ? rawImage : `${SITE}${rawImage.startsWith("/") ? "" : "/"}${rawImage}`)
      : FALLBACK_OG;
    const url = post.canonical_url?.trim() || `${SITE}/blog/${params.slug}`;

    return {
      meta: [
        { title },
        { name: "description", content: desc },
        ...(post.meta_keywords ? [{ name: "keywords", content: post.meta_keywords }] : []),
        ...(post.noindex ? [{ name: "robots", content: "noindex, nofollow" }] : []),
        { property: "og:title", content: post.meta_title?.trim() || post.title },
        { property: "og:description", content: desc },
        { property: "og:type", content: "article" },
        { property: "og:url", content: url },
        { property: "og:site_name", content: "Travel Links Solution" },
        ...(post.published_at
          ? [{ property: "article:published_time", content: post.published_at }]
          : []),
        ...(post.author ? [{ property: "article:author", content: post.author }] : []),
        ...(post.tags ?? []).map((t) => ({ property: "article:tag", content: t })),
        ...(image
          ? [
              { property: "og:image", content: image },
              { name: "twitter:image", content: image },
            ]
          : []),
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: post.meta_title?.trim() || post.title },
        { name: "twitter:description", content: desc },
      ],
      links: [{ rel: "canonical", href: url }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: post.title,
            description: desc,
            image: image ? [image] : undefined,
            datePublished: post.published_at ?? undefined,
            author: post.author ? { "@type": "Person", name: post.author } : undefined,
            publisher: {
              "@type": "Organization",
              name: "Travel Links Solution",
              logo: { "@type": "ImageObject", url: `${SITE}/favicon.ico` },
            },
            mainEntityOfPage: { "@type": "WebPage", "@id": url },
            keywords: post.meta_keywords || (post.tags ?? []).join(", ") || undefined,
          }),
        },
      ],
    };
  },
  notFoundComponent: PostNotFound,
  errorComponent: PostNotFound,
  component: PostPage,
});

function PostPage() {
  const { post } = Route.useLoaderData();
  const [related, setRelated] = useState<Post[]>([]);

  useEffect(() => {
    (async () => {
      const { data } = await supabase
        .from("blog_posts")
        .select("id, slug, title, excerpt, content, cover_image, author, tags, published_at, created_at")
        .eq("published", true)
        .neq("id", post.id)
        .order("published_at", { ascending: false, nullsFirst: false })
        .limit(3);
      setRelated((data as Post[]) ?? []);
    })();
  }, [post.id]);

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="mx-auto max-w-3xl px-5 pt-28 pb-16 lg:px-8 lg:pt-32">
        <Link
          to="/blog"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-muted-foreground hover:text-primary"
        >
          <ArrowLeft className="h-4 w-4" /> All articles
        </Link>

        <article className="mt-6">
          <div className="mb-3 flex flex-wrap gap-1.5">
            {post.tags.map((t: string) => (
              <span
                key={t}
                className="rounded-full bg-primary/10 px-2.5 py-1 text-[11px] font-semibold text-primary"
              >
                {t}
              </span>
            ))}
          </div>
          <h1 className="font-display text-3xl font-bold leading-tight md:text-5xl">
            {post.title}
          </h1>
          <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            {post.author && (
              <span className="inline-flex items-center gap-1.5">
                <User className="h-4 w-4" /> {post.author}
              </span>
            )}
            <span className="inline-flex items-center gap-1.5">
              <Calendar className="h-4 w-4" />
              {new Date(post.published_at ?? post.created_at).toLocaleDateString(undefined, {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          </div>

          {post.cover_image && (
            <img
              src={post.cover_image}
              alt={post.title}
              className="mt-8 aspect-[16/9] w-full rounded-2xl object-cover shadow-card"
            />
          )}

          {post.excerpt && (
            <p className="mt-8 text-lg leading-relaxed text-muted-foreground">{post.excerpt}</p>
          )}

          <div className="prose prose-lg mt-8 max-w-none prose-headings:font-display prose-a:text-primary prose-img:rounded-xl prose-img:shadow-card">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                img: ({ node, ...props }) => (
                  <img
                    {...props}
                    loading="lazy"
                    className="my-8 aspect-[16/9] w-full rounded-xl object-cover shadow-card"
                  />
                ),
              }}
            >
              {post.content}
            </ReactMarkdown>
          </div>
        </article>

        {related.length > 0 && (
          <section className="mt-16 border-t border-border pt-10">
            <h2 className="font-display text-xl font-bold">Keep reading</h2>
            <div className="mt-5 grid gap-4 sm:grid-cols-3">
              {related.map((r) => (
                <Link
                  key={r.id}
                  to="/blog/$slug"
                  params={{ slug: r.slug }}
                  className="group rounded-xl border border-border bg-white p-4 shadow-card transition hover:-translate-y-0.5 hover:shadow-lg"
                >
                  {r.cover_image && (
                    <img
                      src={r.cover_image}
                      alt=""
                      loading="lazy"
                      className="mb-3 aspect-[16/10] w-full rounded-lg object-cover"
                    />
                  )}
                  <p className="font-semibold group-hover:text-primary">{r.title}</p>
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>
      <Footer />
    </div>
  );
}

function PostNotFound() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="mx-auto max-w-2xl px-5 py-32 text-center">
        <h1 className="font-display text-3xl font-bold">Article not found</h1>
        <p className="mt-3 text-muted-foreground">
          This post may have moved or been unpublished.
        </p>
        <Link
          to="/blog"
          className="mt-6 inline-flex items-center gap-2 rounded-xl bg-gradient-brand px-5 py-2.5 text-sm font-semibold text-white"
        >
          <ArrowLeft className="h-4 w-4" /> Back to the blog
        </Link>
      </main>
      <Footer />
    </div>
  );
}
