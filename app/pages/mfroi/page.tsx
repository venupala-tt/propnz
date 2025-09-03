"use client";

import React, { useMemo, useState } from 'react'

// Multifamily ROI Calculator USA - Next.js page (page.tsx)
// Tailwind CSS used for styling (no imports required here)

export default function MultifamilyROICalculator() {
  // Inputs
  const [purchasePrice, setPurchasePrice] = useState<number>(1200000)
  const [units, setUnits] = useState<number>(8)
  const [avgRentPerUnit, setAvgRentPerUnit] = useState<number>(950)
  const [otherMonthlyIncome, setOtherMonthlyIncome] = useState<number>(0)
  const [vacancyRate, setVacancyRate] = useState<number>(5) // percent

  const [operatingExpensesAnnual, setOperatingExpensesAnnual] = useState<number>(30000)
  const [propertyTaxAnnual, setPropertyTaxAnnual] = useState<number>(6000)
  const [insuranceAnnual, setInsuranceAnnual] = useState<number>(2400)
  const [managementPercent, setManagementPercent] = useState<number>(6) // of effective gross income

  const [downPaymentPercent, setDownPaymentPercent] = useState<number>(25)
  const [loanInterestRate, setLoanInterestRate] = useState<number>(5)
  const [loanTermYears, setLoanTermYears] = useState<number>(25)
  const [closingCosts, setClosingCosts] = useState<number>(20000)
  const [rehabCosts, setRehabCosts] = useState<number>(0)

  const [annualAppreciation, setAnnualAppreciation] = useState<number>(2)
  const [annualRentGrowth, setAnnualRentGrowth] = useState<number>(2)
  const [holdPeriodYears, setHoldPeriodYears] = useState<number>(5)
  const [sellingCostPercent, setSellingCostPercent] = useState<number>(6)

  // Helpers
  const toNumber = (v: any) => (typeof v === 'number' ? v : parseFloat(String(v) || '0'))
  const formatCurrency = (v: number) =>
    v.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })

  // Derived calculations
  const calculations = useMemo(() => {
    const purchase = toNumber(purchasePrice)
    const u = Math.max(1, Math.round(toNumber(units)))
    const rent = Math.max(0, toNumber(avgRentPerUnit))
    const otherMonthly = Math.max(0, toNumber(otherMonthlyIncome))

    const grossMonthlyIncome = u * rent + otherMonthly
    const grossAnnualIncome = grossMonthlyIncome * 12
    const vacancyLoss = (toNumber(vacancyRate) / 100) * grossAnnualIncome
    const effectiveGrossIncome = grossAnnualIncome - vacancyLoss

    const managementFee = (toNumber(managementPercent) / 100) * effectiveGrossIncome
    const operatingExpensesDetailed = toNumber(operatingExpensesAnnual) + toNumber(propertyTaxAnnual) + toNumber(insuranceAnnual) + managementFee

    const noi = effectiveGrossIncome - operatingExpensesDetailed

    // Financing
    const downPayment = (toNumber(downPaymentPercent) / 100) * purchase
    const loanAmount = Math.max(0, purchase - downPayment)

    // Monthly mortgage P&I (standard amortization)
    const annualRate = toNumber(loanInterestRate) / 100
    const monthlyRate = annualRate / 12
    const totalPayments = toNumber(loanTermYears) * 12
    let monthlyMortgage = 0
    if (loanAmount > 0 && monthlyRate > 0) {
      monthlyMortgage = (loanAmount * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -totalPayments))
    } else if (loanAmount > 0) {
      monthlyMortgage = loanAmount / totalPayments
    }
    const annualDebtService = monthlyMortgage * 12

    const cashFlowBeforeTax = noi - annualDebtService

    const totalCashInvested = downPayment + toNumber(closingCosts) + toNumber(rehabCosts)

    const cashOnCash = totalCashInvested > 0 ? (cashFlowBeforeTax / totalCashInvested) * 100 : 0
    const capRate = purchase > 0 ? (noi / purchase) * 100 : 0
    const dscr = annualDebtService > 0 ? noi / annualDebtService : Infinity
    const grm = grossAnnualIncome > 0 ? purchase / grossAnnualIncome : 0

    // Sale at hold period
    const futureSalePrice = purchase * Math.pow(1 + toNumber(annualAppreciation) / 100, toNumber(holdPeriodYears))
    const sellingCosts = (toNumber(sellingCostPercent) / 100) * futureSalePrice
    const remainingLoanBalanceAtSale = (() => {
      // simple amortization remaining balance calculation
      if (loanAmount <= 0 || monthlyRate <= 0) return 0
      const n = totalPayments
      const k = Math.min(n, toNumber(loanTermYears) * 12)
      // balance after k payments
      const balance = loanAmount * (Math.pow(1 + monthlyRate, n) - Math.pow(1 + monthlyRate, k)) / (Math.pow(1 + monthlyRate, n) - 1)
      return balance
    })()

    const netSaleProceeds = futureSalePrice - sellingCosts - remainingLoanBalanceAtSale

    // Build cashflow series for IRR
    const yearlyCashFlows: number[] = []
    for (let year = 1; year <= toNumber(holdPeriodYears); year++) {
      // assume rent grows each year
      const annualRentThisYear = grossAnnualIncome * Math.pow(1 + toNumber(annualRentGrowth) / 100, year - 1)
      const vacancyThisYear = (toNumber(vacancyRate) / 100) * annualRentThisYear
      const egiThisYear = annualRentThisYear - vacancyThisYear + otherMonthly * 12
      const managementFeeThisYear = (toNumber(managementPercent) / 100) * egiThisYear
      const operatingExpensesYearThis = toNumber(operatingExpensesAnnual) + toNumber(propertyTaxAnnual) + toNumber(insuranceAnnual) + managementFeeThisYear
      const noiThisYear = egiThisYear - operatingExpensesYearThis
      const cashFlowThisYear = noiThisYear - annualDebtService
      yearlyCashFlows.push(cashFlowThisYear)
    }
    // add sale proceeds to final year
    yearlyCashFlows[yearlyCashFlows.length - 1] += netSaleProceeds

    // IRR (simple iterative approach)
    const irr = (() => {
      const guessRate = 0.1
      let low = -0.9999
      let high = 10
      const npv = (rate: number) => {
        let value = -totalCashInvested
        for (let i = 0; i < yearlyCashFlows.length; i++) {
          value += yearlyCashFlows[i] / Math.pow(1 + rate, i + 1)
        }
        return value
      }
      let mid = guessRate
      for (let i = 0; i < 80; i++) {
        mid = (low + high) / 2
        const val = npv(mid)
        if (Math.abs(val) < 1e-6) break
        if (val > 0) {
          low = mid
        } else {
          high = mid
        }
      }
      return (mid * 100)
    })()

    return {
      purchase,
      units: u,
      grossMonthlyIncome,
      grossAnnualIncome,
      vacancyLoss,
      effectiveGrossIncome,
      operatingExpensesDetailed,
      noi,
      downPayment,
      loanAmount,
      monthlyMortgage,
      annualDebtService,
      cashFlowBeforeTax,
      totalCashInvested,
      cashOnCash,
      capRate,
      dscr,
      grm,
      futureSalePrice,
      sellingCosts,
      remainingLoanBalanceAtSale,
      netSaleProceeds,
      yearlyCashFlows,
      irr,
    }
  }, [
    purchasePrice,
    units,
    avgRentPerUnit,
    otherMonthlyIncome,
    vacancyRate,
    operatingExpensesAnnual,
    propertyTaxAnnual,
    insuranceAnnual,
    managementPercent,
    downPaymentPercent,
    loanInterestRate,
    loanTermYears,
    closingCosts,
    rehabCosts,
    annualAppreciation,
    annualRentGrowth,
    holdPeriodYears,
    sellingCostPercent,
  ])

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-semibold mb-4">Multifamily ROI Calculator (USA)</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <section className="p-4 border rounded-lg">
          <h2 className="font-medium mb-3">Property & Income</h2>
          <label className="block text-sm">Purchase Price</label>
          <input value={purchasePrice} onChange={e => setPurchasePrice(Number(e.target.value))} type="number" className="w-full p-2 border rounded mb-2" />

          <label className="block text-sm">Units</label>
          <input value={units} onChange={e => setUnits(Number(e.target.value))} type="number" className="w-full p-2 border rounded mb-2" />

          <label className="block text-sm">Avg Rent / Unit (monthly)</label>
          <input value={avgRentPerUnit} onChange={e => setAvgRentPerUnit(Number(e.target.value))} type="number" className="w-full p-2 border rounded mb-2" />

          <label className="block text-sm">Other Monthly Income</label>
          <input value={otherMonthlyIncome} onChange={e => setOtherMonthlyIncome(Number(e.target.value))} type="number" className="w-full p-2 border rounded mb-2" />

          <label className="block text-sm">Vacancy Rate (%)</label>
          <input value={vacancyRate} onChange={e => setVacancyRate(Number(e.target.value))} type="number" step="0.1" className="w-full p-2 border rounded mb-2" />
        </section>

        <section className="p-4 border rounded-lg">
          <h2 className="font-medium mb-3">Expenses & Management</h2>
          <label className="block text-sm">Operating Expenses (annual total)</label>
          <input value={operatingExpensesAnnual} onChange={e => setOperatingExpensesAnnual(Number(e.target.value))} type="number" className="w-full p-2 border rounded mb-2" />

          <label className="block text-sm">Property Tax (annual)</label>
          <input value={propertyTaxAnnual} onChange={e => setPropertyTaxAnnual(Number(e.target.value))} type="number" className="w-full p-2 border rounded mb-2" />

          <label className="block text-sm">Insurance (annual)</label>
          <input value={insuranceAnnual} onChange={e => setInsuranceAnnual(Number(e.target.value))} type="number" className="w-full p-2 border rounded mb-2" />

          <label className="block text-sm">Management Fee (%) of EGI</label>
          <input value={managementPercent} onChange={e => setManagementPercent(Number(e.target.value))} type="number" step="0.1" className="w-full p-2 border rounded mb-2" />
        </section>

        <section className="p-4 border rounded-lg">
          <h2 className="font-medium mb-3">Financing & Costs</h2>
          <label className="block text-sm">Down Payment (%)</label>
          <input value={downPaymentPercent} onChange={e => setDownPaymentPercent(Number(e.target.value))} type="number" step="0.1" className="w-full p-2 border rounded mb-2" />

          <label className="block text-sm">Loan Interest Rate (%)</label>
          <input value={loanInterestRate} onChange={e => setLoanInterestRate(Number(e.target.value))} type="number" step="0.01" className="w-full p-2 border rounded mb-2" />

          <label className="block text-sm">Loan Term (years)</label>
          <input value={loanTermYears} onChange={e => setLoanTermYears(Number(e.target.value))} type="number" className="w-full p-2 border rounded mb-2" />

          <label className="block text-sm">Closing Costs</label>
          <input value={closingCosts} onChange={e => setClosingCosts(Number(e.target.value))} type="number" className="w-full p-2 border rounded mb-2" />

          <label className="block text-sm">Rehab / Rehab Budget</label>
          <input value={rehabCosts} onChange={e => setRehabCosts(Number(e.target.value))} type="number" className="w-full p-2 border rounded mb-2" />
        </section>

        <section className="p-4 border rounded-lg">
          <h2 className="font-medium mb-3">Assumptions & Exit</h2>
          <label className="block text-sm">Annual Appreciation (%)</label>
          <input value={annualAppreciation} onChange={e => setAnnualAppreciation(Number(e.target.value))} type="number" step="0.1" className="w-full p-2 border rounded mb-2" />

          <label className="block text-sm">Annual Rent Growth (%)</label>
          <input value={annualRentGrowth} onChange={e => setAnnualRentGrowth(Number(e.target.value))} type="number" step="0.1" className="w-full p-2 border rounded mb-2" />

          <label className="block text-sm">Hold Period (years)</label>
          <input value={holdPeriodYears} onChange={e => setHoldPeriodYears(Number(e.target.value))} type="number" className="w-full p-2 border rounded mb-2" />

          <label className="block text-sm">Selling Costs (% of sale)</label>
          <input value={sellingCostPercent} onChange={e => setSellingCostPercent(Number(e.target.value))} type="number" step="0.1" className="w-full p-2 border rounded mb-2" />
        </section>
      </div>

      <div className="mt-6 p-4 border rounded bg-gray-50">
        <h2 className="text-lg font-medium mb-3">Results</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Stat label="Gross Annual Income" value={formatCurrency(calculations.grossAnnualIncome)} />
          <Stat label="Effective Gross Income (EGI)" value={formatCurrency(calculations.effectiveGrossIncome)} />
          <Stat label="NOI (annual)" value={formatCurrency(calculations.noi)} />

          <Stat label="Annual Debt Service" value={formatCurrency(calculations.annualDebtService)} />
          <Stat label="Annual Cash Flow" value={formatCurrency(calculations.cashFlowBeforeTax)} />
          <Stat label="Total Cash Invested" value={formatCurrency(calculations.totalCashInvested)} />

          <Stat label="Cash on Cash Return" value={`${calculations.cashOnCash.toFixed(2)} %`} />
          <Stat label="Cap Rate" value={`${calculations.capRate.toFixed(2)} %`} />
          <Stat label="DSCR" value={calculations.dscr === Infinity ? '—' : calculations.dscr.toFixed(2)} />

          <Stat label="GRM" value={calculations.grm.toFixed(2)} />
          <Stat label="Projected Sale Price (in ${holdPeriodYears} yrs)" value={formatCurrency(calculations.futureSalePrice)} />
          <Stat label="Net Sale Proceeds (est)" value={formatCurrency(calculations.netSaleProceeds)} />

          <Stat label="IRR (approx)" value={`${calculations.irr.toFixed(2)} %`} />
        </div>

        <div className="mt-4">
          <h3 className="font-medium">Year-by-year cashflows (preview)</h3>
          <pre className="mt-2 p-3 bg-white rounded text-sm overflow-auto">
            {calculations.yearlyCashFlows.map((v, i) => `Year ${i + 1}: ${formatCurrency(Math.round(v))}`).join('\n')}
          </pre>
        </div>
      </div>

      <div className="mt-6 text-sm text-gray-600">
        <p>Copy this file to <code>app/multifamily/page.tsx</code> (or <code>pages/</code> depending on your Next.js structure). Tailwind CSS is used for layout. Let me know if you'd like CSV export, charting, or export to Excel.</p>
      </div>
    </div>
  )
}

function Stat({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="p-3 bg-white border rounded">
      <div className="text-xs text-gray-500">{label}</div>
      <div className="text-lg font-semibold">{value}</div>
    </div>
  )
}
