/**
 * Centrale vacaturedata TerreVolt.
 * Alle zeven functies zijn rechtstreeks in loondienst bij TerreVolt.
 * Zichtbare tekst, kaarten en JobPosting-schema gebruiken deze waarden.
 */

export const REGIOS = [
  "Noord-Holland",
  "Zuid-Holland",
  "Gelderland",
  "Flevoland",
] as const;

export const REGIO_LABEL = "Noord-Holland, Zuid-Holland, Gelderland en Flevoland";
export const UREN_LABEL = "32–40 uur";
export const CONTRACT_LABEL = "Jaarcontract → vast";
export const CONTRACT_LABEL_LANG = "Jaarcontract met uitzicht op een vast contract";
export const DIENSTVERBAND_LABEL = "Rechtstreeks in loondienst bij TerreVolt";

export const SALARIS_DISCLAIMER =
  "Bruto per maand op basis van 40 uur, exclusief 8% vakantiegeld en toeslagen. Afhankelijk van ervaring, opleiding en verantwoordelijkheden. Bij een parttime dienstverband geldt het salaris naar rato.";

/** Arbeidsvoorwaarden — identiek op hoofdpagina en alle vacaturepagina's. */
export const ARBEIDSVOORWAARDEN: string[] = [
  "Jaarcontract met uitzicht op een vast contract",
  "32–40 uur per week",
  "8% vakantiegeld",
  "25 vakantiedagen en 13 ADV-dagen bij een fulltime dienstverband, naar rato bij parttime",
  "Een goede pensioenregeling",
  "Een volledig uitgeruste werkbus met tank- of laadpas voor functies waarvoor een bus nodig is",
  "Professioneel gereedschap en gekeurde meetmiddelen",
  "Werkkleding en alle benodigde persoonlijke beschermingsmiddelen",
  "Zakelijke telefoon en waar nodig een tablet",
  "Benodigde vakopleidingen, certificeringen en herhalingsopleidingen volledig betaald door TerreVolt, inclusief opleidingstijd",
  "Overwerk, reisuren en eventuele storingsdiensten worden apart vergoed; de afspraken staan vooraf in het aanbod en contract",
];

/** Vijf stappen in het sollicitatieproces. */
export const SOLLICITATIEPROCES: string[] = [
  "Reageer online, bel of stuur een WhatsApp.",
  "Tobesh neemt binnen twee werkdagen contact met je op.",
  "We bespreken je ervaring, wensen en de werkzaamheden.",
  "Je ontvangt een duidelijk aanbod met salaris en arbeidsvoorwaarden.",
  "Na je onboarding en veiligheidsinstructies ga je goed voorbereid aan de slag.",
];

export const AANWIJZING_TEKST =
  "Een eerdere BEI-aanwijzing is een voordeel, maar een aanwijzing is werkgevers- en werkzaamhedengebonden. TerreVolt beoordeelt vóór inzet welke aanwijzing nodig is en verstrekt deze pas nadat opleiding, ervaring, instructie en geschiktheid zijn vastgesteld.";

export type Salaris = { min: number; max: number };

export type Vacature = {
  slug: string;
  /** Oude of zoekwoordvarianten van de slug; 301 naar de canonieke slug. */
  aliases?: string[];
  title: string;
  /** H1 op de detailpagina — zoekwoordgericht. */
  h1?: string;
  /** Zoekwoorden voor metadata en JobPosting-schema. */
  keywords?: string[];
  shortLabel: string;
  iconKey:
    | "ls"
    | "ms"
    | "schakel"
    | "aarding"
    | "huisaansluiting"
    | "wv";
  /** Publicatie- of laatste inhoudelijke wijzigingsdatum (ISO). */
  datePosted: string;
  salaris: Salaris;
  intro: string;
  /** Korte kernomschrijving voor kaarten en schema. */
  samenvatting: string;
  meta: {
    regio: string;
    uren: string;
    dienstverband: string;
    contract: string;
    niveau: string;
    werkgebied: string;
    bevoegdheden: string;
  };
  taken: string[];
  meebrengen: string[];
  veiligheid: string;
};

export const formatSalaris = (s: Salaris) =>
  `€${s.min.toLocaleString("nl-NL")} – €${s.max.toLocaleString("nl-NL")}`;

/** Vacatures blijven een jaar geldig na plaatsing (JobPosting validThrough). */
export const validThrough = (datePosted: string) => {
  const d = new Date(datePosted);
  d.setFullYear(d.getFullYear() + 1);
  return d.toISOString().slice(0, 10);
};


