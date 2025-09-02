"use client";

import { useState } from "react";

export default function MultifamilyROICalculator() {
  const [purchasePrice, setPurchasePrice] = useState<number | "">("");
  const [units, setUnits] = useState<number | "">("");
  const [avgRent, setAvgRent] = useState<number | "">("");
  const [vacancyRate, setVacancyRate] = useState<number | "">("");
  const [operatingExpenseRate, setOperatingExpenseRate] = useState<number | "">("");
  const [loanAmount, setLoanAmount] = useState<number | "">("");

  const [result, setResult] = useState<any>(null);

  const handleCalculate = () => {
    if (
      purchasePrice === "" ||
      units === "" ||
      avgRent === "" ||
      vacancyRate === "" ||
      operatingExpenseRate === "" ||
      loanAmount === ""
    ) {
      setResult(null);
      return;
    }

    const price = Number(purchasePrice);
    const totalUnits = Number(units);
    const rent = Number(avgRent);
    const vacancy = Number(vacancyRate) / 100;
    const expensesRate = Number(operatingExpenseRate) / 100;
    const loan = Number(loanAmount);

    // Gross Potential Rent (GPR)
    const gpr = totalUnits * rent * 12;

    // Vacancy Loss
    const vacancyLoss = gpr * vacancy;

    // Effective Gross Income (EGI)
    const egi = gpr - vacancyLoss;

    // Operating Expenses
    const operatingExpenses = egi * expensesRate;

    // Net Operating Income (NOI)
    const noi = egi - operatingExpenses;

    // Cap Rate
    const capRate = noi / price;

    // ROI (Net Income / Initial Investment)
    const equityInvestment = price - loan;
    const roi = (noi / equityInvestment) * 100;

    setResult({
      gpr,
      vacancyLoss,
      egi,
      operatingExpenses,
      noi,
      capRate,
      roi,
    });
  };

  return (
    <section className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 p-6">
      <div className="bg-white rounded-2xl shadow-lg p-8 max-w-3xl w-full">
        <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">
          🏢 Multifamily Property ROI Calculator
        </h1>

        {/* Inputs */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <label className="block font-medium text-gray-700 mb-1">Purchase Price (₹)</label>
            <input
              type="number"
              value={purchasePrice}
              onChange={(e) => setPurchasePrice(e.target.value === "" ? "" : Number(e.target.value))}
              className="w-full border p-2 rounded"
            />
          </div>
          <div>
            <label className="block font-medium text-gray-700 mb-1">Units</label>
            <input
              type="number"
              value={units}
              onChange={(e) => setUnits(e.target.value === "" ? "" : Number(e.target.value))}
              className="w-full border p-2 rounded"
            />
          </div>
          <div>
            <label className="block font-medium text-gray-700 mb-1">Average Rent (₹ per month)</label>
            <input
              type="number"
              value={avgRent}
              onChange={(e) => setAvgRent(e.target.value === "" ? "" : Number(e.target.value))}
              className="w-full border p-2 rounded"
            />
          </div>
          <div>
            <label className="block font-medium text-gray-700 mb-1">Vacancy Rate (%)</label>
            <input
              type="number"
              value={vacancyRate}
              onChange={(e) => setVacancyRate(e.target.value === "" ? "" : Number(e.target.value))}
              className="w-full border p-2 rounded"
            />
          </div>
          <div>
            <label className="block font-medium text-gray-700 mb-1">Operating Expenses (% of EGI)</label>
            <input
              type="number"
              value={operatingExpenseRate}
              onChange={(e) =>
                setOperatingExpenseRate(e.target.value === "" ? "" : Number(e.target.value))
              }
              className="w-full border p-2 rounded"
            />
          </div>
          <div>
            <label className="block font-medium text-gray-700 mb-1">Loan Amount (₹)</label>
            <input
              type="number"
              value={loanAmount}
              onChange={(e) => setLoanAmount(e.target.value === "" ? "" : Number(e.target.value))}
              className="w-full border p-2 rounded"
            />
          </div>
        </div>

        <button
          onClick={handleCalculate}
          className="mt-6 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Calculate ROI
        </button>

        {/* Results */}
        {result && (
          <div className="mt-8 bg-gray-50 p-6 rounded-lg shadow-inner">
            <h2 className="text-xl font-bold text-gray-800 mb-4">📊 Results</h2>
            <ul className="space-y-2 text-gray-700">
              <li>🏠 Gross Potential Rent (GPR): <b>₹ {result.gpr.toLocaleString()}</b></li>
              <li>📉 Vacancy Loss: <b>₹ {result.vacancyLoss.toLocaleString()}</b></li>
              <li>💵 Effective Gross Income (EGI): <b>₹ {result.egi.toLocaleString()}</b></li>
              <li>⚙️ Operating Expenses: <b>₹ {result.operatingExpenses.toLocaleString()}</b></li>
              <li>📈 Net Operating Income (NOI): <b>₹ {result.noi.toLocaleString()}</b></li>
              <li>🏷️ Cap Rate: <b>{(result.capRate * 100).toFixed(2)}%</b></li>
              <li>💹 ROI (Cash-on-Cash): <b>{result.roi.toFixed(2)}%</b></li>
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}
