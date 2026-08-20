import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import EventCard from "@/components/EventCard";
import Photo from "@/components/Photo";
import VideoEmbed from "@/components/VideoEmbed";
import { JsonLd, Kicker, PendingNote, SectionHeading, TypeBadge } from "@/components/ui";
import {
  getArtist,
  getEdition,
  getEvent,
  getEvents,
  getRelatedEvents,
  getVenue,
} from "@/lib/content";
import { href, locales, type Locale } from "@/lib/i18n/config";
import { getDict } from "@/lib/i18n/dictionaries";
import { formatDate } from "@/lib/format";
import { eventJsonLd } from "@/lib/seo/jsonld";
import { pageMeta } from "@/lib/seo/meta";

export function generateStaticParams() {
  return locales.flatMap((locale) => getEvents().map((e) => ({ locale, slug: e.slug })));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const event = getEvent(slug);
  if (!event) return {};
  const t = getDict(locale);
  const dateStr = event.date ? formatDate(event.date, locale) : t.schedule.dateTbc;
  return pageMeta(locale, {
    title: event.title[locale],
    description:
      event.description?.[locale] ??
      `${event.title[locale]} — ${t.siteNameFull}, ${dateStr}.`,
    section: "programa",
    slug,
  });
}

export default async function EventPage({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}) {
  const { locale, slug } = await params;
  const event = getEvent(slug);
  if (!event) notFound();
  const t = getDict(locale);
  const venue = event.venue ? getVenue(event.venue) : undefined;
  const edition = getEdition(event.editionYear);
  const artists = event.artists
    .map((s) => getArtist(s))
    .filter((a): a is NonNullable<typeof a> => Boolean(a));
  const related = getRelatedEvents(event).slice(0, 3);

  return (
    <div className="mx-auto max-w-[1440px] px-4 py-12 sm:px-6 md:py-16">
      <JsonLd data={eventJsonLd(event, locale)} />

      <p className="type-label mb-8">
        <Link href={href(locale, "programa")} className="text-concrete hover:text-exposure">
          ← {t.event.backToProgramme}
        </Link>
      </p>

      <div className="grid gap-12 lg:grid-cols-[2fr_1fr]">
        <div>
          <Kicker>
            {event.date ? formatDate(event.date, locale) : t.schedule.dateTbc}
            {event.endDate && ` — ${formatDate(event.endDate, locale)}`}
            {event.time && ` · ${event.time}`}
            {event.timeNote && ` · ${event.timeNote[locale]}`}
          </Kicker>
          <SectionHeading as="h1">{event.title[locale]}</SectionHeading>

          <p className="mt-6 flex flex-wrap items-center gap-3">
            <TypeBadge type={event.type} locale={locale} />
            <span
              className={`type-label ${event.admission === "free" ? "text-exposure" : "text-concrete"}`}
            >
              {event.admission === "free"
                ? t.event.admissionFree
                : event.admission === "ticketed"
                  ? t.event.admissionTicketed
                  : t.event.admissionTbc}
            </span>
          </p>

          {event.image && (
            <Photo
              image={event.image}
              locale={locale}
              className="mt-8 aspect-[16/9] max-w-2xl"
              sizes="(min-width: 1024px) 672px, 100vw"
              priority
            />
          )}

          {event.description && (
            <p className="mt-8 max-w-2xl text-paper/90">{event.description[locale]}</p>
          )}

          {(event.mediaEmbeds ?? []).length > 0 && (
            <div className="mt-8 flex max-w-2xl flex-col gap-6">
              {event.mediaEmbeds!.map((url) => (
                <VideoEmbed
                  key={url}
                  url={url}
                  title={event.title[locale]}
                  playLabel={t.video.play}
                  watchLabel={t.video.watchExternal}
                />
              ))}
            </div>
          )}

          {artists.length > 0 && (
            <section className="mt-10">
              <h2 className="type-label mb-4 text-concrete">{t.event.artists}</h2>
              <ul className="flex flex-wrap gap-3">
                {artists.map((artist) => (
                  <li key={artist.slug}>
                    <Link
                      href={href(locale, "izveduvaci", artist.slug)}
                      className="card block px-4 py-3 font-semibold text-paper transition-colors hover:border-exposure hover:text-exposure"
                    >
                      {artist.name}
                      {artist.countries.length > 0 && (
                        <span className="type-label ml-2 text-concrete">
                          {artist.countries.join("/")}
                        </span>
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {event.mediaEmbeds && event.mediaEmbeds.length > 0 && (
            <section className="mt-10">
              <ul className="flex flex-col gap-2">
                {event.mediaEmbeds.map((url) => (
                  <li key={url}>
                    <a href={url} rel="noopener" className="text-exposure underline underline-offset-4">
                      {url}
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {event.date && (
            <p className="mt-10">
              <a href={`/ics/${event.slug}`} className="btn" download={`${event.slug}.ics`}>
                {t.event.addToCalendar} (.ics)
              </a>
            </p>
          )}
        </div>

        <aside className="flex flex-col gap-6">
          <div className="card p-5">
            <h2 className="type-label text-concrete">{t.event.venue}</h2>
            {venue ? (
              <>
                <Link
                  href={href(locale, "lokacii", venue.slug)}
                  className="mt-2 block text-lg font-bold text-paper hover:text-exposure"
                >
                  {venue.name[locale]}
                </Link>
                <p className="mt-1 text-sm text-concrete">{venue.role[locale]}</p>
              </>
            ) : (
              <PendingNote>{t.schedule.venueTba}</PendingNote>
            )}
          </div>
          {edition && (
            <div className="card p-5">
              <h2 className="type-label text-concrete">{t.event.edition}</h2>
              <Link
                href={href(locale, "arhiva", edition.slug)}
                className="mt-2 block text-lg font-bold text-paper hover:text-exposure"
              >
                {edition.title[locale]} · {edition.year}
              </Link>
            </div>
          )}
        </aside>
      </div>

      {related.length > 0 && (
        <section className="mt-16">
          <h2 className="type-label mb-6 text-concrete">{t.event.related}</h2>
          <div className="grid gap-4 md:grid-cols-3">
            {related.map((e) => (
              <EventCard key={e.slug} event={e} locale={locale} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
