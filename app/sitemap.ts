import type { MetadataRoute } from "next";
import { alternates, href, locales, siteUrl, type SectionKey } from "@/lib/i18n/config";
import { getArtists, getEvents, getNews, getPastEditions, getVenues } from "@/lib/content";

/** Generated from content (brief §12), with hreflang alternates per entry. */
export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  const add = (section?: SectionKey, slug?: string, priority = 0.6) => {
    const alt = alternates(section, slug);
    for (const locale of locales) {
      entries.push({
        url: `${siteUrl}${href(locale, section, slug)}`,
        alternates: {
          languages: {
            mk: `${siteUrl}${alt.mk}`,
            en: `${siteUrl}${alt.en}`,
            "x-default": `${siteUrl}${alt["x-default"]}`,
          },
        },
        priority,
      });
    }
  };

  add(undefined, undefined, 1.0);
  add("programa", undefined, 0.9);
  add("izveduvaci", undefined, 0.8);
  add("lokacii", undefined, 0.7);
  add("arhiva", undefined, 0.8);
  add("za-festivalot", undefined, 0.7);
  add("galerija", undefined, 0.4);
  add("vesti", undefined, 0.7);
  add("za-mediumi", undefined, 0.5);
  add("partneri", undefined, 0.4);
  add("kontakt", undefined, 0.5);

  for (const e of getEvents()) add("programa", e.slug, 0.7);
  for (const a of getArtists()) add("izveduvaci", a.slug, 0.6);
  for (const v of getVenues()) add("lokacii", v.slug, 0.5);
  for (const ed of getPastEditions()) add("arhiva", ed.slug, 0.7);
  for (const n of getNews()) add("vesti", n.slug, 0.6);

  return entries;
}
