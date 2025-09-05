import Link from "next/link";
import { Package, Wrench, FileText } from "lucide-react";
import dynamic from "next/dynamic";
import SearchBar from "../components/SearchBar";

export default function HomePage() {
  return (
    <div className="flex items-start">
      <main
        className="flex-1 flex min-h-screen flex-col items-center justify-start 
        p-4 sm:p-8 lg:p-16 
        bg-gradient-to-br from-blue-100 via-white to-purple-100 
        animate-gradientWave"
      >
        {/* Property Search moved to top-right and sticky */}
        <div className="w-full flex justify-center sm:justify-end items-center mb-4 sticky top-0 z-50 bg-gradient-to-br from-blue-100 via-white to-purple-100 p-2 shadow-md">
          <div className="flex flex-col items-center sm:items-end w-full sm:w-auto">
            <h1 className="text-lg font-semibold mb-2">Property Search</h1>
            <SearchBar />
          </div>
        </div>

        {/* Hero Section */}
        <div
          className="w-full max-w-4xl rounded-xl shadow-md 
          bg-white/80 backdrop-blur-sm p-6 sm:p-8 
          animate-fadeInBounce text-center"
        >
          <h1
            className="text-3xl sm:text-4xl font-bold mb-4 
            bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 
            bg-clip-text text-transparent animate-gradientWave"
          >
            PropMatics
          </h1>

          {/* Subheading + Book Our Expert inline (responsive) */}
          <div className="w-full flex flex-col sm:flex-row sm:items-center sm:justify-between max-w-4xl mx-auto mb-4 gap-3">
            <p className="text-base text-gray-700 text-center sm:text-left">
              Learn & Build scalable, performant, and visually appealing property solutions.
            </p>

            <Link
              href="/pages/book-an-expert"
              className="px-6 py-3 rounded-xl shadow-lg font-semibold text-white 
                         bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 
                         hover:opacity-90 transition text-center sm:text-left"
            >
              Book Our Expert
            </Link>
          </div>
        </div>

        {/* Highlights Section */}
        <div
          className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-8 w-full max-w-5xl"
        >
          {/* Products Card */}
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
            <h3 className="text-lg font-semibold mb-1 text-gray-800">
              Products
            </h3>
            <p className="text-gray-600 text-sm">
              Browse our innovative property-related products designed for performance and scalability.
            </p>
          </Link>

          {/* Services Card */}
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
            <h3 className="text-lg font-semibold mb-1 text-gray-800">
              Services
            </h3>
            <p className="text-gray-600 text-sm">
              Explore our expert services ranging from planning to documentation and beyond.
            </p>
          </Link>

          {/* Blog Card */}
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
            <h3 className="text-lg font-semibold mb-1 text-gray-800">
              Blog
            </h3>
            <p className="text-gray-600 text-sm">
              Read our latest insights, tips, and guides for the property industry.
            </p>
          </Link>
        </div>

        {/* CTA Section as Cards */}
        <div
          className="w-full max-w-5xl grid grid-cols-1 sm:grid-cols-2 gap-6 mt-10"
        >
          {/* Explore Our Products Card */}
          <Link
            href="/products"
            className="block rounded-xl shadow-lg p-6 text-center bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 text-white hover:shadow-xl transition-all duration-300 animate-fadeInBounce"
          >
            <h3 className="text-xl font-semibold mb-2">Explore Our Products</h3>
            <p className="text-sm opacity-90">
              Discover our full range of property solutions tailored to your needs.
            </p>
          </Link>

          {/* Property Tools Card */}
          <Link
            href="/pages/tools"
            className="block rounded-xl shadow-lg p-6 text-center bg-gradient-to-r from-green-600 via-teal-500 to-blue-500 text-white hover:shadow-xl transition-all duration-300 animate-fadeInBounce"
          >
            <h3 className="text-xl font-semibold mb-2">Property Tools for You</h3>
            <p className="text-sm opacity-90">
              Access powerful tools to calculate ROI, capital gains, and more.
            </p>
          </Link>
        </div>
      </main>
    </div>
  );
}
