'use client';

import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { ArrowRight, Phone } from 'lucide-react';
import Link from 'next/link';

export default function SmartOperationsHeroScroll() {
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

  const step1Opacity = useTransform(smoothProgress, [0, 0.18, 0.32], [1, 1, 0]);
  const step1Scale = useTransform(smoothProgress, [0, 0.32], [1, 1.16]);
  const step1Y = useTransform(smoothProgress, [0, 0.32], ['0%', '-12%']);
  const step1Tracking = useTransform(smoothProgress, [0, 0.32], ['0em', '0.3em']);

  const step2Opacity = useTransform(smoothProgress, [0.26, 0.38, 0.6, 0.72], [0, 1, 1, 0]);
  const step2Scale = useTransform(smoothProgress, [0.26, 0.5, 0.72], [0.95, 1, 1.05]);
  const step2Y = useTransform(smoothProgress, [0.26, 0.72], ['10%', '-10%']);

  const step3Opacity = useTransform(smoothProgress, [0.68, 0.82, 1], [0, 1, 1]);
  const step3Y = useTransform(smoothProgress, [0.68, 1], ['10%', '0%']);
  const step3Scale = useTransform(smoothProgress, [0.68, 1], [0.95, 1]);

  const gridOpacity = useTransform(smoothProgress, [0, 0.5, 1], [0.15, 0.3, 0.14]);
  const gridY = useTransform(smoothProgress, [0, 1], ['0%', '-20%']);
  const glowX = useTransform(smoothProgress, [0, 1], ['-20%', '20%']);
  const glowY = useTransform(smoothProgress, [0, 1], ['-10%', '10%']);
  const phantomOpacity = useTransform(smoothProgress, [0, 0.35, 0.75, 1], [0.03, 0.08, 0.05, 0]);
  const phantomScale = useTransform(smoothProgress, [0, 1], [1, 1.5]);

  return (
    <section ref={containerRef} className="relative h-[500vh] bg-[#050505]">
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        <motion.div style={{ opacity: gridOpacity, y: gridY }} className="absolute inset-0 w-full h-[120%] bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:100px_100px]" />
        <motion.div style={{ x: glowX, y: glowY }} className="absolute top-1/4 left-1/4 w-[50vw] h-[50vw] bg-blue-500/20 rounded-full blur-[180px] opacity-30" />
        <motion.div style={{ x: useTransform(smoothProgress, [0, 1], ['20%', '-20%']), y: useTransform(smoothProgress, [0, 1], ['10%', '-10%']) }} className="absolute bottom-1/4 right-1/4 w-[42vw] h-[42vw] bg-purple-500/15 rounded-full blur-[180px] opacity-30" />
        <motion.div aria-hidden animate={{ borderRadius: ['46% 54% 66% 34% / 36% 44% 56% 64%', '59% 41% 48% 52% / 58% 38% 62% 42%', '42% 58% 34% 66% / 48% 64% 36% 52%', '46% 54% 66% 34% / 36% 44% 56% 64%'], rotate: [0, 8, -6, 0], scale: [1, 1.12, 0.95, 1] }} transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }} className="absolute top-[18%] right-[12%] w-[28vw] h-[28vw] min-w-[220px] min-h-[220px] bg-gradient-to-br from-blue-500/30 via-primary/10 to-white/10 blur-[2px] mix-blend-screen" />
        <motion.div aria-hidden animate={{ borderRadius: ['66% 34% 52% 48% / 44% 58% 42% 56%', '38% 62% 56% 44% / 62% 38% 52% 48%', '52% 48% 38% 62% / 42% 56% 44% 58%', '66% 34% 52% 48% / 44% 58% 42% 56%'], rotate: [0, -7, 5, 0], scale: [1, 0.94, 1.08, 1] }} transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }} className="absolute bottom-[15%] left-[10%] w-[22vw] h-[22vw] min-w-[180px] min-h-[180px] bg-gradient-to-tr from-purple-500/20 via-white/10 to-blue-500/20 blur-[3px] mix-blend-screen" />
        <motion.div style={{ opacity: phantomOpacity, scale: phantomScale }} className="absolute text-[22vw] font-black text-white uppercase leading-none select-none tracking-[0.16em] whitespace-nowrap z-0">OPS</motion.div>

        <div className="relative z-10 w-full h-full max-w-7xl mx-auto px-8 flex items-center justify-center">
          <motion.div style={{ opacity: step1Opacity, scale: step1Scale, y: step1Y, letterSpacing: step1Tracking }} className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
            <span className="text-primary text-xs md:text-sm font-black uppercase tracking-[0.8em] mb-10">Smart Operations</span>
            <h1 className="text-6xl md:text-[8vw] font-black text-white leading-[0.9] tracking-tighter">COMPLETE <span className="text-primary italic">CONTROL.</span><br /><span className="text-white/20">ONE PLATFORM.</span></h1>
          </motion.div>

          <motion.div style={{ opacity: step2Opacity, scale: step2Scale, y: step2Y }} className="absolute inset-0 flex flex-col items-center justify-center text-center z-20 px-6">
            <div className="max-w-5xl">
              <h2 className="text-4xl md:text-[6vw] font-black text-white leading-[0.95] tracking-tight mb-8">REAL-TIME <span className="text-primary">VISIBILITY.</span><br />PREDICTIVE DECISIONS.</h2>
              <div className="w-px h-16 bg-gradient-to-b from-primary to-transparent mx-auto mb-8" />
              <p className="text-lg md:text-3xl text-white/50 max-w-4xl mx-auto font-medium leading-tight tracking-wide">Map intelligence, live KPIs, maintenance automation, and driver analytics all synchronized in one command layer.</p>
            </div>
          </motion.div>

          <motion.div style={{ opacity: step3Opacity, y: step3Y, scale: step3Scale }} className="absolute inset-0 flex flex-col items-center justify-center text-center z-30 pointer-events-auto px-6">
            <div className="relative">
              <motion.div className="absolute -top-16 left-1/2 -translate-x-1/2 w-px h-12 bg-gradient-to-t from-white/30 to-transparent" style={{ scaleY: useTransform(smoothProgress, [0.68, 1], [0, 1]) }} />
              <h3 className="text-4xl md:text-[5vw] font-black text-white leading-[0.95] tracking-tighter mb-8">OPERATIONAL INTELLIGENCE<br /><span className="text-primary italic">AT FLEET SCALE</span></h3>
              <p className="text-white/50 text-lg md:text-2xl max-w-3xl mx-auto font-medium mb-10">Activate one connected workflow across every trip, vehicle, and driver.</p>
              <div className="flex flex-wrap justify-center gap-5">
                <Link href="#" className="px-10 py-4 bg-white text-black font-black uppercase tracking-[0.2em] text-sm hover:bg-primary transition-colors rounded-full shadow-[0_0_36px_rgba(255,255,255,0.08)] inline-flex items-center gap-3">
                  <Phone className="w-4 h-4" /> Request a Demo
                </Link>
                <Link href="#live-map" className="px-10 py-4 bg-transparent border-2 border-white/10 text-white font-black uppercase tracking-[0.2em] text-sm hover:border-white transition-all rounded-full inline-flex items-center gap-3">
                  Explore Features <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]" />
      </div>
    </section>
  );
}
