'use client';

import { motion } from 'motion/react';
import { useMemo } from 'react';
import {
  Building2,
  Truck,
  HardHat,
  Factory,
  ShieldCheck,
  Plane,
  Wrench,
  MapPin,
  Cpu,
  Gauge,
  Sparkles,
  Users
} from 'lucide-react';
import FluidBackground from '@/components/FluidBackground';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const INDUSTRIES = [
  {
    title: 'Construction & Heavy Equipment',
    description: 'Maximize asset uptime and secure your job sites with specialized tracking for heavy machinery.',
    bullets: [
      'Engine hour tracking',
      'Geofencing for theft prevention',
      'Fuel consumption monitoring',
      'Equipment utilization reports'
    ],
    stats: [
      { label: 'Vehicles', value: '500+' },
      { label: 'Uptime', value: '98.5%' },
      { label: 'Cost Savings', value: '25%' }
    ],
    icon: HardHat
  },
  {
    title: 'Trucking & Freight',
    description: 'Optimize logistics and ensure driver safety with comprehensive fleet management solutions.',
    bullets: [
      'Driver behavior monitoring',
      'Route optimization',
      'ELD compliance',
      'Safety score tracking'
    ],
    stats: [
      { label: 'Vehicles', value: '1200+' },
      { label: 'Uptime', value: '99.2%' },
      { label: 'Cost Savings', value: '30%' }
    ],
    icon: Truck
  },
  {
    title: 'Service Providers',
    description: 'Improve customer service and dispatch efficiency with real-time technician tracking.',
    bullets: [
      'Closest technician dispatch',
      'Real-time ETA updates',
      'Service time verification',
      'Customer communication'
    ],
    stats: [
      { label: 'Vehicles', value: '800+' },
      { label: 'Uptime', value: '97.8%' },
      { label: 'Cost Savings', value: '20%' }
    ],
    icon: Wrench
  },
  {
    title: 'Government & Public Sector',
    description: 'Enhance accountability and reduce operating expenses with transparent fleet management.',
    bullets: [
      'Asset accountability',
      'Fuel waste reduction',
      'Compliance reporting',
      'Public transparency'
    ],
    stats: [
      { label: 'Vehicles', value: '2000+' },
      { label: 'Uptime', value: '99.5%' },
      { label: 'Cost Savings', value: '35%' }
    ],
    icon: ShieldCheck
  },
  {
    title: 'Manufacturing & Logistics',
    description: 'Streamline supply chain operations with integrated fleet and warehouse management.',
    bullets: [
      'Supply chain visibility',
      'Warehouse integration',
      'Delivery optimization',
      'Inventory tracking'
    ],
    stats: [
      { label: 'Vehicles', value: '600+' },
      { label: 'Uptime', value: '98.9%' },
      { label: 'Cost Savings', value: '28%' }
    ],
    icon: Factory
  },
  {
    title: 'Aviation Ground Support',
    description: 'Coordinate ground support equipment with precision timing and safety protocols.',
    bullets: [
      'Equipment coordination',
      'Safety compliance',
      'Turnaround optimization',
      'Maintenance scheduling'
    ],
    stats: [
      { label: 'Vehicles', value: '300+' },
      { label: 'Uptime', value: '99.8%' },
      { label: 'Cost Savings', value: '22%' }
    ],
    icon: Plane
  }
];

const SPOTLIGHTS = [
  {
    title: 'Trucking & Freight',
    subtitle: 'Drive Efficiency, Ensure Safety',
    description: 'Next-generation logistics optimization with AI-powered route planning, driver safety monitoring, and automated compliance.',
    bullets: [
      'AI route optimization reducing fuel costs by 30%',
      'Advanced driver behavior monitoring',
      'Automated ELD compliance guarantee',
      'Real-time customer communication'
    ],
    accent: 'from-blue-500/40 to-slate-900/10',
    icon: Truck
  },
  {
    title: 'Construction & Heavy Equipment',
    subtitle: 'Build Smarter, Operate Safer',
    description: 'AI-powered solutions for construction operations with intelligent equipment management, theft prevention, and operational optimization.',
    bullets: [
      'AI-powered theft prevention with instant alerts',
      'Predictive maintenance reducing downtime by 40%',
      'Real-time operator performance monitoring',
      'Automated safety compliance reporting'
    ],
    accent: 'from-amber-500/40 to-slate-900/10',
    icon: HardHat
  },
  {
    title: 'Service Providers',
    subtitle: 'Service Excellence, Every Time',
    description: 'Intelligent field service optimization with AI-powered dispatch, customer communication, and service quality monitoring.',
    bullets: [
      'AI-powered dispatch with skill matching',
      'Real-time customer communication',
      'Automated service time tracking',
      'Complete field operations visibility'
    ],
    accent: 'from-emerald-500/40 to-slate-900/10',
    icon: Wrench
  },
  {
    title: 'Government & Public Sector',
    subtitle: 'Accountability, Transparency, Efficiency',
    description: 'Advanced public asset management with transparency dashboards, compliance automation, and cost optimization.',
    bullets: [
      'Complete asset accountability',
      'Automated compliance reporting',
      'Public transparency dashboards',
      'Advanced cost optimization'
    ],
    accent: 'from-rose-500/40 to-slate-900/10',
    icon: ShieldCheck
  }
];

