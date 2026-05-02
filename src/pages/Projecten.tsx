import { ArrowRight, Cable, Building2, Anchor, ShieldCheck, GitMerge, Gauge, HardHat, Users, ShieldAlert, ClipboardCheck, Check } from "lucide-react";
import { Header } from "@/components/terrevolt/Header";
import { Footer } from "@/components/terrevolt/Footer";
import { usePageMeta } from "../hooks/usePageMeta";

const projecten = [
  {
    icon: Cable,
    label: "LS-Infrastructuur",
    title: "Laagspanningsrek vervangen",
    description: "Ondersteuning bij demontage, montage, kabelafwerking en oplevering van laagspanningsverdelingen.",
    bullets: ["LS-rek en afgaande velden", "Kabels opnieuw aansluiten", "Controle en oplevering"],
  },
  {
    icon: Building2,
    label: "Stationsrenovatie",
    title: "MS/LS-stationsrenovatie",
    description: "Uitvoering en ondersteuning bij renovatie van technische ruimten, schakelinstallaties, transformatoren en aarding.",
    bullets: ["MS-installatie en transformator", "LS-verdeling en kabelwerk", "Stationsaarding"],
  },
  {
    icon: Anchor,
    label: "Aarding",
    title: "Aardingsverbetering technische ruimte",
    description: "Inspectie, verbetering en meting van aardingsvoorzieningen voor veilige en betrouwbare installaties.",
    bullets: ["Aardelektroden plaatsen", "Aardverspreidingsweerstand meten", "Meetrapportage opleveren"],
  },
  {
    icon: ShieldCheck,
    label: "Schakelwerk",
    title: "Veiligstellen bij stationswerk",
    description: "Ondersteuning bij vrijschakelen, veiligstellen en terugschakelen tijdens LS/MS-werkzaamheden.",
    bullets: ["In- en uitbedrijf nemen", "Veilig werkgebied", "Afstemming met uitvoering"],
  },
  {
    icon: GitMerge,
    label: "Netmontage",
    title: "Kabelmontage LS/MS",
    description: "Kabelinvoer, afmontage, moffen en eindsluitingen binnen technische ruimten en netstructuren.",
    bullets: ["Kabelmontage", "Eindsluitingen", "Oplevercontrole"],
  },
  {
    icon: Gauge,
    label: "Metingen",
    title: "Oplevermetingen en rapportage",
    description: "Controlemetingen en duidelijke rapportage voor oplevering van aardings- en kabelwerk.",
    bullets: ["Controlemetingen", "Meetrapportage", "Opleverdossier"],
  },
];

const rollen = [
  { icon: HardHat, title: "Uitvoering", description: "Projectmatige uitvoering van LS/MS-werkzaamheden, stationsrenovaties en aarding." },
  { icon: Users, title: "Monteurs en ploegen", description: "Vakbekwame monteurs en complete ploegen, inzetbaar als verlengstuk van uw organisatie." },
  { icon: ShieldAlert, title: "Veiligheid", description: "Werken volgens BEI, NEN 3140, VCA en duidelijke projectafspraken." },
  { icon: ClipboardCheck, title: "Oplevering", description: "Controle, meet- en opleverrapportage voor een transparant en compleet dossier." },
];

