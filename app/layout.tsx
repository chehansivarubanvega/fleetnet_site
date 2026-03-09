import type {Metadata} from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: 'FleetNET GLOBAL | Advanced Fleet Management System',
  description: 'The command center for your fleet operations. Real-time tracking, maintenance planning, and performance analytics.',
  icons: {
    icon: '/images/FLEETnet app icon.png',
    apple: '/images/FLEETnet app icon.png',
  },
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className={`${inter.variable} font-sans`}>
      <body suppressHydrationWarning className="antialiased">{children}</body>
    </html>
  );
}
