import { ArrowRight, CheckCircle2, ShieldCheck, BadgeCheck, Award, BookOpen, FileSearch, MessageSquare, Lock, Wrench, ClipboardList, HardHat } from "lucide-react";
import { Header } from "@/components/terrevolt/Header";
import { Footer } from "@/components/terrevolt/Footer";
import { usePageMeta } from "../hooks/usePageMeta";

const veiligwerken = [
  { icon: FileSearch, title: "LMRA", description: "Last Minute Risk Analysis vóór elke werkstart op locatie." },
  { icon: Wrench, title: "Toolboxen", description: "Periodieke toolboxen voor kennisdeling en veiligheidsbewustzijn." },
  { icon: HardHat, title: "Werkplekinrichting", description: "Veilige inrichting van werkplek, afzetting en signalering." },
  { icon: CheckCircle2, title: "Oplevercontrole", description: "Gestructureerde controle vóór terugschakelen en oplevering." },
];

const certs = [
  { icon: ShieldCheck, title: "BEI BLS/BHS", description: "Aanwijzingen en veiligheidsstructuur voor werkzaamheden binnen laag- en middenspanning." },
  { icon: BadgeCheck, title: "AVP / VP / VOP / WV", description: "Passende rollen en bevoegdheden afhankelijk van project, opdrachtgever en werkgebied." },
  { icon: Award, title: "VCA", description: "Veiligheidsbewust werken met aandacht voor mens, installatie en omgeving." },
  { icon: BookOpen, title: "NEN 1010 / NEN 3140", description: "Werken met aandacht voor geldende installatie- en veiligheidsnormen." },
];

const stappen = [
  { icon: FileSearch, title: "Voorbereiden", description: "Risico's, werkmethode en benodigdheden in kaart brengen." },
  { icon: MessageSquare, title: "Afstemmen", description: "Korte lijnen met opdrachtgever, werkverantwoordelijke en ploeg." },
  { icon: Lock, title: "Veiligstellen", description: "Vrijschakelen, vergrendelen en aarden volgens geldende procedures." },
  { icon: Wrench, title: "Uitvoeren", description: "Vakbekwame uitvoering binnen het veilig werkgebied." },
  { icon: ClipboardList, title: "Controleren en opleveren", description: "Controle, meting en heldere oplevering aan opdrachtgever." },
];

