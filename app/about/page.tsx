import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import AboutHeroScroll from '@/components/about/AboutHeroScroll';
import StoryScroll from '@/components/about/StoryScroll';
import AboutContent from '@/components/about/AboutContent';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Our Story & Innovation Mission',
  description: 'Discover the origin of FleetNET GLOBAL. Engineered in Sri Lanka to bring full-stack control and real-time intelligence to modern fleet operations.',
  alternates: {
    canonical: '/about',
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
      name: 'About Us',
      item: 'https://fleetnetglobal.com/about',
    },
  ],
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#050505] text-white selection:bg-primary/30 selection:text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <Navbar />
      <AboutHeroScroll />
      <AboutContent />
      <StoryScroll />
      <Footer />
    </main>
  );
}
