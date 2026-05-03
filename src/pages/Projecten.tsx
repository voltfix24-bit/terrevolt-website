import { ArrowRight, Cable, Building2, ShieldCheck, FileBarChart, HardHat, Users, ShieldAlert, ClipboardCheck, Check } from "lucide-react";
import { Link } from "react-router-dom";
import { Header } from "@/components/terrevolt/Header";
import { Footer } from "@/components/terrevolt/Footer";
import { usePageMeta } from "../hooks/usePageMeta";
import { EarthSymbol } from "@/components/icons/EarthSymbol";

const projecten = [
  {
    icon: Cable,
    label: "LS-Infrastructuur",
    tag: "Uitvoering & oplevering",
    title: "Vervanging laagspanningsrek bij verdeelstation",
    situation: "Een verouderd LS-rek moet worden vervangen binnen een gepland onderhoudsvenster met minimale hinder voor de omgeving.",
    approach: "TerreVolt ondersteunt bij demontage, montage en kabelafwerking van het nieuwe LS-rek inclusief afgaande velden, in afstemming met de werkverantwoordelijke van de opdrachtgever.",
    result: "Een gecontroleerde oplevering met duidelijke terugkoppeling, controle en waar nodig opleverdocumentatie.",
    bullets: ["LS-rek en afgaande velden", "Kabels opnieuw aansluiten", "Controle en oplevering"],
    rol: ["Uitvoering", "Oplevering"],
    serviceHref: "/diensten/ls-ms-netmontage",
  },
  {
    icon: Building2,
    label: "Stationsrenovatie",
    tag: "Renovatie & aarding",
    title: "Renovatie MS/LS-station of transformatorruimte",
    situation: "Een technische ruimte of station moet worden aangepast, vernieuwd of voorbereid op nieuwe installaties.",
    approach: "TerreVolt ondersteunt bij MS-installatie, LS-verdeling, kabelmontage en stationsaarding. Schakelwerk en veiligstelling vinden plaats volgens geldende projectafspraken.",
    result: "Een veilige, overzichtelijke en oplevergerichte renovatie met aandacht voor aarding, kabelwerk en documentatie.",
    bullets: ["MS-installatie en schakelwerk", "Stationsaarding", "Opleverdossier"],
    rol: ["Uitvoering", "Aarding", "Rapportage"],
    serviceHref: "/diensten/stationsrenovatie",
  },
  {
    icon: EarthSymbol,
    label: "Aarding",
    tag: "Meting & rapportage",
    title: "Aardingsverbetering technische ruimte",
    situation: "Een bestaande aardingsvoorziening moet worden gecontroleerd, verbeterd of meetbaar worden opgeleverd.",
    approach: "TerreVolt inspecteert het bestaande aardingssysteem, plaatst waar nodig aanvullende aardelektroden en voert metingen en potentiaalvereffening uit.",
    result: "Een aantoonbaar verbeterde aardingsvoorziening met duidelijke meetrapportage en opleverdocumentatie.",
    bullets: ["Inspectie en verbetering aarding", "Meting aardverspreidingsweerstand", "Opleverdocumentatie"],
    rol: ["Uitvoering", "Meting", "Rapportage"],
    serviceHref: "/diensten/aardingsoplossingen",
  },
  {
    icon: ShieldCheck,
    label: "Schakelwerk",
    tag: "Veiligstellen",
    title: "Vrijschakelen en veiligstellen bij stationswerk",
    situation: "Bij stationswerk of kabelwerk moet een installatie veilig worden vrijgeschakeld voordat werkzaamheden kunnen starten.",
    approach: "TerreVolt ondersteunt bij vrijschakelen, vergrendelen, veiligstellen en terugschakelen in afstemming met de werkverantwoordelijke en uitvoerende partijen.",
    result: "Een veilig werkgebied en duidelijke overdracht voor uitvoering en oplevering.",
    bullets: ["Vrijschakelen", "Veilig werkgebied", "Terugschakelen en oplevering"],
    rol: ["Schakelwerk", "Veiligstellen"],
    serviceHref: "/diensten/schakelwerk",
  },
  {
    icon: Cable,
    label: "Netmontage",
    tag: "Kabelmontage",
    title: "MS-kabelmontage bij transformatorstation",
    situation: "Bij nieuwbouw, renovatie of uitbreiding van een station moeten kabels worden ingevoerd, afgemonteerd en gecontroleerd.",
    approach: "TerreVolt ondersteunt bij kabelinvoer, moffen en eindsluitingen in technische ruimten, afgestemd op projecttekeningen en uitvoeringsafspraken.",
    result: "Correct afgemonteerde kabels, gereed voor controle, beproeving of inbedrijfstelling.",
    bullets: ["Kabelinvoer en afmontage", "Moffen en eindsluitingen", "Oplevercontrole"],
    rol: ["Uitvoering", "Oplevering"],
    serviceHref: "/diensten/ls-ms-netmontage",
  },
  {
    icon: FileBarChart,
    label: "Metingen",
    tag: "Aardingsmetingen",
    title: "Oplevermetingen na stationswerkzaamheden",
    situation: "Na werkzaamheden aan stations, kabels of aarding moeten metingen worden uitgevoerd en vastgelegd voor het opleverdossier.",
    approach: "TerreVolt voert controlemetingen uit, waaronder aardingsmetingen en vastlegging van meetresultaten in een duidelijke rapportage.",
    result: "Meetgegevens en rapportage die bruikbaar zijn voor opdrachtgever, beheerder of projectdossier.",
    bullets: ["Controlemetingen", "Aardverspreidingsweerstand", "Opleverdossier"],
    rol: ["Meting", "Rapportage"],
    serviceHref: "/diensten/meten-en-beproeven",
  },
];

