import Link from "next/link";
import { Package, Wrench, FileText } from "lucide-react";
import SearchBar from "../components/SearchBar";
import NotificationsTicker from "../components/NotificationsTicker";
import client from "./lib/contentful";

// ✅ Fetch notifications from Contentful
async function getNotifications() {
  const entries = await client.getEntries({
    content_type: "notification",
    order: ["-fields.date"],
    limit: 10,
  });

  return entries.items.map((item: any) => {
    const date = item.fields.date
      ? new Date(item.fields.date).toLocaleDateString("en-GB")
      : new Date(item.sys.createdAt).toLocaleDateString("en-GB");

    return {
      date,
      title: item.fields.title || "",
      subject: item.fields.subject || "",
      url: item.fields.document?.fields?.file?.url
        ? `https:${item.fields.document.fields.file.url}`
        : "#",
    };
  });
}

export default async function HomePage() {
  const notifications = await getNotifications();

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-blue-100 via-white to-purple-100 animate-gradientWave">
      {/* ====== LEFT MAIN CONTENT ====== */}
      <main className="flex-1 flex flex-col items-center justify-start p-4 sm:p-8 lg:p-16">
        {/* Hero + Search Section */}
        <div className="w-full max-w-5xl rounded-xl shadow-md bg-white/80 backdrop-blur-sm p-6 sm:p-10 animate-fadeInBounce flex flex-col sm:flex-row items-center sm:items-start sm:justify-between gap-6">
          {/* Hero Content */}
          <div className="w-full sm:w-2/3 rounded-xl shadow-md bg-white/80 backdrop-blur-sm p-4 sm:p-6 animate-fadeInBounce flex flex-col gap-4">
            <h2 className="text-lg font-semibold">
              Learn & Build scalable, Property Solutions
            </h2>
            <Link
              href="/pages/book-an-expert"
              className="px-6 py-3 rounded-xl shadow-lg font-semibold text-white 
                         bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 
                         hover:opacity-90 transition"
            >
              Reach Our Property Expert
            </Link>
          </div>

          {/* Search Box */}
          <div className="w-full sm:w-1/3 flex flex-col items-center sm:items-end">
            <h2 className="text-lg font-semibold mb-2">Property Search</h2>
            <SearchBar />
          </div>
        </div>

        {/* Highlights Section */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-8 w-full max-w-5xl">
          <Link
            href="/products"
            className="group p-4 rounded-lg bg-white shadow-md hover:shadow-xl 
            transition-all duration-300 transform hover:-translate-y-2 
            bg-white/80 backdrop-blur-sm animate-fadeInBounce"
          >
            <div className="flex items-center justify-center w-14 h-14 rounded-full 
              bg-gradient-to-r from-blue-500 to-purple-500 text-white mb-3">
              <Package size={24} />
            </div>
            <h3 className="text-lg font-semibold mb-1 text-gray-800">Products</h3>
            <p className="text-gray-600 text-sm">
              Browse our innovative property-related products designed for performance and scalability.
            </p>
          </Link>

          <Link
            href="/services"
            className="group p-4 rounded-lg bg-white shadow-md hover:shadow-xl 
            transition-all duration-300 transform hover:-translate-y-2 
            bg-white/80 backdrop-blur-sm animate-fadeInBounce"
          >
            <div className="flex items-center justify-center w-14 h-14 rounded-full 
              bg-gradient-to-r from-pink-500 to-purple-500 text-white mb-3">
              <Wrench size={24} />
            </div>
            <h3 className="text-lg font-semibold mb-1 text-gray-800">Services</h3>
            <p className="text-gray-600 text-sm">
              Explore our expert services ranging from planning to documentation and beyond.
            </p>
          </Link>

          <Link
            href="/blog"
            className="group p-4 rounded-lg bg-white shadow-md hover:shadow-xl 
            transition-all duration-300 transform hover:-translate-y-2 
            bg-white/80 backdrop-blur-sm animate-fadeInBounce"
          >
            <div className="flex items-center justify-center w-14 h-14 rounded-full 
              bg-gradient-to-r from-green-500 to-blue-500 text-white mb-3">
              <FileText size={24} />
            </div>
            <h3 className="text-lg font-semibold mb-1 text-gray-800">Blog</h3>
            <p className="text-gray-600 text-sm">
              Read our latest insights, tips, and guides for the property industry.
            </p>
          </Link>
        </div>
      </main>

      {/* ====== RIGHT CTA SIDEBAR ====== */}
      <aside className="hidden lg:flex w-80 flex-col p-4 bg-white/80 backdrop-blur-md shadow-xl border-l border-gray-200 animate-fadeInBounce">
        {/* Notifications */}
        <div className="rounded-xl shadow-lg p-4 bg-white/90 backdrop-blur-sm mb-6 flex flex-col h-80">
          <h3 className="text-xl font-semibold mb-4 text-gray-800">Latest Notifications</h3>
          <div className="flex-1 overflow-hidden">
            <NotificationsTicker items={notifications} speed="slow" />
          </div>
        </div>

        {/* CTA Cards */}
        <div className="flex flex-col gap-4">
          {/* Card 1 */}
          <div className="rounded-xl shadow-lg p-4 bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 text-white hover:shadow-xl transition-all duration-300 animate-fadeInBounce">
            <Link href="/services/interior-designer" className="block mb-2 font-semibold hover:underline">
              Building a New Property? Make it perfect with our Planning and Designing Services
            </Link>
            <Link href="/services/vaastu-services" className="block font-semibold hover:underline">
              Make Your Property Vaastu Compliant Now
            </Link>
          </div>

          {/* Card 2 */}
          <div className="rounded-xl shadow-lg p-4 bg-gradient-to-r from-blue-600 via-teal-500 to-green-500 text-white hover:shadow-xl transition-all duration-300 animate-fadeInBounce">
            <Link
              href="/services/digital-services"
              className="block font-semibold hover:underline"
            >
              Are you a Builder or Developer? Visit our Digital Services Now
            </Link>
          </div>

          {/* Card 3 */}
          <div className="rounded-xl shadow-lg p-4 bg-gradient-to-r from-green-600 via-teal-500 to-blue-500 text-white hover:shadow-xl transition-all duration-300 animate-fadeInBounce text-center">
            <Link href="/pages/tools"
              className="block font-semibold hover:underline"
            >
              Access powerful tools to calculate ROI, capital gains, and more.
            </Link>
          </div>
        </div>
      </aside>
    </div>
  );
}
