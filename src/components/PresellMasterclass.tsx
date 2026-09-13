import React from "react";
import { CheckCircle2, DollarSign, Users, AlertTriangle, ShieldCheck, ArrowRight, BookOpen, Clock, Target } from "lucide-react";

export const PresellMasterclass: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Intro Header */}
      <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-700 mb-1">
          <BookOpen className="w-3.5 h-3.5 text-emerald-600" />
          The "Sell Before You Build" Framework
        </div>
        <h2 className="font-display text-2xl font-bold text-stone-900">
          How to Pre-Sell SaaS Ideas Before Writing Code
        </h2>
        <p className="text-stone-600 text-sm mt-1">
          The #1 reason solo founders fail is building software for 6 months that nobody buys. By reversing the order—selling first, then coding—you guarantee product-market fit on day one.
        </p>
      </div>

      {/* The 4-Step Pre-Sell Process */}
      <div className="space-y-4">
        <h3 className="font-display text-lg font-bold text-stone-900">
          The 4-Step Validation Ladder
        </h3>

        {/* Step 1 */}
        <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm flex flex-col md:flex-row gap-5">
          <div className="w-10 h-10 rounded-xl bg-stone-900 text-white font-display font-bold text-lg flex items-center justify-center shrink-0">
            1
          </div>
          <div className="space-y-2 flex-1">
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-stone-900 text-base">
                The 15-Minute "Mom Test" Discovery Call (No Pitching!)
              </h4>
              <span className="text-xs font-semibold px-2 py-0.5 rounded bg-stone-100 text-stone-700">
                Days 1 - 5
              </span>
            </div>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              Reach out to 20-30 decision makers on LinkedIn or cold email. Do <strong>not</strong> say you have an app to sell. Say you are researching how industry peers handle their spreadsheet workflow.
            </p>
            <div className="bg-stone-50 p-3 rounded-xl border border-stone-100 text-xs text-stone-700 space-y-1">
              <strong className="text-stone-900 block">The 3 Crucial Questions:</strong>
              <div>• "When was the last time you had to deal with this problem?"</div>
              <div>• "How much time or money did that mistake cost the company?"</div>
              <div>• "What spreadsheets or manual steps are you currently using to prevent it?"</div>
            </div>
          </div>
        </div>

        {/* Step 2 */}
        <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm flex flex-col md:flex-row gap-5">
          <div className="w-10 h-10 rounded-xl bg-stone-900 text-white font-display font-bold text-lg flex items-center justify-center shrink-0">
            2
          </div>
          <div className="space-y-2 flex-1">
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-stone-900 text-base">
                The Interactive Figma / Clickable Mockup
              </h4>
              <span className="text-xs font-semibold px-2 py-0.5 rounded bg-stone-100 text-stone-700">
                Days 6 - 8
              </span>
            </div>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              Never sell an abstract idea. Buyers cannot visualize raw words. Spend 1-2 days putting together 3 visual screens: the data entry screen, the main dashboard, and the exported compliance PDF.
            </p>
            <p className="text-xs text-stone-500 italic">
              "Show them their exact company name and logo inside the mockup during a 10-minute demo. It makes the solution feel real immediately."
            </p>
          </div>
        </div>

        {/* Step 3 */}
        <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm flex flex-col md:flex-row gap-5">
          <div className="w-10 h-10 rounded-xl bg-emerald-700 text-white font-display font-bold text-lg flex items-center justify-center shrink-0">
            3
          </div>
          <div className="space-y-2 flex-1">
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-stone-900 text-base">
                The "Founding Member" Offer (Securing Commitment)
              </h4>
              <span className="text-xs font-semibold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                Days 9 - 14 (The Money Test)
              </span>
            </div>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              At the end of the demo, don't ask: "Would you like this when it's done?" Ask for a concrete commitment using one of these two options:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="bg-emerald-50/70 p-3 rounded-xl border border-emerald-200">
                <strong className="text-emerald-900 block mb-1">Option A: Paid Deposit ($100 - $250)</strong>
                <p className="text-emerald-800">
                  "We're accepting 5 Charter Founding Partners who get 50% off for life and direct engineering support. A $150 refundable deposit holds your spot and funds custom setup."
                </p>
              </div>
              <div className="bg-stone-50 p-3 rounded-xl border border-stone-200">
                <strong className="text-stone-900 block mb-1">Option B: Signed Pilot LOI (Letter of Intent)</strong>
                <p className="text-stone-700">
                  If company policy blocks upfront credit card deposits, get their signature on the 1-page non-binding Pilot Letter of Intent agreeing to test on 1 project for 30 days.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Step 4 */}
        <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm flex flex-col md:flex-row gap-5">
          <div className="w-10 h-10 rounded-xl bg-stone-900 text-white font-display font-bold text-lg flex items-center justify-center shrink-0">
            4
          </div>
          <div className="space-y-2 flex-1">
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-stone-900 text-base">
                The Concierge Minimum Monetizable Product (MMP)
              </h4>
              <span className="text-xs font-semibold px-2 py-0.5 rounded bg-stone-100 text-stone-700">
                Weeks 3 - 4
              </span>
            </div>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              Once you have 3 signed LOIs or deposits, build ONLY the single core workflow in 2 weeks. Handle complex edge cases manually in the background ("Concierge MVP"). As long as the customer gets their problem solved, they will happily pay.
            </p>
          </div>
        </div>
      </div>

      {/* The 3 Golden Rules of Unsaturated SaaS */}
      <div className="bg-stone-900 text-white p-6 rounded-2xl shadow-md space-y-4">
        <h3 className="font-display font-bold text-lg text-amber-400">
          The 3 Golden Rules of Unsaturation
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-stone-300">
          <div className="bg-stone-800/80 p-4 rounded-xl border border-stone-700 space-y-1.5">
            <strong className="text-white text-sm block">1. Kill an Ugly Spreadsheet</strong>
            <p>
              Don't create a new behavior. Find an existing, painful spreadsheet that 3 people in an office maintain daily, and turn it into software.
            </p>
          </div>
          <div className="bg-stone-800/80 p-4 rounded-xl border border-stone-700 space-y-1.5">
            <strong className="text-white text-sm block">2. Target a Credit-Card Buyer</strong>
            <p>
              Target titles like Practice Manager, Construction Controller, or Fleet Owner who can swipe $200/mo without waiting 4 months for IT approval.
            </p>
          </div>
          <div className="bg-stone-800/80 p-4 rounded-xl border border-stone-700 space-y-1.5">
            <strong className="text-white text-sm block">3. Anchor to Fines or Real Cash</strong>
            <p>
              Software that prevents an OSHA stop-work order, an excise audit, or recovers lost detention fees sells 10x faster than generic "productivity" tools.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
