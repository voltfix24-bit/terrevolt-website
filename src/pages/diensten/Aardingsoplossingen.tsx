import { ArrowRight, Home, Phone, Gauge, ShieldCheck, GitBranch, FileBarChart, Building2, Server, Zap, Factory, Construction, Plug, Activity, ClipboardList, FileCheck, CheckCircle2, MessageCircle, Euro, MapPin, Clock, Camera, Ruler, Wrench } from "lucide-react";
import { Header } from "@/components/terrevolt/Header";
import { Footer } from "@/components/terrevolt/Footer";
import { WhenToCall } from "@/components/terrevolt/WhenToCall";
import { SafetyStatement } from "@/components/terrevolt/SafetyStatement";
import { usePageMeta } from "../../hooks/usePageMeta";
import { EarthSymbol } from "@/components/icons/EarthSymbol";
import { Link } from "react-router-dom";
import { company, SITE_URL, telHref, addressOneLine } from "@/config/company";
import { whatsappLink } from "@/lib/whatsapp";
import meterkastFoto from "@/assets/aarding-meterkast.jpg";
import meetrapportFoto from "@/assets/aarding-meetrapport.jpg";
import aardpenFoto from "@/assets/aarding-aardpen-slaan.jpg";

const PAGE_URL = `${SITE_URL}/aarding-aanleggen`;

const waLink = whatsappLink(
  company.phone.e164,
  "Hallo TerreVolt, ik wil graag een aardpen laten slaan / aarding laten meten.",
);

/** Bewijspunten direct boven de vouw — kort, concreet en waarmaakbaar. */
const proofPoints = [
  { icon: Clock, text: "Reactie meestal binnen 1 werkdag" },
  { icon: Camera, text: "Foto meterkast meesturen voor snellere prijsindicatie" },
  { icon: FileCheck, text: "Meetrapport mogelijk voor installateur, keuring of opleverdossier" },
  { icon: MapPin, text: `Vanuit ${company.address.city} actief in heel Nederland` },
];

const heroBullets = [
  "Aardpen slaan voor woning, meterkast, laadpaal of zonnepanelen",
  "Aardingsmeting en meetrapport mogelijk",
  `Vanuit ${company.address.city} actief in heel Nederland`,
  "Voor particulieren, installateurs en zakelijke opdrachtgevers",
  "Veilig gewerkt volgens relevante normen en projectinstructies",
];

/** Trust-/proofblok direct na "Wanneer heeft u een aardpen nodig?". */
const waarom = [
  { icon: EarthSymbol, title: "Specialist in aarding en metingen", text: "Aarding, aardingsmetingen en LS/MS-infrastructuur zijn ons dagelijkse werk — geen bijzaak." },
  { icon: Gauge, title: "Aardingsmeting met duidelijke meetwaarden", text: "U krijgt de gemeten aardverspreidingsweerstand zwart-op-wit, niet alleen een mondelinge toezegging." },
  { icon: ShieldCheck, title: "Veilig volgens relevante normen", text: "Gewerkt volgens de geldende normen, bedrijfsvoeringsregels en projectinstructies." },
  { icon: Building2, title: "Woning, bedrijfspand of technische ruimte", text: "Geschikt voor woning, bedrijfspand, laadpaal, zonnepanelen en technische ruimten." },
  { icon: Wrench, title: "Korte lijnen met uitvoering en planning", text: "U spreekt direct iemand die het werk ook echt uitvoert en inplant." },
];

/** Herkenbare praktijkvoorbeelden — helpt bezoekers hun eigen situatie plaatsen. */
const voorbeelden = [
  { icon: Plug, text: "Nieuwe meterkast, installateur vraagt om een meetrapport" },
  { icon: Home, text: "Oude woning met aarding via de waterleiding" },
  { icon: Zap, text: "Laadpaal wordt geplaatst, aarding moet gecontroleerd worden" },
  { icon: ShieldCheck, text: "Zonnepaneleninstallatie vraagt om correcte potentiaalvereffening" },
  { icon: Factory, text: "Bedrijfspand of technische ruimte heeft periodieke aardingsmeting nodig" },
];


const nodig = [
  { icon: Plug, title: "Nieuwe of vervangen meterkast", text: "Bij een nieuwe meterkast of groepenkast is een deugdelijke aarding voorwaarde voor oplevering." },
  { icon: Home, title: "Oudere woning zonder goede aarding", text: "Veel oudere woningen hebben geen of een onvolledige aarding in de meterkast en op de eindgroepen." },
  { icon: GitBranch, title: "Aarding via de waterleiding", text: "Aarding via een (deels vervangen) waterleiding is niet meer betrouwbaar en wordt vervangen door een aardelektrode." },
  { icon: Zap, title: "Laadpaal", text: "Een laadpaal vraagt om een gemeten, betrouwbare aardingsvoorziening voordat de installateur kan aansluiten." },
  { icon: ShieldCheck, title: "Zonnepanelen", text: "Bij PV-installaties is aarding en potentiaalvereffening nodig voor veiligheid en keuring." },
  { icon: Activity, title: "Afkeuring of storing", text: "Na afkeuring, aardlekschakelaar die uitvalt of een storingsmelding brengen wij de aarding op orde." },
  { icon: Construction, title: "Uitbreiding van de installatie", text: "Bij uitbreiding van groepen, buitenkasten of werkplaatsen groeit de aardingsvoorziening mee." },
  { icon: Building2, title: "Bedrijfspand of technische ruimte", text: "Bedrijfspanden, werkplaatsen en technische ruimten vragen om een aantoonbaar gemeten aardingssysteem." },
];

