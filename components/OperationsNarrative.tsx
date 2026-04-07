'use client';

import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'motion/react';
import { useEffect, useRef, useState } from 'react';
import { Activity, ShieldCheck, Gauge, Command, Target, Zap } from 'lucide-react';

/**
 * High-tech "Surgical HUD" Operations Narrative.
 * Refined for clinical readability and optimal scroll dwell time.
 */
export default function OperationsNarrative() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Narrative Phasing with "Plateau" Dwell Time
  const phase1 = useTransform(scrollYProgress, [0, 0.05, 0.25, 0.35], [0, 1, 1, 0]);
  const phase2 = useTransform(scrollYProgress, [0.35, 0.45, 0.65, 0.75], [0, 1, 1, 0]);
  const phase3 = useTransform(scrollYProgress, [0.75, 0.85, 0.9, 0.95], [0, 1, 1, 0]);
  
  // Transition 'Implosion' Outro (Final 10%)
  const outroProgress = useTransform(scrollYProgress, [0.9, 1.0], [0, 1]);
  const hudScale = useTransform(outroProgress, [0, 1], [1, 0]);
  const focalPointOpacity = useTransform(outroProgress, [0.8, 1.0], [0, 1]);
  
  const personaOpacities = [phase1, phase2, phase3];

  // Dynamic Metric Jitter Loop
  const [latency, setLatency] = useState(88);
  const [safety, setSafety] = useState(94.8);
  const [roi, setRoi] = useState(2.4);

  useEffect(() => {
    const interval = setInterval(() => {
      setLatency(prev => +(prev + (Math.random() * 4 - 2)).toFixed(0));
      setSafety(prev => +(prev + (Math.random() * 0.2 - 0.1)).toFixed(1));
      setRoi(prev => +(prev + (Math.random() * 0.04 - 0.02)).toFixed(2));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div ref={containerRef} className="relative h-[500vh] bg-[#050505] overflow-clip" id="operations-narrative">
      
      {/* HUD Background Architecture */}
      <motion.div 
        style={{ scale: hudScale, opacity: useTransform(outroProgress, [0, 0.5], [1, 0]) }}
        className="sticky top-0 h-screen w-full pointer-events-none overflow-hidden"
      >
        {/* Coordinate Grid (Fainter to prioritize content) */}
        <div className="absolute inset-0 opacity-[0.02]" 
             style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '100px 100px' }} 
        />
        {/* Dynamic Scanline */}
        <motion.div 
          animate={{ top: ['0%', '100%'] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
          className="absolute left-0 w-full h-[1px] bg-blue-500/10 z-10"
        />
        {/* Technical Corner Telemetry */}
        <div className="absolute top-12 left-12 font-mono text-[9px] lg:text-[10px] text-blue-500/30 uppercase tracking-[0.3em] space-y-1">
          <div>LOC // 6.9177° N, 79.8641° E</div>
          <div>NET // 4G-HANDSHAKE-CONNECTED</div>
          <div>SEC // ENCRYPTED-RSA-4096</div>
        </div>
        <div className="absolute bottom-12 right-12 font-mono text-[9px] lg:text-[10px] text-blue-500/30 uppercase tracking-[0.3em] text-right">
          <div>CORE-STABILITY // 99.98%</div>
          <div>SYSTEM-LOAD // 0.12ms-LATENCY</div>
        </div>
      </motion.div>

      <div className="sticky top-0 h-screen w-full flex flex-col lg:flex-row items-center translate-z-0">
        
        {/* Left Side: The "Core Module" (Holographic Geometric Node) */}
        <div className="relative w-full lg:w-1/2 h-[50vh] lg:h-full flex items-center justify-center p-8 lg:p-24 overflow-hidden">
          <motion.div 
            style={{ scale: hudScale }}
            className="relative w-full max-w-lg aspect-square flex items-center justify-center"
          >
            
            {/* Holographic Slices */}
            {[1, 2, 3].map((slice) => (
              <motion.div
                key={slice}
                animate={{ rotate: 360 }}
                transition={{ duration: 25 + slice * 10, repeat: Infinity, ease: 'linear' }}
                className="absolute border border-blue-500/[0.08] rounded-full"
                style={{ width: `${slice * 33}%`, height: `${slice * 33}%` }}
              />
            ))}

            {/* The Morphing Geometry */}
            <div className="relative z-20 w-48 h-48 lg:w-80 lg:h-80">
              {/* Operators: Pulsating Beacon */}
              <motion.div 
                style={{ opacity: phase1, scale: useTransform(phase1, [0, 1], [0.8, 1]) }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <div className="relative">
                  <motion.div 
                    animate={{ scale: [1, 1.3, 1], opacity: [0.4, 0.15, 0.4] }}
                    transition={{ duration: 4, repeat: Infinity }}
                    className="absolute inset-[-80%] bg-blue-500/20 rounded-full blur-3xl"
                  />
                  <Command className="w-24 h-24 lg:w-40 lg:h-40 text-blue-400 stroke-[0.3]" />
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-blue-400 rounded-full shadow-[0_0_25px_#60a5fa]" />
                </div>
              </motion.div>

              {/* Drivers: Shifting Hex-Grid/Target */}
              <motion.div 
                style={{ 
                  opacity: phase2, 
                  scale: useTransform(phase2, [0, 1], [0.8, 1]),
                  rotate: useTransform(phase2, [0, 1], [-15, 45]) 
                }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <div className="grid grid-cols-2 gap-4 opacity-70">
                   {[1, 2, 3, 4].map(i => (
                     <div key={i} className="w-12 h-12 lg:w-24 lg:h-24 border border-blue-400/40 rotate-45 flex items-center justify-center">
                       <Target className="w-8 h-8 text-blue-400/60" />
                     </div>
                   ))}
                </div>
              </motion.div>

              {/* Managers: Multi-Layered Data Pyramid */}
              <motion.div 
                style={{ 
                  opacity: phase3, 
                  scale: useTransform(phase3, [0, 1], [0.8, 1]) 
                }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <div className="relative flex flex-col items-center gap-2">
                   {[0.4, 0.7, 1.0].map((s, i) => (
                     <motion.div 
                       key={i}
                       animate={{ skewX: [0, 15, -15, 0] }}
                       transition={{ duration: 6, repeat: Infinity, delay: i * 0.6 }}
                       className="h-10 lg:h-14 border-x border-t border-blue-400/50"
                       style={{ width: `${s * 240}px` }}
                     />
                   ))}
                   <Zap className="mt-6 w-14 h-14 text-blue-400 shadow-blue-500 drop-shadow-[0_0_15px_rgba(96,165,250,0.6)]" />
                </div>
              </motion.div>
            </div>

            {/* Pulsing Core Glow */}
            <div className="absolute w-32 h-32 bg-blue-600/10 rounded-full blur-[90px]" />
          </motion.div>

          {/* Seamless Transition Focal Point (The "Wow" Particle) */}
          <motion.div 
            style={{ opacity: focalPointOpacity, scale: focalPointOpacity }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-white rounded-full shadow-[0_0_50px_#fff] z-50 pointer-events-none"
          />
        </div>

        {/* Right Side: Information Specification HUD */}
        <div className="relative w-full lg:w-1/2 h-[50vh] lg:h-full flex flex-col justify-center px-8 lg:px-24 border-l border-white/[0.05] bg-gradient-to-r from-blue-900/[0.02] to-transparent">
          <div className="relative w-full max-w-xl">
            
            {/* PHASE 1: OPERATORS */}
            <motion.div 
              style={{ 
                opacity: phase1, 
                y: useTransform(phase1, [0, 1], [30, 0]),
                pointerEvents: useTransform(phase1, [0.5, 1], ['none', 'auto'])
              }} 
              className="absolute inset-0 flex flex-col justify-center space-y-10"
            >
              <div className="space-y-3">
                <span className="text-blue-400 font-mono text-[11px] tracking-[0.4em] uppercase font-bold flex items-center gap-3">
                  <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse shadow-[0_0_8px_#3b82f6]" />
                  MODE // FULL-SPECTRUM OVERSIGHT
                </span>
                <h2 className="text-4xl lg:text-8xl font-sans font-light tracking-[0.25em] text-white uppercase leading-none">OPERATORS</h2>
              </div>
              <p className="text-white/80 font-sans tracking-wide text-sm lg:text-xl max-w-md font-light leading-relaxed">
                High-fidelity telemetry handshake. Sub-100ms latency protocols for real-time asset navigation and geofential integrity.
              </p>
              <div className="flex gap-16 font-mono">
                <div className="space-y-2">
                  <div className="text-[11px] text-white/30 uppercase tracking-[0.25em] font-bold">LATENCY-MS</div>
                  <div className="text-4xl text-blue-400 font-light">{latency}</div>
                </div>
                <div className="space-y-2">
                  <div className="text-[11px] text-white/30 uppercase tracking-[0.25em] font-bold">PACKET-SUCCESS</div>
                  <div className="text-4xl text-blue-400 font-light">99.9%</div>
                </div>
              </div>
            </motion.div>

            {/* PHASE 2: DRIVERS */}
            <motion.div 
              style={{ 
                opacity: phase2, 
                y: useTransform(phase2, [0, 1], [30, 0]),
                pointerEvents: useTransform(phase2, [0.5, 1], ['none', 'auto'])
              }} 
              className="absolute inset-0 flex flex-col justify-center space-y-10"
            >
              <div className="space-y-3">
                <span className="text-blue-400 font-mono text-[11px] tracking-[0.4em] uppercase font-bold flex items-center gap-3">
                  <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse shadow-[0_0_8px_#3b82f6]" />
                  LOGIC // BEHAVIORAL INTEGRITY
                </span>
                <h2 className="text-4xl lg:text-8xl font-sans font-light tracking-[0.25em] text-white uppercase leading-none">DRIVERS</h2>
              </div>
              <p className="text-white/80 font-sans tracking-wide text-sm lg:text-xl max-w-md font-light leading-relaxed">
                Algorithmic excellence. Behavioral analytics parsed at the edge to transform safety protocols into actionable excellence.
              </p>
              <div className="flex gap-16 font-mono">
                <div className="space-y-2">
                  <div className="text-[11px] text-white/30 uppercase tracking-[0.25em] font-bold">SAFETY-INDEX</div>
                  <div className="text-4xl text-blue-400 font-light">{safety}%</div>
                </div>
                <div className="space-y-2">
                  <div className="text-[11px] text-white/30 uppercase tracking-[0.25em] font-bold">RISK-LOGIC</div>
                  <div className="text-4xl text-blue-400 font-light text-shadow-[0_0_10px_rgba(96,165,250,0.5)]">LOW</div>
                </div>
              </div>
            </motion.div>

            {/* PHASE 3: MANAGERS */}
            <motion.div 
              style={{ 
                opacity: phase3, 
                y: useTransform(phase3, [0, 1], [30, 0]),
                pointerEvents: useTransform(phase3, [0.5, 1], ['none', 'auto'])
              }} 
              className="absolute inset-0 flex flex-col justify-center space-y-10"
            >
              <div className="space-y-3">
                <span className="text-blue-400 font-mono text-[11px] tracking-[0.4em] uppercase font-bold flex items-center gap-3">
                  <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse shadow-[0_0_8px_#3b82f6]" />
                  YIELD // PREDICTIVE ROI ARCHITECTURE
                </span>
                <h2 className="text-4xl lg:text-8xl font-sans font-light tracking-[0.25em] text-white uppercase leading-none">MANAGERS</h2>
              </div>
              <p className="text-white/80 font-sans tracking-wide text-sm lg:text-xl max-w-md font-light leading-relaxed">
                Lifecycle ROI orchestration. Predictive maintenance 4.0 integrated with fuel extraction and lifecycle cost intelligence.
              </p>
              <div className="flex gap-16 font-mono">
                <div className="space-y-2">
                  <div className="text-[11px] text-white/30 uppercase tracking-[0.25em] font-bold">ROI-MULTIPLIER</div>
                  <div className="text-4xl text-blue-400 font-light">{roi}x</div>
                </div>
                <div className="space-y-2">
                  <div className="text-[11px] text-white/30 uppercase tracking-[0.25em] font-bold">ASSET-HEALTH</div>
                  <div className="text-4xl text-blue-400 font-light">OPTIMAL</div>
                </div>
              </div>
            </motion.div>

          </div>
        </div>

      </div>

      {/* Finishing HUD Detail Overlay */}
      <motion.div 
        style={{ scale: hudScale, opacity: useTransform(outroProgress, [0, 0.4], [1, 0]) }}
        className="absolute inset-0 pointer-events-none z-50"
      >
        <div className="absolute top-[15%] left-[5%] w-[1px] h-[150px] bg-blue-500/20" />
        <div className="absolute bottom-[15%] right-[5%] w-[1px] h-[150px] bg-blue-500/20" />
        <div className="absolute top-[15%] left-[5%] w-[80px] h-[1px] bg-blue-500/20" />
        <div className="absolute bottom-[15%] right-[5%] w-[80px] h-[1px] bg-blue-500/20" />
      </motion.div>

    </div>
  );
}
