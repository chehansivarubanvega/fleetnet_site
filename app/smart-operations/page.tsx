'use client';

import FluidBackground from '@/components/FluidBackground';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Activity,
  AlertTriangle,
  ArrowRight,
  BarChart3,
  Bell,
  CheckCircle2,
  Clock,
  Fuel,
  Map,
  Navigation,
  Phone,
  Shield,
  TrendingDown,
  TrendingUp,
  Truck,
  UserCheck,
  Wrench,
  Zap,
} from 'lucide-react';
import { motion } from 'motion/react';
import Link from 'next/link';
import { useRef } from 'react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// ─────────────────────────────────────────────────────────────────────────────
// Data
// ─────────────────────────────────────────────────────────────────────────────

const CORE_FEATURES = [
  {
    icon: Map,
    color: '#3b82f6',
    bg: 'rgba(59,130,246,0.1)',
    title: 'Live Map',
    description: 'Real-time visibility of your entire fleet on a single interactive map.',
  },
  {
    icon: BarChart3,
    color: '#22c55e',
    bg: 'rgba(34,197,94,0.1)',
    title: 'Operations Dashboard',
    description: 'A live command center with KPIs and operational summaries updated continuously.',
  },
  {
    icon: Wrench,
    color: '#f97316',
    bg: 'rgba(249,115,22,0.1)',
    title: 'Maintenance',
    description: 'Schedule services, track repairs, and receive predictive alerts before breakdowns.',
  },
  {
    icon: UserCheck,
    color: '#a855f7',
    bg: 'rgba(168,85,247,0.1)',
    title: 'Driver Performance',
    description: 'Score and monitor driver behavior to keep your fleet safe and compliant.',
  },
];

const LIVE_MAP_BULLETS = [
  'Real-time GPS position for every vehicle, updated every few seconds',
  'Geofence zones with instant push alerts on entry and exit',
  'Full route playback and historical path analysis per trip',
  'Vehicle status at a glance — moving, idle, stopped, or offline',
  'Speed monitoring with configurable overspeed detection thresholds',
  'One-tap access to vehicle details, driver info, and contact',
];

const DASHBOARD_STATS = [
  { label: 'Active Vehicles',   value: '48',    unit: '',       color: '#ef4444', delta: '+3 today' },
  { label: 'Jobs Completed',    value: '126',   unit: '',       color: '#22c55e', delta: 'This shift' },
  { label: 'Avg Speed',         value: '62',    unit: 'km/h',   color: '#f97316', delta: '' },
  { label: 'Fuel Used',         value: '1,240', unit: 'L',      color: '#3b82f6', delta: 'Today' },
  { label: 'Distance Covered',  value: '8,430', unit: 'km',     color: '#a855f7', delta: 'Today' },
  { label: 'Avg Idle Time',     value: '4.2',   unit: 'hrs',    color: '#fbbf24', delta: '' },
];

const MAINTENANCE_CARDS = [
  {
    icon: Clock,
    color: '#f97316',
    title: 'Scheduled Services',
    desc: 'Set time- or mileage-based service intervals for every vehicle. The system tracks accumulation automatically and alerts you before a deadline is missed.',
  },
  {
    icon: Activity,
    color: '#3b82f6',
    title: 'Repair History',
    desc: 'A complete logbook of every repair, parts replacement, and workshop visit per vehicle — searchable, printable, and always up to date.',
  },
  {
    icon: Bell,
    color: '#ef4444',
    title: 'Predictive Alerts',
    desc: 'Automated notifications sent days in advance when a vehicle approaches a service milestone, so your team can plan ahead without surprises.',
  },
  {
    icon: BarChart3,
    color: '#22c55e',
    title: 'Cost Tracking',
    desc: 'Capture labour, parts, and workshop costs per maintenance job to understand your real total cost of ownership across the entire fleet.',
  },
];

const DRIVER_EVENTS = [
  { label: 'Speeding Events',      value: '3',  change: 'down', color: '#22c55e' },
  { label: 'Harsh Braking',        value: '1',  change: 'down', color: '#22c55e' },
  { label: 'Harsh Acceleration',   value: '2',  change: 'up',   color: '#ef4444' },
  { label: 'Drive Score',          value: '84', change: 'up',   color: '#3b82f6', suffix: '/100' },
];

