'use client';

import { motion } from 'framer-motion';
import { 
  ArrowRight, HardHat, Truck, Wrench, ShieldCheck, Cpu, Building2, Users, Target 
} from 'lucide-react';
import ShowcaseSection from './ShowcaseSection';

const INDUSTRIES = [
  {
    title: "Construction & Heavy Equipment",
    description: "Precision tracking for high-value machinery. Protect multi-million dollar investments with surgical control.",
    icon: HardHat,
    items: ["Engine Hour Intelligence", "Theft Prevention Layer", "Fuel Flow Monitoring", "Utilization Scoring"],
  },
  {
    title: "Trucking & Global Freight",
    description: "The backbone of global supply chains. AI-powered route optimization and driver safety compliance.",
    icon: Truck,
    items: ["AI Route Optimization", "Real-time ELD Logic", "Driver Behavior Scoring", "Smart Cargo Security"],
  },
  {
    title: "Precision Utilities",
    description: "Reliability is mission-critical. Coordinate field technical teams with absolute geographic accuracy.",
    icon: Wrench,
    items: ["Dynamic Field Dispatch", "Technician ETA Logic", "Asset Inventory Sync", "Service Quality Audit"],
  },
  {
    title: "Public Sector Safety",
    description: "Uncompromising accountability and operational transparency for government and emergency fleets.",
    icon: ShieldCheck,
    items: ["Audit-grade Reporting", "Fleet Lifecycle Care", "Fuel Waste Mitigation", "Inter-agency Visibility"],
  },
];

const SHOWCASE_FEATURES = [
  {
    title: "Asset Intelligence",
    subtitle: "COMMAND & CONTROL",
    description: "Our proprietary hardware-to-cloud stack delivers high-fidelity data from the world's most demanding environments.",
    image: "/images/operations/asset_intelligence.png",
    stat: "40%",
    statLabel: "Average Downtime Reduction",
  },
  {
    title: "Telemetry Performance",
    subtitle: "DATA PRECISION",
    description: "FleetNET captures complex vehicle CAN-bus data to provide a digital twin of your entire mobile operation.",
    image: "/images/operations/telemetry_performance.png",
    stat: "22%",
    statLabel: "Fuel Consumption Efficiency",
  },
  {
    title: "Driver Dynamics",
    subtitle: "BEHAVIORAL AI",
    description: "Transform your safety culture with AI-driven scoring. Monitor G-force events and fatigue indicators.",
    image: "/images/operations/driver_scoring.png",
    stat: "99.8%",
    statLabel: "Accuracy Rate in Compliance",
  },
];

export default function IndustriesContent() {
  return (
    <>
      <section className="relative z-10 py-32 bg-[#050505]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mb-24">
            <span className="text-primary font-black uppercase tracking-[0.6em] text-sm mb-4 block">Our Core Sectors</span>
            <h2 className="text-5xl md:text-7xl font-black mb-8 leading-[0.95] tracking-tighter">OPERATIONAL INTELLIGENCE ACROSS EVERY <span className="text-white/20">TIER.</span></h2>
            <p className="text-xl text-white/50 leading-relaxed font-medium max-w-2xl">Specialized solutions for industries where every second and every asset counts.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/5 border border-white/5 rounded-3xl overflow-hidden">
            {INDUSTRIES.map((industry, index) => (
              <motion.div key={industry.title} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.6, delay: index * 0.1 }} className="group relative bg-[#0a0a0a] p-10 lg:p-16 hover:bg-white/[0.02] transition-colors overflow-hidden">
                <div className="absolute -inset-24 bg-primary/20 blur-[120px] rounded-full opacity-0 group-hover:opacity-100 transition-all duration-700" />
                <div className="relative z-10">
                  <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-10 text-primary group-hover:scale-110 transition-all"><industry.icon className="w-8 h-8" /></div>
                  <h3 className="text-3xl font-black mb-6 tracking-tight group-hover:translate-x-2 transition-transform">{industry.title}</h3>
                  <p className="text-white/50 leading-relaxed mb-10 font-medium">{industry.description}</p>
                  <div className="grid grid-cols-1 gap-4">
                    {industry.items.map(item => (
                      <div key={item} className="flex items-center gap-3 text-xs uppercase tracking-[0.2em] font-bold text-white/40 group-hover:text-white/70 transition-colors"><div className="w-1 h-1 rounded-full bg-primary" />{item}</div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {SHOWCASE_FEATURES.map((feature, index) => (
        <ShowcaseSection key={feature.title} feature={feature} index={index} />
      ))}

      <section className="py-32 bg-[#050505]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
            <div className="max-w-2xl">
              <h2 className="text-4xl md:text-5xl font-black mb-6 leading-tight">CONTINUOUS EVOLUTION.</h2>
              <p className="text-white/50 font-medium text-lg">Expanding our technical infrastructure to support the next generation of mission-critical sectors.</p>
            </div>
            <div className="flex items-center gap-4 text-primary font-black uppercase tracking-[0.3em] text-xs"><Target className="w-5 h-5" />Global Expansion Roadmap</div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {[
              { title: "Critical Infrastructure", icon: Cpu, description: "Service fleets for power, water, and telecom networks requiring 100% uptime." },
              { title: "Urban Transit", icon: Building2, description: "Real-time depot analytics and route adherence for large-scale transit." },
              { title: "Healthcare Logistics", icon: Users, description: "Chain-of-custody for pharmaceutical distribution and temperature-control." }
            ].map((card, index) => (
              <motion.div key={card.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: index * 0.1 }} className="p-8 rounded-3xl border border-white/5 bg-white/[0.03] hover:bg-white/[0.06] group">
                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-6 text-primary border border-white/10 group-hover:border-primary/20"><card.icon className="w-6 h-6" /></div>
                <h3 className="text-xl font-bold mb-4">{card.title}</h3>
                <p className="text-white/40 leading-relaxed font-medium">{card.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-40 bg-[#050505] relative overflow-hidden border-t border-white/5">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white/[0.02] text-[20vw] font-black uppercase leading-none select-none pointer-events-none">FLEETNET</div>
        <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} className="flex flex-col items-center">
            <div className="w-px h-24 bg-gradient-to-b from-transparent via-primary to-transparent mb-12" />
            <h2 className="text-5xl md:text-8xl font-black mb-10 leading-[0.9] tracking-tighter text-white">READY TO <span className="text-primary italic">OPTIMIZE?</span></h2>
            <div className="flex flex-wrap justify-center gap-6">
              <button className="px-12 py-5 bg-white text-black font-black uppercase tracking-[0.2em] text-sm hover:bg-primary transition-all shadow-2xl rounded-full">Request Technical Briefing</button>
              <button className="px-12 py-5 bg-transparent border-2 border-white/10 text-white font-black uppercase tracking-[0.2em] text-sm hover:border-white transition-all rounded-full">Systems Overview</button>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
