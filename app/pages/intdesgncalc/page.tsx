"use client";

import React, { useMemo, useState } from "react";

// Interior Design Calculator (Hyderabad) - single-file React (page.tsx)
// Cost assumptions & sources: blended Hyderabad market ranges (basic / mid / premium)

type Quality = "Basic" | "Mid" | "Premium";

const QS: Record<Quality, { perSqft: number }> = {
  Basic: { perSqft: 900 }, // blended baseline (₹800-1200)
  Mid: { perSqft: 1800 }, // blended baseline (₹1500-2500)
  Premium: { perSqft: 3500 }, // ₹3000+
};

// Component estimates (per sqft or fixed ranges) — Hyderabad market
const COMPONENT = {
  modularKitchenPerSqft: { low: 1200, high: 3500 },
  falseCeilingPerSqft: { low: 80, high: 140 },
  paintingPerSqft: { low: 8, high: 40 },
  flooringPerSqft: { low: 70, high: 250 },
  wardrobePerSqft: { low: 350, high: 1500 },
};

const formatINR = (n: number) =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(n);

export default function Page() {
  const [areaSqft, setAreaSqft] = useState<number | "">(1200);
  const [quality, setQuality] = useState<Quality>("Mid");
  const [includeKitchen, setIncludeKitchen] = useState(true);
  const [kitchenSqft, setKitchenSqft] = useState<number | "">(120);
  const [includeFalseCeiling, setIncludeFalseCeiling] = useState(true);
  const [includePainting, setIncludePainting] = useState(true);
  const [includeFlooring, setIncludeFlooring] = useState(true);
  const [includeWardrobe, setIncludeWardrobe] = useState(true);
  const [designerFeePct, setDesignerFeePct] = useState<number>(8); // 5-15%
  const [contingencyPct, setContingencyPct] = useState<number>(8);

  // Helpers to pick component rates based on quality
  const pickRate = (low: number, high: number, q: Quality) => {
    if (q === "Basic") return low;
    if (q === "Mid") return Math.round((low + high) / 2);
    return high;
  };

  const totals = useMemo(() => {
    const area = typeof areaSqft === "number" ? areaSqft : 0;
    const kitchenArea = typeof kitchenSqft === "number" ? kitchenSqft : 0;

    // Base interior cost as per quality per sqft
    const basePerSqft = QS[quality].perSqft;
    const baseInterior = basePerSqft * area;

    // Modular kitchen
    const kitchenRate = pickRate(COMPONENT.modularKitchenPerSqft.low, COMPONENT.modularKitchenPerSqft.high, quality);
    const kitchenCost = includeKitchen ? kitchenRate * kitchenArea : 0;

    // False ceiling (applied to living + bedroom area approximation) - here use full area as approximation
    const fcRate = pickRate(COMPONENT.falseCeilingPerSqft.low, COMPONENT.falseCeilingPerSqft.high, quality);
    const falseCeilingCost = includeFalseCeiling ? fcRate * area : 0;

    // Painting - per sqft
    const paintRate = pickRate(COMPONENT.paintingPerSqft.low, COMPONENT.paintingPerSqft.high, quality);
    const paintingCost = includePainting ? paintRate * area : 0;

    // Flooring - per sqft (replacement/upgrade)
    const flooringRate = pickRate(COMPONENT.flooringPerSqft.low, COMPONENT.flooringPerSqft.high, quality);
    const flooringCost = includeFlooring ? flooringRate * area : 0;

    // Wardrobe cost (per sqft of wardrobe run). We'll approximate wardrobe run = 15% of area
    const wardrobeRate = pickRate(COMPONENT.wardrobePerSqft.low, COMPONENT.wardrobePerSqft.high, quality);
    const wardrobeAreaApprox = area * 0.15;
    const wardrobeCost = includeWardrobe ? wardrobeRate * wardrobeAreaApprox : 0;

    // Subtotal
    const subtotal = baseInterior + kitchenCost + falseCeilingCost + paintingCost + flooringCost + wardrobeCost;

    // Designer fee and contingency
    const designerFee = (designerFeePct / 100) * subtotal;
    const contingency = (contingencyPct / 100) * subtotal;

    const total = subtotal + designerFee + contingency;

    return {
      area,
      baseInterior,
      kitchenCost,
      falseCeilingCost,
      paintingCost,
      flooringCost,
      wardrobeCost,
      subtotal,
      designerFee,
      contingency,
      total,
    };
  }, [areaSqft, kitchenSqft, quality, includeKitchen, includeFalseCeiling, includePainting, includeFlooring, includeWardrobe, designerFeePct, contingencyPct]);

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">Interior Design Cost Calculator — Hyderabad (Estimate)</h1>
      <p className="text-sm text-gray-600">Blended Hyderabad market rates used; this gives an estimate to plan your budget.</p>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm">Home Area (sq ft)</label>
          <input className="w-full p-2 border rounded" type="number" min={100} value={areaSqft} onChange={(e) => setAreaSqft(e.target.value === "" ? "" : Number(e.target.value))} />
        </div>

        <div>
          <label className="block text-sm">Quality Level</label>
          <select className="w-full p-2 border rounded" value={quality} onChange={(e) => setQuality(e.target.value as Quality)}>
            <option>Basic</option>
            <option>Mid</option>
            <option>Premium</option>
          </select>
        </div>

        <div>
          <label className="block text-sm">Include Modular Kitchen?</label>
          <div className="flex items-center gap-2 mt-1">
            <input type="checkbox" checked={includeKitchen} onChange={(e) => setIncludeKitchen(e.target.checked)} />
            <label className="text-sm">Yes</label>
          </div>
        </div>

        <div>
          <label className="block text-sm">Kitchen Area (sq ft)</label>
          <input className="w-full p-2 border rounded" type="number" min={0} value={kitchenSqft} onChange={(e) => setKitchenSqft(e.target.value === "" ? "" : Number(e.target.value))} />
        </div>

        <div>
          <label className="block text-sm">Include False Ceiling?</label>
          <input type="checkbox" checked={includeFalseCeiling} onChange={(e) => setIncludeFalseCeiling(e.target.checked)} />
        </div>

        <div>
          <label className="block text-sm">Include Painting?</label>
          <input type="checkbox" checked={includePainting} onChange={(e) => setIncludePainting(e.target.checked)} />
        </div>

        <div>
          <label className="block text-sm">Include Flooring?</label>
          <input type="checkbox" checked={includeFlooring} onChange={(e) => setIncludeFlooring(e.target.checked)} />
        </div>

        <div>
          <label className="block text-sm">Include Wardrobes?</label>
          <input type="checkbox" checked={includeWardrobe} onChange={(e) => setIncludeWardrobe(e.target.checked)} />
        </div>

        <div>
          <label className="block text-sm">Designer Fee % (typical 5-15%)</label>
          <input className="w-full p-2 border rounded" type="number" min={0} max={30} value={designerFeePct} onChange={(e) => setDesignerFeePct(Number(e.target.value))} />
        </div>

        <div>
          <label className="block text-sm">Contingency %</label>
          <input className="w-full p-2 border rounded" type="number" min={0} max={30} value={contingencyPct} onChange={(e) => setContingencyPct(Number(e.target.value))} />
        </div>
      </div>

      <section className="rounded-lg border p-4 bg-white">
        <h2 className="text-lg font-semibold mb-3">Estimate Breakup</h2>
        <div className="grid grid-cols-2 gap-3">
          <div className="p-3 bg-gray-50 rounded">
            <div className="text-sm text-gray-600">Base Interior ({quality})</div>
            <div className="text-xl font-semibold">{formatINR(totals.baseInterior)}</div>
          </div>

          <div className="p-3 bg-gray-50 rounded">
            <div className="text-sm text-gray-600">Modular Kitchen</div>
            <div className="text-xl font-semibold">{formatINR(totals.kitchenCost)}</div>
            <div className="text-xs text-gray-500">(rate used: {formatINR(pickRate(COMPONENT.modularKitchenPerSqft.low, COMPONENT.modularKitchenPerSqft.high, quality))}/sqft)</div>
          </div>

          <div className="p-3 bg-gray-50 rounded">
            <div className="text-sm text-gray-600">False Ceiling</div>
            <div className="text-xl font-semibold">{formatINR(totals.falseCeilingCost)}</div>
          </div>

          <div className="p-3 bg-gray-50 rounded">
            <div className="text-sm text-gray-600">Painting</div>
            <div className="text-xl font-semibold">{formatINR(totals.paintingCost)}</div>
          </div>

          <div className="p-3 bg-gray-50 rounded">
            <div className="text-sm text-gray-600">Flooring</div>
            <div className="text-xl font-semibold">{formatINR(totals.flooringCost)}</div>
          </div>

          <div className="p-3 bg-gray-50 rounded">
            <div className="text-sm text-gray-600">Wardrobes</div>
            <div className="text-xl font-semibold">{formatINR(totals.wardrobeCost)}</div>
          </div>

          <div className="p-3 bg-gray-100 rounded col-span-2">
            <div className="text-sm">Subtotal</div>
            <div className="text-2xl font-bold">{formatINR(totals.subtotal)}</div>
          </div>

          <div className="p-3 bg-gray-50 rounded">
            <div className="text-sm">Designer Fee ({designerFeePct}%)</div>
            <div className="text-xl font-semibold">{formatINR(totals.designerFee)}</div>
          </div>

          <div className="p-3 bg-gray-50 rounded">
            <div className="text-sm">Contingency ({contingencyPct}%)</div>
            <div className="text-xl font-semibold">{formatINR(totals.contingency)}</div>
          </div>

          <div className="p-3 bg-indigo-50 rounded col-span-2">
            <div className="text-sm">Estimated Total</div>
            <div className="text-3xl font-bold">{formatINR(totals.total)}</div>
          </div>
        </div>

        <p className="mt-3 text-xs text-gray-500">Notes: This calculator blends market ranges specific to Hyderabad (sources: local firms and marketplaces). It is an estimate — request itemised quotes from designers/contractors for firm pricing.</p>
      </section>

      <section className="text-xs text-gray-600 space-y-1">
        <div>Sources used to build rates: Combinedesign, Livspace, Godrej Properties, NoBroker, HomeGlanza (Hyderabad market pages).</div>
        <div className="text-red-500">Always confirm with vendors — finishes, brand choices and electrical/plumbing revisions change costs significantly.</div>
      </section>
    </div>
  );
}
