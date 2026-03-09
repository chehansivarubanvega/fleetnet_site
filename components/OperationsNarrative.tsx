'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import { useRef } from 'react';

gsap.registerPlugin(ScrollTrigger);

const DATA_POINTS = [
  { left: '25%', top: '30%', delay: '0.2s' },
  { left: '60%', top: '20%', delay: '1.5s' },
  { left: '45%', top: '65%', delay: '0.8s' },
  { left: '80%', top: '40%', delay: '2.1s' },
  { left: '20%', top: '75%', delay: '0.4s' },
  { left: '70%', top: '80%', delay: '1.2s' },
  { left: '35%', top: '15%', delay: '0.9s' },
  { left: '55%', top: '50%', delay: '1.7s' },
  { left: '15%', top: '45%', delay: '2.5s' },
  { left: '85%', top: '25%', delay: '0.1s' },
  { left: '40%', top: '85%', delay: '1.4s' },
  { left: '65%', top: '10%', delay: '0.6s' },
];

export default function OperationsNarrative() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const wireframeRef = useRef<HTMLDivElement>(null);
  const bubbleRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // --- Background Theme Transition ---
    // Transitions the FluidBackground from Warm to Cold/Dark
    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top bottom", // Start when section enters viewport
      end: "top center", // Complete by the time it reaches center
      scrub: true,
      onUpdate: (self) => {
        const p = self.progress;
        const root = document.documentElement;
        
        // Define target colors
        const targets = {
          base: ["#2a0f04", "#050505"],
          c1: ["#ff4500", "#991b1b"],
          c2: ["#ffa500", "#1e293b"],
          c3: ["#3d1a08", "#0f172a"],
          c4: ["#ffcc00", "#ef4444"]
        };

        const interpolate = (start: string, end: string, progress: number) => {
          return gsap.utils.interpolate(start, end, progress);
        };

        root.style.setProperty('--bg-base', interpolate(targets.base[0], targets.base[1], p));
        root.style.setProperty('--bg-color-1', interpolate(targets.c1[0], targets.c1[1], p));
        root.style.setProperty('--bg-color-2', interpolate(targets.c2[0], targets.c2[1], p));
        root.style.setProperty('--bg-color-3', interpolate(targets.c3[0], targets.c3[1], p));
        root.style.setProperty('--bg-color-4', interpolate(targets.c4[0], targets.c4[1], p));
      }
    });

    const mainTl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "+=3000",
        pin: true,
        scrub: 1.5,
        anticipatePin: 1,
      }
    });

    // Initial states
    gsap.set(iconRef.current, { scale: 1, opacity: 1, y: 0 });
    gsap.set(cardsRef.current, { scale: 0.8, opacity: 0, y: 100 });
    gsap.set(wireframeRef.current, { opacity: 0, scale: 0.8 });
    gsap.set(bubbleRef.current, { opacity: 0, scale: 0 });
    gsap.set('.narrative-text', { opacity: 0, y: 40 });

    // --- SCENE 1: Total Asset Control ---
    mainTl.to(iconRef.current, {
      y: -150,
      opacity: 0,
      scale: 0.3,
      duration: 1,
      ease: "power4.inOut"
    }, "scene1")
    .to(cardsRef.current, {
      opacity: 1,
      scale: 1,
      y: 0,
      stagger: 0.15,
      duration: 1.2,
      ease: "back.out(1.7)"
    }, "scene1+=0.3")
    .to('#text-1', { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }, "scene1+=0.8")
    .to('#text-1 h2 span', { opacity: 1, stagger: 0.03, duration: 0.2 }, "scene1+=1");

    // Hold scene 1
    mainTl.to({}, { duration: 0.8 });

    // --- SCENE 2: Live Fleet Intelligence ---
    mainTl.to(cardsRef.current, {
      opacity: 0,
      scale: 0.5,
      stagger: 0.05,
      duration: 0.8,
      ease: "power2.in"
    }, "scene2")
    .to('#text-1', { opacity: 0, y: -40, duration: 0.5 }, "scene2")
    .to(wireframeRef.current, {
      opacity: 1,
      scale: 1,
      duration: 1.5,
      ease: "expo.out"
    }, "scene2+=0.3")
    .to('#text-2', { opacity: 1, y: 0, duration: 0.5 }, "scene2+=0.5") // FIX: Animate container to opacity 1
    .to('#text-2 h2 span', { 
      opacity: 1, 
      stagger: 0.04, 
      duration: 0.2,
      ease: "none"
    }, "scene2+=0.8")
    .to('#text-2 p', { opacity: 1, y: 0, duration: 0.6 }, "scene2+=1");

    // Sub-animation for wireframe points
    mainTl.to(wireframeRef.current, {
      filter: "brightness(1.8) contrast(1.1) drop-shadow(0 0 20px rgba(239, 68, 68, 0.4))",
      duration: 1,
    }, "scene2+=1.2");

    // Hold scene 2
    mainTl.to({}, { duration: 0.8 });

    // --- SCENE 3: Predictive Alerts ---
    mainTl.to(wireframeRef.current, {
      scale: 1.5,
      opacity: 0,
      duration: 1,
      ease: "power4.in"
    }, "scene3")
    .to('#text-2', { opacity: 0, y: -40, duration: 0.5 }, "scene3")
    .to(bubbleRef.current, {
      opacity: 1,
      scale: 1.2,
      duration: 1.2,
      ease: "elastic.out(1, 0.4)"
    }, "scene3+=0.4")
    .to('#text-3', { opacity: 1, y: 0, duration: 0.5 }, "scene3+=0.6") // FIX: Animate container to opacity 1
    .to('#text-3 h2 span', { 
      opacity: 1, 
      stagger: 0.04, 
      duration: 0.2,
      ease: "none"
    }, "scene3+=0.9")
    .to('#text-3 p', { opacity: 1, y: 0, duration: 0.6 }, "scene3+=1.1");

    // Final hold
    mainTl.to({}, { duration: 1 });

  }, { scope: sectionRef });

  const splitText = (text: string) => {
    return text.split(/(\s+)/).map((part, i) => {
      if (/\s+/.test(part)) {
        return <span key={i} className="inline-block">{part === '\n' ? <br /> : '\u00A0'}</span>;
      }
      return (
        <span key={i} className="inline-block whitespace-nowrap">
          {part.split('').map((char, j) => (
            <span key={j} className="opacity-0 inline-block translate-y-2 scale-50">{char}</span>
          ))}
        </span>
      );
    });
  };

  return (
    <section ref={sectionRef} className="relative w-full min-h-screen overflow-hidden z-10 font-[family-name:var(--font-outfit)]">
      <div className="absolute inset-0 flex items-center justify-center p-6 md:p-20">
        
        {/* Scene Container */}
        <div className="relative w-full h-full flex items-center justify-center">
          
          {/* Scene 1 Assets: Icon & Cards */}
          <div ref={iconRef} className="absolute z-20">
            <div className="w-40 h-40 md:w-56 md:h-56 rounded-[2.5rem] bg-white/5 backdrop-blur-2xl border border-white/10 flex items-center justify-center p-8 shadow-[0_0_50px_rgba(255,255,255,0.05)]">
              <Image 
                src="/images/FLEETnet app icon.png" 
                alt="Unified Command" 
                width={160} 
                height={160}
                className="w-full h-full object-contain filter drop-shadow-[0_0_20px_rgba(255,255,255,0.2)]"
              />
            </div>
          </div>

          <div className="absolute inset-0 flex items-center justify-center gap-4 md:gap-12 pointer-events-none px-4">
            {['Assets', 'Roles', 'Permissions'].map((label, i) => (
              <div
                key={label}
                ref={(el) => { cardsRef.current[i] = el; }}
                className="w-40 md:w-72 aspect-[3/4.5] rounded-3xl bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-3xl border border-white/20 p-6 md:p-8 flex flex-col justify-end shadow-2xl will-change-transform group overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-red-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-2xl bg-red-600 mb-6 flex items-center justify-center shadow-lg shadow-red-600/30">
                    <div className="w-3 h-3 bg-white rounded-full animate-pulse" />
                  </div>
                  <h4 className="text-2xl md:text-3xl font-bold text-white mb-3 tracking-tight">{label}</h4>
                  <p className="text-white/40 text-sm md:text-base leading-relaxed mb-4">Enterprise Grade {label} Logic</p>
                  <div className="h-1.5 w-16 bg-red-500 rounded-full" />
                </div>
              </div>
            ))}
          </div>

          {/* Scene 2 Asset: Wireframe */}
          <div ref={wireframeRef} className="absolute inset-0 flex items-center justify-center pointer-events-none will-change-transform p-4">
            <div className="w-full max-w-5xl aspect-video rounded-[3.5rem] border border-red-500/30 bg-red-500/5 backdrop-blur-md relative overflow-hidden group shadow-[0_0_80px_rgba(239,68,68,0.1)]">
              {/* Grid Lines */}
              <div className="absolute inset-0 grid grid-cols-12 grid-rows-8 opacity-30">
                {Array.from({ length: 96 }).map((_, i) => (
                  <div key={i} className="border-[0.5px] border-red-500/20" />
                ))}
              </div>
              
              {/* Data Visuals */}
              <div className="absolute inset-0 flex items-center justify-center">
                 <div className="w-3/4 h-3/4 border-2 border-red-500/20 rounded-full animate-[spin_20s_linear_infinite] border-dashed" />
                 <div className="absolute w-1/2 h-1/2 border border-red-500/40 rounded-full animate-[spin_10s_linear_infinite_reverse]" />
              </div>

              {/* Data Points */}
              <div className="absolute inset-0">
                 {DATA_POINTS.map((pt, i) => (
                   <div 
                    key={i}
                    className="absolute w-1.5 h-1.5 bg-red-500 rounded-full shadow-[0_0_15px_rgba(239,68,68,1)] animate-pulse"
                    style={{
                      left: pt.left,
                      top: pt.top,
                      animationDelay: pt.delay
                    }}
                   />
                 ))}
              </div>

              {/* HUD Elements */}
              <div className="absolute top-8 left-8 text-red-500/60 font-mono text-[10px] space-y-1">
                <div>SYSTEM_ACTIVE: TRUE</div>
                <div>FLEET_REACH: GLOBAL</div>
                <div>SCAN_FREQ: 120HZ</div>
              </div>
              
              {/* Scanning Lines */}
              <div className="absolute top-0 left-0 w-full h-[150px] bg-gradient-to-b from-red-500/10 via-red-500/5 to-transparent opacity-50 animate-scan pointer-events-none" />
            </div>
          </div>

          {/* Scene 3 Asset: Notification Bubble */}
          <div ref={bubbleRef} className="absolute pointer-events-none will-change-transform -translate-x-20 md:-translate-x-40">
            <div className="relative group">
               {/* Optimized pulse: Replaced blur-[100px] with a radial gradient */}
               <div 
                 className="absolute inset-[-40px] rounded-full opacity-40 animate-pulse will-change-transform" 
                 style={{ background: 'radial-gradient(circle, rgba(220,38,38,0.8) 0%, transparent 70%)' }}
               />
               <div className="relative w-48 h-48 md:w-80 md:h-80 rounded-full bg-gradient-to-br from-red-500 via-red-600 to-red-900 border-[6px] border-white shadow-[0_0_60px_rgba(239,68,68,0.5)] flex items-center justify-center p-12 overflow-hidden">
                  <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
                  <svg className="w-full h-full text-white drop-shadow-[0_10px_10px_rgba(0,0,0,0.3)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                  <div className="absolute -top-4 -right-4 w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-xl ring-8 ring-red-600/20">
                    <span className="text-red-600 font-extrabold text-3xl">!</span>
                  </div>
               </div>
            </div>
          </div>

        </div>

        {/* Text Overlay Section - Improved positioning to avoid overlapping central assets */}
        <div ref={textRef} className="absolute inset-0 z-30 pointer-events-none overflow-hidden uppercase font-black italic tracking-tighter">
          
          {/* Scene 1 Text: Bottom Center */}
          <div id="text-1" className="narrative-text absolute bottom-[8%] left-1/2 -translate-x-1/2 w-full max-w-5xl px-10 text-center flex flex-col items-center">
            <h2 className="text-5xl md:text-8xl text-white mb-6 leading-none">
              {splitText("Total Asset Control")}
            </h2>
            <p className="text-lg md:text-2xl text-white/50 max-w-3xl font-light leading-relaxed normal-case not-italic tracking-normal">
              Manage every vehicle, role, and permission from a unified operational layer designed for enterprise scale.
            </p>
          </div>

          {/* Scene 2 Text: Top Left (Dynamic Offset) */}
          <div id="text-2" className="narrative-text absolute top-[12%] left-[6%] w-full max-w-2xl text-left flex flex-col items-start pr-10">
            <h2 className="text-5xl md:text-8xl text-white mb-6 whitespace-pre-line leading-[0.8]">
              {splitText("Live Fleet\nIntelligence")}
            </h2>
            <div className="h-1.5 w-32 bg-red-600 mb-8 shadow-[0_0_15px_rgba(220,38,38,0.5)]" />
            <p className="text-lg md:text-2xl text-white/40 max-w-md font-light leading-relaxed normal-case not-italic tracking-normal">
              Real-time data streams and wireframe visualization providing total situational awareness across your entire global network.
            </p>
          </div>

          {/* Scene 3 Text: Bottom Right (Dynamic Offset) */}
          <div id="text-3" className="narrative-text absolute bottom-[12%] right-[6%] w-full max-w-2xl text-right flex flex-col items-end pl-10">
            <h2 className="text-5xl md:text-8xl text-white mb-6 leading-[0.8] whitespace-pre-line">
              {splitText("Predictive\nAlerts")}
            </h2>
            <div className="h-1.5 w-32 bg-red-600 mb-8 shadow-[0_0_15px_rgba(220,38,38,0.5)]" />
            <p className="text-lg md:text-2xl text-white/40 max-w-md font-light leading-relaxed normal-case not-italic tracking-normal">
              Stay ahead of maintenance and operational failures with proactive, glowing insights powered by adaptive AI.
            </p>
          </div>
        </div>

      </div>

      {/* Animation Helpers */}
      <style jsx global>{`
        @keyframes scan {
          from { transform: translateY(-100%); }
          to { transform: translateY(500%); }
        }
        .animate-scan {
          animation: scan 4s linear infinite;
        }
      `}</style>
    </section>
  );
}
