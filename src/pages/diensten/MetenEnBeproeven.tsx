import { ArrowRight, Gauge, Cable, Zap, Shield, Eye, FileText, Building2, GitMerge, AlertTriangle, PlayCircle, PackageCheck, Activity, ClipboardCheck, FileBarChart } from "lucide-react";
import { Header } from "@/components/terrevolt/Header";
import { Footer } from "@/components/terrevolt/Footer";
import { WhenToCall } from "@/components/terrevolt/WhenToCall";
import { SafetyStatement } from "@/components/terrevolt/SafetyStatement";
import { usePageMeta } from "../../hooks/usePageMeta";
import { EarthSymbol } from "@/components/icons/EarthSymbol";

const metingen = [
  { icon: Gauge, title: "Aardingsmetingen", description: "Meten en vastleggen van aardingsvoorzieningen en aardverspreidingsweerstand." },
  { icon: Cable, title: "Kabelmetingen", description: "Controle en ondersteuning bij kabelmetingen binnen LS/MS-projecten." },
  { icon: Zap, title: "Isolatiemetingen", description: "Controlemetingen voor veilige en betrouwbare elektrische installaties." },
  { icon: Shield, title: "Manteltesten", description: "Ondersteuning bij controle van kabelmantels en kabeltrajecten." },
  { icon: Eye, title: "Visuele inspecties", description: "Controle van uitvoering, aansluitingen, codering en zichtbare gebreken." },
  { icon: FileText, title: "Opleverrapportages", description: "Duidelijke rapportage voor opdrachtgever, beheerder of projectdossier." },
];

const wanneer = [
  { icon: Building2, label: "Na stationsrenovatie" },
  { icon: GitMerge, label: "Na kabelmontage" },
  { icon: EarthSymbol, label: "Na aanleg van aarding" },
  { icon: AlertTriangle, label: "Bij storingsonderzoek" },
  { icon: PlayCircle, label: "Voor ingebruikname" },
  { icon: PackageCheck, label: "Voor oplevering" },
];

const proces = [
  { icon: Activity, title: "Meten", description: "Uitvoeren van metingen op locatie met gekalibreerde apparatuur en vaste werkwijze." },
  { icon: ClipboardCheck, title: "Controleren", description: "Toetsen van meetwaarden aan eisen, normen en projectafspraken." },
  { icon: FileBarChart, title: "Rapporteren", description: "Heldere meet- en opleverrapportage voor opdrachtgever en dossier." },
];

