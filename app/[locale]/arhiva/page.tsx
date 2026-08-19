import type { Metadata } from "next";
import Link from "next/link";
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
          return (
            <li key={edition.year} className="relative pb-14 pl-8 last:pb-0 md:pl-12">
              <span
                aria-hidden="true"
                className="absolute -left-[7px] top-2 h-3 w-3 border-2 border-exposure bg-ink"
              />
              <Link href={href(locale, "arhiva", edition.slug)} className="group block">
                <p className="type-display text-4xl text-exposure group-hover:text-paper md:text-6xl">
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
                {edition.countries.length > 0 && (
                  <p className="type-label mt-2 text-concrete">
                    {edition.countries.map((c) => countryName(c, locale)).join(" · ")}
                  </p>
                )}
                {headliners.length > 0 && (
                  <p className="mt-3 max-w-2xl text-sm text-paper/80">
                    {headliners.join(" · ")}
                  </p>
                )}
                <p className="type-label mt-4 text-exposure group-hover:underline">
                  {t.archive.viewEdition} →
                </p>
              </Link>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
