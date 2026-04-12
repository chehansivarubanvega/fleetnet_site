'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  ArrowRight,
  BarChart3,
  Bell,
  CalendarCheck,
  DollarSign,
  Eye,
  Settings,
  Sparkles,
  Waypoints,
} from 'lucide-react';
import Link from 'next/link';
import { useRef } from 'react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const FEATURES = [
  { icon: DollarSign, label: 'Track fleet spend' },
  { icon: CalendarCheck, label: 'Stick to PM schedules' },
  { icon: Eye, label: 'Never miss inspections' },
  { icon: Settings, label: 'Automate workflows' },
  { icon: Waypoints, label: 'Enhance visibility' },
  { icon: Bell, label: 'Receive relevant alerts' },
  { icon: Sparkles, label: 'Get AI-powered insights' },
  { icon: BarChart3, label: 'Act on asset data' },
];

export default function OperationsNarrative() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!sectionRef.current) return;

      const items = gridRef.current?.querySelectorAll('.feature-item') ?? [];

      gsap.set(headingRef.current, { opacity: 0, y: 40 });
      gsap.set(subtitleRef.current, { opacity: 0, y: 30 });
      gsap.set(items, { opacity: 0, y: 25 });
      gsap.set(ctaRef.current, { opacity: 0, y: 20 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 65%',
          end: 'top 15%',
          scrub: 0.6,
        },
      });

      tl.to(headingRef.current, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out',
      })
        .to(
          subtitleRef.current,
          { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
          '-=0.6',
        )
        .to(
          items,
          {
            opacity: 1,
            y: 0,
            stagger: 0.06,
            duration: 0.6,
            ease: 'power2.out',
          },
          '-=0.4',
        )
        .to(
          ctaRef.current,
          { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' },
          '-=0.3',
        );
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-[#0a0a0a] font-[family-name:var(--font-outfit)]"
    >
      {/* Main content — no separate gradient div, transition is handled by TransitionSection's bottom fade */}
      <div className="max-w-4xl mx-auto px-6 pt-16 sm:pt-28 lg:pt-36 pb-16 md:pb-36 lg:pb-44 text-center">
        {/* Heading */}
        <h2
          ref={headingRef}
          className="text-[28px] xs:text-3xl sm:text-4xl md:text-5xl lg:text-[56px] font-black text-white leading-[1.15] sm:leading-[1.1] tracking-tight mb-6 sm:mb-7"
        >
          The modern way to
          <br className="hidden xs:block" /> { ' ' }
          manage your fleet
        </h2>

        {/* Subtitle */}
        <p
          ref={subtitleRef}
          className="text-[13px] sm:text-base md:text-lg text-white/50 max-w-xl mx-auto leading-relaxed mb-12 sm:mb-20 font-medium"
        >
          Everything you need to manage vehicles, maintenance, compliance and
          spend, now with practical intelligence built into the workflows your
          team uses every day.
        </p>

        {/* Feature icons grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-2 sm:grid-cols-4 gap-x-4 sm:gap-x-6 gap-y-8 sm:gap-y-14 max-w-2xl mx-auto mb-12 sm:mb-18"
        >
          {FEATURES.map((feature) => (
            <div
              key={feature.label}
              className="feature-item flex flex-col items-center gap-3"
            >
              <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-orange-500/10 border border-orange-500/20 flex items-center justify-center transition-colors duration-300 hover:bg-orange-500/20 hover:border-orange-500/40">
                <feature.icon className="w-5 h-5 md:w-6 md:h-6 text-orange-400" />
              </div>
              <span className="text-xs md:text-sm text-white/70 font-medium leading-snug">
                {feature.label}
              </span>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div ref={ctaRef}>
          <Link
            href="/smart-operations"
            className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-full border border-orange-500/30 text-orange-400 font-bold text-sm uppercase tracking-wider hover:bg-orange-500/10 hover:border-orange-500/50 transition-all duration-300"
          >
            See all features
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}
