import { ArrowRight, Server, Cpu, Zap, Cable, Gauge, ClipboardCheck, Building2, Layers, Boxes, ShieldCheck, CalendarClock, MessageCircle, PackageCheck } from "lucide-react";
import { Header } from "@/components/terrevolt/Header";
import { Footer } from "@/components/terrevolt/Footer";
import { WhenToCall } from "@/components/terrevolt/WhenToCall";
import { SafetyStatement } from "@/components/terrevolt/SafetyStatement";
import { usePageMeta } from "../../hooks/usePageMeta";

const werkzaamheden = [
  { icon: Server, title: "LS-rekken vervangen", description: "Ondersteuning bij demontage, montage, kabelafwerking en oplevering van laagspanningsverdelingen." },
  { icon: Cpu, title: "MS-installaties", description: "Aansluitwerk en ondersteuning bij RMU's, MS-velden en schakelinstallaties." },
  { icon: Zap, title: "Transformatoren", description: "Ondersteuning bij transformatorwissels, aansluitwerk en controle van voorzieningen." },
  { icon: Cable, title: "Kabelmontage", description: "Kabelinvoer, afmontage en aansluiting binnen technische ruimten." },
  { icon: Gauge, title: "Stationsaarding", description: "Aardingsvoorzieningen voor stations, transformatorruimten en technische installaties." },
  { icon: ClipboardCheck, title: "Oplevering", description: "Controle, rapportage en duidelijke terugkoppeling na uitvoering." },
];

const projecttypes = [
  { icon: Building2, title: "MS/LS-stationsrenovatie", description: "Volledige renovatie en inrichting van middenspannings- en laagspanningsstations." },
  { icon: Layers, title: "Laagspanningsrek vervangen", description: "Vervanging van LS-verdeling inclusief kabelafwerking, controle en oplevering." },
  { icon: Boxes, title: "Transformatorruimte aanpassen", description: "Aanpassen, herinrichten of uitbreiden van transformatorruimten en technische ruimten." },
];

const trustItems = [
  { icon: ShieldCheck, title: "Veiligheidsbewust", description: "Werken volgens geldende procedures, normen en projectafspraken." },
  { icon: CalendarClock, title: "Projectmatig inzetbaar", description: "Flexibele inzet van monteurs en ploegen binnen uw projectplanning." },
  { icon: MessageCircle, title: "Korte lijnen", description: "Directe communicatie tussen uitvoering, werkverantwoordelijke en opdrachtgever." },
  { icon: PackageCheck, title: "Oplevergericht", description: "Heldere controle, terugkoppeling en\u00A0— waar gevraagd —\u00A0opleverdocumentatie." },
];

