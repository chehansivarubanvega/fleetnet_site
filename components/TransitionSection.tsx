'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import { useRef } from 'react';

gsap.registerPlugin(ScrollTrigger);

const CARDS = [
  {
    title: 'Dashboard',
    description: 'High-level operational overview with key fleet metrics and real-time activity tracking.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800'
  },
  {
    title: 'Live Map',
    description: 'Real-time visibility of vehicle locations, status, and movement history.',
    image: 'https://images.unsplash.com/photo-1526772662000-3f88f10405ff?auto=format&fit=crop&q=80&w=800'
  },
  {
    title: 'Driver Performance',
    description: 'Behavior scoring, compliance tracking, and safety reporting for every driver.',
    image: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&q=80&w=800'
  },
  {
    title: 'Maintenance',
    description: 'Scheduled and predictive service planning to reduce downtime and improve readiness.',
    image: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&q=80&w=800'
  },
  {
    title: 'Fuel & Charging',
    description: 'Operating cost capture and trend visibility for both ICE and Electric vehicles.',
    image: 'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?auto=format&fit=crop&q=80&w=800'
  },
  {
    title: 'EV Health',
    description: 'Specialized state-of-charge and battery temperature analytics for electric fleets.',
    image: 'https://images.unsplash.com/photo-1593941707874-ef25b8b4a92b?auto=format&fit=crop&q=80&w=800'
  },
  {
    title: 'Job Booking',
    description: 'Operational scheduling and execution tracking from assignment to completion.',
    image: 'https://images.unsplash.com/photo-1580674285054-bed31e145f59?auto=format&fit=crop&q=80&w=800'
  },
  {
    title: 'Notifications',
    description: 'A triage inbox for operational alerts, maintenance reminders, and safety events.',
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=800'
  },
  {
    title: 'Device Management',
    description: 'Manage GPS tracker units and deploy firmware updates across your fleet.',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc48?auto=format&fit=crop&q=80&w=800'
  }
];

export default function TransitionSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(() => {
    const cards = cardsRef.current;
    
    // Simple staggered reveal as the section scrolls into view
    gsap.set(cards, { 
      opacity: 0,
      y: 50
    });

    gsap.to(cards, {
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%", // Start revealing when the section is 20% into the viewport
        end: "bottom 80%",
        toggleActions: "play none none reverse"
      },
      opacity: 1,
      y: 0,
      stagger: 0.1,
      duration: 0.8,
      ease: "power3.out"
    });

  }, { scope: sectionRef });

  return (
    <section 
      ref={sectionRef} 
      className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden z-10 py-32 px-6"
    >
      <div className="max-w-7xl mx-auto text-center mb-20 text-white z-20">
        <h2 className="text-5xl md:text-7xl font-black tracking-tight mb-6">
          Visibility. Control. Insight.
        </h2>
        <p className="text-xl md:text-2xl text-white/70 max-w-3xl mx-auto font-medium">
          Everything you need to optimize your fleet operations from the ground up, built into one cohesive platform.
        </p>
      </div>

      <div 
        ref={containerRef}
        className="relative w-full max-w-7xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 z-20"
      >
        {CARDS.map((card, i) => (
          <div
            key={card.title}
            ref={(el) => { cardsRef.current[i] = el; }}
            className="group relative w-full aspect-[4/3] rounded-3xl overflow-hidden bg-black/40 border border-white/10 shadow-2xl will-change-transform transform transition-all duration-300 hover:scale-[1.02] hover:border-white/30"
          >
            <div className="relative w-full h-full p-8 md:p-10 flex flex-col justify-between">
              {/* Image Background */}
              <div className="absolute inset-0 z-0">
                <Image 
                  src={card.image} 
                  alt={card.title}
                  fill
                  className="object-cover opacity-40 mix-blend-luminosity group-hover:opacity-60 transition-opacity duration-500"
                  priority={i < 3}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/60 to-transparent" />
              </div>

              {/* Top Section: Checkmark */}
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-full bg-red-600/90 flex items-center justify-center shadow-[0_0_30px_rgba(220,38,38,0.4)] border flex-shrink-0 group-hover:bg-red-500 transition-colors">
                  <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
              
              {/* Bottom Section: Content */}
              <div className="relative z-10 mt-auto">
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-3 tracking-tight group-hover:text-red-400 transition-colors">
                  {card.title}
                </h3>
                <p className="text-sm md:text-base text-white/80 leading-relaxed font-medium">
                  {card.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
