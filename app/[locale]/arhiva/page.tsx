import type { Metadata } from "next";
import Link from "next/link";
import MediaTile from "@/components/MediaTile";
import { Kicker, SectionHeading } from "@/components/ui";
import { getArtist, getEventsByEdition, getPastEditions } from "@/lib/content";
import { href, type Locale } from "@/lib/i18n/config";
import { getDict } from "@/lib/i18n/dictionaries";
import { countryName, formatDateRange } from "@/lib/format";
import { pageMeta } from "@/lib/seo/meta";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = getDict(locale);
  return pageMeta(locale, {
    title: t.archive.title,
    description:
      locale === "mk"
        ? "Архива на сите изданија на Фестивалот на џез, ворлд и современа музика — Велес, од 2022 досега."
        : "Archive of all editions of the Festival of Jazz, World and Contemporary Music — Veles, since 2022.",
    section: "arhiva",
  });
}

export default async function ArchivePage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const t = getDict(locale);
  const editions = getPastEditions();

  return (
    <div className="mx-auto max-w-[1440px] px-4 py-12 sm:px-6 md:py-16">
      <Kicker>2022 — {new Date().getFullYear()}</Kicker>
      <SectionHeading as="h1">{t.archive.title}</SectionHeading>
      <p className="mt-6 max-w-2xl text-concrete">{t.archive.intro}</p>

      {/* Vertical timeline — built to be read as a record of delivery (§9) */}
      <ol className="mt-12 flex flex-col border-l-2 border-prussian">
        {editions.map((edition) => {
          const events = getEventsByEdition(edition.year);
          const headliners = [
            ...new Set(
              events
                .flatMap((e) => e.artists)
                .map((slug) => getArtist(slug)?.name)
                .filter(Boolean),
            ),
          ].slice(0, 5) as string[];
          const artistCount = new Set(events.flatMap((e) => e.artists)).size;
          return (
            <li key={edition.year} className="relative pb-14 pl-8 last:pb-0 md:pl-12">
              <span
                aria-hidden="true"
                className="absolute -left-[7px] top-2 h-3 w-3 border-2 border-exposure bg-ink"
              />
              <Link
                href={href(locale, "arhiva", edition.slug)}
                className="group grid gap-x-10 gap-y-6 md:grid-cols-[minmax(0,1fr)_minmax(0,340px)] md:items-start"
              >
                <div className="min-w-0">
                  <p className="type-display type-outline-bright text-6xl transition-all group-hover:text-exposure-bright group-hover:[-webkit-text-stroke-width:0] md:text-8xl">
                    {edition.year}
                  </p>
                  <p className="type-label mt-2 text-paper">
                    {edition.title[locale]}
                    {edition.dates && (
                      <span className="text-concrete">
                        {" · "}
                        {edition.dates.approximate && "≈ "}
                        {formatDateRange(edition.dates.start, edition.dates.end, locale)}
                      </span>
                    )}
                    {edition.festivalDays && (
                      <span className="text-concrete">
                        {" · "}
                        {edition.festivalDays} {t.archive.days}
                      </span>
                    )}
                  </p>
                  <p className="type-label mt-3 flex flex-wrap gap-x-6 gap-y-1 text-concrete">
                    {events.length > 0 && (
                      <span>
                        <span className="text-exposure-bright">{events.length}</span>{" "}
                        {locale === "mk" ? "настани" : "events"}
                      </span>
                    )}
                    {artistCount > 0 && (
                      <span>
                        <span className="text-exposure-bright">{artistCount}</span>{" "}
                        {locale === "mk" ? "изведувачи" : "artists"}
                      </span>
                    )}
                    {edition.countries.length > 0 && (
                      <span>{edition.countries.map((c) => countryName(c, locale)).join(" · ")}</span>
                    )}
                  </p>
                  {headliners.length > 0 && (
                    <p className="mt-3 max-w-2xl text-sm text-paper/80">{headliners.join(" · ")}</p>
                  )}
                  <p className="type-label mt-4 text-exposure group-hover:underline">
                    {t.archive.viewEdition} →
                  </p>
                </div>
                {/* Photo-ready: edition.image drops in, ArtTile print until then */}
                <div className="transition-transform duration-700 group-hover:scale-[1.02]">
                  <MediaTile
                    image={edition.image}
                    locale={locale}
                    seed={`gallery-${edition.year}`}
                    label={String(edition.year).slice(2)}
                    className="aspect-[16/10]"
                    sizes="(min-width: 768px) 340px, 100vw"
                  />
                </div>
              </Link>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
