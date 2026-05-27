'use client';

import { motion } from 'framer-motion';
import { 
  Activity, BarChart3, CheckCircle2, Map, Navigation, Fuel, Truck, Shield, Zap, 
  Wrench, Clock, Bell, TrendingDown, TrendingUp, UserCheck, Phone, ArrowRight 
} from 'lucide-react';
import Link from 'next/link';

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
  { icon: Clock, color: '#f97316', title: 'Scheduled Services', desc: 'Set time- or mileage-based service intervals for every vehicle.' },
  { icon: Activity, color: '#3b82f6', title: 'Repair History', desc: 'A complete logbook of every repair and workshop visit per vehicle.' },
  { icon: Bell, color: '#ef4444', title: 'Predictive Alerts', desc: 'Automated notifications sent when a vehicle approaches a service milestone.' },
  { icon: BarChart3, color: '#22c55e', title: 'Cost Tracking', desc: 'Capture labour, parts, and workshop costs per maintenance job.' },
];

const DRIVER_EVENTS = [
  { label: 'Speeding Events', value: '3', change: 'down', color: '#22c55e' },
  { label: 'Harsh Braking', value: '1', change: 'down', color: '#22c55e' },
  { label: 'Harsh Accel', value: '2', change: 'up', color: '#ef4444' },
  { label: 'Drive Score', value: '84', change: 'up', color: '#3b82f6', suffix: '/100' },
];

const CONNECTED_MODULES = [
  { icon: Navigation, color: '#06b6d4', title: 'Trip Summaries', desc: 'Full route history with distance, duration, and fuel details.' },
  { icon: Fuel, color: '#22c55e', title: 'Fuel Management', desc: 'Log fill-ups, track consumption, review analytics, flag discrepancies.' },
  { icon: Bell, color: '#f97316', title: 'Alerts & Notifications', desc: 'Instant push alerts for breaches and overspeeds.' },
  { icon: Truck, color: '#a855f7', title: 'Job Dispatch', desc: 'Create, assign, and track jobs. Drivers receive assignments on mobile.' },
  { icon: Shield, color: '#ef4444', title: 'Compliance & Safety', desc: 'Enforce duty-of-care policies with worktime logs.' },
  { icon: Zap, color: '#fbbf24', title: 'AI Insights', desc: 'Automated recommendations on route efficiency.' },
];

