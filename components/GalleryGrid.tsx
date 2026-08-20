"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { CYANOTYPE_BLUR } from "@/components/Photo";
import type { ImageRef } from "@/lib/content";
import type { Locale } from "@/lib/i18n/config";
import { getDict } from "@/lib/i18n/dictionaries";

/**
 * Photo grid with a lightbox on the native <dialog> element (focus trap,
 * Esc and backdrop close for free). Progressive enhancement: every
 * thumbnail is a plain link to the image file, so without JavaScript the
 * photo simply opens. Arrow keys navigate inside the lightbox.
 */
export default function GalleryGrid({ photos, locale }: { photos: ImageRef[]; locale: Locale }) {
  const t = getDict(locale);
  const [index, setIndex] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (index !== null && !dialog.open) dialog.showModal();
    if (index === null && dialog.open) dialog.close();
  }, [index]);

  // Esc closes the modal natively; cancel/close sync the state back.
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const onClose = () => setIndex(null);
    dialog.addEventListener("close", onClose);
    dialog.addEventListener("cancel", onClose);
    return () => {
      dialog.removeEventListener("close", onClose);
      dialog.removeEventListener("cancel", onClose);
    };
  }, []);

  // Belt and braces: if a native close ever failed to sync state (index
  // still set, dialog closed), reopening the same photo would be a state
  // no-op — so the click handler opens the dialog imperatively too.
  const openAt = (i: number) => {
    setIndex(i);
    const dialog = dialogRef.current;
    if (dialog && !dialog.open) dialog.showModal();
  };

  const step = useCallback(
    (delta: number) => {
      setIndex((i) => (i === null ? i : (i + delta + photos.length) % photos.length));
    },
    [photos.length],
  );

  const current = index === null ? null : photos[index];

  return (
    <>
      <ul className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {photos.map((photo, i) => (
          <li key={photo.src}>
            <a
              href={photo.src}
              onClick={(e) => {
                e.preventDefault();
                openAt(i);
              }}
              className="group relative block aspect-[4/3] overflow-hidden border-2 border-prussian bg-ink transition-colors hover:border-exposure"
            >
              <Image
                src={photo.src}
                alt={photo.alt[locale]}
                fill
                sizes="(min-width: 768px) 25vw, 50vw"
                placeholder="blur"
                blurDataURL={CYANOTYPE_BLUR}
                className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              />
            </a>
          </li>
        ))}
      </ul>

      <dialog
        ref={dialogRef}
        onClick={(e) => {
          // Clicks on the backdrop land on the dialog element itself
          if (e.target === e.currentTarget) setIndex(null);
        }}
        onKeyDown={(e) => {
          if (e.key === "ArrowLeft") step(-1);
          if (e.key === "ArrowRight") step(1);
        }}
        aria-label={current?.alt[locale]}
        className="m-auto w-[min(96vw,80rem)] border-2 border-prussian bg-ink p-0 text-paper backdrop:bg-ink/95"
      >
        {current && (
          <div className="flex flex-col">
            <div className="relative h-[72vh] w-full bg-ink">
              <Image
                key={current.src}
                src={current.src}
                alt={current.alt[locale]}
                fill
                sizes="96vw"
                placeholder="blur"
                blurDataURL={CYANOTYPE_BLUR}
                className="object-contain"
              />
              {photos.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={() => step(-1)}
                    aria-label={t.media.lightboxPrev}
                    className="absolute left-3 top-1/2 -translate-y-1/2 rounded-[2px] border-2 border-prussian bg-ink/80 px-3 py-2 text-paper transition-colors hover:border-exposure"
                  >
                    ←
                  </button>
                  <button
                    type="button"
                    onClick={() => step(1)}
                    aria-label={t.media.lightboxNext}
                    className="absolute right-3 top-1/2 -translate-y-1/2 rounded-[2px] border-2 border-prussian bg-ink/80 px-3 py-2 text-paper transition-colors hover:border-exposure"
                  >
                    →
                  </button>
                </>
              )}
            </div>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 border-t-2 border-prussian px-4 py-3">
              {photos.length > 1 && (
                <span className="type-label text-exposure-bright">
                  {(index ?? 0) + 1} / {photos.length}
                </span>
              )}
              <span className="type-label-sm min-w-0 flex-1 text-concrete">
                {current.alt[locale]}
                {current.credit && (
                  <span className="text-concrete/70">
                    {" "}
                    · {t.media.photoCredit}: {current.credit}
                  </span>
                )}
              </span>
              <button
                type="button"
                onClick={() => setIndex(null)}
                className="type-label rounded-[2px] border-2 border-prussian px-3 py-1.5 text-concrete transition-colors hover:border-exposure hover:text-paper"
              >
                {t.media.lightboxClose} ✕
              </button>
            </div>
          </div>
        )}
      </dialog>
    </>
  );
}
