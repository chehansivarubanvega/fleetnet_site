"use client";

import { subscriptionPackages } from "@/lib/pricingPackages";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { useMemo, useRef, useState } from "react";
import AnimatedPrice from "./AnimatedPrice";
import ComparisonTable from "./ComparisonTable";
import PlanCard from "./PlanCard";
import { annualSavingsPercent, tierBase } from "./utils";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type AccountType = "SingleUser" | "Company";
type Billing = "monthly" | "annual";
type Retention = 45 | 60 | 90;

const RETENTION_OPTIONS: Retention[] = [45, 60, 90];

const CORPORATE_TIER_ORDER = [
  "Corporate - Basic",
  "Corporate - Standard",
  "Corporate - Pro",
];

const INDUSTRIES = [
  "Construction",
  "Freight & Logistics",
  "Utilities",
  "Public Sector",
  "Healthcare Logistics",
];

const FAQS = [
  {
    question: "Can I use my own GPS tracker hardware?",
    answer:
      "Yes. Every plan except Single User Basic supports 'Bring Your Own Tracker' — connect compatible GPS hardware you already own instead of buying ours. Our onboarding team verifies device compatibility during setup.",
  },
  {
    question: "What happens when I outgrow my vehicle limit?",
    answer:
      "You can upgrade to the next tier at any time and the change takes effect immediately, prorated for the current billing period. There is no downtime or data loss during an upgrade.",
  },
  {
    question: "How does data retention work?",
    answer:
      "Data retention is the number of days of historical GPS, trip, and telemetry data kept accessible in your dashboard. Single User plans range from 7 to 30 days; Corporate plans let you choose 45, 60, or 90 days at signup.",
  },
  {
    question: "Can I add multiple fleet managers?",
    answer:
      "Corporate plans include multiple fleet manager seats with independent logins and permission scopes, from 2 seats on Corporate Basic up to 10 seats on Corporate Pro. Single User plans are limited to one manager account.",
  },
  {
    question: "What if none of these plans fit my fleet?",
    answer:
      "We can build a custom package around unique vehicle counts, retention windows, or integration needs. Reach out through our contact form and our team will scope a plan tailored to your operation.",
  },
];

