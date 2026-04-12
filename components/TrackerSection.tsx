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
    specs: 'Cortex-M4  ·  6-axis IMU  ·  ARM Architecture',
    description:
      'High-performance processing unit designed for sub-second telemetry analysis and edge computation across harsh environments.',
  },
  {
    icon: Wifi,
    title: 'Enterprise Connectivity',
    specs: '4G CAT-M1  ·  NB-IoT  ·  Dual Antenna',
    description:
      'Redundant global handshake protocols ensuring 99.9% uptime in the most demanding terrains and remote corridors.',
  },
  {
    icon: BatteryCharging,
    title: 'Power Intelligence',
    specs: '800mAh Backup  ·  Intelligent Isolation',
    description:
      'Automotive-grade power management with deep-sleep modes, tamper-resistant housing, and weeks of standby life.',
  },
  {
    icon: Download,
    title: 'OTA Agility',
    specs: 'Encrypted Updates  ·  Remote Diagnostics',
    description:
      'Cloud-synced firmware architecture allowing remote feature deployments, security patches, and fleet-wide rollouts.',
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
  const introProgress = useTransform(scrollYProgress, [0, 0.1], [0, 1]);
  const deviceScale = useTransform(introProgress, [0, 1], [0.5, 1]);
  const focalPointOpacity = useTransform(introProgress, [0, 0.6], [1, 0]);
  const focalPointScale = useTransform(introProgress, [0, 0.3], [1, 1.5]);

  // ── Section heading ──
  const headingOpacity = useTransform(scrollYProgress, [0, 0.05, 0.12, 0.16], [0, 1, 1, 0]);
  const headingY = useTransform(scrollYProgress, [0, 0.05, 0.12, 0.16], [30, 0, 0, -40]);

  // ── Canvas frame progression ──
  const currentFrame = useTransform(scrollYProgress, [0.08, 0.95], [0, TOTAL_FRAMES - 1]);

  // ── Card transitions with crossfade ──
  const card1Opacity = useTransform(scrollYProgress, [0.12, 0.19, 0.33, 0.40], [0, 1, 1, 0]);
  const card2Opacity = useTransform(scrollYProgress, [0.36, 0.43, 0.56, 0.63], [0, 1, 1, 0]);
  const card3Opacity = useTransform(scrollYProgress, [0.59, 0.66, 0.79, 0.86], [0, 1, 1, 0]);
  const card4Opacity = useTransform(scrollYProgress, [0.82, 0.89, 1.0, 1.0], [0, 1, 1, 1]);

  const card1Y = useTransform(scrollYProgress, [0.12, 0.19, 0.33, 0.40], [30, 0, 0, -30]);
  const card2Y = useTransform(scrollYProgress, [0.36, 0.43, 0.56, 0.63], [30, 0, 0, -30]);
  const card3Y = useTransform(scrollYProgress, [0.59, 0.66, 0.79, 0.86], [30, 0, 0, -30]);
  const card4Y = useTransform(scrollYProgress, [0.82, 0.89, 1.0], [30, 0, 0]);

  const cardOpacities = [card1Opacity, card2Opacity, card3Opacity, card4Opacity];
  const cardYs = [card1Y, card2Y, card3Y, card4Y];

  // ── Progress indicator ──
  const progressWidth = useTransform(scrollYProgress, [0.12, 0.95], ['0%', '100%']);

  // ── Canvas sizing ──
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
  const drawFrame = useCallback(
    (idx: number) => {
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
    },
    [images],
  );

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
    <div
      ref={containerRef}
      className="relative h-[200vh] lg:h-[500vh] bg-[#0a0a0a] -mt-px font-[family-name:var(--font-outfit)]"
      id="tracker-section"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-[#0a0a0a] transform-gpu">
        {/* Scroll progress bar */}
        <div className="absolute top-0 left-0 right-0 h-[2px] z-[100]">
          <motion.div
            style={{ width: progressWidth }}
            className="h-full bg-gradient-to-r from-orange-500 to-orange-400"
          />
        </div>

        <div className="h-full w-full flex flex-col lg:flex-row items-center lg:items-stretch max-w-[1600px] mx-auto">
          
          {/* Left/Top (Hardware): Takes up top 50vh on mobile, left 55% on desktop */}
          <div className="relative w-full h-[45vh] xs:h-[50vh] lg:h-full lg:w-[55%] flex items-center justify-center p-6 sm:p-8 lg:p-16 z-0">
            <div
              ref={canvasWrapperRef}
              className="relative w-full max-w-[280px] xs:max-w-[320px] sm:max-w-[400px] lg:max-w-2xl aspect-square flex items-center justify-center translate-y-4 lg:translate-y-0"
            >
              <motion.div
                style={{ scale: deviceScale, opacity: introProgress }}
                className="w-full h-full"
              >
                <canvas ref={canvasRef} className="w-full h-full" />
              </motion.div>

              {/* Ambient glow - Apple style deep glow */}
              <div className="absolute inset-[-40%] bg-orange-500/[0.12] rounded-full blur-[80px] lg:blur-[140px] pointer-events-none mix-blend-screen" />

              {/* Focal point */}
              <motion.div
                style={{ opacity: focalPointOpacity, scale: focalPointScale }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-white rounded-full shadow-[0_0_50px_#fff] z-50 pointer-events-none"
              />

              {/* Loading spinner */}
              {!isLoaded && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-8 h-8 border-2 border-white/10 border-t-orange-500 rounded-full animate-spin" />
                </div>
              )}
            </div>
          </div>

          {/* Right/Bottom (Content): Takes up bottom 50vh on mobile, right 45% on desktop */}
          <div className="relative w-full h-[55vh] xs:h-[50vh] lg:h-full lg:w-[45%] flex flex-col justify-start lg:justify-center px-4 sm:px-10 lg:px-16 xl:px-20 z-20">
            
            <div className="relative w-full max-w-lg mx-auto lg:mx-0 h-full lg:h-[420px] flex items-start lg:items-center">
              
              {/* Section heading (shows first, fades out) */}
              <motion.div
                style={{ opacity: headingOpacity, y: headingY }}
                className="absolute inset-x-0 top-0 lg:inset-0 flex flex-col justify-start lg:justify-center items-center lg:items-start text-center lg:text-left z-20"
              >
                <span className="text-orange-400 text-[10px] xs:text-xs font-bold uppercase tracking-[0.3em] mb-4 flex items-center justify-center lg:justify-start gap-2.5 drop-shadow-[0_0_10px_rgba(249,115,22,0.8)]">
                  <span className="w-2 h-2 bg-orange-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(249,115,22,0.6)]" />
                  Hardware
                </span>
                <h2 className="text-4xl xs:text-5xl lg:text-7xl font-black text-white leading-[1.0] tracking-tighter mb-4 lg:mb-5">
                  Purpose-built
                  <br />
                  <span className="text-white/20">for fleets.</span>
                </h2>
                <p className="text-[13px] xs:text-[14px] sm:text-base lg:text-lg text-white/50 leading-relaxed font-medium max-w-[280px] lg:max-w-sm mx-auto lg:mx-0">
                  Military-grade hardware engineered for the demands of
                  commercial fleet operations.
                </p>
              </motion.div>

              {/* Feature Cards */}
              {FEATURES.map((feature, i) => (
                <motion.div
                  key={feature.title}
                  style={{ opacity: cardOpacities[i], y: cardYs[i] }}
                  className="absolute inset-x-0 top-0 lg:inset-0 flex flex-col justify-start lg:justify-center z-10"
                >
                  <div className="w-full">
                    {/* Minimal/Clean Text Layout instead of Glassy Boxes for perfect mobile legibility */}
                    <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
                      
                      {/* Icon */}
                      <div className="w-12 h-12 lg:w-14 lg:h-14 rounded-2xl bg-orange-500/10 border border-orange-500/15 flex items-center justify-center shadow-[inset_0_0_20px_rgba(249,115,22,0.05)] mb-4">
                        <feature.icon className="w-5 h-5 lg:w-7 lg:h-7 text-orange-400 drop-shadow-[0_0_8px_rgba(249,115,22,0.5)]" />
                      </div>
                      
                      {/* Title & Specs */}
                      <h3 className="text-2xl xs:text-3xl lg:text-4xl font-black text-white tracking-tight leading-tight mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-[10px] xs:text-[11px] lg:text-sm text-orange-400/80 font-bold tracking-[0.15em] uppercase mb-4 xs:mb-5">
                        {feature.specs}
                      </p>

                      {/* Description */}
                      <p className="text-[14px] xs:text-[15px] lg:text-lg text-white/60 leading-relaxed font-semibold mb-6 lg:mb-8 max-w-[320px] lg:max-w-full mx-auto lg:mx-0">
                        {feature.description}
                      </p>

                      {/* Feature step indicator */}
                      <div className="flex items-center justify-center lg:justify-start gap-2 w-full">
                        {FEATURES.map((_, j) => (
                          <div
                            key={j}
                            className={`h-1.5 rounded-full transition-all duration-500 ${
                              j === i
                                ? 'w-6 lg:w-10 bg-white shadow-[0_0_10px_rgba(255,255,255,0.4)]'
                                : 'w-2 bg-white/10'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
