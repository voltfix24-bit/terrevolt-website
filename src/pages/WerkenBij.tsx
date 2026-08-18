import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight, BadgeEuro, CalendarDays, Truck, GraduationCap,
  MapPin, Clock, FileSignature, Phone, MessageCircle, ShieldCheck,
  Wrench, Handshake, TrendingUp, CheckCircle2,
} from "lucide-react";
import { Header } from "@/components/terrevolt/Header";
import { Footer } from "@/components/terrevolt/Footer";
import { Reveal } from "@/components/terrevolt/Reveal";
import { ApplicationForm } from "@/components/terrevolt/ApplicationForm";
import { TobeshCard, whatsappHref } from "@/components/terrevolt/TobeshCard";
import { usePageMeta } from "../hooks/usePageMeta";
import { scrollToAnchor } from "@/lib/scrollToAnchor";
import { company, telHref } from "@/config/company";
import {
  ARBEIDSVOORWAARDEN, CONTRACT_LABEL, REGIO_LABEL, SALARIS_DISCLAIMER,
  SOLLICITATIEPROCES, UREN_LABEL, formatSalaris, vacatures,
} from "@/data/vacatures";
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from "@/components/ui/accordion";

const voordelenBalk = [
  { icon: BadgeEuro, label: "Salaris direct zichtbaar" },
  { icon: CalendarDays, label: "38 vrije dagen" },
  { icon: Truck, label: "Volledig uitgeruste werkbus" },
  { icon: GraduationCap, label: "Betaalde vakopleidingen" },
];

const waarom = [
  { icon: ShieldCheck, title: "Veiligheid boven tempo", text: "We werken volgens duidelijke werkplannen en stoppen wanneer een situatie niet veilig is." },
  { icon: Wrench, title: "Goed voorbereid op pad", text: "Je krijgt passend gereedschap, gekeurde meetmiddelen, werkkleding, PBM en waar nodig een volledig uitgeruste werkbus." },
  { icon: Handshake, title: "Duidelijke afspraken", text: "Je weet vooraf waar je werkt, wat je verdient en hoe reisuren, overwerk en eventuele storingsdiensten worden vergoed." },
  { icon: TrendingUp, title: "Blijven groeien in je vak", text: "TerreVolt betaalt de opleidingen en herhalingen die jij voor je functie nodig hebt." },
];

const faqs = [
  { q: "Zijn alle vacatures rechtstreeks in loondienst bij TerreVolt?", a: "Ja. Alle functies op deze pagina zijn rechtstreeks in loondienst bij TerreVolt." },
  { q: "Welk contract krijg ik?", a: "Je start met een jaarcontract met uitzicht op een vast contract." },
  { q: "In welke regio's werken jullie?", a: "Onze vacatures staan open in Noord-Holland, Zuid-Holland, Gelderland en Flevoland. We bespreken samen welke projecten en reisafstand bij je passen." },
  { q: "Moet ik direct een cv meesturen?", a: "Nee. Een cv is optioneel. Je kunt ook je contactgegevens achterlaten of direct bellen of WhatsAppen met Tobesh." },
  { q: "Wat als ik nog niet alle benodigde opleidingen of aanwijzingen heb?", a: "Neem gerust contact op. We bekijken welke kennis en ervaring je al hebt en welke opleiding of instructie nog nodig is. TerreVolt betaalt de functiegerichte opleidingen die we met je afspreken." },
];

