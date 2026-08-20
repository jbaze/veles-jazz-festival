import type { ReactNode } from "react";
import ArtTile, { type ArtMotif } from "@/components/ArtTile";
import Photo from "@/components/Photo";
import type { ImageRef } from "@/lib/content";
import type { Locale } from "@/lib/i18n/config";

/**
 * The photo-or-print decision, made once: renders the entity's photograph
 * when one is set in the content data, otherwise the generative ArtTile
 * (or a custom `fallback` node, e.g. the Костурница monument silhouette).
 * Render sites pass both and the photo archive activates as data lands.
 */
export default function MediaTile({
  image,
  locale,
  seed,
  motif,
  label,
  className,
  sizes,
  priority,
  fallback,
}: {
  image?: ImageRef;
  locale: Locale;
  seed: string;
  motif?: ArtMotif;
  label?: string;
  /** Applied identically to Photo and ArtTile (aspect + border overrides). */
  className?: string;
  sizes?: string;
  priority?: boolean;
  /** Replaces the ArtTile as the no-photo state where a site has its own visual. */
  fallback?: ReactNode;
}) {
  if (image) {
    return (
      <Photo image={image} locale={locale} className={className} sizes={sizes} priority={priority} />
    );
  }
  if (fallback) return <>{fallback}</>;
  return <ArtTile seed={seed} motif={motif} label={label} className={className} />;
}
