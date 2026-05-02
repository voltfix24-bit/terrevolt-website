import { useEffect } from "react";
import { addressOneLine, company } from "@/config/company";

/**
 * Injecteert één Organization JSON-LD blok + og:email / og:phone_number meta tags
 * gebaseerd op src/config/company.ts.
 *
 * Telefoon = E.164 (company.phone.e164)
 * E-mail   = schoon mailadres (company.email)
 *
 * Hierdoor zijn JSON-LD én Open Graph altijd identiek aan de tel:/mailto: links
 * elders op de site — geen losse hardcoded waarden.
 */
export function OrganizationJsonLd() {
  useEffect(() => {
    const SCRIPT_ID = "ld-json-organization";
    const existing = document.getElementById(SCRIPT_ID);
    if (existing) existing.remove();

    const data = {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: company.legalName,
      url: window.location.origin,
      email: company.email,
      telephone: company.phone.e164,
      address: {
        "@type": "PostalAddress",
        streetAddress: company.address.street,
        postalCode: company.address.postalCode,
        addressLocality: company.address.city,
        addressRegion: company.address.region,
        addressCountry: company.address.countryCode,
      },
      contactPoint: [
        {
          "@type": "ContactPoint",
          contactType: "customer service",
          telephone: company.phone.e164,
          email: company.email,
          areaServed: company.address.countryCode,
          availableLanguage: ["nl", "en"],
        },
      ],
    };

    const script = document.createElement("script");
    script.id = SCRIPT_ID;
    script.type = "application/ld+json";
    script.text = JSON.stringify(data);
    document.head.appendChild(script);

    // Open Graph contact-meta — exact dezelfde waarden
    const setMeta = (property: string, content: string) => {
      let tag = document.head.querySelector<HTMLMetaElement>(
        `meta[property="${property}"]`,
      );
      if (!tag) {
        tag = document.createElement("meta");
        tag.setAttribute("property", property);
        document.head.appendChild(tag);
      }
      tag.setAttribute("content", content);
    };
    setMeta("og:email", company.email);
    setMeta("og:phone_number", company.phone.e164);
    setMeta("og:street-address", company.address.street);
    setMeta("og:locality", company.address.city);
    setMeta("og:postal-code", company.address.postalCode);
    setMeta("og:country-name", company.address.country);

    // Beschrijvend voor screenreaders / debuggers
    void addressOneLine;
  }, []);

  return null;
}
