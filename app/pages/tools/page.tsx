import Link from "next/link";

export default function ToolsPage() {
  return (
    <section className="px-6 py-12 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Property Tools</h1>
      <p className="text-gray-600 text-center mb-10">
        Explore our handy property calculators and tools to make informed
        investment decisions.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
        {/* ROI Calculator */}
        <Link
          href="../pages/roi"
          className="block rounded-lg shadow-lg p-6 bg-gradient-to-r from-blue-600 to-purple-500 text-white hover:shadow-xl transition-all"
        >
          <h2 className="text-lg font-semibold">
            Investing in Property?? visit our ROI Calculator
          </h2>
        </Link>

         {/* Interior Design Calculator */}
        <Link
          href="../pages/intdesgncalc"
          className="block rounded-lg shadow-lg p-6 bg-gradient-to-r from-green-600 to-teal-500 text-white hover:shadow-xl transition-all"
        >
          <h2 className="text-lg font-semibold">Interior Design Calculator</h2>
        </Link>

        {/* Capital Gains Calculator */}
        <Link
          href="../pages/cgc"
          className="block rounded-lg shadow-lg p-6 bg-gradient-to-r from-green-600 to-teal-500 text-white hover:shadow-xl transition-all"
        >
          <h2 className="text-lg font-semibold">Capital Gains Calculator</h2>
        </Link>

 {/* Property Registration Costs Calculator */}
        <Link
          href="../pages/regcalc"
          className="block rounded-lg shadow-lg p-6 bg-gradient-to-r from-green-600 to-teal-500 text-white hover:shadow-xl transition-all"
        >
          <h2 className="text-lg font-semibold">Property Registration Costs Calculator</h2>
        </Link>
        
        {/* Real Estate Units Converter */}
        <Link
          href="../pages/rcalc"
          className="block rounded-lg shadow-lg p-6 bg-gradient-to-r from-green-600 to-teal-500 text-white hover:shadow-xl transition-all"
        >
          <h2 className="text-lg font-semibold">Real Estate Units Converter</h2>
        </Link>

        {/* Flats Development ROI Calculator for Land Owner */}
        <Link
          href="../pages/fdroi"
          className="block rounded-lg shadow-lg p-6 bg-gradient-to-r from-green-600 to-teal-500 text-white hover:shadow-xl transition-all"
        >
          <h2 className="text-lg font-semibold">
            Flats Development ROI Calculator for Land Owner
          </h2>
        </Link>

        {/* Single Unit Flats ROI Calculator */}
        <Link
          href="../pages/suroi"
          className="block rounded-lg shadow-lg p-6 bg-gradient-to-r from-indigo-600 to-blue-500 text-white hover:shadow-xl transition-all"
        >
          <h2 className="text-lg font-semibold">
            Single Unit Flats ROI Calculator
          </h2>
        </Link>

        {/* More Tools */}
        <Link
          href="../pages/more"
          className="block rounded-lg shadow-lg p-6 bg-gradient-to-r from-pink-500 to-red-500 text-white hover:shadow-xl transition-all"
        >
          <h2 className="text-lg font-semibold">More...</h2>
        </Link>
      </div>
    </section>
  );
}
