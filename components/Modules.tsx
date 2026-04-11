'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  BarChart3,
  Bell,
  Cpu,
  Fuel,
  Map,
  ShieldCheck,
  Users,
  Wrench,
  Zap,
} from 'lucide-react';
import { useRef } from 'react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const modules = [
  {
    title: 'Dashboard',
    description:
      'High-level operational overview with key fleet metrics and real-time activity tracking.',
    icon: BarChart3,
    span: 'lg:col-span-2',
  },
  {
    title: 'Live Map',
    description:
      'Real-time visibility of vehicle locations, status, and movement history.',
    icon: Map,
    span: '',
  },
  {
    title: 'Driver Performance',
    description:
      'Behavior scoring, compliance tracking, and safety reporting for every driver.',
    icon: Users,
    span: '',
  },
  {
    title: 'Maintenance',
    description:
      'Scheduled and predictive service planning to reduce downtime and improve readiness.',
    icon: Wrench,
    span: 'lg:col-span-2',
  },
  {
    title: 'Fuel & Charging',
    description:
      'Operating cost capture and trend visibility for both ICE and Electric vehicles.',
    icon: Fuel,
    span: '',
  },
  {
    title: 'EV Health',
    description:
      'Specialized state-of-charge and battery temperature analytics for electric fleets.',
    icon: Zap,
    span: '',
  },
  {
    title: 'Job Booking',
    description:
      'Operational scheduling and execution tracking from assignment to completion.',
    icon: ShieldCheck,
    span: '',
  },
  {
    title: 'Notifications',
    description:
      'A triage inbox for operational alerts, maintenance reminders, and safety events.',
    icon: Bell,
    span: '',
  },
  {
    title: 'Device Management',
    description:
      'Manage GPS tracker units and deploy firmware updates across your fleet.',
    icon: Cpu,
    span: 'lg:col-span-2',
  },
];

export default function Modules() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!sectionRef.current) return;

      const cards = gridRef.current?.querySelectorAll('.module-card') ?? [];

      gsap.set(headingRef.current, { opacity: 0, y: 40 });
      gsap.set(cards, { opacity: 0, y: 40 });

      gsap.to(headingRef.current, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: headingRef.current,
          start: 'top 80%',
        },
      });

      gsap.to(cards, {
        opacity: 1,
        y: 0,
        stagger: 0.08,
        duration: 0.7,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: gridRef.current,
          start: 'top 80%',
        },
      });
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-[#0a0a0a] py-20 sm:py-36 lg:py-44 font-[family-name:var(--font-outfit)]"
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Section heading */}
        <div ref={headingRef} className="max-w-3xl mb-12 sm:mb-20">
          <span className="text-orange-400 text-xs font-bold uppercase tracking-[0.3em] mb-4 block">
            Platform Modules
          </span>
          <h2 className="text-3xl xs:text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-[1.05] tracking-tight mb-5">
            Everything your fleet
            <br />
            <span className="text-white/30">needs in one place.</span>
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-white/45 leading-relaxed font-medium max-w-xl">
            FleetNET integrates every aspect of your operations into a single,
            powerful command center — from live tracking to predictive
            maintenance.
          </p>
        </div>

        {/* Bento grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5"
        >
          {modules.map((mod) => (
            <div
              key={mod.title}
              className={`module-card group relative rounded-2xl md:rounded-3xl border border-white/[0.06] bg-white/[0.02] p-6 sm:p-9 transition-all duration-500 hover:bg-white/[0.05] hover:border-white/[0.12] overflow-hidden ${mod.span}`}
            >
              {/* Subtle hover glow */}
              <div className="absolute -top-16 -right-16 w-40 h-40 bg-orange-500/0 group-hover:bg-orange-500/[0.06] blur-[80px] rounded-full transition-all duration-700 pointer-events-none" />

              {/* Icon */}
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-orange-500/10 border border-orange-500/15 flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 group-hover:bg-orange-500/15 transition-all duration-500">
                <mod.icon className="w-5 h-5 md:w-[22px] md:h-[22px] text-orange-400" />
              </div>

              {/* Title */}
              <h3 className="text-base sm:text-xl font-bold text-white mb-2 tracking-tight group-hover:text-orange-300 transition-colors duration-300">
                {mod.title}
              </h3>

              {/* Description */}
              <p className="text-[13px] sm:text-[15px] text-white/45 leading-relaxed font-medium">
                {mod.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
