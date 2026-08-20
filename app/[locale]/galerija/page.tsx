import type { Metadata } from "next";
import Link from "next/link";
import GalleryGrid from "@/components/GalleryGrid";
import MediaTile from "@/components/MediaTile";
import { Kicker, PendingNote, SectionHeading } from "@/components/ui";
import { getPastEditions } from "@/lib/content";
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
    title: t.gallery.title,
    description: t.gallery.pending,
    section: "galerija",
  });
}

export default async function GalleryPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const t = getDict(locale);
  const editions = getPastEditions();
  const withPhotos = editions.filter((e) => (e.gallery ?? []).length > 0);
  const pending = editions.filter((e) => (e.gallery ?? []).length === 0);

  return (
    <div className="mx-auto max-w-[1440px] px-4 py-12 sm:px-6 md:py-16">
      <Kicker>2022 — 2025</Kicker>
      <SectionHeading as="h1">{t.gallery.title}</SectionHeading>

      {/* One section per edition with cleared photos, newest first */}
      {withPhotos.map((e) => (
        <section key={e.year} className="mt-14">
          <div className="mb-6 flex flex-wrap items-baseline gap-x-4 gap-y-1">
            <Link
              href={href(locale, "arhiva", e.slug)}
              className="type-display text-3xl text-exposure hover:text-paper"
            >
              {e.year}
            </Link>
            <h2 className="type-display text-xl text-paper">{e.title[locale]}</h2>
            <span className="type-label text-concrete">{e.gallery!.length}</span>
          </div>
          <GalleryGrid photos={e.gallery!} locale={locale} />
        </section>
      ))}

      {/* Editions whose photos are still pending rights clearance */}
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
              <div key={e.year} className="relative">
                <MediaTile
                  image={e.image}
                  locale={locale}
                  seed={`gallery-${e.year}`}
                  label={String(e.year).slice(2)}
                  className="aspect-[4/3]"
                  sizes="(min-width: 768px) 25vw, 50vw"
                />
                <p className="type-label mt-3 text-concrete">
                  {e.year} · {e.title[locale]}
                </p>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
