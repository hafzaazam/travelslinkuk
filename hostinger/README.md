# Hostinger VPS deployment

Self-contained copy of everything needed to host this site on a **Hostinger VPS** (KVM 1+, Ubuntu 22.04/24.04). The app is SSR Node.js — shared/web hosting plans will not work.

## Features included

- **Node.js build target** (`build-vps.sh`) — overrides the default Cloudflare Workers preset and emits `.output/server/index.mjs` via Nitro's `node-server` preset.
- **PM2 process manager** (`ecosystem.config.cjs`) — fork mode, port 3000, auto-restart, 512 MB memory cap, logs to `/var/log/travelslink/`.
- **Nginx reverse proxy** (`nginx.conf.example`) — gzip, long-cache for `/assets/` & `/_build/`, websocket upgrade headers, 10 MB upload cap, ready for Certbot SSL.
- **Environment template** (`.env.example`) — Lovable Cloud (Supabase) URL + publishable key for both server and client (`VITE_*`) bundles, optional service-role + AI gateway keys.
- **Step-by-step guide** (`DEPLOY-HOSTINGER.md`) — VPS provisioning, upload, PM2 start, Nginx + free Let's Encrypt SSL, update workflow, troubleshooting.

## Quick start

```bash
# Local
cp hostinger/.env.example .env       # fill in VITE_SUPABASE_* values
bash hostinger/build-vps.sh          # produces travelslink-vps.tar.gz

# Server (see DEPLOY-HOSTINGER.md for full flow)
scp travelslink-vps.tar.gz root@YOUR_VPS_IP:/var/www/travelslink/
ssh root@YOUR_VPS_IP
cd /var/www/travelslink && tar -xzf travelslink-vps.tar.gz
cp hostinger/.env.example .env && nano .env && chmod 600 .env
pm2 start hostinger/ecosystem.config.cjs && pm2 save
```

Then point DNS at the VPS and run `certbot --nginx -d yourdomain.com`.

Full walkthrough: [`DEPLOY-HOSTINGER.md`](./DEPLOY-HOSTINGER.md).
