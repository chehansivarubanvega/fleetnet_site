'use client';

import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { useRef } from 'react';

export default function AboutHeroScroll() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 70,
    damping: 25,
    restDelta: 0.001
  });

  // Responsive ranges for transforms
  // We'll use a simple helper or just maintain standard ranges that work well for both
  // But since the container height changes, we might need a way to check for mobile
  // However, scrollYProgress is 0-1 regardless of height.
  // The only difference is how FAST the user scrolls through it.
  
  const step1Opacity = useTransform(smoothProgress, [0, 0.18, 0.3], [1, 1, 0]);
  const step1Scale = useTransform(smoothProgress, [0, 0.3], [1, 1.15]);
  const step1Y = useTransform(smoothProgress, [0, 0.3], ['0%', '-12%']);
  const step1Tracking = useTransform(smoothProgress, [0, 0.3], ['0em', '0.35em']);

  const step2Opacity = useTransform(smoothProgress, [0.25, 0.38, 0.58, 0.7], [0, 1, 1, 0]);
  const step2Scale = useTransform(smoothProgress, [0.25, 0.5, 0.7], [0.94, 1, 1.05]);
  const step2Y = useTransform(smoothProgress, [0.25, 0.7], ['12%', '-12%']);

  const step3Opacity = useTransform(smoothProgress, [0.66, 0.8, 1], [0, 1, 1]);
  const step3Y = useTransform(smoothProgress, [0.66, 1], ['10%', '0%']);
  const step3Scale = useTransform(smoothProgress, [0.66, 1], [0.95, 1]);

  const gridOpacity = useTransform(smoothProgress, [0, 0.5, 1], [0.15, 0.28, 0.14]);
  const gridY = useTransform(smoothProgress, [0, 1], ['0%', '-20%']);
  const glowX = useTransform(smoothProgress, [0, 1], ['-20%', '22%']);
  const glowY = useTransform(smoothProgress, [0, 1], ['-8%', '12%']);
  const phantomOpacity = useTransform(smoothProgress, [0, 0.35, 0.72, 1], [0.03, 0.08, 0.05, 0]);
  const phantomScale = useTransform(smoothProgress, [0, 1], [1, 1.45]);

  return (
    <section ref={containerRef} className="relative h-[250vh] md:h-[500vh] bg-[#050505]">
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden pointer-events-none">
        <motion.div style={{ opacity: gridOpacity, y: gridY }} className="absolute inset-0 w-full h-[120%] bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:60px_60px] md:bg-[size:100px_100px]" />
        <motion.div style={{ x: glowX, y: glowY }} className="absolute top-1/4 left-1/4 w-[80vw] md:w-[50vw] h-[80vw] md:h-[50vw] bg-primary/20 rounded-full blur-[100px] md:blur-[180px] opacity-35" />
        <motion.div style={{ x: useTransform(smoothProgress, [0, 1], ['18%', '-20%']), y: useTransform(smoothProgress, [0, 1], ['12%', '-10%']) }} className="absolute bottom-1/4 right-1/4 w-[70vw] md:w-[40vw] h-[70vw] md:h-[40vw] bg-red-500/10 rounded-full blur-[100px] md:blur-[180px] opacity-30" />
        <motion.div aria-hidden animate={{ borderRadius: ['46% 54% 66% 34% / 36% 44% 56% 64%', '59% 41% 48% 52% / 58% 38% 62% 42%', '42% 58% 34% 66% / 48% 64% 36% 52%', '46% 54% 66% 34% / 36% 44% 56% 64%'], rotate: [0, 8, -6, 0], scale: [1, 1.12, 0.96, 1] }} transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }} className="absolute top-[18%] right-[14%] w-[40vw] md:w-[28vw] h-[40vw] md:h-[28vw] min-w-[200px] min-h-[200px] bg-gradient-to-br from-primary/25 via-primary/10 to-white/10 blur-[2px] mix-blend-screen opacity-40 md:opacity-100" />
        <motion.div aria-hidden animate={{ borderRadius: ['66% 34% 52% 48% / 44% 58% 42% 56%', '38% 62% 56% 44% / 62% 38% 52% 48%', '52% 48% 38% 62% / 42% 56% 44% 58%', '66% 34% 52% 48% / 44% 58% 42% 56%'], rotate: [0, -7, 5, 0], scale: [1, 0.94, 1.08, 1] }} transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }} className="absolute bottom-[16%] left-[10%] w-[35vw] md:w-[22vw] h-[35vw] md:h-[22vw] min-w-[160px] min-h-[160px] bg-gradient-to-tr from-white/10 via-primary/10 to-primary/25 blur-[3px] mix-blend-screen opacity-40 md:opacity-100" />
        <motion.div style={{ opacity: phantomOpacity, scale: phantomScale }} className="absolute text-[35vw] md:text-[24vw] font-black text-white uppercase leading-none select-none tracking-[0.18em] whitespace-nowrap z-0">ABOUT</motion.div>

        <div className="relative z-10 w-full h-full max-w-7xl mx-auto px-6 md:px-8 flex items-center justify-center">
          <motion.div style={{ opacity: step1Opacity, scale: step1Scale, y: step1Y, letterSpacing: step1Tracking }} className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
            <span className="text-primary text-[10px] sm:text-xs md:text-sm font-black uppercase tracking-[0.6em] md:tracking-[0.8em] mb-8 md:mb-12">About FleetNET</span>
            <h1 className="text-4xl xs:text-5xl md:text-[8vw] font-black text-white leading-[0.95] md:leading-[0.9] tracking-tighter">DRIVEN BY<br /><span className="text-white/25 italic tracking-tight">INNOVATION</span></h1>
          </motion.div>

          <motion.div style={{ opacity: step2Opacity, scale: step2Scale, y: step2Y }} className="absolute inset-0 flex flex-col items-center justify-center text-center z-20 px-4 mt-8 md:mt-0">
            <div className="max-w-5xl">
              <h2 className="text-3xl xs:text-4xl md:text-[6vw] font-black text-white leading-[0.95] tracking-tight mb-6 md:mb-8">ONE COMPANY.<br /><span className="text-primary tracking-[0.05em] md:tracking-[0.1em]">FULL-STACK CONTROL.</span></h2>
              <div className="w-px h-12 md:h-16 bg-gradient-to-b from-primary to-transparent mx-auto mb-6 md:mb-8" />
              <p className="text-[15px] xs:text-base sm:text-lg md:text-3xl text-white/50 max-w-2xl md:max-w-3xl mx-auto font-medium leading-tight tracking-wide">FleetNET GLOBAL was built to own the complete journey from sensor hardware to operational intelligence.</p>
            </div>
          </motion.div>

          <motion.div style={{ opacity: step3Opacity, y: step3Y, scale: step3Scale }} className="absolute inset-0 flex flex-col items-center justify-center text-center z-30 pointer-events-auto px-4 mt-12 md:mt-0">
            <div className="relative">
              <motion.div className="absolute -top-12 md:-top-16 left-1/2 -translate-x-1/2 w-px h-8 md:h-12 bg-gradient-to-t from-white/30 to-transparent" style={{ scaleY: useTransform(smoothProgress, [0.66, 1], [0, 1]) }} />
              <h3 className="text-3xl xs:text-4xl md:text-[5vw] font-black text-white leading-[0.95] tracking-tighter mb-6 md:mb-8 text-center">A LEGACY BUILT<br /><span className="text-primary italic">WITH PURPOSE</span></h3>
              <p className="text-white/50 text-[15px] xs:text-base md:text-2xl max-w-2xl md:max-w-3xl mx-auto font-medium mb-8 md:mb-10 text-center">Discover how Sri Lankan engineering and customer-first execution shaped our platform.</p>
              <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-5">
                <button className="w-full sm:w-auto px-8 md:px-10 py-3.5 md:py-4 bg-white text-black font-black uppercase tracking-[0.2em] text-xs md:text-sm hover:bg-primary transition-colors rounded-full shadow-[0_0_36px_rgba(255,255,255,0.08)]">Partner With Us</button>
                <button className="w-full sm:w-auto px-8 md:px-10 py-3.5 md:py-4 bg-transparent border-2 border-white/10 text-white font-black uppercase tracking-[0.2em] text-xs md:text-sm hover:border-white transition-all rounded-full">Join Our Mission</button>
              </div>
            </div>
          </motion.div>
        </div>
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]" />
      </div>
    </section>
  );
}
