import { FileSearch, ShieldCheck, BadgeCheck, ClipboardList } from "lucide-react";
import { Reveal } from "@/components/terrevolt/Reveal";

const certifications = [
  {
    icon: FileSearch,
    title: "LMRA & werkhouding",
    description: "Voor start of hervatting wordt gekeken of de situatie nog klopt. Bij twijfel wordt afgestemd."
  },
  {
    icon: ShieldCheck,
    title: "BEI BLS/BHS & VWI's",
    description: "Veilig werken binnen LS/MS-netbeheeromgevingen met passende instructies en projectafspraken."
  },
  {
    icon: BadgeCheck,
    title: "VCA & werkplekveiligheid",
    description: "Veiligheidsbewust werken met aandacht voor mens, installatie, omgeving, afzetting en zichtbaarheid."
  },
  {
    icon: ClipboardList,
    title: "Kwaliteit & oplevering",
    description: "Controle, rapportage en aantoonbare oplevering met aandacht voor NEN en ISO 9001:2015-principes."
  }
];

export function Safety() {
  return (
    <section id="veiligheid" className="py-16 md:py-24 bg-[#f8f9fa]">
      <div className="container mx-auto px-5 sm:px-6 lg:px-12">
        <Reveal className="text-center mb-10 sm:mb-14 md:mb-16">
          <div className="inline-block bg-[#0d3b2e] text-[#9ed42e] px-4 py-2 rounded-full text-sm mb-5 sm:mb-6 tracking-wider uppercase">
            Veiligheid voorop
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl text-[#0d3b2e] mb-3 sm:mb-4 hyphens-nl">Veiligheid, certificeringen &amp; normen</h2>
          <p className="text-base sm:text-xl text-[#6c757d] max-w-3xl mx-auto leading-relaxed">
            Werken aan elektrotechnische infrastructuur vraagt om vakbekwaamheid, veiligheidsbewustzijn en duidelijke procedures. TerreVolt werkt met aandacht voor geldende normen, aanwijzingen en projectafspraken.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 max-w-6xl mx-auto">
          {certifications.map((cert, index) => {
            const Icon = cert.icon;
            return (
              <Reveal key={index} delay={index * 80}>
                <div className="card-lift h-full bg-white rounded-xl p-6 sm:p-8 border border-gray-200 hover:border-[#9ed42e] text-center">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 bg-[#f0f7e6] rounded-full flex items-center justify-center mx-auto mb-5 sm:mb-6">
                    <Icon className="w-7 h-7 sm:w-8 sm:h-8 text-[#0d3b2e]" strokeWidth={2} />
                  </div>
                  <h3 className="text-base sm:text-lg text-[#0d3b2e] mb-2 sm:mb-3 break-words">{cert.title}</h3>
                  <p className="text-[#6c757d] text-sm leading-relaxed">{cert.description}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
