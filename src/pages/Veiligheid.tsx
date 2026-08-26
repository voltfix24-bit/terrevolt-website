import { ArrowRight, ShieldCheck, BadgeCheck, Award, BookOpen, FileSearch, Wrench, ClipboardList, HardHat, DoorOpen, FileText, Users, Briefcase, TrafficCone, AlertTriangle, CheckCircle2 } from "lucide-react";
import { Header } from "@/components/terrevolt/Header";
import { Footer } from "@/components/terrevolt/Footer";
import { StickySubnav } from "@/components/terrevolt/StickySubnav";
import { usePageMeta } from "../hooks/usePageMeta";
import { softHyphenate } from "@/lib/softHyphen";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const pijlers = [
  { icon: FileSearch, title: "LMRA bij elk werk", description: "Voor start of hervatting van werkzaamheden wordt de situatie gecontroleerd. Is de situatie gewijzigd, ontbreekt informatie of voelt iets niet veilig? Dan stoppen we, stemmen we af en starten pas wanneer het verantwoord kan." },
  { icon: ShieldCheck, title: "De vijf eisen bij spanningsloos werken", description: "Bij spanningsloos werken volgen we de vijf eisen uit de toepasselijke BEI, VWI en bedrijfsspecifieke procedures: scheiden, beveiligen tegen opnieuw inschakelen, spanningsloosheid vaststellen, aarden, kortsluiten en identificeren, en nabijgelegen actieve delen afschermen." },
  { icon: Wrench, title: "Netmontage volgens instructie", description: "Bij LS/MS-netmontage werken monteurs volgens opdracht, werkmethode, VWI's en projectafspraken waar van toepassing. Werkgrenzen, materialen en bevoegdheden moeten vooraf duidelijk zijn." },
  { icon: TrafficCone, title: "Werkplekveiligheid & zichtbaarheid", description: "Veiligheid stopt niet bij de installatie. Afzettingen, zichtbaarheid, looproutes, verlichting, PBM's, materieel, verkeer en andere partijen op locatie worden meegenomen in voorbereiding en LMRA." },
  { icon: ClipboardList, title: "Kwaliteit & aantoonbare oplevering", description: "Werkzaamheden worden gecontroleerd, teruggekoppeld en waar nodig vastgelegd. TerreVolt werkt met aandacht voor ISO 9001:2015-principes, duidelijke werkinstructies, rapportage en continue verbetering." },
];

const beiCards = [
  { icon: ShieldCheck, title: "BEI BLS/BHS", description: "Binnen elektriciteitsvoorzieningssystemen van netbeheerders werken we volgens de van kracht verklaarde BEI BLS/BHS, de toepasselijke VWI's en de bedrijfsspecifieke procedures. Bij industriële of andere installaties van derden bepaalt de opdrachtgever of beheerder welke veiligheidsregelgeving geldt. BEI BLS/BHS is daar niet automatisch van toepassing." },
  { icon: BookOpen, title: "VWI's", description: "Veiligheidswerkinstructies voor specifieke werkzaamheden, situaties en risico's." },
  { icon: BadgeCheck, title: "VCA", description: "Veiligheidsbewust werken met aandacht voor mens, installatie, omgeving en risico's." },
  { icon: BadgeCheck, title: "Certificaten & aanwijzingen", description: "Persoonlijke certificaten en aanwijzingen worden ingezet afhankelijk van project, opdrachtgever en werkgebied." },
  { icon: FileText, title: "NEN 3140 / NEN 3840 en NEN 1010", description: "NEN 3140 en NEN 3840 geven richting aan veilige bedrijfsvoering van laagspannings- en middenspanningsinstallaties. NEN 1010 geldt bij aanleg, uitbreiding en controle van laagspanningsinstallaties." },
  { icon: Award, title: "ISO 9001:2015", description: "Met aandacht voor de principes van ISO 9001:2015: procesbeheersing, klantgerichtheid, risicodenken en continue verbetering." },
];

const werkplek = [
  { icon: HardHat, title: "Zichtbaarheid", description: "Goed zichtbaar werken met passende kleding, verlichting en markering." },
  { icon: TrafficCone, title: "Afzettingen", description: "Werkgebied duidelijk afzetten en risico's voor monteurs, omgeving en verkeer beperken." },
  { icon: DoorOpen, title: "Looproutes & toegang", description: "Veilige toegang, looproutes en werkzones vooraf duidelijk maken." },
  { icon: AlertTriangle, title: "Verkeer & aanrijdgevaar", description: "Risico's van rijdend verkeer, bouwplaatsmaterieel en logistieke bewegingen meenemen in de LMRA." },
  { icon: ShieldCheck, title: "PBM's & materieel", description: "Passende persoonlijke beschermingsmiddelen, goedgekeurd gereedschap en geschikt materieel." },
  { icon: ClipboardList, title: "Orde en overzicht", description: "Een opgeruimde werkplek, duidelijke overdracht en heldere afstemming met andere partijen op locatie." },
];

