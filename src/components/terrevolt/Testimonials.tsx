import { Quote } from "lucide-react";

const cards = [
  {
    title: "Kennis van de netbeheeromgeving",
    text: "Bij LS/MS-projecten telt niet alleen technische uitvoering, maar ook kennis van procedures, bevoegdheden en veiligheidsstructuur. TerreVolt sluit aan op de manier waarop professionele opdrachtgevers werken.",
    tag: "LS/MS Netmontage",
  },
  {
    title: "Veilig en gestructureerd uitvoeren",
    text: "Stationsrenovaties, schakelwerk en kabelmontage vragen om voorbereiding, duidelijke communicatie en uitvoering volgens projectafspraken.",
    tag: "Stationsrenovatie",
  },
  {
    title: "Aantoonbaar opleveren",
    text: "Metingen, controles en rapportages zorgen ervoor dat werkzaamheden niet alleen uitgevoerd, maar ook duidelijk vastgelegd en overdraagbaar zijn.",
    tag: "Aardingsoplossingen",
  },
];

export function Testimonials() {
  return (
    <section className="py-16 md:py-24 bg-[#f8f9fa]">
      <div className="container mx-auto px-5 sm:px-6 lg:px-12">
        <div className="text-center mb-12 md:mb-16 max-w-3xl mx-auto">
          <div className="inline-block bg-[#0d3b2e] text-[#9ed42e] px-4 py-2 rounded-full text-sm mb-6 tracking-wider uppercase">
            Wat opdrachtgevers belangrijk vinden
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl text-[#0d3b2e] mb-4 leading-tight">
            Vertrouwen begint bij veiligheid en duidelijke uitvoering
          </h2>
          <p className="text-lg text-[#6c757d] leading-relaxed">
            Professionele opdrachtgevers zoeken een uitvoeringspartner die procedures begrijpt, veilig werkt en aantoonbaar oplevert.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {cards.map((c) => (
            <div
              key={c.title}
              className="bg-white border border-gray-200 rounded-xl p-8 hover:border-[#9ed42e] hover:shadow-xl transition-all duration-300 flex flex-col"
            >
              <Quote className="w-8 h-8 text-[#9ed42e] mb-4" strokeWidth={2} />
              <h3 className="text-xl text-[#0d3b2e] mb-3">{c.title}</h3>
              <p className="text-[#6c757d] leading-relaxed mb-6">{c.text}</p>
              <div className="mt-auto">
                <span className="inline-block text-[10px] tracking-wider uppercase bg-[#f0f7e6] text-[#0d3b2e] border border-[#9ed42e]/30 rounded-full px-2.5 py-1">
                  {c.tag}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
