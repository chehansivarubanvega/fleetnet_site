"use client";

import { RefObject } from "react";

interface HeroMissionProps {
  missionTextRef: RefObject<HTMLDivElement | null>;
  missionBadgeRef: RefObject<HTMLDivElement | null>;
  missionLine1Ref: RefObject<HTMLHeadingElement | null>;
  missionLine2Ref: RefObject<HTMLHeadingElement | null>;
  missionSubRef: RefObject<HTMLParagraphElement | null>;
}

export default function HeroMission({
  missionTextRef,
  missionBadgeRef,
  missionLine1Ref,
  missionLine2Ref,
  missionSubRef,
}: HeroMissionProps) {
  return (
    <div
      ref={missionTextRef}
      className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 z-30 pointer-events-none"
    >
      <div
        ref={missionBadgeRef}
        style={{ opacity: 0 }}
        className="inline-flex items-center px-8 py-3 rounded-full border border-white/20 bg-black/40 backdrop-blur-2xl mb-8 sm:mb-12 shadow-2xl"
      >
        <span className="text-red-400 text-xs md:text-sm font-bold tracking-[0.3em] uppercase">
          The industry favors the legacy, not the efficient.
        </span>
      </div>

      <h2
        ref={missionLine1Ref}
        style={{ opacity: 0 }}
        className="text-4xl md:text-7xl lg:text-[90px] font-black text-white leading-[1] mb-2 max-w-5xl tracking-tight drop-shadow-2xl"
      >
        We&apos;re changing that.
      </h2>

      <h2
        ref={missionLine2Ref}
        style={{ opacity: 0 }}
        className="text-4xl md:text-7xl lg:text-[90px] font-black text-white leading-[1] mb-6 sm:mb-10 max-w-5xl tracking-tight drop-shadow-2xl"
      >
        One optimized route at a time.
      </h2>

      <p
        ref={missionSubRef}
        style={{ opacity: 0 }}
        className="text-lg md:text-2xl lg:text-3xl text-white/70 max-w-4xl leading-relaxed font-medium"
      >
        FleetNET honors the organizations rewriting the rules of logistics
        locally rooted, community-loved, often underrepresented or
        overlooked, but driven by mission and built with care.
      </p>
    </div>
  );
}
