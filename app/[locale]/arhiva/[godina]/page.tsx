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
            labels={matrix.labels}
          />
        ) : (
          <p className="text-concrete">—</p>
        )}
      </section>

      {also.length > 0 && (
        <section className="mt-14">
          <h2 className="type-label mb-4 text-concrete">{t.archive.alsoProgrammed}</h2>
          <ul className="flex flex-wrap gap-3">
            {also.map((artist) => (
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
    </div>
  );
}
