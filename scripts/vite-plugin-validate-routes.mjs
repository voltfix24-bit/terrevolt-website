/**
 * Vite plugin: faalt de build als interne <Link to>, <a href>, navigate(...) of
 * `href:`-paden niet matchen met een Route in src/App.tsx.
 *
 * Doel: ontbrekende routes en typo's direct opvangen tijdens build (en bij
 * dev-startup, zonder de dev-server te blokkeren).
 */
import { validateRoutesAndLinks } from "./validate-routes.mjs";

export default function validateRoutesPlugin() {
  return {
    name: "validate-routes",
    apply: undefined, // beide: dev + build
    buildStart() {
      const isBuild = process.env.NODE_ENV === "production" || process.argv.includes("build");
      try {
        validateRoutesAndLinks({ throwOnError: isBuild });
      } catch (e) {
        // In build: hard falen — dit signaleert ontbrekende routes.
        this.error(e instanceof Error ? e.message : String(e));
      }
    },
  };
}
