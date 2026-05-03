/**
 * CTA-missiecontrole — linter voor publieke en admin pagina's.
 *
 * Detecteert per pagina-bestand (src/pages/**\/*.tsx):
 *   1. MISSING_CTA   – pagina heeft géén actiegerichte knop/link
 *      (geen <Button>, <Link to=...>, <a href=...> met CTA-tekst).
 *   2. MOBILE_HIDDEN_CTA – een CTA-element staat in een tak die expliciet
 *      verborgen is op mobiel (bijv. className bevat `hidden md:` of
 *      `hidden sm:` of `lg:hidden` als de element-tak juist >= md is)
 *      zonder dat er een mobiele tegenhanger met dezelfde CTA-tekst bestaat
 *      in hetzelfde bestand.
 *
 * Sommige bestanden zijn structureel CTA-loos (bijv. Privacy, NotFound,
 * AdminLogin, AdminLayout shells); die staan in EXEMPT.
 *
 * De module exporteert lintCtaCoverage() en wordt zowel door de
 * Vitest-suite als door een eventuele Vite build-plugin geconsumeerd.
 */

import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const SCAN_DIRS = ["src/pages"];
const SKIP_DIRS = new Set(["node_modules", "dist", "build", ".git"]);

// Pagina's die bewust geen CTA hebben (juridisch / shells / errors / login).
const EXEMPT = new Set([
  "src/pages/Privacy.tsx",
  "src/pages/NotFound.tsx",
  "src/pages/admin/AdminLayout.tsx",
  "src/pages/admin/AdminLogin.tsx",
]);

// Woorden die we als CTA-tekst herkennen (NL).
const CTA_WORDS = [
  "bel", "bellen", "mail", "mailen", "whatsapp", "contact",
  "offerte", "aanvragen", "aanvraag", "plan", "afspraak",
  "solliciteer", "solliciteren", "aanmelden", "verstuur",
  "opslaan", "bekijken", "bekijk", "download", "exporteer",
  "csv", "vernieuwen", "nieuwe", "publiceer", "publiceren",
  "depubliceren", "verwijderen", "dupliceren", "bewerken",
  "annuleren", "inloggen", "uitloggen", "terug", "verder",
  "lees meer", "meer info", "ontdek", "start", "begin",
  "open", "ga naar", "→", "ontvang",
];

/** @typedef {{ file: string; line: number; rule: string; message: string; snippet: string }} Issue */

function walk(dir, files = []) {
  for (const entry of readdirSync(dir)) {
    if (SKIP_DIRS.has(entry)) continue;
    const full = join(dir, entry);
    const st = statSync(full);
    if (st.isDirectory()) walk(full, files);
    else if (full.endsWith(".tsx")) files.push(full);
  }
  return files;
}

const CTA_REGEX = new RegExp(
  `(?:<Button[\\s\\S]*?>|<Link[\\s\\S]*?>|<a\\s[\\s\\S]*?>)([\\s\\S]*?)(?:</Button>|</Link>|</a>)`,
  "gi",
);

function hasCtaText(inner) {
  const stripped = inner.replace(/\{[^}]*\}/g, " ").replace(/<[^>]+>/g, " ").toLowerCase();
  return CTA_WORDS.some((w) => stripped.includes(w));
}

// Vindt het regelnummer van een index in een string.
function lineOf(src, index) {
  return src.slice(0, index).split("\n").length;
}

