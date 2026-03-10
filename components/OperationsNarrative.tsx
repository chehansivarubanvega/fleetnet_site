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
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Scene Refs
  const iconRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const wireframeRef = useRef<HTMLDivElement>(null);
  const bubbleRef = useRef<HTMLDivElement>(null);
  
  // Text Refs
  const text1Ref = useRef<HTMLDivElement>(null);
  const text2Ref = useRef<HTMLDivElement>(null);
  const text3Ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!sectionRef.current) return;

    // --- 1. THEME INITIALIZATION ---
    gsap.set([wireframeRef.current, bubbleRef.current, text1Ref.current, text2Ref.current, text3Ref.current], { 
      opacity: 0, 
      y: 50,
      visibility: 'hidden'
    });
    gsap.set(cardsRef.current, { opacity: 0, scale: 0.8, y: 100 });
    gsap.set(iconRef.current, { opacity: 1, scale: 1, y: 0 });

    // --- 2. BACKGROUND COLOR TRANSITION (THEME) ---
    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top bottom",
      end: "top center",
      scrub: true,
      onUpdate: (self) => {
        const p = self.progress;
        const root = document.documentElement;
        const targets = {
          base: ["#2a0f04", "#050505"],
          c1: ["#ff4500", "#991b1b"],
          c2: ["#ffa500", "#1e293b"],
          c3: ["#3d1a08", "#0f172a"],
          c4: ["#ffcc00", "#ef4444"]
        };
        const interpolate = (start: string, end: string, progress: number) => gsap.utils.interpolate(start, end, progress);
        root.style.setProperty('--bg-base', interpolate(targets.base[0], targets.base[1], p));
        root.style.setProperty('--bg-color-1', interpolate(targets.c1[0], targets.c1[1], p));
        root.style.setProperty('--bg-color-2', interpolate(targets.c2[0], targets.c2[1], p));
        root.style.setProperty('--bg-color-3', interpolate(targets.c3[0], targets.c3[1], p));
        root.style.setProperty('--bg-color-4', interpolate(targets.c4[0], targets.c4[1], p));
      }
    });

    // --- 3. SCENE MANAGER ---
    const scenes = [
      {
        id: 'scene1',
        enter: () => {
          const tl = gsap.timeline();
          tl.set(text1Ref.current, { visibility: 'visible' });
          tl.to(iconRef.current, { y: -120, opacity: 0, scale: 0.5, duration: 0.8, ease: "power3.inOut" }, 0);
          tl.to(cardsRef.current, { opacity: 1, scale: 1, y: 0, stagger: 0.1, duration: 1, ease: "back.out(1.5)" }, 0.2);
          tl.to(text1Ref.current, { opacity: 1, y: 0, duration: 0.8 }, 0.4);
          tl.to('#text-1 h2 span span', { opacity: 1, stagger: 0.02, duration: 0.1 }, 0.6);
          return tl;
        },
        exit: () => {
          const tl = gsap.timeline();
          tl.to(cardsRef.current, { opacity: 0, scale: 0.8, y: 50, stagger: 0.05, duration: 0.6, ease: "power2.in" }, 0);
          tl.to(text1Ref.current, { opacity: 0, y: -30, duration: 0.5 }, 0.1);
          return tl;
        }
      },
      {
        id: 'scene2',
        enter: () => {
          const tl = gsap.timeline();
          tl.set(text2Ref.current, { visibility: 'visible' });
          tl.to(wireframeRef.current, { opacity: 1, scale: 1, duration: 1.2, ease: "expo.out" }, 0);
          tl.to(text2Ref.current, { opacity: 1, y: 0, duration: 0.8 }, 0.3);
          tl.to('#text-2 h2 span span', { opacity: 1, stagger: 0.03, duration: 0.1 }, 0.5);
          tl.to(wireframeRef.current, { filter: "brightness(1.5) contrast(1.2) drop-shadow(0 0 30px rgba(239, 68, 68, 0.3))", duration: 1 }, 0.7);
          return tl;
        },
        exit: () => {
          const tl = gsap.timeline();
          tl.to(wireframeRef.current, { scale: 1.2, opacity: 0, duration: 0.8, ease: "power3.in" }, 0);
          tl.to(text2Ref.current, { opacity: 0, y: -30, duration: 0.5 }, 0.1);
          return tl;
        }
      },
      {
        id: 'scene3',
        enter: () => {
          const tl = gsap.timeline();
          tl.set(text3Ref.current, { visibility: 'visible' });
          tl.to(bubbleRef.current, { opacity: 1, scale: 1, duration: 1, ease: "elastic.out(1, 0.6)" }, 0);
          tl.to(text3Ref.current, { opacity: 1, y: 0, duration: 0.8 }, 0.3);
          tl.to('#text-3 h2 span span', { opacity: 1, stagger: 0.03, duration: 0.1 }, 0.5);
          return tl;
        },
        exit: () => {
          const tl = gsap.timeline();
          tl.to(bubbleRef.current, { scale: 0.5, opacity: 0, duration: 0.6 }, 0);
          tl.to(text3Ref.current, { opacity: 0, y: -30, duration: 0.5 }, 0.1);
          return tl;
        }
      }
    ];

    let currentScene = -1;

    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top top",
      end: "+=1800",
      pin: true,
      anticipatePin: 1,
      onUpdate: (self) => {
        const p = self.progress;
        let targetScene = -1;

        if (p > 0.05 && p <= 0.35) targetScene = 0;
        else if (p > 0.35 && p <= 0.7) targetScene = 1;
        else if (p > 0.7) targetScene = 2;

        if (targetScene !== currentScene) {
          if (currentScene !== -1) scenes[currentScene].exit();
          if (targetScene !== -1) scenes[targetScene].enter();
          currentScene = targetScene;
        }

        // Final cleanup for scrolling back up to absolute top
        if (p < 0.02 && currentScene !== -1) {
          scenes[currentScene].exit();
          gsap.to(iconRef.current, { opacity: 1, scale: 1, y: 0, duration: 0.5 });
          currentScene = -1;
        }
      }
    });

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
        
        <div ref={containerRef} className="relative w-full h-full flex items-center justify-center z-20">
          
          {/* SCENE 1 ASSETS */}
          <div ref={iconRef} className="absolute z-20">
            <div className="w-40 h-40 md:w-56 md:h-56 rounded-[3rem] bg-white/5 backdrop-blur-3xl border border-white/10 flex items-center justify-center p-10 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)]">
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
                className="w-44 md:w-80 aspect-[3/4.2] rounded-[2.5rem] bg-white/5 backdrop-blur-3xl border border-white/10 p-8 md:p-10 flex flex-col justify-end shadow-2xl will-change-transform group overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-red-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative z-10">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-red-500 to-red-700 mb-8 flex items-center justify-center shadow-lg shadow-red-600/20">
                    <div className="w-3.5 h-3.5 bg-white rounded-full animate-pulse shadow-[0_0_15px_white]" />
                  </div>
                  <h4 className="text-3xl font-bold text-white mb-2 tracking-tight">{label}</h4>
                  <p className="text-white/30 text-sm font-medium leading-relaxed uppercase tracking-wider mb-6">Core Module 0{i+1}</p>
                  <div className="h-1 w-20 bg-red-500/50 rounded-full" />
                </div>
              </div>
            ))}
          </div>

          {/* SCENE 2 ASSETS: WIREFRAME HUD */}
          <div ref={wireframeRef} className="absolute inset-0 flex items-center justify-center pointer-events-none p-4 opacity-0 scale-90">
            <div className="w-full max-w-6xl aspect-video rounded-[4rem] border border-red-500/20 bg-red-500/[0.02] backdrop-blur-xl relative overflow-hidden shadow-[0_0_100px_rgba(239,68,68,0.05)]">
              {/* Complex Grid */}
              <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(239, 68, 68, 0.2) 1px, transparent 0)', backgroundSize: '40px 40px' }} />
              
              <div className="absolute inset-0 flex items-center justify-center">
                 <div className="w-2/3 h-2/3 border border-red-500/10 rounded-full animate-[spin_30s_linear_infinite]" />
                 <div className="absolute w-1/2 h-1/2 border border-red-500/20 rounded-full animate-[spin_15s_linear_infinite_reverse] border-dashed" />
                 <div className="absolute w-full h-[0.5px] bg-red-500/20 top-1/2 -translate-y-1/2" />
                 <div className="absolute w-[0.5px] h-full bg-red-500/20 left-1/2 -translate-x-1/2" />
              </div>

              {/* Data Points */}
              <div className="absolute inset-0">
                 {DATA_POINTS.map((pt, i) => (
                    <div key={i} className="absolute flex flex-col items-center" style={{ left: pt.left, top: pt.top }}>
                      <div className="w-2 h-2 bg-red-500 rounded-full shadow-[0_0_20px_rgba(239,68,68,1)] animate-ping absolute opacity-40" />
                      <div className="w-2 h-2 bg-red-500 rounded-full shadow-[0_0_10px_rgba(239,68,68,1)]" />
                    </div>
                 ))}
              </div>

              {/* HUD ELEMENTS */}
              <div className="absolute top-12 left-12 font-mono text-[11px] text-red-500/40 space-y-2 uppercase tracking-widest">
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-red-500 rounded-full animate-pulse" />
                  <span>Stream: Connected</span>
                </div>
                <div>Lat: 51.5074° N / Lon: 0.1278° W</div>
              </div>
            </div>
          </div>

          {/* SCENE 3 ASSETS: AI BUBBLE */}
          <div ref={bubbleRef} className="absolute pointer-events-none opacity-0 scale-50">
             <div className="relative">
                <div className="absolute inset-[-100px] rounded-full opacity-30 blur-3xl animate-pulse" style={{ background: 'radial-gradient(circle, rgba(239,68,68,0.4) 0%, transparent 70%)' }} />
                <div className="relative w-64 h-64 md:w-96 md:h-96 rounded-full bg-gradient-to-br from-[#121212] to-black border-[1px] border-white/10 shadow-2xl flex items-center justify-center p-16 overflow-hidden">
                   <div className="absolute inset-0 bg-gradient-to-t from-red-600/20 to-transparent" />
                   <div className="w-full h-full relative z-10 text-red-500/80">
                      <svg fill="currentColor" viewBox="0 0 24 24" className="w-full h-full animate-pulse-slow">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
                      </svg>
                   </div>
                   <div className="absolute -top-6 -right-6 w-20 h-20 bg-red-600 rounded-full flex items-center justify-center border-4 border-[#050505] shadow-xl">
                      <span className="text-white font-black text-4xl">!</span>
                   </div>
                </div>
             </div>
          </div>

        </div>

        {/* TEXT OVERLAY LAYER - Positioned to wrap around the central action */}
        <div className="absolute inset-0 z-10 pointer-events-none uppercase font-black italic tracking-tighter">
          
          <div ref={text1Ref} id="text-1" className="absolute top-[8%] left-1/2 -translate-x-1/2 w-full max-w-5xl text-center">
            <h2 className="text-5xl md:text-8xl text-white/90 mb-4 leading-none">
              {splitText("Total Asset Control")}
            </h2>
            <div className="h-1 w-32 bg-red-600/50 mx-auto" />
          </div>

          <div ref={text2Ref} id="text-2" className="absolute top-[12%] left-[5%] w-full max-w-2xl text-left">
            <h2 className="text-5xl md:text-8xl text-white/90 mb-6 leading-[0.8] whitespace-pre-line">
              {splitText("Live Fleet\nIntelligence")}
            </h2>
            <div className="h-2 w-32 bg-red-600/50 mb-8" />
            <p className="text-lg md:text-2xl text-white/30 max-w-sm font-light normal-case not-italic tracking-normal">
              Real-time situational awareness across every node in your network.
            </p>
          </div>

          <div ref={text3Ref} id="text-3" className="absolute bottom-[12%] right-[5%] w-full max-w-2xl text-right flex flex-col items-end">
            <h2 className="text-5xl md:text-8xl text-white/90 mb-6 leading-[0.8] whitespace-pre-line">
              {splitText("Predictive\nAlerts")}
            </h2>
            <div className="h-2 w-32 bg-red-600/50 mb-8" />
            <p className="text-lg md:text-2xl text-white/30 max-w-sm font-light normal-case not-italic tracking-normal">
              Stay ahead of failure points with proactive, AI-driven operational insights.
            </p>
          </div>

        </div>

      </div>

      <style jsx global>{`
        @keyframes pulse-slow {
          0%, 100% { transform: scale(1); opacity: 0.8; }
          50% { transform: scale(1.05); opacity: 1; }
        }
        .animate-pulse-slow {
          animation: pulse-slow 3s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}
