import { ArrowRight, Building2, Camera, CheckCircle2, Clock, Euro, Factory, FileCheck, Gauge, Home, MapPin, MessageCircle, Phone, Plug, ShieldCheck, Wrench, Zap } from "lucide-react";
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

const PAGE_PATH = "/aarding-aanleggen";
const PAGE_URL = `${SITE_URL}${PAGE_PATH}`;
const CONTACT_URL = "/contact?type=aarding";

const waLink = whatsappLink(
  company.phone.e164,
  "Hallo TerreVolt, ik wil graag een prijsindicatie voor aardpen slaan / aarding meten. Mijn postcode is:",
);

const proofPoints = [
  { icon: Clock, text: "Reactie meestal binnen 1 werkdag" },
  { icon: Camera, text: "Foto meterkast meesturen voor snellere prijsindicatie" },
  { icon: FileCheck, text: "Meetrapport mogelijk voor installateur, keuring of dossier" },
  { icon: MapPin, text: "Landelijke planning, gestart met sterke stadspagina's" },
];

const heroBullets = [
  "Aardpen slaan voor woning, meterkast, laadpaal of zonnepanelen",
  "Aarding meten met duidelijke meetwaarden",
  "Meetrapport mogelijk voor installateur, keuring of opleverdossier",
  "Voor particulieren, VvE's, installateurs en bedrijven",
];

const situaties = [
  {
    icon: Home,
    title: "Oude woning zonder betrouwbare aarding",
    text: "Bij oudere woningen komt aarding via de waterleiding nog regelmatig voor. Zodra leidingen zijn vervangen door kunststof is die oplossing niet betrouwbaar.",
  },
  {
    icon: Plug,
    title: "Nieuwe of vervangen meterkast",
    text: "Bij een nieuwe groepenkast vraagt de installateur vaak om een gemeten aardingsvoorziening voordat de installatie wordt opgeleverd.",
  },
  {
    icon: Zap,
    title: "Laadpaal of zonnepanelen",
    text: "Een laadpaal of PV-installatie vraagt om goede aarding en potentiaalvereffening. Wij meten en leggen de waarden vast als dat nodig is.",
  },
  {
    icon: ShieldCheck,
    title: "Afkeuring of controlemeting",
    text: "Is uw installatie afgekeurd of twijfelt u aan de aarding? Dan meten we de aardverspreidingsweerstand en adviseren we de juiste aanpak.",
  },
  {
    icon: Building2,
    title: "VvE, winkel of bedrijfspand",
    text: "Ook appartementen, winkels, werkplaatsen en technische ruimten kunnen een meetbaar opgeleverde aardingsvoorziening nodig hebben.",
  },
  {
    icon: Factory,
    title: "Zakelijke installaties",
    text: "Voor bedrijven, installateurs en aannemers leveren we aardingsmetingen, rapportages en uitvoering op projectlocaties.",
  },
];

const prijsFactoren = [
  "Grondsoort en benodigde diepte",
  "Bereikbaarheid van meterkast, kruipruimte, tuin of technische ruimte",
  "Aansluiting op hoofdaardrail en potentiaalvereffening",
  "Wel of geen meetrapport",
  "Aantal aardelektroden of meetpunten",
  "Planning, toegang en eventuele parkeersituatie",
];

const lokalePaginas = [
  {
    plaats: "Amsterdam",
    path: "/aardpen-slaan-amsterdam",
    text: "Aparte landingspagina voor aardpen slaan, aarding meten, oude woningen, laadpalen, zonnepanelen, VvE's en bedrijven in Amsterdam.",
  },
];

const komendeSteden = ["Rotterdam", "Den Haag", "Utrecht", "Haarlem", "Almere", "Amstelveen", "Zaandam", "Diemen"];

