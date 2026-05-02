import { Cable, Layers, ShieldCheck, GitBranch, FileBarChart } from "lucide-react";

const groundingServices = [
  {
    icon: Cable,
    title: "Aardelektroden",
    description: "Plaatsen van aardelektroden en aardingsvoorzieningen voor technische installaties."
  },
  {
    icon: Layers,
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
    <section id="aarding" className="py-16 md:py-16 md:py-24 bg-[#0d3b2e] relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(255, 255, 255, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px'
        }} />
      </div>

      <div className="container mx-auto px-5 sm:px-6 lg:px-12 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-block bg-[#9ed42e] text-[#0d3b2e] px-4 py-2 rounded-full text-sm mb-6 tracking-wider uppercase">
            Specialisme
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl text-white mb-4">Aardingsoplossingen</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Een betrouwbare aarding is de basis van veilige elektrotechnische infrastructuur. TerreVolt realiseert, verbetert, meet en rapporteert aardingssystemen voor LS/MS-stations, technische ruimten en industriële installaties.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {groundingServices.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={index}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-white/10 hover:border-[#9ed42e] transition-all duration-300"
              >
                <div className="w-12 h-12 bg-[#9ed42e] rounded-lg flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-[#0d3b2e]" strokeWidth={2.5} />
                </div>
                <h3 className="text-lg text-white mb-2">{service.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{service.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
