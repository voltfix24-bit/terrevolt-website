import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const SITE_URL = "https://terrevolt.nl";
const OG_IMAGE = `${SITE_URL}/og-image.jpg`;
const PHONE = "+31634487467";
const EMAIL = "info@terrevolt.nl";
const ADDRESS = {
  "@type": "PostalAddress",
  streetAddress: "Overvliet 97",
  postalCode: "3545 NG",
  addressLocality: "Utrecht",
  addressCountry: "NL",
};

const sharedNavLinks = [
  { href: "/aarding", label: "Aardpen slaan en aarding meten" },
  { href: "/aardpen-slaan-amsterdam", label: "Aardpen slaan Amsterdam" },
  { href: "/diensten", label: "Alle diensten" },
  { href: "/veiligheid", label: "Veiligheid en certificeringen" },
  { href: "/contact?type=aarding", label: "Prijsindicatie aanvragen" },
];

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  name: "TerreVolt",
  url: SITE_URL,
  inLanguage: "nl-NL",
  publisher: { "@id": `${SITE_URL}/#organization` },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": ["Organization", "LocalBusiness", "Electrician"],
  "@id": `${SITE_URL}/#organization`,
  name: "TerreVolt BV",
  legalName: "TerreVolt B.V.",
  url: SITE_URL,
  logo: OG_IMAGE,
  image: OG_IMAGE,
  telephone: PHONE,
  email: EMAIL,
  address: ADDRESS,
  areaServed: { "@type": "Country", name: "Nederland" },
};

function page(input) {
  return {
    keywords: [],
    sections: [],
    jsonLd: [],
    navLinks: sharedNavLinks,
    ...input,
  };
}

const aardingFaq = [
  {
    q: "Wat kost een aardpen laten slaan?",
    a: "De prijs hangt af van bodem, diepte, bereikbaarheid, aansluiting op de meterkast en of u een meetrapport nodig heeft. Stuur postcode en foto's mee voor een duidelijke prijsindicatie.",
  },
  {
    q: "Wanneer heb ik een aardpen nodig?",
    a: "Een aardpen is vaak nodig bij een oude woning zonder betrouwbare aarding, een nieuwe meterkast, een laadpaal, zonnepanelen, afkeuring of wanneer aarding via de waterleiding niet meer betrouwbaar is.",
  },
  {
    q: "Krijg ik een meetrapport?",
    a: "Ja. Als u dat nodig heeft, kan TerreVolt de gemeten aardverspreidingsweerstand, datum, locatie en meetmethode vastleggen voor installateur, keuring, VvE of opleverdossier.",
  },
];

const amsterdamFaq = [
  {
    q: "Wat kost een aardpen laten slaan in Amsterdam?",
    a: "De prijs hangt af van grondsoort, benodigde diepte, bereikbaarheid, kabelroute naar de meterkast en of een meetrapport nodig is. Met postcode en foto's kan TerreVolt vooraf gerichter inschatten wat nodig is.",
  },
  {
    q: "Werkt TerreVolt ook voor VvE's en bedrijven in Amsterdam?",
    a: "Ja. TerreVolt helpt particuliere woningeigenaren, VvE's, installateurs, aannemers en bedrijven met aardpen slaan, aarding meten en meetrapportage.",
  },
  {
    q: "Is oude aarding via de waterleiding nog betrouwbaar?",
    a: "Daar kunt u niet zomaar op vertrouwen. Zodra een deel van de waterleiding is vervangen door kunststof, kan de aardverbinding onderbroken zijn. Een gemeten aardelektrode is dan de veilige oplossing.",
  },
];

