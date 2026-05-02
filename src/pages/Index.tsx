import { Header } from "@/components/terrevolt/Header";
import { Hero } from "@/components/terrevolt/Hero";
import { Services } from "@/components/terrevolt/Services";
import { Grounding } from "@/components/terrevolt/Grounding";
import { Target } from "@/components/terrevolt/Target";
import { Projects } from "@/components/terrevolt/Projects";
import { Safety } from "@/components/terrevolt/Safety";
import { CTA } from "@/components/terrevolt/CTA";
import { Footer } from "@/components/terrevolt/Footer";
import { usePageMeta } from "../hooks/usePageMeta";

const Index = () => {
  usePageMeta("TerreVolt BV | LS/MS-infrastructuur en aardingsoplossingen", "TerreVolt BV ondersteunt netbeheerders, hoofdaannemers en industrie bij LS/MS-netmontage, stationsrenovaties, schakelwerk en aardingsoplossingen.");

  return (
    <div className="min-h-screen bg-[#f8f9fa]">
      <Header />
      <main id="main-content" className="pt-16 sm:pt-20">
        <Hero />
        <Services />
        <Grounding />
        <Target />
        <Projects />
        <Safety />
        <CTA />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
