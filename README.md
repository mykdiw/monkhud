# Monk Hud — Next.js + Supabase

Production-ready codebase for monkhud.com.
Stack: Next.js 14 (App Router) · Supabase (Postgres + Auth) · Tailwind CSS · TypeScript

---

## Prerequisites

- Node.js 18 or higher — check with `node -v`
- A Supabase project (already created at `svvzizhcpypzggtglnxv.supabase.co`)
- A Vercel account for deployment (free tier works)

---

## 1. Local setup

```bash
# Clone / download this folder, then:
cd monkhud-next

# Install dependencies
npm install

# The .env.local file is already populated with your Supabase credentials.
# Add your service role key (from Supabase Dashboard → Settings → API):
# SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

---

## 2. Database setup

Run these two SQL files **in order** in your Supabase dashboard:

**Supabase Dashboard → SQL Editor → New Query**

### Step 1 — Schema
Copy the contents of `supabase/migrations/001_schema.sql` and run it.

This creates all tables:
- `products` — The 16 Companions
- `paths` — The three paths (Quick / Still / Long)
- `journal_posts` — Field notes
- `reviews` — Customer reviews (gated behind a feature flag)
- `orders` + `order_items` — Order management
- `profiles` — User profiles (extends Supabase auth)
- `addresses` — Saved delivery addresses
- `wishlist_items` — Saved Companions
- `leads` — Newsletter signups

### Step 2 — Seed data
Copy the contents of `supabase/migrations/002_seed.sql` and run it.

This populates:
- All 16 Companions with prices in INR, descriptions, creature text, Monk's notes, specs
- The three paths with their Companion lists and bundle savings
- The first six journal articles

**To edit products later:** Supabase Dashboard → Table Editor → products

---

## 3. Run locally

```bash
npm run dev
```

Open http://localhost:3000

---

## 4. Project structure

```
monkhud-next/
├── app/                         Next.js App Router pages
│   ├── layout.tsx               Root layout — Inter font, metadata, globals
│   ├── page.tsx                 Homepage
│   ├── companions/
│   │   ├── page.tsx             /companions — product grid with filters
│   │   └── [slug]/page.tsx      /companions/silent-viper — product detail
│   ├── paths/
│   │   └── page.tsx             /paths — the three paths
│   ├── journal/
│   │   ├── page.tsx             /journal — article listing
│   │   └── [slug]/page.tsx      /journal/article-slug — article detail
│   ├── origin/
│   │   └── page.tsx             /origin — about page
│   └── api/
│       ├── leads/route.ts       POST /api/leads — newsletter signup
│       ├── orders/route.ts      POST /api/orders — order creation
│       └── auth/callback/route.ts  Supabase OAuth callback
├── components/
│   ├── Nav.tsx                  Top navigation
│   ├── Footer.tsx               Site footer
│   ├── ProductCard.tsx          Companion card
│   ├── CompanionsGrid.tsx       Client grid with filtering/search
│   ├── PathCard.tsx             Path card for homepage
│   ├── JournalCard.tsx          Journal article card
│   ├── NewsletterSignup.tsx     Email capture (writes to leads table)
│   └── AddToCartButton.tsx      Add to cart (localStorage for now)
├── lib/
│   ├── types.ts                 TypeScript interfaces matching DB schema
│   ├── supabase/
│   │   ├── client.ts            Browser Supabase client
│   │   └── server.ts            Server Supabase client (App Router)
│   └── db/
│       ├── products.ts          Product queries
│       ├── paths.ts             Path queries
│       ├── journal.ts           Journal queries
│       └── orders.ts            Order creation + retrieval
├── styles/
│   └── globals.css              Tailwind base + design tokens
├── supabase/
│   └── migrations/
│       ├── 001_schema.sql       Complete DB schema with RLS
│       └── 002_seed.sql         All 16 Companions + seed data
├── middleware.ts                Supabase session refresh
├── next.config.ts
├── tailwind.config.ts           Design tokens (colours, type scale)
├── tsconfig.json
└── .env.local                   Your credentials (never commit this)
```

---

## 5. Design tokens

All design decisions are in `tailwind.config.ts`. The key colours:

| Token | Value | Usage |
|---|---|---|
| `bg-forest` | `#0F2A1D` | Primary background |
| `bg-forest-dark` | `#0A1F16` | Sections, overlays |
| `text-gold` / `bg-gold` | `#8C7A4F` | CTAs — max 2 per viewport |
| `text-monk-white` | `#F0EFEA` | Primary text |
| `text-monk-dim` | `rgba(228,228,220,0.65)` | Secondary text |
| `text-monk-faint` | `rgba(228,228,220,0.45)` | Tertiary / captions |
| `border-monk-border` | `rgba(140,122,79,0.2)` | All borders |
| `text-monk-error` | `#C2705C` | Stock warnings only |

