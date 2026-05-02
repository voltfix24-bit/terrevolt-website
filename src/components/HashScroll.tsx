import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Scrollt naar het element waarvan id matcht met de URL-hash.
 * Werkt bij directe page loads en bij in-app navigatie naar /pad#anchor.
 * Respecteert prefers-reduced-motion via globale CSS scroll-behavior.
 */
export function HashScroll() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) return;
    const id = decodeURIComponent(hash.replace(/^#/, ""));
    if (!id) return;

    // Wacht tot de pagina-content (sectie) gerenderd is
    let attempts = 0;
    const maxAttempts = 20; // ~1s
    const tryScroll = () => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ block: "start" });
        return;
      }
      if (++attempts < maxAttempts) {
        window.setTimeout(tryScroll, 50);
      }
    };
    // RAF zorgt dat layout klaar is na route-wissel
    requestAnimationFrame(tryScroll);
  }, [pathname, hash]);

  return null;
}
