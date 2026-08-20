import Link from "next/link";
import { getStrands, type StrandId } from "@/lib/content";
import { href, type Locale } from "@/lib/i18n/config";
import { getDict } from "@/lib/i18n/dictionaries";
import { Kicker } from "@/components/ui";

/**
 * The programme's named tracks (Bansko pattern) as an editorial band.
 * Counts and years come from the archive via getStrands(), so the band is
 * honest while the 2026 programme is pending and grows automatically once
 * new events land. Venue strands link to the venue profile; the daytime
 * strand links to the archive that proves it.
 */
export default function ProgrammeStrands({ locale }: { locale: Locale }) {
  const t = getDict(locale);
  const strands = getStrands();
  if (strands.length === 0) return null;

  const linkFor = (id: StrandId, venueSlug?: string) =>
    venueSlug ? href(locale, "lokacii", venueSlug) : href(locale, "arhiva");

  return (
    <section className="mt-20 border-t-2 border-prussian pt-12 md:mt-28">
      <Kicker>{t.strands.title}</Kicker>
      <p className="mt-4 max-w-2xl text-concrete">{t.strands.lead}</p>

      <ol className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {strands.map((strand, i) => (
          <li key={strand.id} className="h-full">
            <Link
              href={linkFor(strand.id, strand.venueSlug)}
              className="card card-hover group flex h-full flex-col p-6"
            >
              <p aria-hidden="true" className="type-display type-outline text-5xl leading-none">
                0{i + 1}
              </p>
              <h3 className="type-display mt-5 text-xl text-paper transition-colors group-hover:text-exposure-bright">
                {t.strands.items[strand.id].name}
              </h3>
              <p className="mt-3 text-sm text-concrete">{t.strands.items[strand.id].desc}</p>
              <p className="type-label-sm mt-auto flex flex-wrap gap-x-4 gap-y-1 pt-5 text-concrete">
                <span>
                  <span className="text-exposure-bright">{strand.count}</span>{" "}
                  {t.strands.eventsLabel}
                </span>
                <span className="text-exposure">{strand.years.join(" · ")}</span>
              </p>
              <p className="type-label mt-4 text-concrete transition-colors group-hover:text-exposure">
                {strand.venueSlug ? t.strands.toVenue : t.strands.toArchive} →
              </p>
            </Link>
          </li>
        ))}
      </ol>
    </section>
  );
}
