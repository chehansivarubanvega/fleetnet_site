'use client';

import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { useRef } from 'react';

export default function HeroScroll() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 70,
    damping: 25,
    restDelta: 0.001
  });

  const step1Opacity = useTransform(smoothProgress, [0, 0.2, 0.3], [1, 1, 0]);
  const step1Scale = useTransform(smoothProgress, [0, 0.3], [1, 1.2]);
  const step1Y = useTransform(smoothProgress, [0, 0.3], ["0%", "-10%"]);
  const step1Tracking = useTransform(smoothProgress, [0, 0.3], ["0em", "0.5em"]);
  
  const step2Opacity = useTransform(smoothProgress, [0.25, 0.35, 0.55, 0.65], [0, 1, 1, 0]);
  const step2Scale = useTransform(smoothProgress, [0.25, 0.45, 0.65], [0.95, 1, 1.05]);
  const step2Y = useTransform(smoothProgress, [0.25, 0.65], ["10%", "-10%"]);

  const step3Opacity = useTransform(smoothProgress, [0.6, 0.75, 1], [0, 1, 1]);
  const step3Y = useTransform(smoothProgress, [0.6, 1], ["10%", "0%"]);
  const step3Scale = useTransform(smoothProgress, [0.6, 1], [0.95, 1]);

  const gridOpacity = useTransform(smoothProgress, [0, 0.5, 1], [0.15, 0.3, 0.15]);
  const gridY = useTransform(smoothProgress, [0, 1], ["0%", "-20%"]);
  const glowX = useTransform(smoothProgress, [0, 1], ["-20%", "20%"]);
  const glowY = useTransform(smoothProgress, [0, 1], ["-10%", "10%"]);
  const phantomOpacity = useTransform(smoothProgress, [0, 0.3, 0.7, 1], [0.03, 0.08, 0.05, 0]);
  const phantomScale = useTransform(smoothProgress, [0, 1], [1, 1.5]);

  return (
    <section ref={containerRef} className="relative h-[250vh] md:h-[600vh] bg-[#050505]">
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden pointer-events-none">
        <motion.div 
          style={{ opacity: gridOpacity, y: gridY }}
          className="absolute inset-0 w-full h-[120%] bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:60px_60px] md:bg-[size:100px_100px]"
        />
        <motion.div 
          style={{ x: glowX, y: glowY }}
          className="absolute top-1/4 left-1/4 w-[80vw] md:w-[50vw] h-[80vw] md:h-[50vw] bg-primary/20 rounded-full blur-[100px] md:blur-[180px] opacity-30" 
        />
        <motion.div 
          style={{ x: useTransform(smoothProgress, [0, 1], ["20%", "-20%"]), y: useTransform(smoothProgress, [0, 1], ["10%", "-10%"]) }}
          className="absolute bottom-1/4 right-1/4 w-[70vw] md:w-[40vw] h-[70vw] md:h-[40vw] bg-red-500/10 rounded-full blur-[100px] md:blur-[180px] opacity-30" 
        />
        <motion.div 
          style={{ opacity: phantomOpacity, scale: phantomScale }}
          className="absolute text-[40vw] md:text-[30vw] font-black text-white uppercase leading-none select-none tracking-widest whitespace-nowrap z-0"
        >
          SCALING
        </motion.div>

        <div className="relative z-10 w-full h-full max-w-7xl mx-auto px-6 md:px-8 flex items-center justify-center">
          <motion.div 
            style={{ opacity: step1Opacity, scale: step1Scale, y: step1Y, letterSpacing: step1Tracking }}
            className="absolute inset-0 flex flex-col items-center justify-center px-4"
          >
            <motion.span 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-primary text-[10px] sm:text-xs md:text-sm font-black uppercase tracking-[0.6em] md:tracking-[0.8em] mb-8 md:mb-12"
            >
              The Next Evolution
            </motion.span>
            <h1 className="text-4xl xs:text-5xl md:text-[8vw] font-black text-white leading-[0.95] md:leading-[0.9] tracking-tighter text-center uppercase">
              ENGINEERED FOR<br/>
              <span className="text-white/20 italic tracking-tight">PERFORMANCE</span>
            </h1>
          </motion.div>

          <motion.div 
            style={{ opacity: step2Opacity, scale: step2Scale, y: step2Y }}
            className="absolute inset-0 flex flex-col items-center justify-center text-center z-20 pointer-events-none px-4"
          >
            <div className="max-w-5xl">
               <h2 className="text-3xl xs:text-4xl md:text-[6vw] font-black text-white leading-[0.95] tracking-tight mb-6 md:mb-8 uppercase">
                 INDUSTRY-SPECIFIC<br/>
                 <span className="text-primary tracking-[0.05em] md:tracking-[0.1em]">INTELLIGENCE</span>
               </h2>
               <div className="w-px h-12 md:h-16 bg-gradient-to-b from-primary to-transparent mx-auto mb-6 md:mb-8" />
               <p className="text-[15px] xs:text-base sm:text-lg md:text-3xl text-white/50 max-w-3xl mx-auto font-medium leading-tight tracking-wide">
                 Beyond standard tracking. We build software architectures that reflect your operational reality.
               </p>
            </div>
          </motion.div>

          <motion.div 
            style={{ opacity: step3Opacity, y: step3Y, scale: step3Scale }}
            className="absolute inset-0 flex flex-col items-center justify-center text-center z-30 px-4 mt-8 md:mt-0"
          >
            <div className="relative">
               <motion.div 
                  className="absolute -top-12 md:-top-16 left-1/2 -translate-x-1/2 w-px h-8 md:h-12 bg-gradient-to-t from-white/30 to-transparent"
                  style={{ scaleY: useTransform(smoothProgress, [0.6, 1], [0, 1]) }}
               />
               <h3 className="text-3xl xs:text-4xl md:text-[5vw] font-black text-white leading-[0.95] tracking-tighter mb-8 md:mb-10 uppercase">
                 TRANSFORMING THE <span className="text-primary italic text-center">SECTORS</span><br/>
                 THAT MOVE THE WORLD
               </h3>
               <div className="flex items-center justify-center gap-4 sm:gap-6 text-white/40 text-[10px] sm:text-xs font-black uppercase tracking-[0.4em] md:tracking-[0.6em]">
                  <span className="w-8 md:w-12 h-[2px] bg-white/10" />
                  Scroll to Explore
                  <span className="w-8 md:w-12 h-[2px] bg-white/10" />
               </div>
            </div>
          </motion.div>
        </div>
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]" />
      </div>
    </section>
  );
}
