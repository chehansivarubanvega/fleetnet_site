'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { BatteryCharging, Cpu, Download, Wifi } from 'lucide-react';
import { useRef } from 'react';

gsap.registerPlugin(ScrollTrigger);

const FEATURES = [
  {
    icon: Cpu,
    title: 'Multi-Sensor Extensibility',
    description: 'Go beyond location. Our device features multiple ports to connect a wide range of sensors—from fuel level and temperature monitors to door sensors and driver ID readers.',
    direction: 'left' as const,
  },
  {
    icon: Wifi,
    title: 'High-Gain GPS & Cellular Antenna',
    description: 'Maintain a rock-solid connection even in challenging environments. Our high-gain internal antennas ensure data keeps flowing reliably.',
    direction: 'right' as const,
  },
  {
    icon: BatteryCharging,
    title: 'Intelligent Power Management',
    description: 'Features a deep-sleep mode and an internal backup battery to prevent draining your vehicle\'s power while ensuring the device reports tampering or disconnect events.',
    direction: 'left' as const,
  },
  {
    icon: Download,
    title: 'Over-the-Air (OTA) Updates',
    description: 'Your hardware gets better over time. We push firmware updates remotely, deploying new features and security patches with zero vehicle downtime.',
    direction: 'right' as const,
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
    // Initial States
    gsap.set(deviceRef.current, { scale: 0, opacity: 0, rotation: -15 });
    gsap.set(ringsRef.current, { scale: 0, opacity: 0 });
    gsap.set(headlineRef.current, { opacity: 0, y: 60 });
    gsap.set(subtitleRef.current, { opacity: 0, y: 40 });
    gsap.set(quoteRef.current, { opacity: 0, scale: 0.8, y: 40 });
    gsap.set(featuresRef.current, { opacity: 0, y: 80 });

    const mainTl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "+=4000",
        pin: true,
        scrub: 1.5,
        anticipatePin: 1,
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
    
    // Hold briefly to emphasize the reveal
    .to({}, { duration: 0.2 });

    // ═══════════════════════════════════════════
    // SCENE 1: The Reveal — Device + Headline
    // ═══════════════════════════════════════════
    mainTl.addLabel("scene1", "scene0+=0.8");

    // Device scales in with elastic feel
    mainTl.to(deviceRef.current, {
      scale: 1,
      opacity: 1,
      rotation: 0,
      duration: 1.5,
      ease: "elastic.out(1, 0.6)"
    }, "scene1")

    // Signal rings pulse outward
    .to(ringsRef.current, {
      scale: 1,
      opacity: 1,
      duration: 1,
      ease: "power2.out"
    }, "scene1+=0.4")

    // Headline staggered reveal
    .to(headlineRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power3.out"
    }, "scene1+=0.6")

    // Headline character animation
    .to('.tracker-headline-char', {
      opacity: 1,
      y: 0,
      scale: 1,
      stagger: 0.02,
      duration: 0.15,
      ease: "power2.out"
    }, "scene1+=0.7")

    // Subtitle
    .to(subtitleRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: "power3.out"
    }, "scene1+=1.2");

    // Hold Scene 1
    mainTl.to({}, { duration: 0.8 });

    // ═══════════════════════════════════════════
    // SCENE 2: The Quote — Cinematic
    // ═══════════════════════════════════════════

    // Device shrinks and rises
    mainTl.to(deviceRef.current, {
      scale: 0.3,
      y: -250,
      opacity: 0.3,
      duration: 1,
      ease: "power4.inOut"
    }, "scene2")

    .to(ringsRef.current, {
      scale: 2,
      opacity: 0,
      duration: 0.8,
      ease: "power2.in"
    }, "scene2")

    // Fade out headline
    .to(headlineRef.current, {
      opacity: 0,
      y: -40,
      duration: 0.5
    }, "scene2")

    .to(subtitleRef.current, {
      opacity: 0,
      y: -30,
      duration: 0.4
    }, "scene2")

    // Quote enters
    .to(quoteRef.current, {
      opacity: 1,
      scale: 1,
      y: 0,
      duration: 1.2,
      ease: "expo.out"
    }, "scene2+=0.4")

    // Quote text clip-path reveal
    .to('.quote-text-reveal', {
      clipPath: "inset(0% 0% 0% 0%)",
      stagger: 0.15,
      duration: 0.6,
      ease: "power3.out"
    }, "scene2+=0.6");

    // Hold Scene 2
    mainTl.to({}, { duration: 0.8 });

    // ═══════════════════════════════════════════
    // SCENE 3: The Features — Staggered Cards
    // ═══════════════════════════════════════════

    // Fade out device remnant and quote
    mainTl.to(deviceRef.current, {
      opacity: 0,
      scale: 0,
      duration: 0.5,
      ease: "power2.in"
    }, "scene3")

    .to(quoteRef.current, {
      opacity: 0,
      y: -60,
      scale: 0.9,
      duration: 0.6,
      ease: "power2.in"
    }, "scene3")

    // Features container becomes visible
    .to(featuresContainerRef.current, {
      opacity: 1,
      duration: 0.3
    }, "scene3+=0.3");

    // Each feature card enters from alternating sides
    featuresRef.current.forEach((card, i) => {
      if (!card) return;
      const fromX = FEATURES[i].direction === 'left' ? -120 : 120;
      
      gsap.set(card, { x: fromX, opacity: 0, y: 40 });
      
      mainTl.to(card, {
        x: 0,
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "back.out(1.4)"
      }, `scene3+=${0.3 + i * 0.25}`);
    });

    // Final hold
    mainTl.to({}, { duration: 0.8 });

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
      className="relative w-full min-h-screen overflow-hidden z-10"
    >
      {/* Cinematic Background Reveal Layer */}
      <div 
        ref={bgRevealRef} 
        className="absolute inset-0 bg-[#030712] -z-10 pointer-events-none will-change-transform" 
        style={{ clipPath: 'circle(0% at 50% 50%)' }}
      />
      
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative w-full h-full flex items-center justify-center">

          {/* ═══ SCENE 1: Device + Headline ═══ */}

          {/* Signal Rings (behind device) */}
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
              {/* Static rings */}
              {[1, 2, 3, 4].map((ring) => (
                <div
                  key={`static-${ring}`}
                  className="absolute rounded-full border border-blue-500/10"
                  style={{
                    width: `${ring * 140}px`,
                    height: `${ring * 140}px`,
                  }}
                />
              ))}
            </div>
          </div>

          {/* 3D Tracker Device (CSS-rendered) */}
          <div ref={deviceRef} className="absolute z-20 will-change-transform">
            <div className="relative w-48 h-64 md:w-64 md:h-80 group">
              {/* Device Body */}
              <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f3460] border border-white/20 shadow-[0_40px_100px_-20px_rgba(59,130,246,0.4),inset_0_1px_0_rgba(255,255,255,0.1)] overflow-hidden">
                {/* Surface texture */}
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.06] mix-blend-overlay" />
                
                {/* Top antenna stub */}
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-3 h-8 md:w-4 md:h-10 bg-gradient-to-t from-[#1a1a2e] to-[#2a2a4e] rounded-full border border-white/15 shadow-lg" />
                
                {/* LED Indicators Row */}
                <div className="absolute top-6 left-1/2 -translate-x-1/2 flex gap-3">
                  <div className="w-2 h-2 rounded-full bg-green-400 shadow-[0_0_8px_rgba(74,222,128,0.8)] animate-pulse" />
                  <div className="w-2 h-2 rounded-full bg-blue-400 shadow-[0_0_8px_rgba(96,165,250,0.8)] animate-pulse" style={{ animationDelay: '0.3s' }} />
                  <div className="w-2 h-2 rounded-full bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.6)]" />
                </div>

                {/* Central chip/processor visual */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                  <div className="w-16 h-16 md:w-20 md:h-20 rounded-xl bg-gradient-to-br from-blue-600/30 to-purple-600/30 border border-white/15 flex items-center justify-center backdrop-blur-sm shadow-inner">
                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-gradient-to-br from-blue-500/40 to-indigo-500/40 border border-white/10 flex items-center justify-center">
                      <Cpu className="w-6 h-6 md:w-8 md:h-8 text-blue-300/80" />
                    </div>
                  </div>
                  {/* Chip traces */}
                  {[0, 90, 180, 270].map((angle) => (
                    <div
                      key={angle}
                      className="absolute top-1/2 left-1/2 w-8 h-[1px] bg-gradient-to-r from-blue-400/40 to-transparent"
                      style={{
                        transform: `translate(-50%, -50%) rotate(${angle}deg) translateX(40px)`,
                        transformOrigin: '0 50%'
                      }}
                    />
                  ))}
                </div>

                {/* Port indicators at bottom */}
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-4">
                  <div className="w-6 h-3 rounded-sm bg-white/10 border border-white/15" />
                  <div className="w-6 h-3 rounded-sm bg-white/10 border border-white/15" />
                  <div className="w-4 h-3 rounded-sm bg-white/10 border border-white/15" />
                </div>

                {/* SIM slot line */}
                <div className="absolute right-3 top-1/3 w-[2px] h-12 bg-white/10 rounded-full" />
              </div>

              {/* Shadow / Glow beneath device */}
              <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-40 h-4 bg-blue-500/20 rounded-full blur-xl" />
            </div>
          </div>

          {/* Headline */}
          <div ref={headlineRef} className="absolute z-30 bottom-[10%] left-0 right-0 text-center px-6 pointer-events-none will-change-transform">
            <h2 className="text-4xl md:text-7xl font-black text-white leading-[0.95] mb-4 tracking-tight uppercase italic">
              {splitHeadline("The Engine of Your Data")}
            </h2>
            <p className="text-lg md:text-2xl font-bold text-blue-300/70 tracking-[0.2em] uppercase">
              {splitHeadline("The 4G Tracker")}
            </p>
          </div>

          {/* Subtitle */}
          <div ref={subtitleRef} className="absolute z-30 bottom-[3%] left-0 right-0 text-center px-6 pointer-events-none">
            <p className="text-sm md:text-base text-white/40 max-w-2xl mx-auto font-medium">
              Engineered in partnership with Vega Innovation Sri Lanka, our 4G tracker is the heart of our system.
            </p>
          </div>

          {/* ═══ SCENE 2: Cinematic Quote ═══ */}
          <div ref={quoteRef} className="absolute z-30 flex items-center justify-center px-6 pointer-events-none will-change-transform">
            <div className="relative max-w-4xl">
              {/* Glassmorphism container */}
              <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] p-10 md:p-16 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.5)]">
                {/* Quote mark */}
                <div className="absolute -top-6 left-10 text-8xl font-black text-blue-400/30 leading-none select-none">&ldquo;</div>
                
                <blockquote className="relative z-10">
                  <p
                    className="quote-text-reveal text-2xl md:text-4xl font-bold text-white leading-snug mb-8 italic"
                    style={{ clipPath: "inset(0% 100% 0% 0%)" }}
                  >
                    This is not off-the-shelf hardware; it&apos;s a core piece of our integrated solution.
                  </p>
                  <div
                    className="quote-text-reveal flex items-center gap-4"
                    style={{ clipPath: "inset(0% 100% 0% 0%)" }}
                  >
                    <div className="w-12 h-[2px] bg-blue-400" />
                    <span className="text-blue-300/70 text-sm font-bold tracking-[0.3em] uppercase">Built for Reliability</span>
                  </div>
                </blockquote>
              </div>
            </div>
          </div>

          {/* ═══ SCENE 3: Feature Cards ═══ */}
          <div ref={featuresContainerRef} className="absolute inset-0 z-30 flex items-center justify-center pointer-events-none opacity-0 p-4 md:p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 max-w-5xl w-full">
              {FEATURES.map((feature, i) => (
                <div
                  key={feature.title}
                  ref={(el) => { featuresRef.current[i] = el; }}
                  className="will-change-transform"
                >
                  <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] hover:bg-white/10 transition-colors duration-500 group h-full">
                    {/* Icon */}
                    <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl md:rounded-2xl bg-gradient-to-br from-blue-500/30 to-indigo-500/20 border border-blue-400/20 flex items-center justify-center mb-5 md:mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-blue-500/10">
                      <feature.icon className="w-6 h-6 md:w-7 md:h-7 text-blue-300" />
                    </div>
                    
                    {/* Title */}
                    <h3 className="text-lg md:text-xl font-bold text-white mb-2 md:mb-3 tracking-tight leading-tight">
                      {feature.title}
                    </h3>
                    
                    {/* Description */}
                    <p className="text-sm md:text-base text-white/50 leading-relaxed font-medium">
                      {feature.description}
                    </p>
                    
                    {/* Bottom accent */}
                    <div className="mt-5 md:mt-6 h-1 w-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full opacity-60 group-hover:w-20 group-hover:opacity-100 transition-all duration-500" />
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
