# Deploy Travel Links Solution as a STATIC site on Hostinger (shared hosting)

Works on Hostinger's cheapest **Premium / Business shared hosting** plans —
no Node.js, no VPS required. Every page is pre-rendered to HTML so Google,
Bing and social crawlers see the full content, meta tags and JSON-LD.

The AI chat keeps working because the widget calls the Lovable-hosted
`/api/chat` endpoint (configured in `.env.production` via
`VITE_CHAT_API_URL`). All animations, scroll effects, mouse interactions
and the splash screen are preserved — they are pure client-side React.

---

## 1. Build locally

Requires Node.js 20+ and bun (or npm).

```bash
bash hostinger/build-static.sh
```

This produces `hostinger/travelslink-static.tar.gz` with:

- `index.html` + pre-rendered HTML for `/about`, `/services`, `/contact`,
  `/compare`, `/countries`, `/countries/<slug>` (×22), `/privacy`,
  `/terms`, `/cookies`
- `assets/` — hashed JS, CSS, fonts, images (1-year cache)
- `sitemap.xml`, `robots.txt`, favicon, OG images
- `.htaccess` — HTTPS redirect, `www → travellinks.uk`, SPA fallback,
  gzip, long-term cache for hashed assets, security headers
  (HSTS, X-Content-Type-Options, Referrer-Policy, Permissions-Policy)

## 2. Upload to Hostinger

**Option A — hPanel File Manager**
1. hPanel → **Files → File Manager** → open `public_html`.
2. Delete any existing files (back up first if needed).
3. Upload `travelslink-static.tar.gz`, right-click → **Extract**.
4. Delete the `.tar.gz` after extraction.

**Option B — SSH (Business plan and up)**
```bash
scp hostinger/travelslink-static.tar.gz u123456@yourdomain:~/public_html/
ssh u123456@yourdomain
cd ~/public_html && tar -xzf travelslink-static.tar.gz && rm travelslink-static.tar.gz
```

## 3. Point the domain

hPanel → **Domains** → add `travellinks.uk` and `www.travellinks.uk` to
this hosting account. Hostinger sets the A records automatically. SSL
is issued for free via Let's Encrypt under **SSL → Install**.

The bundled `.htaccess` redirects `www → travellinks.uk` and `http → https`
so the canonical host matches `sitemap.xml` and the JSON-LD.

## 4. Verify

- `https://travellinks.uk` — loads with splash → home, all animations work
- `https://travellinks.uk/services` — direct load works (SPA fallback)
- `https://travellinks.uk/sitemap.xml` — 31 URLs, all under `travellinks.uk`
- `https://travellinks.uk/robots.txt` — `Sitemap:` line points to `travellinks.uk`
- `view-source:` on any page → `<title>`, `<meta description>`, `og:*`,
  `twitter:*`, JSON-LD all present in the **initial HTML** (not just after JS)
- AI chat icon (bottom-right) — open, send a message, response streams in
- Lighthouse (Chrome DevTools → Lighthouse → Mobile) — should score
  **SEO 95-100**, **Best Practices 95-100**, **Performance 85-95**

## 5. Re-deploy after changes

Re-run `bash hostinger/build-static.sh` locally, then re-upload + extract.
Bump the visible version in the footer to confirm the new bundle is live.

## Troubleshooting

- **404 on `/services` direct load** — `.htaccess` missing. File Manager
  hides dot-files; enable "Show hidden files" and re-upload it.
- **AI chat says "can't reach AI"** — `.env.production` wasn't present at
  build time, so `VITE_CHAT_API_URL` wasn't baked in. Re-build with the
  `.env.production` shown in this repo.
- **Old version cached** — hashed assets have `Cache-Control: immutable`;
  HTML is `must-revalidate`. Hard refresh (`Ctrl+Shift+R`).
- **Google still shows old title** — request re-index in **Google Search
  Console → URL Inspection → Request indexing**.