// Heuristiek: tel CTA's per "zichtbaarheidsbucket".
//   - "all"        : geen hidden-classes op of rond het element
//   - "desktop"    : element staat in een container of zelf met `hidden md:` of `hidden lg:` of `hidden sm:`
//   - "mobile"     : element zelf heeft `md:hidden` of `lg:hidden` (alleen mobile zichtbaar)
//
// We scannen het volledige bestand en kijken naar de className van het element
// én de dichtstbijzijnde wrapper-className tot ~6 regels boven het element.
function visibilityBucket(src, ctaStartIdx, ctaInnerHtml) {
  const before = src.slice(Math.max(0, ctaStartIdx - 600), ctaStartIdx);
  const tagOpen = src.slice(ctaStartIdx, ctaStartIdx + 600);

  const classMatch = /className\s*=\s*(?:"([^"]*)"|\{`([^`]*)`\}|\{"([^"]*)"\})/.exec(tagOpen);
  const ownClass = (classMatch?.[1] || classMatch?.[2] || classMatch?.[3] || "").toLowerCase();

  // Pak de laatste paar wrapper-classNames vóór deze CTA.
  const wrapperClasses = Array.from(
    before.matchAll(/className\s*=\s*(?:"([^"]*)"|\{`([^`]*)`\}|\{"([^"]*)"\})/g),
  )
    .slice(-3)
    .map((m) => (m[1] || m[2] || m[3] || "").toLowerCase());

  const all = [ownClass, ...wrapperClasses].join(" ");

  const desktopOnly =
    /\bhidden\s+(?:sm|md|lg|xl):(?:flex|block|inline|grid|inline-flex|inline-block)\b/.test(all);
  const mobileOnly = /\b(?:sm|md|lg|xl):hidden\b/.test(all) && !desktopOnly;

  if (desktopOnly) return "desktop";
  if (mobileOnly) return "mobile";
  return "all";
}

export function lintCtaCoverage(rootDir = process.cwd()) {
  /** @type {Issue[]} */
  const issues = [];
  let scanned = 0;

  const files = SCAN_DIRS.flatMap((d) => {
    try {
      return walk(join(rootDir, d));
    } catch {
      return [];
    }
  });

  for (const abs of files) {
    const rel = relative(rootDir, abs).replaceAll("\\", "/");
    if (EXEMPT.has(rel)) continue;
    scanned++;

    const src = readFileSync(abs, "utf8");

    // Verzamel alle CTA-elementen met hun bucket en tekst.
    const ctas = [];
    for (const m of src.matchAll(CTA_REGEX)) {
      const inner = m[1] ?? "";
      if (!hasCtaText(inner)) continue;
      const bucket = visibilityBucket(src, m.index ?? 0, inner);
      const label = inner
        .replace(/\{[^}]*\}/g, " ")
        .replace(/<[^>]+>/g, " ")
        .replace(/\s+/g, " ")
        .trim()
        .toLowerCase();
      ctas.push({ index: m.index ?? 0, bucket, label, snippet: m[0].slice(0, 160) });
    }

    // 1) MISSING_CTA – geen enkele CTA in het bestand.
    if (ctas.length === 0) {
      issues.push({
        file: rel,
        line: 1,
        rule: "MISSING_CTA",
        message: "Pagina bevat geen actiegerichte knop of link.",
        snippet: "",
      });
      continue;
    }

    // 2) MOBILE_HIDDEN_CTA – CTA staat in een desktop-only tak,
    //    en er is geen identieke (of soortgelijke) CTA in de "all"- of
    //    "mobile"-bucket binnen hetzelfde bestand.
    const mobileLabels = new Set(
      ctas.filter((c) => c.bucket !== "desktop").map((c) => c.label),
    );

    for (const c of ctas) {
      if (c.bucket !== "desktop") continue;
      // Match exact, of een variant waarin de mobile-label de desktop-label bevat (bv. icon-only).
      const hasMobileEquivalent =
        mobileLabels.has(c.label) ||
        Array.from(mobileLabels).some(
          (l) => l && (l.includes(c.label) || c.label.includes(l)),
        );
      if (hasMobileEquivalent) continue;
      issues.push({
        file: rel,
        line: lineOf(src, c.index),
        rule: "MOBILE_HIDDEN_CTA",
        message: `CTA "${c.label.slice(0, 60)}" is enkel zichtbaar op desktop (hidden …:block/flex/…) zonder mobiele tegenhanger.`,
        snippet: c.snippet,
      });
    }
  }

  return { issues, scanned };
}

// CLI: `node scripts/lint-cta-coverage.mjs`
if (import.meta.url === `file://${process.argv[1]}`) {
  const { issues, scanned } = lintCtaCoverage(process.cwd());
  console.log(`CTA-missiecontrole: ${scanned} pagina(s) gescand.`);
  if (issues.length === 0) {
    console.log("✓ Geen problemen gevonden.");
    process.exit(0);
  }
  for (const i of issues) {
    console.log(`  ${i.file}:${i.line} [${i.rule}] ${i.message}`);
  }
  process.exit(1);
}
