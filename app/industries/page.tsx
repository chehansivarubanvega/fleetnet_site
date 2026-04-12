import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import HeroScroll from '@/components/industries/HeroScroll';
import IndustriesContent from '@/components/industries/IndustriesContent';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Industry Solutions | Sectoral Intelligence',
  description: 'Precision fleet management for Construction, Trucking, Public Sector, and Utilities. Scale your operational efficiency with specialized IoT architectures and AI route optimization.',
  alternates: {
    canonical: '/industries',
  },
};

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: 'https://fleetnetglobal.com',
    },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'Industries',
      item: 'https://fleetnetglobal.com/industries',
    },
  ],
};

export default function IndustriesPage() {
  return (
    <main className="min-h-screen bg-[#050505] text-white selection:bg-primary/30 selection:text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <Navbar />
      <HeroScroll />
      <IndustriesContent />
      <Footer />
    </main>
  );
}
