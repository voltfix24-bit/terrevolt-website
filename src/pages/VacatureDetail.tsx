import { Link, Navigate, useParams } from "react-router-dom";
import {
  ArrowLeft, BadgeEuro, CheckCircle2, Clock, FileSignature, MapPin,
  ShieldAlert, ListChecks, Award, Gift,
} from "lucide-react";
import { Header } from "@/components/terrevolt/Header";
import { Footer } from "@/components/terrevolt/Footer";
import { Reveal } from "@/components/terrevolt/Reveal";
import { ApplicationForm } from "@/components/terrevolt/ApplicationForm";
import { TobeshCard } from "@/components/terrevolt/TobeshCard";
import { usePageMeta } from "../hooks/usePageMeta";
import { SITE_URL } from "@/config/company";
import {
  ARBEIDSVOORWAARDEN, CONTRACT_LABEL_LANG, REGIOS, REGIO_LABEL,
  SALARIS_DISCLAIMER, SOLLICITATIEPROCES, UREN_LABEL, findVacature, findVacatureByAlias,
  formatSalaris, validThrough,
} from "@/data/vacatures";

const VacatureDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const vacature = findVacature(slug);
  const alias = vacature ? undefined : findVacatureByAlias(slug);

  const title = vacature
    ? `Vacature ${vacature.title} | loondienst bij TerreVolt`
    : "Vacature niet gevonden | TerreVolt";
  const description = vacature
    ? `${vacature.title} bij TerreVolt: ${formatSalaris(vacature.salaris)} bruto per maand, ${UREN_LABEL}, jaarcontract met uitzicht op vast. Werkgebied: ${REGIO_LABEL}.`
    : undefined;

  const jobPosting = vacature
    ? {
        "@context": "https://schema.org",
        "@type": "JobPosting",
        title: vacature.title,
        description: `${vacature.intro} ${vacature.samenvatting} Taken: ${vacature.taken.join("; ")}.`,
        datePosted: vacature.datePosted,
        validThrough: validThrough(vacature.datePosted),
        industry: "Elektrotechniek en energie-infrastructuur",
        occupationalCategory: "47-2111.00 Electricians",
        responsibilities: vacature.taken.join("; "),
        qualifications: vacature.meebrengen.join("; "),
        skills: (vacature.keywords ?? []).join(", "),
        experienceRequirements: vacature.meta.niveau,
        educationRequirements: vacature.meta.niveau,
        jobBenefits: ARBEIDSVOORWAARDEN.join("; "),
        employmentUnit: { "@type": "Organization", name: "TerreVolt" },
        identifier: {
          "@type": "PropertyValue",
          name: "TerreVolt",
          value: vacature.slug,
        },
        url: `${SITE_URL}/vacatures/${vacature.slug}`,
        directApply: true,
        employmentType: ["FULL_TIME", "PART_TIME"],
        hiringOrganization: {
          "@type": "Organization",
          name: "TerreVolt",
          sameAs: SITE_URL,
          url: SITE_URL,
          logo: `${SITE_URL}/og-image.jpg`,
        },
        applicantLocationRequirements: { "@type": "Country", name: "Nederland" },
        jobLocation: REGIOS.map((regio) => ({
          "@type": "Place",
          address: {
            "@type": "PostalAddress",
            addressRegion: regio,
            addressCountry: "NL",
          },
        })),
        baseSalary: {
          "@type": "MonetaryAmount",
          currency: "EUR",
          value: {
            "@type": "QuantitativeValue",
            minValue: vacature.salaris.min,
            maxValue: vacature.salaris.max,
            unitText: "MONTH",
          },
        },
        workHours: "32–40 uur per week; salaris op basis van 40 uur",
      }
    : undefined;

  usePageMeta({
    title,
    description,
    canonical: vacature ? `/vacatures/${vacature.slug}` : undefined,
    ogType: "article",
    jsonLd: jobPosting,
  });

  // Oude of zoekwoordvariant van de slug → canonieke URL (301-equivalent).
  if (!vacature) {
    return <Navigate to={alias ? `/vacatures/${alias.slug}` : "/werken-bij"} replace />;
  }

  const facts = [
    { icon: BadgeEuro, label: "Salaris", value: `${formatSalaris(vacature.salaris)} bruto p/m` },
    { icon: Clock, label: "Uren", value: UREN_LABEL },
    { icon: FileSignature, label: "Contract", value: CONTRACT_LABEL_LANG },
    { icon: MapPin, label: "Regio", value: REGIO_LABEL },
  ];

  const Section = ({ id, icon: Icon, title: h, children }: { id: string; icon: typeof ListChecks; title: string; children: React.ReactNode }) => (
    <section id={id} className="scroll-mt-28">
      <h2 className="flex items-center gap-2 text-xl font-semibold text-[#0d3b2e] sm:text-2xl">
        <Icon className="h-5 w-5" aria-hidden="true" />
        {h}
      </h2>
      <div className="mt-4">{children}</div>
    </section>
  );

  const bullets = (items: string[]) => (
    <ul className="grid gap-2 sm:grid-cols-2">
      {items.map((t) => (
        <li key={t} className="flex items-start gap-2 text-sm leading-relaxed text-[#0d3b2e]/85">
          <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#0d3b2e]" aria-hidden="true" />
          {t}
        </li>
      ))}
    </ul>
  );

  return (
    <div className="min-h-screen bg-[#f8f9fa]">
      <Header />

      <main id="main-content" className="pt-16 sm:pt-20">
        {/* 1. KOP MET KERNGEGEVENS */}
        <section className="bg-[#0d3b2e]">
          <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 sm:py-16">
            <Link
              to="/werken-bij"
              className="inline-flex min-h-[44px] items-center gap-2 text-sm text-[#9ed42e] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              Alle vacatures
            </Link>
            <p className="mt-4 text-xs uppercase tracking-[0.2em] text-[#9ed42e]">Rechtstreeks in loondienst bij TerreVolt</p>
            <h1 className="mt-3 font-semibold leading-tight text-white" style={{ fontSize: "clamp(1.75rem, 5.5vw, 3rem)" }}>
              {vacature.h1 ?? vacature.title}
            </h1>
            <p className="mt-4 max-w-2xl leading-relaxed text-white/85">{vacature.samenvatting}</p>

            <dl className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {facts.map(({ icon: Icon, label, value }) => (
                <div key={label} className="rounded-xl border border-white/20 bg-white/10 p-4">
                  <dt className="flex items-center gap-2 text-xs uppercase tracking-wider text-[#9ed42e]">
                    <Icon className="h-4 w-4" aria-hidden="true" />
                    {label}
                  </dt>
                  <dd className="mt-1.5 text-sm text-white">{value}</dd>
                </div>
              ))}
            </dl>

            <a
              href="#solliciteren"
              className="mt-8 inline-flex min-h-[56px] items-center justify-center rounded-lg bg-[#9ed42e] px-7 font-medium text-[#0d3b2e] transition-colors hover:bg-[#8cc022] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#0d3b2e]"
            >
              Solliciteer direct
            </a>
          </div>
        </section>

        <div className="mx-auto max-w-5xl space-y-12 px-4 py-12 sm:px-6 sm:py-16">
          {/* 2. INTRODUCTIE */}
          <Reveal>
            <p className="text-lg leading-relaxed text-[#0d3b2e]">{vacature.intro}</p>
            <p className="mt-3 text-xs leading-relaxed text-[#0d3b2e]/70">{SALARIS_DISCLAIMER}</p>
          </Reveal>

          {/* 3. WAT JE GAAT DOEN */}
          <Section id="taken" icon={ListChecks} title="Wat je gaat doen">{bullets(vacature.taken)}</Section>

          {/* 4. WAT JE MEEBRENGT */}
          <Section id="meebrengen" icon={Award} title="Wat je meebrengt">
            {bullets(vacature.meebrengen)}
            <p className="mt-4 text-sm text-[#0d3b2e]/70">Gevraagde bevoegdheden: {vacature.meta.bevoegdheden}. Niveau: {vacature.meta.niveau}.</p>
          </Section>

          {/* 5. WAT JE KRIJGT */}
          <Section id="arbeidsvoorwaarden" icon={Gift} title="Wat je van TerreVolt krijgt">
            {bullets(ARBEIDSVOORWAARDEN)}
          </Section>

          {/* 6. VEILIG WERKEN EN AANWIJZINGEN */}
          <Section id="veiligheid" icon={ShieldAlert} title="Veilig werken en aanwijzingen">
            <p className="rounded-2xl border border-gray-200 bg-white p-6 text-sm leading-relaxed text-[#0d3b2e]/85">
              {vacature.veiligheid}
            </p>
          </Section>

          {/* 7. SOLLICITATIEPROCES */}
          <Section id="proces" icon={CheckCircle2} title="Sollicitatieproces">
            <ol className="grid gap-3 sm:grid-cols-2">
              {SOLLICITATIEPROCES.map((stap, i) => (
                <li key={stap} className="rounded-xl border border-gray-200 bg-white p-4 text-sm text-[#0d3b2e]/85">
                  <span className="mr-2 inline-flex h-6 w-6 items-center justify-center rounded-full bg-[#0d3b2e] text-xs font-semibold text-[#9ed42e]">{i + 1}</span>
                  {stap}
                </li>
              ))}
            </ol>
          </Section>

          {/* 8. CONTACT */}
          <section id="contact" className="scroll-mt-28">
            <h2 className="text-xl font-semibold text-[#0d3b2e] sm:text-2xl">Vragen over deze vacature?</h2>
            <TobeshCard className="mt-4" />
          </section>

          {/* 9. FORMULIER */}
          <section id="solliciteren" className="scroll-mt-28 rounded-2xl border border-gray-200 bg-white p-6 sm:p-8">
            <h2 className="text-xl font-semibold text-[#0d3b2e] sm:text-2xl">Solliciteer op {vacature.title}</h2>
            <div className="mt-4">
              <ApplicationForm defaultProfile={vacature.title} source="vacature_form" id={`sollicitatie-${vacature.slug}`} />
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default VacatureDetail;
