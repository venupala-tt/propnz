"use client";

import { useState, useEffect, useRef } from "react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import Link from "next/link";

export default function UnitConverterPage() {
  const [value, setValue] = useState<number | "">("");
  const [fromUnit, setFromUnit] = useState("sqft");
  const [toUnit, setToUnit] = useState("sqyd");
  const [result, setResult] = useState<number | null>(null);

  const [costValue, setCostValue] = useState<number | "">("");
  const [costResult, setCostResult] = useState<number | null>(null);

  const [showTooltip, setShowTooltip] = useState(false);
  const tooltipRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (tooltipRef.current && !tooltipRef.current.contains(event.target as Node)) {
        setShowTooltip(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const conversionRates: Record<string, number> = {
    sqft: 1,
    sqyd: 1 / 9,
    sqm: 1 / 10.7639,
    acre: 1 / 43560,
    gunta: 1 / 1089,
    cent: 1 / 435.6,
  };

  const handleConvert = () => {
    if (value === "" || isNaN(Number(value))) {
      setResult(null);
      return;
    }
    const sqftValue = Number(value) / conversionRates[fromUnit];
    const converted = sqftValue * conversionRates[toUnit];
    setResult(converted);
  };

  const handleCostConvert = () => {
    if (costValue === "" || isNaN(Number(costValue))) {
      setCostResult(null);
      return;
    }
    const costPerSqft = Number(costValue) * conversionRates[fromUnit];
    const convertedCost = costPerSqft / conversionRates[toUnit];
    setCostResult(convertedCost);
  };

  const exportToExcel = () => {
    const data: any[] = [];

    if (result !== null) {
      data.push({
        Type: "Area Conversion",
        Input: `${value} ${fromUnit}`,
        Output: `${result.toLocaleString(undefined, { maximumFractionDigits: 4 })} ${toUnit}`,
      });
    }

    if (costResult !== null) {
      data.push({
        Type: "Cost Conversion",
        Input: `${costValue} ₹ / ${fromUnit}`,
        Output: `₹ ${costResult.toLocaleString(undefined, { maximumFractionDigits: 4 })} / ${toUnit}`,
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
    <section className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 via-white to-purple-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-6">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 max-w-2xl w-full space-y-10 transition-colors relative">
        {/* Header Row with Title and Back Button */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
            🏠 Real Estate Unit Converter
          </h1>
          <Link
            href="/pages/tools"
            className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition"
          >
            ⬅️ Back To Tools
          </Link>
        </div>

        {/* Area Conversion Section */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200 flex items-center gap-2">
              Area Conversion
              <span className="relative inline-block" ref={tooltipRef}>
                <button
                  className="bg-blue-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                  onClick={() => setShowTooltip(!showTooltip)}
                >
                  ?
                </button>
                {showTooltip && (
                  <div className="absolute left-6 top-0 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 shadow-lg p-3 rounded text-sm z-10 w-64 text-gray-800 dark:text-gray-100">
                    <h3 className="font-bold mb-2">📏 Quick Conversion Chart</h3>
                    <ul className="list-disc list-inside space-y-1">
                      <li>1 Acre = 40 Guntas</li>
                      <li>1 Acre = 4840 Sq. Yards</li>
                      <li>1 Acre = 100 Cents</li>
                      <li>1 Gunta = 121 Sq. Yards</li>
                      <li>1 Gunta = 1089 Sq. Feet</li>
                      <li>1 Cent = 48.4 Sq. Yards</li>
                      <li>1 Cent = 435.6 Sq. Feet</li>
                    </ul>
                  </div>
                )}
              </span>
            </h2>
          </div>
          <div className="space-y-4">
            <input
              type="number"
              placeholder="Enter area value"
              value={value}
              onChange={(e) => setValue(e.target.value === "" ? "" : Number(e.target.value))}
              className="w-full border p-2 rounded bg-gray-50 dark:bg-gray-900 dark:text-gray-100"
            />
            <div className="flex items-center justify-between gap-2">
              <label className="font-medium text-gray-700 dark:text-gray-200">From:</label>
              <select
                value={fromUnit}
                onChange={(e) => setFromUnit(e.target.value)}
                className="border p-2 rounded w-40 bg-gray-50 dark:bg-gray-900 dark:text-gray-100"
              >
                <option value="sqft">Square Feet</option>
                <option value="sqyd">Square Yards</option>
                <option value="sqm">Square Meters</option>
                <option value="acre">Acres</option>
                <option value="gunta">Guntas</option>
                <option value="cent">Cents</option>
              </select>
            </div>
            <div className="flex items-center justify-between gap-2">
              <label className="font-medium text-gray-700 dark:text-gray-200">To:</label>
              <select
                value={toUnit}
                onChange={(e) => setToUnit(e.target.value)}
                className="border p-2 rounded w-40 bg-gray-50 dark:bg-gray-900 dark:text-gray-100"
              >
                <option value="sqft">Square Feet</option>
                <option value="sqyd">Square Yards</option>
                <option value="sqm">Square Meters</option>
                <option value="acre">Acres</option>
                <option value="gunta">Guntas</option>
                <option value="cent">Cents</option>
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
                <p className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                  Result:{" "}
                  <span className="text-blue-600 dark:text-blue-400">
                    {result.toLocaleString(undefined, { maximumFractionDigits: 4 })}
                  </span>{" "}
                  {toUnit}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Land Cost Conversion Section */}
        <div>
          <h2 className="text-lg font-semibold mb-4 text-gray-700 dark:text-gray-200">Cost Conversion</h2>
          <div className="space-y-4">
            <input
              type="number"
              placeholder="Enter cost (₹ per selected unit)"
              value={costValue}
              onChange={(e) => setCostValue(e.target.value === "" ? "" : Number(e.target.value))}
              className="w-full border p-2 rounded bg-gray-50 dark:bg-gray-900 dark:text-gray-100"
            />
            <div className="flex items-center justify-between gap-2">
              <label className="font-medium text-gray-700 dark:text-gray-200">From Unit:</label>
              <select
                value={fromUnit}
                onChange={(e) => setFromUnit(e.target.value)}
                className="border p-2 rounded w-40 bg-gray-50 dark:bg-gray-900 dark:text-gray-100"
              >
                <option value="sqft">₹ / Sq.Ft</option>
                <option value="sqyd">₹ / Sq.Yd</option>
                <option value="sqm">₹ / Sq.M</option>
                <option value="acre">₹ / Acre</option>
                <option value="gunta">₹ / Gunta</option>
                <option value="cent">₹ / Cent</option>
              </select>
            </div>
            <div className="flex items-center justify-between gap-2">
              <label className="font-medium text-gray-700 dark:text-gray-200">To Unit:</label>
              <select
                value={toUnit}
                onChange={(e) => setToUnit(e.target.value)}
                className="border p-2 rounded w-40 bg-gray-50 dark:bg-gray-900 dark:text-gray-100"
              >
                <option value="sqft">₹ / Sq.Ft</option>
                <option value="sqyd">₹ / Sq.Yd</option>
                <option value="sqm">₹ / Sq.M</option>
                <option value="acre">₹ / Acre</option>
                <option value="gunta">₹ / Gunta</option>
                <option value="cent">₹ / Cent</option>
              </select>
            </div>
            <button
              onClick={handleCostConvert}
              className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
            >
              Convert Land Cost
            </button>
            {costResult !== null && (
              <div className="mt-4 text-center">
                <p className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                  Converted Cost:{" "}
                  <span className="text-green-600 dark:text-green-400">
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
            📊 Export Results to Excel
          </button>
        </div>
      </div>
    </section>
  );
}