const faq = [
  {
    q: "Wat kost een aardpen laten slaan?",
    a: "De prijs hangt af van bodem, diepte, bereikbaarheid, aansluiting op de meterkast en of u een meetrapport nodig heeft. Stuur postcode en foto's mee; dan ontvangt u vooraf een duidelijke prijsindicatie.",
  },
  {
    q: "Wanneer heb ik een aardpen nodig?",
    a: "Een aardpen is vaak nodig bij een oude woning zonder betrouwbare aarding, een nieuwe meterkast, een laadpaal, zonnepanelen, afkeuring of wanneer aarding via de waterleiding niet meer betrouwbaar is.",
  },
  {
    q: "Krijg ik een meetrapport?",
    a: "Ja, als u dat wenst. Het meetrapport bevat de gemeten aardverspreidingsweerstand, datum, locatie en meetmethode en is bruikbaar voor installateur, keuring of opleverdossier.",
  },
  {
    q: "Kan aarding via de waterleiding nog?",
    a: "Daar kunt u niet meer zomaar op vertrouwen. Wanneer een deel van de waterleiding is vervangen door kunststof, kan de aardverbinding onderbroken zijn. Een gemeten aardelektrode is dan de veilige oplossing.",
  },
  {
    q: "Werkt TerreVolt voor particulieren en bedrijven?",
    a: "Ja. TerreVolt werkt voor particuliere woningeigenaren, VvE's, installateurs, aannemers en bedrijven.",
  },
];

