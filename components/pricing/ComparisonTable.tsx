"use client";

import type { SubscriptionPackage } from "@/lib/pricingPackages";
import { Check, ChevronDown, X } from "lucide-react";
import { useState } from "react";
import AnimatedPrice from "./AnimatedPrice";
import { tierBase } from "./utils";

type Billing = "monthly" | "annual";

interface ComparisonTableProps {
  packages: SubscriptionPackage[];
  billing: Billing;
  featuredName: string;
}

interface Row {
  label: string;
  render: (pkg: SubscriptionPackage) => React.ReactNode;
}

function boolCell(value: boolean) {
  return value ? (
    <Check className="w-4 h-4 text-primary mx-auto" />
  ) : (
    <X className="w-4 h-4 text-white/20 mx-auto" />
  );
}

export default function ComparisonTable({
  packages,
  billing,
  featuredName,
}: ComparisonTableProps) {
  const [open, setOpen] = useState(false);

  const rows: Row[] = [
    {
      label: "Price",
      render: (pkg) => {
        const isMonthlyOnly = pkg.annualPrice === 0;
        const showAnnual = billing === "annual" && !isMonthlyOnly;
        const price = showAnnual ? pkg.annualPrice : pkg.monthlyPrice;
        return (
          <AnimatedPrice
            value={price}
            className="font-mono tabular-nums font-bold text-white"
          />
        );
      },
    },
    {
      label: "Vehicles",
      render: (pkg) => (pkg.maxVehicles === 1 ? "1" : `Up to ${pkg.maxVehicles}`),
    },
    { label: "Fleet Managers", render: (pkg) => `${pkg.maxFleetManagers}` },
    {
      label: "Drivers",
      render: (pkg) => (pkg.maxDrivers > 0 ? `${pkg.maxDrivers}` : "None"),
    },
    { label: "Data Retention", render: (pkg) => `${pkg.dataRetentionDays} Days` },
    {
      label: "Advance Tracker",
      render: (pkg) => boolCell(pkg.isOwnTrackerDevice),
    },
    {
      label: "Fuel & Maintenance",
      render: (pkg) => boolCell(pkg.hasFuelAndMaintenance),
    },
    {
      label: "Web Portal Access",
      render: (pkg) => boolCell(pkg.hasPortalAccess),
    },
  ];

  return (
    <div className="mt-6">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="inline-flex items-center gap-2 text-white/50 hover:text-white text-xs font-bold uppercase tracking-wider transition-colors"
      >
        {open ? "Hide full comparison" : "Compare all plans in detail"}
        <ChevronDown
          className={`w-4 h-4 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
        />
      </button>

      <div
        className="grid transition-[grid-template-rows] duration-300 ease-out"
        style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
      >
        <div className="overflow-hidden">
          <div className="mt-6 overflow-x-auto rounded-2xl border border-white/8">
            <table className="w-full border-collapse text-sm min-w-[640px]">
              <thead>
                <tr className="border-b border-white/8">
                  <th className="sticky left-0 bg-[#0a0a0a] text-left font-medium text-white/40 text-xs uppercase tracking-wider p-4 min-w-[160px]">
                    Feature
                  </th>
                  {packages.map((pkg) => {
                    const name = tierBase(pkg.name);
                    const isFeatured = name === featuredName;
                    return (
                      <th
                        key={pkg.id}
                        className={`text-center font-black uppercase tracking-tight text-xs p-4 min-w-[130px] ${
                          isFeatured
                            ? "text-primary bg-primary/[0.05]"
                            : "text-white"
                        }`}
                      >
                        {name}
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr
                    key={row.label}
                    className="border-b border-white/5 last:border-b-0"
                  >
                    <td className="sticky left-0 bg-[#0a0a0a] text-white/50 font-medium p-4">
                      {row.label}
                    </td>
                    {packages.map((pkg) => {
                      const isFeatured = tierBase(pkg.name) === featuredName;
                      return (
                        <td
                          key={pkg.id}
                          className={`text-center p-4 text-white/80 ${
                            isFeatured ? "bg-primary/[0.05]" : ""
                          }`}
                        >
                          {row.render(pkg)}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
