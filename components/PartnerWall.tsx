import Image from "next/image";
import type { Locale } from "@/lib/i18n/config";
import { getDict } from "@/lib/i18n/dictionaries";
import { getPartnersByTier, type Partner } from "@/lib/content";

/**
 * Founder and institutional supporters are never mixed into the sponsor
 * logo row (brief §11). Until official logos and usage rules are
 * confirmed ([VERIFY] §14.8), typographic tiles stand in; a partner with
 * `logo` set renders it on a paper chip (multiply drops white grounds,
 * like the organiser's mark).
 */
function Tile({
  partner,
  locale,
  large = false,
  showYears = false,
}: {
  partner: Partner;
  locale: Locale;
  large?: boolean;
  showYears?: boolean;
}) {
  const inner = (
    <span
      className={`card flex h-full flex-col items-center justify-center gap-2 px-5 py-4 text-center transition-colors group-hover:border-exposure ${
        large ? "min-h-24" : "min-h-20"
      }`}
    >
      {partner.logo ? (
        <>
          <span className={`relative block w-full bg-paper ${large ? "h-16" : "h-12"}`}>
            <Image
              src={partner.logo.src}
              alt={partner.logo.alt[locale]}
              fill
              sizes="240px"
              className="object-contain p-2 mix-blend-multiply"
            />
          </span>
          <span className="type-label-sm text-concrete transition-colors group-hover:text-paper">
            {partner.name}
          </span>
        </>
      ) : (
        <span
          className={`font-semibold text-concrete transition-colors group-hover:text-paper ${
            large ? "text-lg" : "text-sm"
          }`}
        >
          {partner.name}
        </span>
      )}
      {showYears && partner.editions.length > 0 && (
        <span className="type-label-sm text-exposure">{partner.editions.join(" · ")}</span>
      )}
    </span>
  );
  return partner.url ? (
    <a href={partner.url} rel="noopener" className="group block h-full">
      {inner}
    </a>
  ) : (
    <span className="group block h-full">{inner}</span>
  );
}

export default function PartnerWall({
  locale,
  compact = false,
  editionFilter,
  showYears = false,
}: {
  locale: Locale;
  compact?: boolean;
  editionFilter?: number;
  /** Show each partner's edition years — on the partners page only. */
  showYears?: boolean;
}) {
  const t = getDict(locale);
  const tiers = getPartnersByTier();
  const filter = (list: Partner[]) =>
    editionFilter ? list.filter((p) => p.editions.includes(editionFilter)) : list;

  const founder = filter(tiers.founder);
  const institutional = filter(tiers.institutional);
  const partner = filter(tiers.partner);
  const sponsor = filter(tiers.sponsor);
  const media = filter(tiers.media);

  return (
    <div className="flex flex-col gap-8">
      {(founder.length > 0 || institutional.length > 0) && (
        <div className="grid gap-4 md:grid-cols-2">
          {founder.length > 0 && (
            <div>
              <p className="type-label mb-3 text-sodium">{t.partners.founder}</p>
              <div className="grid gap-3">
                {founder.map((p) => (
                  <Tile key={p.slug} partner={p} locale={locale} showYears={showYears} large />
                ))}
              </div>
            </div>
          )}
          {institutional.length > 0 && (
            <div>
              <p className="type-label mb-3 text-exposure">{t.partners.institutional}</p>
              <div className="grid gap-3">
                {institutional.map((p) => (
                  <Tile key={p.slug} partner={p} locale={locale} showYears={showYears} large />
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {partner.length > 0 && (
        <div>
          <p className="type-label mb-3 text-concrete">{t.partners.partner}</p>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            {partner.map((p) => (
              <Tile key={p.slug} partner={p} locale={locale} showYears={showYears} />
            ))}
          </div>
        </div>
      )}

      {!compact && sponsor.length > 0 && (
        <div>
          <p className="type-label mb-3 text-concrete">{t.partners.sponsor}</p>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-5">
            {sponsor.map((p) => (
              <Tile key={p.slug} partner={p} locale={locale} showYears={showYears} />
            ))}
          </div>
        </div>
      )}

      {!compact && media.length > 0 && (
        <div>
          <p className="type-label mb-3 text-concrete">{t.partners.media}</p>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-5">
            {media.map((p) => (
              <Tile key={p.slug} partner={p} locale={locale} showYears={showYears} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