const rollen = [
  { code: "WV", title: "Werkverantwoordelijke", description: "BEI-opdrachtgever en direct verantwoordelijk voor de leiding over en het veilige verloop van de uitvoerende activiteiten. De WV stelt werkplannen op of laat deze opstellen, is verantwoordelijk voor de inhoud en verstrekt de opdracht." },
  { code: "AVP", title: "Allround Vakbekwaam Persoon", description: "Voert binnen de eigen aanwijzing, opdracht en het toegewezen werkgebied bedieningshandelingen, werkzaamheden en bijbehorende veiligheidsmaatregelen uit. Een AVP kan per werk als ploegleider worden aangewezen." },
  { code: "VP", title: "Vakbekwaam Persoon", description: "Voert de werkzaamheden, handelingen en bijbehorende veiligheidsmaatregelen uit die binnen de specifieke aanwijzing en de toepasselijke VWI zijn toegestaan. Een VP kan als ploegleider worden aangewezen als de aanwijzing toereikend is voor het werk." },
  { code: "VOP", title: "Voldoend Onderricht Persoon", description: "Assisteert of voert uitsluitend de beperkte werkzaamheden en handelingen uit die binnen de eigen aanwijzing, opdracht en toepasselijke VWI zijn toegestaan." },
  { code: "PL", title: "Ploegleider", description: "Wordt per werk door de WV aangewezen uit een AVP of VP met een toereikende aanwijzing. De PL geeft leiding op de werkplek, instrueert de ploegleden en zorgt dat de veiligheidsmaatregelen tijdens het werk gehandhaafd blijven." },
];

const voorPlanning = [
  { icon: HardHat, title: "Voor de monteur", description: "Iedere monteur moet zijn werk veilig kunnen uitvoeren en aan het einde van de dag veilig naar huis." },
  { icon: Users, title: "Voor de ploeg", description: "Veilig werken betekent elkaar aanspreken, risico's melden en niet wegkijken bij twijfel." },
  { icon: Briefcase, title: "Voor de opdrachtgever", description: "Een veilige uitvoering vraagt om duidelijke voorbereiding, passende bevoegdheden en heldere communicatie." },
];

const faqs = [
  { q: "Geldt LMRA voor al het werk?", a: "Ja. Voor start of hervatting van werkzaamheden wordt gecontroleerd of de situatie nog klopt. Bij twijfel wordt afgestemd voordat er wordt doorgewerkt." },
  { q: "Wat zijn de vijf eisen bij spanningsloos werken?", a: "De vijf eisen zijn: scheiden, beveiligen tegen opnieuw inschakelen, spanningsloosheid vaststellen, aarden en kortsluiten waar voorgeschreven, en nabijgelegen actieve delen afschermen. Identificatie en de precieze uitvoering volgen uit de toepasselijke BEI en VWI." },
  { q: "Wordt er doorgewerkt als de planning onder druk staat?", a: "Nee. Planning, onderhoudsvensters en deadlines zijn belangrijk, maar niet belangrijker dan veilig werken. Als de situatie niet veilig is, wordt er gestopt en afgestemd." },
  { q: "Wat als een monteur een situatie onveilig vindt?", a: "Dan wordt er niet zomaar doorgewerkt. De situatie wordt gemeld, besproken en pas opgepakt als het verantwoord kan. We doen het veilig, of we doen het niet." },
  { q: "Wat betekent BEI BLS/BHS?", a: "BEI BLS regelt de veilige bedrijfsvoering in laagspanningssystemen van netbeheerders. BEI BHS geldt voor hoog- en middenspanningssystemen van netbeheerders. Voor TerreVolt betekent dit dat BEI-plichtige werkzaamheden uitsluitend worden uitgevoerd met de juiste aanwijzing, opdracht, VWI, werkgrenzen en bedrijfsspecifieke procedures." },
  { q: "Wat zijn VWI's?", a: "VWI's zijn veiligheidstechnische werkinstructies voor specifieke activiteiten. Ze beschrijven onder andere de minimale aanwijzing, opdrachtvorm, risico's, veiligheidsmaatregelen, benodigde middelen en veilige uitvoeringswijze. De toepasselijke VWI en bedrijfsspecifieke procedures moeten worden gevolgd." },
  { q: "Hoe kijkt TerreVolt naar werkplekveiligheid langs wegen?", a: "Bij werkzaamheden langs wegen of op projectlocaties kijken we naar zichtbaarheid, afzettingen, verkeersbewegingen, looproutes, toegang en andere partijen op locatie." },
  { q: "Wat krijgt een opdrachtgever terug na uitvoering?", a: "Afhankelijk van het werk leveren we controle, terugkoppeling, meetrapportage, fotoregistratie of opleverdocumentatie aan. Zo blijft het werk aantoonbaar en overdraagbaar." },
  { q: "Hoe borgt TerreVolt kwaliteit?", a: "Door duidelijke voorbereiding, passende werkinstructies, controle, terugkoppeling, rapportage waar nodig en aandacht voor ISO 9001:2015-principes zoals procesbeheersing en continue verbetering." },
  { q: "Werkt TerreVolt volgens netbeheerderseisen?", a: "TerreVolt sluit aan op projectafspraken, opdrachtgeverseisen en bedrijfsspecifieke procedures waar die van toepassing zijn." },
  
];

