import { ArrowRight, Zap } from "lucide-react";

export function Hero() {
  return (
    <section className="relative min-h-[78vh] sm:min-h-[80vh] lg:min-h-[85vh] flex items-center overflow-hidden bg-gradient-to-br from-[#0d3b2e] via-[#1a4a36] to-[#0d3b2e] py-14 sm:py-20 lg:py-24">
      <div className="absolute inset-0 opacity-[0.08] grid-breathe">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(158, 212, 46, 0.4) 1px, transparent 1px),
            linear-gradient(90deg, rgba(158, 212, 46, 0.4) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px'
        }} />
      </div>

      <div className="absolute inset-0 opacity-[0.05]">
        <svg className="w-full h-full" viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
          <path d="M100,400 L300,200 L500,250 L700,150 L900,300 L1100,200" stroke="rgba(158, 212, 46, 0.6)" strokeWidth="2" fill="none" />
          <path d="M150,500 L350,350 L550,400 L750,300 L950,450" stroke="rgba(158, 212, 46, 0.4)" strokeWidth="1.5" fill="none" />
          <circle cx="300" cy="200" r="4" fill="rgba(158, 212, 46, 0.6)" />
          <circle cx="500" cy="250" r="4" fill="rgba(158, 212, 46, 0.6)" />
          <circle cx="700" cy="150" r="4" fill="rgba(158, 212, 46, 0.6)" />
          <rect x="280" y="180" width="40" height="40" fill="none" stroke="rgba(158, 212, 46, 0.3)" strokeWidth="1" />
          <rect x="680" y="130" width="40" height="40" fill="none" stroke="rgba(158, 212, 46, 0.3)" strokeWidth="1" />
        </svg>
      </div>

      <div className="container mx-auto px-5 sm:px-6 lg:px-12 relative z-10">
        <div className="max-w-4xl">
          <div className="flex items-center gap-2 mb-5 sm:mb-6">
            <Zap className="w-7 h-7 sm:w-8 sm:h-8 text-[#9ed42e]" strokeWidth={2.5} />
            <span className="text-[#9ed42e] tracking-widest uppercase text-sm">TERREVOLT BV</span>
          </div>

          <h1 className="text-[clamp(1.75rem,8vw,2.25rem)] sm:text-5xl lg:text-7xl text-white mb-5 sm:mb-6 leading-[1.1] sm:leading-tight hyphens-nl">
            <span>Specialist in LS/MS-infrastructuur</span>{" "}
            <span className="text-[#9ed42e]">en aardingsoplossingen</span>
          </h1>

          <p className="text-[17px] sm:text-xl lg:text-2xl text-gray-300 mb-3 sm:mb-4 max-w-3xl leading-relaxed">
            TerreVolt ondersteunt netbeheerders, hoofdaannemers en industrie bij LS/MS-netmontage, stationsrenovaties, schakelwerk en meetbare aardingsoplossingen.
          </p>

          <p className="text-[15px] sm:text-lg text-gray-400 mb-8 sm:mb-10 max-w-2xl italic leading-relaxed">
            Van huisaansluiting tot middenspanningsstation, met veiligheid als basis.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <a href="/contact" className="group bg-[#9ed42e] text-[#0d3b2e] px-5 sm:px-8 py-3 sm:py-4 min-h-[54px] rounded-lg hover:bg-[#8bc41f] transition-all duration-300 flex items-center justify-center gap-2 w-full sm:w-auto">
              <span>Project bespreken</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            <a href="/diensten" className="border-2 border-[#9ed42e] text-[#9ed42e] px-5 sm:px-8 py-3 sm:py-4 min-h-[54px] rounded-lg hover:bg-[#9ed42e] hover:text-[#0d3b2e] transition-all duration-300 flex items-center justify-center w-full sm:w-auto">
              Onze diensten
            </a>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-16 sm:h-32 bg-gradient-to-t from-[#f8f9fa] to-transparent pointer-events-none" />
    </section>
  );
}
