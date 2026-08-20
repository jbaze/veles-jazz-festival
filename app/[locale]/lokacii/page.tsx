import type { Metadata } from "next";
import Link from "next/link";
import MonumentSilhouette from "@/components/MonumentSilhouette";
import ArtTile, { venueMotif } from "@/components/ArtTile";
import MediaTile from "@/components/MediaTile";
import Reveal from "@/components/Reveal";
import { Kicker, SectionHeading } from "@/components/ui";
import { getEventsByVenue, getVenues } from "@/lib/content";
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
    <div className="mx-auto max-w-[1440px] px-4 py-14 sm:px-6 md:py-20">
      <Kicker>{t.city}</Kicker>
      <SectionHeading as="h1">{t.venues.title}</SectionHeading>
      <p className="mt-6 max-w-2xl text-lg text-concrete">
        {locale === "mk"
          ? "Три работи се случуваат во три простори истата вечер — тоа е фестивалот. Секоја локација носи свој карактер: сала, паркинг, споменик, галерија."
          : "Three things happen in three places on the same night — that is the festival. Each venue carries its own character: an auditorium, a parking lot, a monument, a gallery."}
      </p>

      <ol className="mt-14 border-t-2 border-prussian">
        {venues.map((venue, i) => {
          const venueEvents = getEventsByVenue(venue.slug);
          const years = [...new Set(venueEvents.map((e) => e.editionYear))].sort();
          const flip = i % 2 === 1;
          return (
            <li key={venue.slug} className="border-b-2 border-prussian">
              <Link
                href={href(locale, "lokacii", venue.slug)}
                className="group grid gap-8 py-10 md:grid-cols-2 md:items-center md:gap-14 md:py-14"
              >
                {/* Visual side */}
                <Reveal className={flip ? "md:order-2" : ""}>
                  <div className="card card-hover relative overflow-hidden">
                    <MediaTile
                      image={venue.image}
                      locale={locale}
                      seed={venue.slug}
                      motif={venueMotif(venue.slug)}
                      className="aspect-[16/10] border-0 transition-transform duration-700 group-hover:scale-[1.03]"
                      sizes="(min-width: 768px) 50vw, 100vw"
                      fallback={
                        venue.slug === "spomen-kosturnica" ? (
                          <div className="grain relative aspect-[16/10] bg-ink">
                            <MonumentSilhouette className="absolute inset-0 h-full w-full transition-transform duration-700 group-hover:scale-[1.03]" />
                          </div>
                        ) : (
                          <div className="transition-transform duration-700 group-hover:scale-[1.03]">
                            <ArtTile
                              seed={venue.slug}
                              motif={venueMotif(venue.slug)}
                              className="aspect-[16/10] border-0"
                            />
                          </div>
                        )
                      }
                    />
                    <span className="type-label-sm absolute left-4 top-4 border border-exposure/60 bg-ink/70 px-2 py-1 text-exposure-bright backdrop-blur-sm">
                      0{i + 1}
                    </span>
                  </div>
                </Reveal>

                {/* Text side */}
                <div className={flip ? "md:order-1" : ""}>
                  <p
                    aria-hidden="true"
                    className="type-display type-outline text-6xl leading-none md:text-7xl"
                  >
                    0{i + 1}
                  </p>
                  <p className="type-label mt-5 text-exposure">{venue.role[locale]}</p>
                  <h2 className="type-display mt-3 text-3xl text-paper transition-colors group-hover:text-exposure-bright md:text-4xl">
                    {venue.name[locale]}
                  </h2>
                  <p className="mt-5 max-w-xl text-concrete">{venue.description[locale]}</p>
                  <p className="type-label mt-6 flex flex-wrap gap-x-6 gap-y-2 text-concrete">
                    {venueEvents.length > 0 && (
                      <span>
                        <span className="text-exposure-bright">{venueEvents.length}</span>{" "}
                        {locale === "mk" ? "настани" : "events"}
                      </span>
                    )}
                    {years.length > 0 && (
                      <span>
                        <span className="text-exposure-bright">{years.join(" · ")}</span>
                      </span>
                    )}
                  </p>
                  <p className="type-label link-sweep mt-7 inline-block text-exposure">
                    {locale === "mk" ? "Кон локацијата" : "View venue"} →
                  </p>
                </div>
              </Link>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
