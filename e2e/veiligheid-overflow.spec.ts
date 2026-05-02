import { test, expect } from "@playwright/test";
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

/**
 * Controleert /veiligheid op horizontale overflow op de drie kritieke
 * mobiele breakpoints (375 / 414 / 640 px). Schrijft per run een JSON +
 * Markdown rapport naar `test-results/veiligheid-overflow/`.
 *
 * Een element telt als "overflow" als zijn rechterrand meer dan 0.5 px
 * voorbij de viewport-breedte ligt. Elementen met `overflow-x: auto`
 * of `scroll` (zoals de subnav-chips-balk) worden uitgesloten — die
 * mogen bewust intern scrollen.
 */

const BREAKPOINTS = [
  { width: 375, height: 812, label: "iPhone SE / 13 mini" },
  { width: 414, height: 896, label: "iPhone 11 / XR" },
  { width: 640, height: 960, label: "Tailwind sm-breakpoint" },
] as const;

const ROUTE = "/veiligheid";
const REPORT_DIR = "test-results/veiligheid-overflow";

type Offender = {
  tag: string;
  id: string;
  classes: string;
  text: string;
  right: number;
  viewport: number;
  overflowPx: number;
};

type RunResult = {
  width: number;
  height: number;
  label: string;
  hasHorizontalScroll: boolean;
  documentScrollWidth: number;
  offenders: Offender[];
};

const results: RunResult[] = [];

for (const bp of BREAKPOINTS) {
  test(`/veiligheid heeft geen horizontale overflow @ ${bp.width}px`, async ({
    browser,
  }) => {
    const context = await browser.newContext({
      viewport: { width: bp.width, height: bp.height },
      deviceScaleFactor: 2,
    });
    const page = await context.newPage();
    await page.goto(ROUTE, { waitUntil: "networkidle" });

    // Geef accordions/subnav een tel om te settelen.
    await page.waitForTimeout(300);

    const data = await page.evaluate(() => {
      const vw = document.documentElement.clientWidth;
      const offenders: Offender[] = [];
      const all = document.querySelectorAll<HTMLElement>("body *");
      all.forEach((el) => {
        const style = window.getComputedStyle(el);
        // Sla bewust scrollende containers + hun kinderen niet over —
        // alleen de container zelf wordt overgeslagen.
        if (
          style.overflowX === "auto" ||
          style.overflowX === "scroll" ||
          style.overflowX === "hidden"
        ) {
          // Container zelf mag intern scrollen; check alleen of de
          // container niet zelf buiten viewport valt.
        }
        const rect = el.getBoundingClientRect();
        if (rect.width === 0 || rect.height === 0) return;
        const overflowPx = rect.right - vw;
        if (overflowPx > 0.5) {
          // Negeer als één van de voorouders een scroll-container is
          // die intern mag schuiven (subnav).
          let p: HTMLElement | null = el.parentElement;
          let insideScroller = false;
          while (p) {
            const ps = window.getComputedStyle(p);
            if (ps.overflowX === "auto" || ps.overflowX === "scroll") {
              insideScroller = true;
              break;
            }
            p = p.parentElement;
          }
          if (insideScroller) return;

          offenders.push({
            tag: el.tagName.toLowerCase(),
            id: el.id || "",
            classes: (el.className || "").toString().slice(0, 120),
            text: (el.textContent || "").trim().slice(0, 80),
            right: Math.round(rect.right * 100) / 100,
            viewport: vw,
            overflowPx: Math.round(overflowPx * 100) / 100,
          });
        }
      });
      return {
        vw,
        documentScrollWidth: document.documentElement.scrollWidth,
        hasHorizontalScroll:
          document.documentElement.scrollWidth >
          document.documentElement.clientWidth + 0.5,
        offenders,
      };
    });

    // Screenshot voor visueel bewijs.
    mkdirSync(REPORT_DIR, { recursive: true });
    await page.screenshot({
      path: join(REPORT_DIR, `veiligheid-${bp.width}.png`),
      fullPage: true,
    });

    results.push({
      width: bp.width,
      height: bp.height,
      label: bp.label,
      hasHorizontalScroll: data.hasHorizontalScroll,
      documentScrollWidth: data.documentScrollWidth,
      offenders: data.offenders,
    });

    await context.close();

    // Soft assertions zodat alle breakpoints altijd doorlopen worden,
    // ook als één faalt; harde assertion onderaan.
    expect.soft(
      data.hasHorizontalScroll,
      `Horizontale scroll op ${bp.width}px — scrollWidth=${data.documentScrollWidth}`,
    ).toBe(false);
    expect(
      data.offenders,
      `Elementen vallen buiten viewport op ${bp.width}px`,
    ).toEqual([]);
  });
}

test.afterAll(async () => {
  mkdirSync(REPORT_DIR, { recursive: true });
  const stamp = new Date().toISOString();

  writeFileSync(
    join(REPORT_DIR, "report.json"),
    JSON.stringify({ route: ROUTE, runAt: stamp, results }, null, 2),
  );

  const md: string[] = [];
  md.push(`# Overflow-rapport — ${ROUTE}`);
  md.push("");
  md.push(`Gegenereerd: \`${stamp}\``);
  md.push("");
  md.push("| Breakpoint | Label | Horiz. scroll? | scrollWidth | Overtreders |");
  md.push("|---:|---|:---:|---:|---:|");
  for (const r of results) {
    md.push(
      `| ${r.width}px | ${r.label} | ${r.hasHorizontalScroll ? "❌ ja" : "✅ nee"} | ${r.documentScrollWidth} | ${r.offenders.length} |`,
    );
  }
  md.push("");
  for (const r of results) {
    md.push(`## ${r.width}px (${r.label})`);
    if (r.offenders.length === 0) {
      md.push("");
      md.push("✅ Geen overtreders.");
      md.push("");
      continue;
    }
    md.push("");
    md.push("| Tag | id | overflow (px) | tekst |");
    md.push("|---|---|---:|---|");
    for (const o of r.offenders.slice(0, 25)) {
      md.push(
        `| \`${o.tag}\` | ${o.id || "—"} | +${o.overflowPx} | ${o.text.replace(/\|/g, "\\|") || "—"} |`,
      );
    }
    if (r.offenders.length > 25) {
      md.push("");
      md.push(`_… en nog ${r.offenders.length - 25} meer (zie \`report.json\`)._`);
    }
    md.push("");
  }
  writeFileSync(join(REPORT_DIR, "report.md"), md.join("\n"));
  // eslint-disable-next-line no-console
  console.log(`\n📄 Rapport geschreven naar ${REPORT_DIR}/report.md\n`);
});
