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

    // 1) Land Investment (Owner)
    const totalInvestment = plotSize * cpPerYd;

    // 2) Constructable area (80% of plot) -> sq.ft
    const constructableSqYds = plotSize * 0.8;
    const constructableSqFtPerFloor = constructableSqYds * 9; // 1 sq.yd = 9 sq.ft

    // 3) Floors by plot size
    let floors = 0;
    if (plotSize === 300) floors = 3;
    else if (plotSize === 600) floors = 4;
    else if (plotSize === 900) floors = 4;
    else if (plotSize === 1200) floors = 5;

    // 4) Total constructed/sellable area
    const totalSellableSqFt = constructableSqFtPerFloor * floors;

    // Shares
    const landOwnerSqFt = totalSellableSqFt * 0.4; // 40% Owner
    const developerShareSqFt = totalSellableSqFt * 0.6; // 60% Developer

    // ✅ Number of flats as Landowner Share
    const landOwnerFlats = Math.floor(landOwnerSqFt / 1100);

    // 5) Owner sale value & ROI
    const ownerSaleValue = landOwnerSqFt * sellPrice;
    const ownerRoiPercent =
      ((ownerSaleValue - totalInvestment) / totalInvestment) * 100;

    // 6) Developer costs & ROI (assumptions provided)
    const constructionCost = totalSellableSqFt * 2000; // ₹2,000 / sq.ft
    const adminCost = constructionCost * 0.2; // +20% administrative
    const totalDevInvestment = constructionCost + adminCost;

    const developerSaleValue = developerShareSqFt * sellPrice; // revenue on 60% share
    const developerRoiPercent =
      ((developerSaleValue - totalDevInvestment) / totalDevInvestment) * 100;

    // Crores conversions
    const toCrores = (v: number) => v / 10000000;
    const investmentCrores = toCrores(totalInvestment);
    const ownerSaleValueCrores = toCrores(ownerSaleValue);

    const constructionCostCr = toCrores(constructionCost);
    const adminCostCr = toCrores(adminCost);
    const totalDevInvestmentCr = toCrores(totalDevInvestment);
    const developerSaleValueCr = toCrores(developerSaleValue);

    setResult({
      // owner
      totalInvestment,
      constructableSqFtPerFloor,
      floors,
      totalSellableSqFt,
      landOwnerSqFt,
      landOwnerFlats, // ✅ added
      ownerSaleValue,
      ownerRoiPercent,
      investmentCrores,
      ownerSaleValueCrores,
      // developer
      developerShareSqFt,
      constructionCost,
      adminCost,
      totalDevInvestment,
      developerSaleValue,
      developerRoiPercent,
      constructionCostCr,
      adminCostCr,
      totalDevInvestmentCr,
      developerSaleValueCr,
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

        {/* Inputs */}
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
            <label className="block font-medium text-gray-700 mb-1">
              Cost per Sq.Yard (₹)
            </label>
            <input
              type="number"
              placeholder="Enter cost per sq.yd"
              value={costPerSqYd}
              onChange={(e) =>
                setCostPerSqYd(e.target.value === "" ? "" : Number(e.target.value))
              }
              className="w-full border p-2 rounded"
            />
          </div>

          <div>
            <label className="block font-medium text-gray-700 mb-1">
              Selling Price per Sq.Ft (₹)
            </label>
            <input
              type="number"
              placeholder="Enter selling price of Flats per sq.ft (after 2 years of project completion)"
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
          <div className="mt-8 space-y-8">
            <div className="bg-gray-50 p-6 rounded-lg shadow-inner">
              <h2 className="text-xl font-bold text-gray-800 mb-4">
                📊 Summary of ROI in Development of Flats Project
              </h2>
              <ul className="space-y-2 text-gray-700">
                <li>
                  💰 Total Investment in Land (Owner):{" "}
                  <b>
                    ₹ {result.totalInvestment.toLocaleString()} ({result.investmentCrores.toFixed(2)} Cr)
                  </b>
                </li>
                <li>
                  📐 Constructable Area per Floor:{" "}
                  <b>{result.constructableSqFtPerFloor.toLocaleString()} sq.ft</b>
                </li>
                <li>🏢 Total Floors Allowed: <b>{result.floors}</b></li>
                <li>
                  📏 Total Constructed/Sellable Area:{" "}
                  <b>{result.totalSellableSqFt.toLocaleString()} sq.ft</b>
                </li>
                <li>
                  🧑‍🤝‍🧑 Landowner Share (40%):{" "}
                  <b>{result.landOwnerSqFt.toLocaleString()} sq.ft</b>
                </li>
                <li>
                  🏘️ Number of Flats as Landowner Share:{" "}
                  <b>{result.landOwnerFlats}</b> (each ~1100 sq.ft)
                </li>
                <li>
                  💵 Sale Value of Landowner Flats:{" "}
                  <b>
                    ₹ {result.ownerSaleValue.toLocaleString()} ({result.ownerSaleValueCrores.toFixed(2)} Cr)
                  </b>
                </li>
                <li>
                  📈 Owner ROI: <b>{result.ownerRoiPercent.toFixed(2)}%</b>
                </li>
              </ul>
            </div>

            <div className="bg-indigo-50 p-6 rounded-lg shadow-inner">
              <h2 className="text-xl font-bold text-indigo-900 mb-4">🏗️ Developer Economics</h2>
              <ul className="space-y-2 text-indigo-900/90">
                <li>
                  📐 Developer Share of Area (60%):{" "}
                  <b>{result.developerShareSqFt.toLocaleString()} sq.ft</b>
                </li>
                <li>
                  🧱 Construction Cost @ ₹2,000/sq.ft (on total constructed area):{" "}
                  <b>
                    ₹ {result.constructionCost.toLocaleString()} ({result.constructionCostCr.toFixed(2)} Cr)
                  </b>
                </li>
                <li>
                  📝 Administrative Expenses @ 20% of construction:{" "}
                  <b>
                    ₹ {result.adminCost.toLocaleString()} ({result.adminCostCr.toFixed(2)} Cr)
                  </b>
                </li>
                <li>
                  💰 Total Developer Investment (Construction + Admin):{" "}
                  <b>
                    ₹ {result.totalDevInvestment.toLocaleString()} ({result.totalDevInvestmentCr.toFixed(2)} Cr)
                  </b>
                </li>
                <li>
                  🏘️ Sale Value of Developer Flats (60%):{" "}
                  <b>
                    ₹ {result.developerSaleValue.toLocaleString()} ({result.developerSaleValueCr.toFixed(2)} Cr)
                  </b>
                </li>
                <li>
                  📈 Developer ROI: <b>{result.developerRoiPercent.toFixed(2)}%</b>
                </li>
              </ul>
              <p className="text-xs text-indigo-900/70 mt-3">
                Note: In a typical JDA, the developer bears full construction & admin costs on the entire constructed
                area and receives revenue only on their share of flats.
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
