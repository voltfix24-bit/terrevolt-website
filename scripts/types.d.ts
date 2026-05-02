declare module "*/lint-contact-links.mjs" {
  export interface LintIssue {
    file: string;
    line: number;
    col: number;
    rule: string;
    message: string;
    snippet: string;
  }
  export function lintContactLinks(projectRoot: string): {
    issues: LintIssue[];
    expectedTel: string;
    expectedMail: string;
    scanned: number;
  };
  export function formatIssues(issues: LintIssue[]): string;
}

declare module "*/vite-plugin-contact-links.mjs" {
  import type { Plugin } from "vite";
  const plugin: () => Plugin;
  export default plugin;
}
