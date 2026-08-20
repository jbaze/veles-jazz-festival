import type { Metadata } from "next";
import Link from "next/link";
import { Kicker, SectionHeading } from "@/components/ui";
import { getNews } from "@/lib/content";
import { href, type Locale } from "@/lib/i18n/config";
import { getDict } from "@/lib/i18n/dictionaries";
import { formatDate } from "@/lib/format";
import { pageMeta } from "@/lib/seo/meta";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = getDict(locale);
  return pageMeta(locale, {
    title: t.news.title,
    description:
      locale === "mk"
        ? "Вести и објави од Фестивалот на џез, ворлд и современа музика — Велес."
        : "News and announcements from the Festival of Jazz, World and Contemporary Music — Veles.",
    section: "vesti",
  });
}

export default async function NewsPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const t = getDict(locale);
  const posts = getNews();
  const [featured, ...rest] = posts;

  return (
    <div className="mx-auto max-w-[1440px] px-4 py-14 sm:px-6 md:py-20">
      <Kicker>{t.siteName}</Kicker>
      <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-4">
        <SectionHeading as="h1">{t.news.title}</SectionHeading>
        <p className="type-label pb-2 text-concrete">
          <span className="type-display text-2xl text-exposure-bright">{posts.length}</span>{" "}
          {t.news.countLabel}
        </p>
      </div>

      {featured && (
        <Link
          href={href(locale, "vesti", featured.slug)}
          className="card card-hover group mt-12 block p-8 md:p-12"
        >
          <p className="type-label flex flex-wrap gap-x-4 gap-y-1">
            <span className="text-exposure">{t.news.featured}</span>
            <time dateTime={featured.publishedAt} className="text-concrete">
              {formatDate(featured.publishedAt, locale)}
            </time>
          </p>
          <h2 className="type-display mt-5 max-w-4xl text-2xl text-paper transition-colors group-hover:text-exposure-bright md:text-4xl">
            {featured.title[locale]}
          </h2>
          <p className="mt-5 max-w-2xl text-concrete">{featured.excerpt[locale]}</p>
          <p className="type-label mt-8 text-exposure">{t.news.readMore} →</p>
        </Link>
      )}

      {/* The wire: every other post as a dated editorial row */}
      {rest.length > 0 && (
        <ol className="mt-14 border-t-2 border-prussian">
          {rest.map((post) => (
            <li key={post.slug} className="border-b-2 border-prussian">
              <Link
                href={href(locale, "vesti", post.slug)}
                className="group grid gap-x-10 gap-y-2 py-8 md:grid-cols-[10rem_1fr_auto] md:items-baseline"
              >
                <time dateTime={post.publishedAt} className="type-label text-concrete">
                  {formatDate(post.publishedAt, locale)}
                </time>
                <span className="min-w-0">
                  <span className="block text-xl font-bold leading-snug text-paper transition-colors group-hover:text-exposure-bright">
                    {post.title[locale]}
                  </span>
                  <span className="mt-2 block max-w-2xl text-sm text-concrete">
                    {post.excerpt[locale]}
                  </span>
                </span>
                <span
                  aria-hidden="true"
                  className="type-display hidden text-2xl text-exposure transition-transform md:block md:group-hover:translate-x-1"
                >
                  →
                </span>
              </Link>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}
