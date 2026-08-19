import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

/**
 * Per-page OG images in the cyanotype system (brief §12) — an event card
 * rendered as a poster. This is what gets shared to Facebook, the
 * festival's main channel. Fonts are committed TTFs (OFL) with full
 * Macedonian Cyrillic coverage.
 */

export const OG_SIZE = { width: 1200, height: 630 };

async function loadFonts() {
  const dir = join(process.cwd(), "assets", "fonts");
  const [unbounded, manrope] = await Promise.all([
    readFile(join(dir, "unbounded-700.ttf")),
    readFile(join(dir, "manrope-500.ttf")),
  ]);
  return [
    { name: "Unbounded", data: unbounded, weight: 700 as const, style: "normal" as const },
    { name: "Manrope", data: manrope, weight: 500 as const, style: "normal" as const },
  ];
}

export async function ogPoster({
  kicker,
  title,
  meta,
}: {
  kicker: string;
  title: string;
  meta: string;
}) {
  const fonts = await loadFonts();
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: 72,
          backgroundColor: "#0A1628",
          backgroundImage:
            "linear-gradient(135deg, #16396B 0%, #0A1628 55%), linear-gradient(0deg, #0A1628, #0A1628)",
          color: "#EDE9DF",
          position: "relative",
        }}
      >
        {/* concrete shells, abstracted */}
        <div
          style={{
            position: "absolute",
            right: 90,
            bottom: 0,
            width: 60,
            height: 340,
            backgroundImage: "linear-gradient(180deg, #4A7FC1, #16396B)",
            borderRadius: "60px 60px 0 0",
            transform: "rotate(4deg)",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            right: 175,
            bottom: 0,
            width: 72,
            height: 430,
            backgroundImage: "linear-gradient(180deg, #7FA6D6, #16396B)",
            borderRadius: "72px 72px 0 0",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            right: 272,
            bottom: 0,
            width: 56,
            height: 300,
            backgroundImage: "linear-gradient(180deg, #4A7FC1, #0A1628)",
            borderRadius: "56px 56px 0 0",
            transform: "rotate(-4deg)",
            display: "flex",
          }}
        />
        <div
          style={{
            fontFamily: "Manrope",
            fontSize: 26,
            textTransform: "uppercase",
            letterSpacing: 3,
            color: "#4A7FC1",
            marginBottom: 24,
            maxWidth: 800,
          }}
        >
          {kicker}
        </div>
        <div
          style={{
            fontFamily: "Unbounded",
            fontSize: title.length > 40 ? 56 : 72,
            lineHeight: 1.05,
            maxWidth: 900,
            textWrap: "balance",
          }}
        >
          {title}
        </div>
        <div
          style={{
            fontFamily: "Manrope",
            fontSize: 28,
            marginTop: 28,
            color: "#E5A02C",
          }}
        >
          {meta}
        </div>
      </div>
    ),
    { ...OG_SIZE, fonts },
  );
}
