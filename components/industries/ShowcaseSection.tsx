'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

interface Feature {
  title: string;
  subtitle: string;
  description: string;
  image: string;
  stat: string;
  statLabel: string;
}

export default function ShowcaseSection({
  feature,
  index,
}: {
  feature: Feature;
  index: number;
}) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [0.8, 1, 1, 0.8],
  );

  const isEven = index % 2 === 0;

  return (
    <section ref={ref} className="py-32 relative overflow-hidden bg-[#050505]">
      <div className="max-w-7xl mx-auto px-6">
        <div className={`flex flex-col ${isEven ? "lg:flex-row" : "lg:flex-row-reverse"} items-center gap-16 lg:gap-24`}>
          <motion.div style={{ y, opacity, scale }} className="flex-1 relative aspect-[16/10] w-full rounded-2xl overflow-hidden border border-white/5 bg-white/5 shadow-2xl">
            <Image src={feature.image} alt={feature.title} fill className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-60" />
          </motion.div>
          <div className="flex-1 max-w-xl">
            <motion.div initial={{ opacity: 0, x: isEven ? 50 : -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2 }}>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-10 h-0.5 bg-primary" />
                <span className="text-primary font-black uppercase tracking-[0.4em] text-xs leading-none">{feature.subtitle}</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-white mb-6 leading-tight">{feature.title}</h2>
              <p className="text-lg text-white/60 leading-relaxed font-medium mb-10">{feature.description}</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-white/10">
                <div>
                  <p className="text-4xl font-black text-white flex items-baseline gap-1">{feature.stat}<span className="text-primary text-xl">+</span></p>
                  <p className="text-xs font-bold text-white/40 uppercase tracking-[0.2em] mt-2">{feature.statLabel}</p>
                </div>
                <div className="flex flex-col justify-end">
                  <button className="group flex items-center gap-2 text-white font-bold text-sm uppercase tracking-widest hover:text-primary transition-colors">
                    View Spec Sheet
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
