import { Mail, Phone, MapPin } from "lucide-react";
import { company, telHref, mailHref } from "@/config/company";
import { CopyButton } from "@/components/terrevolt/CopyableContactLink";

export function CTA() {
  return (
    <section id="contact" className="py-16 md:py-24 bg-gradient-to-br from-[#0d3b2e] via-[#1a4a36] to-[#0d3b2e] relative overflow-hidden scroll-mt-24">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(158, 212, 46, 0.3) 2px, transparent 2px),
            linear-gradient(90deg, rgba(158, 212, 46, 0.3) 2px, transparent 2px)
          `,
          backgroundSize: '100px 100px'
        }} />
      </div>

      <div className="container mx-auto px-5 sm:px-6 lg:px-12 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl text-white mb-5 sm:mb-6 hyphens-nl">
            Een LS/MS-project of{" "}
            <span className="text-[#9ed42e]">aardingsvraagstuk&nbsp;bespreken?</span>
          </h2>
          <p className="text-base sm:text-xl text-white/85 mb-10 sm:mb-12 leading-relaxed">
            Of het nu gaat om netmontage, stationsrenovatie, schakelwerk of aarding: TerreVolt denkt graag mee over de juiste aanpak.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 md:gap-8 mb-10 sm:mb-12">
            <div className="relative">
              <a
                href={telHref}
                aria-label={`Bel TerreVolt op ${company.phone.display}. Werkt de bel-app niet? Gebruik de kopieerknop om het nummer te kopiëren.`}
                className="group flex flex-col items-center gap-3 text-white min-h-[44px] py-2 px-3 rounded-lg hover:bg-white/5 active:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9ed42e] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0d3b2e] transition-colors"
              >
                <div className="w-12 h-12 bg-[#9ed42e] rounded-full flex items-center justify-center group-hover:scale-105 transition-transform">
                  <Phone className="w-6 h-6 text-[#0d3b2e]" strokeWidth={2.5} />
                </div>
                <span className="text-base sm:text-lg group-hover:text-[#9ed42e] group-hover:underline underline-offset-4 transition-colors break-all text-center">{company.phone.display}</span>
              </a>
              <CopyButton
                type="tel"
                value={company.phone.e164}
                ariaLabel={`Telefoonnummer kopiëren: ${company.phone.display}`}
                className="absolute top-1 right-1 inline-flex items-center justify-center min-h-[40px] min-w-[40px] p-2 rounded-md text-white/80 hover:text-[#9ed42e] hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9ed42e] transition-colors"
              />
            </div>
            <div className="relative">
              <a
                href={mailHref}
                aria-label={`Mail TerreVolt op ${company.email}. Werkt de mail-app niet? Gebruik de kopieerknop om het adres te kopiëren.`}
                className="group flex flex-col items-center gap-3 text-white min-h-[44px] py-2 px-3 rounded-lg hover:bg-white/5 active:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9ed42e] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0d3b2e] transition-colors"
              >
                <div className="w-12 h-12 bg-[#9ed42e] rounded-full flex items-center justify-center group-hover:scale-105 transition-transform">
                  <Mail className="w-6 h-6 text-[#0d3b2e]" strokeWidth={2.5} />
                </div>
                <span className="text-base sm:text-lg group-hover:text-[#9ed42e] group-hover:underline underline-offset-4 transition-colors break-all text-center">{company.email}</span>
              </a>
              <CopyButton
                type="mail"
                value={company.email}
                className="absolute top-1 right-1 inline-flex items-center justify-center min-h-[40px] min-w-[40px] p-2 rounded-md text-white/80 hover:text-[#9ed42e] hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9ed42e] transition-colors"
              />
            </div>
            <div className="flex flex-col items-center gap-3 text-white">
              <div className="w-12 h-12 bg-[#9ed42e] rounded-full flex items-center justify-center">
                <MapPin className="w-6 h-6 text-[#0d3b2e]" strokeWidth={2.5} />
              </div>
              <div className="text-base sm:text-lg text-center leading-snug">{company.address.street}<br />{company.address.postalCode} {company.address.city}</div>
            </div>
          </div>

          <a href="/contact" className="inline-flex items-center justify-center w-full sm:w-auto max-w-xs mx-auto bg-[#9ed42e] text-[#0d3b2e] px-8 sm:px-10 py-3 sm:py-4 min-h-[54px] rounded-lg hover:bg-[#8bc41f] transition-all duration-300 text-base sm:text-lg">
            Neem contact op
          </a>
        </div>
      </div>
    </section>
  );
}
