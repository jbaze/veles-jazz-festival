import type { Metadata } from "next";
import Link from "next/link";
import NewsTeasers from "@/components/NewsTeasers";
import { AllLink, Kicker, PendingNote, SectionHeading } from "@/components/ui";
import { getCurrentEdition, getEvents, getNews, getPastEditions, getVenues } from "@/lib/content";
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
    title: t.press.title,
    description: t.press.intro,
    section: "za-mediumi",
  });
}

export default async function PressPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const t = getDict(locale);
  const latestNews = getNews().slice(0, 3);

  // The record in numbers — computed from content, same as the home page.
  const pastEditions = getPastEditions();
  const currentYear = getCurrentEdition().year;
  const pastEventCount = getEvents().filter((e) => e.editionYear !== currentYear).length;
  const countryCount = new Set(pastEditions.flatMap((e) => e.countries)).size;
  const stats: [string, string][] = [
    [String(pastEditions.length), locale === "mk" ? "изданија" : "editions"],
    [String(countryCount), locale === "mk" ? "земји" : "countries"],
    [String(getVenues().length), locale === "mk" ? "локации" : "venues"],
    [`${pastEventCount}+`, locale === "mk" ? "настани" : "events"],
  ];

  return (
    <>
      <div className="mx-auto max-w-[1440px] px-4 pt-12 sm:px-6 md:pt-16">
        <Kicker>{t.siteName}</Kicker>
        <SectionHeading as="h1">{t.press.title}</SectionHeading>
        <p className="mt-4 max-w-2xl text-concrete">{t.press.intro}</p>
      </div>

      {/* Facts bar — the venue/artist-page idiom, derived from content */}
      <section className="mt-12 border-y border-prussian/60 bg-ink-deep/50">
        <dl className="mx-auto grid max-w-[1440px] grid-cols-2 gap-y-4 px-4 py-6 sm:px-6 md:grid-cols-4">
          {stats.map(([value, label]) => (
            <div key={label}>
              <dt className="type-label-sm text-concrete">{label}</dt>
              <dd className="type-display mt-1 text-2xl text-exposure-bright">{value}</dd>
            </div>
          ))}
        </dl>
      </section>

      <div className="mx-auto max-w-[1440px] px-4 pb-14 sm:px-6 md:pb-20">
        <div className="mt-12 grid gap-x-14 gap-y-12 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
          <div>
            {/* Fact sheet — usable by a journalist on deadline (§9) */}
            <section>
              <h2 className="type-label mb-4 text-concrete">{t.press.factSheet}</h2>
              <div className="card overflow-x-auto">
                <table className="w-full text-sm">
                  <tbody>
                    {t.press.facts.map(([label, value]) => (
                      <tr key={label} className="border-b border-prussian last:border-b-0">
                        <th
                          scope="row"
                          className="type-label w-1/3 min-w-40 px-4 py-3 text-left align-top text-concrete"
                        >
                          {label}
                        </th>
                        <td className="px-4 py-3 text-paper">{value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            <section className="mt-12">
              <h2 className="type-label mb-4 text-concrete">{t.press.namesTitle}</h2>
              <p className="text-sm text-paper/90">{t.press.namesNote}</p>
              <ul className="mt-3 space-y-2">
                {t.press.names.map((name) => (
                  <li key={name} className="border-l-2 border-exposure pl-4 text-sm text-paper">
                    {name}
                  </li>
                ))}
              </ul>
            </section>
          </div>

          <div>
            {/* Boilerplate — one paragraph a journalist can lift verbatim */}
            <section>
              <h2 className="type-label mb-4 text-concrete">
                {t.press.boilerplateTitle}{" "}
                <span className="text-exposure">· {t.press.boilerplateNote}</span>
              </h2>
              <blockquote className="card p-6 text-sm leading-relaxed text-paper/90">
                {t.press.boilerplate}
              </blockquote>
            </section>

            <section className="mt-12">
              <h2 className="type-label mb-4 text-concrete">{t.press.downloadsTitle}</h2>
              <PendingNote>{t.press.downloadsPending}</PendingNote>
            </section>

            <section className="mt-12">
              <h2 className="type-label mb-4 text-concrete">{t.press.contactTitle}</h2>
              <PendingNote>
                {t.press.contactPending}{" "}
                <Link
                  href={href(locale, "kontakt")}
                  className="text-exposure underline underline-offset-4"
                >
                  {t.nav.kontakt}
                </Link>
              </PendingNote>
            </section>
          </div>
        </div>

        {latestNews.length > 0 && (
          <section className="mt-20 border-t-2 border-prussian pt-12">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <h2 className="type-display text-2xl text-paper">{t.press.newsTitle}</h2>
              <AllLink href={href(locale, "vesti")}>{t.news.title}</AllLink>
            </div>
            <div className="mt-8">
              <NewsTeasers posts={latestNews} locale={locale} />
            </div>
          </section>
        )}
      </div>
    </>
  );
}
