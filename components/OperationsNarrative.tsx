'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, MoveRight } from 'lucide-react';
import Image from 'next/image';
import { useRef } from 'react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// ─── Content Data ─────────────────────────────────────────────────────────────
const FEATURES = [
  {
    category: 'FOR OPERATORS',
    headline: 'Precision {control} for every asset.',
    description: 'Track your fleet in real-time with surgical accuracy. Monitor live telemetry, define geofences, and receive instant speed alerts directly on your dashboard.',
    tags: [
      { label: 'Live Tracking', href: '#' },
      { label: 'Geofencing', href: '#' },
      { label: 'Speed Alerts', href: '#' },
    ],
    mockup: '/images/operations/telemetry.png',
    accent: '#ef4444',
  },
  {
    category: 'FOR DRIVERS',
    headline: 'Empower {drivers} with actionable data.',
    description: 'Transform raw data into driver excellence. Score performance based on safety and behavior, giving your team the insights they need to stay safe and efficient.',
    tags: [
      { label: 'Safety Scores', href: '#' },
      { label: 'Behavior Analytics', href: '#' },
      { label: 'Shift Logs', href: '#' },
    ],
    mockup: '/images/operations/driver-scoring.png',
    accent: '#3b82f6',
  },
  {
    category: 'FOR MANAGERS',
    headline: 'Optimise {lifecycle} costs and efficiency.',
    description: 'Extend the lifespan of your assets with intelligent scheduling. Track fuel recovery, cost reporting, and smart maintenance in one unified lifecycle manager.',
    tags: [
      { label: 'Smart Servicing', href: '#' },
      { label: 'Fuel Recovery', href: '#' },
      { label: 'Cost Reports', href: '#' },
    ],
    mockup: '/images/operations/asset-intelligence.png',
    accent: '#f97316',
  },
];

// ─── Sub-Components ───────────────────────────────────────────────────────────

const PillTag = ({ label, href }: { label: string; href: string }) => (
  <a 
    href={href}
    className="group inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-stone-200 hover:border-black transition-all duration-300 shadow-sm"
  >
    <span className="text-stone-600 group-hover:text-black text-sm font-semibold tracking-tight">{label}</span>
    <MoveRight className="w-3.5 h-3.5 text-stone-300 group-hover:text-black group-hover:translate-x-0.5 transition-all" />
  </a>
);

const SectionHeadline = ({ text }: { text: string }) => {
  const parts = text.split(/\{|\}/);
  return (
    <h2 className="text-4xl sm:text-5xl lg:text-7xl font-black text-stone-900 leading-[0.9] tracking-tighter mb-6">
      {parts.map((p, i) => (
        i % 2 === 1 ? <span key={i} className="text-[#ef4444] italic font-medium">{p}</span> : p
      ))}
    </h2>
  );
};

export default function OperationsNarrative() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const cards = gsap.utils.toArray<HTMLElement>('.feature-card');
    cards.forEach((card) => {
      gsap.fromTo(card,
        { autoAlpha: 0, y: 100, scale: 0.95 },
        {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          duration: 1.2,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    });
  }, { scope: containerRef });

  return (
    <section 
      ref={containerRef}
      className="relative w-full py-20 lg:py-40 px-4 sm:px-6 lg:px-12 bg-[#080c14] font-[family-name:var(--font-outfit)] flex flex-col gap-12 lg:gap-24 scroll-mt-32"
    >
      <div className="max-w-7xl mx-auto w-full mb-10 text-center pt-32 lg:pt-0">
        <p className="text-white/40 text-[10px] sm:text-[11px] tracking-[0.4em] uppercase font-black mb-4">
          Core Operations
        </p>
        <h3 className="text-3xl sm:text-5xl font-black text-white leading-tight tracking-tighter">
          Built for every <span className="text-white/20 italic">stakeholder.</span>
        </h3>
      </div>

      {FEATURES.map((feat, i) => (
        <div
          key={feat.category}
          className="feature-card relative w-full max-w-7xl mx-auto rounded-[2rem] sm:rounded-[3rem] lg:rounded-[4rem] bg-[#faf7f2] overflow-hidden shadow-2xl transition-all duration-700"
        >
          <div className="flex flex-col lg:flex-row items-center justify-between p-8 sm:p-12 lg:p-24 gap-12 lg:gap-20">
            
            {/* Left Content */}
            <div className="w-full lg:w-[50%] flex flex-col items-start text-left">
              <span 
                className="text-xs sm:text-sm font-black tracking-[0.3em] uppercase mb-6 sm:mb-8"
                style={{ color: feat.accent }}
              >
                {feat.category}
              </span>
              
              <SectionHeadline text={feat.headline} />
              
              <p className="text-lg sm:text-xl text-stone-500 leading-relaxed max-w-lg mb-8 sm:mb-12 font-medium tracking-tight">
                {feat.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 sm:gap-3 mb-10 sm:mb-16">
                {feat.tags.map(tag => (
                  <PillTag key={tag.label} {...tag} />
                ))}
              </div>

              {/* CTA */}
              <button className="group flex items-center gap-4 bg-stone-900 hover:bg-stone-800 text-white px-8 py-5 rounded-full font-black text-base sm:text-lg transition-all shadow-xl hover:scale-105 active:scale-95">
                <span>View Solution</span>
                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors">
                  <ArrowRight className="w-5 h-5" />
                </div>
              </button>
            </div>

            {/* Right Mockup */}
            <div className="w-full lg:w-[45%] relative aspect-[14/15] lg:aspect-square flex items-center justify-center">
              {/* Soft background decor */}
              <div 
                className="absolute inset-0 rounded-[2rem] sm:rounded-[3rem] opacity-[0.2]"
                style={{ backgroundColor: feat.accent }}
              />
              
              {/* Phone Mockup Frame (Simplified CSS Frame) */}
              <div className="relative w-full max-w-[340px] aspect-[9/18.5] bg-stone-900 rounded-[2.5rem] p-3 shadow-2xl border-4 border-stone-800 transform rotate-[-2deg] hover:rotate-0 transition-transform duration-700">
                <div className="relative w-full h-full rounded-[1.8rem] overflow-hidden bg-white">
                  <Image 
                    src={feat.mockup}
                    alt={feat.headline}
                    fill
                    className="object-cover"
                  />
                  {/* Glass overlay */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-white/10 via-transparent to-transparent pointer-events-none" />
                </div>
                {/* Speaker/Sensors mockup detail */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-6 bg-stone-900 rounded-b-2xl mt-[-2px]" />
              </div>
            </div>

          </div>
        </div>
      ))}

      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
}
