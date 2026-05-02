import { ShieldCheck, Award, ClipboardCheck } from "lucide-react";

const items = [
  { icon: ShieldCheck, label: "Veiligheidsstructuur", value: "BEI BLS/BHS" },
  { icon: Award, label: "Veilig werken", value: "VCA" },
  { icon: ClipboardCheck, label: "Normen", value: "NEN 3140 / NEN 1010" },
  { icon: ShieldCheck, label: "Veiligheidsfilosofie", value: "We doen het veilig" },
];

export function TrustStrip() {
  return (
    <section className="bg-white border-b border-gray-200 py-6">
      <div className="container mx-auto px-5 sm:px-6 lg:px-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 md:items-center">
          {items.map((it, idx) => {
            const Icon = it.icon;
            return (
              <div key={it.label} className="flex items-center gap-3 md:relative">
                <div className="w-10 h-10 bg-[#f0f7e6] rounded-lg flex items-center justify-center flex-shrink-0">
                  <Icon className="w-5 h-5 text-[#0d3b2e]" strokeWidth={2} />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-[10px] sm:text-xs text-[#6c757d] uppercase tracking-wider leading-tight break-words">{it.label}</div>
                  <div className="text-sm sm:text-lg text-[#0d3b2e] leading-snug break-words">{it.value}</div>
                </div>
                {idx < items.length - 1 && (
                  <span aria-hidden="true" className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 w-px h-10 bg-gray-200" />
                )}
              </div>
            );
          })}
        </div>
        <p className="mt-4 text-center text-xs sm:text-sm text-[#6c757d] italic">
          We doen het veilig, of we doen het niet.
        </p>
      </div>
    </section>
  );
}