const pages = [
  page({
    path: "/",
    title: "TerreVolt BV | LS/MS-infrastructuur en aardingsoplossingen",
    description:
      "Specialist in LS/MS-infrastructuur, schakelwerk, netmontage en aardingsoplossingen. TerreVolt ondersteunt netbeheerders, hoofdaannemers, industrie, bedrijven en particulieren.",
    keywords: ["TerreVolt", "LS MS infrastructuur", "aardingsoplossingen", "netmontage", "schakelwerk"],
    h1: "TerreVolt BV - elektrotechnische infrastructuur en aarding",
    sections: [
      {
        h2: "Specialist in uitvoering",
        paragraphs: [
          "TerreVolt ondersteunt opdrachtgevers bij laagspannings- en middenspanningsinfrastructuur, stationswerk, schakelwerk, metingen, huisaansluitingen en aardingsoplossingen.",
          "Voor aarding helpt TerreVolt met aardpen slaan, aarding meten, meetrapportage en praktische beoordeling van meterkast, laadpaal, zonnepanelen, bedrijfspand of technische ruimte.",
        ],
        items: ["LS/MS-netmontage", "Stationsrenovatie", "Schakelwerk en veiligstellen", "Aardpen slaan en aarding meten", "Meetrapportage"],
      },
    ],
  }),
  page({
    path: "/diensten",
    title: "Diensten | LS/MS-netmontage, schakelwerk en aarding | TerreVolt BV",
    description:
      "Bekijk de diensten van TerreVolt: LS/MS-netmontage, stationsrenovatie, schakelwerk, aardingsoplossingen, meten en beproeven en huisaansluitingen.",
    keywords: ["diensten TerreVolt", "LS/MS netmontage", "stationsrenovatie", "aardingsoplossingen", "huisaansluitingen"],
    h1: "Diensten voor elektrotechnische infrastructuur",
    sections: [
      {
        h2: "Uitvoering voor netbeheer, aannemers en bedrijven",
        paragraphs: [
          "TerreVolt levert vakbekwame ondersteuning bij aanleg, renovatie, veiligstelling, meting en oplevering van laagspannings- en middenspanningsinfrastructuur.",
          "De diensten sluiten aan op projectmatige uitvoering, technische oplevering en duidelijke communicatie richting opdrachtgever.",
        ],
        items: ["LS/MS-netmontage", "Stationsrenovatie", "Schakelwerk", "Aardingsoplossingen", "Meten en beproeven", "Huisaansluitingen"],
      },
    ],
  }),
  page({
    path: "/diensten/ls-ms-netmontage",
    title: "LS/MS netmontage | Kabelmontage, moffen en eindsluitingen | TerreVolt BV",
    description:
      "Kabelmontage, moffen, eindsluitingen en aansluitwerk binnen laag- en middenspanningsnetten voor netbeheerders, hoofdaannemers en industrie.",
    keywords: ["LS MS netmontage", "kabelmontage", "moffen", "eindsluitingen", "laagspanning", "middenspanning"],
    h1: "LS/MS netmontage",
    sections: [
      {
        h2: "Kabelmontage voor laag- en middenspanning",
        paragraphs: [
          "TerreVolt voert netmontage uit aan laagspannings- en middenspanningsnetten. Het werk bestaat uit kabelmontage, verbindingsmoffen, eindsluitingen, kabelinvoer en aansluitwerk in stations en technische ruimten.",
          "De uitvoering is bedoeld voor netbeheerders, hoofdaannemers, industrie en grootverbruikers die betrouwbare vakmensen zoeken voor veilig en controleerbaar kabelwerk.",
        ],
        items: ["LS-kabelmontage", "MS-kabelmontage", "Verbindingsmoffen", "Eindsluitingen", "Oplevering en terugkoppeling"],
      },
    ],
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "Service",
        name: "LS/MS netmontage",
        serviceType: "Kabelmontage, moffen, eindsluitingen en aansluitwerk",
        provider: { "@id": `${SITE_URL}/#organization` },
        areaServed: { "@type": "Country", name: "Nederland" },
      },
    ],
  }),
  page({
    path: "/diensten/stationsrenovatie",
    title: "Stationsrenovatie | MS/LS-stations en technische ruimten | TerreVolt BV",
    description:
      "Renovatie en inrichting van MS/LS-stations, transformatorstations en technische ruimten, inclusief montage, ombouw en oplevering.",
    keywords: ["stationsrenovatie", "MS station", "LS station", "transformatorstation", "technische ruimte"],
    h1: "Stationsrenovatie voor MS/LS-installaties",
    sections: [
      {
        h2: "Renovatie, ombouw en inrichting",
        paragraphs: [
          "TerreVolt ondersteunt bij renovatie van MS/LS-stations, transformatorruimten en technische ruimten. De werkzaamheden richten zich op veilige uitvoering, nette montage en duidelijke oplevering.",
          "Opdrachtgevers schakelen TerreVolt in voor stationswerk binnen de netbeheeromgeving, bij vervanging, uitbreiding, sanering of projectmatige vernieuwing van installaties.",
        ],
        items: ["MS/LS-stations", "Transformatorruimten", "LS-rekken", "Schakelinstallaties", "Opleverdocumentatie"],
      },
    ],
  }),
  page({
    path: "/diensten/schakelwerk",
    title: "Schakelwerk en veiligstellen | LS/MS-installaties | TerreVolt BV",
    description:
      "Veilig in- en uitbedrijf nemen, vrijschakelen, veiligstellen en terugschakelen van LS/MS-installaties volgens geldende procedures.",
    keywords: ["schakelwerk", "veiligstellen", "vrijschakelen", "LS installatie", "MS installatie"],
    h1: "Schakelwerk en veiligstellen",
    sections: [
      {
        h2: "Veilig werken aan LS/MS-installaties",
        paragraphs: [
          "TerreVolt ondersteunt bij vrijschakelen, veiligstellen, terugschakelen en werkzaamheden rond laagspannings- en middenspanningsinstallaties.",
          "De aanpak draait om duidelijke afspraken, bevoegdheden, veiligheidsprocedures en controleerbare uitvoering voor opdrachtgever en betrokken partijen.",
        ],
        items: ["Vrijschakelen", "Veiligstellen", "Terugschakelen", "Werkafspraken", "Projectmatige uitvoering"],
      },
    ],
  }),
  page({
    path: "/aarding",
    title: "Aardpen laten slaan | Aarding meten met meetrapport | TerreVolt",
    description:
      "Aardpen laten slaan of aarding laten meten? TerreVolt plaatst en controleert aarding voor woningen, laadpalen, zonnepanelen, meterkasten en bedrijven. Meetrapport mogelijk.",
    keywords: [
      "aardpen slaan",
      "aardpen laten slaan",
      "aarding aanleggen",
      "aarding meten",
      "aardingsmeting met meetrapport",
      "meterkast aarden",
      "aarding laadpaal",
      "aarding zonnepanelen",
    ],
    h1: "Aardpen laten slaan en aarding laten meten",
    sections: [
      {
        h2: "Aardingsoplossingen voor woningen en bedrijven",
        paragraphs: [
          "TerreVolt plaatst en meet aardingsvoorzieningen voor woningen, meterkasten, laadpalen, zonnepanelen, VvE's, bedrijfspanden en technische installaties.",
          "Een goede aardingsvoorziening is belangrijk bij oudere woningen, renovaties, een nieuwe groepenkast, een laadpaal, zonnepanelen, afkeuring of wanneer aarding via de waterleiding niet meer betrouwbaar is.",
          "U kunt postcode en foto's van de meterkast meesturen. Daarmee kan TerreVolt sneller beoordelen welke aanpak nodig is en of een meetrapport gewenst is voor installateur, keuring of opleverdossier.",
        ],
        items: ["Aardpen slaan", "Aarding meten", "Meetrapport mogelijk", "Voor particulieren, VvE's, installateurs en bedrijven", "Werkgebied Nederland"],
      },
      {
        h2: "Meetrapport en oplevering",
        paragraphs: [
          "Na plaatsing of controle kan TerreVolt de aardverspreidingsweerstand meten en de meetwaarden vastleggen. Dat geeft duidelijkheid voor de installateur, netbeheerder, VvE, keuring of beheerder van het pand.",
        ],
      },
    ],
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "Service",
        name: "Aardpen laten slaan en aarding meten",
        serviceType: "Aardpen slaan, aarding aanleggen en aardingsmeting met meetrapport",
        description:
          "Plaatsen van aardpennen, aarding meten en meetrapportage voor woningen, meterkasten, laadpalen, zonnepanelen, VvE's en bedrijven.",
        url: `${SITE_URL}/aarding`,
        provider: { "@id": `${SITE_URL}/#organization` },
        areaServed: { "@type": "Country", name: "Nederland" },
        availableChannel: [
          { "@type": "ServiceChannel", name: "Prijsindicatie aanvragen", serviceUrl: `${SITE_URL}/contact?type=aarding` },
          { "@type": "ServiceChannel", name: "Telefonisch contact", servicePhone: { "@type": "ContactPoint", telephone: PHONE } },
        ],
      },
      faqJsonLd(aardingFaq),
      breadcrumbJsonLd([
        ["Home", "/"],
        ["Aarding", "/aarding"],
      ]),
    ],
  }),
  page({
    path: "/aardpen-slaan-amsterdam",
    title: "Aardpen slaan Amsterdam | Aarding meten met meetrapport | TerreVolt",
    description:
      "Aardpen laten slaan in Amsterdam of aarding laten meten? TerreVolt helpt particulieren, installateurs en bedrijven met aardpen, meetrapport, laadpaal, zonnepanelen en meterkast.",
    keywords: [
      "aardpen slaan Amsterdam",
      "aardpen laten slaan Amsterdam",
      "aarding meten Amsterdam",
      "aardingsmeting Amsterdam",
      "meetrapport aarding Amsterdam",
      "aarding meterkast Amsterdam",
      "aardpen laadpaal Amsterdam",
      "aardpen zonnepanelen Amsterdam",
    ],
    h1: "Aardpen laten slaan in Amsterdam",
    sections: [
      {
        h2: "Aarding nodig voor woning, VvE of bedrijfspand in Amsterdam",
        paragraphs: [
          "TerreVolt slaat aardpennen en meet aarding in Amsterdam voor woningen, meterkasten, laadpalen, zonnepanelen, VvE's, installateurs en bedrijven.",
          "Amsterdam kent veel oudere woningen, verbouwingen, appartementen en beperkte ruimtes rond meterkasten. Daarom vraagt TerreVolt bij voorkeur om postcode en foto's, zodat bereikbaarheid, kabelroute en rapportagebehoefte vooraf duidelijk zijn.",
          "Een meetrapport is mogelijk voor installateur, keuring, VvE, netbeheerder of opleverdossier. TerreVolt werkt ook in Amstelveen, Diemen, Zaandam, Weesp, Haarlem, Hoofddorp en Almere.",
        ],
        items: ["Aardpen slaan Amsterdam", "Aarding meten Amsterdam", "Meetrapport aarding", "Oude waterleiding-aarding vervangen", "Laadpaal en zonnepanelen"],
      },
      {
        h2: "Voor particuliere en zakelijke aanvragen",
        paragraphs: [
          "De pagina is bedoeld voor woningeigenaren, VvE's, installateurs, aannemers en bedrijven die een betrouwbare aardingsvoorziening nodig hebben of bestaande aarding willen laten controleren.",
        ],
      },
    ],
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "Service",
        name: "Aardpen slaan Amsterdam",
        serviceType: "Aardpen slaan, aarding meten en meetrapport in Amsterdam",
        description:
          "Aardpen laten slaan en aarding laten meten in Amsterdam voor woningen, meterkasten, laadpalen, zonnepanelen, VvE's, installateurs en bedrijven.",
        url: `${SITE_URL}/aardpen-slaan-amsterdam`,
        provider: { "@id": `${SITE_URL}/#organization` },
        areaServed: [
          { "@type": "City", name: "Amsterdam" },
          { "@type": "City", name: "Amstelveen" },
          { "@type": "City", name: "Diemen" },
          { "@type": "City", name: "Zaandam" },
          { "@type": "City", name: "Weesp" },
          { "@type": "City", name: "Haarlem" },
          { "@type": "City", name: "Hoofddorp" },
          { "@type": "City", name: "Almere" },
        ],
        availableChannel: [
          { "@type": "ServiceChannel", name: "Prijsindicatie aanvragen", serviceUrl: `${SITE_URL}/contact?type=aarding&plaats=amsterdam` },
          { "@type": "ServiceChannel", name: "Telefonisch contact", servicePhone: { "@type": "ContactPoint", telephone: PHONE } },
        ],
      },
      faqJsonLd(amsterdamFaq),
      breadcrumbJsonLd([
        ["Home", "/"],
        ["Aarding", "/aarding"],
        ["Aardpen slaan Amsterdam", "/aardpen-slaan-amsterdam"],
      ]),
    ],
  }),
  page({
    path: "/diensten/meten-en-beproeven",
    title: "Meten en beproeven | Aardingsmetingen en rapportage | TerreVolt BV",
    description:
      "Controlemetingen, kabelmetingen, aardingsmetingen en duidelijke meet- en opleverrapportages voor technische installaties en infrastructuur.",
    keywords: ["meten en beproeven", "aardingsmetingen", "kabelmetingen", "meetrapportage", "opleverrapportage"],
    h1: "Meten en beproeven",
    sections: [
      {
        h2: "Controlemetingen en rapportage",
        paragraphs: [
          "TerreVolt voert metingen en beproevingen uit voor elektrotechnische installaties, kabelwerk, aarding en opleverdossiers.",
          "Duidelijke meetwaarden en terugkoppeling helpen bij oplevering, beheer, keuring en vervolgwerk door installateurs of opdrachtgevers.",
        ],
        items: ["Aardingsmetingen", "Controlemetingen", "Kabelmetingen", "Meetrapportage", "Opleverdocumentatie"],
      },
    ],
  }),
  page({
    path: "/diensten/huisaansluitingen",
    title: "Huisaansluitingen | LS-aansluitwerk en saneringen | TerreVolt BV",
    description:
      "Aanleg, wijziging en sanering van huisaansluitingen en aansluitwerk op het laagspanningsnet voor woningen en projecten.",
    keywords: ["huisaansluitingen", "LS aansluitwerk", "laagspanningsnet", "saneringen", "aansluitingen"],
    h1: "Huisaansluitingen en LS-aansluitwerk",
    sections: [
      {
        h2: "Aanleg, wijziging en sanering",
        paragraphs: [
          "TerreVolt ondersteunt bij huisaansluitingen, laagspanningsaansluitwerk, saneringen en aanpassingen aan aansluitingen binnen projecten.",
          "De werkzaamheden vragen om nette uitvoering, veilige werkafspraken en duidelijke afstemming met opdrachtgever en betrokken partijen.",
        ],
        items: ["Laagbouw en hoogbouw", "LS-aansluitwerk", "Saneringen", "Aanpassingen", "Projectmatige uitvoering"],
      },
    ],
  }),
  page({
    path: "/projecten",
    title: "Projecten | Uitvoering in elektrotechnische infrastructuur | TerreVolt BV",
    description:
      "Bekijk hoe TerreVolt werkt aan elektrotechnische infrastructuur, netmontage, stationswerk, aarding, metingen en technische uitvoering.",
    keywords: ["projecten TerreVolt", "elektrotechnische infrastructuur", "netmontage", "stationswerk", "aarding"],
    h1: "Projecten en uitvoering",
    sections: [
      {
        h2: "Praktische uitvoering op locatie",
        paragraphs: [
          "TerreVolt werkt aan projecten binnen LS/MS-infrastructuur, stationsrenovatie, schakelwerk, aarding, metingen en huisaansluitingen.",
          "De focus ligt op veilig werken, duidelijke communicatie, vakbekwame monteurs en controleerbare oplevering.",
        ],
        items: ["Netmontage", "Stationswerk", "Aardingsoplossingen", "Metingen", "Oplevering"],
      },
    ],
  }),
  page({
    path: "/veiligheid",
    title: "Veiligheid en certificeringen | ISO 9001, VCA** en SBB | TerreVolt BV",
    description:
      "TerreVolt werkt met aandacht voor veiligheid, kwaliteit en vakmanschap. Bekijk ISO 9001, VCA** en SBB erkend leerbedrijf informatie.",
    keywords: ["TerreVolt certificeringen", "ISO 9001", "VCA", "SBB erkend leerbedrijf", "veiligheid"],
    h1: "Veiligheid en certificeringen",
    sections: [
      {
        h2: "Kwaliteit, veiligheid en vakmanschap",
        paragraphs: [
          "TerreVolt vermeldt certificeringen en erkenningen zodat opdrachtgevers snel zien dat veiligheid, kwaliteit en ontwikkeling van vakmensen serieus worden geborgd.",
          "De website toont ISO 9001, VCA** en SBB erkend leerbedrijf als vertrouwenssignalen voor netbeheerders, aannemers, bedrijven en particuliere opdrachtgevers.",
        ],
        items: ["ISO 9001:2015", "VCA** 2017/6.0", "SBB erkend leerbedrijf", "Veilig werken", "Kwaliteitsmanagement"],
      },
    ],
  }),
  page({
    path: "/over",
    title: "Over TerreVolt BV | Elektrotechnisch infrabedrijf uit Utrecht",
    description:
      "Lees meer over TerreVolt BV: uitvoerende specialist in LS/MS-infrastructuur, netmontage, aarding, schakelwerk en technische projecten.",
    keywords: ["over TerreVolt", "TerreVolt BV Utrecht", "elektrotechnisch infrabedrijf", "LS MS infrastructuur"],
    h1: "Over TerreVolt BV",
    sections: [
      {
        h2: "Uitvoerende specialist in elektrotechniek",
        paragraphs: [
          "TerreVolt BV is actief in elektrotechnische infrastructuur, met aandacht voor netmontage, stationsrenovatie, schakelwerk, aarding, meten en huisaansluitingen.",
          "Het bedrijf werkt vanuit Utrecht en ondersteunt opdrachtgevers in Nederland met praktische uitvoering, vakmanschap en duidelijke communicatie.",
        ],
        items: ["Utrecht", "LS/MS-infrastructuur", "Aardingsoplossingen", "Netmontage", "Veilig werken"],
      },
    ],
  }),
  page({
    path: "/werken-bij",
    title: "Werken bij TerreVolt | Vacatures elektrotechniek, LS/MS en aarding",
    description:
      "Bekijk vacatures bij TerreVolt voor elektrotechniek, laagspanning, middenspanning, aarding, huisaansluitingen en werkverantwoordelijkheid.",
    keywords: ["werken bij TerreVolt", "vacatures elektrotechniek", "monteur laagspanning", "monteur middenspanning", "aardingsmonteur"],
    h1: "Werken bij TerreVolt",
    sections: [
      {
        h2: "Vacatures in elektrotechnische infrastructuur",
        paragraphs: [
          "TerreVolt zoekt vakmensen voor laagspanning, middenspanning, aarding, huisaansluitingen en werkvoorbereiding of verantwoordelijkheid binnen technische projecten.",
          "Als SBB erkend leerbedrijf investeert TerreVolt ook in praktijkontwikkeling en het opleiden van nieuwe vakmensen.",
        ],
        items: ["Elektromonteur laagspanning", "Elektromonteur middenspanning", "Aardingsmonteur", "Monteur huisaansluitingen", "Werkverantwoordelijke LS/MS"],
      },
    ],
  }),
  page({
    path: "/contact",
    title: "Contact | Project bespreken met TerreVolt BV",
    description:
      "Neem contact op met TerreVolt voor LS/MS-infrastructuur, schakelwerk, stationsrenovatie, netmontage, aarding en metingen.",
    keywords: ["contact TerreVolt", "aarding aanvragen", "project bespreken", "TerreVolt telefoon", "TerreVolt email"],
    h1: "Contact met TerreVolt",
    sections: [
      {
        h2: "Project, aarding of vacature bespreken",
        paragraphs: [
          "Neem contact op met TerreVolt voor LS/MS-infrastructuur, netmontage, stationsrenovatie, schakelwerk, aarding, meten en beproeven of huisaansluitingen.",
          "Voor een aarding-aanvraag helpt het om postcode, korte omschrijving en foto's van de meterkast mee te sturen. Dan kan TerreVolt sneller een prijsindicatie geven.",
        ],
        items: ["Telefoon: +31 6 34 48 74 67", "E-mail: info@terrevolt.nl", "Adres: Overvliet 97, 3545 NG Utrecht", "Prijsindicatie voor aarding"],
      },
    ],
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "ContactPage",
        name: "Contact TerreVolt BV",
        url: `${SITE_URL}/contact`,
      },
    ],
  }),
  page({
    path: "/privacy",
    title: "Privacyverklaring | TerreVolt BV",
    description: "Privacyverklaring van TerreVolt BV over contactaanvragen, sollicitaties, uploads en gegevensverwerking via de website.",
    keywords: ["privacy TerreVolt", "privacyverklaring", "gegevensverwerking"],
    h1: "Privacyverklaring",
    sections: [
      {
        h2: "Gegevens bij contact en aanvragen",
        paragraphs: [
          "Op deze pagina staat hoe TerreVolt omgaat met gegevens die via de website worden verstuurd, zoals contactaanvragen, projectinformatie, sollicitaties en eventuele uploads.",
        ],
      },
    ],
  }),
  vacaturePage("/vacatures/elektromonteur-laagspanning", "Elektromonteur laagspanning", "Vacature elektromonteur laagspanning bij TerreVolt. Werk aan LS-installaties, aansluitwerk en elektrotechnische infrastructuur."),
  vacaturePage("/vacatures/elektromonteur-middenspanning", "Elektromonteur middenspanning", "Vacature elektromonteur middenspanning bij TerreVolt. Werk aan MS-installaties, stations en elektrotechnische infrastructuur."),
  vacaturePage("/vacatures/elektromonteur-laagspanning-middenspanning", "Elektromonteur laagspanning/middenspanning", "Vacature elektromonteur LS/MS bij TerreVolt. Werk aan laagspannings- en middenspanningsprojecten."),
  vacaturePage("/vacatures/aardingsmonteur", "Aardingsmonteur", "Vacature aardingsmonteur bij TerreVolt. Werk aan aardpen slaan, aarding meten en aardingsoplossingen."),
  vacaturePage("/vacatures/monteur-huisaansluitingen", "Monteur huisaansluitingen", "Vacature monteur huisaansluitingen bij TerreVolt. Werk aan aansluitingen, saneringen en LS-aansluitwerk."),
  vacaturePage("/vacatures/werkverantwoordelijke-ls-ms", "Werkverantwoordelijke LS/MS", "Vacature werkverantwoordelijke LS/MS bij TerreVolt voor veilige uitvoering binnen elektrotechnische infrastructuur."),
  page({
    path: "/kennis/middenspanning",
    title: "Middenspanning | Uitleg, toepassingen en veiligheid | TerreVolt BV",
    description:
      "Kennis over middenspanning, toepassingen, veiligheid, stations, kabelwerk en de rol van vakbekwame uitvoering binnen elektrotechnische infrastructuur.",
    keywords: ["middenspanning", "MS installatie", "middenspanningsnet", "MS station", "kabelwerk"],
    h1: "Kennis over middenspanning",
    sections: [
      {
        h2: "Middenspanning in infrastructuur",
        paragraphs: [
          "Middenspanning wordt gebruikt voor distributie van elektrische energie tussen hoogspanningsnetten, transformatorstations, bedrijven en lokale laagspanningsnetten.",
          "Vakbekwame uitvoering is belangrijk bij kabelwerk, stations, schakelinstallaties, veiligheid en oplevering van middenspanningsinstallaties.",
        ],
        items: ["MS-kabels", "Transformatorstations", "Schakelinstallaties", "Veiligstellen", "Oplevering"],
      },
    ],
  }),
  page({
    path: "/kennis/laagspanning-middenspanning-hoogspanning",
    title: "Laagspanning, middenspanning en hoogspanning | TerreVolt BV",
    description:
      "Uitleg over het verschil tussen laagspanning, middenspanning en hoogspanning en waar deze spanningsniveaus worden toegepast.",
    keywords: ["laagspanning", "middenspanning", "hoogspanning", "spanningsniveaus", "elektriciteitsnet"],
    h1: "Laagspanning, middenspanning en hoogspanning",
    sections: [
      {
        h2: "Verschil tussen spanningsniveaus",
        paragraphs: [
          "Laagspanning, middenspanning en hoogspanning hebben ieder een eigen rol in het elektriciteitsnet. Hoogspanning transporteert grote vermogens over langere afstanden, middenspanning verdeelt energie regionaal en laagspanning brengt stroom naar woningen en bedrijven.",
          "TerreVolt werkt vooral in de praktische uitvoering rond laag- en middenspanningsinfrastructuur, stations, aansluitingen, metingen en aarding.",
        ],
        items: ["Laagspanning", "Middenspanning", "Hoogspanning", "Distributienetten", "Stations en aansluitingen"],
      },
    ],
  }),
];

