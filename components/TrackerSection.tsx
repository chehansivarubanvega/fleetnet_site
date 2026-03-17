'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { BatteryCharging, Cpu, Download, Wifi } from 'lucide-react';
import { useRef } from 'react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const FEATURES = [
  {
    icon: Cpu,
    title: 'Multi-Sensor Extensibility',
    description: 'Go beyond location. Our device features multiple ports to connect a wide range of sensors—from fuel level and temperature monitors to door sensors and driver ID readers.',
  },
  {
    icon: Wifi,
    title: 'High-Gain GPS & Cellular Antenna',
    description: 'Maintain a rock-solid connection even in challenging environments. Our high-gain internal antennas ensure data keeps flowing reliably.',
  },
  {
    icon: BatteryCharging,
    title: 'Intelligent Power Management',
    description: 'Features a deep-sleep mode and an internal backup battery to prevent draining your vehicle\'s power while ensuring the device reports tampering or disconnect events.',
  },
  {
    icon: Download,
    title: 'Over-the-Air (OTA) Updates',
    description: 'Your hardware gets better over time. We push firmware updates remotely, deploying new features and security patches with zero vehicle downtime.',
  },
];

export default function TrackerSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const deviceRef = useRef<HTMLDivElement>(null);
  const ringsRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const quoteRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<(HTMLDivElement | null)[]>([]);
  const featuresContainerRef = useRef<HTMLDivElement>(null);
  const bgRevealRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!sectionRef.current) return;

    // Initial States
    gsap.set(deviceRef.current, { scale: 0, opacity: 0, rotation: -15 });
    gsap.set(ringsRef.current, { scale: 0, opacity: 0 });
    gsap.set(headlineRef.current, { opacity: 0, y: 60 });
    gsap.set(subtitleRef.current, { opacity: 0, y: 40 });
    gsap.set(quoteRef.current, { opacity: 0, scale: 0.8, y: 40 });
    gsap.set(featuresRef.current, { opacity: 0, y: 60, scale: 0.9 });
    gsap.set(featuresContainerRef.current, { opacity: 0 });

    const mainTl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "+=4500",
        pin: true,
        scrub: 1.2,
        anticipatePin: 1,
        // Snap across the three main scenes of this section
        snap: {
          snapTo: [0, 0.33, 0.66, 1],
          duration: 0.6,
          ease: "power2.inOut",
        },
      }
    });

    // ═══════════════════════════════════════════
    
    // SCENE 0: Cinematic Circular Mask Reveal
    // ═══════════════════════════════════════════
    mainTl.to(bgRevealRef.current, {
      clipPath: "circle(150% at 50% 50%)",
      duration: 1.5,
      ease: "power2.inOut"
    }, "scene0")
    
    .to({}, { duration: 0.5 }); // Hold 

    // ═══════════════════════════════════════════
    // SCENE 1: The Reveal — Device + Headline
    // ═══════════════════════════════════════════
    mainTl.addLabel("scene1", "scene0+=1.5");

    mainTl.to(deviceRef.current, {
      scale: 1,
      opacity: 1,
      rotation: 0,
      duration: 1.5,
      ease: "elastic.out(1, 0.6)"
    }, "scene1")
    .to(ringsRef.current, {
      scale: 1,
      opacity: 1,
      duration: 1,
      ease: "power2.out"
    }, "scene1+=0.4")
    .to(headlineRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power3.out"
    }, "scene1+=0.6")
    .to('.tracker-headline-char', {
      opacity: 1,
      y: 0,
      scale: 1,
      stagger: 0.02,
      duration: 0.15,
      ease: "power2.out"
    }, "scene1+=0.7")
    .to(subtitleRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: "power3.out"
    }, "scene1+=1.2");

    mainTl.to({}, { duration: 1.5 }); // Hold scene 1

    // ═══════════════════════════════════════════
    // SCENE 2: The Quote — Cinematic
    // ═══════════════════════════════════════════
    mainTl.addLabel("scene2");

    mainTl.to(deviceRef.current, {
      scale: 0.4,
      y: -200,
      opacity: 0,
      duration: 1.2,
      ease: "power3.in"
    }, "scene2")
    .to(ringsRef.current, {
      scale: 2,
      opacity: 0,
      duration: 1,
    }, "scene2")
    .to(headlineRef.current, {
      opacity: 0,
      y: -80,
      duration: 0.8
    }, "scene2")
    .to(subtitleRef.current, {
      opacity: 0,
      y: -80,
      duration: 0.7
    }, "scene2")
    .to(quoteRef.current, {
      opacity: 1,
      scale: 1,
      y: 0,
      duration: 1.2,
      ease: "expo.out"
    }, "scene2+=0.5")
    .to('.quote-text-reveal', {
      clipPath: "inset(0% 0% 0% 0%)",
      stagger: 0.15,
      duration: 0.8,
      ease: "power3.out"
    }, "scene2+=0.7");

    mainTl.to({}, { duration: 1.8 }); // Hold scene 2

    // ═══════════════════════════════════════════
    // SCENE 3: The Features — Sequential Pop
    // ═══════════════════════════════════════════
    mainTl.addLabel("scene3");

    // Fade out Quote
    mainTl.to(quoteRef.current, {
      opacity: 0,
      y: -80,
      duration: 0.8,
      ease: "power3.in"
    }, "scene3")
    .to(featuresContainerRef.current, {
      opacity: 1,
      duration: 0.5
    }, "scene3+=0.5");

    // Sequential cards entry (Staggered pop)
    featuresRef.current.forEach((card, i) => {
      mainTl.to(card, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1,
        ease: "back.out(1.2)"
      }, `scene3+=${0.7 + i * 0.6}`);
    });

    // Final Hold before unpinning
    mainTl.to({}, { duration: 2 });

  }, { scope: sectionRef });

  const splitHeadline = (text: string) => {
    return text.split('').map((char, i) => (
      <span
        key={i}
        className="tracker-headline-char inline-block opacity-0 translate-y-3 scale-50"
        style={{ display: char === ' ' ? 'inline' : 'inline-block' }}
      >
        {char === ' ' ? '\u00A0' : char}
      </span>
    ));
  };

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen overflow-hidden z-10 font-[family-name:var(--font-outfit)]"
    >
      {/* Cinematic Background Reveal Layer */}
      <div 
        ref={bgRevealRef} 
        className="absolute inset-0 bg-[#030712] -z-10 pointer-events-none will-change-transform" 
        style={{ clipPath: 'circle(0% at 50% 50%)' }}
      />
      
      <div className="absolute inset-0 flex items-center justify-center p-6 md:p-12">
        <div className="relative w-full h-full flex items-center justify-center">

          {/* ═══ SCENE 1: Device + Headline ═══ */}
          <div ref={ringsRef} className="absolute z-10 pointer-events-none will-change-transform">
            <div className="relative w-[500px] h-[500px] md:w-[600px] md:h-[600px] flex items-center justify-center">
              {[1, 2, 3].map((ring) => (
                <div
                  key={ring}
                  className="absolute rounded-full border border-blue-400/20 animate-ping"
                  style={{
                    width: `${ring * 180}px`,
                    height: `${ring * 180}px`,
                    animationDuration: `${2 + ring * 0.8}s`,
                    animationDelay: `${ring * 0.3}s`,
                  }}
                />
              ))}
            </div>
          </div>

          <div ref={deviceRef} className="absolute z-20 will-change-transform">
            <div className="relative w-48 md:w-64 h-64 md:h-80">
              <div className="absolute inset-0 rounded-[2.5rem] bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f3460] border border-white/20 shadow-[0_40px_100px_-20px_rgba(59,130,246,0.4)] overflow-hidden">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                   <div className="w-16 md:w-24 h-16 md:h-24 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 flex items-center justify-center">
                      <Cpu className="w-8 md:w-12 h-8 md:h-12 text-blue-400/70" />
                   </div>
                </div>
              </div>
              <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-48 h-6 bg-blue-500/20 rounded-full blur-2xl" />
            </div>
          </div>

          <div ref={headlineRef} className="absolute z-30 bottom-[12%] left-0 right-0 text-center px-6 pointer-events-none">
            <h2 className="text-3xl sm:text-5xl md:text-7xl font-black text-white leading-tight uppercase italic mb-2">
              {splitHeadline("The Engine of Data")}
            </h2>
            <p className="text-sm md:text-2xl font-bold text-blue-300/60 uppercase tracking-[0.3em]">
              {splitHeadline("The 4G Tracker")}
            </p>
          </div>

          <div ref={subtitleRef} className="absolute z-30 bottom-[4%] left-0 right-0 text-center px-6 pointer-events-none opacity-50">
            <p className="text-[10px] md:text-sm font-bold uppercase tracking-[0.2em] text-white/40">
              Partnering with Vega Innovation Sri Lanka
            </p>
          </div>

          {/* ═══ SCENE 2: Cinematic Quote ═══ */}
          <div ref={quoteRef} className="absolute z-40 flex items-center justify-center px-6 w-full max-w-5xl pointer-events-none">
            <div className="relative w-full bg-white/[0.03] backdrop-blur-3xl border border-white/10 rounded-[2rem] md:rounded-[4rem] p-8 md:p-20 shadow-2xl overflow-hidden">
               <div className="absolute -top-10 -left-6 text-[15rem] font-black text-blue-500/[0.05] leading-none select-none">&ldquo;</div>
               <blockquote className="relative z-10 text-center">
                  <p className="quote-text-reveal text-xl md:text-5xl font-black text-white leading-[1.15] mb-12 italic tracking-tight" style={{ clipPath: "inset(0% 100% 0% 0%)" }}>
                    &ldquo;This is not off-the-shelf hardware; it&apos;s a core piece of our integrated solution.&rdquo;
                  </p>
                  <div className="quote-text-reveal inline-flex items-center gap-4 bg-blue-500/10 px-6 py-2 rounded-full border border-blue-500/20" style={{ clipPath: "inset(0% 100% 0% 0%)" }}>
                    <span className="text-blue-400 text-[10px] md:text-xs font-black uppercase tracking-[0.3em]">Built for Reliability</span>
                  </div>
               </blockquote>
            </div>
          </div>

          {/* ═══ SCENE 3: Feature Cards ═══ */}
          <div 
            ref={featuresContainerRef} 
            className="absolute inset-x-0 top-[100px] bottom-0 z-50 flex flex-col items-center justify-center pointer-events-none px-3 sm:px-6 pb-4 sm:pb-6"
          >
            <div className="grid grid-cols-2 gap-2 sm:gap-3 md:gap-8 max-w-6xl w-full">
              {FEATURES.map((feature, i) => (
                <div
                  key={feature.title}
                  ref={(el) => { featuresRef.current[i] = el; }}
                  className="will-change-transform"
                >
                  <div className="bg-[#050505]/90 backdrop-blur-2xl border border-white/10 rounded-xl sm:rounded-2xl md:rounded-[2.5rem] p-3 sm:p-5 md:p-10 shadow-2xl relative overflow-hidden group h-full">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent pointer-events-none" />
                    <div className="relative z-10 flex flex-col h-full">
                      <div className="w-8 h-8 sm:w-12 sm:h-12 md:w-20 md:h-20 rounded-lg sm:rounded-xl md:rounded-3xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mb-2 sm:mb-3 md:mb-6 flex-shrink-0">
                        <feature.icon className="w-4 h-4 sm:w-6 sm:h-6 md:w-10 md:h-10 text-blue-400" />
                      </div>
                      <h3 className="text-[14px] leading-snug sm:text-lg md:text-3xl font-black text-white mb-1.5 sm:mb-3 tracking-tight">
                        {feature.title}
                      </h3>
                      <p className="text-[12px] leading-relaxed sm:text-sm md:text-xl text-white/70 font-medium">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
