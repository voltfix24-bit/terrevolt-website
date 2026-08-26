import { test, expect } from "@playwright/test";

/**
 * Logo visual regression — controleert dat het TerreVolt-logo in de header
 * (bliksem + aardingssymbool + wordmark) correct schaalt over een reeks
 * mobiele en desktop breedtes.
 *
 * De clamp() in src/components/terrevolt/Header.tsx zorgt voor:
 *   height: clamp(48px, 10vw, 70px)
 * Op smalle telefoons blijft het logo 48px, op desktop cap't 't op 70px.
 * Breedte is ~3.89x de hoogte, dus desktop ongeveer 272px.
 * Eerste run: `npx playwright test logo-visual --update-snapshots`.
 */
const WIDTHS = [320, 360, 375, 390, 414, 480, 640, 768, 1024, 1280, 1366];

for (const width of WIDTHS) {
  test(`logo @ ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 800 });
    await page.goto("/", { waitUntil: "networkidle" });

    // Stabiliseer rendering.
    await page.addStyleTag({
      content: `*,*::before,*::after{
        animation-duration:0s !important;
        transition-duration:0s !important;
        scroll-behavior:auto !important;
      }`,
    });
    await page.evaluate(() => (document as any).fonts?.ready);
    await page.evaluate(() => window.scrollTo(0, 0));

    const logo = page.locator('a[aria-label="TerreVolt — naar de homepagina"]');
    await expect(logo).toBeVisible();

    // Snapshot van het logo zelf — focus op bliksem/aarding/wordmark schaling.
    await expect(logo).toHaveScreenshot(`logo-${width}.png`);

    // Sanity: SVG bestaat en bevat zichtbare bliksem-stroke + aarding-lijnen.
    const svgInfo = await logo.evaluate((el) => {
      const svg = el.querySelector("svg");
      if (!svg) return null;
      const rect = svg.getBoundingClientRect();
      const lines = svg.querySelectorAll("line").length;
      const paths = svg.querySelectorAll("path").length;
      return { width: rect.width, height: rect.height, lines, paths };
    });
    expect(svgInfo).not.toBeNull();
    // Hoogte moet binnen clamp-bereik liggen (kleine subpixel-marge).
    expect(svgInfo!.height).toBeGreaterThanOrEqual(47);
    expect(svgInfo!.height).toBeLessThanOrEqual(71);
    // 4 aardings-lijnen + 1 bliksem-path moeten altijd aanwezig zijn.
    expect(svgInfo!.lines).toBe(4);
    expect(svgInfo!.paths).toBeGreaterThanOrEqual(1);
  });
}
