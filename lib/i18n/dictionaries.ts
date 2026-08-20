import type { Locale } from "./config";

const mk = {
  siteName: "ЏЕЗ ВЕЛЕС",
  siteNameFull: "Фестивал на џез, ворлд и современа музика — Велес",
  siteNameShortNote:
    "Работно кратко име — чека потврда од Арт Генератор.",
  tagline: "Децентрализација и деметрополизација на културата и уметноста.",
  city: "Велес",
  country: "Северна Македонија",

  nav: {
    programa: "Програма",
    izveduvaci: "Изведувачи",
    lokacii: "Локации",
    arhiva: "Архива",
    "za-festivalot": "За фестивалот",
    galerija: "Галерија",
    vesti: "Вести",
    "za-mediumi": "За медиуми",
    partneri: "Партнери",
    kontakt: "Контакт",
  },

  a11y: {
    skipToContent: "Прескокни до содржината",
    mainNav: "Главна навигација",
    footerNav: "Навигација во подножјето",
    switchLang: "Switch to English",
    openMenu: "Отвори мени",
    closeMenu: "Затвори мени",
    breadcrumb: "Патека",
  },

  home: {
    editionOrdinal: "Петто издание",
    datesTba: "Датумите ќе бидат објавени наскоро",
    expectedWindow: "Се очекува септември 2026 — следете ги објавите",
    ctaProgramme: "Кон програмата",
    ctaNotify: "Извести ме за програмата",
    thesisTitle: "Зошто постои фестивалот",
    thesisLead:
      "Велес немаше настани со поинаква уметничка вредност — па основачите одлучија дека не е доволно да се биде жеден за квалитетна културна програма. Мораше нешто да се направи.",
    thesisQuote: "Децентрализација и деметрополизација на културата и уметноста — квалитетна содржина надвор од Скопје.",
    thesisMore: "Повеќе за фестивалот",
    programmePreview: "Од програмата",
    programmeAll: "Целата програма",
    featuredArtists: "Изведувачи",
    allArtists: "Сите изведувачи",
    venuesTitle: "Локации",
    allVenues: "Сите локации",
    latestNews: "Вести",
    allNews: "Сите вести",
    partnersTitle: "Поддржано од",
    allPartners: "Сите партнери и поддржувачи",
    archiveTeaser: "Четири изданија. Седум земји. Едно тврдење.",
    archiveCta: "Архива 2022–2025",
  },

  schedule: {
    title: "Програма",
    matrixCaption: "Распоред по локации и денови",
    filterDay: "Ден",
    filterVenue: "Локација",
    filterType: "Тип",
    filterAll: "Сите",
    filterReset: "Исчисти филтри",
    empty: {
      title: "Програмата се објавува наскоро",
      body: "Петтото издание се очекува во септември 2026. Датумите и составот сè уште не се објавени — оставете е-адреса и ќе ве известиме првите.",
    },
    noResults: "Нема настани за избраните филтри.",
    timeTba: "време наскоро",
    dateTbc: "датум — се потврдува",
    venueTba: "локација — се потврдува",
    day: "Ден",
  },

  event: {
    artists: "Изведувачи",
    venue: "Локација",
    dateTime: "Датум и време",
    type: "Тип",
    admission: "Влез",
    admissionFree: "Слободен влез",
    admissionTicketed: "Со билет",
    admissionTbc: "Информации за влез — наскоро",
    addToCalendar: "Додај во календар",
    share: "Сподели",
    related: "Истата вечер / иста локација",
    backToProgramme: "Назад кон програмата",
    edition: "Издание",
  },

  types: {
    concert: "Концерт",
    exhibition: "Изложба",
    workshop: "Работилница",
    performance: "Перформанс",
    "dj-set": "DJ/VJ сет",
    party: "Журка",
  },

  artists: {
    title: "Изведувачи",
    filterCountry: "Земја",
    filterEdition: "Издание",
    appearances: "Настапи на фестивалот",
    links: "Линкови",
    bioPending: "Биографијата се дополнува.",
    countries: "Земји",
    recurring: "Повеќекратен гостин",
    appearancesLabel: "настапи",
    editionsLabel: "изданија",
    noMatches: "Нема изведувачи за избраните филтри.",
    countTemplate: "изведувачи од 2022 досега",
  },

  venues: {
    title: "Локации",
    address: "Адреса",
    gettingThere: "Како да стигнете",
    accessibility: "Пристапност",
    eventsHere: "Настани на оваа локација",
    pastEventsHere: "Од минатите изданија",
    mapPending: "Мапата ќе биде додадена по потврда на точната адреса.",
    addressPending: "Адресата се потврдува.",
  },

  archive: {
    title: "Архива",
    intro:
      "Запис за испорачаното: секое издание, со програма, земји и партнери. Фестивалот е основан и финансиран од Општина Велес, а организацискиот мандат му е доверен на Арт Генератор.",
    edition: "издание",
    days: "фестивалски денови",
    countries: "земји",
    headliners: "Од програмата",
    partners: "Партнери и спонзори",
    viewEdition: "Кон изданието",
    programme: "Програма на изданието",
    alsoProgrammed: "Исто така во програмата",
    incompleteNote:
      "Програмата за ова издание е реконструирана од прес-извештаи и е нецелосна. Дополнувањата следат по потврда од организаторот.",
    galleryPending: "Фотографиите чекаат потврда на авторските права и кредити.",
    ordinals: { 1: "Прво", 2: "Второ", 3: "Трето", 4: "Четврто", 5: "Петто" },
  },

  about: {
    title: "За фестивалот",
    missionTitle: "Мисија",
    missionBody:
      "Фестивалот е создаден затоа што Велес немаше настани со поинаква уметничка вредност — какви што самите основачи би сакале да посетат. Одлучија дека не е доволно да се биде жеден за квалитетна културна програма; мораше нешто да се направи.",
    missionQuote:
      "Децентрализација и деметрополизација на културата и уметноста.",
    conceptTitle: "Никогаш само музика",
    conceptBody:
      "Од првото издание концептот вклучува видео-проекции, театарски перформанси и течни светлосни проекции со масло и вода. Подоцнежните изданија додадоа фотографски и ликовни изложби, работилници за цијанотипија и архитектонско видео-мапирање. Секоја година фестивалот е меѓународен — досега со изведувачи од САД, Грција, Франција, Германија, Финска, Австралија и Северна Македонија.",
    governanceTitle: "Основање и управување",
    governanceItems: [
      "Фестивалот е основан и финансиран од Општина Велес (Сл. гласник на Општина Велес бр. 01/23).",
      "Организацискиот мандат ѝ е доверен на Здружението за култура, уметност и млади „АРТ ГЕНЕРАТОР“ — Велес, по јавен конкурс.",
      "На 16 јули 2026 Општината повторно го додели мандатот на Арт Генератор за период од три години (2026–2028).",
      "Фестивалот е дополнително поддржан од Министерството за култура и туризам.",
      "Арт Генератор поднесува наративни и финансиски извештаи до Градоначалникот и Советот на Општина Велес.",
    ],
    historyTitle: "Историја",
    teamTitle: "Тим",
    teamVerifyNote:
      "Улогите и транслитерацијата на имињата се според прес-извештаи (2022–2025) и чекаат потврда од организаторот.",
    team: [
      { name: "Борче Пејчев", role: "Организатор / коосновач" },
      { name: "Славчо Коцев", role: "Коосновач" },
      { name: "Сашко Костов", role: "Коосновач, изведувач" },
      { name: "Фаик Мефаилоски", role: "Коосновач, изведувач" },
      { name: "Филип Коруновски", role: "Графички дизајн (2024, 2025)" },
      { name: "Борче Конзулов", role: "Видео-мапирање (2025)" },
    ],
  },

  gallery: {
    title: "Галерија",
    pending:
      "Фотографскиот архив од изданијата 2022–2025 се собира. Објавата чека потврда на авторските права и кредитите на фотографите.",
    pressNote: "Медиуми: висока резолуција има во прес-китот.",
  },

  media: {
    photoCredit: "Фото",
    orgLogoAlt: "Лого на Здружението „АРТ ГЕНЕРАТОР“ — Велес",
    lightboxClose: "Затвори",
    lightboxPrev: "Претходна фотографија",
    lightboxNext: "Следна фотографија",
  },

  video: {
    title: "Видео",
    pending:
      "Афтермуви и видео-записи од изданијата се собираат и чекаат објава.",
    play: "Пушти видео",
    watchExternal: "Гледај го видеото",
  },

  strands: {
    title: "Насоки на програмата",
    lead: "Секое издание досега е градено од овие насоки — низ салата, споменикот и паркингот.",
    eventsLabel: "настани",
    toVenue: "Кон локацијата",
    toArchive: "Кон архивата",
    items: {
      "glavna-scena": {
        name: "Главна сцена",
        desc: "Седечки концерти во салата на Театарот „Ј.Х.К. Џинот“, придружени со видео-мапирање.",
      },
      "otvoranje-performansi": {
        name: "Отворање и перформанси",
        desc: "Отворања, концерти и перформанси на отворено кај Спомен-костурницата.",
      },
      "docna-programa": {
        name: "Доцна програма",
        desc: "DJ/VJ сетови, доцни концерти и завршната журка на паркингот зад театарот.",
      },
      "rabotilnici-izlozbi": {
        name: "Работилници и изложби",
        desc: "Работилници за цијанотипија, фотографски и ликовни изложби.",
      },
    },
  },

  news: {
    title: "Вести",
    readMore: "Прочитај повеќе",
    published: "Објавено",
    backToNews: "Назад кон вестите",
    countLabel: "објави",
    featured: "Најново",
    moreNews: "Повеќе вести",
  },

  press: {
    title: "За медиуми",
    intro:
      "Материјали за новинари: факти, имиња и контакти — точни и употребливи на рок.",
    factSheet: "Факти",
    facts: [
      ["Официјално име", "Фестивал на џез, ворлд и современа музика — Велес"],
      ["Основан", "2022 година"],
      ["Основач и финансиер", "Општина Велес"],
      ["Организатор", "Здружение за култура, уметност и млади „АРТ ГЕНЕРАТОР“ — Велес (мандат 2026–2028)"],
      ["Поддршка", "Министерство за култура и туризам"],
      ["Изданија досега", "4 (2022, 2023, 2024, 2025); петтото се очекува во септември 2026"],
      ["Застапени земји", "САД, Грција, Франција, Германија, Финска, Австралија, Северна Македонија"],
      ["Главни локации", "Театар „Ј.Х.К. Џинот“, Спомен-костурница, Europe House Велес, паркинг на театарот"],
    ],
    boilerplateTitle: "Кратко за фестивалот",
    boilerplateNote: "Текст за употреба во објави.",
    boilerplate:
      "Фестивалот на џез, ворлд и современа музика — Велес е основан во 2022 година од Општина Велес, а организацијата ѝ е доверена на Здружението за култура, уметност и млади „АРТ ГЕНЕРАТОР“ — Велес. Досега се одржани четири изданија, со изведувачи од САД, Грција, Франција, Германија, Финска, Австралија и Северна Македонија, на локации низ градот — од Театарот „Ј.Х.К. Џинот“ до Спомен-костурницата. Петтото издание се очекува во септември 2026.",
    newsTitle: "Последни објави",
    downloadsTitle: "Преземања",
    downloadsPending:
      "Лого-пакет и фотографии во висока резолуција ќе бидат достапни овде по потврда на брендот и фото-кредитите.",
    contactTitle: "Прес-контакт",
    contactPending:
      "Официјалната е-адреса за медиуми се потврдува. Во меѓувреме користете ја контакт-страницата.",
    namesTitle: "Точни имиња",
    namesNote:
      "Фестивалот НЕ се вика „World of Jazz Festival“ — тоа е неповрзан настан во Канада. Точни форми:",
    names: [
      "Фестивал на џез, ворлд и современа музика (официјално, МК)",
      "Festival of Jazz, World and Contemporary Music — Veles (EN)",
    ],
  },

  partners: {
    title: "Партнери и поддржувачи",
    founder: "Основач и финансиер",
    institutional: "Институционална поддршка",
    partner: "Партнери",
    sponsor: "Спонзори",
    media: "Медиумски партнери",
    editionsLabel: "изданија",
  },

  contact: {
    title: "Контакт",
    intro: "Прашања за програмата, билети, медиуми или соработка.",
    detailsPending:
      "Официјалната е-адреса, телефон и поштенска адреса на Арт Генератор се потврдуваат и ќе бидат објавени овде.",
    formName: "Име",
    formEmail: "Е-адреса",
    formSubject: "Тема",
    formMessage: "Порака",
    formSend: "Испрати",
    formSubjectGeneral: "Општо прашање",
    formSubjectPress: "Медиуми",
    formSubjectPartnership: "Партнерство / спонзорство",
    artistTitle: "Пријави настап",
    artistBody:
      "Изведувач сте или агент? Пратете ни линкови до музика, техничка спецификација и кратка биографија. Пријавите се разгледуваат при составување на програмата.",
    artistSubject: "Пријава за настап",
    socialTitle: "Следете нè",
    socialPending: "Официјалните профили се потврдуваат.",
  },

  signup: {
    title: "Дознајте први",
    body: "Оставете е-адреса — ќе ве известиме кога ќе се објават датумите и програмата.",
    placeholder: "vashata@adresa.mk",
    submit: "Пријави се",
    success: "Запишано. Ќе ве известиме.",
    error: "Нешто тргна наопаку — обидете се повторно.",
    notConfigured:
      "Пријавата сè уште не е поврзана. Следете ги објавите на страницата Вести.",
  },

  footer: {
    fullName: "Фестивал на џез, ворлд и современа музика — Велес",
    org: "Организира: Здружение за култура, уметност и млади „АРТ ГЕНЕРАТОР“ — Велес",
    founder: "Основан и финансиран од Општина Велес",
    ministry: "Поддржан од Министерството за култура и туризам",
    mandate: "Мандат 2026–2028",
  },

  notFound: {
    title: "Страницата не е најдена",
    body: "Можеби барате нешто од програмата или архивата?",
    home: "Почетна",
  },

  verify: "се потврдува",
  photoPending: "Фотографија наскоро",
};

