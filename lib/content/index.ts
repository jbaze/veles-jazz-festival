import { z } from "zod";
import {
  ArtistSchema,
  EditionSchema,
  EventSchema,
  NewsPostSchema,
  PartnerSchema,
  VenueSchema,
  type Artist,
  type Edition,
  type FestivalEvent,
  type NewsPost,
  type Partner,
  type Venue,
} from "./schema";
import { editions as rawEditions } from "./data/editions";
import { events as rawEvents } from "./data/events";
import { artists as rawArtists } from "./data/artists";
import { venues as rawVenues } from "./data/venues";
import { partners as rawPartners } from "./data/partners";
import { news as rawNews } from "./data/news";

/**
 * The single typed content gateway (brief §13): every page imports from here
 * and nothing else touches the data files. Phase 2 swaps the imports above
 * for CMS fetches without changing a single page.
 *
 * Data is validated once at module load — a bad entry fails the build,
 * which is exactly what we want for content edited via PR.
 */
function validate<T>(schema: z.ZodType<T>, items: unknown[], kind: string): T[] {
  return items.map((item, i) => {
    const result = schema.safeParse(item);
    if (!result.success) {
      throw new Error(
        `Invalid ${kind} at index ${i}: ${result.error.issues
          .map((iss) => `${iss.path.join(".")}: ${iss.message}`)
          .join("; ")}`,
      );
    }
    return result.data;
  });
}

const editions = validate(EditionSchema, rawEditions, "Edition");
const events = validate(EventSchema, rawEvents, "Event");
const artists = validate(ArtistSchema, rawArtists, "Artist");
const venues = validate(VenueSchema, rawVenues, "Venue");
const partners = validate(PartnerSchema, rawPartners, "Partner");
const news = validate(NewsPostSchema, rawNews, "NewsPost");

// Referential integrity — fail the build on a dangling slug.
{
  const artistSlugs = new Set(artists.map((a) => a.slug));
  const venueSlugs = new Set(venues.map((v) => v.slug));
  const partnerSlugs = new Set(partners.map((p) => p.slug));
  for (const e of events) {
    for (const a of e.artists)
      if (!artistSlugs.has(a)) throw new Error(`Event ${e.slug}: unknown artist "${a}"`);
    if (e.venue && !venueSlugs.has(e.venue))
      throw new Error(`Event ${e.slug}: unknown venue "${e.venue}"`);
  }
  for (const ed of editions) {
    for (const p of ed.partners)
      if (!partnerSlugs.has(p)) throw new Error(`Edition ${ed.year}: unknown partner "${p}"`);
    for (const a of ed.alsoProgrammed ?? [])
      if (!artistSlugs.has(a)) throw new Error(`Edition ${ed.year}: unknown artist "${a}"`);
  }
}

// ——— Editions ———

export function getEditions(): Edition[] {
  return [...editions].sort((a, b) => b.year - a.year);
}

export function getEdition(year: number): Edition | undefined {
  return editions.find((e) => e.year === year);
}

export function getCurrentEdition(): Edition {
  const current = editions.find((e) => e.isCurrent);
  if (!current) throw new Error("No current edition flagged in content");
  return current;
}

export function getPastEditions(): Edition[] {
  return getEditions().filter((e) => !e.isCurrent);
}

// ——— Events ———

export function getEvents(): FestivalEvent[] {
  return events;
}

export function getEventsByEdition(year: number): FestivalEvent[] {
  return events
    .filter((e) => e.editionYear === year)
    .sort((a, b) =>
      (a.date ?? "9999").localeCompare(b.date ?? "9999") || (a.order ?? 0) - (b.order ?? 0),
    );
}

export function getEvent(slug: string): FestivalEvent | undefined {
  return events.find((e) => e.slug === slug);
}

/** Events at the same venue or on the same night, excluding the event itself. */
export function getRelatedEvents(event: FestivalEvent): FestivalEvent[] {
  return getEventsByEdition(event.editionYear).filter(
    (e) =>
      e.slug !== event.slug &&
      ((event.venue && e.venue === event.venue) ||
        (event.date && e.date === event.date)),
  );
}

// ——— Artists ———

export function getArtists(): Artist[] {
  return [...artists].sort((a, b) => a.name.localeCompare(b.name, "mk"));
}

export function getArtist(slug: string): Artist | undefined {
  return artists.find((a) => a.slug === slug);
}

export type Appearance = { editionYear: number; event: FestivalEvent };

/** All appearances across editions, derived from events + alsoProgrammed. */
export function getArtistAppearances(slug: string): Appearance[] {
  return events
    .filter((e) => e.artists.includes(slug))
    .map((event) => ({ editionYear: event.editionYear, event }))
    .sort((a, b) => b.editionYear - a.editionYear);
}

/** Edition years an artist is connected to (incl. undated 2022 listings). */
export function getArtistEditionYears(slug: string): number[] {
  const years = new Set<number>(
    events.filter((e) => e.artists.includes(slug)).map((e) => e.editionYear),
  );
  for (const ed of editions)
    if (ed.alsoProgrammed?.includes(slug)) years.add(ed.year);
  return [...years].sort((a, b) => b - a);
}

// ——— Venues ———

export function getVenues(): Venue[] {
  return venues;
}

export function getVenue(slug: string): Venue | undefined {
  return venues.find((v) => v.slug === slug);
}

export function getEventsByVenue(slug: string): FestivalEvent[] {
  return events
    .filter((e) => e.venue === slug)
    .sort((a, b) => (b.date ?? "").localeCompare(a.date ?? "") || (a.order ?? 0) - (b.order ?? 0));
}

// ——— Partners ———

export function getPartners(): Partner[] {
  return partners;
}

export function getPartnersByTier(): Record<Partner["tier"], Partner[]> {
  const tiers: Record<Partner["tier"], Partner[]> = {
    founder: [],
    institutional: [],
    partner: [],
    sponsor: [],
    media: [],
  };
  for (const p of partners) tiers[p.tier].push(p);
  return tiers;
}

export function getPartner(slug: string): Partner | undefined {
  return partners.find((p) => p.slug === slug);
}

// ——— News ———

export function getNews(): NewsPost[] {
  return [...news].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}

export function getNewsPost(slug: string): NewsPost | undefined {
  return news.find((n) => n.slug === slug);
}

export type { Artist, Edition, FestivalEvent, NewsPost, Partner, Venue };
export type { EventType, ImageRef, LocalizedString } from "./schema";
