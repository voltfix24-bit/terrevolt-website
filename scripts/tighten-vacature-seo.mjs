import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT_DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const DIST_DIR = path.join(ROOT_DIR, "dist");
const SITE_URL = "https://terrevolt.nl";
const OG_IMAGE = `${SITE_URL}/og-image.jpg`;

const HUB_TITLE = "Vacature elektromonteur LS/MS | Werken bij TerreVolt";
const HUB_DESCRIPTION =
  "Bekijk 6 vacatures in loondienst: elektromonteur LS/MS, aardingsmonteur, huisaansluitingen en werkverantwoordelijke. Salaris zichtbaar, opleidingen betaald.";

const recruitmentNavLinks = [
  { href: "/werken-bij", label: "Alle vacatures" },
  { href: "/vacatures/elektromonteur-laagspanning", label: "Vacature elektromonteur LS" },
  { href: "/vacatures/elektromonteur-middenspanning", label: "Vacature elektromonteur MS" },
  { href: "/vacatures/aardingsmonteur", label: "Vacature aardingsmonteur" },
  { href: "/contact?type=sollicitatie", label: "Direct solliciteren" },
];

const vacatureRegions = ["Noord-Holland", "Zuid-Holland", "Gelderland", "Flevoland"];

const vacatureBenefits = [
  "Jaarcontract met uitzicht op een vast contract",
  "32-40 uur per week",
  "8% vakantiegeld",
  "25 vakantiedagen en 13 ADV-dagen bij fulltime",
  "Volledig uitgeruste werkbus waar nodig",
  "Professioneel gereedschap en gekeurde meetmiddelen",
  "Werkkleding en PBM",
  "Benodigde vakopleidingen en herhalingen betaald door TerreVolt",
];

