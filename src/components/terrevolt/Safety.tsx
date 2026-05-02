import { ShieldCheck, BadgeCheck, Award, BookOpen } from "lucide-react";

const certifications = [
  {
    icon: ShieldCheck,
    title: "BEI BLS/BHS",
    description: "Aanwijzingen en veiligheidsstructuur voor werkzaamheden binnen laag- en middenspanning."
  },
  {
    icon: BadgeCheck,
    title: "AVP / VP / VOP / WV",
    description: "Passende rollen en bevoegdheden afhankelijk van project, opdrachtgever en werkgebied."
  },
  {
    icon: Award,
    title: "VCA",
    description: "Veiligheidsbewust werken met aandacht voor mens, installatie en omgeving."
  },
  {
    icon: BookOpen,
    title: "NEN 1010 / NEN 3140",
    description: "Werken met aandacht voor geldende installatie- en veiligheidsnormen."
  }
];

export function Safety() {
  return (
    <section id="veiligheid" className="py-16 md:py-16 md:py-24 bg-[#f8f9fa]">
      <div className="container mx-auto px-5 sm:px-6 lg:px-12">
        <div className="text-center mb-16">
          <div className="inline-block bg-[#0d3b2e] text-[#9ed42e] px-4 py-2 rounded-full text-sm mb-6 tracking-wider uppercase">
            Veiligheid voorop
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl text-[#0d3b2e] mb-4">Veiligheid, certificeringen & normen</h2>
          <p className="text-xl text-[#6c757d] max-w-3xl mx-auto leading-relaxed">
            Werken aan elektrotechnische infrastructuur vraagt om vakbekwaamheid, veiligheidsbewustzijn en duidelijke procedures. TerreVolt werkt met aandacht voor geldende normen, aanwijzingen en projectafspraken.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {certifications.map((cert, index) => {
            const Icon = cert.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-xl p-8 border border-gray-200 hover:border-[#9ed42e] transition-all duration-300 text-center"
              >
                <div className="w-16 h-16 bg-[#f0f7e6] rounded-full flex items-center justify-center mx-auto mb-6">
                  <Icon className="w-8 h-8 text-[#0d3b2e]" strokeWidth={2} />
                </div>
                <h3 className="text-lg text-[#0d3b2e] mb-3">{cert.title}</h3>
                <p className="text-[#6c757d] text-sm leading-relaxed">{cert.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
