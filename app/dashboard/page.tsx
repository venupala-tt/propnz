"use client";

import { useSession, signOut } from "next-auth/react";

export default function DashboardPage() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (!session) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <p>You are not logged in.</p>
        <a href="/login" className="mt-2 text-blue-600 underline">Go to Login</a>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold">Welcome, {session.user?.name}</h1>
      <p>Email: {session.user?.email}</p>
      <button
        className="mt-4 bg-red-600 text-white p-2 rounded"
        onClick={() => signOut()}
      >
        Logout
      </button>
    </div>
  );
}
