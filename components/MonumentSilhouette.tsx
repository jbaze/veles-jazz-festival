/**
 * Stylised geometric interpretation of the Спомен-костурница — the
 * modernist memorial above Veles: a cluster of curved concrete shells
 * on a hill, rendered as a cyanotype print. Deliberately abstract; to be
 * replaced/refined against real photography once rights are cleared.
 * Pure SVG, well under the 20KB budget (§8.4).
 */
export default function MonumentSilhouette({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 960 520"
      role="img"
      aria-hidden="true"
      className={className}
      preserveAspectRatio="xMidYMax meet"
    >
      <defs>
        <linearGradient id="ms-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#16396B" stopOpacity="0.0" />
          <stop offset="1" stopColor="#16396B" stopOpacity="0.35" />
        </linearGradient>
        <linearGradient id="ms-shell" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#4A7FC1" />
          <stop offset="0.55" stopColor="#16396B" />
          <stop offset="1" stopColor="#0A1628" />
        </linearGradient>
        <linearGradient id="ms-shell-lit" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#7FA6D6" />
          <stop offset="0.5" stopColor="#4A7FC1" />
          <stop offset="1" stopColor="#16396B" />
        </linearGradient>
      </defs>

      <rect width="960" height="520" fill="url(#ms-sky)" />

      {/* projection beams hitting the monument */}
      <g opacity="0.25">
        <polygon points="120,520 300,120 340,120" fill="#4A7FC1" opacity="0.5" />
        <polygon points="860,520 640,140 600,140" fill="#4A7FC1" opacity="0.4" />
      </g>

      {/* hill */}
      <path
        d="M0 520 L0 470 Q 240 420 480 430 Q 720 440 960 400 L960 520 Z"
        fill="#0A1628"
      />
      <path
        d="M0 478 Q 240 428 480 438 Q 720 448 960 408 L960 424 Q 720 462 480 452 Q 240 442 0 492 Z"
        fill="#16396B"
        opacity="0.6"
      />

      {/* concrete shells — tallest centre, leaning outward */}
      <g>
        <path
          d="M330 452 C 322 330 330 240 362 180 C 380 148 400 138 408 150 C 416 164 404 210 398 268 C 392 330 390 400 392 452 Z"
          fill="url(#ms-shell)"
        />
        <path
          d="M418 452 C 414 300 424 190 458 108 C 476 66 502 52 510 68 C 518 86 500 150 492 224 C 484 300 482 392 484 452 Z"
          fill="url(#ms-shell-lit)"
        />
        <path
          d="M508 452 C 510 320 522 216 552 148 C 568 112 590 102 596 116 C 602 132 586 186 578 250 C 570 318 566 396 566 452 Z"
          fill="url(#ms-shell)"
        />
        <path
          d="M590 452 C 594 350 606 280 628 234 C 640 210 656 204 660 216 C 664 228 652 268 646 316 C 640 366 636 416 636 452 Z"
          fill="url(#ms-shell)"
          opacity="0.85"
        />
        <path
          d="M262 452 C 260 366 268 300 288 258 C 299 235 313 229 317 240 C 321 251 311 288 306 330 C 300 376 298 420 298 452 Z"
          fill="url(#ms-shell)"
          opacity="0.85"
        />
      </g>

      {/* seams between shells */}
      <g stroke="#0A1628" strokeWidth="3" fill="none" opacity="0.8">
        <path d="M392 452 C 390 400 392 330 398 268" />
        <path d="M484 452 C 482 392 484 300 492 224" />
        <path d="M566 452 C 566 396 570 318 578 250" />
      </g>
    </svg>
  );
}
