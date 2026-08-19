import type { FestivalEvent } from "@/lib/content";
import { getVenue } from "@/lib/content";
import { href, siteUrl } from "@/lib/i18n/config";

function escapeIcs(text: string): string {
  return text.replace(/\\/g, "\\\\").replace(/;/g, "\\;").replace(/,/g, "\\,").replace(/\n/g, "\\n");
}

/**
 * Minimal VCALENDAR for one event. Only called for events with a known date;
 * events without a confirmed time are emitted as all-day entries.
 */
export function eventToIcs(event: FestivalEvent): string {
  if (!event.date) throw new Error(`Event ${event.slug} has no date`);
  const venue = event.venue ? getVenue(event.venue) : undefined;
  const uid = `${event.slug}@jazzveles`;
  const url = `${siteUrl}${href("mk", "programa", event.slug)}`;

  const d = event.date.replace(/-/g, "");
  let dtLines: string[];
  if (event.time) {
    const t = event.time.replace(":", "") + "00";
    // Europe/Skopje local time, floating (no TZID database shipped).
    dtLines = [`DTSTART:${d}T${t}`, `DTEND:${d}T${String(Number(event.time.slice(0, 2)) + 2).padStart(2, "0")}${event.time.slice(3)}00`];
  } else {
    const [y, m, day] = event.date.split("-").map(Number);
    const next = new Date(Date.UTC(y, m - 1, day + 1));
    const nextStr = `${next.getUTCFullYear()}${String(next.getUTCMonth() + 1).padStart(2, "0")}${String(next.getUTCDate()).padStart(2, "0")}`;
    dtLines = [`DTSTART;VALUE=DATE:${d}`, `DTEND;VALUE=DATE:${nextStr}`];
  }

  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Jazz Veles//Festival//MK",
    "BEGIN:VEVENT",
    `UID:${uid}`,
    `DTSTAMP:${d}T000000Z`,
    ...dtLines,
    `SUMMARY:${escapeIcs(event.title.mk)}`,
    ...(venue ? [`LOCATION:${escapeIcs(`${venue.name.mk}, Велес`)}`] : ["LOCATION:Велес"]),
    `URL:${url}`,
    "END:VEVENT",
    "END:VCALENDAR",
    "",
  ].join("\r\n");
}
