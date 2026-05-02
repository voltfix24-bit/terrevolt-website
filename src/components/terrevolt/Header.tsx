import { Zap, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

export function Header() {
  const [open, setOpen] = useState(false);

  const links = [
    { href: "#diensten", label: "Diensten" },
    { href: "#projecten", label: "Projecten" },
    { href: "#veiligheid", label: "Veiligheid" },
    { href: "#over-ons", label: "Over ons" },
  ];

  // Sluit het menu automatisch zodra we (door rotatie of resize) op desktop komen,
  // zodat er geen "vastzittend" mobiel menu blijft hangen.
  useEffect(() => {
    const mql = window.matchMedia("(min-width: 1024px)");
    const handle = (e: MediaQueryListEvent | MediaQueryList) => {
      if (e.matches) setOpen(false);
    };
    handle(mql);
    mql.addEventListener("change", handle);
    return () => mql.removeEventListener("change", handle);
  }, []);

  // Voorkom dat de body scrollt achter het open mobiele menu.
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
          <a href="#" className="flex items-center gap-2 sm:gap-3 min-w-0">
            <div className="w-9 h-9 sm:w-10 sm:h-10 bg-[#0d3b2e] rounded-lg flex items-center justify-center flex-shrink-0">
              <Zap className="w-5 h-5 sm:w-6 sm:h-6 text-[#9ed42e]" strokeWidth={2.5} />
            </div>
            <div className="min-w-0">
              <div className="text-base sm:text-xl text-[#0d3b2e] truncate leading-tight">TerreVolt BV</div>
              <div className="text-[11px] sm:text-xs text-[#6c757d] truncate leading-tight">LS/MS-infrastructuur</div>
            </div>
          </a>

          <nav className="hidden lg:flex items-center gap-8">
            {links.map((l) => (
              <a key={l.href} href={l.href} className="text-[#2d3436] hover:text-[#0d3b2e] transition-colors">
                {l.label}
              </a>
            ))}
            <a
              href="#contact"
              className="bg-[#0d3b2e] text-white px-6 py-2 rounded-lg hover:bg-[#1a4a36] transition-colors"
            >
              Contact
            </a>
          </nav>

          <button
            className="lg:hidden text-[#0d3b2e] p-2 -mr-2 flex-shrink-0"
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? "Menu sluiten" : "Menu openen"}
            aria-expanded={open}
            aria-controls="mobile-nav"
          >
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobiel menu: vol-breed onder de header, scrollbaar bij weinig hoogte (landscape). */}
      {open && (
        <nav
          id="mobile-nav"
          className="lg:hidden bg-white/95 backdrop-blur-sm border-t border-gray-200 max-h-[calc(100dvh-4rem)] sm:max-h-[calc(100dvh-5rem)] overflow-y-auto overscroll-contain"
        >
          <div className="container mx-auto px-4 sm:px-6 py-4 flex flex-col gap-2">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="text-[#2d3436] hover:text-[#0d3b2e] transition-colors py-3 px-2 rounded-md hover:bg-[#f0f7e6]"
              >
                {l.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="bg-[#0d3b2e] text-white px-6 py-3 rounded-lg hover:bg-[#1a4a36] transition-colors text-center mt-2"
            >
              Contact
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}
