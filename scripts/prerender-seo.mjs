import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const SITE_URL = "https://terrevolt.nl";
const OG_IMAGE = `${SITE_URL}/og-image.jpg`;

const pages = [
  {
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
    summaryHtml: `
      <h1>Aardpen laten slaan in Amsterdam</h1>
      <p>TerreVolt slaat aardpennen en meet aarding in Amsterdam voor woningen, meterkasten, laadpalen, zonnepanelen, VvE's, installateurs en bedrijven.</p>
      <p>Stuur postcode en een foto van de meterkast voor een duidelijke prijsindicatie. Meetrapport mogelijk voor installateur, keuring, VvE of opleverdossier.</p>
      <ul>
        <li>Aardpen slaan voor oude woning, renovatie of nieuwe meterkast</li>
        <li>Aarding meten met duidelijke meetwaarden</li>
        <li>Aarding voor laadpaal, zonnepanelen en bedrijfspand</li>
        <li>Werkgebied: Amsterdam, Amstelveen, Diemen, Zaandam, Weesp, Haarlem, Hoofddorp en Almere</li>
      </ul>
    `,
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "Service",
        name: "Aardpen slaan Amsterdam",
        serviceType: "Aardpen slaan, aarding meten en meetrapport in Amsterdam",
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
          { "@type": "ServiceChannel", name: "Telefonisch contact", servicePhone: { "@type": "ContactPoint", telephone: "+31634487467" } },
        ],
      },
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "Wat kost een aardpen laten slaan in Amsterdam?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "De prijs hangt af van bodem, diepte, bereikbaarheid, aansluiting op de meterkast en of u een meetrapport nodig heeft. Stuur postcode en foto's mee voor een duidelijke prijsindicatie.",
            },
          },
          {
            "@type": "Question",
            name: "Krijg ik een meetrapport na het slaan van de aardpen?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Ja, als u dat nodig heeft. Het meetrapport bevat de gemeten aardverspreidingsweerstand, datum, locatie en meetmethode.",
            },
          },
        ],
      },
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
          { "@type": "ListItem", position: 2, name: "Aarding", item: `${SITE_URL}/aarding-aanleggen` },
          { "@type": "ListItem", position: 3, name: "Aardpen slaan Amsterdam", item: `${SITE_URL}/aardpen-slaan-amsterdam` },
        ],
      },
    ],
  },
  {
    path: "/aarding-aanleggen",
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
    summaryHtml: `
      <h1>Aardpen laten slaan en aarding laten meten</h1>
      <p>TerreVolt plaatst en meet aardingsvoorzieningen voor woningen, meterkasten, laadpalen, zonnepanelen, bedrijfspanden en technische installaties.</p>
      <p>U krijgt duidelijke uitvoering, controlemetingen en indien gewenst een meetrapport voor installateur, netbeheerder, keuring of opleverdossier.</p>
      <ul>
        <li>Aardpen slaan voor woning, meterkast, laadpaal of zonnepanelen</li>
        <li>Aardingsmeting en meetrapport mogelijk</li>
        <li>Voor particulieren, installateurs en zakelijke opdrachtgevers</li>
      </ul>
    `,
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "Service",
        name: "Aardpen laten slaan en aarding meten",
        serviceType: "Aardpen slaan, aarding aanleggen en aardingsmeting met meetrapport",
        url: `${SITE_URL}/aarding-aanleggen`,
        provider: { "@id": `${SITE_URL}/#organization` },
        areaServed: { "@type": "Country", name: "Nederland" },
      },
    ],
  },
];

const distDir = path.resolve("dist");
const indexPath = path.join(distDir, "index.html");

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

  const jsonLd = page.jsonLd
    .map((obj) => `<script type="application/ld+json" data-prerender-seo="true">${escapeJsonForHtml(obj)}</script>`)
    .join("\n    ");
  html = html.replace("</head>", `    ${jsonLd}\n  </head>`);

  const noscript = `<noscript><main class="seo-fallback">${page.summaryHtml}</main></noscript>`;
  html = html.replace('<div id="root"></div>', `<div id="root">${noscript}</div>`);

  return html;
}

const baseHtml = await readFile(indexPath, "utf8");

for (const page of pages) {
  const outputDir = path.join(distDir, page.path.slice(1));
  await mkdir(outputDir, { recursive: true });
  await writeFile(path.join(outputDir, "index.html"), withPageMeta(baseHtml, page), "utf8");
}

console.log(`SEO prerendered ${pages.length} landing pages.`);