const redirects = [
  ["/aarding-aanleggen", "/aarding"],
  ["/diensten/aardingsoplossingen", "/aarding"],
  ["/aardingsoplossingen", "/aarding"],
  ["/aarding-slaan", "/aarding"],
  ["/aardingsmeting", "/aarding"],
  ["/aardpen-slaan", "/aarding"],
  ["/aardpen-laten-slaan", "/aarding"],
  ["/aardpen-laten-slaan-amsterdam", "/aardpen-slaan-amsterdam"],
  ["/aarding-amsterdam", "/aardpen-slaan-amsterdam"],
  ["/aarding-meten-amsterdam", "/aardpen-slaan-amsterdam"],
  ["/aarding-aanleggen-amsterdam", "/aardpen-slaan-amsterdam"],
  ["/diensten/meten-beproeven-rapportage", "/diensten/meten-en-beproeven"],
  ["/veiligheid-certificeringen", "/veiligheid"],
  ["/over-terrevolt", "/over"],
  ["/zzp-monteurs", "/werken-bij"],
  ["/vacatures/zzp-ploegen", "/werken-bij"],
  ["/vacatures/kabelmonteur", "/werken-bij"],
];

const distDir = path.resolve("dist");
const indexPath = path.join(distDir, "index.html");

function vacaturePage(pathname, role, description) {
  return page({
    path: pathname,
    title: `${role} | Vacature bij TerreVolt BV`,
    description,
    keywords: ["vacature TerreVolt", role, "elektrotechniek", "LS MS", "werken bij TerreVolt"],
    h1: `Vacature ${role}`,
    sections: [
      {
        h2: "Werken aan elektrotechnische infrastructuur",
        paragraphs: [
          `${description} TerreVolt zoekt vakmensen die veilig, nauwkeurig en praktisch willen werken binnen elektrotechnische infrastructuur.`,
          "Bekijk de vacature en neem contact op als u ervaring heeft in techniek, laagspanning, middenspanning, aarding of aansluitwerk.",
        ],
        items: ["Elektrotechniek", "Veilig werken", "Projectlocaties", "Vakmanschap", "TerreVolt BV"],
      },
    ],
  });
}

