import { useEffect, useRef } from "react";
import { ArrowRight, ShieldCheck, BadgeCheck, Award, BookOpen, FileSearch, Wrench, ClipboardList, HardHat, DoorOpen, FileText, Users, Briefcase, TrafficCone, AlertTriangle } from "lucide-react";
import { Header } from "@/components/terrevolt/Header";
import { Footer } from "@/components/terrevolt/Footer";
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
  { icon: ShieldCheck, title: "De Veilige 5 bij schakelwerk", description: "Bij schakelwerk werken we met aandacht voor de Veilige 5: scheiden, beveiligen tegen wederinschakelen, controleren op afwezigheid van spanning, aarden en kortsluiten, en afschermen of afbakenen." },
  { icon: Wrench, title: "Netmontage volgens instructie", description: "Bij LS/MS-netmontage werken monteurs volgens opdracht, werkmethode, VWI's en projectafspraken waar van toepassing. Werkgrenzen, materialen en bevoegdheden moeten vooraf duidelijk zijn." },
  { icon: TrafficCone, title: "Werkplekveiligheid & zichtbaarheid", description: "Veiligheid stopt niet bij de installatie. Afzettingen, zichtbaarheid, looproutes, verlichting, PBM's, materieel, verkeer en andere partijen op locatie worden meegenomen in voorbereiding en LMRA." },
  { icon: ClipboardList, title: "Kwaliteit & aantoonbare oplevering", description: "Werkzaamheden worden gecontroleerd, teruggekoppeld en waar nodig vastgelegd. TerreVolt werkt met aandacht voor ISO 9001:2015-principes, duidelijke werkinstructies, rapportage en continue verbetering." },
];

const beiCards = [
  { icon: ShieldCheck, title: "BEI BLS/BHS", description: "Veilige bedrijfsvoering binnen LS/MS/HS-netbeheeromgevingen, inclusief bijbehorende VWI's en projectafspraken." },
  { icon: BookOpen, title: "VWI's", description: "Veiligheidswerkinstructies voor specifieke werkzaamheden, situaties en risico's." },
  { icon: BadgeCheck, title: "VCA", description: "Veiligheidsbewust werken met aandacht voor mens, installatie, omgeving en risico's." },
  { icon: FileSearch, title: "LMRA", description: "Laatste-minuut-risicoanalyse voor start of hervatting van werkzaamheden, bij twijfel altijd opnieuw." },
  { icon: FileText, title: "NEN 1010 / 3140 / 3840", description: "Normen die, waar van toepassing, richting geven aan aanleg, bedrijfsvoering, controle en veilig werken." },
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
  { code: "WV", title: "Werkverantwoordelijke", description: "Verantwoordelijk voor de veilige uitvoering van werkzaamheden, afhankelijk van project en opdrachtgever." },
  { code: "AVP", title: "Allround Vakbekwaam Persoon", description: "Bereidt werkzaamheden voor en geeft opdracht binnen passende aanwijzingen, volgens projectafspraken." },
  { code: "VP", title: "Vakbekwaam Persoon", description: "Voert werkzaamheden uit binnen de toegekende bevoegdheid en de geldende werkinstructies." },
  { code: "VOP", title: "Voldoende Onderricht Persoon", description: "Voert begrensde handelingen uit volgens duidelijke instructie en onder verantwoordelijkheid." },
  { code: "Ploeg", title: "Monteur / ploeg", description: "Voert het werk uit, doet LMRA, spreekt elkaar aan en stopt bij twijfel — volgens projectafspraken." },
  { code: "OG", title: "Uitvoerder / opdrachtgever", description: "Zorgt voor heldere scope, toegang, vrijgave en randvoorwaarden, afhankelijk van project en locatie." },
];

