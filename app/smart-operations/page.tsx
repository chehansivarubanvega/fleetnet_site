'use client';

import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import {
  Activity, AlertTriangle, ArrowRight, BarChart3, Bell, CheckCircle2,
  Clock, Fuel, Map, Navigation, Phone, Shield, TrendingDown,
  TrendingUp, Truck, UserCheck, Wrench, Zap
} from 'lucide-react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import Link from 'next/link';
import { useRef } from 'react';

// ─────────────────────────────────────────────────────────────────────────────
// Data
// ─────────────────────────────────────────────────────────────────────────────
const CORE_FEATURES = [
  { icon: Map, color: '#3b82f6', title: 'Live Map', description: 'Real-time visibility of your entire fleet on a single interactive map.' },
  { icon: BarChart3, color: '#22c55e', title: 'Operations Dashboard', description: 'A live command center with KPIs and operational summaries updated continuously.' },
  { icon: Wrench, color: '#f97316', title: 'Maintenance', description: 'Schedule services, track repairs, and receive predictive alerts before breakdowns.' },
  { icon: UserCheck, color: '#a855f7', title: 'Driver Performance', description: 'Score and monitor driver behavior to keep your fleet safe and compliant.' },
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
  { label: 'Active Vehicles', value: '48', unit: '', color: '#ef4444', delta: '+3 today' },
  { label: 'Jobs Completed', value: '126', unit: '', color: '#22c55e', delta: 'This shift' },
  { label: 'Avg Speed', value: '62', unit: 'km/h', color: '#f97316', delta: '' },
  { label: 'Fuel Used', value: '1,240', unit: 'L', color: '#3b82f6', delta: 'Today' },
  { label: 'Distance Covered', value: '8,430', unit: 'km', color: '#a855f7', delta: 'Today' },
  { label: 'Avg Idle Time', value: '4.2', unit: 'hrs', color: '#fbbf24', delta: '' },
];

const MAINTENANCE_CARDS = [
  { icon: Clock, color: '#f97316', title: 'Scheduled Services', desc: 'Set time- or mileage-based service intervals for every vehicle. Tracks accumulation automatically.' },
  { icon: Activity, color: '#3b82f6', title: 'Repair History', desc: 'A complete logbook of every repair, parts replacement, and workshop visit per vehicle.' },
  { icon: Bell, color: '#ef4444', title: 'Predictive Alerts', desc: 'Automated notifications sent days in advance when a vehicle approaches a service milestone.' },
  { icon: BarChart3, color: '#22c55e', title: 'Cost Tracking', desc: 'Capture labour, parts, and workshop costs per maintenance job to understand TCO.' },
];

const DRIVER_EVENTS = [
  { label: 'Speeding Events', value: '3', change: 'down', color: '#22c55e' },
  { label: 'Harsh Braking', value: '1', change: 'down', color: '#22c55e' },
  { label: 'Harsh Accel', value: '2', change: 'up', color: '#ef4444' },
  { label: 'Drive Score', value: '84', change: 'up', color: '#3b82f6', suffix: '/100' },
];

const DRIVER_BEHAVIORS = [
  'Overspeed detection with configurable limits',
  'Harsh braking and sharp cornering logging',
  'Rapid acceleration and aggressive flags',
  'Idle time monitoring',
  'Automated weekly scorecards',
];

const CONNECTED_MODULES = [
  { icon: Navigation, color: '#06b6d4', title: 'Trip Summaries', desc: 'Full route history with distance, duration, fuel consumed, and driver details.' },
  { icon: Fuel, color: '#22c55e', title: 'Fuel Management', desc: 'Log fill-ups, track consumption, review analytics, flag discrepancies.' },
  { icon: Bell, color: '#f97316', title: 'Alerts & Notifications', desc: 'Instant push alerts for breaches, overspeeds, disconnects, and maintenance.' },
  { icon: Truck, color: '#a855f7', title: 'Job Dispatch', desc: 'Create, assign, and track jobs. Drivers receive assignments on mobile.' },
  { icon: Shield, color: '#ef4444', title: 'Compliance & Safety', desc: 'Enforce duty-of-care policies with worktime logs and checklists.' },
  { icon: Zap, color: '#fbbf24', title: 'AI Insights', desc: 'Automated recommendations on route efficiency and cost reduction.' },
];

