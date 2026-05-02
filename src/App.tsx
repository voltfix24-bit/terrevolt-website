import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import Diensten from "./pages/Diensten.tsx";
import LSMSNetmontage from "./pages/diensten/LSMSNetmontage.tsx";
import Stationsrenovatie from "./pages/diensten/Stationsrenovatie.tsx";
import Schakelwerk from "./pages/diensten/Schakelwerk.tsx";
import Aardingsoplossingen from "./pages/diensten/Aardingsoplossingen.tsx";
import MetenEnBeproeven from "./pages/diensten/MetenEnBeproeven.tsx";
import Huisaansluitingen from "./pages/diensten/Huisaansluitingen.tsx";
import Projecten from "./pages/Projecten.tsx";
import Veiligheid from "./pages/Veiligheid.tsx";
import Over from "./pages/Over.tsx";
import WerkenBij from "./pages/WerkenBij.tsx";
import VacatureDetail from "./pages/VacatureDetail.tsx";
import Contact from "./pages/Contact.tsx";
import NotFound from "./pages/NotFound.tsx";
import AdminLayout from "./pages/admin/AdminLayout.tsx";
import AdminLogin from "./pages/admin/AdminLogin.tsx";
import AdminDashboard from "./pages/admin/AdminDashboard.tsx";
import AdminVacancies from "./pages/admin/AdminVacancies.tsx";
import AdminVacancyForm from "./pages/admin/AdminVacancyForm.tsx";
import AdminApplications from "./pages/admin/AdminApplications.tsx";
import { OrganizationJsonLd } from "./components/seo/OrganizationJsonLd.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <OrganizationJsonLd />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/diensten" element={<Diensten />} />
          <Route path="/projecten" element={<Projecten />} />
          <Route path="/veiligheid" element={<Veiligheid />} />
          <Route path="/over" element={<Over />} />
          <Route path="/werken-bij" element={<WerkenBij />} />
          <Route path="/vacatures/:slug" element={<VacatureDetail />} />
          <Route path="/contact" element={<Contact />} />
          {/* Aliassen voor leesbare URL's */}
          <Route path="/veiligheid-certificeringen" element={<Veiligheid />} />
          <Route path="/over-terrevolt" element={<Over />} />
          <Route path="/zzp-monteurs" element={<WerkenBij />} />

          <Route path="/diensten/ls-ms-netmontage" element={<LSMSNetmontage />} />
          <Route path="/diensten/stationsrenovatie" element={<Stationsrenovatie />} />
          <Route path="/diensten/schakelwerk" element={<Schakelwerk />} />
          <Route path="/diensten/aardingsoplossingen" element={<Aardingsoplossingen />} />
          <Route path="/diensten/meten-en-beproeven" element={<MetenEnBeproeven />} />
          <Route path="/diensten/meten-beproeven-rapportage" element={<MetenEnBeproeven />} />
          <Route path="/diensten/huisaansluitingen" element={<Huisaansluitingen />} />

          {/* Admin */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="vacatures" element={<AdminVacancies />} />
            <Route path="vacatures/nieuw" element={<AdminVacancyForm />} />
            <Route path="vacatures/:id/bewerken" element={<AdminVacancyForm />} />
            <Route path="sollicitaties" element={<AdminApplications />} />
          </Route>

          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
