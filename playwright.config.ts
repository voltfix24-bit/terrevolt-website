import { defineConfig } from "@playwright/test";

/**
 * Playwright config — alleen voor de overflow-checks op /veiligheid.
 * Start automatisch een lokale Vite preview-server op poort 4173.
 */
export default defineConfig({
  testDir: "./e2e",
  timeout: 30_000,
  reporter: [
    ["list"],
    ["json", { outputFile: "test-results/playwright-report.json" }],
  ],
  use: {
    baseURL: "http://localhost:4173",
    headless: true,
  },
  webServer: {
    command: "npm run build && npm run preview -- --port=4173 --strictPort",
    url: "http://localhost:4173",
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
});
