/**
 * Vitest-runner voor de reactietijd-linter.
 * Faalt build/CI als "binnen N werkdagen"-varianten buiten recruitment-context
 * voorkomen.
 */
import { describe, it, expect } from "vitest";
import { join } from "node:path";
import { lintResponseTime } from "../../scripts/lint-response-time.mjs";

const ROOT = join(__dirname, "..", "..");

describe("Reactietijd-linter (build-time)", () => {
  const { issues, scanned } = lintResponseTime(ROOT);

  it("scant src-bestanden", () => {
    expect(scanned).toBeGreaterThan(0);
  });

  it("vindt geen verboden 'werkdagen'-varianten buiten recruitment", () => {
    const formatted = issues
      .map((i) => `  ${i.file}:${i.line} [${i.rule}] ${i.message}\n     ↳ ${i.snippet}`)
      .join("\n");
    expect(issues, `Verboden reactietijd-labels:\n${formatted}`).toEqual([]);
  });
});
