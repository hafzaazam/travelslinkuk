// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - tanstackStart, viteReact, tailwindcss, tsConfigPaths, nitro (build-only using cloudflare as a default target),
//     componentTagger (dev-only), VITE_* env injection, @ path alias, React/TanStack dedupe,
//     error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

// Set DEPLOY_TARGET=node when building for a Node.js VPS (Hostinger, etc.):
//   DEPLOY_TARGET=node bun run build
// Default (unset) keeps the Lovable Cloudflare Workers target used by the preview/published site.
const isNodeBuild = process.env.DEPLOY_TARGET === "node" || process.env.NITRO_PRESET === "node-server";
const isStaticBuild = process.env.DEPLOY_TARGET === "static" || process.env.NITRO_PRESET === "static";

const COUNTRY_SLUGS = [
  "germany","france","netherlands","switzerland","iceland","sweden","portugal","greece",
  "austria","italy","usa","canada","australia","morocco","new-zealand","ireland","japan",
  "south-africa","turkey","singapore","malaysia","thailand",
];

export default defineConfig({
  tanstackStart: {
    server: { entry: "server" },
  },
  ...(isNodeBuild
    ? {
        nitro: {
          preset: "node-server",
          output: {
            dir: ".output",
            serverDir: ".output/server",
            publicDir: ".output/public",
          },
        },
      }
    : isStaticBuild
    ? {
        nitro: {
          preset: "static",
          output: {
            dir: ".output",
            serverDir: ".output/server",
            publicDir: ".output/public",
          },
          prerender: {
            crawlLinks: true,
            failOnError: false,
            routes: [
              "/",
              "/about",
              "/services",
              "/contact",
              "/compare",
              "/countries",
              "/privacy",
              "/terms",
              "/cookies",
              "/sitemap.xml",
              "/robots.txt",
              ...COUNTRY_SLUGS.map((s) => `/countries/${s}`),
            ],
          },
        } as any,
      }
    : {}),
});
