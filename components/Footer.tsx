'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Facebook, Instagram, Linkedin, Mail, MapPin, Phone, Twitter } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRef } from 'react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Footer() {
  const containerRef = useRef<HTMLElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const columnRefs = useRef<(HTMLDivElement | null)[]>([]);
  const bottomRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!containerRef.current) return;

    // Subtly reveal the Footer content as it scrolls into view
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 80%', // Start animation when the top of the footer is 80% down the viewport
        once: true, // Only animate once
      }
    });

    // 1. Reveal CTA
    tl.fromTo(ctaRef.current, 
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }
    )
    
    // 2. Reveal Columns (Brand, Solutions, Platform, Contact)
    .fromTo(columnRefs.current, 
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: 'power2.out' },
      "-=0.4"
    )

    // 3. Reveal Bottom Copyright Bar
    .fromTo(bottomRef.current,
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' },
      "-=0.2"
    );

  }, { scope: containerRef });

  return (
    <footer 
      ref={containerRef}
      className="relative bg-black text-white pt-24 pb-12 overflow-hidden font-[family-name:var(--font-outfit)]"
    >
      {/* Subtle Top Gradient to separate from previous sections smoothly */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-white/[0.02] blur-[100px] pointer-events-none" />

      {/* Massive Background Typography Mark */}
      <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 text-[15vw] font-black text-white/[0.02] tracking-tighter whitespace-nowrap pointer-events-none select-none z-0">
        FLEETNET
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
        
        {/* UPPER CTA SECTION */}
        <div 
          ref={ctaRef}
          className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 pb-20 border-b border-white/10 mb-16"
        >
          <div>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight mb-4">
              Ready to transform <br className="hidden md:block" />
              <span className="text-white/40">your operations?</span>
            </h2>
            <p className="text-lg text-white/50 max-w-xl">
              Join leading organizations optimizing their fleets with real-time intelligence and sustainable solutions.
            </p>
          </div>
          <button className="group relative inline-flex items-center gap-3 px-8 py-4 bg-white text-black rounded-full font-bold uppercase tracking-wider overflow-hidden hover:scale-105 transition-transform duration-300 shrink-0">
            <span className="relative z-10">Get Started</span>
            <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
            <div className="absolute inset-0 bg-gradient-to-r from-gray-200 to-white opacity-0 group-hover:opacity-100 transition-opacity" />
          </button>
        </div>

        {/* 4-COLUMN GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-20">
          
          {/* Brand Info (Larger Column) */}
          <div ref={(el) => { columnRefs.current[0] = el; }} className="lg:col-span-4 lg:pr-12">
            <Link href="/" className="inline-block mb-8">
              <div className="relative h-10 w-48">
                <Image
                  src="/images/Fleetnetlogo_lite.png"
                  alt="FleetNET GLOBAL Logo"
                  fill
                  className="object-contain object-left filter brightness-0 invert opacity-90"
                  referrerPolicy="no-referrer"
                />
              </div>
            </Link>
            <p className="text-white/50 leading-relaxed mb-8 font-medium">
              The world&apos;s most advanced fleet management operations platform. Empowering organizations with real-time visibility and intelligent control for a sustainable future.
            </p>
            {/* Social Icons */}
            <div className="flex gap-3">
              {[Facebook, Twitter, Linkedin, Instagram].map((Icon, i) => (
                <Link 
                  key={i} 
                  href="#" 
                  className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 hover:border-white/20 hover:-translate-y-1 transition-all duration-300"
                >
                  <Icon className="w-4 h-4" />
                </Link>
              ))}
            </div>
          </div>

          {/* Solutions Links */}
          <div ref={(el) => { columnRefs.current[1] = el; }} className="lg:col-span-2 lg:col-start-6">
            <h4 className="text-xs uppercase tracking-[0.2em] font-bold text-white/30 mb-8">Solutions</h4>
            <ul className="space-y-4 font-medium">
              {['Logistics & Transport', 'Public Transit', 'Construction Fleets', 'Electric Vehicles', 'Cold Chain Logistics'].map((item) => (
                <li key={item}>
                  <Link href="#" className="group flex items-center text-white/60 hover:text-white transition-colors">
                    <span className="w-0 overflow-hidden group-hover:w-3 text-red-500 transition-all duration-300 ease-out mr-0 group-hover:mr-2">■</span>
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Platform Links */}
          <div ref={(el) => { columnRefs.current[2] = el; }} className="lg:col-span-2">
            <h4 className="text-xs uppercase tracking-[0.2em] font-bold text-white/30 mb-8">Platform</h4>
            <ul className="space-y-4 font-medium">
              {['Live Tracking', 'Driver Performance', 'Maintenance Planning', 'Fuel Analytics', 'API Documentation'].map((item) => (
                <li key={item}>
                  <Link href="#" className="group flex items-center text-white/60 hover:text-white transition-colors">
                    <span className="w-0 overflow-hidden group-hover:w-3 text-red-500 transition-all duration-300 ease-out mr-0 group-hover:mr-2">■</span>
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details */}
          <div ref={(el) => { columnRefs.current[3] = el; }} className="lg:col-span-3 lg:col-start-10">
            <h4 className="text-xs uppercase tracking-[0.2em] font-bold text-white/30 mb-8">Contact</h4>
            <ul className="space-y-6 text-white/60 font-medium">
              <li className="flex items-start gap-4 hover:text-white transition-colors">
                <MapPin className="w-5 h-5 text-red-500/80 shrink-0 mt-1" />
                <span>Bay 1-5, Trace Expert City, <br />Tripoli Square, Colombo 10,</span>
              </li>
              <li className="flex items-center gap-4 hover:text-white transition-colors">
                <Phone className="w-5 h-5 text-red-500/80 shrink-0" />
                <span>+94 (77) 0576272</span>
              </li>
              <li className="flex items-center gap-4 hover:text-white transition-colors group cursor-pointer">
                <Mail className="w-5 h-5 text-red-500/80 shrink-0" />
                <span className="group-hover:underline underline-offset-4 pointer-events-auto">info@vega.lk</span>
              </li>
            </ul>
          </div>

        </div>

        {/* BOTTOM COPYRIGHT ROW */}
        <div 
          ref={bottomRef}
          className="pt-8 flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-white/40 font-medium border-t border-white/10"
        >
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500/80 animate-pulse" />
            <span>All systems operational</span>
          </div>
          
          <div className="flex gap-6">
            <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
            <Link href="#" className="hover:text-white transition-colors">Cookie Settings</Link>
          </div>

          <p>© {new Date().getFullYear()} FleetNET GLOBAL. All rights reserved.</p>
        </div>

      </div>
    </footer>
  );
}
