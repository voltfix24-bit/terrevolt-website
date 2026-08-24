// @ts-check
/**
 * Vite plugin: genereert dist/sitemap.xml op basis van public/sitemap.xml
 * en voegt automatisch alle gepubliceerde /vacatures/:slug entries toe.
 *
 * - Werkt alleen tijdens `vite build` (closeBundle hook).
 * - Faalt stil als Supabase niet bereikbaar is: dan blijft de statische
 *   sitemap.xml uit /public ongewijzigd in dist.
 */

import fs from "node:fs";
import path from "node:path";

const SITE_ORIGIN = "https://terrevolt.lovable.app";
const VACATURE_PATH = "/vacatures";
const PLACEHOLDER_COMMENT =
  "<!-- TODO: dynamische /vacatures/:slug entries automatisch genereren bij build of via edge function. -->";

async function fetchPublishedVacancies(supabaseUrl, anonKey) {
  const url =
    `${supabaseUrl}/rest/v1/vacancies` +
    `?select=slug,updated_at&status=eq.published&order=sort_order.asc`;
  const res = await fetch(url, {
    headers: {
      apikey: anonKey,
      Authorization: `Bearer ${anonKey}`,
      Accept: "application/json",
    },
  });
  if (!res.ok) throw new Error(`Supabase ${res.status}: ${await res.text()}`);
  const rows = await res.json();
  return Array.isArray(rows) ? rows : [];
}

function buildVacatureEntries(rows) {
  return rows
    .filter((r) => r && typeof r.slug === "string" && r.slug.length > 0)
    .map((r) => {
      const lastmod = r.updated_at
        ? new Date(r.updated_at).toISOString().slice(0, 10)
        : undefined;
      const lastmodTag = lastmod ? `<lastmod>${lastmod}</lastmod>` : "";
      return `  <url><loc>${SITE_ORIGIN}${VACATURE_PATH}/${r.slug}</loc>${lastmodTag}<changefreq>weekly</changefreq><priority>0.8</priority></url>`;
    })
    .join("\n");
}

function injectIntoSitemap(xml, entriesXml) {
  // Verwijder eventuele eerdere auto-block + TODO comment.
  const stripped = xml
    .replace(
      /\n?\s*<!-- BEGIN auto-vacatures -->[\s\S]*?<!-- END auto-vacatures -->\n?/,
      "\n"
    )
    .replace(new RegExp(`\\n?\\s*${escapeRegExp(PLACEHOLDER_COMMENT)}\\n?`), "\n");

  const block =
    `\n  <!-- BEGIN auto-vacatures -->\n${entriesXml}\n  <!-- END auto-vacatures -->\n`;

  if (stripped.includes("</urlset>")) {
    return stripped.replace("</urlset>", `${block}</urlset>`);
  }
  return stripped + block;
}

function escapeRegExp(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export default function sitemapPlugin() {
  return {
    name: "terrevolt-sitemap-vacatures",
    apply: "build",
    async closeBundle() {
      const outDir = path.resolve(process.cwd(), "dist");
      const sitemapPath = path.join(outDir, "sitemap.xml");
      if (!fs.existsSync(sitemapPath)) {
        this.warn?.("[sitemap] dist/sitemap.xml niet gevonden, overslaan.");
        return;
      }

      const supabaseUrl =
        process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;
      const anonKey =
        process.env.VITE_SUPABASE_PUBLISHABLE_KEY ||
        process.env.SUPABASE_PUBLISHABLE_KEY ||
        process.env.VITE_SUPABASE_ANON_KEY ||
        process.env.SUPABASE_ANON_KEY;

      if (!supabaseUrl || !anonKey) {
        this.warn?.(
          "[sitemap] VITE_SUPABASE_URL / VITE_SUPABASE_PUBLISHABLE_KEY ontbreken — vacature-entries overgeslagen."
        );
        return;
      }

      try {
        const rows = await fetchPublishedVacancies(supabaseUrl, anonKey);
        if (rows.length === 0) {
          this.warn?.("[sitemap] Geen gepubliceerde vacatures gevonden.");
          return;
        }
        const entriesXml = buildVacatureEntries(rows);
        const original = fs.readFileSync(sitemapPath, "utf8");
        const updated = injectIntoSitemap(original, entriesXml);
        fs.writeFileSync(sitemapPath, updated, "utf8");
        // eslint-disable-next-line no-console
        console.log(
          `[sitemap] ${rows.length} vacature-URL's toegevoegd aan dist/sitemap.xml`
        );
      } catch (err) {
        this.warn?.(
          `[sitemap] Fetchen mislukt, statische sitemap behouden: ${
            err instanceof Error ? err.message : String(err)
          }`
        );
      }
    },
  };
}
