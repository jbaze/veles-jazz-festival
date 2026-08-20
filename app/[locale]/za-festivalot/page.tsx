import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Kicker, PendingNote, SectionHeading } from "@/components/ui";
import { getPastEditions } from "@/lib/content";
import { href, type Locale } from "@/lib/i18n/config";
import { getDict } from "@/lib/i18n/dictionaries";
import { formatDateRange } from "@/lib/format";
import { pageMeta } from "@/lib/seo/meta";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = getDict(locale);
  return pageMeta(locale, {
    title: t.about.title,
    description: t.about.missionBody,
    section: "za-festivalot",
  });
}

export default async function AboutPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const t = getDict(locale);
  const editions = getPastEditions().reverse();

  return (
    <>
      <div className="mx-auto max-w-[1440px] px-4 py-12 sm:px-6 md:py-16">
        <Kicker>{t.siteNameFull}</Kicker>
        <SectionHeading as="h1">{t.about.title}</SectionHeading>

        <section className="mt-12 max-w-3xl">
          <h2 className="type-label mb-4 text-concrete">{t.about.missionTitle}</h2>
          <p className="text-paper/90">{t.about.missionBody}</p>
          <blockquote className="type-display type-display-2 mt-8 text-paper">
            {locale === "mk" ? `„${t.about.missionQuote}“` : `“${t.about.missionQuote}”`}
          </blockquote>
        </section>

        <section className="mt-14 max-w-3xl">
          <h2 className="type-label mb-4 text-concrete">{t.about.conceptTitle}</h2>
          <p className="text-paper/90">{t.about.conceptBody}</p>
        </section>
      </div>

      {/* Governance on paper — read by evaluators and sponsors: credible, not promotional (§9) */}
      <section className="section-paper">
        <div className="mx-auto max-w-[1440px] px-4 py-14 sm:px-6">
          <h2 className="type-label mb-6 text-prussian">{t.about.governanceTitle}</h2>
          <div className="grid gap-10 md:grid-cols-[minmax(0,3fr)_minmax(0,1fr)] md:items-start">
            <ul className="max-w-3xl space-y-4">
              {t.about.governanceItems.map((item, i) => (
                <li key={i} className="border-l-2 border-prussian pl-4 text-ink/90">
                  {item}
                </li>
              ))}
            </ul>
            {/* The organiser's own mark, printed onto the paper ground
                (multiply drops the JPEG's white background) */}
            <Image
              src="/images/brand/art-generator.jpg"
              alt={t.media.orgLogoAlt}
              width={531}
              height={376}
              sizes="(min-width: 768px) 280px, 60vw"
              className="w-56 max-w-full justify-self-center mix-blend-multiply md:w-full md:max-w-[280px] md:justify-self-end"
            />
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-[1440px] px-4 py-14 sm:px-6">
        <section className="max-w-3xl">
          <h2 className="type-label mb-6 text-concrete">{t.about.historyTitle}</h2>
          <ol className="space-y-4">
            {editions.map((e) => (
              <li key={e.year} className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                <Link
                  href={href(locale, "arhiva", e.slug)}
                  className="type-display text-2xl text-exposure hover:text-paper"
                >
                  {e.year}
                </Link>
                <span className="text-paper">{e.title[locale]}</span>
                {e.dates && (
                  <span className="type-label text-concrete">
                    {e.dates.approximate && "≈ "}
                    {formatDateRange(e.dates.start, e.dates.end, locale)}
                  </span>
                )}
              </li>
            ))}
          </ol>
        </section>

        <section className="mt-14">
          <h2 className="type-label mb-6 text-concrete">{t.about.teamTitle}</h2>
          <ul className="grid max-w-3xl gap-3 sm:grid-cols-2">
            {t.about.team.map((member) => (
              <li key={member.name} className="card p-4">
                <p className="font-bold text-paper">{member.name}</p>
                <p className="mt-1 text-sm text-concrete">{member.role}</p>
              </li>
            ))}
          </ul>
          <div className="mt-6 max-w-3xl">
            <PendingNote>{t.about.teamVerifyNote}</PendingNote>
          </div>
        </section>
      </div>
    </>
  );
}
