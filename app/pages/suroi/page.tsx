"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

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
              <Input
                type="number"
                value={years}
                onChange={(e) => setYears(Number(e.target.value))}
              />
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
            <CardTitle>Results</CardTitle>
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
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
