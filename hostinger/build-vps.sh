#!/usr/bin/env bash
# Build the app for a Node.js VPS (instead of Cloudflare Workers, which is the Lovable default).
#
# Run LOCALLY (or in CI), then upload travelslink-vps.tar.gz to your Hostinger VPS.
#
# Requirements on the build machine:
#   - Node.js 20+
#   - bun (https://bun.sh)  OR  npm
#   - A .env file in the project root with VITE_SUPABASE_* values
#     (those get baked into the client bundle at build time)

set -euo pipefail

cd "$(dirname "$0")/.."

echo "==> Node version"
node -v

if [ ! -f .env ]; then
  echo "ERROR: .env not found in project root."
  echo "       Copy deploy/.env.example to .env and fill in the VITE_SUPABASE_* values first."
  exit 1
fi

if command -v bun >/dev/null 2>&1; then
  PM="bun"
  echo "==> Installing dependencies (bun)"
  bun install
else
  PM="npm"
  echo "==> Installing dependencies (npm)"
  npm install
fi

echo "==> Building with Node.js Nitro preset (DEPLOY_TARGET=node)"
# DEPLOY_TARGET=node is read in vite.config.ts and switches Nitro to the node-server preset.
# NITRO_PRESET is kept as a belt-and-braces signal.
export DEPLOY_TARGET=node
export NITRO_PRESET=node-server
export NODE_ENV=production

if [ "$PM" = "bun" ]; then
  bun run build
else
  npm run build
fi

echo "==> Verifying build output"
if [ ! -f .output/server/index.mjs ]; then
  echo "ERROR: .output/server/index.mjs was not produced."
  echo "       The build did not emit a Node server bundle."
  echo "       Things to check:"
  echo "         1. vite.config.ts contains the DEPLOY_TARGET=node branch (see repo)."
  echo "         2. The 'nitro' package is installed (it is a peer dep of @lovable.dev/vite-tanstack-config)."
  echo "         3. Re-run with verbose output:  DEPLOY_TARGET=node NITRO_PRESET=node-server bun run build"
  echo ""
  echo "Current .output/ contents:"
  ls -la .output 2>/dev/null || echo "  (.output does not exist)"
  exit 1
fi
echo "    OK — .output/server/index.mjs exists ($(du -sh .output | cut -f1) total)"

echo "==> Packaging .output/ + deploy configs"
rm -f travelslink-vps.tar.gz
tar -czf travelslink-vps.tar.gz \
  .output \
  deploy/ecosystem.config.cjs \
  deploy/.env.example \
  deploy/nginx.conf.example \
  deploy/DEPLOY-HOSTINGER.md

echo ""
echo "Done. Created: travelslink-vps.tar.gz ($(du -sh travelslink-vps.tar.gz | cut -f1))"
echo "Upload it to your VPS and follow deploy/DEPLOY-HOSTINGER.md"
