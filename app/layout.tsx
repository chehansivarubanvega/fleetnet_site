import SmoothScroll from '@/components/providers/SmoothScroll';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Script from 'next/script';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://fleetnetglobal.com'),
  title: {
    default: 'FleetNET GLOBAL | Advanced Fleet Management System',
    template: '%s | FleetNET GLOBAL',
  },
  description: 'The command center for your fleet operations. Real-time tracking, maintenance planning, and performance analytics for mission-critical fleets.',
  keywords: ['Fleet Management', 'IoT Tracking', 'Asset Monitoring', 'Fuel/Charge Optimization', 'Sustainable Mobility', 'Fleet Analytics', 'Sri Lanka Automotive Tech'],
  authors: [{ name: 'FleetNET GLOBAL' }],
  creator: 'FleetNET GLOBAL',
  publisher: 'FleetNET GLOBAL',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'FleetNET GLOBAL | Advanced Fleet Management System',
    description: 'Transform your fleet operations with real-time intelligence and full-stack control.',
    url: 'https://fleetnetglobal.com',
    siteName: 'FleetNET GLOBAL',
    images: [
      {
        url: '/images/dashboard_screenshot.png',
        width: 1200,
        height: 630,
        alt: 'FleetNET GLOBAL Dashboard',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FleetNET GLOBAL | Advanced Fleet Management System',
    description: 'Transform your fleet operations with real-time intelligence.',
    images: ['/images/dashboard_screenshot.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/images/FLEETnet app icon.png',
    apple: '/images/FLEETnet app icon.png',
  },
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} font-sans`}>
      <head>
        <link 
          href="https://assets.calendly.com/assets/external/widget.css" 
          rel="stylesheet" 
        />
      </head>
      <body suppressHydrationWarning className="antialiased">
        <SmoothScroll>
          {children}
        </SmoothScroll>
        <Script 
          src="https://assets.calendly.com/assets/external/widget.js" 
          strategy="afterInteractive" 
        />
      </body>
    </html>
  );
}