const stappen = [
  { title: "Situatie inventariseren", text: "Kort telefonisch of via foto's van de meterkast: wat is er aanwezig en wat is er nodig?" },
  { title: "Locatie en bestaande aarding beoordelen", text: "Beoordeling van bodem, bereikbaarheid, kabelroutes en de bestaande aardleiding." },
  { title: "Aardpen plaatsen of aarding verbeteren", text: "Slaan van aardelektroden of het vernieuwen en uitbreiden van de bestaande voorziening." },
  { title: "Aardverspreidingsweerstand meten", text: "Meting op locatie tot de waarde voldoet aan de eis voor uw installatie." },
  { title: "Aansluiting controleren", text: "Controle van de doorverbinding naar de hoofdaardrail en de potentiaalvereffening." },
  { title: "Meetrapport en oplevering", text: "Meetwaarden, methode, datum en locatie vastgelegd in een rapport voor installateur, keuring of dossier." },
];

const fundament = [
  { icon: EarthSymbol, title: "Aardelektroden", description: "Plaatsen van aardpennen en aardelektroden voor woningen en technische installaties." },
  { icon: Gauge, title: "Aardverspreidingsweerstand", description: "Meten, beoordelen en optimaliseren van de aardverspreidingsweerstand." },
  { icon: ShieldCheck, title: "Stationsaarding", description: "Aardingssystemen voor MS/LS-stations en transformatorruimten." },
  { icon: GitBranch, title: "Potentiaalvereffening", description: "Hoofd- en aanvullende potentiaalvereffening voor veilige installaties." },
  { icon: FileBarChart, title: "Meetrapportage", description: "Duidelijke meetrapportages en opleverdocumentatie." },
];

const toepassingen = [
  { icon: Home, title: "Woningen en meterkasten" },
  { icon: Zap, title: "Laadpalen" },
  { icon: Plug, title: "Zonnepanelen" },
  { icon: Building2, title: "MS/LS-stations" },
  { icon: Server, title: "Technische ruimten" },
  { icon: Factory, title: "Industriële installaties" },
];

const meetbaar = [
  { icon: Activity, title: "Meten", description: "Aardverspreidingsweerstand, doorverbindingsmetingen en controlemetingen op locatie." },
  { icon: ClipboardList, title: "Beoordelen", description: "Toetsen van meetwaarden aan eisen, normen en projectafspraken." },
  { icon: FileCheck, title: "Rapporteren", description: "Heldere meetrapportages en opleverdocumentatie voor opdrachtgever en dossier." },
];

const doelgroepen = [
  {
    icon: Home,
    title: "Voor particulieren",
    intro: "Aarding laten aanleggen, vernieuwen of meten bij uw woning.",
    items: [
      "Aardpen laten slaan bij een woning zonder (goede) aarding",
      "Meterkast aarden bij vervanging van de groepenkast",
      "Aarding voor een laadpaal of zonnepanelen",
      "Oude of afgekeurde aarding via de waterleiding vervangen",
      "Meetrapport voor uw installateur, keuring of netbeheerder",
    ],
  },
  {
    icon: Factory,
    title: "Voor bedrijven en installateurs",
    intro: "Aarding voor panden, installaties en technische ruimten.",
    items: [
      "Aardingsinstallatie voor bedrijfspanden en werkplaatsen",
      "Stationsaarding voor MS/LS-stations en transformatorruimten",
      "Potentiaalvereffening in technische ruimten",
      "Periodieke aardingsmetingen op locatie",
      "Opleverdossiers en meetrapportages voor uw project",
    ],
  },
];

const werkgebied = [
  "Utrecht",
  "Nieuwegein",
  "Houten",
  "Maarssen",
  "Zeist",
  "De Bilt",
  "Amersfoort",
  "Hilversum",
  "Woerden",
];

/**
 * Lokale werkgebiedblokken. `slug` is voorbereid op toekomstige eigen
 * landingspagina's (/aardpen-slaan-<slug>); zolang die er niet zijn, wijst
 * het blok naar de aarding-aanvraagflow met de plaats als context.
 */
const lokaleGebieden = [
  { plaats: "Utrecht", slug: "utrecht", text: "Aardpen slaan en aarding meten in Utrecht stad en de wijken eromheen." },
  { plaats: "Nieuwegein", slug: "nieuwegein", text: "Aarding voor woningen, laadpalen en bedrijfspanden in Nieuwegein." },
  { plaats: "Amersfoort", slug: "amersfoort", text: "Aardpen laten slaan bij meterkast of PV-installatie in Amersfoort." },
  { plaats: "Hilversum", slug: "hilversum", text: "Aarding controleren en vernieuwen bij oudere woningen in Hilversum." },
  { plaats: "Zeist", slug: "zeist", text: "Aardingsmeting met meetrapport voor woning of bedrijf in Zeist." },
  { plaats: "Houten", slug: "houten", text: "Aardelektrode plaatsen en aansluiten op de hoofdaardrail in Houten." },
  { plaats: "Maarssen", slug: "maarssen", text: "Aardpen slaan en potentiaalvereffening controleren in Maarssen." },
];


