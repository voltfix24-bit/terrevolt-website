import { Mail, MessageCircle, Phone } from "lucide-react";
import { company, mailHref, telHref } from "@/config/company";

/** WhatsApp-link vanuit de centrale bedrijfsgegevens. */
export const whatsappHref = `https://wa.me/${company.phone.e164.replace("+", "")}`;

interface Props {
  /** Optioneel: pad naar een echte portretfoto zodra die beschikbaar is. */
  photoSrc?: string;
  className?: string;
}

/**
 * Contactblok Tobesh Haideri.
 * Zolang er geen echte portretfoto is, tonen we een merkgebonden initialen-avatar.
 * Zodra `photoSrc` gevuld is, verschijnt de foto in exact hetzelfde kader.
 */
export const TobeshCard = ({ photoSrc, className = "" }: Props) => (
  <div className={`rounded-2xl border border-gray-200 bg-white p-6 sm:p-8 ${className}`}>
    <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
      <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-full bg-[#0d3b2e] ring-4 ring-[#9ed42e]/30">
        {photoSrc ? (
          <img src={photoSrc} alt="Tobesh Haideri, algemeen directeur van TerreVolt" className="h-full w-full object-cover" width={80} height={80} loading="lazy" />
        ) : (
          <span className="flex h-full w-full items-center justify-center text-xl font-semibold tracking-wide text-[#9ed42e]" aria-hidden="true">
            TH
          </span>
        )}
      </div>
      <div>
        <p className="text-lg font-semibold text-[#0d3b2e]">Tobesh Haideri</p>
        <p className="text-sm text-[#0d3b2e]/70">Algemeen directeur</p>
        <p className="mt-2 text-sm text-[#0d3b2e]/80">Reactie binnen twee werkdagen.</p>
      </div>
    </div>

    <div className="mt-6 grid gap-3 sm:grid-cols-3">
      <a
        href={telHref}
        className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-lg bg-[#0d3b2e] px-4 text-sm font-medium text-white transition-colors hover:bg-[#0a2f24] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9ed42e] focus-visible:ring-offset-2"
      >
        <Phone className="h-4 w-4" aria-hidden="true" />
        {company.phone.display}
      </a>
      <a
        href={whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-lg border border-[#0d3b2e] px-4 text-sm font-medium text-[#0d3b2e] transition-colors hover:bg-[#f0f7e6] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9ed42e] focus-visible:ring-offset-2"
      >
        <MessageCircle className="h-4 w-4" aria-hidden="true" />
        WhatsApp
      </a>
      <a
        href={mailHref}
        className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-lg border border-[#0d3b2e] px-4 text-sm font-medium text-[#0d3b2e] transition-colors hover:bg-[#f0f7e6] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9ed42e] focus-visible:ring-offset-2"
      >
        <Mail className="h-4 w-4" aria-hidden="true" />
        {company.email}
      </a>
    </div>
  </div>
);