const rollen = [
  { icon: HardHat, title: "Uitvoering", description: "Projectmatige uitvoering van LS/MS-werkzaamheden, stationsrenovaties en aarding." },
  { icon: Users, title: "Monteurs en ploegen", description: "Vakbekwame monteurs en complete ploegen, inzetbaar als verlengstuk van uw organisatie." },
  { icon: ShieldAlert, title: "Veiligheid", description: "Werken volgens BEI, NEN 3140, VCA en duidelijke projectafspraken." },
  { icon: ClipboardCheck, title: "Oplevering", description: "Controle, meet- en opleverrapportage voor een transparant en compleet dossier." },
];

const Projecten = () => {
  usePageMeta("Projecten | LS/MS-infrastructuur en stationsrenovatie | TerreVolt BV", "Projecttypes en praktijkvoorbeelden van TerreVolt binnen LS/MS-infrastructuur, stationsrenovatie, schakelwerk en aarding.", "/projecten");

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
                Projecten
              </div>
              <h1 className="text-[clamp(1.875rem,7vw,2.625rem)] sm:text-5xl lg:text-6xl text-white mb-6 leading-[1.1] sm:leading-tight hyphens-nl text-pretty">
                Projecttypes waarin<br />
                <span className="text-[#9ed42e]">TerreVolt ondersteunt</span>
              </h1>
              <p className="text-lg sm:text-xl lg:text-2xl text-white/85 mb-10 max-w-3xl leading-relaxed">
                Een overzicht van werkzaamheden waarbij TerreVolt inzetbaar is voor professionele opdrachtgevers binnen LS/MS-infrastructuur, stationswerk, schakelwerk, aarding en metingen.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="/contact"
                  className="group bg-[#9ed42e] text-[#0d3b2e] px-8 py-4 min-h-[54px] rounded-lg hover:bg-[#8bc41f] transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <span>Project bespreken</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </a>
                <a
                  href="/diensten"
                  className="border-2 border-[#9ed42e] text-[#9ed42e] px-8 py-4 min-h-[54px] rounded-lg hover:bg-[#9ed42e] hover:text-[#0d3b2e] transition-all duration-300 text-center flex items-center justify-center"
                >
                  Diensten bekijken
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* SECTIE 1: Projectcards */}
        <section className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-5 sm:px-6 lg:px-12">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl text-[#0d3b2e] mb-4">Projecttypes uit de praktijk</h2>
              <p className="text-xl text-[#6c757d] max-w-3xl mx-auto leading-relaxed">
                Een doorsnede van werkzaamheden waarbinnen TerreVolt vakbekwame ondersteuning levert — geen klantnamen, wel concrete projectinzet.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projecten.map((p) => {
                const Icon = p.icon;
                return (
                  <Link
                    key={p.title}
                    to={p.serviceHref}
                    aria-label={`Bekijk dienst voor ${p.title}`}
                    className="group bg-white border border-gray-200 rounded-xl p-8 hover:border-[#9ed42e] hover:shadow-xl transition-all duration-300 flex flex-col focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9ed42e] focus-visible:ring-offset-2 active:scale-[0.99]"
                  >
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-12 h-12 bg-[#f0f7e6] rounded-lg flex items-center justify-center group-hover:bg-[#9ed42e] transition-colors duration-300">
                        <Icon className="w-6 h-6 text-[#0d3b2e] group-hover:text-white transition-colors duration-300" strokeWidth={2} />
                      </div>
                      <span className="text-xs tracking-wider uppercase text-[#0d3b2e] bg-[#f0f7e6] px-3 py-1 rounded-full">
                        {p.label}
                      </span>
                    </div>
                    <h3 className="text-xl text-[#0d3b2e] mb-4">{p.title}</h3>

                    <div>
                      <div className="text-[#6c757d] text-xs uppercase tracking-wider mb-1">Situatie</div>
                      <p className="text-[#2d3436] text-sm leading-relaxed">{p.situation}</p>
                    </div>
                    <div className="border-t border-gray-100 pt-3 mt-3">
                      <div className="text-[#6c757d] text-xs uppercase tracking-wider mb-1">Aanpak</div>
                      <p className="text-[#2d3436] text-sm leading-relaxed">{p.approach}</p>
                    </div>
                    <div className="border-t border-gray-100 pt-3 mt-3">
                      <div className="text-[#9ed42e] text-xs uppercase tracking-wider mb-1">Resultaat</div>
                      <p className="text-[#0d3b2e] text-sm leading-relaxed">{p.result}</p>
                    </div>

                    <ul className="space-y-2 pt-4 mt-4 border-t border-gray-100">
                      {p.bullets.map((b) => (
                        <li key={b} className="flex items-start gap-2 text-sm text-[#0d3b2e]">
                          <Check className="w-4 h-4 text-[#9ed42e] mt-0.5 flex-shrink-0" strokeWidth={3} />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-auto pt-5">
                      <div className="text-[11px] uppercase tracking-wider text-[#6c757d] mb-2">Onze rol</div>
                      <div className="flex flex-wrap gap-1.5">
                        {p.rol.map((r) => (
                          <span key={r} className="inline-block text-[11px] tracking-wider uppercase text-[#0d3b2e] bg-[#f0f7e6] border border-[#9ed42e]/40 rounded-full px-2.5 py-1">
                            {r}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="mt-4 text-xs text-[#9ed42e] inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                      Bekijk dienst <ArrowRight className="w-3 h-3" />
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* SECTIE 2: Onze rol */}
        <section className="py-16 md:py-24 bg-[#f8f9fa]">
          <div className="container mx-auto px-5 sm:px-6 lg:px-12">
            <div className="text-center mb-16">
              <div className="inline-block bg-[#0d3b2e] text-[#9ed42e] px-4 py-2 rounded-full text-sm mb-6 tracking-wider uppercase">
                Onze rol
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl text-[#0d3b2e] mb-4">Onze rol binnen projecten</h2>
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
                Een project bespreken <span className="text-[#9ed42e]">met TerreVolt</span>?
              </h2>
              <p className="text-xl text-white/85 mb-12 leading-relaxed">
                We denken graag mee over uitvoering, planning en oplevering.
              </p>
              <a
                href="/contact"
                className="inline-block bg-[#9ed42e] text-[#0d3b2e] px-10 py-4 rounded-lg hover:bg-[#8bc41f] transition-all duration-300 text-lg"
              >
                Project bespreken
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
