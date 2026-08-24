import { useEffect } from "react";

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

import { SITE_OG_IMAGE, SITE_URL } from "@/config/company";

const DEFAULT_OG_IMAGE = SITE_OG_IMAGE;

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

    document.title = meta.title;
    if (meta.description) upsertMeta("name", "description", meta.description);

    const path = typeof window !== "undefined" ? window.location.pathname : "/";
    const canonicalHref = meta.canonical
      ? meta.canonical.startsWith("http")
        ? meta.canonical
        : origin + meta.canonical
      : origin + path;
    upsertLink("canonical", canonicalHref);

    upsertMeta("property", "og:site_name", "TerreVolt");
    upsertMeta("property", "og:locale", "nl_NL");
    upsertMeta("property", "og:title", meta.title);
    if (meta.description) upsertMeta("property", "og:description", meta.description);
    upsertMeta("property", "og:type", meta.ogType ?? "website");
    upsertMeta("property", "og:url", canonicalHref);
    upsertMeta("property", "og:image", meta.ogImage ?? DEFAULT_OG_IMAGE);
    upsertMeta("property", "og:image:alt", meta.title);

    upsertMeta("name", "twitter:card", "summary_large_image");
    upsertMeta("name", "twitter:title", meta.title);
    if (meta.description) upsertMeta("name", "twitter:description", meta.description);
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


    setJsonLd(meta.jsonLd);

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
