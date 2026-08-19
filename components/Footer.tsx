import Link from "next/link";
import type { Locale, SectionKey } from "@/lib/i18n/config";
import { href } from "@/lib/i18n/config";
import { getDict } from "@/lib/i18n/dictionaries";

const FOOTER_NAV: SectionKey[] = ["galerija", "vesti", "za-mediumi", "partneri", "kontakt"];
const MAIN_NAV: SectionKey[] = ["programa", "izveduvaci", "lokacii", "arhiva", "za-festivalot"];

export default function Footer({ locale }: { locale: Locale }) {
  const t = getDict(locale);
  return (
    <footer className="grain glow-deep mt-32 border-t-2 border-prussian bg-ink">
      {/* The wordmark as an object — oversized, hollow, cropped */}
      <div className="overflow-hidden border-b border-prussian/50" aria-hidden="true">
        <p className="type-display type-outline -mb-[0.18em] whitespace-nowrap text-center text-[clamp(4rem,13vw,11rem)] leading-none">
          {t.siteName}
        </p>
      </div>

      <div className="mx-auto grid max-w-[1440px] gap-12 px-4 py-16 sm:px-6 md:grid-cols-[2fr_1fr_1fr]">
        <div>
          <p className="max-w-sm text-lg font-semibold leading-snug text-paper">
            {t.footer.fullName}
          </p>
          <p className="type-label mt-5 text-concrete">
            {t.city} · {t.country}
          </p>
          <p className="type-label mt-2 text-exposure">{t.footer.mandate}</p>
        </div>

        <nav aria-label={t.a11y.mainNav} className="flex flex-col gap-3">
          {MAIN_NAV.map((key) => (
            <Link
              key={key}
              href={href(locale, key)}
              className="type-label link-sweep w-fit text-paper/80 hover:text-paper"
            >
              {t.nav[key]}
            </Link>
          ))}
        </nav>

        <nav aria-label={t.a11y.footerNav} className="flex flex-col gap-3">
          {FOOTER_NAV.map((key) => (
            <Link
              key={key}
              href={href(locale, key)}
              className="type-label link-sweep w-fit text-paper/80 hover:text-paper"
            >
              {t.nav[key]}
            </Link>
          ))}
        </nav>
      </div>

      <div className="border-t border-prussian/50">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-2 px-4 py-6 text-xs text-concrete sm:px-6 md:flex-row md:flex-wrap md:items-center md:gap-x-8">
          <p>{t.footer.org}</p>
          <p>{t.footer.founder}</p>
          <p>{t.footer.ministry}</p>
          <p className="md:ml-auto">
            © {new Date().getFullYear()} {t.siteName}
          </p>
        </div>
      </div>
    </footer>
  );
}
