'use client';

import { useImagePreloader } from '@/hooks/useImagePreloader';
import { BatteryCharging, Cpu, Download, Wifi } from 'lucide-react';
import { motion, useMotionValueEvent, useScroll, useTransform } from 'motion/react';
import { useCallback, useEffect, useMemo, useRef } from 'react';

const TOTAL_FRAMES = 66;

const FEATURES = [
  {
    icon: Cpu,
    title: 'Surgical Processing',
    specs: 'Cortex-M4 / 6-axis IMU / ARM Architecture',
    description: 'High-performance processing unit designed for sub-second telemetry analysis and edge computation.',
  },
  {
    icon: Wifi,
    title: 'Enterprise Connectivity',
    specs: '4G CAT-M1 / NB-IoT / Dual Antenna Grid',
    description: 'Redundant global handshake protocols ensuring 99.9% uptime in the most demanding terrains.',
  },
  {
    icon: BatteryCharging,
    title: 'Power Intelligence',
    specs: '800mAh Backup / Intelligent Isolation',
    description: 'Automotive-grade power management with deep-sleep modes and tamper-resistant housing.',
  },
  {
    icon: Download,
    title: 'OTA Agility',
    specs: 'Encrypted Updates / Remote Diagnostics',
    description: 'Cloud-synced firmware architecture allowing for remote feature deployments and security patches.',
  },
];

