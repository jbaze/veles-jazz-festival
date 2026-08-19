import type { Locale } from "@/lib/i18n/config";
import { getDict } from "@/lib/i18n/dictionaries";
import { getPartnersByTier, type Partner } from "@/lib/content";

/**
 * Founder and institutional supporters are never mixed into the sponsor
 * logo row (brief §11). No logo files exist yet ([VERIFY] §14.4/14.8) —
 * typographic tiles stand in: greyscale, colour on hover.
 */
function Tile({ partner, large = false }: { partner: Partner; large?: boolean }) {
  const inner = (
    <span
      className={`card flex h-full items-center justify-center px-5 text-center font-semibold text-concrete transition-colors group-hover:border-exposure group-hover:text-paper ${
        large ? "min-h-24 text-lg" : "min-h-20 text-sm"
      }`}
    >
      {partner.name}
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
}: {
  locale: Locale;
  compact?: boolean;
  editionFilter?: number;
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
                  <Tile key={p.slug} partner={p} large />
                ))}
              </div>
            </div>
          )}
          {institutional.length > 0 && (
            <div>
              <p className="type-label mb-3 text-exposure">{t.partners.institutional}</p>
              <div className="grid gap-3">
                {institutional.map((p) => (
                  <Tile key={p.slug} partner={p} large />
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
              <Tile key={p.slug} partner={p} />
            ))}
          </div>
        </div>
      )}

      {!compact && sponsor.length > 0 && (
        <div>
          <p className="type-label mb-3 text-concrete">{t.partners.sponsor}</p>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-5">
            {sponsor.map((p) => (
              <Tile key={p.slug} partner={p} />
            ))}
          </div>
        </div>
      )}

      {!compact && media.length > 0 && (
        <div>
          <p className="type-label mb-3 text-concrete">{t.partners.media}</p>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-5">
            {media.map((p) => (
              <Tile key={p.slug} partner={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
