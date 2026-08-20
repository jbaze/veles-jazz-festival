import Link from "next/link";
import type { ReactNode } from "react";
import type { Locale } from "@/lib/i18n/config";
import { getDict } from "@/lib/i18n/dictionaries";
import type { EventType, FestivalEvent } from "@/lib/content";
import { countryName } from "@/lib/format";

export function JsonLd({ data }: { data: object | object[] }) {
  const items = Array.isArray(data) ? data : [data];
  return (
    <>
      {items.map((item, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(item) }}
        />
      ))}
    </>
  );
}

export function SectionHeading({
  children,
  id,
  as: Tag = "h2",
}: {
  children: ReactNode;
  id?: string;
  as?: "h1" | "h2" | "h3";
}) {
  return (
    <Tag id={id} className="type-display type-display-2 text-paper">
      {children}
    </Tag>
  );
}

export function Kicker({ children }: { children: ReactNode }) {
  return <p className="type-label mb-3 text-exposure">{children}</p>;
}

export function TypeBadge({ type, locale }: { type: EventType; locale: Locale }) {
  const t = getDict(locale);
  return (
    <span className="type-label inline-block border border-prussian px-2 py-0.5 text-concrete">
      {t.types[type]}
    </span>
  );
}

/**
 * Per-event admission state (Toronto pattern: free / ticketed / sold out),
 * honest about the pending model — every event is "tbc" until client
 * question #3 is answered, and the state activates from data alone.
 */
export function AdmissionBadge({
  admission,
  locale,
}: {
  admission: FestivalEvent["admission"];
  locale: Locale;
}) {
  const t = getDict(locale);
  switch (admission) {
    case "free":
      return (
        <span className="type-label inline-block border border-exposure/70 px-2 py-0.5 text-exposure-bright">
          {t.event.admissionFree}
        </span>
      );
    case "ticketed":
      return (
        <span className="type-label inline-block border border-prussian px-2 py-0.5 text-paper">
          {t.event.admissionTicketed}
        </span>
      );
    case "sold-out":
      return (
        <span className="type-label inline-block border border-prussian/60 px-2 py-0.5 text-concrete line-through decoration-concrete/60">
          {t.event.admissionSoldOut}
        </span>
      );
    default:
      return <span className="type-label text-concrete">{t.event.admissionTbc}</span>;
  }
}

/** Country tags — inline foreign-language runs get lang attributes (§8.3). */
export function CountryTags({ codes, locale }: { codes: string[]; locale: Locale }) {
  if (!codes.length) return null;
  return (
    <span className="type-label text-concrete">
      {codes.map((code, i) => (
        <span key={code}>
          {i > 0 && " / "}
          <abbr title={countryName(code, locale)} className="no-underline">
            {code}
          </abbr>
        </span>
      ))}
    </span>
  );
}

/** Honest placeholder for facts pending client confirmation ([VERIFY]). */
export function PendingNote({ children }: { children: ReactNode }) {
  return (
    <p className="border-l-2 border-sodium/60 pl-4 text-sm text-concrete">{children}</p>
  );
}

export function AllLink({ href: to, children }: { href: string; children: ReactNode }) {
  return (
    <Link href={to} className="type-label link-sweep text-exposure">
      {children} →
    </Link>
  );
}

/** Cyanotype photo placeholder — used until photography rights are cleared. */
export function PhotoPending({ locale, className }: { locale: Locale; className?: string }) {
  const t = getDict(locale);
  return (
    <div
      aria-hidden="true"
      className={`flex items-center justify-center border-2 border-prussian bg-gradient-to-b from-prussian/40 to-ink ${className ?? ""}`}
    >
      <span className="type-label text-concrete">{t.photoPending}</span>
    </div>
  );
}
