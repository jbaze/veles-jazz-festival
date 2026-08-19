import type { Metadata } from "next";
import Link from "next/link";
import Countdown from "@/components/Countdown";
import ExposurePrint from "@/components/ExposurePrint";
import MonumentSilhouette from "@/components/MonumentSilhouette";
import Reveal from "@/components/Reveal";
import SignupForm from "@/components/SignupForm";
import EventCard from "@/components/EventCard";
import PartnerWall from "@/components/PartnerWall";
import Marquee from "@/components/Marquee";
import ArtTile, { venueMotif } from "@/components/ArtTile";
import { AllLink, JsonLd, Kicker, SectionHeading } from "@/components/ui";
import {
  getArtist,
  getCurrentEdition,
  getEvents,
  getEventsByEdition,
  getNews,
  getPastEditions,
  getVenues,
} from "@/lib/content";
import { href, type Locale } from "@/lib/i18n/config";
import { getDict } from "@/lib/i18n/dictionaries";
import { formatDate, formatDateRange } from "@/lib/format";
import { festivalJsonLd } from "@/lib/seo/jsonld";
import { pageMeta } from "@/lib/seo/meta";

const FEATURED_ARTISTS = [
  "vlatko-stefanovski-trio",
  "dine-doneff",
  "transverse",
  "parussion-group",
  "shamba",
  "edit-points",
];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = getDict(locale);
  return pageMeta(locale, {
    title: `${t.siteName} — ${t.siteNameFull}`,
    description:
      locale === "mk"
        ? "Џез, ворлд и современа музика во Велес — концерти, изложби, перформанси и видео-мапирање. Петтото издание се очекува во септември 2026."
        : "Jazz, world and contemporary music in Veles, North Macedonia — concerts, exhibitions, performances and video mapping. The fifth edition is expected in September 2026.",
  });
}

