import Link from "next/link";
import type { Locale, SectionKey } from "@/lib/i18n/config";
import { href } from "@/lib/i18n/config";
import { getDict } from "@/lib/i18n/dictionaries";

const FOOTER_NAV: SectionKey[] = ["galerija", "vesti", "za-mediumi", "partneri", "kontakt"];

export default function Footer({ locale }: { locale: Locale }) {
  const t = getDict(locale);
  return (
    <footer className="mt-24 border-t-2 border-prussian">
      <div className="mx-auto grid max-w-[1440px] gap-10 px-4 py-12 sm:px-6 md:grid-cols-3">
        <div>
          <p className="type-display text-xl text-paper">{t.siteName}</p>
          <p className="mt-3 max-w-xs text-sm text-concrete">{t.footer.fullName}</p>
          <p className="type-label mt-4 text-concrete">
            {t.city} · {t.country}
          </p>
        </div>

        <nav aria-label={t.a11y.footerNav} className="flex flex-col gap-2">
          {FOOTER_NAV.map((key) => (
            <Link
              key={key}
              href={href(locale, key)}
              className="type-label w-fit py-1 text-paper hover:text-exposure"
            >
              {t.nav[key]}
            </Link>
          ))}
        </nav>

        <div className="flex flex-col gap-2 text-sm text-concrete">
          <p>{t.footer.org}</p>
          <p>{t.footer.founder}</p>
          <p>{t.footer.ministry}</p>
          <p className="type-label mt-2 text-exposure">{t.footer.mandate}</p>
        </div>
      </div>
      <div className="border-t border-prussian">
        <p className="mx-auto max-w-[1440px] px-4 py-4 text-xs text-concrete sm:px-6">
          © {new Date().getFullYear()} {t.footer.fullName}
        </p>
      </div>
    </footer>
  );
}
