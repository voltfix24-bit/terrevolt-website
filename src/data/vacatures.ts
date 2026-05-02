export type Vacature = {
  slug: string;
  title: string;
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

export const vacatures: Vacature[] = [
  {
    slug: "ls-ms-monteur",
    title: "LS/MS Monteur",
    intro:
      "Werk mee aan netmontage- en stationsprojecten voor netbeheerders en hoofdaannemers. Je voert LS- en MS-werkzaamheden uit binnen een veilige en goed georganiseerde werkomgeving.",
    meta: {
      regio: "Midden-Nederland",
      uren: "32–40 uur",
      dienstverband: "Vast of ZZP",
      niveau: "Mbo 3/4 elektrotechniek",
      werkgebied: "Heel Nederland",
      bevoegdheden: "VCA, BEI BLS/BHS, NEN 3140",
    },
    taken: [
      "Monteren en aansluiten van LS- en MS-kabels",
      "Werkzaamheden in stations en verdeelinrichtingen",
      "Uitvoeren van schakelhandelingen onder begeleiding van een WV",
      "Aansluiten en testen van componenten",
      "Werken volgens werkomschrijving en veiligheidsregels",
    ],
    meebrengen: [
      "Mbo-niveau elektrotechniek of vergelijkbare ervaring",
      "VCA en bij voorkeur BEI/NEN 3140 aanwijzing",
      "Zelfstandig, veiligheidsbewust en betrouwbaar",
      "Rijbewijs B",
      "Pré: ervaring binnen netbeheerprojecten",
    ],
    bieden: [
      "Marktconforme beloning of ZZP-tarief",
      "Afwisselende projecten binnen LS/MS-infrastructuur",
      "Korte lijnen met planning en uitvoering",
      "Heldere werkomschrijvingen en planningen",
      "Werken met professioneel materieel",
    ],
    veiligheid:
      "Bij TerreVolt staat veilig werken voorop. We werken volgens BEI, NEN 3140 en VCA, met duidelijke aanwijzingen, LMRA en passende PBM's voor iedere taak.",
  },
  {
    slug: "schakelmonteur",
    title: "Schakelmonteur",
    intro:
      "Verantwoordelijk voor schakelhandelingen, veiligstellen en in/uit bedrijf nemen van LS/MS-installaties bij netbeheerders en industriële opdrachtgevers.",
    meta: {
      regio: "Heel Nederland",
      uren: "36–40 uur",
      dienstverband: "Vast of ZZP",
      niveau: "Mbo 4 / aanwijzing WV",
      werkgebied: "Stations & verdeelinrichtingen",
      bevoegdheden: "BEI WV, NEN 3140 WV, VCA-VOL",
    },
    taken: [
      "Veiligstellen van LS/MS-installaties",
      "Uitvoeren van schakelhandelingen volgens schakelplan",
      "Coördinatie met netbeheerder en uitvoerend monteurs",
      "Toezicht op veilige werkomgeving",
      "Documenteren van schakelacties",
    ],
    meebrengen: [
      "Aanwijzing WV (BEI en/of NEN 3140)",
      "Ruime ervaring met MS-schakelwerk",
      "Sterke veiligheidsfocus en communicatieve vaardigheden",
      "VCA-VOL en rijbewijs B",
    ],
    bieden: [
      "Verantwoordelijke rol in kritische projecten",
      "Goede beloning of ZZP-tarief",
      "Doorlopende projectstroom",
      "Professionele werkomgeving",
    ],
    veiligheid:
      "Schakelwerk vraagt om procesdiscipline. We werken met duidelijke schakelplannen, dubbele controle en strikte naleving van BEI/NEN 3140.",
  },
  {
    slug: "aardingsmonteur",
    title: "Aardingsmonteur",
    intro:
      "Realiseer aardingsoplossingen in stations, bij hoogspanningsmasten en industriële installaties. Je meet, monteert en rapporteert volgens norm.",
    meta: {
      regio: "Heel Nederland",
      uren: "32–40 uur",
      dienstverband: "Vast of ZZP",
      niveau: "Mbo 3/4 elektrotechniek",
      werkgebied: "Stations, masten, industrie",
      bevoegdheden: "VCA, NEN 3140 VP/VOP",
    },
    taken: [
      "Aanleggen van aardingen en potentiaalvereffening",
      "Aardweerstandsmetingen uitvoeren",
      "Monteren van aardingsstrips, -elektroden en -railsystemen",
      "Opstellen van meet- en montagerapportages",
    ],
    meebrengen: [
      "Ervaring met aardingstechniek",
      "Affiniteit met meten en rapporteren",
      "VCA en relevante NEN 3140 aanwijzing",
      "Nauwkeurig en zelfstandig",
    ],
    bieden: [
      "Specialistische projecten met variatie",
      "Goede beloning of ZZP-tarief",
      "Modern meetgereedschap",
      "Korte lijnen en duidelijke planning",
    ],
    veiligheid:
      "Aardingswerk is veiligheidskritisch. Wij werken met heldere normkaders, controleren metingen en leggen alles aantoonbaar vast.",
  },
];

export const findVacature = (slug?: string) =>
  vacatures.find((v) => v.slug === slug);
