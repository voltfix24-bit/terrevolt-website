import { useCallback, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { scrollToAnchor, setProgrammaticScroll } from "@/lib/scrollToAnchor";

let lastAutoScrolledKey = "";

/**
 * Eén centrale hash-scroller voor directe page loads, in-app navigatie
 * en same-page anchor clicks. Voorkomt dubbele native/CSS/JS-scrolls.
 */
export function HashScroll() {
  const navigate = useNavigate();
  const { pathname, search, hash } = useLocation();
  const locationRef = useRef({ pathname, search, hash });
  const programmaticEndTimerRef = useRef<number | null>(null);

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

      if (programmaticEndTimerRef.current) {
        window.clearTimeout(programmaticEndTimerRef.current);
      }

      if (!scrollToAnchor(id, finalBehavior)) return false;

      const el = document.getElementById(id);
      if (!el) return false;
      const prevTabIndex = el.getAttribute("tabindex");
      if (prevTabIndex === null) el.setAttribute("tabindex", "-1");
      el.focus({ preventScroll: true });
      if (prevTabIndex === null) {
        window.setTimeout(() => el.removeAttribute("tabindex"), 0);
      }

      programmaticEndTimerRef.current = window.setTimeout(
        () => setProgrammaticScroll(false, id),
        finalBehavior === "smooth" ? 700 : 100,
      );

      return true;
    },
    [],
  );

  useEffect(() => {
    if (!hash) {
      lastAutoScrolledKey = "";
      return;
    }
    const scrollKey = `${pathname}${search}${hash}`;
    if (lastAutoScrolledKey === scrollKey) return;

    let cancelled = false;
    let rafId = 0;
    let firstTimer = 0;
    let retryTimer = 0;

    const run = (isRetry = false) => {
      if (cancelled) return;
      if (scrollToHash(hash, "smooth")) {
        lastAutoScrolledKey = scrollKey;
        return;
      }
      if (!isRetry) {
        retryTimer = window.setTimeout(() => run(true), 100);
      }
    };

    rafId = requestAnimationFrame(() => {
      firstTimer = window.setTimeout(() => run(false), 75);
    });

    return () => {
      cancelled = true;
      cancelAnimationFrame(rafId);
      window.clearTimeout(firstTimer);
      window.clearTimeout(retryTimer);
    };
  }, [pathname, search, hash, scrollToHash]);

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const target = (event.target as HTMLElement | null)?.closest('a[href^="#"]') as HTMLAnchorElement | null;
      if (!target) return;
      if (target.target && target.target !== "" && target.target !== "_self") return;

      const targetHash = target.getAttribute("href") || "";
      if (targetHash.length < 2) return;

      event.preventDefault();
      const current = locationRef.current;
      if (current.hash !== targetHash) {
        navigate({ pathname: current.pathname, search: current.search, hash: targetHash });
        return;
      }

      scrollToHash(targetHash, "smooth");
    };

    document.addEventListener("click", onClick);
    return () => {
      document.removeEventListener("click", onClick);
      if (programmaticEndTimerRef.current) {
        window.clearTimeout(programmaticEndTimerRef.current);
      }
    };
  }, [navigate, scrollToHash]);

  return null;
}