const EXPANSION = [
  {
    title: 'Energy & Utilities',
    description: 'Monitor service vehicles, critical equipment, and safety compliance across power and utility networks.',
    icon: Cpu
  },
  {
    title: 'Public Transit',
    description: 'Deliver consistent rider experiences with live route adherence, depot analytics, and safety oversight.',
    icon: Building2
  },
  {
    title: 'Cold Chain & Pharma',
    description: 'Protect sensitive deliveries with temperature tracking, route integrity, and chain-of-custody controls.',
    icon: Gauge
  },
  {
    title: 'Campus & Enterprise Mobility',
    description: 'Coordinate shuttles, security fleets, and visitor transport with unified visibility.',
    icon: Users
  }
];

const PROCESS = [
  {
    title: 'Discover',
    body: 'We map your industry workflows and risk points, then align KPIs to measurable outcomes.'
  },
  {
    title: 'Integrate',
    body: 'Our hardware-to-cloud stack connects vehicles, operators, and facilities in a single view.'
  },
  {
    title: 'Optimize',
    body: 'AI-driven insights surface actions that reduce downtime, fuel waste, and compliance exposure.'
  },
  {
    title: 'Scale',
    body: 'Global rollout support, training, and performance governance keep teams aligned long-term.'
  }
];

export default function IndustriesPage() {
  const heroStats = useMemo(() => (
    [
      { label: 'Industries Served', value: '12+' },
      { label: 'Global Deployments', value: '25+ Countries' },
      { label: 'Operational Uptime', value: '99%+' }
    ]
  ), []);

  return (
    <main className="min-h-screen relative">
      <FluidBackground />
      <Navbar />

      {/* Hero */}
      <section className="relative z-10 pt-36 pb-20 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            className="absolute -top-24 -left-16 w-[30rem] h-[30rem] rounded-full bg-primary/25 blur-[130px]"
            animate={{ x: [0, 40, 0], y: [0, -30, 0] }}
            transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute bottom-[-14rem] right-[-8rem] w-[26rem] h-[26rem] rounded-full bg-red-500/25 blur-[130px]"
            animate={{ x: [0, -40, 0], y: [0, 40, 0] }}
            transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>

        <div className="max-w-6xl mx-auto px-6">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-xs md:text-sm text-white/60 uppercase tracking-[0.5em] font-bold mb-6"
          >
            Explore Your Industry
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-5xl md:text-7xl lg:text-8xl font-black text-white leading-[0.95] tracking-tight"
          >
            Transforming
            <span className="block text-white/70">Every Industry We Serve</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-8 text-lg md:text-2xl text-white/75 max-w-3xl leading-relaxed"
          >
            Purpose-built AI solutions that address the unique challenges of your industry, delivering
            measurable results and competitive advantages.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-10 flex flex-wrap gap-6"
          >
            {heroStats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-2xl px-6 py-4 text-white shadow-[0_20px_50px_-20px_rgba(0,0,0,0.6)]"
              >
                <p className="text-sm uppercase tracking-[0.3em] text-white/50 font-bold">{stat.label}</p>
                <p className="text-xl font-bold mt-2">{stat.value}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Industry Overview */}
      <section className="relative z-20 bg-white py-24">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl"
          >
            <p className="text-sm uppercase tracking-[0.4em] text-primary font-bold mb-4">Industry-Specific Solutions</p>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6">
              FleetNET GLOBAL adapts to the unique challenges of your industry, delivering targeted solutions that drive measurable results across diverse sectors.
            </h2>
            <p className="text-lg text-slate-600 leading-relaxed">
              From equipment-heavy operations to safety-critical public services, our platform combines IoT-grade
              hardware with intelligent software that scales with your operational complexity.
            </p>
          </motion.div>

          <div className="mt-14 grid grid-cols-1 lg:grid-cols-2 gap-8">
            {INDUSTRIES.map((industry, index) => (
              <motion.div
                key={industry.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.05 }}
                className="rounded-3xl border border-slate-200 bg-gradient-to-br from-white to-slate-50 p-8 shadow-xl"
              >
                <div className="flex items-start justify-between gap-6">
                  <div>
                    <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-6">
                      <industry.icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-2">{industry.title}</h3>
                    <p className="text-slate-600 leading-relaxed mb-6">{industry.description}</p>
                  </div>
                  <MapPin className="w-6 h-6 text-primary/40 hidden md:block" />
                </div>

                <div className="grid grid-cols-2 gap-3 text-sm text-slate-700 mb-6">
                  {industry.bullets.map((bullet) => (
                    <div key={bullet} className="flex items-start gap-2">
                      <span className="mt-2 w-2 h-2 rounded-full bg-primary" />
                      <span>{bullet}</span>
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-3 gap-3 text-center">
                  {industry.stats.map((stat) => (
                    <div key={stat.label} className="rounded-2xl bg-white shadow-sm border border-slate-100 px-4 py-4">
                      <p className="text-lg font-bold text-slate-900">{stat.value}</p>
                      <p className="text-xs uppercase tracking-[0.2em] text-slate-400 font-bold">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Spotlights */}
      <section className="relative z-10 py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-center justify-between flex-wrap gap-6 mb-12">
            <div>
              <p className="text-sm uppercase tracking-[0.4em] text-white/60 font-bold mb-4">Industry Spotlights</p>
              <h2 className="text-4xl md:text-5xl font-black text-white">Deep solutions built for real operators.</h2>
            </div>
            <div className="flex items-center gap-3 text-white/60 text-sm font-semibold">
              <span className="w-10 h-[2px] bg-primary" />
              AI-ready. Operator-tested.
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {SPOTLIGHTS.map((spotlight, index) => (
              <motion.div
                key={spotlight.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-2xl p-8 text-white shadow-[0_30px_80px_-30px_rgba(0,0,0,0.7)]"
              >
                <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${spotlight.accent} opacity-20`} />
                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center mb-6 text-primary">
                    <spotlight.icon className="w-6 h-6" />
                  </div>
                  <p className="text-xs uppercase tracking-[0.3em] text-white/50 font-bold">{spotlight.title}</p>
                  <h3 className="text-3xl font-bold mt-3 mb-3">{spotlight.subtitle}</h3>
                  <p className="text-white/70 leading-relaxed mb-6">{spotlight.description}</p>
                  <div className="space-y-3 text-sm text-white/70">
                    {spotlight.bullets.map((bullet) => (
                      <div key={bullet} className="flex items-start gap-3">
                        <span className="mt-2 w-2 h-2 rounded-full bg-primary" />
                        <span>{bullet}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Expansion */}
      <section className="relative z-20 bg-white py-24">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl"
          >
            <p className="text-sm uppercase tracking-[0.4em] text-primary font-bold mb-4">More Industries</p>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6">
              Expanding into every mission-critical sector.
            </h2>
            <p className="text-lg text-slate-600 leading-relaxed">
              FleetNET GLOBAL is engineered to scale across evolving industries with compliance-ready data,
              fast onboarding, and a platform that adapts as your business grows.
            </p>
          </motion.div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
            {EXPANSION.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="rounded-3xl border border-slate-200 bg-gradient-to-br from-white to-slate-50 p-8 shadow-xl"
              >
                <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-5">
                  <item.icon className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-2">{item.title}</h3>
                <p className="text-slate-600 leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="relative z-10 py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-center justify-between flex-wrap gap-6 mb-12">
            <div>
              <p className="text-sm uppercase tracking-[0.4em] text-white/60 font-bold mb-4">How We Deliver</p>
              <h2 className="text-4xl md:text-5xl font-black text-white">A repeatable playbook for every industry.</h2>
            </div>
            <div className="flex items-center gap-3 text-white/60 text-sm font-semibold">
              <span className="w-10 h-[2px] bg-primary" />
              Strategy to deployment.
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {PROCESS.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-2xl p-7 text-white shadow-[0_30px_80px_-30px_rgba(0,0,0,0.7)]"
              >
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-primary mb-4">
                  <Sparkles className="w-5 h-5" />
                </div>
                <p className="text-xs uppercase tracking-[0.3em] text-white/50 font-bold">0{index + 1}</p>
                <h3 className="text-xl font-bold mt-3 mb-3">{step.title}</h3>
                <p className="text-white/70 leading-relaxed text-sm">{step.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative z-20 py-24 bg-primary overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
        <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-black text-white mb-6"
          >
            Ready to map FleetNET to your industry?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg md:text-xl text-white/90 mb-10"
          >
            Our solutions team will build a roadmap that fits your operational reality, regulatory needs, and growth plans.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <button className="px-10 py-4 bg-white text-primary rounded-full font-bold text-lg hover:bg-slate-100 transition-all shadow-xl">
              Talk to Industry Team
            </button>
            <button className="px-10 py-4 bg-transparent border-2 border-white text-white rounded-full font-bold text-lg hover:bg-white/10 transition-all">
              Download Industry Guide
            </button>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
