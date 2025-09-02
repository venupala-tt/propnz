"use client";

import React, { useMemo, useState } from "react";

type AreaType = "Gram Panchayat" | "Other Areas";
type DeedType = "Sale Deed" | "Gift Deed" | "Mortgage" | "Dev/Construction GPA";

const deedOptions: DeedType[] = ["Sale Deed", "Gift Deed", "Mortgage", "Dev/Construction GPA"];
const giftSubtypes = ["Family Member", "Non-Family", "Government"] as const;
const mortgageSubtypes = ["Without Possession", "With Possession (GP)", "With Possession (Other Areas)"] as const;

const formatINR = (n: number) =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(n);

export default function Page() {
  const [area, setArea] = useState<AreaType>("Other Areas");
  const [deed, setDeed] = useState<DeedType>("Sale Deed");
  const [giftSubtype, setGiftSubtype] = useState<typeof giftSubtypes[number]>("Family Member");
  const [mortgageSubtype, setMortgageSubtype] = useState<typeof mortgageSubtypes[number]>(
    "Without Possession"
  );
  const [propertyValue, setPropertyValue] = useState<number | "">("");
  const [landValue, setLandValue] = useState<number | "">("");
  const [constructionCost, setConstructionCost] = useState<number | "">("");

  const baseValue = useMemo(() => {
    if (deed === "Dev/Construction GPA") {
      const lv = typeof landValue === "number" ? landValue : 0;
      const cc = typeof constructionCost === "number" ? constructionCost : 0;
      return Math.max(lv, cc);
    }
    return typeof propertyValue === "number" ? propertyValue : 0;
  }, [deed, propertyValue, landValue, constructionCost]);

  const breakdown = useMemo(() => {
    let stamp = 0, transfer = 0, regFee = 0;

    if (deed === "Sale Deed") {
      stamp = 5.5;
      transfer = area === "Other Areas" ? 1.5 : 0;
      regFee = area === "Other Areas" ? 0.5 : 2.0;
    } else if (deed === "Dev/Construction GPA") {
      stamp = 1.0;
      transfer = 0;
      regFee = 0.5;
    } else if (deed === "Gift Deed") {
      if (giftSubtype === "Family Member") stamp = 2.0;
      else if (giftSubtype === "Non-Family") stamp = 5.0;
      else stamp = 0;
      transfer = giftSubtype === "Family Member" ? (area === "Other Areas" ? 0.5 : 0) :
                 giftSubtype === "Non-Family" ? (area === "Other Areas" ? 1.5 : 0) : 0;
      regFee = 0.5;
    } else if (deed === "Mortgage") {
      if (mortgageSubtype === "Without Possession") {
        stamp = 0.5; transfer = 0; regFee = 0.1;
      } else if (mortgageSubtype === "With Possession (GP)") {
        stamp = 2.0; transfer = 0; regFee = 1.6;
      } else {
        stamp = 2.0; transfer = 1.5; regFee = 0.1;
      }
    }

    const sd = (baseValue * stamp) / 100;
    const td = (baseValue * transfer) / 100;

    let rf = (baseValue * regFee) / 100;
    // Apply min/max caps
    if (deed === "Dev/Construction GPA") {
      rf = Math.min(Math.max(rf, 5000), 100000);
    } else if (deed === "Gift Deed") {
      if (giftSubtype === "Family Member") rf = Math.min(Math.max(rf, 2000), 25000);
      else if (giftSubtype === "Non-Family") rf = Math.min(Math.max(rf, 2000), 100000);
      else rf = Math.min(Math.max(rf, 2000), 10000);
      // Extra 0.5% in GP
      if (area === "Gram Panchayat" && (giftSubtype === "Family Member" || giftSubtype === "Non-Family")) {
        rf += (baseValue * 0.5) / 100;
      }
    }

    const total = sd + td + rf;
    return { stampDuty: sd, transferDuty: td, registrationFee: rf, total };
  }, [deed, area, giftSubtype, mortgageSubtype, baseValue]);

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <header><h1 className="text-3xl font-bold">Telangana Property Registration Cost Calculator</h1></header>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label>Area</label>
          <select value={area} onChange={(e) => setArea(e.target.value as AreaType)}>
            <option>Gram Panchayat</option>
            <option>Other Areas</option>
          </select>
        </div>
        <div>
          <label>Deed Type</label>
          <select value={deed} onChange={(e) => setDeed(e.target.value as DeedType)}>
            {deedOptions.map((d) => <option key={d}>{d}</option>)}
          </select>
        </div>
      </div>

      {deed === "Gift Deed" && (
        <div>
          <label>Gift To</label>
          <select value={giftSubtype} onChange={(e) => setGiftSubtype(e.target.value as any)}>
            {giftSubtypes.map((g) => <option key={g}>{g}</option>)}
          </select>
        </div>
      )}

      {deed === "Mortgage" && (
        <div>
          <label>Mortgage Type</label>
          <select value={mortgageSubtype} onChange={(e) => setMortgageSubtype(e.target.value as any)}>
            {mortgageSubtypes.map((m) => <option key={m}>{m}</option>)}
          </select>
        </div>
      )}

      {deed === "Dev/Construction GPA" ? (
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label>Land Value (₹)</label>
            <input type="number" value={landValue} onChange={(e) => setLandValue(e.target.value === "" ? "" : Number(e.target.value))} />
          </div>
          <div>
            <label>Construction Cost (₹)</label>
            <input type="number" value={constructionCost} onChange={(e) => setConstructionCost(e.target.value === "" ? "" : Number(e.target.value))} />
          </div>
        </div>
      ) : (
        <div>
          <label>Property Value (₹)</label>
          <input type="number" value={propertyValue} onChange={(e) => setPropertyValue(e.target.value === "" ? "" : Number(e.target.value))} />
        </div>
      )}

      <div className="grid grid-cols-2 gap-4 bg-gray-100 p-4 rounded">
        <div>
          <div className="text-sm">Stamp Duty</div>
          <div className="text-xl font-semibold">{formatINR(breakdown.stampDuty)}</div>
        </div>
        <div>
          <div className="text-sm">Transfer Duty</div>
          <div className="text-xl font-semibold">{formatINR(breakdown.transferDuty)}</div>
        </div>
        <div>
          <div className="text-sm">Registration Fee</div>
          <div className="text-xl font-semibold">{formatINR(breakdown.registrationFee)}</div>
        </div>
        <div className="bg-gray-200 p-2 rounded">
          <div className="text-sm">Total Payable</div>
          <div className="text-2xl font-bold">{formatINR(breakdown.total)}</div>
        </div>
      </div>

      <p className="text-xs text-gray-600">
        Computation based on Telangana Ready Reckoner data. Final amounts may include user charges or other fees not captured here.
      </p>
    </div>
  );
}
