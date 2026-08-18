'use client';

import { subscriptionPackages, type SubscriptionPackage } from '@/lib/pricingPackages';
import { Check, ChevronDown, X } from 'lucide-react';
import { motion } from 'motion/react';
import Link from 'next/link';
import { useMemo, useState } from 'react';

type AccountType = 'SingleUser' | 'Company';
type Billing = 'monthly' | 'annual';
type Retention = 45 | 60 | 90;

const RETENTION_OPTIONS: Retention[] = [45, 60, 90];

const CORPORATE_TIER_ORDER = ['Corporate - Basic', 'Corporate - Standard', 'Corporate - Pro'];

const FAQS = [
  {
    question: 'Can I use my own GPS tracker hardware?',
    answer:
      "Yes. Every plan except Single User Basic supports 'Bring Your Own Tracker' — connect compatible GPS hardware you already own instead of buying ours. Our onboarding team verifies device compatibility during setup.",
  },
  {
    question: 'What happens when I outgrow my vehicle limit?',
    answer:
      'You can upgrade to the next tier at any time and the change takes effect immediately, prorated for the current billing period. There is no downtime or data loss during an upgrade.',
  },
  {
    question: 'How does data retention work?',
    answer:
      'Data retention is the number of days of historical GPS, trip, and telemetry data kept accessible in your dashboard. Single User plans range from 7 to 30 days; Corporate plans let you choose 45, 60, or 90 days at signup.',
  },
  {
    question: 'Can I add multiple fleet managers?',
    answer:
      'Corporate plans include multiple fleet manager seats with independent logins and permission scopes, from 2 seats on Corporate Basic up to 10 seats on Corporate Pro. Single User plans are limited to one manager account.',
  },
  {
    question: "What if none of these plans fit my fleet?",
    answer:
      "We can build a custom package around unique vehicle counts, retention windows, or integration needs. Reach out through our contact form and our team will scope a plan tailored to your operation.",
  },
];

function formatLKR(amount: number): string {
  return `Rs. ${amount.toLocaleString('en-US')}`;
}

function tierBase(name: string): string {
  return name.replace(/\s*\(\d+ Days\)$/, '');
}

interface PlanCardProps {
  pkg: SubscriptionPackage;
  billing: Billing;
  isPromoted: boolean;
}

