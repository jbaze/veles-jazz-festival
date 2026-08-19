import type { Metadata } from "next";
import Link from "next/link";
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
    title: t.press.title,
    description: t.press.intro,
    section: "za-mediumi",
  });
}

export default async function PressPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const t = getDict(locale);

  return (
    <div className="mx-auto max-w-[1440px] px-4 py-12 sm:px-6 md:py-16">
      <Kicker>{t.siteName}</Kicker>
      <SectionHeading as="h1">{t.press.title}</SectionHeading>
      <p className="mt-4 max-w-2xl text-concrete">{t.press.intro}</p>

      {/* Fact sheet — usable by a journalist on deadline (§9) */}
      <section className="mt-12 max-w-3xl">
        <h2 className="type-label mb-4 text-concrete">{t.press.factSheet}</h2>
        <div className="card overflow-x-auto">
          <table className="w-full text-sm">
            <tbody>
              {t.press.facts.map(([label, value]) => (
                <tr key={label} className="border-b border-prussian last:border-b-0">
                  <th scope="row" className="type-label w-1/3 min-w-40 px-4 py-3 text-left align-top text-concrete">
                    {label}
                  </th>
                  <td className="px-4 py-3 text-paper">{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mt-12 max-w-3xl">
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

      <section className="mt-12 max-w-3xl">
        <h2 className="type-label mb-4 text-concrete">{t.press.downloadsTitle}</h2>
        <PendingNote>{t.press.downloadsPending}</PendingNote>
      </section>

      <section className="mt-12 max-w-3xl">
        <h2 className="type-label mb-4 text-concrete">{t.press.contactTitle}</h2>
        <PendingNote>
          {t.press.contactPending}{" "}
          <Link href={href(locale, "kontakt")} className="text-exposure underline underline-offset-4">
            {t.nav.kontakt}
          </Link>
        </PendingNote>
      </section>
    </div>
  );
}
