export default function Page() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0b0f14] via-[#0a0e13] to-[#0b111b] text-[#e7eef7] font-sans">
      <div className="max-w-5xl mx-auto p-7">
        {/* Header */}
        <header className="relative my-3 mb-6 border border-[#1c2636] rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.35)] bg-gradient-radial from-[#152036] to-[#101622]">
          <div className="grid grid-cols-1 md:grid-cols-[1.2fr,0.8fr] gap-5 p-8">
            {/* Hero Text */}
            <div>
              <div className="inline-flex items-center gap-2 bg-[#152138] border border-[#1c2636] rounded-full px-3 py-1 text-xs text-[#9fb3c8]">
                <span className="w-2.5 h-2.5 rounded-full bg-[#47d7ac] shadow-[0_0_0_8px_rgba(71,215,172,0.12)]"></span>
                Buyer Awareness • Hyderabad Region
              </div>
              <h1 className="text-[clamp(26px,4.2vw,44px)] leading-tight my-3">
                Hyderabad’s Plot & Venture Scams: What’s Happening—and How Middle-Class Investors Can Stay Safe
              </h1>
              <p className="text-[#9fb3c8] max-w-[60ch]">
                A practical explainer on the most common fraud patterns around Hyderabad’s outskirts
                (plots, ventures, “pre-launch” offers), why middle-class families are hit hardest,
                and a step-by-step checklist to avoid losses—and act fast if you’ve already paid.
              </p>
              <div className="mt-3 space-x-2">
                <span className="inline-block border border-[#1c2636] bg-[#0c121d] rounded-lg px-2.5 py-1 text-xs text-[#9fb3c8]">HMDA / DTCP</span>
                <span className="inline-block border border-[#1c2636] bg-[#0c121d] rounded-lg px-2.5 py-1 text-xs text-[#9fb3c8]">RERA compliance</span>
                <span className="inline-block border border-[#1c2636] bg-[#0c121d] rounded-lg px-2.5 py-1 text-xs text-[#9fb3c8]">Assigned land</span>
                <span className="inline-block border border-[#1c2636] bg-[#0c121d] rounded-lg px-2.5 py-1 text-xs text-[#9fb3c8]">Lake & FTL buffers</span>
              </div>
            </div>

            {/* Sidebar */}
            <aside className="grid gap-4">
              <nav className="sticky top-4 bg-gradient-to-b from-[#0f1626] to-[#0b121e] border border-[#1c2636] rounded-xl p-4">
                <h3 className="text-sm text-[#9fb3c8] mb-2">Quick Navigation</h3>
                <a href="#why" className="block text-[#8cc8ff] py-1 border-b border-dashed border-[rgba(140,200,255,0.18)]">Why this matters now</a>
                <a href="#patterns" className="block text-[#8cc8ff] py-1 border-b border-dashed border-[rgba(140,200,255,0.18)]">Fraud patterns</a>
                <a href="#impact" className="block text-[#8cc8ff] py-1 border-b border-dashed border-[rgba(140,200,255,0.18)]">Impact on middle-class buyers</a>
                <a href="#redflags" className="block text-[#8cc8ff] py-1 border-b border-dashed border-[rgba(140,200,255,0.18)]">Red flags</a>
                <a href="#checklist" className="block text-[#8cc8ff] py-1 border-b border-dashed border-[rgba(140,200,255,0.18)]">10-minute due-diligence</a>
                <a href="#already-paid" className="block text-[#8cc8ff] py-1 border-b border-dashed border-[rgba(140,200,255,0.18)]">Already paid? Do this</a>
                <a href="#safer" className="block text-[#8cc8ff] py-1 border-b border-dashed border-[rgba(140,200,255,0.18)]">Safer way to buy</a>
                <a href="#bottomline" className="block text-[#8cc8ff] py-1">Bottom line</a>
              </nav>
              <div className="bg-gradient-to-b from-[#0f1626] to-[#0b121e] border border-[#1c2636] rounded-xl p-4">
                <strong>Save & share:</strong>
                <p className="text-sm mt-1">Print this page (Ctrl/Cmd+P) or export to PDF and share the checklist with friends and family before they book a plot.</p>
              </div>
            </aside>
          </div>
        </header>

        {/* Main Content */}
        <main>
          <article className="bg-gradient-to-b from-[#0f1626] to-[#0b121e] border border-[#1c2636] rounded-xl p-6 shadow-[0_10px_30px_rgba(0,0,0,0.35)] space-y-10">
            
            {/* Why */}
            <section id="why">
              <h2 className="text-2xl mb-2">Why this matters now</h2>
              <p>
                Hyderabad’s urban fringe—Shankarpally, Chevella, Ibrahimpatnam, Tukkuguda, Shadnagar, Medchal, Yacharam, and beyond—has seen a surge of plot “ventures.” Alongside genuine projects, there’s been a spike in unauthorised layouts, fake approvals, and illegal sales that particularly hurt first-time, middle-class investors. Enforcement actions and public protests in the last few years show how widespread the problem is.
              </p>
            </section>

            {/* Fraud Patterns */}
            <section id="patterns">
              <h2 className="text-2xl mb-2">Common fraud patterns (with examples)</h2>
              <h3 className="text-xl mt-5">1) Selling plots in <em>unregistered or unauthorised ventures</em></h3>
              <ul className="list-disc pl-6">
                <li>“Pre-launch” offers without <strong>RERA registration</strong> and <strong>HMDA/DTCP layout approval</strong>.</li>
                <li>Buyers face endless delays and refund battles; regulators have levied fines and ordered refunds in multiple cases.</li>
              </ul>
              <h3 className="text-xl mt-5">2) Fake or misused approvals (LRS/HMDA/DTCP)</h3>
              <ul className="list-disc pl-6">
                <li>Doctored approval letters or “approvals in process” used to collect booking amounts.</li>
                <li>Misuse of LRS receipts during registrations to imply compliance.</li>
              </ul>
              <h3 className="text-xl mt-5">3) Ventures on <em>assigned/government land</em></h3>
              <ul className="list-disc pl-6">
                <li>Assigned agricultural land (legally restricted) flipped into plots; such land can be <strong>resumed</strong> by the government, leaving buyers stranded.</li>
              </ul>
              <h3 className="text-xl mt-5">4) Encroachments and lake/FTL violations</h3>
              <ul className="list-disc pl-6">
                <li>Plots advertised near lakes/parks that are actually encroachments into water bodies or public buffers.</li>
                <li>Demolitions and litigation risk → potential total loss for buyers.</li>
              </ul>
              <h3 className="text-xl mt-5">5) Big-ticket developer defaults</h3>
              <ul className="list-disc pl-6">
                <li>Non-delivery and non-refund complaints have led to large-scale protests and economic-offences investigations in marquee cases.</li>
              </ul>
            </section>

            {/* Impact */}
            <section id="impact">
              <h2 className="text-2xl mb-2">How these scams crush middle-class families</h2>
              <ul className="list-disc pl-6">
                <li><strong>Savings wiped out:</strong> Advances for “pre-launch” plots get stuck for years; refunds are slow and contested.</li>
                <li><strong>Rent + EMI trap:</strong> Borrowing for the booking while paying rent creates a double burden.</li>
                <li><strong>Legal & mental stress:</strong> Chasing approvals, lawyers, and complaints drains time and health.</li>
                <li><strong>Opportunity cost:</strong> Money locked in a dead project misses genuine appreciation elsewhere.</li>
                <li><strong>Demolition risk:</strong> If land is resumed or illegal structures are razed, buyers face near-total loss.</li>
              </ul>
              <div className="inline-flex items-center gap-2 px-3 py-1 border border-[#5a2430] bg-[#271118] rounded-full text-xs text-[#ff98a4] mt-2">
                Risk asymmetry is highest for first-time buyers
              </div>
            </section>

            {/* Red Flags */}
            <section id="redflags">
              <h2 className="text-2xl mb-2">Red flags — walk away if you see these</h2>
              <ul className="list-disc pl-6">
                <li>“<strong>Pre-launch price</strong> — pay now, approvals next month.”</li>
                <li>“<strong>Farm plots with guaranteed returns</strong>” or assured buyback schemes.</li>
                <li>“<strong>Membership</strong> payment today, plot allotment later.”</li>
                <li>Brochures quoting <strong>fake LRS/HMDA numbers</strong> or muddled survey details.</li>
                <li>Vague location pitches without exact <strong>survey numbers</strong>.</li>
              </ul>
            </section>

            {/* Checklist */}
            <section id="checklist">
              <h2 className="text-2xl mb-4">10-minute due-diligence checklist</h2>
              <div className="grid gap-3 bg-gradient-to-b from-[#0d1726] to-[#0b131f] border border-[#1c2636] rounded-xl p-5">
                <h3 className="flex items-center gap-2 text-lg">Use this before you pay a single rupee</h3>
                <div className="flex gap-2">
                  <div className="w-4 h-4 border-2 border-[#47d7ac] rounded mt-1"></div>
                  <p><strong>RERA first stop:</strong> Search Telangana RERA and confirm the project is registered. No registration? Do not pay.</p>
                </div>
                <div className="flex gap-2">
                  <div className="w-4 h-4 border-2 border-[#47d7ac] rounded mt-1"></div>
                  <p><strong>Layout approval proof:</strong> Ask for the <em>final</em> HMDA/DTCP layout sanction and cross-check survey numbers.</p>
                </div>
                <div className="flex gap-2">
                  <div className="w-4 h-4 border-2 border-[#47d7ac] rounded mt-1"></div>
                  <p><strong>Title & land type:</strong> Verify ownership and land classification. Obtain a lawyer’s title opinion and EC.</p>
                </div>
                <div className="flex gap-2">
                  <div className="w-4 h-4 border-2 border-[#47d7ac] rounded mt-1"></div>
                  <p><strong>On-ground verification:</strong> Visit the exact survey numbers; check roads, drainage, power, fencing.</p>
                </div>
                <div className="flex gap-2">
                  <div className="w-4 h-4 border-2 border-[#47d7ac] rounded mt-1"></div>
                  <p><strong>Document discipline:</strong> Avoid GPA/AGPA or agreement-cum-sale. Insist on registered sale deed only after approvals.</p>
                </div>
                <div className="flex gap-2">
                  <div className="w-4 h-4 border-2 border-[#47d7ac] rounded mt-1"></div>
                  <p><strong>Money trail:</strong> Pay only via bank to the registered entity named in approvals/RERA. Stage payments to milestones.</p>
                </div>
                <div className="flex gap-2">
                  <div className="w-4 h-4 border-2 border-[#47d7ac] rounded mt-1"></div>
                  <p><strong>Litigation & encroachment check:</strong> Verify no encroachment into lake/FTL buffers, parks, or government land.</p>
                </div>
              </div>
              <p className="border-l-4 border-[#4ca3ff] bg-[rgba(76,163,255,0.08)] rounded p-3 mt-3">
                <strong>Tip:</strong> If a scheduled bank is financing plot loans in that specific project, it’s a positive (not foolproof) signal.
              </p>
            </section>

            {/* Already Paid */}
            <section id="already-paid">
              <h2 className="text-2xl mb-2">Already paid? Here’s what to do</h2>
              <ol className="list-decimal pl-6 space-y-2">
                <li><strong>Write to the promoter</strong> demanding compliance/refund.</li>
                <li><strong>File a complaint with TG RERA</strong> online; RERA can order refunds with interest.</li>
                <li><strong>Approach the Economic Offences Wing</strong> if cheating/forgery is suspected.</li>
                <li><strong>Alert local authorities</strong> (HMDA/Collectorate) for encroachments, misuse, or violations.</li>
                <li><strong>Form a buyers’ association:</strong> Collective action moves faster.</li>
              </ol>
            </section>

            {/* Safer */}
            <section id="safer">
              <h2 className="text-2xl mb-2">A safer way to buy plots around Hyderabad</h2>
              <ul className="list-disc pl-6">
                <li><strong>Non-negotiables:</strong> RERA registration + Final Layout Sanction + Title opinion + EC before payment.</li>
                <li><strong>Location discipline:</strong> Prefer HMDA-approved layouts with civic infrastructure.</li>
                <li><strong>Start small:</strong> With new promoters, begin with the smallest commitment and stagger payments.</li>
                <li><strong>Use a local property lawyer:</strong> A ₹15–25k legal check can save lakhs.</li>
              </ul>
              <div className="inline-flex items-center gap-2 px-3 py-1 border border-[#1d3b2a] bg-[#0e1a13] rounded-full text-xs text-[#7de3a8] mt-2">
                Compliance beats discounts—every time
              </div>
            </section>

            {/* Bottom Line */}
            <section id="bottomline">
              <h2 className="text-2xl mb-2">Bottom line</h2>
              <p>
                The Hyderabad plot market offers real opportunities—but the <strong>risk asymmetry</strong> is highest for middle-class buyers targeted by flashy pre-launch pitches. Make compliance your gate: verify RERA registration, insist on final layout approval, check title/land type, and keep all payments traceable. If something feels off, walk away—there will always be another plot, but not another you.
              </p>
            </section>
          </article>

          <footer className="text-center text-[#9fb3c8] mt-6">
            <p>© 2025 Buyer Awareness — You’re free to reuse this page with attribution. Designed for print-friendly export.</p>
          </footer>
        </main>
      </div>
    </div>
  );
}
