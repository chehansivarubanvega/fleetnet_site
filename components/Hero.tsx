'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowDown } from 'lucide-react';
import Image from 'next/image';
import { useRef } from 'react';

// Register plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Scene Refs
  const heroTextRef = useRef<HTMLDivElement>(null);
  const heroLinesRef = useRef<HTMLHeadingElement>(null);
  const heroSubRef = useRef<HTMLParagraphElement>(null);
  const heroBtnRef = useRef<HTMLButtonElement>(null);
  
  const mockupsRef = useRef<HTMLDivElement>(null);
  const desktopMockupRef = useRef<HTMLDivElement>(null);
  const mobileMockupRef = useRef<HTMLDivElement>(null);
  
  const missionTextRef = useRef<HTMLDivElement>(null);
  const missionBadgeRef = useRef<HTMLDivElement>(null);
  const missionLine1Ref = useRef<HTMLHeadingElement>(null);
  const missionLine2Ref = useRef<HTMLHeadingElement>(null);
  const missionSubRef = useRef<HTMLParagraphElement>(null);

  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!sectionRef.current) return;

    // 1. Initial State Setup
    gsap.set([heroLinesRef.current, heroSubRef.current, heroBtnRef.current], { 
      opacity: 1, 
      y: 0 
    });
    gsap.set(mockupsRef.current, { 
      opacity: 1, 
      scale: 1,
      rotate: 0 
    });
    gsap.set([missionBadgeRef.current, missionLine1Ref.current, missionLine2Ref.current, missionSubRef.current], {
      opacity: 0,
      y: 60,
      clipPath: 'inset(100% -20% -20% -20%)'
    });
    // The "Scroll down" indicator starts visible because the user *needs* to scroll to advance
    gsap.set(scrollIndicatorRef.current, { opacity: 1 });

    // Idle animations for mockups
    gsap.to(desktopMockupRef.current, {
      y: -15,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });
    gsap.to(mobileMockupRef.current, {
      y: 20,
      duration: 2.5,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      delay: 0.5
    });

    // 2. SCRUBBED MASTER TIMELINE (PINNED)
    // This pins the `.hero-sticky-container` to the screen.
    // The user must scroll `end: "+=3000"` pixels to complete the animation before the page unpins.
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top top',
        end: '+=2500', // Distance to scroll
        pin: true,
        scrub: 1, // Smooth scrubbing
        anticipatePin: 1
      }
    });

    // PHASE 1: Hold the initial scene briefly so it doesn't instantly vanish on tiny scroll
    tl.to({}, { duration: 0.2 })

      // PHASE 2: Exit Scene 1 (Hero Text & Mockups scale down)
      .to([heroBtnRef.current, heroSubRef.current, heroLinesRef.current], { 
        opacity: 0, 
        y: -40, 
        duration: 1, 
        stagger: 0.1, 
        ease: 'power2.in' 
      })
      .to(mockupsRef.current, { 
        scale: 0.8, // Scale down but don't disappear completely to keep hardware context
        opacity: 0, 
        rotate: 5,
        x: 100, // Move slightly offscreen right
        duration: 2, 
        ease: 'power2.inOut' 
      }, "<")

      // PHASE 3: Enter Scene 2 (Mission Text) sequentially
      .to(missionBadgeRef.current, { 
        opacity: 1, 
        y: 0, 
        clipPath: 'inset(-20% -20% -20% -20%)', 
        duration: 1, 
        ease: 'power2.out' 
      }, "-=0.2")
      .to(missionLine1Ref.current, { 
        opacity: 1, 
        y: 0, 
        clipPath: 'inset(-20% -20% -20% -20%)', 
        duration: 1, 
        ease: 'power2.out' 
      }, "-=0.4")
      .to(missionLine2Ref.current, { 
        opacity: 1, 
        y: 0, 
        clipPath: 'inset(-20% -20% -20% -20%)', 
        duration: 1, 
        ease: 'power2.out' 
      }, "-=0.4")
      .to(missionSubRef.current, { 
        opacity: 1, 
        y: 0, 
        clipPath: 'inset(-20% -20% -20% -20%)', 
        duration: 1, 
        ease: 'power2.out' 
      }, "-=0.4")

      // PHASE 4: Final Hold before unpinning allows proceeding to next section
      .to({}, { duration: 0.5 });
      

  }, { scope: sectionRef });

  return (
    <section 
      ref={sectionRef}
      className="relative w-full font-[family-name:var(--font-outfit)]"
    >
      <div 
        ref={containerRef}
        className="hero-sticky-container h-screen w-full overflow-hidden flex items-center bg-black/5"
      >
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 w-full h-full flex items-center">
          
          {/* SCENE 1: Hero Text (Left Aligned) */}
          <div 
            ref={heroTextRef}
            className="absolute top-[10%] sm:top-[12%] lg:top-1/2 lg:-translate-y-1/2 left-6 lg:left-12 right-6 lg:right-auto w-auto lg:w-1/2 z-30 pointer-events-auto"
          >
            <div className="text-left">
              <h1 
                ref={heroLinesRef}
                className="text-[3rem] sm:text-6xl md:text-[80px] lg:text-[120px] font-black text-white leading-[0.95] lg:leading-[0.9] mb-3 sm:mb-6 lg:mb-8 tracking-tighter drop-shadow-2xl"
              >
                Revolution <br />
                in your <br />
                <span className="text-white/40">fleet</span>
              </h1>
              <p 
                ref={heroSubRef}
                className="text-sm sm:text-lg md:text-2xl text-white/80 mb-5 lg:mb-10 leading-relaxed font-medium max-w-xl"
              >
                A data-driven platform to monitor assets, optimize fuel consumption, 
                and transition to sustainable mobility.
              </p>
              <button 
                ref={heroBtnRef}
                className="px-6 py-3 lg:px-10 lg:py-5 bg-white text-black rounded-full font-bold hover:scale-105 transition-transform shadow-[0_0_30px_rgba(255,255,255,0.2)] text-sm md:text-base lg:text-lg uppercase tracking-wider"
              >
                Request a Demo
              </button>
            </div>
          </div>

          {/* SCENE 2: Mission Text (Centered) */}
          <div 
            ref={missionTextRef}
            className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 z-30 pointer-events-none"
          >
            <div 
              ref={missionBadgeRef}
              className="inline-flex items-center px-8 py-3 rounded-full border border-white/20 bg-black/40 backdrop-blur-2xl mb-12 shadow-2xl"
            >
              <span className="text-red-400 text-xs md:text-sm font-bold tracking-[0.3em] uppercase">
                The industry favors the legacy, not the efficient.
              </span>
            </div>

            <h2 
              ref={missionLine1Ref}
              className="text-4xl md:text-7xl lg:text-[90px] font-black text-white leading-[1] mb-2 max-w-5xl tracking-tight drop-shadow-2xl"
            >
              We&apos;re changing that.
            </h2>

            <h2 
              ref={missionLine2Ref}
              className="text-4xl md:text-7xl lg:text-[90px] font-black text-white leading-[1] mb-10 max-w-5xl tracking-tight drop-shadow-2xl"
            >
              One optimized route at a time.
            </h2>

            <p 
              ref={missionSubRef}
              className="text-lg md:text-2xl lg:text-3xl text-white/70 max-w-4xl leading-relaxed font-medium"
            >
              FleetNET honors the organizations rewriting the rules of logistics—locally rooted, 
              community-loved, often underrepresented or overlooked, but driven by mission 
              and built with care.
            </p>
          </div>

          {/* MOCKUPS (Right Aligned) */}
          <div
            ref={mockupsRef}
            className="absolute right-0 top-[43%] sm:top-[45%] lg:top-0 bottom-0 w-full lg:w-1/2 flex items-start lg:items-center justify-center pointer-events-none z-20"
          >
            <div className="relative w-full h-full flex items-start lg:items-center justify-center p-4 lg:p-12 scale-[0.75] sm:scale-95 lg:scale-100">
              
              {/* Desktop Monitor Mockup */}
              <div
                ref={desktopMockupRef}
                className="absolute top-0 lg:top-auto w-[98%] sm:w-[90%] lg:w-full max-w-[700px] aspect-[16/10] bg-[#0a0a0a] rounded-[1.5rem] lg:rounded-[2.5rem] p-2 lg:p-4 shadow-[0_80px_160px_-40px_rgba(0,0,0,0.9)] border border-white/20"
              >
                <div className="relative w-full h-full rounded-lg lg:rounded-2xl overflow-hidden bg-black ring-1 ring-white/10">
                  <Image 
                    src="/images/desktop_ss.png" 
                    alt="Desktop Dashboard" 
                    fill 
                    className="object-cover opacity-90"
                  />
                  <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent pointer-events-none" />
                </div>
                <div className="absolute -bottom-8 lg:-bottom-10 left-1/2 -translate-x-1/2 w-32 lg:w-56 h-8 lg:h-10 bg-gradient-to-b from-[#1a1a1a] to-[#0a0a0a] rounded-t-2xl lg:rounded-t-3xl border-x border-t border-white/10" />
                <div className="absolute -bottom-10 lg:-bottom-12 left-1/2 -translate-x-1/2 w-40 lg:w-64 h-2 bg-black/40 blur-md rounded-full" />
              </div>

              {/* Mobile Phone Mockup */}
              <div
                ref={mobileMockupRef}
                className="absolute right-[5%] top-[40%] sm:top-[50%] lg:top-auto lg:bottom-[10%] w-[110px] sm:w-[150px] lg:w-[240px] aspect-[9/19.5] rounded-[1.5rem] sm:rounded-[2rem] lg:rounded-[4rem] p-1 lg:p-3.5 bg-[#0a0a0a] shadow-[0_60px_120px_-25px_rgba(0,0,0,0.95)] border border-white/20 z-30 max-h-[70vh]"
              >
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 sm:w-20 lg:w-32 h-4 sm:h-5 lg:h-8 bg-[#0a0a0a] rounded-b-[0.75rem] sm:rounded-b-[1rem] lg:rounded-b-[2rem] z-40 border-x border-b border-white/5" />
                <div className="relative w-full h-full rounded-[1.3rem] sm:rounded-[1.8rem] lg:rounded-[3.5rem] overflow-hidden bg-black ring-1 ring-white/10">
                  <Image 
                    src="/images/mobile_ss.png" 
                    alt="Mobile App" 
                    fill 
                    className="object-cover opacity-90"
                  />
                  <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent pointer-events-none" />
                </div>
                <div className="absolute -left-[2px] top-16 sm:top-24 lg:top-32 w-[2px] lg:w-[3px] h-6 sm:h-8 lg:h-12 bg-white/10 rounded-r-sm" />
                <div className="absolute -right-[2px] top-24 sm:top-32 lg:top-40 w-[2px] lg:w-[3px] h-8 sm:h-12 lg:h-20 bg-white/10 rounded-l-sm" />
              </div>

            </div>
          </div>

        </div>

        {/* Scroll Down Indicator */}
        <div
          ref={scrollIndicatorRef}
          className="absolute bottom-6 lg:bottom-12 left-6 lg:left-12 flex items-center gap-3 lg:gap-4 text-white/30 cursor-pointer hover:text-white transition-colors group z-40 pointer-events-auto"
          onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
        >
          <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:border-white transition-colors bg-white/5 backdrop-blur-sm">
            <ArrowDown className="w-4 h-4 lg:w-5 lg:h-5 animate-bounce" />
          </div>
          <span className="text-[10px] lg:text-sm font-bold uppercase tracking-[0.4em]">Scroll down</span>
        </div>
      </div>
    </section>
  );
}
