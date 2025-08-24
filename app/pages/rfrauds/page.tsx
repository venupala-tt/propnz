"use client";
import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react"; // icon from lucide-react

export default function Page() {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowTop(window.scrollY > 250);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      id="top"
      className="min-h-screen bg-gradient-to-b from-[#0b0f14] via-[#0a0e13] to-[#0b111b] text-[#e7eef7] font-sans"
    >
      <div className="max-w-5xl mx-auto p-7">
        
        {/* Header */}
        <header className="relative my-3 mb-6 border border-[#1c2636] rounded-2xl shadow-xl bg-gradient-to-br from-[#101622] via-[#0f141f] to-[#0b111b] animate-fadeInBounce">
          {/* ... hero + sidebar ... */}
        </header>

        {/* Main Content */}
        <main>
          <article className="bg-gradient-to-b from-[#0f1626] to-[#0b121e] border border-[#1c2636] rounded-xl p-6 shadow-xl space-y-10 animate-fadeInBounce">
            {/* ... all sections (why, patterns, impact, etc.) without inline back-to-top links ... */}
          </article>

          <footer className="text-center text-[#9fb3c8] mt-6 text-sm">
            <p>
              © 2025 Buyer Awareness — You’re free to reuse this page with
              attribution. Designed for print-friendly export.
            </p>
          </footer>
        </main>
      </div>

      {/* Floating Back to Top Button */}
      {showTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-6 right-6 p-3 rounded-full bg-gradient-to-r from-[#152036] to-[#0d1526] border border-[#1c2636] text-[#8cc8ff] shadow-lg hover:opacity-90 transition animate-fadeInBounce"
          aria-label="Back to top"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}
    </div>
  );
}
