export type Vacature = {
  slug: string;
  title: string;
  shortLabel: string;
  iconKey:
    | "ls"
    | "ms"
    | "schakel"
    | "kabel"
    | "aarding"
    | "huisaansluiting"
    | "wv"
    | "zzp";
  intro: string;
  meta: {
    regio: string;
    uren: string;
    dienstverband: string;
    niveau: string;
    werkgebied: string;
    bevoegdheden: string;
  };
  taken: string[];
  meebrengen: string[];
  bieden: string[];
  veiligheid: string;
};

const standaardMeta = {
  regio: "Nederland / projectlocaties",
  uren: "32–40 uur of projectbasis",
  dienstverband: "Loondienst, projectbasis of ZZP",
  niveau: "MBO / praktijkervaring",
  werkgebied: "LS/MS-infrastructuur, stationswerk, aarding of aansluitwerk",
};

const standaardBieden = [
  "Werk binnen professionele projecten in de netbeheeromgeving",
  "Marktconforme beloning of ZZP-tarief",
  "Heldere werkomschrijvingen en planning",
  "Veiligheidsgerichte werkomgeving (BEI BLS/BHS waar van toepassing, NEN 3140 / NEN 3840, VCA)",
  "Korte lijnen met planning en uitvoering",
  "Afwisselende projecten binnen LS/MS-infrastructuur",
];

const standaardVeiligheid =
  "Bij TerreVolt staat veilig werken voorop. Per project stellen we vast welke veiligheidsregelgeving van toepassing is. Binnen netbeheeromgevingen werken we volgens de toepasselijke BEI BLS/BHS, VWI's, opdrachten en persoonsgebonden aanwijzingen; daarbuiten volgens de regels van opdrachtgever of beheerder, met NEN 3140 / NEN 3840 als basis. VCA, LMRA en passende PBM's horen bij iedere taak.";

