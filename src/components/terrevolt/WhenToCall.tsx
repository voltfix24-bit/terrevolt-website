import { CheckCircle2, HelpCircle } from "lucide-react";

type Props = {
  /** Bullets voor "Wanneer schakelt u TerreVolt in?". */
  items: string[];
  /** Optionele override van de sectietitel. */
  title?: string;
  /** Achtergrondkleur — default wit. Gebruik "muted" voor #f8f9fa. */
  variant?: "white" | "muted";
};

/**
 * Herbruikbaar blok met concrete inschakelmomenten per dienst.
 * Past binnen het bestaande TerreVolt-stijl (zelfde kleuren, cards, iconen).
 */
export function WhenToCall({ items, title = "Wanneer schakelt u TerreVolt in?", variant = "white" }: Props) {
  const bg = variant === "muted" ? "bg-[#f8f9fa]" : "bg-white";
  return (
    <section id="wanneer-inschakelen" className={`py-16 md:py-20 ${bg} scroll-mt-24`}>
      <div className="container mx-auto px-5 sm:px-6 lg:px-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8 md:mb-10">
            <div className="inline-flex items-center gap-2 bg-[#0d3b2e] text-[#9ed42e] px-4 py-2 rounded-full text-sm mb-5 tracking-wider uppercase">
              <HelpCircle className="w-4 h-4" />
              Wanneer inschakelen?
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl text-[#0d3b2e] leading-tight hyphens-nl" lang="nl">
              {title}
            </h2>
          </div>

          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 bg-white border border-gray-200 rounded-2xl p-5 sm:p-6 shadow-sm">
            {items.map((item) => (
              <li key={item} className="flex items-start gap-3 text-[#0d3b2e]">
                <CheckCircle2 className="w-5 h-5 text-[#9ed42e] flex-shrink-0 mt-0.5" strokeWidth={2.5} />
                <span className="text-[15px] leading-relaxed text-[#2d3436] hyphens-nl" lang="nl">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
