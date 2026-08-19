import type { ReactNode } from "react";

/**
 * Endless ticker strip. Pure CSS animation (paused → horizontally
 * scrollable under prefers-reduced-motion). The track is duplicated for
 * the seamless loop; the copy is aria-hidden.
 */
export default function Marquee({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`marquee ${className ?? ""}`}>
      <div className="marquee-track">{children}</div>
      <div className="marquee-track" aria-hidden="true">
        {children}
      </div>
    </div>
  );
}
