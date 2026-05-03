import { Zap, Menu, X, HardHat, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

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

  // Voorkom body-scroll achter open mobiel menu (iOS-safe).
  useEffect(() => {
    if (!open) return;
    const scrollY = window.scrollY;
    const body = document.body;
    const prev = {
      overflow: body.style.overflow,
      position: body.style.position,
      top: body.style.top,
      width: body.style.width,
    };
    body.style.overflow = "hidden";
    body.style.position = "fixed";
    body.style.top = `-${scrollY}px`;
    body.style.width = "100%";
    return () => {
      body.style.overflow = prev.overflow;
      body.style.position = prev.position;
      body.style.top = prev.top;
      body.style.width = prev.width;
      window.scrollTo(0, scrollY);
    };
  }, [open]);

  // Esc sluit menu.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      {/* Skip to content — alleen zichtbaar bij toetsenbordfocus */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:bg-[#0d3b2e] focus:text-white focus:px-4 focus:py-2 focus:rounded-md focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#9ed42e]"
      >
        Direct naar inhoud
      </a>
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-12">
          <div className="flex items-center justify-between h-16 sm:h-20 gap-3">
            <Link to="/" className="flex items-center gap-2 sm:gap-3 min-w-0">
              <div className="w-9 h-9 sm:w-10 sm:h-10 bg-[#0d3b2e] rounded-lg flex items-center justify-center flex-shrink-0">
                <Zap className="w-5 h-5 sm:w-6 sm:h-6 text-[#9ed42e]" strokeWidth={2.5} />
              </div>
              <div className="min-w-0">
                <div className="text-base sm:text-xl text-[#0d3b2e] truncate leading-tight">TerreVolt BV</div>
                <div className="hidden xs:block text-[11px] sm:text-xs text-[#6c757d] leading-tight whitespace-nowrap">LS/MS-infrastructuur</div>
              </div>
            </Link>

            <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
              {links.map((l) => (
                <Link key={l.href} to={l.href} className="text-[#2d3436] hover:text-[#0d3b2e] transition-colors">
                  {l.label}
                </Link>
              ))}
              {/* Werken bij — pill style, subtiel prominent */}
              <Link
                to="/werken-bij"
                className="inline-flex items-center gap-2 bg-[#f0f7e6] text-[#0d3b2e] px-4 py-2.5 rounded-lg border border-[#9ed42e] hover:bg-[#9ed42e] hover:border-[#0d3b2e] transition-colors"
              >
                <HardHat className="w-4 h-4" strokeWidth={2.2} />
                <span>Werken bij</span>
              </Link>
              <Link
                to="/contact"
                className="bg-[#0d3b2e] text-white px-6 py-2.5 rounded-lg hover:bg-[#1a4a36] transition-colors"
              >
                Contact
              </Link>
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

      </header>

      {/* Mobiel menu — full-viewport overlay onder de header, boven alle sticky subnavs/CTA's */}
      {open && (
        <nav
          id="mobile-nav"
          aria-label="Mobiele navigatie"
          className="lg:hidden fixed left-0 right-0 top-16 sm:top-20 bottom-0 z-[9999] bg-white border-t border-gray-200 overflow-y-auto overscroll-contain"
          style={{ WebkitOverflowScrolling: "touch" } as React.CSSProperties}
        >
          <div className="container mx-auto px-4 sm:px-6 py-3 flex flex-col gap-1.5 pb-[calc(2rem+env(safe-area-inset-bottom))]">
            {/* Recruitment-card bovenaan */}
            <Link
              to="/werken-bij"
              onClick={() => setOpen(false)}
              className="block bg-gradient-to-br from-[#0d3b2e] to-[#1a4a36] text-white rounded-xl p-4 mb-1.5 border border-[#9ed42e]/40 hover:from-[#1a4a36] hover:to-[#0d3b2e] transition-colors"
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
                    Werken bij bekijken <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            </Link>

            {links.map((l) => (
              <Link
                key={l.href}
                to={l.href}
                onClick={() => setOpen(false)}
                className="text-[#2d3436] hover:text-[#0d3b2e] transition-colors py-2.5 px-2 rounded-md hover:bg-[#f0f7e6] min-h-[44px] flex items-center"
              >
                {l.label}
              </Link>
            ))}
            <Link
              to="/contact"
              onClick={() => setOpen(false)}
              className="bg-[#0d3b2e] text-white px-6 py-3 rounded-lg hover:bg-[#1a4a36] transition-colors text-center mt-2 min-h-[48px] flex items-center justify-center"
            >
              Contact
            </Link>
          </div>
        </nav>
      )}
    </>
  );
}
