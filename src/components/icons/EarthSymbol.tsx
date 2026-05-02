import { forwardRef, type SVGProps } from "react";

/**
 * Aardingssymbool (IEC 60417-5017) — drie horizontale lijnen onder
 * een verticale streep. Volgt de Lucide API: size, color, strokeWidth.
 */
export interface EarthSymbolProps extends Omit<SVGProps<SVGSVGElement>, "ref"> {
  size?: number | string;
  color?: string;
  strokeWidth?: number | string;
}

export const EarthSymbol = forwardRef<SVGSVGElement, EarthSymbolProps>(
  ({ size = 24, color = "currentColor", strokeWidth = 2, ...rest }, ref) => (
    <svg
      ref={ref}
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...rest}
    >
      {/* verticale streep */}
      <line x1="12" y1="3" x2="12" y2="13" />
      {/* drie horizontale lijnen, aflopend in breedte */}
      <line x1="4" y1="13" x2="20" y2="13" />
      <line x1="7" y1="17" x2="17" y2="17" />
      <line x1="10" y1="21" x2="14" y2="21" />
    </svg>
  ),
);

EarthSymbol.displayName = "EarthSymbol";
