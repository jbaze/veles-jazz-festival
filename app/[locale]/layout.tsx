import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";

// Self-hosted fonts with confirmed Macedonian Cyrillic coverage (§8.3);
// localised glyph forms activated via font-feature-settings in globals.css.
import "@fontsource/unbounded/cyrillic-700.css";
import "@fontsource/unbounded/cyrillic-800.css";
import "@fontsource/unbounded/latin-700.css";
import "@fontsource/unbounded/latin-800.css";
import "@fontsource/manrope/cyrillic-400.css";
import "@fontsource/manrope/cyrillic-500.css";
import "@fontsource/manrope/cyrillic-700.css";
import "@fontsource/manrope/latin-400.css";
import "@fontsource/manrope/latin-500.css";
import "@fontsource/manrope/latin-700.css";
import "@fontsource/jetbrains-mono/cyrillic-400.css";
import "@fontsource/jetbrains-mono/cyrillic-500.css";
import "@fontsource/jetbrains-mono/latin-400.css";
import "@fontsource/jetbrains-mono/latin-500.css";
import "@/app/globals.css";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SignupForm from "@/components/SignupForm";
import { isLocale, locales, siteUrl, type Locale } from "@/lib/i18n/config";
import { getDict } from "@/lib/i18n/dictionaries";

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : "mk";
  const t = getDict(locale);
  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: `${t.siteName} — ${t.siteNameFull}`,
      template: `%s — ${t.siteName}`,
    },
    description: t.tagline,
    robots: { index: true, follow: true },
  };
}

export const viewport: Viewport = {
  themeColor: "#0A1628",
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale: Locale = raw;

  return (
    <html lang={locale}>
      <body className="flex min-h-screen flex-col">
        <Header locale={locale} />
        <main id="main" className="flex-1">
          {children}
        </main>
        {/* Site-wide newsletter band (Toronto pattern) — the band owns the
            top gap, so the footer's own margin moves here. */}
        <SignupForm locale={locale} variant="band" />
        <Footer locale={locale} />
      </body>
    </html>
  );
}
