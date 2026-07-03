import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";

const BASE_URL = "https://travellinks.uk";

export const Route = createFileRoute("/blog-sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const urls: string[] = [
          [
            `  <url>`,
            `    <loc>${BASE_URL}/blog</loc>`,
            `    <changefreq>daily</changefreq>`,
            `    <priority>0.9</priority>`,
            `  </url>`,
          ].join("\n"),
        ];

        try {
          const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
          const { data } = await supabaseAdmin
            .from("blog_posts")
            .select("slug, updated_at, published_at, cover_image, title, noindex, published")
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
              const changefreq =
                ageDays < 7 ? "daily" : ageDays < 30 ? "weekly" : ageDays < 180 ? "monthly" : "yearly";
              const priority = ageDays < 30 ? "0.9" : "0.7";
              const image = post.cover_image
                ? [
                    `    <image:image>`,
                    `      <image:loc>${post.cover_image}</image:loc>`,
                    `      <image:title>${escapeXml(post.title ?? "")}</image:title>`,
                    `    </image:image>`,
                  ].join("\n")
                : null;
              urls.push(
                [
                  `  <url>`,
                  `    <loc>${BASE_URL}/blog/${post.slug}</loc>`,
                  `    <lastmod>${lastmodDate.toISOString()}</lastmod>`,
                  `    <changefreq>${changefreq}</changefreq>`,
                  `    <priority>${priority}</priority>`,
                  image,
                  `  </url>`,
                ]
                  .filter(Boolean)
                  .join("\n"),
              );
            }
          }
        } catch (err) {
          console.error("[blog-sitemap] failed to load posts", err);
        }

        const xml = [
          `<?xml version="1.0" encoding="UTF-8"?>`,
          `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">`,
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

function escapeXml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}
