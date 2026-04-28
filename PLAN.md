# Project Plan — จริงหรือกล้า (Truth or Dare Online)

## Overview
A Thai-language party game web app with authentication, multiple games, a friends system, and a freemium monetization model.

**Stack:** Next.js 14 (App Router) · TypeScript · Tailwind CSS · Supabase · Stripe

---

## Current Status

### ✅ Done — UI & Frontend
- [x] Project scaffold (Next.js 14, Tailwind, TypeScript)
- [x] Custom dark theme (`game-dark`, `game-surface`, `game-card`, `game-border`)
- [x] Kanit font (Thai + Latin)
- [x] Root layout, globals.css
- [x] Public layout + Navbar
- [x] App layout + Sidebar (desktop) + MobileNav (mobile)
- [x] Landing page (hero, games grid, features, CTA, footer)
- [x] Pricing page (Free vs Pro ฿175/month, FAQ, UpgradeButton)
- [x] Login page (email/password + Google OAuth)
- [x] Signup page (email/password + Google OAuth + email confirmation handling)
- [x] Auth callback route (Google OAuth exchange)
- [x] Dashboard page
- [x] Profile page (avatar, stats, plan badge)
- [x] Friends page (UI shell)
- [x] Settings page (display name, plan link, logout, delete account UI)
- [x] Games index page (`/games`)
- [x] Truth or Dare game (setup → choice → card, 58 Thai cards, 3 difficulties)
- [x] Wordle clone (6×5 grid, keyboard, daily word)
- [x] Reaction Test (phases, timing, stats)
- [x] Draw & Guess page (Pro gate)
- [x] PlanGate component (blur + upgrade modal)
- [x] Button, Badge, UpgradeButton UI components
- [x] Middleware (auth protection + redirect)
- [x] Supabase client + server helpers
- [x] Stripe client helper
- [x] Cards data library (`lib/cards.ts`)

---

## To Do

### 🔧 Phase 1 — Make It Work (Required to go live)

| Task | Notes |
|------|-------|
| Install Node.js | `winget install OpenJS.NodeJS.LTS` |
| `npm install` | Install all dependencies |
| Create Supabase project | Get URL + anon key |
| Fill `.env.local` | Copy from `.env.local.example` |
| Enable Google OAuth in Supabase | Auth → Providers → Google (needs Google Cloud credentials) |
| Create Stripe account | Get secret key + publishable key |
| Create Stripe Pro product | ฿175/month recurring → copy Price ID |
| Create Supabase database tables | See schema below |
| Deploy to Vercel | Connect GitHub repo |
| Set Supabase redirect URLs | Add `https://your-app.vercel.app/auth/callback` |

**Supabase tables needed:**
```sql
-- Track extended user data
profiles (id uuid PK → auth.users, display_name text, plan text default 'free', created_at)

-- Friends system
friends (id, user_id, friend_id, status: pending|accepted, created_at)

-- Game history
game_sessions (id, game_type, created_by, created_at)
game_players  (id, session_id, user_id, score, won)

-- Stripe subscriptions
subscriptions (id, user_id, stripe_customer_id, stripe_subscription_id, status, plan, current_period_end)

-- Custom cards (Pro feature)
custom_cards (id, user_id, type: truth|dare, content, difficulty, created_at)
```

---

### 🔌 Phase 2 — Backend API Routes ✅ (fake Stripe active)

| Route | Purpose | Status |
|-------|---------|--------|
| `POST /api/stripe/checkout` | Redirects to `/fake-checkout` (swap for real Stripe later) | ✅ |
| `GET  /api/stripe/portal` | Redirects to `/fake-portal` (swap for real Stripe later) | ✅ |
| `POST /api/stripe/webhook` | Stub — wire up when Stripe is live | stub |
| `POST /api/fake-stripe/confirm` | Sets user plan → `pro` via Supabase admin | ✅ |
| `POST /api/fake-stripe/cancel` | Sets user plan → `free` via Supabase admin | ✅ |