function faqJsonLd(items) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
}

function breadcrumbJsonLd(items) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map(([name, item], index) => ({
      "@type": "ListItem",
      position: index + 1,
      name,
      item: item.startsWith("http") ? item : `${SITE_URL}${item}`,
    })),
  };
}

const escapeHtml = (value) =>
  String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");

const escapeJsonForHtml = (value) =>
  JSON.stringify(value)
    .replaceAll("<", "\\u003c")
    .replaceAll(">", "\\u003e")
    .replaceAll("&", "\\u0026");

function replaceOrInsertHead(html, pattern, replacement) {
  if (pattern.test(html)) return html.replace(pattern, replacement);
  return html.replace("</head>", `    ${replacement}\n  </head>`);
}

function setMeta(html, attr, key, content) {
  const escaped = escapeHtml(content);
  const tag = `<meta ${attr}="${key}" content="${escaped}" />`;
  const pattern = new RegExp(`<meta\\s+${attr}=["']${key}["'][^>]*>`, "i");
  return replaceOrInsertHead(html, pattern, tag);
}

function setLink(html, rel, href) {
  const tag = `<link rel="${rel}" href="${escapeHtml(href)}" />`;
  const pattern = new RegExp(`<link\\s+rel=["']${rel}["'][^>]*>`, "i");
  return replaceOrInsertHead(html, pattern, tag);
}

