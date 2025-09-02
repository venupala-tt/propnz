import React, { useState } from "react";
import Link from "next/link";

export default function InteriorDesignCalculator() {
  const [area, setArea] = useState(1000);
  const [quality, setQuality] = useState("Mid");
  const [modularKitchen, setModularKitchen] = useState(true);
  const [falseCeiling, setFalseCeiling] = useState(true);
  const [painting, setPainting] = useState(true);
  const [flooring, setFlooring] = useState(false);
  const [wardrobes, setWardrobes] = useState(true);

  const qualityRates: any = {
    Basic: 1200,
    Mid: 1800,
    Premium: 2500,
  };

  const componentCosts: any = {
    modularKitchen: 200000,
    falseCeiling: 150 * area,
    painting: 40 * area,
    flooring: 200 * area,
    wardrobes: 1000 * (area / 10),
  };

  const baseCost = area * qualityRates[quality];
  let addOnCost = 0;
  if (modularKitchen) addOnCost += componentCosts.modularKitchen;
  if (falseCeiling) addOnCost += componentCosts.falseCeiling;
  if (painting) addOnCost += componentCosts.painting;
  if (flooring) addOnCost += componentCosts.flooring;
  if (wardrobes) addOnCost += componentCosts.wardrobes;

  const totalCost = baseCost + addOnCost;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Interior Design Cost Calculator - Hyderabad</h1>
        <Link href="../pages/book-an-expert" className="text-blue-600 font-semibold hover:underline">
          Book Our Expert
        </Link>
      </div>

      <div className="grid gap-4">
        <label>
          Area (sqft):
          <input
            type="number"
            value={area}
            onChange={(e) => setArea(Number(e.target.value))}
            className="ml-2 border rounded p-1"
          />
        </label>

        <label>
          Quality:
          <select
            value={quality}
            onChange={(e) => setQuality(e.target.value)}
            className="ml-2 border rounded p-1"
          >
            <option value="Basic">Basic</option>
            <option value="Mid">Mid</option>
            <option value="Premium">Premium</option>
          </select>
        </label>

        <label>
          <input
            type="checkbox"
            checked={modularKitchen}
            onChange={(e) => setModularKitchen(e.target.checked)}
          />
          Modular Kitchen
        </label>
        <label>
          <input
            type="checkbox"
            checked={falseCeiling}
            onChange={(e) => setFalseCeiling(e.target.checked)}
          />
          False Ceiling
        </label>
        <label>
          <input
            type="checkbox"
            checked={painting}
            onChange={(e) => setPainting(e.target.checked)}
          />
          Painting
        </label>
        <label>
          <input
            type="checkbox"
            checked={flooring}
            onChange={(e) => setFlooring(e.target.checked)}
          />
          Flooring
        </label>
        <label>
          <input
            type="checkbox"
            checked={wardrobes}
            onChange={(e) => setWardrobes(e.target.checked)}
          />
          Wardrobes
        </label>
      </div>

      <div className="mt-6 p-4 border rounded bg-gray-50">
        <h2 className="text-xl font-semibold">Estimated Cost</h2>
        <p className="mt-2">Base Cost (per sqft × area): ₹{baseCost.toLocaleString()}</p>
        <p>Add-ons: ₹{addOnCost.toLocaleString()}</p>
        <p className="font-bold mt-2 text-lg">Total: ₹{totalCost.toLocaleString()}</p>
      </div>
    </div>
  );
}
