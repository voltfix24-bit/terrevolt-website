import { ShieldCheck, BadgeCheck, HardHat, BookOpen } from "lucide-react";

/**
 * Compacte trust-strip onder de hero. Toont in één oogopslag waar
 * TerreVolt voor staat: filosofie, structuur, veilig werken en normen.
 * Geen volledige sectie — bedoeld als visuele brug tussen Hero en Services.
 *
 * Layout: 2 kolommen op mobiel, 4 op desktop.
 */
const items = [
  {
    icon: ShieldCheck,
    label: "Veiligheidsfilosofie",
    value: "We doen het veilig",
  },
  {
    icon: HardHat,
    label: "Veiligheidsstructuur",
    value: "BEI BLS / BHS",
  },
  {
    icon: BadgeCheck,
    label: "Veilig werken",
    value: "VCA",
  },
  {
    icon: BookOpen,
    label: "Normen",
    value: "NEN 3140 / NEN 1010",
  },
];

export function TrustStrip() {
  return (
    <section
      aria-label="Veiligheid en normen"
      className="bg-white border-b border-gray-100"
    >
      <div className="container mx-auto px-5 sm:px-6 lg:px-12 py-6 sm:py-7">
        <ul className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          {items.map((item) => {
            const Icon = item.icon;
            return (
              <li
                key={item.label}
                className="flex items-start gap-3 min-w-0"
              >
                <span className="w-9 h-9 sm:w-10 sm:h-10 bg-[#f0f7e6] border border-[#9ed42e]/30 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Icon
                    className="w-4 h-4 sm:w-5 sm:h-5 text-[#0d3b2e]"
                    strokeWidth={2}
                  />
                </span>
                <div className="min-w-0">
                  <div className="text-[10px] sm:text-xs uppercase tracking-wider text-[#6c757d] leading-tight">
                    {item.label}
                  </div>
                  <div className="text-sm sm:text-base text-[#0d3b2e] leading-snug truncate">
                    {item.value}
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
