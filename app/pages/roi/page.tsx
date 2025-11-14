"use client";

import { useMemo, useState } from "react";
import SEO from "../../../components/SEO";


type OptionInput = {
  name: string;
  price: number;       // in Lakh
  cash: number;        // in Lakh
  appreciation: number; // % per year
  rentSave: number;    // in Lakh per year (use 0 for plots)
  risk: string;
  mitigation: string;
};

type ResultRow = OptionInput & {
  option: string;      // Option A/B/C
  loan: number;        // in Lakh
  futureValue: number; // in Lakh
  profit: number;      // in Lakh
  roi: number;         // %
  emiK: number;        // in ₹ thousands per month
};

export default function Page() {
  // Global ROI period (years)
  const [period, setPeriod] = useState(3);

  // User-editable inputs per option
  const [options, setOptions] = useState<OptionInput[]>([
    {
      name: "Plot inside a nearby rural town",
      price: 30,
      cash: 10,
      appreciation: 11,
      rentSave: 0,
      risk: "Lower liquidity; resale could take time; infra growth uncertain.",
      mitigation: "Pick layout with existing houses, verify approvals, be ready for longer hold.",
    },
    {
      name: "Brand New Layout near ORR exits in about 30 km s from Hyderabad",
      price: 37,
      cash: 10,
      appreciation: 14,
      rentSave: 0,
      risk: "Approval/amenities delays; hype risk; higher EMI if leveraged.",
      mitigation: "Insist on HMDA/RERA, check builder track record & road access, avoid over-leverage.",
    },
    {
      name: "Buy a New or Resale Flat for Living",
      price: 80,
      cash: 25,
      appreciation: 6,
      rentSave: 4.5, // ≈ ₹37k/month rent saved ≈ 4.5L/yr
      risk: "EMI burden; maintenance; slower appreciation than plots.",
      mitigation: "Choose strong locality & society, inspect upkeep, negotiate price.",
    },
  ]);

  // Helpers
  const sanitize = (n: number) => (Number.isFinite(n) ? n : 0);

  // Standard EMI calculator (default 10 years, 9% p.a.)
  const calcEMIthousands = (loanLakh: number, years = 10, rate = 9) => {
    const L = Math.max(loanLakh, 0);
    if (L <= 0) return 0;
    const P = L * 100000; // ₹
    const n = years * 12;
    const r = rate / 12 / 100;
    const emi = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1); // ₹/month
    return Math.round(emi / 1000); // in thousands
  };

  // Calculate results on demand
  const [results, setResults] = useState<ResultRow[]>([]);

  const compute = () => {
    const rows: ResultRow[] = options.map((opt, idx) => {
      const price = sanitize(opt.price);
      const cash = Math.max(sanitize(opt.cash), 0);
      const loan = Math.max(price - cash, 0);

      const fv = price * Math.pow(1 + sanitize(opt.appreciation) / 100, Math.max(period, 0));
      const profit = (fv - price) + sanitize(opt.rentSave) * Math.max(period, 0); // include rent saved for flats
      const roi = cash > 0 ? (profit / cash) * 100 : 0;
      const emiK = calcEMIthousands(loan);

      return {
        ...opt,
        option: `Option ${String.fromCharCode(65 + idx)}`, // A/B/C
        loan: Number(loan.toFixed(2)),
        futureValue: Number(fv.toFixed(2)),
        profit: Number(profit.toFixed(2)),
        roi: Number(roi.toFixed(1)),
        emiK,
      };
    });

    setResults(rows);
  };

  const totalEMIK = useMemo(() => results.reduce((sum, r) => sum + r.emiK, 0), [results]);

  const update = (idx: number, field: keyof OptionInput, value: string | number) => {
    const updated = [...options];
    // numeric fields
    if (["price", "cash", "appreciation", "rentSave"].includes(field)) {
      (updated[idx] as any)[field] = Number(value);
    } else {
      (updated[idx] as any)[field] = value;
    }
    setOptions(updated);
  };

  return (

 <>
    {/* ✅ SEO Component customize for ROI Calculator */}
      <SEO
        title="Propmatics - ROI Calculator for property investments"
        description="Calculate Return on Investment for my property in Hi Tech city, ROI"
        keywords="ROI Calculator, EMI, Property Investment, Best Way to Buy property "
      />

    <main
        className="flex min-h-screen flex-col items-center justify-center 
        p-6 sm:p-12 lg:p-24 
        bg-gradient-to-br from-blue-100 via-white to-purple-100 
        animate-gradientWave"
      >
    
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Real Estate ROI Calculator</h1>
      <h2 className="text-3xl font-bold mb-4 text-center">Enter No.of Years, Data for Option A, B & C and then Hit "Calulate" Button</h2>
      

      {/* Controls */}
      <div className="mb-6 flex flex-wrap items-end gap-4">
        <div>
          <label className="block text-sm font-medium">Investment Period (Years)</label>
          <input
            type="number"
            min={0}
            value={period}
            onChange={(e) => setPeriod(Number(e.target.value))}
            className="border rounded p-2 w-36"
          />
        </div>
        <button
          onClick={compute}
          className="bg-blue-600 text-white px-5 py-2 rounded shadow hover:bg-blue-700"
        >
          Calculate
        </button>
      </div>

      {/* Inputs per option */}
      <div className="space-y-6 mb-8">
        {options.map((opt, idx) => {
          const loanAuto = Math.max((opt.price || 0) - (opt.cash || 0), 0);
          return (
            <div key={idx} className="border rounded-xl p-4 shadow bg-gray-50">
              <h2 className="text-lg font-semibold mb-3">
                Option {String.fromCharCode(65 + idx)} — {opt.name}
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                <div>
                  <label className="block text-sm">Price (Lakh)</label>
                  <input
                    type="number"
                    value={opt.price}
                    onChange={(e) => update(idx, "price", e.target.value)}
                    className="border rounded p-2 w-full"
                  />
                </div>
                <div>
                  <label className="block text-sm">Cash in Hand (Lakh)</label>
                  <input
                    type="number"
                    value={opt.cash}
                    onChange={(e) => update(idx, "cash", e.target.value)}
                    className="border rounded p-2 w-full"
                  />
                </div>
                <div>
                  <label className="block text-sm">Loan (auto)</label>
                  <input
                    type="number"
                    value={loanAuto}
                    disabled
                    className="border rounded p-2 w-full bg-gray-200"
                  />
                </div>
                <div>
                  <label className="block text-sm">Appreciation % / year</label>
                  <input
                    type="number"
                    value={opt.appreciation}
                    onChange={(e) => update(idx, "appreciation", e.target.value)}
                    className="border rounded p-2 w-full"
                  />
                </div>
                <div>
                  <label className="block text-sm">Rent Saved (Lakh / year)</label>
                  <input
                    type="number"
                    value={opt.rentSave}
                    onChange={(e) => update(idx, "rentSave", e.target.value)}
                    className="border rounded p-2 w-full"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div>
                  <label className="block text-sm">Risks</label>
                  <textarea
                    value={opt.risk}
                    onChange={(e) => update(idx, "risk", e.target.value)}
                    className="border rounded p-2 w-full min-h-[72px]"
                  />
                </div>
                <div>
                  <label className="block text-sm">Mitigation</label>
                  <textarea
                    value={opt.mitigation}
                    onChange={(e) => update(idx, "mitigation", e.target.value)}
                    className="border rounded p-2 w-full min-h-[72px]"
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Results */}
      {results.length > 0 && (
        <>
          {/* Table heading + period note */}
          <div className="mb-3">
            <h2 className="text-xl font-semibold">Investment Summary</h2>
            <p className="text-sm text-gray-600">
              Period considered for ROI: <span className="font-medium">{period} years</span>
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm md:text-base">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border p-2 text-left">Option</th>
                  <th className="border p-2 text-left">Property</th>
                  <th className="border p-2">Price (L)</th>
                  <th className="border p-2">Cash (L)</th>
                  <th className="border p-2">Loan (L)</th>
                  <th className="border p-2">Future Value (L)</th>
                  <th className="border p-2">Profit (L)</th>
                  <th className="border p-2">ROI (%)</th>
                  <th className="border p-2">EMI (₹K / mo)</th>
                  <th className="border p-2 text-left">Risks</th>
                  <th className="border p-2 text-left">Mitigation</th>
                </tr>
              </thead>
              <tbody>
                {results.map((r, i) => (
                  <tr key={i} className="text-center">
                    <td className="border p-2">{r.option}</td>
                    <td className="border p-2 text-left">{r.name}</td>
                    <td className="border p-2">{r.price}</td>
                    <td className="border p-2">{r.cash}</td>
                    <td className="border p-2">{r.loan}</td>
                    <td className="border p-2">{r.futureValue}</td>
                    <td className="border p-2">{r.profit}</td>
                    <td className="border p-2">{r.roi}</td>
                    <td className="border p-2">{r.emiK}</td>
                    <td className="border p-2 text-left">{r.risk}</td>
                    <td className="border p-2 text-left">{r.mitigation}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Total EMI burden */}
          <div className="mt-6 p-4 border rounded-lg bg-yellow-50 shadow text-lg font-semibold">
            Total EMI Burden per Month: ₹{totalEMIK}K
          </div>
        </>
      )}
    </div>
</main>
        );
}
