import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import EventCard from "@/components/EventCard";
import MediaTile from "@/components/MediaTile";
import { JsonLd, SectionHeading } from "@/components/ui";
import {
  getArtist,
  getArtistAppearances,
  getArtistEditionYears,
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
  const years = getArtistEditionYears(slug);
  const links = artist.links ? Object.entries(artist.links).filter(([, v]) => v) : [];
  const recurring = years.length > 1;

  // Related artists — co-performers first, then same-edition colleagues.
  const coPerformers = [
    ...new Set(appearances.flatMap((a) => a.event.artists).filter((s) => s !== slug)),
  ];
  const sameEdition = getArtists()
    .filter(
      (a) =>
        a.slug !== slug &&
        !coPerformers.includes(a.slug) &&
        getArtistEditionYears(a.slug).some((y) => years.includes(y)),
    )
    .map((a) => a.slug);
  const related = [...coPerformers, ...sameEdition]
    .slice(0, 8)
    .map((s) => getArtist(s))
    .filter((a): a is NonNullable<typeof a> => Boolean(a));

  return (
    <>
      <JsonLd data={artistJsonLd(artist, locale)} />

      {/* Profile header */}
      <section className="grain glow-exposure border-b-2 border-prussian">
        <div className="mx-auto grid max-w-[1440px] gap-10 px-4 py-14 sm:px-6 md:grid-cols-[minmax(0,380px)_1fr] md:items-end md:py-20">
          <MediaTile
            image={artist.image}
            locale={locale}
            seed={artist.slug}
            label={artist.name.charAt(0)}
            className="aspect-square w-full max-w-sm"
            sizes="(min-width: 768px) 380px, 100vw"
            priority
          />
          <div className="min-w-0">
            <p className="type-label mb-4">
              <Link href={href(locale, "izveduvaci")} className="text-concrete hover:text-exposure">
                ← {t.artists.title}
              </Link>
            </p>
            {artist.countries.length > 0 && (
              <p className="type-label text-exposure-bright">
                {artist.countries.map((c) => countryName(c, locale)).join(" / ")}
              </p>
            )}
            <SectionHeading as="h1">{artist.name}</SectionHeading>
            {artist.nameLocal && (
              <p className="type-label mt-3 text-concrete">{artist.nameLocal}</p>
            )}
            {recurring && (
              <p className="type-label-sm mt-5 inline-block border border-exposure/70 px-2.5 py-1 text-exposure-bright">
                {t.artists.recurring}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Facts bar */}
      <section className="border-b border-prussian/60 bg-ink-deep/50">
        <dl className="mx-auto grid max-w-[1440px] grid-cols-2 gap-y-4 px-4 py-6 sm:px-6 md:grid-cols-4">
          <div>
            <dt className="type-label-sm text-concrete">{t.artists.appearances}</dt>
            <dd className="type-display mt-1 text-2xl text-exposure-bright">
              {appearances.length > 0 ? appearances.length : "—"}
            </dd>
          </div>
          <div>
            <dt className="type-label-sm text-concrete">{t.artists.editionsLabel}</dt>
            <dd className="type-label mt-2 text-paper">
              {years.length > 0 ? years.join(" · ") : "—"}
            </dd>
          </div>
          <div>
            <dt className="type-label-sm text-concrete">{t.artists.countries}</dt>
            <dd className="type-label mt-2 text-paper">
              {artist.countries.length > 0
                ? artist.countries.map((c) => countryName(c, locale)).join(" · ")
                : "—"}
            </dd>
          </div>
          <div>
            <dt className="type-label-sm text-concrete">{t.artists.links}</dt>
            <dd className="mt-2">
              {links.length > 0 ? (
                <span className="flex flex-wrap gap-3">
                  {links.map(([kind, url]) => (
                    <a
                      key={kind}
                      href={url as string}
                      rel="noopener"
                      className="type-label link-sweep text-exposure"
                    >
                      {kind}
                    </a>
                  ))}
                </span>
              ) : (
                <span className="type-label text-concrete">—</span>
              )}
            </dd>
          </div>
        </dl>
      </section>

      <div className="mx-auto max-w-[1440px] px-4 py-14 sm:px-6">
        <p className="max-w-2xl text-lg leading-relaxed text-paper/90">
          {artist.bio?.[locale] ?? t.artists.bioPending}
        </p>

        {/* Appearances across editions — where the archive pays off (§9).
            Built from ALL connected years, so alsoProgrammed-only artists
            get an honest timeline entry instead of an empty page. */}
        {years.length > 0 && (
          <section className="mt-16">
            <h2 className="type-label mb-8 text-concrete">{t.artists.appearances}</h2>
            <div className="flex flex-col gap-12 border-l-2 border-prussian pl-6 md:pl-10">
              {years.map((year) => {
                const edition = getEdition(year);
                const yearEvents = appearances.filter((a) => a.editionYear === year);
                return (
                  <div key={year} className="relative">
                    <span
                      aria-hidden="true"
                      className="absolute -left-[31px] top-3 h-3 w-3 border-2 border-exposure bg-ink md:-left-[47px]"
                    />
                    <Link
                      href={href(locale, "arhiva", String(year))}
                      className="type-display type-outline-bright text-4xl transition-all hover:text-exposure-bright hover:[-webkit-text-stroke-width:0] md:text-5xl"
                    >
                      {year}
                    </Link>
                    {edition && (
                      <span className="type-label ml-4 text-concrete">{edition.title[locale]}</span>
                    )}
                    {yearEvents.length > 0 ? (
                      <div className="mt-5 grid gap-5 md:grid-cols-3">
                        {yearEvents.map((a) => (
                          <EventCard key={a.event.slug} event={a.event} locale={locale} />
                        ))}
                      </div>
                    ) : (
                      <p className="mt-4 max-w-xl text-sm text-concrete">
                        {t.artists.alsoProgrammedNote}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* Derived from shared events and editions — never curated by hand */}
        {related.length > 0 && (
          <section className="mt-16">
            <h2 className="type-label mb-6 text-concrete">{t.artists.related}</h2>
            <ul className="flex max-w-4xl flex-wrap gap-3">
              {related.map((a) => (
                <li key={a.slug}>
                  <Link
                    href={href(locale, "izveduvaci", a.slug)}
                    className="card block px-4 py-2 text-sm font-semibold text-paper transition-colors hover:border-exposure hover:text-exposure"
                  >
                    {a.name}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </>
  );
}
