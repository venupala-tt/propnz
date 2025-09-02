"use client";
import React, { useState } from 'react';

interface DeedTypeConfig {
  label: string;
  stampDutyPct: number;
  transferDutyPct: number;
  regFeePct: number;
  regFeeMin?: number;
  regFeeMax?: number;
}

const deedTypeConfigs: DeedTypeConfig[] = [
  {
    label: 'Sale Deed (Gram Panchayat)',
    stampDutyPct: 5.5,
    transferDutyPct: 0,
    regFeePct: 2,
  },
  {
    label: 'Sale Deed (Other Areas)',
    stampDutyPct: 5.5,
    transferDutyPct: 1.5,
    regFeePct: 0.5,
  },
  // Additional deed types can be added here following official data
];

export default function RegistrationCostsCalculator() {
  const [propertyValue, setPropertyValue] = useState<number>(0);
  const [selectedDeed, setSelectedDeed] = useState<DeedTypeConfig>(deedTypeConfigs[0]);

  const stampDuty = (propertyValue * selectedDeed.stampDutyPct) / 100;
  const transferDuty = (propertyValue * selectedDeed.transferDutyPct) / 100;
  let regFee = (propertyValue * selectedDeed.regFeePct) / 100;
  if (selectedDeed.regFeeMin !== undefined) {
    regFee = Math.max(regFee, selectedDeed.regFeeMin);
  }
  if (selectedDeed.regFeeMax !== undefined) {
    regFee = Math.min(regFee, selectedDeed.regFeeMax);
  }
  const total = stampDuty + transferDuty + regFee;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Property Registration Costs Calculator (Telangana)</h1>

      <div className="mb-4">
        <label className="block mb-1">Property Value (INR):</label>
        <input
          type="number"
          className="border p-2 w-full"
          value={propertyValue || ''}
          onChange={(e) => setPropertyValue(Number(e.target.value))}
          placeholder="Enter property value"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1">Select Deed Type:</label>
        <select
          className="border p-2 w-full"
          value={selectedDeed.label}
          onChange={(e) => {
            const config = deedTypeConfigs.find((d) => d.label === e.target.value);
            if (config) setSelectedDeed(config);
          }}
        >
          {deedTypeConfigs.map((d) => (
            <option key={d.label} value={d.label}>{d.label}</option>
          ))}
        </select>
      </div>

      <div className="bg-gray-100 p-4 rounded">
        <p><strong>Stamp Duty ({selectedDeed.stampDutyPct}%):</strong> ₹{stampDuty.toFixed(2)}</p>
        <p><strong>Transfer Duty ({selectedDeed.transferDutyPct}%):</strong> ₹{transferDuty.toFixed(2)}</p>
        <p><strong>Registration Fee ({selectedDeed.regFeePct}%):</strong> ₹{regFee.toFixed(2)}</p>
        <hr className="my-2" />
        <p className="text-lg font-semibold"><strong>Total:</strong> ₹{total.toFixed(2)}</p>
      </div>
    </div>
  );
}
