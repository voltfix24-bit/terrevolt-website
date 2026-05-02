/**
 * Centrale bedrijfsgegevens TerreVolt B.V.
 * Wijzig hier — alle pagina's, footer, CTA's en metadata gebruiken deze waarden.
 */

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