const faq = [
  {
    q: "Wat kost een aardpen laten slaan?",
    a: "De prijs hangt af van de grondsoort, de bereikbaarheid van de plaatsingslocatie, de benodigde diepte, de aansluiting op de hoofdaardrail en of u een meetrapport wenst. Na een korte inventarisatie — vaak telefonisch of met foto's van de meterkast — ontvangt u vooraf een duidelijke prijsindicatie.",
  },
  {
    q: "Hoe diep moet een aardpen de grond in?",
    a: "In de praktijk wordt gewerkt met gekoppelde aardstaven tot enkele meters diepte. Bepalend is niet de diepte zelf, maar de gemeten aardverspreidingsweerstand: er wordt dieper geslagen of uitgebreid tot de meetwaarde voldoet aan de eis voor de installatie.",
  },
  {
    q: "Wanneer is een aardpen verplicht?",
    a: "Een elektrische installatie moet beschikken over een deugdelijke aardingsvoorziening. Ontbreekt een bruikbare aardelektrode — bijvoorbeeld bij een oudere woning, na vervanging van de waterleiding, of bij een nieuwe laadpaal of PV-installatie — dan is het slaan van een aardpen de gebruikelijke oplossing.",
  },
  {
    q: "Kan oude aarding via de waterleiding nog?",
    a: "Nee, daar kunt u niet meer op vertrouwen. Zodra (een deel van) de waterleiding is vervangen door kunststof, is de aardverbinding onderbroken. Wij vervangen die door een gemeten aardelektrode en sluiten deze aan op de hoofdaardrail.",
  },
  {
    q: "Krijg ik een meetrapport?",
    a: "Ja, als u dat wenst. Elke uitgevoerde aardingsmeting kan worden vastgelegd in een rapportage met meetwaarden, meetmethode, datum en locatie — bruikbaar voor uw installateur, netbeheerder, keuring of opleverdossier.",
  },
  {
    q: "Hoe weet ik of mijn aarding goed is?",
    a: "Dat blijkt uit een aardingsmeting. Wij meten de aardverspreidingsweerstand en controleren de doorverbinding naar de hoofdaardrail en de potentiaalvereffening. U ontvangt de meetwaarden zwart-op-wit.",
  },
  {
    q: "Is aarding nodig voor zonnepanelen?",
    a: "Een PV-installatie moet zijn aangesloten op een deugdelijke aarding en potentiaalvereffening. Ontbreekt die of is de weerstand te hoog, dan wordt de installatie afgekeurd. Wij leggen de aarding aan en leveren de meetwaarden aan uw installateur.",
  },
  {
    q: "Is aarding nodig voor een laadpaal?",
    a: "Ja. Een laadpaal vraagt om een betrouwbare, gemeten aardingsvoorziening. Veel installateurs vragen daarom vooraf om een aardingsmeting of laten eerst een aardpen slaan voordat de laadpaal wordt aangesloten.",
  },
  {
    q: "Werkt TerreVolt ook voor particulieren?",
    a: "Ja. Naast bedrijven, installateurs en netbeheerders werken wij ook voor particuliere woningeigenaren: één aardpen bij een woning is net zo goed werk als de aarding van een compleet station.",
  },
  {
    q: "In welke regio werkt TerreVolt?",
    a: `TerreVolt werkt vanuit ${company.address.city} in heel Nederland, met nadruk op ${werkgebied.join(", ")} en omliggende regio's.`,
  },
];