const MetenEnBeproeven = () => {
  usePageMeta("Meten & beproeven | TerreVolt BV", "Aardingsmetingen, kabelmetingen, isolatiemetingen en opleverrapportages voor LS/MS-installaties.", "/diensten/meten-en-beproeven");

  return (
    <div className="min-h-screen bg-[#f8f9fa]">
      <Header />

      <main id="main-content" className="pt-16 sm:pt-20">
        {/* HERO */}
        <section className="relative sm:min-h-[60vh] flex items-center overflow-hidden bg-gradient-to-br from-[#0d3b2e] via-[#1a4a36] to-[#0d3b2e] py-14 sm:py-20">
          <div className="absolute inset-0 opacity-[0.08]">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `
                  linear-gradient(rgba(158, 212, 46, 0.4) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(158, 212, 46, 0.4) 1px, transparent 1px)
                `,
                backgroundSize: "60px 60px",
              }}
            />
          </div>

          <div className="container mx-auto px-5 sm:px-6 lg:px-12 relative z-10">
            <div className="max-w-4xl">
              <div className="inline-block bg-[#9ed42e] text-[#0d3b2e] px-4 py-2 rounded-full text-sm mb-6 tracking-wider uppercase">
                Dienst
              </div>
              <h1 className="text-[clamp(1.875rem,7vw,2.625rem)] sm:text-5xl lg:text-6xl text-white mb-6 leading-[1.1] sm:leading-tight hyphens-nl text-pretty">
                Meten, beproeven<br />
                <span className="text-[#9ed42e]">& rapportage</span>
              </h1>
              <p className="text-lg sm:text-xl lg:text-2xl text-white/85 mb-10 max-w-3xl leading-relaxed">
                TerreVolt ondersteunt bij metingen, controles, beproevingen en opleverrapportages voor laagspannings-, middenspannings- en aardingsinstallaties.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="/contact"
                  className="group bg-[#9ed42e] text-[#0d3b2e] px-8 py-4 rounded-lg hover:bg-[#8bc41f] transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <span>Meting aanvragen</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </a>
                <a
                  href="/contact"
                  className="border-2 border-[#9ed42e] text-[#9ed42e] px-8 py-4 rounded-lg hover:bg-[#9ed42e] hover:text-[#0d3b2e] transition-all duration-300 text-center"
                >
                  Contact opnemen
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* SECTIE 1: Wat wij meten */}
        <section id="werkzaamheden" className="py-16 md:py-24 bg-white scroll-mt-24">
          <div className="container mx-auto px-5 sm:px-6 lg:px-12">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl text-[#0d3b2e] mb-4">Metingen voor veilige oplevering</h2>
              <p className="text-xl text-[#6c757d] max-w-3xl mx-auto leading-relaxed">
                Vakbekwame controlemetingen, beproevingen en heldere rapportage.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {metingen.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.title}
                    className="group bg-white border border-gray-200 rounded-xl p-8 hover:border-[#9ed42e] hover:shadow-xl transition-all duration-300"
                  >
                    <div className="w-14 h-14 bg-[#f0f7e6] rounded-lg flex items-center justify-center mb-6 group-hover:bg-[#9ed42e] transition-colors duration-300">
                      <Icon className="w-7 h-7 text-[#0d3b2e] group-hover:text-white transition-colors duration-300" strokeWidth={2} />
                    </div>
                    <h3 className="text-xl text-[#0d3b2e] mb-3">{item.title}</h3>
                    <p className="text-[#6c757d] leading-relaxed">{item.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* SECTIE 2: Wanneer inzetten */}
        <section className="py-16 md:py-24 bg-[#f8f9fa]">
          <div className="container mx-auto px-5 sm:px-6 lg:px-12">
            <div className="text-center mb-16">
              <div className="inline-block bg-[#0d3b2e] text-[#9ed42e] px-4 py-2 rounded-full text-sm mb-6 tracking-wider uppercase">
                Inzet
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl text-[#0d3b2e] mb-4">Wanneer zijn metingen nodig?</h2>
              <p className="text-xl text-[#6c757d] max-w-2xl mx-auto">
                Tijdens elke fase waarin veiligheid en betrouwbaarheid aantoonbaar moeten zijn.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {wanneer.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.label}
                    className="group flex flex-col items-center text-center bg-white rounded-xl p-6 border border-gray-200 hover:border-[#9ed42e] hover:shadow-xl transition-all duration-300"
                  >
                    <div className="w-14 h-14 bg-gradient-to-br from-[#0d3b2e] to-[#1a4a36] rounded-xl flex items-center justify-center mb-4">
                      <Icon className="w-7 h-7 text-[#9ed42e]" strokeWidth={2} />
                    </div>
                    <div className="text-[#0d3b2e]">{item.label}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* SECTIE 3: Van meting naar rapportage */}
        <section className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-5 sm:px-6 lg:px-12">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl text-[#0d3b2e] mb-4">Van meting naar rapportage</h2>
              <p className="text-xl text-[#6c757d] max-w-2xl mx-auto">
                Een gestructureerd proces — meten, controleren, rapporteren.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto relative">
              {/* Verbindingslijn op desktop */}
              <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-px bg-gradient-to-r from-[#9ed42e]/0 via-[#9ed42e] to-[#9ed42e]/0" aria-hidden="true" />

              {proces.map((step, index) => {
                const Icon = step.icon;
                return (
                  <div
                    key={step.title}
                    className="relative bg-[#f8f9fa] rounded-xl p-8 border border-gray-200 hover:border-[#9ed42e] hover:shadow-xl transition-all duration-300 text-center"
                  >
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-10 h-10 bg-[#0d3b2e] text-[#9ed42e] rounded-full flex items-center justify-center text-sm border-4 border-white">
                      {index + 1}
                    </div>
                    <div className="w-16 h-16 bg-gradient-to-br from-[#0d3b2e] to-[#1a4a36] rounded-xl flex items-center justify-center mx-auto mb-6 mt-2">
                      <Icon className="w-8 h-8 text-[#9ed42e]" strokeWidth={2} />
                    </div>
                    <h3 className="text-xl text-[#0d3b2e] mb-3">{step.title}</h3>
                    <p className="text-[#6c757d] text-sm leading-relaxed">{step.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
        {/* Wanneer schakelt u TerreVolt in? */}
        <WhenToCall
          variant="muted"
          items={[
            "Na kabelmontage",
            "Na aanleg of wijziging van aarding",
            "Voor ingebruikname",
            "Voor oplevering",
            "Bij storing of twijfel over bestaande installatie",
          ]}
        />


        <SafetyStatement />

        {/* CTA */}
        <section id="contact" className="py-16 md:py-24 bg-gradient-to-br from-[#0d3b2e] via-[#1a4a36] to-[#0d3b2e] relative overflow-hidden scroll-mt-24">
          <div className="absolute inset-0 opacity-10">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `
                  linear-gradient(rgba(158, 212, 46, 0.3) 2px, transparent 2px),
                  linear-gradient(90deg, rgba(158, 212, 46, 0.3) 2px, transparent 2px)
                `,
                backgroundSize: "100px 100px",
              }}
            />
          </div>

          <div className="container mx-auto px-5 sm:px-6 lg:px-12 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl text-white mb-6">
                Metingen of <span className="text-[#9ed42e]">opleverrapportage</span> nodig?
              </h2>
              <p className="text-xl text-white/85 mb-12 leading-relaxed">
                TerreVolt levert vakbekwame uitvoering en heldere documentatie.
              </p>
              <a
                href="/contact"
                className="inline-block bg-[#9ed42e] text-[#0d3b2e] px-10 py-4 rounded-lg hover:bg-[#8bc41f] transition-all duration-300 text-lg"
              >
                Meting of rapportage aanvragen
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default MetenEnBeproeven;
