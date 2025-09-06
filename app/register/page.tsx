"use client";
import { useState } from "react";

export default function RegisterPage() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      alert("Registered! You can login now.");
      window.location.href = "/login";
    } else {
      const data = await res.json();
      alert(data.error);
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="p-6 bg-white rounded-xl shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-4">Register</h2>
        <input type="text" placeholder="Name" className="w-full mb-2 p-2 border rounded"
          onChange={(e) => setForm({ ...form, name: e.target.value })} />
        <input type="email" placeholder="Email" className="w-full mb-2 p-2 border rounded"
          onChange={(e) => setForm({ ...form, email: e.target.value })} />
        <input type="password" placeholder="Password" className="w-full mb-4 p-2 border rounded"
          onChange={(e) => setForm({ ...form, password: e.target.value })} />
        <button className="w-full bg-blue-600 text-white p-2 rounded">Register</button>
      </form>
    </div>
  );
}
