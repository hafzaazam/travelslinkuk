#!/usr/bin/env bash
# Build the app for a Node.js VPS (instead of Cloudflare Workers, which is the Lovable default).
#
# Run this LOCALLY (or in CI), then upload the resulting bundle to your Hostinger VPS.
#
# Requirements on the build machine:
#   - bun (https://bun.sh)  OR  npm/pnpm
#   - Node.js 20+
#   - A .env file in the project root with the VITE_SUPABASE_* values
#     (those get baked into the client bundle at build time)

set -euo pipefail

echo "==> Installing dependencies"
if command -v bun >/dev/null 2>&1; then
  bun install --frozen-lockfile
else
  npm install
fi

echo "==> Building with Nitro 'node-server' preset (overrides default Cloudflare target)"
# Nitro reads NITRO_PRESET to pick the runtime. node-server emits a plain Node server.
NITRO_PRESET=node-server \
NODE_ENV=production \
  bun run build || NITRO_PRESET=node-server NODE_ENV=production npm run build

echo "==> Packaging .output/ for upload"
rm -f travelslink-vps.tar.gz
tar -czf travelslink-vps.tar.gz \
  .output \
  deploy/ecosystem.config.cjs \
  deploy/.env.example \
  deploy/nginx.conf.example \
  deploy/DEPLOY-HOSTINGER.md

echo ""
echo "Done. Upload travelslink-vps.tar.gz to your VPS and follow deploy/DEPLOY-HOSTINGER.md"
