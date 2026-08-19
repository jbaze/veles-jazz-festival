"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Locale, SectionKey } from "@/lib/i18n/config";
import { href, sections } from "@/lib/i18n/config";
import { getDict } from "@/lib/i18n/dictionaries";

const NAV: SectionKey[] = ["programa", "izveduvaci", "lokacii", "arhiva", "za-festivalot"];

/** Map the current pathname to its counterpart in the other locale. */
function switchLocalePath(pathname: string, from: Locale, to: Locale): string {
  const parts = pathname.split("/").filter(Boolean); // [locale, section?, slug?...]
  if (parts.length < 2) return `/${to}`;
  const section = parts[1];
  // Find the internal section key whichever public slug we're on.
  const key = (Object.keys(sections) as SectionKey[]).find(
    (k) => k === section || sections[k].en === section,
  );
  if (!key) return `/${to}`;
  const rest = parts.slice(2).join("/");
  const base = href(to, key);
  return rest ? `${base}/${rest}` : base;
}

export default function Header({ locale }: { locale: Locale }) {
  const t = getDict(locale);
  const pathname = usePathname() ?? `/${locale}`;
  const other: Locale = locale === "mk" ? "en" : "mk";

  const isActive = (key: SectionKey) => {
    const target = href(locale, key);
    return pathname === target || pathname.startsWith(`${target}/`);
  };

  return (
    <header className="border-b-2 border-prussian bg-ink/95 sticky top-0 z-50 backdrop-blur-sm">
      <a href="#main" className="skip-link">
        {t.a11y.skipToContent}
      </a>
      <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Link
          href={href(locale)}
          className="type-display text-lg leading-none text-paper hover:text-exposure"
        >
          {t.siteName}
        </Link>

        <nav aria-label={t.a11y.mainNav} className="hidden items-center gap-1 min-[900px]:flex">
          {NAV.map((key) => (
            <Link
              key={key}
              href={href(locale, key)}
              aria-current={isActive(key) ? "page" : undefined}
              className={`type-label rounded-[2px] px-3 py-2 transition-colors hover:text-exposure ${
                isActive(key) ? "text-sodium" : "text-paper"
              }`}
            >
              {t.nav[key]}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href={switchLocalePath(pathname, locale, other)}
            hrefLang={other}
            lang={other}
            aria-label={t.a11y.switchLang}
            className="type-label rounded-[2px] border-2 border-prussian px-2.5 py-1.5 text-paper hover:border-exposure"
          >
            {other === "en" ? "EN" : "МК"}
          </Link>

          {/* Mobile menu — <details>, works without JavaScript */}
          <details className="relative min-[900px]:hidden">
            <summary
              className="type-label flex cursor-pointer list-none items-center rounded-[2px] border-2 border-prussian px-2.5 py-1.5 text-paper hover:border-exposure [&::-webkit-details-marker]:hidden"
              aria-label={t.a11y.openMenu}
            >
              ☰
            </summary>
            <nav
              aria-label={t.a11y.mainNav}
              className="absolute right-0 top-full z-50 mt-2 flex w-56 flex-col border-2 border-prussian bg-ink"
            >
              {NAV.map((key) => (
                <Link
                  key={key}
                  href={href(locale, key)}
                  aria-current={isActive(key) ? "page" : undefined}
                  className={`type-label border-b border-prussian px-4 py-3 last:border-b-0 hover:bg-prussian ${
                    isActive(key) ? "text-sodium" : "text-paper"
                  }`}
                >
                  {t.nav[key]}
                </Link>
              ))}
            </nav>
          </details>
        </div>
      </div>
    </header>
  );
}
