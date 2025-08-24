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
            
            {/* Why */}
            <section id="why">
              <h2 className="text-2xl mb-2 font-semibold">Why this matters now</h2>
              <p>
                Hyderabad’s urban fringe—Shankarpally, Chevella, Ibrahimpatnam, Tukkuguda, Shadnagar, Medchal, Yacharam, and beyond—has seen a surge of plot “ventures.” Alongside genuine projects, there’s been a spike in unauthorised layouts, fake approvals, and illegal sales that particularly hurt first-time, middle-class investors. Enforcement actions and public protests in the last few years show how widespread the problem is.
              </p>
            </section>

            {/* Fraud Patterns */}
            <section id="patterns">
              <h2 className="text-2xl mb-2 font-semibold">Common fraud patterns (with examples)</h2>
              {[
                ["Selling plots in unregistered or unauthorised ventures", [
                  "“Pre-launch” offers without RERA registration and HMDA/DTCP layout approval.",
                  "Buyers face endless delays and refund battles; regulators have levied fines and ordered refunds in multiple cases.",
                ]],
                ["Fake or misused approvals (LRS/HMDA/DTCP)", [
                  "Doctored approval letters or “approvals in process” used to collect booking amounts.",
                  "Misuse of LRS receipts during registrations to imply compliance.",
                ]],
                ["Ventures on assigned/government land", [
                  "Assigned agricultural land flipped into plots; such land can be resumed by the government, leaving buyers stranded.",
                ]],
                ["Encroachments and lake/FTL violations", [
                  "Plots advertised near lakes/parks that are actually encroachments.",
                  "Demolitions and litigation risk → potential total loss for buyers.",
                ]],
                ["Big-ticket developer defaults", [
                  "Non-delivery and non-refund complaints have led to protests and economic-offences investigations.",
                ]],
              ].map(([title, items], i) => (
                <div key={i} className="mt-4">
                  <h3 className="text-xl font-medium">{i+1}) {title}</h3>
                  <ul className="list-disc pl-6">
                    {(items as string[]).map((li, j) => <li key={j}>{li}</li>)}
                  </ul>
                </div>
              ))}
            </section>

            {/* Impact */}
            <section id="impact">
              <h2 className="text-2xl mb-2 font-semibold">How these scams crush middle-class families</h2>
              <ul className="list-disc pl-6 space-y-1">
                <li><strong>Savings wiped out:</strong> Advances for “pre-launch” plots get stuck for years; refunds are slow.</li>
                <li><strong>Rent + EMI trap:</strong> Borrowing for booking while paying rent creates a double burden.</li>
                <li><strong>Legal & mental stress:</strong> Chasing approvals and complaints drains health.</li>
                <li><strong>Opportunity cost:</strong> Money locked in dead projects misses genuine appreciation elsewhere.</li>
                <li><strong>Demolition risk:</strong> Illegal land may be resumed or razed → near-total loss.</li>
              </ul>
              <div className="inline-flex items-center gap-2 px-3 py-1 border border-[#5a2430] bg-[#271118] rounded-full text-xs text-[#ff98a4] mt-2">
                Risk asymmetry is highest for first-time buyers
              </div>
            </section>

            {/* Red Flags */}
            <section id="redflags">
              <h2 className="text-2xl mb-2 font-semibold">Red flags — walk away if you see these</h2>
              <ul className="list-disc pl-6 space-y-1">
                <li>“<strong>Pre-launch price</strong> — pay now, approvals next month.”</li>
                <li>“<strong>Farm plots with guaranteed returns</strong>” or assured buyback schemes.</li>
                <li>“<strong>Membership</strong> payment today, plot allotment later.”</li>
                <li>Brochures quoting <strong>fake LRS/HMDA numbers</strong>.</li>
                <li>Vague location pitches without exact <strong>survey numbers</strong>.</li>
              </ul>
            </section>

            {/* Checklist */}
            <section id="checklist">
              <h2 className="text-2xl mb-4 font-semibold">10-minute due-diligence checklist</h2>
              <div className="grid gap-3 bg-gradient-to-b from-[#0d1726] to-[#0b131f] border border-[#1c2636] rounded-xl p-5 shadow-lg">
                <h3 className="flex items-center gap-2 text-lg font-medium">Use this before you pay a single rupee</h3>
                {[
                  "RERA first stop: confirm project is registered.",
                  "Layout approval proof: ask for final HMDA/DTCP sanction.",
                  "Title & land type: verify ownership and classification.",
                  "On-ground verification: visit survey numbers, check infrastructure.",
                  "Document discipline: avoid GPA/AGPA, insist on registered sale deed.",
                  "Money trail: pay only via bank to registered entity.",
                  "Litigation & encroachment check: verify no buffer/government land.",
                ].map((step, i) => (
                  <div key={i} className="flex gap-2">
                    <div className="w-4 h-4 border-2 border-[#47d7ac] rounded mt-1"></div>
                    <p>{step}</p>
                  </div>
                ))}
              </div>
              <p className="border-l-4 border-[#4ca3ff] bg-[rgba(76,163,255,0.08)] rounded p-3 mt-3 text-sm">
                <strong>Tip:</strong> If a scheduled bank is financing plot loans in that project, it’s a positive (not foolproof) signal.
              </p>
            </section>

            {/* Already Paid */}
            <section id="already-paid">
              <h2 className="text-2xl mb-2 font-semibold">Already paid? Here’s what to do</h2>
              <ol className="list-decimal pl-6 space-y-2">
                <li><strong>Write to the promoter</strong> demanding compliance/refund.</li>
                <li><strong>File complaint with TG RERA</strong>; they can order refunds with interest.</li>
                <li><strong>Approach Economic Offences Wing</strong> if cheating suspected.</li>
                <li><strong>Alert authorities</strong> (HMDA/Collectorate) for encroachments/misuse.</li>
                <li><strong>Form buyers’ association</strong> for collective action.</li>
              </ol>
            </section>

            {/* Safer */}
            <section id="safer">
              <h2 className="text-2xl mb-2 font-semibold">A safer way to buy plots around Hyderabad</h2>
              <ul className="list-disc pl-6 space-y-1">
                <li><strong>Non-negotiables:</strong> RERA + Layout Sanction + Title opinion + EC before payment.</li>
                <li><strong>Location discipline:</strong> Prefer HMDA-approved layouts with infrastructure.</li>
                <li><strong>Start small:</strong> With new promoters, stagger payments.</li>
                <li><strong>Use a property lawyer:</strong> A ₹15–25k legal check can save lakhs.</li>
              </ul>
              <div className="inline-flex items-center gap-2 px-3 py-1 border border-[#1d3b2a] bg-[#0e1a13] rounded-full text-xs text-[#7de3a8] mt-2">
                Compliance beats discounts—every time
              </div>
            </section>

            {/* Bottom Line */}
            <section id="bottomline">
              <h2 className="text-2xl mb-2 font-semibold">Bottom line</h2>
              <p>
                The Hyderabad plot market offers real opportunities—but the <strong>risk asymmetry</strong> is highest for middle-class buyers targeted by flashy pre-launch pitches. Make compliance your gate: verify RERA registration, insist on final layout approval, check title/land type, and keep all payments traceable. If something feels off, walk away—there will always be another plot, but not another you.
              </p>
            </section>
          </article>

          <footer className="text-center text-[#9fb3c8] mt-6 text-sm">
            <p>© 2025 Buyer Awareness — You’re free to reuse this page with attribution. Designed for print-friendly export.</p>
          </footer>
        </main>
      </div>
    </div>
  );
}
