// app/dashboard/page.tsx
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/route"; // 👈 adjust path if needed

export default async function DashboardPage() {
  // Get user session from NextAuth
  const session = await getServerSession(authOptions);

  // If no session → redirect to home (or login page)
  if (!session) {
    redirect("/");
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Welcome to your Dashboard 🎉</h1>
      <p className="mt-2">Hi {session.user?.email}, you are logged in ✅</p>
    </div>
  );
}
