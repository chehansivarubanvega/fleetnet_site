'use client';

import { motion } from 'framer-motion';
import { Award, Sparkles, Target } from 'lucide-react';

const VALUES = [
  {
    title: 'Mission-Driven Innovation',
    description: 'Every feature begins with a real operational challenge, then ships as a measurable improvement for the people on the ground.',
    icon: Sparkles
  },
  {
    title: 'Uncompromising Quality',
    description: 'We hold the line on precision in hardware manufacturing and software delivery so mission-critical fleets can depend on us.',
    icon: (props: any) => (
      <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>
    )
  },
  {
    title: 'Future Vision, Local Roots',
    description: 'Sri Lankan ingenuity powers our roadmap, while we continue to invest in local talent and long-term partnerships.',
    icon: (props: any) => (
      <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="m16.24 7.76-2.12 6.36-6.36 2.12 2.12-6.36z"/></svg>
    )
  },
  {
    title: 'Customer-Centric Partnership',
    description: 'We treat every deployment as a shared mission, aligning teams, playbooks, and support to your success.',
    icon: (props: any) => (
      <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
    )
  },
];

export default function AboutContent() {
  return (
    <>
      <section className="relative z-20 bg-[#050505] py-16 sm:py-24 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-12 lg:gap-16 items-start">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
            <p className="text-[10px] sm:text-xs uppercase tracking-[0.5em] text-white/30 font-black mb-6">Origin Specification</p>
            <h2 className="text-3xl xs:text-4xl md:text-6xl font-black text-white mb-6 md:mb-8 leading-[0.95] tracking-tight">FOUNDED IN COLOMBO,<br/><span className="text-white/20">SRI LANKA.</span></h2>
            <div className="space-y-6 text-white/50 text-base sm:text-lg md:text-xl leading-relaxed font-medium max-w-2xl">
              <p>FleetNET GLOBAL emerged from a simple observation: existing fleet management solutions were fragmented, unreliable, and failed to deliver the insights modern businesses needed.</p>
              <p>Our founders recognized that true innovation required controlling the entire technology stack—from hardware sensors to the cloud analytics platform.</p>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2 }} className="relative rounded-3xl border border-white/10 bg-white/[0.02] p-8 md:p-10 backdrop-blur-md">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 blur-[60px] rounded-full pointer-events-none" />
            <div className="space-y-8 relative z-10">
              <div className="flex items-start gap-6">
                <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-primary shrink-0"><Award className="w-7 h-7 md:w-8 md:h-8" /></div>
                <div>
                  <p className="text-[10px] sm:text-xs uppercase tracking-[0.4em] text-white/30 font-black mb-1 md:mb-2">Purpose</p>
                  <p className="text-xl md:text-2xl font-bold text-white tracking-tight">Integrated Architecture</p>
                </div>
              </div>
              <div className="h-px bg-white/10" />
              <p className="text-[15px] sm:text-base md:text-lg text-white/50 font-medium leading-relaxed">Controlling the entire stack lets us deliver uncompromised data reliability, rapid innovation cycles, and a seamless operator experience.</p>
              <div className="flex items-center gap-4 text-primary font-black uppercase tracking-[0.2em] text-[10px] sm:text-xs"><span className="w-8 md:w-10 h-[2px] bg-primary" />Engineering-first. Partner-led.</div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="relative z-20 py-20 sm:py-32 bg-[#050505] border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mb-16 md:mb-24">
            <span className="text-primary font-black uppercase tracking-[0.4em] md:tracking-[0.6em] text-xs md:text-sm mb-4 block flex items-center gap-4"><Target className="w-4 h-4 md:w-5 md:h-5" /> Our Principles</span>
            <h2 className="text-3xl xs:text-5xl md:text-7xl font-black mb-6 md:mb-8 leading-[0.95] tracking-tighter text-white">GUIDING EVERY <span className="text-white/20">SOLUTION.</span></h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/5 border border-white/5 rounded-3xl overflow-hidden">
            {VALUES.map((value, index) => (
              <motion.div key={value.title} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: index * 0.1 }} className="group relative bg-[#0a0a0a] p-8 xs:p-10 lg:p-16 hover:bg-white/[0.02] transition-all duration-500 overflow-hidden">
                <div className="absolute -inset-24 bg-primary/20 blur-[120px] rounded-full opacity-0 group-hover:opacity-100 transition-all duration-700 pointer-events-none" />
                <div className="relative z-10">
                  <div className="w-12 h-12 xs:w-16 xs:h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-8 xs:mb-10 text-primary group-hover:scale-110 group-hover:border-primary/30 transition-all duration-500"><value.icon className="w-6 h-6 xs:w-8 xs:h-8" /></div>
                  <h3 className="text-2xl xs:text-3xl font-black mb-4 xs:mb-6 tracking-tight group-hover:translate-x-2 transition-transform duration-500">{value.title}</h3>
                  <p className="text-white/50 text-[15px] xs:text-base sm:text-lg leading-relaxed font-medium">{value.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative z-10 py-20 sm:py-32 bg-[#050505]">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="text-white">
            <p className="text-[10px] sm:text-xs uppercase tracking-[0.4em] md:tracking-[0.6em] text-white/40 font-black mb-6">Execution</p>
            <h2 className="text-4xl xs:text-5xl md:text-7xl font-black leading-[0.9] mb-8 tracking-tighter text-center lg:text-left">BUILT BY <br/><span className="italic text-primary">EXPERTS.</span></h2>
            <p className="text-[15px] xs:text-lg md:text-xl text-white/50 leading-relaxed mb-10 font-medium max-w-xl text-center lg:text-left mx-auto lg:mx-0">Our team combines decades of experience in fleet management, IoT hardware development, and enterprise software engineering.</p>
            <div className="flex items-center justify-center lg:justify-start gap-4 text-white/40 font-black uppercase tracking-widest text-[10px] sm:text-xs"><span className="w-8 md:w-12 h-[2px] bg-primary" />Engineering depth. Operational empathy.</div>
          </motion.div>
          <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2 }} className="rounded-[2rem] sm:rounded-[3rem] border border-white/5 bg-white/[0.02] p-8 sm:p-12 text-white relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 blur-[80px] rounded-full group-hover:bg-primary/20 transition-colors duration-700 pointer-events-none" />
            <div className="flex items-center gap-6 mb-10 md:mb-12 relative z-10">
              <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-white/5 border border-white/10 text-white flex items-center justify-center"><Sparkles className="w-7 h-7 md:w-8 md:h-8" /></div>
              <div><p className="text-[10px] sm:text-xs uppercase tracking-[0.3em] md:tracking-[0.4em] text-primary font-black mb-1">Capabilities</p><p className="text-2xl xs:text-3xl font-black tracking-tight">Hardware-to-Cloud</p></div>
            </div>
            <ul className="space-y-6 md:space-y-8 text-white/50 text-base sm:text-lg md:text-xl font-medium relative z-10">
              {['Fleet-grade IoT hardware design & manufacturing.', 'Enterprise analytics & AI-driven optimization.', 'Deployment, onboarding, & long-term support.'].map(item => (
                <li key={item} className="flex items-center gap-5 sm:gap-6"><div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0"><span className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-primary" /></div>{item}</li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>

      <section className="py-24 sm:py-40 bg-[#050505] relative overflow-hidden border-t border-white/5">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white/[0.02] text-[30vw] md:text-[20vw] font-black uppercase leading-none select-none pointer-events-none">FLEETNET</div>
        <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="flex flex-col items-center">
             <div className="w-px h-16 md:h-24 bg-gradient-to-b from-transparent via-primary to-transparent mb-10 md:mb-12" />
             <h2 className="text-4xl xs:text-5xl md:text-8xl font-black mb-8 md:mb-10 leading-[0.9] tracking-tighter text-white">READY TO <span className="text-primary italic">OPTIMIZE?</span></h2>
             <p className="text-base sm:text-xl md:text-2xl text-white/50 mb-10 md:mb-12 max-w-2xl font-medium">Whether you&apos;re looking to transform your fleet operations or join our mission, we&apos;re ready to engineer the future together.</p>
             <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6">
                <button className="w-full sm:w-auto px-10 md:px-12 py-4 md:py-5 bg-white text-black font-black uppercase tracking-[0.2em] text-xs md:text-sm hover:bg-primary transition-all shadow-[0_0_40px_rgba(255,255,255,0.1)] rounded-full border border-white hover:border-primary">Contact FleetNET</button>
                <button className="w-full sm:w-auto px-10 md:px-12 py-4 md:py-5 bg-transparent border-2 border-white/10 text-white font-black uppercase tracking-[0.2em] text-xs md:text-sm hover:border-white transition-all rounded-full">Explore Careers</button>
             </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