function PlanCard({ pkg, billing, isPromoted }: PlanCardProps) {
  const isMonthlyOnly = pkg.annualPrice === 0;
  const showAnnual = billing === 'annual' && !isMonthlyOnly;
  const price = showAnnual ? pkg.annualPrice : pkg.monthlyPrice;
  const period = showAnnual ? '/yr' : '/mo';

  const features: { label: string; value: string | boolean }[] = [
    {
      label: 'Vehicles',
      value: pkg.maxVehicles === 1 ? '1 Vehicle' : `Up to ${pkg.maxVehicles} Vehicles`,
    },
    { label: 'Fleet Managers', value: `${pkg.maxFleetManagers}` },
    { label: 'Drivers', value: pkg.maxDrivers > 0 ? `${pkg.maxDrivers}` : 'None' },
    { label: 'Data Retention', value: `${pkg.dataRetentionDays} Days` },
    { label: 'Bring Own Tracker', value: pkg.isOwnTrackerDevice },
    { label: 'Fuel & Maintenance', value: pkg.hasFuelAndMaintenance },
    { label: 'Web Portal Access', value: pkg.hasPortalAccess },
  ];

  return (
    <div
      className={`relative flex flex-col bg-[#0a0a0a] p-8 lg:p-10 transition-colors ${
        isPromoted ? 'z-10 border-2 border-primary bg-primary/[0.04]' : 'hover:bg-white/[0.02]'
      }`}
    >
      {isPromoted && (
        <span className="inline-block self-start px-4 py-1.5 mb-4 rounded-full bg-primary text-black text-[10px] font-black uppercase tracking-[0.2em] shadow-[0_0_20px_rgba(251,142,23,0.5)]">
          Most Popular
        </span>
      )}

      <h3 className="text-lg font-black uppercase tracking-tight mb-1">{tierBase(pkg.name)}</h3>

      <div className="mt-6 mb-1 flex items-baseline gap-1.5">
        <span className="text-3xl md:text-4xl font-black tabular-nums tracking-tight">
          {formatLKR(price)}
        </span>
        <span className="text-white/40 font-medium text-sm">{period}</span>
      </div>
      <p className="text-white/30 text-xs font-medium uppercase tracking-wider mb-8 h-4">
        {isMonthlyOnly ? 'Monthly billing only' : showAnnual ? 'Billed annually' : 'Billed monthly'}
      </p>

      <Link
        href="/contact"
        className={`w-full text-center py-3.5 rounded-full font-bold uppercase tracking-wider text-xs mb-8 transition-all duration-300 ${
          isPromoted
            ? 'bg-primary text-black hover:bg-white shadow-[0_0_20px_rgba(251,142,23,0.4)]'
            : 'bg-white/5 border border-white/10 text-white hover:bg-white/10 hover:border-white/20'
        }`}
      >
        Get Started
      </Link>

      <ul className="space-y-4 mt-auto">
        {features.map((feature) => (
          <li key={feature.label} className="flex items-center justify-between gap-3 text-sm">
            <span className="text-white/50 font-medium">{feature.label}</span>
            {typeof feature.value === 'boolean' ? (
              feature.value ? (
                <Check className="w-4 h-4 text-primary shrink-0" />
              ) : (
                <X className="w-4 h-4 text-white/20 shrink-0" />
              )
            ) : (
              <span className="text-white font-bold text-right">{feature.value}</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function PricingContent() {
  const [accountType, setAccountType] = useState<AccountType>('SingleUser');
  const [billing, setBilling] = useState<Billing>('monthly');
  const [retention, setRetention] = useState<Retention>(45);

  const singleUserPackages = useMemo(
    () =>
      subscriptionPackages
        .filter((p) => p.allowedAccountType === 'SingleUser')
        .sort((a, b) => a.id - b.id),
    [],
  );

  const corporatePackages = useMemo(
    () =>
      subscriptionPackages
        .filter((p) => p.allowedAccountType === 'Company' && p.dataRetentionDays === retention)
        .sort(
          (a, b) => CORPORATE_TIER_ORDER.indexOf(tierBase(a.name)) - CORPORATE_TIER_ORDER.indexOf(tierBase(b.name)),
        ),
    [retention],
  );

  const activePackages = accountType === 'SingleUser' ? singleUserPackages : corporatePackages;
  const gridCols = accountType === 'SingleUser' ? 'lg:grid-cols-4' : 'lg:grid-cols-3';

  return (
    <>
      {/* Hero + Controls */}
      <section className="relative z-10 pt-40 pb-16 sm:pt-48 sm:pb-24 bg-[#050505] overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(251,142,23,0.08),transparent_60%)] pointer-events-none" />
        <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center px-5 py-2.5 rounded-full border border-white/10 bg-black/60 backdrop-blur-2xl mb-8 shadow-2xl"
          >
            <span className="text-primary font-black uppercase tracking-[0.3em] text-[10px] sm:text-xs">
              Real-time tracking for 1 to 100+ vehicles
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-6xl md:text-7xl font-black mb-6 leading-[0.95] tracking-tighter uppercase"
          >
            Pricing built to <span className="text-primary">scale</span> with your fleet.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-white/50 text-lg md:text-xl font-medium max-w-2xl mx-auto mb-12"
          >
            From a single vehicle to a 100-strong corporate fleet — choose the plan that matches
            your operation today, and upgrade the moment it grows.
          </motion.p>

          {/* Account type switch */}
          <div className="inline-flex p-1.5 rounded-full bg-white/5 border border-white/10 mb-6">
            {(['SingleUser', 'Company'] as AccountType[]).map((type) => (
              <button
                key={type}
                onClick={() => setAccountType(type)}
                className={`px-6 py-2.5 rounded-full text-xs font-black uppercase tracking-wider transition-all duration-300 ${
                  accountType === type
                    ? 'bg-primary text-black shadow-[0_0_20px_rgba(251,142,23,0.4)]'
                    : 'text-white/50 hover:text-white'
                }`}
              >
                {type === 'SingleUser' ? 'Single User' : 'Corporate / Fleet'}
              </button>
            ))}
          </div>

          {/* Billing toggle */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <div className="inline-flex items-center gap-1 p-1.5 rounded-full bg-white/5 border border-white/10">
              {(['monthly', 'annual'] as Billing[]).map((cycle) => (
                <button
                  key={cycle}
                  onClick={() => setBilling(cycle)}
                  className={`px-6 py-2.5 rounded-full text-xs font-black uppercase tracking-wider transition-all duration-300 ${
                    billing === cycle
                      ? 'bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.15)]'
                      : 'text-white/50 hover:text-white'
                  }`}
                >
                  {cycle}
                </button>
              ))}
            </div>
            <span className="px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-[11px] font-black uppercase tracking-wider">
              Save up to 17%
            </span>
          </div>

          {/* Retention selector (Corporate only) */}
          {accountType === 'Company' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="mt-8"
            >
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
                        ? 'bg-primary text-black shadow-[0_0_20px_rgba(251,142,23,0.4)]'
                        : 'text-white/50 hover:text-white'
                    }`}
                  >
                    {days} Days
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* Pricing Grid */}
      <section className="relative z-10 pb-24 sm:pb-32 bg-[#050505]">
        <div className="max-w-7xl mx-auto px-6">
          <div
            key={accountType}
            className={`grid grid-cols-1 md:grid-cols-2 ${gridCols} gap-px bg-white/5 border border-white/5 rounded-3xl overflow-hidden`}
          >
            {activePackages.map((pkg) => (
              <PlanCard
                key={pkg.id}
                pkg={pkg}
                billing={billing}
                isPromoted={tierBase(pkg.name).endsWith('Pro')}
              />
            ))}
          </div>

          {/* Custom package callout */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-6 rounded-3xl border border-white/5 bg-white/[0.02] p-8 md:p-10 text-center sm:text-left">
            <div>
              <h3 className="text-lg md:text-xl font-black uppercase tracking-tight mb-2">
                Need something custom?
              </h3>
              <p className="text-white/50 font-medium max-w-xl">
                Fleets with unique vehicle counts, retention needs, or integration requirements
                can get a tailored package built around them — just tell us what you need.
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
      </section>

      {/* FAQ */}
      <section className="relative z-10 py-16 sm:py-32 bg-[#050505] border-t border-white/5">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-primary font-black uppercase tracking-[0.4em] text-[10px] sm:text-xs mb-4 block">
              Questions
            </span>
            <h2 className="text-3xl sm:text-5xl font-black mb-4 leading-[0.95] tracking-tighter uppercase">
              Frequently Asked <span className="text-white/20">Questions.</span>
            </h2>
          </div>

          <div className="divide-y divide-white/5 border-y border-white/5">
            {FAQS.map((faq) => (
              <details key={faq.question} className="group py-6">
                <summary className="flex items-center justify-between gap-4 cursor-pointer list-none">
                  <span className="text-base sm:text-lg font-bold text-white">{faq.question}</span>
                  <ChevronDown className="w-5 h-5 text-primary shrink-0 transition-transform duration-300 group-open:rotate-180" />
                </summary>
                <p className="text-white/50 font-medium leading-relaxed mt-4 pr-8">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
