import type { Edition } from "../schema";

export const editions: Edition[] = [
  {
    year: 2022,
    ordinal: 1,
    slug: "2022",
    title: { mk: "Прво издание", en: "First edition" },
    dates: { start: "2022-09-04", end: "2022-09-10" },
    festivalDays: 7,
    description: {
      mk: "Првото издание го постави концептот: музика, театар, видео-проекции и течни светлосни проекции, на сцени низ целиот град. Отворањето кај Спомен-костурницата беше со слободен влез.",
      en: "The first edition set the concept: music, theatre, video projections and liquid-light projections, on stages across the city. The opening day at the Memorial Ossuary was free of charge.",
    },
    countries: ["MK"],
    partners: ["opstina-veles", "teatar-dzinot-partner"],
    isCurrent: false,
    programmeIncomplete: true,
    // DEMO-SEED media (Pexels, free licence) — replace with cleared photography
    image: {
      src: "/images/demo/ed-2022.jpg",
      alt: { mk: "Атмосфера од фестивалот", en: "Festival atmosphere" },
    },
    gallery: [
      { src: "/images/demo/g22-1.jpg", alt: { mk: "Настап на сцена", en: "On stage" } },
      { src: "/images/demo/g22-2.jpg", alt: { mk: "Концертна вечер", en: "Concert evening" } },
      { src: "/images/demo/g22-3.jpg", alt: { mk: "Публика", en: "The audience" } },
      { src: "/images/demo/g22-4.jpg", alt: { mk: "Вечерна програма", en: "Evening programme" } },
      { src: "/images/demo/g22-5.jpg", alt: { mk: "Атмосфера", en: "Atmosphere" } },
    ],
  },
  {
    year: 2023,
    ordinal: 2,
    slug: "2023",
    title: { mk: "Второ издание", en: "Second edition" },
    dates: { start: "2023-09-06", end: "2023-09-13", approximate: true },
    description: {
      mk: "Второто издание се отвори со фотографската изложба на Fotini Potamia во Europe House Велес и заврши со концертот на Dine Doneff и Јордан Костов.",
      en: "The second edition opened with Fotini Potamia's photography exhibition at Europe House Veles and closed with the concert of Dine Doneff and Jordan Kostov.",
    },
    countries: ["GR", "MK"],
    partners: ["opstina-veles", "europe-house-partner"],
    isCurrent: false,
    programmeIncomplete: true,
    // DEMO-SEED media (Pexels, free licence) — replace with cleared photography
    image: {
      src: "/images/demo/ed-2023.jpg",
      alt: { mk: "Изложба во Europe House", en: "Exhibition at Europe House" },
    },
    gallery: [
      { src: "/images/demo/g23-1.jpg", alt: { mk: "Отворање на изложбата", en: "Exhibition opening" } },
      { src: "/images/demo/g23-2.jpg", alt: { mk: "Поставка", en: "The installation" } },
      { src: "/images/demo/g23-3.jpg", alt: { mk: "Посетители", en: "Visitors" } },
      { src: "/images/demo/g23-4.jpg", alt: { mk: "Галериски простор", en: "Gallery space" } },
    ],
  },
  {
    year: 2024,
    ordinal: 3,
    slug: "2024",
    title: { mk: "Трето издание", en: "Third edition" },
    dates: { start: "2024-09-29", end: "2024-10-27" },
    festivalDays: 7,
    description: {
      mk: "Седум фестивалски дена распоредени низ цел месец — со изведувачи од Франција, Германија, Финска, Грција, Австралија и Северна Македонија.",
      en: "Seven festival days spread across a month — with artists from France, Germany, Finland, Greece, Australia and North Macedonia.",
    },
    countries: ["FR", "DE", "FI", "GR", "AU", "MK"],
    partners: [
      "opstina-veles",
      "teatar-dzinot-partner",
      "europe-house-partner",
      "delta-prom",
      "different",
      "marquardt",
      "simit-petrol",
      "agria",
      "infinity-graphics",
      "printline-pro",
      "under-consulting",
      "malina",
    ],
    isCurrent: false,
    programmeIncomplete: true,
    productionNotes: {
      mk: "Графички дизајн: Филип Коруновски.",
      en: "Graphic design: Filip Korunovski.",
    },
    // DEMO-SEED media (Pexels, free licence) — replace with cleared photography
    image: {
      src: "/images/demo/ed-2024.jpg",
      alt: { mk: "Концертна вечер", en: "Concert evening" },
    },
    gallery: [
      { src: "/images/demo/g24-1.jpg", alt: { mk: "Настап на сцена", en: "On stage" } },
      { src: "/images/demo/g24-2.jpg", alt: { mk: "Светла на сцената", en: "Stage lights" } },
      { src: "/images/demo/g24-3.jpg", alt: { mk: "Публика", en: "The audience" } },
      { src: "/images/demo/g24-4.jpg", alt: { mk: "Вечерна атмосфера", en: "Evening atmosphere" } },
      { src: "/images/demo/g24-5.jpg", alt: { mk: "Концерт", en: "Concert" } },
    ],
  },
  {
    year: 2025,
    ordinal: 4,
    slug: "2025",
    title: { mk: "Четврто издание", en: "Fourth edition" },
    dates: { start: "2025-09-25", end: "2025-09-28" },
    festivalDays: 4,
    description: {
      mk: "Четири дена: работилница за цијанотипија, ликовна изложба, три вечери концерти и перформанси — од Transverse до Влатко Стефановски Трио — и доцна програма на паркингот на театарот.",
      en: "Four days: a cyanotype workshop, a fine-art exhibition, three evenings of concerts and performances — from Transverse to the Vlatko Stefanovski Trio — and a late-night strand on the theatre parking lot.",
    },
    countries: ["US", "GR", "MK"],
    partners: ["opstina-veles", "ministerstvo-kultura", "teatar-dzinot-partner", "nebo"],
    isCurrent: false,
    productionNotes: {
      mk: "Видео-мапирање низ сите вечери во театарот и на паркингот: Борче Конзулов. Графички дизајн: Филип Коруновски.",
      en: "Video mapping across all theatre and parking evenings: Borche Konzulov. Graphic design: Filip Korunovski.",
    },
    // DEMO-SEED media (Pexels, free licence) — replace with cleared photography
    image: {
      src: "/images/demo/ed-2025.jpg",
      alt: { mk: "Главната сцена", en: "The main stage" },
    },
    gallery: [
      { src: "/images/demo/g25-1.jpg", alt: { mk: "Отворање на изданието", en: "Edition opening" } },
      { src: "/images/demo/g25-2.jpg", alt: { mk: "Настап на главната сцена", en: "Main stage performance" } },
      { src: "/images/demo/g25-3.jpg", alt: { mk: "Светла и мапирање", en: "Lights and mapping" } },
      { src: "/images/demo/g25-4.jpg", alt: { mk: "Концертна вечер", en: "Concert evening" } },
      { src: "/images/demo/g25-5.jpg", alt: { mk: "Публика во театарот", en: "Theatre audience" } },
      { src: "/images/demo/g25-6.jpg", alt: { mk: "Доцна програма на паркингот", en: "Late programme on the parking lot" } },
      { src: "/images/demo/g25-7.jpg", alt: { mk: "Настап", en: "Performance" } },
      { src: "/images/demo/g25-8.jpg", alt: { mk: "Завршница", en: "The closing" } },
    ],
  },
  {
    year: 2026,
    ordinal: 5,
    slug: "2026",
    title: { mk: "Петто издание", en: "Fifth edition" },
    // DEMO-SEED: dates + programme are DEMO content for the client
    // presentation — remove/replace when the real 2026 data is confirmed.
    dates: { start: "2026-09-24", end: "2026-09-27" },
    festivalDays: 4,
    description: {
      mk: "Четири дена џез, ворлд и современа музика: работилници и изложби преку ден, концерти во театарот и кај Спомен-костурницата навечер, и доцна програма на паркингот на театарот.",
      en: "Four days of jazz, world and contemporary music: workshops and exhibitions by day, concerts at the theatre and the Memorial Ossuary by night, and a late strand on the theatre parking lot.",
    },
    countries: ["SI", "SE", "DE", "RS", "GR", "MK"],
    partners: ["opstina-veles", "ministerstvo-kultura", "teatar-dzinot-partner", "nebo"],
    isCurrent: true,
    image: {
      src: "/images/demo/ed-2026.jpg",
      alt: { mk: "Петто издание", en: "Fifth edition" },
    },
  },
];
