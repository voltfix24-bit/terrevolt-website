import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { ArrowRight, Home, Mail } from "lucide-react";
import Header from "@/components/terrevolt/Header";
import Footer from "@/components/terrevolt/Footer";
import { usePageMeta } from "@/hooks/usePageMeta";

const NotFound = () => {
  const location = useLocation();

  usePageMeta({
    title: "Pagina niet gevonden | TerreVolt BV",
    description: "De pagina die u zoekt bestaat niet of is verplaatst. Bekijk onze diensten of neem contact op.",
    noindex: true,
  });

  useEffect(() => {
    if (import.meta.env.DEV) {
      console.warn("404:", location.pathname);
    }
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col bg-[#f8f9fa]">
      <Header />
      <main id="main-content" className="flex-1 flex items-center justify-center px-4 sm:px-6 py-16 sm:py-24">
        <div className="max-w-2xl text-center">
          <p className="text-sm tracking-widest uppercase text-[#9ed42e] mb-3">404</p>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl text-[#0d3b2e] mb-4">Pagina niet gevonden</h1>
          <p className="text-base sm:text-lg text-[#6c757d] mb-8 leading-relaxed">
            De pagina die u zoekt bestaat niet of is verplaatst. Ga terug naar de homepage of neem contact met ons op.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center mb-10">
            <Link
              to="/"
              className="inline-flex items-center justify-center gap-2 bg-[#9ed42e] text-[#0d3b2e] px-6 py-3 min-h-[48px] rounded-lg hover:bg-[#8bc41f] transition-colors"
            >
              <Home className="w-5 h-5" />
              Terug naar home
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2 border-2 border-[#0d3b2e] text-[#0d3b2e] px-6 py-3 min-h-[48px] rounded-lg hover:bg-[#0d3b2e] hover:text-white transition-colors"
            >
              <Mail className="w-5 h-5" />
              Contact opnemen
            </Link>
          </div>

          <div className="text-sm text-[#6c757d]">
            <p className="mb-2">Of bekijk:</p>
            <div className="flex flex-wrap gap-x-4 gap-y-2 justify-center">
              <Link to="/diensten" className="inline-flex items-center gap-1 text-[#0d3b2e] hover:text-[#9ed42e]">
                Diensten <ArrowRight className="w-3 h-3" />
              </Link>
              <Link to="/werken-bij" className="inline-flex items-center gap-1 text-[#0d3b2e] hover:text-[#9ed42e]">
                Werken bij <ArrowRight className="w-3 h-3" />
              </Link>
              <Link to="/veiligheid" className="inline-flex items-center gap-1 text-[#0d3b2e] hover:text-[#9ed42e]">
                Veiligheid <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default NotFound;
