import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { trackPageView, trackCTA } from "@/lib/analytics";

/**
 * Global tracker: page views + delegated CTA clicks.
 * - data-cta="Label" elements -> cta_click
 * - <a href="tel:...|mailto:...|https://wa.me/..."> -> cta_click with safe label
 */
export function RouteTracker() {
  const location = useLocation();

  useEffect(() => {
    const t = window.setTimeout(() => {
      trackPageView(
        location.pathname + location.search,
        typeof document !== "undefined" ? document.title : undefined
      );
    }, 80);
    return () => window.clearTimeout(t);
  }, [location.pathname, location.search]);

  useEffect(() => {
    function onClick(ev: MouseEvent) {
      try {
        const target = ev.target as HTMLElement | null;
        if (!target) return;
        const el = target.closest<HTMLElement>("[data-cta], a[href]");
        if (!el) return;

        const explicit = el.getAttribute("data-cta");
        const entityType = el.getAttribute("data-entity-type") ?? undefined;
        const entityId = el.getAttribute("data-entity-id") ?? undefined;

        if (explicit) {
          trackCTA(explicit, {
            ...(entityType ? { entity_type: entityType } : {}),
            ...(entityId ? { entity_id: entityId } : {}),
          });
          return;
        }

        if (el.tagName === "A") {
          const href = (el as HTMLAnchorElement).getAttribute("href") ?? "";
          if (href.startsWith("tel:")) {
            trackCTA("Bel-link", { kind: "tel" });
          } else if (href.startsWith("mailto:")) {
            trackCTA("Mail-link", { kind: "mail" });
          } else if (/^https?:\/\/(api\.)?(wa\.me|whatsapp\.com)/i.test(href)) {
            trackCTA("WhatsApp-link", { kind: "whatsapp" });
          }
        }
      } catch {
        /* never break the UI */
      }
    }
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  return null;
}
