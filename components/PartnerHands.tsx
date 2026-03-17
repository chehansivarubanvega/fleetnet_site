'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import { useRef } from 'react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const PARTNERS = [
  { name: 'Cake', src: '/images/partners/cake.png' },
  { name: 'E-Drops', src: '/images/partners/edrops.png' },
  { name: 'LEMS', src: '/images/partners/lems.png' },
  { name: 'Rise', src: '/images/partners/rise.png' },
  { name: 'Volt', src: '/images/partners/volt.png' },
  { name: 'eShift', src: '/images/partners/eshift.png' },
  { name: 'CDB', src: '/images/partners/cdb-logo.png' },
];

export default function PartnerHands() {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const leftHandRef = useRef<HTMLImageElement>(null);
  const rightHandRef = useRef<HTMLImageElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const logosRef = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(() => {
    if (!sectionRef.current) return;

    // 1. Initial setups: Hands start offscreen horizontally
    gsap.set(leftHandRef.current, { xPercent: -100, yPercent: -50 });
    gsap.set(rightHandRef.current, { xPercent: 100, yPercent: 50 });
    gsap.set(textRef.current, { opacity: 0, y: 30 });
    gsap.set(logosRef.current, { opacity: 0, y: 40, scale: 0.9 });

    // 2. SCRUBBED MASTER TIMELINE (PINNED)
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top top',
        end: '+=2500', // The user must scroll 2500px to complete the sequence
        pin: true,
        scrub: 1, // Smooth scrubbing
        anticipatePin: 1,
        // Snap to key phases: hands in, text, logos
        snap: {
          snapTo: [0, 0.4, 0.75, 1],
          duration: 0.6,
          ease: 'power2.inOut',
        },
        onUpdate: (self) => {
          // Keep the premium background color interpolation tied directly to scroll progress
          const p = self.progress;
          if (containerRef.current) {
             // Interplate from off-white to a dark dramatic blue/black
            const r = Math.round(gsap.utils.interpolate(245, 5, p));
            const g = Math.round(gsap.utils.interpolate(245, 5, p));
            const b = Math.round(gsap.utils.interpolate(245, 10, p));
            containerRef.current.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
          }
        }
      }
    });

    // PHASE 1: Hands slide in
    tl.to([leftHandRef.current, rightHandRef.current], {
      xPercent: 0,
      yPercent: 0,
      ease: 'power2.inOut',
      duration: 2
    })
    
    // PHASE 2: Text fades up
    .to(textRef.current, {
      opacity: 1,
      y: 0,
      duration: 1.5,
      ease: 'power2.out'
    }, "-=0.5") // Slightly overlap with hands finishing

    // PHASE 3: Logos stagger in
    .to(logosRef.current, {
      opacity: 1,
      y: 0,
      scale: 1,
      stagger: 0.2, // Staggering requires scroll distance, so we give it time
      duration: 2,
      ease: 'back.out(1.2)' // Gentle bounce
    }, "-=0.5")
    
    // PHASE 4: Final Hold before unpinning allows proceeding to next section
    .to({}, { duration: 0.5 });

  }, { scope: sectionRef });

  return (
    <section 
      ref={sectionRef} 
      className="relative w-full overflow-hidden flex flex-col items-center justify-center font-[family-name:var(--font-outfit)]"
    >
      <div 
        ref={containerRef}
        className="relative w-full h-screen overflow-hidden flex flex-col items-center justify-center z-10"
        style={{ backgroundColor: 'rgb(245, 245, 245)' }} // Starts off-white
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
            <h2 className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-black text-white mix-blend-difference tracking-tight italic drop-shadow-2xl">
              Our Clients. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-gray-500 mix-blend-normal">
                Our Partners.
              </span>
            </h2>
          </div>

          {/* Logos Flex Container */}
          <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-6 md:gap-12 px-4 max-w-5xl">
            {PARTNERS.map((partner, i) => (
              <div 
                key={partner.name}
                ref={(el) => { logosRef.current[i] = el; }}
                className="relative w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-gray-100 flex items-center justify-center will-change-transform group transition-transform hover:-translate-y-2 hover:shadow-[0_20px_40px_rgb(0,0,0,0.2)]"
              >
                <div className="absolute inset-0 bg-gradient-to-tr from-white to-gray-50 rounded-2xl pointer-events-none" />
                <Image 
                  src={partner.src} 
                  alt={`${partner.name} logo`}
                  fill
                  className="object-contain p-3 sm:p-4 md:p-6 relative z-10 transition-all duration-300"
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
          <Image 
            ref={leftHandRef}
            src="/images/hand1.avif" 
            alt="Left hand reaching" 
            width={800}
            height={600}
            className="absolute top-[10%] md:top-[12%] -left-[2vw] w-[65vw] md:w-[45vw] max-w-[800px] h-auto will-change-transform drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
          />
          
          {/* Right Hand: Anchored middle-right */}
          <Image 
            ref={rightHandRef}
            src="/images/hand2.avif" 
            alt="Right hand reaching" 
            width={900}
            height={600}
            className="absolute bottom-[10%] md:bottom-[15%] -right-[2vw] w-[70vw] md:w-[50vw] max-w-[900px] h-auto will-change-transform drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
          />
        </div>
      </div>
    </section>
  );
}
