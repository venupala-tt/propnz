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