function FAQItem({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="py-6 border-b border-white/8 last:border-b-0">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex items-center justify-between gap-4 w-full text-left"
      >
        <span className="text-base sm:text-lg font-bold text-white">
          {question}
        </span>
        <ChevronDown
          className={`w-5 h-5 text-primary shrink-0 transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>
      <div
        className="grid transition-[grid-template-rows] duration-300 ease-out"
        style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
      >
        <div className="overflow-hidden">
          <p className="text-white/50 font-medium leading-relaxed pt-4 pr-8">
            {answer}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function PricingContent() {
  const [accountType, setAccountType] = useState<AccountType>("SingleUser");
  const [billing, setBilling] = useState<Billing>("monthly");
  const [retention, setRetention] = useState<Retention>(45);

  const heroRef = useRef<HTMLElement>(null);
  const gridSectionRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const hasRevealedGridRef = useRef(false);

  const singleUserPackages = useMemo(
    () =>
      subscriptionPackages
        .filter((p) => p.allowedAccountType === "SingleUser")
        .sort((a, b) => a.id - b.id),
    [],
  );

  const corporatePackages = useMemo(
    () =>
      subscriptionPackages
        .filter(
          (p) =>
            p.allowedAccountType === "Company" &&
            p.dataRetentionDays === retention,
        )
        .sort(
          (a, b) =>
            CORPORATE_TIER_ORDER.indexOf(tierBase(a.name)) -
            CORPORATE_TIER_ORDER.indexOf(tierBase(b.name)),
        ),
    [retention],
  );

  const activePackages =
    accountType === "SingleUser" ? singleUserPackages : corporatePackages;
  const gridCols =
    accountType === "SingleUser" ? "lg:grid-cols-4" : "lg:grid-cols-3";

  const cheapestPrice = useMemo(() => {
    const prices = activePackages.map((p) =>
      billing === "annual" && p.annualPrice > 0 ? p.annualPrice : p.monthlyPrice,
    );
    return prices.length ? Math.min(...prices) : 0;
  }, [activePackages, billing]);

  const maxSavings = useMemo(() => {
    const values = activePackages
      .map((p) => annualSavingsPercent(p))
      .filter((v): v is number => v !== null);
    return values.length ? Math.max(...values) : 0;
  }, [activePackages]);

  /* Hero entrance — one orchestrated reveal on load */
  useGSAP(
    () => {
      if (!heroRef.current) return;

      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      const targets = [
        ".hero-badge",
        ".hero-line",
        ".hero-sub",
        ".hero-chips",
        ".hero-controls",
      ].map((selector) => heroRef.current!.querySelectorAll(selector));

      if (prefersReducedMotion) {
        targets.forEach((t) => gsap.set(t, { opacity: 1, y: 0 }));
        return;
      }

      targets.forEach((t) => gsap.set(t, { opacity: 0, y: 24 }));

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      targets.forEach((t, i) => {
        tl.to(
          t,
          { opacity: 1, y: 0, duration: 0.8, stagger: 0.1 },
          i === 0 ? undefined : "-=0.5",
        );
      });
    },
    { scope: heroRef },
  );

  /* Plan grid reveal — scroll-triggered on first view, instant re-stagger on tab switch */
  useGSAP(
    () => {
      const cards = gridRef.current?.querySelectorAll(".pricing-card") ?? [];
      if (!cards.length) return;

      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      if (prefersReducedMotion) {
        gsap.set(cards, { opacity: 1, y: 0 });
        return;
      }

      gsap.set(cards, { opacity: 0, y: 28 });

      if (!hasRevealedGridRef.current) {
        gsap.to(cards, {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.08,
          ease: "power2.out",
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 85%",
            once: true,
          },
          onStart: () => {
            hasRevealedGridRef.current = true;
          },
        });
      } else {
        gsap.to(cards, {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.06,
          ease: "power2.out",
        });
      }
    },
    { scope: gridSectionRef, dependencies: [accountType, retention] },
  );

  return (
    <>
      {/* Hero + Controls */}
      <section
        ref={heroRef}
        className="relative z-10 pt-40 pb-16 sm:pt-48 sm:pb-24 bg-[#050505] overflow-hidden"
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(251,142,23,0.08),transparent_60%)] pointer-events-none" />
        <div
          className="absolute inset-0 opacity-[0.25] pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.5) 1px, transparent 0)",
            backgroundSize: "32px 32px",
            maskImage:
              "radial-gradient(ellipse 60% 50% at 50% 20%, black 0%, transparent 75%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 60% 50% at 50% 20%, black 0%, transparent 75%)",
          }}
        />

        <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
          <div className="hero-badge inline-flex items-center px-5 py-2.5 rounded-full border border-white/10 bg-black/60 backdrop-blur-2xl mb-8 shadow-2xl">
            <span className="text-primary font-black uppercase tracking-[0.3em] text-[10px] sm:text-xs">
              Real-time tracking for 1 to 100+ vehicles
            </span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black mb-6 leading-[0.95] tracking-tighter uppercase">
            <span className="hero-line block">Pricing that scales</span>
            <span className="hero-line block text-white/35">
              with your fleet.
            </span>
          </h1>

          <p className="hero-sub text-white/50 text-lg md:text-xl font-medium max-w-2xl mx-auto mb-8">
            From a single vehicle to a 100-strong corporate fleet — choose
            the plan that matches your operation today, and upgrade the
            moment it grows.
          </p>

          <div className="hero-chips flex flex-wrap items-center justify-center gap-2 mb-12">
            {INDUSTRIES.map((industry) => (
              <span
                key={industry}
                className="px-3.5 py-1.5 rounded-full border border-white/10 bg-white/[0.03] text-white/40 text-xs font-medium"
              >
                {industry}
              </span>
            ))}
          </div>

          <div className="hero-controls">
            {/* Account type switch */}
            <div className="inline-flex p-1.5 rounded-full bg-white/5 border border-white/10 mb-6">
              {(["SingleUser", "Company"] as AccountType[]).map((type) => (
                <button
                  key={type}
                  onClick={() => setAccountType(type)}
                  className={`px-6 py-2.5 rounded-full text-xs font-black uppercase tracking-wider transition-all duration-300 ${
                    accountType === type
                      ? "bg-primary text-black shadow-[0_0_20px_rgba(251,142,23,0.4)]"
                      : "text-white/50 hover:text-white"
                  }`}
                >
                  {type === "SingleUser" ? "Single User" : "Corporate / Fleet"}
                </button>
              ))}
            </div>

            {/* Billing toggle */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <div className="inline-flex items-center gap-1 p-1.5 rounded-full bg-white/5 border border-white/10">
                {(["monthly", "annual"] as Billing[]).map((cycle) => (
                  <button
                    key={cycle}
                    onClick={() => setBilling(cycle)}
                    className={`px-6 py-2.5 rounded-full text-xs font-black uppercase tracking-wider transition-all duration-300 ${
                      billing === cycle
                        ? "bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.15)]"
                        : "text-white/50 hover:text-white"
                    }`}
                  >
                    {cycle}
                  </button>
                ))}
              </div>
              {maxSavings > 0 && (
                <span className="px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-[11px] font-black uppercase tracking-wider">
                  Save up to {maxSavings}%
                </span>
              )}
            </div>

            {/* Retention selector (Corporate only) */}
            {accountType === "Company" && (
              <div className="mt-8">
                <p className="text-white/30 text-[11px] font-black uppercase tracking-[0.2em] mb-3">
                  Data Retention
                </p>
                <div className="inline-flex items-center gap-1 p-1.5 rounded-full bg-white/5 border border-white/10">
                  {RETENTION_OPTIONS.map((days) => (
                    <button
                      key={days}
                      onClick={() => setRetention(days)}
                      className={`px-5 py-2 rounded-full text-xs font-black uppercase tracking-wider transition-all duration-300 ${
                        retention === days
                          ? "bg-primary text-black shadow-[0_0_20px_rgba(251,142,23,0.4)]"
                          : "text-white/50 hover:text-white"
                      }`}
                    >
                      {days} Days
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Live cost readout */}
            <p className="mt-8 text-white/30 text-sm font-medium">
              Plans from{" "}
              <AnimatedPrice
                value={cheapestPrice}
                className="text-white font-mono font-bold tabular-nums"
              />{" "}
              {billing === "annual" ? "/ yr" : "/ mo"}
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Grid */}
      <section
        ref={gridSectionRef}
        className="relative z-10 pb-20 sm:pb-28 bg-[#050505]"
      >
        <div className="max-w-7xl mx-auto px-6">
          <div
            ref={gridRef}
            key={accountType}
            className={`grid grid-cols-1 md:grid-cols-2 ${gridCols} gap-4 lg:gap-5`}
          >
            {activePackages.map((pkg) => (
              <PlanCard
                key={pkg.id}
                pkg={pkg}
                billing={billing}
                isFeatured={tierBase(pkg.name).endsWith("Pro")}
              />
            ))}
          </div>

          <ComparisonTable
            packages={activePackages}
            billing={billing}
            featuredName={
              accountType === "SingleUser"
                ? "Single User - Pro"
                : "Corporate - Pro"
            }
          />

          {/* Custom package callout */}
          <div className="relative mt-14 overflow-hidden rounded-3xl border border-white/8 bg-white/[0.02] p-8 md:p-10">
            <div
              className="absolute inset-0 opacity-[0.15] pointer-events-none"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.6) 1px, transparent 0)",
                backgroundSize: "28px 28px",
                maskImage:
                  "radial-gradient(ellipse 80% 100% at 100% 0%, black 0%, transparent 70%)",
                WebkitMaskImage:
                  "radial-gradient(ellipse 80% 100% at 100% 0%, black 0%, transparent 70%)",
              }}
            />
            <div className="relative flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
              <div>
                <h3 className="text-lg md:text-xl font-black uppercase tracking-tight mb-2">
                  Need something custom?
                </h3>
                <p className="text-white/50 font-medium max-w-xl">
                  Fleets with unique vehicle counts, retention needs, or
                  integration requirements can get a tailored package built
                  around them — just tell us what you need.
                </p>
              </div>
              <Link
                href="/contact"
                className="shrink-0 inline-flex items-center justify-center px-8 py-3.5 rounded-full bg-white text-black font-bold uppercase tracking-wider text-xs hover:bg-primary transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.1)]"
              >
                Request a Custom Package
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="relative z-10 py-16 sm:py-32 bg-[#050505] border-t border-white/5">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-[0.85fr_1.4fr] gap-10 lg:gap-16">
            <div className="lg:sticky lg:top-32 self-start text-center lg:text-left">
              <h2 className="text-3xl sm:text-5xl font-black mb-4 leading-[0.95] tracking-tighter uppercase">
                Questions,
                <br />
                answered.
              </h2>
              <p className="text-white/50 font-medium mb-6 max-w-sm mx-auto lg:mx-0">
                Can&apos;t find what you&apos;re looking for? Our team can
                walk you through the right plan for your fleet.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-7 py-3 rounded-full bg-white/5 border border-white/10 text-white font-bold uppercase tracking-wider text-xs hover:bg-white/10 hover:border-white/20 transition-all duration-300"
              >
                Talk to us
              </Link>
            </div>

            <div>
              {FAQS.map((faq) => (
                <FAQItem
                  key={faq.question}
                  question={faq.question}
                  answer={faq.answer}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