export const vacatures: Vacature[] = [
  {
    slug: "laagspanningsmonteur",
    title: "Laagspanningsmonteur",
    shortLabel: "Laagspanningsmonteurs",
    iconKey: "ls",
    intro:
      "Als laagspanningsmonteur bij TerreVolt werk je aan projecten binnen het LS-net: aansluitingen, verdeelinrichtingen, LS-rekken, kabelwerk en saneringen. Je werkt op projectlocaties voor professionele opdrachtgevers binnen de netbeheerwereld.",
    meta: { ...standaardMeta, bevoegdheden: "VCA vereist; BEI BLS-aanwijzing afhankelijk van taak en project" },
    taken: [
      "LS-kabels aansluiten en afwerken",
      "Werkzaamheden uitvoeren aan LS-rekken en verdeelinrichtingen",
      "Ondersteunen bij huisaansluitingen, saneringen en wijzigingen",
      "Kabels controleren, labelen en netjes opleveren",
      "Werken volgens veiligheidsprocedures en projectafspraken",
      "Afstemmen met uitvoerder, werkverantwoordelijke of ploegleider",
    ],
    meebrengen: [
      "Ervaring met laagspanningswerk",
      "VCA",
      "Rijbewijs B",
      "BEI BLS-aanwijzing afhankelijk van taak en project; opleiding of certificaat is nog geen aanwijzing",
      "Je werkt netjes, veilig en zelfstandig",
      "Je communiceert duidelijk op projectlocaties",
    ],
    bieden: standaardBieden,
    veiligheid: standaardVeiligheid,
  },
  {
    slug: "middenspanningsmonteur",
    title: "Middenspanningsmonteur",
    shortLabel: "Middenspanningsmonteurs",
    iconKey: "ms",
    intro:
      "Als middenspanningsmonteur werk je aan MS-installaties, kabelafmontage, stationsrenovaties en technische ruimten. Je ondersteunt bij projecten waar veiligheid, vakkennis en nauwkeurige uitvoering essentieel zijn.",
    meta: { ...standaardMeta, bevoegdheden: "VCA vereist; BEI BHS-aanwijzing afhankelijk van taak en project" },
    taken: [
      "MS-kabels voorbereiden, invoeren en afmonteren",
      "Ondersteunen bij MS-eindsluitingen en verbindingsmoffen",
      "Werken aan RMU's, MS-velden en transformatorstations",
      "Ondersteunen bij stationsrenovaties",
      "Samenwerken met schakelmonteurs, WV/AVP en uitvoerders",
      "Werkzaamheden controleren en terugkoppelen",
    ],
    meebrengen: [
      "Ervaring binnen middenspanning of kabelmontage",
      "VCA",
      "BEI BHS-aanwijzing afhankelijk van taak en werkgebied; opleiding of certificaat is nog geen aanwijzing",
      "Ervaring met MS-eindsluitingen is een pré",
      "Veiligheidsbewuste en nauwkeurige werkhouding",
      "Rijbewijs B",
    ],
    bieden: standaardBieden,
    veiligheid: standaardVeiligheid,
  },
  {
    slug: "schakelmonteur",
    title: "Schakelmonteur LS/MS",
    shortLabel: "Schakelmonteurs",
    iconKey: "schakel",
    intro:
      "Als schakelmonteur ondersteun je bij het veilig in- en uitbedrijf nemen, vrijschakelen, veiligstellen en terugschakelen van LS/MS-installaties. Je werkt aan geplande projecten zoals stationsrenovaties, kabelwerk en onderhoud.",
    meta: { ...standaardMeta, bevoegdheden: "VCA vereist; geldige BEI-aanwijzing passend bij taak en werkgebied" },
    taken: [
      "Schakelhandelingen voorbereiden en uitvoeren binnen jouw bevoegdheid",
      "Installaties of netdelen vrijschakelen en veiligstellen",
      "Ondersteunen bij aarden en kortsluiten",
      "Werken volgens bedieningsplan, werkplan, toepasselijke VWI en projectafspraken",
      "Communiceren met WV, ploegleider, uitvoerder en monteurs",
      "Afwijkingen of onveilige situaties direct melden",
    ],
    meebrengen: [
      "Ervaring met schakelwerk binnen LS en/of MS",
      "Geldige BEI-aanwijzing passend bij taak en werkgebied",
      "VCA",
      "Ervaring met netbeheerprocedures is een pré",
      "Rust, discipline en duidelijke communicatie",
      "Bereidheid om projectmatig te werken",
    ],
    bieden: standaardBieden,
    veiligheid: standaardVeiligheid,
  },
  {
    slug: "kabelmonteur",
    title: "Kabelmonteur LS/MS",
    shortLabel: "Kabelmonteurs",
    iconKey: "kabel",
    intro:
      "Als kabelmonteur werk je aan kabelverbindingen binnen laag- en middenspanningsprojecten. Je ondersteunt bij aanleg, montage, afwerking en controle van kabelwerk in technische ruimten, stations en tracés.",
    meta: { ...standaardMeta, bevoegdheden: "VCA, kennis LS/MS-kabelwerk (pré)" },
    taken: [
      "LS- en/of MS-kabels monteren en afwerken",
      "Kabels invoeren in stations en technische ruimten",
      "Ondersteunen bij verbindingsmoffen, aftakmoffen en eindsluitingen",
      "Kabels labelen, controleren en opleveren",
      "Samenwerken met monteurs, uitvoerders en werkvoorbereiding",
      "Veilig werken volgens projectafspraken",
    ],
    meebrengen: [
      "Ervaring met kabelmontage",
      "Kennis van LS/MS-kabelwerk is een pré",
      "VCA",
      "Rijbewijs B",
      "Je werkt nauwkeurig en veilig",
      "Je bent fysiek inzetbaar en praktisch ingesteld",
    ],
    bieden: standaardBieden,
    veiligheid: standaardVeiligheid,
  },
  {
    slug: "aardingsmonteur",
    title: "Aardingsmonteur",
    shortLabel: "Aardingsmonteurs",
    iconKey: "aarding",
    intro:
      "Als aardingsmonteur werk je aan de basis van veilige elektrotechnische infrastructuur. Je plaatst, verbetert en controleert aardingsvoorzieningen voor stations, technische ruimten en industriële installaties.",
    meta: { ...standaardMeta, bevoegdheden: "VCA, ervaring aardingsmetingen (pré)" },
    taken: [
      "Aardelektroden plaatsen",
      "Aardingsvoorzieningen aanleggen of verbeteren",
      "Potentiaalvereffening aanbrengen",
      "Ondersteunen bij aardverspreidingsmetingen",
      "Bestaande aardingssystemen inspecteren",
      "Meetgegevens en uitvoering terugkoppelen",
    ],
    meebrengen: [
      "Ervaring met elektrotechniek, infra of aarding",
      "VCA",
      "Technisch inzicht",
      "Nauwkeurige en veilige werkhouding",
      "Rijbewijs B",
      "Ervaring met aardingsmetingen is een pré",
    ],
    bieden: standaardBieden,
    veiligheid: standaardVeiligheid,
  },
  {
    slug: "monteur-huisaansluitingen",
    title: "Monteur huisaansluitingen / LS-aansluitwerk",
    shortLabel: "Monteurs huisaansluitingen",
    iconKey: "huisaansluiting",
    intro:
      "Als monteur huisaansluitingen werk je aan aanleg, wijziging, sanering en herstel van laagspanningsaansluitingen. Je werkt projectmatig aan aansluitingen voor woningen, appartementencomplexen en bedrijfspanden.",
    meta: { ...standaardMeta, bevoegdheden: "VCA vereist; BEI BLS-aanwijzing afhankelijk van taak en project" },
    taken: [
      "Nieuwe LS-aansluitingen realiseren",
      "Bestaande aansluitingen wijzigen of saneren",
      "Werken aan aansluitkabels en meterkastomgeving",
      "Ondersteunen bij laagbouw- en hoogbouwprojecten",
      "Storingen of afwijkingen signaleren",
      "Werkzaamheden netjes afronden en terugkoppelen",
    ],
    meebrengen: [
      "Ervaring met huisaansluitingen of LS-aansluitwerk",
      "VCA",
      "BEI BLS-aanwijzing afhankelijk van taak en project; opleiding of certificaat is nog geen aanwijzing",
      "Klantgerichte maar zakelijke houding",
      "Rijbewijs B",
      "Veilig en zelfstandig kunnen werken",
    ],
    bieden: standaardBieden,
    veiligheid: standaardVeiligheid,
  },
  {
    slug: "werkverantwoordelijke",
    title: "Werkverantwoordelijke LS/MS",
    shortLabel: "Werkverantwoordelijken",
    iconKey: "wv",
    intro:
      "Als werkverantwoordelijke ondersteun je bij de veilige voorbereiding en uitvoering van LS/MS-projecten. Je bewaakt de juiste werkmethode, veiligheidsafspraken en afstemming tussen opdrachtgever, uitvoering en monteurs.",
    meta: {
      ...standaardMeta,
      niveau: "MBO 4 elektrotechniek of aantoonbare praktijkervaring",
      bevoegdheden: "VCA vereist; aanwijzing als werkverantwoordelijke (WV) binnen BEI BLS/BHS",
    },
    taken: [
      "Werkmethodes en risico's beoordelen",
      "Veiligheidsmaatregelen afstemmen",
      "Werkplekken vrijgeven binnen de eigen aanwijzing, opdracht en werkgrenzen",
      "Monteurs begeleiden en aanspreken op veilig werken",
      "Schakelen met uitvoerders, planners en opdrachtgevers",
      "Afwijkingen registreren en opvolgen",
    ],
    meebrengen: [
      "MBO 4 elektrotechniek of aantoonbare praktijkervaring",
      "Aanwijzing als werkverantwoordelijke (WV) binnen BEI BLS/BHS, passend bij het werkgebied",
      "Ervaring binnen netbeheerprojecten",
      "Leidinggevende of coördinerende ervaring",
      "Duidelijke communicatie",
      "Veiligheid staat bij jou altijd op één",
    ],
    bieden: standaardBieden,
    veiligheid: standaardVeiligheid,
  },
  {
    slug: "zzp-ploegen",
    title: "ZZP-ploegen LS/MS",
    shortLabel: "ZZP-ploegen",
    iconKey: "zzp",
    intro:
      "TerreVolt werkt samen met zelfstandige monteurs en complete ploegen voor projecten binnen LS/MS-infrastructuur, stationsrenovatie, schakelwerk, kabelmontage en aarding.",
    meta: {
      ...standaardMeta,
      dienstverband: "ZZP / ploeg op projectbasis",
      bevoegdheden: "VCA en KvK vereist; aanwijzingen passend bij taak en werkgebied",
    },
    taken: [
      "LS/MS-netmontage",
      "Stationsrenovaties",
      "LS-rekken vervangen",
      "Kabelmontage",
      "Huisaansluitingen",
      "Aardingswerk",
      "Meten en opleveren",
      "Projectmatige ondersteuning",
    ],
    meebrengen: [
      "Aantoonbare ervaring",
      "VCA",
      "KvK-inschrijving",
      "Passende verzekeringen",
      "Geldige aanwijzingen en certificaten passend bij taak en werkgebied",
      "Eigen gereedschap waar van toepassing",
      "Veilig en professioneel werken",
      "Duidelijke communicatie en betrouwbare inzet",
    ],
    bieden: [
      "Projectmatige inzet",
      "Duidelijke werkopdracht",
      "Professionele opdrachtgevers",
      "Korte lijnen",
      "Heldere afspraken over planning, scope en uren",
      "Mogelijkheid tot langdurige samenwerking",
    ],
    veiligheid: standaardVeiligheid,
  },
];

export const findVacature = (slug?: string) =>
  vacatures.find((v) => v.slug === slug);
