import type { Metadata } from "next";
import ProgrammeStrands from "@/components/ProgrammeStrands";
import ScheduleMatrix from "@/components/ScheduleMatrix";
import SignupForm from "@/components/SignupForm";
import { JsonLd, Kicker, SectionHeading } from "@/components/ui";
import { getCurrentEdition, getEventsByEdition } from "@/lib/content";
import { buildMatrix } from "@/lib/schedule";
import type { Locale } from "@/lib/i18n/config";
import { getDict } from "@/lib/i18n/dictionaries";
import { formatDateRange } from "@/lib/format";
import { eventJsonLd } from "@/lib/seo/jsonld";
import { pageMeta } from "@/lib/seo/meta";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = getDict(locale);
  return pageMeta(locale, {
    title: t.schedule.title,
    description:
      locale === "mk"
        ? "Програма на Фестивалот на џез, ворлд и современа музика — Велес: концерти, изложби, работилници и перформанси по денови и локации."
        : "Programme of the Festival of Jazz, World and Contemporary Music — Veles: concerts, exhibitions, workshops and performances by day and venue.",
    section: "programa",
  });
}

export default async function ProgrammePage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const t = getDict(locale);
  const edition = getCurrentEdition();
  const events = getEventsByEdition(edition.year);
  const matrix = buildMatrix(events, locale);

  return (
    <div className="mx-auto max-w-[1440px] px-4 py-12 sm:px-6 md:py-16">
      <JsonLd data={events.map((e) => eventJsonLd(e, locale))} />
      <Kicker>
        {edition.title[locale]} ·{" "}
        {edition.dates
          ? formatDateRange(edition.dates.start, edition.dates.end, locale)
          : t.home.datesTba}
      </Kicker>
      <SectionHeading as="h1">{t.schedule.title}</SectionHeading>

      {events.length > 0 ? (
        <div className="mt-10">
          <ScheduleMatrix
            days={matrix.days}
            venues={matrix.venues}
            types={matrix.types}
            labels={matrix.labels}
          />
        </div>
      ) : (
        /* The honest empty state (§9): the page is not hidden. */
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <div className="card flex flex-col justify-center p-8">
            <p className="type-display text-2xl text-paper">{t.schedule.empty.title}</p>
            <p className="mt-4 text-concrete">{t.schedule.empty.body}</p>
          </div>
          <SignupForm locale={locale} />
        </div>
      )}

      {/* The named tracks the archive proves — structure while dates pend */}
      <ProgrammeStrands locale={locale} />
    </div>
  );
}
