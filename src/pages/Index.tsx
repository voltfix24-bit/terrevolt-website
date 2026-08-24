import { Header } from "@/components/terrevolt/Header";
import { Hero } from "@/components/terrevolt/Hero";
import { TrustStrip } from "@/components/terrevolt/TrustStrip";
import { Certifications } from "@/components/terrevolt/Certifications";
import { Services } from "@/components/terrevolt/Services";
import { Grounding } from "@/components/terrevolt/Grounding";
import { Target } from "@/components/terrevolt/Target";
import { Testimonials } from "@/components/terrevolt/Testimonials";
import { Projects } from "@/components/terrevolt/Projects";
import { Safety } from "@/components/terrevolt/Safety";
import { CTA } from "@/components/terrevolt/CTA";
import { Footer } from "@/components/terrevolt/Footer";
import { usePageMeta } from "../hooks/usePageMeta";

const Index = () => {
  usePageMeta("TerreVolt BV | Specialist in LS/MS-infrastructuur en aardingsoplossingen", "TerreVolt ondersteunt professionele opdrachtgevers bij LS/MS-netmontage, stationsrenovatie, schakelwerk, aardingsoplossingen, meten en beproeven.", "/");

  return (
    <div className="min-h-screen bg-[#f8f9fa]">
      <Header />
      <main id="main-content" className="pt-16 sm:pt-20">
        <Hero />
        <TrustStrip />
        <Certifications />
        <Services />
        <Grounding />
        <Target />
        <Testimonials />
        <Projects />
        <Safety />
        <CTA />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
