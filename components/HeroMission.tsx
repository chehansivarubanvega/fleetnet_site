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
      className="absolute inset-x-0 top-[15%] bottom-10 lg:inset-0 flex flex-col items-center justify-center text-center px-4 sm:px-6 z-30 pointer-events-none"
    >
      <div
        ref={missionBadgeRef}
        style={{ opacity: 0 }}
        className="inline-flex items-center px-5 sm:px-8 py-2.5 sm:py-3 rounded-full border border-white/10 bg-black/60 backdrop-blur-2xl mb-6 sm:mb-12 shadow-2xl max-w-full"
      >
        <span className="text-red-500 text-[9px] xs:text-[10px] md:text-sm font-black tracking-[0.2em] md:tracking-[0.3em] uppercase truncate">
          The industry favors the legacy, not the efficient.
        </span>
      </div>

      <h2
        ref={missionLine1Ref}
        style={{ opacity: 0 }}
        className="text-4xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-[90px] font-black text-white leading-[1] mb-2 lg:mb-4 max-w-5xl tracking-tighter drop-shadow-2xl"
      >
        We&apos;re changing that.
      </h2>

      <h2
        ref={missionLine2Ref}
        style={{ opacity: 0 }}
        className="text-4xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-[90px] font-black text-white leading-[1] mb-6 sm:mb-8 lg:mb-10 max-w-5xl tracking-tighter drop-shadow-2xl"
      >
        One optimized route at a time.
      </h2>

      <p
        ref={missionSubRef}
        style={{ opacity: 0 }}
        className="text-[14px] xs:text-[15px] sm:text-lg md:text-2xl lg:text-3xl text-white/50 max-w-[280px] xs:max-w-sm sm:max-w-xl lg:max-w-3xl leading-relaxed font-semibold text-balance"
      >
        FleetNET honors the organizations rewriting the rules of logistics—locally rooted, community-loved, but driven by mission and built with care.
      </p>
    </div>
  );
}
