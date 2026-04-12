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
      className="relative h-[300vh] md:h-[500vh] bg-[#0a0a0a] -mt-px font-[family-name:var(--font-outfit)]"
      id="tracker-section"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-[#0a0a0a] transform-gpu">
        {/* Scroll progress bar */}
        <div className="absolute top-0 left-0 right-0 h-[2px] z-50">
          <motion.div
            style={{ width: progressWidth }}
            className="h-full bg-gradient-to-r from-orange-500 to-orange-400"
          />
        </div>

        <div className="h-full w-full flex flex-col lg:flex-row items-center lg:items-stretch max-w-[1600px] mx-auto justify-center lg:justify-start">
          {/* Left: Device Canvas */}
          <div className="relative w-full lg:w-[55%] shrink-0 h-[40vh] xs:h-[45vh] lg:h-full flex items-center justify-center p-4 sm:p-8 lg:p-16">
            <div
              ref={canvasWrapperRef}
              className="relative w-full max-w-[280px] sm:max-w-md lg:max-w-2xl aspect-square flex items-center justify-center"
            >
              <motion.div
                style={{ scale: deviceScale, opacity: introProgress }}
                className="w-full h-full"
              >
                <canvas ref={canvasRef} className="w-full h-full" />
              </motion.div>

              {/* Ambient glow - Enlarged for mobile depth */}
              <div className="absolute inset-[-50%] bg-orange-500/[0.07] rounded-full blur-[120px] lg:blur-[140px] pointer-events-none" />

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

          {/* Right: Content */}
          <div className="relative w-full lg:w-[45%] flex-none lg:h-full flex flex-col justify-center pt-0 px-6 sm:px-10 lg:px-16 xl:px-20 overflow-visible">
            <div className="relative w-full max-w-lg min-h-[30vh] sm:min-h-0 h-auto sm:h-[340px] lg:h-[420px]">
              {/* Section heading (shows first, fades out) */}
              <motion.div
                style={{ opacity: headingOpacity, y: headingY }}
                className="absolute inset-0 flex flex-col justify-center"
              >
                <span className="text-orange-400 text-[10px] xs:text-xs font-bold uppercase tracking-[0.3em] mb-4 flex items-center gap-2.5">
                  <span className="w-1.5 h-1.5 xs:w-2 xs:h-2 bg-orange-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(249,115,22,0.6)]" />
                  Hardware
                </span>
                <h2 className="text-3xl xs:text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black text-white leading-[1.1] sm:leading-[1] tracking-tight mb-4 sm:mb-5">
                  Purpose-built
                  <br />
                  <span className="text-white/25">for fleets.</span>
                </h2>
                <p className="text-[13px] sm:text-base lg:text-lg text-white/40 leading-relaxed font-medium max-w-md">
                  Military-grade hardware engineered for the demands of
                  commercial fleet operations — from long-haul to last-mile.
                </p>
              </motion.div>

              {/* Feature Cards */}
              {FEATURES.map((feature, i) => (
                <motion.div
                  key={feature.title}
                  style={{ opacity: cardOpacities[i], y: cardYs[i] }}
                  className="absolute inset-0 flex flex-col justify-center"
                >
                  <div className="rounded-2xl sm:rounded-3xl border border-white/[0.08] bg-white/[0.04] backdrop-blur-2xl p-5 xs:p-7 sm:p-8 lg:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden relative group">
                    {/* Subtle internal glow */}
                    <div className="absolute -top-24 -right-24 w-48 h-48 bg-orange-500/[0.08] blur-[60px] rounded-full pointer-events-none" />

                    {/* Card header */}
                    <div className="flex items-start gap-4 sm:gap-5 mb-5 xs:mb-7">
                      <div className="w-11 h-11 xs:w-13 xs:h-13 sm:w-14 sm:h-14 rounded-xl bg-orange-500/10 border border-orange-500/15 flex items-center justify-center shrink-0">
                        <feature.icon className="w-5 h-5 xs:w-6 xs:h-6 sm:w-7 sm:h-7 text-orange-400" />
                      </div>
                      <div className="min-w-0 pt-0.5">
                        <h3 className="text-lg xs:text-xl sm:text-2xl lg:text-3xl font-bold text-white tracking-tight leading-tight mb-1.5">
                          {feature.title}
                        </h3>
                        <p className="text-[10px] xs:text-[12px] sm:text-sm text-orange-400/60 font-medium truncate">
                          {feature.specs}
                        </p>
                      </div>
                    </div>

                    {/* Card body */}
                    <p className="text-[13px] xs:text-[15px] sm:text-base lg:text-lg text-white/50 leading-relaxed font-medium">
                      {feature.description}
                    </p>

                    {/* Feature step indicator */}
                    <div className="flex items-center gap-2 mt-6 xs:mt-9">
                      {FEATURES.map((_, j) => (
                        <div
                          key={j}
                          className={`h-1 rounded-full transition-all duration-500 ${
                            j === i
                              ? 'w-7 xs:w-10 bg-orange-500'
                              : 'w-1.5 xs:w-2.5 bg-white/10'
                          }`}
                        />
                      ))}
                      <span className="ml-auto text-xs text-white/20 font-medium">
                        {i + 1} / {FEATURES.length}
                      </span>
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
