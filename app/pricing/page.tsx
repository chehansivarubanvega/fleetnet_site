import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import PricingContent from '@/components/pricing/PricingContent';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Pricing',
  description: 'Simple, transparent pricing for fleets of every size. From a single vehicle to a 100-strong corporate fleet, choose the FleetNET GLOBAL plan that fits your operation.',
  alternates: {
    canonical: '/pricing',
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
      name: 'Pricing',
      item: 'https://fleetnetglobal.com/pricing',
    },
  ],
};

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-[#050505] text-white selection:bg-primary/30 selection:text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <Navbar />
      <PricingContent />
      <Footer />
    </main>
  );
}
