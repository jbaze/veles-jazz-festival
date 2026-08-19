import type { Metadata } from "next";
import Link from "next/link";
import { Kicker, PhotoPending, SectionHeading } from "@/components/ui";
import { getArtistEditionYears, getArtists } from "@/lib/content";
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

  return (
    <div className="mx-auto max-w-[1440px] px-4 py-12 sm:px-6 md:py-16">
      <Kicker>2022 — 2026</Kicker>
      <SectionHeading as="h1">{t.artists.title}</SectionHeading>

      <ul className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4">
        {artists.map((artist) => {
          const years = getArtistEditionYears(artist.slug);
          return (
            <li key={artist.slug}>
              <Link
                href={href(locale, "izveduvaci", artist.slug)}
                className="card group block h-full p-4 transition-colors hover:border-exposure"
              >
                <PhotoPending locale={locale} className="aspect-square" />
                <p className="mt-3 font-semibold leading-snug text-paper group-hover:text-exposure">
                  {artist.name}
                </p>
                <p className="type-label mt-1 flex flex-wrap gap-x-2 text-concrete">
                  {artist.countries.length > 0 && (
                    <span>
                      {artist.countries.map((c) => countryName(c, locale)).join(" / ")}
                    </span>
                  )}
                  <span className="text-exposure">{years.join(" · ")}</span>
                </p>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
