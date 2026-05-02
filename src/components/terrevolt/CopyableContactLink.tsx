import { useState, type ReactNode } from "react";
import { Copy, Check } from "lucide-react";
import { toast } from "sonner";

type Props = {
  type: "tel" | "mail";
  /** Waarde die gekopieerd wordt (telefoonnummer of e-mailadres). */
  value: string;
  /** Volledige href, bv. tel:+31... of mailto:... */
  href: string;
  /** Inhoud van de link (icoon + tekst etc.). */
  children: ReactNode;
  className?: string;
  /** Optionele extra aria-label voor de hoofdlink. */
  ariaLabel?: string;
  /** Stijl van de naastgelegen kopieerknop. */
  copyButtonClassName?: string;
  /** Wrapper-stijl rond link + kopieerknop. */
  wrapperClassName?: string;
};

/**
 * Toegankelijke link voor tel:/mailto:.
 * - De hoofdlink opent de standaard dial-/mailapp.
 * - Een naastgelegen knop kopieert de ruwe waarde naar het klembord
 *   zodat gebruikers zonder dial-/mailapp alsnog vlot kunnen plakken.
 * - Bevat een verborgen tekst voor schermlezers met een duidelijke
 *   instructie ("Telefoonnummer: ... — gebruik de kopieerknop ...")
 *   zodat de bedoeling ook zonder muis duidelijk is.
 */
export const CopyableContactLink = ({
  type,
  value,
  href,
  children,
  className,
  ariaLabel,
  copyButtonClassName,
  wrapperClassName,
}: Props) => {
  const [copied, setCopied] = useState(false);

  const label =
    type === "tel" ? "Telefoonnummer" : "E-mailadres";
  const defaultAria =
    type === "tel"
      ? `Bel ${value}. Werkt de bel-app niet? Gebruik de kopieerknop hiernaast om het nummer te kopiëren.`
      : `Mail ${value}. Werkt de mail-app niet? Gebruik de kopieerknop hiernaast om het adres te kopiëren.`;

  const handleCopy = async () => {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(value);
      } else {
        // Legacy fallback
        const ta = document.createElement("textarea");
        ta.value = value;
        ta.setAttribute("readonly", "");
        ta.style.position = "absolute";
        ta.style.left = "-9999px";
        document.body.appendChild(ta);
        ta.select();
        document.execCommand("copy");
        document.body.removeChild(ta);
      }
      setCopied(true);
      toast.success(`${label} gekopieerd: ${value}`);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error(`Kopiëren mislukt. ${label}: ${value}`);
    }
  };

  return (
    <span className={wrapperClassName ?? "inline-flex items-center gap-1"}>
      <a
        href={href}
        aria-label={ariaLabel ?? defaultAria}
        className={className}
      >
        {children}
      </a>
      <button
        type="button"
        onClick={handleCopy}
        aria-label={`${label} kopiëren: ${value}`}
        title={`${label} kopiëren`}
        className={
          copyButtonClassName ??
          "inline-flex items-center justify-center min-h-[40px] min-w-[40px] p-1.5 rounded-md text-current/80 hover:text-[#9ed42e] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9ed42e] transition-colors"
        }
      >
        {copied ? (
          <Check className="w-4 h-4" aria-hidden="true" />
        ) : (
          <Copy className="w-4 h-4" aria-hidden="true" />
        )}
        <span className="sr-only">{copied ? "Gekopieerd" : `${label} kopiëren`}</span>
      </button>
    </span>
  );
};