const WerkenBij = () => {
  const [contactOpen, setContactOpen] = useState(false);

  usePageMeta({
    title: "Werken bij TerreVolt | 7 technische vacatures in loondienst",
    description:
      "Bekijk 7 technische vacatures bij TerreVolt in Noord-Holland, Zuid-Holland, Gelderland en Flevoland. Salaris direct zichtbaar en een jaarcontract met uitzicht op vast.",
    canonical: "/werken-bij",
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  });

  return (
    <div className="min-h-screen bg-[#f8f9fa]">
      <Header />

      <main id="main-content" className="pt-16 sm:pt-20">
        {/* 1. HERO */}
        <section className="relative overflow-hidden bg-[#0d3b2e]">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-[0.18]"
            style={{
              backgroundImage:
                "radial-gradient(circle at 20% 20%, #9ed42e 0, transparent 45%), linear-gradient(115deg, transparent 48%, rgba(158,212,46,.5) 49%, transparent 50%), linear-gradient(65deg, transparent 62%, rgba(158,212,46,.35) 63%, transparent 64%)",
            }}
          />
          <div className="relative mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
            <p className="text-xs uppercase tracking-[0.2em] text-[#9ed42e]">Werken bij TerreVolt</p>
            <h1 className="mt-4 max-w-3xl font-semibold leading-tight text-white" style={{ fontSize: "clamp(1.85rem, 6vw, 3.25rem)" }}>
              Werk mee aan het energienet van morgen
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/85 sm:text-lg">
              Bij TerreVolt werk je rechtstreeks in loondienst aan veilige en betrouwbare energie-infrastructuur.
              Je krijgt goed materieel, duidelijke afspraken en de ruimte om je vak verder te ontwikkelen.
            </p>

            <ul className="mt-7 flex flex-wrap gap-2">
              {[`${vacatures.length} actuele vacatures`, UREN_LABEL, "Jaarcontract met uitzicht op vast", REGIO_LABEL].map((chip) => (
                <li key={chip} className="rounded-full border border-white/25 bg-white/10 px-3.5 py-2 text-sm text-white">
                  {chip}
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={() => scrollToAnchor("vacatures")}
                className="inline-flex min-h-[56px] items-center justify-center gap-2 rounded-lg bg-[#9ed42e] px-7 font-medium text-[#0d3b2e] transition-colors hover:bg-[#8cc022] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#0d3b2e]"
              >
                Bekijk de vacatures
                <ArrowRight className="h-5 w-5" aria-hidden="true" />
              </button>

              <div className="relative">
                <button
                  type="button"
                  onClick={() => setContactOpen((o) => !o)}
                  aria-expanded={contactOpen}
                  className="inline-flex min-h-[56px] w-full items-center justify-center gap-2 rounded-lg border border-white/40 px-7 font-medium text-white transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white sm:w-auto"
                >
                  <Phone className="h-5 w-5" aria-hidden="true" />
                  Bel of app Tobesh
                </button>
                {contactOpen && (
                  <div className="absolute left-0 right-0 z-10 mt-2 overflow-hidden rounded-lg border border-gray-200 bg-white shadow-lg sm:w-64">
                    <a href={telHref} className="flex min-h-[52px] items-center gap-2 px-4 text-sm text-[#0d3b2e] hover:bg-[#f0f7e6]">
                      <Phone className="h-4 w-4" aria-hidden="true" /> Bel {company.phone.display}
                    </a>
                    <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className="flex min-h-[52px] items-center gap-2 border-t border-gray-100 px-4 text-sm text-[#0d3b2e] hover:bg-[#f0f7e6]">
                      <MessageCircle className="h-4 w-4" aria-hidden="true" /> WhatsApp Tobesh
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* 2. ARBEIDSVOORWAARDENBALK */}
        <section className="border-b border-gray-200 bg-white">
          <ul className="mx-auto grid max-w-6xl gap-4 px-4 py-6 sm:grid-cols-2 sm:px-6 lg:grid-cols-4">
            {voordelenBalk.map(({ icon: Icon, label }) => (
              <li key={label} className="flex items-center gap-3 text-sm font-medium text-[#0d3b2e]">
                <Icon className="h-5 w-5 flex-shrink-0 text-[#0d3b2e]" aria-hidden="true" />
                {label}
              </li>
            ))}
          </ul>
        </section>

        {/* 3. VACATURES */}
        <section id="vacatures" className="scroll-mt-28 py-14 sm:py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <h2 className="text-2xl font-semibold text-[#0d3b2e] sm:text-3xl">Zeven actuele vacatures</h2>
            <p className="mt-3 max-w-2xl text-[#0d3b2e]/80">
              Alle functies zijn rechtstreeks in loondienst bij TerreVolt, met salaris, uren, contract en regio direct zichtbaar.
            </p>

            <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {vacatures.map((v) => (
                <Reveal key={v.slug}>
                  <article className="flex h-full flex-col rounded-2xl border border-gray-200 bg-white p-6 transition-shadow hover:shadow-[0_10px_30px_-20px_rgba(13,59,46,0.6)]">
                    <h3 className="text-lg font-semibold text-[#0d3b2e]">{v.title}</h3>
                    <p className="mt-2 text-xl font-semibold text-[#0d3b2e]">
                      {formatSalaris(v.salaris)}
                      <span className="ml-1 text-sm font-normal text-[#0d3b2e]/70">bruto p/m</span>
                    </p>
                    <ul className="mt-4 space-y-2 text-sm text-[#0d3b2e]/80">
                      <li className="flex items-center gap-2"><Clock className="h-4 w-4 flex-shrink-0" aria-hidden="true" />{UREN_LABEL}</li>
                      <li className="flex items-center gap-2"><FileSignature className="h-4 w-4 flex-shrink-0" aria-hidden="true" />{CONTRACT_LABEL}</li>
                      <li className="flex items-start gap-2"><MapPin className="mt-0.5 h-4 w-4 flex-shrink-0" aria-hidden="true" />{REGIO_LABEL}</li>
                    </ul>
                    <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:items-center">
                      <Link
                        to={`/vacatures/${v.slug}`}
                        className="inline-flex min-h-[44px] flex-1 items-center justify-center gap-2 rounded-lg bg-[#0d3b2e] px-4 text-sm font-medium text-white transition-colors hover:bg-[#0a2f24] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9ed42e] focus-visible:ring-offset-2"
                      >
                        Bekijk vacature
                      </Link>
                      <Link
                        to={`/vacatures/${v.slug}#solliciteren`}
                        className="inline-flex min-h-[44px] items-center justify-center px-3 text-sm font-medium text-[#0d3b2e] underline underline-offset-4 hover:text-[#0a2f24] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9ed42e]"
                      >
                        Solliciteer direct
                      </Link>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>

            <p className="mt-6 max-w-3xl text-xs leading-relaxed text-[#0d3b2e]/70">{SALARIS_DISCLAIMER}</p>
          </div>
        </section>

        {/* 4. WAAROM TERREVOLT */}
        <section id="waarom" className="scroll-mt-28 bg-white py-14 sm:py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <h2 className="text-2xl font-semibold text-[#0d3b2e] sm:text-3xl">Waarom werken bij TerreVolt</h2>
            <div className="mt-8 grid gap-5 sm:grid-cols-2">
              {waarom.map(({ icon: Icon, title, text }) => (
                <div key={title} className="rounded-2xl border border-gray-200 p-6">
                  <Icon className="h-6 w-6 text-[#0d3b2e]" aria-hidden="true" />
                  <h3 className="mt-3 text-lg font-semibold text-[#0d3b2e]">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#0d3b2e]/80">{text}</p>
                </div>
              ))}
            </div>

            <h3 className="mt-12 text-lg font-semibold text-[#0d3b2e]">Arbeidsvoorwaarden</h3>
            <ul className="mt-4 grid gap-2 sm:grid-cols-2">
              {ARBEIDSVOORWAARDEN.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-[#0d3b2e]/85">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#0d3b2e]" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* 5. SOLLICITATIEPROCES */}
        <section id="proces" className="scroll-mt-28 py-14 sm:py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <h2 className="text-2xl font-semibold text-[#0d3b2e] sm:text-3xl">Zo verloopt je sollicitatie</h2>
            <ol className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
              {SOLLICITATIEPROCES.map((stap, i) => (
                <li key={stap} className="rounded-2xl border border-gray-200 bg-white p-5">
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#0d3b2e] text-sm font-semibold text-[#9ed42e]">{i + 1}</span>
                  <p className="mt-3 text-sm leading-relaxed text-[#0d3b2e]/85">{stap}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* 6 + 7. CONTACT & FORMULIER */}
        <section id="solliciteren" className="scroll-mt-28 bg-white py-14 sm:py-20">
          <div className="mx-auto grid max-w-6xl gap-8 px-4 sm:px-6 lg:grid-cols-[1fr_1.2fr]">
            <div>
              <h2 className="text-2xl font-semibold text-[#0d3b2e] sm:text-3xl">Direct contact</h2>
              <p className="mt-3 text-[#0d3b2e]/80">
                Liever eerst even sparren over een functie? Bel, app of mail Tobesh.
              </p>
              <TobeshCard className="mt-6" />
            </div>
            <div className="rounded-2xl border border-gray-200 bg-[#f8f9fa] p-6 sm:p-8">
              <h2 className="text-xl font-semibold text-[#0d3b2e]">Solliciteer</h2>
              <div className="mt-4">
                <ApplicationForm source="werken_bij_form" />
              </div>
            </div>
          </div>
        </section>

        {/* 8. FAQ */}
        <section id="faq" className="scroll-mt-28 py-14 sm:py-20">
          <div className="mx-auto max-w-3xl px-4 sm:px-6">
            <h2 className="text-2xl font-semibold text-[#0d3b2e] sm:text-3xl">Veelgestelde vragen</h2>
            <Accordion type="single" collapsible className="mt-6">
              {faqs.map((f, i) => (
                <AccordionItem key={f.q} value={`faq-${i}`}>
                  <AccordionTrigger className="min-h-[56px] text-left text-[#0d3b2e]">{f.q}</AccordionTrigger>
                  <AccordionContent className="text-[#0d3b2e]/80">{f.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default WerkenBij;