const Veiligheid = () => {
  usePageMeta("Veiligheid & certificeringen | TerreVolt BV", "Veiligheid, bevoegdheden en normen bij TerreVolt: BEI BLS/BHS, AVP/VP/VOP/WV, VCA en NEN 1010 / NEN 3140.", "/veiligheid");

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
                Veiligheid
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl text-white mb-6 leading-tight hyphens-nl">
                Veiligheid, certificeringen<br />
                <span className="text-[#9ed42e]">& normen</span>
              </h1>
              <p className="text-lg sm:text-xl lg:text-2xl text-gray-300 mb-10 max-w-3xl leading-relaxed">
                Werken aan elektrotechnische infrastructuur vraagt om vakbekwaamheid, veiligheidsbewustzijn en duidelijke procedures. TerreVolt werkt met aandacht voor geldende normen, aanwijzingen en projectafspraken.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="/contact"
                  className="group bg-[#9ed42e] text-[#0d3b2e] px-8 py-4 min-h-[54px] rounded-lg hover:bg-[#8bc41f] transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <span>Veiligheidsaanpak bespreken</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </a>
                <a
                  href="#veilig-werken"
                  className="border-2 border-[#9ed42e] text-[#9ed42e] px-8 py-4 min-h-[54px] rounded-lg hover:bg-[#9ed42e] hover:text-[#0d3b2e] transition-all duration-300 text-center flex items-center justify-center"
                >
                  Onze aanpak
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* SECTIE 1: Veilig werken */}
        <section id="veilig-werken" className="py-16 md:py-24 bg-white scroll-mt-24">
          <div className="container mx-auto px-5 sm:px-6 lg:px-12">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl text-[#0d3b2e] mb-6">Veiligheid in voorbereiding, uitvoering en oplevering</h2>
              <p className="text-lg text-[#6c757d] leading-relaxed">
                Binnen LS/MS-infrastructuur is er geen ruimte voor onduidelijkheid. TerreVolt werkt gestructureerd, met aandacht voor risico's, bevoegdheden, werkafspraken en veilige uitvoering.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {veiligwerken.map((item) => {
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

        {/* SECTIE 2: Certificeringen */}
        <section className="py-16 md:py-24 bg-[#f8f9fa]">
          <div className="container mx-auto px-5 sm:px-6 lg:px-12">
            <div className="text-center mb-16">
              <div className="inline-block bg-[#0d3b2e] text-[#9ed42e] px-4 py-2 rounded-full text-sm mb-6 tracking-wider uppercase">
                Certificeringen
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl text-[#0d3b2e] mb-4">Bevoegdheden en normen</h2>
              <p className="text-xl text-[#6c757d] max-w-2xl mx-auto">
                Werken volgens de structuren die binnen de netbeheerwereld vanzelfsprekend zijn.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
              {certs.map((c) => {
                const Icon = c.icon;
                return (
                  <div
                    key={c.title}
                    className="group bg-white rounded-xl p-8 border border-gray-200 hover:border-[#9ed42e] hover:shadow-xl transition-all duration-300 flex gap-6"
                  >
                    <div className="w-16 h-16 bg-gradient-to-br from-[#0d3b2e] to-[#1a4a36] rounded-xl flex items-center justify-center flex-shrink-0">
                      <Icon className="w-8 h-8 text-[#9ed42e]" strokeWidth={2} />
                    </div>
                    <div>
                      <h3 className="text-xl text-[#0d3b2e] mb-2">{c.title}</h3>
                      <p className="text-[#6c757d] leading-relaxed">{c.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* SECTIE 3: Veiligheidsaanpak */}
        <section className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-5 sm:px-6 lg:px-12">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl text-[#0d3b2e] mb-4">Onze veiligheidsaanpak</h2>
              <p className="text-xl text-[#6c757d] max-w-2xl mx-auto">
                Vijf stappen die de basis vormen voor elke uitvoering.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 max-w-6xl mx-auto relative">
              <div className="hidden lg:block absolute top-12 left-[10%] right-[10%] h-px bg-gradient-to-r from-[#9ed42e]/0 via-[#9ed42e] to-[#9ed42e]/0" aria-hidden="true" />

              {stappen.map((step, index) => {
                const Icon = step.icon;
                return (
                  <div
                    key={step.title}
                    className="relative bg-[#f8f9fa] rounded-xl p-6 border border-gray-200 hover:border-[#9ed42e] hover:shadow-xl transition-all duration-300 text-center"
                  >
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-10 h-10 bg-[#0d3b2e] text-[#9ed42e] rounded-full flex items-center justify-center text-sm border-4 border-white">
                      {index + 1}
                    </div>
                    <div className="w-14 h-14 bg-gradient-to-br from-[#0d3b2e] to-[#1a4a36] rounded-xl flex items-center justify-center mx-auto mb-4 mt-2">
                      <Icon className="w-7 h-7 text-[#9ed42e]" strokeWidth={2} />
                    </div>
                    <h3 className="text-base text-[#0d3b2e] mb-2">{step.title}</h3>
                    <p className="text-[#6c757d] text-sm leading-relaxed">{step.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

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
                Meer weten over onze <span className="text-[#9ed42e]">veiligheidsaanpak</span>?
              </h2>
              <p className="text-xl text-gray-300 mb-12 leading-relaxed">
                We vertellen graag hoe wij veiligheid borgen binnen LS/MS-projecten.
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

export default Veiligheid;
