import { Zap } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-[#2d3436] text-gray-400 py-12">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-[#0d3b2e] rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-[#9ed42e]" strokeWidth={2.5} />
              </div>
              <span className="text-white">TerreVolt BV</span>
            </div>
            <p className="text-sm leading-relaxed">
              Specialist in LS/MS-infrastructuur, schakelwerk en aardingsoplossingen voor professionele opdrachtgevers.
            </p>
          </div>

          <div>
            <h4 className="text-white mb-4">Diensten</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-[#9ed42e] transition-colors">LS/MS Netmontage</a></li>
              <li><a href="#" className="hover:text-[#9ed42e] transition-colors">Stationsrenovatie</a></li>
              <li><a href="#" className="hover:text-[#9ed42e] transition-colors">Schakelwerk</a></li>
              <li><a href="#" className="hover:text-[#9ed42e] transition-colors">Aardingsoplossingen</a></li>
              <li><a href="#" className="hover:text-[#9ed42e] transition-colors">Meten & beproeven</a></li>
              <li><a href="#" className="hover:text-[#9ed42e] transition-colors">Huisaansluitingen</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white mb-4">Bedrijf</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-[#9ed42e] transition-colors">Over TerreVolt</a></li>
              <li><a href="#" className="hover:text-[#9ed42e] transition-colors">Projecten</a></li>
              <li><a href="#" className="hover:text-[#9ed42e] transition-colors">Veiligheid</a></li>
              <li><a href="#" className="hover:text-[#9ed42e] transition-colors">Werken bij ons</a></li>
              <li><a href="#" className="hover:text-[#9ed42e] transition-colors">ZZP'ers & monteurs</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white mb-4">Contact</h4>
            <ul className="space-y-2 text-sm">
              <li>+31 (0)20 123 4567</li>
              <li>info@terrevolt.nl</li>
              <li>Nederland</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
          <div>© 2026 TerreVolt BV. Alle rechten voorbehouden.</div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-[#9ed42e] transition-colors">Privacyverklaring</a>
            <a href="#" className="hover:text-[#9ed42e] transition-colors">Algemene voorwaarden</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
