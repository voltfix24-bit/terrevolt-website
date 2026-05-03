import { lazy, Suspense } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { OrganizationJsonLd } from "./components/seo/OrganizationJsonLd.tsx";
import { HashScroll } from "./components/HashScroll.tsx";
import { RouteTracker } from "./components/analytics/RouteTracker.tsx";
import { RouteFallback } from "./components/RouteFallback.tsx";
import Index from "./pages/Index.tsx";

// Publieke pagina's — Index blijft eager voor snelle LCP op de homepage.
const Diensten = lazy(() => import("./pages/Diensten.tsx"));
const LSMSNetmontage = lazy(() => import("./pages/diensten/LSMSNetmontage.tsx"));
const Stationsrenovatie = lazy(() => import("./pages/diensten/Stationsrenovatie.tsx"));
const Schakelwerk = lazy(() => import("./pages/diensten/Schakelwerk.tsx"));
const Aardingsoplossingen = lazy(() => import("./pages/diensten/Aardingsoplossingen.tsx"));
const MetenEnBeproeven = lazy(() => import("./pages/diensten/MetenEnBeproeven.tsx"));
const Huisaansluitingen = lazy(() => import("./pages/diensten/Huisaansluitingen.tsx"));
const Projecten = lazy(() => import("./pages/Projecten.tsx"));
const Veiligheid = lazy(() => import("./pages/Veiligheid.tsx"));
const Over = lazy(() => import("./pages/Over.tsx"));
const WerkenBij = lazy(() => import("./pages/WerkenBij.tsx"));
const VacatureDetail = lazy(() => import("./pages/VacatureDetail.tsx"));
const Contact = lazy(() => import("./pages/Contact.tsx"));
const Privacy = lazy(() => import("./pages/Privacy.tsx"));
const NotFound = lazy(() => import("./pages/NotFound.tsx"));

// Admin — volledig lazy zodat het niet in de eerste publieke bundle zit.
const AdminLayout = lazy(() => import("./pages/admin/AdminLayout.tsx"));
const AdminLogin = lazy(() => import("./pages/admin/AdminLogin.tsx"));
const AdminDashboard = lazy(() => import("./pages/admin/AdminDashboard.tsx"));
const AdminVacancies = lazy(() => import("./pages/admin/AdminVacancies.tsx"));
const AdminVacancyForm = lazy(() => import("./pages/admin/AdminVacancyForm.tsx"));
const AdminApplications = lazy(() => import("./pages/admin/AdminApplications.tsx"));
const AdminContactRequests = lazy(() => import("./pages/admin/AdminContactRequests.tsx"));
const AdminAnalytics = lazy(() => import("./pages/admin/AdminAnalytics.tsx"));

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <OrganizationJsonLd />
      <BrowserRouter>
        <HashScroll />
        <RouteTracker />
        <Suspense fallback={<RouteFallback />}>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/diensten" element={<Diensten />} />
            <Route path="/projecten" element={<Projecten />} />
            <Route path="/veiligheid" element={<Veiligheid />} />
            <Route path="/over" element={<Over />} />
            <Route path="/werken-bij" element={<WerkenBij />} />
            <Route path="/vacatures/:slug" element={<VacatureDetail />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/privacy" element={<Privacy />} />
            {/* Aliasroutes — 301-equivalent redirect naar canonieke route */}
            <Route path="/veiligheid-certificeringen" element={<Navigate to="/veiligheid" replace />} />
            <Route path="/over-terrevolt" element={<Navigate to="/over" replace />} />
            <Route path="/zzp-monteurs" element={<Navigate to="/werken-bij#zzp" replace />} />
            <Route path="/diensten/meten-beproeven-rapportage" element={<Navigate to="/diensten/meten-en-beproeven" replace />} />

            <Route path="/diensten/ls-ms-netmontage" element={<LSMSNetmontage />} />
            <Route path="/diensten/stationsrenovatie" element={<Stationsrenovatie />} />
            <Route path="/diensten/schakelwerk" element={<Schakelwerk />} />
            <Route path="/diensten/aardingsoplossingen" element={<Aardingsoplossingen />} />
            <Route path="/diensten/meten-en-beproeven" element={<MetenEnBeproeven />} />
            <Route path="/diensten/huisaansluitingen" element={<Huisaansluitingen />} />

            {/* Admin */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminDashboard />} />
              <Route path="vacatures" element={<AdminVacancies />} />
              <Route path="vacatures/nieuw" element={<AdminVacancyForm />} />
              <Route path="vacatures/:id/bewerken" element={<AdminVacancyForm />} />
              <Route path="sollicitaties" element={<AdminApplications />} />
              <Route path="contactaanvragen" element={<AdminContactRequests />} />
              <Route path="analytics" element={<AdminAnalytics />} />
            </Route>

            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
