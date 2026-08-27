import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT_DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const DIST_DIR = path.join(ROOT_DIR, "dist");

const META_OVERRIDES = {
  "/": {
    title: "TerreVolt BV | LS/MS-infrastructuur en aarding",
    description:
      "TerreVolt helpt met LS/MS-netmontage, stationsrenovatie, schakelwerk, aarding, metingen en huisaansluitingen.",
  },
  "/diensten": {
    title: "Diensten | LS/MS, schakelwerk en aarding | TerreVolt",
    description:
      "Bekijk LS/MS-netmontage, stationsrenovatie, schakelwerk, aarding, meten en beproeven en huisaansluitingen van TerreVolt.",
  },
  "/diensten/ls-ms-netmontage": {
    title: "LS/MS netmontage | Kabelmontage | TerreVolt",
    description:
      "Kabelmontage, moffen, eindsluitingen en aansluitwerk in laag- en middenspanningsnetten voor netbeheerders, aannemers en industrie.",
  },
  "/diensten/stationsrenovatie": {
    title: "Stationsrenovatie MS/LS | TerreVolt",
    description:
      "Renovatie van MS/LS-stations, transformatorruimten, LS-rekken en aarding, gefaseerd uitgevoerd en aantoonbaar opgeleverd.",
  },
  "/diensten/schakelwerk": {
    title: "Schakelwerk en veiligstellen | TerreVolt",
    description:
      "Schakelwerk, vrijschakelen, veiligstellen en in- en uitbedrijf nemen binnen LS/MS-projecten volgens duidelijke procedures.",
  },
  "/aarding": {
    title: "Aardpen laten slaan | Aarding meten | TerreVolt",
    description:
      "Aardpen laten slaan of aarding meten? TerreVolt helpt bij meterkast, laadpaal, zonnepanelen, woning, VvE en bedrijf. Meetrapport mogelijk.",
  },
  "/aardpen-slaan-amsterdam": {
    title: "Aardpen slaan Amsterdam | Aarding meten | TerreVolt",
    description:
      "Aardpen laten slaan in Amsterdam? TerreVolt helpt met aarding meten, meetrapport, meterkast, laadpaal, zonnepanelen, VvE en bedrijf.",
  },
  "/diensten/meten-en-beproeven": {
    title: "Meten en beproeven | Aardingsmetingen | TerreVolt",
    description:
      "Aardingsmetingen, kabelmetingen, controlemetingen en opleverrapportages voor LS/MS-installaties, aarding en projectdossiers.",
  },
  "/diensten/huisaansluitingen": {
    title: "Huisaansluitingen en LS-aansluitwerk | TerreVolt",
    description:
      "Aanleg, wijziging en sanering van huisaansluitingen en aansluitwerk op het laagspanningsnet voor woningen en projecten.",
  },
  "/projecten": {
    title: "Projecten | Elektrotechnische infra | TerreVolt",
    description:
      "Projecttypes en praktijkvoorbeelden binnen LS/MS-infrastructuur, stationsrenovatie, schakelwerk, aarding en metingen.",
  },
  "/veiligheid": {
    title: "Veiligheid, BEI en VCA** | TerreVolt",
    description:
      "Veilig werken met BEI BLS/BHS, VWI's, LMRA, VCA** 2017/6.0, ISO 9001:2015 en SBB erkend leerbedrijf.",
  },
  "/over": {
    title: "Over TerreVolt BV | Elektrotechniek Utrecht",
    description:
      "TerreVolt BV uit Utrecht is uitvoerend specialist in LS/MS-infrastructuur, netmontage, aarding, schakelwerk en technische projecten.",
  },
  "/werken-bij": {
    title: "Werken bij TerreVolt | Vacatures elektrotechniek",
    description:
      "Bekijk vacatures voor elektrotechniek, laagspanning, middenspanning, aarding, huisaansluitingen en werkverantwoordelijkheid bij TerreVolt.",
  },
  "/contact": {
    title: "Contact | Project bespreken met TerreVolt",
    description:
      "Neem contact op met TerreVolt voor LS/MS-infrastructuur, schakelwerk, stationsrenovatie, netmontage, aarding en metingen.",
  },
  "/privacy": {
    title: "Privacyverklaring | TerreVolt",
    description:
      "Privacyverklaring van TerreVolt over contactaanvragen, sollicitaties, uploads en gegevensverwerking via de website.",
  },
  "/kennis/middenspanning": {
    title: "Middenspanning uitgelegd | TerreVolt",
    description:
      "Wat is middenspanning, wanneer heb je een MS-aansluiting nodig en wie mag eraan werken? Uitleg over MS-netten, stations, BEI BHS en NEN 3840.",
  },
  "/kennis/laagspanning-middenspanning-hoogspanning": {
    title: "Laagspanning, middenspanning en hoogspanning | TerreVolt",
    description:
      "Het verschil tussen laagspanning, middenspanning en hoogspanning uitgelegd voor aansluitingen, netten en elektrotechnische projecten.",
  },
};

