# TRANSMISSION FROM: ELIE ATTIEH

![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)

An interactive 3D portfolio — you're receiving a transmission broadcast across 4 signal nodes. Includes a blog backed by Supabase with a built-in admin panel.

## Concept

The transmission arrives fragmented at 0% reception. Four signal nodes are offline. The visitor tunes each node via a terminal command, progressively strengthening the signal and unlocking portfolio content — about, experience, skills, and contact.

Full reception unlocks a hidden encrypted channel.

## Tech Stack

**Portfolio**
- **Next.js 16** — App Router, SSR-safe dynamic imports
- **React Three Fiber** — 3D scene rendering
- **Three.js** — Geometry, materials, lighting
- **@react-three/drei** — OrbitControls, Stars, Float, Line
- **@react-three/postprocessing** — Bloom, Glitch, ChromaticAberration, Noise, Vignette
- **Zustand** — Global state (signal strength, nodes, hidden channel)
- **Web Audio API** — Background music with glitch-sync audio interruptions
- **Tailwind CSS v4** — UI styling

**Blog & Admin**
- **Supabase** — PostgreSQL database + Auth
- **@supabase/ssr** — Server-side session handling for Next.js App Router
- **unified / remark / rehype** — Markdown → HTML rendering pipeline
- **rehype-pretty-code + shiki** — Syntax highlighting (github-dark theme)
- **@uiw/react-md-editor** — In-browser markdown editor for the admin

## Features

**Portfolio**
- Boot sequence terminal on load
- 4 signal nodes in a cross layout (Origin, Workshop, Grid, Signal)
- Terminal command interaction to tune each node (`tune <node>`)
- 3 randomized glitch types: Tear, Split, Static — scale with signal loss
- Background ambient music with glitch-sync audio interruptions
- Tune flash effect (node-colored screen flash on lock)
- 100% reception cinematic sequence
- Hidden encrypted channel easter egg (visible only at full reception)
- Cursor pixel trail
- Fully responsive — mobile typewriter + tap, desktop typed commands
- GPU-optimized: DPR cap, no shadows, postprocessing MSAA disabled

**Blog**
- `/blog` — post listing, ISR revalidates every 60 seconds
- `/blog/[slug]` — individual post, Markdown rendered server-side with syntax highlighting
- No redeploy needed to publish — toggle `published` in Supabase and it goes live within a minute

**Admin (`/admin`)**
- Protected by Supabase Auth — unauthenticated requests redirect to `/admin/login`
- `/admin/posts` — list all posts including drafts
- `/admin/posts/new` — create a post with title, slug (auto-generated), excerpt, tags, date, content, published toggle
- `/admin/posts/[id]` — edit or delete an existing post
- Terminal-style loading states on all actions (`> WRITING █`, `> CONNECTING █`)

## Run Locally

```bash
npm install
npm run dev
```

Open [http://localhost:4000](http://localhost:4000).

### Environment Variables

Create `.env.local`:

```
NEXT_PUBLIC_SUPABASAE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASAE_PUBLISHABLE_KEY=your_publishable_key
```

### Supabase Setup

1. Create a project at [supabase.com](https://supabase.com)
2. Run in the SQL Editor:

```sql
create table posts (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text unique not null,
  excerpt text,
  content text not null,
  tags text[] default '{}',
  date date not null default current_date,
  published boolean not null default false,
  created_at timestamptz default now()
);

alter table posts enable row level security;

create policy "Public can read published posts"
  on posts for select
  using (published = true);

create policy "Authenticated users can manage posts"
  on posts for all
  to authenticated
  using (true)
  with check (true);
```

3. Go to **Authentication → Users → Add user** to create your admin account

## Project Structure

```
src/
  app/
    admin/          # Protected admin panel (login, post list, editor)
    blog/           # Public blog (listing + post pages)
    plain/          # Plain-text resume fallback
  components/
    blog/           # PostCard component
    scene/          # R3F 3D world, zones, effects
    ui/             # HUD, BootSequence, StartScreen, CursorTrail
    overlays/       # ZonePanel, EasterEggPanel, RepairTerminal
  data/
    content.ts      # All text strings, portfolio data, UI copy — single source of truth
  lib/
    blog.ts         # getAllPosts(), getPostBySlug() — Supabase queries
    markdown.ts     # Markdown → HTML rendering pipeline
    supabase.ts     # Public Supabase client
    supabase-server.ts  # Auth-aware server client (server components)
    supabase-browser.ts # Auth-aware browser client (client components)
  store/
    worldStore.ts   # Zustand world state
  proxy.ts          # Auth guard — protects /admin routes
public/
  audio/            # Background music (deep-space.mp3)
```

## Deploy

Optimized for [Vercel](https://vercel.com). Push to GitHub, import the repo, and add the environment variables in the Vercel dashboard.

---

*Built by Elie Attieh*