const voorPlanning = [
  { icon: HardHat, title: "Voor de monteur", description: "Iedere monteur moet zijn werk veilig kunnen uitvoeren en aan het einde van de dag veilig naar huis." },
  { icon: Users, title: "Voor de ploeg", description: "Veilig werken betekent elkaar aanspreken, risico's melden en niet wegkijken bij twijfel." },
  { icon: Briefcase, title: "Voor de opdrachtgever", description: "Een veilige uitvoering vraagt om duidelijke voorbereiding, passende bevoegdheden en heldere communicatie." },
];

const faqs = [
  { q: "Geldt LMRA voor al het werk?", a: "Ja. Voor start of hervatting van werkzaamheden wordt gecontroleerd of de situatie nog klopt. Bij twijfel wordt afgestemd voordat er wordt doorgewerkt." },
  { q: "Wat is de Veilige 5 bij schakelwerk?", a: "De Veilige 5 beschrijft de basisstappen om veilig te kunnen werken: scheiden, beveiligen tegen wederinschakelen, controleren op afwezigheid van spanning, aarden en kortsluiten, en afschermen of afbakenen." },
  { q: "Wat betekent BEI BLS/BHS?", a: "BEI-BLS gaat over laagspanning; BEI-BHS over hoog- en middenspanning binnen de elektriciteitsvoorzieningssystemen van netbeheerders. Voor TerreVolt betekent dit dat werkzaamheden worden voorbereid en uitgevoerd met aandacht voor de juiste rollen, aanwijzingen en instructies." },
  { q: "Wat zijn VWI's?", a: "VWI's zijn veiligheidswerkinstructies voor specifieke werkzaamheden. Ze geven richting aan hoe werkzaamheden veilig uitgevoerd moeten worden binnen de BEI-structuur." },
  { q: "Hoe kijkt TerreVolt naar werkplekveiligheid langs wegen?", a: "Bij werkzaamheden langs wegen of op projectlocaties kijken we naar zichtbaarheid, afzettingen, verkeersbewegingen, looproutes, toegang en andere partijen op locatie." },
  { q: "Hoe borgt TerreVolt kwaliteit?", a: "Door duidelijke voorbereiding, passende werkinstructies, controle, terugkoppeling, rapportage waar nodig en aandacht voor ISO 9001:2015-principes zoals procesbeheersing en continue verbetering." },
  { q: "Werkt TerreVolt volgens netbeheerderseisen?", a: "TerreVolt sluit aan op projectafspraken, opdrachtgeverseisen en bedrijfsspecifieke procedures waar die van toepassing zijn." },
  { q: "Wat als een situatie niet veilig voelt?", a: "Dan wordt er niet zomaar doorgewerkt. Veiligheid gaat voor. De situatie wordt gemeld, afgestemd en pas opgepakt als het verantwoord kan. We doen het veilig, of we doen het niet." },
];

