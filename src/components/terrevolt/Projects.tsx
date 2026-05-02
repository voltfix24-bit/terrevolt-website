import { CheckCircle2 } from "lucide-react";

const projects = [
  {
    label: "LS-INFRASTRUCTUUR",
    title: "Laagspanningsrek vervangen",
    description: "Ondersteuning bij demontage, montage, kabelafwerking en oplevering van laagspanningsverdelingen.",
    highlights: [
      "LS-rek en afgaande velden",
      "Kabels opnieuw aansluiten",
      "Controle en oplevering"
    ]
  },
  {
    label: "STATIONSRENOVATIE",
    title: "MS/LS-stationsrenovatie",
    description: "Uitvoering en ondersteuning bij renovatie van technische ruimten, schakelinstallaties, transformatoren en aarding.",
    highlights: [
      "MS-installatie en transformator",
      "LS-verdeling en kabelwerk",
      "Stationsaarding"
    ]
  },
  {
    label: "AARDING",
    title: "Aardingsverbetering technische ruimte",
    description: "Inspectie, verbetering en meting van aardingsvoorzieningen voor veilige en betrouwbare installaties.",
    highlights: [
      "Aardelektroden plaatsen",
      "Aardverspreidingsweerstand meten",
      "Meetrapportage opleveren"
    ]
  }
];

export function Projects() {
  return (
    <section id="projecten" className="py-24 bg-white">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl text-[#0d3b2e] mb-4">Projecttypes en praktijkvoorbeelden</h2>
          <p className="text-xl text-[#6c757d] max-w-3xl mx-auto">
            Voorbeelden van werkzaamheden waarbij TerreVolt opdrachtgevers kan ondersteunen.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-[#f8f9fa] to-white border border-gray-200 rounded-xl p-8 hover:shadow-xl transition-all duration-300 group"
            >
              <div className="mb-6">
                <div className="text-xs text-[#9ed42e] mb-3 tracking-widest uppercase">{project.label}</div>
                <h3 className="text-2xl text-[#0d3b2e] mb-4">{project.title}</h3>
                <p className="text-[#6c757d] leading-relaxed mb-6">{project.description}</p>
              </div>

              <div className="space-y-2 pt-4 border-t border-gray-200">
                {project.highlights.map((highlight, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-[#9ed42e] flex-shrink-0" strokeWidth={2.5} />
                    <span className="text-[#2d3436] text-sm">{highlight}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
