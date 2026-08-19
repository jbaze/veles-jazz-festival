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

  return (
    <div className="mx-auto max-w-[1440px] px-4 py-12 sm:px-6 md:py-16">
      <Kicker>{t.siteName}</Kicker>
      <SectionHeading as="h1">{t.news.title}</SectionHeading>

      <ul className="mt-10 grid max-w-4xl gap-4">
        {posts.map((post) => (
          <li key={post.slug}>
            <Link
              href={href(locale, "vesti", post.slug)}
              className="card card-hover group block p-7"
            >
              <p className="type-label text-concrete">{formatDate(post.publishedAt, locale)}</p>
              <h2 className="mt-3 text-xl font-bold leading-snug text-paper transition-colors group-hover:text-exposure-bright">
                {post.title[locale]}
              </h2>
              <p className="mt-2 text-sm text-concrete">{post.excerpt[locale]}</p>
              <p className="type-label mt-4 text-exposure">{t.news.readMore} →</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
