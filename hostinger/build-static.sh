#!/usr/bin/env bash
# Build a STATIC version of the site for Hostinger SHARED hosting (no Node.js).
#
# Output: hostinger/travelslink-static.tar.gz   (upload + extract into public_html)
#
# What's inside:
#   - Pre-rendered HTML for every public route (full SEO meta + JSON-LD)
#   - All JS/CSS/images/fonts
#   - sitemap.xml + robots.txt
#   - .htaccess (HTTPS, www -> apex, SPA fallback, gzip, cache, security headers)
#
# The AI chat widget calls VITE_CHAT_API_URL (set in .env.production to the
# Lovable-hosted /api/chat). The static build bakes that URL in, so chat keeps
# working from the Hostinger domain — no "can't reach AI" error.

set -euo pipefail
cd "$(dirname "$0")/.."

echo "==> Node $(node -v)"

if command -v bun >/dev/null 2>&1; then
  PM="bun"
  echo "==> Installing dependencies (bun)"
  bun install
else
  PM="npm"
  echo "==> Installing dependencies (npm)"
  npm install
fi

echo "==> Building STATIC site (DEPLOY_TARGET=static)"
export DEPLOY_TARGET=static
export NITRO_PRESET=static
export NODE_ENV=production

if [ "$PM" = "bun" ]; then
  bun run build
else
  npm run build
fi

OUT_DIR=".output/public"
if [ ! -d "$OUT_DIR" ] || [ ! -f "$OUT_DIR/index.html" ]; then
  echo "ERROR: $OUT_DIR/index.html not produced. Build failed."
  ls -la .output 2>/dev/null || true
  exit 1
fi

# Make sure .htaccess made it through (public/.htaccess is copied by Vite)
if [ ! -f "$OUT_DIR/.htaccess" ]; then
  cp public/.htaccess "$OUT_DIR/.htaccess"
fi

echo "==> Packaging static site"
rm -f hostinger/travelslink-static.tar.gz
tar -czf hostinger/travelslink-static.tar.gz -C "$OUT_DIR" .

SIZE=$(du -sh hostinger/travelslink-static.tar.gz | cut -f1)
PAGES=$(find "$OUT_DIR" -name "index.html" | wc -l | tr -d ' ')
echo ""
echo "Done. hostinger/travelslink-static.tar.gz ($SIZE) — $PAGES pre-rendered HTML pages."
echo "Upload + extract into Hostinger public_html (see hostinger/DEPLOY-STATIC-HOSTINGER.md)."
