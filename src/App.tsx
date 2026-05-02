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
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/diensten" element={<Diensten />} />
          <Route path="/diensten/ls-ms-netmontage" element={<LSMSNetmontage />} />
          <Route path="/diensten/stationsrenovatie" element={<Stationsrenovatie />} />
          <Route path="/diensten/schakelwerk" element={<Schakelwerk />} />
          <Route path="/diensten/aardingsoplossingen" element={<Aardingsoplossingen />} />
          <Route path="/diensten/meten-en-beproeven" element={<MetenEnBeproeven />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
