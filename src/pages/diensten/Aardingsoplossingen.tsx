import { ArrowRight, Gauge, ShieldCheck, GitBranch, FileBarChart, Building2, Server, Zap, Factory, Construction, Plug, Activity, ClipboardList, FileCheck } from "lucide-react";
import { Header } from "@/components/terrevolt/Header";
import { Footer } from "@/components/terrevolt/Footer";
import { WhenToCall } from "@/components/terrevolt/WhenToCall";
import { SafetyStatement } from "@/components/terrevolt/SafetyStatement";
import { usePageMeta } from "../../hooks/usePageMeta";
import { EarthSymbol } from "@/components/icons/EarthSymbol";

const fundament = [
  { icon: EarthSymbol, title: "Aardelektroden", description: "Plaatsen van aardelektroden en aardingsvoorzieningen voor technische installaties." },
  { icon: Gauge, title: "Aardverspreidingsweerstand", description: "Meten, beoordelen en optimaliseren van aardverspreidingsweerstand." },
  { icon: ShieldCheck, title: "Stationsaarding", description: "Aardingssystemen voor MS/LS-stations en transformatorruimten." },
  { icon: GitBranch, title: "Potentiaalvereffening", description: "Hoofd- en aanvullende potentiaalvereffening voor veilige installaties." },
  { icon: FileBarChart, title: "Meetrapportage", description: "Duidelijke meetrapportages en opleverdocumentatie." },
];

const toepassingen = [
  { icon: Building2, title: "MS/LS-stations" },
  { icon: Server, title: "Technische ruimten" },
  { icon: Zap, title: "Transformatorstations" },
  { icon: Factory, title: "Industriële installaties" },
  { icon: Construction, title: "Tijdelijke voorzieningen" },
  { icon: Plug, title: "Grootverbruik-aansluitingen" },
];

const meetbaar = [
  { icon: Activity, title: "Meten", description: "Aardverspreidingsweerstand, doorverbindingsmetingen en controlemetingen op locatie." },
  { icon: ClipboardList, title: "Beoordelen", description: "Toetsen van meetwaarden aan eisen, normen en projectafspraken." },
  { icon: FileCheck, title: "Rapporteren", description: "Heldere meetrapportages en opleverdocumentatie voor opdrachtgever en dossier." },
];

