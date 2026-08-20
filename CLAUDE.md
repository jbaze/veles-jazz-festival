# CLAUDE.md — Veles Jazz Festival website

Handover memory for Claude Code. A previous cloud session built everything
here across four merged PRs; this file carries the full context so work can
continue seamlessly. Read `README.md` for setup and the sections below for
the rules that are easy to get wrong.

## What this project is

Official website for the **Фестивал на џез, ворлд и современа музика — Велес**
(Festival of Jazz, World and Contemporary Music — Veles, North Macedonia).
Client: Здружение „АРТ ГЕНЕРАТОР“ — Велес, organising under a 3-year mandate
(2026–2028) delegated by the Municipality of Veles (re-awarded 16 July 2026).
Hard deadline context: the 5th edition is expected **September 2026** and its
dates/lineup are NOT yet public — the site ships with honest
"announcement pending" states that activate automatically when real data
lands (see “When the 2026 dates are announced” below).

The festival is NOT “World of Jazz Festival” (unrelated Canadian event).
Short brand `ЏЕЗ ВЕЛЕС / JAZZ VELES` and the domain (`jazzveles.mk` default
in `lib/i18n/config.ts`) are **working names pending client sign-off**.

## Current state (all merged to main)

1. **PR #1 — Phase 1 site**: Next.js 15 App Router + TypeScript + Tailwind v4,
   fully static (~255 pages), bilingual MK (default) / EN, complete design
   system, 2022–2025 archive, SEO (JSON-LD, hreflang, sitemap, dynamic OG
   posters), `.ics` files, forms (dormant until Resend env vars are set).
2. **PR #2 — Seed data + visual redesign**: 2022 week events (undated,
   honest "date TBC"), Чекална 4 performers as artists, 4 archive-recap news
   posts; full-viewport hero, grain/glow surfaces, generative ArtTile
   prints, stats band, hollow year numerals, marquee ticker, big footer.
3. **PR #3 — Venues showcase**: editorial alternating rows with per-venue
   ArtTile motifs (arcs=theatre, beams=parking, frames=Europe House,
   monument SVG=Костурница), facts bars, per-edition event timelines;
   persistent header CTA; dormant hero countdown.
4. **PR #4 — Artists section**: country+edition filters (URL-persisted
   `?zemja=&izdanie=`, server-rendered cards, no-JS safe), returning-guest
   badges, artist profiles with facts bar + per-edition appearance timeline.

Deployment: **Vercel is connected to the repo** — every PR gets a preview
deployment posted by vercel[bot]; merges deploy production.

## Commands

```bash
npm install
npm run dev          # localhost:3000
npm run build        # static build — ALSO validates all content via Zod
npm run typecheck
```

### ⚠️ On the owner's Windows machine: Docker only, never host npm

The user reported an infected file on their machine that triggers on
`npm install` (host npm also crashes silently mid-extract). NEVER run
npm/pnpm or the dev server on the host there — use the committed dev
container (`Dockerfile.dev` + `docker-compose.yml`):

```bash
docker compose up -d           # installs deps in a container volume, runs dev on :3000
docker compose exec web npx tsc --noEmit
docker compose stop web && docker compose run --rm web npm run build && docker compose up -d
```

Source is bind-mounted (edits hot-reload); `node_modules`/`.next` live in
container volumes and never touch the host drive. Cloud/Linux sessions can
keep using npm directly.

## Architecture rules (do not break)

- **Single content gateway**: pages import ONLY from `lib/content/index.ts`.
  Data lives in `lib/content/data/*.ts`, validated by Zod schemas
  (`lib/content/schema.ts`) at build time with referential-integrity checks
  (a dangling artist/venue/partner slug fails the build — intended).
  Phase 2 (headless CMS) must swap the imports in that one file only.
- **i18n routing**: internal route segments are the Macedonian slugs
  (`app/[locale]/programa/...`). English pretty slugs (`/en/programme`,
  `/en/artists`, …) are served via **rewrites** in `next.config.ts`, and the
  internal MK slugs under `/en/` 301-redirect to the pretty ones. One
  canonical URL per page per locale; hreflang mk/en/x-default everywhere.
  `lib/i18n/config.ts` → `href(locale, section, slug)` builds all links;
  the section map lives there AND in `next.config.ts` — keep them in sync.
