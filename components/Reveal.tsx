"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Scroll-reveal — the same exposure gesture as the hero, quieter (§8.4).
 * Content is fully visible by default (no-JS safe); the observer arms the
 * clip only shortly before the element enters the viewport, then exposes
 * it. Reduced-motion users never see the clip (CSS disables it).
 */
export default function Reveal({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // Already on screen? Leave it visible — no retroactive hiding.
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight) return;
    el.classList.add("reveal-armed");
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            el.classList.add("is-exposed");
            io.disconnect();
          }
        }
      },
      { rootMargin: "0px 0px -10% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
