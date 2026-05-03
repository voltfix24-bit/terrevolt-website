import { defineConfig, devices } from "@playwright/test";

/**
 * Playwright config — overflow & iOS Safari checks op /veiligheid.
 *
 * Projecten:
 * - "chromium-mobile"  : snelle Chromium-runs op 375 / 414 / 640 (basis-overflow).
 * - "mobile-safari-*"  : echte WebKit (= iOS Safari engine) op iPhone SE, 12, 14 Pro Max.
 *
 * In CI worden alle projecten gedraaid; lokaal kun je `npx playwright test
 * --project=mobile-safari-iphone-se` draaien voor een snelle WebKit-check.
 */
const isCI = !!process.env.CI;

export default defineConfig({
  testDir: "./e2e",
  timeout: 30_000,
  // Forbid `.only` in CI zodat een vergeten focus de suite niet doet stoppen.
  forbidOnly: isCI,
  // Eén retry in CI om transient netwerk/preview-startup-flakes op te vangen.
  retries: isCI ? 1 : 0,
  workers: isCI ? 2 : undefined,
  reporter: [
    ["list"],
    ["json", { outputFile: "test-results/playwright-report.json" }],
    ["html", { outputFolder: "playwright-report", open: "never" }],
    ...(isCI ? ([["github"]] as const) : []),
  ],
  use: {
    baseURL: "http://localhost:4173",
    headless: true,
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
    video: "retain-on-failure",
  },
  // Visuele regressie: tolereer minieme rendering-verschillen, maar flag layout-shift.
  expect: {
    toHaveScreenshot: {
      maxDiffPixelRatio: 0.02,
      animations: "disabled",
      caret: "hide",
    },
  },
  projects: [
    {
      name: "chromium-mobile",
      use: { ...devices["Pixel 5"] },
    },
    // iOS Safari engine via WebKit, op de drie kritieke iPhone-formaten.
    {
      name: "mobile-safari-iphone-se",
      use: { ...devices["iPhone SE"] },
    },
    {
      name: "mobile-safari-iphone-12",
      use: { ...devices["iPhone 12"] },
    },
    {
      name: "mobile-safari-iphone-14-pro-max",
      use: { ...devices["iPhone 14 Pro Max"] },
    },
    // Visuele regressie: één mobile- en één desktop-project,
    // gebruikt door e2e/visual-regression.spec.ts om pariteit te bewaken.
    {
      name: "visual-mobile",
      use: { ...devices["Pixel 5"], viewport: { width: 390, height: 844 } },
      testMatch: /visual-regression\.spec\.ts/,
    },
    {
      name: "visual-desktop",
      use: { ...devices["Desktop Chrome"], viewport: { width: 1366, height: 768 } },
      testMatch: /visual-regression\.spec\.ts/,
    },
  ],
  webServer: {
    command: "npm run build && npm run preview -- --port=4173 --strictPort",
    url: "http://localhost:4173",
    reuseExistingServer: !isCI,
    timeout: 120_000,
  },
});