const vacatures = [
  {
    path: "/vacatures/elektromonteur-laagspanning",
    role: "Elektromonteur laagspanning (LS)",
    title: "Vacature Elektromonteur laagspanning (LS) | loondienst bij TerreVolt",
    description:
      "Elektromonteur laagspanning bij TerreVolt: salaris €3.100-€4.400 bruto p/m, 32-40 uur, jaarcontract met uitzicht op vast en betaalde opleidingen.",
    h1: "Vacature elektromonteur laagspanning (LS)",
    keywords: ["vacature elektromonteur", "laagspanningsmonteur", "elektromonteur LS", "LS-monteur gezocht"],
    salary: { min: 3100, max: 4400 },
    summary:
      "Aanleggen, aansluiten, onderhouden en controleren van laagspanningsnetten en installaties.",
    intro:
      "Als laagspanningsmonteur werk je rechtstreeks in loondienst bij TerreVolt aan aansluitingen, verdeelinrichtingen, LS-rekken, kabelwerk, saneringen en nette oplevering op projectlocaties.",
    tasks: [
      "Laagspanningsnetten en installaties aanleggen en aansluiten",
      "LS-kabels aansluiten, afwerken en labelen",
      "Werkzaamheden uitvoeren aan LS-rekken en verdeelinrichtingen",
      "Installaties controleren, onderhouden en netjes opleveren",
      "Werken volgens werkplan, instructies en projectafspraken",
    ],
    requirements: [
      "Ervaring met laagspanningswerk of elektrotechnische montage",
      "VCA of bereidheid dit via TerreVolt te halen",
      "Rijbewijs B",
      "Veilige, nette en zelfstandige werkhouding",
    ],
    aliases: ["laagspanningsmonteur", "vacature-laagspanningsmonteur", "elektromonteur-ls"],
  },
  {
    path: "/vacatures/elektromonteur-middenspanning",
    role: "Elektromonteur middenspanning (MS)",
    title: "Vacature Elektromonteur middenspanning (MS) | loondienst bij TerreVolt",
    description:
      "Elektromonteur middenspanning bij TerreVolt: salaris €3.300-€4.900 bruto p/m, 32-40 uur, jaarcontract met uitzicht op vast en betaald opleiden.",
    h1: "Vacature elektromonteur middenspanning (MS)",
    keywords: ["vacature middenspanningsmonteur", "elektromonteur MS", "MS-monteur gezocht", "middenspanning vacature"],
    salary: { min: 3300, max: 4900 },
    summary:
      "Werken aan middenspanningskabels, verbindingen, installaties en stations volgens goedgekeurde werkplannen.",
    intro:
      "Als middenspanningsmonteur werk je aan MS-kabels, eindsluitingen, verbindingsmoffen, RMU's, MS-velden en transformatorstations, altijd volgens goedgekeurde werkplannen en duidelijke veiligheidsafspraken.",
    tasks: [
      "MS-kabels voorbereiden, invoeren en afmonteren",
      "MS-eindsluitingen en verbindingsmoffen maken of ondersteunen",
      "Werken aan RMU's, MS-velden en transformatorstations",
      "Ondersteunen bij stationsrenovaties",
      "Uitvoering controleren en terugkoppelen",
    ],
    requirements: [
      "Ervaring binnen middenspanning of kabelmontage",
      "VCA of bereidheid dit via TerreVolt te halen",
      "Ervaring met MS-eindsluitingen is een pluspunt",
      "Nauwkeurige en veiligheidsbewuste werkhouding",
    ],
    aliases: ["middenspanningsmonteur", "vacature-middenspanningsmonteur", "elektromonteur-ms"],
  },
  {
    path: "/vacatures/elektromonteur-laagspanning-middenspanning",
    role: "Schakelmonteur LS/MS",
    title: "Vacature Schakelmonteur LS/MS | loondienst bij TerreVolt",
    description:
      "Schakelmonteur LS/MS bij TerreVolt: salaris €3.600-€5.200 bruto p/m, 32-40 uur, duidelijke werkplannen, BEI/VWI en betaalde opleidingen.",
    h1: "Vacature elektromonteur laagspanning en middenspanning (schakelmonteur LS/MS)",
    keywords: ["vacature schakelmonteur", "schakelmonteur LS MS", "elektromonteur gezocht", "BEI monteur"],
    salary: { min: 3600, max: 5200 },
    summary:
      "Veilig uitvoeren en controleren van schakelhandelingen binnen bevoegdheden en goedgekeurde schakel- en werkplannen.",
    intro:
      "Als schakelmonteur voer je schakelhandelingen uit binnen je bevoegdheden. Je werkt met schakelplannen, werkplannen, VWI's, heldere communicatie en directe afstemming met werkverantwoordelijke en ploeg.",
    tasks: [
      "Schakelhandelingen voorbereiden, uitvoeren en controleren",
      "Installaties of netdelen vrijschakelen en veiligstellen",
      "Aarden en kortsluiten volgens bedieningsplan",
      "Werken volgens werkplan, schakelplan en VWI",
      "Afwijkingen of onveilige situaties direct melden",
    ],
    requirements: [
      "Ervaring met schakelwerk binnen LS en/of MS",
      "VCA of bereidheid dit via TerreVolt te halen",
      "Rust, discipline en duidelijke communicatie",
      "Ervaring met netbeheerprocedures is een pluspunt",
    ],
    aliases: ["schakelmonteur", "schakelmonteur-ls-ms", "vacature-schakelmonteur"],
  },
  {
    path: "/vacatures/aardingsmonteur",
    role: "Aardingsmonteur",
    title: "Vacature Aardingsmonteur | loondienst bij TerreVolt",
    description:
      "Aardingsmonteur bij TerreVolt: salaris €3.000-€4.000 bruto p/m, aardpen slaan, aarding meten, rapporteren, 32-40 uur en betaald opleiden.",
    h1: "Vacature aardingsmonteur",
    keywords: ["vacature aardingsmonteur", "aarding monteur", "aardpen slaan vacature", "aardingsmetingen"],
    salary: { min: 3000, max: 4000 },
    summary:
      "Aanleggen, meten, controleren en onderhouden van aardingsinstallaties, inclusief rapportage van meetresultaten.",
    intro:
      "Als aardingsmonteur plaats je aardelektroden, breng je potentiaalvereffening aan en meet je aardverspreidingsweerstand. Je werkt voor woningen, bedrijven, technische ruimtes en projectlocaties.",
    tasks: [
      "Aardelektroden plaatsen en aardingsvoorzieningen aanleggen",
      "Potentiaalvereffening aanbrengen",
      "Aardverspreidingsweerstand meten en controleren",
      "Bestaande aardingssystemen inspecteren en verbeteren",
      "Meetresultaten vastleggen en rapporteren",
    ],
    requirements: [
      "Ervaring met elektrotechniek, infra of aarding",
      "VCA of bereidheid dit via TerreVolt te halen",
      "Technisch inzicht en nauwkeurigheid",
      "Rijbewijs B",
    ],
    aliases: ["vacature-aardingsmonteur", "monteur-aarding"],
  },
  {
    path: "/vacatures/monteur-huisaansluitingen",
    role: "Monteur huisaansluitingen",
    title: "Vacature Monteur huisaansluitingen | loondienst bij TerreVolt",
    description:
      "Monteur huisaansluitingen bij TerreVolt: salaris €3.100-€4.300 bruto p/m, LS-aansluitwerk, meterkasten, bewonerscontact en betaald opleiden.",
    h1: "Vacature monteur huisaansluitingen",
    keywords: ["vacature monteur huisaansluitingen", "aansluitmonteur", "LS-aansluitwerk", "meterkast monteur"],
    salary: { min: 3100, max: 4300 },
    summary:
      "Aanleggen, aanpassen en vervangen van huisaansluitingen en werkzaamheden in of rond de meterkast.",
    intro:
      "Als monteur huisaansluitingen werk je aan nieuwe, gewijzigde en vervangen aansluitingen. Je werkt in en rond de meterkast en communiceert helder met bewoners en opdrachtgevers.",
    tasks: [
      "Nieuwe huisaansluitingen realiseren",
      "Bestaande aansluitingen aanpassen, vervangen of saneren",
      "Werken aan aansluitkabels en meterkastomgeving",
      "Werken in laagbouw- en hoogbouwprojecten",
      "Bewoners duidelijk informeren over de werkzaamheden",
    ],
    requirements: [
      "Ervaring met huisaansluitingen of LS-aansluitwerk",
      "VCA of bereidheid dit via TerreVolt te halen",
      "Klantgerichte en zakelijke houding",
      "Rijbewijs B",
    ],
    aliases: ["vacature-monteur-huisaansluitingen", "aansluitmonteur"],
  },
  {
    path: "/vacatures/werkverantwoordelijke-ls-ms",
    role: "Werkverantwoordelijke LS/MS",
    title: "Vacature Werkverantwoordelijke LS/MS | loondienst bij TerreVolt",
    description:
      "Werkverantwoordelijke LS/MS bij TerreVolt: salaris €4.300-€6.200 bruto p/m, BEI, werkplannen, toezicht, veiligheid en kwaliteit.",
    h1: "Vacature werkverantwoordelijke LS/MS (WV)",
    keywords: ["vacature werkverantwoordelijke", "WV elektrotechniek", "BEI BLS BHS", "werkverantwoordelijke LS MS"],
    salary: { min: 4300, max: 6200 },
    summary:
      "Voorbereiden en beoordelen van werkzaamheden, risico's bewaken, instructies geven en toezicht houden binnen LS/MS-projecten.",
    intro:
      "Als werkverantwoordelijke begeleid je veilige uitvoering binnen LS/MS-werkzaamheden. Je bewaakt werkplannen, schakelplannen, aanwijzingen, werkgrenzen, kwaliteit en naleving van de BEI.",
    tasks: [
      "Werkzaamheden voorbereiden en beoordelen",
      "Risico's, werkplannen en schakelplannen bewaken",
      "Instructies geven en toezicht houden op de werkplek",
      "Werkplekken vrijgeven binnen aanwijzing, opdracht en werkgrenzen",
      "Kwaliteit en naleving van de BEI bewaken",
    ],
    requirements: [
      "MBO 4 elektrotechniek of aantoonbare praktijkervaring",
      "Ervaring binnen netbeheerprojecten",
      "Coordinerende of leidinggevende ervaring",
      "Duidelijke communicatie en sterk veiligheidsbesef",
    ],
    aliases: ["werkverantwoordelijke", "vacature-werkverantwoordelijke"],
  },
];

