'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronDown, Menu, Phone, Search, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import Image from 'next/image';
import Link from 'next/link';
import { useRef, useState } from 'react';

// Only register client-side
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const navItems = [
  {
    label: 'About FleetNET',
    href: '/about',
    children: [
      { label: 'About Overview', href: '/about', description: 'Who we are and why we exist.' },
      { label: 'Our Vision', href: '#', description: 'Leading the way in fleet intelligence.' },
      { label: 'Global Presence', href: '#', description: 'Operations in over 120 countries.' },
      { label: 'Sustainability', href: '#', description: 'Our commitment to green energy.' },
    ],
  },
  {
    label: 'Industries',
    href: '/industries',
    children: [
      { label: 'All Industries', href: '/industries', description: 'Explore sectors we serve.' },
      { label: 'Trucking & Freight', href: '/industries', description: 'AI route optimization and safety.' },
      { label: 'Construction', href: '/industries', description: 'Heavy equipment intelligence.' },
      { label: 'Public Sector', href: '/industries', description: 'Accountability and compliance.' },
    ],
  },
  
  {
    label: 'Smart Operations',
    href: '/smart-operations',
    children: [
      { label: 'Live Map', href: '/smart-operations#live-map', description: 'Real-time visibility of your entire fleet.' },
      { label: 'Dashboard', href: '/smart-operations#dashboard', description: 'KPI overview and operational insights.' },
      { label: 'Maintenance', href: '/smart-operations#maintenance', description: 'Scheduled and predictive service planning.' },
      { label: 'Driver Performance', href: '/smart-operations#driver-performance', description: 'Behavior scoring and compliance tracking.' },
    ],
  },
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const headerRef = useRef<HTMLElement>(null);
  const navContainerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!headerRef.current || !navContainerRef.current) return;

    // Scroll interpolation for morphing the Navbar
    ScrollTrigger.create({
      start: 'top -10',
      end: 200,
      scrub: true,
      onUpdate: (self) => {
        const p = self.progress; // 0 (top) to 1 (scrolled 200px)
        
        // Morph the padding (top-0px when scrolled vs top-24px when not)
        gsap.set(headerRef.current, { 
          paddingTop: gsap.utils.interpolate('24px', '8px', p), // Top margin/padding
          paddingBottom: gsap.utils.interpolate('0px', '8px', p) 
        });

        // Morph the inner container: From completely transparent to dynamic glass pill
        gsap.set(navContainerRef.current, {
          backgroundColor: gsap.utils.interpolate('rgba(255, 255, 255, 0)', 'rgba(10, 10, 10, 0.65)', p),
          borderColor: gsap.utils.interpolate('rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, 0.1)', p),
          paddingTop: gsap.utils.interpolate('12px', '8px', p),
          paddingBottom: gsap.utils.interpolate('12px', '8px', p),
          boxShadow: gsap.utils.interpolate('0 0 0 rgba(0,0,0,0)', '0 10px 40px -10px rgba(0,0,0,0.5)', p),
          backdropFilter: `blur(${gsap.utils.interpolate(0, 24, p)}px)`
        });
        
        // Slightly shrink the logo area
        gsap.set('.navbar-logo-container', {
           transform: `scale(${gsap.utils.interpolate(1, 0.9, p)})`
        });
      }
    });

  }, { scope: headerRef });

  return (
    <header
      ref={headerRef}
      className="fixed left-0 right-0 z-50 px-4 sm:px-6 lg:px-8 font-[family-name:var(--font-outfit)] pt-6"
    >
      <div 
        ref={navContainerRef}
        className="mx-auto max-w-7xl rounded-full border border-transparent transition-all overflow-visible px-6 md:px-8 py-3"
      >
        <div className="flex justify-between items-center gap-4 relative">
          
          {/* Logo */}
          <Link href="/" className="navbar-logo-container flex shrink-0 items-center transform-origin-left">
            <div className="relative h-10 w-40 md:w-48 filter drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">
              <Image
                src="/images/fleetnet_logo.png"
                alt="FleetNET GLOBAL Logo"
                fill
                className="object-contain object-left brightness-0 invert" // Force white logo for dark theme
                priority
                referrerPolicy="no-referrer"
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center justify-center flex-1 space-x-1 xl:space-x-4">
            {navItems.map((item) => (
              <div
                key={item.label}
                className="relative group h-full flex items-center"
                onMouseEnter={() => setActiveDropdown(item.label)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  href={item.href}
                  className="relative px-3 py-2 text-[13px] xl:text-[14px] font-bold text-white/90 transition-colors duration-300 hover:text-white uppercase tracking-wider flex items-center gap-1.5"
                >
                  {item.label}
                  {item.children && <ChevronDown className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 transition-transform duration-300 group-hover:rotate-180" />}
                  
                  {/* Underline Animation */}
                  <span className="absolute bottom-1 left-3 right-3 h-[2px] bg-red-500 rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center shadow-[0_0_10px_rgba(239,68,68,0.8)]" />
                </Link>

                {/* Glassmorphic Mega Dropdown */}
                {item.children && (
                  <AnimatePresence>
                    {activeDropdown === item.label && (
                      <motion.div
                        initial={{ opacity: 0, y: 15, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 15, scale: 0.95 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="absolute top-[calc(100%+12px)] left-1/2 -translate-x-1/2 w-80 bg-black/70 backdrop-blur-2xl rounded-2xl shadow-[0_20px_50px_-20px_rgba(0,0,0,0.8)] border border-white/10 overflow-hidden"
                      >
                         <div className="absolute inset-0 bg-gradient-to-b from-red-600/10 to-transparent pointer-events-none" />
                        <div className="p-3 relative z-10">
                          {item.children.map((child) => (
                            <Link
                              key={child.label}
                              href={child.href}
                              className="block p-4 rounded-xl hover:bg-white/10 transition-colors group/item relative overflow-hidden"
                            >
                              <div className="text-sm font-bold text-white group-hover/item:text-red-400 transition-colors flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-red-500 opacity-0 group-hover/item:opacity-100 transition-opacity" />
                                {child.label}
                              </div>
                              <div className="text-[13px] text-white/50 mt-1 ml-3.5 font-medium leading-relaxed">
                                {child.description}
                              </div>
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </div>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="hidden lg:flex items-center shrink-0 space-x-2 xl:space-x-4">
            {/* <button className="text-white/80 transition-colors duration-300 hover:text-white p-2">
              <Search className="w-4.5 h-4.5" />
            </button>
            <button className="text-white/80 transition-colors duration-300 hover:text-white p-2 flex items-center gap-1 uppercase text-xs font-bold tracking-widest">
              <Globe className="w-4.5 h-4.5" />
              <span>EN</span>
              <ChevronDown className="w-3 h-3 opacity-60 ml-0.5" />
            </button> */}
            <Link
              href="#"
              className="relative flex items-center gap-2 px-6 py-2.5 rounded-full font-bold text-white overflow-hidden group shadow-[0_0_20px_rgba(239,68,68,0.4)] transition-all duration-300 hover:shadow-[0_0_30px_rgba(239,68,68,0.6)] hover:scale-105 active:scale-95"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-red-500 group-hover:translate-x-full transition-transform duration-500 ease-out" />
              <div className="absolute inset-0 bg-gradient-to-l from-red-500 to-red-600 -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out" />
              <div className="relative z-10 flex items-center gap-2">
                 <Phone className="w-4 h-4" />
                 <span className="uppercase tracking-wider text-sm">Contact</span>
              </div>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 text-white shrink-0 relative z-20"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.28, ease: 'easeOut' }}
            className="lg:hidden fixed inset-y-0 right-0 w-full max-w-sm bg-[#020617]/95 backdrop-blur-3xl shadow-[0_30px_80px_rgba(0,0,0,0.9)] border-l border-white/10 z-40"
          >
            {/* Drawer header (logo + close) */}
            <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-white/10">
              <Link href="/" className="flex items-center gap-3" onClick={() => setMobileMenuOpen(false)}>
                <div className="relative h-8 w-32">
                  <Image
                    src="/images/fleetnet_logo.png"
                    alt="FleetNET GLOBAL Logo"
                    fill
                    className="object-contain object-left brightness-0 invert"
                  />
                </div>
              </Link>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 rounded-full border border-white/10 text-white/80 hover:text-white hover:border-white/40 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="px-6 py-6 space-y-6 overflow-y-auto h-[calc(100vh-72px)]">
              {navItems.map((item) => (
                <div key={item.label} className="space-y-3">
                  <div className="text-xs font-black text-red-500 uppercase tracking-[0.2em]">
                    {item.label}
                  </div>
                  {item.children ? (
                    <div className="pl-4 border-l border-white/10 space-y-3">
                      {item.children.map((child) => (
                        <Link
                          key={child.label}
                          href={child.href}
                          className="block text-[15px] font-medium text-white/80 hover:text-white transition-colors"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <Link
                      href={item.href}
                      className="block text-[15px] font-medium text-white/80 hover:text-white transition-colors pl-4 border-l border-transparent"
                    >
                      View Page
                    </Link>
                  )}
                </div>
              ))}
              <div className="pt-6 border-t border-white/10 flex gap-4">
                 <button className="flex-1 bg-white/5 border border-white/10 text-white py-3.5 rounded-xl font-bold uppercase tracking-wider text-sm hover:bg-white/10 transition-colors flex items-center justify-center gap-2">
                    <Search className="w-4 h-4" />
                    Search
                 </button>
                 <Link
                   href="#"
                   className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-red-600 to-red-500 shadow-[0_0_20px_rgba(239,68,68,0.4)] text-white py-3.5 rounded-xl font-bold uppercase tracking-wider text-sm"
                 >
                   <Phone className="w-4 h-4" />
                   Contact
                 </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
