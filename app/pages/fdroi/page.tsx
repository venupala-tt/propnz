"use client";

import { useState } from "react";

export default function ROICalculatorPage() {
  const [plotSize, setPlotSize] = useState(600);
  const [costPerSqYd, setCostPerSqYd] = useState<number | "">("");
  const [sellingPriceSqFt, setSellingPriceSqFt] = useState<number | "">("");
  const [result, setResult] = useState<any>(null);

  const handleCalculate = () => {
    if (
      costPerSqYd === "" ||
      sellingPriceSqFt === "" ||
      isNaN(Number(costPerSqYd)) ||
      isNaN(Number(sellingPriceSqFt))
    ) {
      setResult(null);
      return;
    }

    const cpPerYd = Number(costPerSqYd);
    const sellPrice = Number(sellingPriceSqFt);

    const totalInvestment = plotSize * cpPerYd;

    const constructableSqYds = plotSize * 0.8;
    const constructableSqFtPerFloor = constructableSqYds * 9;
    let floors = 0;
    if (plotSize === 300) floors = 3;
    else if (plotSize === 600) floors = 4;
    else if (plotSize === 900) floors = 4;
    else if (plotSize === 1200) floors = 5;

    const totalSellableSqFt = constructableSqFtPerFloor * floors;
    const landOwnerSqFt = totalSellableSqFt * 0.4;
    const saleValue = landOwnerSqFt * sellPrice;
    const roiPercent = ((saleValue - totalInvestment) / totalInvestment) * 100;

    const investmentCrores = totalInvestment / 10000000;
    const saleValueCrores = saleValue / 10000000;

    setResult({
      totalInvestment,
      constructableSqFtPerFloor,
      floors,
      totalSellableSqFt,
      landOwnerSqFt,
      saleValue,
      roiPercent,
      investmentCrores,
      saleValueCrores,
    });
  };

  return (
    <section className="flex items-center justify-center min-h-screen bg-gradient-to-br from-yellow-100 via-white to-green-100 p-6">
      <div className="bg-white rounded-2xl shadow-lg p-8 max-w-3xl w-full">
        <h1 className="text-2xl font-bold text-center mb-4 text-gray-800">
          🏗️ ROI Calculator for Development of Flats
        </h1>
        <p className="text-lg font-semibold text-gray-700 mb-6 text-center">
          Approximate project duration: <b>2 years</b>
        </p>

        {/* Input Form */}
        <div className="space-y-4">
          <div>
            <label className="block font-medium text-gray-700 mb-1">Plot Size</label>
            <select
              value={plotSize}
              onChange={(e) => setPlotSize(Number(e.target.value))}
              className="w-full border p-2 rounded"
            >
              <option value={300}>300 Sq.Yards</option>
              <option value={600}>600 Sq.Yards</option>
              <option value={900}>900 Sq.Yards</option>
              <option value={1200}>1200 Sq.Yards</option>
            </select>
          </div>

          <div>
            <label className="block font-medium text-gray-700 mb-1">Cost per Sq.Yard (₹)</label>
            <input
              type="number"
              placeholder="Enter cost per sq.yd"
              value={costPerSqYd}
              onChange={(e) => setCostPerSqYd(e.target.value === "" ? "" : Number(e.target.value))}
              className="w-full border p-2 rounded"
            />
          </div>

          <div>
            <label className="block font-medium text-gray-700 mb-1">Selling Price per Sq.Ft (₹)</label>
            <input
              type="number"
              placeholder="Enter selling price per sq.ft"
              value={sellingPriceSqFt}
              onChange={(e) =>
                setSellingPriceSqFt(e.target.value === "" ? "" : Number(e.target.value))
              }
              className="w-full border p-2 rounded"
            />
          </div>

          <button
            onClick={handleCalculate}
            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
          >
            Calculate ROI
          </button>
        </div>

        {/* Results */}
        {result && (
          <div className="mt-8 bg-gray-50 p-6 rounded-lg shadow-inner">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              📊 Summary of ROI in Development of Flats Project
            </h2>
            <ul className="space-y-2 text-gray-700">
              <li>
                💰 Total Investment in Land:{" "}
                <b>
                  ₹ {result.totalInvestment.toLocaleString()} (
                  {result.investmentCrores.toFixed(2)} Cr)
                </b>
              </li>
              <li>
                🏢 Constructable Area per Floor:{" "}
                <b>{result.constructableSqFtPerFloor.toLocaleString()} sq.ft</b>
              </li>
              <li>🏗️ Total Floors Allowed: <b>{result.floors}</b></li>
              <li>
                📐 Total Sellable Area: <b>{result.totalSellableSqFt.toLocaleString()} sq.ft</b>
              </li>
              <li>
                🧑‍🤝‍🧑 Landowner Share (40%):{" "}
                <b>{result.landOwnerSqFt.toLocaleString()} sq.ft</b>
              </li>
              <li>
                💵 Sale Value of Landowner Flats:{" "}
                <b>
                  ₹ {result.saleValue.toLocaleString()} ({result.saleValueCrores.toFixed(2)} Cr)
                </b>
              </li>
              <li>📈 ROI: <b>{result.roiPercent.toFixed(2)}%</b></li>
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}
