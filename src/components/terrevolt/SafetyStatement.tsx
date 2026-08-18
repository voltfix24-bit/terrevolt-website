import { ShieldCheck } from "lucide-react";

export function SafetyStatement() {
  const tags = ["BEI BLS/BHS waar van toepassing", "VCA", "NEN 3140 / NEN 3840"];
  return (
    <section id="veiligheid" className="py-12 md:py-16 bg-[#f8f9fa] scroll-mt-24">
      <div className="container mx-auto px-5 sm:px-6 lg:px-12">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white border border-gray-200 rounded-xl p-6 sm:p-8 flex flex-col sm:flex-row gap-6 items-start">
            <div className="w-14 h-14 bg-gradient-to-br from-[#0d3b2e] to-[#1a4a36] rounded-xl flex items-center justify-center flex-shrink-0">
              <ShieldCheck className="w-7 h-7 text-[#9ed42e]" strokeWidth={2} />
            </div>
            <div className="min-w-0">
              <h3 className="text-xl text-[#0d3b2e] mb-2">Veiligheid en kwaliteit als standaard</h3>
              <p className="text-[#6c757d] leading-relaxed">
                TerreVolt werkt bij deze dienst met aandacht voor passende aanwijzingen, bevoegdheden en procedures. Maar de basis blijft altijd hetzelfde: iedereen veilig thuis. Als het niet veilig kan, doen we het niet.
              </p>
              <div className="flex flex-wrap gap-2 mt-4">
                {tags.map((t) => (
                  <span key={t} className="text-[10px] uppercase tracking-wider text-[#0d3b2e] bg-[#f0f7e6] border border-[#9ed42e]/40 rounded-full px-3 py-1">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
