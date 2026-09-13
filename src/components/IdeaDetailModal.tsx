import React from "react";
import { SaasIdea } from "../types";
import { X, CheckCircle2, AlertTriangle, ShieldCheck, DollarSign, Users, Table, Send, Sparkles, Layers, Clock, Truck } from "lucide-react";

interface IdeaDetailModalProps {
  idea: SaasIdea | null;
  onClose: () => void;
  onOpenPresell: (idea: SaasIdea) => void;
  onOpenApp?: () => void;
}

export const IdeaDetailModal: React.FC<IdeaDetailModalProps> = ({ idea, onClose, onOpenPresell, onOpenApp }) => {
  if (!idea) return null;
  const isFreightApp = idea.id === "detention-claim-collector";

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-stone-200 overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-stone-200 flex items-start justify-between bg-stone-50/70">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 text-xs font-semibold rounded bg-stone-200 text-stone-800">
                {idea.category}
              </span>
              <span className="px-2.5 py-0.5 text-xs font-bold rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                Unsaturated Niche (Score: {idea.saturationScore}/5)
              </span>
            </div>
            <h2 className="text-2xl font-bold font-display text-stone-900 leading-tight">
              {idea.title}
            </h2>
            <p className="text-sm text-stone-600 mt-1">
              {idea.tagline}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-stone-400 hover:text-stone-700 p-2 rounded-lg hover:bg-stone-200/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-6 overflow-y-auto space-y-6 text-sm text-stone-700">
          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-3.5 bg-stone-100/80 rounded-xl border border-stone-200 text-xs">
            <div>
              <span className="text-stone-500 block font-medium">Target Buyer</span>
              <span className="font-bold text-stone-900 truncate block" title={idea.decisionMakerTitle}>
                {idea.decisionMakerTitle}
              </span>
            </div>
            <div>
              <span className="text-stone-500 block font-medium">Monthly Price</span>
              <span className="font-bold text-emerald-700 block">
                ${idea.pricingMonthly.starter} - ${idea.pricingMonthly.pro}/mo
              </span>
            </div>
            <div>
              <span className="text-stone-500 block font-medium">Est. Annual Value</span>
              <span className="font-bold text-stone-900 block">
                {idea.estimatedACV}
              </span>
            </div>
            <div>
              <span className="text-stone-500 block font-medium">Sales Cycle</span>
              <span className="font-bold text-stone-900 block flex items-center gap-1">
                <Clock className="w-3 h-3 text-amber-600" />
                {idea.salesCycleDays}
              </span>
            </div>
          </div>

          {/* Section: The Painful Problem */}
          <div>
            <h4 className="font-bold text-base text-stone-900 mb-2 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-600" />
              The Hair-on-Fire Problem (Why They Will Pay)
            </h4>
            <p className="bg-amber-50/40 p-4 rounded-xl border border-amber-200/60 text-stone-800 leading-relaxed">
              {idea.problemStatement}
            </p>
          </div>

          {/* Section: Why it is Unsaturated & Defensibility */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-stone-50 p-4 rounded-xl border border-stone-200">
              <h5 className="font-bold text-stone-900 mb-2 flex items-center gap-1.5 text-xs uppercase tracking-wider text-emerald-800">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                Why Big Tech Ignores This
              </h5>
              <p className="text-xs text-stone-600 leading-relaxed">
                {idea.whyUnsaturated}
              </p>
            </div>

            <div className="bg-stone-50 p-4 rounded-xl border border-stone-200">
              <h5 className="font-bold text-stone-900 mb-2 flex items-center gap-1.5 text-xs uppercase tracking-wider text-stone-800">
                <Layers className="w-4 h-4 text-stone-600" />
                The Product Moat
              </h5>
              <p className="text-xs text-stone-600 leading-relaxed">
                {idea.moatFactor}
              </p>
            </div>
          </div>

          {/* Section: What this replaces */}
          <div className="bg-stone-50 p-3.5 rounded-xl border border-stone-200 flex items-start gap-3">
            <Table className="w-5 h-5 text-stone-500 mt-0.5 shrink-0" />
            <div>
              <span className="font-bold text-stone-900 text-xs block">Current Manual Competitor:</span>
              <span className="text-xs text-stone-600">{idea.spreadsheetReplaced}</span>
            </div>
          </div>

          {/* Section: Minimum Monetizable Product (MMP) Scope */}
          <div>
            <h4 className="font-bold text-base text-stone-900 mb-2 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              Minimum Monetizable Product (Build in 2-3 Weeks)
            </h4>
            <p className="text-xs text-stone-500 mb-2.5">
              Only build these core features for early paying customers. Defer everything else until after revenue:
            </p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {idea.presellPlaybook.mmpScope.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2 bg-stone-50 p-2.5 rounded-lg border border-stone-200/80 text-xs">
                  <span className="w-4 h-4 rounded-full bg-stone-200 text-stone-700 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span className="text-stone-700 font-medium">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Section: Key Risks & Traps */}
          <div>
            <h5 className="font-bold text-xs uppercase tracking-wider text-stone-500 mb-2">
              Validation Traps to Avoid
            </h5>
            <div className="space-y-1.5">
              {idea.keyRisks.map((risk, idx) => (
                <div key={idx} className="text-xs text-stone-600 flex items-start gap-2">
                  <span className="text-amber-500 font-bold">•</span>
                  <span>{risk}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-stone-200 bg-stone-50 flex flex-wrap items-center justify-between gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2.5 text-xs font-semibold text-stone-600 hover:text-stone-900 transition-colors"
          >
            Close
          </button>
          <div className="flex items-center gap-2">
            {isFreightApp && onOpenApp && (
              <button
                onClick={() => {
                  onClose();
                  onOpenApp();
                }}
                className="px-4 py-2.5 text-xs font-bold text-white bg-emerald-700 hover:bg-emerald-600 rounded-xl transition-all shadow flex items-center gap-1.5"
              >
                <Truck className="w-4 h-4 text-amber-300" />
                Launch Working Freight App
              </button>
            )}
            <button
              onClick={() => {
                onClose();
                onOpenPresell(idea);
              }}
              className="px-5 py-2.5 text-xs font-bold text-white bg-stone-900 hover:bg-stone-800 rounded-xl transition-all shadow flex items-center gap-2"
            >
              <Send className="w-4 h-4 text-amber-400" />
              Open Pre-Sell Outreach Studio
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