const Aardingsoplossingen = () => {
  usePageMeta("Aardingsoplossingen | TerreVolt BV", "Aanleg, verbetering, meting en rapportage van aardingsvoorzieningen voor LS/MS-infrastructuur.");

  return (
    <div className="min-h-screen bg-[#f8f9fa]">
      <Header />

      <main id="main-content" className="pt-16 sm:pt-20">
        {/* HERO */}
        <section className="relative sm:min-h-[65vh] flex items-center overflow-hidden bg-gradient-to-br from-[#0d3b2e] via-[#1a4a36] to-[#0d3b2e] py-14 sm:py-20">
          {/* Grid */}
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

          {/* Kabelroute / meetlijnen */}
          <div className="absolute inset-0 opacity-[0.18] pointer-events-none">
            <svg className="w-full h-full" viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice">
              <path d="M0,650 L200,650 L260,580 L520,580 L580,500 L900,500 L960,420 L1200,420" stroke="rgba(158, 212, 46, 0.7)" strokeWidth="2" fill="none" />
              <path d="M0,720 L300,720 L360,660 L780,660 L840,600 L1200,600" stroke="rgba(158, 212, 46, 0.45)" strokeWidth="1.5" fill="none" strokeDasharray="6 6" />
              <g fill="rgba(158, 212, 46, 0.85)">
                <circle cx="260" cy="580" r="5" />
                <circle cx="580" cy="500" r="5" />
                <circle cx="960" cy="420" r="5" />
              </g>
              {/* Aardingssymbool */}
              <g stroke="rgba(158, 212, 46, 0.7)" strokeWidth="2" fill="none">
                <line x1="1080" y1="180" x2="1080" y2="240" />
                <line x1="1050" y1="240" x2="1110" y2="240" />
                <line x1="1060" y1="252" x2="1100" y2="252" />
                <line x1="1070" y1="264" x2="1090" y2="264" />
              </g>
            </svg>
          </div>

          <div className="container mx-auto px-5 sm:px-6 lg:px-12 relative z-10">
            <div className="max-w-4xl">
              <div className="inline-block bg-[#9ed42e] text-[#0d3b2e] px-4 py-2 rounded-full text-sm mb-6 tracking-wider uppercase">
                Specialisme
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl text-white mb-6 leading-tight hyphens-nl">
                Aardingsoplossingen<br />
                <span className="text-[#9ed42e]">voor LS/MS-infrastructuur</span>
              </h1>
              <p className="text-lg sm:text-xl lg:text-2xl text-gray-300 mb-10 max-w-3xl leading-relaxed">
                TerreVolt realiseert, verbetert, meet en rapporteert aardingsvoorzieningen voor laagspannings- en middenspanningsinstallaties, stations, technische ruimten en industriële installaties.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="/contact"
                  className="group bg-[#9ed42e] text-[#0d3b2e] px-8 py-4 rounded-lg hover:bg-[#8bc41f] transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <span>Aarding bespreken</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </a>
                <a
                  href="/contact"
                  className="border-2 border-[#9ed42e] text-[#9ed42e] px-8 py-4 rounded-lg hover:bg-[#9ed42e] hover:text-[#0d3b2e] transition-all duration-300 text-center"
                >
                  Meetrapportage aanvragen
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* SECTIE 1: Aarding als fundament */}
        <section className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-5 sm:px-6 lg:px-12">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl text-[#0d3b2e] mb-4">Aarding als basis van veilige infrastructuur</h2>
              <p className="text-xl text-[#6c757d] max-w-3xl mx-auto leading-relaxed">
                Een betrouwbare aarding is essentieel voor veiligheid, bedrijfszekerheid en correcte werking van elektrotechnische installaties. TerreVolt behandelt aarding niet als bijzaak, maar als fundament van veilige infrastructuur.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
              {fundament.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.title}
                    className="group bg-white border border-gray-200 rounded-xl p-6 hover:border-[#9ed42e] hover:shadow-xl transition-all duration-300"
                  >
                    <div className="w-12 h-12 bg-[#f0f7e6] rounded-lg flex items-center justify-center mb-4 group-hover:bg-[#9ed42e] transition-colors duration-300">
                      <Icon className="w-7 h-7 text-[#0d3b2e] group-hover:text-white transition-colors duration-300" strokeWidth={2} />
                    </div>
                    <h3 className="text-lg text-[#0d3b2e] mb-2">{item.title}</h3>
                    <p className="text-[#6c757d] text-sm leading-relaxed">{item.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* SECTIE 2: Toepassingen */}
        <section className="py-16 md:py-24 bg-[#f8f9fa]">
          <div className="container mx-auto px-5 sm:px-6 lg:px-12">
            <div className="text-center mb-16">
              <div className="inline-block bg-[#0d3b2e] text-[#9ed42e] px-4 py-2 rounded-full text-sm mb-6 tracking-wider uppercase">
                Toepassingen
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl text-[#0d3b2e] mb-4">Toepassingen</h2>
              <p className="text-xl text-[#6c757d] max-w-2xl mx-auto">
                Aardingsvoorzieningen voor uiteenlopende installaties en omgevingen.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {toepassingen.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.title}
                    className="group flex flex-col items-center text-center bg-white rounded-xl p-6 border border-gray-200 hover:border-[#9ed42e] hover:shadow-xl transition-all duration-300"
                  >
                    <div className="w-14 h-14 bg-gradient-to-br from-[#0d3b2e] to-[#1a4a36] rounded-xl flex items-center justify-center mb-4">
                      <Icon className="w-7 h-7 text-[#9ed42e]" strokeWidth={2} />
                    </div>
                    <div className="text-[#0d3b2e]">{item.title}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* SECTIE 3: Meetbaar en aantoonbaar */}
        <section className="py-16 md:py-24 bg-[#0d3b2e] relative overflow-hidden">
          <div className="absolute inset-0 opacity-5">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `
                  linear-gradient(rgba(255, 255, 255, 0.3) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(255, 255, 255, 0.3) 1px, transparent 1px)
                `,
                backgroundSize: "60px 60px",
              }}
            />
          </div>

          <div className="container mx-auto px-5 sm:px-6 lg:px-12 relative z-10">
            <div className="text-center mb-16">
              <div className="inline-block bg-[#9ed42e] text-[#0d3b2e] px-4 py-2 rounded-full text-sm mb-6 tracking-wider uppercase">
                Aantoonbaar
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl text-white mb-4">Veilig geaard. Meetbaar opgeleverd.</h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                TerreVolt zorgt voor controleerbare uitvoering en duidelijke vastlegging. Waar nodig leveren wij meetgegevens en rapportages op voor opdrachtgever, beheerder of opleverdossier.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {meetbaar.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.title}
                    className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-8 hover:bg-white/10 hover:border-[#9ed42e] transition-all duration-300"
                  >
                    <div className="w-14 h-14 bg-[#9ed42e] rounded-lg flex items-center justify-center mb-6">
                      <Icon className="w-7 h-7 text-[#0d3b2e]" strokeWidth={2.5} />
                    </div>
                    <h3 className="text-xl text-white mb-3">{item.title}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">{item.description}</p>
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
            "Bij aanleg of verbetering van aarding",
            "Bij aardingsmetingen",
            "Bij stationsaarding",
            "Bij potentiaalvereffening",
            "Bij opleverrapportage",
          ]}
        />


        <SafetyStatement />

        {/* CTA */}
        <section id="contact" className="py-16 md:py-24 bg-gradient-to-br from-[#0d3b2e] via-[#1a4a36] to-[#0d3b2e] relative overflow-hidden">
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
                Een <span className="text-[#9ed42e]">aardingsvraagstuk</span> bespreken?
              </h2>
              <p className="text-xl text-gray-300 mb-12 leading-relaxed">
                TerreVolt denkt graag mee over aanpak, meting en oplevering.
              </p>
              <a
                href="/contact"
                className="inline-block bg-[#9ed42e] text-[#0d3b2e] px-10 py-4 rounded-lg hover:bg-[#8bc41f] transition-all duration-300 text-lg"
              >
                Aardingsvraagstuk bespreken
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Aardingsoplossingen;
