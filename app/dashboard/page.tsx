import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../../lib/auth"; // 👈 import from lib

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) redirect("/");

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Welcome to your Dashboard 🎉</h1>
      <p className="mt-2">Hi {session.user?.email}, you are logged in ✅</p>
    </div>
  );
}