function renderSummary(page) {
  const nav = page.navLinks
    .map((link) => `<a href="${escapeHtml(link.href)}">${escapeHtml(link.label)}</a>`)
    .join(" ");
  const sections = page.sections
    .map((section) => {
      const paragraphs = (section.paragraphs || []).map((text) => `<p>${escapeHtml(text)}</p>`).join("\n        ");
      const list = section.items?.length
        ? `<ul>${section.items.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>`
        : "";
      return `
      <section>
        <h2>${escapeHtml(section.h2)}</h2>
        ${paragraphs}
        ${list}
      </section>`;
    })
    .join("\n");

  return `
    <main id="seo-prerender" class="seo-prerender" aria-label="Pagina samenvatting">
      <nav class="seo-prerender__nav" aria-label="Belangrijke links">${nav}</nav>
      <h1>${escapeHtml(page.h1)}</h1>
      <p>${escapeHtml(page.description)}</p>
      ${sections}
    </main>`;
}

function pageJsonLd(page) {
  const canonical = `${SITE_URL}${page.path}`;
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${canonical}#webpage`,
    url: canonical,
    name: page.title,
    description: page.description,
    inLanguage: "nl-NL",
    isPartOf: { "@id": `${SITE_URL}/#website` },
    publisher: { "@id": `${SITE_URL}/#organization` },
  };
}

