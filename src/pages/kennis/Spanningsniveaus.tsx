import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Header } from "@/components/terrevolt/Header";
import { Footer } from "@/components/terrevolt/Footer";
import { Reveal } from "@/components/terrevolt/Reveal";
import { usePageMeta } from "../../hooks/usePageMeta";
import { SITE_URL } from "@/config/company";
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from "@/components/ui/accordion";

type Row = {
  niveau: string;
  spanning: string;
  gebruik: string;
  norm: string;
  bevoegdheid: string;
};

const rows: Row[] = [
  {
    niveau: "Laagspanning (LS)",
    spanning: "Tot 1.000 V wisselspanning (1,5 kV gelijkspanning)",
    gebruik: "Woningen, winkels, kantoren, kleine bedrijven; 230/400 V",
    norm: "NEN 1010 (aanleg), NEN 3140 (bedrijfsvoering)",
    bevoegdheid: "BEI BLS binnen netbeheeromgevingen",
  },
  {
    niveau: "Middenspanning (MS)",
    spanning: "1 kV tot circa 50 kV — in NL vooral 10 kV en 20 kV",
    gebruik: "Wijkstations, bedrijventerreinen, industrie, datacenters, laadpleinen",
    norm: "NEN 3840 (bedrijfsvoering hoogspanningsinstallaties)",
    bevoegdheid: "BEI BHS binnen netbeheeromgevingen",
  },
  {
    niveau: "Hoogspanning (HS)",
    spanning: "Vanaf circa 50 kV, in NL 110, 150, 220 en 380 kV",
    gebruik: "Landelijk en regionaal transport, koppelstations, windparken op zee",
    norm: "NEN 3840, aanvullende netbeheerdervoorschriften",
    bevoegdheid: "BEI BHS met specifieke HS-aanwijzing",
  },
];

const faqs = [
  {
    q: "Wat is het verschil tussen laagspanning, middenspanning en hoogspanning?",
    a: "Laagspanning is tot 1.000 volt wisselspanning en voedt woningen en kleine bedrijven. Middenspanning ligt tussen 1 kV en circa 50 kV (in Nederland vooral 10 kV en 20 kV) en distribueert energie naar wijken en grote afnemers. Hoogspanning begint rond 50 kV en dient voor transport over grote afstanden.",
  },
  {
    q: "Vanaf hoeveel volt spreek je van hoogspanning?",
    a: "In Nederland spreekt men in de praktijk vanaf circa 50 kV van hoogspanning: 110, 150, 220 en 380 kV. Formeel valt volgens NEN 3840 alles boven 1.000 V wisselspanning onder 'hoogspanning', waardoor middenspanning technisch gezien onder dezelfde norm valt.",
  },
  {
    q: "Waarom wordt elektriciteit op hoge spanning getransporteerd?",
    a: "Bij hogere spanning is bij gelijk vermogen de stroom lager, en de transportverliezen nemen kwadratisch af met de stroom. Hoge spanning betekent dus minder verlies en dunnere geleiders over lange afstanden.",
  },
  {
    q: "Welke norm geldt voor welk spanningsniveau?",
    a: "NEN 1010 geldt voor het aanleggen van laagspanningsinstallaties, NEN 3140 voor het veilig bedrijfsvoeren daarvan, en NEN 3840 voor bedrijfsvoering van installaties boven 1.000 V. In netbeheeromgevingen gelden aanvullend de BEI BLS (laagspanning) en BEI BHS (hoogspanning, inclusief middenspanning).",
  },
  {
    q: "Wat is 10 kV en 20 kV precies?",
    a: "Dat zijn de gangbare Nederlandse middenspanningsniveaus in het distributienet. Via ringnetten met RMU's worden wijkstations en grote afnemers gevoed; een transformator zet 10 of 20 kV om naar 400/230 V laagspanning.",
  },
  {
    q: "Heb ik een andere aanwijzing nodig voor MS dan voor LS?",
    a: "Ja. Een aanwijzing is werkzaamheden- en werkgeversgebonden. LS-werk valt onder BEI BLS, MS- en HS-werk onder BEI BHS. Uitbreiden van LS naar MS vraagt aanvullende opleiding, ervaring, instructie en een nieuwe geschiktheidsbeoordeling.",
  },
  {
    q: "Wat betekent kV?",
    a: "kV staat voor kilovolt: 1 kV is 1.000 volt. Een 10 kV-net werkt dus op 10.000 volt.",
  },
];

