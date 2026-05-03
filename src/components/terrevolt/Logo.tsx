/**
 * TerreVolt-logo — exact de aangeleverde SVG, inline gerenderd zodat
 * stroke en font ook op kleine afmetingen betrouwbaar tonen.
 *
 * - Bliksem (Lucide Zap, outline) in groen
 * - IEC-aardingssymbool in geel
 * - Wordmark "TerreVolt BV" in Manrope 800
 *
 * Light/dark wordt automatisch geregeld via Tailwind dark-class
 * (witte tekst + felgroene bolt op donker).
 */
export interface LogoProps {
  className?: string;
  /** Forceer een variant. Default: auto (volgt `dark:` op <html>). */
  variant?: "auto" | "light" | "dark";
  title?: string;
}

function LogoSvg({ dark, title }: { dark: boolean; title: string }) {
  const boltColor = dark ? "#9ed42e" : "#1aab47";
  const earthColor = "#f0b41a";
  const textColor = dark ? "#ffffff" : "#0f172a";
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 15 920 200"
      role="img"
      preserveAspectRatio="xMinYMid meet"
      aria-label={title}
      className="h-full w-auto block"
    >
      {/* Bliksemschicht */}
      <g transform="translate(70 25) scale(7.2)">
        <path
          d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"
          fill="none"
          stroke={boltColor}
          strokeWidth={14}
          strokeLinejoin="round"
          strokeLinecap="round"
        />
      </g>
      {/* Aardingssymbool */}
      <g stroke={earthColor} strokeWidth={6.5} strokeLinecap="round" fill="none">
        <line x1="225" y1="160" x2="225" y2="178" />
        <line x1="202" y1="178" x2="248" y2="178" />
        <line x1="209" y1="192" x2="241" y2="192" />
        <line x1="216" y1="206" x2="234" y2="206" />
      </g>
      {/* Wordmark */}
      <text
        x="285"
        y="155"
        fill={textColor}
        fontFamily="'Manrope','Inter','Plus Jakarta Sans','Helvetica Neue',sans-serif"
        fontWeight={800}
        fontSize={100}
        letterSpacing="-3"
      >
        TerreVolt BV
      </text>
    </svg>
  );
}

export function Logo({ className = "h-10", variant = "auto", title = "TerreVolt BV" }: LogoProps) {
  if (variant === "light") {
    return (
      <span className={`inline-block ${className}`}>
        <LogoSvg dark={false} title={title} />
      </span>
    );
  }
  if (variant === "dark") {
    return (
      <span className={`inline-block ${className}`}>
        <LogoSvg dark title={title} />
      </span>
    );
  }
  return (
    <>
      <span className={`inline-block dark:hidden ${className}`}>
        <LogoSvg dark={false} title={title} />
      </span>
      <span className={`hidden dark:inline-block ${className}`}>
        <LogoSvg dark title={title} />
      </span>
    </>
  );
}
