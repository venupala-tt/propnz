import Link from "next/link";
import { Package, Wrench, FileText } from "lucide-react";

export default function HomePage() {
  return (
    <main
      className="flex min-h-screen flex-col items-center justify-center 
      p-6 sm:p-12 lg:p-24 
      bg-gradient-to-br from-blue-100 via-white to-purple-100 
      animate-gradientWave"
    >
      {/* Hero Section */}
      <div
        className="w-full max-w-4xl rounded-2xl shadow-lg 
        bg-white/80 backdrop-blur-sm p-8 sm:p-12 
        animate-fadeInBounce text-center"
      >
        <h1
          className="text-4xl sm:text-5xl font-bold mb-6 
          bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 
          bg-clip-text text-transparent animate-gradientWave"
        >
          PropMatics
        </h1>

        <p className="text-lg text-gray-700 max-w-2xl mx-auto mb-6">
          Learn & Build scalable, performant, and visually appealing property
          solutions.
        </p>

      </div>

      {/* Highlights Section */}
      <div
        className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-12 w-full max-w-5xl"
      >
        {/* Products Card */}
        <Link
          href="/products"
          className="group p-6 rounded-xl bg-white shadow-md hover:shadow-xl 
          transition-all duration-300 transform hover:-translate-y-2 
          bg-white/80 backdrop-blur-sm animate-fadeInBounce"
        >
          <div className="flex items-center justify-center w-16 h-16 rounded-full 
            bg-gradient-to-r from-blue-500 to-purple-500 text-white mb-4">
            <Package size={28} />
          </div>
          <h3 className="text-xl font-semibold mb-2 text-gray-800">
            Products
          </h3>
          <p className="text-gray-600 text-sm">
            Browse our innovative property-related products designed for performance and scalability.
          </p>
        </Link>

        {/* Services Card */}
        <Link
          href="/services"
          className="group p-6 rounded-xl bg-white shadow-md hover:shadow-xl 
          transition-all duration-300 transform hover:-translate-y-2 
          bg-white/80 backdrop-blur-sm animate-fadeInBounce"
        >
          <div className="flex items-center justify-center w-16 h-16 rounded-full 
            bg-gradient-to-r from-pink-500 to-purple-500 text-white mb-4">
            <Wrench size={28} />
          </div>
          <h3 className="text-xl font-semibold mb-2 text-gray-800">
            Services
          </h3>
          <p className="text-gray-600 text-sm">
            Explore our expert services ranging from planning to documentation and beyond.
          </p>
        </Link>

        {/* Blog Card */}
        <Link
          href="/blog"
          className="group p-6 rounded-xl bg-white shadow-md hover:shadow-xl 
          transition-all duration-300 transform hover:-translate-y-2 
          bg-white/80 backdrop-blur-sm animate-fadeInBounce"
        >
          <div className="flex items-center justify-center w-16 h-16 rounded-full 
            bg-gradient-to-r from-green-500 to-blue-500 text-white mb-4">
            <FileText size={28} />
          </div>
          <h3 className="text-xl font-semibold mb-2 text-gray-800">
            Blog
          </h3>
          <p className="text-gray-600 text-sm">
            Read our latest insights, tips, and guides for the property industry.
          </p>
        </Link>
      </div>
 <div
        className="w-full max-w-4xl rounded-2xl shadow-lg 
        bg-white/80 backdrop-blur-sm p-8 sm:p-12 
        animate-fadeInBounce text-center"
      >
        <Link
          href="/products"
          className="inline-block px-6 py-3 rounded-lg font-semibold text-white 
          bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 
          hover:from-blue-700 hover:via-purple-600 hover:to-pink-600 
          transition-all duration-300 animate-fadeInBounce"
        >
          Explore Our Products →
        </Link>
      </div>
    </main>
  );
}