const Spanningsniveaus = () => {
  usePageMeta({
    title: "Laagspanning vs middenspanning vs hoogspanning | Uitleg TerreVolt",
    description:
      "Het verschil tussen laagspanning, middenspanning en hoogspanning: volt-grenzen, toepassingen in Nederland, normen (NEN 1010, 3140, 3840) en benodigde BEI-aanwijzingen.",
    canonical: "/kennis/laagspanning-middenspanning-hoogspanning",
    ogType: "article",
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: "Laagspanning vs middenspanning vs hoogspanning",
        description:
          "Vergelijking van spanningsniveaus in het Nederlandse elektriciteitsnet, inclusief normen en bevoegdheden.",
        inLanguage: "nl-NL",
        datePublished: "2026-08-24",
        dateModified: "2026-08-24",
        mainEntityOfPage: `${SITE_URL}/kennis/laagspanning-middenspanning-hoogspanning`,
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
          {
            "@type": "ListItem",
            position: 2,
            name: "Laagspanning vs middenspanning vs hoogspanning",
            item: `${SITE_URL}/kennis/laagspanning-middenspanning-hoogspanning`,
          },
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
              Laagspanning vs middenspanning vs hoogspanning
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/85 sm:text-lg">
              Laagspanning loopt tot 1.000 volt wisselspanning, middenspanning van 1 kV tot circa 50 kV (in Nederland
              vooral 10 kV en 20 kV) en hoogspanning daarboven, tot 380 kV. Het verschil bepaalt welke installaties,
              normen en bevoegdheden van toepassing zijn.
            </p>
          </div>
        </section>

        <div className="mx-auto max-w-4xl space-y-14 px-4 py-12 sm:px-6 sm:py-16">
          <Reveal>
            <section id="vergelijking" className="scroll-mt-28">
              <h2 className="text-2xl font-semibold text-[#0d3b2e] sm:text-3xl">De drie niveaus vergeleken</h2>

              {/* Tabel op desktop */}
              <div className="mt-6 hidden overflow-hidden rounded-2xl border border-gray-200 bg-white md:block">
                <table className="w-full text-left text-sm">
                  <thead className="bg-[#0d3b2e] text-white">
                    <tr>
                      <th scope="col" className="px-4 py-3 font-semibold">Niveau</th>
                      <th scope="col" className="px-4 py-3 font-semibold">Spanning</th>
                      <th scope="col" className="px-4 py-3 font-semibold">Waar je het tegenkomt</th>
                      <th scope="col" className="px-4 py-3 font-semibold">Norm</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rows.map((r) => (
                      <tr key={r.niveau} className="border-t border-gray-200 align-top text-[#0d3b2e]/85">
                        <th scope="row" className="px-4 py-3 font-semibold text-[#0d3b2e]">{r.niveau}</th>
                        <td className="px-4 py-3">{r.spanning}</td>
                        <td className="px-4 py-3">{r.gebruik}</td>
                        <td className="px-4 py-3">{r.norm}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Kaarten op mobiel */}
              <div className="mt-6 grid gap-4 md:hidden">
                {rows.map((r) => (
                  <div key={r.niveau} className="rounded-2xl border border-gray-200 bg-white p-5">
                    <h3 className="text-base font-semibold text-[#0d3b2e]">{r.niveau}</h3>
                    <dl className="mt-3 space-y-2 text-sm text-[#0d3b2e]/85">
                      <div><dt className="font-medium text-[#0d3b2e]">Spanning</dt><dd>{r.spanning}</dd></div>
                      <div><dt className="font-medium text-[#0d3b2e]">Waar je het tegenkomt</dt><dd>{r.gebruik}</dd></div>
                      <div><dt className="font-medium text-[#0d3b2e]">Norm</dt><dd>{r.norm}</dd></div>
                      <div><dt className="font-medium text-[#0d3b2e]">Bevoegdheid</dt><dd>{r.bevoegdheid}</dd></div>
                    </dl>
                  </div>
                ))}
              </div>
            </section>
          </Reveal>

          <Reveal>
            <section id="waarom" className="scroll-mt-28">
              <h2 className="text-2xl font-semibold text-[#0d3b2e] sm:text-3xl">Waarom bestaan er meerdere niveaus?</h2>
              <p className="mt-4 leading-relaxed text-[#0d3b2e]/85">
                Bij een hogere spanning is voor hetzelfde vermogen minder stroom nodig, en transportverliezen nemen
                kwadratisch toe met de stroom. Daarom wordt energie op hoogspanning over lange afstanden getransporteerd,
                op middenspanning regionaal verdeeld en pas vlak bij de eindgebruiker naar laagspanning getransformeerd.
                Elk niveau kent eigen installaties: hoogspanningsstations, MS-ringnetten met RMU's en wijkstations, en
                laagspanningsverdeling tot in de meterkast.
              </p>
              <ul className="mt-5 grid gap-2 sm:grid-cols-2">
                {[
                  "380/220 kV: landelijk transportnet",
                  "150/110 kV: regionaal transport naar onderstations",
                  "20/10 kV: distributie naar wijken en bedrijven",
                  "400/230 V: eindgebruikers en meterkasten",
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
            <section id="bevoegdheden" className="scroll-mt-28">
              <h2 className="text-2xl font-semibold text-[#0d3b2e] sm:text-3xl">Normen en bevoegdheden per niveau</h2>
              <p className="mt-4 leading-relaxed text-[#0d3b2e]/85">
                Voor het aanleggen van laagspanningsinstallaties geldt NEN 1010; voor veilige bedrijfsvoering NEN 3140.
                Boven 1.000 volt geldt NEN 3840. Binnen netbeheeromgevingen werkt TerreVolt volgens de BEI BLS
                (laagspanning) en BEI BHS (midden- en hoogspanning), met rollen als WV, AVP, VP, VOP en PL. Een aanwijzing
                is altijd persoons-, werkgevers- en werkzaamhedengebonden en wordt pas verstrekt na opleiding, ervaring,
                instructie en geschiktheidsbeoordeling.
              </p>
              <p className="mt-3 leading-relaxed text-[#0d3b2e]/85">
                Achtergrond en onze certificeringen staan op{" "}
                <Link to="/veiligheid" className="font-medium underline underline-offset-4">Veiligheid</Link>.
              </p>
            </section>
          </Reveal>

          <Reveal>
            <section id="faq" className="scroll-mt-28">
              <h2 className="text-2xl font-semibold text-[#0d3b2e] sm:text-3xl">Veelgestelde vragen</h2>
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
              <h2 className="text-xl font-semibold text-white sm:text-2xl">Werk aan LS én MS bij TerreVolt</h2>
              <p className="mt-3 max-w-2xl text-white/85">
                We zoeken elektromonteurs voor laagspanning en middenspanning in Noord-Holland, Zuid-Holland, Gelderland en
                Flevoland. Salaris direct zichtbaar, loondienst en betaalde vakopleidingen.
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Link
                  to="/werken-bij"
                  className="inline-flex min-h-[56px] items-center justify-center gap-2 rounded-lg bg-[#9ed42e] px-7 font-medium text-[#0d3b2e] transition-colors hover:bg-[#8cc022]"
                >
                  Bekijk vacatures elektromonteur
                  <ArrowRight className="h-5 w-5" aria-hidden="true" />
                </Link>
                <Link
                  to="/contact"
                  className="inline-flex min-h-[56px] items-center justify-center rounded-lg border border-white/40 px-7 font-medium text-white transition-colors hover:bg-white/10"
                >
                  Projectvraag stellen
                </Link>
              </div>
            </section>
          </Reveal>

          <Reveal>
            <nav aria-label="Gerelateerde pagina's" className="border-t border-gray-200 pt-8">
              <h2 className="text-lg font-semibold text-[#0d3b2e]">Lees verder</h2>
              <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                {[
                  { to: "/kennis/middenspanning", label: "Middenspanning: wat is het en wanneer heb je het nodig" },
                  { to: "/diensten/ls-ms-netmontage", label: "LS/MS-netmontage" },
                  { to: "/diensten/schakelwerk", label: "Schakelwerk LS/MS" },
                  { to: "/aarding-aanleggen", label: "Aarding aanleggen en meten" },
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

export default Spanningsniveaus;
