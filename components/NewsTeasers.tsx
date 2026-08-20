import Link from "next/link";
import type { NewsPost } from "@/lib/content";
import { href, type Locale } from "@/lib/i18n/config";
import { formatDate } from "@/lib/format";

/** Compact news cards — the home-page idiom, reused wherever news is teased. */
export default function NewsTeasers({ posts, locale }: { posts: NewsPost[]; locale: Locale }) {
  if (posts.length === 0) return null;
  return (
    <div className="grid gap-5 md:grid-cols-3">
      {posts.map((post) => (
        <Link
          key={post.slug}
          href={href(locale, "vesti", post.slug)}
          className="card card-hover group flex flex-col p-6"
        >
          <p className="type-label text-concrete">
            <time dateTime={post.publishedAt}>{formatDate(post.publishedAt, locale)}</time>
          </p>
          <h3 className="mt-3 text-lg font-bold leading-snug text-paper transition-colors group-hover:text-exposure-bright">
            {post.title[locale]}
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-concrete">{post.excerpt[locale]}</p>
          <p className="type-label mt-auto pt-5 text-exposure" aria-hidden="true">
            →
          </p>
        </Link>
      ))}
    </div>
  );
}