export default function OperationsContent() {
  return (
    <>
      <section className="relative z-20 bg-[#050505] py-16 sm:py-32 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="max-w-3xl mb-16 md:mb-24">
            <span className="text-white/30 font-black uppercase tracking-[0.4em] md:tracking-[0.6em] text-[10px] sm:text-xs md:text-sm mb-6 block flex items-center gap-4"><Activity className="w-5 h-5 text-red-500" /> System Architecture</span>
            <h2 className="text-3xl xs:text-4xl md:text-6xl font-black text-white leading-[1.0] tracking-tight">FOUR CORE PILLARS DRIVING <span className="text-white/20 italic">INTELLIGENCE.</span></h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-white/5 border border-white/5 rounded-3xl overflow-hidden">
            {CORE_FEATURES.map((f, i) => (
              <motion.div key={f.title} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.1 }} className="group relative bg-[#0a0a0a] p-8 md:p-10 hover:bg-white/[0.02] transition-all duration-500">
                <div className="absolute -inset-24 blur-[120px] rounded-full opacity-0 group-hover:opacity-10 transition-all duration-700" style={{ backgroundColor: f.color }} />
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl flex items-center justify-center mb-6 md:mb-8 border border-white/5 group-hover:scale-110 transition-transform duration-500" style={{ background: `${f.color}15`, color: f.color }}><f.icon className="w-5 h-5 md:w-6 md:h-6" /></div>
                <h3 className="text-xl md:text-2xl font-black text-white mb-4 tracking-tight group-hover:translate-x-2 transition-transform duration-500">{f.title}</h3>
                <p className="text-white/40 text-[14px] md:text-base leading-relaxed font-medium">{f.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="live-map" className="relative z-10 py-16 sm:py-32 bg-[#050505]">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-12 lg:gap-16 items-center">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="text-white">
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 mb-6 md:mb-8 text-center lg:text-left"><Map className="w-4 h-4" /> <span className="text-[10px] uppercase tracking-[0.3em] font-black">Live Map Module</span></div>
            <h2 className="text-4xl xs:text-5xl md:text-7xl font-black leading-[0.95] tracking-tighter mb-8 text-center lg:text-left">SEE EVERYTHING.<br /><span className="italic text-white/20">MISS NOTHING.</span></h2>
            <ul className="space-y-4 max-w-2xl mx-auto lg:mx-0">
              {LIVE_MAP_BULLETS.map((b) => (
                <li key={b} className="flex items-start gap-4">
                  <CheckCircle2 className="w-4 h-4 md:w-5 md:h-5 text-blue-500 shrink-0 mt-1" />
                  <span className="text-white/70 text-[15px] md:text-lg font-medium">{b}</span>
                </li>
              ))}
            </ul>
          </motion.div>
          <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2 }} className="relative">
            <div className="rounded-[2rem] sm:rounded-[2.5rem] border border-white/5 bg-[#0a0a0a] overflow-hidden shadow-2xl relative group h-72 xs:h-80 md:h-96">
                {[
                  { top: '15%', left: '25%', color: '#22c55e', label: 'TRK-004' },
                  { top: '42%', left: '55%', color: '#ef4444', label: 'TRK-012' },
                  { top: '65%', left: '30%', color: '#22c55e', label: 'TRK-009' }
                ].map((pin) => (
                  <div key={pin.label} className="absolute flex flex-col items-center gap-2" style={{ top: pin.top, left: pin.left }}>
                    <div className="w-3 h-3 md:w-4 md:h-4 rounded-full border-[2px] md:border-[3px] border-[#0a0a0a]" style={{ backgroundColor: pin.color, boxShadow: `0 0 20px ${pin.color}` }} />
                    <span className="text-[8px] md:text-[10px] text-white/70 font-black uppercase tracking-widest bg-black/80 px-2 py-1 rounded-full border border-white/5">{pin.label}</span>
                  </div>
                ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section id="dashboard" className="relative z-20 py-16 sm:py-32 bg-[#050505] border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="max-w-3xl mb-12 md:mb-16">
            <span className="text-white/30 font-black uppercase tracking-[0.4em] md:tracking-[0.6em] text-[10px] sm:text-xs md:text-sm mb-6 block flex items-center gap-4"><BarChart3 className="w-5 h-5 text-green-500" /> Command Center</span>
            <h2 className="text-4xl xs:text-5xl md:text-7xl font-black text-white leading-[0.95] tracking-tighter mb-6">EVERY METRIC.<br/><span className="text-white/20 italic">LIVE IN ONE VIEW.</span></h2>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-px bg-white/5 border border-white/5 rounded-3xl overflow-hidden">
            {DASHBOARD_STATS.map((stat, i) => (
              <motion.div key={stat.label} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.6, delay: i * 0.1 }} className="bg-[#0a0a0a] p-5 xs:p-6 flex flex-col justify-between h-28 xs:h-32">
                <p className="text-[9px] xs:text-[10px] text-white/30 uppercase tracking-[0.2em] font-black">{stat.label}</p>
                <div className="flex items-baseline gap-1 mt-auto">
                    <p className="text-2xl xs:text-3xl font-black text-white">{stat.value}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-40 bg-[#050505] relative overflow-hidden border-t border-white/5">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white/[0.02] text-[30vw] md:text-[20vw] font-black uppercase leading-none select-none pointer-events-none">FLEETNET</div>
        <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} className="flex flex-col items-center">
             <div className="w-px h-16 md:h-24 bg-gradient-to-b from-transparent via-primary to-transparent mb-10 md:mb-12" />
             <h2 className="text-4xl xs:text-5xl md:text-8xl font-black mb-8 md:mb-10 leading-[0.9] tracking-tighter text-white">READY TO <span className="text-primary italic">OPTIMIZE?</span></h2>
             <p className="text-[15px] sm:text-lg md:text-2xl text-white/50 mb-10 md:mb-12 max-w-2xl font-medium">Whether you&apos;re looking to transform your fleet operations or join our mission, we&apos;re ready to engineer the future together.</p>
             <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6">
                <Link href="/contact" className="w-full sm:w-auto px-10 md:px-12 py-4 md:py-5 bg-white text-black font-black uppercase tracking-[0.2em] text-[10px] sm:text-xs md:text-sm hover:bg-primary transition-all shadow-2xl rounded-full border border-white inline-flex items-center justify-center">Contact FleetNET</Link>
                <Link href="/about" className="w-full sm:w-auto px-10 md:px-12 py-4 md:py-5 bg-transparent border-2 border-white/10 text-white font-black uppercase tracking-[0.2em] text-[10px] sm:text-xs md:text-sm hover:border-white transition-all rounded-full">About Us</Link>
             </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
