import { Link } from "react-router-dom";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { Header } from "@/components/terrevolt/Header";
import { Footer } from "@/components/terrevolt/Footer";
import { Reveal } from "@/components/terrevolt/Reveal";
import { usePageMeta } from "../../hooks/usePageMeta";
import { SITE_URL } from "@/config/company";
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    q: "Wat is middenspanning?",
    a: "Middenspanning (MS) is elektrische spanning boven 1.000 volt wisselspanning tot ongeveer 50 kV. In Nederland gaat het in de praktijk vooral om 10 kV en 20 kV netten, waarmee wijken, bedrijventerreinen en grote gebouwen worden gevoed.",
  },
  {
    q: "Hoeveel volt is middenspanning in Nederland?",
    a: "De meest voorkomende middenspanningsniveaus in Nederland zijn 10 kV en 20 kV. Daarnaast komen 3 kV, 6 kV en 13 kV voor in oudere of industriële netten.",
  },
  {
    q: "Wanneer heb ik een middenspanningsaansluiting nodig?",
    a: "Zodra je gevraagd vermogen niet meer past binnen een laagspanningsaansluiting — in de praktijk vanaf ongeveer 3x630 A. Denk aan productiebedrijven, datacenters, koel- en vrieshuizen, zorginstellingen, glastuinbouw, laadpleinen en zon- of windprojecten die terugleveren.",
  },
  {
    q: "Wat is een MS-ruimte of transformatorstation?",
    a: "Een aparte, afsluitbare ruimte met MS-schakelinstallatie (bijvoorbeeld een RMU), transformator en LS-verdeling. Netbeheerders stellen eisen aan afmetingen, toegankelijkheid, ventilatie, brandwerendheid en aarding.",
  },
  {
    q: "Wie mag aan middenspanning werken?",
    a: "Alleen personen met een passende, persoonsgebonden aanwijzing. Binnen netbeheeromgevingen is dat de BEI BHS; daarbuiten geldt NEN 3840 als basis. TerreVolt stelt per opdracht vast welke aanwijzing, werkplannen en schakelplannen nodig zijn.",
  },
  {
    q: "Wat is het verschil tussen een RMU en een MS-veld?",
    a: "Een RMU (Ring Main Unit) is een compacte, meestal SF6- of vaste-isolatie-schakelinstallatie met een beperkt aantal velden voor ringnetvoeding. Een MS-veld is één schakelveld binnen een grotere, uitbreidbare installatie in een station.",
  },
  {
    q: "Hoe lang duurt het realiseren van een MS-aansluiting?",
    a: "Reken vanaf de aanvraag bij de netbeheerder op meerdere maanden tot ruim een jaar, afhankelijk van beschikbare netcapaciteit, tracé, vergunningen en levertijden van installaties. Het montagewerk zelf duurt doorgaans dagen tot enkele weken.",
  },
  {
    q: "Moet een MS-installatie periodiek gekeurd worden?",
    a: "Ja. Inspectie en onderhoud volgens NEN 3840 (met NEN 3140 voor de laagspanningszijde), inclusief thermografie, controle van beveiligingsinstellingen, aardingsmetingen en beproeving na wijzigingen.",
  },
];

const toepassingen = [
  "Bedrijventerreinen en productielocaties met zware machines",
  "Datacenters en serverruimtes met redundante voeding",
  "Zorginstellingen, zwembaden en grote publieksgebouwen",
  "Glastuinbouw, koelhuizen en agrarische bedrijven",
  "Laadpleinen en snelladers voor elektrisch vervoer",
  "Zon- en windparken die terugleveren op het net",
];

const werkzaamheden = [
  { t: "MS-kabelmontage", d: "Eindsluitingen, verbindingsmoffen en kabelinvoer volgens fabrikantvoorschrift en werkplan." },
  { t: "Stations en RMU's", d: "Plaatsen, aansluiten en renoveren van MS-schakelinstallaties en transformatorstations." },
  { t: "Schakelwerk", d: "Vrijschakelen, veiligstellen, aarden en kortsluiten binnen bevoegdheid en bedieningsplan." },
  { t: "Aarding", d: "Aardelektroden, potentiaalvereffening en aardverspreidingsweerstand meten en rapporteren." },
  { t: "Meten en beproeven", d: "Isolatiemetingen, VLF-beproeving, foutlokalisatie en meetrapportage bij oplevering." },
];

