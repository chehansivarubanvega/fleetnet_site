'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import { useRef } from 'react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// ─── Module data ──────────────────────────────────────────────────────────────
const MODULES = [
  {
    label: 'Vehicles',
    sub: 'Fleet Management',
    accent: '#ef4444',
    features: ['Registration & profiles', 'Live telemetry', 'Status tracking'],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-full h-full">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
      </svg>
    ),
  },
  {
    label: 'Drivers',
    sub: 'Personnel Hub',
    accent: '#3b82f6',
    features: ['Driver profiles', 'Score & behaviour', 'Assignment tracking'],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-full h-full">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
      </svg>
    ),
  },
  {
    label: 'Fuel',
    sub: 'Consumption Control',
    accent: '#22c55e',
    features: ['Fuel log & fill-ups', 'Efficiency analytics', 'Cost reporting'],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-full h-full">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
      </svg>
    ),
  },
  {
    label: 'Maintenance',
    sub: 'Lifecycle Manager',
    accent: '#f97316',
    features: ['Service schedules', 'Repair records', 'Cost & alerts'],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-full h-full">
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z" />
      </svg>
    ),
  },
  {
    label: 'Jobs',
    sub: 'Workflow Engine',
    accent: '#a855f7',
    features: ['Job creation & dispatch', 'Real-time status', 'Driver assignments'],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-full h-full">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
      </svg>
    ),
  },
  {
    label: 'Trips',
    sub: 'Journey Analytics',
    accent: '#06b6d4',
    features: ['Route history', 'Distance & time stats', 'Full trip summaries'],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-full h-full">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z" />
      </svg>
    ),
  },
];

// ─── Trip chart data ──────────────────────────────────────────────────────────
const TRIP_BARS = [
  { label: 'Mon', km: 340, pct: 70 },
  { label: 'Tue', km: 490, pct: 100 },
  { label: 'Wed', km: 210, pct: 43 },
  { label: 'Thu', km: 380, pct: 78 },
  { label: 'Fri', km: 450, pct: 92 },
  { label: 'Sat', km: 160, pct: 33 },
  { label: 'Sun', km: 120, pct: 24 },
];

// ─── Live metrics ─────────────────────────────────────────────────────────────
const LIVE_METRICS = [
  { label: 'Active Vehicles', value: '48', unit: '', color: '#ef4444', delta: '+3' },
  { label: 'Fuel Used Today', value: '1,240', unit: 'L', color: '#22c55e', delta: '-8%' },
  { label: 'Jobs in Progress', value: '17', unit: '', color: '#a855f7', delta: '+5' },
  { label: 'Avg Speed', value: '62', unit: 'km/h', color: '#f97316', delta: '' },
];

