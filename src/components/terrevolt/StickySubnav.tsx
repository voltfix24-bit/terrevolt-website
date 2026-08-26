import { useEffect, useRef, useState } from "react";
import { PROGRAMMATIC_SCROLL_EVENT, type ProgrammaticScrollDetail } from "@/lib/scrollToAnchor";

export type StickySubnavItem = {
  label: string;
  href: string;
};

type StickySubnavProps = {
  items: StickySubnavItem[];
  ariaLabel: string;
};

/**
 * Sticky sectienavigatie (onderwerpenbalk) met scrollspy.
 * Blijft onder de header plakken; de scroll-offset wordt door
 * HashScroll/scrollToAnchor dynamisch meegenomen via data-hash-scroll-offset.
 */
export function StickySubnav({ items, ariaLabel }: StickySubnavProps) {
  const subnavRef = useRef<HTMLElement | null>(null);
  const isProgrammaticScrollRef = useRef(false);
  const programmaticScrollTimerRef = useRef<number | null>(null);
  const [activeId, setActiveId] = useState<string>("");

  const sectionIdsKey = items
    .filter((item) => item.href.startsWith("#"))
    .map((item) => item.href.slice(1))
    .join("|");

  useEffect(() => {
    const sections = sectionIdsKey
      .split("|")
      .filter(Boolean)
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => !!el);

    const computeActive = () => {
      if (isProgrammaticScrollRef.current) return;
      const header = document.querySelector("header");
      const headerH = header ? header.getBoundingClientRect().height : 0;
      const subnavH = subnavRef.current ? subnavRef.current.getBoundingClientRect().height : 0;
      const threshold = headerH + subnavH + 24;

      let current = "";
      for (const el of sections) {
        if (el.getBoundingClientRect().top - threshold <= 0) {
          current = el.id;
        }
      }
      // Bottom-of-page fallback: highlight last section
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) {
        current = sections[sections.length - 1]?.id ?? current;
      }
      setActiveId((previous) => (previous === current ? previous : current));
    };

    const onProgrammaticScroll = (event: Event) => {
      const { active, targetId } = (event as CustomEvent<ProgrammaticScrollDetail>).detail || {};
      isProgrammaticScrollRef.current = Boolean(active);
      if (targetId) {
        setActiveId((previous) => (previous === targetId ? previous : targetId));
      }
      if (programmaticScrollTimerRef.current) {
        window.clearTimeout(programmaticScrollTimerRef.current);
      }
      if (active) {
        programmaticScrollTimerRef.current = window.setTimeout(() => {
          isProgrammaticScrollRef.current = false;
          computeActive();
        }, 800);
      }
    };

    computeActive();
    window.addEventListener("scroll", computeActive, { passive: true });
    window.addEventListener("resize", computeActive);
    window.addEventListener(PROGRAMMATIC_SCROLL_EVENT, onProgrammaticScroll);
    return () => {
      window.removeEventListener("scroll", computeActive);
      window.removeEventListener("resize", computeActive);
      window.removeEventListener(PROGRAMMATIC_SCROLL_EVENT, onProgrammaticScroll);
      if (programmaticScrollTimerRef.current) {
        window.clearTimeout(programmaticScrollTimerRef.current);
      }
    };
  }, [sectionIdsKey]);

  return (
    <nav
      ref={subnavRef}
      data-hash-scroll-offset
      aria-label={ariaLabel}
      className="sticky top-20 sm:top-24 z-30 bg-white/80 supports-[backdrop-filter]:bg-white/65 backdrop-blur-md border-b border-gray-200/80 shadow-[0_6px_16px_-14px_rgba(13,59,46,0.5)]"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-12">
        <ul
          className="flex gap-1 sm:gap-2 justify-center overflow-x-auto scrollbar-hide -mx-1 px-1 py-2 snap-x snap-mandatory"
          style={{
            maskImage:
              "linear-gradient(to right, transparent 0, #000 16px, #000 calc(100% - 16px), transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to right, transparent 0, #000 16px, #000 calc(100% - 16px), transparent 100%)",
          }}
        >
          {items.map((item) => {
            const isActive = item.href.startsWith("#") && item.href.slice(1) === activeId;
            return (
              <li key={item.href} className="flex-shrink-0 snap-start">
                <a
                  href={item.href}
                  aria-current={isActive ? "true" : undefined}
                  className={`inline-flex items-center min-h-[40px] sm:min-h-[44px] px-3 sm:px-4 rounded-full text-sm tracking-tight focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9ed42e] focus-visible:ring-offset-1 border transition-all duration-200 whitespace-nowrap ${
                    isActive
                      ? "bg-[#0d3b2e] text-[#9ed42e] border-[#0d3b2e] shadow-[0_4px_12px_-6px_rgba(13,59,46,0.6)]"
                      : "text-[#0d3b2e]/80 border-transparent hover:text-[#0d3b2e] hover:bg-[#f0f7e6] hover:border-[#9ed42e]/40"
                  }`}
                >
                  {item.label}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
