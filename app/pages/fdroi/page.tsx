"use client";

import { useState } from "react";

export default function ROICalculatorPage() {
  const [costPerSqYd, setCostPerSqYd] = useState<number | "">("");
  const [plotSize, setPlotSize] = useState(600);
  const [numLandowners, setNumLandowners] = useState<number | "">("");
  const [projectDuration, setProjectDuration] = useState<number | "">("");
  const [sellingPriceSqFt, setSellingPriceSqFt] = useState<number | "">("");
  const [result, setResult] = useState<any>(null);

  const handleCalculate = () => {
    if (
      costPerSqYd === "" ||
      sellingPriceSqFt === "" ||
      numLandowners === "" ||
      projectDuration === "" ||
      isNaN(Number(costPerSqYd)) ||
      isNaN(Number(sellingPriceSqFt)) ||
      isNaN(Number(numLandowners)) ||
      isNaN(Number(projectDuration))
    ) {
      setResult(null);
      return;
    }

    const cpPerYd = Number(costPerSqYd);
    const sellPrice = Number(sellingPriceSqFt);
    const n = Number(numLandowners);
    const x = Number(projectDuration);

    // Base investment and interest
    const baseInvestmentTotal = plotSize * cpPerYd;
    const baseInvestmentPerOwner = baseInvestmentTotal / n;

    const interestTotal = baseInvestmentTotal * 0.08 * x;
    const interestPerOwner = baseInvestmentPerOwner * 0.08 * x;

    const totalInvestmentWithInterest = baseInvestmentTotal + interestTotal;
    const totalInvestmentWithInterestPerOwner = baseInvestmentPerOwner + interestPerOwner;

    // Constructable area (80% of plot)
    const constructableSqYds = plotSize * 0.8;
    const constructableSqFtPerFloor = constructableSqYds * 9;

    // Floors by plot size
    let floors = 0;
    if (plotSize === 300) floors = 3;
    else if (plotSize === 600) floors = 4;
    else if (plotSize === 900) floors = 4;
    else if (plotSize === 1200) floors = 5;

    const totalSellableSqFt = constructableSqFtPerFloor * floors;

    // Shares
    const landOwnerSqFt = totalSellableSqFt * 0.4;
    const perOwnerSqFt = landOwnerSqFt / n;
    const perOwnerFlats = Math.floor(perOwnerSqFt / 1100);
    const perFlatPrice = 1100 * sellPrice;

    const landOwnerFlatsTotal = Math.floor(landOwnerSqFt / 1100);

    const saleValuePerOwner = perOwnerSqFt * sellPrice;
    const totalSaleValueOwners = landOwnerSqFt * sellPrice;

    const ownerRoiPercentPerOwner = ((saleValuePerOwner - totalInvestmentWithInterestPerOwner) / totalInvestmentWithInterestPerOwner) * 100;
    const ownerRoiPercentTotal = ((totalSaleValueOwners - totalInvestmentWithInterest) / totalInvestmentWithInterest) * 100;

    // Developer economics
    const developerShareSqFt = totalSellableSqFt * 0.6;
    const developerFlats = Math.floor(developerShareSqFt / 1100);
    const developerPerFlatPrice = perFlatPrice;

    const constructionCost = totalSellableSqFt * 2000;
    const adminCost = constructionCost * 0.2;
    const totalDevInvestment = constructionCost + adminCost;

    const developerSaleValue = developerShareSqFt * sellPrice;
    const developerRoiPercent = ((developerSaleValue - totalDevInvestment) / totalDevInvestment) * 100;

    const toCrores = (v: number) => v / 10000000;

    setResult({
      baseInvestmentTotal,
      baseInvestmentPerOwner,
      interestTotal,
      interestPerOwner,
      totalInvestmentWithInterest,
      totalInvestmentWithInterestPerOwner,
      constructableSqFtPerFloor,
      floors,
      totalSellableSqFt,
      landOwnerSqFt,
      perOwnerSqFt,
      perOwnerFlats,
      perFlatPrice,
      landOwnerFlatsTotal,
      saleValuePerOwner,
      totalSaleValueOwners,
      ownerRoiPercentPerOwner,
      ownerRoiPercentTotal,
      developerShareSqFt,
      developerFlats,
      developerPerFlatPrice,
      constructionCost,
      adminCost,
      totalDevInvestment,
      developerSaleValue,
      developerRoiPercent,
      n,
      x,
      sellPrice,
      toCrores,
    });
  };

  return (
    <section className="flex items-center justify-center min-h-screen bg-gradient-to-br from-yellow-100 via-white to-green-100 p-6">
      <div className="bg-white rounded-2xl shadow-lg p-8 max-w-4xl w-full">
        <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Development of Apartments - ROI/Profits Calculator
        </h1>

        {/* Inputs */}
        <div className="space-y-4">
          <div>
            <label className="block font-medium text-gray-700 mb-1">Land Cost per Sq.Yard (₹)</label>
            <input
              type="number"
              placeholder="Enter cost per sq.yd"
              value={costPerSqYd}
              onChange={(e) => setCostPerSqYd(e.target.value === "" ? "" : Number(e.target.value))}
              className="w-full border p-2 rounded"
            />
          </div>

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
            <label className="block font-medium text-gray-700 mb-1">No. of Landowners</label>
            <input
              type="number"
              placeholder="Enter number of landowners"
              value={numLandowners}
              onChange={(e) => setNumLandowners(e.target.value === "" ? "" : Number(e.target.value))}
              className="w-full border p-2 rounded"
            />
          </div>

          <div>
            <label className="block font-medium text-gray-700 mb-1">Project Duration (years)</label>
            <input
              type="number"
              placeholder="Enter project duration in years"
              value={projectDuration}
              onChange={(e) => setProjectDuration(e.target.value === "" ? "" : Number(e.target.value))}
              className="w-full border p-2 rounded"
            />
          </div>

          <div>
            <label className="block font-medium text-gray-700 mb-1">Selling Price After project completion (₹) per Sq.Ft</label>
            <input
              type="number"
              placeholder="Enter selling price per sq.ft"
              value={sellingPriceSqFt}
              onChange={(e) => setSellingPriceSqFt(e.target.value === "" ? "" : Number(e.target.value))}
              className="w-full border p-2 rounded"
            />
          </div>

          <button
            onClick={handleCalculate}
            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
          >
            Calculate Profits/ ROI
          </button>
        </div>

        {/* Results */}
        {result && (
          <div className="mt-8 space-y-8">
            <div className="bg-gray-50 p-6 rounded-lg shadow-inner">
              <h2 className="text-xl font-bold text-gray-800 mb-4">📈 Summary of ROI in Apartments Development Project</h2>

              {/* Display Inputs */}
              <ul className="space-y-2 text-gray-700">
                <li>Land Cost per Sq.Yard: <b>₹ {costPerSqYd}</b></li>
                <li>Plot Size: <b>{plotSize} Sq.Yards</b></li>
                <li>No. of Landowners: <b>{result.n}</b></li>
                <li>Project Duration: <b>{result.x} years</b></li>
                <li>Selling Price per Sq.Ft: <b>₹ {result.sellPrice}</b></li>
              </ul>

              {/* Calculations */}
              <ul className="space-y-2 text-gray-700 mt-4">
                <li>Base Investment by each Land Owner: <b>₹ {result.baseInvestmentPerOwner.toLocaleString()} ({result.toCrores(result.baseInvestmentPerOwner).toFixed(2)} Cr)</b></li>
                <li>Base Investment by {result.n} Landowners: <b>₹ {result.baseInvestmentTotal.toLocaleString()} ({result.toCrores(result.baseInvestmentTotal).toFixed(2)} Cr)</b></li>
                <li>➕ Interest @ 8% for {result.x} years: <b>₹ {result.interestTotal.toLocaleString()} ({result.toCrores(result.interestTotal).toFixed(2)} Cr)</b></li>
                <li>🔹 Total Investment (Land + Interest): <b>₹ {result.totalInvestmentWithInterest.toLocaleString()} ({result.toCrores(result.totalInvestmentWithInterest).toFixed(2)} Cr)</b></li>
                <li>🔹 Total Investment by Each Land Owner (Land + Interest): <b>₹ {result.totalInvestmentWithInterestPerOwner.toLocaleString()} ({result.toCrores(result.totalInvestmentWithInterestPerOwner).toFixed(2)} Cr)</b></li>
                <li>🏢 Constructable Area per Floor: <b>{result.constructableSqFtPerFloor.toLocaleString()} sq.ft</b></li>
                <li>🏗️ Total Floors Allowed: <b>{result.floors}</b></li>
                <li>📐 Total Constructed/Sellable Area: <b>{result.totalSellableSqFt.toLocaleString()} sq.ft</b></li>
                <li>🧑‍🤝‍🧑 Landowner Share (40%): <b>{result.landOwnerSqFt.toLocaleString()} sq.ft</b></li>
                <li>📐 Sq ft Area for each Landowner: <b>{result.perOwnerSqFt.toLocaleString()} sq.ft</b></li>
                <li>🏘️ No. of Flats for each Landowner (~1100 sq.ft each): <b>{result.perOwnerFlats}</b></li>
                <li>🏷️ Approx. Sale Price per Flat (~1100 sq.ft): <b>₹ {result.perFlatPrice.toLocaleString()}</b></li>
                <li>Sale Value of Each Landowner Flats: <b>₹ {result.saleValuePerOwner.toLocaleString()} ({result.toCrores(result.saleValuePerOwner).toFixed(2)} Cr)</b></li>
                <li>📊 Profit/ ROI (after interest): <b>{result.ownerRoiPercentPerOwner.toFixed(2)}%</b></li>
                <li>🏘️ Total Number of Flats as Landowner Share: <b>{result.landOwnerFlatsTotal}</b></li>
                <li>💵 Total Sale Value of Landowner Flats: <b>₹ {result.totalSaleValueOwners.toLocaleString()} ({result.toCrores(result.totalSaleValueOwners).toFixed(2)} Cr)</b></li>
                <li>📊 Total Land Owner ROI (after interest): <b>{result.ownerRoiPercentTotal.toFixed(2)}%</b></li>
              </ul>
            </div>

            {/* Developer Economics */}
            <div className="bg-indigo-50 p-6 rounded-lg shadow-inner">
              <h2 className="text-xl font-bold text-indigo-900 mb-4">🏗️ Developer Economics</h2>
              <ul className="space-y-2 text-indigo-900/90">
                <li>🧑‍💻 Developer Share of Area (60%): <b>{result.developerShareSqFt.toLocaleString()} sq.ft</b></li>
                <li>🏘️ Number of Flats as Developer Share: <b>{result.developerFlats}</b></li>
                <li>🏷️ Approx. Sale Price per Flat (~1100 sq.ft): <b>₹ {result.developerPerFlatPrice.toLocaleString()}</b></li>
                <li>🔨 Construction Cost @ ₹2,000/sq.ft: <b>₹ {result.constructionCost.toLocaleString()} ({result.toCrores(result.constructionCost).toFixed(2)} Cr)</b></li>
                <li>⚙️ Administrative Expenses @ 20%: <b>₹ {result.adminCost.toLocaleString()} ({result.toCrores(result.adminCost).toFixed(2)} Cr)</b></li>
                <li>💵 Total Developer Investment: <b>₹ {result.totalDevInvestment.toLocaleString()} ({result.toCrores(result.totalDevInvestment).toFixed(2)} Cr)</b></li>
                <li>🏢 Sale Value of Developer Flats: <b>₹ {result.developerSaleValue.toLocaleString()} ({result.toCrores(result.developerSaleValue).toFixed(2)} Cr)</b></li>
                <li>📈 Developer ROI: <b>{result.developerRoiPercent.toFixed(2)}%</b></li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
