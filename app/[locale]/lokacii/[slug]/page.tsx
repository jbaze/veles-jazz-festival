import type { Metadata } from "next";
import { notFound } from "next/navigation";
import EventCard from "@/components/EventCard";
import MonumentSilhouette from "@/components/MonumentSilhouette";
import { JsonLd, Kicker, PendingNote, PhotoPending, SectionHeading } from "@/components/ui";
import { getCurrentEdition, getEventsByVenue, getVenue, getVenues } from "@/lib/content";
import { locales, type Locale } from "@/lib/i18n/config";
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
  const pastEvents = allEvents.filter((e) => e.editionYear !== currentYear);

  return (
    <div className="mx-auto max-w-[1440px] px-4 py-12 sm:px-6 md:py-16">
      <JsonLd data={placeJsonLd(venue, locale)} />

      {venue.slug === "spomen-kosturnica" ? (
        <div className="relative mb-10 aspect-[5/2] overflow-hidden border-2 border-prussian bg-ink">
          <MonumentSilhouette className="absolute inset-0 h-full w-full" />
        </div>
      ) : (
        <PhotoPending locale={locale} className="mb-10 aspect-[5/2]" />
      )}

      <Kicker>{venue.role[locale]}</Kicker>
      <SectionHeading as="h1">{venue.name[locale]}</SectionHeading>
      <p className="mt-6 max-w-2xl text-paper/90">{venue.description[locale]}</p>

      <div className="mt-10 grid gap-6 md:grid-cols-3">
        <div className="card p-5">
          <h2 className="type-label text-concrete">{t.venues.address}</h2>
          {venue.address ? (
            <p className="mt-2 text-paper">{venue.address}</p>
          ) : (
            <p className="mt-2 text-sm text-concrete">{t.venues.addressPending}</p>
          )}
          {!venue.coordinates && (
            <p className="mt-3 text-sm text-concrete">{t.venues.mapPending}</p>
          )}
        </div>
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
      </div>

      {currentEvents.length > 0 && (
        <section className="mt-16">
          <h2 className="type-label mb-6 text-concrete">{t.venues.eventsHere}</h2>
          <div className="grid gap-4 md:grid-cols-3">
            {currentEvents.map((e) => (
              <EventCard key={e.slug} event={e} locale={locale} />
            ))}
          </div>
        </section>
      )}

      {pastEvents.length > 0 && (
        <section className="mt-16">
          <h2 className="type-label mb-6 text-concrete">{t.venues.pastEventsHere}</h2>
          <div className="grid gap-4 md:grid-cols-3">
            {pastEvents.map((e) => (
              <EventCard key={e.slug} event={e} locale={locale} />
            ))}
          </div>
        </section>
      )}

      {currentEvents.length === 0 && pastEvents.length === 0 && (
        <div className="mt-16">
          <PendingNote>{t.schedule.empty.title}</PendingNote>
        </div>
      )}
    </div>
  );
}
