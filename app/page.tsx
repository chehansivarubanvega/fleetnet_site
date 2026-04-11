import FluidBackground from "@/components/FluidBackground";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Modules from "@/components/Modules";
import Navbar from "@/components/Navbar";
import OperationsNarrative from "@/components/OperationsNarrative";
import PartnerHands from "@/components/PartnerHands";
import TrackerSection from "@/components/TrackerSection";
import TransitionSection from "@/components/TransitionSection";

export default function Home() {
  return (
    <main className="min-h-screen relative">
      <FluidBackground />
      <Navbar />
      <Hero />
      <TransitionSection />
      <OperationsNarrative />
      <Modules />
      <TrackerSection />
      <PartnerHands />

      <Footer />
    </main>
  );
}
