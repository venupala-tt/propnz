// components/RightSidebar.tsx
import Link from "next/link";

export default function RightSidebar() {
  return (
    <aside className="fixed right-0 top-0 h-full w-64 bg-gray-100 shadow-lg p-6 flex flex-col">
      <h2 className="text-lg font-bold mb-6 text-gray-700">Tools</h2>
      <nav className="flex flex-col space-y-4">
        <Link
          href="/roi"
          className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
        >
          ROI Calculator
        </Link>
        <Link
          href="/tax"
          className="px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 transition"
        >
          Capital Gain Calculator
        </Link>
      </nav>
    </aside>
  );
}