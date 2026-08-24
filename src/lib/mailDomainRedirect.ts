/**
 * Het maildomein (terrevolt-mail.com) is uitsluitend bedoeld als technisch
 * afzenderdomein voor e-mail. Bezoekers horen altijd op terrevolt.nl te staan:
 * een ander domein in de adresbalk kost vertrouwen én conversie.
 *
 * Deze redirect is een vangnet naast de primaire-domeininstelling bij hosting.
 */
const MAIL_HOSTS = ["terrevolt-mail.com", "www.terrevolt-mail.com"];
const CANONICAL_ORIGIN = "https://terrevolt.nl";

export function redirectMailDomainToSite(): void {
  if (typeof window === "undefined") return;
  const host = window.location.hostname.toLowerCase();
  if (!MAIL_HOSTS.includes(host)) return;
  const { pathname, search, hash } = window.location;
  window.location.replace(`${CANONICAL_ORIGIN}${pathname}${search}${hash}`);
}
