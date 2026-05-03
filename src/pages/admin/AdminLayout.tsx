import { useEffect } from "react";
import { Navigate, Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import { Loader2, LogOut, Briefcase, Inbox, LayoutDashboard, MessageSquare, BarChart3 } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";

export default function AdminLayout() {
  const { user, isAdmin, loading } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  // Aanvullende sessie-check: redirect direct als de Supabase-sessie ontbreekt.
  // Voorkomt dat een admin-shell kort wordt getoond na uitloggen of bij verlopen tokens.
  useEffect(() => {
    let cancelled = false;
    if (loading) return;
    supabase.auth.getSession().then(({ data }) => {
      if (cancelled) return;
      if (!data.session) {
        navigate("/admin/login", { replace: true, state: { from: location } });
      }
    });
    return () => {
      cancelled = true;
    };
  }, [loading, location, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f8f9fa]">
        <Loader2 className="w-8 h-8 animate-spin text-[#0d3b2e]" />
      </div>
    );
  }

  if (!user) return <Navigate to="/admin/login" replace state={{ from: location }} />;
  if (!isAdmin) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#f8f9fa] px-6 text-center gap-4">
        <h1 className="text-2xl text-[#0d3b2e]">Geen toegang</h1>
        <p className="text-[#6c757d]">Dit account heeft geen adminrechten.</p>
        <Button onClick={() => supabase.auth.signOut()} variant="outline">Uitloggen</Button>
      </div>
    );
  }

  const nav = [
    { to: "/admin", label: "Dashboard", icon: LayoutDashboard, end: true },
    { to: "/admin/vacatures", label: "Vacatures", icon: Briefcase },
    { to: "/admin/sollicitaties", label: "Sollicitaties", icon: Inbox },
    { to: "/admin/contactaanvragen", label: "Contactaanvragen", icon: MessageSquare },
    { to: "/admin/analytics", label: "Analytics", icon: BarChart3 },
  ];

  return (
    <div className="min-h-screen bg-[#f8f9fa]">
      <header className="bg-[#0d3b2e] text-white">
        <div className="container mx-auto px-4 sm:px-6 py-4 flex items-center justify-between gap-3">
          <Link to="/admin" className="flex items-center gap-2 min-w-0">
            <span className="text-[#9ed42e]">TerreVolt</span>
            <span className="text-sm opacity-80 hidden sm:inline">Beheer</span>
          </Link>
          <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
            <Link to="/" className="text-sm hover:text-[#9ed42e]">→ Site</Link>
            <Button
              size="sm"
              variant="ghost"
              className="text-white hover:bg-[#1a4a36]"
              onClick={() => supabase.auth.signOut()}
            >
              <LogOut className="w-4 h-4 sm:mr-1" /> <span className="hidden sm:inline">Uitloggen</span>
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-8 grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-6 lg:gap-8">
        <nav className="flex lg:block gap-1 lg:gap-0 lg:space-y-1 overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0 pb-2 lg:pb-0">
          {nav.map((n) => {
            const Icon = n.icon;
            const active = n.end ? location.pathname === n.to : location.pathname.startsWith(n.to);
            return (
              <Link
                key={n.to}
                to={n.to}
                className={`flex items-center gap-2 lg:gap-3 px-3 lg:px-4 py-2.5 rounded-lg text-sm transition whitespace-nowrap flex-shrink-0 ${
                  active
                    ? "bg-[#0d3b2e] text-white"
                    : "text-[#0d3b2e] hover:bg-white"
                }`}
              >
                <Icon className="w-4 h-4" />
                {n.label}
              </Link>
            );
          })}
        </nav>
        <main id="main-content" className="min-w-0">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
