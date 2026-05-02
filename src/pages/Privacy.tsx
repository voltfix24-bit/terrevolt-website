import { Link } from "react-router-dom";
import { Header } from "@/components/terrevolt/Header";
import { Footer } from "@/components/terrevolt/Footer";
import { usePageMeta } from "../hooks/usePageMeta";
import { company, mailHref } from "@/config/company";

const Privacy = () => {
  usePageMeta(
    "Privacyverklaring | TerreVolt BV",
    "Hoe TerreVolt persoonsgegevens verwerkt bij contact-, sollicitatie- en projectaanvragen.",
  );

  return (
    <div className="min-h-screen bg-[#f8f9fa]">
      <Header />
      <main className="pt-16 sm:pt-20">
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-5 sm:px-6 lg:px-12 max-w-3xl">
            <Link to="/" className="text-sm text-[#0d3b2e] hover:underline">← Terug naar home</Link>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl text-[#0d3b2e] mt-6 mb-6">Privacyverklaring</h1>
            <div className="space-y-5 text-[#2d3436] leading-relaxed">
              <p>
                TerreVolt B.V. respecteert je privacy en gaat zorgvuldig om met persoonsgegevens.
                In deze verklaring leggen we uit welke gegevens we verwerken, waarom en hoe lang.
              </p>

              <h2 className="text-xl text-[#0d3b2e] mt-8">Welke gegevens verwerken we?</h2>
              <p>
                Bij contact- en sollicitatieformulieren verwerken we naam, e-mailadres,
                telefoonnummer en de inhoud van je bericht. Bij sollicitaties optioneel ook
                regio, beschikbaarheid, ervaring, certificaten en je CV.
              </p>

              <h2 className="text-xl text-[#0d3b2e] mt-8">Waarvoor gebruiken we ze?</h2>
              <p>
                Uitsluitend om contact met je op te nemen over werk, projecten of samenwerking
                en om je aanvraag te beoordelen. We gebruiken je gegevens niet voor marketing en
                delen ze niet met derden zonder jouw toestemming.
              </p>

              <h2 className="text-xl text-[#0d3b2e] mt-8">Bewaartermijn</h2>
              <p>
                Sollicitatiegegevens bewaren we maximaal 4 weken na afronding van het traject,
                tenzij je toestemming geeft voor langere opname in onze talentpool.
              </p>

              <h2 className="text-xl text-[#0d3b2e] mt-8">Jouw rechten</h2>
              <p>
                Je hebt recht op inzage, correctie of verwijdering van je gegevens. Stuur hiervoor
                een e-mail naar <a className="underline" href={mailHref()}>{company.email}</a>.
              </p>

              <p className="text-sm text-[#6c757d] mt-10">
                Laatste update: mei 2026.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Privacy;