export default function TrackerSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvasWrapperRef = useRef<HTMLDivElement>(null);
  const frameIndexRef = useRef(0);

  const frameUrls = useMemo(() => {
    return Array.from({ length: TOTAL_FRAMES }, (_, i) => {
      const index = (i + 1).toString().padStart(3, '0');
      return `/images/device_sequence/ezgif-frame-${index}.png`;
    });
  }, []);

  const { images, isLoaded } = useImagePreloader(frameUrls);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // ── Intro ──
  const introProgress = useTransform(scrollYProgress, [0, 0.10], [0, 1]);
  const deviceScale = useTransform(introProgress, [0, 1], [0.5, 1]);
  const focalPointOpacity = useTransform(introProgress, [0, 0.6], [1, 0]);
  const focalPointScale = useTransform(introProgress, [0, 0.3], [1, 1.5]);
  const introTextOpacity = useTransform(scrollYProgress, [0, 0.05, 0.13], [0, 1, 0]);
  const introTextY = useTransform(scrollYProgress, [0, 0.05, 0.13], [20, 0, -20]);

  // ── Canvas frame progression ──
  const currentFrame = useTransform(scrollYProgress, [0.08, 0.95], [0, TOTAL_FRAMES - 1]);

  // ── Card transitions with CROSSFADING overlap ──
  const card1Opacity = useTransform(scrollYProgress, [0.12, 0.19, 0.33, 0.40], [0, 1, 1, 0]);
  const card2Opacity = useTransform(scrollYProgress, [0.36, 0.43, 0.56, 0.63], [0, 1, 1, 0]);
  const card3Opacity = useTransform(scrollYProgress, [0.59, 0.66, 0.79, 0.86], [0, 1, 1, 0]);
  const card4Opacity = useTransform(scrollYProgress, [0.82, 0.89, 1.0, 1.0], [0, 1, 1, 1]);

  // ── Bi-directional Y: slide up on enter, slide further up on exit ──
  const card1Y = useTransform(scrollYProgress, [0.12, 0.19, 0.33, 0.40], [25, 0, 0, -25]);
  const card2Y = useTransform(scrollYProgress, [0.36, 0.43, 0.56, 0.63], [25, 0, 0, -25]);
  const card3Y = useTransform(scrollYProgress, [0.59, 0.66, 0.79, 0.86], [25, 0, 0, -25]);
  const card4Y = useTransform(scrollYProgress, [0.82, 0.89, 1.0], [25, 0, 0]);

  const cardOpacities = [card1Opacity, card2Opacity, card3Opacity, card4Opacity];
  const cardYs = [card1Y, card2Y, card3Y, card4Y];

  // ── Canvas sizing (absolute transform to avoid DPR compounding on resize) ──
  const sizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    const wrapper = canvasWrapperRef.current;
    if (!canvas || !wrapper) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const rect = wrapper.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    canvas.style.width = `${rect.width}px`;
    canvas.style.height = `${rect.height}px`;
    const ctx = canvas.getContext('2d');
    if (ctx) ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }, []);

  // ── Canvas drawing ──
  const drawFrame = useCallback((idx: number) => {
    const canvas = canvasRef.current;
    if (!canvas || images.length === 0) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const img = images[idx];
    if (!img || !img.complete || img.naturalWidth === 0) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const cw = canvas.width / dpr;
    const ch = canvas.height / dpr;

    ctx.clearRect(0, 0, cw, ch);
    const scale = Math.min(cw / img.naturalWidth, ch / img.naturalHeight);
    const w = img.naturalWidth * scale;
    const h = img.naturalHeight * scale;
    const x = (cw - w) / 2;
    const y = (ch - h) / 2;
    ctx.drawImage(img, x, y, w, h);
  }, [images]);

  useMotionValueEvent(currentFrame, 'change', (latest) => {
    const next = Math.max(0, Math.min(TOTAL_FRAMES - 1, Math.floor(latest)));
    if (next !== frameIndexRef.current) {
      frameIndexRef.current = next;
      drawFrame(next);
    }
  });

  useEffect(() => {
    if (!isLoaded) return;
    sizeCanvas();
    drawFrame(frameIndexRef.current);
  }, [isLoaded, sizeCanvas, drawFrame]);

  useEffect(() => {
    const onResize = () => {
      sizeCanvas();
      drawFrame(frameIndexRef.current);
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [sizeCanvas, drawFrame]);

  return (
    <div ref={containerRef} className="relative h-[500vh] bg-[#050505] -mt-px" id="tracker-section">
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-[#050505] transform-gpu">
        <div className="h-full w-full flex flex-col lg:flex-row items-stretch">

          {/* Left: Device Canvas */}
          <div className="relative w-full lg:w-1/2 shrink-0 h-[35vh] lg:h-full flex items-center justify-center p-4 sm:p-6 lg:p-12">
            <div
              ref={canvasWrapperRef}
              className="relative w-full max-w-[320px] sm:max-w-md lg:max-w-3xl aspect-square flex items-center justify-center"
            >
              <motion.div
                style={{ scale: deviceScale, opacity: introProgress }}
                className="w-full h-full"
              >
                <canvas ref={canvasRef} className="w-full h-full" />
              </motion.div>

              <div className="absolute inset-0 bg-blue-500/5 rounded-full blur-[80px] lg:blur-[120px] pointer-events-none" />

              <motion.div
                style={{ opacity: focalPointOpacity, scale: focalPointScale }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-white rounded-full shadow-[0_0_50px_#fff] z-50 pointer-events-none"
              />

              {!isLoaded && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 border-2 border-white/10 border-t-blue-500 rounded-full animate-spin" />
                </div>
              )}
            </div>
          </div>

          {/* Right: Feature Cards */}
          <div className="relative w-full lg:w-1/2 flex-1 lg:flex-none lg:h-full flex flex-col justify-center px-5 sm:px-8 lg:px-20 border-t lg:border-t-0 lg:border-l border-white/[0.05] overflow-hidden">
            <div className="relative w-full max-w-xl h-[50vh] sm:h-[300px] lg:h-[360px]">

              {/* Intro Title */}
              <motion.div
                style={{ opacity: introTextOpacity, y: introTextY }}
                className="absolute inset-0 flex flex-col justify-center"
              >
                <h2 className="text-3xl sm:text-4xl lg:text-7xl xl:text-8xl font-sans font-light tracking-[0.15em] sm:tracking-[0.25em] text-white uppercase mb-3 sm:mb-4">
                  HARDWARE
                </h2>
                <p className="text-blue-400 font-mono tracking-widest uppercase text-[10px] sm:text-xs font-bold flex items-center gap-2 sm:gap-3">
                  <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                  INITIALIZING CORE-SENSORS
                </p>
              </motion.div>

              {/* Feature Cards */}
              {FEATURES.map((feature, i) => (
                <motion.div
                  key={feature.title}
                  style={{ opacity: cardOpacities[i], y: cardYs[i] }}
                  className="absolute inset-0 flex flex-col justify-center"
                >
                  <div className="bg-white/[0.02] backdrop-blur-xl border border-white/5 rounded-2xl sm:rounded-[2rem] p-5 sm:p-8 lg:p-10 shadow-2xl">
                    <div className="flex items-center gap-4 sm:gap-6 mb-4 sm:mb-6 lg:mb-8">
                      <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-xl sm:rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center shrink-0">
                        <feature.icon className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-blue-400" />
                      </div>
                      <div className="min-w-0">
                        <h3 className="text-lg sm:text-2xl lg:text-3xl xl:text-4xl font-sans font-light tracking-[0.05em] sm:tracking-[0.1em] text-white uppercase truncate">
                          {feature.title}
                        </h3>
                        <p className="text-[8px] sm:text-[10px] lg:text-xs font-mono text-blue-400/60 uppercase tracking-widest mt-0.5 sm:mt-1 truncate">
                          {feature.specs}
                        </p>
                      </div>
                    </div>
                    <p className="text-sm sm:text-base lg:text-lg text-white/50 leading-relaxed font-sans font-extralight tracking-wide">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              ))}

            </div>
          </div>
        </div>
      </div>

      {/* Background Glows */}
      <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-[20%] right-[-10%] w-[60%] h-[60%] bg-blue-900/10 rounded-full blur-[150px]" />
        <div className="absolute bottom-[10%] left-[-10%] w-[40%] h-[40%] bg-indigo-900/10 rounded-full blur-[150px]" />
      </div>
    </div>
  );
}
