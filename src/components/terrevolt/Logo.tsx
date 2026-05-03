import { useState } from "react";
import logoSrc from "@/assets/terrevolt-logo.png";

/**
 * TerreVolt-logo — geüploade PNG (1376×768, ratio ≈1.792).
 *
 * Toegankelijkheid:
 *  - Standaard `alt` beschrijft het merk + activiteit (i.p.v. enkel "logo").
 *  - `decorative` zet de afbeelding op `alt=""` + `aria-hidden`, voor gebruik
 *    binnen een al gelabeld element (bv. `<Link aria-label="...">`), zodat
 *    schermlezers het logo niet dubbel aankondigen.
 *  - `role="img"` + `aria-label` op de wrapper houdt de semantiek correct
 *    terwijl de skeleton-placeholder zichtbaar is.
 *  - Skeleton heeft `aria-hidden` en is puur visueel.
 *  - `<title>`-element via `aria-labelledby`-vriendelijke setup voor
 *    hover-tooltip op desktop (native browser tooltip via `title`-attribuut).
 */
const NATIVE_WIDTH = 1376;
const NATIVE_HEIGHT = 768;
const ASPECT_RATIO = NATIVE_WIDTH / NATIVE_HEIGHT; // ≈ 1.7917

const DEFAULT_ALT =
  "TerreVolt BV — specialist in laag- en middenspanning, aarding en netmontage";

export interface LogoProps {
  className?: string;
  style?: React.CSSProperties;
  variant?: "auto" | "light" | "dark";
  /** Beschrijvende alt-tekst. Wordt genegeerd als `decorative` true is. */
  alt?: string;
  /** Native browser-tooltip op hover. */
  title?: string;
  /**
   * Zet op `true` wanneer 't logo binnen een al gelabeld element staat
   * (bv. `<Link aria-label="...">`). Voorkomt dubbele aankondiging door
   * schermlezers.
   */
  decorative?: boolean;
}

export function Logo({
  className = "h-10 w-auto",
  style,
  alt = DEFAULT_ALT,
  title = "TerreVolt BV",
  decorative = false,
}: LogoProps) {
  const [loaded, setLoaded] = useState(false);

  // Wanneer decoratief: img krijgt lege alt + aria-hidden, en de wrapper
  // krijgt géén role/label (het ouder-element levert de naam al).
  // Anders: wrapper krijgt role="img" met label zodat ook tijdens 't laden
  // (skeleton zichtbaar) een duidelijke naam beschikbaar is.
  const wrapperA11y = decorative
    ? { "aria-hidden": true as const }
    : { role: "img" as const, "aria-label": alt };

  return (
    <span
      className={`${className} relative inline-block align-middle`}
      style={{
        aspectRatio: `${ASPECT_RATIO}`,
        ...style,
      }}
      title={title}
      {...wrapperA11y}
    >
      {/* Skeleton-placeholder — zelfde footprint, voorkomt layout-shift */}
      {!loaded && (
        <span
          aria-hidden="true"
          className="absolute inset-0 rounded-md bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%] animate-shimmer motion-reduce:animate-none"
        />
      )}
      <img
        src={logoSrc}
        // Img is altijd 'presentational' op DOM-niveau: de wrapper draagt
        // de toegankelijke naam (of het ouder-element bij `decorative`).
        alt=""
        aria-hidden="true"
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
