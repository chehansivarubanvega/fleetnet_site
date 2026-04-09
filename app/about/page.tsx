'use client';

import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import {
  Award,
  Compass,
  ShieldCheck,
  Sparkles,
  Users,
  Target
} from 'lucide-react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
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

const VALUES = [
  {
    title: 'Mission-Driven Innovation',
    description: 'Every feature begins with a real operational challenge, then ships as a measurable improvement for the people on the ground.',
    icon: Sparkles
  },
  {
    title: 'Uncompromising Quality',
    description: 'We hold the line on precision in hardware manufacturing and software delivery so mission-critical fleets can depend on us.',
    icon: ShieldCheck
  },
  {
    title: 'Future Vision, Local Roots',
    description: 'Sri Lankan ingenuity powers our roadmap, while we continue to invest in local talent and long-term partnerships.',
    icon: Compass
  },
  {
    title: 'Customer-Centric Partnership',
    description: 'We treat every deployment as a shared mission, aligning teams, playbooks, and support to your success.',
    icon: Users
  },
];

function StoryScroll() {
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

  // Step 1
  const step1Opacity = useTransform(smoothProgress, [0, 0.15, 0.25, 0.35], [0, 1, 1, 0]);
  const step1Y = useTransform(smoothProgress, [0, 0.35], ["15%", "-15%"]);
  
  // Step 2
  const step2Opacity = useTransform(smoothProgress, [0.3, 0.45, 0.6, 0.7], [0, 1, 1, 0]);
  const step2Y = useTransform(smoothProgress, [0.3, 0.7], ["15%", "-15%"]);

  // Step 3
  const step3Opacity = useTransform(smoothProgress, [0.65, 0.8, 1], [0, 1, 1]);
  const step3Y = useTransform(smoothProgress, [0.65, 1], ["15%", "0%"]);

  // Progress Bar Line
  const lineWidth = useTransform(smoothProgress, [0, 1], ["0%", "100%"]);

  return (
    <section ref={containerRef} className="relative h-[400vh] bg-[#050505]">
      <div className="sticky top-0 h-screen w-full flex flex-col justify-center overflow-hidden">
        
        {/* Background Ambient Layers */}
        <div className="absolute inset-0 pointer-events-none">
           <motion.div 
             className="absolute top-1/4 left-1/4 w-[40vw] h-[40vw] bg-primary/10 rounded-full blur-[140px] opacity-30"
           />
           <motion.div 
             className="absolute bottom-1/4 right-1/4 w-[30vw] h-[30vw] bg-red-500/10 rounded-full blur-[140px] opacity-20"
           />
        </div>

        <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-[0.8fr_1.2fr] gap-16 relative z-10">
          
          {/* Sticky Context Sidebar */}
          <div className="space-y-6 text-white self-center">
            <p className="text-xs uppercase tracking-[0.5em] text-primary font-black">Our Journey</p>
            <h2 className="text-5xl md:text-7xl font-black leading-[0.9] tracking-tighter">
              A story told in<br/><span className="text-white/20 italic">LAYERS.</span>
            </h2>
            <p className="text-xl text-white/50 leading-relaxed font-medium">
              We built FleetNET GLOBAL by listening to operators first and engineering every layer of the
              platform for clarity, speed, and trust.
            </p>
            
            {/* Timeline Progress */}
            <div className="pt-8">
               <div className="h-[2px] w-full bg-white/10 rounded-full overflow-hidden">
                 <motion.div 
                    style={{ width: lineWidth }}
                    className="h-full bg-primary"
                 />
               </div>
            </div>
          </div>

          {/* Sequential Floating Panels */}
          <div className="relative min-h-[400px] flex items-center justify-center">
            
            {/* Chapter 1 */}
            <motion.div 
              style={{ opacity: step1Opacity, y: step1Y }}
              className="absolute w-full rounded-[2rem] border border-white/5 bg-white/[0.02] backdrop-blur-2xl p-10 md:p-14"
            >
              <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary mb-8">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                <p className="text-xs uppercase tracking-[0.3em] font-black">{STORY_STEPS[0].tag}</p>
              </div>
              <h3 className="text-4xl md:text-5xl font-black text-white mb-6 leading-tight tracking-tight">{STORY_STEPS[0].title}</h3>
              <p className="text-white/50 text-xl md:text-2xl leading-relaxed font-medium">{STORY_STEPS[0].body}</p>
            </motion.div>

            {/* Chapter 2 */}
            <motion.div 
              style={{ opacity: step2Opacity, y: step2Y }}
              className="absolute w-full rounded-[2rem] border border-white/5 bg-white/[0.02] backdrop-blur-2xl p-10 md:p-14 pointer-events-none"
            >
              <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary mb-8">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                <p className="text-xs uppercase tracking-[0.3em] font-black">{STORY_STEPS[1].tag}</p>
              </div>
              <h3 className="text-4xl md:text-5xl font-black text-white mb-6 leading-tight tracking-tight">{STORY_STEPS[1].title}</h3>
              <p className="text-white/50 text-xl md:text-2xl leading-relaxed font-medium">{STORY_STEPS[1].body}</p>
            </motion.div>

            {/* Chapter 3 */}
            <motion.div 
              style={{ opacity: step3Opacity, y: step3Y }}
              className="absolute w-full rounded-[2rem] border border-white/5 bg-white/[0.02] backdrop-blur-2xl p-10 md:p-14 pointer-events-none"
            >
              <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary mb-8">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                <p className="text-xs uppercase tracking-[0.3em] font-black">{STORY_STEPS[2].tag}</p>
              </div>
              <h3 className="text-4xl md:text-5xl font-black text-white mb-6 leading-tight tracking-tight">{STORY_STEPS[2].title}</h3>
              <p className="text-white/50 text-xl md:text-2xl leading-relaxed font-medium">{STORY_STEPS[2].body}</p>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  )
}

