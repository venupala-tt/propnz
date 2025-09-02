"use client";

import { useState } from "react";

export default function MultifamilyROICalculator() {
  const [purchasePrice, setPurchasePrice] = useState<number | "">("");
  const [units, setUnits] = useState<number | "">("");
  const [avgRent, setAvgRent] = useState<number | "">("");
  const [vacancyRate, setVacancyRate] = useState<number | "">("");
  const [operatingExpenseRate, setOperatingExpenseRate] = useState<number | "">("");
  const [loanAmount, setLoanAmount] = useState<number | "">("");
  const [interestRate, setInterestRate] = useState<number | "">("");
  const [loanTenure, setLoanTenure] = useState<number | "">("");

  const [result, setResult] = useState<any>(null);

  const handleCalculate = () => {
    if (
      purchasePrice === "" ||
      units === "" ||
      avgRent === "" ||
      vacancyRate === "" ||
      operatingExpenseRate === "" ||
      loanAmount === "" ||
      interestRate === "" ||
      loanTenure === ""
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
    const annualInterestRate = Number(interestRate) / 100;
    const tenureYears = Number(loanTenure);

    // 1. Equity (down payment)
    const equityInvestment = price - loan;

    // 2. Gross Potential Rent
    const gpr = totalUnits * rent * 12;

    // 3. Vacancy Loss
    const vacancyLoss = gpr * vacancy;

    // 4. Effective Gross Income
    const egi = gpr - vacancyLoss;

    // 5. Operating Expenses
    const operatingExpenses = egi * expensesRate;

    // 6. Net Operating Income
    const noi = egi - operatingExpenses;

    // 7. Debt Service (EMI calc)
    const monthlyRate = annualInterestRate / 12;
    const months = tenureYears * 12;

    const emi =
      (loan * monthlyRate * Math.pow(1 + monthlyRate, months)) /
      (Math.pow(1 + monthlyRate, months) - 1);

    const annualDebtService = emi * 12;

    // 8. Cash Flow After Debt
    const cashFlowAfterDebt = noi - annualDebtService;

    // 9. Correct Cash-on-Cash ROI
    const roi = (cashFlowAfterDebt / equityInvestment) * 100;

    // Cap Rate
    const capRate = noi / price;

    setResult({
      gpr,
      vacancyLoss,
      egi,
      operatingExpenses,
      noi,
      capRate,
      annualDebtService,
      cashFlowAfterDebt,
      roi,
      equityInvestment,
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
              onChange={(e) =>
                setPurchasePrice(e.target.value === "" ? "" : Number(e.target.value))
              }
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
            <label className="block font-medium text-gray-700 mb-1">Average Rent (₹/month)</label>
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
              onChange={(e) =>
                setVacancyRate(e.target.value === "" ? "" : Number(e.target.value))
              }
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
              onChange={(e) =>
                setLoanAmount(e.target.value === "" ? "" : Number(e.target.value))
              }
              className="w-full border p-2 rounded"
            />
          </div>
          <div>
            <label className="block font-medium text-gray-700 mb-1">Interest Rate (% per year)</label>
            <input
              type="number"
              value={interestRate}
              onChange={(e) =>
                setInterestRate(e.target.value === "" ? "" : Number(e.target.value))
              }
              className="w-full border p-2 rounded"
            />
          </div>
          <div>
            <label className="block font-medium text-gray-700 mb-1">Loan Tenure (years)</label>
            <input
              type="number"
              value={loanTenure}
              onChange={(e) =>
                setLoanTenure(e.target.value === "" ? "" : Number(e.target.value))
              }
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
              <li>💳 Annual Debt Service: <b>₹ {result.annualDebtService.toLocaleString()}</b></li>
              <li>💵 Cash Flow After Debt: <b>₹ {result.cashFlowAfterDebt.toLocaleString()}</b></li>
              <li>💰 Equity Investment: <b>₹ {result.equityInvestment.toLocaleString()}</b></li>
              <li>💹 ROI (Cash-on-Cash): <b>{result.roi.toFixed(2)}%</b></li>
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}
