
## What you'll get

Three working forms on the site (Contact, Review, Newsletter) that save into your backend, plus an `/admin` dashboard where you sign in, review submissions, approve reviews, and export the newsletter list.

## Steps

### 1. Enable Lovable Cloud
Turn on the built-in backend (database + auth) — required to store form data and manage admins.

### 2. Database tables
Create three tables with secure access rules:
- `contact_submissions` — name, email, phone, subject, message, status (new / read / archived), created_at
- `reviews` — name, country, rating (1–5), comment, approved (true/false), created_at
- `newsletter_subscribers` — email (unique), created_at, unsubscribed

Plus a separate `user_roles` table so admin permission is server-verified (never trustable from the browser).

Access rules:
- Anyone (signed in or not) can submit a contact form, review, or newsletter signup
- Only admins can read, update, approve, or delete entries
- Approved reviews are publicly readable so the Testimonials section can show them

### 3. Public-facing forms
- **Contact form** (in the existing Contact section): wire to save into `contact_submissions` with validation (zod) and a success toast
- **Review form**: new "Leave a Review" section with name, country, star rating, and comment. Saves unapproved; appears on site only after admin approval
- **Newsletter signup**: simple email input added to the Footer with duplicate-handling and confirmation toast

### 4. Testimonials become dynamic
The existing Testimonials section switches from hardcoded quotes to live, approved reviews from the database. Falls back to existing placeholders if none exist yet.

### 5. Admin area
- `/auth` — sign in / sign up page (email + password)
- `/admin` — protected dashboard, only reachable if signed-in user has the `admin` role. Otherwise redirects to `/auth`.
- Dashboard has three tabs:
  - **Contacts** — list submissions, mark read/archived, delete, click-to-email
  - **Reviews** — list pending + approved, approve/unapprove, delete
  - **Subscribers** — list emails, search, CSV export, delete

### 6. First admin
After you sign up your own account, I'll grant it the admin role via a one-off SQL insert so you can access `/admin`. Any future admins you promote from within the dashboard.

## Technical notes

- Stack: existing TanStack Start + Supabase (Lovable Cloud). Browser client for inserts; `requireSupabaseAuth` server functions for admin reads/mutations.
- Role check uses a `has_role(user_id, 'admin')` security-definer SQL function so RLS policies can reference it without recursion.
- Admin route lives under `src/routes/_authenticated/admin.tsx`; the `_authenticated` layout already gates the subtree.
- Validation: zod schemas shared between client form and server insert path.
- No emails are sent yet — purely capture + admin review. Email notifications can be added later if you want.

## Not included (ask if you want any of these)
- Email notifications when a new contact/review arrives
- Sending newsletter campaigns (currently it's collection + export only)
- Google reCAPTCHA / spam protection
- Public profile page per reviewer

Approve and I'll build it.