const DRIVER_BEHAVIORS = [
  'Overspeed detection with configurable per-zone limits',
  'Harsh braking and sharp cornering event logging',
  'Rapid acceleration and aggressive driving flags',
  'Idle time monitoring and excessive engine-on reports',
  'Duration-based driver fatigue and shift-compliance flags',
  'Automated weekly driver scorecards and trend reports',
];

const CONNECTED_MODULES = [
  {
    icon: Navigation,
    color: '#06b6d4',
    title: 'Trip Summaries',
    desc: 'Full route history with distance, duration, stops, fuel consumed, and driver details for every trip completed.',
  },
  {
    icon: Fuel,
    color: '#22c55e',
    title: 'Fuel Management',
    desc: 'Log fill-ups, track consumption per route, review efficiency analytics, and flag potential fuel discrepancies.',
  },
  {
    icon: Bell,
    color: '#f97316',
    title: 'Alerts & Notifications',
    desc: 'Instant push and in-app alerts for geofence breaches, overspeeds, device disconnects, and maintenance due dates.',
  },
  {
    icon: Truck,
    color: '#a855f7',
    title: 'Job Dispatch',
    desc: 'Create, assign, and track delivery or service jobs in real time. Drivers receive assignments on mobile and update status live.',
  },
  {
    icon: Shield,
    color: '#ef4444',
    title: 'Compliance & Safety',
    desc: 'Enforce duty-of-care policies with worktime logs, vehicle inspection checklists, and compliance event reporting.',
  },
  {
    icon: Zap,
    color: '#fbbf24',
    title: 'AI Insights',
    desc: 'Automated recommendations on route efficiency, cost reduction opportunities, and driver coaching built from your live data.',
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// Page Component
// ─────────────────────────────────────────────────────────────────────────────

export default function SmartOperationsPage() {
  const mainRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Background transitions as you scroll through the page
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: mainRef.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: true,
      },
    });
    const root = document.documentElement;
    tl.to(root, { '--bg-base': '#0f172a', '--bg-color-1': '#1e3a5f', '--bg-color-2': '#0f172a', duration: 1 })
      .to(root, { '--bg-base': '#0a0a0a', '--bg-color-1': 'rgba(249,115,22,0.5)', '--bg-color-2': 'rgba(239,68,68,0.3)', duration: 1 })
      .to(root, { '--bg-base': '#0f172a', '--bg-color-1': 'rgba(168,85,247,0.4)', '--bg-color-2': '#0f172a', duration: 1 })
      .to(root, { '--bg-base': '#050505', '--bg-color-1': 'rgba(239,68,68,0.6)', '--bg-color-2': 'rgba(153,27,27,0.5)', duration: 1 });

    // Generic scroll reveals
    const reveals = gsap.utils.toArray<HTMLElement>('.gsap-reveal');
    reveals.forEach((el) => {
      gsap.fromTo(el,
        { autoAlpha: 0, y: 48 },
        {
          autoAlpha: 1, y: 0, duration: 0.85, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 86%', toggleActions: 'play none none reverse' },
        }
      );
    });

    // Stagger groups
    const groups = gsap.utils.toArray<HTMLElement>('.gsap-stagger-group');
    groups.forEach((group) => {
      const items = group.querySelectorAll<HTMLElement>('.gsap-stagger-item');
      gsap.fromTo(items,
        { autoAlpha: 0, y: 36 },
        {
          autoAlpha: 1, y: 0, duration: 0.8, stagger: 0.12, ease: 'power3.out',
          scrollTrigger: { trigger: group, start: 'top 86%', toggleActions: 'play none none reverse' },
        }
      );
    });

  }, { scope: mainRef });

  return (
    <main ref={mainRef} className="min-h-screen relative overflow-hidden">
      <FluidBackground />
      <Navbar />

      {/* ═══════════════════════════════════════ HERO ═══════════════════════════════════════ */}
      <section className="relative z-10 pt-36 pb-28 overflow-hidden">
        {/* Ambient glows */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            className="absolute -top-24 right-0 w-[40rem] h-[40rem] rounded-full bg-blue-600/15 blur-[140px]"
            animate={{ x: [0, -30, 0], y: [0, 30, 0] }}
            transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute top-48 -left-24 w-[28rem] h-[28rem] rounded-full bg-purple-600/10 blur-[120px]"
            animate={{ x: [0, 24, 0], y: [0, -24, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>

        <div className="max-w-6xl mx-auto px-6">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-xs md:text-sm text-white/50 uppercase tracking-[0.5em] font-bold mb-6"
          >
            Smart Operations
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-5xl md:text-7xl lg:text-8xl font-black text-white leading-[0.95] tracking-tight mb-8"
          >
            Complete fleet
            <span className="block text-white/35">control. One platform.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg md:text-xl text-white/60 max-w-2xl leading-relaxed font-light mb-10"
          >
            FleetNET's Smart Operations suite gives you real-time map visibility, a live KPI dashboard, predictive maintenance scheduling, and granular driver performance analytics — all working together seamlessly from one login.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-wrap gap-4"
          >
            <Link
              href="#"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-slate-900 rounded-full font-bold shadow-xl hover:scale-[1.03] transition-transform text-sm md:text-base"
            >
              <Phone className="w-4 h-4" />
              Request a Demo
            </Link>
            <Link
              href="#live-map"
              className="inline-flex items-center gap-2 px-8 py-4 border border-white/20 text-white rounded-full font-bold hover:bg-white/10 transition-colors text-sm md:text-base"
            >
              Explore Features
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ════════════════════ FEATURE OVERVIEW (white panel) ════════════════════ */}
      <section className="relative z-20 bg-white py-20 rounded-t-[3.5rem] shadow-[0_-20px_60px_-15px_rgba(0,0,0,0.5)]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="gsap-reveal max-w-3xl mb-16">
            <p className="text-xs uppercase tracking-[0.45em] text-red-600 font-bold mb-4">What It Does</p>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 leading-[1.08] tracking-tight">
              Four core pillars that drive fleet intelligence.
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 gsap-stagger-group">
            {CORE_FEATURES.map((f) => (
              <div
                key={f.title}
                className="gsap-stagger-item rounded-2xl border border-slate-100 bg-white p-8 shadow-lg hover:shadow-xl transition-all duration-300 group"
              >
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300"
                  style={{ background: f.bg, color: f.color }}
                >
                  <f.icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-black text-slate-900 mb-3 tracking-tight">{f.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed font-medium">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════ LIVE MAP (dark) ══════════════════════════════ */}
      <section id="live-map" className="relative z-10 py-28">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left */}
          <div className="text-white gsap-reveal">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 mb-8">
              <Map className="w-4 h-4" />
              <span className="text-xs uppercase tracking-[0.3em] font-black">Live Map</span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black leading-[1.0] tracking-tight mb-6">
              See everything.<br />
              <span className="text-white/35">Miss nothing.</span>
            </h2>
            <p className="text-white/55 text-lg leading-relaxed mb-10 font-light">
              A full-featured, real-time map view that puts your entire fleet on a single screen. Every vehicle, every moment — with the context you need to make fast decisions.
            </p>
            <ul className="space-y-4">
              {LIVE_MAP_BULLETS.map((b) => (
                <li key={b} className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0 mt-1" />
                  <span className="text-white/65 text-sm leading-relaxed font-medium">{b}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right — Map UI mockup */}
          <div className="gsap-reveal relative">
            <div className="rounded-[2.5rem] border border-white/10 bg-[#0a0f1a] overflow-hidden shadow-[0_40px_80px_-20px_rgba(0,0,0,0.9)] relative">
              {/* Dot grid background */}
              <div
                className="absolute inset-0 opacity-[0.06]"
                style={{
                  backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(59,130,246,0.8) 1px, transparent 0)',
                  backgroundSize: '24px 24px',
                }}
              />
              {/* Map header bar */}
              <div className="relative z-10 flex items-center justify-between px-6 py-4 border-b border-white/5">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
                  <span className="text-white/50 text-xs font-bold uppercase tracking-widest">Live Fleet Map</span>
                </div>
                <span className="text-white/25 text-xs font-bold">48 Vehicles Active</span>
              </div>

              {/* Mock map content */}
              <div className="relative z-10 p-6 h-72 flex flex-col justify-between">
                {/* Vehicle pins scattered */}
                {[
                  { top: '15%', left: '25%', color: '#22c55e', label: 'TRK-004' },
                  { top: '42%', left: '55%', color: '#ef4444', label: 'TRK-012' },
                  { top: '65%', left: '30%', color: '#22c55e', label: 'TRK-009' },
                  { top: '28%', left: '72%', color: '#fbbf24', label: 'TRK-021' },
                  { top: '75%', left: '68%', color: '#22c55e', label: 'TRK-033' },
                  { top: '50%', left: '15%', color: '#6b7280', label: 'TRK-018' },
                ].map((pin) => (
                  <div
                    key={pin.label}
                    className="absolute flex flex-col items-center gap-1"
                    style={{ top: pin.top, left: pin.left }}
                  >
                    <div
                      className="w-3 h-3 rounded-full border-2 border-white/40 shadow-lg"
                      style={{ backgroundColor: pin.color, boxShadow: `0 0 12px ${pin.color}80` }}
                    />
                    <span className="text-[8px] text-white/50 font-bold uppercase tracking-wide bg-black/50 px-1.5 py-0.5 rounded-full backdrop-blur whitespace-nowrap">
                      {pin.label}
                    </span>
                  </div>
                ))}

                {/* Route line illustrations */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-30" viewBox="0 0 400 300" fill="none">
                  <path d="M100 45 Q160 90 220 165 Q260 210 272 225" stroke="#22c55e" strokeWidth="1.5" strokeDasharray="4 4" />
                  <path d="M288 84 Q310 120 240 165" stroke="#fbbf24" strokeWidth="1.5" strokeDasharray="4 4" />
                  <path d="M60 150 Q90 175 120 195" stroke="#6b7280" strokeWidth="1" strokeDasharray="3 5" />
                </svg>

                {/* Selected vehicle info */}
                <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-xl border border-white/10 rounded-xl p-3 w-44">
                  <p className="text-white/30 text-[9px] uppercase tracking-widest font-bold mb-1">Selected Vehicle</p>
                  <p className="text-white font-bold text-sm">TRK-012</p>
                  <p className="text-white/50 text-xs mt-0.5">Driver: S. Karunaratne</p>
                  <div className="flex items-center gap-1.5 mt-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" />
                    <span className="text-red-400 text-[9px] font-bold uppercase tracking-wider">Overspeed Alert</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ════════════════════ DASHBOARD (white panel) ════════════════════ */}
      <section id="dashboard" className="relative z-20 bg-white py-24 rounded-t-[3.5rem] shadow-[0_-20px_60px_-15px_rgba(0,0,0,0.5)]">
        <div className="max-w-6xl mx-auto px-6">

          <div className="gsap-reveal max-w-3xl mb-6">
            <p className="text-xs uppercase tracking-[0.45em] text-red-600 font-bold mb-4">Operations Dashboard</p>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 leading-[1.08] tracking-tight mb-5">
              Every metric that matters,<br />live and in one view.
            </h2>
            <p className="text-slate-500 text-lg leading-relaxed font-light max-w-2xl">
              The FleetNET dashboard is populated entirely from live data. Any movement, fuel event, job update, or maintenance due date appears instantly — no manual reporting required.
            </p>
          </div>

          {/* KPI grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-16 gsap-stagger-group">
            {DASHBOARD_STATS.map((stat) => (
              <div
                key={stat.label}
                className="gsap-stagger-item rounded-2xl border border-slate-100 bg-slate-50 p-5 flex flex-col gap-2 hover:shadow-lg transition-shadow"
              >
                <p className="text-[9px] text-slate-400 uppercase tracking-widest font-bold">{stat.label}</p>
                <div className="flex items-end gap-1">
                  <p className="text-2xl font-black text-slate-900 leading-none">{stat.value}</p>
                  {stat.unit && <span className="text-xs text-slate-400 mb-0.5 font-bold">{stat.unit}</span>}
                </div>
                {stat.delta && (
                  <span
                    className="text-[9px] font-bold px-2 py-0.5 rounded-full self-start"
                    style={{ background: `${stat.color}18`, color: stat.color }}
                  >
                    {stat.delta}
                  </span>
                )}
              </div>
            ))}
          </div>

          {/* Two-column detail */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div className="gsap-reveal">
              <h3 className="text-2xl font-black text-slate-900 mb-5 tracking-tight">Immediate situational awareness</h3>
              <div className="space-y-4">
                {[
                  { label: 'Live summary', detail: 'Instantly see how many vehicles are active, idle, or offline at any moment.' },
                  { label: 'Job overview', detail: 'Track how many jobs are pending, in transit, or completed across your fleet today.' },
                  { label: 'Alert tray', detail: 'A consolidated feed of all active alerts — overspeeds, geofence breaches, maintenance due — ranked by severity.' },
                  { label: 'Trend comparisons', detail: 'Compare today\'s performance against yesterday, last week, or any custom period.' },
                ].map((row) => (
                  <div key={row.label} className="flex gap-4">
                    <div className="w-8 h-8 bg-red-50 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                      <AlertTriangle className="w-4 h-4 text-red-500" />
                    </div>
                    <div>
                      <p className="text-slate-900 font-bold text-sm mb-0.5">{row.label}</p>
                      <p className="text-slate-500 text-sm leading-relaxed">{row.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="gsap-reveal rounded-3xl border border-slate-100 bg-slate-50 p-8 shadow-lg">
              <p className="text-xs uppercase tracking-[0.35em] text-red-600 font-black mb-5">Reporting</p>
              <h4 className="text-xl font-black text-slate-900 mb-4 tracking-tight">Export any data, any format</h4>
              <p className="text-slate-500 text-sm leading-relaxed mb-6">
                Generate fleet utilisation reports, driver scorecards, fuel cost summaries, maintenance logs, and trip histories — exportable as PDF or CSV on demand or scheduled automatically.
              </p>
              <ul className="space-y-3">
                {['Fleet utilisation & uptime', 'Trip distance & duration', 'Per-vehicle fuel cost', 'Driver scoring trends', 'Maintenance expense log'].map((r) => (
                  <li key={r} className="flex items-center gap-3">
                    <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" />
                    <span className="text-slate-600 text-sm font-medium">{r}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

        </div>
      </section>

      {/* ════════════════════ MAINTENANCE (dark) ════════════════════════════════ */}
      <section id="maintenance" className="relative z-10 py-28">
        <div className="max-w-6xl mx-auto px-6">

          <div className="text-white gsap-reveal mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 mb-8">
              <Wrench className="w-4 h-4" />
              <span className="text-xs uppercase tracking-[0.3em] font-black">Maintenance</span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black leading-[1.02] tracking-tight mb-5">
              Fix problems before<br />
              <span className="text-white/35">they stop you.</span>
            </h2>
            <p className="text-white/50 text-lg leading-relaxed font-light max-w-2xl">
              Unplanned downtime costs fleets far more than preventive maintenance. FleetNET's maintenance module automates the planning cycle so nothing slips through.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 gsap-stagger-group">
            {MAINTENANCE_CARDS.map((card) => (
              <div
                key={card.title}
                className="gsap-stagger-item rounded-3xl border border-white/8 bg-white/[0.025] p-8 hover:bg-white/[0.05] transition-colors duration-300 group relative overflow-hidden"
              >
                <div
                  className="absolute top-0 right-0 w-32 h-32 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-full"
                  style={{ backgroundColor: card.color + '20' }}
                />
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-6 relative z-10"
                  style={{ background: card.color + '18', color: card.color }}
                >
                  <card.icon className="w-6 h-6" />
                </div>
                <h3 className="text-white font-black text-xl mb-3 tracking-tight relative z-10">{card.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed font-medium relative z-10">{card.desc}</p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ═══════════════════ DRIVER PERFORMANCE (white panel) ═══════════════════ */}
      <section id="driver-performance" className="relative z-20 bg-white py-24 rounded-t-[3.5rem] shadow-[0_-20px_60px_-15px_rgba(0,0,0,0.5)]">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

          {/* Left */}
          <div className="gsap-reveal">
            <p className="text-xs uppercase tracking-[0.45em] text-red-600 font-bold mb-4">Driver Performance</p>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 leading-[1.08] tracking-tight mb-6">
              Know how your<br />drivers really drive.
            </h2>
            <p className="text-slate-500 text-lg leading-relaxed font-light mb-10">
              Driver behavior is the single biggest controllable factor in fleet fuel costs, vehicle wear, and accident risk. FleetNET quantifies it, scores it, and helps you act on it.
            </p>

            {/* Score card sample */}
            <div className="rounded-3xl border border-slate-100 bg-slate-50 p-6 shadow-lg mb-8">
              <div className="flex items-center justify-between mb-5">
                <div>
                  <p className="text-xs text-slate-400 uppercase tracking-widest font-bold">Driver Scorecard</p>
                  <p className="text-slate-900 font-black text-lg mt-0.5">K. Jayasuriya</p>
                </div>
                <div className="w-16 h-16 rounded-full border-4 border-blue-200 bg-blue-50 flex items-center justify-center">
                  <span className="text-2xl font-black text-blue-600">84</span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {DRIVER_EVENTS.map((ev) => (
                  <div key={ev.label} className="flex items-center justify-between bg-white rounded-xl p-3 border border-slate-100">
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wide">{ev.label}</p>
                    <div className="flex items-center gap-1.5">
                      <p className="font-black text-slate-900 text-sm">{ev.value}{ev.suffix ?? ''}</p>
                      {ev.change === 'down'
                        ? <TrendingDown className="w-3.5 h-3.5 text-green-500" />
                        : <TrendingUp className="w-3.5 h-3.5 text-red-500" />}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <Link href="#" className="inline-flex items-center gap-2 text-red-600 font-bold text-sm hover:gap-3 transition-all">
              View driver reporting details <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Right */}
          <div className="gsap-reveal">
            <div className="rounded-3xl border border-slate-100 bg-white p-8 shadow-xl">
              <h3 className="text-xl font-black text-slate-900 mb-6 tracking-tight">What we track</h3>
              <ul className="space-y-4">
                {DRIVER_BEHAVIORS.map((b) => (
                  <li key={b} className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                    <span className="text-slate-600 text-sm leading-relaxed font-medium">{b}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-6 rounded-3xl border border-slate-100 bg-slate-50 p-6 shadow-lg">
              <h4 className="text-slate-900 font-black mb-3 tracking-tight">Driver coaching tools</h4>
              <p className="text-slate-500 text-sm leading-relaxed">
                Automatically generate weekly scorecards for every driver, identify those needing coaching, and track improvement over time with comparison trend charts.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* ════════════════════ CONNECTED MODULES (dark) ════════════════════════ */}
      <section className="relative z-10 py-28">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-white gsap-reveal mb-16">
            <p className="text-xs uppercase tracking-[0.45em] text-white/40 font-bold mb-4">Everything Connected</p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black leading-[1.02] tracking-tight">
              Six more modules,<br />
              <span className="text-white/30">one unified system.</span>
            </h2>
            <p className="text-white/45 text-lg leading-relaxed font-light max-w-2xl mt-5">
              Smart Operations doesn't end with the four core pillars. Every module in FleetNET is connected, sharing live data so the whole platform is greater than the sum of its parts.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 gsap-stagger-group">
            {CONNECTED_MODULES.map((mod) => (
              <div
                key={mod.title}
                className="gsap-stagger-item group relative rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 hover:bg-white/[0.05] transition-colors duration-300 overflow-hidden"
              >
                {/* Left color accent */}
                <div className="absolute left-0 top-4 bottom-4 w-[2px] rounded-full" style={{ backgroundColor: mod.color }} />

                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 shrink-0"
                  style={{ background: `${mod.color}15`, color: mod.color }}
                >
                  <mod.icon className="w-5 h-5" />
                </div>
                <h3 className="text-white font-bold text-base mb-2 tracking-tight">{mod.title}</h3>
                <p className="text-white/45 text-sm leading-relaxed font-medium">{mod.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════ CTA ═════════════════════════════════════ */}
      <section className="relative z-20 py-28 bg-red-600 overflow-hidden">
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/carbon-fibre.png")' }}
        />
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-white/10 blur-[100px] rounded-full" />
        <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-black/20 blur-[100px] rounded-full" />

        <div className="max-w-5xl mx-auto px-6 text-center relative z-10 gsap-reveal">
          <p className="text-white/70 text-xs uppercase tracking-[0.5em] font-bold mb-5">Ready to Get Started?</p>
          <h2 className="text-5xl md:text-7xl font-black text-white mb-8 tracking-tighter leading-[0.95]">
            See Smart Operations<br />live in your fleet.
          </h2>
          <p className="text-xl text-white/80 mb-12 max-w-2xl mx-auto font-light leading-relaxed">
            A FleetNET specialist will walk you through a personalised demo using your fleet data. No commitment required.
          </p>
          <div className="flex flex-wrap justify-center gap-5">
            <Link
              href="#"
              className="inline-flex items-center gap-2 px-12 py-5 bg-white text-red-600 rounded-full font-black text-base hover:scale-105 transition-transform shadow-2xl"
            >
              <Phone className="w-5 h-5" />
              Request a Demo
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 px-12 py-5 border-2 border-white/40 text-white rounded-full font-black text-base hover:bg-white/10 transition-colors"
            >
              About FleetNET
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
