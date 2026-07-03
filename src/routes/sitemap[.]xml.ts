import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { COUNTRIES } from "@/data/countries";

const BASE_URL = "https://travellinks.uk";

interface SitemapEntry {
  path: string;
  lastmod?: string;
  changefreq?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority?: string;
}

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const entries: SitemapEntry[] = [
          { path: "/", changefreq: "weekly", priority: "1.0" },
          { path: "/about", changefreq: "monthly", priority: "0.8" },
          { path: "/services", changefreq: "monthly", priority: "0.9" },
          { path: "/contact", changefreq: "monthly", priority: "0.8" },
          { path: "/countries", changefreq: "weekly", priority: "0.9" },
          { path: "/compare", changefreq: "monthly", priority: "0.7" },
          { path: "/blog", changefreq: "daily", priority: "0.9" },
          { path: "/book", changefreq: "monthly", priority: "0.7" },
          { path: "/privacy", changefreq: "yearly", priority: "0.3" },
          { path: "/terms", changefreq: "yearly", priority: "0.3" },
          { path: "/cookies", changefreq: "yearly", priority: "0.3" },
          ...COUNTRIES.map((c) => ({
            path: `/countries/${c.slug}`,
            changefreq: "monthly" as const,
            priority: "0.7",
          })),
        ];

        try {
          const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
          const { data } = await supabaseAdmin
            .from("blog_posts")
            .select("slug, updated_at, published_at, noindex, published")
            .eq("published", true)
            .order("published_at", { ascending: false });
          if (data) {
            const now = Date.now();
            const DAY = 86_400_000;
            for (const post of data) {
              if (post.noindex) continue;
              const lastmodSource = post.updated_at ?? post.published_at ?? new Date().toISOString();
              const lastmodDate = new Date(lastmodSource);
              const ageDays = (now - lastmodDate.getTime()) / DAY;
              // Fresher posts change more often; older evergreen posts less often.
              const changefreq: SitemapEntry["changefreq"] =
                ageDays < 7 ? "daily" : ageDays < 30 ? "weekly" : ageDays < 180 ? "monthly" : "yearly";
              entries.push({
                path: `/blog/${post.slug}`,
                lastmod: lastmodDate.toISOString(), // full W3C datetime
                changefreq,
                priority: ageDays < 30 ? "0.9" : "0.7",
              });
            }
          }
        } catch (err) {
          console.error("[sitemap] failed to load blog posts", err);
        }


        const urls = entries.map((e) =>
          [
            `  <url>`,
            `    <loc>${BASE_URL}${e.path}</loc>`,
            e.lastmod ? `    <lastmod>${e.lastmod}</lastmod>` : null,
            e.changefreq ? `    <changefreq>${e.changefreq}</changefreq>` : null,
            e.priority ? `    <priority>${e.priority}</priority>` : null,
            `  </url>`,
          ]
            .filter(Boolean)
            .join("\n"),
        );

        const xml = [
          `<?xml version="1.0" encoding="UTF-8"?>`,
          `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
          ...urls,
          `</urlset>`,
        ].join("\n");

        return new Response(xml, {
          headers: {
            "Content-Type": "application/xml",
            "Cache-Control": "public, max-age=3600",
          },
        });
      },
    },
  },
});
