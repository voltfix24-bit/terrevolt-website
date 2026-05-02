import { test, expect } from "@playwright/test";
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

/**
 * Controleert dat anker-links op /veiligheid het juiste doel-element net
 * onder de sticky header + subnav plaatsen — ook wanneer de iOS-URL-bar
 * in/uitklapt (gesimuleerd door viewport-hoogte te wijzigen) en bij
 * iPhone-modellen met een notch / safe-area-inset-top.
 *
 * Acceptatie per anker:
 *   - target.top  >= stickyOffset - TOL_BOVEN   (niet verborgen onder header/subnav)
 *   - target.top  <= stickyOffset + TOL_ONDER   (niet onnodig ver eronder)
 *
 * Per project (iPhone SE / 12 / 14 Pro Max + Pixel 5) wordt een rapport
 * geschreven naar `test-results/veiligheid-anchor-offset/<project>/`.
 */

const ANCHORS = [
  "veiligheidsaanpak",
  "bei-vwi",
  "rollen",
  "locatie-eisen",
  "faq",
  "contact",
] as const;

const ROUTE = "/veiligheid";
const REPORT_ROOT = "test-results/veiligheid-anchor-offset";
const TOL_BOVEN = 4; // px — target mag niet meer dan 4px onder de offset-lijn verdwijnen
const TOL_ONDER = 24; // px — target mag tot 24px onder de offset-lijn beginnen

const projectSlug = (name: string) =>
  name.replace(/[^a-z0-9-_]/gi, "-").toLowerCase() || "default";

type AnchorCheck = {
  anchor: string;
  phase: "initial" | "url-bar-collapsed";
  stickyOffset: number;
  safeAreaTop: number;
  targetTop: number;
  delta: number; // targetTop - stickyOffset
  pass: boolean;
};

const allResults: Record<string, AnchorCheck[]> = {};

test.describe("/veiligheid anker-offset met dynamische URL-bar / safe-area", () => {
  for (const anchor of ANCHORS) {
    test(`#${anchor} landt net onder sticky header + subnav`, async ({
      page,
    }, testInfo) => {
      const projectKey = projectSlug(testInfo.project.name);
      allResults[projectKey] ||= [];

      // ---- Fase 1: directe deep-link met URL-bar "uitgeklapt" (initial viewport) ----
      await page.goto(`${ROUTE}#${anchor}`, { waitUntil: "networkidle" });
      // Geef HashScroll + smooth-scroll de tijd om te settelen.
      await page.waitForTimeout(700);

      const measure = async (phase: AnchorCheck["phase"]) => {
        const data = await page.evaluate((id) => {
          const header = document.querySelector("header");
          const subnav = document.querySelector(
            'nav[aria-label="Veiligheid subnavigatie"], nav[aria-label*="subnav" i], nav[aria-label*="Veiligheid" i]',
          ) as HTMLElement | null;
          const target = document.getElementById(id);
          const headerH = header ? header.getBoundingClientRect().height : 0;
          const subnavH = subnav ? subnav.getBoundingClientRect().height : 0;
          const safeAreaRaw = getComputedStyle(document.documentElement)
            .getPropertyValue("--safe-area-inset-top")
            .trim();
          const safeAreaTop = parseFloat(safeAreaRaw) || 0;
          const targetTop = target
            ? target.getBoundingClientRect().top
            : Number.NaN;
          return {
            headerH,
            subnavH,
            stickyOffset: headerH + subnavH,
            safeAreaTop,
            targetTop,
            scrollY: window.scrollY,
            innerH: window.innerHeight,
          };
        }, anchor);

        expect(
          Number.isFinite(data.targetTop),
          `Anker #${anchor} bestaat niet in DOM`,
        ).toBe(true);

        const delta = data.targetTop - data.stickyOffset;
        const pass = delta >= -TOL_BOVEN && delta <= TOL_ONDER;

        allResults[projectKey].push({
          anchor,
          phase,
          stickyOffset: Math.round(data.stickyOffset * 100) / 100,
          safeAreaTop: data.safeAreaTop,
          targetTop: Math.round(data.targetTop * 100) / 100,
          delta: Math.round(delta * 100) / 100,
          pass,
        });

        expect.soft(
          delta,
          `#${anchor} (${phase}) — target.top=${data.targetTop.toFixed(1)} sticky=${data.stickyOffset.toFixed(1)} delta=${delta.toFixed(1)}`,
        ).toBeGreaterThanOrEqual(-TOL_BOVEN);
        expect.soft(
          delta,
          `#${anchor} (${phase}) — target zit te ver onder offset (delta=${delta.toFixed(1)})`,
        ).toBeLessThanOrEqual(TOL_ONDER);
      };

      await measure("initial");

      // ---- Fase 2: simuleer iOS Safari URL-bar die inklapt -> viewport krijgt
      // ~80px extra hoogte. We wijzigen viewport-hoogte en triggeren opnieuw
      // navigatie naar hetzelfde anker via hash-reset (zoals een tap op een
      // subnav-chip). Daarna moet de offset opnieuw kloppen.
      const vp = page.viewportSize();
      if (vp) {
        await page.setViewportSize({ width: vp.width, height: vp.height + 80 });
        await page.waitForTimeout(150);
        // hash resetten naar leeg en weer terug → forceert re-scroll via
        // de in-page hash-listener / HashScroll.
        await page.evaluate(() => {
          history.replaceState(null, "", window.location.pathname);
        });
        await page.evaluate((id) => {
          window.location.hash = `#${id}`;
        }, anchor);
        await page.waitForTimeout(700);
        await measure("url-bar-collapsed");
      }
    });
  }
});

test.afterAll(async ({}, testInfo) => {
  const projectKey = projectSlug(testInfo.project.name);
  const reportDir = join(REPORT_ROOT, projectKey);
  mkdirSync(reportDir, { recursive: true });
  const stamp = new Date().toISOString();
  const rows = allResults[projectKey] || [];

  writeFileSync(
    join(reportDir, "report.json"),
    JSON.stringify(
      {
        route: ROUTE,
        project: testInfo.project.name,
        runAt: stamp,
        tolerances: { TOL_BOVEN, TOL_ONDER },
        results: rows,
      },
      null,
      2,
    ),
  );

  const md: string[] = [];
  md.push(`# Anker-offset rapport — ${ROUTE}`);
  md.push("");
  md.push(`Project: \`${testInfo.project.name}\``);
  md.push(`Gegenereerd: \`${stamp}\``);
  md.push(`Tolerantie: boven ${TOL_BOVEN}px / onder ${TOL_ONDER}px`);
  md.push("");
  md.push("| Anker | Fase | sticky offset | target.top | delta | safe-area | ✓ |");
  md.push("|---|---|---:|---:|---:|---:|:---:|");
  for (const r of rows) {
    md.push(
      `| #${r.anchor} | ${r.phase} | ${r.stickyOffset} | ${r.targetTop} | ${r.delta >= 0 ? "+" : ""}${r.delta} | ${r.safeAreaTop} | ${r.pass ? "✅" : "❌"} |`,
    );
  }
  writeFileSync(join(reportDir, "report.md"), md.join("\n"));
  // eslint-disable-next-line no-console
  console.log(
    `\n📄 Anker-offset rapport (${testInfo.project.name}) → ${reportDir}/report.md\n`,
  );
});
