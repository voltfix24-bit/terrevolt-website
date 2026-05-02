import { ArrowRight, CheckCircle2, ShieldCheck, BadgeCheck, Award, BookOpen, FileSearch, MessageSquare, Lock, Wrench, ClipboardList, HardHat, KeyRound, DoorOpen, FileText, Building2 } from "lucide-react";
import { Header } from "@/components/terrevolt/Header";
import { Footer } from "@/components/terrevolt/Footer";
import { usePageMeta } from "../hooks/usePageMeta";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const stappen = [
  { icon: FileSearch, title: "Voorbereiden", description: "Scope, locatie, werkmethode, risico's, bevoegdheden en projectafspraken worden vooraf helder gemaakt." },
  { icon: MessageSquare, title: "Afstemmen", description: "We stemmen af met opdrachtgever, uitvoerder, werkverantwoordelijke en betrokken partijen over toegang, schakelingen, instructies en planning." },
  { icon: Lock, title: "Veiligstellen", description: "Werkgebied, installatie en werkzaamheden worden volgens de juiste procedures veiliggesteld. Bij twijfel wordt niet gestart." },
  { icon: Wrench, title: "Uitvoeren", description: "Monteurs werken volgens instructie, LMRA, VCA, BEI/VWI en projectafspraken waar van toepassing." },
  { icon: ClipboardList, title: "Controleren", description: "Werkzaamheden worden gecontroleerd, teruggekoppeld en waar nodig aantoonbaar vastgelegd." },
];

const veiligwerken = [
  { icon: FileSearch, title: "LMRA", description: "Voor start van werkzaamheden wordt de situatie gecontroleerd. Zijn omstandigheden gewijzigd, ontbreekt informatie of voelt iets niet veilig? Dan wordt er afgestemd voordat er wordt doorgewerkt.", label: "Laatste minuut risicoanalyse" },
  { icon: MessageSquare, title: "Toolboxen & kennisdeling", description: "Veiligheid vraagt om herhaling en bewustzijn. Toolboxen en kennisdeling helpen om risico's, projectafspraken en werkinstructies actief onder de aandacht te houden.", label: "Veiligheid als gedrag" },
  { icon: HardHat, title: "Werkplekinrichting", description: "Een veilige werkplek vraagt om duidelijke afzetting, orde, verlichting, passend materieel en afspraken met andere partijen op locatie.", label: "Veilige werkplek" },
  { icon: CheckCircle2, title: "Oplevercontrole", description: "Na uitvoering volgt controle, terugkoppeling en waar nodig meetrapportage of opleverdocumentatie. Veilig werken stopt niet bij de laatste handeling.", label: "Controle en vastlegging" },
];

const certs = [
  { icon: ShieldCheck, title: "BEI", subtitle: "BLS / BHS", description: "Branche-regels voor veilige bedrijfsvoering in laagspannings-, middenspannings- en hoogspanningssystemen van netbeheerders." },
  { icon: BadgeCheck, title: "Rollen", subtitle: "WV / AVP / VP / VOP", description: "Passende rollen en aanwijzingen afhankelijk van project, opdrachtgever, werkgebied en werkzaamheden." },
  { icon: Award, title: "VWI's & LMRA", subtitle: "Werkinstructies", description: "Veiligheidswerkinstructies en laatste-minuut-risicoanalyse helpen om werkzaamheden bewust en beheerst uit te voeren." },
  { icon: BookOpen, title: "NEN", subtitle: "1010 / 3140 / 3840", description: "NEN-normen geven, waar van toepassing, richting aan veilig werken, bedrijfsvoering, aanleg, controle en oplevering." },
];

const locatie = [
  { icon: DoorOpen, title: "Poortinstructies", description: "Voor toegang tot stations, bouwplaatsen of technische locaties kunnen instructies en toetsing verplicht zijn." },
  { icon: Building2, title: "Bedrijfsspecifieke procedures", description: "Netbeheerders en opdrachtgevers kunnen aanvullende procedures of supplementen hanteren." },
  { icon: KeyRound, title: "Toegang & sleutelbeheer", description: "Toegang tot technische ruimten, stations en terreinen vraagt om duidelijke afspraken en bevoegdheden." },
  { icon: FileText, title: "Werkvergunningen & overdracht", description: "Een veilige start vraagt om juiste vrijgave, instructie, overdracht en afstemming met betrokken partijen." },
];

