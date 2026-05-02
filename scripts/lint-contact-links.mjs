/**
 * Contact-link linter — gedeeld tussen Vite build-plugin en Vitest.
 *
 * Detecteert in src/:
 *   1. statische tel:/mailto: hrefs die afwijken van src/config/company.ts
 *   2. dubbele placeholders / prefix-fouten:
 *        tel:tel:...           mailto:mailto:...
 *        tel:${telHref}        mailto:${mailHref}
 *        tel:${`tel:...`}      etc.
 *   3. tel:-nummers die geen E.164 zijn (+ optionele scheidingstekens)
 *   4. mailto:-adressen die geen geldig e-mailformaat hebben
 *
 * De module exporteert lintContactLinks() die een lijst van issues teruggeeft.
 * Als de lijst leeg is, is alles in orde.
 */

import { readFileSync, readdirSync, statSync } from "node:fs";
import { dirname, join, relative } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const SCAN_EXTS = [".ts", ".tsx", ".js", ".jsx", ".html"];
const SKIP_DIRS = new Set(["node_modules", "dist", "build", ".next", ".git"]);
const SKIP_FILE_SUFFIX = [
  "/config/company.ts",
  "/test/contact-links.test.ts",
  "/scripts/lint-contact-links.mjs",
  "/scripts/vite-plugin-contact-links.mjs",
];

/** @typedef {{ file: string; line: number; col: number; rule: string; message: string; snippet: string }} Issue */

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

/**
 * Parseert src/config/company.ts statisch (zonder TS-loader).
 * Zoekt e164, email — voldoende voor deze linter.
 */
function readCompany(srcDir) {
  const src = readFileSync(join(srcDir, "config/company.ts"), "utf8");
  const e164 = src.match(/e164:\s*"([^"]+)"/)?.[1];
  const email = src.match(/email:\s*"([^"]+)"/)?.[1];
  if (!e164 || !email) {
    throw new Error("lint-contact-links: kon e164/email niet vinden in src/config/company.ts");
  }
  return { e164, email };
}

const E164_RE = /^\+\d{8,15}$/;
const EMAIL_RE = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

/**
 * Hoofd-linter. Rootpad = projectroot (waar src/ in staat).
 */
