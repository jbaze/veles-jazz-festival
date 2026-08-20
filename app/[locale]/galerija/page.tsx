import type { Metadata } from "next";
import Link from "next/link";
import GalleryGrid from "@/components/GalleryGrid";
import MediaTile from "@/components/MediaTile";
import VideoEmbed from "@/components/VideoEmbed";
import { JsonLd, Kicker, PendingNote, SectionHeading } from "@/components/ui";
import { getPastEditions } from "@/lib/content";
import { href, siteUrl, type Locale } from "@/lib/i18n/config";
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
    title: t.gallery.title,
    description: t.gallery.pending,
    section: "galerija",
  });
}

export default async function GalleryPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const t = getDict(locale);
  const editions = getPastEditions();
  // The visual record per edition — photos, aftermovies, or both.
  const withVisuals = editions.filter(
    (e) => (e.gallery ?? []).length > 0 || (e.mediaEmbeds ?? []).length > 0,
  );
  const pending = editions.filter((e) => !withVisuals.includes(e));
  const allPhotos = editions.flatMap((e) => e.gallery ?? []);

  return (
    <div className="mx-auto max-w-[1440px] px-4 py-12 sm:px-6 md:py-16">
      {allPhotos.length > 0 && (
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "ImageGallery",
            name: t.gallery.title,
            url: `${siteUrl}${href(locale, "galerija")}`,
            inLanguage: locale,
            image: allPhotos.map((p) => `${siteUrl}${p.src}`),
          }}
        />
      )}

      <Kicker>2022 — 2025</Kicker>
      <SectionHeading as="h1">{t.gallery.title}</SectionHeading>

      {/* One section per edition with a visual record, newest first */}
      {withVisuals.map((e) => {
        const photos = e.gallery ?? [];
        const videos = e.mediaEmbeds ?? [];
        return (
          <section key={e.year} className="mt-14">
            <div className="mb-6 flex flex-wrap items-baseline gap-x-4 gap-y-1">
              <Link
                href={href(locale, "arhiva", e.slug)}
                className="type-display text-3xl text-exposure hover:text-paper"
              >
                {e.year}
              </Link>
              <h2 className="type-display text-xl text-paper">{e.title[locale]}</h2>
              {photos.length > 0 && (
                <span className="type-label text-concrete">{photos.length}</span>
              )}
            </div>
            {photos.length > 0 && <GalleryGrid photos={photos} locale={locale} />}
            {videos.length > 0 && (
              <div className={photos.length > 0 ? "mt-8" : ""}>
                <p className="type-label mb-4 text-concrete">{t.video.title}</p>
                <div className="grid gap-6 md:grid-cols-2">
                  {videos.map((url, i) => (
                    <VideoEmbed
                      key={url}
                      url={url}
                      title={
                        videos.length > 1
                          ? `${e.title[locale]} · ${e.year} — ${i + 1}`
                          : `${e.title[locale]} · ${e.year}`
                      }
                      playLabel={t.video.play}
                      watchLabel={t.video.watchExternal}
                    />
                  ))}
                </div>
              </div>
            )}
          </section>
        );
      })}

      {/* Editions whose visual record is still pending rights clearance */}
      {pending.length > 0 && (
        <>
          <div className="mt-12 max-w-2xl">
            <PendingNote>{t.gallery.pending}</PendingNote>
            <p className="mt-4 text-sm text-concrete">
              {t.gallery.pressNote}{" "}
              <Link
                href={href(locale, "za-mediumi")}
                className="text-exposure underline underline-offset-4"
              >
                {t.nav["za-mediumi"]}
              </Link>
            </p>
          </div>

          <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-4">
            {pending.map((e) => (
              <Link
                key={e.year}
                href={href(locale, "arhiva", e.slug)}
                className="group relative block"
              >
                <div className="transition-transform duration-500 group-hover:scale-[1.02]">
                  <MediaTile
                    image={e.image}
                    locale={locale}
                    seed={`gallery-${e.year}`}
                    label={String(e.year).slice(2)}
                    className="aspect-[4/3]"
                    sizes="(min-width: 768px) 25vw, 50vw"
                  />
                </div>
                <p className="type-label mt-3 text-concrete transition-colors group-hover:text-paper">
                  {e.year} · {e.title[locale]}
                  <span className="ml-2 text-exposure" aria-hidden="true">
                    →
                  </span>
                </p>
              </Link>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
