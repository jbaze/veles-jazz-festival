"use client";

import { useState } from "react";

/**
 * Lite video embed: renders a cyanotype-toned facade (thumbnail + play
 * control) and only mounts the YouTube iframe after a click, via the
 * privacy-enhanced youtube-nocookie.com host. Progressive enhancement:
 * the facade is a plain link to the video, so without JavaScript it
 * simply opens YouTube. Non-YouTube URLs render as an external link.
 */

export function youTubeId(url: string): string | null {
  const m = url.match(
    /(?:youtube(?:-nocookie)?\.com\/(?:watch\?(?:.*&)?v=|embed\/|shorts\/|live\/)|youtu\.be\/)([\w-]{11})/,
  );
  return m ? m[1] : null;
}

export default function VideoEmbed({
  url,
  title,
  playLabel,
  watchLabel,
}: {
  url: string;
  title: string;
  playLabel: string;
  watchLabel: string;
}) {
  const [playing, setPlaying] = useState(false);
  const id = youTubeId(url);

  if (!id) {
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="card card-hover flex items-center justify-between gap-4 p-5"
      >
        <span className="font-semibold text-paper">{title}</span>
        <span className="type-label text-exposure">{watchLabel} ↗</span>
      </a>
    );
  }

  if (playing) {
    return (
      <div className="relative aspect-video w-full overflow-hidden border-2 border-prussian bg-ink">
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 h-full w-full border-0"
        />
      </div>
    );
  }

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={(e) => {
        e.preventDefault();
        setPlaying(true);
      }}
      className="group relative block aspect-video w-full overflow-hidden border-2 border-prussian bg-ink"
    >
      {/* YouTube's own thumbnail, exposed in the cyanotype tone */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`}
        alt=""
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover opacity-70 grayscale"
      />
      <span aria-hidden="true" className="absolute inset-0 bg-prussian/50 mix-blend-multiply" />
      <span className="absolute inset-0 flex items-center justify-center">
        <span
          aria-hidden="true"
          className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-exposure-bright bg-ink/60 transition-all group-hover:border-paper group-hover:bg-ink/80"
        >
          <svg viewBox="0 0 24 24" className="ml-1 h-6 w-6 fill-paper">
            <path d="M8 5v14l11-7z" />
          </svg>
        </span>
      </span>
      <span className="absolute inset-x-0 bottom-0 flex flex-wrap items-baseline gap-x-3 gap-y-1 bg-gradient-to-t from-ink via-ink/70 to-transparent p-4 pt-10">
        <span className="font-semibold text-paper">{title}</span>
        <span className="type-label-sm text-exposure-bright">{playLabel}</span>
      </span>
    </a>
  );
}
