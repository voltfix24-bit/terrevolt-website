import logoSrc from "@/assets/terrevolt-logo.png";

/**
 * TerreVolt-logo — geüploade PNG (1376×768, ratio ≈1.792).
 *
 * Voor scherpe weergave op alle schermen:
 *  - Intrinsieke width/height meegeven → geen CLS en correcte aspect-ratio.
 *  - `object-contain` + `h-full w-auto` zodat de hoogte uit de wrapper komt
 *    (header gebruikt clamp() voor fluid sizing).
 *  - `image-rendering: auto` + hoge bron-resolutie (1376px) geeft crisp
 *    downscaling tot ~3× device pixel ratio bij gangbare header-hoogtes.
 */
const NATIVE_WIDTH = 1376;
const NATIVE_HEIGHT = 768;
const ASPECT_RATIO = NATIVE_WIDTH / NATIVE_HEIGHT; // ≈ 1.7917

export interface LogoProps {
  className?: string;
  style?: React.CSSProperties;
  variant?: "auto" | "light" | "dark";
  title?: string;
}

export function Logo({ className = "h-10 w-auto", style, title = "TerreVolt BV" }: LogoProps) {
  return (
    <img
      src={logoSrc}
      alt={title}
      width={NATIVE_WIDTH}
      height={NATIVE_HEIGHT}
      className={`${className} block object-contain select-none`}
      style={{
        aspectRatio: `${ASPECT_RATIO}`,
        imageRendering: "auto",
        ...style,
      }}
      draggable={false}
      decoding="async"
      loading="eager"
      fetchPriority="high"
    />
  );
}
