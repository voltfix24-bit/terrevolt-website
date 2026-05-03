import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
// @ts-expect-error - .mjs runtime module zonder TS-declaraties (gedeeld met Vitest).
import contactLinksPlugin from "./scripts/vite-plugin-contact-links.mjs";
// @ts-expect-error - .mjs runtime module zonder TS-declaraties.
import validateRoutesPlugin from "./scripts/vite-plugin-validate-routes.mjs";
// @ts-expect-error - .mjs runtime module zonder TS-declaraties.
import sitemapPlugin from "./scripts/vite-plugin-sitemap.mjs";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [
    react(),
    mode === "development" && componentTagger(),
    // Build-time lint: faalt de build bij afwijkende of dubbele tel:/mailto:-links.
    contactLinksPlugin(),
    // Build-time lint: faalt de build als <Link to>/<a href>/navigate paden
    // niet matchen met een Route in src/App.tsx.
    validateRoutesPlugin(),
    // Build-time: voegt /vacatures/:slug entries toe aan dist/sitemap.xml
    // op basis van gepubliceerde vacatures in Supabase.
    sitemapPlugin(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
    dedupe: ["react", "react-dom", "react/jsx-runtime", "react/jsx-dev-runtime", "@tanstack/react-query", "@tanstack/query-core"],
  },
}));