const AARDING_CV_FAQ = {
  "@type": "Question",
  name: "Kan slechte aarding een cv-ketel storing veroorzaken?",
  acceptedAnswer: {
    "@type": "Answer",
    text: "Ja, dat kan. Sommige cv-ketels controleren de vlam via een ionisatiesignaal. Als de ketel, het stopcontact of de meterkast niet goed geaard is, kan dat signaal verstoord raken. TerreVolt repareert geen cv-ketel, maar kan wel de aarding meten en waar nodig verbeteren.",
  },
};

const AARDING_CV_SECTION = `<section>
        <h2>CV-ketel storing door slechte aarding?</h2>
        <p>Sommige cv-ketels gebruiken een vlamsignaal of ionisatiesignaal om veilig te controleren of de brander goed werkt. Bij een ontbrekende of slechte aarding kan dat signaal verstoord raken.</p>
        <p>Dat kan bij bepaalde toestellen, waaronder Intergas-ketels, terugkomen als storing rond geen of slecht vlamsignaal. TerreVolt repareert geen cv-ketel, maar kan wel de aarding van meterkast, stopcontact, hoofdaardrail en aardpen controleren, meten en waar nodig verbeteren.</p>
        <ul><li>Geaard stopcontact bij de cv-ketel controleren</li><li>Hoofdaardrail en meterkastaarding meten</li><li>Aardpen en aardverspreidingsweerstand controleren</li><li>Meetrapport voor installateur of dossier</li></ul>
      </section>`;

const VEILIGHEID_PRERENDER_MAIN = `<main id="seo-prerender" class="seo-prerender" aria-label="Pagina samenvatting">
      <nav class="seo-prerender__nav" aria-label="Belangrijke links"><a href="/aarding">Aardpen slaan en aarding meten</a> <a href="/aardpen-slaan-amsterdam">Aardpen slaan Amsterdam</a> <a href="/diensten">Alle diensten</a> <a href="/veiligheid">Veiligheid, BEI en VCA**</a> <a href="/contact?type=aarding">Prijsindicatie aanvragen</a></nav>
      <h1>Veiligheid, BEI en VCA**</h1>
      <p>Veilig werken en aantoonbaar opleveren met BEI BLS/BHS, VWI's, LMRA, VCA** 2017/6.0, ISO 9001:2015 en SBB erkend leerbedrijf.</p>
      <section>
        <h2>BEI, VCA** en kwaliteit in een aanpak</h2>
        <p>TerreVolt werkt aan veilige uitvoering met LMRA, BEI BLS/BHS, VWI's, duidelijke aanwijzingen, werkgrenzen en bedrijfsspecifieke procedures waar die van toepassing zijn.</p>
        <p>VCA** 2017/6.0 borgt het VGM-beheerssysteem breder in de organisatie: risico's vooraf beoordelen, medewerkers instrueren, werkplekinspecties, incidentopvolging en verbeteren.</p>
        <p>ISO 9001:2015 vult dit aan als kwaliteitsmanagementlaag voor procesbeheersing, klantafspraken, controle, oplevering, terugkoppeling en continue verbetering. SBB erkend leerbedrijf past bij het ontwikkelen van vakmensen.</p>
        <ul><li>BEI BLS/BHS</li><li>VWI's</li><li>LMRA</li><li>VCA** 2017/6.0</li><li>ISO 9001:2015</li><li>SBB erkend leerbedrijf</li><li>VGM-beheerssysteem</li><li>Aantoonbare oplevering</li></ul>
      </section>
      <section>
        <h2>Certificaten en scope</h2>
        <p>TerreVolt vermeldt VCA** 2017/6.0 certificaat 26062501 en ISO 9001:2015 certificaat 26062502, beide geldig t/m 24 juni 2029.</p>
        <p>De certificeringsscope sluit aan op het aanleggen en monteren van data- en energiekabels met inbegrip van civiele werkzaamheden.</p>
      </section>
    </main>`;

function escapeHtml(value) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function routeHtmlFile(route) {
  if (route === "/") return path.join(DIST_DIR, "index.html");
  return path.join(DIST_DIR, ...route.slice(1).split("/"), "index.html");
}

function replaceTitle(html, title) {
  const nextTitle = `<title>${escapeHtml(title)}</title>`;
  if (/<title>[\s\S]*?<\/title>/i.test(html)) {
    return html.replace(/<title>[\s\S]*?<\/title>/i, nextTitle);
  }
  return html.replace(/<\/head>/i, `  ${nextTitle}\n</head>`);
}

