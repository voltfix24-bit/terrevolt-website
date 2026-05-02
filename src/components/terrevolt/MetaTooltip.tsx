import { useEffect, useId, useRef, useState, type ReactNode } from "react";

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
export const MetaTooltip = ({ label, enabled = true, children, className }: Props) => {
  const [open, setOpen] = useState(false);
  const id = useId();
  const wrapRef = useRef<HTMLSpanElement>(null);
  const hideTimer = useRef<number | null>(null);

  const clearHide = () => {
    if (hideTimer.current !== null) {
      window.clearTimeout(hideTimer.current);
      hideTimer.current = null;
    }
  };

  const scheduleHide = (ms: number) => {
    clearHide();
    hideTimer.current = window.setTimeout(() => setOpen(false), ms);
  };

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

  useEffect(() => () => clearHide(), []);

  if (!enabled) {
    return <span className={className}>{children}</span>;
  }

  const handlePointerDown = (e: React.PointerEvent) => {
    if (e.pointerType === "touch") {
      // Tap toggelt en plant auto-hide.
      setOpen((prev) => {
        if (prev) {
          clearHide();
          return false;
        }
        scheduleHide(2500);
        return true;
      });
    }
  };

  return (
    <span
      ref={wrapRef}
      className={`relative inline-flex max-w-full ${className ?? ""}`}
      onMouseEnter={() => {
        clearHide();
        setOpen(true);
      }}
      onMouseLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onBlur={() => setOpen(false)}
      onPointerDown={handlePointerDown}
    >
      <span aria-describedby={open ? id : undefined} className="inline-flex max-w-full min-w-0">
        {children}
      </span>
      <span
        role="tooltip"
        id={id}
        className={`pointer-events-none absolute left-1/2 -translate-x-1/2 bottom-full mb-2 z-40 max-w-[min(18rem,calc(100vw-2rem))] whitespace-normal break-words rounded-lg bg-[#0d3b2e] text-white text-xs leading-snug px-3 py-2 shadow-lg transition-[opacity,transform] duration-200 ease-out motion-reduce:transition-none motion-reduce:transform-none ${
          open ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1"
        }`}
        aria-hidden={!open}
      >
        {label}
        <span
          aria-hidden="true"
          className="absolute left-1/2 -translate-x-1/2 top-full -mt-px h-2 w-2 rotate-45 bg-[#0d3b2e]"
        />
      </span>
    </span>
  );
};