export default function OperationsNarrative() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const scene1Ref = useRef<HTMLDivElement>(null);
  const scene2Ref = useRef<HTMLDivElement>(null);
  const scene3Ref = useRef<HTMLDivElement>(null);
  const iconRef   = useRef<HTMLDivElement>(null);
  const text1Ref  = useRef<HTMLDivElement>(null);
  const text2Ref  = useRef<HTMLDivElement>(null);
  const text3Ref  = useRef<HTMLDivElement>(null);
  const cardsRef  = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(() => {
    if (!sectionRef.current) return;

    // ─── Initial states ──────────────────────────────────────────────────────
    gsap.set([scene2Ref.current, scene3Ref.current], { autoAlpha: 0, y: 30 });
    gsap.set(scene1Ref.current, { autoAlpha: 1, y: 0 });
    gsap.set(iconRef.current,   { autoAlpha: 1, scale: 1, y: 0 });
    gsap.set(cardsRef.current,  { autoAlpha: 0, y: 24 });

    // ─── Background colour transition ────────────────────────────────────────
    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top bottom',
      end: 'top center',
      scrub: true,
      onUpdate: (self) => {
        const p = self.progress;
        const lerp = (a: string, b: string, t: number) => gsap.utils.interpolate(a, b, t);
        const root = document.documentElement;
        root.style.setProperty('--bg-base',    lerp('#2a0f04', '#080c14', p));
        root.style.setProperty('--bg-color-1', lerp('#ff4500', '#0f172a', p));
        root.style.setProperty('--bg-color-2', lerp('#ffa500', '#0f172a', p));
        root.style.setProperty('--bg-color-3', lerp('#3d1a08', '#0f172a', p));
        root.style.setProperty('--bg-color-4', lerp('#ffcc00', '#1e293b', p));
      },
    });

    // ─── Master scroll timeline ──────────────────────────────────────────────
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top top',
        end: '+=4000',
        pin: true,
        scrub: 1,
        anticipatePin: 1,
      },
    });

    // SCENE 1 — logo exits, feature tiles stagger in
    tl.to(iconRef.current, { y: -50, autoAlpha: 0, scale: 0.85, duration: 0.8, ease: 'power2.inOut' }, 0)
      .to(cardsRef.current, { autoAlpha: 1, y: 0, stagger: 0.12, duration: 1.4, ease: 'power2.out' }, 0.3)
      .to({}, { duration: 2.5 })

      // EXIT scene 1
      .to(scene1Ref.current, { autoAlpha: 0, y: -24, duration: 1, ease: 'power2.in' })

      // ENTER scene 2
      .to(scene2Ref.current, { autoAlpha: 1, y: 0, duration: 1.2, ease: 'power2.out' }, '+=0.2')
      .to({}, { duration: 2.5 })

      // EXIT scene 2
      .to(scene2Ref.current, { autoAlpha: 0, y: -24, duration: 1, ease: 'power2.in' })

      // ENTER scene 3
      .to(scene3Ref.current, { autoAlpha: 1, y: 0, duration: 1.2, ease: 'power2.out' }, '+=0.2')
      .to({}, { duration: 2.5 });

  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen overflow-hidden z-10 font-[family-name:var(--font-outfit)]"
      style={{ backgroundColor: '#080c14' }}
    >

      {/* ── Background: soft radial glow ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: [
            'radial-gradient(ellipse 90% 70% at 10% 110%, rgba(59,130,246,0.10) 0%, transparent 65%)',
            'radial-gradient(ellipse 60% 50% at 85% -10%, rgba(99,102,241,0.07) 0%, transparent 60%)',
          ].join(', '),
        }}
      />

      {/* ── Subtle grid overlay ── */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
        }}
      />

      {/* ─────────────────────────────────────────────────────────────────────
          LOGO MARK — shown before Scene 1 kicks in
      ───────────────────────────────────────────────────────────────────── */}
      <div
        ref={iconRef}
        className="absolute inset-0 flex items-center justify-center z-30 pointer-events-none"
      >
        <div className="flex flex-col items-center gap-5">
          <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl border border-white/10 bg-white/[0.04] flex items-center justify-center p-4 shadow-[0_0_60px_rgba(59,130,246,0.12)]">
            <Image
              src="/images/FLEETnet app icon.png"
              alt="FleetNet"
              width={90}
              height={90}
              className="w-full h-full object-contain"
            />
          </div>
          <p className="text-white/25 text-[10px] tracking-[0.4em] uppercase font-bold">Fleet Operations</p>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════════
          SCENE 1 — Command Center
      ═══════════════════════════════════════════════════════════════════ */}
      <div
        ref={scene1Ref}
        className="absolute inset-0 flex items-center justify-center px-6 sm:px-10 md:px-16 lg:px-24 z-20 pointer-events-auto"
      >
        <div className="w-full max-w-6xl flex flex-col lg:flex-row items-start lg:items-center gap-12 lg:gap-20">

          {/* Left — Narrative copy */}
          <div ref={text1Ref} className="lg:w-[42%] shrink-0">
            <p className="text-white/30 text-[10px] tracking-[0.35em] uppercase font-bold mb-5">
              Command Center
            </p>
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-[4rem] xl:text-[5rem] font-black text-white leading-[1.02] tracking-tight mb-6">
              Built to run<br />
              <em className="not-italic text-white/30">everything.</em>
            </h2>
            <div className="w-10 h-[1px] bg-white/15 mb-6" />
            <p className="text-sm md:text-base text-white/45 leading-relaxed max-w-xs font-medium">
              Every vehicle, driver, fuel record, maintenance job and trip — managed from a single unified platform. One login. Complete control.
            </p>
          </div>

          {/* Right — Minimal feature tiles */}
          <div className="w-full lg:flex-1 grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
            {MODULES.map((mod, i) => (
              <div
                key={mod.label}
                ref={(el) => { cardsRef.current[i] = el; }}
                className="relative flex flex-col gap-3 p-4 md:p-5 rounded-lg border border-white/[0.06] bg-white/[0.025] hover:bg-white/[0.05] transition-colors duration-300 overflow-hidden group"
              >
                {/* Left color accent line */}
                <div
                  className="absolute left-0 top-3 bottom-3 w-[2px] rounded-full"
                  style={{ backgroundColor: mod.accent }}
                />

                {/* Icon */}
                <div
                  className="w-7 h-7 md:w-8 md:h-8 shrink-0"
                  style={{ color: mod.accent }}
                >
                  {mod.icon}
                </div>

                {/* Label */}
                <div>
                  <p className="text-white font-bold text-sm md:text-[15px] leading-none">{mod.label}</p>
                  <p
                    className="text-[9px] uppercase tracking-widest font-semibold mt-1.5 leading-none"
                    style={{ color: `${mod.accent}90` }}
                  >
                    {mod.sub}
                  </p>
                </div>

                {/* Feature list — visible on md+ */}
                <ul className="hidden md:flex flex-col gap-1 mt-1">
                  {mod.features.map((f) => (
                    <li key={f} className="flex items-start gap-1.5 text-[10px] text-white/35 leading-snug font-medium">
                      <span className="mt-[5px] w-[3px] h-[3px] rounded-full shrink-0" style={{ backgroundColor: mod.accent }} />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════════
          SCENE 2 — Trip Analytics
      ═══════════════════════════════════════════════════════════════════ */}
      <div
        ref={scene2Ref}
        className="absolute inset-0 flex flex-col items-center justify-center px-6 sm:px-10 md:px-16 lg:px-24 z-20 pointer-events-auto"
      >
        <div className="w-full max-w-5xl flex flex-col gap-5 h-full max-h-[88vh] py-[8vh]">

          {/* Header */}
          <div ref={text2Ref} className="shrink-0">
            <p className="text-white/30 text-[10px] tracking-[0.35em] uppercase font-bold mb-3">Trip Intelligence</p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white leading-tight">
              Analyse every <em className="not-italic text-white/30">journey.</em>
            </h2>
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-4 gap-2 md:gap-3 shrink-0">
            {[
              { label: 'Total Trips',   value: '1,284',    color: '#f97316' },
              { label: 'Distance',      value: '48,320 km', color: '#fbbf24' },
              { label: 'Avg Duration',  value: '1h 42m',   color: '#fb923c' },
              { label: 'Fuel Used',     value: '12,440 L', color: '#4ade80' },
            ].map((s) => (
              <div
                key={s.label}
                className="rounded-lg border border-white/[0.06] p-3 md:p-4 flex flex-col gap-1.5"
                style={{ background: 'rgba(255,255,255,0.03)' }}
              >
                <p className="text-[9px] md:text-[10px] text-white/30 uppercase tracking-widest font-bold">{s.label}</p>
                <p className="text-base md:text-xl lg:text-2xl font-black text-white leading-none">{s.value}</p>
              </div>
            ))}
          </div>

          {/* Bar chart */}
          <div
            className="flex-1 rounded-lg border border-white/[0.06] overflow-hidden relative min-h-0"
            style={{ background: 'rgba(255,255,255,0.02)' }}
          >
            <div className="h-full flex flex-col p-4 md:p-6">
              <div className="flex justify-between items-center mb-5 shrink-0">
                <p className="text-white/50 text-xs md:text-sm font-bold uppercase tracking-widest">Weekly Distance (km)</p>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                  <span className="text-[9px] text-white/25 uppercase tracking-widest font-bold">This Week</span>
                </div>
              </div>

              <div className="flex-1 flex items-end gap-3 md:gap-5 min-h-0">
                {TRIP_BARS.map((b) => (
                  <div key={b.label} className="flex flex-col items-center gap-2 flex-1 h-full justify-end">
                    <span className="text-[9px] md:text-[10px] text-white/40 font-bold">{b.km}</span>
                    <div
                      className="w-full relative rounded-t-sm overflow-hidden"
                      style={{
                        height: `${b.pct}%`,
                        minHeight: '6px',
                        background: 'linear-gradient(to top, rgba(251,191,36,0.75), rgba(249,115,22,0.3))',
                      }}
                    >
                      <div className="absolute top-0 inset-x-0 h-[2px] rounded-full bg-amber-300/60" />
                    </div>
                    <span className="text-[9px] md:text-[10px] text-white/25 font-bold uppercase">{b.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Latest trip row */}
          <div
            className="rounded-lg border border-white/[0.06] p-3 md:p-4 shrink-0"
            style={{ background: 'rgba(255,255,255,0.02)' }}
          >
            <div className="flex items-center gap-4 md:gap-8 flex-wrap">
              <div className="flex items-center gap-2 shrink-0">
                <div className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                <span className="text-[9px] text-white/30 uppercase tracking-widest font-bold">Latest Trip</span>
              </div>
              {[
                { label: 'Route',    value: 'Colombo → Kandy' },
                { label: 'Driver',   value: 'A. Perera' },
                { label: 'Distance', value: '116 km' },
                { label: 'Duration', value: '2h 15m' },
                { label: 'Fuel',     value: '14.2 L' },
                { label: 'Status',   value: 'Completed', accent: '#22c55e' },
              ].map((d) => (
                <div key={d.label} className="flex flex-col gap-0.5">
                  <span className="text-[8px] text-white/20 uppercase tracking-widest font-bold">{d.label}</span>
                  <span
                    className="text-[10px] md:text-xs font-semibold"
                    style={{ color: d.accent ?? 'rgba(255,255,255,0.65)' }}
                  >
                    {d.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════════
          SCENE 3 — Live Oversight
      ═══════════════════════════════════════════════════════════════════ */}
      <div
        ref={scene3Ref}
        className="absolute inset-0 flex flex-col items-center justify-center px-6 sm:px-10 md:px-16 lg:px-24 z-20 pointer-events-auto"
      >
        <div className="w-full max-w-5xl flex flex-col gap-5 h-full max-h-[88vh] py-[8vh]">

          {/* Header */}
          <div ref={text3Ref} className="shrink-0">
            <p className="text-amber-500/50 text-[10px] tracking-[0.35em] uppercase font-bold mb-3">Live Oversight</p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white leading-tight">
              Real-time fleet <em className="not-italic text-white/30">awareness.</em>
            </h2>
          </div>

          {/* Live metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 shrink-0">
            {LIVE_METRICS.map((m) => (
              <div
                key={m.label}
                className="rounded-lg border p-4 md:p-5 flex flex-col gap-3"
                style={{
                  background: `${m.color}07`,
                  borderColor: `${m.color}18`,
                }}
              >
                <div className="flex items-start justify-between">
                  <p className="text-[9px] md:text-[10px] text-white/35 uppercase tracking-widest font-bold leading-snug flex-1 pr-1">
                    {m.label}
                  </p>
                  {m.delta && (
                    <span
                      className="text-[8px] font-bold px-1.5 py-0.5 rounded-full shrink-0"
                      style={{ background: `${m.color}18`, color: m.color }}
                    >
                      {m.delta}
                    </span>
                  )}
                </div>
                <div className="flex items-end gap-1">
                  <span
                    className="text-2xl md:text-3xl lg:text-4xl font-black text-white leading-none"
                  >
                    {m.value}
                  </span>
                  {m.unit && <span className="text-xs text-white/30 mb-0.5 font-bold">{m.unit}</span>}
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: m.color }} />
                  <span className="text-[8px] uppercase tracking-widest text-white/20 font-bold">Live</span>
                </div>
              </div>
            ))}
          </div>

          {/* System HUD panel */}
          <div
            className="flex-1 rounded-lg border border-amber-500/10 relative overflow-hidden min-h-0"
            style={{ background: 'rgba(249,115,22,0.018)' }}
          >
            {/* Dot grid */}
            <div
              className="absolute inset-0 opacity-[0.08] pointer-events-none"
              style={{
                backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(249,115,22,0.6) 1px, transparent 0)',
                backgroundSize: '24px 24px',
              }}
            />

            <div className="relative z-10 p-4 md:p-6 h-full flex flex-col overflow-y-auto">
              {/* Status bar */}
              <div className="flex items-center justify-between mb-5 shrink-0">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-amber-400 rounded-full animate-pulse" />
                  <span className="font-mono text-[9px] md:text-[10px] text-amber-400/50 uppercase tracking-widest">
                    System Online
                  </span>
                </div>
                <span className="font-mono text-[9px] md:text-[10px] text-white/15 uppercase tracking-widest">
                  FleetNet OS v4.2
                </span>
              </div>

              {/* Info panels */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 flex-1">
                {[
                  {
                    title: 'Fleet Health',
                    items: ['Engine OK: 44 / 48', 'Maintenance Due: 4', 'Alerts: 2 Critical'],
                  },
                  {
                    title: 'Job Progress',
                    items: ['Completed Today: 38', 'In Transit: 17', 'Pending: 9'],
                  },
                  {
                    title: 'Fuel Status',
                    items: ['Avg Efficiency: 9.2 L/100km', 'Low Tank Alerts: 3', 'Cost Today: $640'],
                  },
                ].map((panel) => (
                  <div
                    key={panel.title}
                    className="rounded-md border border-amber-500/[0.08] p-3 md:p-4 flex flex-col gap-2.5"
                    style={{ background: 'rgba(249,115,22,0.025)' }}
                  >
                    <p className="text-[9px] md:text-[10px] uppercase tracking-widest font-bold text-amber-400/40">
                      {panel.title}
                    </p>
                    {panel.items.map((item) => (
                      <div key={item} className="flex items-center gap-2">
                        <div className="w-1 h-1 rounded-full bg-amber-500/30 shrink-0" />
                        <span className="text-[9px] md:text-xs text-white/40">{item}</span>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>

    </section>
  );
}
