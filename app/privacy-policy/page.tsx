import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import PrivacyPolicyContent from '@/components/PrivacyPolicyContent';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | FleetNET GLOBAL',
  description: 'Read the Privacy Policy of FleetNET GLOBAL. Learn how we handle location tracking, telemetry data, and user information in a professional, Play Store-compliant framework.',
  alternates: {
    canonical: '/privacy-policy',
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
      name: 'Privacy Policy',
      item: 'https://fleetnetglobal.com/privacy-policy',
    },
  ],
};

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-[#020202] text-white selection:bg-orange-500/30 selection:text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <Navbar />
      <PrivacyPolicyContent />
      <Footer />
    </main>
  );
}