const extraRedirects = [
  ["/vacature-elektromonteur", "/werken-bij"],
  ["/elektromonteur-gezocht", "/werken-bij"],
  ["/vacatures", "/werken-bij"],
  ...vacatures.flatMap((vacature) => vacature.aliases.map((alias) => [`/vacatures/${alias}`, vacature.path])),
];

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function escapeJsonForHtml(value) {
  return JSON.stringify(value).replaceAll("<", "\\u003c").replaceAll(">", "\\u003e").replaceAll("&", "\\u0026");
}

function routeHtmlFile(route) {
  if (route === "/") return path.join(DIST_DIR, "index.html");
  return path.join(DIST_DIR, ...route.slice(1).split("/"), "index.html");
}

function replaceOrInsertHead(html, pattern, replacement) {
  if (pattern.test(html)) return html.replace(pattern, replacement);
  return html.replace("</head>", `    ${replacement}\n  </head>`);
}

function setMeta(html, attr, key, content) {
  const tag = `<meta ${attr}="${escapeHtml(key)}" content="${escapeHtml(content)}" />`;
  const pattern = new RegExp(`<meta\\s+${attr}=["']${key}["'][^>]*>`, "i");
  return replaceOrInsertHead(html, pattern, tag);
}

function setLink(html, rel, href) {
  const tag = `<link rel="${rel}" href="${escapeHtml(href)}" />`;
  const pattern = new RegExp(`<link\\s+rel=["']${rel}["'][^>]*>`, "i");
  return replaceOrInsertHead(html, pattern, tag);
}

