import { useState, type ReactNode } from "react";
import { Copy, Check } from "lucide-react";
import { toast } from "sonner";

type CopyButtonProps = {
  type: "tel" | "mail";
  /** Waarde die gekopieerd wordt (telefoonnummer of e-mailadres). */
  value: string;
  className?: string;
  /** Override voor het standaard aria-label. */
  ariaLabel?: string;
};

/**
 * Toegankelijke kopieerknop voor tel-/mailwaarden.
 * Bedoeld als fallback voor gebruikers zonder automatische dial-/mail-app:
 * ze kunnen het ruwe nummer of e-mailadres in één klik kopiëren en plakken.
 */
export const CopyButton = ({
  type,
  value,
  className,
  ariaLabel,
}: CopyButtonProps) => {
  const [copied, setCopied] = useState(false);
  const label = type === "tel" ? "Telefoonnummer" : "E-mailadres";

  const handleCopy = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(value);
      } else {
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
    <button
      type="button"
      onClick={handleCopy}
      aria-label={ariaLabel ?? `${label} kopiëren: ${value}`}
      title={`${label} kopiëren`}
      className={
        className ??
        "inline-flex items-center justify-center min-h-[44px] min-w-[44px] p-2 rounded-md text-current/80 hover:text-[#9ed42e] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9ed42e] transition-colors"
      }
    >
      {copied ? (
        <Check className="w-4 h-4" aria-hidden="true" />
      ) : (
        <Copy className="w-4 h-4" aria-hidden="true" />
      )}
      <span className="sr-only">{copied ? "Gekopieerd" : `${label} kopiëren`}</span>
    </button>
  );
};

type LinkProps = {
  type: "tel" | "mail";
  value: string;
  href: string;
  children: ReactNode;
  className?: string;
  ariaLabel?: string;
  copyButtonClassName?: string;
  wrapperClassName?: string;
};

/**
 * Combineert een tel:/mailto: link met een naastgelegen kopieerknop.
 * - Hoofdlink opent de standaard dial-/mail-app (indien beschikbaar).
 * - Kopieerknop biedt een toegankelijke fallback voor gebruikers zonder
 *   bel- of mailapp (bv. desktop browsers, kiosken, oudere apparaten).
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
}: LinkProps) => {
  const defaultAria =
    type === "tel"
      ? `Bel ${value}. Werkt de bel-app niet? Gebruik de kopieerknop hiernaast om het nummer te kopiëren.`
      : `Mail ${value}. Werkt de mail-app niet? Gebruik de kopieerknop hiernaast om het adres te kopiëren.`;

  return (
    <span className={wrapperClassName ?? "inline-flex items-center gap-1"}>
      <a
        href={href}
        aria-label={ariaLabel ?? defaultAria}
        className={className}
      >
        {children}
      </a>
      <CopyButton type={type} value={value} className={copyButtonClassName} />
    </span>
  );
};
