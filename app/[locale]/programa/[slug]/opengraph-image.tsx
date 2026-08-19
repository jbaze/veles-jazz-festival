import { ogPoster, OG_SIZE } from "@/lib/seo/og";
import { getEvent, getEvents, getVenue } from "@/lib/content";
import { getDict } from "@/lib/i18n/dictionaries";
import { isLocale, locales, type Locale } from "@/lib/i18n/config";
import { formatDate } from "@/lib/format";

export const size = OG_SIZE;
export const contentType = "image/png";
export const alt = "Фестивал на џез, ворлд и современа музика — Велес";

export function generateStaticParams() {
  return locales.flatMap((locale) => getEvents().map((e) => ({ locale, slug: e.slug })));
}

export default async function OgImage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale: raw, slug } = await params;
  const locale: Locale = isLocale(raw) ? raw : "mk";
  const t = getDict(locale);
  const event = getEvent(slug);
  if (!event) {
    return ogPoster({ kicker: t.siteNameFull, title: t.siteName, meta: t.city });
  }
  const venue = event.venue ? getVenue(event.venue) : undefined;
  const metaParts = [
    event.date ? formatDate(event.date, locale) : t.home.datesTba,
    venue ? (venue.shortName ?? venue.name)[locale] : t.city,
  ];
  return ogPoster({
    kicker: t.siteNameFull,
    title: event.title[locale],
    meta: metaParts.join(" · "),
  });
}
