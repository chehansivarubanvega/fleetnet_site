'use client';

import React from 'react';
import { motion } from 'motion/react';
import { 
  BarChart3, 
  Map, 
  Users, 
  Wrench, 
  Fuel, 
  Bell, 
  Cpu, 
  ShieldCheck,
  Zap
} from 'lucide-react';

const modules = [
  {
    title: 'Dashboard',
    description: 'High-level operational overview with key fleet metrics and real-time activity tracking.',
    icon: BarChart3,
    color: 'bg-blue-500',
  },
  {
    title: 'Live Map',
    description: 'Real-time visibility of vehicle locations, status, and movement history.',
    icon: Map,
    color: 'bg-emerald-500',
  },
  {
    title: 'Driver Performance',
    description: 'Behavior scoring, compliance tracking, and safety reporting for every driver.',
    icon: Users,
    color: 'bg-orange-500',
  },
  {
    title: 'Maintenance',
    description: 'Scheduled and predictive service planning to reduce downtime and improve readiness.',
    icon: Wrench,
    color: 'bg-slate-500',
  },
  {
    title: 'Fuel & Charging',
    description: 'Operating cost capture and trend visibility for both ICE and Electric vehicles.',
    icon: Fuel,
    color: 'bg-primary',
  },
  {
    title: 'EV Health',
    description: 'Specialized state-of-charge and battery temperature analytics for electric fleets.',
    icon: Zap,
    color: 'bg-yellow-500',
  },
  {
    title: 'Job Booking',
    description: 'Operational scheduling and execution tracking from assignment to completion.',
    icon: ShieldCheck,
    color: 'bg-indigo-500',
  },
  {
    title: 'Notifications',
    description: 'A triage inbox for operational alerts, maintenance reminders, and safety events.',
    icon: Bell,
    color: 'bg-rose-500',
  },
  {
    title: 'Device Management',
    description: 'Manage GPS tracker units and deploy firmware updates across your fleet.',
    icon: Cpu,
    color: 'bg-cyan-500',
  },
];

export default function Modules() {
  return (
    <section className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-slate-900 mb-6"
          >
            Comprehensive Fleet Operations
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-slate-600"
          >
            FleetNET GLOBAL integrates every aspect of your operations into a single, powerful command center.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {modules.map((module, index) => (
            <motion.div
              key={module.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-xl transition-all group"
            >
              <div className={`w-14 h-14 ${module.color} rounded-xl flex items-center justify-center mb-6 text-white group-hover:scale-110 transition-transform`}>
                <module.icon className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-primary transition-colors">
                {module.title}
              </h3>
              <p className="text-slate-600 leading-relaxed">
                {module.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
