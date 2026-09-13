import React, { useState } from "react";
import { GeneratedIdea, SaasIdea } from "../types";
import { Sparkles, Loader2, ArrowRight, ShieldCheck, DollarSign, Users, Table, Send, Lightbulb } from "lucide-react";

interface AiIdeaGeneratorProps {
  onAdoptIdea: (idea: SaasIdea) => void;
}

export const AiIdeaGenerator: React.FC<AiIdeaGeneratorProps> = ({ onAdoptIdea }) => {
  const [background, setBackground] = useState("");
  const [preferences, setPreferences] = useState("High willingness to pay, replacing manual Excel, low competition, fast pre-sell");
  const [loading, setLoading] = useState(false);
  const [generatedIdeas, setGeneratedIdeas] = useState<GeneratedIdea[]>([]);
  const [error, setError] = useState<string | null>(null);

  const quickPrompts = [
    "Commercial Landscaping & Tree Care Compliance",
    "Specialty Dental Lab Prosthetic Orders",
    "Marine Boatyard & Marina Slip Maintenance",
    "Independent Pharmacy DEA Drug Auditing",
    "Commercial Kitchen Fire Suppression & Hood Certs"
  ];

  const handleGenerate = async (targetBg?: string) => {
    const activeBg = targetBg || background;
    if (!activeBg.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/ai/generate-niche-ideas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          background: activeBg,
          preferences: preferences
        })
      });

      if (!response.ok) {
        throw new Error("Failed to generate ideas from server.");
      }

      const data = await response.json();
      setGeneratedIdeas(data.ideas || []);
    } catch (err: any) {
      console.error(err);
      setError("Unable to connect to AI engine. Generating offline blueprints instead.");
      // Fallback
      setGeneratedIdeas([
        {
          title: "HoodCert: Commercial Kitchen Fire Suppression & Exhaust Log",
          industry: "Restaurant Safety & Hospitality",
          summary: "Tracks semi-annual NFPA 96 hood cleanings and fire suppression certifications to prevent municipal health closures.",
          saturationLevel: "Low (Unsaturated)",
          saturationScore: 2,
          targetBuyer: "Restaurant General Managers & Multi-Unit Franchisees",
          pricingTier: "$99 - $249 / month",
          spreadsheetReplaced: "Greasy paper tags stapled to ventilation hoods and lost technician receipts",
          presellAngle: "Never fail a surprise fire marshal or health inspector audit with automated sticker log.",
          pilotDepositRecommendation: "Signed LOI for free 30-day trial with $100 refundable lock."
        },
        {
          title: "SlipMaster: Marina Slip Lease & Electric Meter Billing",
          industry: "Maritime & Marina Management",
          summary: "Automates seasonal boat slip renewals, transient dock bookings, and shore-power sub-metering.",
          saturationLevel: "Low (Unsaturated)",
          saturationScore: 2,
          targetBuyer: "Independent Marina Harbormasters & Yacht Club Managers",
          pricingTier: "$179 - $399 / month",
          spreadsheetReplaced: "Laminated whiteboard maps and handwritten electric meter clipboards",
          presellAngle: "Eliminate unbilled electric consumption and missed slip lease renewal deposits.",
          pilotDepositRecommendation: "Pre-order 50% discount charter partnership."
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const convertToSaasIdea = (gen: GeneratedIdea): SaasIdea => {
    return {
      id: `custom-${Date.now()}`,
      title: gen.title,
      tagline: gen.summary,
      category: "Vertical SaaS",
      saturationScore: gen.saturationScore || 1,
      targetBuyer: gen.targetBuyer,
      decisionMakerTitle: gen.targetBuyer.split("(")[0].trim(),
      targetBusinessSize: "5-50 staff",
      problemStatement: gen.summary,
      whyUnsaturated: "Generic tools like Notion and Salesforce don't understand the niche workflow or compliance standards.",
      moatFactor: "Specialized workflow automation and custom reporting formats.",
      spreadsheetReplaced: gen.spreadsheetReplaced,
      pricingMonthly: {
        starter: 149,
        pro: 299,
        enterprise: 599
      },
      estimatedACV: "$2,000 - $4,500 / yr",
      salesCycleDays: "7 - 21 days",
      difficultyLevel: "Medium (Full-stack CRUD)",
      keyRisks: [
        "Validate pricing before coding",
        "Confirm buyer has credit card swipe authority"
      ],
      presellPlaybook: {
        hook: gen.presellAngle,
        coldEmailSubject: `Quick question about ${gen.industry} operations at {{Company}}?`,
        coldEmailBody: `Hi {{FirstName}},\n\nI noticed you oversee operations at {{Company}}.\n\nWe're researching how leaders in your space handle ${gen.summary.toLowerCase()}.\n\nAre you still managing this in spreadsheets and chasing paperwork by hand?\n\nWe are prototyping a purpose-built tool to automate this entirely. Would you be open to a 12-minute feedback conversation this Thursday? In exchange, I'll give your team 6 months of free founding member access when we launch.\n\nBest,\n[Your Name]`,
        linkedInDM: `Hi {{FirstName}} - saw your leadership at {{Company}}. We're building a lightweight tool to eliminate the manual headaches in ${gen.summary.toLowerCase()}. Would love 10 minutes of your feedback in exchange for lifetime founder perks!`,
        discoveryQuestions: [
          "Can you walk me through the last time you handled this workflow?",
          "What is the cost in hours or potential fines if an error slips through?",
          "How are you solving this right now in spreadsheets or legacy software?",
          "If a tool fixed this in 1 click, what would you gladly pay each month?"
        ],
        earlyBirdOffer: gen.pilotDepositRecommendation,
        letterOfIntentSummary: "Non-binding pilot agreement for 30-day early access.",
        mmpScope: [
          "Core digital record workflow",
          "Automated PDF export report",
          "Status dashboard with alerts"
        ]
      }
    };
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Search & Prompt Box */}
      <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm space-y-4">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-700">
          <Sparkles className="w-3.5 h-3.5 text-amber-600" />
          Powered by Gemini Intelligence
        </div>
        <h2 className="font-display text-2xl font-bold text-stone-900">
          Discover Unsaturated Micro-SaaS for Your Specific Niche
        </h2>
        <p className="text-stone-600 text-sm">
          Enter an industry you know, your past job background, or a hobby. We'll identify overlooked, high-margin B2B problems with low competition and an immediate pre-sell script.
        </p>

        <div className="space-y-3 pt-2">
          <div>
            <label className="block text-xs font-bold text-stone-700 mb-1">
              Your Background, Job Experience, or Target Industry:
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={background}
                onChange={(e) => setBackground(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleGenerate()}
                placeholder="e.g. Commercial HVAC, Veterinary Clinics, Civil Engineering, Local Marinas, Truck Dispatching..."
                className="flex-1 bg-stone-50 border border-stone-300 rounded-xl px-4 py-2.5 text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-stone-900"
              />
              <button
                onClick={() => handleGenerate()}
                disabled={loading || !background.trim()}
                className="px-5 py-2.5 bg-stone-900 hover:bg-stone-800 disabled:opacity-50 text-white rounded-xl text-xs font-bold transition-all shadow flex items-center gap-2 shrink-0"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-amber-400" />
                    Scanning Market...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-amber-400" />
                    Find Unsaturated Niches
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Quick Click Inspiration */}
          <div>
            <span className="text-[11px] font-semibold text-stone-400 uppercase tracking-wider block mb-1.5">
              Quick Inspiration:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {quickPrompts.map((prompt, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setBackground(prompt);
                    handleGenerate(prompt);
                  }}
                  className="px-2.5 py-1 text-xs rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 font-medium transition-colors border border-stone-200/60"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Generated Results */}
      {generatedIdeas.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-display font-bold text-lg text-stone-900 flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-amber-600" />
              Custom Unsaturated Blueprints
            </h3>
            <span className="text-xs text-stone-500 font-medium">
              Click "Launch Pre-Sell Kit" to get outreach scripts
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {generatedIdeas.map((gen, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-stone-200 shadow-sm p-5 flex flex-col justify-between hover:border-stone-400 transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="px-2.5 py-0.5 text-xs font-semibold rounded bg-stone-100 text-stone-700">
                      {gen.industry}
                    </span>
                    <span className="px-2 py-0.5 text-xs font-bold rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                      Score: {gen.saturationScore}/10 (Unsaturated)
                    </span>
                  </div>

                  <h4 className="font-display font-bold text-base text-stone-900 mb-1.5">
                    {gen.title}
                  </h4>
                  <p className="text-xs text-stone-600 mb-3 leading-relaxed">
                    {gen.summary}
                  </p>

                  <div className="space-y-1.5 text-xs text-stone-600 bg-stone-50 p-3 rounded-xl border border-stone-100 mb-3">
                    <div>
                      <strong className="text-stone-700">Target Buyer:</strong> {gen.targetBuyer}
                    </div>
                    <div>
                      <strong className="text-stone-700">Replaces:</strong> {gen.spreadsheetReplaced}
                    </div>
                    <div>
                      <strong className="text-stone-700">Pricing:</strong> {gen.pricingTier}
                    </div>
                  </div>

                  <div className="text-xs text-stone-700 bg-amber-50/50 p-2.5 rounded-lg border border-amber-200/50 mb-4">
                    <span className="font-bold text-amber-800 block text-[11px] uppercase">
                      Pre-Sell Hook:
                    </span>
                    "{gen.presellAngle}"
                  </div>
                </div>

                <button
                  onClick={() => onAdoptIdea(convertToSaasIdea(gen))}
                  className="w-full py-2.5 px-4 text-xs font-bold text-white bg-stone-900 hover:bg-stone-800 rounded-xl transition-all shadow flex items-center justify-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5 text-amber-400" />
                  Launch Pre-Sell Kit for This Idea
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
