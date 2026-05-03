import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { trackPageView } from "@/lib/analytics";

/**
 * Global route tracker. Mounted once at the App level inside <BrowserRouter>.
 * Sends a page_view on every pathname/search change.
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
  return null;
}
