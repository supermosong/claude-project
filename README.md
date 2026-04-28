# จริงหรือกล้า — Truth or Dare Online

A Thai-language party game web app with multiple games, a friends system, and a freemium monetization model.

**Stack:** Next.js 14 (App Router) · TypeScript · Tailwind CSS · Supabase · Stripe

## Games

- **Truth or Dare** — 58 Thai cards across 3 difficulty levels
- **Wordle** — 6×5 daily word puzzle
- **Reaction Test** — Reflex speed measurement
- **Draw & Guess** — Live multiplayer drawing (Pro)

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

```bash
cp .env.local.example .env.local
```

Fill in `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
STRIPE_SECRET_KEY=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
NEXT_PUBLIC_STRIPE_PRO_PRICE_ID=
STRIPE_WEBHOOK_SECRET=
NEXT_PUBLIC_APP_URL=
```

### 3. Set up Supabase

Create a project at [supabase.com](https://supabase.com) and run the following SQL:

```sql
create table profiles (
  id uuid primary key references auth.users,
  display_name text,
  plan text default 'free',
  created_at timestamptz default now()
);

create table friends (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users,
  friend_id uuid references auth.users,
  status text check (status in ('pending', 'accepted')),
  created_at timestamptz default now()
);

create table game_sessions (
  id uuid primary key default gen_random_uuid(),
  game_type text,
  created_by uuid references auth.users,
  created_at timestamptz default now()
);

create table game_players (
  id uuid primary key default gen_random_uuid(),
  session_id uuid references game_sessions,
  user_id uuid references auth.users,
  score int,
  won boolean
);

create table subscriptions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users,
  stripe_customer_id text,
  stripe_subscription_id text,
  status text,
  plan text,
  current_period_end timestamptz
);

create table custom_cards (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users,
  type text check (type in ('truth', 'dare')),
  content text,
  difficulty text,
  created_at timestamptz default now()
);
```

Enable **Google OAuth** under Auth → Providers → Google (requires Google Cloud credentials).

### 4. Run the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Deployment

Deploy to [Vercel](https://vercel.com), set all environment variables, and add `https://your-app.vercel.app/auth/callback` to Supabase's allowed redirect URLs.

## Plans

| Feature | Free | Pro (฿175/mo) |
|---------|------|--------------|
| Truth or Dare, Wordle, Reaction Test | ✓ | ✓ |
| Draw & Guess (multiplayer) | — | ✓ |
| Custom Cards | — | ✓ |
| Friends system | ✓ | ✓ |

## Fake Stripe (dev mode)

Stripe is not wired up yet. A fake payment flow is used for testing:

- Click **อัปเกรดเป็น Pro** on `/pricing` → upgrades your account immediately
- Go to `/fake-portal` to cancel (downgrade back to free)

Plan is stored in `user.user_metadata.plan` (`'free'` or `'pro'`). To switch to real Stripe, see the Phase 2 section in `PLAN.md`.

## Project Structure

```
app/
  (public)/          # Landing, pricing, login, signup, fake-checkout, fake-portal
  (app)/             # Auth-protected: dashboard, games, profile, friends, settings
  api/
    stripe/          # checkout, portal, webhook (stubbed for real Stripe)
    fake-stripe/     # confirm, cancel (dev-only plan toggling)
lib/
  supabase/          # Browser + server + service clients
  cards.ts           # 58 Thai Truth or Dare cards
components/
  ui/                # Button, Badge, UpgradeButton
  layout/            # Navbar, Sidebar, MobileNav
```
