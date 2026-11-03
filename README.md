# Digiland 2025

Front-end for **Digiland 2025**, Telkom Indonesia's annual event: Digiland Run, Digiland Music and Pasar Rakyat UMKM. Built from the Figma designs with desktop, tablet and mobile layouts.

**Live app:** https://fe-next-digiland-2025.vercel.app/

| Route | Page |
| --- | --- |
| [`/`](https://fe-next-digiland-2025.vercel.app/) | Homepage: hero, countdown, run categories, music line-up, Pasar Rakyat, articles, ticket CTA, sponsors |
| [`/digiland-run`](https://fe-next-digiland-2025.vercel.app/digiland-run) | Digiland Run: race categories, racepack, essentials, event information tabs, communities |
| [`/community`](https://fe-next-digiland-2025.vercel.app/community) | Community registration form with review and OTP steps (front-end simulation) |

## Tech stack

- [Next.js 16](https://nextjs.org) (App Router, Turbopack, Cache Components)
- React 19
- [Tailwind CSS 4](https://tailwindcss.com) via `@tailwindcss/turbopack`
- TypeScript, ESLint
- Deployed on [Vercel](https://vercel.com)

> **Note:** Next.js 16 has breaking changes from earlier versions. Before changing framework code, check the docs bundled at `node_modules/next/dist/docs/` (see [`AGENTS.md`](AGENTS.md)).

## Getting started

Requires **Node.js 20.9 or newer**.

```bash
npm install
npm run dev
```

Open http://localhost:3000.

| Script | What it does |
| --- | --- |
| `npm run dev` | Development server with Turbopack |
| `npm run build` | Production build (all three routes are prerendered statically) |
| `npm run start` | Serve the production build |
| `npm run lint` | ESLint |

## Project structure

```
src/
├── app/
│   ├── layout.tsx            Root layout: fonts, metadata, fixed header
│   ├── globals.css           Tailwind import, theme tokens, custom utilities, base rules
│   ├── page.tsx              Homepage
│   ├── digiland-run/page.tsx
│   └── community/page.tsx
├── components/
│   ├── header.tsx, footer.tsx, cta.tsx, sponsors.tsx, arrow-link.tsx   Shared across pages
│   ├── hero.tsx, intro.tsx, countdown.tsx, run-banner.tsx,
│   │   run-categories.tsx, music.tsx, pasar.tsx, articles.tsx         Homepage sections
│   ├── digiland-run/         Run page sections; run-ui.tsx holds shared class sets
│   └── community/            Registration form and OTP step
└── lib/site.ts               Site-wide constants (ticket URL)
public/                       Images, logos and artwork
```

## Styling conventions

- **Tailwind only.** Styles live in `className`; there are no per-page CSS files. `globals.css` holds what Tailwind can't express as a single class:
  - Theme tokens: `brand` (#AA216A), `ink` (#333), `animate-marquee`
  - Utilities: `wrapper` (1152px content column with a 16px gutter), `font-display` (Archivo, extended), `font-archivo` (Archivo, normal width), `header-scroll` (header darkens on scroll)
  - Base rules: keyboard focus outline, button cursor, anchor offset under the fixed header
- **Reuse through components.** Repeated class sets for the Run and Community pages live in `components/digiland-run/run-ui.tsx` (button variants, titles, mobile gutter, form fields).
- **Mobile first.** The base classes target mobile; `md` (768px), `lg` (1024px) and `xl` (1280px) layer on the tablet and desktop layouts.
- **`next/image` sizing.** Don't use `w-auto` on `next/image`: on high-DPI screens it renders the image at half size. Keep the `width`/`height` props at the design size and set smaller mobile sizes with `max-md:` widths.

## Placeholders and open items

These are marked in the code with `ponytail:` comments:

- **Fonts:** Archivo and Plus Jakarta Sans from Google Fonts stand in until the Figma font files are available (`src/app/layout.tsx`).
- **Countdown:** the target date is a placeholder (`src/components/countdown.tsx`).
- **Articles:** hardcoded until a CMS or API exists (`src/components/articles.tsx`).
- **Content to confirm:** run category prices, ticket CTA copy (MyTelkomsel vs. the Telkomsel website) and the "Line Up Musik" link target.
- **Digiland Run information tabs:** FAQ, prizes, route and race guide use provisional copy; Saturday racepack hours are still missing.
- **Goers ticket button:** the "Buy Tickets" button on mobile and tablet is disabled until a ticket URL exists.
- **Language switch:** the ID button is visual only.
- **Community form and OTP:** front-end simulation only. Nothing is sent or stored, and the demo OTP code is `123456`. Connect a real API and OTP provider in `src/components/community/`.

## Troubleshooting

On Windows, the dev server occasionally misses edits to `globals.css`, so new Tailwind classes don't appear. Save `globals.css` again or restart `npm run dev`.

## Deployment

The app deploys to Vercel: https://fe-next-digiland-2025.vercel.app/
