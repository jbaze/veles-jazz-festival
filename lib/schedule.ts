import type { Locale } from "@/lib/i18n/config";
import { href } from "@/lib/i18n/config";
import { getDict } from "@/lib/i18n/dictionaries";
import type { FestivalEvent } from "@/lib/content";
import { getArtist, getVenue } from "@/lib/content";
import { formatDayShort } from "@/lib/format";
import type { MatrixDay, MatrixEvent, MatrixLabels } from "@/components/ScheduleMatrix";

/** Server-side prep: turn edition events into serialisable matrix data. */
export function buildMatrix(
  events: FestivalEvent[],
  locale: Locale,
  todayIso?: string,
): {
  days: MatrixDay[];
  venues: { slug: string; label: string }[];
  types: { slug: string; label: string }[];
  labels: MatrixLabels;
} {
  const t = getDict(locale);

  const toMatrixEvent = (e: FestivalEvent): MatrixEvent => {
    const venue = e.venue ? getVenue(e.venue) : undefined;
    return {
      slug: e.slug,
      href: href(locale, "programa", e.slug),
      title: e.title[locale],
      type: e.type,
      typeLabel: t.types[e.type],
      time: e.time,
      timeNote: e.timeNote?.[locale],
      venue: e.venue,
      venueLabel: venue ? (venue.shortName ?? venue.name)[locale] : undefined,
      artistNames: e.artists
        .map((slug) => getArtist(slug)?.name)
        .filter((n): n is string => Boolean(n))
        // don't repeat a name the event title already carries
        .filter((n) => !e.title[locale].includes(n)),
      admission: e.admission,
      admissionLabel:
        e.admission === "free"
          ? t.event.admissionFree
          : e.admission === "ticketed"
            ? t.event.admissionTicketed
            : e.admission === "sold-out"
              ? t.event.admissionSoldOut
              : t.event.admissionTbc,
    };
  };

  const byDate = new Map<string, FestivalEvent[]>();
  const undated: FestivalEvent[] = [];
  for (const e of events) {
    if (e.date) {
      const list = byDate.get(e.date) ?? [];
      list.push(e);
      byDate.set(e.date, list);
    } else {
      undated.push(e);
    }
  }

  const days: MatrixDay[] = [...byDate.entries()]
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([date, dayEvents]) => ({
      date,
      label: formatDayShort(date, locale),
      isToday: todayIso ? date === todayIso : false,
      events: dayEvents.sort((a, b) => (a.time ?? "99").localeCompare(b.time ?? "99") || (a.order ?? 0) - (b.order ?? 0)).map(toMatrixEvent),
    }));

  if (undated.length) {
    days.push({
      label: t.schedule.dateTbc,
      events: undated.sort((a, b) => (a.order ?? 0) - (b.order ?? 0)).map(toMatrixEvent),
    });
  }

  const venueSlugs = [...new Set(events.map((e) => e.venue).filter((v): v is string => Boolean(v)))];
  const venues = venueSlugs.map((slug) => {
    const v = getVenue(slug)!;
    return { slug, label: (v.shortName ?? v.name)[locale] };
  });

  const typeSlugs = [...new Set(events.map((e) => e.type))];
  const types = typeSlugs.map((slug) => ({ slug, label: t.types[slug] }));

  const labels: MatrixLabels = {
    filterDay: t.schedule.filterDay,
    filterVenue: t.schedule.filterVenue,
    filterType: t.schedule.filterType,
    filterAll: t.schedule.filterAll,
    filterReset: t.schedule.filterReset,
    noResults: t.schedule.noResults,
    timeTba: t.schedule.timeTba,
    venueTba: t.schedule.venueTba,
    matrixCaption: t.schedule.matrixCaption,
  };

  return { days, venues, types, labels };
}
