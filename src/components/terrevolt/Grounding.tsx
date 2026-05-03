import { Gauge, ShieldCheck, GitBranch, FileBarChart } from "lucide-react";
import { Reveal } from "@/components/terrevolt/Reveal";
import { EarthSymbol } from "@/components/icons/EarthSymbol";

const groundingServices = [
  {
    icon: EarthSymbol,
    title: "Aardelektroden",
    description: "Plaatsen van aardelektroden en aardingsvoorzieningen voor technische installaties."
  },
  {
    icon: Gauge,
    title: "Aardverspreidingsweerstand",
    description: "Meten, beoordelen en optimaliseren van aardverspreidingsweerstand."
  },
  {
    icon: ShieldCheck,
    title: "Stationsaarding",
    description: "Aardingssystemen voor MS/LS-stations en transformatorruimten."
  },
  {
    icon: GitBranch,
    title: "Potentiaalvereffening",
    description: "Hoofd- en aanvullende potentiaalvereffening voor veilige installaties."
  },
  {
    icon: FileBarChart,
    title: "Meetrapportage",
    description: "Duidelijke meetrapportages en opleverdocumentatie."
  }
];

export function Grounding() {
  return (
    <section id="aarding" className="py-16 md:py-24 bg-[#0d3b2e] relative overflow-hidden">
      <div className="absolute inset-0 opacity-5 grid-breathe">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(255, 255, 255, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px'
        }} />
      </div>

      <div className="container mx-auto px-5 sm:px-6 lg:px-12 relative z-10">
        <Reveal className="text-center mb-10 sm:mb-14 md:mb-16">
          <div className="inline-block bg-[#9ed42e] text-[#0d3b2e] px-4 py-2 rounded-full text-sm mb-5 sm:mb-6 tracking-wider uppercase">
            Specialisme
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl text-white mb-3 sm:mb-4">Aardingsoplossingen</h2>
          <p className="text-base sm:text-xl text-white/85 max-w-3xl mx-auto leading-relaxed">
            Een betrouwbare aarding is de basis van veilige elektrotechnische infrastructuur. TerreVolt realiseert, verbetert, meet en rapporteert aardingssystemen voor LS/MS-stations, technische ruimten en industriële installaties.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5 sm:gap-6">
          {groundingServices.map((service, index) => {
            const Icon = service.icon;
            return (
              <Reveal key={index} delay={index * 90}>
                <div className="card-lift h-full bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-white/10 hover:border-[#9ed42e]">
                  <div className="w-12 h-12 bg-[#9ed42e] rounded-lg flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-[#0d3b2e]" strokeWidth={2.5} />
                  </div>
                  <h3 className="text-lg text-white mb-2 hyphens-nl">{service.title}</h3>
                  <p className="text-white/65 text-sm leading-relaxed hyphens-nl">{service.description}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
