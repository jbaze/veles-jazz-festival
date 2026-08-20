import Image from "next/image";
import type { ImageRef } from "@/lib/content";
import type { Locale } from "@/lib/i18n/config";
import { getDict } from "@/lib/i18n/dictionaries";

/**
 * A cleared photograph, rendered through next/image (AVIF/WebP on Vercel)
 * inside the same bordered frame ArtTile uses, so the two are drop-in
 * interchangeable at every render site. Loads over a cyanotype-toned blur
 * so the exposure aesthetic holds while pixels stream in.
 */

/** Tiny ink→prussian radial gradient, mirroring the ArtTile ground. */
export const CYANOTYPE_BLUR =
  "data:image/svg+xml;charset=utf-8," +
  encodeURIComponent(
    "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 5'><defs><radialGradient id='g' cx='50%' cy='35%' r='80%'><stop offset='0%' stop-color='#16396B'/><stop offset='100%' stop-color='#0A1628'/></radialGradient></defs><rect width='8' height='5' fill='url(#g)'/></svg>",
  );

export default function Photo({
  image,
  locale,
  className,
  sizes,
  priority,
}: {
  image: ImageRef;
  locale: Locale;
  /** Same class contract as ArtTile: aspect ratio + border overrides. */
  className?: string;
  /** Responsive sizes hint for next/image; match the rendered column width. */
  sizes?: string;
  /** Set on above-the-fold heroes only. */
  priority?: boolean;
}) {
  const t = getDict(locale);
  return (
    <div className={`relative overflow-hidden border-2 border-prussian bg-ink ${className ?? ""}`}>
      <Image
        src={image.src}
        alt={image.alt[locale]}
        fill
        sizes={sizes}
        priority={priority}
        placeholder="blur"
        blurDataURL={CYANOTYPE_BLUR}
        className="object-cover"
      />
      {image.credit && (
        <span className="type-label-sm absolute bottom-2 right-2 border border-prussian/60 bg-ink/70 px-2 py-1 text-concrete backdrop-blur-sm">
          {t.media.photoCredit}: {image.credit}
        </span>
      )}
    </div>
  );
}
