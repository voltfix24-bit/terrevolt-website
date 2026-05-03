/**
 * Normaliseer een NL-telefoonnummer naar wa.me-formaat (zonder + en zonder spaties).
 * Voorbeelden:
 *  - "+31 6 12 34 56 78" -> "31612345678"
 *  - "06 12345678"       -> "31612345678"
 *  - "0031612345678"     -> "31612345678"
 *  - "+49 170 1234567"   -> "491701234567" (overige landen blijven intact)
 * Geeft null bij ongeldig/te kort nummer.
 */
export function normalizeWhatsAppNumber(raw: string | null | undefined): string | null {
  if (!raw) return null;
  let n = raw.replace(/[^\d+]/g, "");
  if (!n) return null;
  if (n.startsWith("00")) n = "+" + n.slice(2);
  if (n.startsWith("+")) n = n.slice(1);
  // NL: 06... -> 316...
  if (n.startsWith("06")) n = "31" + n.slice(1);
  // NL bare 6... (zonder 0) -> 316...
  else if (n.startsWith("6") && n.length === 9) n = "31" + n;
  // NL met dubbele 0: 0316... blijft 316...
  if (n.length < 8 || n.length > 15) return null;
  return n;
}

export function whatsappLink(raw: string | null | undefined, message?: string): string | null {
  const n = normalizeWhatsAppNumber(raw);
  if (!n) return null;
  const base = `https://wa.me/${n}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}
