import logoSrc from "@/assets/terrevolt-logo.png";

/**
 * TerreVolt-logo — gebruikt de geüploade PNG, overal dezelfde afbeelding.
 */
export interface LogoProps {
  className?: string;
  style?: React.CSSProperties;
  variant?: "auto" | "light" | "dark";
  title?: string;
}

export function Logo({ className = "h-10", style, title = "TerreVolt BV" }: LogoProps) {
  return (
    <img
      src={logoSrc}
      alt={title}
      className={`${className} w-auto block object-contain`}
      style={style}
      decoding="async"
      loading="eager"
    />
  );
}
