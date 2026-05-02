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
  { icon: FileSearch, title: "Voorbereiden", description: "Scope, locatie, werkmethode, risico's, bevoegdheden en projectafspraken worden vooraf, met aandacht voor de specifieke situatie, helder gemaakt." },
  { icon: MessageSquare, title: "Afstemmen", description: "We stemmen, waar van toepassing, af met opdrachtgever, uitvoerder, werkverantwoordelijke en betrokken partijen over toegang, schakelingen, instructies en planning." },
  { icon: Lock, title: "Veiligstellen", description: "Werkgebied, installatie en werkzaamheden worden volgens de geldende procedures en projectafspraken veiliggesteld. Bij twijfel wordt niet gestart." },
  { icon: Wrench, title: "Uitvoeren", description: "Monteurs werken met aandacht voor instructie, LMRA, VCA, BEI/VWI en projectafspraken, waar van toepassing." },
  { icon: ClipboardList, title: "Controleren", description: "Werkzaamheden worden gecontroleerd, teruggekoppeld en, waar nodig of vereist, aantoonbaar vastgelegd volgens projectafspraken." },
];

const veiligwerken = [
  { icon: FileSearch, title: "LMRA", description: "Voor start van werkzaamheden wordt de situatie, met aandacht voor gewijzigde omstandigheden, gecontroleerd. Ontbreekt informatie of voelt iets niet veilig? Dan wordt er afgestemd voordat er wordt doorgewerkt.", label: "Laatste minuut risicoanalyse" },
  { icon: MessageSquare, title: "Toolboxen & kennisdeling", description: "Veiligheid vraagt om herhaling en bewustzijn. Toolboxen en kennisdeling helpen om risico's, projectafspraken en werkinstructies, waar van toepassing, actief onder de aandacht te houden.", label: "Veiligheid als gedrag" },
  { icon: HardHat, title: "Werkplekinrichting", description: "Een veilige werkplek vraagt, afhankelijk van de situatie, om duidelijke afzetting, orde, verlichting, passend materieel en afspraken met andere partijen op locatie.", label: "Veilige werkplek" },
  { icon: CheckCircle2, title: "Oplevercontrole", description: "Na uitvoering volgt controle, terugkoppeling en, waar nodig of vereist, meetrapportage of opleverdocumentatie volgens projectafspraken. Veilig werken stopt niet bij de laatste handeling.", label: "Controle en vastlegging" },
];

const certs = [
  { icon: ShieldCheck, title: "BEI", subtitle: "BLS / BHS", description: "Branche-regels voor veilige bedrijfsvoering in laagspannings-, middenspannings- en hoogspanningssystemen van netbeheerders, toegepast waar van toepassing." },
  { icon: BadgeCheck, title: "Rollen", subtitle: "WV / AVP / VP / VOP", description: "Passende rollen en aanwijzingen, afhankelijk van project, opdrachtgever, werkgebied en werkzaamheden." },
  { icon: Award, title: "VWI's & LMRA", subtitle: "Werkinstructies", description: "Veiligheidswerkinstructies en laatste-minuut-risicoanalyse helpen om werkzaamheden, met aandacht voor de situatie, bewust en beheerst uit te voeren." },
  { icon: BookOpen, title: "NEN", subtitle: "1010 / 3140 / 3840", description: "NEN-normen geven, waar van toepassing, richting aan veilig werken, bedrijfsvoering, aanleg, controle en oplevering." },
];

const locatie = [
  { icon: DoorOpen, title: "Poortinstructies", description: "Voor toegang tot stations, bouwplaatsen of technische locaties kunnen, afhankelijk van de locatie, instructies en toetsing verplicht zijn." },
  { icon: Building2, title: "Bedrijfsspecifieke procedures", description: "Netbeheerders en opdrachtgevers kunnen aanvullende procedures of supplementen hanteren; we sluiten daarop aan waar van toepassing." },
  { icon: KeyRound, title: "Toegang & sleutelbeheer", description: "Toegang tot technische ruimten, stations en terreinen vraagt, afhankelijk van de locatie, om duidelijke afspraken en bevoegdheden." },
  { icon: FileText, title: "Werkvergunningen & overdracht", description: "Een veilige start vraagt, waar van toepassing, om juiste vrijgave, instructie, overdracht en afstemming met betrokken partijen." },
];

