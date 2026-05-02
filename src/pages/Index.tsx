import { Header } from "@/components/terrevolt/Header";
import { Hero } from "@/components/terrevolt/Hero";
import { Services } from "@/components/terrevolt/Services";
import { Grounding } from "@/components/terrevolt/Grounding";
import { Target } from "@/components/terrevolt/Target";
import { Projects } from "@/components/terrevolt/Projects";
import { Safety } from "@/components/terrevolt/Safety";
import { CTA } from "@/components/terrevolt/CTA";
import { Footer } from "@/components/terrevolt/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-[#f8f9fa]">
      <Header />
      <main className="pt-16 sm:pt-20">
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
