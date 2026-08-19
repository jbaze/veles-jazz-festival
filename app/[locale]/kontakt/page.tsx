import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import { Kicker, PendingNote, SectionHeading } from "@/components/ui";
import type { Locale } from "@/lib/i18n/config";
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
    title: t.contact.title,
    description: t.contact.intro,
    section: "kontakt",
  });
}

export default async function ContactPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const t = getDict(locale);

  return (
    <div className="mx-auto max-w-[1440px] px-4 py-12 sm:px-6 md:py-16">
      <Kicker>{t.siteName}</Kicker>
      <SectionHeading as="h1">{t.contact.title}</SectionHeading>
      <p className="mt-4 max-w-2xl text-concrete">{t.contact.intro}</p>

      <div className="mt-10 grid gap-12 lg:grid-cols-[3fr_2fr]">
        <div>
          <ContactForm locale={locale} />
        </div>

        <aside className="flex flex-col gap-8">
          <div className="card p-6">
            <h2 className="type-label text-concrete">{t.contact.title}</h2>
            <div className="mt-3">
              <PendingNote>{t.contact.detailsPending}</PendingNote>
            </div>
          </div>

          {/* Artist submissions — a clearly separated route (§9) */}
          <div className="card border-exposure p-6">
            <h2 className="type-display text-lg text-paper">{t.contact.artistTitle}</h2>
            <p className="mt-3 text-sm text-concrete">{t.contact.artistBody}</p>
            <p className="type-label mt-4 text-exposure">
              → {t.contact.formSubject}:{" "}
              {locale === "mk" ? `„${t.contact.artistSubject}“` : `“${t.contact.artistSubject}”`}
            </p>
          </div>

          <div className="card p-6">
            <h2 className="type-label text-concrete">{t.contact.socialTitle}</h2>
            <div className="mt-3">
              <PendingNote>{t.contact.socialPending}</PendingNote>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
