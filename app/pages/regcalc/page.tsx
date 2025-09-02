"use client";

import React, { useMemo, useState } from "react";

/**
 * Telangana Property Registration Costs Calculator
 * Extended for: Gift Deeds, Mortgage (variants), Development/Construction Agreement cum GPA
 *
 * Notes:
 * - Area matters for some components: "Gram Panchayat" vs "Other Urban/Other Areas" (Municipality/Corporation/UDA/IALA).
 * - Some deeds have min/max caps on Registration Fee; implemented below.
 * - Development/Construction Agreement cum GPA base value is Max( Land Value, Estimated Development/Construction Cost ).
 * - All percentages are applied on the chosen Base Value.
 */

// ---------- Types ----------

type AreaType = "Gram Panchayat" | "Other Areas";

type DeedCategory =
  | "Sale Deed"
  | "Gift Deed"
  | "Mortgage"
  | "Dev/Construction Agreement cum GPA";

interface CalcInputBase {
  baseValue: number; // computed per deed type
  area: AreaType;
}

interface CalcBreakup {
  stampDuty: number;
  transferDuty: number;
  registrationFee: number;
  total: number;
}

// Gift deed subtypes (relationship + area rules)
 type GiftSubtype =
  | "Gift to Family Member"
  | "Gift to Others"
  | "Gift to Government/Local Body";

// Mortgage subtypes
 type MortgageSubtype =
  | "Mortgage without Possession"
  | "Mortgage with Possession (Gram Panchayat)"
  | "Mortgage with Possession (Other Areas)"
  | "Deposit of Title Deeds";

// ---------- Utilities ----------

const inr = (n: number) =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(
    isFinite(n) ? n : 0
  );

const clampMin = (n: number, min?: number) => (min != null ? Math.max(n, min) : n);
const clampMax = (n: number, max?: number) => (max != null ? Math.min(n, max) : n);

// ---------- Core calculators ----------

function calcGiftDeed(base: CalcInputBase, subtype: GiftSubtype): CalcBreakup {
  const { baseValue, area } = base;

  // Defaults
  let stampPct = 0;
  let transferPct = 0;
  let regPct = 0.5; // most gifts use 0.5% reg fee with caps
  let regMin: number | undefined;
  let regMax: number | undefined;

  if (subtype === "Gift to Family Member") {
    stampPct = 2.0;
    // In GP there is no transfer duty, but registration includes an additional 1.5% component collected as fee.
    if (area === "Other Areas") {
      transferPct = 0.5; // 0.5% TD in municipalities/corporations
      regMin = 2000;
      regMax = 25000;
    } else {
      transferPct = 0; // GP: no TD
      // Registration Fee in GP = 0.5% (min/max) + 1.5% (local body component) => effectively +1.5% added to fee
      // Implement as base 0.5% with min/max then add 1.5% of base.
      regMin = 2000;
      regMax = 25000;
    }
  } else if (subtype === "Gift to Others") {
    stampPct = 5.0;
    if (area === "Other Areas") {
      transferPct = 1.5;
      regMin = 2000;
      regMax = 100000;
    } else {
      transferPct = 0; // GP
      regMin = 2000;
      regMax = 100000;
    }
  } else {
    // Gift to Government / Local Body
    stampPct = 0;
    transferPct = 0;
    regMin = 2000;
    regMax = 10000;
  }

  const stampDuty = (baseValue * stampPct) / 100;
  const transferDuty = (baseValue * transferPct) / 100;

  // Base 0.5% component for all gift subtypes (subject to caps)
  let registrationFeeCore = (baseValue * regPct) / 100;
  registrationFeeCore = clampMax(clampMin(registrationFeeCore, regMin), regMax);

  // Additional 1.5% fee collected as part of registration in Gram Panchayat cases (where transfer duty is 0)
  let regExtra = 0;
  if (area === "Gram Panchayat") {
    if (subtype === "Gift to Family Member" || subtype === "Gift to Others") {
      regExtra = (baseValue * 1.5) / 100; // mirrors local body TD but collected within RF
    }
  }

  const registrationFee = registrationFeeCore + regExtra;
  const total = stampDuty + transferDuty + registrationFee;
  return { stampDuty, transferDuty, registrationFee, total };
}

