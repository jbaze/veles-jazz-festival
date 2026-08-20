import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Countdown from "@/components/Countdown";
import ExposurePrint from "@/components/ExposurePrint";
import MonumentSilhouette from "@/components/MonumentSilhouette";
import Reveal from "@/components/Reveal";
import SignupForm from "@/components/SignupForm";
import EventCard from "@/components/EventCard";
import PartnerWall from "@/components/PartnerWall";
import Marquee from "@/components/Marquee";
import { venueMotif } from "@/components/ArtTile";
import MediaTile from "@/components/MediaTile";
import VideoEmbed from "@/components/VideoEmbed";
import { AllLink, JsonLd, Kicker, SectionHeading } from "@/components/ui";
import {
  getArtist,
  getArtistEditionYears,
  getCurrentEdition,
  getEvents,
  getEventsByEdition,
  getNews,
  getPastEditions,
  getStrands,
  getVenue,
  getVenues,
} from "@/lib/content";
import NewsTeasers from "@/components/NewsTeasers";
import { AdmissionBadge } from "@/components/ui";
import { href, type Locale, type SectionKey } from "@/lib/i18n/config";
import { getDict } from "@/lib/i18n/dictionaries";
import { formatDate, formatDayChip, formatDateRange } from "@/lib/format";
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
  const currentEvents = getEventsByEdition(edition.year);
  const events = currentEvents.slice(0, 3);

  // Discover-by-day chips + this year's lineup as show cards — both derived
  // from the current programme, so they only exist once dates/events land.
  const festDays = [...new Set(currentEvents.map((e) => e.date).filter(Boolean))].sort() as string[];
  const lineupShows = [
    ...new Map(
      currentEvents
        .filter((e) => e.artists.length > 0)
        .map((e) => [e.artists[0], e] as const),
    ).entries(),
  ]
    .map(([slug, event]) => ({ artist: getArtist(slug), event }))
    .filter((s): s is { artist: NonNullable<ReturnType<typeof getArtist>>; event: (typeof currentEvents)[number] } =>
      Boolean(s.artist),
    )
    .slice(0, 8);
  const venues = getVenues().filter((v) =>
    ["spomen-kosturnica", "teatar-dzinot", "parking-na-teatarot"].includes(v.slug),
  );
  const news = getNews().slice(0, 3);
  const featured = FEATURED_ARTISTS.map((slug) => getArtist(slug)).filter(
    (a): a is NonNullable<typeof a> => Boolean(a),
  );
  const pastEditions = getPastEditions();
  const editionWithVideo = pastEditions.find((e) => e.mediaEmbeds?.length);

  // The record, in numbers — computed from content, not typed by hand;
  // each cell links to the section that proves it.
  const allEvents = getEvents().filter((e) => e.editionYear !== edition.year);
  const countryCount = new Set(pastEditions.flatMap((e) => e.countries)).size;
  const stats: [string, string, SectionKey][] = [
    [String(pastEditions.length), locale === "mk" ? "изданија" : "editions", "arhiva"],
    [String(countryCount), locale === "mk" ? "земји" : "countries", "izveduvaci"],
    [String(getVenues().length), locale === "mk" ? "локации" : "venues", "lokacii"],
    [`${allEvents.length}+`, locale === "mk" ? "настани" : "events", "arhiva"],
  ];

  const strands = getStrands();

  const marqueeItems =
    locale === "mk"
      ? ["Џез", "Ворлд", "Современа музика", "Изложби", "Перформанси", "Видео-мапирање", "Велес"]
      : ["Jazz", "World", "Contemporary music", "Exhibitions", "Performances", "Video mapping", "Veles"];

  return (
    <>
      <JsonLd data={festivalJsonLd(edition, locale)} />

      {/* 1 — Hero: photography-first once the edition has an image
          (the Toronto pattern); the exposure print is the no-photo state */}
      <section className="grain glow-deep relative overflow-hidden border-b-2 border-prussian">
        {edition.image ? (
          <div className="absolute inset-0">
            <Image
              src={edition.image.src}
              alt=""
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
            {/* cyanotype wash keeps the photo in the brand's tonality */}
            <div aria-hidden="true" className="absolute inset-0 bg-prussian/40 mix-blend-multiply" />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-t from-ink via-ink/55 to-ink/15"
            />
            <p
              aria-hidden="true"
              className="type-display type-outline-bright pointer-events-none absolute -right-6 top-6 text-[clamp(6rem,22vw,19rem)] leading-none opacity-40 md:top-2"
            >
              {edition.year}
            </p>
          </div>
        ) : (
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
        )}

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

      {/* 1b — Discover by day (the Toronto pattern), derived from the programme */}
      {edition.dates && festDays.length > 1 && (
        <section className="border-b-2 border-prussian bg-ink-deep/40">
          <div className="mx-auto max-w-[1440px] px-4 py-10 sm:px-6 md:py-12">
            <div className="flex flex-wrap items-baseline justify-between gap-4">
              <p className="type-label text-concrete">{t.home.byDay}</p>
              <AllLink href={href(locale, "programa")}>{t.home.programmeAll}</AllLink>
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              {festDays.map((iso) => {
                const chip = formatDayChip(iso, locale);
                return (
                  <Link
                    key={iso}
                    href={`${href(locale, "programa")}?den=${iso}`}
                    className="group flex min-w-20 flex-col items-center rounded-[2px] border-2 border-prussian px-5 py-3 transition-colors hover:border-exposure"
                  >
                    <span className="type-label-sm text-concrete">{chip.weekday}</span>
                    <span className="type-display text-4xl leading-none text-exposure-bright transition-colors group-hover:text-paper">
                      {chip.day}
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* 2 — The thesis, on paper (the print flipping positive) */}
      <section className="section-paper grain">
        <div className="mx-auto grid max-w-[1440px] gap-10 px-4 py-24 sm:px-6 md:grid-cols-[auto_1fr] md:gap-16 md:py-32">
          <span aria-hidden="true" className="type-display -mt-4 text-[7rem] leading-none text-exposure md:text-[10rem]">
            „
          </span>
          <div>
            <p className="type-label text-prussian">{t.home.thesisTitle}</p>
            {/* Custom clamp floor: „деметрополизација“ must fit 320px screens */}
            <blockquote className="type-display mt-6 max-w-4xl text-[clamp(1.375rem,5vw,3.75rem)] text-ink">
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
        <ul className="mx-auto grid max-w-[1440px] grid-cols-2 md:grid-cols-4">
          {stats.map(([value, label, section], i) => (
            <li
              key={label}
              className={`${i > 0 ? "border-l border-prussian/50" : ""} ${i >= 2 ? "border-t border-prussian/50 md:border-t-0" : ""}`}
            >
              <Link href={href(locale, section)} className="group block px-6 py-10 md:py-14">
                <span className="type-display block text-5xl text-exposure-bright transition-colors group-hover:text-paper md:text-7xl">
                  {value}
                </span>
                <span className="type-label mt-3 block text-concrete transition-colors group-hover:text-exposure">
                  {label} →
                </span>
              </Link>
            </li>
          ))}
        </ul>
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
            // grid-cols-1 matters: an implicit track sizes to min-content and
            // the signup input + Unbounded words overflow 375px viewports
            <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
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

        {/* 5 — This year's lineup as show cards (photo + date + venue +
            admission — the Toronto pattern); simple artist cards until then */}
        <section className="py-8 md:py-12">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHeading>{t.home.featuredArtists}</SectionHeading>
            <AllLink href={href(locale, "izveduvaci")}>{t.home.allArtists}</AllLink>
          </div>
          {lineupShows.length > 0 ? (
            <Reveal className="mt-10 grid grid-cols-2 gap-5 md:grid-cols-3 xl:grid-cols-4">
              {lineupShows.map(({ artist, event }) => {
                const venue = event.venue ? getVenue(event.venue) : undefined;
                return (
                  <Link
                    key={artist.slug}
                    href={href(locale, "programa", event.slug)}
                    className="card card-hover group flex h-full flex-col overflow-hidden"
                  >
                    <MediaTile
                      image={artist.image}
                      locale={locale}
                      seed={artist.slug}
                      className="aspect-[4/5] border-0 border-b-2"
                      sizes="(min-width: 1280px) 25vw, (min-width: 768px) 33vw, 50vw"
                    />
                    <div className="flex flex-1 flex-col p-4">
                      <p className="text-lg font-bold leading-snug text-paper transition-colors group-hover:text-exposure-bright">
                        {artist.name}
                      </p>
                      <p className="type-label mt-2 text-exposure">
                        {event.date && formatDate(event.date, locale)}
                        {event.time && ` · ${event.time}`}
                      </p>
                      {venue && (
                        <p className="type-label-sm mt-1 text-concrete">
                          {(venue.shortName ?? venue.name)[locale]}
                        </p>
                      )}
                      <p className="mt-auto pt-4">
                        <AdmissionBadge admission={event.admission} locale={locale} />
                      </p>
                    </div>
                  </Link>
                );
              })}
            </Reveal>
          ) : (
            <Reveal className="mt-10 grid grid-cols-2 gap-5 md:grid-cols-3 xl:grid-cols-6">
              {featured.map((artist) => (
                <Link
                  key={artist.slug}
                  href={href(locale, "izveduvaci", artist.slug)}
                  className="card card-hover group block overflow-hidden"
                >
                  <MediaTile
                    image={artist.image}
                    locale={locale}
                    seed={artist.slug}
                    className="aspect-square border-0 border-b-2"
                    sizes="(min-width: 1280px) 17vw, (min-width: 768px) 33vw, 50vw"
                  />
                  <div className="p-4">
                    <p className="font-bold leading-snug text-paper transition-colors group-hover:text-exposure-bright">
                      {artist.name}
                    </p>
                    <p className="type-label-sm mt-1.5 flex flex-wrap gap-x-2 text-concrete">
                      {artist.countries.length > 0 && <span>{artist.countries.join(" / ")}</span>}
                      <span className="text-exposure">
                        {getArtistEditionYears(artist.slug).join(" · ")}
                      </span>
                    </p>
                  </div>
                </Link>
              ))}
            </Reveal>
          )}
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
                  <MediaTile
                    image={venue.image}
                    locale={locale}
                    seed={venue.slug}
                    motif={venueMotif(venue.slug)}
                    className="aspect-[2/1] border-0 border-b-2"
                    sizes="(min-width: 768px) 67vw, 100vw"
                    fallback={
                      venue.slug === "spomen-kosturnica" ? (
                        <div className="grain relative aspect-[2/1] border-b-2 border-prussian bg-ink">
                          <MonumentSilhouette className="absolute inset-0 h-full w-full" />
                        </div>
                      ) : undefined
                    }
                  />
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

      {/* 6b — The named tracks, compact (the Bansko pattern surfacing on home) */}
      {strands.length > 0 && (
        <section className="border-b-2 border-prussian bg-ink-deep/40">
          <div className="mx-auto max-w-[1440px] px-4 py-10 sm:px-6 md:py-12">
            <div className="flex flex-wrap items-baseline justify-between gap-4">
              <p className="type-label text-concrete">{t.strands.title}</p>
              <AllLink href={href(locale, "programa")}>{t.nav.programa}</AllLink>
            </div>
            <ol className="mt-6 grid gap-x-10 gap-y-5 sm:grid-cols-2 xl:grid-cols-4">
              {strands.map((s, i) => (
                <li key={s.id}>
                  <Link
                    href={href(locale, "programa")}
                    className="group flex items-baseline gap-3"
                  >
                    <span aria-hidden="true" className="type-display type-outline text-3xl">
                      0{i + 1}
                    </span>
                    <span className="min-w-0">
                      <span className="block font-bold leading-snug text-paper transition-colors group-hover:text-exposure-bright">
                        {t.strands.items[s.id].name}
                      </span>
                      <span className="type-label-sm text-concrete">
                        <span className="text-exposure-bright">{s.count}</span>{" "}
                        {t.strands.eventsLabel} · {s.years.join(" · ")}
                      </span>
                    </span>
                  </Link>
                </li>
              ))}
            </ol>
          </div>
        </section>
      )}

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

          {/* Aftermovie slot — newest edition with video, honest note until links land */}
          {editionWithVideo ? (
            <div className="mt-12 max-w-3xl">
              <VideoEmbed
                url={editionWithVideo.mediaEmbeds![0]}
                title={`${editionWithVideo.title[locale]} · ${editionWithVideo.year}`}
                playLabel={t.video.play}
                watchLabel={t.video.watchExternal}
              />
            </div>
          ) : (
            <p className="type-label-sm mt-10 text-concrete">{t.video.pending}</p>
          )}
        </div>
      </section>

      <div className="mx-auto max-w-[1440px] px-4 sm:px-6">
        {/* 8 — Latest news */}
        <section className="py-20 md:py-24">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHeading>{t.home.latestNews}</SectionHeading>
            <AllLink href={href(locale, "vesti")}>{t.home.allNews}</AllLink>
          </div>
          <div className="mt-10">
            <NewsTeasers posts={news} locale={locale} />
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