function replaceOrInsertMeta(html, attr, key, content) {
  const tagPattern = new RegExp(`<meta(?=[^>]*\\b${attr}=["']${escapeRegExp(key)}["'])[^>]*>`, "i");
  const contentAttr = `content="${escapeHtml(content)}"`;

  if (tagPattern.test(html)) {
    return html.replace(tagPattern, (tag) => {
      if (/\bcontent=["'][^"']*["']/.test(tag)) {
        return tag.replace(/\bcontent=["'][^"']*["']/, contentAttr);
      }
      const closing = tag.trimEnd().endsWith("/>") ? " />" : ">";
      return tag.replace(/\s*\/?>$/, ` ${contentAttr}${closing}`);
    });
  }

  return html.replace(/<\/head>/i, `  <meta ${attr}="${escapeHtml(key)}" ${contentAttr} />\n</head>`);
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

function appendAardingCvFaqValue(value) {
  if (Array.isArray(value)) return value.map(appendAardingCvFaqValue);
  if (!value || typeof value !== "object") return value;

  const next = Object.fromEntries(
    Object.entries(value).map(([key, entry]) => [key, appendAardingCvFaqValue(entry)]),
  );

  if (next["@type"] === "FAQPage" && Array.isArray(next.mainEntity)) {
    const exists = next.mainEntity.some((item) => item?.name === AARDING_CV_FAQ.name);
    if (!exists) next.mainEntity = [...next.mainEntity, AARDING_CV_FAQ];
  }

  return next;
}

function replacePrerenderJsonLd(html, title, description) {
  return html.replace(
    /(<script(?=[^>]*type=["']application\/ld\+json["'])(?=[^>]*data-prerender-seo=["']true["'])[^>]*>)([\s\S]*?)(<\/script>)/gi,
    (match, openTag, rawJson, closeTag) => {
      try {
        const jsonLd = JSON.parse(rawJson);
        return `${openTag}${JSON.stringify(updateJsonLdValue(jsonLd, title, description))}${closeTag}`;
      } catch {
        return match;
      }
    },
  );
}

function appendAardingCvFaqJsonLd(html) {
  return html.replace(
    /(<script(?=[^>]*type=["']application\/ld\+json["'])(?=[^>]*data-prerender-seo=["']true["'])[^>]*>)([\s\S]*?)(<\/script>)/gi,
    (match, openTag, rawJson, closeTag) => {
      try {
        const jsonLd = JSON.parse(rawJson);
        return `${openTag}${JSON.stringify(appendAardingCvFaqValue(jsonLd))}${closeTag}`;
      } catch {
        return match;
      }
    },
  );
}

function replacePrerenderSummary(html, description) {
  return html.replace(
    /(<main id="seo-prerender"[\s\S]*?<section[\s\S]*?<p>)([\s\S]*?)(<\/p>)/i,
    `$1${escapeHtml(description)}$3`,
  );
}

function insertAardingCvContent(html) {
  if (html.includes("CV-ketel storing door slechte aarding?")) return html;
  return html.replace(/\s*<\/main>/i, `\n      ${AARDING_CV_SECTION}\n    </main>`);
}

function replaceVeiligheidPrerenderContent(html) {
  if (html.includes("BEI, VCA** en kwaliteit in een aanpak")) return html;
  return html.replace(/<main id="seo-prerender"[\s\S]*?<\/main>/i, VEILIGHEID_PRERENDER_MAIN);
}

let updatedPages = 0;

for (const [route, meta] of Object.entries(META_OVERRIDES)) {
  const file = routeHtmlFile(route);
  if (!fs.existsSync(file)) continue;

  const original = fs.readFileSync(file, "utf8");
  let html = replaceTitle(original, meta.title);
  html = replaceOrInsertMeta(html, "name", "description", meta.description);
  html = replaceOrInsertMeta(html, "property", "og:title", meta.title);
  html = replaceOrInsertMeta(html, "property", "og:description", meta.description);
  html = replaceOrInsertMeta(html, "property", "og:image:alt", meta.title);
  html = replaceOrInsertMeta(html, "name", "twitter:title", meta.title);
  html = replaceOrInsertMeta(html, "name", "twitter:description", meta.description);
  html = replacePrerenderJsonLd(html, meta.title, meta.description);
  html = replacePrerenderSummary(html, meta.description);

  if (route === "/aarding") {
    html = appendAardingCvFaqJsonLd(html);
    html = insertAardingCvContent(html);
  }

  if (route === "/veiligheid") {
    html = replaceVeiligheidPrerenderContent(html);
  }

  if (html !== original) {
    fs.writeFileSync(file, html);
    updatedPages += 1;
  }
}

console.log(`Tightened SEO metadata on ${updatedPages} prerendered page(s).`);
