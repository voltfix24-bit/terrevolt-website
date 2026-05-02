import { CheckCircle2 } from "lucide-react";
import { Reveal } from "@/components/terrevolt/Reveal";

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
    <section id="projecten" className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-5 sm:px-6 lg:px-12">
        <Reveal className="text-center mb-10 sm:mb-14 md:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl text-[#0d3b2e] mb-3 sm:mb-4 hyphens-nl">Projecttypes en praktijkvoorbeelden</h2>
          <p className="text-base sm:text-xl text-[#6c757d] max-w-3xl mx-auto leading-relaxed">
            Voorbeelden van werkzaamheden waarbij TerreVolt opdrachtgevers kan ondersteunen.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 md:gap-8">
          {projects.map((project, index) => (
            <Reveal key={index} delay={index * 100}>
              <div className="card-lift h-full bg-gradient-to-br from-[#f8f9fa] to-white border border-gray-200 rounded-xl p-6 md:p-8 hover:border-[#9ed42e] hover:shadow-xl group">
                <div className="mb-5 sm:mb-6">
                  <div className="text-[11px] sm:text-xs text-[#9ed42e] mb-2 sm:mb-3 tracking-widest uppercase break-words">{project.label}</div>
                  <h3 className="text-xl sm:text-2xl text-[#0d3b2e] mb-3 sm:mb-4 hyphens-nl">{project.title}</h3>
                  <p className="text-[15px] sm:text-base text-[#6c757d] leading-relaxed mb-5 sm:mb-6">{project.description}</p>
                </div>

                <div className="space-y-2 pt-4 border-t border-gray-200">
                  {project.highlights.map((highlight, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-[#9ed42e] flex-shrink-0 mt-0.5" strokeWidth={2.5} />
                      <span className="text-[#2d3436] text-sm break-words">{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
