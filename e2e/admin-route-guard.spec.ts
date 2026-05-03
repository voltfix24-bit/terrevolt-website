import { test, expect } from "@playwright/test";

/**
 * Admin route guard: niet-ingelogde bezoekers van /admin* worden naar
 * /admin/login geleid en zien de login-UI. We loggen niet in.
 */
const guarded = ["/admin", "/admin/vacatures", "/admin/sollicitaties", "/admin/contactaanvragen", "/admin/analytics"];

for (const path of guarded) {
  test(`admin guard redirect: ${path} → /admin/login`, async ({ page }) => {
    await page.goto(path, { waitUntil: "networkidle" });

    // Wacht tot auth-check rond is en redirect heeft plaatsgevonden.
    await expect.poll(() => new URL(page.url()).pathname).toBe("/admin/login");

    // Login-UI zichtbaar (e-mail + wachtwoord veld).
    await expect(page.locator('input[type="email"]')).toBeVisible();
    await expect(page.locator('input[type="password"]')).toBeVisible();
  });
}

test("admin login: leeg formulier blokkeert submit", async ({ page }) => {
  await page.goto("/admin/login");
  await page.locator('button[type="submit"]').first().click();

  const emailInvalid = await page.locator('input[type="email"]').evaluate(
    (el) => (el as HTMLInputElement).validity.valueMissing,
  );
  expect(emailInvalid).toBe(true);
});
