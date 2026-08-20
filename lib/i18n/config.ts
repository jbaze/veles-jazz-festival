export const locales = ["mk", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "mk";

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

/**
 * Section keys are the internal (Macedonian) route segments.
 * `en` is the public English slug served via the rewrites in next.config.ts.
 */
export const sections = {
  programa: { en: "programme" },
  izveduvaci: { en: "artists" },
  lokacii: { en: "venues" },
  arhiva: { en: "archive" },
  "za-festivalot": { en: "about" },
  galerija: { en: "gallery" },
  vesti: { en: "news" },
  "za-mediumi": { en: "press" },
  partneri: { en: "partners" },
  kontakt: { en: "contact" },
} as const;

export type SectionKey = keyof typeof sections;

/** Public (canonical) path for a page in a given locale. */
export function href(locale: Locale, section?: SectionKey, slug?: string): string {
  if (!section) return `/${locale}`;
  const seg = locale === "en" ? sections[section].en : section;
  return slug ? `/${locale}/${seg}/${slug}` : `/${locale}/${seg}`;
}

/** hreflang alternates (mk, en, x-default) for one page. */
export function alternates(section?: SectionKey, slug?: string) {
  return {
    mk: href("mk", section, slug),
    en: href("en", section, slug),
    "x-default": href("mk", section, slug),
  };
}

/**
 * Site origin. The domain is pending client sign-off (see brief §0) —
 * override with NEXT_PUBLIC_SITE_URL once `dzezveles.mk` / `jazzveles.mk`
 * is confirmed and registered.
 */
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? "https://jazzveles.mk";

/**
 * Official social profiles — EMPTY until the client confirms the handles
 * (open question #6). Filling this in activates the footer's follow row
 * and the festival JSON-LD `sameAs` in one place. Never guess handles.
 */
export const SOCIAL_LINKS: { label: string; url: string }[] = [];
