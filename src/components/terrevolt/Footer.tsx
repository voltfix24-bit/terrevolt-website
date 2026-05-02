import { Zap } from "lucide-react";
import { company, telHref, mailHref } from "@/config/company";

export function Footer() {
  return (
    <footer className="bg-[#2d3436] text-gray-400 py-12">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <a href="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-[#0d3b2e] rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-[#9ed42e]" strokeWidth={2.5} />
              </div>
              <span className="text-white">TerreVolt BV</span>
            </a>
            <p className="text-sm leading-relaxed">
              Specialist in LS/MS-infrastructuur, schakelwerk en aardingsoplossingen voor professionele opdrachtgevers.
            </p>
          </div>

          <div>
            <h4 className="text-white mb-4">Diensten</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="/diensten/ls-ms-netmontage" className="hover:text-[#9ed42e] transition-colors">LS/MS Netmontage</a></li>
              <li><a href="/diensten/stationsrenovatie" className="hover:text-[#9ed42e] transition-colors">Stationsrenovatie</a></li>
              <li><a href="/diensten/schakelwerk" className="hover:text-[#9ed42e] transition-colors">Schakelwerk</a></li>
              <li><a href="/diensten/aardingsoplossingen" className="hover:text-[#9ed42e] transition-colors">Aardingsoplossingen</a></li>
              <li><a href="/diensten/meten-en-beproeven" className="hover:text-[#9ed42e] transition-colors">Meten & beproeven</a></li>
              <li><a href="/diensten/huisaansluitingen" className="hover:text-[#9ed42e] transition-colors">Huisaansluitingen</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white mb-4">Bedrijf</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="/over" className="hover:text-[#9ed42e] transition-colors">Over TerreVolt</a></li>
              <li><a href="/projecten" className="hover:text-[#9ed42e] transition-colors">Projecten</a></li>
              <li><a href="/veiligheid" className="hover:text-[#9ed42e] transition-colors">Veiligheid</a></li>
              <li><a href="/werken-bij" className="hover:text-[#9ed42e] transition-colors">Werken bij ons</a></li>
              <li><a href="/werken-bij" className="hover:text-[#9ed42e] transition-colors">ZZP'ers & monteurs</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white mb-4">Contact</h4>
            <ul className="space-y-2 text-sm">
              <li><a href={telHref} className="hover:text-[#9ed42e] transition-colors">{company.phone.display}</a></li>
              <li><a href={mailHref} className="hover:text-[#9ed42e] transition-colors">{company.email}</a></li>
              <li className="not-italic">
                <address className="not-italic leading-relaxed">
                  {company.address.street}<br />
                  {company.address.postalCode} {company.address.city}<br />
                  {company.address.country}
                </address>
              </li>
              <li className="pt-2"><a href="/contact" className="text-[#9ed42e] hover:text-white transition-colors">Stuur een aanvraag →</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
          <div>© {new Date().getFullYear()} TerreVolt BV. Alle rechten voorbehouden.</div>
          <div className="flex gap-6">
            <a href="/contact" className="hover:text-[#9ed42e] transition-colors">Contact</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
