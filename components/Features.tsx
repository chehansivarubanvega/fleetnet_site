'use client';

import Image from 'next/image';
import { motion } from 'motion/react';
import { CheckCircle2 } from 'lucide-react';

export default function Features() {
  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          {/* Image Side */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex-1 relative"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-video">
              <Image 
                src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=1000" 
                alt="Fleet Management Dashboard"
                fill
                className="object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-8">
                <div className="text-white">
                  <p className="text-primary font-bold mb-1">Live Monitoring</p>
                  <p className="text-xl font-medium">Real-time telemetry from every asset.</p>
                </div>
              </div>
            </div>
            {/* Floating Card */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="absolute -bottom-10 -right-10 bg-white p-6 rounded-2xl shadow-2xl border border-slate-100 hidden md:block"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm text-slate-500">Fleet Status</p>
                  <p className="text-lg font-bold text-slate-900">98.4% Operational</p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="h-2 w-48 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full w-[98%] bg-emerald-500" />
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Text Side */}
          <div className="flex-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold text-slate-900 mb-6 leading-tight">
                Built for Modern <br /> Fleet Governance
              </h2>
              <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                FleetNET GLOBAL is more than just tracking. It&apos;s an operations platform designed for organizations that need to balance growth with strict cost and compliance controls.
              </p>

              <ul className="space-y-6">
                {[
                  { title: 'RBAC Security', desc: 'Granular access control for Admins, Managers, and Drivers.' },
                  { title: 'Driver Coaching', desc: 'Use safety scores and violation reports to improve behavior.' },
                  { title: 'Cost Control', desc: 'Detailed fuel and charging analytics to spot inefficiencies.' },
                  { title: 'Lifecycle Management', desc: 'From onboarding to decommissioning, track every asset detail.' }
                ].map((item, i) => (
                  <motion.li 
                    key={item.title}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex gap-4"
                  >
                    <div className="mt-1 w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900">{item.title}</h4>
                      <p className="text-slate-600 text-sm">{item.desc}</p>
                    </div>
                  </motion.li>
                ))}
              </ul>

              <button className="mt-10 px-8 py-4 border-2 border-slate-900 text-slate-900 rounded-full font-bold hover:bg-slate-900 hover:text-white transition-all">
                Learn More About Governance
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
