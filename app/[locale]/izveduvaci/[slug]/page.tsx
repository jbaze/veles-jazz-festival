import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import EventCard from "@/components/EventCard";
import { JsonLd, Kicker, PhotoPending, SectionHeading } from "@/components/ui";
import {
  getArtist,
  getArtistAppearances,
  getArtists,
  getEdition,
} from "@/lib/content";
import { href, locales, type Locale } from "@/lib/i18n/config";
import { getDict } from "@/lib/i18n/dictionaries";
import { countryName } from "@/lib/format";
import { artistJsonLd } from "@/lib/seo/jsonld";
import { pageMeta } from "@/lib/seo/meta";

export function generateStaticParams() {
  return locales.flatMap((locale) => getArtists().map((a) => ({ locale, slug: a.slug })));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const artist = getArtist(slug);
  if (!artist) return {};
  const t = getDict(locale);
  return pageMeta(locale, {
    title: artist.name,
    description: artist.bio?.[locale] ?? `${artist.name} — ${t.siteNameFull}.`,
    section: "izveduvaci",
    slug,
  });
}

export default async function ArtistPage({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}) {
  const { locale, slug } = await params;
  const artist = getArtist(slug);
  if (!artist) notFound();
  const t = getDict(locale);
  const appearances = getArtistAppearances(slug);
  const links = artist.links ? Object.entries(artist.links).filter(([, v]) => v) : [];

  return (
    <div className="mx-auto max-w-[1440px] px-4 py-12 sm:px-6 md:py-16">
      <JsonLd data={artistJsonLd(artist, locale)} />

      <div className="grid gap-10 md:grid-cols-[1fr_2fr]">
        <PhotoPending locale={locale} className="aspect-square max-w-sm" />
        <div>
          {artist.countries.length > 0 && (
            <Kicker>
              {artist.countries.map((c) => countryName(c, locale)).join(" / ")}
            </Kicker>
          )}
          <SectionHeading as="h1">{artist.name}</SectionHeading>
          {artist.nameLocal && (
            <p className="type-label mt-2 text-concrete">{artist.nameLocal}</p>
          )}
          <p className="mt-6 max-w-2xl text-paper/90">
            {artist.bio?.[locale] ?? t.artists.bioPending}
          </p>

          {links.length > 0 && (
            <div className="mt-6">
              <h2 className="type-label mb-2 text-concrete">{t.artists.links}</h2>
              <ul className="flex flex-wrap gap-3">
                {links.map(([kind, url]) => (
                  <li key={kind}>
                    <a href={url as string} rel="noopener" className="btn">
                      {kind}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Appearances across all editions — where the archive pays off (§9) */}
      <section className="mt-16">
        <h2 className="type-label mb-6 text-concrete">{t.artists.appearances}</h2>
        {appearances.length > 0 ? (
          <div className="flex flex-col gap-10">
            {[...new Set(appearances.map((a) => a.editionYear))].map((year) => {
              const edition = getEdition(year);
              return (
                <div key={year}>
                  <p className="type-label mb-4">
                    <Link
                      href={href(locale, "arhiva", String(year))}
                      className="text-exposure hover:underline"
                    >
                      {edition?.title[locale]} · {year}
                    </Link>
                  </p>
                  <div className="grid gap-4 md:grid-cols-3">
                    {appearances
                      .filter((a) => a.editionYear === year)
                      .map((a) => (
                        <EventCard key={a.event.slug} event={a.event} locale={locale} />
                      ))}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-concrete">—</p>
        )}
      </section>
    </div>
  );
}
