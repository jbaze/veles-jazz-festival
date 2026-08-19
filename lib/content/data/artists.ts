import type { Artist } from "../schema";

/**
 * Seeded from press coverage 2022–2025 (brief §4). Bios state only what the
 * sources support — where nothing is confirmed, the UI shows an honest
 * "biography to follow" state. Countries use ISO codes; empty = unconfirmed.
 */
export const artists: Artist[] = [
  {
    slug: "enes-begovski",
    name: "Енес Беговски",
    nameLocal: "Enes Begovski",
    countries: [],
    bio: {
      mk: "Настапи со ханг-драм на отворањето на првото издание (2022) кај Спомен-костурницата.",
      en: "Performed on hang drum at the opening of the first edition (2022) at the Memorial Ossuary.",
    },
  },
  {
    slug: "perija",
    name: "Перија",
    nameLocal: "Perija",
    countries: [],
    bio: {
      mk: "Дарк-фолк проект — дел од отворањето на првото издание (2022).",
      en: "Dark folk project — part of the first edition's opening night (2022).",
    },
  },
  {
    slug: "sasko-kostov",
    name: "Сашко Костов",
    nameLocal: "Sashko Kostov",
    countries: ["MK"],
    bio: {
      mk: "Коосновач на фестивалот и изведувач — настапувал на првото издание, вклучително во театарско-музичкиот перформанс „Чекална 4“.",
      en: "Festival co-founder and performer — appeared at the first edition, including in the theatre-music performance “Chekalna 4”.",
    },
  },
  {
    slug: "faik-mefailoski",
    name: "Фаик Мефаилоски",
    nameLocal: "Faik Mefailoski",
    countries: ["MK"],
    bio: {
      mk: "Коосновач на фестивалот и изведувач — дел од театарско-музичкиот перформанс „Чекална 4“ на првото издание (2022).",
      en: "Festival co-founder and performer — part of the theatre-music performance “Chekalna 4” at the first edition (2022).",
    },
  },
  {
    slug: "slavco-kocev",
    name: "Славчо Коцев",
    nameLocal: "Slavcho Kocev",
    countries: ["MK"],
    bio: {
      mk: "Коосновач на фестивалот — настапи во „Чекална 4“ на првото издание (2022).",
      en: "Festival co-founder — performed in “Chekalna 4” at the first edition (2022).",
    },
  },
  {
    slug: "andrea-mircheska",
    name: "Андреа Мирческа",
    nameLocal: "Andrea Mircheska",
    countries: ["MK"],
    bio: {
      mk: "Настапи во театарско-музичкиот перформанс „Чекална 4“ на првото издание (2022).",
      en: "Performed in the theatre-music performance “Chekalna 4” at the first edition (2022).",
    },
  },
  {
    slug: "petar-hristov",
    name: "Петар Христов",
    nameLocal: "Petar Hristov",
    countries: ["MK"],
    bio: {
      mk: "Настапи во театарско-музичкиот перформанс „Чекална 4“ на првото издание (2022).",
      en: "Performed in the theatre-music performance “Chekalna 4” at the first edition (2022).",
    },
  },
  {
    slug: "taksi-konzilium",
    name: "Такси Конзилиум",
    nameLocal: "Taksi Konzilium",
    countries: [],
  },
  {
    slug: "dina-jasari-i-drugari",
    name: "Дина Јашари и другари",
    nameLocal: "Dina Jashari & Friends",
    countries: [],
  },
  {
    slug: "letecki-pekinezi",
    name: "Летечки Пекинези",
    nameLocal: "Letechki Pekinezi",
    countries: [],
  },
  {
    slug: "edit-points",
    name: "Edit Points",
    countries: [],
    bio: {
      mk: "DJ/VJ проект — дел од програмата во 2022 и од доцната програма на паркингот на театарот во 2025.",
      en: "DJ/VJ project — part of the 2022 programme and of the late-night parking-lot strand in 2025.",
    },
  },
  {
    slug: "bopheads",
    name: "Bopheads",
    countries: [],
  },
  {
    slug: "shamba",
    name: "Бојан Петков – Шамба",
    nameLocal: "Bojan Petkov – Shamba",
    countries: ["MK"],
    bio: {
      mk: "Настапи на првото издание (2022) и со концерт на второто издание (6 септември 2023).",
      en: "Appeared at the first edition (2022) and opened the second edition with a concert (6 September 2023).",
    },
  },
  {
    slug: "teatar-senki-i-oblaci",
    name: "Театар „Сенки и облаци“",
    nameLocal: "Shadows and Clouds Theatre",
    countries: ["MK"],
  },
  {
    slug: "fotini-potamia",
    name: "Fotini Potamia",
    countries: ["GR"],
    bio: {
      mk: "Фотографка од Грција — изложбата „Nered Music Label“ во Europe House Велес го отвори второто издание (2023).",
      en: "Photographer from Greece — her exhibition “Nered Music Label” at Europe House Veles opened the second edition (2023).",
    },
  },
  {
    slug: "dine-doneff",
    name: "Dine Doneff",
    countries: ["GR"],
    bio: {
      mk: "Музичар и композитор од Грција, повеќекратен гостин на фестивалот: затворањето на второто издание со Јордан Костов (2023), перформансот „Во тек“ (2025) и „Storytales“ (2025).",
      en: "Musician and composer from Greece and a recurring festival guest: the second edition's closing concert with Jordan Kostov (2023), the performance “Vo tek” (2025) and “Storytales” (2025).",
    },
  },
  {
    slug: "jordan-kostov",
    name: "Јордан Костов",
    nameLocal: "Jordan Kostov",
    countries: [],
    bio: {
      mk: "Настапи со Dine Doneff на затворањето на второто издание (13 септември 2023).",
      en: "Performed with Dine Doneff at the second edition's closing concert (13 September 2023).",
    },
  },
  {
    slug: "james-wylie-egli-katsiki",
    name: "James Wylie & Egli Katsiki",
    countries: [],
    bio: {
      mk: "Дуо кое го отвори третото издание кај Спомен-костурницата (29 септември 2024).",
      en: "Duo that opened the third edition at the Memorial Ossuary (29 September 2024).",
    },
  },
  {
    slug: "vlatko-i-lempi",
    name: "Влатко и Лемпи",
    nameLocal: "Vlatko & Lempi",
    countries: [],
    bio: {
      mk: "Настапија во Europe House Велес на отворањето на третото издание (2024).",
      en: "Performed at Europe House Veles on the third edition's opening night (2024).",
    },
  },
  {
    slug: "filip-dinev-martin-gjakonovski-duo",
    name: "Филип Динев / Мартин Ѓаконовски Duo",
    nameLocal: "Filip Dinev / Martin Gjakonovski Duo",
    countries: ["MK", "DE"],
    bio: {
      mk: "Македонско-германско дуо — главна сцена на театарот, трето издание (26 октомври 2024).",
      en: "Macedonian-German duo — theatre main stage, third edition (26 October 2024).",
    },
  },
  {
    slug: "kalata",
    name: "Калата",
    nameLocal: "Kalata",
    countries: ["MK"],
    bio: {
      mk: "Настапи на главната сцена на третото издание (26 октомври 2024).",
      en: "Performed on the main stage at the third edition (26 October 2024).",
    },
  },
  {
    slug: "transverse",
    name: "Transverse",
    countries: ["US", "MK"],
    bio: {
      mk: "Американско-македонски состав — главна сцена на четвртото издание (26 септември 2025).",
      en: "American-Macedonian ensemble — main stage at the fourth edition (26 September 2025).",
    },
  },
  {
    slug: "mccollough-spasovski-tufekchievski-filipovski",
    name: "McCollough / Spasovski / Tufekchievski / Filipovski",
    countries: [],
    bio: {
      mk: "Квартет — главна сцена на четвртото издание (26 септември 2025).",
      en: "Quartet — main stage at the fourth edition (26 September 2025).",
    },
  },
  {
    slug: "parussion-group",
    name: "Parussion Group",
    countries: ["MK"],
    bio: {
      mk: "Македонски состав — главна сцена на четвртото издание (26 септември 2025).",
      en: "Macedonian ensemble — main stage at the fourth edition (26 September 2025).",
    },
  },
  {
    slug: "doneff-doneff-toma-dimovski",
    name: "Doneff Doneff & Toma Dimovski",
    countries: ["GR", "MK"],
    bio: {
      mk: "Грчко-македонска соработка — перформансот „Во тек“ кај Спомен-костурницата (27 септември 2025).",
      en: "Greek-Macedonian collaboration — the performance “Vo tek” at the Memorial Ossuary (27 September 2025).",
    },
  },
  {
    slug: "vlatko-stefanovski-trio",
    name: "Влатко Стефановски Трио",
    nameLocal: "Vlatko Stefanovski Trio",
    countries: ["MK"],
    bio: {
      mk: "Триото на гитаристот Влатко Стефановски, основач на „Леб и сол“ и едно од најпознатите имиња на македонската музика — главна сцена на четвртото издание (27 септември 2025).",
      en: "The trio of guitarist Vlatko Stefanovski, founder of Leb i Sol and one of the best-known names in Macedonian music — main stage at the fourth edition (27 September 2025).",
    },
  },
  {
    slug: "parketi",
    name: "Паркети",
    nameLocal: "Parketi",
    countries: ["MK"],
    bio: {
      mk: "Македонски состав — доцна програма на паркингот на театарот, четврто издание (27 септември 2025).",
      en: "Macedonian band — late-night parking-lot programme, fourth edition (27 September 2025).",
    },
  },
  {
    slug: "nikola-pijanmanov",
    name: "Никола Пијанманов",
    nameLocal: "Nikola Pijanmanov",
    countries: ["MK"],
    bio: {
      mk: "Ликовен уметник — изложбата „Преиспитувања“ (со Тони Попов), четврто издание (2025).",
      en: "Visual artist — the exhibition “Preispituvanja” (with Toni Popov), fourth edition (2025).",
    },
  },
  {
    slug: "toni-popov",
    name: "Тони Попов",
    nameLocal: "Toni Popov",
    countries: ["MK"],
    bio: {
      mk: "Ликовен уметник — изложбата „Преиспитувања“ (со Никола Пијанманов), четврто издание (2025).",
      en: "Visual artist — the exhibition “Preispituvanja” (with Nikola Pijanmanov), fourth edition (2025).",
    },
  },
];
