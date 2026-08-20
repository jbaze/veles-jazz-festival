import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import ContactForm from "@/components/ContactForm";
import { Kicker, PendingNote, SectionHeading } from "@/components/ui";
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
          {/* Who you are writing to — the organiser's identity while the
              official contact details are pending */}
          <div className="card p-6">
            <h2 className="type-label text-concrete">{t.contact.title}</h2>
            <p className="mt-3 text-sm font-semibold text-paper">{t.footer.org}</p>
            <p className="type-label-sm mt-2 text-exposure">{t.footer.mandate}</p>
            <div className="mt-4 w-fit border-2 border-prussian bg-paper p-2.5">
              <Image
                src="/images/brand/art-generator.jpg"
                alt={t.media.orgLogoAlt}
                width={531}
                height={376}
                sizes="96px"
                className="w-24 mix-blend-multiply"
              />
            </div>
            <div className="mt-4">
              <PendingNote>{t.contact.detailsPending}</PendingNote>
            </div>
          </div>

          {/* Artist submissions — a clearly separated route (§9); the plain
              anchor forces a full navigation so the form reads ?tema= */}
          <div className="card border-exposure p-6">
            <h2 className="type-display text-lg text-paper">{t.contact.artistTitle}</h2>
            <p className="mt-3 text-sm text-concrete">{t.contact.artistBody}</p>
            <p className="mt-4">
              <a
                href="?tema=nastap#kontakt-forma"
                className="type-label link-sweep text-exposure"
              >
                {t.contact.artistCta} →
              </a>
            </p>
          </div>

          {/* Journalists get routed to the press page */}
          <div className="card p-6">
            <h2 className="type-label text-concrete">{t.nav["za-mediumi"]}</h2>
            <p className="mt-3 text-sm text-concrete">{t.contact.pressBody}</p>
            <p className="mt-4">
              <Link
                href={href(locale, "za-mediumi")}
                className="type-label link-sweep text-exposure"
              >
                {t.nav["za-mediumi"]} →
              </Link>
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
