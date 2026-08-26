import { useEffect } from "react";
import { SITE_OG_IMAGE, SITE_URL } from "@/config/company";

export interface PageMetaInput {
  title: string;
  description?: string;
  /** Path or full URL for canonical. If path-only, origin is prefixed. */
  canonical?: string;
  ogType?: "website" | "article";
  ogImage?: string;
  /** Extra JSON-LD object(s) to inject. */
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
  /** If true, instructs search engines not to index this page. */
  noindex?: boolean;
}

type SeoMetaOverride = Required<Pick<PageMetaInput, "title" | "description">>;

const DEFAULT_OG_IMAGE = SITE_OG_IMAGE;

const META_OVERRIDES: Record<string, SeoMetaOverride> = {
  "/": {
    title: "TerreVolt BV | LS/MS-infrastructuur en aarding",
    description:
      "TerreVolt helpt met LS/MS-netmontage, stationsrenovatie, schakelwerk, aarding, metingen en huisaansluitingen.",
  },
  "/diensten": {
    title: "Diensten | LS/MS, schakelwerk en aarding | TerreVolt",
    description:
      "Bekijk LS/MS-netmontage, stationsrenovatie, schakelwerk, aarding, meten en beproeven en huisaansluitingen van TerreVolt.",
  },
  "/diensten/ls-ms-netmontage": {
    title: "LS/MS netmontage | Kabelmontage | TerreVolt",
    description:
      "Kabelmontage, moffen, eindsluitingen en aansluitwerk in laag- en middenspanningsnetten voor netbeheerders, aannemers en industrie.",
  },
  "/diensten/stationsrenovatie": {
    title: "Stationsrenovatie MS/LS | TerreVolt",
    description:
      "Renovatie van MS/LS-stations, transformatorruimten, LS-rekken en aarding, gefaseerd uitgevoerd en aantoonbaar opgeleverd.",
  },
  "/diensten/schakelwerk": {
    title: "Schakelwerk en veiligstellen | TerreVolt",
    description:
      "Schakelwerk, vrijschakelen, veiligstellen en in- en uitbedrijf nemen binnen LS/MS-projecten volgens duidelijke procedures.",
  },
  "/aarding": {
    title: "Aardpen laten slaan | Aarding meten | TerreVolt",
    description:
      "Aardpen laten slaan of aarding meten? TerreVolt helpt bij meterkast, laadpaal, zonnepanelen, woning, VvE en bedrijf. Meetrapport mogelijk.",
  },
  "/aardpen-slaan-amsterdam": {
    title: "Aardpen slaan Amsterdam | Aarding meten | TerreVolt",
    description:
      "Aardpen laten slaan in Amsterdam? TerreVolt helpt met aarding meten, meetrapport, meterkast, laadpaal, zonnepanelen, VvE en bedrijf.",
  },
  "/diensten/meten-en-beproeven": {
    title: "Meten en beproeven | Aardingsmetingen | TerreVolt",
    description:
      "Aardingsmetingen, kabelmetingen, controlemetingen en opleverrapportages voor LS/MS-installaties, aarding en projectdossiers.",
  },
  "/diensten/huisaansluitingen": {
    title: "Huisaansluitingen en LS-aansluitwerk | TerreVolt",
    description:
      "Aanleg, wijziging en sanering van huisaansluitingen en aansluitwerk op het laagspanningsnet voor woningen en projecten.",
  },
  "/projecten": {
    title: "Projecten | Elektrotechnische infra | TerreVolt",
    description:
      "Projecttypes en praktijkvoorbeelden binnen LS/MS-infrastructuur, stationsrenovatie, schakelwerk, aarding en metingen.",
  },
  "/veiligheid": {
    title: "Veiligheid, BEI en VCA** | TerreVolt",
    description:
      "Veilig werken met BEI BLS/BHS, VWI's, LMRA, VCA** 2017/6.0, ISO 9001:2015 en SBB erkend leerbedrijf.",
  },
  "/over": {
    title: "Over TerreVolt BV | Elektrotechniek Utrecht",
    description:
      "TerreVolt BV uit Utrecht is uitvoerend specialist in LS/MS-infrastructuur, netmontage, aarding, schakelwerk en technische projecten.",
  },
  "/werken-bij": {
    title: "Werken bij TerreVolt | Vacatures elektrotechniek",
    description:
      "Bekijk vacatures voor elektrotechniek, laagspanning, middenspanning, aarding, huisaansluitingen en werkverantwoordelijkheid bij TerreVolt.",
  },
  "/contact": {
    title: "Contact | Project bespreken met TerreVolt",
    description:
      "Neem contact op met TerreVolt voor LS/MS-infrastructuur, schakelwerk, stationsrenovatie, netmontage, aarding en metingen.",
  },
  "/privacy": {
    title: "Privacyverklaring | TerreVolt",
    description:
      "Privacyverklaring van TerreVolt over contactaanvragen, sollicitaties, uploads en gegevensverwerking via de website.",
  },
  "/kennis/middenspanning": {
    title: "Middenspanning uitgelegd | TerreVolt",
    description:
      "Wat is middenspanning, wanneer heb je een MS-aansluiting nodig en wie mag eraan werken? Uitleg over MS-netten, stations, BEI BHS en NEN 3840.",
  },
  "/kennis/laagspanning-middenspanning-hoogspanning": {
    title: "Laagspanning, middenspanning en hoogspanning | TerreVolt",
    description:
      "Het verschil tussen laagspanning, middenspanning en hoogspanning uitgelegd voor aansluitingen, netten en elektrotechnische projecten.",
  },
};

const CANONICAL_PATH_ALIASES = new Map<string, string>([["/aarding-aanleggen", "/aarding"]]);

