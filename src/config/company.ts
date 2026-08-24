/**
 * Centrale bedrijfsgegevens TerreVolt B.V.
 * Wijzig hier — alle pagina's, footer, CTA's en metadata gebruiken deze waarden.
 */

/** Canoniek productiedomein. Altijd zonder trailing slash. */
export const SITE_URL = "https://terrevolt.nl";
/** Absoluut pad naar de social-share afbeelding (1216×640). */
export const SITE_OG_IMAGE = `${SITE_URL}/og-image.jpg`;
/** Absoluut pad naar het logo (gebruikt in Organization JSON-LD). */
export const SITE_LOGO = `${SITE_URL}/og-image.jpg`;

export const company = {
  legalName: "TerreVolt B.V.",
  shortName: "TerreVolt BV",

  email: "info@terrevolt.nl",

  phone: {
    display: "+31 6 34 48 74 67",
    e164: "+31634487467",
  },

  address: {
    street: "Overvliet 97",
    postalCode: "3545 NH",
    city: "Utrecht",
    country: "Nederland",
    countryCode: "NL",
    region: "NL-UT",
  },
} as const;

/** Volledige adresregel op één regel — bv. "Overvliet 97, 3545 NH Utrecht". */
export const addressOneLine = `${company.address.street}, ${company.address.postalCode} ${company.address.city}`;

/** Adres met expliciet land. */
export const addressFull = `${addressOneLine}, ${company.address.country}`;

/** Klikbare href's. */
export const telHref = `tel:${company.phone.e164}`;
export const mailHref = `mailto:${company.email}`;