function SmartOperationsHeroScroll() {
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

  const step1Opacity = useTransform(smoothProgress, [0, 0.18, 0.32], [1, 1, 0]);
  const step1Scale = useTransform(smoothProgress, [0, 0.32], [1, 1.16]);
  const step1Y = useTransform(smoothProgress, [0, 0.32], ['0%', '-12%']);
  const step1Tracking = useTransform(smoothProgress, [0, 0.32], ['0em', '0.3em']);

  const step2Opacity = useTransform(smoothProgress, [0.26, 0.38, 0.6, 0.72], [0, 1, 1, 0]);
  const step2Scale = useTransform(smoothProgress, [0.26, 0.5, 0.72], [0.95, 1, 1.05]);
  const step2Y = useTransform(smoothProgress, [0.26, 0.72], ['10%', '-10%']);

  const step3Opacity = useTransform(smoothProgress, [0.68, 0.82, 1], [0, 1, 1]);
  const step3Y = useTransform(smoothProgress, [0.68, 1], ['10%', '0%']);
  const step3Scale = useTransform(smoothProgress, [0.68, 1], [0.95, 1]);

  const gridOpacity = useTransform(smoothProgress, [0, 0.5, 1], [0.15, 0.3, 0.14]);
  const gridY = useTransform(smoothProgress, [0, 1], ['0%', '-20%']);

  const glowX = useTransform(smoothProgress, [0, 1], ['-20%', '20%']);
  const glowY = useTransform(smoothProgress, [0, 1], ['-10%', '10%']);

  const phantomOpacity = useTransform(smoothProgress, [0, 0.35, 0.75, 1], [0.03, 0.08, 0.05, 0]);
  const phantomScale = useTransform(smoothProgress, [0, 1], [1, 1.5]);

  return (
    <section ref={containerRef} className="relative h-[500vh] bg-[#050505]">
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        <motion.div
          style={{ opacity: gridOpacity, y: gridY }}
          className="absolute inset-0 w-full h-[120%] bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:100px_100px]"
        />

        <motion.div
          style={{ x: glowX, y: glowY }}
          className="absolute top-1/4 left-1/4 w-[50vw] h-[50vw] bg-blue-500/20 rounded-full blur-[180px] opacity-30"
        />
        <motion.div
          style={{
            x: useTransform(smoothProgress, [0, 1], ['20%', '-20%']),
            y: useTransform(smoothProgress, [0, 1], ['10%', '-10%'])
          }}
          className="absolute bottom-1/4 right-1/4 w-[42vw] h-[42vw] bg-purple-500/15 rounded-full blur-[180px] opacity-30"
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
            scale: [1, 1.12, 0.95, 1]
          }}
          transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-[18%] right-[12%] w-[28vw] h-[28vw] min-w-[220px] min-h-[220px] bg-gradient-to-br from-blue-500/30 via-primary/10 to-white/10 blur-[2px] mix-blend-screen"
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
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
          className="absolute bottom-[15%] left-[10%] w-[22vw] h-[22vw] min-w-[180px] min-h-[180px] bg-gradient-to-tr from-purple-500/20 via-white/10 to-blue-500/20 blur-[3px] mix-blend-screen"
        />

        <motion.div
          style={{ opacity: phantomOpacity, scale: phantomScale }}
          className="absolute text-[22vw] font-black text-white uppercase leading-none select-none tracking-[0.16em] whitespace-nowrap z-0"
        >
          OPS
        </motion.div>

        <div className="relative z-10 w-full h-full max-w-7xl mx-auto px-8 flex items-center justify-center">
          <motion.div
            style={{ opacity: step1Opacity, scale: step1Scale, y: step1Y, letterSpacing: step1Tracking }}
            className="absolute inset-0 flex flex-col items-center justify-center text-center px-6"
          >
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.8 }}
              className="text-primary text-xs md:text-sm font-black uppercase tracking-[0.8em] mb-10"
            >
              Smart Operations
            </motion.span>
            <h1 className="text-6xl md:text-[8vw] font-black text-white leading-[0.9] tracking-tighter">
              COMPLETE <span className="text-primary italic">CONTROL.</span>
              <br />
              <span className="text-white/20">ONE PLATFORM.</span>
            </h1>
          </motion.div>

          <motion.div
            style={{ opacity: step2Opacity, scale: step2Scale, y: step2Y }}
            className="absolute inset-0 flex flex-col items-center justify-center text-center z-20 px-6"
          >
            <div className="max-w-5xl">
              <h2 className="text-4xl md:text-[6vw] font-black text-white leading-[0.95] tracking-tight mb-8">
                REAL-TIME <span className="text-primary">VISIBILITY.</span>
                <br />
                PREDICTIVE DECISIONS.
              </h2>
              <div className="w-px h-16 bg-gradient-to-b from-primary to-transparent mx-auto mb-8" />
              <p className="text-lg md:text-3xl text-white/50 max-w-4xl mx-auto font-medium leading-tight tracking-wide">
                Map intelligence, live KPIs, maintenance automation, and driver analytics all synchronized in one command layer.
              </p>
            </div>
          </motion.div>

          <motion.div
            style={{ opacity: step3Opacity, y: step3Y, scale: step3Scale }}
            className="absolute inset-0 flex flex-col items-center justify-center text-center z-30 pointer-events-auto px-6"
          >
            <div className="relative">
              <motion.div
                className="absolute -top-16 left-1/2 -translate-x-1/2 w-px h-12 bg-gradient-to-t from-white/30 to-transparent"
                style={{ scaleY: useTransform(smoothProgress, [0.68, 1], [0, 1]) }}
              />
              <h3 className="text-4xl md:text-[5vw] font-black text-white leading-[0.95] tracking-tighter mb-8">
                OPERATIONAL INTELLIGENCE
                <br />
                <span className="text-primary italic">AT FLEET SCALE</span>
              </h3>
              <p className="text-white/50 text-lg md:text-2xl max-w-3xl mx-auto font-medium mb-10">
                Activate one connected workflow across every trip, vehicle, and driver.
              </p>
              <div className="flex flex-wrap justify-center gap-5">
                <Link href="#" className="px-10 py-4 bg-white text-black font-black uppercase tracking-[0.2em] text-sm hover:bg-primary transition-colors rounded-full shadow-[0_0_36px_rgba(255,255,255,0.08)] inline-flex items-center gap-3">
                  <Phone className="w-4 h-4" /> Request a Demo
                </Link>
                <Link href="#live-map" className="px-10 py-4 bg-transparent border-2 border-white/10 text-white font-black uppercase tracking-[0.2em] text-sm hover:border-white transition-all rounded-full inline-flex items-center gap-3">
                  Explore Features <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="absolute inset-0 opacity-[0.04] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]" />
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Page Component
// ─────────────────────────────────────────────────────────────────────────────

