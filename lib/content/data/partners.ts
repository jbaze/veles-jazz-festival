import type { Partner } from "../schema";

/**
 * The Municipality and the Ministry are the founder and a state supporter —
 * never rendered in the same row as commercial sponsors (brief §11).
 * No logo files exist yet; the UI renders typographic tiles until the
 * client supplies official logos and usage rules ([VERIFY] §14.8).
 */
export const partners: Partner[] = [
  {
    slug: "opstina-veles",
    name: "Општина Велес",
    tier: "founder",
    editions: [2022, 2023, 2024, 2025, 2026],
  },
  {
    slug: "ministerstvo-kultura",
    name: "Министерство за култура и туризам",
    tier: "institutional",
    editions: [2025, 2026],
  },
  {
    slug: "teatar-dzinot-partner",
    name: "Театар „Ј.Х.К. Џинот“ Велес",
    tier: "partner",
    editions: [2022, 2024, 2025],
  },
  {
    slug: "europe-house-partner",
    name: "Europe House Велес",
    tier: "partner",
    editions: [2023, 2024],
  },
  {
    slug: "nebo",
    name: "Центар за креативни индустрии НЕБО",
    tier: "partner",
    editions: [2025],
  },
  { slug: "delta-prom", name: "Delta-Prom", tier: "sponsor", editions: [2024] },
  { slug: "different", name: "Different", tier: "sponsor", editions: [2024] },
  { slug: "marquardt", name: "Marquardt", tier: "sponsor", editions: [2024] },
  { slug: "simit-petrol", name: "Симит Петрол", tier: "sponsor", editions: [2024] },
  { slug: "agria", name: "Агриа", tier: "sponsor", editions: [2024] },
  { slug: "infinity-graphics", name: "Infinity Graphics", tier: "sponsor", editions: [2024] },
  { slug: "printline-pro", name: "Printline Pro", tier: "sponsor", editions: [2024] },
  { slug: "under-consulting", name: "Under Consulting", tier: "sponsor", editions: [2024] },
  { slug: "malina", name: "Malina", tier: "sponsor", editions: [2024] },
];
