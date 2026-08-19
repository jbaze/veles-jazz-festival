"use client";

import { useEffect, useState } from "react";

/**
 * Countdown to the festival opening (a Bansko Jazz Fest-style feature).
 * Renders nothing until mounted (SSR-safe) and nothing once the date has
 * passed. The home hero mounts it only when the current edition has
 * announced dates — so it activates automatically the moment real dates
 * are added to the content layer.
 */
export default function Countdown({
  targetIso,
  labels,
}: {
  targetIso: string; // YYYY-MM-DD, local festival date
  labels: { days: string; hours: string; minutes: string };
}) {
  const [remaining, setRemaining] = useState<number | null>(null);

  useEffect(() => {
    const target = new Date(`${targetIso}T00:00:00+02:00`).getTime();
    const tick = () => setRemaining(Math.max(0, target - Date.now()));
    tick();
    const id = setInterval(tick, 30_000);
    return () => clearInterval(id);
  }, [targetIso]);

  if (remaining === null || remaining <= 0) return null;

  const days = Math.floor(remaining / 86_400_000);
  const hours = Math.floor((remaining % 86_400_000) / 3_600_000);
  const minutes = Math.floor((remaining % 3_600_000) / 60_000);
  const parts: [number, string][] = [
    [days, labels.days],
    [hours, labels.hours],
    [minutes, labels.minutes],
  ];

  return (
    <div className="flex gap-6" role="timer" aria-live="off">
      {parts.map(([value, label]) => (
        <div key={label}>
          <span className="type-display block text-4xl text-paper md:text-5xl">
            {String(value).padStart(2, "0")}
          </span>
          <span className="type-label-sm mt-1 block text-concrete">{label}</span>
        </div>
      ))}
    </div>
  );
}
