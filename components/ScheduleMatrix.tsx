"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

/**
 * The venue × time matrix (brief §8.5, §9). The festival's defining
 * logistical feature is three things happening in three places on the same
 * night, so venue is a visible axis, not a footnote.
 *
 * - ≥900px: one column per venue, the evening runs down, day by day.
 * - <900px: a vertical day-by-day list (built mobile-first).
 * - Filters (day / venue / type) live in the URL (?den=&lokacija=&tip=) so
 *   filtered views are shareable. Server-side render is always the full,
 *   unfiltered programme — core content works with JavaScript disabled.
 */

export type MatrixEvent = {
  slug: string;
  href: string;
  title: string;
  type: string;
  typeLabel: string;
  time?: string;
  timeNote?: string;
  venue?: string;
  venueLabel?: string;
  artistNames: string[];
  admission: "free" | "ticketed" | "sold-out" | "tbc";
  admissionLabel: string;
};

export type MatrixDay = {
  date?: string; // ISO; undefined → date TBA bucket
  label: string;
  isToday?: boolean;
  events: MatrixEvent[];
};

export type MatrixLabels = {
  filterDay: string;
  filterVenue: string;
  filterType: string;
  filterAll: string;
  filterReset: string;
  noResults: string;
  timeTba: string;
  venueTba: string;
  matrixCaption: string;
};

type Filters = { den: string; lokacija: string; tip: string };
const EMPTY: Filters = { den: "", lokacija: "", tip: "" };

