import { Cable, Building2, Power, Anchor, Gauge, PlugZap, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Reveal } from "@/components/terrevolt/Reveal";

const services = [
  {
    icon: Cable,
    slug: "ls-ms-netmontage",
    title: "LS/MS Netmontage",
    description: "Kabelmontage, moffen, eindsluitingen en aansluitwerk binnen laag- en middenspanningsnetten."
  },
  {
    icon: Building2,
    slug: "stationsrenovatie",
    title: "Stationsrenovatie",
    description: "Renovatie en inrichting van MS/LS-stations, technische ruimten en transformatorstations."
  },
  {
    icon: Power,
    slug: "schakelwerk",
    title: "Schakelwerk",
    description: "Veilig in- en uitbedrijf nemen, vrijschakelen en veiligstellen van LS/MS-installaties."
  },
  {
    icon: Anchor,
    slug: "aardingsoplossingen",
    title: "Aardingsoplossingen",
    description: "Aanleg, verbetering, meting en rapportage van aardingssystemen voor stations en technische ruimten."
  },
  {
    icon: Gauge,
    slug: "meten-en-beproeven",
    title: "Meten & beproeven",
    description: "Controlemetingen, kabelmetingen, aardingsmetingen en duidelijke opleverrapportages."
  },
  {
    icon: PlugZap,
    slug: "huisaansluitingen",
    title: "Huisaansluitingen",
    description: "Aanleg, wijziging en sanering van aansluitingen op het laagspanningsnet."
  }
];

export function Services() {
  return (
    <section id="diensten" className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-5 sm:px-6 lg:px-12">
        <div className="text-center mb-10 sm:mb-14 md:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl text-[#0d3b2e] mb-3 sm:mb-4">Onze diensten</h2>
          <p className="text-base sm:text-xl text-[#6c757d] max-w-3xl mx-auto leading-relaxed">
            Professionele elektrotechnische infrastructuur voor netbeheerders, hoofdaannemers en industrie.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <Link
                key={service.slug}
                to={`/diensten/${service.slug}`}
                aria-label={`Bekijk dienst: ${service.title}`}
                className="group flex flex-col bg-white border border-gray-200 rounded-xl p-6 md:p-8 hover:border-[#9ed42e] hover:shadow-xl transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9ed42e] focus-visible:ring-offset-2 active:scale-[0.99]"
              >
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-[#f0f7e6] rounded-lg flex items-center justify-center mb-5 sm:mb-6 group-hover:bg-[#9ed42e] transition-colors duration-300">
                  <Icon className="w-6 h-6 sm:w-7 sm:h-7 text-[#0d3b2e] group-hover:text-white transition-colors duration-300" strokeWidth={2} />
                </div>
                <h3 className="text-lg sm:text-xl text-[#0d3b2e] mb-2 sm:mb-3 hyphens-nl">{service.title}</h3>
                <p className="text-[15px] sm:text-base text-[#6c757d] leading-relaxed mb-5 sm:mb-6">{service.description}</p>
                <span className="mt-auto inline-flex items-center gap-1.5 text-sm text-[#0d3b2e] group-hover:text-[#1a4a36] group-hover:gap-2.5 transition-all">
                  Bekijk dienst
                  <ArrowRight className="w-4 h-4 text-[#9ed42e]" strokeWidth={2.5} />
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
