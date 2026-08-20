import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { JsonLd, Kicker, PendingNote, SectionHeading } from "@/components/ui";
import {
  getCurrentEdition,
  getEvents,
  getEventsByEdition,
  getPastEditions,
  getVenues,
} from "@/lib/content";
import { href, type Locale } from "@/lib/i18n/config";
import { getDict } from "@/lib/i18n/dictionaries";
import { countryName, formatDateRange } from "@/lib/format";
import { organizationJsonLd } from "@/lib/seo/jsonld";
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

  // The record in numbers — computed from content, same as home and press.
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
      <JsonLd data={organizationJsonLd(locale)} />

      {/* The mission as the opening statement */}
      <div className="grain mx-auto max-w-[1440px] px-4 pb-16 pt-12 sm:px-6 md:pb-20 md:pt-16">
        <Kicker>{t.siteNameFull}</Kicker>
        <SectionHeading as="h1">{t.about.title}</SectionHeading>
        {/* Custom clamp: „деметрополизација“ (17 chars) must fit every
            viewport — display-1 would overflow in Macedonian */}
        <blockquote className="type-display mt-10 max-w-5xl text-[clamp(1.375rem,6vw,4.75rem)] leading-[0.95] text-paper">
          {locale === "mk" ? `„${t.about.missionQuote}“` : `“${t.about.missionQuote}”`}
        </blockquote>
        <p className="mt-8 max-w-2xl text-concrete">{t.about.missionBody}</p>
      </div>

      {/* The record in numbers */}
      <section className="border-y border-prussian/60 bg-ink-deep/50">
        <dl className="mx-auto grid max-w-[1440px] grid-cols-2 gap-y-4 px-4 py-6 sm:px-6 md:grid-cols-4">
          {stats.map(([value, label]) => (
            <div key={label}>
              <dt className="type-label-sm text-concrete">{label}</dt>
              <dd className="type-display mt-1 text-2xl text-exposure-bright">{value}</dd>
            </div>
          ))}
        </dl>
      </section>

      <div className="mx-auto max-w-[1440px] px-4 py-14 sm:px-6">
        <section className="max-w-3xl">
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
        {/* History as editorial rows — every claim derived from the archive */}
        <section>
          <h2 className="type-label mb-2 text-concrete">{t.about.historyTitle}</h2>
          <ol className="border-t-2 border-prussian">
            {editions.map((e) => {
              const eventCount = getEventsByEdition(e.year).length;
              return (
                <li key={e.year} className="border-b-2 border-prussian">
                  <Link
                    href={href(locale, "arhiva", e.slug)}
                    className="group grid gap-x-12 gap-y-4 py-10 md:grid-cols-[14rem_1fr] md:items-start"
                  >
                    <p
                      aria-hidden="true"
                      className="type-display type-outline text-6xl leading-none transition-colors group-hover:text-exposure-bright group-hover:[-webkit-text-stroke-width:0] md:text-7xl"
                    >
                      {e.year}
                    </p>
                    <div className="min-w-0">
                      <h3 className="type-display text-2xl text-paper transition-colors group-hover:text-exposure-bright">
                        {e.title[locale]}
                      </h3>
                      {e.dates && (
                        <p className="type-label mt-3 text-exposure">
                          {e.dates.approximate && "≈ "}
                          {formatDateRange(e.dates.start, e.dates.end, locale)}
                        </p>
                      )}
                      <p className="mt-4 max-w-2xl text-sm text-concrete">
                        {e.description[locale]}
                      </p>
                      <p className="type-label mt-5 flex flex-wrap gap-x-6 gap-y-2 text-concrete">
                        {eventCount > 0 && (
                          <span>
                            <span className="text-exposure-bright">{eventCount}</span>{" "}
                            {locale === "mk" ? "настани" : "events"}
                          </span>
                        )}
                        {e.countries.length > 0 && (
                          <span>
                            {e.countries.map((c) => countryName(c, locale)).join(" · ")}
                          </span>
                        )}
                        {e.programmeIncomplete && (
                          <span className="text-concrete/70">
                            {locale === "mk" ? "архивата се дополнува" : "archive being completed"}
                          </span>
                        )}
                      </p>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ol>
        </section>

        <section className="mt-16">
          <h2 className="type-label mb-6 text-concrete">{t.about.teamTitle}</h2>
          <ul className="grid max-w-3xl gap-3 sm:grid-cols-2">
            {t.about.team.map((member) => (
              <li key={member.name} className="card p-4">
                <p className="font-bold text-paper">{member.name}</p>
                <p className="type-label-sm mt-1.5 text-concrete">{member.role}</p>
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
