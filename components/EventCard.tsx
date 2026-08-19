import Link from "next/link";
import type { Locale } from "@/lib/i18n/config";
import { href } from "@/lib/i18n/config";
import { getDict } from "@/lib/i18n/dictionaries";
import type { FestivalEvent } from "@/lib/content";
import { getArtist, getVenue } from "@/lib/content";
import { formatDate } from "@/lib/format";
import { TypeBadge } from "./ui";

/** Richer event card for previews and archive lists. */
export default function EventCard({ event, locale }: { event: FestivalEvent; locale: Locale }) {
  const t = getDict(locale);
  const venue = event.venue ? getVenue(event.venue) : undefined;
  const artistNames = event.artists
    .map((slug) => getArtist(slug)?.name)
    .filter((n): n is string => Boolean(n))
    .filter((n) => !event.title[locale].includes(n));

  return (
    <Link
      href={href(locale, "programa", event.slug)}
      className="card card-hover group block p-6"
    >
      <p className="type-label text-exposure">
        {event.date ? formatDate(event.date, locale) : t.schedule.dateTbc}
        {event.time && <span> · {event.time}</span>}
        {event.timeNote && <span> · {event.timeNote[locale]}</span>}
      </p>
      <h3 className="mt-2.5 text-lg font-bold leading-snug text-paper transition-colors group-hover:text-exposure-bright">
        {event.title[locale]}
      </h3>
      {artistNames.length > 0 && (
        <p className="mt-1 text-sm text-concrete">{artistNames.join(" · ")}</p>
      )}
      <p className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1">
        <TypeBadge type={event.type} locale={locale} />
        <span className="type-label text-concrete">
          {venue ? (venue.shortName ?? venue.name)[locale] : t.schedule.venueTba}
        </span>
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
    </Link>
  );
}