const Projecten = () => {
  usePageMeta("Projecten | TerreVolt BV", "Projecttypes en praktijkvoorbeelden van TerreVolt binnen LS/MS-infrastructuur, stationsrenovatie, schakelwerk en aarding.");

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
                Projecten
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl text-white mb-6 leading-tight break-words">
                Projecttypes en<br />
                <span className="text-[#9ed42e]">praktijkvoorbeelden</span>
              </h1>
              <p className="text-lg sm:text-xl lg:text-2xl text-gray-300 mb-10 max-w-3xl leading-relaxed">
                TerreVolt ondersteunt opdrachtgevers bij LS/MS-netmontage, stationsrenovaties, schakelwerk, aardingsoplossingen en meetbare oplevering.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="/contact"
                  className="group bg-[#9ed42e] text-[#0d3b2e] px-8 py-4 rounded-lg hover:bg-[#8bc41f] transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <span>Project bespreken</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </a>
                <a
                  href="/diensten"
                  className="border-2 border-[#9ed42e] text-[#9ed42e] px-8 py-4 rounded-lg hover:bg-[#9ed42e] hover:text-[#0d3b2e] transition-all duration-300 text-center"
                >
                  Diensten bekijken
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* SECTIE 1: Projectcards */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-6 lg:px-12">
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl text-[#0d3b2e] mb-4">Voorbeelden uit de praktijk</h2>
              <p className="text-xl text-[#6c757d] max-w-3xl mx-auto leading-relaxed">
                Een doorsnede van projecttypes waarbinnen TerreVolt vakbekwame ondersteuning levert.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projecten.map((p) => {
                const Icon = p.icon;
                return (
                  <article
                    key={p.title}
                    className="group bg-white border border-gray-200 rounded-xl p-8 hover:border-[#9ed42e] hover:shadow-xl transition-all duration-300 flex flex-col"
                  >
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-12 h-12 bg-[#f0f7e6] rounded-lg flex items-center justify-center group-hover:bg-[#9ed42e] transition-colors duration-300">
                        <Icon className="w-6 h-6 text-[#0d3b2e] group-hover:text-white transition-colors duration-300" strokeWidth={2} />
                      </div>
                      <span className="text-xs tracking-wider uppercase text-[#0d3b2e] bg-[#f0f7e6] px-3 py-1 rounded-full">
                        {p.label}
                      </span>
                    </div>
                    <h3 className="text-xl text-[#0d3b2e] mb-3">{p.title}</h3>
                    <p className="text-[#6c757d] leading-relaxed mb-6">{p.description}</p>
                    <ul className="space-y-2 mt-auto pt-4 border-t border-gray-100">
                      {p.bullets.map((b) => (
                        <li key={b} className="flex items-start gap-2 text-sm text-[#0d3b2e]">
                          <Check className="w-4 h-4 text-[#9ed42e] mt-0.5 flex-shrink-0" strokeWidth={3} />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* SECTIE 2: Onze rol */}
        <section className="py-24 bg-[#f8f9fa]">
          <div className="container mx-auto px-6 lg:px-12">
            <div className="text-center mb-16">
              <div className="inline-block bg-[#0d3b2e] text-[#9ed42e] px-4 py-2 rounded-full text-sm mb-6 tracking-wider uppercase">
                Onze rol
              </div>
              <h2 className="text-4xl lg:text-5xl text-[#0d3b2e] mb-4">Onze rol binnen projecten</h2>
              <p className="text-xl text-[#6c757d] max-w-2xl mx-auto">
                TerreVolt is inzetbaar op de plek waar vakbekwame uitvoering nodig is.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {rollen.map((r) => {
                const Icon = r.icon;
                return (
                  <div
                    key={r.title}
                    className="group bg-white rounded-xl p-8 border border-gray-200 hover:border-[#9ed42e] hover:shadow-xl transition-all duration-300 text-center"
                  >
                    <div className="w-16 h-16 bg-gradient-to-br from-[#0d3b2e] to-[#1a4a36] rounded-xl flex items-center justify-center mx-auto mb-6">
                      <Icon className="w-8 h-8 text-[#9ed42e]" strokeWidth={2} />
                    </div>
                    <h3 className="text-xl text-[#0d3b2e] mb-3">{r.title}</h3>
                    <p className="text-[#6c757d] text-sm leading-relaxed">{r.description}</p>
                  </div>
                );
              })}
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
                Een project bespreken <span className="text-[#9ed42e]">met TerreVolt</span>?
              </h2>
              <p className="text-xl text-gray-300 mb-12 leading-relaxed">
                We denken graag mee over uitvoering, planning en oplevering.
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

export default Projecten;
