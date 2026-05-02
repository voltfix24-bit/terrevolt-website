import { Mail, Phone, MapPin } from "lucide-react";

export function CTA() {
  return (
    <section id="contact" className="py-24 bg-gradient-to-br from-[#0d3b2e] via-[#1a4a36] to-[#0d3b2e] relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(158, 212, 46, 0.3) 2px, transparent 2px),
            linear-gradient(90deg, rgba(158, 212, 46, 0.3) 2px, transparent 2px)
          `,
          backgroundSize: '100px 100px'
        }} />
      </div>

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl lg:text-5xl text-white mb-6">
            Een LS/MS-project of<br />
            <span className="text-[#9ed42e]">aardingsvraagstuk bespreken?</span>
          </h2>
          <p className="text-xl text-gray-300 mb-12 leading-relaxed">
            Of het nu gaat om netmontage, stationsrenovatie, schakelwerk of aarding: TerreVolt denkt graag mee over de juiste aanpak.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="flex flex-col items-center gap-3 text-white">
              <div className="w-12 h-12 bg-[#9ed42e] rounded-full flex items-center justify-center">
                <Phone className="w-6 h-6 text-[#0d3b2e]" strokeWidth={2.5} />
              </div>
              <a href="tel:+31634487467" className="text-lg hover:text-[#9ed42e] transition-colors">+31 6 34 48 74 67</a>
            </div>
            <div className="flex flex-col items-center gap-3 text-white">
              <div className="w-12 h-12 bg-[#9ed42e] rounded-full flex items-center justify-center">
                <Mail className="w-6 h-6 text-[#0d3b2e]" strokeWidth={2.5} />
              </div>
              <a href="mailto:info@terrevolt.nl" className="text-lg hover:text-[#9ed42e] transition-colors">info@terrevolt.nl</a>
            </div>
            <div className="flex flex-col items-center gap-3 text-white">
              <div className="w-12 h-12 bg-[#9ed42e] rounded-full flex items-center justify-center">
                <MapPin className="w-6 h-6 text-[#0d3b2e]" strokeWidth={2.5} />
              </div>
              <div className="text-lg text-center leading-snug">Overvliet 97<br />3545 NH Utrecht</div>
            </div>
          </div>

          <a href="/contact" className="inline-block bg-[#9ed42e] text-[#0d3b2e] px-10 py-4 rounded-lg hover:bg-[#8bc41f] transition-all duration-300 text-lg">
            Neem contact op
          </a>
        </div>
      </div>
    </section>
  );
}
