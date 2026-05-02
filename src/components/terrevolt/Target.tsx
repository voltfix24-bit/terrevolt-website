import { Building, HardHat, Factory } from "lucide-react";

const targets = [
  {
    icon: Building,
    title: "Netbeheerders",
    description: "Ondersteuning bij LS/MS-netten, stationsrenovaties, aansluitingen, storingen en aardingsvoorzieningen."
  },
  {
    icon: HardHat,
    title: "Hoofdaannemers",
    description: "Vakbekwame monteurs en ploegen voor uitvoering binnen de netbeheerketen."
  },
  {
    icon: Factory,
    title: "Industrie & grootverbruik",
    description: "Ondersteuning bij middenspanning, verdeelinrichtingen, aarding, metingen en technische ruimten."
  }
];

export function Target() {
  return (
    <section id="over-ons" className="py-16 md:py-24 bg-[#f8f9fa]">
      <div className="container mx-auto px-5 sm:px-6 lg:px-12">
        <div className="text-center mb-10 sm:mb-14 md:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl text-[#0d3b2e] mb-3 sm:mb-4">Voor wie werken wij?</h2>
          <p className="text-base sm:text-xl text-[#6c757d] max-w-2xl mx-auto leading-relaxed">
            Ervaren partner in elektrotechnische infrastructuur voor professionele opdrachtgevers
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 md:gap-8 max-w-6xl mx-auto">
          {targets.map((target, index) => {
            const Icon = target.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-xl p-6 sm:p-8 md:p-10 border-2 border-transparent hover:border-[#9ed42e] transition-all duration-300 shadow-sm hover:shadow-xl"
              >
                <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-[#0d3b2e] to-[#1a4a36] rounded-xl flex items-center justify-center mb-5 sm:mb-6">
                  <Icon className="w-7 h-7 sm:w-8 sm:h-8 text-[#9ed42e]" strokeWidth={2} />
                </div>
                <h3 className="text-xl sm:text-2xl text-[#0d3b2e] mb-3 sm:mb-4">{target.title}</h3>
                <p className="text-[15px] sm:text-base text-[#6c757d] leading-relaxed">{target.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
