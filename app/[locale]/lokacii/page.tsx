import type { Metadata } from "next";
import Link from "next/link";
import MonumentSilhouette from "@/components/MonumentSilhouette";
import ArtTile from "@/components/ArtTile";
import { Kicker, SectionHeading } from "@/components/ui";
import { getVenues } from "@/lib/content";
import { href, type Locale } from "@/lib/i18n/config";
import { getDict } from "@/lib/i18n/dictionaries";
import { pageMeta } from "@/lib/seo/meta";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = getDict(locale);
  return pageMeta(locale, {
    title: t.venues.title,
    description:
      locale === "mk"
        ? "Локациите на фестивалот во Велес: Театарот „Ј.Х.К. Џинот“, Спомен-костурницата, Europe House и паркингот на театарот."
        : "The festival's venues in Veles: the J.H.K. Dzhinot Theatre, the Memorial Ossuary, Europe House and the theatre parking lot.",
    section: "lokacii",
  });
}

export default async function VenuesPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const t = getDict(locale);
  const venues = getVenues();

  return (
    <div className="mx-auto max-w-[1440px] px-4 py-12 sm:px-6 md:py-16">
      <Kicker>{t.city}</Kicker>
      <SectionHeading as="h1">{t.venues.title}</SectionHeading>

      <ul className="mt-10 grid gap-4 md:grid-cols-2">
        {venues.map((venue) => (
          <li key={venue.slug} className={venue.slug === "spomen-kosturnica" ? "md:col-span-2" : ""}>
            <Link
              href={href(locale, "lokacii", venue.slug)}
              className="card card-hover group block overflow-hidden"
            >
              {venue.slug === "spomen-kosturnica" ? (
                <div className="grain relative aspect-[5/2] border-b-2 border-prussian bg-ink">
                  <MonumentSilhouette className="absolute inset-0 h-full w-full" />
                </div>
              ) : (
                <ArtTile seed={venue.slug} className="aspect-[5/2] border-0 border-b-2" />
              )}
              <div className="p-6">
                <p className="type-label text-exposure">{venue.role[locale]}</p>
                <h2 className="mt-2 text-2xl font-bold text-paper transition-colors group-hover:text-exposure-bright">
                  {venue.name[locale]}
                </h2>
                <p className="mt-2 max-w-2xl text-sm text-concrete">
                  {venue.description[locale]}
                </p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