function calcMortgage(base: CalcInputBase, subtype: MortgageSubtype): CalcBreakup {
  const { baseValue } = base;
  let stampPct = 0;
  let transferPct = 0;
  let regPct = 0;
  let regMin: number | undefined;
  let regMax: number | undefined;

  switch (subtype) {
    case "Mortgage without Possession":
      stampPct = 0.5;
      regPct = 0.1; // RF 0.1%
      break;
    case "Mortgage with Possession (Gram Panchayat)":
      stampPct = 2.0;
      transferPct = 0; // GP: no TD
      regPct = 1.6; // RF 1.6%
      break;
    case "Mortgage with Possession (Other Areas)":
      stampPct = 2.0;
      transferPct = 1.5;
      regPct = 0.1; // RF 0.1%
      break;
    case "Deposit of Title Deeds":
      stampPct = 0.5; // subject to a max often ₹50,000 (not enforced here to keep UI simple)
      regPct = 0.1; // subject to a max often ₹10,000 (not enforced here)
      regMax = undefined;
      break;
  }

  const stampDuty = (baseValue * stampPct) / 100;
  const transferDuty = (baseValue * transferPct) / 100;
  let registrationFee = (baseValue * regPct) / 100;
  registrationFee = clampMax(clampMin(registrationFee, regMin), regMax);
  const total = stampDuty + transferDuty + registrationFee;
  return { stampDuty, transferDuty, registrationFee, total };
}

function calcDevGPA(base: CalcInputBase): CalcBreakup {
  const { baseValue } = base; // baseValue is Max(landValue, estCost)
  const stampPct = 1.0; // not adjustable
  const transferPct = 0.0;
  const regPct = 0.5; // min 5,000; max 1,00,000
  let regFee = (baseValue * regPct) / 100;
  regFee = clampMax(clampMin(regFee, 5000), 100000);
  const stampDuty = (baseValue * stampPct) / 100;
  const transferDuty = 0;
  const total = stampDuty + transferDuty + regFee;
  return { stampDuty, transferDuty, registrationFee: regFee, total };
}

// ---------- Component ----------

