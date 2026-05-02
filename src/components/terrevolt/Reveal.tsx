import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";

type Props = {
  children: ReactNode;
  /** Vertraging in ms (gebruikt voor stagger). */
  delay?: number;
  /** Wrapper element type. */
  as?: "div" | "section" | "li" | "article";
  className?: string;
  /** Extra inline style (bv. height/grid). */
  style?: CSSProperties;
  /** Threshold voor IntersectionObserver. */
  threshold?: number;
};

/**
 * Subtiele scroll-reveal. Gebruikt IntersectionObserver en CSS-klassen
 * (`.reveal` / `.is-visible`) uit index.css. Respecteert
 * `prefers-reduced-motion` (CSS schakelt animatie dan uit).
 *
 * Wordt server-safe gerenderd: zonder IntersectionObserver verschijnt
 * de inhoud direct (geen verborgen content).
 */
export const Reveal = ({
  children,
  delay = 0,
  as: Tag = "div",
  className,
  style,
  threshold = 0.12,
}: Props) => {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }

    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setVisible(true);
      return;
    }

    const obs = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true);
            obs.disconnect();
            break;
          }
        }
      },
      { threshold, rootMargin: "0px 0px -40px 0px" },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);

  const mergedStyle: CSSProperties = {
    ...(delay ? { transitionDelay: `${delay}ms` } : null),
    ...style,
  };

  return (
    <Tag
      ref={ref as never}
      className={`reveal${visible ? " is-visible" : ""}${className ? ` ${className}` : ""}`}
      style={mergedStyle}
    >
      {children}
    </Tag>
  );
};
