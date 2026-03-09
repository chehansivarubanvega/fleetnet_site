'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowDown } from 'lucide-react';

export default function Hero() {
  const [mounted, setMounted] = React.useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  React.useEffect(() => {
    setMounted(true);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Scene 1: Hero Content (0% -> 15% scroll) — exits quickly
  const heroOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 0.15], [0, -50]);
  const heroX = useTransform(scrollYProgress, [0, 0.15], [0, -150]);
  
  // Mockup Choreography (Interpolation)
  const mockupScale = useTransform(scrollYProgress, [0, 0.3], [1, 0.4]);
  const mockupOpacity = useTransform(scrollYProgress, [0.3, 0.4], [1, 0]);

  // Independent Mockup Movements
  const desktopY = useTransform(scrollYProgress, [0, 0.3], [0, -600]);
  const desktopRotate = useTransform(scrollYProgress, [0, 0.3], [0, -15]);
  
  const mobileY = useTransform(scrollYProgress, [0, 0.3], [0, 600]);
  const mobileRotate = useTransform(scrollYProgress, [0, 0.3], [0, 15]);
  
  const mockupRotate = useTransform(scrollYProgress, [0, 0.3], [0, 5]);
  
  // Scene 2: Mission Content — starts sooner, tighter stagger
  const missionBadgeOpacity = useTransform(scrollYProgress, [0.4, 0.48], [0, 1]);
  const missionBadgeY = useTransform(scrollYProgress, [0.4, 0.48], [40, 0]);
  const missionBadgeClip = useTransform(scrollYProgress, [0.4, 0.48], ["inset(100% 0 0 0)", "inset(0% 0 0 0)"]);

  const missionH1Opacity = useTransform(scrollYProgress, [0.46, 0.56], [0, 1]);
  const missionH1Y = useTransform(scrollYProgress, [0.46, 0.56], [60, 0]);
  const missionH1Clip = useTransform(scrollYProgress, [0.46, 0.56], ["inset(100% 0 0 0)", "inset(0% 0 0 0)"]);

  const missionH2Opacity = useTransform(scrollYProgress, [0.52, 0.62], [0, 1]);
  const missionH2Y = useTransform(scrollYProgress, [0.52, 0.62], [60, 0]);
  const missionH2Clip = useTransform(scrollYProgress, [0.52, 0.62], ["inset(100% 0 0 0)", "inset(0% 0 0 0)"]);

  const missionPOpacity = useTransform(scrollYProgress, [0.58, 0.68], [0, 1]);
  const missionPY = useTransform(scrollYProgress, [0.58, 0.68], [40, 0]);
  const missionPClip = useTransform(scrollYProgress, [0.58, 0.68], ["inset(100% 0 0 0)", "inset(0% 0 0 0)"]);

  // Global exit for Scene 2
  const missionExitOpacity = useTransform(scrollYProgress, [0.85, 1], [1, 0]);

  // Fallback values for SSR to prevent hydration mismatch
  const currentHeroOpacity = mounted ? heroOpacity : 1;
  const currentHeroY = mounted ? heroY : 0;
  const currentHeroX = mounted ? heroX : 0;
  const currentMockupOpacity = mounted ? mockupOpacity : 1;
  const currentMockupScale = mounted ? mockupScale : 1;
  
  const currentDesktopY = mounted ? desktopY : 0;
  const currentDesktopRotate = mounted ? desktopRotate : 0;
  
  const currentMobileY = mounted ? mobileY : 0;
  const currentMobileRotate = mounted ? mobileRotate : 0;
  
  const currentMockupRotate = mounted ? mockupRotate : 0;

  // Mission Fallbacks
  const currentMissionBadgeOpacity = mounted ? missionBadgeOpacity : 0;
  const currentMissionBadgeY = mounted ? missionBadgeY : 40;
  const currentMissionBadgeClip = mounted ? missionBadgeClip : "inset(100% 0 0 0)";

  const currentMissionH1Opacity = mounted ? missionH1Opacity : 0;
  const currentMissionH1Y = mounted ? missionH1Y : 60;
  const currentMissionH1Clip = mounted ? missionH1Clip : "inset(100% 0 0 0)";

  const currentMissionH2Opacity = mounted ? missionH2Opacity : 0;
  const currentMissionH2Y = mounted ? missionH2Y : 60;
  const currentMissionH2Clip = mounted ? missionH2Clip : "inset(100% 0 0 0)";

  const currentMissionPOpacity = mounted ? missionPOpacity : 0;
  const currentMissionPY = mounted ? missionPY : 40;
  const currentMissionPClip = mounted ? missionPClip : "inset(100% 0 0 0)";

  const currentMissionExitOpacity = mounted ? missionExitOpacity : 1;

  return (
    <section 
      ref={containerRef}
      className="relative h-[300vh] w-full"
    >
      {/* Sticky Stage */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center">
        
        <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12 w-full h-full flex items-center">
          
          {/* Scene 1: Hero Text (Left Aligned Entrance Animation) */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            style={{ opacity: currentHeroOpacity, y: currentHeroY, x: currentHeroX }}
            className="w-full lg:w-1/2 z-30 will-change-transform"
          >
            <div className="text-left">
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                className="text-7xl md:text-[120px] font-bold text-white leading-[0.9] mb-10 tracking-tighter"
              >
                Revolution <br />
                in your <br />
                <span className="text-black/40">fleet</span>
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                className="text-xl md:text-2xl text-white/90 mb-12 leading-relaxed font-medium max-w-xl"
              >
                A data-driven platform to monitor assets, optimize fuel consumption, 
                and transition to sustainable mobility.
              </motion.p>
              <motion.button 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
                className="px-12 py-6 bg-white text-black rounded-full font-bold hover:scale-105 transition-transform shadow-2xl text-lg"
              >
                Request a Demo
              </motion.button>
            </div>
          </motion.div>

          {/* Scene 2: Mission Text (Centered with Staggered Clip-Path Reveal) */}
          <motion.div 
            style={{ opacity: currentMissionExitOpacity }}
            className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 z-30 pointer-events-none will-change-transform"
          >
            {/* Badge Reveal */}
            <motion.div 
              style={{ 
                opacity: currentMissionBadgeOpacity, 
                y: currentMissionBadgeY,
                clipPath: currentMissionBadgeClip
              }}
              className="inline-flex items-center px-10 py-4 rounded-full border border-white/20 bg-black/30 backdrop-blur-2xl mb-14"
            >
              <span className="text-white text-sm font-bold tracking-[0.4em] uppercase">
                The industry favors the legacy, not the efficient.
              </span>
            </motion.div>

            {/* Heading Reveal - Line 1 */}
            <motion.h2 
              style={{ 
                opacity: currentMissionH1Opacity, 
                y: currentMissionH1Y,
                clipPath: currentMissionH1Clip
              }}
              className="text-6xl md:text-[100px] font-bold text-white leading-[1] mb-4 max-w-6xl tracking-tight"
            >
              We&apos;re changing that.
            </motion.h2>

            {/* Heading Reveal - Line 2 */}
            <motion.h2 
              style={{ 
                opacity: currentMissionH2Opacity, 
                y: currentMissionH2Y,
                clipPath: currentMissionH2Clip
              }}
              className="text-6xl md:text-[100px] font-bold text-white leading-[1] mb-14 max-w-6xl tracking-tight"
            >
              One optimized route at a time.
            </motion.h2>

            {/* Paragraph Reveal */}
            <motion.p 
              style={{ 
                opacity: currentMissionPOpacity, 
                y: currentMissionPY,
                clipPath: currentMissionPClip
              }}
              className="text-2xl md:text-3xl text-white/70 max-w-4xl leading-relaxed font-medium"
            >
              FleetNET honors the organizations rewriting the rules of logistics—locally rooted, 
              community-loved, often underrepresented or overlooked, but driven by mission 
              and built with care.
            </motion.p>
          </motion.div>

          {/* Mockup Choreography Container (Starts on the Right) */}
          <motion.div
            style={{ 
              opacity: currentMockupOpacity,
              scale: currentMockupScale,
              rotate: currentMockupRotate
            }}
            className="absolute right-0 top-0 bottom-0 w-full lg:w-1/2 flex items-center justify-center pointer-events-none z-20 will-change-transform"
          >
            <div className="relative w-full h-full flex items-center justify-center p-6 lg:p-12">
              
              {/* Desktop Monitor Mockup (Idle Float + Scroll Up) */}
              <motion.div
                style={{ 
                  y: currentDesktopY,
                  rotate: currentDesktopRotate
                }}
                animate={{ y: [0, -15, 0] }}
                transition={{ 
                  y: { duration: 6, repeat: Infinity, ease: [0.45, 0, 0.55, 1] }
                }}
                className="absolute w-full max-w-[700px] aspect-[16/10] bg-[#0a0a0a] rounded-[1.5rem] lg:rounded-[2.5rem] p-2 lg:p-4 shadow-[0_80px_160px_-40px_rgba(0,0,0,0.9)] border border-white/20 will-change-transform"
              >
                <div className="relative w-full h-full rounded-lg lg:rounded-2xl overflow-hidden bg-black ring-1 ring-white/10">
                  <Image 
                    src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1200" 
                    alt="Desktop Dashboard" 
                    fill 
                    className="object-cover opacity-90"
                    referrerPolicy="no-referrer"
                  />
                  {/* Glass Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent pointer-events-none" />
                </div>
                {/* Monitor Stand Refined */}
                <div className="absolute -bottom-8 lg:-bottom-10 left-1/2 -translate-x-1/2 w-32 lg:w-56 h-8 lg:h-10 bg-gradient-to-b from-[#1a1a1a] to-[#0a0a0a] rounded-t-2xl lg:rounded-t-3xl border-x border-t border-white/10" />
                <div className="absolute -bottom-10 lg:-bottom-12 left-1/2 -translate-x-1/2 w-40 lg:w-64 h-2 bg-black/40 blur-md rounded-full" />
              </motion.div>

              {/* Mobile Phone Mockup (Idle Float + Scroll Down) */}
              <motion.div
                style={{ 
                  y: currentMobileY,
                  rotate: currentMobileRotate
                }}
                animate={{ y: [0, 20, 0] }}
                transition={{ 
                  y: { duration: 5, repeat: Infinity, ease: [0.45, 0, 0.55, 1], delay: 0.5 }
                }}
                className="absolute right-[5%] bottom-[15%] lg:bottom-[10%] w-[160px] lg:w-[240px] aspect-[9/19.5] rounded-[2.5rem] lg:rounded-[4rem] p-2 lg:p-3.5 bg-[#0a0a0a] shadow-[0_60px_120px_-25px_rgba(0,0,0,0.95)] border border-white/20 z-30 will-change-transform"
              >
                {/* Dynamic Island */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 lg:w-32 h-5 lg:h-8 bg-[#0a0a0a] rounded-b-[1rem] lg:rounded-b-[2rem] z-40 border-x border-b border-white/5" />
                
                <div className="relative w-full h-full rounded-[2.2rem] lg:rounded-[3.5rem] overflow-hidden bg-black ring-1 ring-white/10">
                  <Image 
                    src="https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&q=80&w=800" 
                    alt="Mobile App" 
                    fill 
                    className="object-cover opacity-90"
                    referrerPolicy="no-referrer"
                  />
                  {/* Glass Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent pointer-events-none" />
                </div>
                
                {/* Side Buttons */}
                <div className="absolute -left-[2px] top-24 lg:top-32 w-[2px] lg:w-[3px] h-8 lg:h-12 bg-white/10 rounded-r-sm" />
                <div className="absolute -right-[2px] top-32 lg:top-40 w-[2px] lg:w-[3px] h-12 lg:h-20 bg-white/10 rounded-l-sm" />
              </motion.div>

            </div>
          </motion.div>

        </div>

        {/* Scroll Down Indicator */}
        <motion.div
          style={{ opacity: currentHeroOpacity }}
          className="absolute bottom-12 left-12 flex items-center gap-4 text-white/30 cursor-pointer hover:text-white transition-colors group z-40"
          onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
        >
          <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:border-white transition-colors bg-white/5 backdrop-blur-sm">
            <ArrowDown className="w-5 h-5 animate-bounce" />
          </div>
          <span className="text-sm font-bold uppercase tracking-[0.4em]">Scroll down</span>
        </motion.div>
      </div>
    </section>
  );
}
