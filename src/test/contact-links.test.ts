/**
 * Vitest-runner voor de contact-link linter.
 * Gebruikt dezelfde module als de Vite build-plugin, zodat lokale tests
 * en build-time validatie identieke regels hanteren.
 */
import { describe, it, expect } from "vitest";
import { join } from "node:path";
import { lintContactLinks } from "../../scripts/lint-contact-links.mjs";

const ROOT = join(__dirname, "..", "..");

describe("Contact-link linter (build-time)", () => {
  const { issues, expectedTel, expectedMail, scanned } = lintContactLinks(ROOT);

  it("scant src/-bestanden", () => {
    expect(scanned).toBeGreaterThan(0);
  });

  it("verwacht waarden afgeleid van company.ts", () => {
    expect(expectedTel).toMatch(/^tel:\+\d{8,15}$/);
    expect(expectedMail).toMatch(/^mailto:[^\s@]+@[^\s@]+\.[^\s@]+$/);
  });

  it("vindt geen tel:/mailto:-problemen in de codebase", () => {
    const formatted = issues
      .map((i) => `  ${i.file}:${i.line}:${i.col} [${i.rule}] ${i.message}`)
      .join("\n");
    expect(issues, `Linter-issues:\n${formatted}`).toEqual([]);
  });
});
