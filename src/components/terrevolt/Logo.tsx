import logoLight from "@/assets/terrevolt-logo.svg";
import logoDark from "@/assets/terrevolt-logo-dark.svg";

/**
 * TerreVolt-logo — exact de aangeleverde SVG (bliksem + aardingssymbool +
 * "TerreVolt BV" in Manrope 800). Twee varianten:
 * - light: donkere wordmark (#0f172a) + groene bolt (#1aab47) op lichte achtergrond
 * - dark:  witte wordmark + felgroene bolt (#9ed42e) op donkere achtergrond
 *
 * In dark mode wordt automatisch de dark variant getoond via Tailwind `dark:`.
 */
export interface LogoProps {
  className?: string;
  /** Forceer een variant. Default: automatisch via `dark:` class op <html>. */
  variant?: "auto" | "light" | "dark";
  /** Alt-tekst — leeg laten als het logo decoratief is naast een tekst-link. */
  alt?: string;
}

export function Logo({ className = "h-10 w-auto", variant = "auto", alt = "TerreVolt BV" }: LogoProps) {
  if (variant === "light") {
    return <img src={logoLight} alt={alt} className={className} draggable={false} />;
  }
  if (variant === "dark") {
    return <img src={logoDark} alt={alt} className={className} draggable={false} />;
  }
  return (
    <>
      <img src={logoLight} alt={alt} className={`${className} block dark:hidden`} draggable={false} />
      <img src={logoDark} alt={alt} className={`${className} hidden dark:block`} draggable={false} />
    </>
  );
}
