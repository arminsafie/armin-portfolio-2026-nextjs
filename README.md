# Armin Safaie — Portfolio

A Next.js 14 (App Router) + TypeScript + Tailwind CSS portfolio, built around a
"blueprint / drafting table" visual theme: dark navy background, faint grid
lines, dimension-line dividers, and a title-block panel in the hero.

## Admin panel — editing content

All resume content lives in `content.json` at the project root. You can edit
it two ways:

1. **Directly** — open `content.json` and edit the text, then rebuild/redeploy.
2. **Through the admin panel** — visit `/admin` on your running site, log in,
   and edit everything (hero text, work highlights, projects, skills,
   education, languages, contact info) through a form. Add/remove projects,
   skill groups, education entries, and languages freely.

**Set your password before deploying.** Copy `.env.local.example` to
`.env.local` and set:

```
ADMIN_PASSWORD=your-own-password
ADMIN_SECRET=a-long-random-string
```

Both fall back to insecure defaults if unset — fine for trying it out
locally, not fine for a public deployment.

**Important limitation:** the admin panel saves by writing to `content.json`
on the server's filesystem. This works when you self-host (a VPS, Docker,
Render, Railway, `npm run build && npm start` on your own machine) because
the disk persists between requests. It does **not** persist on Vercel or
other serverless hosts, since their filesystem is read-only in production —
a save there will show an error. If you deploy to Vercel:

- Use the admin panel locally (`npm run dev`, visit `localhost:3000/admin`)
  to edit content, or edit `content.json` directly.
- Click **Download JSON** in the admin panel to grab the updated file.
- Commit the updated `content.json` to your repo and redeploy.

## Run it locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Build for production

```bash
npm run build
npm start
```

## Deploy

The fastest path is [Vercel](https://vercel.com/new) (made by the creators of
Next.js — free for personal projects):

1. Push this folder to a GitHub repo.
2. Import the repo at vercel.com/new.
3. Leave all settings default and click **Deploy**.

Netlify and Cloudflare Pages also support Next.js directly if you'd rather use
those.

## Project structure

```
content.json         All editable site copy — single source of truth
lib/
  content.ts          Types + read/write helpers for content.json
  auth.ts              Signed-cookie session helpers for the admin panel
app/
  layout.tsx          Fonts (Space Grotesk, Inter, JetBrains Mono) + metadata
  page.tsx             Reads content.json and assembles all sections
  globals.css          Base styles, focus states, reduced-motion handling
  admin/
    page.tsx            Gates access, renders login or editor
    LoginForm.tsx        Password form
    AdminEditor.tsx      Full content editor UI
  api/
    content/route.ts        GET (public) / POST (protected) content.json
    admin/login/route.ts    Password check, sets session cookie
    admin/logout/route.ts   Clears session cookie
components/
  Nav.tsx            Fixed header + section links
  Hero.tsx           Name, tagline, CTAs, title-block panel, photo
  BlueprintGrid.tsx  Animated grid/backdrop behind the hero
  CursorCoordinates.tsx  CAD-style cursor tracker in the hero
  TechMarquee.tsx    Scrolling tech-stack ticker
  Experience.tsx     Freelance role + highlights
  Projects.tsx       All projects as cards
  Skills.tsx         Skills by category + strengths
  EducationLanguages.tsx
  Contact.tsx        Email / phone / location / socials
  Reveal.tsx         Scroll-reveal wrapper (IntersectionObserver)
  SectionHeading.tsx Shared "Sheet A-0X" section heading
  Footer.tsx
```

## Editing content

Edit `content.json` directly, or use the `/admin` panel described above —
either way, no code changes are needed to update text, add a project, or
change a skill.

## Notes

- Colors, spacing, and animation timings are defined in `tailwind.config.ts`
  under `theme.extend` — change the palette there if you want a different look.
- Fonts load from Google Fonts via `next/font/google`, so an internet
  connection is required the first time you build.
# armin-portfolio-2026-nextjs