const faqs = [
  { q: "Wat betekent BEI BLS/BHS?", a: "BEI-BLS gaat over laagspanning; BEI-BHS over hoog- en middenspanning binnen de elektriciteitsvoorzieningssystemen van netbeheerders. Voor TerreVolt betekent dit dat werkzaamheden worden voorbereid en uitgevoerd met aandacht voor de juiste rollen, aanwijzingen en instructies." },
  { q: "Wat zijn VWI's?", a: "VWI's zijn veiligheidswerkinstructies voor specifieke werkzaamheden. Ze geven richting aan hoe werkzaamheden veilig uitgevoerd moeten worden binnen de BEI-structuur." },
  { q: "Werkt TerreVolt volgens netbeheerderseisen?", a: "TerreVolt sluit aan op projectafspraken, opdrachtgeverseisen en bedrijfsspecifieke procedures waar die van toepassing zijn." },
  { q: "Wat als een situatie niet veilig voelt?", a: "Dan wordt er niet zomaar doorgewerkt. Veiligheid gaat voor. De situatie wordt gemeld, afgestemd en pas opgepakt als het verantwoord kan. We doen het veilig, of we doen het niet." },
  { q: "Is VCA verplicht?", a: "Voor veel projecten is VCA belangrijk of vereist. Per project wordt gekeken welke certificaten, aanwijzingen en bevoegdheden nodig zijn." },
  { q: "Wie is verantwoordelijk voor veilig werken?", a: "Iedereen heeft een rol: opdrachtgever, werkverantwoordelijke, uitvoerder, monteur en ploeg. TerreVolt verwacht dat iedereen onveilige situaties meldt, elkaar aanspreekt en niet wegkijkt." },
];

