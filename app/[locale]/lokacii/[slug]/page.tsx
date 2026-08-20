import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import EventCard from "@/components/EventCard";
import MonumentSilhouette from "@/components/MonumentSilhouette";
import { venueMotif } from "@/components/ArtTile";
import MediaTile from "@/components/MediaTile";
import { JsonLd, PendingNote, SectionHeading } from "@/components/ui";
import {
  getArtist,
  getCurrentEdition,
  getEdition,
  getEventsByVenue,
  getStrands,
  getVenue,
  getVenues,
} from "@/lib/content";
import { href, locales, type Locale } from "@/lib/i18n/config";
import { getDict } from "@/lib/i18n/dictionaries";
import { placeJsonLd } from "@/lib/seo/jsonld";
import { pageMeta } from "@/lib/seo/meta";

export function generateStaticParams() {
  return locales.flatMap((locale) => getVenues().map((v) => ({ locale, slug: v.slug })));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const venue = getVenue(slug);
  if (!venue) return {};
  return pageMeta(locale, {
    title: venue.name[locale],
    description: venue.description[locale],
    section: "lokacii",
    slug,
  });
}

export default async function VenuePage({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}) {
  const { locale, slug } = await params;
  const venue = getVenue(slug);
  if (!venue) notFound();
  const t = getDict(locale);
  const currentYear = getCurrentEdition().year;
  const allEvents = getEventsByVenue(slug);
  const currentEvents = allEvents.filter((e) => e.editionYear === currentYear);
  const pastYears = [
    ...new Set(allEvents.filter((e) => e.editionYear !== currentYear).map((e) => e.editionYear)),
  ].sort((a, b) => b - a);
  const activeYears = [...new Set(allEvents.map((e) => e.editionYear))].sort();
  const strand = getStrands().find((s) => s.venueSlug === slug);
  // Everyone who has performed here, in order of first appearance
  const artistsHere = [...new Set(allEvents.flatMap((e) => e.artists))]
    .map((s) => getArtist(s))
    .filter((a): a is NonNullable<typeof a> => Boolean(a));

  return (
    <>
      <JsonLd data={placeJsonLd(venue, locale)} />

      {/* Full-bleed hero with overlaid identity */}
      <section className="relative overflow-hidden border-b-2 border-prussian">
        <MediaTile
          image={venue.image}
          locale={locale}
          seed={venue.slug}
          motif={venueMotif(venue.slug)}
          className="aspect-[16/9] max-h-[62vh] min-h-80 w-full border-0 md:aspect-[21/9]"
          sizes="100vw"
          priority
          fallback={
            venue.slug === "spomen-kosturnica" ? (
              <div className="grain glow-deep relative aspect-[16/9] max-h-[62vh] min-h-80 w-full bg-ink md:aspect-[21/9]">
                <MonumentSilhouette className="absolute inset-0 h-full w-full" />
              </div>
            ) : undefined
          }
        />
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-ink via-ink/60 to-transparent"
        />
        <div className="absolute inset-x-0 bottom-0">
          <div className="mx-auto max-w-[1440px] px-4 pb-10 sm:px-6 md:pb-14">
            <p className="type-label mb-4">
              <Link href={href(locale, "lokacii")} className="text-concrete hover:text-exposure">
                ← {t.venues.title}
              </Link>
            </p>
            <p className="type-label text-exposure-bright">{venue.role[locale]}</p>
            <SectionHeading as="h1">{venue.name[locale]}</SectionHeading>
          </div>
        </div>
      </section>

      {/* Facts bar */}
      <section className="border-b border-prussian/60 bg-ink-deep/50">
        <dl className="mx-auto grid max-w-[1440px] grid-cols-2 gap-y-4 px-4 py-6 sm:px-6 md:grid-cols-4">
          <div>
            <dt className="type-label-sm text-concrete">
              {locale === "mk" ? "Настани досега" : "Events to date"}
            </dt>
            <dd className="type-display mt-1 text-2xl text-exposure-bright">
              {allEvents.length > 0 ? allEvents.length : "—"}
            </dd>
          </div>
          <div>
            <dt className="type-label-sm text-concrete">
              {locale === "mk" ? "Изданија" : "Editions"}
            </dt>
            <dd className="type-label mt-2 text-paper">
              {activeYears.length > 0 ? activeYears.join(" · ") : "—"}
            </dd>
          </div>
          <div>
            <dt className="type-label-sm text-concrete">{t.venues.address}</dt>
            <dd className="mt-2 text-sm text-paper">
              {venue.address ?? <span className="text-concrete">{t.venues.addressPending}</span>}
            </dd>
          </div>
          {strand ? (
            <div>
              <dt className="type-label-sm text-concrete">{t.venues.strand}</dt>
              <dd className="mt-2">
                <Link
                  href={href(locale, "programa")}
                  className="type-label text-exposure-bright hover:text-paper"
                >
                  {t.strands.items[strand.id].name} →
                </Link>
              </dd>
            </div>
          ) : (
            <div>
              <dt className="type-label-sm text-concrete">{t.city}</dt>
              <dd className="type-label mt-2 text-paper">{t.country}</dd>
            </div>
          )}
        </dl>
      </section>

      <div className="mx-auto max-w-[1440px] px-4 py-14 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-[2fr_1fr]">
          <div>
            <p className="max-w-2xl text-lg leading-relaxed text-paper/90">
              {venue.description[locale]}
            </p>
            {!venue.coordinates && (
              <p className="mt-6 max-w-2xl text-sm text-concrete">{t.venues.mapPending}</p>
            )}
          </div>
          <aside className="flex flex-col gap-5">
            {venue.gettingThere && (
              <div className="card p-5">
                <h2 className="type-label text-concrete">{t.venues.gettingThere}</h2>
                <p className="mt-2 text-sm text-paper/90">{venue.gettingThere[locale]}</p>
              </div>
            )}
            {venue.accessibilityNotes && (
              <div className="card p-5">
                <h2 className="type-label text-concrete">{t.venues.accessibility}</h2>
                <p className="mt-2 text-sm text-paper/90">{venue.accessibilityNotes[locale]}</p>
              </div>
            )}
          </aside>
        </div>

        {currentEvents.length > 0 && (
          <section className="mt-16">
            <h2 className="type-label mb-6 text-sodium">{t.venues.eventsHere}</h2>
            <div className="grid gap-5 md:grid-cols-3">
              {currentEvents.map((e) => (
                <EventCard key={e.slug} event={e} locale={locale} />
              ))}
            </div>
          </section>
        )}

        {/* Past events as a per-edition timeline — the archive paying off */}
        {pastYears.length > 0 && (
          <section className="mt-16">
            <h2 className="type-label mb-8 text-concrete">{t.venues.pastEventsHere}</h2>
            <div className="flex flex-col gap-12 border-l-2 border-prussian pl-6 md:pl-10">
              {pastYears.map((year) => {
                const edition = getEdition(year);
                return (
                  <div key={year} className="relative">
                    <span
                      aria-hidden="true"
                      className="absolute -left-[31px] top-3 h-3 w-3 border-2 border-exposure bg-ink md:-left-[47px]"
                    />
                    <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                      <Link
                        href={href(locale, "arhiva", String(year))}
                        className="type-display type-outline-bright text-4xl transition-all hover:text-exposure-bright hover:[-webkit-text-stroke-width:0] md:text-5xl"
                      >
                        {year}
                      </Link>
                      {edition && (
                        <span className="type-label text-concrete">{edition.title[locale]}</span>
                      )}
                      <Link
                        href={`${href(locale, "arhiva", String(year))}?lokacija=${venue.slug}`}
                        className="type-label link-sweep text-exposure"
                      >
                        {t.venues.filteredProgramme} →
                      </Link>
                    </div>
                    <div className="mt-5 grid gap-5 md:grid-cols-3">
                      {allEvents
                        .filter((e) => e.editionYear === year)
                        .map((e) => (
                          <EventCard key={e.slug} event={e} locale={locale} />
                        ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* Everyone who has stood on this stage — the archive cross-linking */}
        {artistsHere.length > 0 && (
          <section className="mt-16">
            <h2 className="type-label mb-6 text-concrete">{t.venues.artistsHere}</h2>
            <ul className="flex max-w-4xl flex-wrap gap-3">
              {artistsHere.map((artist) => (
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

        {allEvents.length === 0 && (
          <div className="mt-16">
            <PendingNote>{t.schedule.empty.title}</PendingNote>
          </div>
        )}
      </div>
    </>
  );
}
