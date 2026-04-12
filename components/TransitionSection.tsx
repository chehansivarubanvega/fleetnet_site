'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Star } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRef } from 'react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function TransitionSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const dashboardRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!sectionRef.current) return;

      gsap.set(headingRef.current, { opacity: 0, y: 50 });
      gsap.set(subtitleRef.current, { opacity: 0, y: 40 });
      gsap.set(ctaRef.current, { opacity: 0, y: 30 });
      gsap.set(dashboardRef.current, { opacity: 0, y: 80, scale: 0.92 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          end: 'top 20%',
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
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power3.out',
          },
          '-=0.7',
        )
        .to(
          ctaRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
          },
          '-=0.6',
        )
        .to(
          dashboardRef.current,
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1.4,
            ease: 'power3.out',
          },
          '-=0.5',
        );
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-[#fafaf8] font-[family-name:var(--font-outfit)]"
    >
      {/* Top content area */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 pt-20 sm:pt-36 lg:pt-44 pb-10 md:pb-16 text-center">
        <h2
          ref={headingRef}
          className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-[68px] font-black text-[#1a1a1a] leading-[1.05] tracking-tight mb-6 md:mb-8"
        >
          Fleet intelligence
          <br />
          that drives results.
        </h2>

        <p
          ref={subtitleRef}
          className="text-base sm:text-lg md:text-xl text-[#555] max-w-2xl mx-auto leading-relaxed mb-10 md:mb-12 font-medium"
        >
          Run your fleet reliably, monitor every asset in real time, and
          optimize every aspect of your operation — vehicles, drivers, fuel,
          maintenance, and more. FleetNET turns your everyday data into
          actionable insights that keep your fleet on the move.
        </p>

        <div ref={ctaRef} className="flex flex-col items-center gap-5">
          {/* CTA row */}
          <div className="flex items-center gap-4 sm:gap-6 flex-wrap justify-center">
            <Link
              href="#"
              className="group inline-flex items-center gap-2.5 px-8 py-4 bg-[#1a1a1a] text-white rounded-full font-bold text-sm md:text-base uppercase tracking-wider hover:bg-[#333] transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-[1.03] active:scale-[0.98]"
            >
              Book a Demo
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>

            {/* Social proof badges */}
            <div className="flex items-center gap-2.5">
              <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-orange-400 fill-orange-400"
                  />
                ))}
              </div>
              <span className="text-xs sm:text-sm text-[#888] font-medium">
                 100s of reviews
              </span>
            </div>
          </div>

          {/* Secondary CTA */}
          <p className="text-sm text-[#999]">
            or{' '}
            <Link
              href="#"
              className="text-[#1a1a1a] font-semibold underline underline-offset-4 decoration-[#1a1a1a]/30 hover:decoration-[#1a1a1a] transition-colors"
            >
              Start a Free Trial
            </Link>
          </p>
        </div>
      </div>

      {/* Dashboard screenshot area */}
      <div className="relative w-full max-w-6xl mx-auto px-4 sm:px-6 pb-0">
        {/* Accent shapes behind the screenshot */}
        <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-[110%] h-[70%] pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-t from-emerald-100/80 via-emerald-50/40 to-transparent rounded-[60px]" />
          <div className="absolute bottom-0 left-[5%] w-[35%] h-[50%] bg-emerald-100/60 rounded-[40px]" />
          <div className="absolute bottom-0 right-[8%] w-[25%] h-[40%] bg-emerald-100/40 rounded-[40px]" />
        </div>

        {/* Dashboard image container */}
        <div
          ref={dashboardRef}
          className="relative z-10"
          style={{ perspective: '1200px' }}
        >
          <div
            className="relative w-full rounded-t-2xl md:rounded-t-3xl overflow-hidden shadow-[0_20px_80px_-20px_rgba(0,0,0,0.25)] border border-black/[0.06]"
            style={{
              transform: 'rotateX(4deg)',
              transformOrigin: 'center bottom',
            }}
          >
            {/* Browser chrome bar */}
            <div className="w-full h-7 sm:h-8 md:h-10 bg-[#f0f0f0] border-b border-black/5 flex items-center gap-2 px-3 sm:px-4">
              <div className="flex items-center gap-1 sm:gap-1.5">
                <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-3 md:h-3 rounded-full bg-[#ff5f57]" />
                <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-3 md:h-3 rounded-full bg-[#febc2e]" />
                <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-3 md:h-3 rounded-full bg-[#28c840]" />
              </div>
              <div className="flex-1 flex justify-center">
                <div className="w-32 sm:w-40 md:w-60 h-4 sm:h-5 md:h-6 rounded-md bg-white border border-black/[0.06] flex items-center justify-center">
                  <span className="text-[8px] sm:text-[10px] md:text-xs text-[#aaa] font-medium">
                    app.fleetnet.global
                  </span>
                </div>
              </div>
              <div className="w-10 sm:w-16" />
            </div>

            {/* Dashboard screenshot */}
            <div className="relative w-full aspect-[16/9.5]">
              <Image
                src="/images/dashboard_screenshot.png"
                alt="FleetNET Global Dashboard — real-time fleet monitoring, vehicle tracking, fuel analytics, and maintenance overview"
                fill
                className="object-cover object-top"
                quality={95}
                priority
              />
            </div>
          </div>
        </div>
      </div>

      {/* Smooth fade into dark section below */}
      <div className="absolute bottom-0 left-0 right-0 h-[45%] pointer-events-none z-20 bg-gradient-to-b from-transparent via-[#fafaf8]/0 via-20% to-[#0a0a0a]" />
    </section>
  );
}
