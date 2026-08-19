import type { ReactNode } from "react";

/**
 * The exposure reveal (brief §8.4). Server-rendered: the default state is
 * the fully developed print, so no-JS visitors see the final image. A tiny
 * inline script — running during HTML parse, before paint — adds
 * .is-developing on the first visit of a session, which triggers the
 * one-off CSS develop animation. Never re-runs on route change;
 * prefers-reduced-motion disables it entirely in CSS.
 */
export default function ExposurePrint({
  id,
  children,
  className,
}: {
  id: string;
  children: ReactNode;
  className?: string;
}) {
  const script = `(function(){try{var k="jv-exposed";if(!sessionStorage.getItem(k)){sessionStorage.setItem(k,"1");var e=document.getElementById(${JSON.stringify(id)});if(e){e.classList.add("is-developing");}}}catch(_){}})();`;
  return (
    <div id={id} className={`exposure-print ${className ?? ""}`}>
      {children}
      <div className="exposure-veil" aria-hidden="true" />
      <script dangerouslySetInnerHTML={{ __html: script }} />
    </div>
  );
}
