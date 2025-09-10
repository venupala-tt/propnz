{/* Quick Info Section as Hover Tip */}
<div className="mb-10 text-center relative group inline-block">
  <h2 className="text-xl font-semibold text-purple-700 mb-3 flex items-center justify-center gap-2 cursor-pointer">
    Why Book Our Expert?
    <span className="text-gray-500 hover:text-purple-600">ℹ️</span>
  </h2>
  {/* Tooltip content */}
  <div
    className="absolute left-1/2 transform -translate-x-1/2 mt-2 w-72 
               rounded-lg bg-gray-800 text-white text-sm p-4 shadow-lg 
               opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
  >
    <ul className="list-disc list-inside space-y-1 text-left">
      <li>Get personalized guidance tailored to your needs</li>
      <li>Save time with professional expertise</li>
      <li>Trusted advice on property, documentation, and planning</li>
    </ul>
  </div>
</div>
