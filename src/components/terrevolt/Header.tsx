import { Zap, Menu, X } from "lucide-react";
import { useState } from "react";

export function Header() {
  const [open, setOpen] = useState(false);

  const links = [
    { href: "#diensten", label: "Diensten" },
    { href: "#projecten", label: "Projecten" },
    { href: "#veiligheid", label: "Veiligheid" },
    { href: "#over-ons", label: "Over ons" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#0d3b2e] rounded-lg flex items-center justify-center">
              <Zap className="w-6 h-6 text-[#9ed42e]" strokeWidth={2.5} />
            </div>
            <div>
              <div className="text-xl text-[#0d3b2e]">TerreVolt BV</div>
              <div className="text-xs text-[#6c757d]">LS/MS-infrastructuur</div>
            </div>
          </div>

          <nav className="hidden lg:flex items-center gap-8">
            {links.map((l) => (
              <a key={l.href} href={l.href} className="text-[#2d3436] hover:text-[#0d3b2e] transition-colors">
                {l.label}
              </a>
            ))}
            <a href="#contact" className="bg-[#0d3b2e] text-white px-6 py-2 rounded-lg hover:bg-[#1a4a36] transition-colors">
              Contact
            </a>
          </nav>

          <button
            className="lg:hidden text-[#0d3b2e]"
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? "Menu sluiten" : "Menu openen"}
            aria-expanded={open}
          >
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {open && (
          <nav className="lg:hidden pb-6 flex flex-col gap-4 border-t border-gray-200 pt-4">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="text-[#2d3436] hover:text-[#0d3b2e] transition-colors"
              >
                {l.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="bg-[#0d3b2e] text-white px-6 py-2 rounded-lg hover:bg-[#1a4a36] transition-colors text-center"
            >
              Contact
            </a>
          </nav>
        )}
      </div>
    </header>
  );
}