export default function ScheduleMatrix({
  days,
  venues,
  types,
  labels,
}: {
  days: MatrixDay[];
  venues: { slug: string; label: string }[];
  types: { slug: string; label: string }[];
  labels: MatrixLabels;
}) {
  const [filters, setFilters] = useState<Filters>(EMPTY);

  // Initial filter state from the URL, applied after mount (SSR output is
  // always the full programme, so no-JS visitors miss nothing).
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setFilters({
      den: params.get("den") ?? "",
      lokacija: params.get("lokacija") ?? "",
      tip: params.get("tip") ?? "",
    });
  }, []);

  function update(patch: Partial<Filters>) {
    const next = { ...filters, ...patch };
    setFilters(next);
    const params = new URLSearchParams();
    if (next.den) params.set("den", next.den);
    if (next.lokacija) params.set("lokacija", next.lokacija);
    if (next.tip) params.set("tip", next.tip);
    const qs = params.toString();
    window.history.replaceState(null, "", qs ? `?${qs}` : window.location.pathname);
  }

  const filtered = useMemo(() => {
    return days
      .filter((d) => !filters.den || d.date === filters.den)
      .map((d) => ({
        ...d,
        events: d.events.filter(
          (e) =>
            (!filters.lokacija || e.venue === filters.lokacija) &&
            (!filters.tip || e.type === filters.tip),
        ),
      }))
      .filter((d) => d.events.length > 0);
  }, [days, filters]);

  const activeVenues = useMemo(() => {
    const used = new Set(days.flatMap((d) => d.events.map((e) => e.venue).filter(Boolean)));
    return venues.filter((v) => used.has(v.slug));
  }, [days, venues]);

  const hasFilters = Boolean(filters.den || filters.lokacija || filters.tip);

  return (
    <div>
      <div className="mb-8 flex flex-col gap-4" role="group" aria-label={labels.matrixCaption}>
        <FilterRow
          legend={labels.filterDay}
          allLabel={labels.filterAll}
          options={days.filter((d) => d.date).map((d) => ({ value: d.date!, label: d.label }))}
          value={filters.den}
          onChange={(v) => update({ den: v })}
        />
        <FilterRow
          legend={labels.filterVenue}
          allLabel={labels.filterAll}
          options={activeVenues.map((v) => ({ value: v.slug, label: v.label }))}
          value={filters.lokacija}
          onChange={(v) => update({ lokacija: v })}
        />
        <FilterRow
          legend={labels.filterType}
          allLabel={labels.filterAll}
          options={types.map((ty) => ({ value: ty.slug, label: ty.label }))}
          value={filters.tip}
          onChange={(v) => update({ tip: v })}
        />
        {hasFilters && (
          <button
            type="button"
            onClick={() => update(EMPTY)}
            className="type-label w-fit rounded-[2px] border-2 border-prussian px-3 py-1.5 text-concrete hover:border-exposure hover:text-paper"
          >
            {labels.filterReset} ✕
          </button>
        )}
      </div>

      {filtered.length === 0 ? (
        <p className="border-2 border-prussian p-6 text-concrete">{labels.noResults}</p>
      ) : (
        <div className="flex flex-col gap-12">
          {filtered.map((day) => (
            <section key={day.date ?? "tba"} aria-label={day.label}>
              <h3 className="type-label mb-4 flex items-center gap-3 text-paper">
                {/* current-day marker — a sodium site (§8.2) */}
                {day.isToday && (
                  <span aria-hidden="true" className="inline-block h-2 w-2 rounded-full bg-sodium" />
                )}
                <span className={day.isToday ? "text-sodium" : undefined}>{day.label}</span>
              </h3>

              {/* Mobile-first: vertical list */}
              <ol className="flex flex-col gap-3 min-[900px]:hidden">
                {day.events.map((e) => (
                  <li key={e.slug}>
                    <EventCell event={e} labels={labels} showVenue />
                  </li>
                ))}
              </ol>

              {/* ≥900px: venue columns, evening runs down */}
              <div className="hidden min-[900px]:block">
                <div
                  className="grid gap-3"
                  style={{
                    gridTemplateColumns: `repeat(${Math.max(activeVenues.length, 1)}, minmax(0, 1fr))`,
                  }}
                >
                  {activeVenues.map((v) => (
                    <p key={v.slug} className="type-label border-b-2 border-prussian pb-2 text-concrete">
                      {v.label}
                    </p>
                  ))}
                  {activeVenues.map((v) => (
                    <ol key={v.slug} className="flex flex-col gap-3">
                      {day.events
                        .filter((e) => e.venue === v.slug)
                        .map((e) => (
                          <li key={e.slug}>
                            <EventCell event={e} labels={labels} />
                          </li>
                        ))}
                    </ol>
                  ))}
                </div>
                {day.events.some((e) => !e.venue) && (
                  <ol className="mt-3 flex flex-col gap-3">
                    {day.events
                      .filter((e) => !e.venue)
                      .map((e) => (
                        <li key={e.slug}>
                          <EventCell event={e} labels={labels} showVenue />
                        </li>
                      ))}
                  </ol>
                )}
              </div>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}

function FilterRow({
  legend,
  allLabel,
  options,
  value,
  onChange,
}: {
  legend: string;
  allLabel: string;
  options: { value: string; label: string }[];
  value: string;
  onChange: (value: string) => void;
}) {
  if (options.length < 2) return null;
  return (
    <fieldset className="flex flex-wrap items-center gap-2">
      <legend className="type-label float-left mr-2 text-concrete">{legend}:</legend>
      <FilterButton active={!value} onClick={() => onChange("")}>
        {allLabel}
      </FilterButton>
      {options.map((o) => (
        <FilterButton key={o.value} active={value === o.value} onClick={() => onChange(o.value)}>
          {o.label}
        </FilterButton>
      ))}
    </fieldset>
  );
}

function FilterButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={`type-label rounded-[2px] border-2 px-3 py-1.5 transition-colors ${
        active
          ? "border-exposure bg-prussian text-paper"
          : "border-prussian text-concrete hover:border-exposure hover:text-paper"
      }`}
    >
      {children}
    </button>
  );
}

function EventCell({
  event,
  labels,
  showVenue = false,
}: {
  event: MatrixEvent;
  labels: MatrixLabels;
  showVenue?: boolean;
}) {
  return (
    <Link href={event.href} className="card card-hover block h-full bg-ink p-4">

      <p className="type-label text-exposure">
        {event.time ?? event.timeNote ?? labels.timeTba}
        {showVenue && (
          <span className="text-concrete"> · {event.venueLabel ?? labels.venueTba}</span>
        )}
      </p>
      <p className="mt-2 font-semibold leading-snug text-paper">{event.title}</p>
      {event.artistNames.length > 0 && (
        <p className="mt-1 text-sm text-concrete">{event.artistNames.join(" · ")}</p>
      )}
      <p className="type-label mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-concrete">
        <span className="border border-prussian px-2 py-0.5">{event.typeLabel}</span>
        <span
          className={
            event.admission === "free"
              ? "text-exposure"
              : event.admission === "sold-out"
                ? "line-through decoration-concrete/60"
                : event.admission === "ticketed"
                  ? "text-paper"
                  : undefined
          }
        >
          {event.admissionLabel}
        </span>
      </p>
    </Link>
  );
}
