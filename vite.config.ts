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

export default defineConfig({
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
  },
  ...(isNodeBuild
    ? {
        nitro: {
          preset: "node-server",
          // Emit to the standard Nitro layout: .output/server/index.mjs + .output/public/
          output: {
            dir: ".output",
            serverDir: ".output/server",
            publicDir: ".output/public",
          },
        },
      }
    : {}),
});
