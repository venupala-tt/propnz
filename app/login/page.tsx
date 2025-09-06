"use client";
import { signIn } from "next-auth/react";

export default function LoginPage() {
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const email = (e.target as any).email.value;
    const password = (e.target as any).password.value;

    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (res?.error) alert(res.error);
    else window.location.href = "/dashboard";
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="p-6 bg-white rounded-xl shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        <input name="email" type="email" placeholder="Email" className="w-full mb-2 p-2 border rounded" />
        <input name="password" type="password" placeholder="Password" className="w-full mb-4 p-2 border rounded" />
        <button className="w-full bg-green-600 text-white p-2 rounded">Login</button>
      </form>
    </div>
  );
}
