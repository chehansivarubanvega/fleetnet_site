'use client';

import FluidBackground from '@/components/FluidBackground';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Award,
  Compass,
  ShieldCheck,
  Sparkles,
  Users
} from 'lucide-react';
import { motion } from 'motion/react';
import { useRef } from 'react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}


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

export default function AboutPage() {
  const mainRef = useRef<HTMLDivElement>(null);
  const storyRef = useRef<HTMLDivElement>(null);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(() => {
    // Background Global Interpolation
    const tlBg = gsap.timeline({
      scrollTrigger: {
        trigger: mainRef.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: true,
      }
    });

    const root = document.documentElement;

    tlBg.to(root, { 
      '--bg-base': '#1e293b',
      '--bg-color-1': 'rgba(15, 23, 42, 0.8)',
      '--bg-color-2': 'rgba(239, 68, 68, 0.3)',
      duration: 1
    })
    .to(root, {
      '--bg-base': '#050505',
      '--bg-color-1': 'rgba(239, 68, 68, 0.6)',
      '--bg-color-2': 'rgba(153, 27, 27, 0.5)',
      '--bg-color-3': 'rgba(69, 10, 10, 0.8)',
      duration: 1
    })
    .to(root, {
      '--bg-base': '#0f172a',
      '--bg-color-1': 'rgba(56, 189, 248, 0.3)',
      '--bg-color-2': 'rgba(14, 165, 233, 0.2)',
      duration: 1
    })
    .to(root, {
      '--bg-base': '#0a0a0a',
      '--bg-color-1': 'rgba(239, 68, 68, 0.5)',
      duration: 1
    });

    // Story Reel pinned timeline
    if (storyRef.current && stepRefs.current.length) {
      const steps = stepRefs.current;
      
      gsap.set(steps, { autoAlpha: 0, y: 80, scale: 0.95 });
      gsap.set(steps[0], { autoAlpha: 1, y: 0, scale: 1 });

      const tlStory = gsap.timeline({
        scrollTrigger: {
          trigger: storyRef.current,
          start: 'top top',
          end: '+=2500',
          scrub: true,
          pin: true,
          anticipatePin: 1,
        }
      });

      // Chapter 1 -> 2
      tlStory.to(steps[0], { autoAlpha: 0, y: -80, scale: 0.95, duration: 1, ease: 'power2.inOut' }, 1)
             .to(steps[1], { autoAlpha: 1, y: 0, scale: 1, duration: 1, ease: 'power2.out' }, 1.3)
      // Chapter 2 -> 3
             .to(steps[1], { autoAlpha: 0, y: -80, scale: 0.95, duration: 1, ease: 'power2.inOut' }, 3)
             .to(steps[2], { autoAlpha: 1, y: 0, scale: 1, duration: 1, ease: 'power2.out' }, 3.3)
             .to({}, { duration: 1 });
    }

    // Generic Reveals
    const reveals = gsap.utils.toArray('.gsap-reveal');
    reveals.forEach((el: any) => {
      gsap.fromTo(el, 
        { autoAlpha: 0, y: 50 },
        { 
          autoAlpha: 1, 
          y: 0, 
          duration: 0.8, 
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    });

    // Stagger Groups
    const staggerGroups = gsap.utils.toArray('.gsap-stagger-group');
    staggerGroups.forEach((group: any) => {
      const items = group.querySelectorAll('.gsap-stagger-item');
      gsap.fromTo(items,
        { autoAlpha: 0, y: 40 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: group,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    });

  }, { scope: mainRef });

  return (
    <main ref={mainRef} className="min-h-screen relative overflow-hidden transition-colors duration-700">
      <FluidBackground />
      <Navbar />

      {/* Hero */}
      <section className="relative z-10 pt-36 pb-24 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            className="absolute -top-32 -right-24 w-[28rem] h-[28rem] rounded-full bg-primary/20 blur-[120px]"
            animate={{ x: [0, -40, 0], y: [0, 40, 0] }}
            transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute bottom-[-10rem] left-[-6rem] w-[24rem] h-[24rem] rounded-full bg-red-500/20 blur-[120px]"
            animate={{ x: [0, 30, 0], y: [0, -30, 0] }}
            transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>

        <div className="max-w-6xl mx-auto px-6">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-xs md:text-sm text-white/60 uppercase tracking-[0.5em] font-bold mb-6"
          >
            About FleetNET GLOBAL
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-5xl md:text-7xl lg:text-8xl font-black text-white leading-[0.95] tracking-tight"
          >
            Driven by Innovation.
            <span className="block text-white/70">Engineered in Sri Lanka.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-8 text-lg md:text-2xl text-white/75 max-w-3xl leading-relaxed"
          >
            FleetNET GLOBAL was founded with a singular mission: to challenge the conventions of fleet
            management. We saw an opportunity to build a more integrated, intelligent, and intuitive
            solution by controlling both the hardware and software experience. Our story is one of
            innovation, partnership, and unwavering commitment to excellence.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-10 flex flex-wrap gap-4"
          >
            <button className="px-8 py-4 bg-white text-slate-900 rounded-full font-bold shadow-xl hover:scale-[1.03] transition-transform">
              Partner With Us
            </button>
            <button className="px-8 py-4 border border-white/40 text-white rounded-full font-bold hover:bg-white/10 transition-colors">
              Join Our Mission
            </button>
          </motion.div>
        </div>
      </section>

      {/* Story Intro */}
      <section className="relative z-20 bg-white py-24 rounded-t-[4rem] shadow-[0_-20px_60px_-15px_rgba(0,0,0,0.5)]">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-12 items-start">
          <div className="gsap-reveal">
            <p className="text-sm uppercase tracking-[0.4em] text-primary font-bold mb-4">Our Story</p>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 leading-tight">
              Founded in 2025 in the heart of Colombo, Sri Lanka
            </h2>
            <div className="space-y-6 text-slate-600 text-lg leading-relaxed">
              <p>
                FleetNET GLOBAL emerged from a simple observation: existing fleet management solutions
                were fragmented, unreliable, and failed to deliver the insights modern businesses needed.
              </p>
              <p>
                Our founders, with decades of combined experience in automotive technology, IoT systems,
                and enterprise software, recognized that true innovation required controlling the entire
                technology stack from the hardware sensors to the cloud analytics platform.
              </p>
              <p>
                Today, we&apos;re proud to serve thousands of vehicles, while maintaining our commitment to Sri Lankan engineering excellence and our partnership-first approach to customer success.
              </p>
            </div>
          </div>

          <div className="gsap-reveal relative rounded-3xl border border-slate-200 p-8 shadow-xl bg-gradient-to-br from-white to-slate-50">
            <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full bg-primary/10 blur-2xl" />
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
                  <Award className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-slate-400 font-bold">Purpose</p>
                  <p className="text-lg font-semibold text-slate-900">Integrated hardware + software</p>
                </div>
              </div>
              <div className="h-px bg-slate-200" />
              <div className="space-y-3 text-slate-600">
                <p className="font-semibold text-slate-900">Why it matters</p>
                <p>
                  Controlling the entire stack lets us deliver reliable data, faster innovation cycles,
                  and a consistent operator experience.
                </p>
              </div>
              <div className="flex items-center gap-3 text-primary font-semibold">
                <span className="w-10 h-[2px] bg-primary" />
                Engineering-first. Partner-led.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Storytelling Reel */}
      <section ref={storyRef} className="relative z-10 min-h-[220vh]">
        <div className="sticky top-0 h-screen flex items-center">
          <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-[0.8fr_1.2fr] gap-16 items-center">
            
            <div className="space-y-6 text-white z-20">
              <p className="text-xs uppercase tracking-[0.5em] text-primary font-black">Our Journey</p>
              <h2 className="text-5xl md:text-7xl font-black leading-[0.9] tracking-tighter">
                A story told in layers.
              </h2>
              <p className="text-xl text-white/60 leading-relaxed font-light">
                We built FleetNET GLOBAL by listening to operators first and engineering every layer of the
                platform for clarity, speed, and trust.
              </p>
              <div className="flex items-center gap-4 text-white/50 text-sm font-bold uppercase tracking-widest pt-4">
                <span className="w-16 h-[2px] bg-primary" />
                 Scroll to reveal
              </div>
            </div>

            <div className="relative min-h-[450px]">
              {STORY_STEPS.map((step, index) => (
                <div
                  key={step.title}
                  ref={(el) => { stepRefs.current[index] = el; }}
                  className="absolute inset-x-0 top-0"
                >
                  <div className="relative rounded-[3rem] border border-white/10 bg-[#0a0a0a]/80 backdrop-blur-2xl p-10 md:p-14 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.8)] overflow-hidden group">
                    
                    {/* Abstract Visual Elements */}
                    {index === 0 && (
                      <div className="absolute -right-20 -top-20 opacity-20 pointer-events-none group-hover:opacity-40 transition-opacity duration-1000">
                         <div className="w-96 h-96 border-[1px] border-red-500/50 rounded-full flex items-center justify-center animate-[spin_30s_linear_infinite]">
                            <div className="w-64 h-64 border-[2px] border-orange-500/30 rounded-full animate-[spin_15s_linear_infinite_reverse] border-dashed" />
                         </div>
                      </div>
                    )}
                    {index === 1 && (
                      <div className="absolute right-0 top-10 opacity-30 pointer-events-none group-hover:scale-110 transition-transform duration-1000">
                         <div className="relative w-64 h-64 transform -skew-x-12 rotate-[-15deg]">
                            <div className="absolute inset-0 border-[2px] border-red-500/40 rounded-2xl translate-y-[-2rem] bg-black/40 backdrop-blur flex items-center justify-center"><div className="w-20 h-1 bg-red-500/50 rounded-full" /></div>
                            <div className="absolute inset-0 border-[2px] border-orange-500/40 rounded-2xl bg-black/40 backdrop-blur flex items-center justify-center"><div className="w-20 h-1 bg-orange-500/50 rounded-full" /></div>
                            <div className="absolute inset-0 border-[2px] border-yellow-500/40 rounded-2xl translate-y-[2rem] bg-black/40 backdrop-blur flex items-center justify-center"><div className="w-20 h-1 bg-yellow-500/50 rounded-full" /></div>
                         </div>
                      </div>
                    )}
                     {index === 2 && (
                        <div className="absolute right-[-10%] top-[-10%] opacity-30 pointer-events-none">
                          <div className="w-80 h-80 rounded-full bg-gradient-to-tr from-red-600/40 to-transparent blur-3xl animate-pulse" />
                          <Compass className="w-80 h-80 text-white/10 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-[spin_40s_linear_infinite]" />
                        </div>
                     )}

                    <div className="relative z-10">
                      <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary mb-8">
                        <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                        <p className="text-xs uppercase tracking-[0.3em] font-black">{step.tag}</p>
                      </div>
                      <h3 className="text-4xl md:text-5xl font-black text-white mb-6 leading-tight tracking-tight">{step.title}</h3>
                      <p className="text-white/70 text-xl md:text-2xl leading-relaxed max-w-xl font-light">{step.body}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="relative z-20 bg-white py-32 rounded-y-[4rem]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="max-w-3xl gsap-reveal">
            <p className="text-sm uppercase tracking-[0.4em] text-primary font-bold mb-4">Our Principles</p>
            <h2 className="text-4xl md:text-6xl font-black text-slate-900 mb-6 leading-[1.1] tracking-tight">
              These values guide every solution we build.
            </h2>
          </div>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8 gsap-stagger-group">
            {VALUES.map((value) => (
              <div
                key={value.title}
                className="gsap-stagger-item rounded-[2.5rem] border border-slate-100 bg-white p-10 shadow-xl hover:shadow-2xl transition-all duration-300"
              >
                <div className="w-16 h-16 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-8">
                  <value.icon className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-black text-slate-900 mb-4 tracking-tight">{value.title}</h3>
                <p className="text-slate-600 leading-relaxed text-lg">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experts */}
      <section className="relative z-10 py-32">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="text-white gsap-reveal">
            <p className="text-xs uppercase tracking-[0.4em] text-white/60 font-black mb-4">Built By Experts</p>
            <h2 className="text-5xl md:text-6xl font-black leading-tight mb-8 tracking-tight">
              Built by Experts, For Experts
            </h2>
            <p className="text-xl text-white/70 leading-relaxed mb-10 font-light">
              Our team combines decades of experience in fleet management, IoT hardware development, and
              enterprise software engineering. The result is a platform that feels intentional at every
              level and evolves with your operations.
            </p>
            <div className="flex items-center gap-4 text-white/80 font-bold uppercase tracking-widest text-sm">
              <span className="w-12 h-[2px] bg-primary" />
              Engineering depth. Operational empathy.
            </div>
          </div>

          <div className="gsap-reveal rounded-[3rem] border border-white/10 bg-black/40 backdrop-blur-3xl p-12 text-white shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 blur-[80px] rounded-full group-hover:bg-primary/20 transition-colors duration-700" />
            
            <div className="flex items-center gap-5 mb-10 relative z-10">
              <div className="w-16 h-16 rounded-2xl bg-white/10 text-white flex items-center justify-center shadow-inner">
                <Sparkles className="w-8 h-8" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.4em] text-white/50 font-black mb-1">Capabilities</p>
                <p className="text-2xl font-bold tracking-tight">Hardware-to-Cloud</p>
              </div>
            </div>
            <ul className="space-y-6 text-white/70 text-lg relative z-10">
              <li className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center flex-shrink-0">
                  <span className="w-2 h-2 rounded-full bg-primary" />
                </div>
                Fleet-grade IoT hardware design & manufacturing
              </li>
              <li className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center flex-shrink-0">
                  <span className="w-2 h-2 rounded-full bg-primary" />
                </div>
                Enterprise analytics & AI-driven optimization
              </li>
              <li className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center flex-shrink-0">
                  <span className="w-2 h-2 rounded-full bg-primary" />
                </div>
                Deployment, onboarding, & long-term support
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Join Our Mission CTA */}
      <section className="relative z-20 py-32 bg-primary overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-white/10 blur-[100px] rounded-full" />
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-black/20 blur-[100px] rounded-full" />
        
        <div className="max-w-5xl mx-auto px-6 text-center relative z-10 gsap-reveal">
          <h2 className="text-5xl md:text-7xl font-black text-white mb-8 tracking-tighter">
            Join Our Mission
          </h2>
          <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-2xl mx-auto font-light leading-relaxed">
            Whether you&apos;re looking to transform your fleet operations or join our growing team, we&apos;d love
            to hear from you.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <button className="px-12 py-5 bg-white text-primary rounded-full font-black text-lg hover:scale-105 transition-transform shadow-2xl">
              Contact FleetNET
            </button>
            <button className="px-12 py-5 bg-transparent border-2 border-white/40 text-white rounded-full font-black text-lg hover:bg-white/10 transition-colors">
              Explore Careers
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
