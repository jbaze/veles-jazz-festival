import type { Metadata } from "next";
import PartnerWall from "@/components/PartnerWall";
import { Kicker, SectionHeading } from "@/components/ui";
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
    title: t.partners.title,
    description:
      locale === "mk"
        ? "Основач, институционална поддршка, партнери и спонзори на фестивалот."
        : "Founder, institutional support, partners and sponsors of the festival.",
    section: "partneri",
  });
}

export default async function PartnersPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const t = getDict(locale);

  return (
    <div className="mx-auto max-w-[1440px] px-4 py-12 sm:px-6 md:py-16">
      <Kicker>{t.siteName}</Kicker>
      <SectionHeading as="h1">{t.partners.title}</SectionHeading>
      <p className="mt-4 max-w-2xl text-concrete">{t.partners.intro}</p>
      <div className="mt-10">
        <PartnerWall locale={locale} showYears />
      </div>
    </div>
  );
}