const AardingAanleggen = () => {
  usePageMeta({
    title: "Aardpen laten slaan | Aarding meten met meetrapport | TerreVolt",
    description:
      "Aardpen laten slaan of aarding laten meten? TerreVolt plaatst en controleert aarding voor woningen, laadpalen, zonnepanelen, meterkasten en bedrijven. Meetrapport mogelijk.",
    canonical: PAGE_PATH,
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "Service",
        name: "Aardpen laten slaan en aarding meten",
        serviceType: "Aardpen slaan, aarding aanleggen en aardingsmeting met meetrapport",
        description:
          "Plaatsen van aardpennen, aarding meten en meetrapportage voor woningen, meterkasten, laadpalen, zonnepanelen, VvE's en bedrijven.",
        url: PAGE_URL,
        relatedLink: [`${SITE_URL}/aardpen-slaan-amsterdam`],
        provider: { "@id": `${SITE_URL}/#organization` },
        areaServed: { "@type": "Country", name: "Nederland" },
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
          { "@type": "ListItem", position: 2, name: "Aarding", item: PAGE_URL },
        ],
      },
    ],
  });

  return (
    <div className="min-h-screen bg-[#f8f9fa]">
      <Header />

      <main id="main-content" className="pt-20 sm:pt-24">
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
                  Aarding &amp; aardingsmeting
                </div>
                <h1 className="text-[clamp(1.9rem,6.6vw,2.75rem)] sm:text-4xl lg:text-5xl text-white mb-5 leading-[1.12] hyphens-nl text-pretty" lang="nl">
                  Aardpen laten slaan en aarding laten meten
                </h1>
                <p className="text-[17px] sm:text-lg lg:text-xl text-white/85 mb-6 max-w-3xl leading-relaxed">
                  TerreVolt plaatst en meet aardingsvoorzieningen voor woningen, meterkasten, laadpalen, zonnepanelen,
                  VvE's, bedrijfspanden en technische installaties. Indien gewenst leveren wij een meetrapport voor
                  installateur, keuring of opleverdossier.
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
                    data-cta="Prijsindicatie aanvragen aarding hero"
                    className="group bg-[#9ed42e] text-[#0d3b2e] px-6 sm:px-8 py-4 min-h-[56px] rounded-lg hover:bg-[#8bc41f] transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <span>Prijsindicatie aanvragen</span>
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
              </div>

              <div className="relative">
                <img
                  src={aardpenFoto}
                  alt="Aardpen laten slaan en aarding meten door TerreVolt"
                  width={1280}
                  height={960}
                  loading="eager"
                  className="w-full h-auto rounded-2xl border border-white/15 object-cover shadow-2xl"
                />
                <div className="absolute left-4 right-4 bottom-4 bg-white/95 backdrop-blur rounded-xl p-4 border border-white/60">
                  <div className="flex items-start gap-3">
                    <Gauge className="w-6 h-6 text-[#0d3b2e] flex-shrink-0 mt-0.5" aria-hidden="true" />
                    <p className="text-[#0d3b2e] text-sm leading-relaxed">
                      Aardingsmeting met duidelijke meetwaarden en rapportage mogelijk.
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
                Wanneer is aarding laten aanleggen nodig?
              </h2>
              <p className="text-lg sm:text-xl text-[#6c757d] leading-relaxed">
                De meeste aanvragen ontstaan rond veiligheid, oplevering of uitbreiding van de installatie.
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

        <section id="kosten" className="py-16 md:py-24 bg-[#f8f9fa] scroll-mt-24">
          <div className="container mx-auto px-5 sm:px-6 lg:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center max-w-6xl mx-auto">
              <div>
                <div className="inline-flex items-center gap-2 bg-[#0d3b2e] text-[#9ed42e] px-4 py-2 rounded-full text-sm mb-5 tracking-wider uppercase">
                  <Euro className="w-4 h-4" aria-hidden="true" />
                  Kosten
                </div>
                <h2 className="text-3xl sm:text-4xl text-[#0d3b2e] mb-5 hyphens-nl" lang="nl">
                  Wat kost een aardpen laten slaan?
                </h2>
                <p className="text-[#6c757d] leading-relaxed mb-6">
                  De juiste prijs hangt af van uw situatie. Met postcode en foto's van de meterkast kunnen we veel sneller
                  inschatten wat nodig is en vooraf duidelijkheid geven over aanpak, planning en meetrapport.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {prijsFactoren.map((factor) => (
                    <div key={factor} className="flex items-start gap-3 bg-white border border-gray-200 rounded-xl p-4">
                      <CheckCircle2 className="w-5 h-5 text-[#9ed42e] flex-shrink-0 mt-0.5" strokeWidth={2.5} aria-hidden="true" />
                      <span className="text-[15px] text-[#495057] leading-relaxed">{factor}</span>
                    </div>
                  ))}
                </div>
              </div>
              <img
                src={meterkastFoto}
                alt="Meterkast controleren voor aardpen slaan en aarding meten"
                width={1280}
                height={960}
                loading="lazy"
                className="w-full h-auto rounded-2xl border border-gray-200 object-cover"
              />
            </div>
          </div>
        </section>

        <section id="meetrapport" className="py-16 md:py-24 bg-[#0d3b2e] scroll-mt-24">
          <div className="container mx-auto px-5 sm:px-6 lg:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center max-w-6xl mx-auto">
              <img
                src={meetrapportFoto}
                alt="Aardingsmeting met meetrapport door TerreVolt"
                width={1280}
                height={960}
                loading="lazy"
                className="w-full h-auto rounded-2xl border border-white/15 object-cover"
              />
              <div>
                <div className="inline-flex items-center gap-2 bg-[#9ed42e] text-[#0d3b2e] px-4 py-2 rounded-full text-sm mb-5 tracking-wider uppercase">
                  Meetrapport
                </div>
                <h2 className="text-3xl sm:text-4xl text-white mb-5 hyphens-nl" lang="nl">
                  Aarding meten met duidelijke rapportage
                </h2>
                <p className="text-white/80 leading-relaxed mb-6">
                  Een aardpen moet meetbaar werken. Daarom kunnen wij de aardverspreidingsweerstand meten en vastleggen
                  voor installateur, keuring, netbeheerder, VvE of opleverdossier.
                </p>
                <Link
                  to={CONTACT_URL}
                  data-cta="Meetrapport aanvragen hub"
                  className="inline-flex items-center justify-center gap-2 bg-[#9ed42e] text-[#0d3b2e] px-7 py-4 min-h-[56px] rounded-lg hover:bg-[#8bc41f] transition-colors"
                >
                  Meetrapport aanvragen
                  <ArrowRight className="w-5 h-5" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section id="werkgebied" className="py-16 md:py-24 bg-white scroll-mt-24">
          <div className="container mx-auto px-5 sm:px-6 lg:px-12">
            <div className="max-w-4xl mx-auto text-center mb-12">
              <div className="inline-flex items-center gap-2 bg-[#0d3b2e] text-[#9ed42e] px-4 py-2 rounded-full text-sm mb-5 tracking-wider uppercase">
                <MapPin className="w-4 h-4" aria-hidden="true" />
                Werkgebied
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl text-[#0d3b2e] mb-4 hyphens-nl" lang="nl">
                Aardpen slaan per stad
              </h2>
              <p className="text-lg text-[#6c757d] leading-relaxed">
                We bouwen de lokale pagina's stap voor stap uit. Amsterdam is de eerste scherpe stadspagina; de volgende
                grote steden volgen daarna volgens hetzelfde format.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-6xl mx-auto">
              {lokalePaginas.map((pagina) => (
                <Link
                  key={pagina.path}
                  to={pagina.path}
                  className="block bg-[#f8f9fa] border border-gray-200 rounded-xl p-6 hover:border-[#9ed42e] hover:shadow-xl transition-all duration-300"
                >
                  <h3 className="text-xl text-[#0d3b2e] mb-2">Aardpen slaan {pagina.plaats}</h3>
                  <p className="text-[#6c757d] leading-relaxed mb-4">{pagina.text}</p>
                  <span className="inline-flex items-center gap-2 text-[#0d3b2e] underline underline-offset-4 decoration-[#9ed42e]">
                    Bekijk {pagina.plaats}
                    <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </span>
                </Link>
              ))}
              <div className="bg-[#f8f9fa] border border-gray-200 rounded-xl p-6">
                <h3 className="text-xl text-[#0d3b2e] mb-3">Volgende steden</h3>
                <ul className="flex flex-wrap gap-2">
                  {komendeSteden.map((stad) => (
                    <li key={stad} className="bg-white border border-gray-200 rounded-full px-4 py-2 text-[15px] text-[#0d3b2e]">
                      {stad}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section id="veelgestelde-vragen" className="py-16 md:py-24 bg-[#f8f9fa] scroll-mt-24">
          <div className="container mx-auto px-5 sm:px-6 lg:px-12">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl text-[#0d3b2e] mb-4">Veelgestelde vragen over aarding</h2>
            </div>
            <div className="max-w-3xl mx-auto space-y-4">
              {faq.map((item) => (
                <details key={item.q} className="group bg-white border border-gray-200 rounded-xl p-5 open:border-[#9ed42e]">
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
            "Bij het slaan van een aardpen of aardelektrode",
            "Bij aarding via oude waterleiding",
            "Bij aarding voor laadpaal of zonnepanelen",
            "Bij aardingsmeting en meetrapportage",
            "Bij meterkastvervanging of afkeuring",
            "Bij bedrijfspand, VvE of technische ruimte",
          ]}
        />

        <SafetyStatement />

        <section id="contact" className="py-16 md:py-24 bg-gradient-to-br from-[#0d3b2e] via-[#1a4a36] to-[#0d3b2e] relative overflow-hidden scroll-mt-24">
          <div className="container mx-auto px-5 sm:px-6 lg:px-12 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl text-white mb-6 hyphens-nl" lang="nl">
                Aarding laten controleren of <span className="text-[#9ed42e]">aardpen laten slaan?</span>
              </h2>
              <p className="text-lg sm:text-xl text-white/85 mb-10 leading-relaxed">
                Stuur postcode en foto's van de meterkast. Dan krijgt u sneller duidelijkheid over aanpak, prijsindicatie en planning.
              </p>
              <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 justify-center">
                <Link
                  to={CONTACT_URL}
                  data-cta="Prijsindicatie aanvragen hub eind CTA"
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
          {waLink ? (
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center justify-center gap-1 min-h-[48px] rounded-lg border border-[#0d3b2e]/20 text-[#0d3b2e] text-xs"
            >
              <MessageCircle className="w-4 h-4" aria-hidden="true" />
              WhatsApp
            </a>
          ) : (
            <a
              href={`mailto:${company.email}`}
              className="flex flex-col items-center justify-center gap-1 min-h-[48px] rounded-lg border border-[#0d3b2e]/20 text-[#0d3b2e] text-xs"
            >
              <MessageCircle className="w-4 h-4" aria-hidden="true" />
              E-mail
            </a>
          )}
          <Link
            to={CONTACT_URL}
            data-cta="Prijsindicatie aanvragen hub sticky mobiel"
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

export default AardingAanleggen;
