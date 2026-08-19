import type { Metadata } from "next";
import Link from "next/link";
import ExposurePrint from "@/components/ExposurePrint";
import MonumentSilhouette from "@/components/MonumentSilhouette";
import Reveal from "@/components/Reveal";
import SignupForm from "@/components/SignupForm";
import EventCard from "@/components/EventCard";
import PartnerWall from "@/components/PartnerWall";
import { AllLink, JsonLd, Kicker, PhotoPending, SectionHeading } from "@/components/ui";
import {
  getArtist,
  getCurrentEdition,
  getEventsByEdition,
  getNews,
  getVenues,
} from "@/lib/content";
import { href, type Locale } from "@/lib/i18n/config";
import { getDict } from "@/lib/i18n/dictionaries";
import { formatDate, formatDateRange } from "@/lib/format";
import { festivalJsonLd } from "@/lib/seo/jsonld";
import { pageMeta } from "@/lib/seo/meta";

const FEATURED_ARTISTS = [
  "vlatko-stefanovski-trio",
  "dine-doneff",
  "transverse",
  "parussion-group",
  "shamba",
  "edit-points",
];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = getDict(locale);
  return pageMeta(locale, {
    title: `${t.siteName} — ${t.siteNameFull}`,
    description:
      locale === "mk"
        ? "Џез, ворлд и современа музика во Велес — концерти, изложби, перформанси и видео-мапирање. Петтото издание се очекува во септември 2026."
        : "Jazz, world and contemporary music in Veles, North Macedonia — concerts, exhibitions, performances and video mapping. The fifth edition is expected in September 2026.",
  });
}

