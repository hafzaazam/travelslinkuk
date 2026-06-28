# Deploy to Hostinger VPS

Complete walkthrough for hosting the Travel Links Solution site on a **Hostinger VPS** (KVM 1 or higher, Ubuntu 22.04/24.04). Shared/web hosting plans will **not** work — this is an SSR Node.js app.

> Your database and auth still live in Lovable Cloud. The VPS only runs the web server; it talks to Lovable Cloud over HTTPS for data and login. Keep your Lovable project active.

---

## 0. What you need

- A Hostinger **VPS** plan (KVM 1+, Ubuntu 22.04 or 24.04 LTS).
- Root SSH access to the VPS (Hostinger emails the IP + password on provisioning).
- Your domain (e.g. `travelslinkuk.com`) registered anywhere.
- Local machine with `bun` (or `npm`) and `node 20+` for building.
- Your Lovable Cloud Supabase **URL + publishable key** — copy them from Lovable: *Project → Cloud → Settings → API*.

---

## 1. Build the bundle locally

On your local machine, in this project's root:

```bash
# 1. Fill in real values (especially VITE_SUPABASE_*) in a local .env
cp deploy/.env.example .env

# 2. Build for Node (overrides Lovable's default Cloudflare target)
bash deploy/build-vps.sh
```

This produces `travelslink-vps.tar.gz` (~5–20 MB) containing the Node server bundle (`.output/`) and the deploy configs.

---

## 2. Prepare the VPS (one-time)

SSH in as root:

```bash
ssh root@YOUR_VPS_IP
```

Install Node 20, PM2, Nginx, Certbot:

```bash
# Node 20
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt-get install -y nodejs nginx certbot python3-certbot-nginx ufw

# PM2 (process manager)
npm install -g pm2

# Firewall
ufw allow OpenSSH
ufw allow 'Nginx Full'
ufw --force enable

# App directory + log directory
mkdir -p /var/www/travelslink /var/log/travelslink
```

---

## 3. Upload and unpack

From your local machine:

```bash
scp travelslink-vps.tar.gz root@YOUR_VPS_IP:/var/www/travelslink/
```

Back on the VPS:

```bash
cd /var/www/travelslink
tar -xzf travelslink-vps.tar.gz
rm travelslink-vps.tar.gz

# Production environment
cp deploy/.env.example .env
nano .env       # fill in the real SUPABASE_* and VITE_SUPABASE_* values, save
chmod 600 .env
```

---

## 4. Start the app with PM2

```bash
cd /var/www/travelslink
pm2 start deploy/ecosystem.config.cjs
pm2 save
pm2 startup systemd       # copy & run the command it prints (one-time)
```

Verify it's serving on port 3000:

```bash
curl -I http://127.0.0.1:3000
# Expect: HTTP/1.1 200 OK
```

---

## 5. Configure Nginx + SSL

```bash
# Drop in the reverse-proxy config (edit the server_name to your domain first)
nano /var/www/travelslink/deploy/nginx.conf.example
cp /var/www/travelslink/deploy/nginx.conf.example /etc/nginx/sites-available/travelslink
ln -s /etc/nginx/sites-available/travelslink /etc/nginx/sites-enabled/
rm -f /etc/nginx/sites-enabled/default
nginx -t && systemctl reload nginx
```

Point your domain at the VPS (in your registrar's DNS — Hostinger hPanel if registered there):

| Type | Name | Value          |
| ---- | ---- | -------------- |
| A    | `@`  | YOUR_VPS_IP    |
| A    | `www`| YOUR_VPS_IP    |

Wait 5–60 min for DNS, then get a free SSL cert:

```bash
certbot --nginx -d travelslinkuk.com -d www.travelslinkuk.com
# Choose 2 (redirect HTTP → HTTPS)
```

Done — visit `https://travelslinkuk.com`.

---

## 6. Updating the site later

Every time you change the code in Lovable:

```bash
# Local: rebuild & ship
bash deploy/build-vps.sh
scp travelslink-vps.tar.gz root@YOUR_VPS_IP:/var/www/travelslink/

# Server: unpack & reload (zero-downtime)
ssh root@YOUR_VPS_IP <<'EOF'
cd /var/www/travelslink
tar -xzf travelslink-vps.tar.gz
rm travelslink-vps.tar.gz
pm2 reload travelslink
EOF
```

---

## 7. Common issues

**`502 Bad Gateway` from Nginx** → the Node app isn't running. Check `pm2 logs travelslink`. Usually a missing env var in `.env`.

**Contact form / reviews don't save** → `SUPABASE_URL` / `SUPABASE_PUBLISHABLE_KEY` in `.env` are wrong, or your Lovable Cloud project's RLS doesn't allow the operation. The DB lives in Lovable Cloud regardless of where the frontend runs.

**Admin login redirects forever** → the `VITE_SUPABASE_*` values you built with don't match the Lovable Cloud project. Rebuild with the correct values.

**Sitemap returns blank** → `/sitemap.xml` is a server route; if you see HTML instead of XML, Nginx is bypassing the proxy. Double-check the `location /` block.

**SSL renewal** → Certbot installs a systemd timer automatically. Verify with `systemctl list-timers | grep certbot`.

---

## 8. What you do NOT need on the VPS

- No database server (Postgres lives in Lovable Cloud).
- No Supabase Auth server (also in Lovable Cloud).
- No node_modules upload — the `.output/` bundle is self-contained.

---

## Files in this folder

| File                      | Purpose                                    |
| ------------------------- | ------------------------------------------ |
| `build-vps.sh`            | Local build script (Node preset + tarball) |
| `ecosystem.config.cjs`    | PM2 process definition                     |
| `nginx.conf.example`      | Reverse proxy config                       |
| `.env.example`            | Required environment variables             |
| `DEPLOY-HOSTINGER.md`     | This guide                                 |
