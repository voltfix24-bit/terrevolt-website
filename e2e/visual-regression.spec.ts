import { test, expect } from "@playwright/test";

/**
 * Visuele regressietesten – screenshot-pariteit tussen mobiel en desktop.
 *
 * Doel: voorkomen dat layout/CTA's onbedoeld kapot gaan op één van beide
 * viewports. Per route maken we full-page screenshots; baselines worden
 * per project (visual-mobile / visual-desktop) opgeslagen onder
 * `e2e/visual-regression.spec.ts-snapshots/`.
 *
 * Eerste run (lokaal): `npx playwright test visual-regression --update-snapshots`.
 * Daarna faalt de suite zodra een diff > 2% verschijnt (zie playwright.config.ts).
 *
 * Admin-routes redirecten naar /admin/login zonder sessie; daarom checken we
 * /admin/login zelf in plaats van afgeschermde admin-pagina's.
 */
const ROUTES = [
  { path: "/", name: "home" },
  { path: "/diensten", name: "diensten" },
  { path: "/diensten/aardingsoplossingen", name: "diensten-aarding" },
  { path: "/projecten", name: "projecten" },
  { path: "/over", name: "over" },
  { path: "/veiligheid", name: "veiligheid" },
  { path: "/werken-bij", name: "werken-bij" },
  { path: "/contact", name: "contact" },
  { path: "/admin/login", name: "admin-login" },
];

for (const route of ROUTES) {
  test(`visual: ${route.name}`, async ({ page }) => {
    await page.goto(route.path, { waitUntil: "networkidle" });

    // Stabiliseer: scroll naar top, disable smooth scroll en lazy animaties.
    await page.addStyleTag({
      content: `
        *, *::before, *::after {
          animation-duration: 0s !important;
          animation-delay: 0s !important;
          transition-duration: 0s !important;
          transition-delay: 0s !important;
          scroll-behavior: auto !important;
        }
      `,
    });
    await page.evaluate(() => window.scrollTo(0, 0));
    // Wacht op fonts om font-swap shifts te vermijden.
    await page.evaluate(() => (document as any).fonts?.ready);

    await expect(page).toHaveScreenshot(`${route.name}.png`, {
      fullPage: true,
    });
  });
}
