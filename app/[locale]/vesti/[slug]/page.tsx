import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import NewsTeasers from "@/components/NewsTeasers";
import { AllLink, JsonLd, Kicker, SectionHeading } from "@/components/ui";
import { getEdition, getEventsByEdition, getNews, getNewsPost } from "@/lib/content";
import { href, locales, type Locale } from "@/lib/i18n/config";
import { getDict } from "@/lib/i18n/dictionaries";
import { formatDate, formatDateRange } from "@/lib/format";
import { newsPostJsonLd } from "@/lib/seo/jsonld";
import { pageMeta } from "@/lib/seo/meta";

export function generateStaticParams() {
  return locales.flatMap((locale) => getNews().map((n) => ({ locale, slug: n.slug })));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = getNewsPost(slug);
  if (!post) return {};
  return pageMeta(locale, {
    title: post.title[locale],
    description: post.excerpt[locale],
    section: "vesti",
    slug,
    article: { publishedTime: post.publishedAt },
  });
}

export default async function NewsPostPage({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}) {
  const { locale, slug } = await params;
  const post = getNewsPost(slug);
  if (!post) notFound();
  const t = getDict(locale);
  const [lead, ...body] = post.body[locale];
  const all = getNews();
  const idx = all.findIndex((n) => n.slug === post.slug);
  const newer = idx > 0 ? all[idx - 1] : undefined;
  const older = idx >= 0 && idx < all.length - 1 ? all[idx + 1] : undefined;
  const more = all.filter((n) => n.slug !== post.slug).slice(0, 3);
  const edition = post.relatedEdition ? getEdition(post.relatedEdition) : undefined;
  const editionEvents = edition ? getEventsByEdition(edition.year) : [];

  return (
    <div className="mx-auto max-w-[1440px] px-4 py-12 sm:px-6 md:py-16">
      <JsonLd data={newsPostJsonLd(post, locale)} />

      <article>
        <p className="type-label mb-8">
          <Link href={href(locale, "vesti")} className="text-concrete hover:text-exposure">
            ← {t.news.backToNews}
          </Link>
        </p>
        <Kicker>
          {t.news.published}:{" "}
          <time dateTime={post.publishedAt}>{formatDate(post.publishedAt, locale)}</time>
        </Kicker>
        <SectionHeading as="h1">{post.title[locale]}</SectionHeading>

        {lead && (
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-paper md:text-xl">{lead}</p>
        )}
        {body.length > 0 && (
          <div className="mt-6 max-w-2xl space-y-5 text-paper/90">
            {body.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>
        )}

        {/* The edition this post is about — declared in data, derived here */}
        {edition && (
          <Link
            href={
              edition.isCurrent
                ? href(locale, "programa")
                : href(locale, "arhiva", edition.slug)
            }
            className="card card-hover group mt-10 flex max-w-2xl flex-wrap items-baseline gap-x-6 gap-y-2 p-6"
          >
            <span className="type-label text-exposure">{t.news.relatedEdition}</span>
            <span className="type-display text-2xl text-paper transition-colors group-hover:text-exposure-bright">
              {edition.title[locale]} · {edition.year}
            </span>
            {edition.dates && (
              <span className="type-label text-concrete">
                {edition.dates.approximate && "≈ "}
                {formatDateRange(edition.dates.start, edition.dates.end, locale)}
              </span>
            )}
            {editionEvents.length > 0 && (
              <span className="type-label text-concrete">
                <span className="text-exposure-bright">{editionEvents.length}</span>{" "}
                {locale === "mk" ? "настани" : "events"}
              </span>
            )}
            <span className="type-label ml-auto text-exposure" aria-hidden="true">
              →
            </span>
          </Link>
        )}
      </article>

      {/* Chronological neighbours — the wire runs through the articles too */}
      {(older || newer) && (
        <nav
          aria-label={t.news.title}
          className="mt-16 flex flex-wrap items-baseline justify-between gap-6 border-t-2 border-prussian pt-8"
        >
          {older ? (
            <Link href={href(locale, "vesti", older.slug)} className="group max-w-[45%]">
              <span className="type-label block text-concrete">← {t.news.olderPost}</span>
              <span className="mt-1 block text-sm font-semibold leading-snug text-paper group-hover:text-exposure-bright">
                {older.title[locale]}
              </span>
            </Link>
          ) : (
            <span />
          )}
          {newer && (
            <Link
              href={href(locale, "vesti", newer.slug)}
              className="group max-w-[45%] text-right"
            >
              <span className="type-label block text-concrete">{t.news.newerPost} →</span>
              <span className="mt-1 block text-sm font-semibold leading-snug text-paper group-hover:text-exposure-bright">
                {newer.title[locale]}
              </span>
            </Link>
          )}
        </nav>
      )}

      {more.length > 0 && (
        <section className="mt-20 border-t-2 border-prussian pt-12">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 className="type-display text-2xl text-paper">{t.news.moreNews}</h2>
            <AllLink href={href(locale, "vesti")}>{t.news.title}</AllLink>
          </div>
          <div className="mt-8">
            <NewsTeasers posts={more} locale={locale} />
          </div>
        </section>
      )}
    </div>
  );
}
