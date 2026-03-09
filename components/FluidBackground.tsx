'use client';

import React from 'react';
import { motion } from 'motion/react';

export default function FluidBackground() {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none bg-[var(--bg-base,#2a0f04)] will-change-transform">
      {/* Dynamic Theme Variables */}
      <style jsx global>{`
        :root {
          --bg-base: #2a0f04;
          --bg-color-1: rgba(255, 69, 0, 0.7);
          --bg-color-2: rgba(255, 165, 0, 0.6);
          --bg-color-3: rgba(61, 26, 8, 0.8);
          --bg-color-4: rgba(255, 204, 0, 0.4);
        }
      `}</style>

      {/* Base Layer */}
      <div 
        className="absolute inset-0 opacity-100 transition-colors duration-1000" 
        style={{ background: 'linear-gradient(to bottom right, var(--bg-base), var(--bg-color-3))' }}
      />
      
      {/* Container for Liquid Blobs (Removed expensive 100px blur and contrast filters) */}
      <div className="absolute inset-0 will-change-transform">
        
        {/* Blob 1: Main Pigment */}
        <motion.div
          animate={{
            x: [-200, 300, -200],
            y: [-150, 150, -150],
            rotate: [0, 180, 360],
            scale: [1.2, 1.8, 1.2],
          }}
          transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[-10%] left-[-10%] w-[120vw] h-[120vh] mix-blend-hard-light transition-colors duration-1000 will-change-transform"
          style={{ background: 'radial-gradient(circle, var(--bg-color-1) 0%, transparent 60%)' }}
        />
        
        {/* Blob 2: Secondary Flow */}
        <motion.div
          animate={{
            x: [300, -300, 300],
            y: [100, -200, 100],
            rotate: [360, 0],
            scale: [1.5, 0.9, 1.5],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-[-20%] right-[-10%] w-[120vw] h-[120vh] mix-blend-overlay transition-colors duration-1000 will-change-transform"
          style={{ background: 'radial-gradient(circle, var(--bg-color-2) 0%, transparent 65%)' }}
        />

        {/* Blob 3: Deep Current */}
        <motion.div
          animate={{
            x: [-500, 500, -500],
            y: [0, 200, 0],
            scaleX: [1, 3, 1],
            scaleY: [0.4, 0.8, 0.4],
          }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[30%] left-[-20%] w-[150vw] h-[100vh] mix-blend-multiply transition-colors duration-1000 will-change-transform"
          style={{ background: 'radial-gradient(ellipse, var(--bg-color-3) 0%, transparent 70%)' }}
        />

        {/* Blob 4: Bright Ink */}
        <motion.div
          animate={{
            x: [400, -400, 400],
            y: [-400, 400, -400],
            rotate: [-30, 30, -30],
            scale: [0.8, 1.3, 0.8],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 w-[100vw] h-[100vh] m-auto mix-blend-color-dodge transition-colors duration-1000 will-change-transform"
          style={{ background: 'radial-gradient(circle, var(--bg-color-4) 0%, transparent 50%)' }}
        />
      </div>

      {/* Noise Texture Overlay for "Grainy" Paint Feel */}
      <div className="absolute inset-0 opacity-[0.12] pointer-events-none mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
    </div>
  );
}
