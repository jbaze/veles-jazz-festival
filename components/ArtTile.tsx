/**
 * Generative cyanotype tile — a deterministic photogram-like composition
 * (arcs, wave lines, floating discs) seeded by the entity's slug, in place
 * of photography that is pending rights clearance. Honest by design: it is
 * unmistakably artwork, not a fake photo, and every entity gets its own
 * stable, recognisable print. Rendered server-side, zero client JS.
 */

function hash(seed: string): number {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i++) {
    h ^= seed.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function mulberry32(a: number) {
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export default function ArtTile({
  seed,
  label,
  className,
}: {
  seed: string;
  /** Optional single glyph overlaid on the print (e.g. an initial). */
  label?: string;
  className?: string;
}) {
  const rnd = mulberry32(hash(seed));
  const uid = `at-${hash(seed).toString(36)}`;

  // Wave lines — liquid-light projections
  const waves = Array.from({ length: 3 }, (_, i) => {
    const y = 30 + rnd() * 50 + i * 8;
    const amp = 4 + rnd() * 10;
    const phase = rnd() * 40;
    return `M -10 ${y} C ${15 + phase} ${y - amp}, ${35 + phase} ${y + amp}, ${60} ${y} S ${100} ${y - amp}, 130 ${y + amp / 2}`;
  });

  // Floating discs — photogram objects laid on the paper
  const discs = Array.from({ length: 4 + Math.floor(rnd() * 3) }, () => ({
    cx: 8 + rnd() * 84,
    cy: 8 + rnd() * 84,
    r: 3 + rnd() * 14,
    o: 0.25 + rnd() * 0.5,
    bright: rnd() > 0.6,
  }));

  const arcR = 30 + rnd() * 35;
  const arcX = 20 + rnd() * 60;
  const rotate = Math.floor(rnd() * 360);

  return (
    <div className={`relative overflow-hidden border-2 border-prussian bg-ink ${className ?? ""}`}>
      <svg
        viewBox="0 0 100 100"
        aria-hidden="true"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 h-full w-full"
      >
        <defs>
          <radialGradient id={`${uid}-g`} cx="50%" cy="35%" r="80%">
            <stop offset="0%" stopColor="#16396B" />
            <stop offset="100%" stopColor="#0A1628" />
          </radialGradient>
          <linearGradient id={`${uid}-l`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#7FA6D6" />
            <stop offset="100%" stopColor="#4A7FC1" />
          </linearGradient>
        </defs>
        <rect width="100" height="100" fill={`url(#${uid}-g)`} />
        <g transform={`rotate(${rotate} 50 50)`}>
          <circle
            cx={arcX}
            cy="50"
            r={arcR}
            fill="none"
            stroke={`url(#${uid}-l)`}
            strokeWidth="0.8"
            opacity="0.55"
          />
          <circle cx={arcX} cy="50" r={arcR * 0.62} fill="none" stroke="#4A7FC1" strokeWidth="0.5" opacity="0.35" />
        </g>
        {waves.map((d, i) => (
          <path key={i} d={d} fill="none" stroke="#4A7FC1" strokeWidth={0.7 - i * 0.15} opacity={0.5 - i * 0.1} />
        ))}
        {discs.map((c, i) => (
          <circle
            key={i}
            cx={c.cx}
            cy={c.cy}
            r={c.r}
            fill={c.bright ? `url(#${uid}-l)` : "#16396B"}
            opacity={c.o}
          />
        ))}
      </svg>
      {label && (
        <span
          aria-hidden="true"
          className="type-display absolute inset-0 flex items-center justify-center text-5xl text-paper/25 md:text-6xl"
        >
          {label}
        </span>
      )}
    </div>
  );
}