const standaardMeta = {
  regio: REGIO_LABEL,
  uren: UREN_LABEL,
  dienstverband: DIENSTVERBAND_LABEL,
  contract: CONTRACT_LABEL_LANG,
  niveau: "MBO / praktijkervaring",
  werkgebied: "LS/MS-infrastructuur, stationswerk, aarding of aansluitwerk",
};

const standaardVeiligheid =
  "Bij TerreVolt staat veilig werken voorop. Per project stellen we vast welke veiligheidsregelgeving van toepassing is. Binnen netbeheeromgevingen werken we volgens de toepasselijke BEI BLS/BHS, VWI's, opdrachten en persoonsgebonden aanwijzingen; daarbuiten volgens de regels van opdrachtgever of beheerder, met NEN 3140 / NEN 3840 als basis. VCA, LMRA en passende PBM's horen bij iedere taak. " +
  AANWIJZING_TEKST;

export const vacatures: Vacature[] = [
  {
    slug: "elektromonteur-laagspanning",
    aliases: ["laagspanningsmonteur", "vacature-laagspanningsmonteur", "elektromonteur-ls"],
    title: "Elektromonteur laagspanning (LS)",
    h1: "Vacature elektromonteur laagspanning (LS)",
    keywords: ["vacature elektromonteur", "elektromonteur gezocht", "laagspanningsmonteur", "vacature monteur elektrotechniek"],
    shortLabel: "Laagspanningsmonteur",
    iconKey: "ls",
    datePosted: "2026-08-18",
    salaris: { min: 3100, max: 4400 },
    samenvatting:
      "Aanleggen, aansluiten, onderhouden en controleren van laagspanningsnetten en installaties.",
    intro:
      "Als laagspanningsmonteur werk je rechtstreeks in loondienst bij TerreVolt aan laagspanningsnetten en -installaties: aansluitingen, verdeelinrichtingen, LS-rekken, kabelwerk en saneringen.",
    meta: { ...standaardMeta, bevoegdheden: "VCA; BEI BLS-aanwijzing afhankelijk van taak en werkgebied" },
    taken: [
      "Laagspanningsnetten en -installaties aanleggen en aansluiten",
      "LS-kabels aansluiten, afwerken en labelen",
      "Werkzaamheden uitvoeren aan LS-rekken en verdeelinrichtingen",
      "Installaties controleren, onderhouden en netjes opleveren",
      "Werken volgens werkplan, instructies en projectafspraken",
      "Afstemmen met werkverantwoordelijke, ploegleider en uitvoerder",
    ],
    meebrengen: [
      "Ervaring met laagspanningswerk",
      "VCA of de bereidheid dit te halen (TerreVolt betaalt)",
      "Rijbewijs B",
      "Je werkt netjes, veilig en zelfstandig",
      "Je communiceert duidelijk op de werklocatie",
    ],
    veiligheid: standaardVeiligheid,
  },
  {
    slug: "elektromonteur-middenspanning",
    aliases: ["middenspanningsmonteur", "vacature-middenspanningsmonteur", "elektromonteur-ms"],
    title: "Elektromonteur middenspanning (MS)",
    h1: "Vacature elektromonteur middenspanning (MS)",
    keywords: ["vacature elektromonteur middenspanning", "middenspanningsmonteur", "elektromonteur gezocht", "MS-monteur"],
    shortLabel: "Middenspanningsmonteur",
    iconKey: "ms",
    datePosted: "2026-08-18",
    salaris: { min: 3300, max: 4900 },
    samenvatting:
      "Werken aan middenspanningskabels, verbindingen, installaties en stations volgens goedgekeurde werkplannen.",
    intro:
      "Als middenspanningsmonteur werk je in loondienst bij TerreVolt aan MS-kabels, verbindingen, installaties en stations. Je werkt altijd volgens goedgekeurde werkplannen.",
    meta: { ...standaardMeta, bevoegdheden: "VCA; BEI BHS-aanwijzing afhankelijk van taak en werkgebied" },
    taken: [
      "MS-kabels voorbereiden, invoeren en afmonteren",
      "MS-eindsluitingen en verbindingsmoffen maken of ondersteunen",
      "Werken aan RMU's, MS-velden en transformatorstations",
      "Ondersteunen bij stationsrenovaties",
      "Werken volgens goedgekeurde werkplannen en instructies",
      "Uitvoering controleren en terugkoppelen",
    ],
    meebrengen: [
      "Ervaring binnen middenspanning of kabelmontage",
      "VCA of de bereidheid dit te halen (TerreVolt betaalt)",
      "Ervaring met MS-eindsluitingen is een pré",
      "Nauwkeurige en veiligheidsbewuste werkhouding",
      "Rijbewijs B",
    ],
    veiligheid: standaardVeiligheid,
  },
  {
    slug: "elektromonteur-laagspanning-middenspanning",
    aliases: ["schakelmonteur", "schakelmonteur-ls-ms", "vacature-schakelmonteur"],
    title: "Schakelmonteur LS/MS",
    h1: "Vacature elektromonteur laagspanning en middenspanning (schakelmonteur LS/MS)",
    keywords: ["vacature elektromonteur", "schakelmonteur", "laagspanning middenspanning", "elektromonteur gezocht"],
    shortLabel: "Schakelmonteur LS/MS",
    iconKey: "schakel",
    datePosted: "2026-08-18",
    salaris: { min: 3600, max: 5200 },
    samenvatting:
      "Veilig uitvoeren en controleren van schakelhandelingen binnen de bevoegdheden en goedgekeurde schakel- en werkplannen.",
    intro:
      "Als schakelmonteur voer je in loondienst bij TerreVolt schakelhandelingen uit binnen je bevoegdheden en volgens goedgekeurde schakel- en werkplannen.",
    meta: { ...standaardMeta, bevoegdheden: "VCA; BEI-aanwijzing passend bij taak en werkgebied" },
    taken: [
      "Schakelhandelingen voorbereiden, uitvoeren en controleren binnen je bevoegdheid",
      "Installaties of netdelen vrijschakelen en veiligstellen",
      "Aarden en kortsluiten volgens bedieningsplan",
      "Werken volgens bedieningsplan, werkplan en toepasselijke VWI",
      "Communiceren met werkverantwoordelijke, ploegleider en monteurs",
      "Afwijkingen of onveilige situaties direct melden",
    ],
    meebrengen: [
      "Ervaring met schakelwerk binnen LS en/of MS",
      "VCA of de bereidheid dit te halen (TerreVolt betaalt)",
      "Rust, discipline en duidelijke communicatie",
      "Ervaring met netbeheerprocedures is een pré",
      "Rijbewijs B",
    ],
    veiligheid: standaardVeiligheid,
  },
  {
    slug: "aardingsmonteur",
    aliases: ["vacature-aardingsmonteur", "monteur-aarding"],
    title: "Aardingsmonteur",
    h1: "Vacature aardingsmonteur",
    keywords: ["vacature aardingsmonteur", "elektromonteur gezocht", "aarding monteur"],
    shortLabel: "Aardingsmonteur",
    iconKey: "aarding",
    datePosted: "2026-08-18",
    salaris: { min: 3000, max: 4000 },
    samenvatting:
      "Aanleggen, meten, controleren en onderhouden van aardings- en waar van toepassing bliksembeveiligingsinstallaties, inclusief rapportage van meetresultaten.",
    intro:
      "Als aardingsmonteur werk je in loondienst bij TerreVolt aan aardingsinstallaties en, waar van toepassing, bliksembeveiliging. Je meet, controleert en rapporteert je resultaten.",
    meta: { ...standaardMeta, bevoegdheden: "VCA; ervaring met aardingsmetingen is een pré" },
    taken: [
      "Aardelektroden plaatsen en aardingsvoorzieningen aanleggen",
      "Potentiaalvereffening aanbrengen",
      "Aardverspreidingsweerstand meten en controleren",
      "Bliksembeveiligingsinstallaties onderhouden waar van toepassing",
      "Bestaande aardingssystemen inspecteren en verbeteren",
      "Meetresultaten vastleggen en rapporteren",
    ],
    meebrengen: [
      "Ervaring met elektrotechniek, infra of aarding",
      "VCA of de bereidheid dit te halen (TerreVolt betaalt)",
      "Technisch inzicht en nauwkeurigheid",
      "Rijbewijs B",
      "Ervaring met aardingsmetingen is een pré",
    ],
    veiligheid: standaardVeiligheid,
  },
  {
    slug: "monteur-huisaansluitingen",
    aliases: ["vacature-monteur-huisaansluitingen", "aansluitmonteur"],
    title: "Monteur huisaansluitingen",
    h1: "Vacature monteur huisaansluitingen",
    keywords: ["vacature monteur huisaansluitingen", "aansluitmonteur", "elektromonteur gezocht"],
    shortLabel: "Monteur huisaansluitingen",
    iconKey: "huisaansluiting",
    datePosted: "2026-08-18",
    salaris: { min: 3100, max: 4300 },
    samenvatting:
      "Aanleggen, aanpassen en vervangen van huisaansluitingen en werkzaamheden in of rond de meterkast, met duidelijke communicatie naar bewoners.",
    intro:
      "Als monteur huisaansluitingen werk je in loondienst bij TerreVolt aan nieuwe, gewijzigde en vervangen huisaansluitingen. Je werkt in en rond de meterkast en communiceert duidelijk met bewoners.",
    meta: { ...standaardMeta, bevoegdheden: "VCA; BEI BLS-aanwijzing afhankelijk van taak en werkgebied" },
    taken: [
      "Nieuwe huisaansluitingen realiseren",
      "Bestaande aansluitingen aanpassen, vervangen of saneren",
      "Werken aan aansluitkabels en de meterkastomgeving",
      "Werken in laagbouw- en hoogbouwprojecten",
      "Bewoners duidelijk informeren over de werkzaamheden",
      "Werk netjes afronden en terugkoppelen",
    ],
    meebrengen: [
      "Ervaring met huisaansluitingen of LS-aansluitwerk",
      "VCA of de bereidheid dit te halen (TerreVolt betaalt)",
      "Klantgerichte en zakelijke houding",
      "Rijbewijs B",
      "Je werkt veilig en zelfstandig",
    ],
    veiligheid: standaardVeiligheid,
  },
  {
    slug: "werkverantwoordelijke-ls-ms",
    aliases: ["werkverantwoordelijke", "vacature-werkverantwoordelijke"],
    title: "Werkverantwoordelijke LS/MS",
    h1: "Vacature werkverantwoordelijke LS/MS (WV)",
    keywords: ["vacature werkverantwoordelijke", "WV elektrotechniek", "vacature elektromonteur middenspanning"],
    shortLabel: "Werkverantwoordelijke LS/MS",
    iconKey: "wv",
    datePosted: "2026-08-18",
    salaris: { min: 4300, max: 6200 },
    samenvatting:
      "Voorbereiden en beoordelen van werkzaamheden, bewaken van risico's, werk- en schakelplannen, instructies, toezicht, kwaliteit en naleving van de BEI.",
    intro:
      "Als werkverantwoordelijke werk je in loondienst bij TerreVolt aan de veilige voorbereiding, beoordeling en begeleiding van LS/MS-werkzaamheden.",
    meta: {
      ...standaardMeta,
      niveau: "MBO 4 elektrotechniek of aantoonbare praktijkervaring",
      bevoegdheden: "VCA; aanwijzing als werkverantwoordelijke binnen BEI BLS/BHS",
    },
    taken: [
      "Werkzaamheden voorbereiden en beoordelen",
      "Risico's, werkplannen en schakelplannen bewaken",
      "Instructies geven en toezicht houden op de werkplek",
      "Werkplekken vrijgeven binnen je aanwijzing, opdracht en werkgrenzen",
      "Kwaliteit en naleving van de BEI bewaken",
      "Afwijkingen registreren en opvolgen",
    ],
    meebrengen: [
      "MBO 4 elektrotechniek of aantoonbare praktijkervaring",
      "Ervaring binnen netbeheerprojecten",
      "Coördinerende of leidinggevende ervaring",
      "Duidelijke communicatie",
      "Veiligheid staat bij jou altijd op één",
    ],
    veiligheid: standaardVeiligheid,
  },
];

