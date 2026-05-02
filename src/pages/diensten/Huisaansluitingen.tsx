import { ArrowRight, PlugZap, Settings, Trash2, Building, Gauge, Wrench, Network, HardHat, Home, ShieldCheck, ClipboardList, MessageSquare } from "lucide-react";
import { Header } from "@/components/terrevolt/Header";
import { Footer } from "@/components/terrevolt/Footer";

const werkzaamheden = [
  { icon: PlugZap, title: "Nieuwe aansluitingen", description: "Ondersteuning bij aanleg van nieuwe laagspanningsaansluitingen." },
  { icon: Settings, title: "Wijzigen van aansluitingen", description: "Aanpassen, verzwaren of verplaatsen van bestaande aansluitingen." },
  { icon: Trash2, title: "Saneringen", description: "Projectmatige sanering van bestaande aansluitingen en kabels." },
  { icon: Building, title: "Laagbouw en hoogbouw", description: "Aansluitwerk voor woningen, appartementen en complexen." },
  { icon: Gauge, title: "Meterwisselingen", description: "Ondersteuning bij aansluitwerk rondom meetinrichtingen." },
  { icon: Wrench, title: "Storingsherstel", description: "Ondersteuning bij herstel van laagspanningsaansluitingen." },
];

const voorWie = [
  { icon: Network, title: "Netbeheerders", description: "Inzetbaar als verlengstuk van de netbeheerorganisatie voor LS-aansluitwerk." },
  { icon: HardHat, title: "Hoofdaannemers", description: "Vakbekwame ondersteuning binnen grotere infra- en bouwprojecten." },
  { icon: Home, title: "Woningbouw / utiliteit", description: "Aansluitwerk voor woningbouw, appartementencomplexen en utiliteitsbouw." },
];

const trust = [
  { icon: ShieldCheck, title: "Veilig", description: "Werken volgens geldende procedures en veiligheidsnormen." },
  { icon: ClipboardList, title: "Projectmatig", description: "Gestructureerde uitvoering met aandacht voor planning en kwaliteit." },
  { icon: MessageSquare, title: "Duidelijke communicatie", description: "Korte lijnen met opdrachtgever, beheerder en eindgebruiker." },
];

const Huisaansluitingen = () => {
  return (
    <div className="min-h-screen bg-[#f8f9fa]">
      <Header />

      <main className="pt-16 sm:pt-20">
        {/* HERO */}
        <section className="relative min-h-[60vh] flex items-center overflow-hidden bg-gradient-to-br from-[#0d3b2e] via-[#1a4a36] to-[#0d3b2e] py-20">
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

          <div className="container mx-auto px-6 lg:px-12 relative z-10">
            <div className="max-w-4xl">
              <div className="inline-block bg-[#9ed42e] text-[#0d3b2e] px-4 py-2 rounded-full text-sm mb-6 tracking-wider uppercase">
                Dienst
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl text-white mb-6 leading-tight break-words">
                Huisaansluitingen<br />
                <span className="text-[#9ed42e]">& LS-aansluitwerk</span>
              </h1>
              <p className="text-lg sm:text-xl lg:text-2xl text-gray-300 mb-10 max-w-3xl leading-relaxed">
                TerreVolt ondersteunt bij aanleg, wijziging, sanering en herstel van laagspanningsaansluitingen voor woningen, appartementencomplexen, bedrijfspanden en openbare voorzieningen.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="#contact"
                  className="group bg-[#9ed42e] text-[#0d3b2e] px-8 py-4 rounded-lg hover:bg-[#8bc41f] transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <span>Aansluitwerk bespreken</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </a>
                <a
                  href="#contact"
                  className="border-2 border-[#9ed42e] text-[#9ed42e] px-8 py-4 rounded-lg hover:bg-[#9ed42e] hover:text-[#0d3b2e] transition-all duration-300 text-center"
                >
                  Contact opnemen
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* SECTIE 1: Werkzaamheden */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-6 lg:px-12">
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl text-[#0d3b2e] mb-4">Laagspanningsaansluitingen projectmatig uitgevoerd</h2>
              <p className="text-xl text-[#6c757d] max-w-3xl mx-auto leading-relaxed">
                Van nieuwe aansluiting tot sanering en storingsherstel — vakbekwaam en gestructureerd.
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

        {/* SECTIE 2: Voor wie */}
        <section className="py-24 bg-[#f8f9fa]">
          <div className="container mx-auto px-6 lg:px-12">
            <div className="text-center mb-16">
              <div className="inline-block bg-[#0d3b2e] text-[#9ed42e] px-4 py-2 rounded-full text-sm mb-6 tracking-wider uppercase">
                Doelgroep
              </div>
              <h2 className="text-4xl lg:text-5xl text-[#0d3b2e] mb-4">Voor wie werken wij?</h2>
              <p className="text-xl text-[#6c757d] max-w-2xl mx-auto">
                TerreVolt werkt voor partijen die kwaliteit en betrouwbaarheid verwachten.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {voorWie.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.title}
                    className="group bg-white rounded-xl p-8 border border-gray-200 hover:border-[#9ed42e] hover:shadow-xl transition-all duration-300 text-center"
                  >
                    <div className="w-16 h-16 bg-gradient-to-br from-[#0d3b2e] to-[#1a4a36] rounded-xl flex items-center justify-center mx-auto mb-6">
                      <Icon className="w-8 h-8 text-[#9ed42e]" strokeWidth={2} />
                    </div>
                    <h3 className="text-xl text-[#0d3b2e] mb-3">{item.title}</h3>
                    <p className="text-[#6c757d] leading-relaxed">{item.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* SECTIE 3: Kwaliteit en uitvoering */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-6 lg:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
              <div>
                <h2 className="text-4xl lg:text-5xl text-[#0d3b2e] mb-6 leading-tight">
                  Veilig, duidelijk <span className="text-[#9ed42e]">en projectmatig</span>
                </h2>
                <p className="text-lg text-[#6c757d] leading-relaxed">
                  Huisaansluitingen vormen de laatste schakel tussen het laagspanningsnet en de eindgebruiker. TerreVolt voert aansluitwerkzaamheden gestructureerd uit, met aandacht voor veiligheid, planning en duidelijke communicatie.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {trust.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={item.title}
                      className="bg-[#f8f9fa] rounded-xl p-6 border border-gray-200 hover:border-[#9ed42e] transition-colors duration-300"
                    >
                      <div className="w-12 h-12 bg-[#0d3b2e] rounded-lg flex items-center justify-center mb-4">
                        <Icon className="w-6 h-6 text-[#9ed42e]" strokeWidth={2} />
                      </div>
                      <h3 className="text-base text-[#0d3b2e] mb-2">{item.title}</h3>
                      <p className="text-sm text-[#6c757d] leading-relaxed">{item.description}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section id="contact" className="py-24 bg-gradient-to-br from-[#0d3b2e] via-[#1a4a36] to-[#0d3b2e] relative overflow-hidden">
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

          <div className="container mx-auto px-6 lg:px-12 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-4xl lg:text-5xl text-white mb-6">
                Ondersteuning nodig bij <span className="text-[#9ed42e]">LS-aansluitwerk</span>?
              </h2>
              <p className="text-xl text-gray-300 mb-12 leading-relaxed">
                TerreVolt denkt mee over veilige, praktische en betrouwbare uitvoering.
              </p>
              <a
                href="mailto:info@terrevolt.nl"
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

export default Huisaansluitingen;
