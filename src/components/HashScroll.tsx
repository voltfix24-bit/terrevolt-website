import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Scrollt naar het element waarvan id matcht met de URL-hash.
 * Werkt bij directe page loads en bij in-app navigatie naar /pad#anchor.
 *
 * Houdt rekening met:
 *  - async geladen content (Supabase fetches) door een korte tijd te blijven
 *    her-positioneren tot het element stabiel is.
 *  - sticky header/subnav via CSS scroll-margin-top (scroll-mt-*).
 *  - prefers-reduced-motion via globale CSS scroll-behavior.
 */
export function HashScroll() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) return;
    const id = decodeURIComponent(hash.replace(/^#/, ""));
    if (!id) return;

    let cancelled = false;
    let lastTop = -1;
    let stableCount = 0;
    let attempts = 0;
    const MAX_ATTEMPTS = 60; // ~3s totaal

    const tick = () => {
      if (cancelled) return;
      const el = document.getElementById(id);
      if (el) {
        // Geen smooth bij eerste positionering — voorkomt halve scroll bij
        // langzaam ladende content.
        el.scrollIntoView({ block: "start" });
        const top = el.getBoundingClientRect().top;
        if (Math.abs(top - lastTop) < 1) {
          stableCount++;
          if (stableCount >= 3) return; // doelpositie is stabiel
        } else {
          stableCount = 0;
          lastTop = top;
        }
      }
      if (++attempts < MAX_ATTEMPTS) {
        window.setTimeout(tick, 50);
      }
    };

    requestAnimationFrame(tick);
    return () => {
      cancelled = true;
    };
  }, [pathname, hash]);

  return null;
}
