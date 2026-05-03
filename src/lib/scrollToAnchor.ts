export const PROGRAMMATIC_SCROLL_EVENT = "terrevolt:programmatic-scroll";

export type ProgrammaticScrollDetail = {
  active: boolean;
  targetId?: string;
};

const getAnchorId = (hashOrId: string) => {
  const raw = hashOrId.startsWith("#") ? hashOrId.slice(1) : hashOrId;
  try {
    return decodeURIComponent(raw);
  } catch {
    return raw;
  }
};

export const getAnchorScrollOffset = () => {
  const header = document.querySelector<HTMLElement>("header");
  const headerH = header ? header.getBoundingClientRect().height : 0;
  const stickyOffsetH = Array.from(document.querySelectorAll<HTMLElement>("[data-hash-scroll-offset]"))
    .reduce((total, el) => total + el.getBoundingClientRect().height, 0);

  return Math.round(headerH + stickyOffsetH + 16);
};

export const setProgrammaticScroll = (active: boolean, targetId?: string) => {
  window.dispatchEvent(
    new CustomEvent<ProgrammaticScrollDetail>(PROGRAMMATIC_SCROLL_EVENT, {
      detail: { active, targetId },
    }),
  );
};

export const scrollToAnchor = (hashOrId: string, behavior: ScrollBehavior = "smooth") => {
  const id = getAnchorId(hashOrId);
  if (!id) return false;

  const element = document.getElementById(id);
  if (!element) return false;

  return scrollToElement(element, behavior, id);
};

export const scrollToElement = (element: HTMLElement, behavior: ScrollBehavior = "smooth", targetId = element.id) => {
  if (!element) return false;

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const finalBehavior: ScrollBehavior = prefersReducedMotion ? "auto" : behavior;
  const html = document.documentElement;
  const previousInlineScrollBehavior = html.style.scrollBehavior;
  const top = Math.max(0, element.getBoundingClientRect().top + window.scrollY - getAnchorScrollOffset());

  setProgrammaticScroll(true, targetId);
  html.style.scrollBehavior = "auto";
  window.scrollTo({ top, behavior: finalBehavior });
  window.requestAnimationFrame(() => {
    html.style.scrollBehavior = previousInlineScrollBehavior;
  });

  return true;
};