function withPageMeta(baseHtml, page) {
  const canonical = `${SITE_URL}${page.path}`;
  let html = baseHtml;

  html = html.replace(/<title>.*?<\/title>/i, `<title>${escapeHtml(page.title)}</title>`);
  html = setMeta(html, "name", "description", page.description);
  html = setMeta(html, "name", "robots", "index, follow");
  html = setMeta(html, "name", "keywords", page.keywords.join(", "));
  html = setLink(html, "canonical", canonical);

  html = setMeta(html, "property", "og:title", page.title);
  html = setMeta(html, "property", "og:description", page.description);
  html = setMeta(html, "property", "og:url", canonical);
  html = setMeta(html, "property", "og:image", OG_IMAGE);
  html = setMeta(html, "property", "og:image:alt", page.title);
  html = setMeta(html, "name", "twitter:title", page.title);
  html = setMeta(html, "name", "twitter:description", page.description);
  html = setMeta(html, "name", "twitter:image", OG_IMAGE);

  const jsonLd = [organizationJsonLd, websiteJsonLd, pageJsonLd(page), ...page.jsonLd]
    .map((obj) => `<script type="application/ld+json" data-prerender-seo="true">${escapeJsonForHtml(obj)}</script>`)
    .join("\n    ");
  const style = `<style data-prerender-seo="true">.seo-prerender{font-family:system-ui,-apple-system,Segoe UI,sans-serif;max-width:960px;margin:0 auto;padding:32px 20px;line-height:1.6;color:#0d3b2e}.seo-prerender h1{font-size:2rem;line-height:1.15;margin:0 0 16px}.seo-prerender h2{font-size:1.35rem;margin:28px 0 10px}.seo-prerender p{color:#334155}.seo-prerender ul{padding-left:20px}.seo-prerender a{color:#0d3b2e;text-decoration:underline;text-decoration-color:#9ed42e;text-underline-offset:3px}.seo-prerender__nav{display:flex;flex-wrap:wrap;gap:12px;margin-bottom:24px}</style>`;
  html = html.replace("</head>", `    ${style}\n    ${jsonLd}\n  </head>`);

  html = html.replace(/<div id="root"><\/div>/i, `<div id="root">${renderSummary(page)}\n    </div>`);

  return html;
}

