/**
 * Vitest-runner voor de CTA-missiecontrole.
 * Detecteert ontbrekende of mobile-only verborgen CTAs op publieke en admin pagina's.
 */
import { describe, it, expect } from "vitest";
import { join } from "node:path";
import { lintCtaCoverage } from "../../scripts/lint-cta-coverage.mjs";

const ROOT = join(__dirname, "..", "..");

describe("CTA-missiecontrole (build-time)", () => {
  const { issues, scanned } = lintCtaCoverage(ROOT);

  it("scant pagina-bestanden", () => {
    expect(scanned).toBeGreaterThan(0);
  });

  it("vindt geen MISSING_CTA of MOBILE_HIDDEN_CTA", () => {
    const formatted = issues
      .map((i) => `  ${i.file}:${i.line} [${i.rule}] ${i.message}`)
      .join("\n");
    expect(issues, `CTA-issues:\n${formatted}`).toEqual([]);
  });
});
