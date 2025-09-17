"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      // Call your backend to create user
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.message || "Registration failed.");
        return;
      }

      // ✅ Auto login after successful registration
      const loginRes = await signIn("credentials", {
        redirect: false,
        email: form.email,
        password: form.password,
      });

      if (loginRes?.ok) {
        router.push("/dashboard"); // 👈 Always redirect here
      } else {
        setError("Registered, but login failed. Please sign in manually.");
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-4 text-center">Register</h2>
        <form onSubmit={handleRegister} className="flex flex-col gap-3">
          <input
            type="email"
            placeholder="Email"
            className="border p-2 rounded"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          <input
            type="password"
            placeholder="Password"
            className="border p-2 rounded"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            type="submit"
            className="bg-green-600 text-white p-2 rounded hover:bg-green-700 transition"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}
