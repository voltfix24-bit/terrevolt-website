/**
 * Reactietijd-linter — bewaakt het gebruik van "binnen N werkdagen"-varianten.
 *
 * Regels:
 *   - "binnen 2 werkdagen" (en varianten) zijn ALLEEN toegestaan in
 *     recruitment-context: Werken bij, sollicitaties, ZZP-aanmeldingen,
 *     vacatureformulieren en vacaturedetail.
 *   - In zakelijke contactblokken (Over, Contact, CTA, Footer, Team-cards
 *     buiten recruitment, projectaanvragen) is dit verboden — gebruik in plaats
 *     daarvan: "Direct bereikbaar voor projectvragen", "Bel direct voor overleg",
 *     "Korte lijnen met Team TerreVolt", of "Direct contact met ons team".
 *
 * Heuristiek: we matchen alleen JSX-tekstcontent en stringliterals (inclusief
 * template strings); commentaarregels worden overgeslagen om documentatie en
 * deze linter zelf niet te triggeren.
 */

import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const SCAN_EXTS = [".ts", ".tsx", ".js", ".jsx"];
const SKIP_DIRS = new Set(["node_modules", "dist", "build", ".git"]);

// Bestanden waarin de recruitment-tekst expliciet is toegestaan.
const RECRUITMENT_ALLOWLIST = [
  /^src\/pages\/WerkenBij\.tsx$/,
  /^src\/pages\/VacatureDetail\.tsx$/,
  /^src\/pages\/admin\/AdminVacanc/, // Admin-formulieren rond vacatures
  /^src\/pages\/admin\/AdminApplications\.tsx$/,
  /^src\/data\/vacatures\.ts$/,
];

// Linter-zelf en tests negeren we sowieso (anders triggert de regex op zichzelf).
const SELF_SKIP = [
  /\/scripts\/lint-response-time\.mjs$/,
  /\/test\/response-time\.test\.ts$/,
  /\/scripts\/lint-cta-coverage\.mjs$/,
  /\/scripts\/lint-contact-links\.mjs$/,
];

// De verboden varianten (case-insensitive).
const FORBIDDEN_PATTERNS = [
  /reageert\s+binnen\s+\d+\s+werkdag(?:en)?/i,
  /eerste\s+reactie\s+binnen\s+\d+\s+werkdag(?:en)?/i,
  /we\s+reageren\s+binnen\s+\d+\s+werkdag(?:en)?/i,
  /reactie\s+binnen\s+\d+\s+werkdag(?:en)?/i,
  /antwoord\s+binnen\s+\d+\s+werkdag(?:en)?/i,
  /binnen\s+\d+\s+werkdag(?:en)?\s+(?:contact|reactie|antwoord|terug)/i,
];

/** @typedef {{ file: string; line: number; rule: string; message: string; snippet: string }} Issue */

function walk(dir, files = []) {
  for (const entry of readdirSync(dir)) {
    if (SKIP_DIRS.has(entry)) continue;
    const full = join(dir, entry);
    const st = statSync(full);
    if (st.isDirectory()) walk(full, files);
    else if (SCAN_EXTS.some((e) => full.endsWith(e))) files.push(full);
  }
  return files;
}

// Strip line- en block-comments zodat documentatie geen false positives geeft.
function stripComments(src) {
  return src
    .replace(/\/\*[\s\S]*?\*\//g, (m) => m.replace(/[^\n]/g, " "))
    .replace(/(^|[^:])\/\/[^\n]*/g, (m, p1) => p1 + " ");
}

export function lintResponseTime(rootDir = process.cwd()) {
  /** @type {Issue[]} */
  const issues = [];
  let scanned = 0;

  let files = [];
  try {
    files = walk(join(rootDir, "src"));
  } catch {
    return { issues, scanned };
  }

  for (const abs of files) {
    const rel = relative(rootDir, abs).replaceAll("\\", "/");
    if (SELF_SKIP.some((r) => r.test(rel))) continue;
    if (RECRUITMENT_ALLOWLIST.some((r) => r.test(rel))) continue;
    scanned++;

    const raw = readFileSync(abs, "utf8");
    const src = stripComments(raw);
    const lines = src.split("\n");

    lines.forEach((line, idx) => {
      for (const re of FORBIDDEN_PATTERNS) {
        const m = re.exec(line);
        if (m) {
          issues.push({
            file: rel,
            line: idx + 1,
            rule: "FORBIDDEN_RESPONSE_TIME",
            message: `"${m[0]}" is niet toegestaan buiten recruitment-context. Gebruik bv. "Direct bereikbaar voor projectvragen".`,
            snippet: line.trim().slice(0, 200),
          });
          break;
        }
      }
    });
  }

  return { issues, scanned };
}

// CLI: `node scripts/lint-response-time.mjs`
if (import.meta.url === `file://${process.argv[1]}`) {
  const { issues, scanned } = lintResponseTime(process.cwd());
  console.log(`Reactietijd-linter: ${scanned} bestand(en) gescand.`);
  if (issues.length === 0) {
    console.log("✓ Geen verboden 'werkdagen'-varianten buiten recruitment.");
    process.exit(0);
  }
  for (const i of issues) {
    console.log(`  ${i.file}:${i.line} [${i.rule}] ${i.message}`);
    console.log(`     ↳ ${i.snippet}`);
  }
  process.exit(1);
}
