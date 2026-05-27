import Navbar from '@/components/Navbar';
import ContactForm from '@/components/ContactForm';
import Footer from '@/components/Footer';
import { Metadata } from 'next';
import Script from 'next/script';

export const metadata: Metadata = {
  title: 'Secure Operations Desk & Systems Inquiry',
  description: 'Submit an operational inquiry or diagnostic request to the FleetNET GLOBAL engineering division. Control your complete hardware-to-cloud fleet architecture.',
  alternates: {
    canonical: '/contact',
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
      name: 'Contact Operations',
      item: 'https://fleetnetglobal.com/contact',
    },
  ],
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[#050505] text-white selection:bg-primary/30 selection:text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <Script 
        src="https://challenges.cloudflare.com/turnstile/v0/api.js" 
        strategy="afterInteractive" 
      />
      <Navbar />
      {/* Visual buffer/spacing block for the absolute sticky Navbar */}
      <div className="h-24 md:h-28 bg-[#050505]" />
      <ContactForm />
      <Footer />
    </main>
  );
}