export default function Page() {
  const [area, setArea] = useState<AreaType>("Other Areas");
  const [category, setCategory] = useState<DeedCategory>("Gift Deed");

  // Base inputs
  const [propertyValue, setPropertyValue] = useState<number | "">(""); // generic base for most deeds

  // Gift
  const [giftSubtype, setGiftSubtype] = useState<GiftSubtype>("Gift to Family Member");

  // Mortgage
  const [mortgageSubtype, setMortgageSubtype] = useState<MortgageSubtype>(
    "Mortgage without Possession"
  );

  // Dev/Construction Agreement cum GPA inputs
  const [landValue, setLandValue] = useState<number | "">("");
  const [estimatedCost, setEstimatedCost] = useState<number | "">("");

  const baseForCategory = useMemo(() => {
    if (category === "Dev/Construction Agreement cum GPA") {
      const land = typeof landValue === "number" ? landValue : 0;
      const est = typeof estimatedCost === "number" ? estimatedCost : 0;
      return Math.max(land, est);
    }
    return typeof propertyValue === "number" ? propertyValue : 0;
  }, [category, propertyValue, landValue, estimatedCost]);

  const breakup = useMemo<CalcBreakup>(() => {
    const base: CalcInputBase = { baseValue: baseForCategory, area };
    switch (category) {
      case "Gift Deed":
        return calcGiftDeed(base, giftSubtype);
      case "Mortgage":
        return calcMortgage(base, mortgageSubtype);
      case "Dev/Construction Agreement cum GPA":
        return calcDevGPA(base);
      default:
        // Fallback simple sale deed (for completeness if toggled later): 4% stamp, 0.5% reg, TD: 1.5% in Other Areas / 0% in GP
        const stamp = (base.baseValue * 4) / 100;
        const td = area === "Other Areas" ? (base.baseValue * 1.5) / 100 : 0;
        const rf = (base.baseValue * (area === "Other Areas" ? 0.5 : 2.0)) / 100; // GP commonly collected as 2%
        return { stampDuty: stamp, transferDuty: td, registrationFee: rf, total: stamp + td + rf };
    }
  }, [area, baseForCategory, category, giftSubtype, mortgageSubtype]);

  return (
    <div className="mx-auto max-w-3xl p-6 space-y-6">
      <header className="space-y-1">
        <h1 className="text-2xl md:text-3xl font-bold">Property Registration Costs Calculator (Telangana)</h1>
        <p className="text-sm text-gray-600">Now supports Gift Deeds, Mortgage types, and Development/Construction Agreement cum GPA.</p>
      </header>

      {/* Global Controls */}
      <section className="grid md:grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="text-sm font-medium">Area</label>
          <select
            className="w-full rounded-xl border p-2"
            value={area}
            onChange={(e) => setArea(e.target.value as AreaType)}
          >
            <option>Other Areas</option>
            <option>Gram Panchayat</option>
          </select>
          <p className="text-xs text-gray-500">Some charges differ between Gram Panchayat and Municipal/Corporation areas.</p>
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium">Deed Category</label>
          <select
            className="w-full rounded-xl border p-2"
            value={category}
            onChange={(e) => setCategory(e.target.value as DeedCategory)}
          >
            <option>Gift Deed</option>
            <option>Mortgage</option>
            <option>Dev/Construction Agreement cum GPA</option>
          </select>
        </div>
      </section>

      {/* Category-specific Inputs */}
      {category === "Gift Deed" && (
        <section className="grid md:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-sm font-medium">Gift Subtype</label>
            <select
              className="w-full rounded-xl border p-2"
              value={giftSubtype}
              onChange={(e) => setGiftSubtype(e.target.value as GiftSubtype)}
            >
              <option>Gift to Family Member</option>
              <option>Gift to Others</option>
              <option>Gift to Government/Local Body</option>
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium">Property Value (₹)</label>
            <input
              type="number"
              className="w-full rounded-xl border p-2"
              placeholder="e.g., 5000000"
              value={propertyValue}
              onChange={(e) => setPropertyValue(e.target.value === "" ? "" : Number(e.target.value))}
              min={0}
            />
          </div>
        </section>
      )}

      {category === "Mortgage" && (
        <section className="grid md:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-sm font-medium">Mortgage Subtype</label>
            <select
              className="w-full rounded-xl border p-2"
              value={mortgageSubtype}
              onChange={(e) => setMortgageSubtype(e.target.value as MortgageSubtype)}
            >
              <option>Mortgage without Possession</option>
              <option>Mortgage with Possession (Gram Panchayat)</option>
              <option>Mortgage with Possession (Other Areas)</option>
              <option>Deposit of Title Deeds</option>
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium">Mortgage Amount / Secured Sum (₹)</label>
            <input
              type="number"
              className="w-full rounded-xl border p-2"
              placeholder="e.g., 3000000"
              value={propertyValue}
              onChange={(e) => setPropertyValue(e.target.value === "" ? "" : Number(e.target.value))}
              min={0}
            />
          </div>
        </section>
      )}

      {category === "Dev/Construction Agreement cum GPA" && (
        <section className="grid md:grid-cols-3 gap-4">
          <div className="space-y-1">
            <label className="text-sm font-medium">Land Value (₹)</label>
            <input
              type="number"
              className="w-full rounded-xl border p-2"
              placeholder="e.g., 8000000"
              value={landValue}
              onChange={(e) => setLandValue(e.target.value === "" ? "" : Number(e.target.value))}
              min={0}
            />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium">Estimated Construction/Development Cost (₹)</label>
            <input
              type="number"
              className="w-full rounded-xl border p-2"
              placeholder="e.g., 12000000"
              value={estimatedCost}
              onChange={(e) => setEstimatedCost(e.target.value === "" ? "" : Number(e.target.value))}
              min={0}
            />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium">Base Consideration Used</label>
            <input
              className="w-full rounded-xl border p-2 bg-gray-50"
              value={inr(baseForCategory)}
              readOnly
            />
            <p className="text-xs text-gray-500">Max( Land Value, Estimated Cost )</p>
          </div>
        </section>
      )}

      {/* Results */}
      <section className="rounded-2xl border p-4 shadow-sm bg-white">
        <h2 className="text-lg font-semibold mb-3">Breakup</h2>
        <div className="grid sm:grid-cols-2 gap-3">
          <div className="rounded-xl bg-gray-50 p-3">
            <div className="text-sm text-gray-600">Stamp Duty</div>
            <div className="text-xl font-semibold">{inr(breakup.stampDuty)}</div>
          </div>
          <div className="rounded-xl bg-gray-50 p-3">
            <div className="text-sm text-gray-600">Transfer Duty</div>
            <div className="text-xl font-semibold">{inr(breakup.transferDuty)}</div>
          </div>
          <div className="rounded-xl bg-gray-50 p-3">
            <div className="text-sm text-gray-600">Registration Fee</div>
            <div className="text-xl font-semibold">{inr(breakup.registrationFee)}</div>
          </div>
          <div className="rounded-xl bg-gray-100 p-3 border">
            <div className="text-sm text-gray-700">Total Payable</div>
            <div className="text-2xl font-bold">{inr(breakup.total)}</div>
          </div>
        </div>
        <p className="mt-3 text-xs text-gray-500 leading-relaxed">
          This tool provides an estimate based on publicly available Ready Reckoner guidance. Final amounts at the Sub-Registrar may include user charges, scanning fees, and other incidentals not calculated here.
        </p>
      </section>

      {/* Hints */}
      <section className="text-xs text-gray-500 space-y-1">
        <p>Tip: In Gram Panchayat areas, Transfer Duty is typically not levied; an equivalent 1.5% may be collected within the Registration Fee component for certain deeds.</p>
        <p>For Gift Deeds, caps on Registration Fee are applied after the base 0.5% is computed.</p>
        <p>For Mortgage calculations, consult your SRO if maximum caps apply (e.g., Deposit of Title Deeds).
        </p>
      </section>
    </div>
  );
}
