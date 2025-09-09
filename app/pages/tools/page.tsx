"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ToolsPage() {
  const [activeTab, setActiveTab] = useState("india");

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.4,
        type: "spring",
        stiffness: 120,
        damping: 12,
      },
    }),
    hover: {
      scale: 1.05,
      y: -5,
      boxShadow: "0px 8px 20px rgba(0,0,0,0.2)",
      transition: { duration: 0.2 },
    },
  };

  return (
    <main
      className="flex min-h-screen flex-col items-center justify-center 
      p-6 sm:p-12 lg:p-24 
      bg-gradient-to-br from-blue-100 via-white to-purple-100 
      animate-gradientWave"
    >
      <div
        className="w-full max-w-6xl rounded-2xl shadow-lg 
        bg-white/80 backdrop-blur-sm p-8 sm:p-12 
        animate-fadeInBounce"
      >
        {/* Top-right button */}
        <div className="flex justify-end mb-6">
          <Link
            href="../pages/book-an-expert"
            className="px-6 py-3 rounded-xl shadow-lg font-semibold text-white 
                       bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 
                       hover:opacity-90 transition"
          >
            Book Our Expert
          </Link>
        </div>

        <h1
          className="text-3xl sm:text-4xl font-bold text-center mb-6 
          bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 
          bg-clip-text text-transparent animate-gradientWave"
        >
          Property Tools
        </h1>

        <p className="text-gray-600 text-center mb-10">
          Explore our handy property calculators and tools to make informed
          investment decisions.
        </p>

        {/* Tabs */}
        <div className="flex justify-center mb-8 space-x-4 border-b border-gray-300">
          <button
            onClick={() => setActiveTab("india")}
            className={`px-6 py-2 font-semibold transition relative ${
              activeTab === "india"
                ? "text-blue-600 border-b-4 border-blue-600"
                : "text-gray-700 hover:text-blue-600"
            }`}
          >
            India
          </button>
          <button
            onClick={() => setActiveTab("usa")}
            className={`px-6 py-2 font-semibold transition relative ${
              activeTab === "usa"
                ? "text-blue-600 border-b-4 border-blue-600"
                : "text-gray-700 hover:text-blue-600"
            }`}
          >
            USA
          </button>
        </div>

        {/* Tools Grid with Animation */}
        <AnimatePresence mode="wait">
          {activeTab === "india" && (
            <motion.div
              key="india"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 30 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center"
            >
              {[
                {
                  href: "../pages/roi",
                  label: "Investing in Property?? visit our ROI Calculator",
                  color: "from-blue-600 to-purple-500",
                },
                {
                  href: "../pages/intdesgncalc",
                  label: "Interior Design Calculator",
                  color: "from-green-600 to-teal-500",
                },
                {
                  href: "../pages/regcalc",
                  label: "Property Registration Costs Calculator",
                  color: "from-green-600 to-teal-500",
                },
                {
                  href: "../pages/rcalc",
                  label: "Real Estate Units Converter",
                  color: "from-green-600 to-teal-500",
                },
                {
                  href: "../pages/fdroi",
                  label: "Flats Development ROI Calculator for Land Owner",
                  color: "from-green-600 to-teal-500",
                },
                {
                  href: "../pages/suroi",
                  label: "Single Unit Flats ROI Calculator",
                  color: "from-indigo-600 to-blue-500",
                },
                {
                  href: "../pages/cgc",
                  label: "Capital Gains Calculator",
                  color: "from-green-600 to-teal-500",
                },
                {
                  href: "../pages/more",
                  label: "More...",
                  color: "from-pink-500 to-red-500",
                },
              ].map((tool, idx) => (
                <motion.div
                  key={idx}
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  custom={idx}
                  whileHover="hover"
                >
                  <Link
                    href={tool.href}
                    className={`block rounded-lg shadow-lg p-6 bg-gradient-to-r ${tool.color} text-white hover:shadow-xl transition-all`}
                  >
                    <h2 className="text-lg font-semibold">{tool.label}</h2>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          )}

          {activeTab === "usa" && (
            <motion.div
              key="usa"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center"
            >
              {[
                {
                  href: "../pages/rcalc",
                  label: "🏗️ Real Estate Unit Converter",
                  color: "from-green-600 to-teal-500",
                },
                {
                  href: "../pages/suroi",
                  label: "Single Unit Reselling ROI Calculator",
                  color: "from-indigo-600 to-blue-500",
                },
                {
                  href: "../pages/mfroi",
                  label: "Multifamily ROI Calculator (USA)",
                  color: "from-green-600 to-teal-500",
                },
                {
                  href: "../pages/cgc",
                  label: "🏠 Capital Gains Calculator",
                  color: "from-green-600 to-teal-500",
                },
              ].map((tool, idx) => (
                <motion.div
                  key={idx}
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  custom={idx}
                  whileHover="hover"
                >
                  <Link
                    href={tool.href}
                    className={`block rounded-lg shadow-lg p-6 bg-gradient-to-r ${tool.color} text-white hover:shadow-xl transition-all`}
                  >
                    <h2 className="text-lg font-semibold">{tool.label}</h2>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}
