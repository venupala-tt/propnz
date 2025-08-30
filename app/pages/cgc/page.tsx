"use client";

import { useState } from "react";

// Example Cost Inflation Index (CII) values (India) - can be extended
const CII: Record<number, number> = {
  2001: 100,
  2010: 167,
  2015: 254,
  2016: 264,
  2017: 272,
  2018: 280,
  2019: 289,
  2020: 301,
  2021: 317,
  2022: 331,
  2023: 348,
  2024: 360,
};

export default function CapitalGainsCalculatorPage() {
  const [costPrice, setCostPrice] = useState<number | "">("");
  const [sellingPrice, setSellingPrice] = useState<number | "">("");
  const [purchaseYear, setPurchaseYear] = useState<number | "">("");
  const [saleYear, setSaleYear] = useState<number | "">("");
  const [expenses, setExpenses] = useState<number | "">("");

  const [result, setResult] = useState<{
    type: string;
    gain: number;
    tax: number;
  } | null>(null);

  const handleCalculate = () => {
    if (
      costPrice === "" ||
      sellingPrice === "" ||
      purchaseYear === "" ||
      saleYear === "" ||
      isNaN(Number(costPrice)) ||
      isNaN(Number(sellingPrice)) ||
      isNaN(Number(purchaseYear)) ||
      isNaN(Number(saleYear))
    ) {
      setResult(null);
      return;
    }

    const cp = Number(costPrice);
    const sp = Number(sellingPrice);
    const exp = expenses ? Number(expenses) : 0;
    const pYear = Number(purchaseYear);
    const sYear = Number(saleYear);

    const holdingPeriod = sYear - pYear;
    let capitalGain = 0;
    let tax = 0;

    if (holdingPeriod <= 2) {
      // Short-term capital gain
      capitalGain = sp - cp - exp;
      tax = capitalGain > 0 ? capitalGain * 0.30 : 0;
      setResult({
        type: "Short-Term Capital Gain (STCG)",
        gain: capitalGain,
        tax,
      });
    } else {
      // Long-term capital gain with CII
      const purchaseCII = CII[pYear] || CII[2001]; // fallback if not found
      const saleCII = CII[sYear] || CII[2024]; // fallback if not found
      const indexedCost = cp * (saleCII / purchaseCII);

      capitalGain = sp - indexedCost - exp;
      tax = capitalGain > 0 ? capitalGain * 0.20 : 0;

      setResult({
        type: "Long-Term Capital Gain (LTCG with Indexation)",
        gain: capitalGain,
        tax,
      });
    }
  };

  return (
    <section className="flex items-center justify-center min-h-screen bg-gradient-to-br from-green-100 via-white to-blue-100 p-6">
      <div className="bg-white rounded-2xl shadow-lg p-8 max-w-2xl w-full">
        <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">
          🏠 Capital Gains Calculator (India)
        </h1>

        {/* Input Form */}
        <div className="space-y-4">
          <input
            type="number"
            placeholder="Cost Price (₹)"
            value={costPrice}
            onChange={(e) => setCostPrice(e.target.value === "" ? "" : Number(e.target.value))}
            className="w-full border p-2 rounded"
          />
          <input
            type="number"
            placeholder="Selling Price (₹)"
            value={sellingPrice}
            onChange={(e) => setSellingPrice(e.target.value === "" ? "" : Number(e.target.value))}
            className="w-full border p-2 rounded"
          />
          <input
            type="number"
            placeholder="Year of Purchase (e.g. 2015)"
            value={purchaseYear}
            onChange={(e) =>
              setPurchaseYear(e.target.value === "" ? "" : Number(e.target.value))
            }
            className="w-full border p-2 rounded"
          />
          <input
            type="number"
            placeholder="Year of Sale (e.g. 2024)"
            value={saleYear}
            onChange={(e) =>
              setSaleYear(e.target.value === "" ? "" : Number(e.target.value))
            }
            className="w-full border p-2 rounded"
          />
          <input
            type="number"
            placeholder="Improvement/Other Expenses (₹)"
            value={expenses}
            onChange={(e) => setExpenses(e.target.value === "" ? "" : Number(e.target.value))}
            className="w-full border p-2 rounded"
          />

          <button
            onClick={handleCalculate}
            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
          >
            Calculate
          </button>
        </div>

        {/* Results */}
        {result && (
          <div className="mt-6 text-center bg-gray-50 p-4 rounded-lg shadow-inner">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">{result.type}</h2>
            <p className="text-lg text-gray-700">
              Capital Gain:{" "}
              <span className="text-green-600 font-bold">
                ₹ {result.gain.toLocaleString(undefined, { maximumFractionDigits: 2 })}
              </span>
            </p>
            <p className="text-lg text-gray-700">
              Estimated Tax:{" "}
              <span className="text-red-600 font-bold">
                ₹ {result.tax.toLocaleString(undefined, { maximumFractionDigits: 2 })}
              </span>
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