const Aardingsoplossingen = () => {
  usePageMeta({
    title: "Aardpen laten slaan Utrecht | Aarding meten met meetrapport | TerreVolt",
    description:
      "Aardpen laten slaan of aarding laten meten? TerreVolt plaatst en controleert aarding voor woningen, laadpalen, zonnepanelen en bedrijven. Vanuit Utrecht in heel Nederland.",
    canonical: "/aarding-aanleggen",
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "Electrician",
        "@id": `${SITE_URL}/#organization`,
        name: company.legalName,
        url: SITE_URL,
        telephone: company.phone.e164,
        email: company.email,
        address: {
          "@type": "PostalAddress",
          streetAddress: company.address.street,
          postalCode: company.address.postalCode,
          addressLocality: company.address.city,
          addressRegion: company.address.region,
          addressCountry: company.address.countryCode,
        },
        areaServed: [
          { "@type": "Country", name: "Nederland" },
          ...werkgebied.map((city) => ({ "@type": "City", name: city })),
        ],
        knowsAbout: [
          "aardpen slaan",
          "aardpen laten slaan Utrecht",
          "aarding aanleggen",
          "aardingsmeting met meetrapport",
          "potentiaalvereffening",
          "meterkast aarden",
          "aarding laadpaal",
          "zonnepanelen aarden",
          "aarding via waterleiding vervangen",
        ],
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "customer service",
          telephone: company.phone.e164,
          email: company.email,
          areaServed: "NL",
          availableLanguage: ["nl"],
        },
      },
      {
        "@context": "https://schema.org",
        "@type": "Service",
        name: "Aardpen laten slaan en aardingsmeting",
        serviceType: "Aardpen slaan, aarding aanleggen en aardingsmeting met meetrapport",
        description:
          "Plaatsen van aardpennen en aardelektroden, verbeteren van bestaande aarding, potentiaalvereffening en aardingsmeting met meetrapport voor woningen, laadpalen, zonnepanelen, bedrijfspanden en MS/LS-stations.",
        url: PAGE_URL,
        provider: { "@id": `${SITE_URL}/#organization` },
        areaServed: [
          { "@type": "Country", name: "Nederland" },
          ...werkgebied.map((city) => ({ "@type": "City", name: city })),
        ],
        availableChannel: [
          {
            "@type": "ServiceChannel",
            name: "Prijsindicatie aanvragen",
            serviceUrl: `${SITE_URL}/contact?type=aarding`,
          },
          {
            "@type": "ServiceChannel",
            name: "Telefonisch contact",
            servicePhone: { "@type": "ContactPoint", telephone: company.phone.e164 },
          },
        ],

        audience: [
          { "@type": "Audience", audienceType: "Particulieren" },
          { "@type": "BusinessAudience", audienceType: "Installateurs, bedrijven en netbeheerders" },
        ],
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Aardingswerkzaamheden",
          itemListElement: [
            "Aardpen slaan en aardelektroden plaatsen",
            "Meterkast aarden en aarding vernieuwen",
            "Aarding voor laadpaal en zonnepanelen",
            "Aardingsmeting (aardverspreidingsweerstand) met meetrapport",
            "Potentiaalvereffening",
            "Stationsaarding MS/LS en opleverdocumentatie",
          ].map((name) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name } })),
        },
      },
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faq.map((item) => ({
          "@type": "Question",
          name: item.q,
          acceptedAnswer: { "@type": "Answer", text: item.a },
        })),
      },
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
          { "@type": "ListItem", position: 2, name: "Diensten", item: `${SITE_URL}/diensten` },
          { "@type": "ListItem", position: 3, name: "Aardpen laten slaan en aarding meten", item: PAGE_URL },
        ],
      },
    ],
  });

  return (
    <div className="min-h-screen bg-[#f8f9fa]">
      <Header />

      <main id="main-content" className="pt-16 sm:pt-20">
        {/* HERO */}
        <section className="relative flex items-center overflow-hidden bg-gradient-to-br from-[#0d3b2e] via-[#1a4a36] to-[#0d3b2e] py-14 sm:py-20">
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

          <div className="absolute inset-0 opacity-[0.18] pointer-events-none">
            <svg className="w-full h-full" viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
              <path d="M0,650 L200,650 L260,580 L520,580 L580,500 L900,500 L960,420 L1200,420" stroke="rgba(158, 212, 46, 0.7)" strokeWidth="2" fill="none" />
              <path d="M0,720 L300,720 L360,660 L780,660 L840,600 L1200,600" stroke="rgba(158, 212, 46, 0.45)" strokeWidth="1.5" fill="none" strokeDasharray="6 6" />
              <g fill="rgba(158, 212, 46, 0.85)">
                <circle cx="260" cy="580" r="5" />
                <circle cx="580" cy="500" r="5" />
                <circle cx="960" cy="420" r="5" />
              </g>
              <g stroke="rgba(158, 212, 46, 0.7)" strokeWidth="2" fill="none">
                <line x1="1080" y1="180" x2="1080" y2="240" />
                <line x1="1050" y1="240" x2="1110" y2="240" />
                <line x1="1060" y1="252" x2="1100" y2="252" />
                <line x1="1070" y1="264" x2="1090" y2="264" />
              </g>
            </svg>
          </div>

          <div className="container mx-auto px-5 sm:px-6 lg:px-12 relative z-10">
            <div className="max-w-4xl">
              <div className="inline-block bg-[#9ed42e] text-[#0d3b2e] px-4 py-2 rounded-full text-sm mb-6 tracking-wider uppercase">
                Aarding &amp; aardingsmeting
              </div>
              <h1 className="text-[clamp(1.75rem,6.4vw,2.5rem)] sm:text-4xl lg:text-5xl text-white mb-5 leading-[1.12] hyphens-nl text-pretty" lang="nl">
                Aardpen laten slaan en aarding laten meten in {company.address.city}{" "}
                <span className="text-[#9ed42e]">en heel Nederland</span>
              </h1>
              <p className="text-[17px] sm:text-lg lg:text-xl text-white/85 mb-6 max-w-3xl leading-relaxed">
                TerreVolt plaatst en meet aardingsvoorzieningen voor woningen, meterkasten, laadpalen, zonnepanelen,
                bedrijfspanden en technische installaties. U krijgt duidelijke uitvoering, controlemetingen en indien
                gewenst een meetrapport voor installateur, netbeheerder, keuring of opleverdossier.
              </p>

              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 mb-8 max-w-3xl">
                {heroBullets.map((b) => (
                  <li key={b} className="flex items-start gap-2 text-white/90 text-[15px] leading-relaxed">
                    <CheckCircle2 className="w-5 h-5 text-[#9ed42e] flex-shrink-0 mt-0.5" strokeWidth={2.5} />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>

              <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4">
                <Link
                  to="/contact?type=aarding"
                  data-cta="Prijsindicatie aanvragen (hero)"
                  className="group bg-[#9ed42e] text-[#0d3b2e] px-6 sm:px-8 py-4 min-h-[56px] rounded-lg hover:bg-[#8bc41f] transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <span>Prijsindicatie aanvragen</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <a
                  href={telHref}
                  aria-label={`Bel TerreVolt: ${company.phone.display}`}
                  className="border-2 border-white/40 text-white px-6 sm:px-8 py-4 min-h-[56px] rounded-lg hover:border-white transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <Phone className="w-5 h-5" aria-hidden="true" />
                  {company.phone.display}
                </a>
                {waLink && (
                  <a
                    href={waLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="border-2 border-white/40 text-white px-6 sm:px-8 py-4 min-h-[56px] rounded-lg hover:border-white transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <MessageCircle className="w-5 h-5" aria-hidden="true" />
                    WhatsApp foto sturen
                  </a>
                )}
              </div>

              <p className="mt-5 text-[15px] text-white/80 leading-relaxed max-w-2xl">
                Stuur postcode en foto van de meterkast. Wij reageren meestal binnen 1 werkdag
                met een duidelijke prijsindicatie.
              </p>
            </div>
          </div>
        </section>

        {/* BEWIJS BOVEN DE VOUW */}
        <section className="bg-white border-b border-gray-200">
          <div className="container mx-auto px-5 sm:px-6 lg:px-12 py-6 sm:py-8">
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {proofPoints.map((p) => {
                const Icon = p.icon;
                return (
                  <li key={p.text} className="flex items-start gap-3">
                    <span className="w-9 h-9 flex-shrink-0 rounded-lg bg-[#f0f7e6] flex items-center justify-center">
                      <Icon className="w-[18px] h-[18px] text-[#0d3b2e]" strokeWidth={2} aria-hidden="true" />
                    </span>
                    <span className="text-[15px] text-[#495057] leading-snug">{p.text}</span>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>


        {/* WANNEER NODIG */}
        <section id="wanneer-nodig" className="py-16 md:py-24 bg-white scroll-mt-24">
          <div className="container mx-auto px-5 sm:px-6 lg:px-12">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl text-[#0d3b2e] mb-4 hyphens-nl" lang="nl">
                Wanneer heeft u een aardpen of nieuwe aarding nodig?
              </h2>
              <p className="text-lg sm:text-xl text-[#6c757d] max-w-3xl mx-auto leading-relaxed">
                Herkent u een van deze situaties? Dan is het slaan van een aardpen of het verbeteren van de bestaande
                aarding meestal de oplossing.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
              {nodig.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.title} className="group bg-white border border-gray-200 rounded-xl p-6 hover:border-[#9ed42e] hover:shadow-xl transition-all duration-300">
                    <div className="w-12 h-12 bg-[#f0f7e6] rounded-lg flex items-center justify-center mb-4 group-hover:bg-[#9ed42e] transition-colors duration-300">
                      <Icon className="w-6 h-6 text-[#0d3b2e] group-hover:text-white transition-colors duration-300" strokeWidth={2} />
                    </div>
                    <h3 className="text-lg text-[#0d3b2e] mb-2 hyphens-nl" lang="nl">{item.title}</h3>
                    <p className="text-[#6c757d] text-sm leading-relaxed">{item.text}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* WAAROM TERREVOLT */}
        <section id="waarom-terrevolt" className="py-16 md:py-24 bg-[#f8f9fa] scroll-mt-24">
          <div className="container mx-auto px-5 sm:px-6 lg:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
              <div className="order-2 lg:order-1">
                <h2 className="text-3xl sm:text-4xl text-[#0d3b2e] mb-6 hyphens-nl" lang="nl">
                  Waarom klanten TerreVolt inschakelen
                </h2>
                <ul className="space-y-5">
                  {waarom.map((item) => {
                    const Icon = item.icon;
                    return (
                      <li key={item.title} className="flex items-start gap-4">
                        <span className="w-11 h-11 flex-shrink-0 rounded-lg bg-[#0d3b2e] flex items-center justify-center">
                          <Icon className="w-5 h-5 text-[#9ed42e]" strokeWidth={2} aria-hidden="true" />
                        </span>
                        <div>
                          <h3 className="text-lg text-[#0d3b2e] mb-1 hyphens-nl" lang="nl">{item.title}</h3>
                          <p className="text-[#6c757d] text-[15px] leading-relaxed">{item.text}</p>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
              <div className="order-1 lg:order-2">
                <img
                  src={aardpenFoto}
                  alt="Aardpen laten slaan bij een woning in Utrecht door een monteur van TerreVolt"
                  width={1280}
                  height={960}
                  loading="lazy"
                  className="w-full h-auto rounded-2xl border border-gray-200 object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* VOORBEELDEN VAN AANVRAGEN */}
        <section id="voorbeelden" className="py-16 md:py-24 bg-white scroll-mt-24">
          <div className="container mx-auto px-5 sm:px-6 lg:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
              <div>
                <img
                  src={meterkastFoto}
                  alt="Aardleiding aansluiten op de hoofdaardrail in een meterkast — aardpen slaan bij meterkast"
                  width={1280}
                  height={960}
                  loading="lazy"
                  className="w-full h-auto rounded-2xl border border-gray-200 object-cover"
                />
              </div>
              <div>
                <h2 className="text-3xl sm:text-4xl text-[#0d3b2e] mb-4 hyphens-nl" lang="nl">
                  Voorbeelden van aanvragen
                </h2>
                <p className="text-[#6c757d] leading-relaxed mb-6">
                  Herkent u uw eigen situatie hieronder? Dan weten wij meestal met postcode en een foto van de
                  meterkast al wat er nodig is.
                </p>
                <ul className="space-y-3">
                  {voorbeelden.map((v) => {
                    const Icon = v.icon;
                    return (
                      <li key={v.text} className="flex items-start gap-3 bg-[#f8f9fa] border border-gray-200 rounded-xl p-4">
                        <Icon className="w-5 h-5 text-[#0d3b2e] flex-shrink-0 mt-0.5" strokeWidth={2} aria-hidden="true" />
                        <span className="text-[15px] text-[#495057] leading-relaxed">{v.text}</span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>
        </section>



        {/* KOSTEN */}
        <section id="kosten" className="py-16 md:py-24 bg-[#f8f9fa] scroll-mt-24">
          <div className="container mx-auto px-5 sm:px-6 lg:px-12">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-10">
                <div className="inline-flex items-center gap-2 bg-[#0d3b2e] text-[#9ed42e] px-4 py-2 rounded-full text-sm mb-5 tracking-wider uppercase">
                  <Euro className="w-4 h-4" aria-hidden="true" />
                  Kosten
                </div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl text-[#0d3b2e] mb-4 hyphens-nl" lang="nl">
                  Prijsindicatie voor aardpen slaan
                </h2>
                <p className="text-lg text-[#6c757d] leading-relaxed">
                  De prijs hangt af van bodem, bereikbaarheid, benodigde diepte, aansluiting en meetrapport. Stuur
                  postcode en foto&#39;s mee voor een snelle indicatie.
                </p>
                <p className="mt-3 text-lg text-[#0d3b2e] leading-relaxed">
                  Geen verrassingen: u ontvangt vooraf een duidelijke prijsopgave.
                </p>

              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                {[
                  "Grondsoort — zand, klei of veen bepaalt hoe diep er geslagen moet worden",
                  "Bereikbaarheid van de plaatsingslocatie en de meterkast",
                  "Benodigde diepte om de vereiste meetwaarde te halen",
                  "Aansluiting op de hoofdaardrail en de potentiaalvereffening",
                  "Wel of geen meetrapport voor installateur, keuring of dossier",
                  "Aantal locaties of extra aardelektroden bij grotere installaties",
                ].map((f) => (
                  <div key={f} className="flex items-start gap-3 bg-white border border-gray-200 rounded-xl p-4">
                    <CheckCircle2 className="w-5 h-5 text-[#9ed42e] flex-shrink-0 mt-0.5" strokeWidth={2.5} />
                    <span className="text-[15px] text-[#495057] leading-relaxed">{f}</span>
                  </div>
                ))}
              </div>

              <div className="bg-[#0d3b2e] rounded-2xl p-6 sm:p-8 text-center">
                <h3 className="text-xl sm:text-2xl text-white mb-3">Prijsindicatie aanvragen</h3>
                <p className="text-white/80 leading-relaxed mb-6 max-w-2xl mx-auto">
                  Stuur uw postcode, uw situatie en eventueel foto&#39;s van de meterkast mee. TerreVolt geeft vooraf een
                  duidelijke prijsindicatie — zonder verrassingen achteraf.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Link
                    to="/contact?type=aarding"
                    data-cta="Prijsindicatie aanvragen"
                    className="bg-[#9ed42e] text-[#0d3b2e] px-7 py-4 min-h-[56px] rounded-lg hover:bg-[#8bc41f] transition-colors flex items-center justify-center"
                  >
                    Vraag binnen 1 minuut een prijsindicatie aan
                  </Link>
                  <a
                    href={telHref}
                    className="border-2 border-white/40 text-white px-7 py-4 min-h-[56px] rounded-lg hover:border-white transition-colors flex items-center justify-center gap-2"
                  >
                    <Phone className="w-5 h-5" aria-hidden="true" />
                    Bel direct
                  </a>
                  {waLink && (
                    <a
                      href={waLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="border-2 border-white/40 text-white px-7 py-4 min-h-[56px] rounded-lg hover:border-white transition-colors flex items-center justify-center gap-2"
                    >
                      <MessageCircle className="w-5 h-5" aria-hidden="true" />
                      WhatsApp foto sturen
                    </a>
                  )}
                </div>

              </div>
            </div>
          </div>
        </section>

        {/* WERKWIJZE */}
        <section id="werkwijze" className="py-16 md:py-24 bg-white scroll-mt-24">
          <div className="container mx-auto px-5 sm:px-6 lg:px-12">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl text-[#0d3b2e] mb-4">Zo werkt TerreVolt</h2>
              <p className="text-lg text-[#6c757d] max-w-3xl mx-auto leading-relaxed">
                Van eerste inventarisatie tot meetrapport: zes duidelijke stappen.
              </p>
            </div>

            <ol className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 max-w-6xl mx-auto">
              {stappen.map((stap, i) => (
                <li key={stap.title} className="bg-[#f8f9fa] border border-gray-200 rounded-xl p-6">
                  <div className="w-10 h-10 bg-[#9ed42e] text-[#0d3b2e] rounded-lg flex items-center justify-center mb-4 text-lg">
                    {i + 1}
                  </div>
                  <h3 className="text-lg text-[#0d3b2e] mb-2 hyphens-nl" lang="nl">{stap.title}</h3>
                  <p className="text-[#6c757d] text-sm leading-relaxed">{stap.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* WERKZAAMHEDEN */}
        <section id="werkzaamheden" className="py-16 md:py-24 bg-[#f8f9fa] scroll-mt-24">
          <div className="container mx-auto px-5 sm:px-6 lg:px-12">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl text-[#0d3b2e] mb-4">Aarding als basis van een veilige installatie</h2>
              <p className="text-lg sm:text-xl text-[#6c757d] max-w-3xl mx-auto leading-relaxed">
                Een betrouwbare aarding is essentieel voor veiligheid, bedrijfszekerheid en de correcte werking van
                elektrotechnische installaties. TerreVolt behandelt aarding niet als bijzaak, maar als fundament.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
              {fundament.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.title} className="group bg-white border border-gray-200 rounded-xl p-6 hover:border-[#9ed42e] hover:shadow-xl transition-all duration-300">
                    <div className="w-12 h-12 bg-[#f0f7e6] rounded-lg flex items-center justify-center mb-4 group-hover:bg-[#9ed42e] transition-colors duration-300">
                      <Icon className="w-7 h-7 text-[#0d3b2e] group-hover:text-white transition-colors duration-300" strokeWidth={2} />
                    </div>
                    <h3 className="text-lg text-[#0d3b2e] mb-2">{item.title}</h3>
                    <p className="text-[#6c757d] text-sm leading-relaxed">{item.description}</p>
                  </div>
                );
              })}
            </div>

            <p className="max-w-4xl mx-auto mt-8 text-[15px] sm:text-base text-[#6c757d] leading-relaxed">
              Bij het onderbreken, verbinden of wijzigen van aardingsvoorzieningen die onderdeel zijn van een bestaand
              elektriciteitsvoorzieningssysteem worden de risico&#39;s van potentiaalverschillen vooraf beoordeeld en
              worden de voorgeschreven veiligheidsmaatregelen volgens werkplan en toepasselijke instructie getroffen.
            </p>
          </div>
        </section>

        {/* TOEPASSINGEN */}
        <section className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-5 sm:px-6 lg:px-12">
            <div className="text-center mb-12">
              <div className="inline-block bg-[#0d3b2e] text-[#9ed42e] px-4 py-2 rounded-full text-sm mb-6 tracking-wider uppercase">
                Toepassingen
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl text-[#0d3b2e] mb-4">Waar wij aarding aanleggen en meten</h2>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-5 sm:gap-6 max-w-5xl mx-auto">
              {toepassingen.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.title} className="group flex flex-col items-center text-center bg-white rounded-xl p-6 border border-gray-200 hover:border-[#9ed42e] hover:shadow-xl transition-all duration-300">
                    <div className="w-14 h-14 bg-gradient-to-br from-[#0d3b2e] to-[#1a4a36] rounded-xl flex items-center justify-center mb-4">
                      <Icon className="w-7 h-7 text-[#9ed42e]" strokeWidth={2} />
                    </div>
                    <div className="text-[#0d3b2e] hyphens-nl" lang="nl">{item.title}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* MEETBAAR */}
        <section className="py-16 md:py-24 bg-[#0d3b2e] relative overflow-hidden">
          <div className="absolute inset-0 opacity-5">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `
                  linear-gradient(rgba(255, 255, 255, 0.3) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(255, 255, 255, 0.3) 1px, transparent 1px)
                `,
                backgroundSize: "60px 60px",
              }}
            />
          </div>

          <div className="container mx-auto px-5 sm:px-6 lg:px-12 relative z-10">
            <div className="text-center mb-12">
              <div className="inline-block bg-[#9ed42e] text-[#0d3b2e] px-4 py-2 rounded-full text-sm mb-6 tracking-wider uppercase">
                Aantoonbaar
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl text-white mb-4">Aardingsmeting met meetrapport</h2>
              <p className="text-lg sm:text-xl text-white/85 max-w-3xl mx-auto leading-relaxed">
                TerreVolt zorgt voor controleerbare uitvoering en duidelijke vastlegging. Waar nodig leveren wij
                meetgegevens en rapportages op voor installateur, keuring, netbeheerder of opleverdossier.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {meetbaar.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.title} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-8 hover:bg-white/10 hover:border-[#9ed42e] transition-all duration-300">
                    <div className="w-14 h-14 bg-[#9ed42e] rounded-lg flex items-center justify-center mb-6">
                      <Icon className="w-7 h-7 text-[#0d3b2e]" strokeWidth={2.5} />
                    </div>
                    <h3 className="text-xl text-white mb-3">{item.title}</h3>
                    <p className="text-white/65 text-sm leading-relaxed">{item.description}</p>
                  </div>
                );
              })}
            </div>

            <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center max-w-5xl mx-auto">
              <img
                src={meetrapportFoto}
                alt="Aardingsmeting met meetrapport door TerreVolt: meetinstrument en aardelektrode naast de woning"
                width={1280}
                height={960}
                loading="lazy"
                className="w-full h-auto rounded-2xl border border-white/15 object-cover"
              />
              <div>
                <h3 className="text-2xl text-white mb-3">Meetrapport nodig voor uw installateur of keuring?</h3>
                <p className="text-white/80 leading-relaxed mb-6">
                  Geef aan waarvoor u het rapport nodig heeft — installateur, netbeheerder, keuring of opleverdossier.
                  U ontvangt de meetwaarden, meetmethode, datum en locatie op papier.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Link
                    to="/contact?type=aarding"
                    data-cta="Prijsindicatie aanvragen (meetrapport)"
                    className="bg-[#9ed42e] text-[#0d3b2e] px-7 py-4 min-h-[56px] rounded-lg hover:bg-[#8bc41f] transition-colors flex items-center justify-center"
                  >
                    Prijsindicatie aanvragen
                  </Link>
                  <a
                    href={telHref}
                    className="border-2 border-white/40 text-white px-7 py-4 min-h-[56px] rounded-lg hover:border-white transition-colors flex items-center justify-center gap-2"
                  >
                    <Phone className="w-5 h-5" aria-hidden="true" />
                    Bel direct
                  </a>
                </div>
              </div>
            </div>
          </div>

        </section>

        {/* VOOR WIE */}
        <section id="voor-wie" className="py-16 md:py-24 bg-white scroll-mt-24">
          <div className="container mx-auto px-5 sm:px-6 lg:px-12">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl text-[#0d3b2e] mb-4 hyphens-nl" lang="nl">
                Voor particulieren, installateurs en bedrijven
              </h2>
              <p className="text-lg sm:text-xl text-[#6c757d] max-w-3xl mx-auto leading-relaxed">
                Of het nu gaat om één aardpen bij een woning of om de complete aarding van een station: het werk wordt
                gemeten opgeleverd.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
              {doelgroepen.map((groep) => {
                const Icon = groep.icon;
                return (
                  <div key={groep.title} className="bg-[#f8f9fa] border border-gray-200 rounded-xl p-7">
                    <div className="w-12 h-12 bg-[#0d3b2e] rounded-lg flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-[#9ed42e]" strokeWidth={2} />
                    </div>
                    <h3 className="text-xl text-[#0d3b2e] mb-1">{groep.title}</h3>
                    <p className="text-[#6c757d] text-sm mb-4">{groep.intro}</p>
                    <ul className="space-y-2">
                      {groep.items.map((item) => (
                        <li key={item} className="flex gap-2 text-[#495057] text-[15px] leading-relaxed">
                          <span className="text-[#9ed42e] mt-0.5">&#8226;</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>

            <p className="max-w-4xl mx-auto mt-10 text-[15px] sm:text-base text-[#6c757d] leading-relaxed text-center">
              Meer over metingen leest u op{" "}
              <Link to="/diensten/meten-en-beproeven" className="text-[#0d3b2e] underline underline-offset-4 hover:text-[#9ed42e]">
                meten &amp; beproeven
              </Link>
              .
            </p>
          </div>
        </section>

        {/* WERKGEBIED */}
        <section id="werkgebied" className="py-16 md:py-24 bg-[#f8f9fa] scroll-mt-24">
          <div className="container mx-auto px-5 sm:px-6 lg:px-12">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 bg-[#0d3b2e] text-[#9ed42e] px-4 py-2 rounded-full text-sm mb-5 tracking-wider uppercase">
                <MapPin className="w-4 h-4" aria-hidden="true" />
                Werkgebied
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl text-[#0d3b2e] mb-4">Aardpen slaan in Utrecht en omgeving</h2>
              <p className="text-lg text-[#6c757d] leading-relaxed mb-8">
                TerreVolt werkt vanuit {company.address.city} in heel Nederland, met nadruk op {werkgebied.join(", ")} en
                omliggende regio&#39;s. Buiten deze regio? Neem gerust contact op — wij plannen werk door heel Nederland in.
              </p>
              <ul className="flex flex-wrap justify-center gap-2 sm:gap-3">
                {werkgebied.map((plaats) => (
                  <li key={plaats} className="bg-white border border-gray-200 rounded-full px-4 py-2 text-[15px] text-[#0d3b2e]">
                    {plaats}
                  </li>
                ))}
              </ul>
              <p className="mt-8 text-sm text-[#6c757d]">
                Vestiging: {addressOneLine}
              </p>
            </div>

            <div className="max-w-5xl mx-auto mt-12">
              <h3 className="text-xl sm:text-2xl text-[#0d3b2e] mb-6 text-center">
                Aardpen slaan per plaats
              </h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {lokaleGebieden.map((g) => (
                  <li key={g.slug}>
                    <Link
                      to={`/contact?type=aarding&plaats=${g.slug}`}
                      data-cta={`Aardpen slaan ${g.plaats}`}
                      className="block h-full bg-white border border-gray-200 rounded-xl p-5 hover:border-[#9ed42e] transition-colors"
                    >
                      <span className="block text-[#0d3b2e] mb-1">Aardpen slaan {g.plaats}</span>
                      <span className="block text-sm text-[#6c757d] leading-relaxed">{g.text}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </section>

        {/* FAQ */}
        <section id="veelgestelde-vragen" className="py-16 md:py-24 bg-white scroll-mt-24">
          <div className="container mx-auto px-5 sm:px-6 lg:px-12">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl text-[#0d3b2e] mb-4">Veelgestelde vragen over aarding</h2>
            </div>
            <div className="max-w-3xl mx-auto space-y-4">
              {faq.map((item) => (
                <details key={item.q} className="group bg-[#f8f9fa] border border-gray-200 rounded-xl p-5 open:border-[#9ed42e]">
                  <summary className="cursor-pointer list-none text-[#0d3b2e] text-lg flex items-start justify-between gap-4 min-h-[44px]">
                    <h3 className="text-lg text-[#0d3b2e]">{item.q}</h3>
                    <span className="text-[#9ed42e] transition-transform group-open:rotate-45 text-2xl leading-none">+</span>
                  </summary>
                  <p className="mt-3 text-[#6c757d] leading-relaxed">{item.a}</p>
                </details>
              ))}
            </div>

            <div className="max-w-3xl mx-auto mt-10 bg-[#f8f9fa] border border-gray-200 rounded-2xl p-6 sm:p-8 text-center">
              <p className="text-[#0d3b2e] text-lg mb-5">
                Staat uw vraag er niet bij? Stuur postcode en een foto van de meterkast — dan weten wij meestal
                meteen wat er nodig is.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link
                  to="/contact?type=aarding"
                  data-cta="Prijsindicatie aanvragen (na FAQ)"
                  className="bg-[#9ed42e] text-[#0d3b2e] px-7 py-4 min-h-[56px] rounded-lg hover:bg-[#8bc41f] transition-colors flex items-center justify-center"
                >
                  Prijsindicatie aanvragen
                </Link>
                <a
                  href={telHref}
                  className="border-2 border-[#0d3b2e]/25 text-[#0d3b2e] px-7 py-4 min-h-[56px] rounded-lg hover:border-[#0d3b2e] transition-colors flex items-center justify-center gap-2"
                >
                  <Phone className="w-5 h-5" aria-hidden="true" />
                  Bel direct
                </a>
                {waLink && (
                  <a
                    href={waLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="border-2 border-[#0d3b2e]/25 text-[#0d3b2e] px-7 py-4 min-h-[56px] rounded-lg hover:border-[#0d3b2e] transition-colors flex items-center justify-center gap-2"
                  >
                    <MessageCircle className="w-5 h-5" aria-hidden="true" />
                    WhatsApp foto sturen
                  </a>
                )}
              </div>
            </div>
          </div>
        </section>


        <WhenToCall
          variant="muted"
          items={[
            "Bij het slaan van een aardpen of aardelektrode",
            "Bij aanleg of verbetering van aarding",
            "Bij aardingsmetingen en meetrapportage",
            "Bij aarding voor laadpaal of zonnepanelen",
            "Bij stationsaarding en potentiaalvereffening",
            "Bij opleverrapportage en keuringsdossiers",
          ]}
        />

        <SafetyStatement />

        {/* EIND-CTA */}
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
              <h2 className="text-3xl sm:text-4xl lg:text-5xl text-white mb-6 hyphens-nl" lang="nl">
                Aarding laten controleren of <span className="text-[#9ed42e]">aardpen laten slaan?</span>
              </h2>
              <p className="text-lg sm:text-xl text-white/85 mb-10 leading-relaxed">
                Stuur uw situatie door of bel direct. TerreVolt denkt mee over de juiste aanpak, meting en oplevering.
              </p>
              <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 justify-center">
                <Link
                  to="/contact?type=aarding"
                  data-cta="Prijsindicatie aanvragen (eind-CTA)"
                  className="bg-[#9ed42e] text-[#0d3b2e] px-8 py-4 min-h-[56px] rounded-lg hover:bg-[#8bc41f] transition-colors flex items-center justify-center"
                >
                  Prijsindicatie aanvragen
                </Link>
                <a
                  href={telHref}
                  className="border-2 border-white/40 text-white px-8 py-4 min-h-[56px] rounded-lg hover:border-white transition-colors flex items-center justify-center gap-2"
                >
                  <Phone className="w-5 h-5" aria-hidden="true" />
                  Bel TerreVolt
                </a>
                <Link
                  to="/contact?type=aarding"
                  data-cta="Meetrapport aanvragen (eind-CTA)"
                  className="border-2 border-[#9ed42e] text-[#9ed42e] px-8 py-4 min-h-[56px] rounded-lg hover:bg-[#9ed42e] hover:text-[#0d3b2e] transition-colors flex items-center justify-center"
                >
                  Meetrapport aanvragen
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Aardingsoplossingen;
