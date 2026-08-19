import type { Metadata } from "next";
import Link from "next/link";
import ArtTile from "@/components/ArtTile";
import FilterableArtistGrid, { type ArtistMeta } from "@/components/FilterableArtistGrid";
import { Kicker, SectionHeading } from "@/components/ui";
import { getArtistAppearances, getArtistEditionYears, getArtists, getPastEditions } from "@/lib/content";
import { href, type Locale } from "@/lib/i18n/config";
import { getDict } from "@/lib/i18n/dictionaries";
import { countryName } from "@/lib/format";
import { pageMeta } from "@/lib/seo/meta";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = getDict(locale);
  return pageMeta(locale, {
    title: t.artists.title,
    description:
      locale === "mk"
        ? "Сите изведувачи на Фестивалот на џез, ворлд и современа музика — Велес, од 2022 досега: од Влатко Стефановски Трио до Dine Doneff и Transverse."
        : "All artists of the Festival of Jazz, World and Contemporary Music — Veles since 2022: from the Vlatko Stefanovski Trio to Dine Doneff and Transverse.",
    section: "izveduvaci",
  });
}

export default async function ArtistsPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const t = getDict(locale);
  const artists = getArtists();

  const meta: ArtistMeta[] = artists.map((a) => ({
    slug: a.slug,
    countries: a.countries,
    years: getArtistEditionYears(a.slug),
  }));

  const countryOptions = [...new Set(artists.flatMap((a) => a.countries))]
    .sort()
    .map((code) => ({ value: code, label: countryName(code, locale) }));
  const editionOptions = getPastEditions()
    .map((e) => e.year)
    .sort()
    .map((year) => ({ value: String(year), label: String(year) }));

  return (
    <div className="mx-auto max-w-[1440px] px-4 py-14 sm:px-6 md:py-20">
      <Kicker>2022 — 2026</Kicker>
      <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-4">
        <SectionHeading as="h1">{t.artists.title}</SectionHeading>
        <p className="type-label pb-2 text-concrete">
          <span className="type-display text-2xl text-exposure-bright">{artists.length}</span>{" "}
          {t.artists.countTemplate}
        </p>
      </div>

      <div className="mt-12">
        <FilterableArtistGrid
          items={meta}
          countryOptions={countryOptions}
          editionOptions={editionOptions}
          labels={{
            country: t.artists.filterCountry,
            edition: t.artists.filterEdition,
            all: t.schedule.filterAll,
            reset: t.schedule.filterReset,
            noMatches: t.artists.noMatches,
          }}
        >
          {artists.map((artist) => {
            const years = getArtistEditionYears(artist.slug);
            const appearanceCount = getArtistAppearances(artist.slug).length;
            const recurring = years.length > 1;
            return (
              <Link
                key={artist.slug}
                href={href(locale, "izveduvaci", artist.slug)}
                className="card card-hover group block h-full overflow-hidden"
              >
                <div className="relative">
                  <ArtTile
                    seed={artist.slug}
                    label={artist.name.charAt(0)}
                    className="aspect-square border-0 border-b-2"
                  />
                  {recurring && (
                    <span className="type-label-sm absolute left-3 top-3 border border-exposure/70 bg-ink/70 px-2 py-1 text-exposure-bright backdrop-blur-sm">
                      {t.artists.recurring}
                    </span>
                  )}
                </div>
                <div className="p-4">
                  <p className="font-bold leading-snug text-paper transition-colors group-hover:text-exposure-bright">
                    {artist.name}
                  </p>
                  <p className="type-label-sm mt-2 flex flex-wrap gap-x-2 gap-y-1 text-concrete">
                    {artist.countries.length > 0 && (
                      <span>{artist.countries.map((c) => countryName(c, locale)).join(" / ")}</span>
                    )}
                    <span className="text-exposure">{years.join(" · ")}</span>
                    {appearanceCount > 1 && (
                      <span>
                        {appearanceCount} {t.artists.appearancesLabel}
                      </span>
                    )}
                  </p>
                </div>
              </Link>
            );
          })}
        </FilterableArtistGrid>
      </div>
    </div>
  );
}
