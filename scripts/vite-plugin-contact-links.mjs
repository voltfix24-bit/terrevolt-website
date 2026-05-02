/**
 * Vite-plugin: laat de productie-build falen wanneer
 * contact-link-linter problemen vindt.
 *
 * Draait in buildStart (één keer per build), zodat issues vroeg verschijnen.
 */
import { lintContactLinks, formatIssues } from "./lint-contact-links.mjs";

export default function contactLinksPlugin() {
  return {
    name: "contact-links-linter",
    apply: "build",
    buildStart() {
      const { issues, scanned } = lintContactLinks(process.cwd());
      if (issues.length > 0) {
        this.error(
          "\n" +
            formatIssues(issues) +
            `\n\n(${scanned} bestanden gescand — fix bovenstaande tel:/mailto:-issues of pas src/config/company.ts aan.)\n`,
        );
      }
    },
  };
}
