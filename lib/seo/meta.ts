import type { Metadata } from "next";
import type { Locale, SectionKey } from "@/lib/i18n/config";
import { alternates, href, siteUrl } from "@/lib/i18n/config";

/**
 * Canonical + hreflang metadata for one page (brief §12): full mk/en/x-default
 * pairs, one canonical per locale (the pretty English slugs, not the internal
 * ones), no duplicate MK/EN indexing.
 */
export function pageMeta(
  locale: Locale,
  opts: {
    title: string;
    description: string;
    section?: SectionKey;
    slug?: string;
    ogTitle?: string;
  },
): Metadata {
  const canonical = href(locale, opts.section, opts.slug);
  return {
    title: opts.title,
    description: opts.description,
    alternates: {
      canonical,
      languages: alternates(opts.section, opts.slug),
    },
    openGraph: {
      title: opts.ogTitle ?? opts.title,
      description: opts.description,
      url: `${siteUrl}${canonical}`,
      siteName:
        locale === "mk"
          ? "Фестивал на џез, ворлд и современа музика — Велес"
          : "Festival of Jazz, World and Contemporary Music — Veles",
      locale: locale === "mk" ? "mk_MK" : "en_GB",
      type: "website",
    },
  };
}
