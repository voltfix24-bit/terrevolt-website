import { useCallback, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { scrollToAnchor } from "@/lib/scrollToAnchor";

let lastAutoScrolledKey = "";

/**
 * Eén centrale hash-scroller voor directe page loads, in-app navigatie
 * en same-page anchor clicks. Voorkomt dubbele native/CSS/JS-scrolls.
 */
export function HashScroll() {
  const navigate = useNavigate();
  const { pathname, search, hash } = useLocation();
  const locationRef = useRef({ pathname, search, hash });
  const lastScrolledKeyRef = useRef(lastAutoScrolledKey);

  useEffect(() => {
    locationRef.current = { pathname, search, hash };
  }, [pathname, search, hash]);

  const scrollToHash = useCallback(
    (targetHash: string, behavior: ScrollBehavior = "smooth") => {
      if (!targetHash || targetHash === "#") return false;

      let id = "";
      try {
        id = decodeURIComponent(targetHash.replace(/^#/, ""));
      } catch {
        id = targetHash.replace(/^#/, "");
      }
      if (!id) return false;

      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const finalBehavior: ScrollBehavior = prefersReducedMotion ? "auto" : behavior;

      if (!scrollToAnchor(id, finalBehavior)) return false;

      const el = document.getElementById(id);
      if (!el) return false;
      const prevTabIndex = el.getAttribute("tabindex");
      if (prevTabIndex === null) el.setAttribute("tabindex", "-1");
      el.focus({ preventScroll: true });
      if (prevTabIndex === null) {
        window.setTimeout(() => el.removeAttribute("tabindex"), 0);
      }

      return true;
    },
    [],
  );

  useEffect(() => {
    // Voorkom dat de browser zelf de scrollpositie herstelt op (re)load — wij beheren scrollen.
    if ("scrollRestoration" in window.history) {
      try {
        window.history.scrollRestoration = "manual";
      } catch {
        // ignore
      }
    }
  }, []);

  useEffect(() => {
    if (!hash) {
      lastScrolledKeyRef.current = "";
      lastAutoScrolledKey = "";
      return;
    }
    const scrollKey = `${pathname}${hash}`;
    if (lastScrolledKeyRef.current === scrollKey || lastAutoScrolledKey === scrollKey) return;

    let cancelled = false;
    let rafId = 0;
    const timers: number[] = [];

    // Probeer meerdere keren: async-data / lazy components mounten soms pas na 200–800ms.
    // Eerste poging direct na paint, daarna oplopend tot ~1.2s.
    const attemptDelays = [0, 80, 200, 400, 800, 1200];

    const tryScroll = () => {
      if (cancelled) return false;
      if (scrollToHash(hash, "smooth")) {
        lastScrolledKeyRef.current = scrollKey;
        lastAutoScrolledKey = scrollKey;
        return true;
      }
      return false;
    };

    rafId = requestAnimationFrame(() => {
      for (const delay of attemptDelays) {
        const t = window.setTimeout(() => {
          if (lastScrolledKeyRef.current === scrollKey) return;
          tryScroll();
        }, delay);
        timers.push(t);
      }
    });

    return () => {
      cancelled = true;
      cancelAnimationFrame(rafId);
      timers.forEach((t) => window.clearTimeout(t));
    };
  }, [pathname, hash, scrollToHash]);

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const target = (event.target as HTMLElement | null)?.closest('a[href*="#"]') as HTMLAnchorElement | null;
      if (!target) return;
      if (target.target && target.target !== "" && target.target !== "_self") return;

      const href = target.getAttribute("href") || "";
      if (!href.includes("#")) return;

      const targetUrl = new URL(href, window.location.href);
      if (targetUrl.origin !== window.location.origin || !targetUrl.hash || targetUrl.hash === "#") return;

      event.preventDefault();
      const current = locationRef.current;
      const nextSearch = targetUrl.search || (targetUrl.pathname === current.pathname ? current.search : "");
      if (targetUrl.pathname !== current.pathname || targetUrl.search !== current.search || current.hash !== targetUrl.hash) {
        navigate({ pathname: targetUrl.pathname, search: nextSearch, hash: targetUrl.hash });
        return;
      }

      scrollToHash(targetUrl.hash, "smooth");
    };

    document.addEventListener("click", onClick, true);
    return () => {
      document.removeEventListener("click", onClick, true);
    };
  }, [navigate, scrollToHash]);

  return null;
}
