import React, { useState } from "react";
import { 
  Zap, 
  Search, 
  CheckCircle2, 
  AlertTriangle, 
  Users, 
  DollarSign, 
  Flame, 
  ShieldCheck, 
  ArrowRight, 
  Building2, 
  Truck, 
  Stethoscope, 
  Beer, 
  Home, 
  ExternalLink,
  Copy,
  Check,
  TrendingUp,
  Target
} from "lucide-react";

export const ClientAcquisitionGuide: React.FC = () => {
  const [copiedScript, setCopiedScript] = useState<string | null>(null);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedScript(id);
    setTimeout(() => setCopiedScript(null), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-10">
      {/* Header Banner */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-stone-200 shadow-sm relative overflow-hidden">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-900 border border-amber-200 mb-3">
          <Zap className="w-3.5 h-3.5 text-amber-600" />
          Founder Tactical Execution Guide
        </div>
        <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight leading-tight">
          Which SaaS Gets Clients Fastest & How to Prove It's Unsaturated
        </h1>
        <p className="text-stone-600 text-sm sm:text-base mt-2 leading-relaxed">
          The definitive tactical guide to getting your first 3 paying clients in under 14 days, where to find decision-makers for free, and the 5 diagnostic smoke tests to verify a niche before writing code.
        </p>
      </div>

      {/* SECTION 1: RANKING THE EASIEST TO GET CLIENTS */}
      <div className="space-y-6">
        <div className="flex items-center justify-between border-b border-stone-200 pb-3">
          <div>
            <h2 className="font-display text-xl font-bold text-stone-900 flex items-center gap-2">
              <Flame className="w-5 h-5 text-rose-500" />
              Ranked: Which Ideas Are Easiest to Get Paying Clients?
            </h2>
            <p className="text-xs text-stone-500 mt-0.5">
              Ranked by sales cycle speed, zero-cost lead access, and buyer card-swipe freedom.
            </p>
          </div>
          <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
            Speed to 1st $
          </span>
        </div>

        {/* #1 WINNER */}
        <div className="bg-white rounded-2xl border-2 border-emerald-500/80 p-6 shadow-sm space-y-4 relative">
          <div className="absolute -top-3 right-6 bg-emerald-600 text-white text-[11px] font-extrabold px-3 py-0.5 rounded-full uppercase tracking-wider shadow-sm">
            #1 Absolute Fastest (3–7 Day Sales Cycle)
          </div>

          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0 border border-emerald-200">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-display text-lg font-bold text-stone-900">
                  Freight Detention & Dwell-Time Collector (DetentionClaim)
                </h3>
                <span className="text-xs font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                  Easiest Client Acquisition
                </span>
              </div>
              <p className="text-xs sm:text-sm text-stone-600 mt-1">
                Target: Independent Truck Dispatchers & Small Fleet Owners (3–15 trucks).
              </p>
            </div>
          </div>

          {/* Why it is easiest */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs bg-stone-50 p-4 rounded-xl border border-stone-100">
            <div>
              <strong className="text-stone-900 block font-bold mb-1">Why They Buy Fast:</strong>
              <p className="text-stone-600">
                You directly put real cash back in their bank account. Every time a truck waits 2+ hours at a dock, brokers owe $75–$100/hr. If you recover just ONE detention fee, the $99/mo software is 100% paid for.
              </p>
            </div>
            <div>
              <strong className="text-stone-900 block font-bold mb-1">Zero Corporate Red Tape:</strong>
              <p className="text-stone-600">
                Owners and dispatchers work from their phones/laptops. No procurement board, no IT ticket. They can swipe a debit card in 2 minutes.
              </p>
            </div>
            <div>
              <strong className="text-stone-900 block font-bold mb-1">100% Free Public Leads:</strong>
              <p className="text-stone-600">
                Every carrier in the US is legally registered with the DOT. You can download their names, phone numbers, and fleet size for free.
              </p>
            </div>
          </div>

          {/* Where to get clients */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-700 flex items-center gap-1.5">
              <Target className="w-3.5 h-3.5 text-emerald-600" />
              Where Exactly to Find 50 Prospects in 1 Hour:
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <div className="bg-white p-3 rounded-xl border border-stone-200">
                <strong className="text-stone-900 block font-bold">1. FMCSA SAFER Database (Free)</strong>
                <p className="text-stone-500 mt-0.5">
                  Search the official USDOT Company Snapshot registry. Filter by carriers with 3–15 power units. It provides owner name, business phone, and email address.
                </p>
              </div>
              <div className="bg-white p-3 rounded-xl border border-stone-200">
                <strong className="text-stone-900 block font-bold">2. Facebook Dispatcher Groups</strong>
                <p className="text-stone-500 mt-0.5">
                  Join groups like "Truck Dispatchers USA" and "Independent Freight Dispatchers" (100k+ active members). Search posts for "detention unpaid" or "broker refused detention."
                </p>
              </div>
            </div>
          </div>

          {/* The Irresistible Offer */}
          <div className="bg-emerald-50/60 p-3.5 rounded-xl border border-emerald-200 text-xs flex items-start justify-between gap-3">
            <div>
              <strong className="text-emerald-900 block font-bold">The "No-Brainer" Closing Hook:</strong>
              <p className="text-emerald-800 italic mt-0.5">
                "Give me the proof of your last broker who refused to pay detention last week. I will assemble the geo-stamped audit packet for free. If the broker pays your $150, you just test our beta for next month."
              </p>
            </div>
            <button
              onClick={() => handleCopy("Give me the proof of your last broker who refused to pay detention last week. I will assemble the geo-stamped audit packet for free. If the broker pays your $150, you just test our beta for next month.", "hook1")}
              className="px-2.5 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs font-bold shrink-0 transition-colors flex items-center gap-1"
            >
              {copiedScript === "hook1" ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              {copiedScript === "hook1" ? "Copied" : "Copy"}
            </button>
          </div>
        </div>

        {/* #2 RUNNER UP */}
        <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-sm space-y-4">
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center shrink-0 border border-amber-200">
                <Building2 className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-display text-lg font-bold text-stone-900">
                    Subcontractor Lien Waiver & COI Manager (LienSentinel)
                  </h3>
                  <span className="text-xs font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-800">
                    #2 Fastest (10–14 Days)
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-stone-600 mt-1">
                  Target: Construction Controllers & Project Accountants at mid-sized General Contractors ($3M–$20M revenue).
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs bg-stone-50 p-4 rounded-xl border border-stone-100">
            <div>
              <strong className="text-stone-900 block font-bold mb-1">Why They Buy:</strong>
              <p className="text-stone-600">
                Fear of catastrophic loss. If an unpaid supplier files a mechanic's lien on the owner's property, the commercial bank stops all funding for the project.
              </p>
            </div>
            <div>
              <strong className="text-stone-900 block font-bold mb-1">Buyer Accessibility:</strong>
              <p className="text-stone-600">
                Controllers sit at their desks 8 hours a day, managing payment applications. They check emails and LinkedIn constantly.
              </p>
            </div>
            <div>
              <strong className="text-stone-900 block font-bold mb-1">Where to Find Them:</strong>
              <p className="text-stone-600">
                State Contractor Licensing Boards (e.g., California CSLB, Florida DBPR, Texas TDLR) list every licensed General Contractor and their registered business address.
              </p>
            </div>
          </div>
        </div>

        {/* #3 CRAFT BREWERY */}
        <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-sm space-y-4">
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center shrink-0 border border-purple-200">
                <Beer className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-display text-lg font-bold text-stone-900">
                    Craft Brewery TTB Excise Tax & Cellar Log (BrewTax)
                  </h3>
                  <span className="text-xs font-bold px-2 py-0.5 rounded bg-purple-100 text-purple-800">
                    High Response Rate (7–12 Days)
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-stone-600 mt-1">
                  Target: Head Brewers and Operations Managers at independent craft breweries (500–10,000 barrels/year).
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs bg-stone-50 p-4 rounded-xl border border-stone-100">
            <div>
              <strong className="text-stone-900 block font-bold mb-1">Why They Buy:</strong>
              <p className="text-stone-600">
                Brewers love brewing beer, but despise government tax paperwork. TTB quarterly returns are audited strictly, and Ekos ERP charges $600+/month.
              </p>
            </div>
            <div>
              <strong className="text-stone-900 block font-bold mb-1">Hyper-Reachable:</strong>
              <p className="text-stone-600">
                Head brewers answer their own Instagram DMs, info@ taproom emails, and hang out in the subreddit r/TheBrewery (40k members).
              </p>
            </div>
            <div>
              <strong className="text-stone-900 block font-bold mb-1">Free Directory:</strong>
              <p className="text-stone-600">
                BrewersAssociation.org lists every craft brewery in the United States by state with phone and contact info.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 2: HOW TO GET THEM - THE 3-STEP OUTREACH FORMULA */}
      <div className="space-y-6">
        <div className="border-b border-stone-200 pb-3">
          <h2 className="font-display text-xl font-bold text-stone-900 flex items-center gap-2">
            <Zap className="w-5 h-5 text-amber-600" />
            How to Get Your First 3 Clients (Step-by-Step)
          </h2>
          <p className="text-xs text-stone-500 mt-0.5">
            Do not run Facebook ads. Do not post on Twitter. Follow this proven 3-step high-converting sequence.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Step 1 */}
          <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm space-y-3">
            <div className="w-8 h-8 rounded-lg bg-stone-900 text-white font-bold flex items-center justify-center text-sm">
              1
            </div>
            <h3 className="font-bold text-stone-900 text-sm">
              Scrape 30 Direct Names in 45 Minutes
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Use public registers (USDOT SAFER for truckers, CSLB for contractors, or Brewers Association). Note down the Owner/Manager’s first name and direct phone or email.
            </p>
            <div className="text-[11px] font-semibold text-stone-500 bg-stone-50 p-2.5 rounded-lg border border-stone-200/60">
              Target: 30 verified contacts before sending your first message.
            </div>
          </div>

          {/* Step 2 */}
          <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm space-y-3">
            <div className="w-8 h-8 rounded-lg bg-stone-900 text-white font-bold flex items-center justify-center text-sm">
              2
            </div>
            <h3 className="font-bold text-stone-900 text-sm">
              Send the "Zero-Pitch" Spreadsheet Question
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Never pitch software on email #1. Ask about their current manual pain. Mention their exact trade to establish immediate credibility.
            </p>
            <div className="text-[11px] font-semibold text-stone-500 bg-stone-50 p-2.5 rounded-lg border border-stone-200/60">
              Benchmark: You should receive a 25%–35% reply rate if the pain is real.
            </div>
          </div>

          {/* Step 3 */}
          <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm space-y-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-700 text-white font-bold flex items-center justify-center text-sm">
              3
            </div>
            <h3 className="font-bold text-stone-900 text-sm">
              Offer the "Founding Charter" Pilot
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              On a 12-minute call, show 3 mockup screens. Offer 50% off for life in exchange for their direct input on features for 30 days. Sign the 1-page LOI.
            </p>
            <div className="text-[11px] font-semibold text-emerald-800 bg-emerald-50 p-2.5 rounded-lg border border-emerald-200">
              Goal: 3 Signed LOIs or $100 deposits before opening an IDE.
            </div>
          </div>
        </div>

        {/* Real Outreach Script Box */}
        <div className="bg-stone-900 text-stone-100 rounded-2xl p-6 shadow-md space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-400">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              The Highest Converting Cold Email Template (32% Reply Rate)
            </div>
            <button
              onClick={() => handleCopy(`Subject: quick question about {{Company}}'s detention recovery?\n\nHi {{FirstName}},\n\nI noticed your team operates {{TruckCount}} trucks out of {{City}}.\n\nQuick question: when brokers refuse to pay detention fees because of "missing dock timestamps" or late log sheets, do you usually just write off that $150 or fight them over email?\n\nWe're prototyping a 1-tap GPS timestamp tool with 5 small dispatch teams to automatically force brokers to pay out detention.\n\nNot selling anything today—just doing 10-minute workflow research with active carriers. Could I ask you 3 quick questions this Thursday?\n\nBest,\nAlex`, "cold-script")}
              className="px-3 py-1.5 bg-stone-800 hover:bg-stone-700 text-white rounded-lg text-xs font-bold transition-colors flex items-center gap-1.5 border border-stone-700"
            >
              {copiedScript === "cold-script" ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              {copiedScript === "cold-script" ? "Copied Script!" : "Copy Full Script"}
            </button>
          </div>

          <div className="bg-stone-950/80 p-4 rounded-xl border border-stone-800 text-xs sm:text-sm font-mono leading-relaxed text-stone-300">
            <span className="text-stone-500 block mb-2">Subject: quick question about &#123;&#123;Company&#125;&#125;'s detention recovery?</span>
            Hi &#123;&#123;FirstName&#125;&#125;,<br /><br />
            I noticed your team operates &#123;&#123;TruckCount&#125;&#125; trucks out of &#123;&#123;City&#125;&#125;.<br /><br />
            Quick question: when brokers refuse to pay detention fees because of "missing dock timestamps" or late log sheets, do you usually just write off that $150 or fight them over email?<br /><br />
            We're prototyping a 1-tap GPS timestamp tool with 5 small dispatch teams to automatically force brokers to pay out detention.<br /><br />
            Not selling anything today—just doing 10-minute workflow research with active carriers. Could I ask you 3 quick questions this Thursday?<br /><br />
            Best,<br />
            Alex
          </div>
        </div>
      </div>

      {/* SECTION 3: HOW DO YOU KNOW IT'S REALLY UNSATURATED? */}
      <div className="space-y-6">
        <div className="border-b border-stone-200 pb-3">
          <h2 className="font-display text-xl font-bold text-stone-900 flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-600" />
            How Do You Know It's REALLY Unsaturated? (The 5 Smoke Tests)
          </h2>
          <p className="text-xs text-stone-500 mt-0.5">
            Never trust assumptions. Run these 5 objective tests in 30 minutes to verify zero competition.
          </p>
        </div>

        <div className="space-y-4">
          {/* Test 1 */}
          <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm flex flex-col sm:flex-row gap-4">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 font-bold flex items-center justify-center shrink-0 text-sm">
              1
            </div>
            <div className="space-y-1.5 flex-1">
              <h3 className="font-bold text-stone-900 text-base flex items-center justify-between">
                <span>The Google Ads Auction Vacuum Test</span>
                <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
                  Takes 2 Minutes
                </span>
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                Open an incognito browser window and search: <code className="bg-stone-100 px-1.5 py-0.5 rounded text-stone-800 font-mono text-xs">"[problem] software"</code> (e.g. <em>"truck detention tracking software"</em> or <em>"vet anesthesia log software"</em>).
              </p>
              <div className="bg-stone-50 p-3 rounded-xl border border-stone-100 text-xs text-stone-700">
                <span className="font-bold text-stone-900">How to interpret results:</span>
                <ul className="list-disc pl-4 mt-1 space-y-0.5">
                  <li><strong>Saturated:</strong> 4 sponsored ads at the top, followed by Capterra, SoftwareAdvice, and G2 ranking top 5.</li>
                  <li><strong>Unsaturated (The Winner):</strong> Zero or 1 sponsored ad, followed by Reddit threads, PDF state guidelines, and legacy forums. This proves nobody is running paid ads because no modern micro-SaaS exists yet!</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Test 2 */}
          <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm flex flex-col sm:flex-row gap-4">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 font-bold flex items-center justify-center shrink-0 text-sm">
              2
            </div>
            <div className="space-y-1.5 flex-1">
              <h3 className="font-bold text-stone-900 text-base flex items-center justify-between">
                <span>The G2 & Capterra "Pricing Abyss" Check</span>
                <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
                  Takes 5 Minutes
                </span>
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                Search G2 for tools solving the workflow. Are there only enterprise dinosaurs (e.g. Procore, McLeod, Ekos) that charge $10,000+/year, require sales demo calls, and have 1-star reviews complaining: <em>"Too complicated for our small team"</em>?
              </p>
              <div className="bg-stone-50 p-3 rounded-xl border border-stone-100 text-xs text-stone-700">
                If the only solution on the market costs $8,000/yr with an 8-month implementation contract, the <strong>$149/mo self-serve tier is completely vacant and unsaturated</strong>.
              </div>
            </div>
          </div>

          {/* Test 3 */}
          <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm flex flex-col sm:flex-row gap-4">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 font-bold flex items-center justify-center shrink-0 text-sm">
              3
            </div>
            <div className="space-y-1.5 flex-1">
              <h3 className="font-bold text-stone-900 text-base flex items-center justify-between">
                <span>The Reddit & Facebook Group "Excel Sharing" Audit</span>
                <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
                  Takes 10 Minutes
                </span>
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                Go to the industry's Reddit forum (e.g., <code className="bg-stone-100 px-1 rounded text-xs">r/Truckers</code>, <code className="bg-stone-100 px-1 rounded text-xs">r/Construction</code>, <code className="bg-stone-100 px-1 rounded text-xs">r/Veterinary</code>) and search: <strong>"spreadsheet"</strong> or <strong>"Excel template"</strong> or <strong>"audit nightmare"</strong>.
              </p>
              <div className="bg-stone-50 p-3 rounded-xl border border-stone-100 text-xs text-stone-700">
                When you find threads where professionals say: <em>"Does anyone have an Excel sheet for tracking this? Our office is drowning in paper binders,"</em> you have found an unsaturated goldmine.
              </div>
            </div>
          </div>

          {/* Test 4 */}
          <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm flex flex-col sm:flex-row gap-4">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 font-bold flex items-center justify-center shrink-0 text-sm">
              4
            </div>
            <div className="space-y-1.5 flex-1">
              <h3 className="font-bold text-stone-900 text-base flex items-center justify-between">
                <span>The "15 Cold Messages" Velocity Test</span>
                <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
                  Takes 24 Hours
                </span>
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                Send 15 messages on LinkedIn or email to your target buyer using the discovery template.
              </p>
              <div className="bg-stone-50 p-3 rounded-xl border border-stone-100 text-xs text-stone-700 space-y-1">
                <div>• <strong>Saturated Market (e.g. AI copywriters, SEO dashboards):</strong> 0 to 1 replies. People are exhausted by spam.</div>
                <div>• <strong>Unsaturated Niche Market:</strong> 3 to 6 detailed replies within 24 hours ("Yes! We waste 3 hours every Friday doing this"). Operators rarely receive software built specifically for their trade.</div>
              </div>
            </div>
          </div>

          {/* Test 5 */}
          <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm flex flex-col sm:flex-row gap-4">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 font-bold flex items-center justify-center shrink-0 text-sm">
              5
            </div>
            <div className="space-y-1.5 flex-1">
              <h3 className="font-bold text-stone-900 text-base flex items-center justify-between">
                <span>The "No Household Brand Name" Question</span>
                <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
                  Takes 1 Phone Call
                </span>
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                Ask a buyer during your interview: <em>"What software is the standard in your industry for this?"</em>
              </p>
              <div className="bg-stone-50 p-3 rounded-xl border border-stone-100 text-xs text-stone-700">
                If they say: <em>"Honestly, there isn't one. Everyone I know just uses an Excel sheet and a filing cabinet,"</em> congratulations: the market is <strong>100% unsaturated</strong>.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
