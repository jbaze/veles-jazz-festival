"use client";

import { useState } from "react";

/**
 * Clipboard helper for press materials. Without JavaScript the button is
 * inert but the text itself stays selectable, so nothing is lost.
 */
export default function CopyButton({
  text,
  label,
  copiedLabel,
}: {
  text: string;
  label: string;
  copiedLabel: string;
}) {
  const [copied, setCopied] = useState(false);

  return (
    <button
      type="button"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(text);
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        } catch {
          // Clipboard unavailable (permissions, http) — leave the text selectable.
        }
      }}
      aria-live="polite"
      className={`type-label rounded-[2px] border-2 px-3 py-1.5 transition-colors ${
        copied
          ? "border-exposure text-exposure-bright"
          : "border-prussian text-concrete hover:border-exposure hover:text-paper"
      }`}
    >
      {copied ? copiedLabel : label}
    </button>
  );
}