const Veiligheid = () => {
  usePageMeta("Kwaliteit & veiligheid | TerreVolt BV", "Veiligheid bij TerreVolt: BEI BLS/BHS, VWI's, LMRA, VCA, NEN 1010/3140/3840, projectafspraken en rollen — iedereen veilig thuis.", "/veiligheid");

  const subnavRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const getOffset = () => {
      const header = document.querySelector("header");
      const headerH = header ? header.getBoundingClientRect().height : 0;
      const subnavH = subnavRef.current ? subnavRef.current.getBoundingClientRect().height : 0;
      return Math.round(headerH + subnavH + 12);
    };

    const scrollToHash = (hash: string, behavior: ScrollBehavior = "smooth") => {
      if (!hash || hash === "#") return false;
      const id = decodeURIComponent(hash.slice(1));
      const el = document.getElementById(id);
      if (!el) return false;
      const rect = el.getBoundingClientRect();
      const top = rect.top + window.scrollY - getOffset();
      const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      window.scrollTo({ top, behavior: prefersReduced ? "auto" : behavior });
      const prevTabIndex = el.getAttribute("tabindex");
      if (prevTabIndex === null) el.setAttribute("tabindex", "-1");
      (el as HTMLElement).focus({ preventScroll: true });
      if (prevTabIndex === null) {
        setTimeout(() => el.removeAttribute("tabindex"), 0);
      }
      return true;
    };

    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const target = (e.target as HTMLElement | null)?.closest('a[href^="#"]') as HTMLAnchorElement | null;
      if (!target) return;
      const href = target.getAttribute("href") || "";
      if (href.length < 2) return;
      if (target.target && target.target !== "" && target.target !== "_self") return;
      if (scrollToHash(href, "smooth")) {
        e.preventDefault();
        if (window.location.hash !== href) {
          history.pushState(null, "", href);
        }
      }
    };

    document.addEventListener("click", onClick);

    const onHashChange = () => scrollToHash(window.location.hash, "smooth");

    if (window.location.hash) {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => scrollToHash(window.location.hash, "auto"));
      });
    }
    window.addEventListener("hashchange", onHashChange);

    return () => {
      document.removeEventListener("click", onClick);
      window.removeEventListener("hashchange", onHashChange);
    };
  }, []);

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
              <h1 className="text-[clamp(1.75rem,7vw,3.75rem)] text-white mb-4 leading-tight hyphens-nl text-pretty" lang="nl">
                Iedereen veilig <span className="text-[#9ed42e]">thuis.</span>
              </h1>
              <p className="text-lg sm:text-2xl text-[#9ed42e] mb-6">We doen het veilig, of we doen het niet.</p>
              <p className="text-base sm:text-xl lg:text-2xl text-gray-300 mb-10 max-w-3xl leading-relaxed hyphens-nl text-pretty" lang="nl">
                Werken aan LS/MS-infrastructuur vraagt om vakmanschap, discipline en duidelijke afspraken. Voor TerreVolt is veiligheid geen formaliteit, maar de basis van elke opdracht: voor de monteur, de ploeg, de uitvoerende partij, de opdrachtgever en iedereen op locatie.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="#aanpak"
                  className="group bg-[#9ed42e] text-[#0d3b2e] px-8 py-4 min-h-[54px] rounded-lg hover:bg-[#8bc41f] transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <span>Onze aanpak</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </a>
                <a
                  href="/contact#formulier"
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
          ref={subnavRef}
          aria-label="Paginanavigatie Veiligheid"
          className="sticky top-16 sm:top-20 z-30 bg-white/90 backdrop-blur-sm border-b border-gray-200"
        >
          <div className="container mx-auto px-4 sm:px-6 lg:px-12">
            <ul className="flex gap-1 sm:gap-2 overflow-x-auto scrollbar-hide -mx-1 px-1 py-2">
              {[
                { label: "Filosofie", href: "#filosofie" },
                { label: "Aanpak", href: "#aanpak" },
                { label: "Veilige 5", href: "#veilige-5" },
                { label: "Normen", href: "#bei-vwi" },
                { label: "Werkplek", href: "#werkplek" },
                { label: "Rollen", href: "#rollen" },
                { label: "Stoppen", href: "#stoppen" },
                { label: "FAQ", href: "#faq" },
                { label: "Contact", href: "#contact" },
              ].map((item) => (
                <li key={item.href} className="flex-shrink-0">
                  <a
                    href={item.href}
                    className="inline-flex items-center min-h-[44px] px-3 sm:px-4 rounded-full text-sm text-[#0d3b2e] hover:bg-[#f0f7e6] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9ed42e] focus-visible:ring-offset-1 border border-transparent hover:border-[#9ed42e] transition-colors whitespace-nowrap"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </nav>

        {/* SECTIE: Veiligheid vóór planning */}
        <section id="filosofie" className="py-16 md:py-24 bg-white scroll-mt-[8.5rem] sm:scroll-mt-[9.5rem]">
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
        <section id="aanpak" className="py-16 md:py-24 bg-[#f8f9fa] scroll-mt-[8.5rem] sm:scroll-mt-[9.5rem]">
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
        {/* SECTIE: De Veilige 5 bij schakelwerk */}
        <section id="veilige-5" className="py-16 md:py-24 bg-white scroll-mt-[8.5rem] sm:scroll-mt-[9.5rem]">
          <div className="container mx-auto px-5 sm:px-6 lg:px-12">
            <div className="max-w-3xl mx-auto text-center mb-14 sm:mb-16">
              <div className="inline-block bg-[#f0f7e6] text-[#0d3b2e] px-4 py-1.5 rounded-full text-xs sm:text-sm mb-4 tracking-wider uppercase">Schakelwerk</div>
              <h2 className="text-[clamp(1.75rem,6vw,3rem)] sm:text-4xl lg:text-5xl text-[#0d3b2e] mb-4 leading-[1.15] hyphens-nl text-pretty" lang="nl">De Veilige 5 bij schakelwerk</h2>
              <p className="text-base sm:text-xl text-[#6c757d] leading-relaxed hyphens-nl text-pretty" lang="nl">
                {softHyphenate("Schakelwerk vraagt om rust, discipline en duidelijke opdrachtverstrekking. Een netdeel wordt niet 'even' uitgeschakeld; het wordt voorbereid, geschakeld, veiliggesteld en pas vrijgegeven wanneer de situatie klopt.")}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 max-w-6xl mx-auto">
              {[
                { title: "Scheiden", description: "Het netdeel wordt gescheiden van relevante voedingsbronnen volgens opdracht, bedienplan en projectafspraken." },
                { title: "Beveiligen tegen wederinschakelen", description: "Er worden maatregelen genomen om ongewenst opnieuw inschakelen te voorkomen." },
                { title: "Controleren op afwezigheid van spanning", description: "Voordat werkzaamheden starten, wordt gecontroleerd of de installatie of het werkgebied spanningsloos is volgens de geldende instructie." },
                { title: "Aarden en kortsluiten", description: "Waar van toepassing wordt geaard en kortgesloten om het werkgebied veilig te houden bij onverwachte spanning, inductie of terugvoeding." },
                { title: "Afschermen en afbakenen", description: "Nabijgelegen onder spanning staande delen worden afgeschermd en het veilige werkgebied wordt duidelijk afgebakend." },
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
        <section id="bei-vwi" className="py-16 md:py-24 bg-white scroll-mt-[8.5rem] sm:scroll-mt-[9.5rem]">
          <div className="container mx-auto px-5 sm:px-6 lg:px-12">
            <div className="max-w-3xl mx-auto text-center mb-14 sm:mb-16">
              <div className="inline-block bg-[#f0f7e6] text-[#0d3b2e] px-4 py-1.5 rounded-full text-xs sm:text-sm mb-4 tracking-wider uppercase">Normen & bevoegdheden</div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl text-[#0d3b2e] mb-4 hyphens-nl text-pretty" lang="nl">Normen, systemen en bevoegdheden</h2>
              <p className="text-base sm:text-lg text-[#6c757d] leading-relaxed hyphens-nl text-pretty" lang="nl">
                {softHyphenate("BEI BLS/BHS, VWI's, VCA, LMRA, NEN-normen en ISO 9001:2015 vormen samen het kader waarbinnen TerreVolt veilig en beheerst werkt. Aanwijzingen en certificaten worden ingezet volgens project, opdrachtgever en werkgebied.")}
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
        <section id="werkplek" className="py-16 md:py-24 bg-[#f8f9fa] scroll-mt-[8.5rem] sm:scroll-mt-[9.5rem]">
          <div className="container mx-auto px-5 sm:px-6 lg:px-12">
            <div className="max-w-3xl mx-auto text-center mb-14 sm:mb-16">
              <div className="inline-block bg-[#f0f7e6] text-[#0d3b2e] px-4 py-1.5 rounded-full text-xs sm:text-sm mb-4 tracking-wider uppercase">Uitvoering</div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl text-[#0d3b2e] mb-4 hyphens-nl text-pretty" lang="nl">Veilig werken op elke projectlocatie</h2>
              <p className="text-base sm:text-lg text-[#6c757d] leading-relaxed hyphens-nl text-pretty" lang="nl">
                {softHyphenate("Veiligheid stopt niet bij de installatie. Ook zichtbaarheid, afzettingen, looproutes, verlichting, PBM's, materieel, verkeer en andere partijen op locatie tellen mee.")}
              </p>
            </div>

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
        <section id="rollen" className="relative py-16 md:py-24 bg-[#0d3b2e] overflow-hidden scroll-mt-[8.5rem] sm:scroll-mt-[9.5rem]">
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
              <h2 className="text-3xl sm:text-4xl lg:text-5xl text-white mb-4 hyphens-nl text-pretty">Duidelijkheid in rollen en bevoegdheden</h2>
              <p className="text-base sm:text-lg text-gray-300 leading-relaxed hyphens-nl text-pretty">
                {softHyphenate("Veilig werken begint met weten wie waarvoor verantwoordelijk is. TerreVolt werkt met passende rollen, aanwijzingen en bevoegdheden afhankelijk van project, opdrachtgever en werkgebied.")}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 max-w-6xl mx-auto">
              {rollen.map((r) => (
                <div key={r.code} className="bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10 hover:border-[#9ed42e] transition-all duration-300">
                  <div className="inline-flex items-center justify-center min-w-[3rem] h-10 px-3 bg-[#9ed42e] text-[#0d3b2e] rounded-lg text-sm tracking-wider mb-4">
                    {r.code}
                  </div>
                  <h3 className="text-lg text-white mb-2">{r.title}</h3>
                  <p className="text-sm text-gray-300 leading-relaxed hyphens-nl text-pretty">{softHyphenate(r.description)}</p>
                </div>
              ))}
            </div>
            <p className="text-center text-xs sm:text-sm text-gray-400 mt-10 max-w-2xl mx-auto">
              Rollen, aanwijzingen en bevoegdheden worden ingezet volgens projectafspraken en kunnen per opdrachtgever verschillen.
            </p>
          </div>
        </section>

        {/* SECTIE: Statement */}
        <section id="stoppen" className="relative py-20 md:py-28 bg-[#f8f9fa] overflow-hidden scroll-mt-[8.5rem] sm:scroll-mt-[9.5rem]">
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
        <section id="faq" className="py-16 md:py-24 bg-white scroll-mt-[8.5rem] sm:scroll-mt-[9.5rem]">
          <div className="container mx-auto px-5 sm:px-6 lg:px-12">
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-10 sm:mb-12">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl text-[#0d3b2e] mb-4 hyphens-nl text-pretty">Veelgestelde vragen over veilig werken</h2>
              </div>

              <Accordion type="single" collapsible className="bg-[#f8f9fa] rounded-xl border border-gray-200 divide-y divide-gray-200">
                {faqs.map((f, i) => (
                  <AccordionItem key={i} value={`faq-${i}`} className="border-b-0 px-5 sm:px-6">
                    <AccordionTrigger className="text-left text-[#0d3b2e] hover:no-underline py-4 sm:py-5 text-[15px] sm:text-lg leading-snug rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9ed42e] focus-visible:ring-offset-2 focus-visible:ring-offset-white">
                      {f.q}
                    </AccordionTrigger>
                    <AccordionContent className="text-[#6c757d] text-[15px] sm:text-base leading-[1.75] sm:leading-relaxed pb-5 hyphens-nl text-pretty max-w-prose">
                      {softHyphenate(f.a)}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section id="contact" className="py-16 md:py-24 bg-gradient-to-br from-[#0d3b2e] via-[#1a4a36] to-[#0d3b2e] relative overflow-hidden scroll-mt-[8.5rem] sm:scroll-mt-[9.5rem]">
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
              <p className="text-base sm:text-xl text-gray-300 mb-10 leading-relaxed hyphens-nl text-pretty">
                Neem contact op met TerreVolt voor projectmatige ondersteuning waarbij veiligheid, vakmanschap en duidelijke afspraken centraal staan.
              </p>
              <a
                href="/contact#formulier"
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
