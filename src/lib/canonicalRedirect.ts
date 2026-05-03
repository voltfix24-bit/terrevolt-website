import { SITE_URL } from "@/config/company";

/**
 * Hostnames die een 301-achtige client-side redirect naar het canonieke
 * productiedomein (terrevolt.nl) krijgen.
 *
 * BEWUST UITGESLOTEN:
 *   - localhost / 127.0.0.1            (lokale dev)
 *   - *.id-preview--*.lovable.app      (Lovable live preview-iframes)
 *   - *.lovableproject.com             (sandbox previews)
 * Deze omgevingen moeten gewoon werken zonder weggestuurd te worden,
 * anders breekt de in-editor preview.
 */
const REDIRECT_HOSTS = new Set<string>([
  "terrevolt.lovable.app",
  "www.terrevolt.lovable.app",
]);

/** Canoniek productiedomein zonder protocol. */
function canonicalHost(): string {
  try {
    return new URL(SITE_URL).host;
  } catch {
    return "terrevolt.nl";
  }
}

/**
 * Stuurt de bezoeker naar dezelfde pad+query+hash op het productiedomein,
 * indien hij op een Lovable-publicatie-URL terechtkwam. No-op in alle
 * andere gevallen (preview, localhost, custom domain, SSR).
 */
export function redirectToCanonicalDomain(): void {
  if (typeof window === "undefined") return;
  const { hostname, pathname, search, hash, protocol } = window.location;

  // Nooit redirecten als we al op het juiste domein staan, of op www.
  const target = canonicalHost();
  if (hostname === target || hostname === `www.${target}`) return;

  // Alleen specifieke Lovable-publicatie-hosts doorzetten — preview/dev intact.
  if (!REDIRECT_HOSTS.has(hostname)) return;

  // Forceer https en behoud volledige URL.
  const url = `https://${target}${pathname}${search}${hash}`;
  // replace() voorkomt dat "back" terug naar lovable.app stuurt.
  window.location.replace(url);
}
