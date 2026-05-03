import { test, expect } from "@playwright/test";

/**
 * Minimale formulier-sanity: required-velden blokkeren submit op /contact.
 * We versturen geen echte data — we vertrouwen op native HTML5 validatie
 * zodat er geen netwerk-call naar Supabase plaatsvindt.
 */
test("contact: leeg formulier triggert HTML5 required validatie", async ({ page }) => {
  await page.goto("/contact");

  const submit = page.locator('form button[type="submit"]').first();
  await submit.scrollIntoViewIfNeeded();
  await submit.click();

  // Eerste required input moet invalid zijn (browser-native).
  const nameInvalid = await page.locator("#name").evaluate(
    (el) => (el as HTMLInputElement).validity.valueMissing,
  );
  expect(nameInvalid).toBe(true);
});

test("contact: ongeldig e-mailadres wordt afgekeurd door browser", async ({ page }) => {
  await page.goto("/contact");

  await page.locator("#name").fill("Test Persoon");
  await page.locator("#phone").fill("0612345678");
  await page.locator("#email").fill("geen-geldig-email");
  await page.locator("#description").fill("Dit is een test bericht.");

  await page.locator('form button[type="submit"]').first().click();

  const emailInvalid = await page.locator("#email").evaluate(
    (el) => (el as HTMLInputElement).validity.typeMismatch,
  );
  expect(emailInvalid).toBe(true);
});
