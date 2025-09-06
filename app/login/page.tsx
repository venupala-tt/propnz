"use client";

import { signIn } from "next-auth/react";

export default function LoginPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-xl font-bold mb-4">Login</h1>
      <button
        onClick={() => signIn("credentials")}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Login with Credentials
      </button>
    </div>
  );
}
