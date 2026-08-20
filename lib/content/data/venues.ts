import type { Venue } from "../schema";

/**
 * Addresses and coordinates are deliberately absent until confirmed by the
 * client — the UI renders an honest "address being confirmed" state.
 */
export const venues: Venue[] = [
  {
    slug: "teatar-dzinot",
    // DEMO-SEED image (Pexels, free licence) — replace with cleared photography
    image: {
      src: "/images/demo/venue-teatar.jpg",
      alt: { mk: "Театарска сала — демо-фотографија", en: "Theatre auditorium — demo photo" },
    },
    name: { mk: "Театар „Ј.Х.К. Џинот“ — Велес", en: "J.H.K. Dzhinot Theatre — Veles" },
    shortName: { mk: "Театар", en: "Theatre" },
    role: { mk: "Главна сцена", en: "Main stage" },
    description: {
      mk: "Градскиот театар на Велес — главната сцена на фестивалот. Седечки концерти во салата, а фестивалските вечери се придружени со видео-мапирање.",
      en: "The city theatre of Veles — the festival's main stage. Seated concerts in the auditorium, with festival evenings accompanied by video mapping.",
    },
    gettingThere: {
      mk: "Во центарот на Велес. Точна адреса и упатства — по потврда.",
      en: "In the centre of Veles. Exact address and directions to follow once confirmed.",
    },
  },
  {
    slug: "parking-na-teatarot",
    // DEMO-SEED image (Pexels, free licence) — replace with cleared photography
    image: {
      src: "/images/demo/venue-parking.jpg",
      alt: { mk: "Доцна програма — демо-фотографија", en: "Late programme — demo photo" },
    },
    name: { mk: "Паркинг на театарот", en: "Theatre parking lot" },
    shortName: { mk: "Паркинг", en: "Parking" },
    role: { mk: "Афтер-парти", en: "After-parties" },
    description: {
      mk: "Отворениот простор зад театарот — доцните вечери на фестивалот: DJ/VJ сетови, доцни концерти и завршната журка.",
      en: "The open-air space by the theatre — the festival's late-night strand: DJ/VJ sets, late concerts and the closing party.",
    },
    gettingThere: {
      mk: "Веднаш до Театарот „Ј.Х.К. Џинот“.",
      en: "Right next to the J.H.K. Dzhinot Theatre.",
    },
  },
  {
    slug: "spomen-kosturnica",
    // DEMO-SEED image (Pexels, free licence) — replace with cleared photography
    image: {
      src: "/images/demo/venue-kosturnica.jpg",
      alt: { mk: "Споменик — демо-фотографија", en: "Monument — demo photo" },
    },
    name: { mk: "Спомен-костурница", en: "Memorial Ossuary" },
    shortName: { mk: "Костурница", en: "Ossuary" },
    role: { mk: "Отворање / перформанси", en: "Opening / performances" },
    description: {
      mk: "Модернистичкиот споменик над Велес — бетонски, геометриски, со поглед над градот. Отворањата и перформансите на фестивалот се одржуваат овде, а за време на фестивалот споменикот се осветлува со проекции.",
      en: "The modernist monument above Veles — concrete, geometric, overlooking the city. Festival openings and performances happen here, and during the festival the monument is lit with projections.",
    },
    gettingThere: {
      mk: "На ридот над центарот на градот. Настаните се на отворено — понесете соодветна облека.",
      en: "On the hill above the city centre. Events are outdoors — dress accordingly.",
    },
    accessibilityNotes: {
      mk: "Пристапот е по угорнина; детални информации за пристапност — по потврда.",
      en: "Access is uphill; detailed accessibility information to follow once confirmed.",
    },
  },
  {
    slug: "europe-house",
    // DEMO-SEED image (Pexels, free licence) — replace with cleared photography
    image: {
      src: "/images/demo/venue-europe-house.jpg",
      alt: { mk: "Галериски простор — демо-фотографија", en: "Gallery space — demo photo" },
    },
    name: { mk: "Europe House Велес", en: "Europe House Veles" },
    shortName: { mk: "Europe House", en: "Europe House" },
    role: { mk: "Изложби", en: "Exhibitions" },
    description: {
      mk: "Просторот на Europe House во Велес — домаќин на фотографските и ликовните изложби на фестивалот.",
      en: "The Europe House space in Veles — host of the festival's photography and fine-art exhibitions.",
    },
  },
  {
    slug: "gradska-pivnica-pab",
    // DEMO-SEED image (Pexels, free licence) — replace with cleared photography
    image: {
      src: "/images/demo/venue-pivnica.jpg",
      alt: { mk: "Вечерна атмосфера — демо-фотографија", en: "Evening atmosphere — demo photo" },
    },
    name: { mk: "Градска пивница „Паб“", en: "City Beer Hall “Pab”" },
    shortName: { mk: "Паб", en: "Pab" },
    role: { mk: "Локација во 2022", en: "Used in 2022" },
    description: {
      mk: "Дел од првото издание во 2022 година.",
      en: "Part of the first edition in 2022.",
    },
  },
];
