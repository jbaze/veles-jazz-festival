"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import type { Locale, SectionKey } from "@/lib/i18n/config";
import { href, sections } from "@/lib/i18n/config";
import { getDict } from "@/lib/i18n/dictionaries";

const NAV: SectionKey[] = ["programa", "izveduvaci", "lokacii", "arhiva", "za-festivalot"];
const SECONDARY_NAV: SectionKey[] = ["galerija", "vesti", "za-mediumi", "partneri", "kontakt"];

/** Map the current pathname to its counterpart in the other locale. */
function switchLocalePath(pathname: string, from: Locale, to: Locale): string {
  const parts = pathname.split("/").filter(Boolean); // [locale, section?, slug?...]
  if (parts.length < 2) return `/${to}`;
  const section = parts[1];
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
  const menuRef = useRef<HTMLDetailsElement>(null);

  // Soft navigation keeps the layout (and this <details>) mounted, so the
  // mobile menu would stay open after following a link — close it here.
  useEffect(() => {
    if (menuRef.current) menuRef.current.open = false;
  }, [pathname]);

  const isActive = (key: SectionKey) => {
    const target = href(locale, key);
    return pathname === target || pathname.startsWith(`${target}/`);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-prussian/60 bg-ink/85 backdrop-blur-md">
      <a href="#main" className="skip-link">
        {t.a11y.skipToContent}
      </a>
      <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-4 px-4 py-4 sm:px-6">
        <Link
          href={href(locale)}
          className="type-display text-xl leading-none tracking-tight text-paper transition-colors hover:text-exposure-bright"
        >
          {t.siteName}
        </Link>

        <nav aria-label={t.a11y.mainNav} className="hidden items-center gap-7 min-[900px]:flex">
          {NAV.map((key) => (
            <Link
              key={key}
              href={href(locale, key)}
              aria-current={isActive(key) ? "page" : undefined}
              className={`type-label link-sweep relative transition-colors ${
                isActive(key) ? "text-sodium" : "text-paper/80 hover:text-paper"
              }`}
            >
              {t.nav[key]}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          {/* Persistent primary CTA (a sodium site) — Toronto-style */}
          <Link
            href={href(locale, "programa")}
            className="type-label-sm mr-1 hidden rounded-[2px] bg-sodium px-3.5 py-2.5 font-bold text-ink transition-transform hover:-translate-y-0.5 sm:inline-block"
          >
            {t.nav.programa}
          </Link>
          <Link
            href={switchLocalePath(pathname, locale, other)}
            hrefLang={other}
            lang={other}
            aria-label={t.a11y.switchLang}
            className="type-label rounded-[2px] border-2 border-prussian px-3 py-2 text-paper transition-colors hover:border-exposure hover:text-exposure-bright"
          >
            {other === "en" ? "EN" : "МК"}
          </Link>

          {/* Mobile menu — <details>, works without JavaScript */}
          <details
            ref={menuRef}
            onKeyDown={(e) => {
              if (e.key === "Escape" && menuRef.current) menuRef.current.open = false;
            }}
            className="relative min-[900px]:hidden"
          >
            <summary
              className="type-label flex cursor-pointer list-none items-center rounded-[2px] border-2 border-prussian px-3 py-2 text-paper transition-colors hover:border-exposure [&::-webkit-details-marker]:hidden"
              aria-label={t.a11y.openMenu}
            >
              ☰
            </summary>
            <nav
              aria-label={t.a11y.mainNav}
              className="absolute right-0 top-full z-50 mt-3 flex w-60 flex-col border-2 border-prussian bg-ink shadow-[0_24px_60px_-20px_rgba(6,14,28,0.9)]"
            >
              {NAV.map((key) => (
                <Link
                  key={key}
                  href={href(locale, key)}
                  aria-current={isActive(key) ? "page" : undefined}
                  className={`type-label border-b border-prussian/60 px-5 py-4 transition-colors hover:bg-prussian/40 ${
                    isActive(key) ? "text-sodium" : "text-paper"
                  }`}
                >
                  {t.nav[key]}
                </Link>
              ))}
              {/* The rest of the site — footer-tier sections, reachable on mobile too */}
              {SECONDARY_NAV.map((key) => (
                <Link
                  key={key}
                  href={href(locale, key)}
                  aria-current={isActive(key) ? "page" : undefined}
                  className={`type-label-sm border-b border-prussian/40 bg-ink-deep/40 px-5 py-3 transition-colors last:border-b-0 hover:bg-prussian/40 ${
                    isActive(key) ? "text-sodium" : "text-concrete hover:text-paper"
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