export default function SmartOperationsPage() {
  return (
    <main className="min-h-screen bg-[#050505] text-white selection:bg-primary/30 selection:text-white pb-0">
      <Navbar />

      {/* ═══════════════════════════════════════ HERO ═══════════════════════════════════════ */}
      <SmartOperationsHeroScroll />

      {/* ════════════════════ FEATURE OVERVIEW ════════════════════ */}
      <section className="relative z-20 bg-[#050505] py-32 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
            className="max-w-3xl mb-24"
          >
            <span className="text-white/30 font-black uppercase tracking-[0.6em] text-sm mb-6 block flex items-center gap-4">
               <Activity className="w-5 h-5 text-red-500" /> System Architecture
            </span>
            <h2 className="text-4xl md:text-6xl font-black text-white leading-[1.0] tracking-tight">
              FOUR CORE PILLARS DRIVING <span className="text-white/20 italic">INTELLIGENCE.</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-white/5 border border-white/5 rounded-3xl overflow-hidden">
            {CORE_FEATURES.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.1 }}
                className="group relative bg-[#0a0a0a] p-10 hover:bg-white/[0.02] transition-all duration-500 overflow-hidden"
              >
                <div className="absolute -inset-24 blur-[120px] rounded-full opacity-0 group-hover:opacity-10 transition-all duration-700 pointer-events-none" style={{ backgroundColor: f.color }} />
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-8 border border-white/5 group-hover:scale-110 transition-transform duration-500 relative z-10" style={{ background: `${f.color}15`, color: f.color }}>
                  <f.icon className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-black text-white mb-4 tracking-tight relative z-10 group-hover:translate-x-2 transition-transform duration-500">{f.title}</h3>
                <p className="text-white/40 text-base leading-relaxed font-medium relative z-10">{f.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════ LIVE MAP ══════════════════════════════ */}
      <section id="live-map" className="relative z-10 py-32 bg-[#050505]">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-16 items-center">
          
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="text-white">
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 mb-8">
              <Map className="w-4 h-4" /> <span className="text-xs uppercase tracking-[0.3em] font-black">Live Map Module</span>
            </div>
            <h2 className="text-5xl md:text-7xl font-black leading-[0.95] tracking-tighter mb-8">
              SEE EVERYTHING.<br />
              <span className="italic text-white/20">MISS NOTHING.</span>
            </h2>
            <p className="text-white/50 text-xl leading-relaxed mb-10 font-medium max-w-xl">
              A full-featured, real-time map view that puts your entire fleet on a single screen. Every vehicle, every moment — with the context you need to make fast decisions.
            </p>
            <ul className="space-y-4">
              {LIVE_MAP_BULLETS.map((b) => (
                <li key={b} className="flex items-start gap-4">
                  <CheckCircle2 className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                  <span className="text-white/70 font-medium">{b}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2 }} className="relative">
            <div className="rounded-[2.5rem] border border-white/5 bg-[#0a0a0a] overflow-hidden shadow-[0_40px_80px_-20px_rgba(0,0,0,0.9)] relative group">
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 blur-[80px] rounded-full group-hover:bg-blue-500/20 transition-colors duration-700 pointer-events-none" />
              <div className="absolute inset-0 opacity-[0.1]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(59,130,246,1) 1px, transparent 0)', backgroundSize: '32px 32px' }} />
              
              <div className="relative z-10 flex items-center justify-between px-8 py-5 border-b border-white/5 bg-black/40 backdrop-blur-md">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse" />
                  <span className="text-white/50 text-xs font-bold uppercase tracking-widest">Tracking Active</span>
                </div>
                <span className="text-white/30 text-xs font-black uppercase">48 Deployed</span>
              </div>

              <div className="relative z-10 p-8 h-96 flex flex-col justify-between">
                {[
                  { top: '15%', left: '25%', color: '#22c55e', label: 'TRK-004' },
                  { top: '42%', left: '55%', color: '#ef4444', label: 'TRK-012' },
                  { top: '65%', left: '30%', color: '#22c55e', label: 'TRK-009' },
                  { top: '28%', left: '72%', color: '#fbbf24', label: 'TRK-021' },
                ].map((pin) => (
                  <div key={pin.label} className="absolute flex flex-col items-center gap-2" style={{ top: pin.top, left: pin.left }}>
                    <div className="w-4 h-4 rounded-full border-[3px] border-[#0a0a0a] shadow-lg" style={{ backgroundColor: pin.color, boxShadow: `0 0 20px ${pin.color}` }} />
                    <span className="text-[10px] text-white/70 font-black uppercase tracking-widest bg-black/80 px-2 py-1 rounded-full border border-white/5">{pin.label}</span>
                  </div>
                ))}
                
                <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20" viewBox="0 0 400 300" fill="none">
                  <path d="M100 45 Q160 90 220 165 Q260 210 272 225" stroke="#22c55e" strokeWidth="2" strokeDasharray="6 6" />
                </svg>

                <div className="absolute bottom-6 right-6 bg-black/80 backdrop-blur-3xl border border-white/10 rounded-2xl p-5 w-56 shadow-2xl">
                  <p className="text-white/30 text-[10px] uppercase tracking-widest font-black mb-2">Target Lock</p>
                  <p className="text-white font-black text-lg">TRK-012</p>
                  <p className="text-white/50 text-sm mt-1 font-medium">Driver: S. Karunaratne</p>
                  <div className="flex items-center gap-2 mt-4 px-3 py-1.5 bg-red-500/10 border border-red-500/20 rounded-full">
                    <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                    <span className="text-red-500 text-[10px] font-black uppercase tracking-widest">Overspeed</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ════════════════════ DASHBOARD ════════════════════ */}
      <section id="dashboard" className="relative z-20 py-32 bg-[#050505] border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="max-w-3xl mb-16">
            <span className="text-white/30 font-black uppercase tracking-[0.6em] text-sm mb-6 block flex items-center gap-4">
               <BarChart3 className="w-5 h-5 text-green-500" /> Command Center
            </span>
            <h2 className="text-5xl md:text-7xl font-black text-white leading-[0.95] tracking-tighter mb-6">
              EVERY METRIC.<br/><span className="text-white/20 italic">LIVE IN ONE VIEW.</span>
            </h2>
            <p className="text-white/40 text-xl leading-relaxed font-medium">
              The FleetNET dashboard is populated entirely from live data. Any movement, fuel event, job update, or maintenance due date appears instantly.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-px bg-white/5 border border-white/5 rounded-3xl overflow-hidden mb-24">
            {DASHBOARD_STATS.map((stat, i) => (
              <motion.div key={stat.label} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.1 }} className="bg-[#0a0a0a] p-6 hover:bg-white/[0.02] transition-colors flex flex-col justify-between h-32">
                <p className="text-[10px] text-white/30 uppercase tracking-[0.2em] font-black">{stat.label}</p>
                <div>
                  <div className="flex items-baseline gap-1 mt-auto">
                    <p className="text-3xl font-black text-white">{stat.value}</p>
                    {stat.unit && <span className="text-sm text-white/50 font-bold">{stat.unit}</span>}
                  </div>
                  {stat.delta && <span className="text-[10px] font-black px-2.5 py-1 rounded-full mt-2 inline-block border" style={{ background: `${stat.color}10`, color: stat.color, borderColor: `${stat.color}20` }}>{stat.delta}</span>}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════ MAINTENANCE ════════════════════════════════ */}
      <section id="maintenance" className="relative z-10 py-32 bg-[#050505]">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="text-white mb-20 max-w-3xl">
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 mb-8">
              <Wrench className="w-4 h-4" /> <span className="text-xs uppercase tracking-[0.3em] font-black">Maintenance Engine</span>
            </div>
            <h2 className="text-5xl md:text-7xl font-black leading-[0.95] tracking-tighter mb-8">
              FIX PROBLEMS <span className="text-white/20 italic">BEFORE</span><br />
              THEY STOP YOU.
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/5 border border-white/5 rounded-3xl overflow-hidden">
            {MAINTENANCE_CARDS.map((card, i) => (
              <motion.div key={card.title} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.1 }} className="group bg-[#0a0a0a] p-12 hover:bg-white/[0.02] transition-colors relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 blur-[100px] opacity-0 group-hover:opacity-20 transition-all duration-700 pointer-events-none rounded-full" style={{ backgroundColor: card.color }} />
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-8 border border-white/5 relative z-10 group-hover:scale-110 transition-transform duration-500" style={{ background: `${card.color}15`, color: card.color }}>
                  <card.icon className="w-6 h-6" />
                </div>
                <h3 className="text-white font-black text-3xl mb-4 tracking-tight relative z-10 group-hover:translate-x-2 transition-transform duration-500">{card.title}</h3>
                <p className="text-white/40 text-lg leading-relaxed font-medium relative z-10 max-w-md">{card.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════ DRIVER PERFORMANCE ═══════════════════ */}
      <section id="driver-performance" className="relative z-20 py-32 bg-[#050505] border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-20 items-stretch">
          
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
            <p className="text-xs uppercase tracking-[0.5em] text-white/30 font-black mb-6 flex items-center gap-3">
               <UserCheck className="w-5 h-5 text-purple-500" /> Driver Analytics
            </p>
            <h2 className="text-5xl md:text-7xl font-black text-white leading-[0.95] tracking-tighter mb-8">
              KNOW HOW THEY<br/><span className="italic text-white/20">REALLY DRIVE.</span>
            </h2>
            <p className="text-white/40 text-xl leading-relaxed font-medium mb-12">
              Driver behavior is the biggest controllable factor in fleet fuel costs, vehicle wear, and accident risk. FleetNET quantifies it, scores it, and helps you act.
            </p>

            <div className="rounded-[2rem] border border-white/5 bg-[#0a0a0a] p-8 shadow-2xl relative overflow-hidden group">
              <div className="absolute -top-10 -right-10 w-48 h-48 bg-purple-500/10 blur-[80px] rounded-full group-hover:bg-purple-500/20 transition-colors pointer-events-none" />
              <div className="flex items-center justify-between mb-8 relative z-10 border-b border-white/5 pb-6">
                <div>
                  <p className="text-[10px] text-white/30 uppercase tracking-[0.3em] font-black mb-1">Driver Scorecard</p>
                  <p className="text-white font-black text-2xl tracking-tight">K. Jayasuriya</p>
                </div>
                <div className="w-20 h-20 rounded-full border-[6px] border-blue-500/20 bg-blue-500/5 flex items-center justify-center">
                  <span className="text-3xl font-black text-blue-500">84</span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 relative z-10">
                {DRIVER_EVENTS.map((ev) => (
                  <div key={ev.label} className="bg-white/[0.02] rounded-2xl p-4 border border-white/5 flex flex-col justify-between h-24">
                    <p className="text-[10px] text-white/40 font-black uppercase tracking-widest">{ev.label}</p>
                    <div className="flex items-center gap-2">
                      <p className="font-black text-white text-2xl">{ev.value}<span className="text-sm text-white/30">{ev.suffix ?? ''}</span></p>
                      {ev.change === 'down' ? <TrendingDown className="w-5 h-5 text-green-500 ml-auto" /> : <TrendingUp className="w-5 h-5 text-red-500 ml-auto" />}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2 }} className="flex flex-col justify-center">
            <h3 className="text-3xl font-black text-white mb-8 tracking-tight">Telemetry Logging</h3>
            <ul className="space-y-6">
              {DRIVER_BEHAVIORS.map((b) => (
                <li key={b} className="flex items-start gap-5 bg-white/[0.01] p-5 rounded-2xl border border-white/5 hover:bg-white/[0.03] transition-colors">
                  <CheckCircle2 className="w-6 h-6 text-purple-500 shrink-0 mt-1" />
                  <span className="text-white/60 text-lg leading-relaxed font-medium">{b}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>

      {/* ════════════════════ CONNECTED MODULES (dark) ════════════════════════ */}
      <section className="relative z-10 py-32 bg-[#050505] border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="text-white mb-20 text-center max-w-4xl mx-auto">
            <h2 className="text-5xl md:text-7xl font-black leading-[0.95] tracking-tighter mb-8">
              THE FULL STACK.<br />
              <span className="text-white/20 italic">CONNECTED.</span>
            </h2>
            <p className="text-white/40 text-xl leading-relaxed font-medium">
               Smart Operations doesn't end with the four core pillars. Every module in FleetNET shares live data, making the platform exponentially more powerful.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/5 border border-white/5 rounded-3xl overflow-hidden">
            {CONNECTED_MODULES.map((mod, i) => (
              <motion.div key={mod.title} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.1 }} className="group bg-[#0a0a0a] p-10 hover:bg-white/[0.02] transition-colors relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 blur-[80px] opacity-0 group-hover:opacity-20 transition-all duration-700 pointer-events-none rounded-full" style={{ backgroundColor: mod.color }} />
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-6 border border-white/5 relative z-10 group-hover:scale-110 transition-transform duration-500" style={{ background: `${mod.color}15`, color: mod.color }}>
                  <mod.icon className="w-5 h-5" />
                </div>
                <h3 className="text-white font-bold text-xl mb-3 tracking-tight relative z-10">{mod.title}</h3>
                <p className="text-white/40 text-base leading-relaxed font-medium relative z-10">{mod.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════ CTA ═════════════════════════════════════ */}
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
               Whether you're looking to transform your fleet operations or join our mission, we're ready to engineer the future together.
             </p>
             <div className="flex flex-wrap justify-center gap-6">
                <Link href="#" className="px-12 py-5 bg-white text-black font-black uppercase tracking-[0.2em] text-sm hover:bg-primary transition-all shadow-[0_0_40px_rgba(255,255,255,0.1)] rounded-full border border-white hover:border-primary">
                  Contact FleetNET
                </Link>
                <Link href="/about" className="px-12 py-5 bg-transparent border-2 border-white/10 text-white font-black uppercase tracking-[0.2em] text-sm hover:border-white transition-all rounded-full">
                  About Us
                </Link>
             </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
