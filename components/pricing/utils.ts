import type { SubscriptionPackage } from "@/lib/pricingPackages";

export function formatLKR(amount: number): string {
  return `Rs. ${Math.round(amount).toLocaleString("en-US")}`;
}

export function tierBase(name: string): string {
  return name.replace(/\s*\(\d+ Days\)$/, "");
}

/** Percentage saved by paying annually vs. 12x the monthly price. Null if not applicable. */
export function annualSavingsPercent(pkg: SubscriptionPackage): number | null {
  if (!pkg.annualPrice) return null;
  const fullYearAtMonthly = pkg.monthlyPrice * 12;
  if (fullYearAtMonthly <= 0) return null;
  const pct = Math.round((1 - pkg.annualPrice / fullYearAtMonthly) * 100);
  return pct > 0 ? pct : null;
}
