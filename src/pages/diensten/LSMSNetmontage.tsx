import { ArrowRight, Cable, Zap, GitMerge, Plug, Workflow, ClipboardCheck, Wrench, Building2, AlertTriangle, Building, HardHat, Factory } from "lucide-react";
import { Header } from "@/components/terrevolt/Header";
import { Footer } from "@/components/terrevolt/Footer";
import { WhenToCall } from "@/components/terrevolt/WhenToCall";
import { usePageMeta } from "../../hooks/usePageMeta";

const uitvoering = [
  { icon: Cable, title: "LS-kabelmontage", description: "Montage en aansluiting van laagspanningskabels binnen netten, stations en verdeelinrichtingen." },
  { icon: Zap, title: "MS-kabelmontage", description: "Afmontage en aansluiting van middenspanningskabels binnen stations en technische ruimten." },
  { icon: GitMerge, title: "Verbindingsmoffen", description: "Ondersteuning bij het realiseren van betrouwbare kabelverbindingen." },
  { icon: Plug, title: "Eindsluitingen", description: "Afwerking en aansluiting van kabels op installaties, velden en transformatorstations." },
  { icon: Workflow, title: "Kabelinvoer", description: "Invoeren, begeleiden en voorbereiden van kabels in technische ruimten en stations." },
  { icon: ClipboardCheck, title: "Oplevering", description: "Controle, terugkoppeling en waar nodig documentatie richting opdrachtgever." },
];

const toepassingen = [
  { icon: Wrench, title: "Stationsrenovaties", description: "Vakbekwame netmontage tijdens renovatie van MS/LS-stations en technische ruimten." },
  { icon: Building2, title: "Netuitbreidingen", description: "Ondersteuning bij uitbreiding en aanpassing van laag- en middenspanningsnetten." },
  { icon: AlertTriangle, title: "Storingsherstel en saneringen", description: "Snelle inzet bij storingsherstel, vervanging en sanering van kabelinfrastructuur." },
];

const voorWie = [
  { icon: Building, title: "Netbeheerders", description: "Ondersteuning bij LS/MS-netmontage, stationsrenovaties en aansluitwerk." },
  { icon: HardHat, title: "Hoofdaannemers", description: "Vakbekwame monteurs en ploegen voor uitvoering binnen de netbeheerketen." },
  { icon: Factory, title: "Industrie & grootverbruik", description: "Netmontage in middenspanning, verdeelinrichtingen en technische ruimten." },
];

const LSMSNetmontage = () => {
  usePageMeta("LS/MS Netmontage | TerreVolt BV", "Kabelmontage, moffen, eindsluitingen en aansluitwerk binnen laag- en middenspanningsnetten.");

  return (
    <div className="min-h-screen bg-[#f8f9fa]">
      <Header />

      <main className="pt-16 sm:pt-20">
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
              <h1 className="text-4xl sm:text-5xl lg:text-6xl text-white mb-6 leading-tight hyphens-nl">
                LS/MS <span className="text-[#9ed42e]">Netmontage</span>
              </h1>
              <p className="text-lg sm:text-xl lg:text-2xl text-gray-300 mb-10 max-w-3xl leading-relaxed">
                TerreVolt voert netmontage uit aan laagspannings- en middenspanningsnetten. Wij ondersteunen bij kabelmontage, moffen, eindsluitingen, aansluitwerk en oplevering binnen de netbeheeromgeving.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="/contact"
                  className="group bg-[#9ed42e] text-[#0d3b2e] px-8 py-4 rounded-lg hover:bg-[#8bc41f] transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <span>Netmontage bespreken</span>
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

        {/* SECTIE 1: Wat wij uitvoeren */}
        <section className="py-16 md:py-16 md:py-24 bg-white">
          <div className="container mx-auto px-5 sm:px-6 lg:px-12">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl text-[#0d3b2e] mb-4">Netmontage voor laag- en middenspanningsnetten</h2>
              <p className="text-xl text-[#6c757d] max-w-3xl mx-auto leading-relaxed">
                Netmontage vormt de verbinding tussen ontwerp, uitvoering en bedrijfsvoering. TerreVolt levert vakbekwame ondersteuning bij LS/MS-kabelwerk, van voorbereiding en montage tot controle en oplevering.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {uitvoering.map((item) => {
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

        {/* SECTIE 2: Toepassingen */}
        <section className="py-16 md:py-16 md:py-24 bg-[#f8f9fa]">
          <div className="container mx-auto px-5 sm:px-6 lg:px-12">
            <div className="text-center mb-16">
              <div className="inline-block bg-[#0d3b2e] text-[#9ed42e] px-4 py-2 rounded-full text-sm mb-6 tracking-wider uppercase">
                Toepassingen
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl text-[#0d3b2e] mb-4">Waarvoor wordt TerreVolt ingezet?</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {toepassingen.map((item) => {
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

        {/* SECTIE 3: Voor wie */}
        <section className="py-16 md:py-16 md:py-24 bg-white">
          <div className="container mx-auto px-5 sm:px-6 lg:px-12">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl text-[#0d3b2e] mb-4">Voor wie werken wij?</h2>
              <p className="text-xl text-[#6c757d] max-w-2xl mx-auto">
                Ervaren partner in netmontage voor professionele opdrachtgevers.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {voorWie.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.title}
                    className="bg-[#f8f9fa] rounded-xl p-10 border-2 border-transparent hover:border-[#9ed42e] transition-all duration-300 shadow-sm hover:shadow-xl"
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

        {/* SECTIE 3.5: Wanneer schakelt u TerreVolt in? */}
        <WhenToCall
          variant="muted"
          items={[
            "Bij kabelmontage binnen LS/MS-projecten",
            "Bij moffen, eindsluitingen en kabelafwerking",
            "Bij stationswerk of technische ruimten",
            "Bij uitbreiding, vervanging of sanering",
            "Bij behoefte aan vakbekwame monteurs of ploegen",
          ]}
        />

        {/* SECTIE 4: CTA */}
        <section id="contact" className="py-16 md:py-16 md:py-24 bg-gradient-to-br from-[#0d3b2e] via-[#1a4a36] to-[#0d3b2e] relative overflow-hidden">
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
                LS/MS-monteurs of <span className="text-[#9ed42e]">netmontageploeg nodig?</span>
              </h2>
              <p className="text-xl text-gray-300 mb-12 leading-relaxed">
                TerreVolt denkt mee over veilige, praktische en betrouwbare uitvoering.
              </p>
              <a
                href="/contact"
                className="inline-block bg-[#9ed42e] text-[#0d3b2e] px-10 py-4 rounded-lg hover:bg-[#8bc41f] transition-all duration-300 text-lg"
              >
                Netmontageploeg aanvragen
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default LSMSNetmontage;