function setTitle(html, title) {
  return html.replace(/<title>[\s\S]*?<\/title>/i, `<title>${escapeHtml(title)}</title>`);
}

function navHtml() {
  return recruitmentNavLinks.map((link) => `<a href="${escapeHtml(link.href)}">${escapeHtml(link.label)}</a>`).join(" ");
}

function listHtml(items) {
  return `<ul>${items.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>`;
}

function renderHubMain() {
  return `<main id="seo-prerender" class="seo-prerender" aria-label="Pagina samenvatting">
      <nav class="seo-prerender__nav" aria-label="Belangrijke links">${navHtml()}</nav>
      <h1>Vacature elektromonteur laagspanning en middenspanning</h1>
      <p>${escapeHtml(HUB_DESCRIPTION)}</p>
      <section>
        <h2>6 actuele vacatures in loondienst</h2>
        <p>TerreVolt zoekt elektromonteurs en technische vakmensen voor laagspanning, middenspanning, schakelwerk, aarding, huisaansluitingen en werkverantwoordelijkheid.</p>
        <p>Je werkt rechtstreeks in loondienst, met salarisrange, uren, regio en contract duidelijk vooraf zichtbaar. Solliciteren kan ook zonder compleet cv: bellen of WhatsApp sturen mag ook.</p>
        ${listHtml(vacatures.map((v) => `${v.role}: €${v.salary.min.toLocaleString("nl-NL")}-€${v.salary.max.toLocaleString("nl-NL")} bruto p/m`))}
      </section>
      <section>
        <h2>Waarom monteurs voor TerreVolt kiezen</h2>
        <p>De functies zijn 32-40 uur per week, met jaarcontract en uitzicht op vast. Bij fulltime horen 25 vakantiedagen en 13 ADV-dagen.</p>
        <p>TerreVolt betaalt benodigde vakopleidingen, certificeringen en herhalingen. Je krijgt passend gereedschap, gekeurde meetmiddelen, werkkleding, PBM en waar nodig een volledig uitgeruste werkbus.</p>
        ${listHtml(["Rechtstreeks in loondienst", "Salaris en arbeidsvoorwaarden direct duidelijk", "Betaalde vakopleidingen", "Veilig werken met BEI, VWI, LMRA en VCA waar van toepassing", "Direct contact met Tobesh via telefoon of WhatsApp"])}
      </section>
    </main>`;
}

