"use client";

import { Children, useEffect, useMemo, useState, type ReactNode } from "react";

/**
 * Client-side filter shell for the artists grid (brief §9: filterable by
 * country and edition). The cards themselves are server-rendered children
 * (they carry the generative SVG tiles), passed in the same order as the
 * metadata — this component only decides visibility, so the full grid is
 * always in the HTML and works without JavaScript.
 *
 * Filter state lives in the URL (?zemja=&izdanie=) so views are shareable,
 * mirroring the schedule matrix.
 */

export type ArtistMeta = {
  slug: string;
  countries: string[];
  years: number[];
};

type Filters = { zemja: string; izdanie: string };
const EMPTY: Filters = { zemja: "", izdanie: "" };

export default function FilterableArtistGrid({
  items,
  countryOptions,
  editionOptions,
  labels,
  children,
}: {
  items: ArtistMeta[];
  countryOptions: { value: string; label: string }[];
  editionOptions: { value: string; label: string }[];
  labels: {
    country: string;
    edition: string;
    all: string;
    reset: string;
    noMatches: string;
  };
  children: ReactNode;
}) {
  const cards = Children.toArray(children);
  const [filters, setFilters] = useState<Filters>(EMPTY);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setFilters({ zemja: params.get("zemja") ?? "", izdanie: params.get("izdanie") ?? "" });
  }, []);

  function update(patch: Partial<Filters>) {
    const next = { ...filters, ...patch };
    setFilters(next);
    const params = new URLSearchParams();
    if (next.zemja) params.set("zemja", next.zemja);
    if (next.izdanie) params.set("izdanie", next.izdanie);
    const qs = params.toString();
    window.history.replaceState(null, "", qs ? `?${qs}` : window.location.pathname);
  }

  const visible = useMemo(
    () =>
      items.map(
        (item) =>
          (!filters.zemja || item.countries.includes(filters.zemja)) &&
          (!filters.izdanie || item.years.includes(Number(filters.izdanie))),
      ),
    [items, filters],
  );

  const anyVisible = visible.some(Boolean);
  const hasFilters = Boolean(filters.zemja || filters.izdanie);

  return (
    <div>
      <div className="mb-10 flex flex-col gap-4">
        <FilterRow
          legend={labels.country}
          allLabel={labels.all}
          options={countryOptions}
          value={filters.zemja}
          onChange={(v) => update({ zemja: v })}
        />
        <FilterRow
          legend={labels.edition}
          allLabel={labels.all}
          options={editionOptions}
          value={filters.izdanie}
          onChange={(v) => update({ izdanie: v })}
        />
        {hasFilters && (
          <button
            type="button"
            onClick={() => update(EMPTY)}
            className="type-label w-fit rounded-[2px] border-2 border-prussian px-3 py-1.5 text-concrete hover:border-exposure hover:text-paper"
          >
            {labels.reset} ✕
          </button>
        )}
      </div>

      {!anyVisible && (
        <p className="border-2 border-prussian p-6 text-concrete">{labels.noMatches}</p>
      )}

      <ul className="grid grid-cols-2 gap-5 md:grid-cols-3 xl:grid-cols-4">
        {cards.map((card, i) => (
          <li key={items[i]?.slug ?? i} hidden={!visible[i]}>
            {card}
          </li>
        ))}
      </ul>
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
  children: ReactNode;
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
