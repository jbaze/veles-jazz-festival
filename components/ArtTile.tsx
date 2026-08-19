/**
 * Generative cyanotype tile — a deterministic photogram-like composition
 * seeded by the entity's slug, in place of photography that is pending
 * rights clearance. Honest by design: it is unmistakably artwork, not a
 * fake photo, and every entity gets its own stable, recognisable print.
 * Rendered server-side, zero client JS.
 *
 * Motifs give entity types distinct visual languages:
 * - waves  (default) — liquid-light projections; artists, editions
 * - arcs   — concentric stage/curtain arcs; the theatre
 * - beams  — projected light beams over a dot field; the parking nights
 * - frames — nested exhibition frames; gallery spaces
 */

export type ArtMotif = "waves" | "arcs" | "beams" | "frames";

/** The venues' visual languages, used wherever a venue tile renders. */
export function venueMotif(slug: string): ArtMotif {
  switch (slug) {
    case "teatar-dzinot":
      return "arcs";
    case "parking-na-teatarot":
      return "beams";
    case "europe-house":
      return "frames";
    default:
      return "waves";
  }
}

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
  motif = "waves",
  label,
  className,
}: {
  seed: string;
  motif?: ArtMotif;
  /** Optional single glyph overlaid on the print (e.g. an initial). */
  label?: string;
  className?: string;
}) {
  const rnd = mulberry32(hash(seed + motif));
  const uid = `at-${hash(seed + motif).toString(36)}`;

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
        {motif === "waves" && <Waves rnd={rnd} uid={uid} />}
        {motif === "arcs" && <Arcs rnd={rnd} uid={uid} />}
        {motif === "beams" && <Beams rnd={rnd} uid={uid} />}
        {motif === "frames" && <Frames rnd={rnd} uid={uid} />}
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

type MotifProps = { rnd: () => number; uid: string };

/** Liquid-light waves + floating photogram discs (the original motif). */
function Waves({ rnd, uid }: MotifProps) {
  const waves = Array.from({ length: 3 }, (_, i) => {
    const y = 30 + rnd() * 50 + i * 8;
    const amp = 4 + rnd() * 10;
    const phase = rnd() * 40;
    return `M -10 ${y} C ${15 + phase} ${y - amp}, ${35 + phase} ${y + amp}, ${60} ${y} S ${100} ${y - amp}, 130 ${y + amp / 2}`;
  });
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
    <>
      <g transform={`rotate(${rotate} 50 50)`}>
        <circle cx={arcX} cy="50" r={arcR} fill="none" stroke={`url(#${uid}-l)`} strokeWidth="0.8" opacity="0.55" />
        <circle cx={arcX} cy="50" r={arcR * 0.62} fill="none" stroke="#4A7FC1" strokeWidth="0.5" opacity="0.35" />
      </g>
      {waves.map((d, i) => (
        <path key={i} d={d} fill="none" stroke="#4A7FC1" strokeWidth={0.7 - i * 0.15} opacity={0.5 - i * 0.1} />
      ))}
      {discs.map((c, i) => (
        <circle key={i} cx={c.cx} cy={c.cy} r={c.r} fill={c.bright ? `url(#${uid}-l)` : "#16396B"} opacity={c.o} />
      ))}
    </>
  );
}

/** Concentric arcs rising from below — stage, curtain, auditorium. */
function Arcs({ rnd, uid }: MotifProps) {
  const cx = 40 + rnd() * 20;
  const count = 6;
  return (
    <>
      {Array.from({ length: count }, (_, i) => {
        const r = 18 + i * (11 + rnd() * 3);
        return (
          <circle
            key={i}
            cx={cx}
            cy={104}
            r={r}
            fill="none"
            stroke={i % 2 === 0 ? `url(#${uid}-l)` : "#4A7FC1"}
            strokeWidth={i === 0 ? 1.4 : 0.8 - i * 0.08}
            opacity={0.75 - i * 0.1}
          />
        );
      })}
      <circle cx={cx} cy={104} r={12 + rnd() * 4} fill={`url(#${uid}-l)`} opacity="0.5" />
      {Array.from({ length: 3 }, (_, i) => (
        <circle key={`d${i}`} cx={10 + rnd() * 80} cy={8 + rnd() * 40} r={1.5 + rnd() * 3} fill="#7FA6D6" opacity={0.4 + rnd() * 0.3} />
      ))}
    </>
  );
}

/** Crossing light beams over a scattered crowd of dots — the late nights. */
function Beams({ rnd, uid }: MotifProps) {
  const beams = Array.from({ length: 3 }, () => {
    const x = 10 + rnd() * 80;
    const spread = 14 + rnd() * 18;
    const top = -8 + rnd() * 10;
    return { x, spread, top, o: 0.18 + rnd() * 0.2 };
  });
  const dots = Array.from({ length: 26 }, () => ({
    cx: 4 + rnd() * 92,
    cy: 66 + rnd() * 30,
    r: 0.8 + rnd() * 2.2,
    o: 0.3 + rnd() * 0.5,
  }));
  return (
    <>
      {beams.map((b, i) => (
        <polygon
          key={i}
          points={`${b.x},${b.top} ${b.x - b.spread},104 ${b.x + b.spread},104`}
          fill={`url(#${uid}-l)`}
          opacity={b.o}
        />
      ))}
      {dots.map((d, i) => (
        <circle key={i} cx={d.cx} cy={d.cy} r={d.r} fill="#7FA6D6" opacity={d.o} />
      ))}
      <line x1="0" y1="66" x2="100" y2="66" stroke="#16396B" strokeWidth="0.5" opacity="0.6" />
    </>
  );
}

/** Nested off-centre frames — hung works in a gallery room. */
function Frames({ rnd, uid }: MotifProps) {
  const frames = Array.from({ length: 3 }, () => {
    const w = 20 + rnd() * 30;
    const h = 16 + rnd() * 26;
    return {
      x: 8 + rnd() * (84 - w),
      y: 10 + rnd() * (70 - h),
      w,
      h,
      o: 0.3 + rnd() * 0.4,
      bright: rnd() > 0.5,
      tilt: -3 + rnd() * 6,
    };
  });
  return (
    <>
      {frames.map((f, i) => (
        <g key={i} transform={`rotate(${f.tilt} ${f.x + f.w / 2} ${f.y + f.h / 2})`}>
          <rect
            x={f.x}
            y={f.y}
            width={f.w}
            height={f.h}
            fill="none"
            stroke={f.bright ? `url(#${uid}-l)` : "#4A7FC1"}
            strokeWidth="1"
            opacity={f.o + 0.2}
          />
          <rect
            x={f.x + 3}
            y={f.y + 3}
            width={f.w - 6}
            height={f.h - 6}
            fill={f.bright ? `url(#${uid}-l)` : "#16396B"}
            opacity={f.o * 0.6}
          />
        </g>
      ))}
      <line x1="0" y1="86" x2="100" y2="86" stroke="#16396B" strokeWidth="0.6" opacity="0.7" />
    </>
  );
}
