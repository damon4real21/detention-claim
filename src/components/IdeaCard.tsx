import React from "react";
import { SaasIdea } from "../types";
import { ArrowUpRight, DollarSign, Users, Table, Check, Send, Sparkles, ShieldAlert, Truck } from "lucide-react";

interface IdeaCardProps {
  idea: SaasIdea;
  onSelect: (idea: SaasIdea) => void;
  onOpenPresell: (idea: SaasIdea) => void;
  onOpenApp?: (idea: SaasIdea) => void;
}

export const IdeaCard: React.FC<IdeaCardProps> = ({ idea, onSelect, onOpenPresell, onOpenApp }) => {
  const isFreightApp = idea.id === "detention-claim-collector";

  return (
    <div className={`bg-white rounded-2xl border transition-all duration-200 p-6 flex flex-col justify-between group ${
      isFreightApp 
        ? "border-emerald-500 shadow-md ring-1 ring-emerald-500/30" 
        : "border-stone-200/90 shadow-sm hover:shadow-md hover:border-stone-400"
    }`}>
      <div>
        {/* Top Badges */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold bg-stone-100 text-stone-700 border border-stone-200">
            {idea.category}
          </span>
          {isFreightApp ? (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-extrabold bg-emerald-600 text-white shadow-xs animate-pulse">
              <Truck className="w-3 h-3 mr-1 text-amber-300" />
              LIVE BUILT APPLICATION #1
            </span>
          ) : (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1.5 animate-pulse"></span>
              Unsaturated Niche
            </span>
          )}
        </div>

        {/* Title & Tagline */}
        <h3 className="font-display text-lg font-bold text-stone-900 group-hover:text-amber-700 transition-colors mb-2 leading-snug">
          {idea.title}
        </h3>
        <p className="text-sm text-stone-600 line-clamp-2 mb-4 leading-relaxed">
          {idea.tagline}
        </p>

        {/* Key Metrics Grid */}
        <div className="space-y-2.5 mb-5 text-xs text-stone-600 bg-stone-50/80 p-3.5 rounded-xl border border-stone-100">
          <div className="flex items-start justify-between">
            <span className="text-stone-500 flex items-center gap-1 font-medium">
              <Users className="w-3.5 h-3.5 text-stone-400" />
              Target Buyer:
            </span>
            <span className="font-semibold text-stone-900 text-right max-w-[55%] truncate">
              {idea.decisionMakerTitle}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-stone-500 flex items-center gap-1 font-medium">
              <DollarSign className="w-3.5 h-3.5 text-emerald-600" />
              Pricing & ACV:
            </span>
            <span className="font-semibold text-stone-900">
              ${idea.pricingMonthly.starter} - ${idea.pricingMonthly.pro}/mo ({idea.estimatedACV})
            </span>
          </div>

          <div className="flex items-start justify-between">
            <span className="text-stone-500 flex items-center gap-1 font-medium">
              <Table className="w-3.5 h-3.5 text-amber-600" />
              Displaces:
            </span>
            <span className="font-medium text-stone-800 text-right max-w-[55%] truncate" title={idea.spreadsheetReplaced}>
              {idea.spreadsheetReplaced}
            </span>
          </div>
        </div>

        {/* Pre-Sell Hook Preview */}
        <div className="mb-4">
          <div className="text-[11px] font-bold uppercase tracking-wider text-amber-800 mb-1 flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-amber-600" />
            Pre-Sell Pitch Angle:
          </div>
          <p className="text-xs text-stone-700 bg-amber-50/50 p-2.5 rounded-lg border border-amber-200/50 italic">
            "{idea.presellPlaybook.hook}"
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="pt-3 border-t border-stone-100 flex flex-col gap-2">
        {isFreightApp && onOpenApp && (
          <button
            onClick={() => onOpenApp(idea)}
            className="w-full px-3 py-2 text-xs font-bold text-white bg-emerald-700 hover:bg-emerald-600 rounded-lg transition-colors flex items-center justify-center gap-1.5 shadow-sm"
          >
            <Truck className="w-3.5 h-3.5 text-amber-300" />
            <span>Open Working Freight App</span>
          </button>
        )}
        <div className="flex items-center gap-2">
          <button
            onClick={() => onSelect(idea)}
            className="flex-1 px-3 py-2 text-xs font-semibold text-stone-700 hover:text-stone-900 bg-stone-100 hover:bg-stone-200 rounded-lg transition-colors flex items-center justify-center gap-1"
          >
            View Blueprint
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => onOpenPresell(idea)}
            className="flex-1 px-3 py-2 text-xs font-semibold text-white bg-stone-900 hover:bg-stone-800 rounded-lg transition-colors flex items-center justify-center gap-1 shadow-sm"
          >
            <Send className="w-3.5 h-3.5 text-amber-400" />
            Pre-Sell Kit
          </button>
        </div>
      </div>
    </div>
  );
};
