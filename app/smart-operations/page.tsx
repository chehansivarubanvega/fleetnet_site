import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import SmartOperationsHeroScroll from '@/components/smart-operations/HeroScroll';
import OperationsContent from '@/components/smart-operations/OperationsContent';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Smart Operations | Command & Control Layer',
  description: 'Experience total fleet visibility. Live GPS tracking, real-time maintenance alerts, and driver behavior analytics synchronized in one mission control center.',
  alternates: {
    canonical: '/smart-operations',
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
      name: 'Smart Operations',
      item: 'https://fleetnetglobal.com/smart-operations',
    },
  ],
};

export default function SmartOperationsPage() {
  return (
    <main className="min-h-screen bg-[#050505] text-white selection:bg-primary/30 selection:text-white pb-0">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <Navbar />
      <SmartOperationsHeroScroll />
      <OperationsContent />
      <Footer />
    </main>
  );
}