const Veiligheid = () => {
  usePageMeta("Veiligheid & certificeringen | TerreVolt BV", "Veiligheid, bevoegdheden en normen bij TerreVolt: BEI BLS/BHS, WV/AVP/VP/VOP, VWI's, LMRA, VCA en NEN 1010 / 3140 / 3840.", "/veiligheid");

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
                Kwaliteit &amp; veiligheid
              </div>
              <h1 className="text-[clamp(1.75rem,7vw,3.75rem)] text-white mb-6 leading-tight hyphens-nl">
                We doen het veilig,<br />
                <span className="text-[#9ed42e]">of we doen het niet.</span>
              </h1>
              <p className="text-base sm:text-xl lg:text-2xl text-gray-300 mb-10 max-w-3xl leading-relaxed">
                Werken aan LS/MS-infrastructuur vraagt om vakmanschap, discipline en het lef om te stoppen wanneer iets niet veilig voelt. Voor TerreVolt is veiligheid geen formaliteit, maar de basis van elke opdracht: voor de monteur, de ploeg, de uitvoerende partij en iedereen op locatie.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="#veiligheidsaanpak"
                  className="group bg-[#9ed42e] text-[#0d3b2e] px-8 py-4 min-h-[54px] rounded-lg hover:bg-[#8bc41f] transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <span>Onze veiligheidsaanpak</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </a>
                <a
                  href="/contact"
                  className="border-2 border-[#9ed42e] text-[#9ed42e] px-8 py-4 min-h-[54px] rounded-lg hover:bg-[#9ed42e] hover:text-[#0d3b2e] transition-all duration-300 text-center flex items-center justify-center"
                >
                  Project veilig voorbereiden
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* SECTIE: Veiligheidsaanpak (5 stappen) */}
        <section id="veiligheidsaanpak" className="py-16 md:py-24 bg-white scroll-mt-24">
          <div className="container mx-auto px-5 sm:px-6 lg:px-12">
            <div className="text-center mb-14 sm:mb-16">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl text-[#0d3b2e] mb-4">Onze veiligheidsaanpak</h2>
              <p className="text-base sm:text-xl text-[#6c757d] max-w-2xl mx-auto leading-relaxed">
                Een veilige uitvoering begint vóór de eerste handeling. TerreVolt werkt met een gestructureerde aanpak van voorbereiding tot oplevering.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 max-w-6xl mx-auto relative">
              <div className="hidden lg:block absolute top-12 left-[10%] right-[10%] h-px bg-gradient-to-r from-[#9ed42e]/0 via-[#9ed42e] to-[#9ed42e]/0" aria-hidden="true" />
              {stappen.map((step, index) => {
                const Icon = step.icon;
                return (
                  <div
                    key={step.title}
                    className="relative bg-[#f8f9fa] rounded-xl p-6 border border-gray-200 hover:border-[#9ed42e] hover:shadow-xl transition-all duration-300 text-center mt-6 sm:mt-0"
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

        {/* SECTIE: Voorbereiding, uitvoering en oplevering (4 cards) */}
        <section className="py-16 md:py-24 bg-[#f8f9fa]">
          <div className="container mx-auto px-5 sm:px-6 lg:px-12">
            <div className="max-w-3xl mx-auto text-center mb-14 sm:mb-16">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl text-[#0d3b2e] mb-6 hyphens-nl">Veiligheid in voorbereiding, uitvoering en oplevering</h2>
              <p className="text-base sm:text-lg text-[#6c757d] leading-relaxed">
                Veilig werken ontstaat niet vanzelf. Het vraagt om voorbereiding, duidelijke afspraken, vakbekwaamheid en de ruimte om te stoppen wanneer de situatie daarom vraagt.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {veiligwerken.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.title}
                    className="group bg-white border border-gray-200 rounded-xl p-7 sm:p-8 hover:border-[#9ed42e] hover:shadow-xl transition-all duration-300 flex flex-col"
                  >
                    <div className="w-14 h-14 bg-[#f0f7e6] rounded-lg flex items-center justify-center mb-6 group-hover:bg-[#9ed42e] transition-colors duration-300">
                      <Icon className="w-7 h-7 text-[#0d3b2e] group-hover:text-white transition-colors duration-300" strokeWidth={2} />
                    </div>
                    <h3 className="text-xl text-[#0d3b2e] mb-3">{item.title}</h3>
                    <p className="text-[#6c757d] leading-relaxed flex-1">{item.description}</p>
                    <span className="mt-5 inline-block self-start text-[10px] uppercase tracking-wider text-[#0d3b2e] bg-[#f0f7e6] border border-[#9ed42e]/40 rounded-full px-3 py-1">
                      {item.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* SECTIE: Bevoegdheden, rollen en normen (donker) */}
        <section className="relative py-16 md:py-24 bg-[#0d3b2e] overflow-hidden">
          <div className="absolute inset-0 opacity-[0.05]">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `
                  linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)
                `,
                backgroundSize: "60px 60px",
              }}
            />
          </div>
          <div className="container mx-auto px-5 sm:px-6 lg:px-12 relative z-10">
            <div className="max-w-3xl mx-auto text-center mb-14 sm:mb-16">
              <div className="inline-block bg-[#9ed42e] text-[#0d3b2e] px-4 py-2 rounded-full text-sm mb-6 tracking-wider uppercase">
                Bevoegdheden &amp; normen
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl text-white mb-4 hyphens-nl">Bevoegdheden, rollen en normen</h2>
              <p className="text-base sm:text-lg text-gray-300 leading-relaxed">
                Veilig werken binnen de netbeheerwereld vraagt om duidelijkheid in rollen, aanwijzingen en procedures. TerreVolt sluit aan op de veiligheidsstructuur, projectafspraken en bedrijfsspecifieke eisen van opdrachtgever of netbeheerder waar van toepassing.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 max-w-6xl mx-auto">
              {certs.map((c) => {
                const Icon = c.icon;
                return (
                  <div
                    key={c.title}
                    className="bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10 hover:border-[#9ed42e] transition-all duration-300"
                  >
                    <div className="w-14 h-14 bg-[#9ed42e] rounded-xl flex items-center justify-center mb-5">
                      <Icon className="w-7 h-7 text-[#0d3b2e]" strokeWidth={2} />
                    </div>
                    <h3 className="text-lg text-white mb-1">{c.title}</h3>
                    <div className="text-xs uppercase tracking-wider text-[#9ed42e] mb-3">{c.subtitle}</div>
                    <p className="text-sm text-gray-300 leading-relaxed">{c.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* SECTIE: Projectafspraken en locatie-eisen */}
        <section className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-5 sm:px-6 lg:px-12">
            <div className="max-w-3xl mx-auto text-center mb-14 sm:mb-16">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl text-[#0d3b2e] mb-4 hyphens-nl">Projectafspraken en locatie-eisen</h2>
              <p className="text-base sm:text-lg text-[#6c757d] leading-relaxed">
                Naast branche-regels kunnen per opdrachtgever of netbeheerder aanvullende afspraken gelden. Denk aan bedrijfsspecifieke procedures, poortinstructies, toegangseisen, sleutelprocedures, werkvergunningen en locatie-instructies.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 max-w-6xl mx-auto">
              {locatie.map((c) => {
                const Icon = c.icon;
                return (
                  <div
                    key={c.title}
                    className="bg-[#f8f9fa] border border-gray-200 rounded-xl p-6 hover:border-[#9ed42e] hover:shadow-md transition-all duration-300"
                  >
                    <div className="w-12 h-12 bg-[#f0f7e6] rounded-lg flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-[#0d3b2e]" strokeWidth={2} />
                    </div>
                    <h3 className="text-base sm:text-lg text-[#0d3b2e] mb-2">{c.title}</h3>
                    <p className="text-sm text-[#6c757d] leading-relaxed">{c.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* SECTIE: Statement */}
        <section className="relative py-20 md:py-28 bg-[#f8f9fa] overflow-hidden">
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center select-none">
            <span className="text-[18vw] sm:text-[14vw] lg:text-[12rem] font-bold tracking-tight text-[#0d3b2e]/[0.04] uppercase whitespace-nowrap">
              Safety first
            </span>
          </div>
          <div className="container mx-auto px-5 sm:px-6 lg:px-12 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl text-[#0d3b2e] mb-6 hyphens-nl">Iedereen veilig thuis. Altijd.</h2>
              <p className="text-base sm:text-lg text-[#6c757d] leading-relaxed">
                Geen planning, onderhoudsvenster of commercieel belang is belangrijker dan de veiligheid van mensen. Veiligheid zit in voorbereiding, in gedrag, in elkaar aanspreken en in de beslissing om te stoppen wanneer iets niet klopt.
              </p>
              <p className="mt-8 text-xl sm:text-2xl text-[#0d3b2e] italic">
                &ldquo;We doen het veilig, of we doen het niet.&rdquo;
              </p>
            </div>
          </div>
        </section>

        {/* SECTIE: FAQ */}
        <section className="py-16 md:py-24 bg-[#f8f9fa]">
          <div className="container mx-auto px-5 sm:px-6 lg:px-12">
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-10 sm:mb-12">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl text-[#0d3b2e] mb-4 hyphens-nl">Veelgestelde vragen over veilig werken</h2>
              </div>

              <Accordion type="single" collapsible className="bg-white rounded-xl border border-gray-200 divide-y divide-gray-200">
                {faqs.map((f, i) => (
                  <AccordionItem key={i} value={`faq-${i}`} className="border-b-0 px-5 sm:px-6">
                    <AccordionTrigger className="text-left text-[#0d3b2e] hover:no-underline py-5 text-base sm:text-lg">
                      {f.q}
                    </AccordionTrigger>
                    <AccordionContent className="text-[#6c757d] leading-relaxed text-sm sm:text-base pb-5">
                      {f.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
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
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl text-white mb-6 hyphens-nl">
                Een LS/MS-project <span className="text-[#9ed42e]">veilig voorbereiden</span>?
              </h2>
              <p className="text-base sm:text-xl text-gray-300 mb-10 leading-relaxed">
                Neem contact op met TerreVolt voor projectmatige ondersteuning waarbij veiligheid, vakmanschap en duidelijke afspraken centraal staan.
              </p>
              <a
                href="/contact"
                className="inline-flex items-center justify-center gap-2 w-full sm:w-auto bg-[#9ed42e] text-[#0d3b2e] px-10 py-4 min-h-[54px] rounded-lg hover:bg-[#8bc41f] transition-all duration-300 text-lg"
              >
                Project bespreken
                <ArrowRight className="w-5 h-5" />
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
