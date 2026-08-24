import { Award, BadgeCheck, CheckCircle2, FileCheck, GraduationCap, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";
import isoLogo from "@/assets/iso-9001-cetradex.png.asset.json";
import vcaLogo from "@/assets/vca-cetradex.png.asset.json";
import sbbLogo from "@/assets/sbb-erkend-leerbedrijf.png.asset.json";
import isoPdf from "@/assets/terrevolt-iso-9001.pdf.asset.json";
import vcaPdf from "@/assets/terrevolt-vca.pdf.asset.json";

const certifications = [
  {
    icon: Award,
    logo: isoLogo.url,
    logoAlt: "ISO 9001 gecertificeerd keurmerk van Cetradex Certificatie",
    title: "ISO 9001:2015",
    subtitle: "Kwaliteitsmanagement",
    body: "Kwaliteitsmanagementsysteem gecertificeerd door Cetradex Certificatie B.V.",
    facts: ["NEN-EN-ISO 9001:2015", "Certificaat 26062502", "Geldig t/m 24 juni 2029"],
    pdf: isoPdf.url,
    pdfLabel: "Bekijk ISO 9001-certificaat (pdf)",
  },
  {
    icon: ShieldCheck,
    logo: vcaLogo.url,
    logoAlt: "VCA gecertificeerd keurmerk van Cetradex Certificatie",
    title: "VCA** 2017/6.0",
    subtitle: "Veilig, gezond en milieubewust werken",
    body: "VGM-beheerssysteem gecertificeerd door Cetradex Certificatie B.V.",
    facts: ["Certificaat 26062501", "Geldig t/m 24 juni 2029", "NACE-code F4222"],
    pdf: vcaPdf.url,
    pdfLabel: "Bekijk VCA**-certificaat (pdf)",
  },
  {
    icon: GraduationCap,
    logo: sbbLogo.url,
    logoAlt: "SBB erkend leerbedrijf - wij leiden vakmensen op",
    title: "SBB erkend leerbedrijf",
    subtitle: "Wij leiden vakmensen op",
    body: "TerreVolt investeert in praktijkontwikkeling en het opleiden van nieuwe vakmensen.",
    facts: ["Erkend leerbedrijf", "Praktijkgericht opleiden", "Instroom in techniek"],
    pdf: null,
    pdfLabel: null,
  },
];


const proofPoints = [
  "Aantoonbare kwaliteitsborging voor projecten en oplevering",
  "Veiligheidswerkwijze die past bij technische en civiele werkzaamheden",
  "Transparant over certificaatnummers, normversie en geldigheid",
];

export function Certifications() {
  return (
    <section id="certificeringen" className="py-14 md:py-20 bg-white">
      <div className="container mx-auto px-5 sm:px-6 lg:px-12">
        <div className="max-w-4xl mx-auto text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-[#f0f7e6] text-[#0d3b2e] px-4 py-2 rounded-full text-sm mb-5 tracking-wider uppercase border border-[#9ed42e]/30">
            <BadgeCheck className="w-4 h-4" aria-hidden="true" />
            Gecertificeerd en erkend
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl text-[#0d3b2e] mb-4 hyphens-nl" lang="nl">
            Bewijs dat kwaliteit en veiligheid geborgd zijn
          </h2>
          <p className="text-lg text-[#6c757d] leading-relaxed">
            Bij werk aan aarding, kabels en technische installaties wil je aantoonbaar weten wie er op locatie komt.
            TerreVolt vermeldt daarom de actuele certificeringen die bij TerreVolt B.V. horen.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 sm:gap-6 max-w-6xl mx-auto">
          {certifications.map((item) => {
            const Icon = item.icon;
            return (
              <article key={item.title} className="bg-[#f8f9fa] border border-gray-200 rounded-xl p-6 flex flex-col h-full">
                <div className="w-12 h-12 bg-[#0d3b2e] rounded-lg flex items-center justify-center mb-5">
                  <Icon className="w-6 h-6 text-[#9ed42e]" strokeWidth={2} aria-hidden="true" />
                </div>
                <p className="text-xs uppercase tracking-wider text-[#6c757d] mb-2">{item.subtitle}</p>
                <h3 className="text-xl text-[#0d3b2e] mb-3">{item.title}</h3>
                <p className="text-[#6c757d] leading-relaxed mb-5">{item.body}</p>
                <ul className="space-y-2 mt-auto">
                  {item.facts.map((fact) => (
                    <li key={fact} className="flex items-start gap-2 text-sm text-[#495057] leading-relaxed">
                      <CheckCircle2 className="w-4 h-4 text-[#9ed42e] flex-shrink-0 mt-0.5" strokeWidth={2.5} aria-hidden="true" />
                      <span>{fact}</span>
                    </li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>

        <div className="max-w-6xl mx-auto mt-6 bg-[#0d3b2e] rounded-xl p-5 sm:p-6 flex flex-col lg:flex-row gap-5 lg:items-center lg:justify-between">
          <div className="flex items-start gap-4">
            <span className="w-10 h-10 bg-[#9ed42e] rounded-lg flex items-center justify-center flex-shrink-0">
              <FileCheck className="w-5 h-5 text-[#0d3b2e]" strokeWidth={2.2} aria-hidden="true" />
            </span>
            <div>
              <h3 className="text-lg text-white mb-1">Certificeringsscope ISO/VCA</h3>
              <p className="text-white/75 leading-relaxed">
                Het aanleggen en monteren van data en energiekabels met inbegrip van civiele werkzaamheden.
              </p>
            </div>
          </div>
          <Link
            to="/veiligheid"
            className="inline-flex items-center justify-center rounded-lg border-2 border-white/35 px-5 py-3 text-white hover:border-white transition-colors min-h-[48px]"
          >
            Bekijk veiligheid
          </Link>
        </div>

        <ul className="max-w-6xl mx-auto mt-6 grid grid-cols-1 md:grid-cols-3 gap-3">
          {proofPoints.map((point) => (
            <li key={point} className="flex items-start gap-2 text-[15px] text-[#495057] bg-white border border-gray-200 rounded-lg px-4 py-3">
              <BadgeCheck className="w-5 h-5 text-[#9ed42e] flex-shrink-0 mt-0.5" strokeWidth={2} aria-hidden="true" />
              <span>{point}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
