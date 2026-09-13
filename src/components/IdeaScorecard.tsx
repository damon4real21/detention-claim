import React, { useState } from "react";
import { ScorecardInputs } from "../types";
import { Sliders, CheckCircle, AlertOctagon, HelpCircle, ArrowRight, Sparkles, ShieldCheck } from "lucide-react";

export const IdeaScorecard: React.FC = () => {
  const [ideaName, setIdeaName] = useState("Subcontractor Lien Release Manager");
  const [scores, setScores] = useState<ScorecardInputs>({
    budgetAuthority: 8,
    painFrequency: 9,
    spreadsheetFriction: 9,
    regulatoryOrFinancialRisk: 9,
    reachabilityOfICP: 8
  });

  const totalScore = (
    scores.budgetAuthority * 2.5 +
    scores.painFrequency * 2.0 +
    scores.spreadsheetFriction * 2.0 +
    scores.regulatoryOrFinancialRisk * 2.0 +
    scores.reachabilityOfICP * 1.5
  );

  const getVerdict = (score: number) => {
    if (score >= 80) {
      return {
        title: "Prime Pre-Sell Candidate (Green Light)",
        description: "High willingness to pay, urgent daily friction, and clear reachability. You can secure 3-5 signed LOIs or pilot deposits within 14 days of cold outreach.",
        color: "text-emerald-700 bg-emerald-50 border-emerald-200"
      };
    } else if (score >= 60) {
      return {
        title: "Viable with Vertical Focus (Yellow Light)",
        description: "Good foundation, but narrow down the exact buyer persona or tie the value proposition closer to direct cost savings / revenue protection.",
        color: "text-amber-800 bg-amber-50 border-amber-200"
      };
    } else {
      return {
        title: "High Saturation or Long Sales Cycle (Red Light)",
        description: "Warning: Low discretionary budget authority or weak regulatory urgency. Pre-selling will be difficult without heavy enterprise sales reps.",
        color: "text-rose-800 bg-rose-50 border-rose-200"
      };
    }
  };

  const verdict = getVerdict(totalScore);

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Intro */}
      <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-700 mb-1">
          <Sparkles className="w-3.5 h-3.5 text-amber-600" />
          Pre-Sell Viability Diagnostic
        </div>
        <h2 className="font-display text-2xl font-bold text-stone-900">
          SaaS Saturation & Pre-Sellability Scorecard
        </h2>
        <p className="text-stone-600 text-sm mt-1">
          Score any B2B SaaS idea across the 5 fundamental rules of unsaturation. If an idea scores 80+, you can confidently pre-sell before writing code.
        </p>

        <div className="mt-4">
          <label className="block text-xs font-semibold text-stone-700 mb-1">Idea or Concept Name</label>
          <input
            type="text"
            value={ideaName}
            onChange={(e) => setIdeaName(e.target.value)}
            className="w-full bg-stone-50 border border-stone-300 rounded-xl px-4 py-2.5 text-sm font-semibold text-stone-900 focus:outline-none focus:ring-2 focus:ring-stone-900"
            placeholder="e.g. HOA Architectural Review Portal"
          />
        </div>
      </div>

      {/* Sliders Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Factor 1 */}
        <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="font-bold text-stone-900 text-sm">1. Discretionary Budget Authority</span>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-stone-900 text-white">
              {scores.budgetAuthority} / 10
            </span>
          </div>
          <p className="text-xs text-stone-500">
            Can the single person you contact swipe a company card for $100-$500/mo without a procurement board or IT review?
          </p>
          <input
            type="range"
            min="1"
            max="10"
            value={scores.budgetAuthority}
            onChange={(e) => setScores({ ...scores, budgetAuthority: Number(e.target.value) })}
            className="w-full accent-stone-900 cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-stone-400">
            <span>Needs CFO Committee (1)</span>
            <span>Single-card swipe (10)</span>
          </div>
        </div>

        {/* Factor 2 */}
        <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="font-bold text-stone-900 text-sm">2. Daily / Weekly Pain Frequency</span>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-stone-900 text-white">
              {scores.painFrequency} / 10
            </span>
          </div>
          <p className="text-xs text-stone-500">
            Does the problem happen every single day/week, or is it an occasional chore they forget about between quarters?
          </p>
          <input
            type="range"
            min="1"
            max="10"
            value={scores.painFrequency}
            onChange={(e) => setScores({ ...scores, painFrequency: Number(e.target.value) })}
            className="w-full accent-stone-900 cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-stone-400">
            <span>Once a quarter (1)</span>
            <span>Daily headache (10)</span>
          </div>
        </div>

        {/* Factor 3 */}
        <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="font-bold text-stone-900 text-sm">3. Spreadsheet / Paper Chaos</span>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-stone-900 text-white">
              {scores.spreadsheetFriction} / 10
            </span>
          </div>
          <p className="text-xs text-stone-500">
            Are they currently suffering through broken formulas, lost email attachments, or manual copy-pasting?
          </p>
          <input
            type="range"
            min="1"
            max="10"
            value={scores.spreadsheetFriction}
            onChange={(e) => setScores({ ...scores, spreadsheetFriction: Number(e.target.value) })}
            className="w-full accent-stone-900 cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-stone-400">
            <span>Fine with Excel (1)</span>
            <span>Drowning in tabs (10)</span>
          </div>
        </div>

        {/* Factor 4 */}
        <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="font-bold text-stone-900 text-sm">4. Regulatory / Financial Penalty</span>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-stone-900 text-white">
              {scores.regulatoryOrFinancialRisk} / 10
            </span>
          </div>
          <p className="text-xs text-stone-500">
            If they make an error, do they get audited, fined, sued, or lose thousands in cash (e.g. OSHA, TTB, lien claims)?
          </p>
          <input
            type="range"
            min="1"
            max="10"
            value={scores.regulatoryOrFinancialRisk}
            onChange={(e) => setScores({ ...scores, regulatoryOrFinancialRisk: Number(e.target.value) })}
            className="w-full accent-stone-900 cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-stone-400">
            <span>Minor nuisance (1)</span>
            <span>Severe audit risk / fines (10)</span>
          </div>
        </div>

        {/* Factor 5 */}
        <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm space-y-3 md:col-span-2">
          <div className="flex items-center justify-between">
            <span className="font-bold text-stone-900 text-sm">5. Reachability of Prospects</span>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-stone-900 text-white">
              {scores.reachabilityOfICP} / 10
            </span>
          </div>
          <p className="text-xs text-stone-500">
            Can you find 100 direct names and emails/LinkedIn profiles of this exact buyer in 30 minutes?
          </p>
          <input
            type="range"
            min="1"
            max="10"
            value={scores.reachabilityOfICP}
            onChange={(e) => setScores({ ...scores, reachabilityOfICP: Number(e.target.value) })}
            className="w-full accent-stone-900 cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-stone-400">
            <span>Hidden / inaccessible (1)</span>
            <span>Easily listed on LinkedIn / state registers (10)</span>
          </div>
        </div>
      </div>

      {/* Result Card */}
      <div className={`p-6 rounded-2xl border ${verdict.color} shadow-sm space-y-3`}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider block opacity-75">
              Total Pre-Sellability Score
            </span>
            <div className="text-3xl font-extrabold font-display">
              {Math.round(totalScore)} / 100
            </div>
          </div>
          <span className="px-3.5 py-1.5 rounded-full text-xs font-extrabold bg-white/80 border border-current shadow-xs">
            {verdict.title}
          </span>
        </div>

        <p className="text-sm leading-relaxed">
          {verdict.description}
        </p>

        <div className="pt-3 border-t border-current/20 text-xs font-semibold flex items-center gap-1.5">
          <CheckCircle className="w-4 h-4" />
          Recommended Next Move: Reach out to 15 prospects using the Pre-Sell Studio script before building any backend databases.
        </div>
      </div>
    </div>
  );
};
