"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowDown } from "lucide-react";
import Image from "next/image";
import { useRef } from "react";
import HeroMission from "./HeroMission";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const heroTextRef = useRef<HTMLDivElement>(null);
  const heroLinesRef = useRef<HTMLHeadingElement>(null);
  const heroSubRef = useRef<HTMLParagraphElement>(null);

  const mockupsRef = useRef<HTMLDivElement>(null);
  const desktopMockupRef = useRef<HTMLDivElement>(null);
  const mobileMockupRef = useRef<HTMLDivElement>(null);

  const missionTextRef = useRef<HTMLDivElement>(null);
  const missionBadgeRef = useRef<HTMLDivElement>(null);
  const missionLine1Ref = useRef<HTMLHeadingElement>(null);
  const missionLine2Ref = useRef<HTMLHeadingElement>(null);
  const missionSubRef = useRef<HTMLParagraphElement>(null);

  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!sectionRef.current) return;

      gsap.set([heroLinesRef.current, heroSubRef.current], {
        autoAlpha: 1,
        y: 0,
      });
      gsap.set(mockupsRef.current, {
        autoAlpha: 1,
        scale: 1,
        rotate: 0,
      });
      gsap.set(
        [
          missionBadgeRef.current,
          missionLine1Ref.current,
          missionLine2Ref.current,
          missionSubRef.current,
        ],
        {
          autoAlpha: 0,
          y: 80,
          clipPath: "inset(100% -20% -20% -20%)",
        },
      );
      gsap.set(scrollIndicatorRef.current, { opacity: 1 });

      gsap.to(desktopMockupRef.current, {
        y: -15,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
      gsap.to(mobileMockupRef.current, {
        y: 20,
        duration: 2.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 0.5,
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=2500",
          pin: true,
          scrub: 0.8,
          anticipatePin: 1,
        },
      });

      tl.to({}, { duration: 0.3 })

        .to(scrollIndicatorRef.current, {
          autoAlpha: 0,
          y: 20,
          duration: 0.3,
          ease: "power2.in",
        })

        .to(
          [heroSubRef.current, heroLinesRef.current],
          {
            autoAlpha: 0,
            y: -60,
            duration: 1.2,
            stagger: 0.12,
            ease: "power3.in",
          },
          "<",
        )
        .to(
          mockupsRef.current,
          {
            scale: 0.75,
            autoAlpha: 0,
            rotate: 3,
            x: 120,
            duration: 1.8,
            ease: "power3.inOut",
          },
          "<0.1",
        )

        .to({}, { duration: 0.15 })

        .to(missionBadgeRef.current, {
          autoAlpha: 1,
          y: 0,
          clipPath: "inset(-20% -20% -20% -20%)",
          duration: 1.2,
          ease: "power3.out",
        })
        .to(
          missionLine1Ref.current,
          {
            autoAlpha: 1,
            y: 0,
            clipPath: "inset(-20% -20% -20% -20%)",
            duration: 1.2,
            ease: "power3.out",
          },
          "-=0.8",
        )
        .to(
          missionLine2Ref.current,
          {
            autoAlpha: 1,
            y: 0,
            clipPath: "inset(-20% -20% -20% -20%)",
            duration: 1.2,
            ease: "power3.out",
          },
          "-=0.8",
        )
        .to(
          missionSubRef.current,
          {
            autoAlpha: 1,
            y: 0,
            clipPath: "inset(-20% -20% -20% -20%)",
            duration: 1.2,
            ease: "power3.out",
          },
          "-=0.8",
        )

        .to({}, { duration: 0.6 });
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      className="relative w-full font-[family-name:var(--font-outfit)]"
    >
      <div
        ref={containerRef}
        className="hero-sticky-container h-screen w-full overflow-hidden flex items-center bg-black/5"
      >
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 w-full h-full flex items-center">
          {/* SCENE 1: Hero Text */}
          <div
            ref={heroTextRef}
            className="absolute top-[22%] sm:top-[15%] lg:top-1/2 lg:-translate-y-1/2 left-6 lg:left-12 right-6 lg:right-auto w-auto lg:w-1/2 z-30 pointer-events-auto"
          >
            <div className="text-left">
              <h1
                ref={heroLinesRef}
                className="text-[2.25rem] xs:text-[2.75rem] sm:text-6xl md:text-[80px] lg:text-[120px] font-black text-white leading-[0.95] lg:leading-[0.9] mb-4 sm:mb-6 lg:mb-8 tracking-tighter drop-shadow-2xl"
              >
                Revolution <br />
                in your <br />
                <span className="text-white/40">fleet</span>
              </h1>
              <p
                ref={heroSubRef}
                className="text-sm sm:text-lg md:text-2xl text-white/80 mb-5 lg:mb-10 leading-relaxed font-medium max-w-xl"
              >
                A data-driven platform to monitor assets, optimize fuel
                consumption, and transition to sustainable mobility.
              </p>
            </div>
          </div>

          {/* SCENE 2: Mission Text */}
          <HeroMission
            missionTextRef={missionTextRef}
            missionBadgeRef={missionBadgeRef}
            missionLine1Ref={missionLine1Ref}
            missionLine2Ref={missionLine2Ref}
            missionSubRef={missionSubRef}
          />

          {/* MOCKUPS */}
          <div
            ref={mockupsRef}
            className="absolute right-0 top-[48%] sm:top-[52%] lg:top-0 bottom-0 w-full lg:w-1/2 flex items-start lg:items-center justify-center pointer-events-none z-20"
          >
            <div className="relative w-full h-full flex items-start lg:items-center justify-center p-4 lg:p-12 scale-[0.85] xs:scale-[0.9] sm:scale-100 lg:scale-100">
              <div
                ref={desktopMockupRef}
                className="absolute top-0 lg:top-auto w-[105%] sm:w-[95%] lg:w-full max-w-[880px] aspect-[16/10]"
              >
                <Image
                  src="/images/tr.png"
                  alt="Laptop mockup"
                  fill
                  className="object-contain pointer-events-none select-none"
                  priority
                />
              </div>

              <div
                ref={mobileMockupRef}
                className="absolute right-[2%] top-[44%] sm:top-[50%] lg:top-auto lg:bottom-[8%] w-[130px] sm:w-[190px] lg:w-[260px] aspect-[9/19.5] z-30 max-h-[70vh]"
              >
                <Image
                  src="/images/iphone_mockup.svg"
                  alt="iPhone mockup"
                  fill
                  className="object-contain pointer-events-none select-none"
                  priority
                />
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Down Indicator */}
        <div
          ref={scrollIndicatorRef}
          className="absolute bottom-6 lg:bottom-12 left-6 lg:left-12 flex items-center gap-3 lg:gap-4 text-white/30 cursor-pointer hover:text-white transition-colors group z-40 pointer-events-auto"
          onClick={() =>
            window.scrollTo({ top: window.innerHeight, behavior: "smooth" })
          }
        >
          <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:border-white transition-colors bg-white/5 backdrop-blur-sm">
            <ArrowDown className="w-4 h-4 lg:w-5 lg:h-5 animate-bounce" />
          </div>
          <span className="text-[10px] lg:text-sm font-bold uppercase tracking-[0.4em]">
            Scroll down
          </span>
        </div>
      </div>
    </section>
  );
}
