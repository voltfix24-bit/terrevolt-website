import { useState } from "react";
import logoSrc from "@/assets/terrevolt-logo.png";

/**
 * TerreVolt-logo — geüploade PNG (1376×768, ratio ≈1.792).
 *
 * Voor scherpe weergave op alle schermen:
 *  - Intrinsieke width/height meegeven → geen CLS en correcte aspect-ratio.
 *  - `object-contain` + `h-full w-auto` zodat de hoogte uit de wrapper komt
 *    (header gebruikt clamp() voor fluid sizing).
 *  - Skeleton-placeholder met dezelfde aspect-ratio terwijl 't PNG laadt.
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
  const [loaded, setLoaded] = useState(false);

  return (
    <span
      className={`${className} relative inline-block align-middle`}
      style={{
        aspectRatio: `${ASPECT_RATIO}`,
        ...style,
      }}
      aria-hidden={false}
    >
      {/* Skeleton-placeholder — zelfde footprint, voorkomt layout-shift */}
      {!loaded && (
        <span
          aria-hidden="true"
          className="absolute inset-0 rounded-md bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%] animate-[shimmer_1.4s_ease-in-out_infinite] motion-reduce:animate-none"
          style={{
            // Inline keyframes via CSS-variabele werkt niet — fallback op tailwind utility:
            // we definiëren shimmer in index.css; bij ontbrekende keyframes zie je een
            // statische lichtgrijze blok, ook prima als skeleton.
          }}
        />
      )}
      <img
        src={logoSrc}
        alt={title}
        width={NATIVE_WIDTH}
        height={NATIVE_HEIGHT}
        onLoad={() => setLoaded(true)}
        onError={() => setLoaded(true)}
        className={`relative block h-full w-full object-contain select-none transition-opacity duration-200 ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
        style={{ imageRendering: "auto" }}
        draggable={false}
        decoding="async"
        loading="eager"
        fetchPriority="high"
      />
    </span>
  );
}
