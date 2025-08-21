import Link from "next/link";
import { Package, Box } from "lucide-react";

export default function ProductsPage() {
  return (
    <main
      className="flex min-h-screen flex-col items-center justify-center 
      p-6 sm:p-12 lg:p-24 
      bg-gradient-to-br from-blue-100 via-white to-purple-100 
      animate-gradientWave"
    >
      <div
        className="w-full max-w-5xl rounded-2xl shadow-lg 
        bg-white/80 backdrop-blur-sm p-8 sm:p-12 
        animate-fadeInBounce"
      >
        <h2
          className="text-3xl sm:text-4xl font-bold text-center mb-12 
          bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 
          bg-clip-text text-transparent animate-gradientWave"
        >
          Our Products
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Product Card 1 */}
          <Link
            href="/products/junction-box"
            className="group p-6 rounded-xl bg-white shadow-md hover:shadow-xl 
            transition-all duration-300 transform hover:-translate-y-2"
          >
            <div className="flex items-center justify-center w-16 h-16 rounded-full 
              bg-gradient-to-r from-blue-500 to-purple-500 text-white mb-4">
              <Box size={32} />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-gray-800">
              Junction Box
            </h3>
            <p className="text-gray-600 text-sm">
              High-quality, durable junction boxes for electrical installations.
            </p>
          </Link>

          {/* Product Card 2 */}
          <Link
            href="/products/more-coming-soon"
            className="group p-6 rounded-xl bg-white shadow-md hover:shadow-xl 
            transition-all duration-300 transform hover:-translate-y-2"
          >
            <div className="flex items-center justify-center w-16 h-16 rounded-full 
              bg-gradient-to-r from-pink-500 to-purple-500 text-white mb-4">
              <Package size={32} />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-gray-800">
              More Coming Soon...
            </h3>
            <p className="text-gray-600 text-sm">
              We are working on exciting new products. Stay tuned!
            </p>
          </Link>
        </div>
      </div>
    </main>
  );
}
