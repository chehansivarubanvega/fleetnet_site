'use client';

import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { useRef } from 'react';

const STORY_STEPS = [
  {
    tag: 'Chapter 01',
    title: 'The Observation',
    body: 'In Colombo, we saw fleets running on disconnected tools that could not explain what was really happening on the road. We believed clarity had to be engineered into the system itself.'
  },
  {
    tag: 'Chapter 02',
    title: 'Full-Stack Control',
    body: 'Our founders united automotive technology, IoT hardware, and enterprise software to control the entire stack. From sensors to analytics, every layer was designed to speak the same language.'
  },
  {
    tag: 'Chapter 03',
    title: 'Scale & Impact',
    body: 'Today, FleetNET GLOBAL supports thousands of vehicles while staying committed to Sri Lankan engineering excellence and a partnership-first culture.'
  }
];

export default function StoryScroll() {
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

  const step1Opacity = useTransform(smoothProgress, [0, 0.15, 0.25, 0.35], [0, 1, 1, 0]);
  const step1Y = useTransform(smoothProgress, [0, 0.35], ["15%", "-15%"]);
  const step2Opacity = useTransform(smoothProgress, [0.3, 0.45, 0.6, 0.7], [0, 1, 1, 0]);
  const step2Y = useTransform(smoothProgress, [0.3, 0.7], ["15%", "-15%"]);
  const step3Opacity = useTransform(smoothProgress, [0.65, 0.8, 1], [0, 1, 1]);
  const step3Y = useTransform(smoothProgress, [0.65, 1], ["15%", "0%"]);
  const lineWidth = useTransform(smoothProgress, [0, 1], ["0%", "100%"]);

  return (
    <section ref={containerRef} className="relative h-[400vh] bg-[#050505]">
      <div className="sticky top-0 h-screen w-full flex flex-col justify-center overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
           <motion.div 
             className="absolute top-1/4 left-1/4 w-[40vw] h-[40vw] bg-primary/10 rounded-full blur-[140px] opacity-30"
           />
           <motion.div 
             className="absolute bottom-1/4 right-1/4 w-[30vw] h-[30vw] bg-red-500/10 rounded-full blur-[140px] opacity-20"
           />
        </div>

        <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-[0.8fr_1.2fr] gap-16 relative z-10">
          <div className="space-y-6 text-white self-center">
            <p className="text-xs uppercase tracking-[0.5em] text-primary font-black">Our Journey</p>
            <h2 className="text-5xl md:text-7xl font-black leading-[0.9] tracking-tighter">
              A story told in<br/><span className="text-white/20 italic">LAYERS.</span>
            </h2>
            <p className="text-xl text-white/50 leading-relaxed font-medium">
              We built FleetNET GLOBAL by listening to operators first and engineering every layer of the
              platform for clarity, speed, and trust.
            </p>
            <div className="pt-8">
               <div className="h-[2px] w-full bg-white/10 rounded-full overflow-hidden">
                 <motion.div 
                    style={{ width: lineWidth }}
                    className="h-full bg-primary"
                 />
               </div>
            </div>
          </div>

          <div className="relative min-h-[400px] flex items-center justify-center">
            {[step1Opacity, step2Opacity, step3Opacity].map((opacity, i) => (
              <motion.div 
                key={i}
                style={{ opacity, y: i === 0 ? step1Y : i === 1 ? step2Y : step3Y }}
                className="absolute w-full rounded-[2rem] border border-white/5 bg-white/[0.02] backdrop-blur-2xl p-10 md:p-14"
              >
                <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary mb-8">
                  <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                  <p className="text-xs uppercase tracking-[0.3em] font-black">{STORY_STEPS[i].tag}</p>
                </div>
                <h3 className="text-4xl md:text-5xl font-black text-white mb-6 leading-tight tracking-tight">{STORY_STEPS[i].title}</h3>
                <p className="text-white/50 text-xl md:text-2xl leading-relaxed font-medium">{STORY_STEPS[i].body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
