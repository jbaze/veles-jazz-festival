import type { Locale } from "@/lib/i18n/config";
import { href, siteUrl } from "@/lib/i18n/config";
import type { Artist, Edition, FestivalEvent, NewsPost, Venue } from "@/lib/content";
import { getVenue, getArtist } from "@/lib/content";

/**
 * JSON-LD builders (brief §12): MusicFestival on home, MusicEvent per event,
 * Place per venue, MusicGroup per artist. Only verified facts are emitted —
 * unknown dates/locations are simply omitted, never guessed.
 */

const ORGANIZER = {
  "@type": "Organization",
  name: "Здружение за култура, уметност и млади „АРТ ГЕНЕРАТОР“ — Велес",
  alternateName: "Art Generator — Veles",
};

const FUNDER = {
  "@type": "GovernmentOrganization",
  name: "Општина Велес",
  alternateName: "Municipality of Veles",
};

const VELES_PLACE = {
  "@type": "City",
  name: "Veles",
  address: { "@type": "PostalAddress", addressLocality: "Veles", addressCountry: "MK" },
};

export function festivalJsonLd(edition: Edition, locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "MusicFestival",
    name:
      locale === "mk"
        ? "Фестивал на џез, ворлд и современа музика — Велес"
        : "Festival of Jazz, World and Contemporary Music — Veles",
    alternateName: "Фестивал на џез, ворлд и современа музика",
    url: `${siteUrl}${href(locale)}`,
    inLanguage: locale,
    location: VELES_PLACE,
    organizer: ORGANIZER,
    funder: FUNDER,
    ...(edition.dates
      ? { startDate: edition.dates.start, endDate: edition.dates.end }
      : { eventStatus: "https://schema.org/EventScheduled" }),
  };
}

export function placeJsonLd(venue: Venue, locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "Place",
    name: venue.name[locale],
    url: `${siteUrl}${href(locale, "lokacii", venue.slug)}`,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Veles",
      addressCountry: "MK",
      ...(venue.address ? { streetAddress: venue.address } : {}),
    },
    ...(venue.coordinates
      ? {
          geo: {
            "@type": "GeoCoordinates",
            latitude: venue.coordinates.lat,
            longitude: venue.coordinates.lng,
          },
        }
      : {}),
  };
}

export function artistJsonLd(artist: Artist, locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "MusicGroup",
    name: artist.name,
    ...(artist.nameLocal ? { alternateName: artist.nameLocal } : {}),
    url: `${siteUrl}${href(locale, "izveduvaci", artist.slug)}`,
    ...(artist.links?.web ? { sameAs: [artist.links.web] } : {}),
  };
}

export function newsPostJsonLd(post: NewsPost, locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: post.title[locale],
    description: post.excerpt[locale],
    datePublished: post.publishedAt,
    inLanguage: locale,
    url: `${siteUrl}${href(locale, "vesti", post.slug)}`,
    author: ORGANIZER,
    publisher: ORGANIZER,
  };
}

export function eventJsonLd(event: FestivalEvent, locale: Locale) {
  const venue = event.venue ? getVenue(event.venue) : undefined;
  const performers = event.artists
    .map((slug) => getArtist(slug))
    .filter((a): a is Artist => Boolean(a));
  return {
    "@context": "https://schema.org",
    "@type": event.type === "exhibition" || event.type === "workshop" ? "Event" : "MusicEvent",
    name: event.title[locale],
    url: `${siteUrl}${href(locale, "programa", event.slug)}`,
    inLanguage: locale,
    ...(event.date
      ? {
          startDate: event.time ? `${event.date}T${event.time}:00+02:00` : event.date,
          ...(event.endDate ? { endDate: event.endDate } : {}),
        }
      : {}),
    location: venue
      ? {
          "@type": "Place",
          name: venue.name[locale],
          address: { "@type": "PostalAddress", addressLocality: "Veles", addressCountry: "MK" },
        }
      : VELES_PLACE,
    ...(performers.length
      ? { performer: performers.map((p) => ({ "@type": "MusicGroup", name: p.name })) }
      : {}),
    ...(event.admission === "free"
      ? { isAccessibleForFree: true }
      : {}),
    organizer: ORGANIZER,
  };
}
