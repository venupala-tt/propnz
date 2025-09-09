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

    if (n <= 0) {
      setResult(null);
      return;
    }

    // Base investment per owner = (plot size / n) * cost per sq.yd
    const plotPerOwnerSqYd = plotSize / n;
    const baseInvestmentPerOwner = plotPerOwnerSqYd * cpPerYd;
    const baseInvestmentTotal = baseInvestmentPerOwner * n;

    // Interest per owner
    const interestPerOwner = baseInvestmentPerOwner * 0.08 * x;
    const interestTotal = interestPerOwner * n;

    // Total investment per owner and total
    const totalInvestmentWithInterestPerOwner = baseInvestmentPerOwner + interestPerOwner;
    const totalInvestmentWithInterest = baseInvestmentTotal + interestTotal;

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

    // Sale value per owner
    const saleValuePerOwner = perOwnerSqFt * sellPrice;
    const totalSaleValueOwners = saleValuePerOwner * n;

    // Profit/ROI logic
    const profitPerOwner = saleValuePerOwner - totalInvestmentWithInterestPerOwner;
    const profitTotalOwners = totalSaleValueOwners - totalInvestmentWithInterest;

    const roiAfterInterestPerOwner =
      totalInvestmentWithInterestPerOwner > 0
        ? (profitPerOwner / totalInvestmentWithInterestPerOwner) * 100
        : 0;

    const roiAfterInterestTotal =
      totalInvestmentWithInterest > 0 ? (profitTotalOwners / totalInvestmentWithInterest) * 100 : 0;

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

    // Prepare per-owner breakdown array
    const ownersBreakdown = Array.from({ length: n }, (_, idx) => ({
      owner: idx + 1,
      plotArea: plotPerOwnerSqYd,
      baseInvestment: baseInvestmentPerOwner,
      interest: interestPerOwner,
      totalInvestment: totalInvestmentWithInterestPerOwner,
      saleValue: saleValuePerOwner,
      profit: profitPerOwner,
      roi: roiAfterInterestPerOwner,
    }));

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
      profitPerOwner,
      profitTotalOwners,
      roiAfterInterestPerOwner,
      roiAfterInterestTotal,
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
      ownersBreakdown,
    });
  };

  return (
    <section className="flex items-center justify-center min-h-screen bg-gradient-to-br from-yellow-100 via-white to-green-100 p-6">
      <div className="bg-white rounded-2xl shadow-lg p-8 max-w-6xl w-full overflow-x-auto">
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

              {/* Per-Owner Breakdown Table */}
              <div className="mt-6 overflow-x-auto">
                <table className="min-w-full border text-sm">
                  <thead className="bg-gray-200">
                    <tr>
                      <th className="px-2 py-1 border">Landowner</th>
                      <th className="px-2 py-1 border">Plot Area (Sq.Yds)</th>
                      <th className="px-2 py-1 border">Base Investment (₹)</th>
                      <th className="px-2 py-1 border">Interest (₹)</th>
                      <th className="px-2 py-1 border">Total Investment (₹)</th>
                      <th className="px-2 py-1 border">Sale Value (₹)</th>
                      <th className="px-2 py-1 border">Profit (₹)</th>
                      <th className="px-2 py-1 border">ROI %</th>
                    </tr>
                  </thead>
                  <tbody>
                    {result.ownersBreakdown.map((o: any) => (
                      <tr key={o.owner}>
                        <td className="px-2 py-1 border text-center">Owner {o.owner}</td>
                        <td className="px-2 py-1 border text-right">{o.plotArea.toFixed(2)}</td>
                        <td className="px-2 py-1 border text-right">₹ {o.baseInvestment.toLocaleString()}</td>
                        <td className="px-2 py-1 border text-right">₹ {o.interest.toLocaleString()}</td>
                        <td className="px-2 py-1 border text-right">₹ {o.totalInvestment.toLocaleString()}</td>
                        <td className="px-2 py-1 border text-right">₹ {o.saleValue.toLocaleString()}</td>
                        <td className="px-2 py-1 border text-right">₹ {o.profit.toLocaleString()}</td>
                        <td className="px-2 py-1 border text-right">{o.roi.toFixed(2)}%</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Aggregate Calculations */}
              <ul className="space-y-2 text-gray-700 mt-6">
                <li>Base Investment by {result.n} Landowners: <b>₹ {result.baseInvestmentTotal.toLocaleString()} ({result.toCrores(result.baseInvestmentTotal).toFixed(2)} Cr)</b></li>
                <li>Total Interest ({result.x} years): <b>₹ {result.interestTotal.toLocaleString()} ({result.toCrores(result.interestTotal).toFixed(2)} Cr)</b></li>
                <li>Total Investment (Land + Interest): <b>₹ {result.totalInvestmentWithInterest.toLocaleString()} ({result.toCrores(result.totalInvestmentWithInterest).toFixed(2)} Cr)</b></li>
                <li>📐 Total Constructed/Sellable Area: <b>{result.totalSellableSqFt.toLocaleString()} sq.ft</b></li>
                <li>🧑‍🤝‍🧑 Landowner Share (40%): <b>{result.landOwnerSqFt.toLocaleString()} sq.ft</b></li>
                <li>🏘️ Total Number of Flats as Landowner Share: <b>{result.landOwnerFlatsTotal}</b></li>
                <li>💵 Total Sale Value of Landowner Flats: <b>₹ {result.totalSaleValueOwners.toLocaleString()} ({result.toCrores(result.totalSaleValueOwners).toFixed(2)} Cr)</b></li>
                <li>Total Profit for All Landowners: <b>₹ {result.profitTotalOwners.toLocaleString()} ({result.toCrores(result.profitTotalOwners).toFixed(2)} Cr)</b></li>
                <li>📊 Total Land Owner ROI (after interest): <b>{result.roiAfterInterestTotal.toFixed(2)}%</b></li>
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
