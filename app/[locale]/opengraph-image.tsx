import { ogPoster, OG_SIZE } from "@/lib/seo/og";
import { getDict } from "@/lib/i18n/dictionaries";
import { isLocale, locales, type Locale } from "@/lib/i18n/config";

export const size = OG_SIZE;
export const contentType = "image/png";
export const alt = "Фестивал на џез, ворлд и современа музика — Велес";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function OgImage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : "mk";
  const t = getDict(locale);
  return ogPoster({
    kicker: t.siteNameFull,
    title: locale === "mk" ? "ЏЕЗ ВЕЛЕС" : "JAZZ VELES",
    meta:
      locale === "mk"
        ? "Петто издание · септември 2026 · Велес"
        : "Fifth edition · September 2026 · Veles",
  });
}