const faqs = [
  { q: "Wat betekent BEI BLS/BHS?", a: "BEI-BLS is de Bedrijfsvoering van Elektrische Installaties voor laagspanning, BEI-BHS voor hoog- en middenspanning binnen de elektriciteitsvoorzieningssystemen van netbeheerders. De norm legt vast welke aanwijzingen (WV, AVP, VP, VOP), procedures en instructies kunnen gelden bij werkzaamheden aan of nabij elektrische installaties. TerreVolt werkt met aandacht voor deze structuur en stemt rollen, bevoegdheden en werkmethodes per project af op de geldende BEI-versie en de eisen van de netbeheerder, waar van toepassing." },
  { q: "Wat zijn VWI's?", a: "VWI's zijn Veiligheidswerkinstructies: gestandaardiseerde werkbeschrijvingen die binnen de BEI-systematiek richting geven aan hoe een specifieke handeling (zoals schakelen, spanningsloos maken, meten of beproeven) veilig kan worden uitgevoerd. Ze beschrijven, waar van toepassing, de voorbereiding, benodigde PBM's, rolverdeling en controlepunten. TerreVolt gebruikt de VWI die hoort bij de werkzaamheid en de installatie, en wijkt daar volgens projectafspraken niet zonder afstemming van af." },
  { q: "Werkt TerreVolt volgens netbeheerderseisen?", a: "Ja, waar van toepassing. Per opdracht stemmen we af welke netbeheerder-specifieke procedures, poortinstructies, aanwijsbeleid en kwaliteitseisen gelden. Denk aan eisen rond toegang tot stations, registratie van schakelhandelingen, gebruik van vergrendelingen, oplevering en aantoonbaarheid. We sluiten met aandacht aan op het BEI-regime en de aanvullende bedrijfsvoorschriften van de betreffende netbeheerder of opdrachtgever, volgens projectafspraken." },
  { q: "Wat als een situatie niet veilig voelt?", a: "Dan wordt er in principe gestopt. Iedere monteur, uitvoerder of betrokkene heeft, binnen zijn rol, het recht én de verantwoordelijkheid om werk stil te leggen bij twijfel. De situatie wordt gemeld bij de werkverantwoordelijke en/of opdrachtgever, opnieuw beoordeeld via een LMRA en pas hervat als dat verantwoord en aantoonbaar veilig kan. We doen het veilig, of we doen het niet — geen project zou belangrijker moeten zijn dan iemand veilig thuis." },
  { q: "Is VCA verplicht?", a: "VCA is wettelijk niet altijd verplicht, maar wordt door veel netbeheerders, hoofdaannemers en industriële opdrachtgevers contractueel geëist voor werk aan elektrische infrastructuur. TerreVolt zorgt dat medewerkers en ingehuurde ZZP'ers, waar van toepassing, beschikken over een geldig VCA-certificaat (Basis of VOL), naast de specifieke BEI-aanwijzingen, NEN 3140/3840-instructies en eventuele aanvullende opleidingen die het project volgens projectafspraken vraagt." },
  { q: "Wie is verantwoordelijk voor veilig werken?", a: "Veiligheid is een gedeelde verantwoordelijkheid binnen een duidelijke rolverdeling. De Installatieverantwoordelijke (IV) en Werkverantwoordelijke (WV) zijn, waar aangewezen, formeel verantwoordelijk voor de installatie en het werk. De AVP/VP bereidt voor en geeft opdracht, de VOP voert uit binnen zijn bevoegdheid. Daarnaast hebben opdrachtgever, uitvoerder en iedere monteur, met aandacht voor hun rol, de verantwoordelijkheid om risico's te signaleren, een LMRA uit te voeren, elkaar aan te spreken en niet weg te kijken. Bij TerreVolt streven we ernaar dat iedereen verantwoordelijkheid pakt en dat niemand er alleen voor staat." },
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
                Werken aan LS/MS-infrastructuur vraagt om vakmanschap, discipline en het lef om te stoppen wanneer iets niet veilig voelt. Voor TerreVolt is veiligheid geen formaliteit, maar — waar van toepassing — een uitgangspunt van elke opdracht: voor de monteur, de ploeg, de uitvoerende partij en iedereen op locatie.
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

        {/* STICKY SUBNAV */}
        <nav
          aria-label="Paginanavigatie Veiligheid"
          className="sticky top-16 sm:top-20 z-30 bg-white/90 backdrop-blur-sm border-b border-gray-200"
        >
          <div className="container mx-auto px-4 sm:px-6 lg:px-12">
            <ul className="flex gap-1 sm:gap-2 overflow-x-auto scrollbar-hide -mx-1 px-1 py-2">
              {[
                { label: "Aanpak", href: "#veiligheidsaanpak" },
                { label: "BEI & VWI", href: "#bei-vwi" },
                { label: "Rollen", href: "#rollen" },
                { label: "Locatie-eisen", href: "#locatie-eisen" },
                { label: "FAQ", href: "#faq" },
                { label: "Contact", href: "#contact" },
              ].map((item) => (
                <li key={item.href} className="flex-shrink-0">
                  <a
                    href={item.href}
                    className="inline-flex items-center min-h-[40px] px-3 sm:px-4 rounded-full text-sm text-[#0d3b2e] hover:bg-[#f0f7e6] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9ed42e] focus-visible:ring-offset-1 border border-transparent hover:border-[#9ed42e] transition-colors whitespace-nowrap"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </nav>

        {/* SECTIE: Veiligheidsaanpak (5 stappen) */}
        <section id="veiligheidsaanpak" className="py-16 md:py-24 bg-white scroll-mt-32">
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
        <section id="bei-vwi" className="relative py-16 md:py-24 bg-[#0d3b2e] overflow-hidden scroll-mt-32">
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

            <div id="rollen" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 max-w-6xl mx-auto scroll-mt-32">
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
        <section id="locatie-eisen" className="py-16 md:py-24 bg-white scroll-mt-32">
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
        <section id="faq" className="py-16 md:py-24 bg-[#f8f9fa] scroll-mt-32">
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
        <section id="contact" className="py-16 md:py-24 bg-gradient-to-br from-[#0d3b2e] via-[#1a4a36] to-[#0d3b2e] relative overflow-hidden scroll-mt-32">
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
