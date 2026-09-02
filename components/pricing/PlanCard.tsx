"use client";

import type { SubscriptionPackage } from "@/lib/pricingPackages";
import { Check, X } from "lucide-react";
import Link from "next/link";
import AnimatedPrice from "./AnimatedPrice";
import { annualSavingsPercent, tierBase } from "./utils";

type Billing = "monthly" | "annual";

interface PlanCardProps {
  pkg: SubscriptionPackage;
  billing: Billing;
  isFeatured: boolean;
}

export default function PlanCard({ pkg, billing, isFeatured }: PlanCardProps) {
  const isMonthlyOnly = pkg.annualPrice === 0;
  const showAnnual = billing === "annual" && !isMonthlyOnly;
  const price = showAnnual ? pkg.annualPrice : pkg.monthlyPrice;
  const period = pkg.isPerVehiclePricing
    ? showAnnual
      ? "/ vehicle / yr"
      : "/ vehicle / mo"
    : showAnnual
      ? "/yr"
      : "/mo";
  const savings = showAnnual ? annualSavingsPercent(pkg) : null;

  const capacity: { label: string; value: string }[] = [
    {
      label: "Vehicles",
      value:
        pkg.maxVehicles === 1
          ? "1 Vehicle"
          : `Up to ${pkg.maxVehicles} Vehicles`,
    },
    { label: "Fleet Managers", value: `${pkg.maxFleetManagers}` },
    {
      label: "Drivers",
      value: pkg.maxDrivers > 0 ? `${pkg.maxDrivers}` : "None",
    },
    { label: "Data Retention", value: `${pkg.dataRetentionDays} Days` },
  ];

  const capabilities: { label: string; value: boolean }[] = [
    { label: "Advance Tracker", value: pkg.isOwnTrackerDevice },
    { label: "Fuel & Maintenance", value: pkg.hasFuelAndMaintenance },
    { label: "Web Portal Access", value: pkg.hasPortalAccess },
  ];

  return (
    <div
      className={`pricing-card relative flex flex-col rounded-2xl border p-7 lg:p-8 transition-[transform,box-shadow,border-color,background-color] duration-300 ${
        isFeatured
          ? "z-10 border-primary/40 bg-gradient-to-b from-primary/[0.07] to-[#0a0a0a] shadow-[0_0_60px_rgba(251,142,23,0.16)] lg:-translate-y-4 lg:scale-[1.035]"
          : "border-white/8 bg-[#0a0a0a] hover:border-white/15 hover:bg-white/[0.02] hover:-translate-y-1"
      }`}
    >
      {isFeatured && (
        <span className="inline-flex items-center gap-1.5 self-start px-3.5 py-1.5 mb-5 rounded-full bg-primary text-black text-[10px] font-black uppercase tracking-[0.2em] shadow-[0_0_20px_rgba(251,142,23,0.5)]">
          Recommended
        </span>
      )}

      <h3 className="text-lg font-black uppercase tracking-tight mb-1">
        {tierBase(pkg.name)}
      </h3>

      <div className="mt-6 mb-1.5 flex items-baseline gap-1.5 flex-wrap">
        <AnimatedPrice
          value={price}
          className="text-3xl md:text-4xl font-black tabular-nums tracking-tight font-mono"
        />
        <span className="text-white/40 font-medium text-sm">{period}</span>
      </div>

      <div className="mb-8 h-4 flex items-center gap-2">
        <p className="text-white/30 text-xs font-medium uppercase tracking-wider">
          {pkg.isPerVehiclePricing
            ? showAnnual
              ? "Per vehicle · billed annually"
              : "Per vehicle · billed monthly"
            : isMonthlyOnly
              ? "Monthly billing only"
              : showAnnual
                ? "Billed annually"
                : "Billed monthly"}
        </p>
        {savings && (
          <span className="text-primary text-xs font-bold">
            Save {savings}%
          </span>
        )}
      </div>

      <Link
        href="/contact"
        className={`w-full text-center py-3.5 rounded-full font-bold uppercase tracking-wider text-xs mb-8 transition-all duration-300 ${
          isFeatured
            ? "bg-primary text-black hover:bg-white shadow-[0_0_20px_rgba(251,142,23,0.4)]"
            : "bg-white/5 border border-white/10 text-white hover:bg-white/10 hover:border-white/20"
        }`}
      >
        Get Started
      </Link>

      <ul className="space-y-3.5">
        {capacity.map((feature) => (
          <li
            key={feature.label}
            className="flex items-center justify-between gap-3 text-sm"
          >
            <span className="text-white/50 font-medium">{feature.label}</span>
            <span className="text-white font-bold font-mono tabular-nums text-right">
              {feature.value}
            </span>
          </li>
        ))}
      </ul>

      <div className="my-4 border-t border-white/8" />

      <ul className="space-y-3.5 mt-auto">
        {capabilities.map((feature) => (
          <li
            key={feature.label}
            className="flex items-center justify-between gap-3 text-sm"
          >
            <span className="text-white/50 font-medium">{feature.label}</span>
            {feature.value ? (
              <Check className="w-4 h-4 text-primary shrink-0" />
            ) : (
              <X className="w-4 h-4 text-white/20 shrink-0" />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
