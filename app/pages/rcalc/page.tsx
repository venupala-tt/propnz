"use client";

import { useState } from "react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

export default function UnitConverterPage() {
  const [value, setValue] = useState<number | "">("");
  const [fromUnit, setFromUnit] = useState("sqft");
  const [toUnit, setToUnit] = useState("sqyd");
  const [result, setResult] = useState<number | null>(null);

  const [costValue, setCostValue] = useState<number | "">("");
  const [costResult, setCostResult] = useState<number | null>(null);

  // Conversion factors relative to square feet
  const conversionRates: Record<string, number> = {
    sqft: 1,
    sqyd: 1 / 9, // 1 sq yd = 9 sq ft
    sqm: 1 / 10.7639, // 1 sq m = 10.7639 sq ft
    acre: 1 / 43560, // 1 acre = 43,560 sq ft
  };

  // Area Conversion
  const handleConvert = () => {
    if (value === "" || isNaN(Number(value))) {
      setResult(null);
      return;
    }
    const sqftValue = Number(value) / conversionRates[fromUnit];
    const converted = sqftValue * conversionRates[toUnit];
    setResult(converted);
  };

  // Cost Conversion
  const handleCostConvert = () => {
    if (costValue === "" || isNaN(Number(costValue))) {
      setCostResult(null);
      return;
    }
    const costPerSqft = Number(costValue) * conversionRates[fromUnit];
    const convertedCost = costPerSqft / conversionRates[toUnit];
    setCostResult(convertedCost);
  };

  // Export Results to Excel
  const exportToExcel = () => {
    const data: any[] = [];

    if (result !== null) {
      data.push({
        Type: "Area Conversion",
        Input: `${value} ${fromUnit}`,
        Output: `${result.toLocaleString(undefined, {
          maximumFractionDigits: 4,
        })} ${toUnit}`,
      });
    }

    if (costResult !== null) {
      data.push({
        Type: "Cost Conversion",
        Input: `${costValue} ₹ / ${fromUnit}`,
        Output: `₹ ${costResult.toLocaleString(undefined, {
          maximumFractionDigits: 4,
        })} / ${toUnit}`,
      });
    }

    if (data.length === 0) return;

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Conversions");

    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(blob, "RealEstate_Conversions.xlsx");
  };

  return (
    <section className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 via-white to-purple-100 p-6">
      <div className="bg-white rounded-2xl shadow-lg p-8 max-w-2xl w-full space-y-10">
        <h1 className="text-2xl font-bold text-center mb-4 text-gray-800">
          🏗️ Real Estate Unit Converter
        </h1>

        {/* Area Conversion Section */}
        <div>
          <h2 className="text-lg font-semibold mb-4 text-gray-700">Area Conversion</h2>
          <div className="space-y-4">
            <input
              type="number"
              placeholder="Enter area value"
              value={value}
              onChange={(e) => setValue(e.target.value === "" ? "" : Number(e.target.value))}
              className="w-full border p-2 rounded"
            />
            <div className="flex items-center justify-between gap-2">
              <label className="font-medium text-gray-700">From:</label>
              <select
                value={fromUnit}
                onChange={(e) => setFromUnit(e.target.value)}
                className="border p-2 rounded w-40"
              >
                <option value="sqft">Square Feet</option>
                <option value="sqyd">Square Yards</option>
                <option value="sqm">Square Meters</option>
                <option value="acre">Acres</option>
              </select>
            </div>
            <div className="flex items-center justify-between gap-2">
              <label className="font-medium text-gray-700">To:</label>
              <select
                value={toUnit}
                onChange={(e) => setToUnit(e.target.value)}
                className="border p-2 rounded w-40"
              >
                <option value="sqft">Square Feet</option>
                <option value="sqyd">Square Yards</option>
                <option value="sqm">Square Meters</option>
                <option value="acre">Acres</option>
              </select>
            </div>
            <button
              onClick={handleConvert}
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
            >
              Convert Area
            </button>
            {result !== null && (
              <div className="mt-4 text-center">
                <p className="text-lg font-semibold text-gray-800">
                  Result:{" "}
                  <span className="text-blue-600">
                    {result.toLocaleString(undefined, { maximumFractionDigits: 4 })}
                  </span>{" "}
                  {toUnit}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Cost Conversion Section */}
        <div>
          <h2 className="text-lg font-semibold mb-4 text-gray-700">Cost Conversion</h2>
          <div className="space-y-4">
            <input
              type="number"
              placeholder="Enter cost (₹ per selected unit)"
              value={costValue}
              onChange={(e) => setCostValue(e.target.value === "" ? "" : Number(e.target.value))}
              className="w-full border p-2 rounded"
            />
            <div className="flex items-center justify-between gap-2">
              <label className="font-medium text-gray-700">From Unit:</label>
              <select
                value={fromUnit}
                onChange={(e) => setFromUnit(e.target.value)}
                className="border p-2 rounded w-40"
              >
                <option value="sqft">₹ / Sq.Ft</option>
                <option value="sqyd">₹ / Sq.Yd</option>
                <option value="sqm">₹ / Sq.M</option>
                <option value="acre">₹ / Acre</option>
              </select>
            </div>
            <div className="flex items-center justify-between gap-2">
              <label className="font-medium text-gray-700">To Unit:</label>
              <select
                value={toUnit}
                onChange={(e) => setToUnit(e.target.value)}
                className="border p-2 rounded w-40"
              >
                <option value="sqft">₹ / Sq.Ft</option>
                <option value="sqyd">₹ / Sq.Yd</option>
                <option value="sqm">₹ / Sq.M</option>
                <option value="acre">₹ / Acre</option>
              </select>
            </div>
            <button
              onClick={handleCostConvert}
              className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
            >
              Convert Cost
            </button>
            {costResult !== null && (
              <div className="mt-4 text-center">
                <p className="text-lg font-semibold text-gray-800">
                  Converted Cost:{" "}
                  <span className="text-green-600">
                    ₹ {costResult.toLocaleString(undefined, { maximumFractionDigits: 4 })}
                  </span>{" "}
                  per {toUnit.replace("sq", "sq.")}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Export Button */}
        <div className="text-center">
          <button
            onClick={exportToExcel}
            className="px-6 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition"
          >
            📥 Export Results to Excel
          </button>
        </div>
      </div>
    </section>
  );
}
