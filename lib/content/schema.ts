import { z } from "zod";

/**
 * Phase 1 content model (brief §11). Content lives in-repo under
 * lib/content/data/* and is validated against these schemas at build time.
 * Phase 2 (headless CMS) should map onto the same shapes so the swap is a
 * data migration, not a rewrite. Pages must only ever read through
 * lib/content/index.ts.
 */

export const LocalizedString = z.object({ mk: z.string(), en: z.string() });
export type LocalizedString = z.infer<typeof LocalizedString>;

const isoDate = z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "expected YYYY-MM-DD");

export const EditionSchema = z.object({
  year: z.number().int(),
  ordinal: z.number().int().min(1),
  slug: z.string(),
  title: LocalizedString,
  // Dates are optional: the 2026 edition ships in an honest
  // "announcement pending" state, and 2023's dates are approximate.
  dates: z
    .object({
      start: isoDate,
      end: isoDate,
      approximate: z.boolean().optional(),
    })
    .optional(),
  festivalDays: z.number().int().optional(),
  description: LocalizedString,
  countries: z.array(z.string()), // ISO 3166-1 alpha-2
  partners: z.array(z.string()), // Partner slugs
  isCurrent: z.boolean(),
  programmeIncomplete: z.boolean().optional(),
  productionNotes: LocalizedString.optional(), // e.g. edition-wide video mapping
  alsoProgrammed: z.array(z.string()).optional(), // artist slugs without confirmed dates
});
export type Edition = z.infer<typeof EditionSchema>;

export const EventTypeSchema = z.enum([
  "concert",
  "exhibition",
  "workshop",
  "performance",
  "dj-set",
  "party",
]);
export type EventType = z.infer<typeof EventTypeSchema>;

export const EventSchema = z.object({
  slug: z.string(),
  editionYear: z.number().int(),
  title: LocalizedString,
  type: EventTypeSchema,
  date: isoDate.optional(), // omitted → date not yet public / not reconstructed
  endDate: isoDate.optional(), // for exhibitions that run over several days
  time: z.string().regex(/^\d{2}:\d{2}$/).optional(), // omitted → time TBA
  timeNote: LocalizedString.optional(), // e.g. "after the concert"
  venue: z.string().optional(), // Venue slug; omitted → venue TBA [VERIFY]
  artists: z.array(z.string()), // Artist slugs
  description: LocalizedString.optional(),
  admission: z.enum(["free", "ticketed", "tbc"]), // [VERIFY] — brief §5
  ticketUrl: z.string().url().optional(),
  mediaEmbeds: z.array(z.string().url()).optional(),
  order: z.number().int().optional(), // ordering within a day when times are unknown
});
export type FestivalEvent = z.infer<typeof EventSchema>;

export const ArtistSchema = z.object({
  slug: z.string(),
  name: z.string(),
  nameLocal: z.string().optional(), // Cyrillic / Latin counterpart where both exist
  countries: z.array(z.string()), // ISO codes; empty → not confirmed
  bio: LocalizedString.optional(),
  links: z
    .object({
      web: z.string().url().optional(),
      spotify: z.string().url().optional(),
      bandcamp: z.string().url().optional(),
      instagram: z.string().url().optional(),
      youtube: z.string().url().optional(),
    })
    .optional(),
});
export type Artist = z.infer<typeof ArtistSchema>;

export const VenueSchema = z.object({
  slug: z.string(),
  name: LocalizedString,
  shortName: LocalizedString.optional(), // for tight schedule columns
  // Address & coordinates deliberately optional: never invent facts.
  address: z.string().optional(),
  coordinates: z.object({ lat: z.number(), lng: z.number() }).optional(),
  description: LocalizedString,
  gettingThere: LocalizedString.optional(),
  accessibilityNotes: LocalizedString.optional(),
  capacity: z.number().int().optional(),
  role: LocalizedString, // e.g. "Main stage"
});
export type Venue = z.infer<typeof VenueSchema>;

export const PartnerSchema = z.object({
  slug: z.string(),
  name: z.string(),
  url: z.string().url().optional(),
  // Municipality & Ministry are NOT sponsors — separate tiers, separate
  // visual treatment (brief §11 note).
  tier: z.enum(["founder", "institutional", "partner", "sponsor", "media"]),
  editions: z.array(z.number().int()),
});
export type Partner = z.infer<typeof PartnerSchema>;

export const NewsPostSchema = z.object({
  slug: z.string(),
  title: LocalizedString,
  publishedAt: isoDate,
  excerpt: LocalizedString,
  body: z.object({ mk: z.array(z.string()), en: z.array(z.string()) }), // paragraphs
});
export type NewsPost = z.infer<typeof NewsPostSchema>;
