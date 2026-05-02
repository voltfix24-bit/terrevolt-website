import { Zap, Menu } from "lucide-react";

export function Header() {
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
            <a href="#diensten" className="text-[#2d3436] hover:text-[#0d3b2e] transition-colors">Diensten</a>
            <a href="#projecten" className="text-[#2d3436] hover:text-[#0d3b2e] transition-colors">Projecten</a>
            <a href="#veiligheid" className="text-[#2d3436] hover:text-[#0d3b2e] transition-colors">Veiligheid</a>
            <a href="#over-ons" className="text-[#2d3436] hover:text-[#0d3b2e] transition-colors">Over ons</a>
            <a href="#contact" className="bg-[#0d3b2e] text-white px-6 py-2 rounded-lg hover:bg-[#1a4a36] transition-colors">
              Contact
            </a>
          </nav>

          <button className="lg:hidden text-[#0d3b2e]">
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>
    </header>
  );
}
