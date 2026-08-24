import { ArrowRight, Building2, Camera, CheckCircle2, ClipboardList, Clock, Euro, Factory, FileCheck, Gauge, Home, MapPin, MessageCircle, Phone, Plug, ShieldCheck, Wrench, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import { Footer } from "@/components/terrevolt/Footer";
import { Header } from "@/components/terrevolt/Header";
import { SafetyStatement } from "@/components/terrevolt/SafetyStatement";
import { WhenToCall } from "@/components/terrevolt/WhenToCall";
import { company, SITE_URL, telHref } from "@/config/company";
import { usePageMeta } from "../../hooks/usePageMeta";
import { whatsappLink } from "@/lib/whatsapp";
import aardpenFoto from "@/assets/aarding-aardpen-slaan.jpg";
import meetrapportFoto from "@/assets/aarding-meetrapport.jpg";
import meterkastFoto from "@/assets/aarding-meterkast.jpg";

const CITY = "Amsterdam";
const PAGE_PATH = "/aardpen-slaan-amsterdam";
const PAGE_URL = `${SITE_URL}${PAGE_PATH}`;
const CONTACT_URL = "/contact?type=aarding&plaats=amsterdam";

const waLink = whatsappLink(
  company.phone.e164,
  "Hallo TerreVolt, ik wil graag een prijsindicatie voor aardpen slaan / aarding meten in Amsterdam. Mijn postcode is:",
);

const proofPoints = [
  { icon: Clock, text: "Reactie meestal binnen 1 werkdag" },
  { icon: Camera, text: "Postcode en foto meterkast meesturen" },
  { icon: FileCheck, text: "Meetrapport mogelijk voor installateur of keuring" },
  { icon: MapPin, text: "Amsterdam, randgemeenten en zakelijke locaties" },
];

const heroBullets = [
  "Aardpen slaan voor woning, meterkast, laadpaal of zonnepanelen",
  "Aarding meten met duidelijke meetwaarden en meetrapport",
  "Voor particulieren, VvE's, installateurs en bedrijven",
  "Geschikt bij oude waterleiding-aarding, renovatie of afkeuring",
];

const situaties = [
  {
    icon: Home,
    title: "Oude woning of renovatie",
    text: "Veel Amsterdamse woningen zijn verbouwd, gesplitst of hebben nog oude aarding via de waterleiding. Wij controleren de situatie en brengen de aarding meetbaar op orde.",
  },
  {
    icon: Plug,
    title: "Nieuwe meterkast",
    text: "Bij vervanging van de groepenkast vraagt de installateur vaak om een betrouwbare aarding en meetwaarde voordat de installatie wordt opgeleverd.",
  },
  {
    icon: Zap,
    title: "Laadpaal of zonnepanelen",
    text: "Een laadpaal of PV-installatie vraagt om een deugdelijke aardingsvoorziening en goede potentiaalvereffening.",
  },
  {
    icon: Building2,
    title: "Appartement, winkel of VvE",
    text: "Bij appartementen, winkels en VvE-panden letten we extra op bereikbaarheid, kabelroute, kruipruimte, gevel/stoep en de aansluiting op de hoofdaardrail.",
  },
  {
    icon: Factory,
    title: "Bedrijfspand of technische ruimte",
    text: "Voor werkplaatsen, kantoren en technische installaties leveren we metingen en rapportage voor oplevering, beheer of periodieke controle.",
  },
  {
    icon: ShieldCheck,
    title: "Afkeuring of meetrapport nodig",
    text: "Is de installatie afgekeurd of vraagt een installateur om bewijs? Dan meten we de aardverspreidingsweerstand en leggen we de waarden vast.",
  },
];

const wijken = [
  "Centrum",
  "Noord",
  "West",
  "Nieuw-West",
  "Zuid",
  "Oost",
  "Zuidoost",
  "De Pijp",
  "Jordaan",
  "Oud-West",
  "Zuidas",
  "IJburg",
  "Buitenveldert",
  "Osdorp",
  "Slotervaart",
  "Watergraafsmeer",
];

const randgemeenten = ["Amstelveen", "Diemen", "Zaandam", "Weesp", "Haarlem", "Hoofddorp", "Almere"];

const prijsFactoren = [
  "Grondsoort en benodigde diepte om de juiste meetwaarde te halen",
  "Bereikbaarheid van meterkast, kruipruimte, tuin, gevel of technische ruimte",
  "Lengte en route van de aardleiding naar de hoofdaardrail",
  "Wel of geen meetrapport voor installateur, keuring of opleverdossier",
  "Aantal aardelektroden of locaties bij bedrijfspanden en grotere installaties",
  "Planning, parkeersituatie en toegang binnen Amsterdam",
];

const stappen = [
  { title: "Postcode en foto", text: "Stuur uw postcode, korte omschrijving en liefst foto's van meterkast en mogelijke plaatsingslocatie." },
  { title: "Prijsindicatie", text: "We beoordelen bereikbaarheid, situatie en rapportagebehoefte en geven vooraf een duidelijke indicatie." },
  { title: "Aardpen slaan", text: "De aardelektrode wordt geplaatst of de bestaande aarding wordt verbeterd en aangesloten." },
  { title: "Aarding meten", text: "We meten de aardverspreidingsweerstand en controleren de verbinding naar de hoofdaardrail." },
  { title: "Meetrapport", text: "Indien gewenst ontvangt u de meetwaarden, datum, locatie en methode zwart-op-wit." },
];

const doelgroepen = [
  {
    icon: Home,
    title: "Particulieren",
    items: [
      "Aardpen voor woning of appartement",
      "Aarding bij nieuwe meterkast",
      "Oude aarding via waterleiding vervangen",
      "Aarding voor laadpaal of zonnepanelen",
    ],
  },
  {
    icon: Wrench,
    title: "Installateurs en aannemers",
    items: [
      "Aardingsmeting voor oplevering",
      "Meetrapport voor dossier of keuring",
      "Snelle afstemming tijdens renovatie",
      "Werk op locatie in Amsterdam en omgeving",
    ],
  },
  {
    icon: Factory,
    title: "Bedrijven en beheerders",
    items: [
      "Aarding voor bedrijfspand of werkplaats",
      "Periodieke aardingsmetingen",
      "Technische ruimten en installaties",
      "Meerdere meetpunten of locaties",
    ],
  },
];

const faq = [
  {
    q: "Wat kost een aardpen laten slaan in Amsterdam?",
    a: "De prijs hangt af van bodem, diepte, bereikbaarheid, aansluiting op de meterkast en of u een meetrapport nodig heeft. Stuur postcode en foto's mee; dan ontvangt u vooraf een duidelijke prijsindicatie.",
  },
  {
    q: "Hoe snel kan TerreVolt in Amsterdam langskomen?",
    a: "Na uw aanvraag reageren wij meestal binnen 1 werkdag met een inschatting en planning. Spoed of een opleverdatum? Zet dat direct in de aanvraag, dan kijken we wat haalbaar is.",
  },
  {
    q: "Krijg ik een meetrapport na het slaan van de aardpen?",
    a: "Ja, als u dat nodig heeft. Het meetrapport bevat de gemeten aardverspreidingsweerstand, datum, locatie en meetmethode. Dat is handig voor installateur, keuring, VvE, netbeheerder of opleverdossier.",
  },
  {
    q: "Is aarding via de waterleiding nog betrouwbaar?",
    a: "Daar kunt u niet meer zomaar op vertrouwen. Zodra een deel van de waterleiding is vervangen door kunststof, kan de aardverbinding onderbroken zijn. Een gemeten aardelektrode is dan de veilige oplossing.",
  },
  {
    q: "Slaan jullie ook aardpennen voor bedrijven in Amsterdam?",
    a: "Ja. TerreVolt werkt voor particulieren, installateurs, aannemers, VvE's en bedrijven. Ook technische ruimten, werkplaatsen en grotere installaties kunnen gemeten worden opgeleverd.",
  },
  {
    q: "Werken jullie alleen in Amsterdam?",
    a: `Nee. Deze pagina is gericht op ${CITY}, maar TerreVolt werkt ook in ${randgemeenten.join(", ")} en door heel Nederland.`,
  },
];

const AardpenSlaanAmsterdam = () => {
  usePageMeta({
    title: "Aardpen slaan Amsterdam | Aarding meten met meetrapport | TerreVolt",
    description:
      "Aardpen laten slaan in Amsterdam of aarding laten meten? TerreVolt helpt particulieren, installateurs en bedrijven met aardpen, meetrapport, laadpaal, zonnepanelen en meterkast.",
    canonical: PAGE_PATH,
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "Service",
        name: "Aardpen slaan Amsterdam",
        serviceType: "Aardpen slaan, aarding meten en meetrapport in Amsterdam",
        description:
          "Aardpen laten slaan en aarding laten meten in Amsterdam voor woningen, meterkasten, laadpalen, zonnepanelen, VvE's, installateurs en bedrijven.",
        url: PAGE_URL,
        provider: { "@id": `${SITE_URL}/#organization` },
        areaServed: [
          { "@type": "City", name: "Amsterdam" },
          ...randgemeenten.map((name) => ({ "@type": "City", name })),
        ],
        audience: [
          { "@type": "Audience", audienceType: "Particulieren" },
          { "@type": "BusinessAudience", audienceType: "Installateurs, VvE's en bedrijven" },
        ],
        availableChannel: [
          { "@type": "ServiceChannel", name: "Prijsindicatie aanvragen", serviceUrl: `${SITE_URL}${CONTACT_URL}` },
          { "@type": "ServiceChannel", name: "Telefonisch contact", servicePhone: { "@type": "ContactPoint", telephone: company.phone.e164 } },
        ],
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
          { "@type": "ListItem", position: 2, name: "Aarding", item: `${SITE_URL}/aarding-aanleggen` },
          { "@type": "ListItem", position: 3, name: "Aardpen slaan Amsterdam", item: PAGE_URL },
        ],
      },
    ],
  });

  return (
    <div className="min-h-screen bg-[#f8f9fa]">
      <Header />

      <main id="main-content" className="pt-16 sm:pt-20">
        <section className="relative overflow-hidden bg-gradient-to-br from-[#0d3b2e] via-[#1a4a36] to-[#0d3b2e] py-14 sm:py-20">
          <div className="absolute inset-0 opacity-[0.08]">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `linear-gradient(rgba(158, 212, 46, 0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(158, 212, 46, 0.4) 1px, transparent 1px)`,
                backgroundSize: "60px 60px",
              }}
            />
          </div>

          <div className="container mx-auto px-5 sm:px-6 lg:px-12 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-10 lg:gap-14 items-center">
              <div>
                <div className="inline-flex items-center gap-2 bg-[#9ed42e] text-[#0d3b2e] px-4 py-2 rounded-full text-sm mb-6 tracking-wider uppercase">
                  <MapPin className="w-4 h-4" aria-hidden="true" />
                  Amsterdam
                </div>
                <h1 className="text-[clamp(1.9rem,6.6vw,2.75rem)] sm:text-4xl lg:text-5xl text-white mb-5 leading-[1.12] hyphens-nl text-pretty" lang="nl">
                  Aardpen laten slaan in Amsterdam
                </h1>
                <p className="text-[17px] sm:text-lg lg:text-xl text-white/85 mb-6 max-w-3xl leading-relaxed">
                  Aarding nodig voor uw meterkast, laadpaal, zonnepanelen, renovatie, VvE of bedrijfspand? TerreVolt
                  slaat aardpennen, meet de aardverspreidingsweerstand en levert indien gewenst een meetrapport.
                </p>

                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 mb-8 max-w-3xl">
                  {heroBullets.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-white/90 text-[15px] leading-relaxed">
                      <CheckCircle2 className="w-5 h-5 text-[#9ed42e] flex-shrink-0 mt-0.5" strokeWidth={2.5} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4">
                  <Link
                    to={CONTACT_URL}
                    data-cta="Prijsindicatie aanvragen Amsterdam hero"
                    className="group bg-[#9ed42e] text-[#0d3b2e] px-6 sm:px-8 py-4 min-h-[56px] rounded-lg hover:bg-[#8bc41f] transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <span>Prijsindicatie Amsterdam</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
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
                      WhatsApp foto
                    </a>
                  )}
                </div>

                <p className="mt-5 text-[15px] text-white/80 leading-relaxed max-w-2xl">
                  Stuur postcode, korte omschrijving en foto van de meterkast. Dan kunnen we sneller bepalen wat er nodig is.
                </p>
              </div>

              <div className="relative">
                <img
                  src={aardpenFoto}
                  alt="Aardpen laten slaan bij een woning in Amsterdam"
                  width={1280}
                  height={960}
                  loading="eager"
                  className="w-full h-auto rounded-2xl border border-white/15 object-cover shadow-2xl"
                />
                <div className="absolute left-4 right-4 bottom-4 bg-white/95 backdrop-blur rounded-xl p-4 border border-white/60">
                  <div className="flex items-start gap-3">
                    <Gauge className="w-6 h-6 text-[#0d3b2e] flex-shrink-0 mt-0.5" aria-hidden="true" />
                    <p className="text-[#0d3b2e] text-sm leading-relaxed">
                      Meting en rapportage mogelijk voor installateur, keuring, VvE of opleverdossier.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white border-b border-gray-200">
          <div className="container mx-auto px-5 sm:px-6 lg:px-12 py-6 sm:py-8">
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {proofPoints.map((point) => {
                const Icon = point.icon;
                return (
                  <li key={point.text} className="flex items-start gap-3">
                    <span className="w-9 h-9 flex-shrink-0 rounded-lg bg-[#f0f7e6] flex items-center justify-center">
                      <Icon className="w-[18px] h-[18px] text-[#0d3b2e]" strokeWidth={2} aria-hidden="true" />
                    </span>
                    <span className="text-[15px] text-[#495057] leading-snug">{point.text}</span>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>

        <section id="situaties" className="py-16 md:py-24 bg-white scroll-mt-24">
          <div className="container mx-auto px-5 sm:px-6 lg:px-12">
            <div className="max-w-4xl mx-auto text-center mb-12">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl text-[#0d3b2e] mb-4 hyphens-nl" lang="nl">
                Aarding nodig in Amsterdam?
              </h2>
              <p className="text-lg sm:text-xl text-[#6c757d] leading-relaxed">
                De meeste aanvragen komen door een nieuwe meterkast, een oude woning, laadpaal, zonnepanelen of een
                rapport dat nodig is voor oplevering. Deze situaties handelen we gericht af.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
              {situaties.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.title} className="group bg-white border border-gray-200 rounded-xl p-6 hover:border-[#9ed42e] hover:shadow-xl transition-all duration-300">
                    <div className="w-12 h-12 bg-[#f0f7e6] rounded-lg flex items-center justify-center mb-4 group-hover:bg-[#9ed42e] transition-colors duration-300">
                      <Icon className="w-6 h-6 text-[#0d3b2e] group-hover:text-white transition-colors duration-300" strokeWidth={2} aria-hidden="true" />
                    </div>
                    <h3 className="text-lg text-[#0d3b2e] mb-2 hyphens-nl" lang="nl">{item.title}</h3>
                    <p className="text-[#6c757d] text-sm leading-relaxed">{item.text}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section id="amsterdam" className="py-16 md:py-24 bg-[#f8f9fa] scroll-mt-24">
          <div className="container mx-auto px-5 sm:px-6 lg:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
              <div>
                <img
                  src={meterkastFoto}
                  alt="Meterkast controleren voor aardpen slaan en aarding meten in Amsterdam"
                  width={1280}
                  height={960}
                  loading="lazy"
                  className="w-full h-auto rounded-2xl border border-gray-200 object-cover"
                />
              </div>
              <div>
                <div className="inline-flex items-center gap-2 bg-[#0d3b2e] text-[#9ed42e] px-4 py-2 rounded-full text-sm mb-5 tracking-wider uppercase">
                  <MapPin className="w-4 h-4" aria-hidden="true" />
                  Lokaal
                </div>
                <h2 className="text-3xl sm:text-4xl text-[#0d3b2e] mb-5 hyphens-nl" lang="nl">
                  Extra aandacht voor Amsterdamse woningen en panden
                </h2>
                <p className="text-[#6c757d] leading-relaxed mb-5">
                  In Amsterdam spelen vaak praktische zaken mee: oudere installaties, beperkte ruimte rond de meterkast,
                  appartementen, VvE-afstemming, smalle toegang of een aardleiding die netjes naar de hoofdaardrail moet.
                </p>
                <p className="text-[#6c757d] leading-relaxed mb-6">
                  Daarom vragen we graag om postcode en foto's. Daarmee kunnen we vooraf beter inschatten of er binnen,
                  via kruipruimte, tuin, gevel of technische ruimte gewerkt moet worden.
                </p>
                <Link
                  to={CONTACT_URL}
                  data-cta="Amsterdam situatie laten beoordelen"
                  className="inline-flex items-center justify-center gap-2 bg-[#9ed42e] text-[#0d3b2e] px-7 py-4 min-h-[56px] rounded-lg hover:bg-[#8bc41f] transition-colors"
                >
                  Situatie laten beoordelen
                  <ArrowRight className="w-5 h-5" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section id="kosten" className="py-16 md:py-24 bg-white scroll-mt-24">
          <div className="container mx-auto px-5 sm:px-6 lg:px-12">
            <div className="max-w-4xl mx-auto text-center mb-10">
              <div className="inline-flex items-center gap-2 bg-[#0d3b2e] text-[#9ed42e] px-4 py-2 rounded-full text-sm mb-5 tracking-wider uppercase">
                <Euro className="w-4 h-4" aria-hidden="true" />
                Kosten
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl text-[#0d3b2e] mb-4 hyphens-nl" lang="nl">
                Kosten aardpen slaan in Amsterdam
              </h2>
              <p className="text-lg text-[#6c757d] leading-relaxed">
                Concurrenten tonen vaak scherpe vanafprijzen. TerreVolt kiest voor een duidelijke prijsindicatie vooraf,
                gebaseerd op uw echte situatie, zodat diepte, bereikbaarheid en rapportage meteen goed zijn meegenomen.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-5xl mx-auto mb-8">
              {prijsFactoren.map((factor) => (
                <div key={factor} className="flex items-start gap-3 bg-[#f8f9fa] border border-gray-200 rounded-xl p-4">
                  <CheckCircle2 className="w-5 h-5 text-[#9ed42e] flex-shrink-0 mt-0.5" strokeWidth={2.5} aria-hidden="true" />
                  <span className="text-[15px] text-[#495057] leading-relaxed">{factor}</span>
                </div>
              ))}
            </div>

            <div className="max-w-4xl mx-auto bg-[#0d3b2e] rounded-2xl p-6 sm:p-8 text-center">
              <h3 className="text-xl sm:text-2xl text-white mb-3">Snelle prijsindicatie voor Amsterdam</h3>
              <p className="text-white/80 leading-relaxed mb-6 max-w-2xl mx-auto">
                Stuur postcode, situatie en foto's van de meterkast mee. Dan krijgt u vooraf duidelijkheid over aanpak,
                planning en meetrapport.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link
                  to={CONTACT_URL}
                  data-cta="Prijsindicatie Amsterdam kostenblok"
                  className="bg-[#9ed42e] text-[#0d3b2e] px-7 py-4 min-h-[56px] rounded-lg hover:bg-[#8bc41f] transition-colors flex items-center justify-center"
                >
                  Prijsindicatie aanvragen
                </Link>
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
        </section>

        <section id="werkwijze" className="py-16 md:py-24 bg-[#f8f9fa] scroll-mt-24">
          <div className="container mx-auto px-5 sm:px-6 lg:px-12">
            <div className="max-w-4xl mx-auto text-center mb-12">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl text-[#0d3b2e] mb-4">Zo werkt het</h2>
              <p className="text-lg text-[#6c757d] leading-relaxed">
                Van aanvraag tot meetrapport: kort, controleerbaar en geschikt voor particuliere en zakelijke situaties.
              </p>
            </div>
            <ol className="grid grid-cols-1 md:grid-cols-5 gap-5 max-w-6xl mx-auto">
              {stappen.map((stap, index) => (
                <li key={stap.title} className="bg-white border border-gray-200 rounded-xl p-5">
                  <div className="w-10 h-10 bg-[#9ed42e] text-[#0d3b2e] rounded-lg flex items-center justify-center mb-4 text-lg">
                    {index + 1}
                  </div>
                  <h3 className="text-lg text-[#0d3b2e] mb-2 hyphens-nl" lang="nl">{stap.title}</h3>
                  <p className="text-[#6c757d] text-sm leading-relaxed">{stap.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section id="meetrapport" className="py-16 md:py-24 bg-[#0d3b2e] relative overflow-hidden scroll-mt-24">
          <div className="container mx-auto px-5 sm:px-6 lg:px-12 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center max-w-6xl mx-auto">
              <div>
                <div className="inline-flex items-center gap-2 bg-[#9ed42e] text-[#0d3b2e] px-4 py-2 rounded-full text-sm mb-5 tracking-wider uppercase">
                  <ClipboardList className="w-4 h-4" aria-hidden="true" />
                  Meetrapport
                </div>
                <h2 className="text-3xl sm:text-4xl text-white mb-5 hyphens-nl" lang="nl">
                  Aarding meten in Amsterdam met rapportage
                </h2>
                <p className="text-white/80 leading-relaxed mb-6">
                  Een aardpen is pas waardevol als de weerstand ook is gemeten. TerreVolt kan de meetwaarden vastleggen
                  voor uw installateur, keuring, VvE, netbeheerder of opleverdossier.
                </p>
                <ul className="space-y-3 mb-7">
                  {[
                    "Aardverspreidingsweerstand gemeten op locatie",
                    "Controle van aansluiting naar hoofdaardrail",
                    "Rapportage bruikbaar voor dossier of oplevering",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3 text-white/85">
                      <FileCheck className="w-5 h-5 text-[#9ed42e] flex-shrink-0 mt-0.5" aria-hidden="true" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  to={CONTACT_URL}
                  data-cta="Meetrapport Amsterdam aanvragen"
                  className="inline-flex items-center justify-center gap-2 bg-[#9ed42e] text-[#0d3b2e] px-7 py-4 min-h-[56px] rounded-lg hover:bg-[#8bc41f] transition-colors"
                >
                  Meetrapport aanvragen
                  <ArrowRight className="w-5 h-5" aria-hidden="true" />
                </Link>
              </div>
              <img
                src={meetrapportFoto}
                alt="Aardingsmeting met meetrapport in Amsterdam"
                width={1280}
                height={960}
                loading="lazy"
                className="w-full h-auto rounded-2xl border border-white/15 object-cover"
              />
            </div>
          </div>
        </section>

        <section id="voor-wie" className="py-16 md:py-24 bg-white scroll-mt-24">
          <div className="container mx-auto px-5 sm:px-6 lg:px-12">
            <div className="max-w-4xl mx-auto text-center mb-12">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl text-[#0d3b2e] mb-4 hyphens-nl" lang="nl">
                Voor wie werken wij in Amsterdam?
              </h2>
              <p className="text-lg text-[#6c757d] leading-relaxed">
                De pagina richt zich bewust op beide markten: particuliere woningen én zakelijke installaties.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {doelgroepen.map((groep) => {
                const Icon = groep.icon;
                return (
                  <div key={groep.title} className="bg-[#f8f9fa] border border-gray-200 rounded-xl p-7">
                    <div className="w-12 h-12 bg-[#0d3b2e] rounded-lg flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-[#9ed42e]" strokeWidth={2} aria-hidden="true" />
                    </div>
                    <h3 className="text-xl text-[#0d3b2e] mb-4">{groep.title}</h3>
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
          </div>
        </section>

        <section id="werkgebied" className="py-16 md:py-24 bg-[#f8f9fa] scroll-mt-24">
          <div className="container mx-auto px-5 sm:px-6 lg:px-12">
            <div className="max-w-4xl mx-auto text-center mb-10">
              <div className="inline-flex items-center gap-2 bg-[#0d3b2e] text-[#9ed42e] px-4 py-2 rounded-full text-sm mb-5 tracking-wider uppercase">
                <MapPin className="w-4 h-4" aria-hidden="true" />
                Werkgebied
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl text-[#0d3b2e] mb-4 hyphens-nl" lang="nl">
                Aardpen slaan in Amsterdam en omgeving
              </h2>
              <p className="text-lg text-[#6c757d] leading-relaxed">
                Actief in de stad en omliggende plaatsen. Staat uw wijk er niet tussen? Stuur alsnog uw postcode mee.
              </p>
            </div>

            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <h3 className="text-xl text-[#0d3b2e] mb-4">Amsterdamse wijken</h3>
                <ul className="flex flex-wrap gap-2">
                  {wijken.map((wijk) => (
                    <li key={wijk} className="bg-[#f8f9fa] border border-gray-200 rounded-full px-4 py-2 text-[15px] text-[#0d3b2e]">
                      {wijk}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <h3 className="text-xl text-[#0d3b2e] mb-4">Rondom Amsterdam</h3>
                <ul className="flex flex-wrap gap-2">
                  {randgemeenten.map((plaats) => (
                    <li key={plaats} className="bg-[#f8f9fa] border border-gray-200 rounded-full px-4 py-2 text-[15px] text-[#0d3b2e]">
                      {plaats}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section id="veelgestelde-vragen" className="py-16 md:py-24 bg-white scroll-mt-24">
          <div className="container mx-auto px-5 sm:px-6 lg:px-12">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl text-[#0d3b2e] mb-4">Veelgestelde vragen over aardpen slaan in Amsterdam</h2>
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
          </div>
        </section>

        <WhenToCall
          variant="muted"
          items={[
            "Bij een nieuwe of vervangen meterkast in Amsterdam",
            "Bij aarding via oude waterleiding",
            "Bij aarding voor laadpaal of zonnepanelen",
            "Bij aardingsmeting met meetrapport",
            "Bij afkeuring, storing of opleverdossier",
            "Bij bedrijfspand, VvE of technische ruimte",
          ]}
        />

        <SafetyStatement />

        <section id="contact" className="py-16 md:py-24 bg-gradient-to-br from-[#0d3b2e] via-[#1a4a36] to-[#0d3b2e] relative overflow-hidden scroll-mt-24">
          <div className="container mx-auto px-5 sm:px-6 lg:px-12 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl text-white mb-6 hyphens-nl" lang="nl">
                Aardpen laten slaan in <span className="text-[#9ed42e]">Amsterdam?</span>
              </h2>
              <p className="text-lg sm:text-xl text-white/85 mb-10 leading-relaxed">
                Stuur uw postcode, situatie en foto van de meterkast. TerreVolt denkt mee over de juiste aanpak, meting en oplevering.
              </p>
              <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 justify-center">
                <Link
                  to={CONTACT_URL}
                  data-cta="Prijsindicatie Amsterdam eind CTA"
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
                {waLink && (
                  <a
                    href={waLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="border-2 border-[#9ed42e] text-[#9ed42e] px-8 py-4 min-h-[56px] rounded-lg hover:bg-[#9ed42e] hover:text-[#0d3b2e] transition-colors flex items-center justify-center gap-2"
                  >
                    <MessageCircle className="w-5 h-5" aria-hidden="true" />
                    WhatsApp foto
                  </a>
                )}
              </div>
            </div>
          </div>
        </section>

        <div className="h-20 md:hidden" aria-hidden="true" />
      </main>

      <div className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur border-t border-gray-200 px-3 py-2 pb-[calc(0.5rem+env(safe-area-inset-bottom))]">
        <div className="grid grid-cols-3 gap-2">
          <a
            href={telHref}
            className="flex flex-col items-center justify-center gap-1 min-h-[48px] rounded-lg border border-[#0d3b2e]/20 text-[#0d3b2e] text-xs"
          >
            <Phone className="w-4 h-4" aria-hidden="true" />
            Bel
          </a>
          {waLink && (
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center justify-center gap-1 min-h-[48px] rounded-lg border border-[#0d3b2e]/20 text-[#0d3b2e] text-xs"
            >
              <MessageCircle className="w-4 h-4" aria-hidden="true" />
              WhatsApp
            </a>
          )}
          <Link
            to={CONTACT_URL}
            data-cta="Prijsindicatie Amsterdam sticky mobiel"
            className="flex items-center justify-center min-h-[48px] rounded-lg bg-[#9ed42e] text-[#0d3b2e] text-xs text-center px-2"
          >
            Prijsindicatie
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default AardpenSlaanAmsterdam;
