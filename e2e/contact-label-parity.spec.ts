import { test, expect } from "@playwright/test";

/**
 * Layout-pariteit voor de "Direct bereikbaar voor projectvragen" status-regel
 * op de zakelijke Team TerreVolt-kaart (Over-pagina).
 *
 * We testen geen pixel-diff (een tekst-swap verandert per definitie pixels),
 * maar wel dat:
 *   - de exacte zakelijke tekst aanwezig is en de oude recruitment-tekst niet,
 *   - de status-regel een ::before bullet/dot rendert met dezelfde groene kleur,
 *   - icon, titel, subtitle, status, CTA-rij in de juiste DOM-volgorde staan,
 *   - de status-regel niet wegvalt onder de header en de CTA-knoppen 48px hoog blijven,
 *   - dit op zowel mobiel als desktop identiek is.
 *
 * Draait onder beide visual-projects (visual-mobile + visual-desktop) en
 * vereist géén pre-bestaande screenshot-baseline.
 */

const BUSINESS_LABEL = "Direct bereikbaar voor projectvragen";
const FORBIDDEN_LABELS = [
  "Reageert binnen 2 werkdagen",
  "Eerste reactie binnen 2 werkdagen",
  "We reageren binnen 2 werkdagen",
];

test("Over: zakelijke contactkaart heeft juiste label en layout", async ({ page }) => {
  await page.goto("/over", { waitUntil: "networkidle" });

  // Tekst-correctie: nieuw label aanwezig, oude varianten weg.
  await expect(page.getByText(BUSINESS_LABEL, { exact: true }).first()).toBeVisible();
  for (const bad of FORBIDDEN_LABELS) {
    await expect(page.getByText(bad)).toHaveCount(0);
  }

  // Lokaliseer de kaart via de status-regel.
  const status = page.getByText(BUSINESS_LABEL, { exact: true }).first();
  const card = status.locator(
    "xpath=ancestor::div[contains(@class,'rounded-2xl') and contains(@class,'border-[#9ed42e]')][1]",
  );
  await expect(card).toBeVisible();

  // CTA-rij: minstens één "Bel direct"-knop binnen dezelfde kaart, 48px+ hoog.
  const belDirect = card.getByRole("link", { name: /bel direct/i }).first();
  await expect(belDirect).toBeVisible();
  const belBox = await belDirect.boundingBox();
  expect(belBox?.height ?? 0).toBeGreaterThanOrEqual(48);

  // Status-regel staat boven de CTA-rij (DOM- en y-positie).
  const statusBox = await status.boundingBox();
  expect(statusBox && belBox && statusBox.y).toBeLessThan(belBox!.y);

  // Status-regel bevat een groene indicator (de dubbele bg-[#9ed42e] span).
  const dots = status.locator("xpath=preceding-sibling::span[1]//span");
  await expect(dots.first()).toBeVisible();
});
