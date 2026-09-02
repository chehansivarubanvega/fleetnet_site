"use client";

import gsap from "gsap";
import { useEffect, useRef, useState } from "react";
import { formatLKR } from "./utils";

interface AnimatedPriceProps {
  value: number;
  className?: string;
}

export default function AnimatedPrice({ value, className }: AnimatedPriceProps) {
  const [display, setDisplay] = useState(value);
  const tweenState = useRef({ val: value });

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const tween = gsap.to(tweenState.current, {
      val: value,
      duration: prefersReducedMotion ? 0 : 0.6,
      ease: "power2.out",
      onUpdate: () => setDisplay(tweenState.current.val),
    });

    return () => {
      tween.kill();
    };
  }, [value]);

  return (
    <span className={className} suppressHydrationWarning>
      {formatLKR(display)}
    </span>
  );
}
