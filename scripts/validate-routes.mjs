/**
 * Route & link validator.
 * - Parseert routes uit src/App.tsx
 * - Scant src/** voor interne links: <Link to="...">, <NavLink to="...">,
 *   navigate("..."), <a href="..."> en `href: "..."` in data-objecten
 * - Geeft een fout als een interne link niet matcht met een gedefinieerde route
 *
 * Wordt aangeroepen door de Vite plugin in vite.config.ts (buildStart).
 */
import fs from "node:fs";
import path from "node:path";

const SRC = path.resolve("src");
const APP_FILE = path.join(SRC, "App.tsx");

// Pseudo / externe / niet-app paden die we negeren
const IGNORE_PREFIXES = [
  "http://", "https://", "mailto:", "tel:", "sms:", "whatsapp:",
  "javascript:", "data:", "blob:", "//",
];

// Bestand-extensies die we wél scannen
const SCAN_EXT = new Set([".ts", ".tsx", ".js", ".jsx"]);

function readAllFiles(dir, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name.startsWith(".")) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === "node_modules") continue;
      readAllFiles(full, out);
    } else if (SCAN_EXT.has(path.extname(entry.name))) {
      out.push(full);
    }
  }
  return out;
}

/** Haal alle path="..." uit App.tsx — inclusief geneste admin routes */
function extractRoutes(appSource) {
  const routes = new Set();
  // <Route path="..." ...> — haakjes/quotes flexibel
  const re = /<Route[^>]*\spath\s*=\s*["'`]([^"'`]+)["'`]/g;
  let m;
  while ((m = re.exec(appSource))) {
    routes.add(m[1]);
  }
  // Bouw absolute paden: alles wat niet met "/" begint nesten we onder "/admin"
  // (in dit project zit alle nesting onder /admin)
  const absolute = new Set();
  for (const r of routes) {
    if (r === "*") continue;
    if (r.startsWith("/")) absolute.add(r);
    else absolute.add(`/admin/${r}`.replace(/\/+/g, "/"));
  }
  // index route -> /admin
  if (appSource.includes("<Route index")) absolute.add("/admin");
  return absolute;
}

/** Convert /vacatures/:slug -> regex /^\/vacatures\/[^/]+$/ */
function routeToRegex(route) {
  const escaped = route
    .replace(/[.+^${}()|[\]\\]/g, "\\$&")
    .replace(/\/:[A-Za-z_][A-Za-z0-9_]*/g, "/[^/]+")
    .replace(/\/\*$/, "(?:/.*)?");
  return new RegExp(`^${escaped}$`);
}

function buildMatcher(routes) {
  const regexes = [...routes].map(routeToRegex);
  return (pathname) => regexes.some((rx) => rx.test(pathname));
}

/** Vind alle interne paden in een bronbestand */
function extractLinks(source) {
  const found = [];
  const patterns = [
    // to="/path" of to={"/path"} of to={`/path`}
    /\bto\s*=\s*\{?\s*["'`](\/[^"'`]*)["'`]\s*\}?/g,
    // href="/path"
    /\bhref\s*=\s*\{?\s*["'`](\/[^"'`]*)["'`]\s*\}?/g,
    // navigate("/path")  /  navigate('/path', ...)
    /\bnavigate\s*\(\s*["'`](\/[^"'`]*)["'`]/g,
    // href: "/path" (in data-objecten)
    /\bhref\s*:\s*["'`](\/[^"'`]*)["'`]/g,
  ];
  for (const re of patterns) {
    let m;
    while ((m = re.exec(source))) {
      found.push(m[1]);
    }
  }
  return found;
}

function isIgnoredLink(link) {
  if (!link) return true;
  if (IGNORE_PREFIXES.some((p) => link.startsWith(p))) return true;
  // Strip query/fragment
  return false;
}

function normalize(link) {
  // Verwijder querystring en fragment voor route-match
  return link.split("#")[0].split("?")[0];
}

export function validateRoutesAndLinks({ throwOnError = true } = {}) {
  const appSource = fs.readFileSync(APP_FILE, "utf8");
  const routes = extractRoutes(appSource);
  const matches = buildMatcher(routes);

  const files = readAllFiles(SRC);
  /** @type {{file:string, link:string}[]} */
  const broken = [];
  let scannedLinks = 0;

  for (const file of files) {
    if (file === APP_FILE) continue;
    const src = fs.readFileSync(file, "utf8");
    const links = extractLinks(src);
    for (const raw of links) {
      if (isIgnoredLink(raw)) continue;
      const pathname = normalize(raw);
      if (pathname === "" || pathname === "/") continue;
      scannedLinks++;
      if (!matches(pathname)) {
        broken.push({ file: path.relative(process.cwd(), file), link: raw });
      }
    }
  }

  const summary = {
    routesCount: routes.size,
    scannedLinks,
    brokenCount: broken.length,
    broken,
  };

  if (broken.length > 0) {
    const lines = broken
      .slice(0, 50)
      .map((b) => `  • ${b.link}  (${b.file})`)
      .join("\n");
    const more = broken.length > 50 ? `\n  …en nog ${broken.length - 50} meer` : "";
    const message =
      `\n[validate-routes] ${broken.length} interne link(s) komen niet overeen met een route in App.tsx:\n${lines}${more}\n`;
    if (throwOnError) throw new Error(message);
    else console.warn(message);
  } else {
    console.log(
      `[validate-routes] ✓ ${scannedLinks} interne link(s) gecontroleerd tegen ${routes.size} route(s).`,
    );
  }
  return summary;
}

// Direct uitvoerbaar: `node scripts/validate-routes.mjs`
if (import.meta.url === `file://${process.argv[1]}`) {
  try {
    validateRoutesAndLinks({ throwOnError: true });
  } catch (e) {
    console.error(e.message);
    process.exit(1);
  }
}