/** Strakke meta descriptions (±120-155 tekens) per vacatureslug. */
export const VACATURE_META_DESCRIPTIONS: Record<string, string> = {
  "elektromonteur-middenspanning":
    "Vacature elektromonteur middenspanning bij TerreVolt. Werk aan MS-installaties, schakelwerk en netbeheerprojecten. Salaris en opleiding duidelijk.",
  "elektromonteur-laagspanning-middenspanning":
    "Vacature elektromonteur LS/MS bij TerreVolt. Werk aan laag- en middenspanning, schakelwerk en netmontage. Direct in loondienst.",
  "aardingsmonteur":
    "Vacature aardingsmonteur bij TerreVolt. Werk aan aardpennen, aardingsmetingen en veilige installaties. Opleiding en doorgroei mogelijk.",
  "monteur-huisaansluitingen":
    "Vacature monteur huisaansluitingen bij TerreVolt. Werk aan aansluitingen in de regio met duidelijke voorwaarden, begeleiding en opleiding.",
  "werkverantwoordelijke-ls-ms":
    "Vacature werkverantwoordelijke LS/MS bij TerreVolt. Borg veiligheid, aanwijzingen en uitvoering binnen laag- en middenspanningsprojecten.",
};

export const findVacature = (slug?: string) =>
  vacatures.find((v) => v.slug === slug);

/** Zoek een vacature op oude/zoekwoordvariant van de slug (voor 301-redirect). */
export const findVacatureByAlias = (slug?: string) =>
  slug ? vacatures.find((v) => v.aliases?.includes(slug)) : undefined;
