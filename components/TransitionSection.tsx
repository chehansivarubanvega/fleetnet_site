'use client';

import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import Image from 'next/image';

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
    
    // 1. Initial State & Entrance Animation
    gsap.set(cards, { 
      scale: 0, 
      opacity: 0,
      x: 0,
      y: 0,
      rotation: (i) => (i - (CARDS.length - 1) / 2) * 2 // Very subtle initial fan
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        end: "top 20%",
        toggleActions: "play none none reverse"
      }
    });

    tl.to(cards, {
      scale: 1,
      opacity: 1,
      rotation: (i) => {
        const total = CARDS.length - 1;
        const progress = i / total; // 0 to 1
        return -10 + (progress * 20); // -10 to 10
      },
      stagger: 0.1,
      duration: 1.2,
      ease: "elastic.out(1, 0.75)"
    });

    // 2. Idle Floating Effect (Oscillation)
    cards.forEach((card, i) => {
      gsap.to(card, {
        y: "+=15",
        duration: 2 + i * 0.2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: i * 0.1
      });
    });

    // 3. Scroll-Scrubbed Multi-Phase Timeline
    const mainTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "+=4000", // Increased distance for 3 phases
        scrub: 1,
        pin: true,
        anticipatePin: 1
      }
    });

    // --- PHASE 1: Stack to 3-Stacks (Shuffle) ---
    const stackCols = 3;
    const stackSpacing = 450; // Horizontal distance between stacks
    
    cards.forEach((card, i) => {
      if (!card) return;
      const stackIndex = i % stackCols; // 0, 1, or 2
      const cardInStackIndex = Math.floor(i / stackCols); // 0, 1, or 2
      
      const targetX = (stackIndex - 1) * stackSpacing;
      // Slight vertical offset within the stack for "messy" shuffle look
      const targetY = cardInStackIndex * 4; 
      const targetRotation = (cardInStackIndex - 1) * 3; // -3, 0, 3 deg

      mainTimeline.to(card, {
        x: targetX,
        y: targetY,
        rotation: targetRotation,
        duration: 1,
        ease: "back.out(1.2)" // Shuffling feel
      }, 0);
    });

    // Add a pause in the 3-stack layout for reading
    mainTimeline.to({}, { duration: 0.8 }); 

    // --- PHASE 2: 3-Stacks to Scatter ---
    cards.forEach((card, i) => {
      if (!card) return;
      const stackIndex = i % stackCols;
      const angle = (stackIndex / stackCols) * Math.PI * 2 + (Math.random() * 0.5);
      const distance = 1500;
      const scatterX = Math.cos(angle) * distance;
      const scatterY = Math.sin(angle) * distance;

      mainTimeline.to(card, {
        x: scatterX,
        y: scatterY,
        rotation: gsap.utils.random(-90, 90),
        opacity: 0,
        scale: 0.2,
        duration: 1.5,
        ease: "power2.in"
      }, ">-1.2"); // Staggered start of scattering
    });

  }, { scope: sectionRef });

  return (
    <section 
      ref={sectionRef} 
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden z-10 py-20"
    >
      <div 
        ref={containerRef}
        className="relative w-full max-w-4xl aspect-[4/3] flex items-center justify-center"
      >
        {CARDS.map((card, i) => (
          <div
            key={card.title}
            ref={(el) => { cardsRef.current[i] = el; }}
            className="absolute w-[280px] md:w-[320px] aspect-[10/14] rounded-2xl overflow-hidden bg-black/80 border-4 border-white shadow-[0_20px_50px_rgba(0,0,0,0.5)] will-change-transform"
            style={{ zIndex: CARDS.length - i }}
          >
            <div className="relative w-full h-full p-8 flex flex-col justify-between">
              {/* Image Background */}
              <div className="absolute inset-0 z-0">
                <Image 
                  src={card.image} 
                  alt={card.title}
                  fill
                  className="object-cover opacity-40 mix-blend-luminosity"
                  priority={i < 3}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
              </div>

              {/* Top Section: Checkmark */}
              <div className="relative z-10">
                <div className="w-10 h-10 rounded-full bg-red-600 flex items-center justify-center shadow-lg border-2 border-white">
                  <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
              
              {/* Bottom Section: Content */}
              <div className="relative z-10">
                <h3 className="text-3xl font-black text-white mb-3 tracking-tight leading-none group-hover:text-red-500 transition-colors">
                  {card.title}
                </h3>
                <p className="text-base text-white/90 leading-relaxed font-medium">
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
