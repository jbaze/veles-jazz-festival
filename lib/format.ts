import type { Locale } from "./i18n/config";

const intlLocale: Record<Locale, string> = { mk: "mk-MK", en: "en-GB" };

/** "4 септември 2022" / "4 September 2022" from an ISO date string. */
export function formatDate(iso: string, locale: Locale): string {
  const [y, m, d] = iso.split("-").map(Number);
  return new Intl.DateTimeFormat(intlLocale[locale], {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(Date.UTC(y, m - 1, d)));
}

/** Short weekday + day/month, for schedule day headers. */
export function formatDayShort(iso: string, locale: Locale): string {
  const [y, m, d] = iso.split("-").map(Number);
  return new Intl.DateTimeFormat(intlLocale[locale], {
    weekday: "short",
    day: "numeric",
    month: "short",
    timeZone: "UTC",
  }).format(new Date(Date.UTC(y, m - 1, d)));
}

/** "4–10 септември 2022" style range; falls back to two full dates across months. */
export function formatDateRange(start: string, end: string, locale: Locale): string {
  const [ys, ms, ds] = start.split("-").map(Number);
  const [ye, me, de] = end.split("-").map(Number);
  const fmt = new Intl.DateTimeFormat(intlLocale[locale], {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
  if (ys === ye && ms === me) {
    const monthYear = new Intl.DateTimeFormat(intlLocale[locale], {
      month: "long",
      year: "numeric",
      timeZone: "UTC",
    }).format(new Date(Date.UTC(ys, ms - 1, ds)));
    return `${ds}–${de} ${monthYear}`;
  }
  return `${fmt.format(new Date(Date.UTC(ys, ms - 1, ds)))} — ${fmt.format(
    new Date(Date.UTC(ye, me - 1, de)),
  )}`;
}

const countryNamesMk: Record<string, string> = {
  MK: "Северна Македонија",
  GR: "Грција",
  US: "САД",
  FR: "Франција",
  DE: "Германија",
  FI: "Финска",
  AU: "Австралија",
};

/** Localised country name from an ISO 3166-1 alpha-2 code. */
export function countryName(code: string, locale: Locale): string {
  if (locale === "mk") return countryNamesMk[code] ?? code;
  return (
    new Intl.DisplayNames(["en"], { type: "region" }).of(code) ?? code
  );
}
