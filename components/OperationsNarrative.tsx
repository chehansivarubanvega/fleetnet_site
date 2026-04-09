'use client';

import { motion, useScroll, useTransform } from 'motion/react';
import { useEffect, useRef, useState } from 'react';
import { Command, Target, Zap } from 'lucide-react';

export default function OperationsNarrative() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // ── Phase opacity with CROSSFADING overlap ──
  // Each phase fades out while the next fades in, so there's never a blank gap.
  const phase1 = useTransform(scrollYProgress, [0, 0.04, 0.27, 0.35], [0, 1, 1, 0]);
  const phase2 = useTransform(scrollYProgress, [0.30, 0.38, 0.60, 0.68], [0, 1, 1, 0]);
  const phase3 = useTransform(scrollYProgress, [0.63, 0.71, 0.86, 0.93], [0, 1, 1, 0]);

  // ── Bi-directional Y: slide up on enter, slide further up on exit ──
  const phase1Y = useTransform(scrollYProgress, [0, 0.04, 0.27, 0.35], [30, 0, 0, -30]);
  const phase2Y = useTransform(scrollYProgress, [0.30, 0.38, 0.60, 0.68], [30, 0, 0, -30]);
  const phase3Y = useTransform(scrollYProgress, [0.63, 0.71, 0.86, 0.93], [30, 0, 0, -30]);

  // ── Left geometry scale per phase ──
  const phase1Scale = useTransform(phase1, [0, 1], [0.85, 1]);
  const phase2Scale = useTransform(phase2, [0, 1], [0.85, 1]);
  const phase2Rotate = useTransform(phase2, [0, 1], [-15, 45]);
  const phase3Scale = useTransform(phase3, [0, 1], [0.85, 1]);

  // ── Outro (implosion) ──
  const outroProgress = useTransform(scrollYProgress, [0.93, 1.0], [0, 1]);
  const hudScale = useTransform(outroProgress, [0, 1], [1, 0]);
  const hudOpacity = useTransform(outroProgress, [0, 0.5], [1, 0]);
  const focalPointOpacity = useTransform(outroProgress, [0.6, 1.0], [0, 1]);

  // ── Metric jitter ──
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
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-[#050505] transform-gpu">

        {/* HUD Background Layer */}
        <motion.div
          style={{ scale: hudScale, opacity: hudOpacity }}
          className="absolute inset-0 pointer-events-none z-0"
        >
          <div
            className="absolute inset-0 opacity-[0.02]"
            style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '100px 100px' }}
          />
          <motion.div
            animate={{ top: ['0%', '100%'] }}
            transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
            className="absolute left-0 w-full h-[1px] bg-blue-500/10 z-10"
          />
          <div className="absolute top-6 left-6 lg:top-12 lg:left-12 font-mono text-[8px] lg:text-[10px] text-blue-500/30 uppercase tracking-[0.3em] space-y-1">
            <div>LOC // 6.9177° N, 79.8641° E</div>
            <div>NET // 4G-HANDSHAKE-CONNECTED</div>
            <div>SEC // ENCRYPTED-RSA-4096</div>
          </div>
          <div className="absolute bottom-6 right-6 lg:bottom-12 lg:right-12 font-mono text-[8px] lg:text-[10px] text-blue-500/30 uppercase tracking-[0.3em] text-right">
            <div>CORE-STABILITY // 99.98%</div>
            <div>SYSTEM-LOAD // 0.12ms-LATENCY</div>
          </div>
        </motion.div>

        {/* HUD Corner Lines */}
        <motion.div
          style={{ scale: hudScale, opacity: hudOpacity }}
          className="absolute inset-0 pointer-events-none z-50"
        >
          <div className="absolute top-[15%] left-[5%] w-[1px] h-[100px] lg:h-[150px] bg-blue-500/20" />
          <div className="absolute bottom-[15%] right-[5%] w-[1px] h-[100px] lg:h-[150px] bg-blue-500/20" />
          <div className="absolute top-[15%] left-[5%] w-[50px] lg:w-[80px] h-[1px] bg-blue-500/20" />
          <div className="absolute bottom-[15%] right-[5%] w-[50px] lg:w-[80px] h-[1px] bg-blue-500/20" />
        </motion.div>

        {/* Main Content */}
        <div className="relative z-10 h-full w-full flex flex-col lg:flex-row items-stretch">

          {/* Left: Holographic Geometry */}
          <div className="relative w-full lg:w-1/2 shrink-0 h-[35vh] lg:h-full flex items-center justify-center p-4 sm:p-8 lg:p-16 overflow-hidden">
            <motion.div
              style={{ scale: hudScale }}
              className="relative w-full max-w-[280px] sm:max-w-sm lg:max-w-lg aspect-square flex items-center justify-center"
            >
              {[1, 2, 3].map((slice) => (
                <motion.div
                  key={slice}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 25 + slice * 10, repeat: Infinity, ease: 'linear' }}
                  className="absolute border border-blue-500/[0.08] rounded-full"
                  style={{ width: `${slice * 33}%`, height: `${slice * 33}%` }}
                />
              ))}

              <div className="relative z-20 w-32 h-32 sm:w-48 sm:h-48 lg:w-80 lg:h-80">
                {/* Operators */}
                <motion.div
                  style={{ opacity: phase1, scale: phase1Scale }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <div className="relative">
                    <motion.div
                      animate={{ scale: [1, 1.3, 1], opacity: [0.4, 0.15, 0.4] }}
                      transition={{ duration: 4, repeat: Infinity }}
                      className="absolute inset-[-80%] bg-blue-500/20 rounded-full blur-3xl"
                    />
                    <Command className="w-16 h-16 sm:w-24 sm:h-24 lg:w-40 lg:h-40 text-blue-400 stroke-[0.3]" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 lg:w-4 lg:h-4 bg-blue-400 rounded-full shadow-[0_0_25px_#60a5fa]" />
                  </div>
                </motion.div>

                {/* Drivers */}
                <motion.div
                  style={{ opacity: phase2, scale: phase2Scale, rotate: phase2Rotate }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <div className="grid grid-cols-2 gap-2 sm:gap-4 opacity-70">
                    {[1, 2, 3, 4].map(i => (
                      <div key={i} className="w-8 h-8 sm:w-12 sm:h-12 lg:w-24 lg:h-24 border border-blue-400/40 rotate-45 flex items-center justify-center">
                        <Target className="w-5 h-5 sm:w-8 sm:h-8 text-blue-400/60" />
                      </div>
                    ))}
                  </div>
                </motion.div>

                {/* Managers */}
                <motion.div
                  style={{ opacity: phase3, scale: phase3Scale }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <div className="relative flex flex-col items-center gap-1 sm:gap-2">
                    {[0.4, 0.7, 1.0].map((s, i) => (
                      <motion.div
                        key={i}
                        animate={{ skewX: [0, 15, -15, 0] }}
                        transition={{ duration: 6, repeat: Infinity, delay: i * 0.6 }}
                        className="h-6 sm:h-10 lg:h-14 border-x border-t border-blue-400/50"
                        style={{ width: `${s * 160}px` }}
                      />
                    ))}
                    <Zap className="mt-3 sm:mt-6 w-8 h-8 sm:w-14 sm:h-14 text-blue-400 drop-shadow-[0_0_15px_rgba(96,165,250,0.6)]" />
                  </div>
                </motion.div>
              </div>

              <div className="absolute w-24 h-24 lg:w-32 lg:h-32 bg-blue-600/10 rounded-full blur-[90px]" />
            </motion.div>

            <motion.div
              style={{ opacity: focalPointOpacity, scale: focalPointOpacity }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-white rounded-full shadow-[0_0_50px_#fff] z-50 pointer-events-none"
            />
          </div>

          {/* Right: Text Panels */}
          <div className="relative w-full lg:w-1/2 flex-1 lg:flex-none lg:h-full flex flex-col justify-center px-5 sm:px-8 lg:px-20 border-t lg:border-t-0 lg:border-l border-white/[0.05] bg-gradient-to-r from-blue-900/[0.02] to-transparent overflow-hidden">
            <div className="relative w-full max-w-xl h-[50vh] sm:h-[300px] lg:h-[360px]">

              {/* OPERATORS */}
              <motion.div
                style={{ opacity: phase1, y: phase1Y }}
                className="absolute inset-0 flex flex-col justify-center space-y-6 sm:space-y-8 lg:space-y-10"
              >
                <div className="space-y-2">
                  <span className="text-blue-400 font-mono text-[10px] sm:text-[11px] tracking-[0.3em] sm:tracking-[0.4em] uppercase font-bold flex items-center gap-2 sm:gap-3">
                    <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse shadow-[0_0_8px_#3b82f6]" />
                    MODE // FULL-SPECTRUM OVERSIGHT
                  </span>
                  <h2 className="text-3xl sm:text-4xl lg:text-7xl xl:text-8xl font-sans font-light tracking-[0.15em] sm:tracking-[0.25em] text-white uppercase leading-none">OPERATORS</h2>
                </div>
                <p className="text-white/70 font-sans tracking-wide text-xs sm:text-sm lg:text-xl max-w-md font-light leading-relaxed">
                  High-fidelity telemetry handshake. Sub-100ms latency protocols for real-time asset navigation and geofential integrity.
                </p>
                <div className="flex gap-8 sm:gap-12 lg:gap-16 font-mono">
                  <div className="space-y-1">
                    <div className="text-[9px] sm:text-[11px] text-white/30 uppercase tracking-[0.2em] font-bold">LATENCY-MS</div>
                    <div className="text-2xl sm:text-3xl lg:text-4xl text-blue-400 font-light">{latency}</div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-[9px] sm:text-[11px] text-white/30 uppercase tracking-[0.2em] font-bold">PACKET-SUCCESS</div>
                    <div className="text-2xl sm:text-3xl lg:text-4xl text-blue-400 font-light">99.9%</div>
                  </div>
                </div>
              </motion.div>

              {/* DRIVERS */}
              <motion.div
                style={{ opacity: phase2, y: phase2Y }}
                className="absolute inset-0 flex flex-col justify-center space-y-6 sm:space-y-8 lg:space-y-10"
              >
                <div className="space-y-2">
                  <span className="text-blue-400 font-mono text-[10px] sm:text-[11px] tracking-[0.3em] sm:tracking-[0.4em] uppercase font-bold flex items-center gap-2 sm:gap-3">
                    <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse shadow-[0_0_8px_#3b82f6]" />
                    LOGIC // BEHAVIORAL INTEGRITY
                  </span>
                  <h2 className="text-3xl sm:text-4xl lg:text-7xl xl:text-8xl font-sans font-light tracking-[0.15em] sm:tracking-[0.25em] text-white uppercase leading-none">DRIVERS</h2>
                </div>
                <p className="text-white/70 font-sans tracking-wide text-xs sm:text-sm lg:text-xl max-w-md font-light leading-relaxed">
                  Algorithmic excellence. Behavioral analytics parsed at the edge to transform safety protocols into actionable excellence.
                </p>
                <div className="flex gap-8 sm:gap-12 lg:gap-16 font-mono">
                  <div className="space-y-1">
                    <div className="text-[9px] sm:text-[11px] text-white/30 uppercase tracking-[0.2em] font-bold">SAFETY-INDEX</div>
                    <div className="text-2xl sm:text-3xl lg:text-4xl text-blue-400 font-light">{safety}%</div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-[9px] sm:text-[11px] text-white/30 uppercase tracking-[0.2em] font-bold">RISK-LOGIC</div>
                    <div className="text-2xl sm:text-3xl lg:text-4xl text-blue-400 font-light">LOW</div>
                  </div>
                </div>
              </motion.div>

              {/* MANAGERS */}
              <motion.div
                style={{ opacity: phase3, y: phase3Y }}
                className="absolute inset-0 flex flex-col justify-center space-y-6 sm:space-y-8 lg:space-y-10"
              >
                <div className="space-y-2">
                  <span className="text-blue-400 font-mono text-[10px] sm:text-[11px] tracking-[0.3em] sm:tracking-[0.4em] uppercase font-bold flex items-center gap-2 sm:gap-3">
                    <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse shadow-[0_0_8px_#3b82f6]" />
                    YIELD // PREDICTIVE ROI ARCHITECTURE
                  </span>
                  <h2 className="text-3xl sm:text-4xl lg:text-7xl xl:text-8xl font-sans font-light tracking-[0.15em] sm:tracking-[0.25em] text-white uppercase leading-none">MANAGERS</h2>
                </div>
                <p className="text-white/70 font-sans tracking-wide text-xs sm:text-sm lg:text-xl max-w-md font-light leading-relaxed">
                  Lifecycle ROI orchestration. Predictive maintenance 4.0 integrated with fuel extraction and lifecycle cost intelligence.
                </p>
                <div className="flex gap-8 sm:gap-12 lg:gap-16 font-mono">
                  <div className="space-y-1">
                    <div className="text-[9px] sm:text-[11px] text-white/30 uppercase tracking-[0.2em] font-bold">ROI-MULTIPLIER</div>
                    <div className="text-2xl sm:text-3xl lg:text-4xl text-blue-400 font-light">{roi}x</div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-[9px] sm:text-[11px] text-white/30 uppercase tracking-[0.2em] font-bold">ASSET-HEALTH</div>
                    <div className="text-2xl sm:text-3xl lg:text-4xl text-blue-400 font-light">OPTIMAL</div>
                  </div>
                </div>
              </motion.div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
