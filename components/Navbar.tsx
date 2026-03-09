'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, Menu, X, Search, Globe, Phone } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  {
    label: 'About FleetNET',
    href: '#',
    children: [
      { label: 'Our Vision', href: '#', description: 'Leading the way in fleet intelligence.' },
      { label: 'Global Presence', href: '#', description: 'Operations in over 120 countries.' },
      { label: 'Sustainability', href: '#', description: 'Our commitment to green energy.' },
    ],
  },
  {
    label: 'Solutions & Products',
    href: '#',
    children: [
      { label: 'Logistics & Transport', href: '#', description: 'Optimize routes and reduce delivery times.' },
      { label: 'Public Transit', href: '#', description: 'Manage schedules and passenger safety.' },
      { label: 'Construction', href: '#', description: 'Heavy machinery tracking and maintenance.' },
      { label: 'Electric Fleets', href: '#', description: 'EV health monitoring and charging analytics.' },
    ],
  },
  {
    label: 'Smart Operations',
    href: '#',
    children: [
      { label: 'Live Map', href: '#', description: 'Real-time visibility of your entire fleet.' },
      { label: 'Dashboard', href: '#', description: 'KPI overview and operational insights.' },
      { label: 'Maintenance', href: '#', description: 'Scheduled and predictive service planning.' },
      { label: 'Driver Performance', href: '#', description: 'Behavior scoring and compliance tracking.' },
    ],
  },
  { label: 'Support & Service', href: '#' },
  { label: 'Community', href: '#' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={cn(
        'fixed left-0 right-0 z-50 transition-all duration-500 ease-in-out',
        isScrolled 
          ? 'top-0 px-0' 
          : 'top-6 px-4 sm:px-6 lg:px-8'
      )}
    >
      <div 
        className={cn(
          'mx-auto transition-all duration-500 ease-in-out border',
          isScrolled 
            ? 'max-w-full bg-white/95 backdrop-blur-md shadow-md py-3 px-4 sm:px-6 lg:px-8 border-transparent rounded-none' 
            : 'max-w-[1400px] bg-white/90 backdrop-blur-md rounded-2xl shadow-xl border-white/40 px-8 py-2.5'
        )}
      >
        <div className="flex justify-between items-center gap-4">
          {/* Logo */}
          <Link href="/" className="flex shrink-0 items-center">
            <div className="relative h-10 w-40 md:w-48">
              <Image
                src="/images/fleetnet_logo.png"
                alt="FleetNET GLOBAL Logo"
                fill
                className="object-contain object-left"
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
                className="relative group"
                onMouseEnter={() => setActiveDropdown(item.label)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  href={item.href}
                  className="flex items-center gap-1.5 px-3 py-2 text-[13px] xl:text-[14px] font-bold text-slate-800 transition-colors duration-300 hover:text-primary whitespace-nowrap"
                >
                  {item.label}
                  {item.children && <ChevronDown className="w-3.5 h-3.5 opacity-40 group-hover:opacity-100 transition-opacity" />}
                </Link>

                {/* Mega Dropdown */}
                {item.children && (
                  <AnimatePresence>
                    {activeDropdown === item.label && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-72 bg-white rounded-xl shadow-2xl border border-slate-100 overflow-hidden"
                      >
                        <div className="p-4 space-y-1">
                          {item.children.map((child) => (
                            <Link
                              key={child.label}
                              href={child.href}
                              className="block p-3 rounded-lg hover:bg-slate-50 transition-colors group/item"
                            >
                              <div className="text-sm font-semibold text-slate-900 group-hover/item:text-primary transition-colors">
                                {child.label}
                              </div>
                              <div className="text-xs text-slate-500 mt-0.5">
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
            <button className="text-slate-800 transition-colors duration-300 hover:text-primary p-2">
              <Search className="w-4.5 h-4.5" />
            </button>
            <button className="text-slate-800 transition-colors duration-300 hover:text-primary p-2 flex items-center gap-1">
              <Globe className="w-4.5 h-4.5" />
              <ChevronDown className="w-3 h-3 opacity-40" />
            </button>
            <Link
              href="#"
              className="flex items-center gap-2 px-6 py-2 rounded-full font-bold bg-primary text-white hover:bg-primary-dark transition-all duration-300 shadow-md transform hover:scale-105 active:scale-95 whitespace-nowrap"
            >
              <Phone className="w-4 h-4" />
              Contact
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 text-slate-800 shrink-0"
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

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white mt-2 rounded-2xl shadow-2xl border border-slate-100 overflow-hidden"
          >
            <div className="px-4 py-6 space-y-4">
              {navItems.map((item) => (
                <div key={item.label} className="space-y-2">
                  <div className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                    {item.label}
                  </div>
                  {item.children ? (
                    <div className="pl-4 space-y-2">
                      {item.children.map((child) => (
                        <Link
                          key={child.label}
                          href={child.href}
                          className="block text-sm text-slate-600 hover:text-primary"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <Link
                      href={item.href}
                      className="block text-sm text-slate-600 hover:text-primary"
                    >
                      View Page
                    </Link>
                  )}
                </div>
              ))}
              <div className="pt-4 border-t border-slate-100">
                <Link
                  href="#"
                  className="flex items-center justify-center gap-2 w-full bg-primary text-white py-3 rounded-lg font-bold"
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
