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
    <section id="over-ons" className="py-24 bg-[#f8f9fa]">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl text-[#0d3b2e] mb-4">Voor wie werken wij?</h2>
          <p className="text-xl text-[#6c757d] max-w-2xl mx-auto">
            Ervaren partner in elektrotechnische infrastructuur voor professionele opdrachtgevers
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {targets.map((target, index) => {
            const Icon = target.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-xl p-10 border-2 border-transparent hover:border-[#9ed42e] transition-all duration-300 shadow-sm hover:shadow-xl"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-[#0d3b2e] to-[#1a4a36] rounded-xl flex items-center justify-center mb-6">
                  <Icon className="w-8 h-8 text-[#9ed42e]" strokeWidth={2} />
                </div>
                <h3 className="text-2xl text-[#0d3b2e] mb-4">{target.title}</h3>
                <p className="text-[#6c757d] leading-relaxed">{target.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
