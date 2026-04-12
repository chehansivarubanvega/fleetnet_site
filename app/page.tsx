import FluidBackground from "@/components/FluidBackground";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Modules from "@/components/Modules";
import Navbar from "@/components/Navbar";
import OperationsNarrative from "@/components/OperationsNarrative";
import PartnerHands from "@/components/PartnerHands";
import TrackerSection from "@/components/TrackerSection";
import TransitionSection from "@/components/TransitionSection";
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Advanced Fleet Management & Real-time Intelligence',
  description: 'Scale your operations with FleetNET GLOBAL. The all-in-one platform for real-time asset tracking, performance analytics, and sustainable mobility transitions.',
  alternates: {
    canonical: '/',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'FleetNET GLOBAL',
  url: 'https://fleetnetglobal.com',
  logo: 'https://fleetnetglobal.com/images/FLEETnet app icon.png',
  description: 'The world\'s most advanced fleet management operations platform.',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Trace Expert City, Tripoli Square',
    addressLocality: 'Colombo',
    postalCode: '10',
    addressCountry: 'LK',
  },
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+94 77 0576272',
    contactType: 'customer service',
  },
};

export default function Home() {
  return (
    <main className="min-h-screen relative">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
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
