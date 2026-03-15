## KemisDigital SaaS

Marketing site and platform stack for KemisDigital.

The repo started from the Golden Starter template but is now a dedicated project for `kemisdigital.com`.

### Tech stack

- **Frontend:** Next.js App Router (TypeScript), Framer Motion
- **Backend services:** FastAPI (apps/api) – currently mostly template/example endpoints
- **Auth / data:** Supabase
- **Infra:** Vercel (web), Docker / Railway or local Docker for API

### Key features

- High‑touch marketing homepage for KemisDigital with:
  - Animated hero and dashboard mockup
  - Ecosystem section showcasing active products (KemisPay, KRM Desk, GB Rewards, etc.)
  - Case studies and process (“How we work”)
  - Mobile/tablet responsive layout with hamburger nav
- **Strategy session booking form**:
  - Rich intake form with checkboxes and summary sidebar
  - Server action writes to Supabase `strategy_sessions` table
  - Email notification helper wired to `BOOKING_NOTIFICATION_EMAIL`
- **SEO & PWA**:
  - Metadata, Open Graph / Twitter cards
  - `sitemap.xml`, `robots.txt`, `manifest.json`
  - Installable on mobile with app icons
- **Privacy & footer**:
  - `/privacy` page describing data handling for form submissions
  - Footer links to ecosystem products and contact email

### Local setup

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Env vars**

   ```bash
   cp .env.example .env
   # Fill in:
   # NEXT_PUBLIC_SUPABASE_URL
   # NEXT_PUBLIC_SUPABASE_ANON_KEY
   # BOOKING_NOTIFICATION_EMAIL
   ```

3. **Run web app**

   ```bash
   cd apps/web
   npm install
   npm run dev
   # http://localhost:3000
   ```

4. **(Optional) Run API**

   The FastAPI service under `apps/api` is still mostly template code from Golden Starter.  
   Run it only if you need those endpoints:

   ```bash
   cd apps/api
   python -m venv .venv
   source .venv/bin/activate
   pip install -r requirements.txt
   uvicorn app.main:app --reload --port 8000
   ```

### Deploy

- **Vercel (web):**
  - Project root: `apps/web`
  - Env vars: copy from `.env.example` (at least `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `BOOKING_NOTIFICATION_EMAIL`)
- **API:** deploy `apps/api` separately (Railway, Docker, or any VM) if/when you start using it.

### Repo structure

```text
apps/web     — KemisDigital marketing site (Next.js, Framer Motion, Supabase)
apps/api     — FastAPI backend (currently template / optional)
packages/    — Shared config and utilities
docs/        — PHILOSOPHY.md and internal standards
```

