# Фестивал на џез, ворлд и современа музика — Велес

Bilingual (MK/EN) website for the Festival of Jazz, World and Contemporary
Music — Veles, organised by Art Generator under a mandate from the
Municipality of Veles. Built as Phase 1 per the project brief: fully static,
content in-repo, complete 2022–2025 archive, ready to ship before the
5th edition (September 2026).

## Stack

- **Next.js 15** (App Router, React Server Components, TypeScript) — fully
  statically generated
- **Tailwind CSS v4** + CSS custom properties for the cyanotype token system
- **Zod**-validated typed content in `lib/content/data/*`
- Self-hosted fonts (Unbounded / Manrope / JetBrains Mono via Fontsource)
  with Macedonian Cyrillic coverage and `locl` glyph forms
- Dynamic OG images (`next/og`) rendered in the cyanotype system
- JSON-LD (`MusicFestival`, `MusicEvent`, `Place`, `MusicGroup`),
  `hreflang` pairs, `sitemap.xml`, `robots.txt`
- Designed for Vercel; no server dependencies beyond optional email

## Develop

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # static production build (also validates all content)
npm run typecheck
```

## Editing content

All content lives in `lib/content/data/` (editions, events, artists, venues,
partners, news) and is validated against the Zod schemas in
`lib/content/schema.ts` **at build time** — a typo or a dangling slug fails
the build, so content edits via PR are safe. Every user-facing field is
bilingual (`{ mk, en }`).

Pages never import data files directly; everything goes through the typed
gateway `lib/content/index.ts`. Phase 2 (headless CMS) replaces the imports
in that one file.

**Honest placeholders:** facts the press coverage doesn't confirm (times,
admission, addresses, contacts) are *omitted*, and the UI renders an explicit
"to be confirmed" state. Don't invent values — fill them in as the client
confirms them (see §14 of the brief).

### Announcing the 2026 edition

1. In `lib/content/data/editions.ts`, add `dates` to the 2026 entry.
2. Add events to `lib/content/data/events.ts` with `editionYear: 2026`.
3. The hero, programme page and schedule pick everything up automatically.

## URLs & i18n

- `/` redirects to `/mk`. English lives under `/en` with English slugs
  (`/en/programme`, `/en/artists`, …) served via rewrites in
  `next.config.ts`; the internal Macedonian slugs under `/en/*` 301 to the
  pretty ones, so there is exactly one canonical URL per page per locale.
- The language switcher preserves the current route.

## Environment

| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | Canonical origin. Defaults to `https://jazzveles.mk` — **the domain is pending client sign-off** (brief §0); set this once the real domain is registered. |
| `RESEND_API_KEY`, `CONTACT_EMAIL`, `RESEND_FROM` | Enable the contact/signup forms to actually send email. Until set, forms show an honest "not connected yet" message. |

## Accessibility & performance

- WCAG 2.2 AA: visible `--exposure` focus rings, semantic landmarks,
  keyboard-navigable schedule filters (`aria-pressed`), `lang` attributes
  per locale.
- All core content works with JavaScript disabled (the schedule renders
  unfiltered; the mobile menu is a `<details>` element).
- `prefers-reduced-motion: reduce` disables the exposure reveal and scroll
  sweeps entirely — the print simply renders developed.
- Fully static output; the exposure animation is CSS-only (~no JS cost).

## Phase 2 (after the 2026 edition)

Headless CMS behind the existing schemas (Payload / Sanity / Directus),
photo gallery with lightbox once rights are cleared, artist submission
portal, newsletter integration, ticketing if introduced. The content
gateway makes this a data-source swap, not a rewrite.