function AboutHeroScroll() {
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
    <section ref={containerRef} className="relative h-[500vh] bg-[#050505]">
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden pointer-events-none">
        <motion.div
          style={{ opacity: gridOpacity, y: gridY }}
          className="absolute inset-0 w-full h-[120%] bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:100px_100px]"
        />

        <motion.div
          style={{ x: glowX, y: glowY }}
          className="absolute top-1/4 left-1/4 w-[50vw] h-[50vw] bg-primary/20 rounded-full blur-[180px] opacity-35"
        />
        <motion.div
          style={{
            x: useTransform(smoothProgress, [0, 1], ['18%', '-20%']),
            y: useTransform(smoothProgress, [0, 1], ['12%', '-10%'])
          }}
          className="absolute bottom-1/4 right-1/4 w-[40vw] h-[40vw] bg-red-500/10 rounded-full blur-[180px] opacity-30"
        />

        <motion.div
          aria-hidden
          animate={{
            borderRadius: [
              '46% 54% 66% 34% / 36% 44% 56% 64%',
              '59% 41% 48% 52% / 58% 38% 62% 42%',
              '42% 58% 34% 66% / 48% 64% 36% 52%',
              '46% 54% 66% 34% / 36% 44% 56% 64%'
            ],
            rotate: [0, 8, -6, 0],
            scale: [1, 1.12, 0.96, 1]
          }}
          transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-[18%] right-[14%] w-[28vw] h-[28vw] min-w-[220px] min-h-[220px] bg-gradient-to-br from-primary/25 via-primary/10 to-white/10 blur-[2px] mix-blend-screen"
        />

        <motion.div
          aria-hidden
          animate={{
            borderRadius: [
              '66% 34% 52% 48% / 44% 58% 42% 56%',
              '38% 62% 56% 44% / 62% 38% 52% 48%',
              '52% 48% 38% 62% / 42% 56% 44% 58%',
              '66% 34% 52% 48% / 44% 58% 42% 56%'
            ],
            rotate: [0, -7, 5, 0],
            scale: [1, 0.94, 1.08, 1]
          }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
          className="absolute bottom-[16%] left-[10%] w-[22vw] h-[22vw] min-w-[180px] min-h-[180px] bg-gradient-to-tr from-white/10 via-primary/10 to-primary/25 blur-[3px] mix-blend-screen"
        />

        <motion.div
          style={{ opacity: phantomOpacity, scale: phantomScale }}
          className="absolute text-[24vw] font-black text-white uppercase leading-none select-none tracking-[0.18em] whitespace-nowrap z-0"
        >
          ABOUT
        </motion.div>

        <div className="relative z-10 w-full h-full max-w-7xl mx-auto px-8 flex items-center justify-center">
          <motion.div
            style={{ opacity: step1Opacity, scale: step1Scale, y: step1Y, letterSpacing: step1Tracking }}
            className="absolute inset-0 flex flex-col items-center justify-center text-center"
          >
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.8 }}
              className="text-primary text-xs md:text-sm font-black uppercase tracking-[0.8em] mb-12"
            >
              About FleetNET
            </motion.span>
            <h1 className="text-6xl md:text-[8vw] font-black text-white leading-[0.9] tracking-tighter">
              DRIVEN BY
              <br />
              <span className="text-white/25 italic tracking-tight">INNOVATION</span>
            </h1>
          </motion.div>

          <motion.div
            style={{ opacity: step2Opacity, scale: step2Scale, y: step2Y }}
            className="absolute inset-0 flex flex-col items-center justify-center text-center z-20"
          >
            <div className="max-w-5xl px-6">
              <h2 className="text-4xl md:text-[6vw] font-black text-white leading-[0.95] tracking-tight mb-8">
                ONE COMPANY.
                <br />
                <span className="text-primary tracking-[0.1em]">FULL-STACK CONTROL.</span>
              </h2>
              <div className="w-px h-16 bg-gradient-to-b from-primary to-transparent mx-auto mb-8" />
              <p className="text-lg md:text-3xl text-white/50 max-w-3xl mx-auto font-medium leading-tight tracking-wide">
                FleetNET GLOBAL was built to own the complete journey from sensor hardware to operational intelligence.
              </p>
            </div>
          </motion.div>

          <motion.div
            style={{ opacity: step3Opacity, y: step3Y, scale: step3Scale }}
            className="absolute inset-0 flex flex-col items-center justify-center text-center z-30 pointer-events-auto"
          >
            <div className="relative px-6">
              <motion.div
                className="absolute -top-16 left-1/2 -translate-x-1/2 w-px h-12 bg-gradient-to-t from-white/30 to-transparent"
                style={{ scaleY: useTransform(smoothProgress, [0.66, 1], [0, 1]) }}
              />
              <h3 className="text-4xl md:text-[5vw] font-black text-white leading-[0.95] tracking-tighter mb-8">
                A LEGACY BUILT
                <br />
                <span className="text-primary italic">WITH PURPOSE</span>
              </h3>
              <p className="text-white/50 text-lg md:text-2xl max-w-3xl mx-auto font-medium mb-10">
                Discover how Sri Lankan engineering and customer-first execution shaped our platform.
              </p>
              <div className="flex flex-wrap justify-center gap-5">
                <button className="px-10 py-4 bg-white text-black font-black uppercase tracking-[0.2em] text-sm hover:bg-primary transition-colors rounded-full shadow-[0_0_36px_rgba(255,255,255,0.08)]">
                  Partner With Us
                </button>
                <button className="px-10 py-4 bg-transparent border-2 border-white/10 text-white font-black uppercase tracking-[0.2em] text-sm hover:border-white transition-all rounded-full">
                  Join Our Mission
                </button>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="absolute inset-0 opacity-[0.04] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]" />
      </div>
    </section>
  );
}

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#050505] text-white selection:bg-primary/30 selection:text-white">
      <Navbar />

      {/* Hero */}
      <AboutHeroScroll />

      {/* Origin Story Spec */}
      <section className="relative z-20 bg-[#050505] py-24 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-16 items-start">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-sm uppercase tracking-[0.5em] text-white/30 font-black mb-6">Origin Specification</p>
            <h2 className="text-4xl md:text-6xl font-black text-white mb-8 leading-[0.95] tracking-tight">
              FOUNDED IN COLOMBO,<br/><span className="text-white/20">SRI LANKA.</span>
            </h2>
            <div className="space-y-6 text-white/50 text-xl leading-relaxed font-medium max-w-2xl">
              <p>
                FleetNET GLOBAL emerged from a simple observation: existing fleet management solutions
                were fragmented, unreliable, and failed to deliver the insights modern businesses needed.
              </p>
              <p>
                Our founders recognized that true innovation required controlling the entire
                technology stack—from hardware sensors to the cloud analytics platform.
              </p>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative rounded-3xl border border-white/10 bg-white/[0.02] p-10 backdrop-blur-md"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 blur-[60px] rounded-full pointer-events-none" />
            <div className="space-y-8 relative z-10">
              <div className="flex items-start gap-6">
                <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-primary shrink-0">
                  <Award className="w-8 h-8" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.4em] text-white/30 font-black mb-2">Purpose</p>
                  <p className="text-2xl font-bold text-white tracking-tight">Integrated Architecture</p>
                </div>
              </div>
              <div className="h-px bg-white/10" />
              <div className="space-y-3 text-white/50 font-medium">
                <p className="font-bold text-white uppercase text-sm tracking-widest">Why it matters</p>
                <p className="leading-relaxed">
                  Controlling the entire stack lets us deliver uncompromised data reliability, rapid innovation cycles,
                  and a seamless operator experience.
                </p>
              </div>
              <div className="flex items-center gap-4 text-primary font-black uppercase tracking-[0.2em] text-xs">
                <span className="w-10 h-[2px] bg-primary" />
                Engineering-first. Partner-led.
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Storytelling Reel */}
      <StoryScroll />

      {/* Core Values */}
      <section className="relative z-20 py-32 bg-[#050505] border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mb-24">
            <span className="text-primary font-black uppercase tracking-[0.6em] text-sm mb-4 block flex items-center gap-4">
               <Target className="w-5 h-5" /> Our Principles
            </span>
            <h2 className="text-5xl md:text-7xl font-black mb-8 leading-[0.95] tracking-tighter text-white">
              GUIDING EVERY <span className="text-white/20">SOLUTION.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/5 border border-white/5 rounded-3xl overflow-hidden">
            {VALUES.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group relative bg-[#0a0a0a] p-10 lg:p-16 hover:bg-white/[0.02] transition-all duration-500 overflow-hidden"
              >
                {/* Glow effect on hover */}
                <div className="absolute -inset-24 bg-primary/20 blur-[120px] rounded-full opacity-0 group-hover:opacity-100 transition-all duration-700 pointer-events-none" />
                
                <div className="relative z-10">
                  <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-10 text-primary group-hover:scale-110 group-hover:border-primary/30 transition-all duration-500">
                    <value.icon className="w-8 h-8" />
                  </div>
                  
                  <h3 className="text-3xl font-black mb-6 tracking-tight group-hover:translate-x-2 transition-transform duration-500">
                    {value.title}
                  </h3>
                  
                  <p className="text-white/50 text-lg leading-relaxed font-medium">
                    {value.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Experts */}
      <section className="relative z-10 py-32 bg-[#050505]">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-white"
          >
            <p className="text-xs uppercase tracking-[0.6em] text-white/40 font-black mb-6">Execution</p>
            <h2 className="text-5xl md:text-7xl font-black leading-[0.9] mb-8 tracking-tighter">
              BUILT BY <br/><span className="italic text-primary">EXPERTS.</span>
            </h2>
            <p className="text-xl text-white/50 leading-relaxed mb-10 font-medium max-w-xl">
              Our team combines decades of experience in fleet management, IoT hardware development, and
              enterprise software engineering. The result is a platform that feels intentional at every
              level and evolves with your operations.
            </p>
            <div className="flex items-center gap-4 text-white/40 font-black uppercase tracking-widest text-xs">
              <span className="w-12 h-[2px] bg-primary" />
              Engineering depth. Operational empathy.
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="rounded-[3rem] border border-white/5 bg-white/[0.02] p-12 text-white relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 blur-[80px] rounded-full group-hover:bg-primary/20 transition-colors duration-700 pointer-events-none" />
            
            <div className="flex items-center gap-6 mb-12 relative z-10">
              <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 text-white flex items-center justify-center">
                <Sparkles className="w-8 h-8" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.4em] text-primary font-black mb-1">Capabilities</p>
                <p className="text-3xl font-black tracking-tight">Hardware-to-Cloud</p>
              </div>
            </div>
            
            <ul className="space-y-8 text-white/50 text-xl font-medium relative z-10">
              <li className="flex items-center gap-6">
                <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0">
                  <span className="w-2 h-2 rounded-full bg-primary" />
                </div>
                Fleet-grade IoT hardware design & manufacturing.
              </li>
              <li className="flex items-center gap-6">
                <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0">
                  <span className="w-2 h-2 rounded-full bg-primary" />
                </div>
                Enterprise analytics & AI-driven optimization.
              </li>
              <li className="flex items-center gap-6">
                <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0">
                  <span className="w-2 h-2 rounded-full bg-primary" />
                </div>
                Deployment, onboarding, & long-term support.
              </li>
            </ul>
          </motion.div>
        </div>
      </section>

      {/* Premium CTA */}
      <section className="py-40 bg-[#050505] relative overflow-hidden border-t border-white/5">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white/[0.02] text-[20vw] font-black uppercase leading-none select-none pointer-events-none">
          FLEETNET
        </div>
        
        <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="flex flex-col items-center"
          >
             <div className="w-px h-24 bg-gradient-to-b from-transparent via-primary to-transparent mb-12" />
             <h2 className="text-5xl md:text-8xl font-black mb-10 leading-[0.9] tracking-tighter text-white">
               READY TO <span className="text-primary italic">OPTIMIZE?</span>
             </h2>
             <p className="text-xl md:text-2xl text-white/50 mb-12 max-w-2xl font-medium">
              Whether you&apos;re looking to transform your fleet operations or join our mission, we&apos;re ready to engineer the future together.
             </p>
             <div className="flex flex-wrap justify-center gap-6">
                <button className="px-12 py-5 bg-white text-black font-black uppercase tracking-[0.2em] text-sm hover:bg-primary transition-all shadow-[0_0_40px_rgba(255,255,255,0.1)] rounded-full border border-white hover:border-primary">
                  Contact FleetNET
                </button>
                <button className="px-12 py-5 bg-transparent border-2 border-white/10 text-white font-black uppercase tracking-[0.2em] text-sm hover:border-white transition-all rounded-full">
                  Explore Careers
                </button>
             </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