function renderVacatureMain(vacature) {
  return `<main id="seo-prerender" class="seo-prerender" aria-label="Pagina samenvatting">
      <nav class="seo-prerender__nav" aria-label="Belangrijke links">${navHtml()}</nav>
      <h1>${escapeHtml(vacature.h1)}</h1>
      <p>${escapeHtml(vacature.description)}</p>
      <section>
        <h2>Wat je gaat doen</h2>
        <p>${escapeHtml(vacature.intro)}</p>
        <p>${escapeHtml(vacature.role)} bij TerreVolt betekent werken in loondienst aan elektrotechnische infrastructuur met duidelijke werkafspraken, veiligheid en nette oplevering.</p>
        ${listHtml(vacature.tasks)}
      </section>
      <section>
        <h2>Wat je meebrengt</h2>
        <p>Een compleet cv is prettig, maar niet verplicht voor het eerste contact. Bel, app of solliciteer online als je wilt weten of deze functie past.</p>
        ${listHtml(vacature.requirements)}
      </section>
      <section>
        <h2>Arbeidsvoorwaarden en contact</h2>
        <p>Salarisindicatie: €${vacature.salary.min.toLocaleString("nl-NL")}-€${vacature.salary.max.toLocaleString("nl-NL")} bruto per maand op basis van 40 uur, afhankelijk van ervaring, opleiding en verantwoordelijkheden.</p>
        <p>Je werkt 32-40 uur per week in Noord-Holland, Zuid-Holland, Gelderland of Flevoland. Tobesh is direct bereikbaar via telefoon, WhatsApp en e-mail.</p>
        ${listHtml(vacatureBenefits)}
      </section>
    </main>`;
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

function jobPostingJsonLd(vacature) {
  return {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: vacature.role,
    description: `${vacature.summary} ${vacature.intro} Taken: ${vacature.tasks.join("; ")}. Wat je meebrengt: ${vacature.requirements.join("; ")}.`,
    identifier: {
      "@type": "PropertyValue",
      name: "TerreVolt",
      value: vacature.path.split("/").at(-1),
    },
    datePosted: "2026-08-18",
    validThrough: "2027-08-18",
    employmentType: ["FULL_TIME", "PART_TIME"],
    directApply: true,
    hiringOrganization: {
      "@type": "Organization",
      name: "TerreVolt",
      sameAs: SITE_URL,
      url: SITE_URL,
      logo: OG_IMAGE,
    },
    jobLocation: vacatureRegions.map((region) => ({
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        addressCountry: "NL",
        addressRegion: region,
      },
    })),
    applicantLocationRequirements: {
      "@type": "Country",
      name: "Nederland",
    },
    baseSalary: {
      "@type": "MonetaryAmount",
      currency: "EUR",
      value: {
        "@type": "QuantitativeValue",
        minValue: vacature.salary.min,
        maxValue: vacature.salary.max,
        unitText: "MONTH",
      },
    },
    industry: "Elektrotechniek en energie-infrastructuur",
    occupationalCategory: "47-2111.00 Electricians",
    responsibilities: vacature.tasks.join("; "),
    qualifications: vacature.requirements.join("; "),
    jobBenefits: vacatureBenefits.join("; "),
    workHours: "32-40 uur per week",
    url: `${SITE_URL}${vacature.path}`,
  };
}

function itemListJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Vacatures bij TerreVolt",
    itemListElement: vacatures.map((vacature, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: vacature.role,
      url: `${SITE_URL}${vacature.path}`,
    })),
  };
}

function shouldUpdateJsonLdType(type) {
  if (Array.isArray(type)) return type.some(shouldUpdateJsonLdType);
  return type === "WebPage" || type === "Article";
}

function updateJsonLdValue(value, title, description) {
  if (Array.isArray(value)) return value.map((entry) => updateJsonLdValue(entry, title, description));
  if (!value || typeof value !== "object") return value;

  const next = Object.fromEntries(
    Object.entries(value).map(([key, entry]) => [key, updateJsonLdValue(entry, title, description)]),
  );

  if (shouldUpdateJsonLdType(next["@type"])) {
    next.name = title;
    next.description = description;
    if ("headline" in next) next.headline = title;
  }

  return next;
}

