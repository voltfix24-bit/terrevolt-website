import { ArrowRight, CheckCircle2, ClipboardList, FileSearch, ShieldCheck, PackageCheck, Cable, Building2, Power, Gauge, PlugZap, Users, Briefcase, Zap as ZapIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { Header } from "@/components/terrevolt/Header";
import { Footer } from "@/components/terrevolt/Footer";
import { usePageMeta } from "../hooks/usePageMeta";
import { EarthSymbol } from "@/components/icons/EarthSymbol";

const services = [
  {
    icon: Cable,
    slug: "ls-ms-netmontage",
    title: "LS/MS Netmontage",
    description: "Kabelmontage, moffen, eindsluitingen en aansluitwerk binnen laag- en middenspanningsnetten.",
    bullets: ["LS- en MS-kabelmontage", "Verbindingsmoffen en eindsluitingen", "Aansluitwerk in stations"],
  },
  {
    icon: Building2,
    slug: "stationsrenovatie",
    title: "Stationsrenovatie",
    description: "Renovatie en inrichting van MS/LS-stations, technische ruimten en transformatorstations.",
    bullets: ["LS-rekken", "RMU's en schakelinstallaties", "Transformatorruimten"],
  },
  {
    icon: Power,
    slug: "schakelwerk",
    title: "Schakelwerk & veiligstellen",
    description: "Veilig in- en uitbedrijf nemen, vrijschakelen en veiligstellen van LS/MS-installaties.",
    bullets: ["Vrijschakelen", "Veiligstellen", "Terugschakelen"],
  },
  {
    icon: EarthSymbol,
    slug: "aardingsoplossingen",
    title: "Aardingsoplossingen",
    description: "Aanleg, verbetering, meting en rapportage van aardingssystemen.",
    bullets: ["Aardelektroden", "Stationsaarding", "Meetrapportage"],
  },
  {
    icon: Gauge,
    slug: "meten-en-beproeven",
    title: "Meten & beproeven",
    description: "Controlemetingen, kabelmetingen, aardingsmetingen en duidelijke opleverrapportages.",
    bullets: ["Aardingsmetingen", "Controlemetingen", "Opleverdocumentatie"],
  },
  {
    icon: PlugZap,
    slug: "huisaansluitingen",
    title: "Huisaansluitingen",
    description: "Aanleg, wijziging en sanering van aansluitingen op het laagspanningsnet.",
    bullets: ["Laagbouw en hoogbouw", "Saneringen", "LS-aansluitwerk"],
  },
];

const steps = [
  {
    icon: FileSearch,
    title: "Inventarisatie",
    description: "Wij brengen projectscope, locatie, veiligheidseisen en planning helder in kaart.",
  },
  {
    icon: ClipboardList,
    title: "Voorbereiding",
    description: "Wij stemmen uitvoering, bevoegdheden, materialen en werkafspraken af met opdrachtgever en betrokken partijen.",
  },
  {
    icon: ShieldCheck,
    title: "Veilige uitvoering",
    description: "Onze monteurs werken volgens geldende procedures, normen en projectafspraken.",
  },
  {
    icon: PackageCheck,
    title: "Oplevering",
    description: "Wij zorgen voor duidelijke terugkoppeling, controle en waar nodig meet- en opleverrapportage.",
  },
];

const Diensten = () => {
  usePageMeta("Diensten | TerreVolt BV", "Overzicht van TerreVolt's diensten: LS/MS netmontage, stationsrenovatie, schakelwerk, aardingsoplossingen, meten & beproeven en huisaansluitingen.");

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
                Diensten
              </div>
              <h1 className="text-[clamp(1.875rem,7vw,2.625rem)] sm:text-5xl lg:text-6xl text-white mb-6 leading-[1.1] sm:leading-tight hyphens-nl text-pretty">
                Elektrotechnische infrastructuur<br />
                <span className="text-[#9ed42e]">voor de netbeheerwereld</span>
              </h1>
              <p className="text-lg sm:text-xl lg:text-2xl text-white/85 mb-10 max-w-3xl leading-relaxed">
                TerreVolt ondersteunt netbeheerders, hoofdaannemers en industrie bij aanleg, renovatie, veiligstelling, meting en oplevering van laagspannings- en middenspanningsinfrastructuur.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="/contact"
                  className="group bg-[#9ed42e] text-[#0d3b2e] px-8 py-4 min-h-[54px] rounded-lg hover:bg-[#8bc41f] transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <span>Project bespreken</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </a>
                <a
                  href="#diensten"
                  className="border-2 border-[#9ed42e] text-[#9ed42e] px-8 py-4 min-h-[54px] rounded-lg hover:bg-[#9ed42e] hover:text-[#0d3b2e] transition-all duration-300 text-center flex items-center justify-center"
                >
                  Bekijk diensten
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* DIENSTEN GRID */}
        <section id="diensten" className="py-16 md:py-24 bg-white scroll-mt-24">
          <div className="container mx-auto px-5 sm:px-6 lg:px-12">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl text-[#0d3b2e] mb-4">Onze diensten</h2>
              <p className="text-xl text-[#6c757d] max-w-3xl mx-auto">
                Een compleet aanbod voor netbeheerders, hoofdaannemers en industrie.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service) => {
                const Icon = service.icon;
                return (
                  <Link
                    key={service.slug}
                    to={`/diensten/${service.slug}`}
                    aria-label={`Bekijk dienst: ${service.title}`}
                    className="group flex flex-col bg-white border border-gray-200 rounded-xl p-8 hover:border-[#9ed42e] hover:shadow-xl transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9ed42e] focus-visible:ring-offset-2 active:scale-[0.99]"
                  >
                    <div className="w-14 h-14 bg-[#f0f7e6] rounded-lg flex items-center justify-center mb-6 group-hover:bg-[#9ed42e] transition-colors duration-300">
                      <Icon className="w-7 h-7 text-[#0d3b2e] group-hover:text-white transition-colors duration-300" strokeWidth={2} />
                    </div>
                    <h3 className="text-xl text-[#0d3b2e] mb-3">{service.title}</h3>
                    <p className="text-[#6c757d] leading-relaxed mb-6">{service.description}</p>

                    <ul className="space-y-2 mb-8">
                      {service.bullets.map((b) => (
                        <li key={b} className="flex items-center gap-2">
                          <CheckCircle2 className="w-5 h-5 text-[#9ed42e] flex-shrink-0" strokeWidth={2.5} />
                          <span className="text-[#2d3436] text-sm">{b}</span>
                        </li>
                      ))}
                    </ul>

                    <span className="mt-auto inline-flex items-center gap-1.5 text-[#0d3b2e] text-sm group-hover:gap-2.5 transition-all">
                      Bekijk dienst
                      <ArrowRight className="w-4 h-4 text-[#9ed42e]" strokeWidth={2.5} />
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* KEUZEHULP — Niet zeker welke ondersteuning u nodig heeft? */}
        <section className="py-16 md:py-20 bg-[#0d3b2e] relative overflow-hidden">
          <div className="absolute inset-0 opacity-[0.04] pointer-events-none" aria-hidden="true" style={{
            backgroundImage:
              "linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }} />
          <div className="container mx-auto px-5 sm:px-6 lg:px-12 relative">
            <div className="text-center mb-10 md:mb-12">
              <div className="inline-block bg-[#9ed42e] text-[#0d3b2e] px-4 py-2 rounded-full text-sm mb-5 tracking-wider uppercase">
                Keuzehulp
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl text-white mb-4 leading-tight hyphens-nl" lang="nl">
                Niet zeker welke ondersteuning u nodig heeft?
              </h2>
              <p className="text-lg text-white/85 max-w-2xl mx-auto">
                Kies het scenario dat het beste past — wij denken mee over uitvoering, planning en oplevering.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 max-w-6xl mx-auto">
              {[
                {
                  icon: Users,
                  title: "Ik zoek monteurs of ploegen",
                  text: "Voor projectmatige inzet binnen LS/MS, stationswerk, schakelwerk of aarding.",
                  cta: "Inzet bespreken",
                  href: "/contact?intent=monteur",
                },
                {
                  icon: Briefcase,
                  title: "Ik heb een LS/MS-project",
                  text: "Voor netmontage, stationsrenovatie, kabelwerk, schakelwerk of oplevering.",
                  cta: "Project bespreken",
                  href: "/contact?intent=project&type=LS%2FMS+Netmontage",
                },
                {
                  icon: ZapIcon,
                  title: "Ik heb een aardings- of meetvraagstuk",
                  text: "Voor aardingsoplossingen, metingen, rapportage en opleverdocumentatie.",
                  cta: "Aarding of meting bespreken",
                  href: "/contact?intent=project&type=Aardingsoplossingen",
                },
              ].map((c) => {
                const Icon = c.icon;
                return (
                  <Link
                    key={c.title}
                    to={c.href}
                    className="group flex flex-col bg-white/5 border border-white/10 rounded-xl p-6 sm:p-7 hover:border-[#9ed42e] hover:bg-white/[0.07] transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9ed42e] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0d3b2e] active:scale-[0.99]"
                  >
                    <div className="w-12 h-12 bg-[#9ed42e] rounded-lg flex items-center justify-center mb-5">
                      <Icon className="w-6 h-6 text-[#0d3b2e]" strokeWidth={2} />
                    </div>
                    <h3 className="text-lg sm:text-xl text-white mb-2 hyphens-nl" lang="nl">{c.title}</h3>
                    <p className="text-white/85 text-sm sm:text-[15px] leading-relaxed mb-5">{c.text}</p>
                    <span className="mt-auto inline-flex items-center gap-1.5 text-[#9ed42e] text-sm group-hover:gap-2.5 transition-all">
                      {c.cta}
                      <ArrowRight className="w-4 h-4 text-[#9ed42e]" strokeWidth={2.5} />
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* WERKWIJZE */}
        <section className="py-16 md:py-24 bg-[#f8f9fa]">
          <div className="container mx-auto px-5 sm:px-6 lg:px-12">
            <div className="text-center mb-16">
              <div className="inline-block bg-[#0d3b2e] text-[#9ed42e] px-4 py-2 rounded-full text-sm mb-6 tracking-wider uppercase">
                Werkwijze
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl text-[#0d3b2e] mb-4">Onze werkwijze</h2>
              <p className="text-xl text-[#6c757d] max-w-3xl mx-auto">
                Van eerste inventarisatie tot oplevering — gestructureerd, veilig en transparant.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {steps.map((step, index) => {
                const Icon = step.icon;
                return (
                  <div
                    key={step.title}
                    className="relative bg-white rounded-xl p-8 border border-gray-200 hover:border-[#9ed42e] hover:shadow-xl transition-all duration-300"
                  >
                    <div className="absolute -top-4 -left-2 w-10 h-10 bg-[#0d3b2e] text-[#9ed42e] rounded-lg flex items-center justify-center text-sm">
                      {String(index + 1).padStart(2, "0")}
                    </div>
                    <div className="w-14 h-14 bg-gradient-to-br from-[#0d3b2e] to-[#1a4a36] rounded-xl flex items-center justify-center mb-6 mt-2">
                      <Icon className="w-7 h-7 text-[#9ed42e]" strokeWidth={2} />
                    </div>
                    <h3 className="text-xl text-[#0d3b2e] mb-3">{step.title}</h3>
                    <p className="text-[#6c757d] leading-relaxed text-sm">{step.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA */}
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
              <h2 className="text-3xl sm:text-4xl lg:text-5xl text-white mb-6">
                Een LS/MS-project of<br />
                <span className="text-[#9ed42e]">aardingsvraagstuk bespreken?</span>
              </h2>
              <p className="text-xl text-white/85 mb-12 leading-relaxed">
                Neem contact op met TerreVolt voor vakbekwame ondersteuning binnen de netbeheerwereld.
              </p>
              <a
                href="/contact"
                className="inline-block bg-[#9ed42e] text-[#0d3b2e] px-10 py-4 rounded-lg hover:bg-[#8bc41f] transition-all duration-300 text-lg"
              >
                Neem contact op
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Diensten;
