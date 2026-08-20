import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import NewsTeasers from "@/components/NewsTeasers";
import { AllLink, JsonLd, Kicker, SectionHeading } from "@/components/ui";
import { getNews, getNewsPost } from "@/lib/content";
import { href, locales, type Locale } from "@/lib/i18n/config";
import { getDict } from "@/lib/i18n/dictionaries";
import { formatDate } from "@/lib/format";
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
  const more = getNews()
    .filter((n) => n.slug !== post.slug)
    .slice(0, 3);

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
      </article>

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