function replacePrerenderJsonLd(html, title, description) {
  return html.replace(
    /(<script(?=[^>]*type=["']application\/ld\+json["'])(?=[^>]*data-prerender-seo=["']true["'])[^>]*>)([\s\S]*?)(<\/script>)/gi,
    (match, openTag, rawJson, closeTag) => {
      try {
        return `${openTag}${escapeJsonForHtml(updateJsonLdValue(JSON.parse(rawJson), title, description))}${closeTag}`;
      } catch {
        return match;
      }
    },
  );
}

function insertVacatureJsonLd(html, items) {
  const clean = html.replace(/\n?\s*<script type="application\/ld\+json" data-vacature-seo="true">[\s\S]*?<\/script>/g, "");
  const scripts = items
    .map((item) => `<script type="application/ld+json" data-vacature-seo="true">${escapeJsonForHtml(item)}</script>`)
    .join("\n    ");
  return clean.replace("</head>", `    ${scripts}\n  </head>`);
}

function updatePage(route, title, description, keywords, mainHtml, jsonLd) {
  const file = routeHtmlFile(route);
  if (!fs.existsSync(file)) return false;

  const canonical = `${SITE_URL}${route}`;
  let html = fs.readFileSync(file, "utf8");
  html = setTitle(html, title);
  html = setMeta(html, "name", "description", description);
  html = setMeta(html, "name", "robots", "index, follow");
  html = setMeta(html, "name", "keywords", keywords.join(", "));
  html = setLink(html, "canonical", canonical);
  html = setMeta(html, "property", "og:title", title);
  html = setMeta(html, "property", "og:description", description);
  html = setMeta(html, "property", "og:url", canonical);
  html = setMeta(html, "property", "og:image", OG_IMAGE);
  html = setMeta(html, "property", "og:image:alt", title);
  html = setMeta(html, "name", "twitter:title", title);
  html = setMeta(html, "name", "twitter:description", description);
  html = setMeta(html, "name", "twitter:image", OG_IMAGE);
  html = replacePrerenderJsonLd(html, title, description);
  html = html.replace(/<main id="seo-prerender"[\s\S]*?<\/main>/i, mainHtml);
  html = insertVacatureJsonLd(html, jsonLd);
  fs.writeFileSync(file, html, "utf8");
  return true;
}

function redirectHtml(baseHtml, to) {
  const target = `${SITE_URL}${to}`;
  let html = baseHtml;
  html = setTitle(html, `Doorverwijzing naar ${target} | TerreVolt`);
  html = setMeta(html, "name", "description", `Deze pagina is verplaatst naar ${target}.`);
  html = setMeta(html, "name", "robots", "noindex, follow");
  html = setMeta(html, "http-equiv", "refresh", `0; url=${target}`);
  html = setLink(html, "canonical", target);
  return html.replace(
    /<div id="root"><\/div>/i,
    `<div id="root"><main class="seo-prerender"><h1>Pagina verplaatst</h1><p>Deze pagina is verplaatst naar <a href="${escapeHtml(target)}">${escapeHtml(target)}</a>.</p></main><script>window.location.replace(${JSON.stringify(target)});</script></div>`,
  );
}

function writeHtml(route, html) {
  const file = routeHtmlFile(route);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, html, "utf8");
}

let updated = 0;

if (
  updatePage(
    "/werken-bij",
    HUB_TITLE,
    HUB_DESCRIPTION,
    ["vacature elektromonteur", "elektromonteur gezocht", "werken bij TerreVolt", "vacatures elektrotechniek", "laagspanningsmonteur", "middenspanningsmonteur", "aardingsmonteur"],
    renderHubMain(),
    [
      breadcrumbJsonLd([
        ["Home", "/"],
        ["Werken bij TerreVolt", "/werken-bij"],
      ]),
      itemListJsonLd(),
    ],
  )
) {
  updated += 1;
}

for (const vacature of vacatures) {
  if (
    updatePage(
      vacature.path,
      vacature.title,
      vacature.description,
      ["vacature TerreVolt", vacature.role, "elektrotechniek", "LS MS", "werken bij TerreVolt", ...vacature.keywords],
      renderVacatureMain(vacature),
      [
        jobPostingJsonLd(vacature),
        breadcrumbJsonLd([
          ["Home", "/"],
          ["Werken bij TerreVolt", "/werken-bij"],
          [vacature.role, vacature.path],
        ]),
      ],
    )
  ) {
    updated += 1;
  }
}

const baseHtml = fs.existsSync(path.join(DIST_DIR, "index.html")) ? fs.readFileSync(path.join(DIST_DIR, "index.html"), "utf8") : "";
let redirects = 0;
for (const [from, to] of extraRedirects) {
  if (!baseHtml) break;
  writeHtml(from, redirectHtml(baseHtml, to));
  redirects += 1;
}

console.log(`Tightened vacature SEO on ${updated} page(s) and ${redirects} redirect(s).`);
