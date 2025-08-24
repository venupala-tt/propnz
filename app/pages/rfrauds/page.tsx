export default function Page() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0b0f14] via-[#0a0e13] to-[#0b111b] text-[#e7eef7] font-sans">
      <div className="max-w-5xl mx-auto p-7">
        {/* Header */}
        <header className="relative my-3 mb-6 border border-[#1c2636] rounded-2xl shadow-xl bg-gradient-to-br from-[#101622] via-[#0f141f] to-[#0b111b] animate-fadeInBounce">
          <div className="grid grid-cols-1 md:grid-cols-[1.2fr,0.8fr] gap-5 p-8">
            
            {/* Hero Text */}
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs text-[#9fb3c8] border border-[#1c2636] bg-gradient-to-r from-[#152036] to-[#0d1526] animate-gradientWave bg-[length:200%_200%]">
                <span className="w-2.5 h-2.5 rounded-full bg-[#47d7ac] shadow-[0_0_0_6px_rgba(71,215,172,0.15)]"></span>
                Buyer Awareness • Hyderabad Region
              </div>
              <h1 className="text-[clamp(26px,4.2vw,44px)] leading-tight font-bold">
                Hyderabad’s Plot & Venture Scams: What’s Happening—and How Middle-Class Investors Can Stay Safe
              </h1>
              <p className="text-[#9fb3c8] max-w-[60ch]">
                A practical explainer on the most common fraud patterns around Hyderabad’s outskirts
                (plots, ventures, “pre-launch” offers), why middle-class families are hit hardest,
                and a step-by-step checklist to avoid losses—and act fast if you’ve already paid.
              </p>
              <div className="flex flex-wrap gap-2">
                {["HMDA / DTCP", "RERA compliance", "Assigned land", "Lake & FTL buffers"].map((tag) => (
                  <span key={tag} className="inline-block border border-[#1c2636] bg-[#0c121d] rounded-lg px-2.5 py-1 text-xs text-[#9fb3c8]">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Sidebar */}
            <aside className="grid gap-4">
              <nav className="sticky top-4 bg-gradient-to-b from-[#0f1626] to-[#0b121e] border border-[#1c2636] rounded-xl p-4 shadow-lg animate-fadeInBounce">
                <h3 className="text-sm text-[#9fb3c8] mb-2">Quick Navigation</h3>
                {[
                  ["#why", "Why this matters now"],
                  ["#patterns", "Fraud patterns"],
                  ["#impact", "Impact on middle-class buyers"],
                  ["#redflags", "Red flags"],
                  ["#checklist", "10-minute due-diligence"],
                  ["#already-paid", "Already paid? Do this"],
                  ["#safer", "Safer way to buy"],
                  ["#bottomline", "Bottom line"],
                ].map(([href, label]) => (
                  <a
                    key={href}
                    href={href}
                    className="block text-[#8cc8ff] py-1 border-b border-dashed border-[rgba(140,200,255,0.18)] hover:opacity-90 transition"
                  >
                    {label}
                  </a>
                ))}
              </nav>
              <div className="bg-gradient-to-b from-[#0f1626] to-[#0b121e] border border-[#1c2636] rounded-xl p-4 text-sm shadow-lg">
                <strong>Save & share:</strong>
                <p className="mt-1">
                  Print this page (Ctrl/Cmd+P) or export to PDF and share the checklist with friends and family before they book a plot.
                </p>
              </div>
            </aside>
          </div>
        </header>

        {/* Main Content */}
        <main>
          <article className="bg-gradient-to-b from-[#0f1626] to-[#0b121e] border border-[#1c2636] rounded-xl p-6 shadow-xl space-y-10 animate-fadeInBounce">
            
            {/* Sections (why, patterns, impact, redflags, checklist, already-paid, safer, bottomline) */}
            {/* ... (reuse the expanded sections from previous version, keeping Tailwind classes) ... */}
            
          </article>

          <footer className="text-center text-[#9fb3c8] mt-6 text-sm">
            <p>© 2025 Buyer Awareness — You’re free to reuse this page with attribution. Designed for print-friendly export.</p>
          </footer>
        </main>
      </div>
    </div>
  );
}
