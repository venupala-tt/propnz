"use client";

import { useState } from "react";

// Helper functions for NPV and IRR
function calculateNPV(rate: number, cashFlows: number[]) {
  return cashFlows.reduce((acc, cf, i) => acc + cf / Math.pow(1 + rate, i), 0);
}

function calculateIRR(cashFlows: number[], guess = 0.1) {
  let rate = guess;
  for (let i = 0; i < 100; i++) {
    const npv = calculateNPV(rate, cashFlows);
    const derivative =
      cashFlows.reduce((acc, cf, t) => acc - (t * cf) / Math.pow(1 + rate, t + 1), 0) || 1;
    const newRate = rate - npv / derivative;
    if (Math.abs(newRate - rate) < 1e-6) return newRate;
    rate = newRate;
  }
  return rate;
}

export default function MultifamilyROICalculator() {
  // Inputs
  const [purchasePrice, setPurchasePrice] = useState<number | "">("");
  const [units, setUnits] = useState<number | "">("");
  const [avgRent, setAvgRent] = useState<number | "">("");
  const [vacancyRate, setVacancyRate] = useState<number | "">(5);
  const [otherIncome, setOtherIncome] = useState<number | "">("");
  const [fixedExpenses, setFixedExpenses] = useState<number | "">("");
  const [variableExpenseRate, setVariableExpenseRate] = useState<number | "">(35);
  const [loanAmount, setLoanAmount] = useState<number | "">("");
  const [interestRate, setInterestRate] = useState<number | "">("");
  const [loanTenure, setLoanTenure] = useState<number | "">(20);
  const [exitCapRate, setExitCapRate] = useState<number | "">(6);
  const [sellingCostsRate, setSellingCostsRate] = useState<number | "">(2);

  // New inputs for DCF
  const [holdingPeriod, setHoldingPeriod] = useState<number | "">(5);
  const [discountRate, setDiscountRate] = useState<number | "">(10);

  const [result, setResult] = useState<any>(null);

  const handleCalculate = () => {
    const price = Number(purchasePrice);
    const totalUnits = Number(units);
    const rent = Number(avgRent);
    const vacancy = Number(vacancyRate) / 100;
    const otherInc = Number(otherIncome) || 0;
    const fixedExp = Number(fixedExpenses) || 0;
    const varExpRate = Number(variableExpenseRate) / 100;
    const loan = Number(loanAmount);
    const annualInterestRate = Number(interestRate) / 100;
    const tenureYears = Number(loanTenure);
    const exitCap = Number(exitCapRate) / 100;
    const sellingCostPct = Number(sellingCostsRate) / 100;
    const holdYears = Number(holdingPeriod);
    const discount = Number(discountRate) / 100;

    // Income
    const gsr = totalUnits * rent * 12;
    const vacancyLoss = gsr * vacancy;
    const egi = gsr - vacancyLoss;
    const totalRevenue = egi + otherInc;

    // Expenses
    const variableExpenses = egi * varExpRate;
    const totalExpenses = fixedExp + variableExpenses;

    // NOI
    const noi = totalRevenue - totalExpenses;

    // Cap Rate
    const capRate = noi / price;

    // Financing
    const ltv = loan / price;
    const monthlyRate = annualInterestRate / 12;
    const months = tenureYears * 12;
    const emi =
      (loan * monthlyRate * Math.pow(1 + monthlyRate, months)) /
      (Math.pow(1 + monthlyRate, months) - 1);
    const annualDebtService = emi * 12;
    const dscr = noi / annualDebtService;

    // Cash Flow
    const beforeTaxCashFlow = noi - annualDebtService;
    const equityInvestment = price - loan;
    const cocReturn = (beforeTaxCashFlow / equityInvestment) * 100;

    // Exit
    const exitValue = noi / exitCap;
    const saleProceeds = exitValue - loan - exitValue * sellingCostPct;

    // Cash Flow Array for DCF
    const cashFlows: number[] = [];
    cashFlows.push(-equityInvestment); // Year 0
    for (let y = 1; y <= holdYears; y++) {
      if (y < holdYears) {
        cashFlows.push(beforeTaxCashFlow);
      } else {
        cashFlows.push(beforeTaxCashFlow + saleProceeds); // final year includes sale
      }
    }

    const npv = calculateNPV(discount, cashFlows);
    const irr = calculateIRR(cashFlows) * 100;

    // Build yearly table
    const table = cashFlows.map((cf, i) => ({
      year: i,
      cashFlow: cf,
    }));

    setResult({
      gsr,
      vacancyLoss,
      egi,
      totalRevenue,
      totalExpenses,
      noi,
      capRate,
      ltv,
      annualDebtService,
      dscr,
      beforeTaxCashFlow,
      equityInvestment,
      cocReturn,
      exitValue,
      saleProceeds,
      npv,
      irr,
      table,
    });
  };

  return (
    <section className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 p-6">
      <div className="bg-white rounded-2xl shadow-lg p-8 max-w-5xl w-full">
        <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">
          🏢 Multifamily Property ROI Calculator (with IRR, NPV & Cash Flow Table)
        </h1>
        {/* Inputs */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <label className="block font-medium text-gray-700 mb-1">Purchase Price (₹)</label>
            <input type="number" value={purchasePrice} onChange={(e) => setPurchasePrice(Number(e.target.value))} className="w-full border p-2 rounded" />
          </div>
          <div>
            <label className="block font-medium text-gray-700 mb-1">Units</label>
            <input type="number" value={units} onChange={(e) => setUnits(Number(e.target.value))} className="w-full border p-2 rounded" />
          </div>
          <div>
            <label className="block font-medium text-gray-700 mb-1">Average Rent (₹ per month)</label>
            <input type="number" value={avgRent} onChange={(e) => setAvgRent(Number(e.target.value))} className="w-full border p-2 rounded" />
          </div>
          <div>
            <label className="block font-medium text-gray-700 mb-1">Vacancy Rate (%)</label>
            <input type="number" value={vacancyRate} onChange={(e) => setVacancyRate(Number(e.target.value))} className="w-full border p-2 rounded" />
          </div>
          <div>
            <label className="block font-medium text-gray-700 mb-1">Other Income (₹)</label>
            <input type="number" value={otherIncome} onChange={(e) => setOtherIncome(Number(e.target.value))} className="w-full border p-2 rounded" />
          </div>
          <div>
            <label className="block font-medium text-gray-700 mb-1">Fixed Expenses (₹)</label>
            <input type="number" value={fixedExpenses} onChange={(e) => setFixedExpenses(Number(e.target.value))} className="w-full border p-2 rounded" />
          </div>
          <div>
            <label className="block font-medium text-gray-700 mb-1">Variable Expense Rate (%)</label>
            <input type="number" value={variableExpenseRate} onChange={(e) => setVariableExpenseRate(Number(e.target.value))} className="w-full border p-2 rounded" />
          </div>
          <div>
            <label className="block font-medium text-gray-700 mb-1">Loan Amount (₹)</label>
            <input type="number" value={loanAmount} onChange={(e) => setLoanAmount(Number(e.target.value))} className="w-full border p-2 rounded" />
          </div>
          <div>
            <label className="block font-medium text-gray-700 mb-1">Interest Rate (%)</label>
            <input type="number" value={interestRate} onChange={(e) => setInterestRate(Number(e.target.value))} className="w-full border p-2 rounded" />
          </div>
          <div>
            <label className="block font-medium text-gray-700 mb-1">Loan Tenure (years)</label>
            <input type="number" value={loanTenure} onChange={(e) => setLoanTenure(Number(e.target.value))} className="w-full border p-2 rounded" />
          </div>
          <div>
            <label className="block font-medium text-gray-700 mb-1">Exit Cap Rate (%)</label>
            <input type="number" value={exitCapRate} onChange={(e) => setExitCapRate(Number(e.target.value))} className="w-full border p-2 rounded" />
          </div>
          <div>
            <label className="block font-medium text-gray-700 mb-1">Selling Costs (%)</label>
            <input type="number" value={sellingCostsRate} onChange={(e) => setSellingCostsRate(Number(e.target.value))} className="w-full border p-2 rounded" />
          </div>
          <div>
            <label className="block font-medium text-gray-700 mb-1">Holding Period (years)</label>
            <input type="number" value={holdingPeriod} onChange={(e) => setHoldingPeriod(Number(e.target.value))} className="w-full border p-2 rounded" />
          </div>
          <div>
            <label className="block font-medium text-gray-700 mb-1">Discount Rate (% for NPV)</label>
            <input type="number" value={discountRate} onChange={(e) => setDiscountRate(Number(e.target.value))} className="w-full border p-2 rounded" />
          </div>
        </div>

        <button onClick={handleCalculate} className="mt-6 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">
          Calculate ROI
        </button>

        {result && (
          <div className="mt-8 bg-gray-50 p-6 rounded-lg shadow-inner">
            <h2 className="text-xl font-bold text-gray-800 mb-4">📊 Results</h2>
            <ul className="space-y-2 text-gray-700">
              <li>🏠 GSR: <b>₹ {result.gsr.toLocaleString()}</b></li>
              <li>💵 EGI: <b>₹ {result.egi.toLocaleString()}</b></li>
              <li>📈 NOI: <b>₹ {result.noi.toLocaleString()}</b></li>
              <li>🏷️ Cap Rate: <b>{(result.capRate * 100).toFixed(2)}%</b></li>
              <li>💳 Annual Debt Service: <b>₹ {result.annualDebtService.toLocaleString()}</b></li>
              <li>📊 DSCR: <b>{result.dscr.toFixed(2)}x</b></li>
              <li>💵 BTCF: <b>₹ {result.beforeTaxCashFlow.toLocaleString()}</b></li>
              <li>💰 Equity Investment: <b>₹ {result.equityInvestment.toLocaleString()}</b></li>
              <li>💹 Cash-on-Cash ROI: <b>{result.cocReturn.toFixed(2)}%</b></li>
              <li>🏷️ Exit Value: <b>₹ {result.exitValue.toLocaleString()}</b></li>
              <li>🏦 Sale Proceeds: <b>₹ {result.saleProceeds.toLocaleString()}</b></li>
              <li>📉 NPV (at {discountRate}%): <b>₹ {result.npv.toLocaleString()}</b></li>
              <li>📈 IRR: <b>{result.irr.toFixed(2)}%</b></li>
            </ul>

            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-2">📅 Cash Flow by Year</h3>
              <table className="w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="border border-gray-300 px-4 py-2">Year</th>
                    <th className="border border-gray-300 px-4 py-2">Cash Flow (₹)</th>
                  </tr>
                </thead>
                <tbody>
                  {result.table.map((row: any) => (
                    <tr key={row.year} className="text-center">
                      <td className="border border-gray-300 px-4 py-2">{row.year}</td>
                      <td className="border border-gray-300 px-4 py-2">{row.cashFlow.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
