import { forwardRef, type SVGProps } from "react";

/**
 * TerreVolt-logo — bliksemschicht (Lucide Zap, outline) naast
 * het IEC-aardingssymbool. Eén SVG-symbol, themable via CSS-vars
 * --tv-bolt en --tv-earth (of currentColor). Geen achtergrondvulling
 * → standaard transparant. Zie ook <LogoLockup /> voor mark + wordmark.
 *
 * Light-/dark-keuze gebeurt via Tailwind `dark:`-varianten op de
 * wrapper en op de wordmark-tekst, zodat de juiste accentkleuren
 * automatisch volgen op het actieve thema.
 */

export interface LogoMarkProps extends Omit<SVGProps<SVGSVGElement>, "ref"> {
  /** Stacked variant (vierkant) voor favicon/app-tile. Default: horizontaal. */
  stacked?: boolean;
  title?: string;
}

export const LogoMark = forwardRef<SVGSVGElement, LogoMarkProps>(
  ({ stacked = false, title = "TerreVolt", className, ...rest }, ref) => {
    if (stacked) {
      return (
        <svg
          ref={ref}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 120 120"
          role="img"
          aria-label={title}
          className={className}
          {...rest}
        >
          <g transform="translate(28 4) scale(3.0)">
            <path
              d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"
              fill="none"
              stroke="var(--tv-bolt, #1aab47)"
              strokeWidth={3.2}
              strokeLinejoin="round"
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
            />
          </g>
          <g
            stroke="var(--tv-earth, #f0b41a)"
            strokeWidth={6}
            strokeLinecap="round"
            fill="none"
          >
            <line x1="60" y1="80" x2="60" y2="94" />
            <line x1="38" y1="94" x2="82" y2="94" />
            <line x1="46" y1="104" x2="74" y2="104" />
            <line x1="53" y1="114" x2="67" y2="114" />
          </g>
        </svg>
      );
    }
    return (
      <svg
        ref={ref}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 200 140"
        role="img"
        aria-label={title}
        className={className}
        {...rest}
      >
        {/* Bliksem links */}
        <g transform="translate(8 6) scale(5.2)">
          <path
            d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"
            fill="none"
            stroke="var(--tv-bolt, #1aab47)"
            strokeWidth={3}
            strokeLinejoin="round"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
          />
        </g>
        {/* Aarding rechts */}
        <g
          stroke="var(--tv-earth, #f0b41a)"
          strokeWidth={7}
          strokeLinecap="round"
          fill="none"
        >
          <line x1="150" y1="58" x2="150" y2="82" />
          <line x1="118" y1="82" x2="182" y2="82" />
          <line x1="128" y1="100" x2="172" y2="100" />
          <line x1="138" y1="118" x2="162" y2="118" />
        </g>
      </svg>
    );
  },
);
LogoMark.displayName = "LogoMark";

export interface LogoLockupProps {
  /** Toont de "BV"-suffix in de wordmark. Default: true. */
  withSuffix?: boolean;
  /** Extra classes op de outer wrapper. */
  className?: string;
  /** Tailwind-classes voor mark hoogte (bv. "h-9 sm:h-10"). */
  markClassName?: string;
  /** Tailwind-classes voor wordmark. */
  wordmarkClassName?: string;
}

/**
 * Mark + wordmark op één regel. Kleurkeuze verloopt via CSS-vars
 * die op de wrapper geset worden — ook in dark mode (Tailwind `dark:`).
 */
export function LogoLockup({
  withSuffix = true,
  className = "",
  markClassName = "h-9 w-auto sm:h-10",
  wordmarkClassName = "text-base sm:text-xl",
}: LogoLockupProps) {
  return (
    <span
      className={`inline-flex items-center gap-2 sm:gap-3 min-w-0 [--tv-bolt:#1aab47] [--tv-earth:#f0b41a] dark:[--tv-bolt:#9ed42e] dark:[--tv-earth:#f0b41a] ${className}`}
    >
      <LogoMark className={`${markClassName} shrink-0`} />
      <span className="min-w-0 leading-tight">
        <span
          className={`block font-extrabold tracking-tight text-[#0f172a] dark:text-white truncate ${wordmarkClassName}`}
          style={{ letterSpacing: "-0.04em" }}
        >
          TerreVolt
          {withSuffix && (
            <span className="ml-1 font-bold text-[#6c757d] dark:text-white/60">
              BV
            </span>
          )}
        </span>
      </span>
    </span>
  );
}
