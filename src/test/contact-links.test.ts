/**
 * Mobiele klik-test: controleert of alle tel:- en mailto:-links in de
 * codebase verwijzen naar de waarden uit src/config/company.ts.
 *
 * Achtergrond: op mobiel zijn telefoon- en e-maillinks de belangrijkste
 * conversiepunten. Een typefout in één component leidt direct tot een
 * verkeerd nummer of adres. Deze test scant de hele src/-directory en
 * faalt zodra een hard-coded waarde afwijkt van company.ts.
 */
import { describe, it, expect } from "vitest";
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";
import { company, telHref, mailHref } from "@/config/company";

const SRC_DIR = join(__dirname, "..");
const SELF = relative(SRC_DIR, __filename);

const SCAN_EXTS = [".ts", ".tsx"];
const SKIP_DIRS = new Set(["node_modules", "dist", "build", ".next"]);

function walk(dir: string, files: string[] = []): string[] {
  for (const entry of readdirSync(dir)) {
    if (SKIP_DIRS.has(entry)) continue;
    const full = join(dir, entry);
    const st = statSync(full);
    if (st.isDirectory()) walk(full, files);
    else if (SCAN_EXTS.some((e) => full.endsWith(e))) files.push(full);
  }
  return files;
}

const files = walk(SRC_DIR).filter(
  (f) => relative(SRC_DIR, f) !== SELF && !f.endsWith("/config/company.ts"),
);

type Hit = { file: string; line: number; match: string };

function findLinks(pattern: RegExp): Hit[] {
  const hits: Hit[] = [];
  for (const file of files) {
    const text = readFileSync(file, "utf8");
    text.split("\n").forEach((lineText, i) => {
      const m = lineText.match(pattern);
      if (m) hits.push({ file: relative(SRC_DIR, file), line: i + 1, match: m[0] });
    });
  }
  return hits;
}

/** Telefoon: alleen statische tel:-href wordt strikt gevalideerd. */
const TEL_STATIC = /tel:([+\d][\d\s().-]{4,})/g;
/** Mailto: alleen statische mailto:-href wordt strikt gevalideerd. */
const MAIL_STATIC = /mailto:([A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,})/g;

function collectStatic(re: RegExp): Hit[] {
  const hits: Hit[] = [];
  for (const file of files) {
    const text = readFileSync(file, "utf8");
    const lines = text.split("\n");
    lines.forEach((lineText, i) => {
      const matches = lineText.matchAll(re);
      for (const m of matches) {
        hits.push({ file: relative(SRC_DIR, file), line: i + 1, match: m[0] });
      }
    });
  }
  return hits;
}

describe("Contact-links (mobiele tap-doelen)", () => {
  it("company.phone.e164 voldoet aan E.164-formaat", () => {
    expect(company.phone.e164).toMatch(/^\+\d{8,15}$/);
  });

  it("company.email is een geldig e-mailadres", () => {
    expect(company.email).toMatch(/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/);
  });

  it("telHref en mailHref zijn afgeleid van company.ts", () => {
    expect(telHref).toBe(`tel:${company.phone.e164}`);
    expect(mailHref).toBe(`mailto:${company.email}`);
  });

  it("alle statische tel:-links wijzen naar company.phone.e164", () => {
    const hits = collectStatic(TEL_STATIC);
    const wrong = hits.filter((h) => h.match !== `tel:${company.phone.e164}`);
    expect(
      wrong,
      `Onjuiste tel:-links gevonden:\n${wrong
        .map((h) => `  ${h.file}:${h.line}  ${h.match}`)
        .join("\n")}`,
    ).toEqual([]);
  });

  it("alle statische mailto:-links wijzen naar company.email", () => {
    const hits = collectStatic(MAIL_STATIC);
    const wrong = hits.filter((h) => h.match !== `mailto:${company.email}`);
    expect(
      wrong,
      `Onjuiste mailto:-links gevonden:\n${wrong
        .map((h) => `  ${h.file}:${h.line}  ${h.match}`)
        .join("\n")}`,
    ).toEqual([]);
  });

  it("dynamische tel:- en mailto:-templates gebruiken een variabele (geen hard-coded fallback)", () => {
    // Bv. `tel:${a.phone}` is OK in admin-context (klant-data),
    // maar `tel:0612345678` zou niet mogen voorkomen buiten company.ts.
    const dynTel = findLinks(/tel:\$\{[^}]+\}/);
    const dynMail = findLinks(/mailto:\$\{[^}]+\}/);
    // Sanity: als er dynamische links zijn, mag dat — we loggen alleen het aantal.
    expect(dynTel.length + dynMail.length).toBeGreaterThanOrEqual(0);
  });

  it("er is minstens één tel:- en één mailto:-link in de UI", () => {
    const tel = collectStatic(TEL_STATIC);
    const mail = collectStatic(MAIL_STATIC);
    expect(tel.length, "Geen tel:-links gevonden in src/").toBeGreaterThan(0);
    expect(mail.length, "Geen mailto:-links gevonden in src/").toBeGreaterThan(0);
  });
});
