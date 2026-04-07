'use client';

import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { useRef } from 'react';

export default function HeroScroll() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Track scroll progress within the 600vh container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 70,
    damping: 25,
    restDelta: 0.001
  });

  // Layer 1: Massive Heading (0% -> 30%)
  const step1Opacity = useTransform(smoothProgress, [0, 0.2, 0.3], [1, 1, 0]);
  const step1Scale = useTransform(smoothProgress, [0, 0.3], [1, 1.2]);
  const step1Y = useTransform(smoothProgress, [0, 0.3], ["0%", "-10%"]);
  const step1Tracking = useTransform(smoothProgress, [0, 0.3], ["0em", "0.5em"]);
  
  // Layer 2: Floating Spec Text (30% -> 65%)
  const step2Opacity = useTransform(smoothProgress, [0.25, 0.35, 0.55, 0.65], [0, 1, 1, 0]);
  const step2Scale = useTransform(smoothProgress, [0.25, 0.45, 0.65], [0.95, 1, 1.05]);
  const step2Y = useTransform(smoothProgress, [0.25, 0.65], ["10%", "-10%"]);

  // Layer 3: Final Call to Action (65% -> 100%)
  const step3Opacity = useTransform(smoothProgress, [0.6, 0.75, 1], [0, 1, 1]);
  const step3Y = useTransform(smoothProgress, [0.6, 1], ["10%", "0%"]);
  const step3Scale = useTransform(smoothProgress, [0.6, 1], [0.95, 1]);

  // Abstract Background Elements
  const gridOpacity = useTransform(smoothProgress, [0, 0.5, 1], [0.15, 0.3, 0.15]);
  const gridY = useTransform(smoothProgress, [0, 1], ["0%", "-20%"]);
  
  const glowX = useTransform(smoothProgress, [0, 1], ["-20%", "20%"]);
  const glowY = useTransform(smoothProgress, [0, 1], ["-10%", "10%"]);
  
  const phantomOpacity = useTransform(smoothProgress, [0, 0.3, 0.7, 1], [0.03, 0.08, 0.05, 0]);
  const phantomScale = useTransform(smoothProgress, [0, 1], [1, 1.5]);

  return (
    // DANGER: Do NOT add `overflow-hidden` to this section wrapper.
    // It breaks `position: sticky` on child elements, causing the entire hero to scroll away instantly.
    <section ref={containerRef} className="relative h-[600vh] bg-[#050505]">
      
      {/* Cinematic Sticky Layer. overflow-hidden goes here. */}
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden pointer-events-none">
        
        {/* Abstract Responsive Grid */}
        <motion.div 
          style={{ opacity: gridOpacity, y: gridY }}
          className="absolute inset-0 w-full h-[120%] bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:100px_100px]"
        />

        {/* Dynamic Glowing Orbs */}
        <motion.div 
          style={{ x: glowX, y: glowY }}
          className="absolute top-1/4 left-1/4 w-[50vw] h-[50vw] bg-primary/20 rounded-full blur-[180px] opacity-30" 
        />
        <motion.div 
          style={{ x: useTransform(smoothProgress, [0, 1], ["20%", "-20%"]), y: useTransform(smoothProgress, [0, 1], ["10%", "-10%"]) }}
          className="absolute bottom-1/4 right-1/4 w-[40vw] h-[40vw] bg-red-500/10 rounded-full blur-[180px] opacity-30" 
        />

        {/* Phantom Text (Subtle background texture) */}
        <motion.div 
          style={{ opacity: phantomOpacity, scale: phantomScale }}
          className="absolute text-[30vw] font-black text-white uppercase leading-none select-none tracking-widest whitespace-nowrap z-0"
        >
          SCALING
        </motion.div>

        {/* Floating Narrative Content */}
        <div className="relative z-10 w-full h-full max-w-7xl mx-auto px-8 flex items-center justify-center">
          
          {/* Layer 1: The Foundation */}
          <motion.div 
            style={{ opacity: step1Opacity, scale: step1Scale, y: step1Y, letterSpacing: step1Tracking }}
            className="absolute inset-0 flex flex-col items-center justify-center"
          >
            <motion.span 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-primary text-xs md:text-sm font-black uppercase tracking-[0.8em] mb-12"
            >
              The Next Evolution
            </motion.span>
            <h1 className="text-6xl md:text-[8vw] font-black text-white leading-[0.9] tracking-tighter text-center">
              ENGINEERED FOR<br/>
              <span className="text-white/20 italic tracking-tight">PERFORMANCE</span>
            </h1>
          </motion.div>

          {/* Layer 2: The Logic */}
          <motion.div 
            style={{ opacity: step2Opacity, scale: step2Scale, y: step2Y }}
            className="absolute inset-0 flex flex-col items-center justify-center text-center z-20 pointer-events-none"
          >
            <div className="max-w-5xl px-6">
               <h2 className="text-4xl md:text-[6vw] font-black text-white leading-[0.95] tracking-tight mb-8">
                 INDUSTRY-SPECIFIC<br/>
                 <span className="text-primary tracking-[0.1em]">INTELLIGENCE</span>
               </h2>
               <div className="w-px h-16 bg-gradient-to-b from-primary to-transparent mx-auto mb-8" />
               <p className="text-lg md:text-3xl text-white/50 max-w-3xl mx-auto font-medium leading-tight tracking-wide">
                 Beyond standard tracking. We build software architectures that reflect your operational reality.
               </p>
            </div>
          </motion.div>

          {/* Layer 3: The Result (Final Impact) */}
          <motion.div 
            style={{ opacity: step3Opacity, y: step3Y, scale: step3Scale }}
            className="absolute inset-0 flex flex-col items-center justify-center text-center z-30"
          >
            <div className="relative px-6">
               <motion.div 
                  className="absolute -top-16 left-1/2 -translate-x-1/2 w-px h-12 bg-gradient-to-t from-white/30 to-transparent"
                  style={{ scaleY: useTransform(smoothProgress, [0.6, 1], [0, 1]) }}
               />
               <h3 className="text-4xl md:text-[5vw] font-black text-white leading-[0.95] tracking-tighter mb-10">
                 TRANSFORMING THE <span className="text-primary italic">SECTORS</span><br/>
                 THAT MOVE THE WORLD
               </h3>
               <div className="flex items-center justify-center gap-6 text-white/40 text-xs font-black uppercase tracking-[0.6em]">
                  <span className="w-12 h-[2px] bg-white/10" />
                  Scroll to Explore
                  <span className="w-12 h-[2px] bg-white/10" />
               </div>
            </div>
          </motion.div>

        </div>

        {/* Ambient Overlay: Film Grain or Noise */}
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]" />
      </div>

    </section>
  );
}
