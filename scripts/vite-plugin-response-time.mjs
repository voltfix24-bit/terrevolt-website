/**
 * Vite-plugin: faalt de productie-build wanneer de reactietijd-linter
 * verboden "binnen N werkdagen"-varianten vindt buiten recruitment-context.
 */
import { lintResponseTime } from "./lint-response-time.mjs";

export default function responseTimePlugin() {
  return {
    name: "response-time-linter",
    apply: "build",
    buildStart() {
      const { issues, scanned } = lintResponseTime(process.cwd());
      if (issues.length > 0) {
        const formatted = issues
          .map((i) => `  ${i.file}:${i.line} [${i.rule}] ${i.message}\n     ↳ ${i.snippet}`)
          .join("\n");
        this.error(
          `\nReactietijd-linter vond ${issues.length} probleem(en):\n${formatted}\n\n` +
            `(${scanned} bestanden gescand — gebruik buiten recruitment "Direct bereikbaar voor projectvragen", "Bel direct voor overleg", "Korte lijnen met Team TerreVolt" of "Direct contact met ons team".)\n`,
        );
      }
    },
  };
}
