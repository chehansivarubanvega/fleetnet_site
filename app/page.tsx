import Features from '@/components/Features';
import FluidBackground from '@/components/FluidBackground';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import Navbar from '@/components/Navbar';
import OperationsNarrative from '@/components/OperationsNarrative';
import PartnerHands from '@/components/PartnerHands';
import TrackerSection from '@/components/TrackerSection';
import TransitionSection from '@/components/TransitionSection';

export default function Home() {
  return (
    <main className="min-h-screen relative">
      <FluidBackground />
      <Navbar />
      <Hero />
      <TransitionSection />
      <OperationsNarrative />
      <TrackerSection />
      <PartnerHands />
      
      {/* Stats Section */}
      <section className="py-16 bg-white border-b border-slate-100 relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-4xl font-bold text-primary mb-1">50k+</p>
              <p className="text-sm text-slate-500 uppercase tracking-widest font-bold">Vehicles Tracked</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-primary mb-1">120+</p>
              <p className="text-sm text-slate-500 uppercase tracking-widest font-bold">Countries</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-primary mb-1">15%</p>
              <p className="text-sm text-slate-500 uppercase tracking-widest font-bold">Fuel Savings</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-primary mb-1">24/7</p>
              <p className="text-sm text-slate-500 uppercase tracking-widest font-bold">Live Support</p>
            </div>
          </div>
        </div>
      </section>
      <Features />

      {/* CTA Section */}
      <section className="py-24 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
            Ready to Transform Your Fleet Operations?
          </h2>
          <p className="text-xl text-white/90 mb-12 max-w-2xl mx-auto">
            Join thousands of organizations worldwide that trust FleetNET GLOBAL for their mission-critical operations.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <button className="px-10 py-4 bg-white text-primary rounded-full font-bold text-lg hover:bg-slate-100 transition-all shadow-xl">
              Request a Demo
            </button>
            <button className="px-10 py-4 bg-transparent border-2 border-white text-white rounded-full font-bold text-lg hover:bg-white/10 transition-all">
              Contact Sales
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