export function lintContactLinks(projectRoot) {
  const srcDir = join(projectRoot, "src");
  const company = readCompany(srcDir);
  const expectedTel = `tel:${company.e164}`;
  const expectedMail = `mailto:${company.email}`;

  const files = walk(srcDir).filter(
    (f) => !SKIP_FILE_SUFFIX.some((suf) => f.endsWith(suf.replaceAll("/", "/"))),
  );

  /** @type {Issue[]} */
  const issues = [];

  for (const file of files) {
    const text = readFileSync(file, "utf8");
    const rel = relative(projectRoot, file);
    const lines = text.split("\n");

    lines.forEach((lineText, i) => {
      const lineNo = i + 1;

      // Rule 2a: dubbele scheme-prefix
      const dupRe = /\b(tel:tel:|mailto:mailto:)/g;
      for (const m of lineText.matchAll(dupRe)) {
        issues.push({
          file: rel, line: lineNo, col: (m.index ?? 0) + 1,
          rule: "duplicate-scheme",
          message: `Dubbele scheme-prefix "${m[1]}" — verwijder de extra "tel:" of "mailto:".`,
          snippet: lineText.trim(),
        });
      }

      // Rule 2b: tel:${telHref} of mailto:${mailHref} (placeholder bevat al de href)
      const wrapRe = /(tel|mailto):\$\{\s*(telHref|mailHref)\s*\}/g;
      for (const m of lineText.matchAll(wrapRe)) {
        issues.push({
          file: rel, line: lineNo, col: (m.index ?? 0) + 1,
          rule: "wrapped-href",
          message: `"${m[0]}" — gebruik {${m[2]}} direct als href, niet ingepakt in een ${m[1]}: prefix.`,
          snippet: lineText.trim(),
        });
      }

      // Rule 2c: tel:${`tel:..`} of mailto:${`mailto:..`} (template binnen template)
      const tplRe = /(tel|mailto):\$\{[^}]*\b(tel|mailto):/g;
      for (const m of lineText.matchAll(tplRe)) {
        issues.push({
          file: rel, line: lineNo, col: (m.index ?? 0) + 1,
          rule: "nested-scheme",
          message: `Geneste "${m[2]}:" binnen een ${m[1]}:-template — placeholder bevat al een prefix.`,
          snippet: lineText.trim(),
        });
      }

      // Rule 1 + 3: statische tel:-href moet exact matchen
      const telRe = /tel:[+\d][\d\s().-]{4,}/g;
      for (const m of lineText.matchAll(telRe)) {
        const val = m[0];
        const normalized = val.replace(/^tel:/, "").replace(/[\s().-]/g, "");
        if (val !== expectedTel) {
          if (!E164_RE.test(normalized)) {
            issues.push({
              file: rel, line: lineNo, col: (m.index ?? 0) + 1,
              rule: "tel-format",
              message: `"${val}" voldoet niet aan E.164 (verwacht +<landcode><nummer>, geen scheidingstekens).`,
              snippet: lineText.trim(),
            });
          } else {
            issues.push({
              file: rel, line: lineNo, col: (m.index ?? 0) + 1,
              rule: "tel-mismatch",
              message: `"${val}" wijkt af van company.phone.e164 ("${expectedTel}").`,
              snippet: lineText.trim(),
            });
          }
        }
      }

      // Rule 1 + 4: statische mailto:-href moet exact matchen
      const mailRe = /mailto:[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/g;
      for (const m of lineText.matchAll(mailRe)) {
        const val = m[0];
        const addr = val.replace(/^mailto:/, "");
        if (val !== expectedMail) {
          if (!EMAIL_RE.test(addr)) {
            issues.push({
              file: rel, line: lineNo, col: (m.index ?? 0) + 1,
              rule: "mail-format",
              message: `"${val}" is geen geldig e-mailadres.`,
              snippet: lineText.trim(),
            });
          } else {
            issues.push({
              file: rel, line: lineNo, col: (m.index ?? 0) + 1,
              rule: "mail-mismatch",
              message: `"${val}" wijkt af van company.email ("${expectedMail}").`,
              snippet: lineText.trim(),
            });
          }
        }
      }

      // Rule 5: JSON-LD / OG telephone — moet exact E.164 zijn en gelijk aan company.phone.e164
      // Vangt: "telephone": "...", telephone: "...", content="+316..." in og:phone_number
      const jsonTelRe = /(?:["']?telephone["']?\s*:\s*|og:phone_number["'][^>]*content\s*=\s*)["']([^"']+)["']/g;
      for (const m of lineText.matchAll(jsonTelRe)) {
        const val = m[1];
        if (!E164_RE.test(val)) {
          issues.push({
            file: rel, line: lineNo, col: (m.index ?? 0) + 1,
            rule: "tel-format",
            message: `JSON-LD/OG telephone "${val}" is geen E.164.`,
            snippet: lineText.trim(),
          });
        } else if (val !== company.e164) {
          issues.push({
            file: rel, line: lineNo, col: (m.index ?? 0) + 1,
            rule: "tel-mismatch",
            message: `JSON-LD/OG telephone "${val}" wijkt af van company.phone.e164 ("${company.e164}").`,
            snippet: lineText.trim(),
          });
        }
      }

      // Rule 6: JSON-LD / OG email — moet exact gelijk zijn aan company.email
      const jsonMailRe = /(?:["']?email["']?\s*:\s*|og:email["'][^>]*content\s*=\s*)["']([^"']+)["']/g;
      for (const m of lineText.matchAll(jsonMailRe)) {
        const val = m[1];
        // skip form-field defaults zoals email: String(fd.get("email")...) — die hebben geen quoted literal hier
        if (!EMAIL_RE.test(val)) {
          issues.push({
            file: rel, line: lineNo, col: (m.index ?? 0) + 1,
            rule: "mail-format",
            message: `JSON-LD/OG email "${val}" is geen geldig e-mailadres.`,
            snippet: lineText.trim(),
          });
        } else if (val !== company.email) {
          issues.push({
            file: rel, line: lineNo, col: (m.index ?? 0) + 1,
            rule: "mail-mismatch",
            message: `JSON-LD/OG email "${val}" wijkt af van company.email ("${company.email}").`,
            snippet: lineText.trim(),
          });
        }
      }

    });
  }

  return { issues, expectedTel, expectedMail, scanned: files.length };
}

/** Nette CLI-output, geeft non-zero exit code bij issues. */
export function formatIssues(issues) {
  if (issues.length === 0) return "✓ Contact-links: geen problemen gevonden.";
  const lines = ["✗ Contact-links: problemen gevonden:\n"];
  for (const i of issues) {
    lines.push(`  ${i.file}:${i.line}:${i.col}  [${i.rule}]  ${i.message}`);
    lines.push(`    > ${i.snippet}`);
  }
  return lines.join("\n");
}

// CLI-modus: `node scripts/lint-contact-links.mjs`
const isMain =
  import.meta.url === pathToFileURL(process.argv[1] ?? "").href;
if (isMain) {
  const root = dirname(dirname(fileURLToPath(import.meta.url)));
  const { issues } = lintContactLinks(root);
  console.log(formatIssues(issues));
  process.exit(issues.length === 0 ? 0 : 1);
}
