import { test, expect } from "@playwright/test";

/**
 * Smoke-test publieke routes: laadt elke route, controleert 200-achtige render
 * (geen NotFound, een h1 aanwezig) en geen kritieke console errors.
 */
const routes = [
  "/",
  "/diensten",
  "/diensten/schakelwerk",
  "/diensten/aardingsoplossingen",
  "/diensten/stationsrenovatie",
  "/diensten/ls-ms-netmontage",
  "/diensten/huisaansluitingen",
  "/diensten/meten-en-beproeven",
  "/projecten",
  "/veiligheid",
  "/werken-bij",
  "/over",
  "/contact",
  "/privacy",
];

for (const path of routes) {
  test(`publieke route laadt: ${path}`, async ({ page }) => {
    const errors: string[] = [];
    page.on("pageerror", (e) => errors.push(String(e)));
    page.on("console", (msg) => {
      if (msg.type() === "error") errors.push(msg.text());
    });

    const resp = await page.goto(path, { waitUntil: "domcontentloaded" });
    expect(resp?.ok(), `HTTP status voor ${path}`).toBeTruthy();

    // Geen NotFound-fallback
    await expect(page.locator("body")).not.toContainText(/404|pagina niet gevonden/i);

    // Tenminste één h1
    await expect(page.locator("h1").first()).toBeVisible();

    // Filter bekende non-blocking warnings/network noise
    const blocking = errors.filter(
      (e) => !/favicon|sourcemap|ResizeObserver|Failed to load resource/i.test(e),
    );
    expect(blocking, `console errors op ${path}: ${blocking.join(" | ")}`).toEqual([]);
  });
}