**Fake Stripe pages (dev only):**
- `/fake-checkout` — simulates payment, calls `/api/fake-stripe/confirm`, redirects to `/dashboard`
- `/fake-portal` — simulates billing portal, calls `/api/fake-stripe/cancel`, redirects to `/settings`

**To go live with real Stripe:**
1. `npm install stripe`
2. Fill in `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, `NEXT_PUBLIC_STRIPE_PRO_PRICE_ID`
3. Uncomment the real logic in `checkout/route.ts`, `portal/route.ts`, `webhook/route.ts`
4. Delete `/fake-checkout`, `/fake-portal`, `/api/fake-stripe/`

**Webhook events to handle (when live):**
- `checkout.session.completed` → set user plan to `pro`
- `customer.subscription.deleted` → set user plan back to `free`

---

### 👥 Phase 3 — Friends System

- Search users by display name or email
- Send / accept / reject friend requests
- Friends list with online status
- Friend count shown on profile + dashboard stats

---

### 📊 Phase 4 — Real Stats & Game History

- Save game sessions to Supabase after each game ends
- Pull real stats on Profile page (games played, wins)
- Dashboard shows real game count and friend count

---

### 🎨 Phase 5 — Pro Features

| Feature | Description |
|---------|-------------|
| Draw & Guess | Canvas drawing + Supabase Realtime for live multiplayer |
| Custom Cards | CRUD interface for creating personal Truth or Dare cards |
| Leaderboard | Top scores per game, filterable by friends |
| No Ads | (placeholder — no ads exist yet, but gate it for Pro) |

---

### 🚀 Phase 6 — Polish & Growth

- [ ] Add `robots.txt` and sitemap for SEO
- [ ] Add OG image for social sharing
- [ ] Email welcome flow after signup (Supabase email templates)
- [ ] Add more Truth or Dare cards (community submissions?)
- [ ] Wordle: expand word list to full English dictionary
- [ ] Mobile PWA support (add to home screen)
- [ ] Analytics (Vercel Analytics or Plausible)

---

## Architecture Notes

```
app/
  (public)/          # No auth required — landing, pricing, login, signup
  (app)/             # Auth required — protected by middleware + layout redirect
    dashboard/
    games/
      truth-or-dare/ # Client component, uses lib/cards.ts
      wordle/        # Client component, daily word from WORDS array
      reaction-test/ # Client component, phase-based state machine
      draw-and-guess/ # Server component, wrapped in PlanGate
    profile/         # Server component, reads from Supabase auth metadata
    friends/         # Shell UI — needs Supabase wiring
    settings/        # Saves display_name to user_metadata

lib/
  supabase/client.ts  # Browser client (use client components)
  supabase/server.ts  # Server client with cookie store
  stripe.ts           # Stripe server client
  cards.ts            # 58 Thai Truth or Dare cards

components/
  ui/                 # Button, Badge, PlanGate
  layout/             # Navbar, Sidebar, MobileNav
```

**Auth flow:**
1. User signs up → Supabase sends confirmation email
2. User confirms → session created → redirected to `/dashboard`
3. Google OAuth → `/auth/callback` exchanges code → `/dashboard`
4. Middleware refreshes session on every request and guards `/dashboard`, `/games`, `/profile`, `/friends`, `/settings`

**Plan gating:**
- `user.user_metadata.plan === 'pro'` checked server-side
- Stripe webhook updates this via `supabase.auth.admin.updateUserById()`
- `PlanGate` component blurs content and shows upgrade modal for free users

---

## Environment Variables

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=        # for webhook to update user plan
STRIPE_SECRET_KEY=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
NEXT_PUBLIC_STRIPE_PRO_PRICE_ID=
STRIPE_WEBHOOK_SECRET=
NEXT_PUBLIC_APP_URL=              # https://your-app.vercel.app
```