export default async function HomePage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const t = getDict(locale);
  const edition = getCurrentEdition();
  const events = getEventsByEdition(edition.year).slice(0, 3);
  const venues = getVenues().filter((v) =>
    ["spomen-kosturnica", "teatar-dzinot", "parking-na-teatarot"].includes(v.slug),
  );
  const news = getNews().slice(0, 3);
  const featured = FEATURED_ARTISTS.map((slug) => getArtist(slug)).filter(
    (a): a is NonNullable<typeof a> => Boolean(a),
  );

  return (
    <>
      <JsonLd data={festivalJsonLd(edition, locale)} />

      {/* 1 — Hero: the exposure reveal */}
      <section className="relative overflow-hidden border-b-2 border-prussian">
        <ExposurePrint id="hero-print" className="absolute inset-0">
          <MonumentSilhouette className="absolute bottom-0 left-1/2 h-full w-full min-w-[900px] -translate-x-1/2 opacity-90" />
        </ExposurePrint>
        <div className="relative mx-auto flex max-w-[1440px] flex-col justify-end px-4 pb-16 pt-28 sm:px-6 md:min-h-[80vh] md:pt-40">
          <p className="type-label text-exposure">
            {t.siteNameFull}
          </p>
          <h1 className="type-display type-display-1 mt-4 max-w-5xl uppercase text-paper">
            {t.home.editionOrdinal}
          </h1>
          <p className="type-label mt-6 text-paper">
            {edition.dates ? (
              <span className="text-sodium">
                {formatDateRange(edition.dates.start, edition.dates.end, locale)} · {t.city}
              </span>
            ) : (
              <>
                <span className="text-sodium">{t.home.datesTba}</span>
                <span className="text-concrete"> · {t.home.expectedWindow}</span>
              </>
            )}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            {edition.dates ? (
              <Link href={href(locale, "programa")} className="btn btn-sodium">
                {t.home.ctaProgramme}
              </Link>
            ) : (
              <a href="#signup" className="btn btn-sodium">
                {t.home.ctaNotify}
              </a>
            )}
            <Link href={href(locale, "arhiva")} className="btn">
              {t.home.archiveCta}
            </Link>
          </div>
        </div>
      </section>

      {/* 2 — The thesis, on paper (the print flipping positive) */}
      <section className="section-paper">
        <div className="mx-auto max-w-[1440px] px-4 py-16 sm:px-6 md:py-24">
          <p className="type-label text-prussian">{t.home.thesisTitle}</p>
          <blockquote className="type-display type-display-2 mt-6 max-w-4xl text-ink">
            {locale === "mk" ? `„${t.home.thesisQuote}“` : `“${t.home.thesisQuote}”`}
          </blockquote>
          <p className="mt-6 max-w-2xl text-ink/80">{t.home.thesisLead}</p>
          <p className="mt-6">
            <Link
              href={href(locale, "za-festivalot")}
              className="type-label text-prussian underline-offset-4 hover:underline"
            >
              {t.home.thesisMore} →
            </Link>
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-[1440px] px-4 sm:px-6">
        {/* 3 — Programme preview / announcement-pending state */}
        <section className="py-16 md:py-20">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <Kicker>{edition.year}</Kicker>
              <SectionHeading>{t.home.programmePreview}</SectionHeading>
            </div>
            <AllLink href={href(locale, "programa")}>{t.home.programmeAll}</AllLink>
          </div>
          {events.length > 0 ? (
            <Reveal className="mt-8 grid gap-4 md:grid-cols-3">
              {events.map((e) => (
                <EventCard key={e.slug} event={e} locale={locale} />
              ))}
            </Reveal>
          ) : (
            <div className="mt-8 grid gap-6 md:grid-cols-2">
              <div className="card flex flex-col justify-center p-6">
                <p className="type-display text-xl text-paper">{t.schedule.empty.title}</p>
                <p className="mt-3 text-sm text-concrete">{t.schedule.empty.body}</p>
              </div>
              <div id="signup">
                <SignupForm locale={locale} />
              </div>
            </div>
          )}
        </section>

        {/* 4 — Featured artists */}
        <section className="py-8 md:py-12">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHeading>{t.home.featuredArtists}</SectionHeading>
            <AllLink href={href(locale, "izveduvaci")}>{t.home.allArtists}</AllLink>
          </div>
          <Reveal className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-6">
            {featured.map((artist) => (
              <Link
                key={artist.slug}
                href={href(locale, "izveduvaci", artist.slug)}
                className="card group p-4 transition-colors hover:border-exposure"
              >
                <PhotoPending locale={locale} className="aspect-square" />
                <p className="mt-3 font-semibold leading-snug text-paper group-hover:text-exposure">
                  {artist.name}
                </p>
                {artist.countries.length > 0 && (
                  <p className="type-label mt-1 text-concrete">{artist.countries.join(" / ")}</p>
                )}
              </Link>
            ))}
          </Reveal>
        </section>

        {/* 5 — Venues, ossuary largest */}
        <section className="py-8 md:py-12">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHeading>{t.home.venuesTitle}</SectionHeading>
            <AllLink href={href(locale, "lokacii")}>{t.home.allVenues}</AllLink>
          </div>
          <Reveal className="mt-8 grid gap-4 md:grid-cols-3">
            {venues.map((venue, i) => (
              <Link
                key={venue.slug}
                href={href(locale, "lokacii", venue.slug)}
                className={`card group overflow-hidden transition-colors hover:border-exposure ${
                  venue.slug === "spomen-kosturnica" ? "md:col-span-2 md:row-span-1" : ""
                }`}
              >
                {venue.slug === "spomen-kosturnica" ? (
                  <div className="relative aspect-[2/1] border-b-2 border-prussian bg-ink">
                    <MonumentSilhouette className="absolute inset-0 h-full w-full" />
                  </div>
                ) : (
                  <PhotoPending locale={locale} className="aspect-[2/1] border-0 border-b-2" />
                )}
                <div className="p-5">
                  <p className="type-label text-exposure">{venue.role[locale]}</p>
                  <p className="mt-1 text-lg font-bold text-paper group-hover:text-exposure">
                    {venue.name[locale]}
                  </p>
                </div>
              </Link>
            ))}
          </Reveal>
        </section>

        {/* 6 — Latest news */}
        <section className="py-8 md:py-12">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHeading>{t.home.latestNews}</SectionHeading>
            <AllLink href={href(locale, "vesti")}>{t.home.allNews}</AllLink>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {news.map((post) => (
              <Link
                key={post.slug}
                href={href(locale, "vesti", post.slug)}
                className="card group block p-5 transition-colors hover:border-exposure"
              >
                <p className="type-label text-concrete">{formatDate(post.publishedAt, locale)}</p>
                <h3 className="mt-2 font-bold leading-snug text-paper group-hover:text-exposure">
                  {post.title[locale]}
                </h3>
                <p className="mt-2 text-sm text-concrete">{post.excerpt[locale]}</p>
              </Link>
            ))}
          </div>
        </section>

        {/* 7 — Partners */}
        <section className="py-8 pb-4 md:py-12">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHeading>{t.home.partnersTitle}</SectionHeading>
            <AllLink href={href(locale, "partneri")}>{t.home.allPartners}</AllLink>
          </div>
          <div className="mt-8">
            <PartnerWall locale={locale} compact />
          </div>
        </section>
      </div>
    </>
  );
}
