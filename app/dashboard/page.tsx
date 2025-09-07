"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4">
      <div className="w-full max-w-md bg-white p-6 rounded-2xl shadow-md text-center">
        <h1 className="text-2xl font-bold mb-4">Welcome, {session?.user?.name || "User"} 👋</h1>
        <p className="mb-6 text-gray-600">
          You are logged in with <span className="font-semibold">{session?.user?.email}</span>
        </p>
        <button
          onClick={() => signOut({ callbackUrl: "/login" })}
          className="bg-red-600 text-white p-2 rounded hover:bg-red-700 transition"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
