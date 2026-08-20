import Image from "next/image";
import Link from "next/link";
import type { Locale, SectionKey } from "@/lib/i18n/config";
import { href, SOCIAL_LINKS } from "@/lib/i18n/config";
import { getDict } from "@/lib/i18n/dictionaries";

const FOOTER_NAV: SectionKey[] = ["galerija", "vesti", "za-mediumi", "partneri", "kontakt"];
const MAIN_NAV: SectionKey[] = ["programa", "izveduvaci", "lokacii", "arhiva", "za-festivalot"];

export default function Footer({ locale }: { locale: Locale }) {
  const t = getDict(locale);
  return (
    <footer className="grain glow-deep border-t-2 border-prussian bg-ink">
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
          {/* The organiser's mark on a paper chip — its artwork needs a light
              ground, and multiply prints it onto the paper */}
          <div className="mt-8 w-fit border-2 border-prussian bg-paper p-3">
            <Image
              src="/images/brand/art-generator.jpg"
              alt={t.media.orgLogoAlt}
              width={531}
              height={376}
              sizes="112px"
              className="w-28 mix-blend-multiply"
            />
          </div>
          {/* Official profiles — renders once SOCIAL_LINKS is filled (question #6) */}
          {SOCIAL_LINKS.length > 0 && (
            <div className="mt-8">
              <p className="type-label-sm text-concrete">{t.contact.socialTitle}</p>
              <ul className="mt-2 flex flex-wrap gap-x-5 gap-y-2">
                {SOCIAL_LINKS.map((s) => (
                  <li key={s.url}>
                    <a
                      href={s.url}
                      rel="noopener noreferrer"
                      target="_blank"
                      className="type-label link-sweep text-paper/80 hover:text-paper"
                    >
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
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
          <a href="#main" className="type-label link-sweep text-concrete hover:text-paper">
            ↑ {t.footer.backToTop}
          </a>
        </div>
      </div>
    </footer>
  );
}