const Stationsrenovatie = () => {
  usePageMeta("Stationsrenovatie MS/LS | TerreVolt BV", "Renovatie en inrichting van MS/LS-stations, transformatorruimten, LS-rekken en aarding — gefaseerd en aantoonbaar opgeleverd.", "/diensten/stationsrenovatie");

  return (
    <div className="min-h-screen bg-[#f8f9fa]">
      <Header />

      <main id="main-content" className="pt-20 sm:pt-24">
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
                Stationsrenovatie<br />
                <span className="text-[#9ed42e]">& technische ruimten</span>
              </h1>
              <p className="text-lg sm:text-xl lg:text-2xl text-white/85 mb-10 max-w-3xl leading-relaxed">
                TerreVolt ondersteunt bij renovatie, vervanging en inrichting van MS/LS-stations en technische ruimten. Van kabelmontage en LS-verdelers tot transformatoren, schakelinstallaties en aardingsvoorzieningen.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="/contact"
                  className="group bg-[#9ed42e] text-[#0d3b2e] px-8 py-4 rounded-lg hover:bg-[#8bc41f] transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <span>Stationsproject bespreken</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </a>
                <a
                  href="/contact"
                  className="border-2 border-[#9ed42e] text-[#9ed42e] px-8 py-4 rounded-lg hover:bg-[#9ed42e] hover:text-[#0d3b2e] transition-all duration-300 text-center"
                >
                  Neem contact op
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* SECTIE 1: Werkzaamheden */}
        <section id="werkzaamheden" className="py-16 md:py-24 bg-white scroll-mt-24">
          <div className="container mx-auto px-5 sm:px-6 lg:px-12">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl text-[#0d3b2e] mb-4">Uitvoering binnen MS/LS-stations</h2>
              <p className="text-xl text-[#6c757d] max-w-3xl mx-auto leading-relaxed">
                Vakbekwame ondersteuning bij elke fase van een stationsrenovatie.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {werkzaamheden.map((item) => {
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

        {/* SECTIE 2: Typische projecttypes */}
        <section className="py-16 md:py-24 bg-[#f8f9fa]">
          <div className="container mx-auto px-5 sm:px-6 lg:px-12">
            <div className="text-center mb-16">
              <div className="inline-block bg-[#0d3b2e] text-[#9ed42e] px-4 py-2 rounded-full text-sm mb-6 tracking-wider uppercase">
                Projecttypes
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl text-[#0d3b2e] mb-4">Typische stationsprojecten</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {projecttypes.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.title}
                    className="bg-white rounded-xl p-10 border-2 border-transparent hover:border-[#9ed42e] transition-all duration-300 shadow-sm hover:shadow-xl"
                  >
                    <div className="w-16 h-16 bg-gradient-to-br from-[#0d3b2e] to-[#1a4a36] rounded-xl flex items-center justify-center mb-6">
                      <Icon className="w-8 h-8 text-[#9ed42e]" strokeWidth={2} />
                    </div>
                    <h3 className="text-2xl text-[#0d3b2e] mb-4">{item.title}</h3>
                    <p className="text-[#6c757d] leading-relaxed">{item.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* SECTIE 3: Waarom TerreVolt */}
        <section className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-5 sm:px-6 lg:px-12">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl text-[#0d3b2e] mb-4">Praktijkervaring binnen de netbeheerwereld</h2>
              <p className="text-xl text-[#6c757d] max-w-3xl mx-auto leading-relaxed">
                Stationsrenovatie vraagt om goede voorbereiding, veilige uitvoering en afstemming tussen opdrachtgever, uitvoerder, werkverantwoordelijke en monteurs. TerreVolt levert vakbekwame ondersteuning met kennis van LS/MS-infrastructuur.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {trustItems.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.title}
                    className="bg-[#f8f9fa] rounded-xl p-8 border border-gray-200 hover:border-[#9ed42e] transition-all duration-300 text-center"
                  >
                    <div className="w-16 h-16 bg-[#f0f7e6] rounded-full flex items-center justify-center mx-auto mb-6">
                      <Icon className="w-8 h-8 text-[#0d3b2e]" strokeWidth={2} />
                    </div>
                    <h3 className="text-lg text-[#0d3b2e] mb-3">{item.title}</h3>
                    <p className="text-[#6c757d] text-sm leading-relaxed">{item.description}</p>
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
            "Bij renovatie van MS/LS-stations",
            "Bij vervangen van LS-rekken",
            "Bij transformatorwissels",
            "Bij aanpassen van technische ruimten",
            "Bij stationsaarding en oplevering",
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
                Een stationsrenovatie<br />
                <span className="text-[#9ed42e]">voorbereiden of uitvoeren?</span>
              </h2>
              <p className="text-xl text-white/85 mb-12 leading-relaxed">
                TerreVolt denkt graag mee over voorbereiding, planning en uitvoering.
              </p>
              <a
                href="/contact"
                className="inline-block bg-[#9ed42e] text-[#0d3b2e] px-10 py-4 rounded-lg hover:bg-[#8bc41f] transition-all duration-300 text-lg"
              >
                Stationsproject bespreken
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Stationsrenovatie;