const Veiligheid = () => {
  usePageMeta("Veiligheid & kwaliteit | Iedereen veilig thuis | TerreVolt BV", "Veilig werken en aantoonbaar opleveren staan centraal bij TerreVolt. We werken met aandacht voor LMRA, BEI BLS/BHS, VWI's, VCA, NEN 3140/3840 en NEN 1010.", "/veiligheid");

  return (
    <div className="min-h-screen bg-[#f8f9fa]">
      <Header />

      <main id="main-content" className="pt-20 sm:pt-24">
        {/* HERO */}
        <section className="relative sm:min-h-[60vh] flex items-center overflow-hidden bg-gradient-to-br from-[#0d3b2e] via-[#1a4a36] to-[#0d3b2e] pt-12 pb-16 sm:py-20">
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
              <div className="inline-flex items-center bg-[#9ed42e] text-[#0d3b2e] px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm mb-5 sm:mb-6 tracking-[0.12em] uppercase font-semibold">
                Kwaliteit &amp; veiligheid
              </div>
              <h1 className="text-[2.4rem] sm:text-[clamp(2.5rem,7vw,3.75rem)] text-white mb-4 sm:mb-4 leading-[1.05] sm:leading-tight tracking-tight hyphens-nl text-pretty" lang="nl">
                Iedereen veilig <span className="text-[#9ed42e]">thuis.</span>
              </h1>
              <p className="text-xl sm:text-2xl font-semibold text-[#9ed42e] leading-snug mb-5 sm:mb-6">We doen het veilig, of we doen het niet.</p>
              <p className="text-base sm:text-xl lg:text-2xl font-medium text-white/90 mb-8 sm:mb-10 sm:max-w-xl leading-[1.7] sm:leading-[1.65] hyphens-nl text-pretty" lang="nl">
                Werken aan LS/MS-infrastructuur vraagt om vakmanschap, discipline en duidelijke afspraken. Voor TerreVolt is veiligheid geen formaliteit, maar de basis van elke opdracht: voor de monteur, de ploeg, de uitvoerende partij, de opdrachtgever en iedereen op locatie.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <a
                  href="#aanpak"
                  className="group w-full sm:w-auto bg-[#9ed42e] text-[#0d3b2e] px-6 sm:px-8 py-4 min-h-[56px] rounded-xl sm:rounded-lg font-semibold hover:bg-[#8bc41f] transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <span>Onze aanpak</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </a>
                <a
                  href="/contact#formulier"
                  className="w-full sm:w-auto border-2 border-[#9ed42e] bg-white/5 text-[#9ed42e] px-6 sm:px-8 py-4 min-h-[56px] rounded-xl sm:rounded-lg font-semibold hover:bg-[#9ed42e] hover:text-[#0d3b2e] transition-all duration-300 text-center flex items-center justify-center"
                >
                  Project veilig voorbereiden
                </a>
              </div>
            </div>
          </div>
        </section>


        {/* STICKY SUBNAV */}
        <StickySubnav
          ariaLabel="Paginanavigatie Veiligheid"
          items={[
            { label: "Filosofie", href: "#filosofie" },
            { label: "Aanpak", href: "#aanpak" },
            { label: "Praktijk", href: "#praktijk" },
            { label: "Vijf eisen", href: "#veilige-5" },
            { label: "Normen & kwaliteit", href: "#bei-vwi" },
            { label: "Werkplek", href: "#werkplek" },
            { label: "Locatie-eisen", href: "#locatie-eisen" },
            { label: "Rollen", href: "#rollen" },
            { label: "Bij twijfel", href: "#stoppen" },
            { label: "FAQ", href: "#faq" },
            { label: "Contact", href: "/contact#formulier" },
          ]}
        />

        {/* SECTIE: Veiligheid vóór planning */}
        <section id="filosofie" className="py-14 md:py-24 bg-white scroll-mt-[10rem] sm:scroll-mt-[11.5rem]">
          <div className="container mx-auto px-5 sm:px-6 lg:px-12">
            <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-14">
              <div className="inline-block bg-[#f0f7e6] text-[#0d3b2e] px-4 py-1.5 rounded-full text-xs sm:text-sm mb-4 tracking-wider uppercase">Onze houding</div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl text-[#0d3b2e] mb-6 hyphens-nl text-pretty" lang="nl">Veiligheid vóór planning</h2>
              <p className="text-base sm:text-lg text-[#6c757d] leading-relaxed hyphens-nl text-pretty" lang="nl">
                Geen onderhoudsvenster, deadline of projectdruk is belangrijker dan veilig werken. Als de werkplek, installatie, instructie of bevoegdheid niet klopt, wordt er niet zomaar doorgewerkt.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-6 max-w-5xl mx-auto">
              {voorPlanning.map((c) => {
                const Icon = c.icon;
                return (
                  <div key={c.title} className="bg-[#f8f9fa] border border-gray-200 rounded-xl p-6 sm:p-7 hover:border-[#9ed42e] hover:shadow-md transition-all duration-300">
                    <div className="w-12 h-12 bg-[#f0f7e6] rounded-lg flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-[#0d3b2e]" strokeWidth={2} />
                    </div>
                    <h3 className="text-lg text-[#0d3b2e] mb-2">{c.title}</h3>
                    <p className="text-[#6c757d] text-[15px] leading-[1.7] hyphens-nl text-pretty">{softHyphenate(c.description)}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* SECTIE: Veiligheid en kwaliteit in één aanpak */}
        <section id="aanpak" className="py-14 md:py-24 bg-[#f8f9fa] scroll-mt-[10rem] sm:scroll-mt-[11.5rem]">
          <div className="container mx-auto px-5 sm:px-6 lg:px-12">
            <div className="text-center mb-14 sm:mb-16 max-w-3xl mx-auto">
              <div className="inline-block bg-[#0d3b2e] text-[#9ed42e] px-4 py-1.5 rounded-full text-xs sm:text-sm mb-4 tracking-wider uppercase">5 pijlers</div>
              <h2 className="text-[clamp(1.75rem,6vw,3rem)] sm:text-4xl lg:text-5xl text-[#0d3b2e] mb-4 leading-[1.15] hyphens-nl text-pretty" lang="nl">Veiligheid en kwaliteit in één aanpak</h2>
              <p className="text-base sm:text-xl text-[#6c757d] leading-relaxed hyphens-nl text-pretty" lang="nl">
                {softHyphenate("Veilig werken en goed opleveren horen bij elkaar. TerreVolt kijkt naar voorbereiding, werkplek, bevoegdheden, uitvoering, controle en overdracht.")}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 max-w-6xl mx-auto">
              {pijlers.map((p, index) => {
                const Icon = p.icon;
                return (
                  <div
                    key={p.title}
                    className="relative bg-white rounded-xl p-6 border border-gray-200 hover:border-[#9ed42e] hover:shadow-xl transition-all duration-300 mt-6 sm:mt-0"
                  >
                    <div className="absolute -top-4 left-6 w-10 h-10 bg-[#0d3b2e] text-[#9ed42e] rounded-full flex items-center justify-center text-sm border-4 border-white">
                      {index + 1}
                    </div>
                    <div className="w-12 h-12 bg-[#f0f7e6] rounded-lg flex items-center justify-center mb-4 mt-2">
                      <Icon className="w-6 h-6 text-[#0d3b2e]" strokeWidth={2} />
                    </div>
                    <h3 className="text-base text-[#0d3b2e] mb-2 hyphens-nl text-pretty" lang="nl">{p.title}</h3>
                    <p className="text-[#6c757d] text-[15px] leading-[1.7] sm:text-sm sm:leading-relaxed hyphens-nl text-pretty" lang="nl">{softHyphenate(p.description)}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
        {/* SECTIE: Wat veiligheid en kwaliteit in de praktijk betekenen */}
        <section id="praktijk" className="py-14 md:py-24 bg-white scroll-mt-[10rem] sm:scroll-mt-[11.5rem]">
          <div className="container mx-auto px-5 sm:px-6 lg:px-12">
            <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-14">
              <div className="inline-block bg-[#f0f7e6] text-[#0d3b2e] px-4 py-1.5 rounded-full text-xs sm:text-sm mb-4 tracking-wider uppercase">In de praktijk</div>
              <h2 className="text-[clamp(1.75rem,6vw,3rem)] sm:text-4xl lg:text-5xl text-[#0d3b2e] mb-4 leading-[1.15] hyphens-nl text-pretty" lang="nl">Wat veiligheid en kwaliteit in de praktijk betekenen</h2>
              <p className="text-base sm:text-lg text-[#6c757d] leading-relaxed hyphens-nl text-pretty" lang="nl">
                {softHyphenate("Veiligheid en kwaliteit moeten zichtbaar zijn in het werk, niet alleen in woorden. Daarom maken we duidelijk wat monteurs en opdrachtgevers van TerreVolt mogen verwachten.")}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
              {[
                {
                  title: "Voor monteurs en ploegen",
                  icon: HardHat,
                  items: [
                    "Je mag en moet stoppen bij twijfel.",
                    "Voor start of hervatting doen we een LMRA.",
                    "Werkgrenzen, opdracht en bevoegdheden moeten duidelijk zijn.",
                    "Geen veilige werkplek betekent: niet starten.",
                    "Veiligheid gaat vóór planning, tempo of productiedruk.",
                  ],
                },
                {
                  title: "Voor opdrachtgevers",
                  icon: Briefcase,
                  items: [
                    "Vooraf afstemming over scope, toegang, werkmethode en bevoegdheden.",
                    "Binnen netbeheeromgevingen uitvoering volgens de toepasselijke BEI BLS/BHS, VWI's, opdrachten en bedrijfsspecifieke procedures.",
                    "Werkplekveiligheid inclusief afzetting, zichtbaarheid en omgevingsrisico's.",
                    "Controle, terugkoppeling en documentatie waar nodig.",
                    "Afwijkingen worden gemeld en afgestemd.",
                  ],
                },
              ].map((card) => {
                const Icon = card.icon;
                return (
                  <div key={card.title} className="bg-[#f8f9fa] border border-gray-200 rounded-xl p-6 sm:p-8 hover:border-[#9ed42e] hover:shadow-md transition-all duration-300">
                    <div className="flex items-center gap-3 mb-5">
                      <div className="w-12 h-12 bg-[#f0f7e6] rounded-lg flex items-center justify-center flex-shrink-0">
                        <Icon className="w-6 h-6 text-[#0d3b2e]" strokeWidth={2} />
                      </div>
                      <h3 className="text-lg sm:text-xl text-[#0d3b2e] hyphens-nl text-pretty" lang="nl">{card.title}</h3>
                    </div>
                    <ul className="space-y-3">
                      {card.items.map((item) => (
                        <li key={item} className="flex items-start gap-3 text-[#6c757d] text-[15px] leading-[1.6] hyphens-nl text-pretty" lang="nl">
                          <CheckCircle2 className="w-5 h-5 text-[#9ed42e] flex-shrink-0 mt-0.5" strokeWidth={2} />
                          <span>{softHyphenate(item)}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>

            <div className="max-w-3xl mx-auto mt-12 sm:mt-14 bg-[#0d3b2e] text-white rounded-2xl p-6 sm:p-8 border-l-4 border-[#9ed42e]">
              <div className="flex items-start gap-3 sm:gap-4">
                <AlertTriangle className="w-6 h-6 text-[#9ed42e] flex-shrink-0 mt-1" strokeWidth={2} />
                <div>
                  <h3 className="text-xl sm:text-2xl mb-2 text-white">Niet zeker? Niet starten.</h3>
                  <p className="text-[15px] sm:text-base text-white/85 leading-relaxed hyphens-nl text-pretty" lang="nl">
                    {softHyphenate("Een monteur die stopt bij twijfel doet precies wat wij verwachten. Veiligheid is geen vertraging van het werk; veiligheid is de voorwaarde om te mogen werken.")}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTIE: De vijf eisen bij spanningsloos werken */}
        <section id="veilige-5" className="py-14 md:py-24 bg-white scroll-mt-[10rem] sm:scroll-mt-[11.5rem]">
          <div className="container mx-auto px-5 sm:px-6 lg:px-12">
            <div className="max-w-3xl mx-auto text-center mb-14 sm:mb-16">
              <div className="inline-block bg-[#f0f7e6] text-[#0d3b2e] px-4 py-1.5 rounded-full text-xs sm:text-sm mb-4 tracking-wider uppercase">Spanningsloos werken</div>
              <h2 className="text-[clamp(1.75rem,6vw,3rem)] sm:text-4xl lg:text-5xl text-[#0d3b2e] mb-4 leading-[1.15] hyphens-nl text-pretty" lang="nl">De vijf eisen bij spanningsloos werken</h2>
              <p className="text-base sm:text-xl text-[#6c757d] leading-relaxed hyphens-nl text-pretty" lang="nl">
                {softHyphenate("Bij spanningsloos werken worden de vijf eisen uit de toepasselijke BEI, VWI en bedrijfsspecifieke procedures gevolgd.")}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 max-w-6xl mx-auto">
              {[
                { title: "Scheiden", description: "Het deel waaraan wordt gewerkt, wordt van de vereiste voedingsbronnen gescheiden." },
                { title: "Beveiligen tegen opnieuw inschakelen", description: "Er worden maatregelen getroffen om ongewenst inschakelen te voorkomen." },
                { title: "Spanningsloosheid vaststellen", description: "Volgens de toepasselijke instructie wordt vastgesteld dat het werkgebied spanningsloos is." },
                { title: "Aarden, kortsluiten en identificeren", description: "Dit wordt uitgevoerd waar en op de manier waarop de toepasselijke BEI en VWI dit voorschrijven." },
                { title: "Nabijgelegen actieve delen afschermen", description: "Actieve delen die elektrisch gevaar kunnen opleveren, worden deugdelijk afgeschermd." },
              ].map((step, index) => (
                <div
                  key={step.title}
                  className="relative bg-[#f8f9fa] rounded-xl p-6 border border-gray-200 hover:border-[#9ed42e] hover:shadow-xl transition-all duration-300 mt-6 sm:mt-0"
                >
                  <div className="absolute -top-4 left-6 w-10 h-10 bg-[#0d3b2e] text-[#9ed42e] rounded-full flex items-center justify-center text-sm border-4 border-white">
                    {index + 1}
                  </div>
                  <h3 className="text-base text-[#0d3b2e] mb-2 mt-2 hyphens-nl text-pretty" lang="nl">{step.title}</h3>
                  <p className="text-[#6c757d] text-[15px] leading-[1.7] sm:text-sm sm:leading-relaxed hyphens-nl text-pretty" lang="nl">
                    {softHyphenate(step.description)}
                  </p>
                </div>
              ))}
            </div>

            <p className="max-w-3xl mx-auto mt-8 text-center text-[15px] sm:text-base text-[#6c757d] leading-relaxed hyphens-nl text-pretty" lang="nl">
              {softHyphenate("Het afzetten en afbakenen van de werkplek blijft daarnaast een afzonderlijke werkplekmaatregel voor bescherming tegen verkeer, onbevoegden en andere omgevingsrisico's.")}
            </p>


            <div className="max-w-3xl mx-auto mt-12 sm:mt-14 bg-[#0d3b2e] text-white rounded-2xl p-6 sm:p-8 border-l-4 border-[#9ed42e]">
              <div className="flex items-start gap-3 sm:gap-4">
                <AlertTriangle className="w-6 h-6 text-[#9ed42e] flex-shrink-0 mt-1" strokeWidth={2} />
                <div>
                  <h3 className="text-xl sm:text-2xl mb-2 text-white">Niet zeker? Niet starten.</h3>
                  <p className="text-[15px] sm:text-base text-white/85 leading-relaxed hyphens-nl text-pretty" lang="nl">
                    {softHyphenate("Bij onduidelijke opdracht, ontbrekende aanwijzing, twijfel over de spanningstoestand of onveilige werkgrens wordt er niet doorgewerkt. Dan wordt afgestemd met de juiste verantwoordelijke.")}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTIE: BEI & VWI */}
        <section id="bei-vwi" className="py-14 md:py-24 bg-white scroll-mt-[10rem] sm:scroll-mt-[11.5rem]">
          <div className="container mx-auto px-5 sm:px-6 lg:px-12">
            <div className="max-w-3xl mx-auto text-center mb-14 sm:mb-16">
              <div className="inline-block bg-[#f0f7e6] text-[#0d3b2e] px-4 py-1.5 rounded-full text-xs sm:text-sm mb-4 tracking-wider uppercase">Normen & bevoegdheden</div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl text-[#0d3b2e] mb-4 hyphens-nl text-pretty" lang="nl">Normen, kwaliteitssystemen en bevoegdheden</h2>
              <p className="text-base sm:text-lg text-[#6c757d] leading-relaxed hyphens-nl text-pretty" lang="nl">
                {softHyphenate("Normen, certificaten en kwaliteitssystemen zijn geen doel op zichzelf. Ze helpen om veilig, beheerst en aantoonbaar te werken.")}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 max-w-6xl mx-auto">
              {beiCards.map((c) => {
                const Icon = c.icon;
                return (
                  <div key={c.title} className="bg-[#f8f9fa] border border-gray-200 rounded-xl p-6 hover:border-[#9ed42e] hover:shadow-md transition-all duration-300">
                    <div className="w-12 h-12 bg-[#f0f7e6] rounded-lg flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-[#0d3b2e]" strokeWidth={2} />
                    </div>
                    <h3 className="text-lg text-[#0d3b2e] mb-2">{c.title}</h3>
                    <p className="text-[#6c757d] text-[15px] leading-[1.7] hyphens-nl text-pretty">{softHyphenate(c.description)}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* SECTIE: Werkplekveiligheid */}
        <section id="werkplek" className="py-14 md:py-24 bg-[#f8f9fa] scroll-mt-[10rem] sm:scroll-mt-[11.5rem]">
          <div className="container mx-auto px-5 sm:px-6 lg:px-12">
            <div className="max-w-3xl mx-auto text-center mb-14 sm:mb-16">
              <div className="inline-block bg-[#f0f7e6] text-[#0d3b2e] px-4 py-1.5 rounded-full text-xs sm:text-sm mb-4 tracking-wider uppercase">Uitvoering</div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl text-[#0d3b2e] mb-4 hyphens-nl text-pretty" lang="nl">Veilig werken op elke projectlocatie</h2>
              <p className="text-base sm:text-lg text-[#6c757d] leading-relaxed hyphens-nl text-pretty" lang="nl">
                {softHyphenate("Veiligheid stopt niet bij de installatie. Ook zichtbaarheid, afzettingen, looproutes, verlichting, PBM's, materieel, verkeer en andere partijen op locatie tellen mee.")}
              </p>
            </div>

            <span id="locatie-eisen" aria-hidden="true" className="block scroll-mt-[10rem] sm:scroll-mt-[11.5rem]" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 max-w-6xl mx-auto">
              {werkplek.map((c) => {
                const Icon = c.icon;
                return (
                  <div key={c.title} className="bg-white border border-gray-200 rounded-xl p-6 hover:border-[#9ed42e] hover:shadow-md transition-all duration-300">
                    <div className="w-12 h-12 bg-[#f0f7e6] rounded-lg flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-[#0d3b2e]" strokeWidth={2} />
                    </div>
                    <h3 className="text-base sm:text-lg text-[#0d3b2e] mb-2">{c.title}</h3>
                    <p className="text-sm text-[#6c757d] leading-relaxed hyphens-nl text-pretty">{softHyphenate(c.description)}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* SECTIE: Rollen (donker) */}
        <section id="rollen" className="relative py-14 md:py-24 bg-[#0d3b2e] overflow-hidden scroll-mt-[10rem] sm:scroll-mt-[11.5rem]">
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
                Rollen &amp; bevoegdheden
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl text-white mb-4 hyphens-nl text-pretty">Duidelijkheid in rollen en aanwijzingen</h2>
              <p className="text-base sm:text-lg text-white/85 leading-relaxed hyphens-nl text-pretty">
                {softHyphenate("Veilig werken begint met weten wie waarvoor verantwoordelijk is. Aanwijzingen zijn persoonsgebonden en taakgericht en worden ingezet afhankelijk van werkzaamheden, werkgebied, project en netbeheerder.")}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 max-w-6xl mx-auto">
              {rollen.map((r) => (
                <div key={r.code} className="bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10 hover:border-[#9ed42e] transition-all duration-300">
                  <div className="inline-flex items-center justify-center min-w-[3rem] h-10 px-3 bg-[#9ed42e] text-[#0d3b2e] rounded-lg text-sm tracking-wider mb-4">
                    {r.code}
                  </div>
                  <h3 className="text-lg text-white mb-2">{r.title}</h3>
                  <p className="text-sm text-white/80 leading-relaxed hyphens-nl text-pretty">{softHyphenate(r.description)}</p>
                </div>
              ))}
            </div>
            <p className="text-center text-xs sm:text-sm text-white/70 mt-10 max-w-2xl mx-auto">
              De projectorganisatie verzorgt scope, planning, toegang en projectvoorwaarden. Dit is geen BEI-aanwijzing en verandert niets aan de verantwoordelijkheden van de aangewezen WV en uitvoerende medewerkers.
            </p>
          </div>
        </section>

        {/* SECTIE: Statement */}
        <section id="stoppen" className="relative py-20 md:py-28 bg-[#f8f9fa] overflow-hidden scroll-mt-[10rem] sm:scroll-mt-[11.5rem]">
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center select-none">
            <span className="text-[18vw] sm:text-[14vw] lg:text-[12rem] font-bold tracking-tight text-[#0d3b2e]/[0.04] uppercase whitespace-nowrap">
              Veilig werken
            </span>
          </div>
          <div className="container mx-auto px-5 sm:px-6 lg:px-12 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-[clamp(1.875rem,7vw,3rem)] sm:text-4xl lg:text-5xl text-[#0d3b2e] mb-6 hyphens-nl text-pretty leading-tight" lang="nl">Als het niet klopt, stoppen we.</h2>
              <p className="text-base sm:text-lg text-[#6c757d] leading-relaxed hyphens-nl text-pretty" lang="nl">
                {softHyphenate("Een onduidelijke opdracht, ontbrekende aanwijzing, onveilige afzetting, twijfel over de spanningstoestand, onduidelijke overdracht of ongeschikte werkplek is reden om te stoppen en af te stemmen. Veiligheid is geen vertraging van het werk; veiligheid is de voorwaarde om te mogen werken.")}
              </p>
              <p className="mt-8 text-xl sm:text-2xl text-[#0d3b2e] italic">
                &ldquo;We doen het veilig, of we doen het niet.&rdquo;
              </p>
            </div>
          </div>
        </section>

        {/* SECTIE: FAQ */}
        <section id="faq" className="py-16 md:py-24 bg-white scroll-mt-[10rem] sm:scroll-mt-[11.5rem]">
          <div className="container mx-auto px-5 sm:px-6 lg:px-12">
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-10 sm:mb-12">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl text-[#0d3b2e] mb-4 hyphens-nl text-pretty">Veelgestelde vragen over veilig werken</h2>
              </div>

              <Accordion type="single" collapsible className="bg-[#f8f9fa] rounded-xl border border-gray-200 divide-y divide-gray-200">
                {faqs.map((f, i) => (
                  <AccordionItem key={i} value={`faq-${i}`} className="border-b-0 px-4 sm:px-6">
                    <AccordionTrigger className="text-left font-semibold text-[#0d3b2e] hover:no-underline py-4 sm:py-5 text-[15px] sm:text-lg leading-[1.4] hyphens-nl text-pretty rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9ed42e] focus-visible:ring-offset-2 focus-visible:ring-offset-white" lang="nl">
                      {softHyphenate(f.q)}
                    </AccordionTrigger>
                    <AccordionContent className="text-[#475560] text-[15px] sm:text-base leading-[1.75] sm:leading-relaxed pb-5 hyphens-nl text-pretty max-w-prose" lang="nl">
                      {softHyphenate(f.a)}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>

        {/* SECTIE: Korte CTA na FAQ */}
        <section aria-label="Direct contact" className="py-12 md:py-16 bg-[#f8f9fa] border-t border-gray-200">
          <div className="container mx-auto px-5 sm:px-6 lg:px-12">
            <div className="max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row md:items-center md:justify-between gap-5 shadow-sm">
              <div className="md:max-w-xl">
                <h3 className="text-xl sm:text-2xl text-[#0d3b2e] mb-2 hyphens-nl text-pretty" lang="nl">
                  Vraag, project of twijfel over veilig werken?
                </h3>
                <p className="text-[15px] sm:text-base text-[#4a5560] leading-relaxed hyphens-nl text-pretty" lang="nl">
                  Monteurs en opdrachtgevers kunnen direct schakelen met TerreVolt voor afstemming, planning of een veiligheidsvraag.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 md:flex-shrink-0">
                <a
                  href="/contact#formulier"
                  className="inline-flex items-center justify-center gap-2 bg-[#9ed42e] text-[#0d3b2e] px-6 py-3 min-h-[48px] rounded-lg hover:bg-[#8bc41f] transition-colors text-sm sm:text-base font-medium"
                >
                  Neem contact op
                  <ArrowRight className="w-4 h-4" />
                </a>
                <a
                  href="/contact#formulier"
                  className="inline-flex items-center justify-center border-2 border-[#0d3b2e] text-[#0d3b2e] px-6 py-3 min-h-[48px] rounded-lg hover:bg-[#0d3b2e] hover:text-white transition-colors text-sm sm:text-base font-medium"
                >
                  Project veilig voorbereiden
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section id="contact" className="py-16 md:py-24 bg-gradient-to-br from-[#0d3b2e] via-[#1a4a36] to-[#0d3b2e] relative overflow-hidden scroll-mt-[10rem] sm:scroll-mt-[11.5rem]">
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
              <h2 className="text-3xl sm:text-4xl lg:text-5xl text-white mb-6 hyphens-nl text-pretty">
                Een LS/MS-project <span className="text-[#9ed42e]">veilig voorbereiden</span>?
              </h2>
              <p className="text-base sm:text-xl text-white/85 mb-10 leading-relaxed hyphens-nl text-pretty">
                Neem contact op met TerreVolt voor projectmatige ondersteuning waarbij veiligheid, vakmanschap en duidelijke afspraken centraal staan.
              </p>
              <a
                href="/contact#formulier"
                className="inline-flex items-center justify-center gap-2 w-full sm:w-auto bg-[#9ed42e] text-[#0d3b2e] px-8 sm:px-10 py-4 min-h-[56px] rounded-xl sm:rounded-lg font-semibold hover:bg-[#8bc41f] transition-all duration-300 text-base sm:text-lg"
                style={{ marginBottom: "env(safe-area-inset-bottom)" }}
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