const Middenspanning = () => {
  usePageMeta({
    title: "Middenspanning: wat is het en wanneer heb je het nodig | TerreVolt",
    description:
      "Wat is middenspanning (10 kV / 20 kV), wanneer heb je een MS-aansluiting nodig en wie mag eraan werken? Uitleg over MS-netten, stations, RMU's, BEI BHS en NEN 3840.",
    canonical: "/kennis/middenspanning",
    ogType: "article",
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: "Middenspanning: wat is het en wanneer heb je het nodig",
        description:
          "Uitleg over middenspanning in Nederland: spanningsniveaus, toepassingen, MS-stations en RMU's, benodigde aanwijzingen en normen.",
        inLanguage: "nl-NL",
        datePublished: "2026-08-24",
        dateModified: "2026-08-24",
        mainEntityOfPage: `${SITE_URL}/kennis/middenspanning`,
        author: { "@type": "Organization", name: "TerreVolt" },
        publisher: {
          "@type": "Organization",
          name: "TerreVolt",
          logo: { "@type": "ImageObject", url: `${SITE_URL}/og-image.jpg` },
        },
      },
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
          { "@type": "ListItem", position: 2, name: "Kennis", item: `${SITE_URL}/kennis/middenspanning` },
          { "@type": "ListItem", position: 3, name: "Middenspanning", item: `${SITE_URL}/kennis/middenspanning` },
        ],
      },
    ],
  });

  return (
    <div className="min-h-screen bg-[#f8f9fa]">
      <Header />

      <main id="main-content" className="pt-20 sm:pt-24">
        <section className="bg-[#0d3b2e]">
          <div className="mx-auto max-w-4xl px-4 py-14 sm:px-6 sm:py-20">
            <p className="text-xs uppercase tracking-[0.2em] text-[#9ed42e]">Kennisbank</p>
            <h1
              className="mt-4 font-semibold leading-tight text-white"
              style={{ fontSize: "clamp(1.8rem, 5.5vw, 3rem)" }}
            >
              Middenspanning: wat is het en wanneer heb je het nodig?
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/85 sm:text-lg">
              Middenspanning is elektrische spanning boven 1.000 volt wisselspanning tot ongeveer 50 kV. In Nederland
              gaat het meestal om 10 kV of 20 kV. Je hebt een middenspanningsaansluiting nodig zodra je gevraagde
              vermogen niet meer past binnen een laagspanningsaansluiting — in de praktijk vanaf ongeveer 3x630 A.
            </p>
          </div>
        </section>

        <div className="mx-auto max-w-4xl space-y-14 px-4 py-12 sm:px-6 sm:py-16">
          <Reveal>
            <section id="wat-is-het" className="scroll-mt-28">
              <h2 className="text-2xl font-semibold text-[#0d3b2e] sm:text-3xl">Wat is middenspanning precies?</h2>
              <p className="mt-4 leading-relaxed text-[#0d3b2e]/85">
                Het Nederlandse elektriciteitsnet werkt met verschillende spanningsniveaus. Hoogspanning transporteert
                energie over lange afstanden, middenspanning distribueert die energie regionaal naar wijken en
                bedrijventerreinen, en laagspanning brengt de energie tot in de meterkast. Middenspanning is de laag
                daartussen: krachtig genoeg om grote afnemers te voeden, compact genoeg om in een wijkstation of MS-ruimte
                te passen.
              </p>
              <ul className="mt-5 grid gap-2 sm:grid-cols-2">
                {[
                  "Laagspanning (LS): tot 1.000 V wisselspanning",
                  "Middenspanning (MS): 1 kV tot circa 50 kV — in NL vooral 10 kV en 20 kV",
                  "Hoogspanning (HS): vanaf circa 50 kV, transport over lange afstand",
                  "Transformatorstation: zet MS om naar LS voor eindgebruikers",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm leading-relaxed text-[#0d3b2e]/85">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#0d3b2e]" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </section>
          </Reveal>

          <Reveal>
            <section id="wanneer" className="scroll-mt-28">
              <h2 className="text-2xl font-semibold text-[#0d3b2e] sm:text-3xl">
                Wanneer heb je een middenspanningsaansluiting nodig?
              </h2>
              <p className="mt-4 leading-relaxed text-[#0d3b2e]/85">
                Zodra je vermogensvraag boven de grens van een grootverbruik-laagspanningsaansluiting uitkomt, of wanneer
                je substantieel wilt terugleveren, wijst de netbeheerder je een middenspanningsaansluiting toe. Je wordt
                dan zelf verantwoordelijk voor de MS-ruimte, de transformator en de LS-verdeling achter het overdrachtspunt.
              </p>
              <ul className="mt-5 grid gap-2 sm:grid-cols-2">
                {toepassingen.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm leading-relaxed text-[#0d3b2e]/85">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#0d3b2e]" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </section>
          </Reveal>

          <Reveal>
            <section id="werkzaamheden" className="scroll-mt-28">
              <h2 className="text-2xl font-semibold text-[#0d3b2e] sm:text-3xl">
                Welk werk komt er bij middenspanning kijken?
              </h2>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {werkzaamheden.map(({ t, d }) => (
                  <div key={t} className="rounded-2xl border border-gray-200 bg-white p-5">
                    <h3 className="text-base font-semibold text-[#0d3b2e]">{t}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-[#0d3b2e]/80">{d}</p>
                  </div>
                ))}
              </div>
            </section>
          </Reveal>

          <Reveal>
            <section id="veiligheid" className="scroll-mt-28">
              <h2 className="text-2xl font-semibold text-[#0d3b2e] sm:text-3xl">Wie mag aan middenspanning werken?</h2>
              <p className="mt-4 leading-relaxed text-[#0d3b2e]/85">
                Werken aan of nabij middenspanning mag alleen met een passende, persoonsgebonden aanwijzing. Binnen
                netbeheeromgevingen geldt de BEI BHS met rollen als werkverantwoordelijke (WV), allround vakbekwaam
                persoon (AVP), vakbekwaam persoon (VP), voldoende onderricht persoon (VOP) en ploegleider (PL). Buiten die
                omgevingen vormt NEN 3840 de basis, met NEN 3140 voor de laagspanningszijde. Een aanwijzing is altijd
                werkgevers- en werkzaamhedengebonden: TerreVolt beoordeelt vóór inzet welke aanwijzing nodig is.
              </p>
              <p className="mt-3 leading-relaxed text-[#0d3b2e]/85">
                Meer hierover lees je op{" "}
                <Link to="/veiligheid" className="font-medium underline underline-offset-4">
                  Veiligheid en certificeringen
                </Link>
                .
              </p>
            </section>
          </Reveal>

          <Reveal>
            <section id="faq" className="scroll-mt-28">
              <h2 className="text-2xl font-semibold text-[#0d3b2e] sm:text-3xl">Veelgestelde vragen over middenspanning</h2>
              <Accordion type="single" collapsible className="mt-6">
                {faqs.map((f, i) => (
                  <AccordionItem key={f.q} value={`faq-${i}`}>
                    <AccordionTrigger className="min-h-[56px] text-left text-[#0d3b2e]">{f.q}</AccordionTrigger>
                    <AccordionContent className="text-[#0d3b2e]/80">{f.a}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </section>
          </Reveal>

          <Reveal>
            <section className="rounded-2xl bg-[#0d3b2e] p-6 sm:p-8">
              <h2 className="text-xl font-semibold text-white sm:text-2xl">
                Middenspanningswerk uitbesteden of er juist in werken?
              </h2>
              <p className="mt-3 max-w-2xl text-white/85">
                TerreVolt voert MS-montage, stationsrenovatie, schakelwerk en meetrapportage uit in Noord-Holland,
                Zuid-Holland, Gelderland en Flevoland. Ben je monteur? We hebben doorlopend vacatures voor elektromonteurs
                in laag- en middenspanning.
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Link
                  to="/contact"
                  className="inline-flex min-h-[56px] items-center justify-center gap-2 rounded-lg bg-[#9ed42e] px-7 font-medium text-[#0d3b2e] transition-colors hover:bg-[#8cc022]"
                >
                  Projectvraag stellen
                  <ArrowRight className="h-5 w-5" aria-hidden="true" />
                </Link>
                <Link
                  to="/werken-bij"
                  className="inline-flex min-h-[56px] items-center justify-center rounded-lg border border-white/40 px-7 font-medium text-white transition-colors hover:bg-white/10"
                >
                  Bekijk vacatures elektromonteur
                </Link>
              </div>
            </section>
          </Reveal>

          <Reveal>
            <nav aria-label="Gerelateerde pagina's" className="border-t border-gray-200 pt-8">
              <h2 className="text-lg font-semibold text-[#0d3b2e]">Lees verder</h2>
              <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                {[
                  { to: "/kennis/laagspanning-middenspanning-hoogspanning", label: "Laagspanning vs middenspanning vs hoogspanning" },
                  { to: "/diensten/ls-ms-netmontage", label: "LS/MS-netmontage" },
                  { to: "/diensten/stationsrenovatie", label: "Stationsrenovatie" },
                  { to: "/diensten/meten-en-beproeven", label: "Meten en beproeven" },
                ].map((l) => (
                  <li key={l.to}>
                    <Link to={l.to} className="inline-flex min-h-[44px] items-center text-[#0d3b2e] underline underline-offset-4 hover:text-[#0d3b2e]/70">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </Reveal>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Middenspanning;
