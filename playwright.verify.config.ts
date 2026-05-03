import { defineConfig, devices } from "@playwright/test";
// Tijdelijke config voor verificatie tegen de dev-server (preview-build is broken
// door een vooraf bestaand @tanstack/query-core resolutie-probleem in vite).
export default defineConfig({
  testDir: "./e2e",
  timeout: 30_000,
  reporter: [["list"]],
  use: { baseURL: "http://localhost:8080", headless: true },
  projects: [
    {
      name: "visual-mobile",
      use: { ...devices["Pixel 5"], viewport: { width: 390, height: 844 } },
      testMatch: /contact-label-parity\.spec\.ts/,
    },
    {
      name: "visual-desktop",
      use: { ...devices["Desktop Chrome"], viewport: { width: 1366, height: 768 } },
      testMatch: /contact-label-parity\.spec\.ts/,
    },
  ],
});
