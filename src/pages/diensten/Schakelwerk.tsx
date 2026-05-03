import { ArrowRight, Power, Lock, PlayCircle, PauseCircle, ListChecks, Building2, Zap, Cable, Wrench, ShieldCheck } from "lucide-react";
import { Header } from "@/components/terrevolt/Header";
import { Footer } from "@/components/terrevolt/Footer";
import { WhenToCall } from "@/components/terrevolt/WhenToCall";
import { SafetyStatement } from "@/components/terrevolt/SafetyStatement";
import { usePageMeta } from "../../hooks/usePageMeta";
import { EarthSymbol } from "@/components/icons/EarthSymbol";

const taken = [
  { icon: Power, title: "Vrijschakelen", description: "Installaties of netdelen spanningsloos maken volgens projectafspraken en veiligheidsprocedures." },
  { icon: Lock, title: "Veiligstellen", description: "Werkgebieden veiligstellen zodat monteurs verantwoord kunnen uitvoeren." },
  { icon: PlayCircle, title: "In bedrijf nemen", description: "Installaties gecontroleerd terug in bedrijf nemen na uitvoering, controle of renovatie." },
  { icon: PauseCircle, title: "Uit bedrijf nemen", description: "Netdelen of installaties voorbereiden voor werkzaamheden, vervanging of onderhoud." },
  { icon: EarthSymbol, title: "Aarden en kortsluiten", description: "Ondersteuning bij veiligheidsmaatregelen rondom werkplekken en installaties." },
  { icon: ListChecks, title: "Schakelplannen", description: "Uitvoering en afstemming rondom bedienings- en schakelplannen." },
];

const inzet = [
  { icon: Building2, title: "Stationsrenovaties", description: "Geplande schakelhandelingen tijdens renovatie van MS/LS-stations." },
  { icon: Zap, title: "Transformatorwissels", description: "Veilig vrijschakelen, veiligstellen en terugschakelen rondom transformatorwerk." },
  { icon: Cable, title: "Kabelwerk", description: "Schakelwerk bij kabelmontage, vervanging en aansluitwerk in het net." },
  { icon: Wrench, title: "Storingen en onderhoud", description: "Schakelondersteuning bij storingsherstel en preventief onderhoud." },
];

const badges = ["BEI BLS/BHS", "AVP / VP / VOP / WV", "LMRA", "VCA", "NEN 3140"];

const Schakelwerk = () => {
  usePageMeta("Schakelwerk & veiligstellen | TerreVolt BV", "Vrijschakelen, veiligstellen, in- en uitbedrijf nemen binnen LS/MS-installaties.");

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
                Schakelwerk<br />
                <span className="text-[#9ed42e]">& veiligstellen</span>
              </h1>
              <p className="text-lg sm:text-xl lg:text-2xl text-white/85 mb-10 max-w-3xl leading-relaxed">
                TerreVolt ondersteunt bij geplande en projectmatige schakelwerkzaamheden binnen laagspannings- en middenspanningsinstallaties. Wij helpen bij veilig in- en uitbedrijf nemen, vrijschakelen, veiligstellen en terugschakelen.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="/contact"
                  className="group bg-[#9ed42e] text-[#0d3b2e] px-8 py-4 rounded-lg hover:bg-[#8bc41f] transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <span>Schakelwerk bespreken</span>
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

        {/* SECTIE 1: Wat valt onder schakelwerk */}
        <section id="werkzaamheden" className="py-16 md:py-24 bg-white scroll-mt-24">
          <div className="container mx-auto px-5 sm:px-6 lg:px-12">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl text-[#0d3b2e] mb-4">Veilig werken begint met gecontroleerd schakelen</h2>
              <p className="text-xl text-[#6c757d] max-w-3xl mx-auto leading-relaxed">
                Schakelhandelingen vormen de basis voor elke veilige uitvoering binnen LS/MS-installaties.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {taken.map((item) => {
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

        {/* SECTIE 2: Wanneer wordt TerreVolt ingezet */}
        <section className="py-16 md:py-24 bg-[#f8f9fa]">
          <div className="container mx-auto px-5 sm:px-6 lg:px-12">
            <div className="text-center mb-16">
              <div className="inline-block bg-[#0d3b2e] text-[#9ed42e] px-4 py-2 rounded-full text-sm mb-6 tracking-wider uppercase">
                Inzet
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl text-[#0d3b2e] mb-4">Schakelwerk bij LS/MS-projecten</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {inzet.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.title}
                    className="bg-white rounded-xl p-8 border-2 border-transparent hover:border-[#9ed42e] transition-all duration-300 shadow-sm hover:shadow-xl"
                  >
                    <div className="w-14 h-14 bg-gradient-to-br from-[#0d3b2e] to-[#1a4a36] rounded-xl flex items-center justify-center mb-6">
                      <Icon className="w-7 h-7 text-[#9ed42e]" strokeWidth={2} />
                    </div>
                    <h3 className="text-xl text-[#0d3b2e] mb-3">{item.title}</h3>
                    <p className="text-[#6c757d] leading-relaxed text-sm">{item.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* SECTIE 3: Veiligheid en bevoegdheden */}
        <section className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-5 sm:px-6 lg:px-12">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl text-[#0d3b2e] mb-4">Bevoegdheden, procedures en communicatie</h2>
              <p className="text-xl text-[#6c757d] max-w-3xl mx-auto leading-relaxed">
                Schakelwerk is geen losse handeling, maar onderdeel van veilige bedrijfsvoering. Het vraagt om voorbereiding, bevoegdheid, risicobeheersing en duidelijke communicatie tussen opdrachtgever, werkverantwoordelijke, uitvoerder en ploeg.
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
              {badges.map((badge) => (
                <div
                  key={badge}
                  className="inline-flex items-center gap-2 bg-[#f8f9fa] border border-gray-200 hover:border-[#9ed42e] text-[#0d3b2e] px-5 py-3 rounded-full transition-colors"
                >
                  <ShieldCheck className="w-5 h-5 text-[#9ed42e]" strokeWidth={2.5} />
                  <span className="text-sm tracking-wide">{badge}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
        {/* Wanneer schakelt u TerreVolt in? */}
        <WhenToCall
          variant="muted"
          items={[
            "Bij vrijschakelen en veiligstellen",
            "Bij in- en uitbedrijf nemen",
            "Bij stationsrenovaties",
            "Bij kabelwerk en transformatorwissels",
            "Bij afstemming met WV, uitvoerder en ploeg",
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
                Schakelwerk of <span className="text-[#9ed42e]">veiligstelling nodig?</span>
              </h2>
              <p className="text-xl text-white/85 mb-12 leading-relaxed">
                TerreVolt ondersteunt bij veilige uitvoering binnen LS/MS-infrastructuur.
              </p>
              <a
                href="/contact"
                className="inline-block bg-[#9ed42e] text-[#0d3b2e] px-10 py-4 rounded-lg hover:bg-[#8bc41f] transition-all duration-300 text-lg"
              >
                Neem contact op
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Schakelwerk;
