'use client';

import { type ReactNode, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function SmoothScroll({ children }: { children: ReactNode }) {
  const lenisRef = useRef<InstanceType<typeof import('lenis').default> | null>(null);

  useEffect(() => {
    let mounted = true;
    let tickerCallback: ((time: number) => void) | null = null;

    (async () => {
      const { default: Lenis } = await import('lenis');
      if (!mounted) return;

      const lenis = new Lenis({
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 0.9,
        touchMultiplier: 1.5,
      });

      lenisRef.current = lenis;

      lenis.on('scroll', ScrollTrigger.update);
      tickerCallback = (time: number) => lenis.raf(time * 1000);
      gsap.ticker.add(tickerCallback);
      gsap.ticker.lagSmoothing(0);
    })();

    return () => {
      mounted = false;
      if (tickerCallback) {
        gsap.ticker.remove(tickerCallback);
      }
      lenisRef.current?.destroy();
      lenisRef.current = null;
    };
  }, []);

  return <>{children}</>;
}
