import type { NextConfig } from "next";

/**
 * Internal route segments are the Macedonian slugs (app/[locale]/<mk-slug>).
 * The English tree is served under pretty English slugs via rewrites, and the
 * internal Macedonian slugs under /en/ redirect to the pretty ones, so each
 * page has exactly one canonical URL per locale.
 */
const EN_SLUGS: Record<string, string> = {
  programa: "programme",
  izveduvaci: "artists",
  lokacii: "venues",
  arhiva: "archive",
  "za-festivalot": "about",
  galerija: "gallery",
  vesti: "news",
  "za-mediumi": "press",
  partneri: "partners",
  kontakt: "contact",
};

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async redirects() {
    return [
      { source: "/", destination: "/mk", permanent: false },
      ...Object.entries(EN_SLUGS).map(([mk, en]) => ({
        source: `/en/${mk}/:path*`,
        destination: `/en/${en}/:path*`,
        permanent: true,
      })),
    ];
  },
  async rewrites() {
    return Object.entries(EN_SLUGS).map(([mk, en]) => ({
      source: `/en/${en}/:path*`,
      destination: `/en/${mk}/:path*`,
    }));
  },
};

export default nextConfig;
