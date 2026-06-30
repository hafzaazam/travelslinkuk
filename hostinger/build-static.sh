#!/usr/bin/env bash
# Build a STATIC version of the site for Hostinger SHARED hosting (no Node.js).
#
# How it works:
#   1. `bun run build`           — produces the production client bundle (dist/client) +
#                                  the Cloudflare Worker SSR bundle (dist/server)
#   2. `wrangler dev`            — boots the Worker locally (so SSR works)
#   3. `curl` every route        — captures the fully-rendered HTML
#   4. Downloads Lovable-hosted images so the site is self-contained
#   5. tar.gz everything under hostinger/static-site → travelslink-static.tar.gz
#
# Result: 31 pre-rendered HTML pages with full SEO meta, JSON-LD, OG/Twitter
# tags, plus the SPA hashed assets. The AI chat widget keeps working because
# VITE_CHAT_API_URL (in .env.production) is baked in and points at the
# Lovable-hosted /api/chat — so it never shows "can't reach AI".

set -euo pipefail
cd "$(dirname "$0")/.."

ROOT=$(pwd)
OUT="$ROOT/hostinger/static-site"
PORT=4188

PM=npm
command -v bun >/dev/null 2>&1 && PM=bun

echo "==> Node $(node -v)  /  package manager: $PM"

echo "==> Installing dependencies"
$PM install

echo "==> Building production bundle"
NODE_ENV=production $PM run build

# --- Boot the built worker locally so we can prerender every route -----------
echo "==> Starting wrangler dev to serve the built worker"
pkill -f "wrangler.*--port $PORT" 2>/dev/null || true
rm -rf "$ROOT/.wrangler/deploy"

(
  cd "$ROOT/dist/server"
  bunx wrangler@latest dev --local --port "$PORT" --ip 127.0.0.1 > /tmp/wrangler.log 2>&1 &
)

# Wait for wrangler to be ready
for i in $(seq 1 60); do
  sleep 2
  code=$(curl -s -o /dev/null -w "%{http_code}" "http://127.0.0.1:$PORT/" 2>/dev/null || echo 000)
  [ "$code" = "200" ] && { echo "    wrangler ready"; break; }
done
if [ "$code" != "200" ]; then
  echo "ERROR: wrangler never became ready. Tail of /tmp/wrangler.log:"
  tail -40 /tmp/wrangler.log
  exit 1
fi

# --- Prerender HTML for every public route ----------------------------------
echo "==> Prerendering routes"
rm -rf "$OUT" && mkdir -p "$OUT"
cp -r "$ROOT/dist/client/." "$OUT/"

ROUTES=( "/" "/about" "/services" "/contact" "/compare" "/countries"
         "/privacy" "/terms" "/cookies" )
SLUGS=( germany france netherlands switzerland iceland sweden portugal greece
        austria italy usa canada australia morocco new-zealand ireland japan
        south-africa turkey singapore malaysia thailand )
for s in "${SLUGS[@]}"; do ROUTES+=("/countries/$s"); done

ok=0; fail=0
for r in "${ROUTES[@]}"; do
  if [ "$r" = "/" ]; then path="$OUT/index.html"; else path="$OUT$r/index.html"; fi
  mkdir -p "$(dirname "$path")"
  code=$(curl -s -o "$path" -w "%{http_code}" "http://127.0.0.1:$PORT$r")
  if [ "$code" = "200" ]; then ok=$((ok+1)); else fail=$((fail+1)); echo "    FAIL $r -> $code"; fi
done
echo "    prerendered ok=$ok fail=$fail"

# Sitemap from the worker (TanStack server route)
curl -s -o "$OUT/sitemap.xml" "http://127.0.0.1:$PORT/sitemap.xml"

pkill -f "wrangler.*--port $PORT" 2>/dev/null || true

# --- Download Lovable-hosted images so the site is self-contained -----------
echo "==> Downloading Lovable-hosted images"
LOVABLE_CDN="https://travelslinkuk.lovable.app"
IMG_PATHS=(
  "86d58950-39c0-4ea4-b8dd-f0dbead6bc05/travel-links-logo.png"
  "f19e1753-ef99-4e5a-a468-7ce55336b2f3/about-visa.png"
  "26637276-3809-4947-9ff5-b2c2ad5ac675/travel-suitcase.png"
  "3c87610d-e03b-4302-b077-b7b31f0027e7/why-us-plane.png"
)
for p in "${IMG_PATHS[@]}"; do
  mkdir -p "$OUT/__l5e/assets-v1/$(dirname "$p")"
  curl -sSL "$LOVABLE_CDN/__l5e/assets-v1/$p" -o "$OUT/__l5e/assets-v1/$p"
done

# Ensure .htaccess present (Vite copies public/.htaccess to dist/client/, but
# File Manager extractors sometimes drop dot-files)
cp "$ROOT/public/.htaccess" "$OUT/.htaccess"

# --- Package ----------------------------------------------------------------
echo "==> Packaging"
rm -f hostinger/travelslink-static.tar.gz
tar -czf hostinger/travelslink-static.tar.gz -C "$OUT" .

SIZE=$(du -sh hostinger/travelslink-static.tar.gz | cut -f1)
PAGES=$(find "$OUT" -name "index.html" | wc -l | tr -d ' ')
echo ""
echo "Done."
echo "  Archive : hostinger/travelslink-static.tar.gz ($SIZE)"
echo "  Source  : hostinger/static-site/                ($(du -sh "$OUT" | cut -f1))"
echo "  Pages   : $PAGES pre-rendered HTML files"
echo ""
echo "Upload + extract the .tar.gz into Hostinger public_html — see"
echo "hostinger/DEPLOY-STATIC-HOSTINGER.md for the full flow."
