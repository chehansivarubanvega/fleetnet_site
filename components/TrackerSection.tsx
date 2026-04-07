'use client';

import { useImagePreloader } from '@/hooks/useImagePreloader';
import { BatteryCharging, Cpu, Download, Wifi } from 'lucide-react';
import { motion, useMotionValueEvent, useScroll, useTransform } from 'motion/react';
import { useEffect, useMemo, useRef, useState } from 'react';

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

/**
 * Split-layout TrackerSection with compact scrollytelling.
 * Tracker on one side, technical specs on the other.
 */
export default function TrackerSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [frameIndex, setFrameIndex] = useState(0);

  // Preload frames
  const frameUrls = useMemo(() => {
    return Array.from({ length: 66 }, (_, i) => {
      const index = (i * 2 + 1).toString().padStart(3, '0'); // Skipping frames to match the 40 frame limit used in currentFrame transform
      return `/images/device_sequence/ezgif-frame-${index}.png`;
    });
  }, []);

  const { images, isLoaded } = useImagePreloader(frameUrls);

  // Scroll tracking
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Transition 'Explosion' Intro (First 15%)
  const introProgress = useTransform(scrollYProgress, [0, 0.15], [0, 1]);
  const deviceScale = useTransform(introProgress, [0, 1], [0.4, 1]);
  const focalPointOpacity = useTransform(introProgress, [0, 0.5], [1, 0]);
  const introTextOpacity = useTransform(scrollYProgress, [0, 0.1, 0.2], [0, 1, 0]);

  // Map scroll to image frame (Start after intro)
  const currentFrame = useTransform(scrollYProgress, [0.1, 1], [0, 39]);

  useMotionValueEvent(currentFrame, 'change', (latest) => {
    const nextFrame = Math.floor(latest);
    if (nextFrame !== frameIndex) {
      setFrameIndex(nextFrame);
    }
  });

  // Canvas Drawing
  useEffect(() => {
    if (!isLoaded || !canvasRef.current || images.length === 0) return;

    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    if (!context) return;

    const img = images[frameIndex];
    if (!img) return;

    context.clearRect(0, 0, canvas.width, canvas.height);
    const scale = Math.min(canvas.width / img.width, canvas.height / img.height);
    const x = (canvas.width / 2) - (img.width / 2) * scale;
    const y = (canvas.height / 2) - (img.height / 2) * scale;
    context.drawImage(img, x, y, img.width * scale, img.height * scale);
  }, [frameIndex, images, isLoaded]);

  // Handle Resize
  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current) {
        const parent = canvasRef.current.parentElement;
        if (parent) {
          canvasRef.current.width = parent.clientWidth;
          canvasRef.current.height = parent.clientHeight;
          setFrameIndex((prev) => prev);
        }
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Spec Card Transitions (Delayed for intro)
  const card1Opacity = useTransform(scrollYProgress, [0.20, 0.30, 0.40], [0, 1, 0]);
  const card2Opacity = useTransform(scrollYProgress, [0.45, 0.55, 0.65], [0, 1, 0]);
  const card3Opacity = useTransform(scrollYProgress, [0.70, 0.80, 0.90], [0, 1, 0]);
  const card4Opacity = useTransform(scrollYProgress, [0.90, 0.95, 1.00], [0, 1, 1]);

  const cardOpacities = [card1Opacity, card2Opacity, card3Opacity, card4Opacity];

  return (
    <div ref={containerRef} className="relative h-[600vh] bg-[#050505] -mt-px" id="tracker-section">
      <div className="sticky top-0 h-screen w-full flex flex-col lg:flex-row items-center overflow-hidden">
        
        {/* Left Side: Expanded Device Canvas */}
        <div className="relative w-full lg:w-1/2 h-1/2 lg:h-full flex items-center justify-center p-2 lg:p-12">
          <div className="relative w-full max-w-3xl aspect-square flex items-center justify-center">
            <motion.div 
              style={{ scale: deviceScale, opacity: introProgress }}
              className="w-full h-full"
            >
              <canvas ref={canvasRef} className="w-full h-full object-contain z-10" />
            </motion.div>
            
            <div className="absolute inset-0 bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />
            
            {/* Handover Focal Point (Matching OperationsNarrative) */}
            <motion.div 
               style={{ opacity: focalPointOpacity, scale: useTransform(introProgress, [0, 0.2], [1, 1.5]) }}
               className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-white rounded-full shadow-[0_0_50px_#fff] z-50 pointer-events-none"
            />

            {!isLoaded && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-10 h-10 border-2 border-white/10 border-t-blue-500 rounded-full animate-spin" />
              </div>
            )}
          </div>
        </div>

        {/* Right Side: Information Narrative */}
        <div className="relative w-full lg:w-1/2 h-1/2 lg:h-full flex flex-col justify-center px-8 lg:px-24 border-l border-white/[0.05]">
          <div className="relative w-full max-w-xl">
            
            {/* Introductory Title (Transition State) */}
            <motion.div 
               style={{ opacity: introTextOpacity, y: useTransform(introTextOpacity, [0, 1], [20, 0]) }}
               className="absolute top-0 left-0 pt-12 lg:pt-0"
            >
              <h2 className="text-4xl lg:text-8xl font-sans font-light tracking-[0.25em] text-white uppercase mb-4">
                HARDWARE
              </h2>
              <p className="text-blue-400 font-mono tracking-widest uppercase text-xs font-bold flex items-center gap-3">
                <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                INITIALIZING CORE-SENSORS
              </p>
            </motion.div>

            {/* Feature Cards Loop */}
            {FEATURES.map((feature, i) => (
              <motion.div
                key={feature.title}
                style={{ opacity: cardOpacities[i] }}
                className="absolute inset-0 flex flex-col justify-center"
              >
                <div className="bg-white/[0.02] backdrop-blur-3xl border border-white/5 rounded-[2rem] p-8 lg:p-12 shadow-2xl">
                  <div className="flex items-center gap-6 mb-8">
                    <div className="w-16 h-16 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
                      <feature.icon className="w-8 h-8 text-blue-400" />
                    </div>
                    <div>
                      <h3 className="text-2xl lg:text-4xl font-sans font-light tracking-[0.1em] text-white uppercase">
                        {feature.title}
                      </h3>
                      <p className="text-[10px] lg:text-xs font-mono text-blue-400/60 uppercase tracking-widest mt-1">
                        {feature.specs}
                      </p>
                    </div>
                  </div>
                  <p className="text-base lg:text-xl text-white/50 leading-relaxed font-sans font-extralight tracking-wide">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}

          </div>
        </div>

      </div>

      {/* Global Background Glows */}
      <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-[20%] right-[-10%] w-[60%] h-[60%] bg-blue-900/10 rounded-full blur-[150px]" />
        <div className="absolute bottom-[10%] left-[-10%] w-[40%] h-[40%] bg-indigo-900/10 rounded-full blur-[150px]" />
      </div>
    </div>
  );
}
