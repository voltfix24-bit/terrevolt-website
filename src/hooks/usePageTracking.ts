import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { trackPageView } from "@/lib/analytics";

/**
 * Tracks a page view once per location change. Safe to use on any route.
 */
export function usePageTracking(extra?: { entity_type?: string; entity_id?: string }) {
  const location = useLocation();
  useEffect(() => {
    const path = location.pathname + location.search;
    // Defer slightly so document.title is updated by the page first.
    const t = window.setTimeout(() => {
      trackPageView(path, typeof document !== "undefined" ? document.title : undefined);
      if (extra?.entity_type || extra?.entity_id) {
        // optional entity-specific page event
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        import("@/lib/analytics").then(({ trackEvent }) =>
          trackEvent("page_view_entity", {
            page_path: path,
            entity_type: extra?.entity_type,
            entity_id: extra?.entity_id,
          })
        );
      }
    }, 50);
    return () => window.clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname, location.search]);
}