function normalizePathAlias(value: string, source: string, target: string) {
  if (value === source) return target;
  if (value.startsWith(`${source}?`) || value.startsWith(`${source}#`)) return `${target}${value.slice(source.length)}`;

  const absoluteSource = `${SITE_URL}${source}`;
  const absoluteTarget = `${SITE_URL}${target}`;
  if (value === absoluteSource) return absoluteTarget;
  if (value.startsWith(`${absoluteSource}?`) || value.startsWith(`${absoluteSource}#`)) {
    return `${absoluteTarget}${value.slice(absoluteSource.length)}`;
  }

  return value;
}

function normalizeUrlValue(value: string) {
  let normalized = value;
  CANONICAL_PATH_ALIASES.forEach((target, source) => {
    normalized = normalizePathAlias(normalized, source, target);
  });
  return normalized;
}

function canonicalPathKey(value: string) {
  const normalized = normalizeUrlValue(value);
  try {
    const url = normalized.startsWith("http") ? new URL(normalized) : new URL(normalized, SITE_URL);
    return url.pathname || "/";
  } catch {
    return normalized.split(/[?#]/)[0] || "/";
  }
}

function normalizeCanonical(canonical: string | undefined, currentPath: string) {
  const value = canonical || currentPath;
  return normalizeUrlValue(value);
}

function normalizeStructuredValue(value: unknown): unknown {
  if (typeof value === "string") return normalizeUrlValue(value);
  if (Array.isArray(value)) return value.map(normalizeStructuredValue);
  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value as Record<string, unknown>).map(([key, entry]) => [key, normalizeStructuredValue(entry)]),
    );
  }
  return value;
}

function normalizeJsonLd(jsonLd?: Record<string, unknown> | Record<string, unknown>[]) {
  if (!jsonLd) return undefined;
  return normalizeStructuredValue(jsonLd) as Record<string, unknown> | Record<string, unknown>[];
}

function upsertMeta(attr: "name" | "property", key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function upsertLink(rel: string, href: string) {
  let el = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

function setJsonLd(jsonLd?: Record<string, unknown> | Record<string, unknown>[]) {
  // Remove previous page-scoped JSON-LD
  document.head
    .querySelectorAll('script[type="application/ld+json"][data-page-meta="true"]')
    .forEach((s) => s.remove());
  if (!jsonLd) return;
  const arr = Array.isArray(jsonLd) ? jsonLd : [jsonLd];
  arr.forEach((obj) => {
    const s = document.createElement("script");
    s.type = "application/ld+json";
    s.dataset.pageMeta = "true";
    s.text = JSON.stringify(obj);
    document.head.appendChild(s);
  });
}

export function usePageMeta(meta: PageMetaInput): void;
export function usePageMeta(title: string, description?: string, canonical?: string): void;
export function usePageMeta(
  metaOrTitle: PageMetaInput | string,
  description?: string,
  canonical?: string,
): void {
  const meta: PageMetaInput =
    typeof metaOrTitle === "string"
      ? { title: metaOrTitle, description, canonical }
      : metaOrTitle;
  useEffect(() => {
    if (typeof document === "undefined") return;
    // Canonicals/og:url moeten ALTIJD het productiedomein gebruiken,
    // ongeacht of we draaien op preview-, lovable.app- of custom domain.
    const origin = SITE_URL;
    const path = typeof window !== "undefined" ? window.location.pathname : "/";
    const canonicalValue = normalizeCanonical(meta.canonical, path);
    const canonicalHref = canonicalValue.startsWith("http") ? canonicalValue : origin + canonicalValue;
    const metaOverride = META_OVERRIDES[canonicalPathKey(canonicalValue)];
    const pageTitle = metaOverride?.title ?? meta.title;
    const pageDescription = metaOverride?.description ?? meta.description;

    document.title = pageTitle;
    if (pageDescription) upsertMeta("name", "description", pageDescription);

    upsertLink("canonical", canonicalHref);

    upsertMeta("property", "og:site_name", "TerreVolt");
    upsertMeta("property", "og:locale", "nl_NL");
    upsertMeta("property", "og:title", pageTitle);
    if (pageDescription) upsertMeta("property", "og:description", pageDescription);
    upsertMeta("property", "og:type", meta.ogType ?? "website");
    upsertMeta("property", "og:url", canonicalHref);
    upsertMeta("property", "og:image", meta.ogImage ?? DEFAULT_OG_IMAGE);
    upsertMeta("property", "og:image:alt", pageTitle);

    upsertMeta("name", "twitter:card", "summary_large_image");
    upsertMeta("name", "twitter:title", pageTitle);
    if (pageDescription) upsertMeta("name", "twitter:description", pageDescription);
    upsertMeta("name", "twitter:image", meta.ogImage ?? DEFAULT_OG_IMAGE);

    // Alleen preview-/sandbox-omgevingen op noindex; alle live domeinen indexeerbaar.
    const host = typeof window !== "undefined" ? window.location.hostname : "";
    const isPreviewHost =
      host === "localhost" ||
      host === "127.0.0.1" ||
      host.includes("-preview--") ||
      host.endsWith(".lovableproject.com") ||
      host.endsWith(".sandbox.lovable.dev");
    upsertMeta("name", "robots", meta.noindex || isPreviewHost ? "noindex, nofollow" : "index, follow");

    setJsonLd(normalizeJsonLd(meta.jsonLd));

    return () => {
      // Reset page-scoped JSON-LD on unmount so the next page starts clean.
      document.head
        .querySelectorAll('script[type="application/ld+json"][data-page-meta="true"]')
        .forEach((s) => s.remove());
    };
  }, [
    meta.title,
    meta.description,
    meta.canonical,
    meta.ogType,
    meta.ogImage,
    meta.noindex,
    JSON.stringify(meta.jsonLd ?? null),
  ]);
}
