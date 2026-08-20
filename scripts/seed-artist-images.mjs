// One-off DEMO-SEED helper: inserts demo image fields into artists.ts.
// Safe to delete after the demo seed is committed.
import { readFileSync, writeFileSync } from "node:fs";

const FILE = "lib/content/data/artists.ts";
const MAP = {
  "enes-begovski": "a1",
  "perija": "a2",
  "sasko-kostov": "a3",
  "faik-mefailoski": "a4",
  "slavco-kocev": "a5",
  "andrea-mircheska": "a6",
  "petar-hristov": "a7",
  "taksi-konzilium": "a8",
  "dina-jasari-i-drugari": "a9",
  "letecki-pekinezi": "a10",
  "edit-points": "a11",
  "bopheads": "a12",
  "shamba": "a13",
  "dine-doneff": "a14",
  "jordan-kostov": "a15",
  "james-wylie-egli-katsiki": "a16",
  "vlatko-i-lempi": "a17",
  "vlatko-stefanovski-trio": "a18",
};

let src = readFileSync(FILE, "utf8");
for (const [slug, img] of Object.entries(MAP)) {
  const marker = `slug: "${slug}",`;
  if (!src.includes(marker)) throw new Error(`missing ${slug}`);
  const insert = `${marker}\n    // DEMO-SEED image (Pexels, free licence) — replace with cleared photography\n    image: {\n      src: "/images/demo/${img}.jpg",\n      alt: { mk: "Настап — демо-фотографија", en: "Performance — demo photo" },\n    },`;
  src = src.replace(marker, insert);
}
writeFileSync(FILE, src);
console.log("seeded", Object.keys(MAP).length);
