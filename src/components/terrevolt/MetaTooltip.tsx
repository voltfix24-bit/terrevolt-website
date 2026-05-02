import { memo, useCallback, useEffect, useId, useRef, useState, type ReactNode } from "react";

type Props = {
  /** Volledige tekst die in de tooltip getoond wordt. */
  label: string;
  /** Wanneer false wordt de tooltip volledig uitgeschakeld (bv. als waarde al volledig zichtbaar is). */
  enabled?: boolean;
  /** De badge zelf. */
  children: ReactNode;
  /** Optionele wrapper-class — de wrapper is altijd inline-flex zodat de badge zijn maat behoudt. */
  className?: string;
};

/**
 * Toegankelijke tooltip die ook op touch-apparaten werkt.
 * - Desktop: hover + focus tonen tooltip.
 * - Touch:   tap toont tooltip (auto-hide na 2.5s); tap buiten of nieuwe tap sluit.
 * - Escape sluit altijd.
 */
const MetaTooltipImpl = ({ label, enabled = true, children, className }: Props) => {
  const [open, setOpen] = useState(false);
  const [shift, setShift] = useState(0);
  const [arrowOffset, setArrowOffset] = useState(0);
  const id = useId();
  const wrapRef = useRef<HTMLSpanElement>(null);
  const tipRef = useRef<HTMLSpanElement>(null);
  const hideTimer = useRef<number | null>(null);

  const clearHide = useCallback(() => {
    if (hideTimer.current !== null) {
      window.clearTimeout(hideTimer.current);
      hideTimer.current = null;
    }
  }, []);

  const scheduleHide = useCallback(
    (ms: number) => {
      clearHide();
      hideTimer.current = window.setTimeout(() => setOpen(false), ms);
    },
    [clearHide],
  );

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: PointerEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown, true);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown, true);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  // Klem de tooltip binnen de viewport zodra hij opent of het scherm wijzigt.
  useEffect(() => {
    if (!open) return;
    const reposition = () => {
      const wrap = wrapRef.current;
      const tip = tipRef.current;
      if (!wrap || !tip) return;
      const gutter = 12;
      const wrapRect = wrap.getBoundingClientRect();
      const wrapCenter = wrapRect.left + wrapRect.width / 2;
      const tipWidth = tip.offsetWidth;
      const desiredLeft = wrapCenter - tipWidth / 2;
      const maxLeft = window.innerWidth - gutter - tipWidth;
      const minLeft = gutter;
      const clampedLeft = Math.max(minLeft, Math.min(desiredLeft, maxLeft));
      const nextShift = clampedLeft - desiredLeft;
      setShift(nextShift);
      // Pijl blijft op het midden van de wrapper wijzen.
      setArrowOffset(-nextShift);
    };
    reposition();
    window.addEventListener("resize", reposition);
    window.addEventListener("scroll", reposition, true);
    return () => {
      window.removeEventListener("resize", reposition);
      window.removeEventListener("scroll", reposition, true);
    };
  }, [open, label]);

  useEffect(() => () => clearHide(), [clearHide]);

  const handlePointerDown = useCallback(
    (e: React.PointerEvent) => {
      if (e.pointerType === "touch") {
        setOpen((prev) => {
          if (prev) {
            clearHide();
            return false;
          }
          scheduleHide(2500);
          return true;
        });
      }
    },
    [clearHide, scheduleHide],
  );

  const handleMouseEnter = useCallback(() => {
    clearHide();
    setOpen(true);
  }, [clearHide]);

  const handleMouseLeave = useCallback(() => setOpen(false), []);
  const handleFocus = useCallback(() => setOpen(true), []);
  const handleBlur = useCallback(() => setOpen(false), []);

  if (!enabled) {
    return <span className={className}>{children}</span>;
  }

  return (
    <span
      ref={wrapRef}
      className={`relative inline-flex max-w-full ${className ?? ""}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onPointerDown={handlePointerDown}
    >
      <span aria-describedby={open ? id : undefined} className="inline-flex max-w-full min-w-0">
        {children}
      </span>
      <span
        ref={tipRef}
        role="tooltip"
        id={id}
        style={{ transform: `translate(calc(-50% + ${shift}px), ${open ? "0" : "4px"})` }}
        className={`pointer-events-none absolute left-1/2 bottom-full mb-2 z-40 w-max max-w-[min(18rem,calc(100vw-1.5rem))] whitespace-normal break-words [overflow-wrap:anywhere] [hyphens:auto] rounded-lg bg-[#0d3b2e] text-white text-xs leading-snug px-3 py-2 shadow-lg transition-[opacity,transform] duration-200 ease-out motion-reduce:transition-none ${
          open ? "opacity-100" : "opacity-0"
        }`}
        aria-hidden={!open}
      >
        {label}
        <span
          aria-hidden="true"
          style={{ transform: `translateX(calc(-50% + ${arrowOffset}px)) rotate(45deg)` }}
          className="absolute left-1/2 top-full -mt-px h-2 w-2 bg-[#0d3b2e]"
        />
      </span>
    </span>
  );
};

export const MetaTooltip = memo(MetaTooltipImpl);