- **UI strings** live in `lib/i18n/dictionaries.ts` (mk is the source of
  truth; `en` is typed against it, so adding a key to one forces the other).
  There is no `app/layout.tsx` — `app/[locale]/layout.tsx` is the root
  layout (sets `<html lang>`); don't add a root layout.
- **Honesty rule (critical)**: facts not confirmed by sources are OMITTED
  from data and the UI renders an explicit "to be confirmed" state
  (dates, times, venues, admission, addresses, contacts, photos, socials).
  NEVER invent dates, prices, coordinates, emails, URLs, or bios. The brief
  marks these `[VERIFY]`; open client questions are listed below.

## Design system (cyanotype exposure)

Concept: cyanotype printing (from the festival's own 2025 workshop) +
projected light on the Спомен-костурница monument. Dark by default.

- Tokens in `app/globals.css` `@theme`: `--color-ink #0A1628`,
  `--color-prussian #16396B`, `--color-exposure #4A7FC1`,
  `--color-exposure-bright #7FA6D6`, `--color-paper #EDE9DF`,
  `--color-concrete #9A9689`, `--color-sodium #E5A02C`.
- **Sodium discipline**: `--sodium` is the ONLY warm colour and appears only
  in: primary CTA (hero + header ПРОГРАМА button), live/today state,
  current-day marker in the schedule, active nav. Do not spread it.
- Type: **Unbounded** (display, 700/800), **Manrope** (body),
  **JetBrains Mono** (labels/dates) — via Fontsource with cyrillic+latin
  subsets; `html[lang="mk"]` sets `font-feature-settings: "locl" 1` for
  correct Macedonian italic г д п т. Committed TTFs in `assets/fonts/` are
  for the OG-image renderer (`lib/seo/og.tsx`) only.
- Signature utilities (globals.css): `.type-display-mega/-1/-2`,
  `.type-outline(-bright)` hollow numerals, `.grain` (SVG noise overlay),
  `.glow-deep/.glow-exposure`, `.card`/`.card-hover`, `.btn`/`.btn-sodium`,
  `.link-sweep`, `.marquee`, exposure reveal (`.exposure-print`, session-once
  via inline script, final state is the no-JS/reduced-motion default).
- **ArtTile** (`components/ArtTile.tsx`): deterministic generative cyanotype
  prints seeded by slug — the honest stand-in for photography that is
  pending rights. Motifs: waves (default/artists), arcs (theatre), beams
  (parking), frames (Europe House); `venueMotif(slug)` maps venues.
- Avoid entirely: saxophone silhouettes, sepia jazz clichés, warm cream +
  terracotta, glassmorphism/blur-cards, shadows instead of borders.
  Radius: 0 structural, 2px interactive. Borders over shadows (a faint
  exposure *glow* on hover is the one sanctioned exception).

### ⚠️ The CSS pitfall that broke the site twice

Tailwind v4 puts utilities in a cascade layer; **un-layered custom CSS in
globals.css beats every Tailwind utility**. A custom rule that sets
`position` (or any property utilities also set) on shared classes will
silently override `absolute`/`relative` etc. That collapsed the hero twice
(`.exposure-print{position:relative}`, then `.grain > *{position:relative}`).
Never set positioning in shared custom classes; let call sites do it.

### Other gotchas

- `next start` keeps serving a **stale build** if an old server holds
  port 3000 — kill by port (`fuser -k 3000/tcp`), not by name (`pkill -x
  next-server` fails: the process name is truncated). Symptom: unstyled
  pages / 404 CSS chunks.
- Event `order` is optional — sort with `(a.order ?? 0)`.
- Mobile overflow traps (both bit on 375px): a `grid` with only
  `md:grid-cols-*` leaves the implicit mobile track sized to min-content —
  always add `grid-cols-1` when children hold inputs or Unbounded words;
  and „деметрополизација“ (17 chars) overflows `type-display-1/-2` clamp
  minimums — the two mission quotes use custom `text-[clamp(1.375rem,…)]`.
- The dictionaries were once corrupted by mojibake in Cyrillic strings —
  if you bulk-edit them, grep for `�` afterwards.
- Playwright: use the preinstalled browser
  (`/opt/pw-browsers/chromium-*/chrome-linux/chrome`) — never
  `playwright install`.

## Working agreement with the user (jbaze / b.josifoski@gmail.com)

- Develop on branch **`claude/seo-documentation-qcozd7`**, push, and open a
  PR to `main`; the user merges quickly. After a merge, **reset the branch
  from origin/main** (`git fetch origin main && git checkout -B
  claude/seo-documentation-qcozd7 origin/main`) before new work — never
  stack on merged history.
- Verify before pushing: `tsc --noEmit`, `next build`, and a screenshot
  pass **in Macedonian first** (it runs 15–25 % longer than English and
  breaks layouts English doesn't). Also check keyboard nav, reduced motion,
  and no-JS rendering for core content.
- The user communicates tersely ("merged, keep iterating on X") — ship
  complete, verified iterations per section, one PR each.
- SEO matters to the user — keep JSON-LD, hreflang, canonicals, sitemap and
  OG posters intact on every change. Target queries: „џез фестивал Велес“,
  „фестивал Велес 2026“, "jazz festival North Macedonia", artist names.

## Design references (VERIFIED 2026-08-20 in a real browser)

The user's preferred direction:

- **https://torontojazz.com/** — “closest to their preferred design”.
- **https://banskojazzfest.bg/en/home/** — “interesting features”.

Both were opened and screenshotted locally; the blind analysis held up:

- **Toronto**: photography-first artist cards (name + date/time + venue +
  per-show **Buy Tickets / Free / Sold Out** state), “Discover Artists By
  Day” date chips, “Search by Genre/Vibe” tags, festival countdown, a
  curated named strand (“Sounds Like Toronto”), festival map, sponsor wall
  grouped by tier. Gap to us = photography + per-event admission states.
- **Bansko**: independently validates our system — dark ground, condensed
  white display type, ONE yellow accent used only on the Tickets CTA
  (their version of our sodium discipline). Strand-based nav (Programme /
  Jazz in the City / Jazz Academy / Jazz Partners), per-day programme tabs,
  simple day/all-days ticket products.

**Verdict**: keep the cyanotype identity unchanged; close the gap via
photo-readiness (done), admission-state clarity (waiting on client
question #3), day chips + named strands on the programme.

## Photo-readiness (DONE — how to drop photos in)

Every visual render site goes through `components/MediaTile.tsx`
(photo-or-ArtTile decision) / `components/Photo.tsx` (next/image `fill`,
AVIF/WebP, cyanotype-toned blur placeholder, credit badge). To publish a
cleared photo, edit DATA ONLY:

1. Put the file under `public/images/<kind>/…` (artists/venues/editions/events).
2. On the entity in `lib/content/data/*.ts` set
   `image: { src: "/images/…", alt: { mk, en }, credit: "Име Презиме" }`.
   `credit` is the photographer — omit until confirmed (question #5).
   Zod rejects `src` outside `/images/`.

Artist/venue/edition/event schemas all carry the optional `image`. The
Костурница silhouette and all ArtTiles remain the automatic no-photo state.

The gallery is live too: Edition carries optional `gallery` (array of the
same image shape). Editions with entries render photo sections on
`/galerija` with a lightbox (`components/GalleryGrid.tsx`: native
`<dialog>`, arrow-key nav, credits in the caption bar, thumbnails are
plain image links without JS); editions without stay in the honest
pending tiles.

## Brand assets received

- **Art Generator logo** (the organiser's own mark, sent by the user
  2026-08-20): `public/images/brand/art-generator.jpg` — white-background
  JPEG, so render it on paper grounds with `mix-blend-multiply` (done in
  the footer paper chip and the about-page governance section). Festival
  logo, poster art, brand rules and fonts are still pending (question #4).

## Queued next work (agreed with the user, not yet built)

The original queue (photo-readiness, newsletter band, programme strands,
aftermovie slot) is fully shipped, and news/press are now at editorial
level (featured-post index + dated wire list, article pages with lead
paragraph + NewsArticle JSON-LD + related teasers via
`components/NewsTeasers.tsx`, press page with derived stats band +
copy-ready boilerplate + latest announcements), the about page matches
(mission-quote hero, stats band, editorial archive rows, Organization
JSON-LD), the gallery lightbox is built photo-ready (see Photo-readiness
above), and admission states are live with honest tbc placeholders:
`admission` is now free / ticketed / sold-out / tbc, rendered everywhere
via `AdmissionBadge` (ui.tsx); the event page adds a Buy-tickets link
when `ticketUrl` is set, and event JSON-LD emits Offer
InStock/SoldOut. Question #3 now only fills in data. NOTE: ticket CTAs
use the standard bordered `btn`, NOT sodium — whether "Купи билет"
should join the sodium list once ticketing is real is an open design
decision for the user. Everything else waits on client data (photos,
videos, 2026 programme).

Done-work notes:
- Day chips (Toronto pattern): the schedule matrix's day filter renders
  as prominent weekday-over-numeral chips (`DayChips` in
  ScheduleMatrix.tsx), sodium-marked on the current festival day, URL-
  persisted via the existing `?den=` param; chips appear wherever ≥2
  dated days exist (archive editions now, /programa when 2026 dates land).
- Strands: `getStrands()` in the gateway derives the four named tracks
  (main stage / openings & performances / late programme / workshops &
  exhibitions) from event venue+type; `components/ProgrammeStrands.tsx`
  renders the band on `/programa`. The classifier is exported as
  `strandOf(event)`, and the schedule matrix carries a strand filter row
  (`?nasoka=`, canonical order) — live on archive editions, on
  `/programa` automatically when 2026 events land.
- Video: `mediaEmbeds` (URL array) exists on Edition AND Event. To publish
  an aftermovie, add the YouTube link to the edition in
  `lib/content/data/editions.ts` — the newest edition with a link renders
  in the home archive band, and each archive page renders its own; events
  render theirs on the event page. `components/VideoEmbed.tsx` is a lite
  facade (grayscale+prussian thumbnail, youtube-nocookie iframe only after
  click, plain YouTube link without JS; non-YouTube URLs render as
  external links). Honest pending notes show until links land.

Then: iterate news/press/about pages to the same editorial level as
venues/artists; gallery lightbox once photos clear.

## When the 2026 dates are announced (checklist)

1. `lib/content/data/editions.ts` → add `dates: {start, end}` to 2026.
2. Add 2026 events to `events.ts` (+ new artists to `artists.ts`).
3. Everything else is automatic: hero switches from "announcement pending"
   to dates + countdown, programme renders the matrix instead of the empty
   state, JSON-LD gains startDate/endDate.
4. Write a news post announcing the programme.
5. Re-verify OG images and the schedule matrix with real times.

## Open client questions (never guess these — brief §14)

1. Short brand name + domain sign-off (then set `NEXT_PUBLIC_SITE_URL`).
2. 2026 dates and lineup.
3. Admission model (free/ticketed/mixed) — every event is `tbc` now.
4. Existing assets: logo, Филип Коруновски poster art, brand rules, fonts.
5. Photo archive 2022–2025 + rights + photographer credits.
6. Facebook/Instagram handles.
7. Official email/phone/address (then set `RESEND_API_KEY`,
   `CONTACT_EMAIL`, `RESEND_FROM` — forms activate automatically).
8. Municipality/Ministry logo usage rules.
9. Full 2023/2024 programmes (archive is marked incomplete).
10. Who maintains the site (decides Phase 2 CMS choice: Payload/Sanity).
11. Whether narrative/financial reports must be published on the site.

## Key files map

```
app/[locale]/…            pages (MK slugs; EN via rewrites)
app/globals.css           tokens + all signature CSS (read the ⚠️ above)
components/ArtTile.tsx    generative prints + venue motifs
components/ScheduleMatrix.tsx  venue×time matrix + URL filters
components/FilterableArtistGrid.tsx  artists filters (same pattern)
components/ExposurePrint.tsx / Reveal.tsx  exposure animations
lib/content/…             schemas, data, THE gateway (index.ts)
lib/i18n/…                locales, section slug map, dictionaries
lib/seo/…                 metadata helper, JSON-LD builders, OG renderer
lib/schedule.ts           events → matrix data (server-side)
app/ics/[slug]/route.ts   static add-to-calendar files
assets/fonts/*.ttf        OG renderer fonts (OFL)
```
