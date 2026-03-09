'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import { useRef } from 'react';

gsap.registerPlugin(ScrollTrigger);

const PARTNERS = [
  { name: 'Cake', src: '/images/partners/cake.png' },
  { name: 'E-Drops', src: '/images/partners/edrops.png' },
  { name: 'LEMS', src: '/images/partners/lems.png' },
  { name: 'Rise', src: '/images/partners/rise.png' },
  { name: 'Volt', src: '/images/partners/volt.png' },
];

export default function PartnerHands() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftHandRef = useRef<HTMLImageElement>(null);
  const rightHandRef = useRef<HTMLImageElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const logosRef = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(() => {
    // 1. Initial setups: They start offscreen horizontally and offset vertically
    // Left hand enters from top-left, right hand from bottom-right.
    gsap.set(leftHandRef.current, { xPercent: -100, yPercent: -50 });
    gsap.set(rightHandRef.current, { xPercent: 100, yPercent: 50 });
    gsap.set(textRef.current, { opacity: 0, y: 30 });
    gsap.set(logosRef.current, { opacity: 0, y: 40, scale: 0.9 });

    // 2. Timeline with ScrollTrigger
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top top',
        end: '+=4000', // 4000px of scroll distance for the entire pin
        pin: true,
        scrub: 1, // Smooth scrub
        anticipatePin: 1,
        onUpdate: (self) => {
          // Background Color Interpolation (LERP)
          // Starts at rgb(245, 245, 245) and moves to rgb(2, 6, 23) (very dark blue/black)
          const p = self.progress;
          if (sectionRef.current) {
            const r = Math.round(gsap.utils.interpolate(245, 5, p));
            const g = Math.round(gsap.utils.interpolate(245, 5, p));
            const b = Math.round(gsap.utils.interpolate(245, 10, p));
            sectionRef.current.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
          }
        }
      }
    });

    // ═══════════════════════════════════════════
    // Phase 1: Hands move in
    // ═══════════════════════════════════════════
    tl.to(leftHandRef.current, {
      xPercent: 0,
      yPercent: 0,
      ease: 'power2.out',
      duration: 3
    }, 'moveIn')
    .to(rightHandRef.current, {
      xPercent: 0,
      yPercent: 0,
      ease: 'power2.out',
      duration: 3
    }, 'moveIn');

    // ═══════════════════════════════════════════
    // Phase 2: Staggered Text & Logo Reveal
    // ═══════════════════════════════════════════
    // Only starts after the hands are mostly in position (e.g., at duration 2.0 of 'moveIn')
    tl.addLabel('reveal', 'moveIn+=2.0');

    // Text Reveal
    tl.to(textRef.current, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: 'power3.out'
    }, 'reveal');

    // Logos staggered reveal
    logosRef.current.forEach((logo, index) => {
      tl.to(logo, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        ease: 'back.out(1.5)'
      }, `reveal+=${0.2 + (index * 0.15)}`);
    });

    // Hold at the end to read the logos before unpinning
    tl.to({}, { duration: 1.5 });

  }, { scope: sectionRef });

  return (
    <section 
      ref={sectionRef} 
      className="relative w-full h-screen overflow-hidden flex flex-col items-center justify-center z-10"
      // Started off-white, will be controlled by GSAP
      style={{ backgroundColor: 'rgb(245, 245, 245)' }} 
    >
      {/* 
        Text and Logos Layer 
        Positioned in the upper half/center so they sit "above" the hands or between the fingers 
      */}
      <div className="relative z-40 flex flex-col items-center justify-center -translate-y-16 pointer-events-auto">
        
        <div ref={textRef} className="text-center mb-12 will-change-transform">
          <p className="text-sm md:text-base font-bold tracking-[0.3em] uppercase text-gray-400 mb-4 mix-blend-difference">
            Integration at Scale
          </p>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-black text-white mix-blend-difference tracking-tight italic">
            Our Clients. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-gray-500 mix-blend-normal">
              Our Partners.
            </span>
          </h2>
        </div>

        {/* Logos Flex Container */}
        <div className="flex flex-wrap justify-center items-center gap-6 md:gap-12 px-4 max-w-5xl">
          {PARTNERS.map((partner, i) => (
            <div 
              key={partner.name}
              ref={(el) => { logosRef.current[i] = el; }}
              className="relative w-24 h-24 md:w-32 md:h-32 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 p-4 shadow-xl flex items-center justify-center will-change-transform group transition-colors hover:bg-white/10"
            >
              <Image 
                src={partner.src} 
                alt={`${partner.name} logo`}
                fill
                className="object-contain p-2 md:p-3 filter brightness-0 invert opacity-80 group-hover:opacity-100 transition-opacity"
              />
            </div>
          ))}
        </div>
      </div>

      {/* 
        Hands Layer
        Spanning full absolute width/height to ensure edges are completely flush against the viewport window.
      */}
      <div className="absolute inset-0 pointer-events-none z-30 overflow-hidden">
        {/* Left Hand: Anchored middle-left */}
        <img 
          ref={leftHandRef}
          src="/images/hand1.avif" 
          alt="Left hand reaching" 
          className="absolute top-[10%] md:top-[15%] -left-[2vw] w-[65vw] md:w-[42vw] max-w-none will-change-transform drop-shadow-2xl"
        />
        
        {/* Right Hand: Anchored middle-right */}
        <img 
          ref={rightHandRef}
          src="/images/hand2.avif" 
          alt="Right hand reaching" 
          className="absolute bottom-[10%] md:bottom-[15%] -right-[2vw] w-[70vw] md:w-[48vw] max-w-none will-change-transform drop-shadow-2xl"
        />
      </div>
    </section>
  );
}
