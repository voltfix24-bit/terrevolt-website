import { Zap } from "lucide-react";
import { Link } from "react-router-dom";
import { company, telHref, mailHref } from "@/config/company";
import { CopyButton } from "@/components/terrevolt/CopyableContactLink";

export function Footer() {
  return (
    <footer className="bg-[#2d3436] text-gray-400 py-12">
      <div className="container mx-auto px-5 sm:px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <Link to="/" className="inline-flex items-center gap-2 mb-4 min-h-[44px] py-2">
              <div className="w-8 h-8 bg-[#0d3b2e] rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-[#9ed42e]" strokeWidth={2.5} />
              </div>
              <span className="text-white">TerreVolt BV</span>
            </Link>
            <p className="text-sm leading-relaxed">
              Specialist in LS/MS-infrastructuur, schakelwerk en aardingsoplossingen voor professionele opdrachtgevers.
            </p>
          </div>

          <div>
            <h4 className="text-white mb-4">Diensten</h4>
            <ul className="space-y-1 text-sm">
              <li><Link to="/diensten/ls-ms-netmontage" className="block min-h-[44px] py-2.5 hover:text-[#9ed42e] transition-colors">LS/MS Netmontage</Link></li>
              <li><Link to="/diensten/stationsrenovatie" className="block min-h-[44px] py-2.5 hover:text-[#9ed42e] transition-colors">Stationsrenovatie</Link></li>
              <li><Link to="/diensten/schakelwerk" className="block min-h-[44px] py-2.5 hover:text-[#9ed42e] transition-colors">Schakelwerk</Link></li>
              <li><Link to="/diensten/aardingsoplossingen" className="block min-h-[44px] py-2.5 hover:text-[#9ed42e] transition-colors">Aardingsoplossingen</Link></li>
              <li><Link to="/diensten/meten-en-beproeven" className="block min-h-[44px] py-2.5 hover:text-[#9ed42e] transition-colors">Meten &amp; beproeven</Link></li>
              <li><Link to="/diensten/huisaansluitingen" className="block min-h-[44px] py-2.5 hover:text-[#9ed42e] transition-colors">Huisaansluitingen</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white mb-4">Bedrijf</h4>
            <ul className="space-y-1 text-sm">
              <li><Link to="/over" className="block min-h-[44px] py-2.5 hover:text-[#9ed42e] transition-colors">Over TerreVolt</Link></li>
              <li><Link to="/projecten" className="block min-h-[44px] py-2.5 hover:text-[#9ed42e] transition-colors">Projecten</Link></li>
              <li><Link to="/veiligheid" className="block min-h-[44px] py-2.5 hover:text-[#9ed42e] transition-colors">Veiligheid</Link></li>
              <li><Link to="/werken-bij" className="block min-h-[44px] py-2.5 hover:text-[#9ed42e] transition-colors">Werken bij ons</Link></li>
              <li><Link to="/werken-bij#zzp" className="block min-h-[44px] py-2.5 hover:text-[#9ed42e] transition-colors">ZZP'ers &amp; monteurs</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white mb-4">Contact</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-1">
                <a
                  href={telHref}
                  aria-label={`Bel TerreVolt op ${company.phone.display}. Werkt de bel-app niet? Gebruik de kopieerknop hiernaast.`}
                  className="inline-flex items-center min-h-[44px] -my-1 py-2 hover:text-[#9ed42e] hover:underline underline-offset-4 active:text-[#9ed42e] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9ed42e] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0d3b2e] rounded-md transition-colors"
                >
                  {company.phone.display}
                </a>
                <CopyButton
                  type="tel"
                  value={company.phone.e164}
                  ariaLabel={`Telefoonnummer kopiëren: ${company.phone.display}`}
                  className="inline-flex items-center justify-center min-h-[44px] min-w-[44px] p-2.5 rounded-md text-current/70 hover:text-[#9ed42e] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9ed42e] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0d3b2e] transition-colors"
                />
              </li>
              <li className="flex items-center gap-1">
                <a
                  href={mailHref}
                  aria-label={`Mail TerreVolt op ${company.email}. Werkt de mail-app niet? Gebruik de kopieerknop hiernaast.`}
                  className="inline-flex items-center min-h-[44px] -my-1 py-2 break-all hover:text-[#9ed42e] hover:underline underline-offset-4 active:text-[#9ed42e] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9ed42e] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0d3b2e] rounded-md transition-colors"
                >
                  {company.email}
                </a>
                <CopyButton
                  type="mail"
                  value={company.email}
                  className="inline-flex items-center justify-center min-h-[44px] min-w-[44px] p-2.5 rounded-md text-current/70 hover:text-[#9ed42e] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9ed42e] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0d3b2e] transition-colors"
                />
              </li>
              <li className="not-italic">
                <address className="not-italic leading-relaxed">
                  {company.address.street}<br />
                  {company.address.postalCode} {company.address.city}<br />
                  {company.address.country}
                </address>
              </li>
              <li className="pt-2"><Link to="/contact" className="inline-flex items-center min-h-[44px] py-2 text-[#9ed42e] hover:text-white transition-colors">Stuur een aanvraag →</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
          <div>© {new Date().getFullYear()} TerreVolt BV. Alle rechten voorbehouden.</div>
          {/* Mobiel: compacte normenregel. Vanaf md: volledige opsomming. */}
          <div className="flex md:hidden text-xs text-gray-600">
            <span>BEI • VCA • NEN • Veilig werken</span>
          </div>
          <div className="hidden md:flex items-center gap-4 text-xs text-gray-600">
            <span>Werken volgens BEI BLS/BHS waar van toepassing</span>
            <span className="w-1 h-1 rounded-full bg-gray-600" />
            <span>VCA</span>
            <span className="w-1 h-1 rounded-full bg-gray-600" />
            <span>NEN 3140 / NEN 3840 / NEN 1010</span>
            <span className="w-1 h-1 rounded-full bg-gray-600" />
            <span>Persoonsgebonden aanwijzingen passend bij project en werkzaamheden</span>
          </div>
          <div className="flex gap-6">
            <Link to="/privacy" className="inline-flex items-center min-h-[44px] py-2 hover:text-[#9ed42e] transition-colors">Privacy</Link>
            <Link to="/contact" className="inline-flex items-center min-h-[44px] py-2 hover:text-[#9ed42e] transition-colors">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
