"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

// --- Minimal UI replacements (no shadcn needed) ---
function Card({ children, className = "" }) {
  return (
    <div className={`rounded-2xl shadow p-4 bg-white ${className}`}>
      {children}
    </div>
  );
}

function CardHeader({ children }) {
  return <div className="mb-2">{children}</div>;
}

function CardTitle({ children }) {
  return <h2 className="text-xl font-semibold">{children}</h2>;
}

function CardContent({ children, className = "" }) {
  return <div className={className}>{children}</div>;
}

function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={`w-full border rounded-lg p-2 ${props.className || ""}`}
    />
  );
}

function Label({ children }) {
  return (
    <label className="block mb-1 text-sm font-medium text-gray-700">
      {children}
    </label>
  );
}

function Button({
  children,
  className = "",
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className={`px-4 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700 ${className}`}
    >
      {children}
    </button>
  );
}
// --------------------------------------------------

// Utility: IRR calculation via Newton-Raphson
function calculateIRR(cashflows: number[], guess = 0.1): number {
  let rate = guess;
  for (let i = 0; i < 100; i++) {
    let npv = 0;
    let dnpv = 0;
    for (let t = 0; t < cashflows.length; t++) {
      npv += cashflows[t] / Math.pow(1 + rate, t);
      dnpv += (-t * cashflows[t]) / Math.pow(1 + rate, t + 1);
    }
    if (dnpv === 0) break;
    const newRate = rate - npv / dnpv;
    if (Math.abs(newRate - rate) < 1e-7) return newRate;
    rate = newRate;
  }
  return rate;
}

export default function ROICalculatorPage() {
  const [purchase, setPurchase] = useState(5000000);
  const [reno, setReno] = useState(1000000);
  const [rent, setRent] = useState(200000);
  const [years, setYears] = useState(5);
  const [maint, setMaint] = useState(50000);
  const [loan, setLoan] = useState(0);
  const [resale, setResale] = useState(7000000);

  const totalInvestment = purchase + reno;
  const rentalIncome = rent * years;
  const totalMaintenance = maint * years;

  const cashflows: number[] = [];
  // Initial outflow
  cashflows.push(-(purchase + reno - loan));
  // Rental income net of maintenance
  for (let i = 1; i <= years; i++) {
    cashflows.push(rent - maint);
  }
  // Add resale in the last year
  cashflows[years] += resale;

  const irrProject = calculateIRR([
    -(purchase + reno),
    ...Array(years - 1).fill(rent - maint),
    rent - maint + resale,
  ]);

  const irrEquity = calculateIRR(cashflows);

  const netProfit =
    resale + rentalIncome - totalMaintenance - totalInvestment;
  const roi = (netProfit / totalInvestment) * 100;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto"
      >
        {/* --- Highlighted Caption above heading --- */}
        <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-xl mb-6 shadow-sm">
          <p className="text-lg text-gray-700 mb-2 italic">
            Do you know you can make money by reselling single unit flats... Buy
            an old flat, renovate, rent it out and get rental income, then
            resell for higher price. Fill the data below and check it yourself
            !!!
          </p>
          <p className="text-sm text-blue-700">
            To know the availability of Single Unit Flats ...{" "}
            <Link href="/contact" className="underline font-medium">
              please Contact Us
            </Link>
          </p>
        </div>

        <h1 className="text-3xl font-bold mb-6">
          Flat Reselling ROI Calculator
        </h1>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Inputs</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-2">
            <div>
              <Label>Purchase Price</Label>
              <Input
                type="number"
                value={purchase}
                onChange={(e) => setPurchase(Number(e.target.value))}
              />
            </div>
            <div>
              <Label>Renovation Cost</Label>
              <Input
                type="number"
                value={reno}
                onChange={(e) => setReno(Number(e.target.value))}
              />
            </div>
            <div>
              <Label>Rental Income / Year</Label>
              <Input
                type="number"
                value={rent}
                onChange={(e) => setRent(Number(e.target.value))}
              />
            </div>
            <div>
              <Label>Years Rented</Label>
              <select
                value={years}
                onChange={(e) => setYears(Number(e.target.value))}
                className="w-full border rounded-lg p-2"
              >
                {Array.from({ length: 10 }, (_, i) => i + 1).map((yr) => (
                  <option key={yr} value={yr}>
                    {yr}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <Label>Maintenance / Year</Label>
              <Input
                type="number"
                value={maint}
                onChange={(e) => setMaint(Number(e.target.value))}
              />
            </div>
            <div>
              <Label>Loan Taken</Label>
              <Input
                type="number"
                value={loan}
                onChange={(e) => setLoan(Number(e.target.value))}
              />
            </div>
            <div>
              <Label>Resale Price</Label>
              <Input
                type="number"
                value={resale}
                onChange={(e) => setResale(Number(e.target.value))}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Summary of Profit & ROI</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            <p>
              <strong>Total Investment:</strong> ₹
              {totalInvestment.toLocaleString()}
            </p>
            <p>
              <strong>Total Rental Income:</strong> ₹
              {rentalIncome.toLocaleString()}
            </p>
            <p>
              <strong>Total Maintenance:</strong> ₹
              {totalMaintenance.toLocaleString()}
            </p>
            <p>
              <strong>Net Profit:</strong> ₹{netProfit.toLocaleString()}
            </p>
            <p>
              <strong>ROI %:</strong> {roi.toFixed(2)}%
            </p>
            <p>
              <strong>Project IRR:</strong> {(irrProject * 100).toFixed(2)}%
            </p>
            <p>
              <strong>Equity IRR:</strong> {(irrEquity * 100).toFixed(2)}%
            </p>
            <p className="mt-4 text-sm text-blue-700">
              Eager to know more about Single Unit Flats available?{" "}
              <Link href="/contact" className="underline font-medium">
                please Contact Us
              </Link>
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
