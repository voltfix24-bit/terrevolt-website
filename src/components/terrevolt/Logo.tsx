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
  style?: React.CSSProperties;
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
      viewBox="0 0 480 120"
      role="img"
      preserveAspectRatio="xMinYMid meet"
      aria-label={title}
      className="h-full w-auto block"
    >
      {/* Bliksemschicht */}
      <g transform="translate(24 18)">
        <path
          d="M 52 4 L 14 56 L 40 56 L 30 92 L 70 42 L 44 42 Z"
          fill="none"
          stroke={boltColor}
          strokeWidth={7}
          strokeLinejoin="round"
          strokeLinecap="round"
        />
      </g>
      {/* Aardingssymbool */}
      <g stroke={earthColor} strokeWidth={3.5} strokeLinecap="round" fill="none">
        <line x1="112" y1="78" x2="112" y2="86" />
        <line x1="100" y1="86" x2="124" y2="86" />
        <line x1="104" y1="94" x2="120" y2="94" />
        <line x1="108" y1="102" x2="116" y2="102" />
      </g>
      {/* Wordmark */}
      <text
        x="142"
        y="80"
        fill={textColor}
        fontFamily="'Manrope','Inter','Plus Jakarta Sans','Helvetica Neue',sans-serif"
        fontWeight={800}
        fontSize={56}
        letterSpacing="-1.6"
      >
        TerreVolt BV
      </text>
    </svg>
  );
}

export function Logo({ className = "h-10", style, variant = "auto", title = "TerreVolt BV" }: LogoProps) {
  if (variant === "light") {
    return (
      <span className={`inline-block ${className}`} style={style}>
        <LogoSvg dark={false} title={title} />
      </span>
    );
  }
  if (variant === "dark") {
    return (
      <span className={`inline-block ${className}`} style={style}>
        <LogoSvg dark title={title} />
      </span>
    );
  }
  return (
    <>
      <span className={`inline-block dark:hidden ${className}`} style={style}>
        <LogoSvg dark={false} title={title} />
      </span>
      <span className={`hidden dark:inline-block ${className}`} style={style}>
        <LogoSvg dark title={title} />
      </span>
    </>
  );
}