**Gold is precious.** Never use it more than twice per above-the-fold view.

---

## 6. Deploy to Vercel

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel

# Follow the prompts:
# - Link to your Vercel account
# - Set project name: monkhud
# - Framework: Next.js (auto-detected)
```

### Set environment variables in Vercel:
Vercel Dashboard → Your project → Settings → Environment Variables

Add all variables from `.env.local`:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `NEXT_PUBLIC_SITE_URL` = `https://monkhud.com`

### Add your custom domain:
Vercel Dashboard → Your project → Settings → Domains → Add `monkhud.com`

---

## 7. Adding social auth (Google, Reddit, Discord, Facebook)

### In Supabase Dashboard:
1. Go to **Authentication → Providers**
2. Enable each provider
3. Add your OAuth credentials (from each platform's developer console)
4. Set the callback URL to: `https://monkhud.com/api/auth/callback`

The `/api/auth/callback/route.ts` handler is already built and waiting.

---

## 8. Adding products

**Option A — Supabase Dashboard (no code):**
Table Editor → products → Insert row

**Option B — SQL:**
```sql
insert into public.products (slug, name, category, price_inr, description, ...)
values ('garuda', 'Garuda', 'mounts', 24900, 'Mythic. Flagship. Arrives once.', ...);
```

**Product slug rules:** lowercase, hyphens only, unique. Becomes the URL: `/companions/garuda`

---

## 9. What to build next

The scaffold is complete and running. Next priorities:

1. **Cart state** — wire `AddToCartButton` to a Zustand store or React Context, replace localStorage approach with proper state management
2. **Checkout page** — form → `POST /api/orders` → Razorpay payment link
3. **Auth pages** — `/signin` and `/register` with Supabase social auth (providers enabled in step 7)
4. **Account dashboard** — order history from `orders` table, wishlist from `wishlist_items`
5. **Product images** — upload to Supabase Storage, replace emoji placeholders
6. **Reviews** — enable the `reviews` table behind the `REVIEWS_ENABLED` flag when real reviews exist
7. **Admin** — Supabase Dashboard handles this for now; a custom `/admin` route later

---

## 10. Commands reference

```bash
npm run dev          # Local dev server at localhost:3000
npm run build        # Production build
npm run start        # Run production build locally
npm run lint         # ESLint
npm run type-check   # TypeScript check without building
```

---

## Environment variables reference

| Variable | Required | Description |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | ✅ | Your Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | ✅ | Supabase anon/public key |
| `SUPABASE_SERVICE_ROLE_KEY` | ✅ (server) | Service role key — never expose client-side |
| `RAZORPAY_KEY_ID` | When live | Razorpay key ID |
| `RAZORPAY_KEY_SECRET` | When live | Razorpay secret — server only |
| `NEXT_PUBLIC_RAZORPAY_KEY_ID` | When live | Razorpay key ID for client |
| `RESEND_API_KEY` | For email | Order confirmation emails |
| `NEXT_PUBLIC_SITE_URL` | Production | Your domain |
