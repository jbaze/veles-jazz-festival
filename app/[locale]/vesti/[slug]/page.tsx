import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Kicker, SectionHeading } from "@/components/ui";
import { getNews, getNewsPost } from "@/lib/content";
import { href, locales, type Locale } from "@/lib/i18n/config";
import { getDict } from "@/lib/i18n/dictionaries";
import { formatDate } from "@/lib/format";
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

  return (
    <article className="mx-auto max-w-[1440px] px-4 py-12 sm:px-6 md:py-16">
      <p className="type-label mb-8">
        <Link href={href(locale, "vesti")} className="text-concrete hover:text-exposure">
          ← {t.news.backToNews}
        </Link>
      </p>
      <Kicker>
        {t.news.published}: {formatDate(post.publishedAt, locale)}
      </Kicker>
      <SectionHeading as="h1">{post.title[locale]}</SectionHeading>
      <div className="mt-8 max-w-2xl space-y-5 text-paper/90">
        {post.body[locale].map((paragraph, i) => (
          <p key={i}>{paragraph}</p>
        ))}
      </div>
    </article>
  );
}
