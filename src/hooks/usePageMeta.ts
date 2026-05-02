import { useEffect } from "react";

function setMeta(selector: string, attr: "name" | "property", key: string, content: string) {
  let tag = document.head.querySelector<HTMLMetaElement>(selector);
  if (!tag) {
    tag = document.createElement("meta");
    tag.setAttribute(attr, key);
    document.head.appendChild(tag);
  }
  tag.setAttribute("content", content);
}

/**
 * Sets <title>, OG/Twitter meta and the canonical link.
 *
 * @param title         Document title (unique per page)
 * @param description   Meta description (unique per page)
 * @param canonicalPath Optional override; when given, canonical points to
 *                      `origin + canonicalPath` instead of the current pathname.
 *                      Use this on alias routes (e.g. /over-terrevolt → /over)
 *                      to avoid duplicate-content signals.
 */
export function usePageMeta(title: string, description?: string, canonicalPath?: string) {
  useEffect(() => {
    document.title = title;

    setMeta('meta[property="og:title"]', "property", "og:title", title);
    setMeta('meta[name="twitter:title"]', "name", "twitter:title", title);

    if (description) {
      setMeta('meta[name="description"]', "name", "description", description);
      setMeta('meta[property="og:description"]', "property", "og:description", description);
      setMeta('meta[name="twitter:description"]', "name", "twitter:description", description);
    }

    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    const path = canonicalPath ?? window.location.pathname;
    canonical.setAttribute("href", window.location.origin + path);
  }, [title, description, canonicalPath]);
}
