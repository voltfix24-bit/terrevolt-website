import { Network, Building2, Cog, Gauge, Activity, Home } from "lucide-react";

const services = [
  {
    icon: Network,
    title: "LS/MS Netmontage",
    description: "Kabelmontage, moffen, eindsluitingen en aansluitwerk binnen laag- en middenspanningsnetten."
  },
  {
    icon: Building2,
    title: "Stationsrenovatie",
    description: "Renovatie en inrichting van MS/LS-stations, technische ruimten en transformatorstations."
  },
  {
    icon: Cog,
    title: "Schakelwerk",
    description: "Veilig in- en uitbedrijf nemen, vrijschakelen en veiligstellen van LS/MS-installaties."
  },
  {
    icon: Gauge,
    title: "Aardingsoplossingen",
    description: "Aanleg, verbetering, meting en rapportage van aardingssystemen voor stations en technische ruimten."
  },
  {
    icon: Activity,
    title: "Meten & beproeven",
    description: "Controlemetingen, kabelmetingen, aardingsmetingen en duidelijke opleverrapportages."
  },
  {
    icon: Home,
    title: "Huisaansluitingen",
    description: "Aanleg, wijziging en sanering van aansluitingen op het laagspanningsnet."
  }
];

export function Services() {
  return (
    <section id="diensten" className="py-16 md:py-16 md:py-24 bg-white">
      <div className="container mx-auto px-5 sm:px-6 lg:px-12">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl text-[#0d3b2e] mb-4">Onze diensten</h2>
          <p className="text-xl text-[#6c757d] max-w-3xl mx-auto">
            Professionele elektrotechnische infrastructuur voor netbeheerders, hoofdaannemers en industrie.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={index}
                className="group bg-white border border-gray-200 rounded-xl p-8 hover:border-[#9ed42e] hover:shadow-xl transition-all duration-300"
              >
                <div className="w-14 h-14 bg-[#f0f7e6] rounded-lg flex items-center justify-center mb-6 group-hover:bg-[#9ed42e] transition-colors duration-300">
                  <Icon className="w-7 h-7 text-[#0d3b2e] group-hover:text-white transition-colors duration-300" strokeWidth={2} />
                </div>
                <h3 className="text-xl text-[#0d3b2e] mb-3">{service.title}</h3>
                <p className="text-[#6c757d] leading-relaxed">{service.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
