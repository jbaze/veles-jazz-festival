import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ScheduleMatrix from "@/components/ScheduleMatrix";
import PartnerWall from "@/components/PartnerWall";
import VideoEmbed from "@/components/VideoEmbed";
import { Kicker, PendingNote, SectionHeading } from "@/components/ui";
import { getArtist, getEdition, getEditions, getEventsByEdition } from "@/lib/content";
import { buildMatrix } from "@/lib/schedule";
import { href, locales, type Locale } from "@/lib/i18n/config";
import { getDict } from "@/lib/i18n/dictionaries";
import { countryName, formatDateRange } from "@/lib/format";
import { pageMeta } from "@/lib/seo/meta";

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    getEditions()
      .filter((e) => !e.isCurrent)
      .map((e) => ({ locale, godina: e.slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale; godina: string }>;
}): Promise<Metadata> {
  const { locale, godina } = await params;
  const edition = getEdition(Number(godina));
  if (!edition) return {};
  const t = getDict(locale);
  return pageMeta(locale, {
    title: `${edition.title[locale]} · ${edition.year}`,
    description: edition.description[locale],
    section: "arhiva",
    slug: godina,
  });
}

export default async function EditionPage({
  params,
}: {
  params: Promise<{ locale: Locale; godina: string }>;
}) {
  const { locale, godina } = await params;
  const edition = getEdition(Number(godina));
  if (!edition || edition.isCurrent) notFound();
  const t = getDict(locale);
  const events = getEventsByEdition(edition.year);
  const matrix = buildMatrix(events, locale);
  const also = (edition.alsoProgrammed ?? [])
    .map((slug) => getArtist(slug))
    .filter((a): a is NonNullable<typeof a> => Boolean(a));

  // The record in numbers + the full lineup — derived, never typed by hand
  const lineup = [...new Set(events.flatMap((e) => e.artists))]
    .map((s) => getArtist(s))
    .filter((a): a is NonNullable<typeof a> => Boolean(a));
  const venueCount = new Set(events.map((e) => e.venue).filter(Boolean)).size;
  const stats: [string, string][] = [
    [String(events.length), locale === "mk" ? "настани" : "events"],
    [
      String(lineup.length + also.length),
      locale === "mk" ? "изведувачи" : "artists",
    ],
    [String(venueCount), locale === "mk" ? "локации" : "venues"],
    [String(edition.countries.length), locale === "mk" ? "земји" : "countries"],
  ];

  // Prev/next among past editions (sorted newest first)
  const past = getEditions().filter((e) => !e.isCurrent);
  const idx = past.findIndex((e) => e.year === edition.year);
  const newer = idx > 0 ? past[idx - 1] : undefined;
  const older = idx >= 0 && idx < past.length - 1 ? past[idx + 1] : undefined;

  return (
    <div className="mx-auto max-w-[1440px] px-4 py-12 sm:px-6 md:py-16">
      <p className="type-label mb-8">
        <Link href={href(locale, "arhiva")} className="text-concrete hover:text-exposure">
          ← {t.archive.title}
        </Link>
      </p>

      <Kicker>
        {edition.dates && (
          <>
            {edition.dates.approximate && "≈ "}
            {formatDateRange(edition.dates.start, edition.dates.end, locale)}
          </>
        )}
        {edition.festivalDays && ` · ${edition.festivalDays} ${t.archive.days}`}
      </Kicker>
      <SectionHeading as="h1">
        {edition.title[locale]} · {edition.year}
      </SectionHeading>
      <p className="mt-6 max-w-2xl text-paper/90">{edition.description[locale]}</p>

      {edition.countries.length > 0 && (
        <p className="type-label mt-4 text-concrete">
          {t.archive.countries}: {edition.countries.map((c) => countryName(c, locale)).join(" · ")}
        </p>
      )}
      {edition.productionNotes && (
        <p className="mt-4 max-w-2xl text-sm text-concrete">{edition.productionNotes[locale]}</p>
      )}

      {/* The edition in numbers — the facts-bar idiom */}
      {events.length > 0 && (
        <dl className="mt-10 grid grid-cols-2 gap-y-4 border-y border-prussian/60 bg-ink-deep/50 px-4 py-6 md:grid-cols-4">
          {stats.map(([value, label]) => (
            <div key={label}>
              <dt className="type-label-sm text-concrete">{label}</dt>
              <dd className="type-display mt-1 text-2xl text-exposure-bright">{value}</dd>
            </div>
          ))}
        </dl>
      )}

      <section className="mt-14">
        <h2 className="type-label mb-6 text-concrete">{t.archive.programme}</h2>
        {edition.programmeIncomplete && (
          <div className="mb-6">
            <PendingNote>{t.archive.incompleteNote}</PendingNote>
          </div>
        )}
        {events.length > 0 ? (
          <ScheduleMatrix
            days={matrix.days}
            venues={matrix.venues}
            types={matrix.types}
            strands={matrix.strands}
            labels={matrix.labels}
          />
        ) : (
          <p className="text-concrete">—</p>
        )}
      </section>

      {/* The full lineup, derived from the programme; alsoProgrammed
          artists join at the end with the same chips */}
      {(lineup.length > 0 || also.length > 0) && (
        <section className="mt-14">
          <h2 className="type-label mb-4 text-concrete">{t.archive.lineup}</h2>
          <ul className="flex max-w-4xl flex-wrap gap-3">
            {[...lineup, ...also].map((artist) => (
              <li key={artist.slug}>
                <Link
                  href={href(locale, "izveduvaci", artist.slug)}
                  className="card block px-4 py-2 text-sm font-semibold text-paper transition-colors hover:border-exposure hover:text-exposure"
                >
                  {artist.name}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section className="mt-14">
        <h2 className="type-label mb-6 text-concrete">{t.video.title}</h2>
        {edition.mediaEmbeds?.length ? (
          <div className="grid gap-6 md:grid-cols-2">
            {edition.mediaEmbeds.map((url, i) => (
              <VideoEmbed
                key={url}
                url={url}
                title={
                  edition.mediaEmbeds!.length > 1
                    ? `${edition.title[locale]} · ${edition.year} — ${i + 1}`
                    : `${edition.title[locale]} · ${edition.year}`
                }
                playLabel={t.video.play}
                watchLabel={t.video.watchExternal}
              />
            ))}
          </div>
        ) : (
          <PendingNote>{t.video.pending}</PendingNote>
        )}
      </section>

      <section className="mt-14">
        <h2 className="type-label mb-4 text-concrete">{t.archive.galleryPending}</h2>
      </section>

      {edition.partners.length > 0 && (
        <section className="mt-14">
          <h2 className="type-label mb-6 text-concrete">{t.archive.partners}</h2>
          <PartnerWall locale={locale} editionFilter={edition.year} />
        </section>
      )}

      {/* Between the years — editorial pagination through the record */}
      {(older || newer) && (
        <nav
          aria-label={t.archive.title}
          className="mt-16 flex flex-wrap items-baseline justify-between gap-6 border-t-2 border-prussian pt-8"
        >
          {older ? (
            <Link href={href(locale, "arhiva", older.slug)} className="group">
              <span className="type-label text-concrete">← {t.archive.prevEdition}</span>
              <span className="type-display ml-3 text-2xl text-exposure group-hover:text-paper">
                {older.year}
              </span>
            </Link>
          ) : (
            <span />
          )}
          {newer && (
            <Link href={href(locale, "arhiva", newer.slug)} className="group text-right">
              <span className="type-display mr-3 text-2xl text-exposure group-hover:text-paper">
                {newer.year}
              </span>
              <span className="type-label text-concrete">{t.archive.nextEdition} →</span>
            </Link>
          )}
        </nav>
      )}
    </div>
  );
}
