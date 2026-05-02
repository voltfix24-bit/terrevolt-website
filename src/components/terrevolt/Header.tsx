import { Zap, Menu, X, HardHat, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";

export function Header() {
  const [open, setOpen] = useState(false);

  // "Werken bij" zit los — de overige links blijven plain text.
  const links = [
    { href: "/diensten", label: "Diensten" },
    { href: "/projecten", label: "Projecten" },
    { href: "/veiligheid", label: "Veiligheid" },
    { href: "/over", label: "Over ons" },
  ];

  // Sluit het menu automatisch zodra we op desktop komen.
  useEffect(() => {
    const mql = window.matchMedia("(min-width: 1024px)");
    const handle = (e: MediaQueryListEvent | MediaQueryList) => {
      if (e.matches) setOpen(false);
    };
    handle(mql);
    mql.addEventListener("change", handle);
    return () => mql.removeEventListener("change", handle);
  }, []);

  // Voorkom body-scroll achter open mobiel menu.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-3">
          <a href="/" className="flex items-center gap-2 sm:gap-3 min-w-0">
            <div className="w-9 h-9 sm:w-10 sm:h-10 bg-[#0d3b2e] rounded-lg flex items-center justify-center flex-shrink-0">
              <Zap className="w-5 h-5 sm:w-6 sm:h-6 text-[#9ed42e]" strokeWidth={2.5} />
            </div>
            <div className="min-w-0">
              <div className="text-base sm:text-xl text-[#0d3b2e] truncate leading-tight">TerreVolt BV</div>
              <div className="hidden xs:block text-[11px] sm:text-xs text-[#6c757d] truncate leading-tight">LS/MS-infrastructuur</div>
            </div>
          </a>

          <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
            {links.map((l) => (
              <a key={l.href} href={l.href} className="text-[#2d3436] hover:text-[#0d3b2e] transition-colors">
                {l.label}
              </a>
            ))}
            {/* Werken bij — pill style, subtiel prominent */}
            <a
              href="/werken-bij"
              className="inline-flex items-center gap-2 bg-[#f0f7e6] text-[#0d3b2e] px-4 py-2.5 rounded-lg border border-[#9ed42e] hover:bg-[#9ed42e] hover:border-[#0d3b2e] transition-colors"
            >
              <HardHat className="w-4 h-4" strokeWidth={2.2} />
              <span>Werken bij</span>
            </a>
            <a
              href="/contact"
              className="bg-[#0d3b2e] text-white px-6 py-2.5 rounded-lg hover:bg-[#1a4a36] transition-colors"
            >
              Contact
            </a>
          </nav>

          <button
            className="lg:hidden text-[#0d3b2e] inline-flex items-center justify-center w-11 h-11 -mr-2 flex-shrink-0 rounded-md hover:bg-[#f0f7e6] transition-colors"
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? "Menu sluiten" : "Menu openen"}
            aria-expanded={open}
            aria-controls="mobile-nav"
          >
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobiel menu */}
      {open && (
        <nav
          id="mobile-nav"
          className="lg:hidden bg-white/95 backdrop-blur-sm border-t border-gray-200 max-h-[calc(100dvh-4rem)] sm:max-h-[calc(100dvh-5rem)] overflow-y-auto overscroll-contain"
        >
          <div className="container mx-auto px-4 sm:px-6 py-4 flex flex-col gap-2">
            {/* Recruitment-card bovenaan */}
            <a
              href="/werken-bij"
              onClick={() => setOpen(false)}
              className="block bg-gradient-to-br from-[#0d3b2e] to-[#1a4a36] text-white rounded-xl p-4 mb-2 border border-[#9ed42e]/40 hover:from-[#1a4a36] hover:to-[#0d3b2e] transition-colors"
            >
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-[#9ed42e] rounded-lg flex items-center justify-center flex-shrink-0">
                  <HardHat className="w-5 h-5 text-[#0d3b2e]" strokeWidth={2.5} />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-white text-base leading-snug">Werk mee aan LS/MS-infrastructuur</div>
                  <div className="text-gray-300 text-xs mt-1 leading-snug">
                    Bekijk profielen voor monteurs, werkverantwoordelijken en ZZP-ploegen.
                  </div>
                  <div className="inline-flex items-center gap-1.5 text-[#9ed42e] text-sm mt-2">
                    Bekijk Werken bij <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            </a>

            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="text-[#2d3436] hover:text-[#0d3b2e] transition-colors py-3 px-2 rounded-md hover:bg-[#f0f7e6] min-h-[44px] flex items-center"
              >
                {l.label}
              </a>
            ))}

            <a
              href="/werken-bij"
              onClick={() => setOpen(false)}
              className="text-[#0d3b2e] bg-[#f0f7e6] border border-[#9ed42e] py-3 px-3 rounded-lg flex items-center gap-2 min-h-[44px] mt-1"
            >
              <HardHat className="w-4 h-4" /> Werken bij
            </a>
            <a
              href="/contact"
              onClick={() => setOpen(false)}
              className="bg-[#0d3b2e] text-white px-6 py-3 rounded-lg hover:bg-[#1a4a36] transition-colors text-center mt-1 min-h-[44px] flex items-center justify-center"
            >
              Contact
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}