function withRedirect(baseHtml, from, to) {
  const target = `${SITE_URL}${to}`;
  let html = baseHtml;
  html = html.replace(/<title>.*?<\/title>/i, `<title>Doorverwijzing naar ${escapeHtml(target)} | TerreVolt</title>`);
  html = setMeta(html, "name", "description", `Deze pagina is verplaatst naar ${target}.`);
  html = setMeta(html, "name", "robots", "noindex, follow");
  html = setMeta(html, "http-equiv", "refresh", `0; url=${target}`);
  html = setLink(html, "canonical", target);
  html = html.replace(
    /<div id="root"><\/div>/i,
    `<div id="root"><main class="seo-prerender"><h1>Pagina verplaatst</h1><p>Deze pagina is verplaatst naar <a href="${escapeHtml(target)}">${escapeHtml(target)}</a>.</p></main><script>window.location.replace(${JSON.stringify(target)});</script></div>`,
  );
  return html;
}

function outputFileFor(pathname) {
  if (pathname === "/") return path.join(distDir, "index.html");
  return path.join(distDir, pathname.slice(1), "index.html");
}

async function writeHtml(pathname, html) {
  const outputFile = outputFileFor(pathname);
  await mkdir(path.dirname(outputFile), { recursive: true });
  await writeFile(outputFile, html, "utf8");
}

const baseHtml = await readFile(indexPath, "utf8");

for (const item of pages) {
  await writeHtml(item.path, withPageMeta(baseHtml, item));
}

for (const [from, to] of redirects) {
  await writeHtml(from, withRedirect(baseHtml, from, to));
}

console.log(`SEO prerendered ${pages.length} canonical pages and ${redirects.length} redirects.`);