export default async function HomePage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const t = getDict(locale);
  const edition = getCurrentEdition();
  const events = getEventsByEdition(edition.year).slice(0, 3);
  const venues = getVenues().filter((v) =>
    ["spomen-kosturnica", "teatar-dzinot", "parking-na-teatarot"].includes(v.slug),
  );
  const news = getNews().slice(0, 3);
  const featured = FEATURED_ARTISTS.map((slug) => getArtist(slug)).filter(
    (a): a is NonNullable<typeof a> => Boolean(a),
  );
  const pastEditions = getPastEditions();

  // The record, in numbers — computed from content, not typed by hand.
  const allEvents = getEvents().filter((e) => e.editionYear !== edition.year);
  const countryCount = new Set(pastEditions.flatMap((e) => e.countries)).size;
  const stats: [string, string][] = [
    [String(pastEditions.length), locale === "mk" ? "изданија" : "editions"],
    [String(countryCount), locale === "mk" ? "земји" : "countries"],
    [String(getVenues().length), locale === "mk" ? "локации" : "venues"],
    [`${allEvents.length}+`, locale === "mk" ? "настани" : "events"],
  ];

  const marqueeItems =
    locale === "mk"
      ? ["Џез", "Ворлд", "Современа музика", "Изложби", "Перформанси", "Видео-мапирање", "Велес"]
      : ["Jazz", "World", "Contemporary music", "Exhibitions", "Performances", "Video mapping", "Veles"];

  return (
    <>
      <JsonLd data={festivalJsonLd(edition, locale)} />

      {/* 1 — Hero: the exposure reveal, full viewport */}
      <section className="grain glow-deep relative overflow-hidden border-b-2 border-prussian">
        <ExposurePrint id="hero-print" className="absolute inset-0">
          {/* hollow year watermark — the unexposed layer */}
          <p
            aria-hidden="true"
            className="type-display type-outline pointer-events-none absolute -right-6 top-6 text-[clamp(6rem,22vw,19rem)] leading-none opacity-70 md:top-2"
          >
            {edition.year}
          </p>
          <MonumentSilhouette className="absolute bottom-0 left-1/2 h-[76%] w-full min-w-[900px] -translate-x-1/2 opacity-90" />
          <div
            aria-hidden="true"
            className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-ink to-transparent"
          />
        </ExposurePrint>

        <div className="relative mx-auto flex min-h-[calc(100svh-73px)] max-w-[1440px] flex-col justify-end px-4 pb-24 pt-24 sm:px-6">
          <p className="type-label text-exposure-bright">{t.siteNameFull}</p>
          <h1 className="type-display type-display-mega mt-5 max-w-6xl uppercase text-paper">
            {t.home.editionOrdinal}
          </h1>
          <p className="type-label mt-8 flex flex-wrap items-center gap-x-4 gap-y-2">
            {edition.dates ? (
              <span className="text-sodium">
                {formatDateRange(edition.dates.start, edition.dates.end, locale)} · {t.city}
              </span>
            ) : (
              <>
                <span className="rounded-[2px] bg-sodium px-2.5 py-1 font-bold text-ink">
                  {t.home.datesTba}
                </span>
                <span className="text-concrete">{t.home.expectedWindow}</span>
              </>
            )}
          </p>
          {edition.dates && (
            <div className="mt-8">
              <Countdown
                targetIso={edition.dates.start}
                labels={
                  locale === "mk"
                    ? { days: "дена", hours: "часа", minutes: "минути" }
                    : { days: "days", hours: "hours", minutes: "minutes" }
                }
              />
            </div>
          )}
          <div className="mt-10 flex flex-wrap gap-4">
            {edition.dates ? (
              <Link href={href(locale, "programa")} className="btn btn-sodium">
                {t.home.ctaProgramme} <span aria-hidden="true">→</span>
              </Link>
            ) : (
              <a href="#signup" className="btn btn-sodium">
                {t.home.ctaNotify} <span aria-hidden="true">→</span>
              </a>
            )}
            <Link href={href(locale, "arhiva")} className="btn">
              {t.home.archiveCta}
            </Link>
          </div>
        </div>

        {/* ticker — the programme's vocabulary in motion */}
        <div className="relative border-t border-prussian/60 bg-ink-deep/60 py-3.5">
          <Marquee>
            {marqueeItems.map((item) => (
              <span key={item} className="type-label mx-6 flex items-center gap-6 text-paper/70">
                {item} <span aria-hidden="true" className="text-exposure">✳</span>
              </span>
            ))}
          </Marquee>
        </div>
      </section>

      {/* 2 — The thesis, on paper (the print flipping positive) */}
      <section className="section-paper grain">
        <div className="mx-auto grid max-w-[1440px] gap-10 px-4 py-24 sm:px-6 md:grid-cols-[auto_1fr] md:gap-16 md:py-32">
          <span aria-hidden="true" className="type-display -mt-4 text-[7rem] leading-none text-exposure md:text-[10rem]">
            „
          </span>
          <div>
            <p className="type-label text-prussian">{t.home.thesisTitle}</p>
            <blockquote className="type-display type-display-2 mt-6 max-w-4xl text-ink">
              {locale === "mk" ? `${t.home.thesisQuote}“` : `${t.home.thesisQuote}”`}
            </blockquote>
            <p className="mt-8 max-w-2xl text-lg text-ink/75">{t.home.thesisLead}</p>
            <p className="mt-8">
              <Link
                href={href(locale, "za-festivalot")}
                className="type-label link-sweep text-prussian"
              >
                {t.home.thesisMore} →
              </Link>
            </p>
          </div>
        </div>
      </section>

      {/* 3 — The record, in numbers */}
      <section className="grain border-b-2 border-prussian bg-ink">
        <dl className="mx-auto grid max-w-[1440px] grid-cols-2 md:grid-cols-4">
          {stats.map(([value, label], i) => (
            <div
              key={label}
              className={`px-6 py-10 md:py-14 ${i > 0 ? "border-l border-prussian/50" : ""} ${i >= 2 ? "border-t border-prussian/50 md:border-t-0" : ""}`}
            >
              <dd className="type-display text-5xl text-exposure-bright md:text-7xl">{value}</dd>
              <dt className="type-label mt-3 text-concrete">{label}</dt>
            </div>
          ))}
        </dl>
      </section>

      <div className="mx-auto max-w-[1440px] px-4 sm:px-6">
        {/* 4 — Programme preview / announcement-pending state */}
        <section className="py-20 md:py-28">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <Kicker>{edition.year}</Kicker>
              <SectionHeading>{t.home.programmePreview}</SectionHeading>
            </div>
            <AllLink href={href(locale, "programa")}>{t.home.programmeAll}</AllLink>
          </div>
          {events.length > 0 ? (
            <Reveal className="mt-10 grid gap-5 md:grid-cols-3">
              {events.map((e) => (
                <EventCard key={e.slug} event={e} locale={locale} />
              ))}
            </Reveal>
          ) : (
            <div className="mt-10 grid gap-6 md:grid-cols-2">
              <div className="card grain flex flex-col justify-center p-10">
                <p className="type-display text-2xl text-paper md:text-3xl">
                  {t.schedule.empty.title}
                </p>
                <p className="mt-4 text-concrete">{t.schedule.empty.body}</p>
              </div>
              <div id="signup">
                <SignupForm locale={locale} />
              </div>
            </div>
          )}
        </section>

        {/* 5 — Featured artists */}
        <section className="py-8 md:py-12">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHeading>{t.home.featuredArtists}</SectionHeading>
            <AllLink href={href(locale, "izveduvaci")}>{t.home.allArtists}</AllLink>
          </div>
          <Reveal className="mt-10 grid grid-cols-2 gap-5 md:grid-cols-3 xl:grid-cols-6">
            {featured.map((artist) => (
              <Link
                key={artist.slug}
                href={href(locale, "izveduvaci", artist.slug)}
                className="card card-hover group block overflow-hidden"
              >
                <ArtTile seed={artist.slug} className="aspect-square border-0 border-b-2" />
                <div className="p-4">
                  <p className="font-bold leading-snug text-paper transition-colors group-hover:text-exposure-bright">
                    {artist.name}
                  </p>
                  {artist.countries.length > 0 && (
                    <p className="type-label-sm mt-1.5 text-concrete">
                      {artist.countries.join(" / ")}
                    </p>
                  )}
                </div>
              </Link>
            ))}
          </Reveal>
        </section>
      </div>

      {/* 6 — Venues: full-bleed editorial strip */}
      <section className="mt-20 border-y-2 border-prussian md:mt-28">
        <div className="mx-auto max-w-[1440px] px-4 py-20 sm:px-6 md:py-24">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <Kicker>{t.city}</Kicker>
              <SectionHeading>{t.home.venuesTitle}</SectionHeading>
            </div>
            <AllLink href={href(locale, "lokacii")}>{t.home.allVenues}</AllLink>
          </div>
          <Reveal className="mt-10 grid gap-5 md:grid-cols-3">
            {venues.map((venue, i) => (
              <Link
                key={venue.slug}
                href={href(locale, "lokacii", venue.slug)}
                className={`card card-hover group overflow-hidden ${
                  venue.slug === "spomen-kosturnica" ? "md:col-span-2" : ""
                }`}
              >
                <div className="relative">
                  {venue.slug === "spomen-kosturnica" ? (
                    <div className="grain relative aspect-[2/1] border-b-2 border-prussian bg-ink">
                      <MonumentSilhouette className="absolute inset-0 h-full w-full" />
                    </div>
                  ) : (
                    <ArtTile
                      seed={venue.slug}
                      motif={venueMotif(venue.slug)}
                      className="aspect-[2/1] border-0 border-b-2"
                    />
                  )}
                  <span className="type-label-sm absolute left-4 top-4 border border-exposure/60 bg-ink/70 px-2 py-1 text-exposure-bright backdrop-blur-sm">
                    0{i + 1}
                  </span>
                </div>
                <div className="p-6">
                  <p className="type-label text-exposure">{venue.role[locale]}</p>
                  <p className="mt-2 text-xl font-bold text-paper transition-colors group-hover:text-exposure-bright">
                    {venue.name[locale]}
                  </p>
                </div>
              </Link>
            ))}
          </Reveal>
        </div>
      </section>

      {/* 7 — Archive band: the delivered years, oversized */}
      <section className="grain glow-exposure overflow-hidden border-b-2 border-prussian bg-ink">
        <div className="mx-auto max-w-[1440px] px-4 py-16 sm:px-6 md:py-20">
          <p className="type-label text-concrete">{t.home.archiveTeaser}</p>
          <div className="mt-6 flex flex-wrap items-baseline gap-x-10 gap-y-4">
            {[...pastEditions].reverse().map((e) => (
              <Link
                key={e.year}
                href={href(locale, "arhiva", e.slug)}
                className="type-display type-outline-bright text-6xl transition-all hover:text-exposure-bright hover:[-webkit-text-stroke-width:0] md:text-8xl"
              >
                {e.year}
              </Link>
            ))}
            <Link href={href(locale, "arhiva")} className="type-label link-sweep text-exposure">
              {t.home.archiveCta} →
            </Link>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-[1440px] px-4 sm:px-6">
        {/* 8 — Latest news */}
        <section className="py-20 md:py-24">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHeading>{t.home.latestNews}</SectionHeading>
            <AllLink href={href(locale, "vesti")}>{t.home.allNews}</AllLink>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {news.map((post) => (
              <Link
                key={post.slug}
                href={href(locale, "vesti", post.slug)}
                className="card card-hover group flex flex-col p-6"
              >
                <p className="type-label text-concrete">{formatDate(post.publishedAt, locale)}</p>
                <h3 className="mt-3 text-lg font-bold leading-snug text-paper transition-colors group-hover:text-exposure-bright">
                  {post.title[locale]}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-concrete">{post.excerpt[locale]}</p>
                <p className="type-label mt-auto pt-5 text-exposure" aria-hidden="true">
                  →
                </p>
              </Link>
            ))}
          </div>
        </section>

        {/* 9 — Partners */}
        <section className="pb-8 pt-4 md:pt-8">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHeading>{t.home.partnersTitle}</SectionHeading>
            <AllLink href={href(locale, "partneri")}>{t.home.allPartners}</AllLink>
          </div>
          <div className="mt-10">
            <PartnerWall locale={locale} compact />
          </div>
        </section>
      </div>
    </>
  );
}