type Dict = typeof mk;

const en: Dict = {
  siteName: "JAZZ VELES",
  siteNameFull: "Festival of Jazz, World and Contemporary Music — Veles",
  siteNameShortNote: "Working short name — pending sign-off by Art Generator.",
  tagline: "Decentralising and de-metropolising culture and art.",
  city: "Veles",
  country: "North Macedonia",

  nav: {
    programa: "Programme",
    izveduvaci: "Artists",
    lokacii: "Venues",
    arhiva: "Archive",
    "za-festivalot": "About",
    galerija: "Gallery",
    vesti: "News",
    "za-mediumi": "Press",
    partneri: "Partners",
    kontakt: "Contact",
  },

  a11y: {
    skipToContent: "Skip to content",
    mainNav: "Main navigation",
    footerNav: "Footer navigation",
    switchLang: "Префрли на македонски",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    breadcrumb: "Breadcrumb",
  },

  home: {
    editionOrdinal: "Fifth edition",
    datesTba: "Dates to be announced",
    expectedWindow: "Expected September 2026 — watch this space",
    ctaProgramme: "See the programme",
    ctaNotify: "Notify me about the programme",
    thesisTitle: "Why this festival exists",
    thesisLead:
      "Veles had no events of a different artistic value — so the founders decided it wasn't enough to be thirsty for quality cultural programming. Something had to be done.",
    thesisQuote:
      "Decentralisation and de-metropolisation of culture and art — quality content outside Skopje.",
    thesisMore: "More about the festival",
    programmePreview: "From the programme",
    programmeAll: "Full programme",
    featuredArtists: "Artists",
    allArtists: "All artists",
    venuesTitle: "Venues",
    allVenues: "All venues",
    latestNews: "News",
    allNews: "All news",
    partnersTitle: "Supported by",
    allPartners: "All partners & supporters",
    archiveTeaser: "Four editions. Seven countries. One argument.",
    archiveCta: "Archive 2022–2025",
  },

  schedule: {
    title: "Programme",
    matrixCaption: "Schedule by venue and day",
    filterDay: "Day",
    filterVenue: "Venue",
    filterType: "Type",
    filterAll: "All",
    filterReset: "Clear filters",
    empty: {
      title: "The programme will be announced soon",
      body: "The fifth edition is expected in September 2026. Dates and lineup are not yet public — leave your email and you'll be the first to know.",
    },
    noResults: "No events match the selected filters.",
    timeTba: "time TBA",
    dateTbc: "date to be confirmed",
    venueTba: "venue to be confirmed",
    day: "Day",
  },

  event: {
    artists: "Artists",
    venue: "Venue",
    dateTime: "Date & time",
    type: "Type",
    admission: "Admission",
    admissionFree: "Free entry",
    admissionTicketed: "Ticketed",
    admissionTbc: "Admission details coming soon",
    addToCalendar: "Add to calendar",
    share: "Share",
    related: "Same night / same venue",
    backToProgramme: "Back to programme",
    edition: "Edition",
  },

  types: {
    concert: "Concert",
    exhibition: "Exhibition",
    workshop: "Workshop",
    performance: "Performance",
    "dj-set": "DJ/VJ set",
    party: "Party",
  },

  artists: {
    title: "Artists",
    filterCountry: "Country",
    filterEdition: "Edition",
    appearances: "Festival appearances",
    links: "Links",
    bioPending: "Biography to follow.",
    countries: "Countries",
    recurring: "Returning guest",
    appearancesLabel: "appearances",
    editionsLabel: "editions",
    noMatches: "No artists match the selected filters.",
    countTemplate: "artists since 2022",
  },

  venues: {
    title: "Venues",
    address: "Address",
    gettingThere: "Getting there",
    accessibility: "Accessibility",
    eventsHere: "Events at this venue",
    pastEventsHere: "From past editions",
    mapPending: "Map will be added once the exact address is confirmed.",
    addressPending: "Address being confirmed.",
  },

  archive: {
    title: "Archive",
    intro:
      "A record of delivery: every edition, with programme, countries and partners. The festival was founded and is financed by the Municipality of Veles, with the organising mandate delegated to Art Generator.",
    edition: "edition",
    days: "festival days",
    countries: "countries",
    headliners: "From the programme",
    partners: "Partners & sponsors",
    viewEdition: "View edition",
    programme: "Edition programme",
    alsoProgrammed: "Also programmed",
    incompleteNote:
      "This edition's programme is reconstructed from press coverage and is incomplete. It will be completed once confirmed by the organiser.",
    galleryPending: "Photographs pending rights clearance and photographer credits.",
    ordinals: { 1: "First", 2: "Second", 3: "Third", 4: "Fourth", 5: "Fifth" },
  },

  about: {
    title: "About the festival",
    missionTitle: "Mission",
    missionBody:
      "The festival was created because Veles lacked events of a different artistic value — the kind the founders themselves would want to attend. They decided it wasn't enough to be thirsty for quality cultural programming; something had to be done.",
    missionQuote: "Decentralisation and de-metropolisation of culture and art.",
    conceptTitle: "Never just music",
    conceptBody:
      "From the first edition the concept included video projections, theatre performance and oil-and-water liquid-light projections. Later editions added photography and fine-art exhibitions, cyanotype workshops and architectural video mapping. The festival is international every single year — so far with artists from the USA, Greece, France, Germany, Finland, Australia and North Macedonia.",
    governanceTitle: "Founding & governance",
    governanceItems: [
      "The festival was founded and is financed by the Municipality of Veles (Official Gazette of the Municipality of Veles no. 01/23).",
      "The organising mandate is delegated by public competition to the Association for Culture, Art and Youth “ART GENERATOR” — Veles.",
      "On 16 July 2026 the Municipality re-awarded the mandate to Art Generator for a three-year period (2026–2028).",
      "The festival is additionally supported by the Ministry of Culture and Tourism.",
      "Art Generator files narrative and financial reports to the Mayor and the Municipal Council.",
    ],
    historyTitle: "History",
    teamTitle: "Team",
    teamVerifyNote:
      "Roles and name transliterations are compiled from press coverage (2022–2025) and are pending confirmation by the organiser.",
    team: [
      { name: "Borche Pejchev", role: "Organiser / co-founder" },
      { name: "Slavcho Kocev", role: "Co-founder" },
      { name: "Sashko Kostov", role: "Co-founder, performer" },
      { name: "Faik Mefailoski", role: "Co-founder, performer" },
      { name: "Filip Korunovski", role: "Graphic design (2024, 2025)" },
      { name: "Borche Konzulov", role: "Video mapping (2025)" },
    ],
  },

  gallery: {
    title: "Gallery",
    pending:
      "The photographic archive from the 2022–2025 editions is being assembled. Publication is pending rights clearance and photographer credits.",
    pressNote: "Press: high-resolution images live in the press kit.",
  },

  media: {
    photoCredit: "Photo",
    orgLogoAlt: "Logo of the ART GENERATOR association — Veles",
    lightboxClose: "Close",
    lightboxPrev: "Previous photo",
    lightboxNext: "Next photo",
  },

  video: {
    title: "Video",
    pending:
      "Aftermovies and video recordings from the editions are being collected and await publication.",
    play: "Play video",
    watchExternal: "Watch the video",
  },

  strands: {
    title: "Programme tracks",
    lead: "Every edition so far has been built from these tracks — across the auditorium, the monument and the parking lot.",
    eventsLabel: "events",
    toVenue: "To the venue",
    toArchive: "To the archive",
    items: {
      "glavna-scena": {
        name: "Main stage",
        desc: "Seated concerts in the J.H.K. Dzhinot Theatre auditorium, accompanied by video mapping.",
      },
      "otvoranje-performansi": {
        name: "Openings & performances",
        desc: "Open-air openings, concerts and performances at the Memorial Ossuary.",
      },
      "docna-programa": {
        name: "Late programme",
        desc: "DJ/VJ sets, late concerts and the closing party in the parking lot behind the theatre.",
      },
      "rabotilnici-izlozbi": {
        name: "Workshops & exhibitions",
        desc: "Cyanotype workshops, photography and fine-art exhibitions.",
      },
    },
  },

  news: {
    title: "News",
    readMore: "Read more",
    published: "Published",
    backToNews: "Back to news",
    countLabel: "posts",
    featured: "Latest",
    moreNews: "More news",
  },

  press: {
    title: "Press",
    intro:
      "Materials for journalists: facts, names and contacts — accurate and usable on deadline.",
    factSheet: "Fact sheet",
    facts: [
      ["Official name", "Festival of Jazz, World and Contemporary Music — Veles"],
      ["Founded", "2022"],
      ["Founder & financier", "Municipality of Veles"],
      ["Organiser", "Association for Culture, Art and Youth “ART GENERATOR” — Veles (mandate 2026–2028)"],
      ["Support", "Ministry of Culture and Tourism"],
      ["Editions to date", "4 (2022, 2023, 2024, 2025); the fifth expected September 2026"],
      ["Countries represented", "USA, Greece, France, Germany, Finland, Australia, North Macedonia"],
      ["Main venues", "J.H.K. Dzhinot Theatre, the Memorial Ossuary, Europe House Veles, the theatre parking lot"],
    ],
    boilerplateTitle: "About the festival, in short",
    boilerplateNote: "Copy for use in coverage.",
    boilerplate:
      "The Festival of Jazz, World and Contemporary Music — Veles was founded in 2022 by the Municipality of Veles, with the organisation entrusted to the Association for Culture, Art and Youth “ART GENERATOR” — Veles. Four editions have been held so far, with artists from the USA, Greece, France, Germany, Finland, Australia and North Macedonia, at venues across the city — from the J.H.K. Dzhinot Theatre to the Memorial Ossuary. The fifth edition is expected in September 2026.",
    newsTitle: "Latest announcements",
    downloadsTitle: "Downloads",
    downloadsPending:
      "Logo pack and high-resolution photography will be available here once the brand and photo credits are confirmed.",
    contactTitle: "Press contact",
    contactPending:
      "The official press email is being confirmed. In the meantime, use the contact page.",
    namesTitle: "Getting the name right",
    namesNote:
      "The festival is NOT called “World of Jazz Festival” — that is an unrelated event in Canada. Correct forms:",
    names: [
      "Фестивал на џез, ворлд и современа музика (official, MK)",
      "Festival of Jazz, World and Contemporary Music — Veles (EN)",
    ],
  },

  partners: {
    title: "Partners & supporters",
    founder: "Founder & financier",
    institutional: "Institutional support",
    partner: "Partners",
    sponsor: "Sponsors",
    media: "Media partners",
    editionsLabel: "editions",
  },

  contact: {
    title: "Contact",
    intro: "Questions about the programme, tickets, press or partnership.",
    detailsPending:
      "Art Generator's official email, phone and postal address are being confirmed and will be published here.",
    formName: "Name",
    formEmail: "Email",
    formSubject: "Subject",
    formMessage: "Message",
    formSend: "Send",
    formSubjectGeneral: "General enquiry",
    formSubjectPress: "Press",
    formSubjectPartnership: "Partnership / sponsorship",
    artistTitle: "Artist submissions",
    artistBody:
      "Are you an artist or an agent? Send links to your music, a technical rider and a short bio. Submissions are reviewed when the programme is being assembled.",
    artistSubject: "Artist submission",
    socialTitle: "Follow us",
    socialPending: "Official profiles are being confirmed.",
  },

  signup: {
    title: "Be the first to know",
    body: "Leave your email — we'll let you know when dates and the programme are announced.",
    placeholder: "you@example.com",
    submit: "Sign up",
    success: "Signed up. We'll be in touch.",
    error: "Something went wrong — please try again.",
    notConfigured:
      "Signups aren't connected yet. Follow announcements on the News page.",
  },

  footer: {
    fullName: "Festival of Jazz, World and Contemporary Music — Veles",
    org: "Organised by the Association for Culture, Art and Youth “ART GENERATOR” — Veles",
    founder: "Founded and financed by the Municipality of Veles",
    ministry: "Supported by the Ministry of Culture and Tourism",
    mandate: "Mandate 2026–2028",
  },

  notFound: {
    title: "Page not found",
    body: "Maybe you're looking for the programme or the archive?",
    home: "Home",
  },

  verify: "to be confirmed",
  photoPending: "Photo coming soon",
};

const dictionaries: Record<Locale, Dict> = { mk, en };

export function getDict(locale: Locale): Dict {
  return dictionaries[locale];
}

export type { Dict };
