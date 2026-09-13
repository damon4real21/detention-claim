import React, { useState } from "react";
import { SaasIdea } from "../types";
import { Copy, Check, Download, Mail, Linkedin, FileText, HelpCircle, Layout, Sparkles, RefreshCw } from "lucide-react";

interface PresellKitViewerProps {
  idea: SaasIdea;
  allIdeas: SaasIdea[];
  onSelectIdea: (idea: SaasIdea) => void;
}

export const PresellKitViewer: React.FC<PresellKitViewerProps> = ({ idea, allIdeas, onSelectIdea }) => {
  const [activeSubTab, setActiveSubTab] = useState<"email" | "linkedin" | "loi" | "discovery" | "landing">("email");
  const [founderName, setFounderName] = useState("Alex Founder");
  const [targetCompany, setTargetCompany] = useState("Apex Construction Services");
  const [targetName, setTargetName] = useState("Sarah");
  const [offerPrice, setOfferPrice] = useState(`$${idea.pricingMonthly.starter}/mo`);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  // Interpolate user variables into templates
  const coldEmailSubject = idea.presellPlaybook.coldEmailSubject.replace("{{Company}}", targetCompany);
  const coldEmailBody = idea.presellPlaybook.coldEmailBody
    .replace(/\{\{FirstName\}\}/g, targetName)
    .replace(/\{\{Company\}\}/g, targetCompany)
    .replace("[Your Name]", founderName);

  const linkedInDM = idea.presellPlaybook.linkedInDM
    .replace(/\{\{FirstName\}\}/g, targetName)
    .replace(/\{\{Company\}\}/g, targetCompany);

  const loiText = `PILOT LETTER OF INTENT (NON-BINDING CHARTER CUSTOMER AGREEMENT)

DATE: ${new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
TARGET PARTNER: ${targetCompany}
ATTENTION: ${targetName}, ${idea.decisionMakerTitle}
FOUNDER / VENDOR: ${founderName} (Lead Developer, ${idea.title.split(":")[0]})

RE: Early Access & Beta Co-Development Pilot

1. PURPOSE & INTENT:
${targetCompany} ("Partner") expresses interest in piloting the beta release of ${idea.title.split(":")[0]}, a software tool designed to ${idea.tagline.toLowerCase()}.

2. PILOT DURATION & ACCESS:
- The Partner will receive 30 days of complimentary access to the private beta upon initial deployment.
- The Partner will have direct phone and Slack access to the engineering team for custom feedback and rapid workflow adjustments.

3. EXCLUSIVE FOUNDING PARTNER TERMS:
- Upon satisfactory completion of the 30-day pilot, Partner shall have the exclusive right to lock in Founding Member Pricing at ${offerPrice} (representing a guaranteed 50% discount from the standard commercial rate of $${idea.pricingMonthly.pro}/mo).
- This discounted rate shall be guaranteed for twenty-four (24) consecutive months.

4. NON-BINDING ACKNOWLEDGMENT:
This Letter of Intent serves to confirm mutual business intent and validate product requirements. It creates no binding financial commitment until a formal master service agreement is executed following successful pilot delivery.

ACCEPTED AND AGREED:

For ${targetCompany}:                       For Software Developer:

_______________________________             _______________________________
Signature                                   Signature
Name: ${targetName}                         Name: ${founderName}
Title: ${idea.decisionMakerTitle}           Title: Founder`;

  const discoveryScript = `# 15-Minute "Mom Test" Customer Discovery Script
Target ICP: ${idea.decisionMakerTitle} at ${targetCompany}
Core Goal: Validate if the problem is a hair-on-fire priority, learn their current spreadsheet workaround, and confirm budget.

## PHASE 1: The Warm-Up (2 Minutes)
"Hi ${targetName}, thanks so much for taking 12 minutes. As mentioned, I'm researching how companies like ${targetCompany} handle ${idea.tagline.toLowerCase()}. I'm not here to pitch or sell you software today—I just want to understand your real day-to-day workflow."

## PHASE 2: Uncovering Past Behavior (5 Minutes)
1. "${idea.presellPlaybook.discoveryQuestions[0]}"
2. "${idea.presellPlaybook.discoveryQuestions[1]}"
*Rule: Never ask 'Would you like a tool that does X?'. Ask 'How did you solve this the last time it happened?'*

## PHASE 3: Calculating The Financial Pain (4 Minutes)
3. "${idea.presellPlaybook.discoveryQuestions[2]}"
- Dig into: "How many hours did that cost? Did anyone get fined or risk customer churn?"

## PHASE 4: The Soft Pre-Sell Commitment (3 Minutes)
4. "${idea.presellPlaybook.discoveryQuestions[3]}"
- "We are currently onboarding 5 Charter Founding Partners who get hands-on engineering customization and 50% off for life. If we delivered an MVP in 3 weeks that fixed this, would you be willing to test it on 1 active project?"`;

  const landingPageCopy = `# High-Converting Pre-Sell Landing Page Copy

[HERO SECTION]
Headline: ${idea.title.split(":")[0]}: ${idea.tagline}
Subheadline: Stop wasting hours in ${idea.spreadsheetReplaced}. Purpose-built for ${idea.targetBuyer}.
CTA Button: "Join the Founding Beta (First 10 Spots Only)"
Social Proof Subtext: "Co-designed with active ${idea.decisionMakerTitle}s."

[THE 3 BIG HEADACHES WE ELIMINATE]
1. The Audit & Compliance Risk:
   ${idea.problemStatement.split(".")[0]}.
2. The Manual Spreadsheet Chaos:
   Replaces: ${idea.spreadsheetReplaced}.
3. The Enterprise Bloat:
   ${idea.whyUnsaturated}

[EARLY ADOPTER CHARTER OFFER]
- Lifetime 50% Discount: Lock in ${offerPrice} forever (Standard: $${idea.pricingMonthly.pro}/mo)
- Direct Access to Founder/Developer
- 100% Money-Back Satisfaction Guarantee if we don't save you at least 5 hours in month 1`;

  const downloadFullKit = () => {
    const fullContent = `# Pre-Sell Validation Kit: ${idea.title}

## 1. COLD EMAIL OUTREACH
Subject: ${coldEmailSubject}

${coldEmailBody}

--------------------------------------------------

## 2. LINKEDIN INMAIL / DIRECT MESSAGE
${linkedInDM}

--------------------------------------------------

## 3. CHARTER PILOT LETTER OF INTENT (LOI)
${loiText}

--------------------------------------------------

## 4. DISCOVERY INTERVIEW SCRIPT
${discoveryScript}

--------------------------------------------------

## 5. LANDING PAGE COPY
${landingPageCopy}
`;

    const blob = new Blob([fullContent], { type: "text/markdown;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `presell-kit-${idea.id}.md`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner & Idea Selector */}
      <div className="bg-white rounded-2xl p-5 border border-stone-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="text-xs font-bold uppercase tracking-wider text-amber-700 mb-1 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            Active Pre-Sell Campaign
          </div>
          <h2 className="font-display text-xl font-bold text-stone-900">
            {idea.title}
          </h2>
          <p className="text-xs text-stone-500 mt-0.5">
            {idea.tagline}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <label className="text-xs font-semibold text-stone-600 shrink-0">Switch Blueprint:</label>
          <select
            value={idea.id}
            onChange={(e) => {
              const found = allIdeas.find((i) => i.id === e.target.value);
              if (found) onSelectIdea(found);
            }}
            className="text-xs font-medium bg-stone-50 border border-stone-300 rounded-lg px-3 py-2 text-stone-900 focus:outline-none focus:ring-2 focus:ring-stone-900"
          >
            {allIdeas.map((i) => (
              <option key={i.id} value={i.id}>
                {i.title.split(":")[0]} ({i.category})
              </option>
            ))}
          </select>
          <button
            onClick={downloadFullKit}
            className="px-3.5 py-2 text-xs font-semibold text-stone-900 bg-stone-100 hover:bg-stone-200 rounded-lg transition-colors flex items-center gap-1.5 border border-stone-300 shrink-0"
            title="Download full kit as Markdown"
          >
            <Download className="w-3.5 h-3.5" />
            Export .MD
          </button>
        </div>
      </div>

      {/* Campaign Customizer Controls */}
      <div className="bg-stone-50 p-4 rounded-xl border border-stone-200">
        <h4 className="text-xs font-bold uppercase tracking-wider text-stone-600 mb-3">
          Step 1: Personalize Your Outreach & Offer
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
          <div>
            <label className="block text-stone-500 font-medium mb-1">Your Name / Title</label>
            <input
              type="text"
              value={founderName}
              onChange={(e) => setFounderName(e.target.value)}
              className="w-full bg-white border border-stone-300 rounded-lg px-3 py-1.5 text-stone-900 focus:outline-none focus:ring-1 focus:ring-stone-900"
            />
          </div>
          <div>
            <label className="block text-stone-500 font-medium mb-1">Target Company</label>
            <input
              type="text"
              value={targetCompany}
              onChange={(e) => setTargetCompany(e.target.value)}
              className="w-full bg-white border border-stone-300 rounded-lg px-3 py-1.5 text-stone-900 focus:outline-none focus:ring-1 focus:ring-stone-900"
            />
          </div>
          <div>
            <label className="block text-stone-500 font-medium mb-1">Target First Name</label>
            <input
              type="text"
              value={targetName}
              onChange={(e) => setTargetName(e.target.value)}
              className="w-full bg-white border border-stone-300 rounded-lg px-3 py-1.5 text-stone-900 focus:outline-none focus:ring-1 focus:ring-stone-900"
            />
          </div>
          <div>
            <label className="block text-stone-500 font-medium mb-1">Early-Bird Price</label>
            <input
              type="text"
              value={offerPrice}
              onChange={(e) => setOfferPrice(e.target.value)}
              className="w-full bg-white border border-stone-300 rounded-lg px-3 py-1.5 text-stone-900 focus:outline-none focus:ring-1 focus:ring-stone-900"
            />
          </div>
        </div>
      </div>

      {/* Asset Sub-Tabs */}
      <div className="flex flex-wrap items-center gap-1.5 border-b border-stone-200 pb-2">
        <button
          onClick={() => setActiveSubTab("email")}
          className={`px-3.5 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${
            activeSubTab === "email"
              ? "bg-stone-900 text-white shadow-sm"
              : "text-stone-600 hover:bg-stone-100 hover:text-stone-900"
          }`}
        >
          <Mail className="w-3.5 h-3.5" />
          Cold Email (15-Min Request)
        </button>

        <button
          onClick={() => setActiveSubTab("linkedin")}
          className={`px-3.5 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${
            activeSubTab === "linkedin"
              ? "bg-stone-900 text-white shadow-sm"
              : "text-stone-600 hover:bg-stone-100 hover:text-stone-900"
          }`}
        >
          <Linkedin className="w-3.5 h-3.5 text-blue-500" />
          LinkedIn InMail / DM
        </button>

        <button
          onClick={() => setActiveSubTab("loi")}
          className={`px-3.5 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${
            activeSubTab === "loi"
              ? "bg-stone-900 text-white shadow-sm"
              : "text-stone-600 hover:bg-stone-100 hover:text-stone-900"
          }`}
        >
          <FileText className="w-3.5 h-3.5 text-emerald-600" />
          Pilot Letter of Intent (LOI)
        </button>

        <button
          onClick={() => setActiveSubTab("discovery")}
          className={`px-3.5 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${
            activeSubTab === "discovery"
              ? "bg-stone-900 text-white shadow-sm"
              : "text-stone-600 hover:bg-stone-100 hover:text-stone-900"
          }`}
        >
          <HelpCircle className="w-3.5 h-3.5 text-amber-600" />
          15-Min Discovery Script
        </button>

        <button
          onClick={() => setActiveSubTab("landing")}
          className={`px-3.5 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${
            activeSubTab === "landing"
              ? "bg-stone-900 text-white shadow-sm"
              : "text-stone-600 hover:bg-stone-100 hover:text-stone-900"
          }`}
        >
          <Layout className="w-3.5 h-3.5" />
          Pre-Sell Landing Copy
        </button>
      </div>

      {/* Asset Content Display */}
      <div className="bg-white rounded-2xl border border-stone-200 shadow-sm p-6 relative">
        {/* EMAIL TAB */}
        {activeSubTab === "email" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-stone-100">
              <span className="text-xs font-bold text-stone-500 uppercase tracking-wider">
                Target: {idea.decisionMakerTitle}
              </span>
              <button
                onClick={() => handleCopy(`Subject: ${coldEmailSubject}\n\n${coldEmailBody}`, "email")}
                className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-stone-900 hover:bg-stone-800 text-white transition-colors flex items-center gap-1.5"
              >
                {copiedKey === "email" ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                {copiedKey === "email" ? "Copied to Clipboard!" : "Copy Full Email"}
              </button>
            </div>

            <div className="bg-stone-50 p-3 rounded-lg border border-stone-200 text-xs">
              <span className="font-bold text-stone-700">Subject: </span>
              <span className="text-stone-900 font-mono">{coldEmailSubject}</span>
            </div>

            <div className="bg-stone-50/60 p-4 rounded-xl border border-stone-200 text-stone-800 text-xs sm:text-sm font-mono whitespace-pre-wrap leading-relaxed">
              {coldEmailBody}
            </div>

            <div className="text-xs text-stone-500 bg-amber-50 p-3 rounded-lg border border-amber-200">
              💡 <strong>Why this converts:</strong> It does NOT ask them to buy anything. It validates their spreadsheet pain, respects their time, and offers early access advantage instead of a pushy pitch.
            </div>
          </div>
        )}

        {/* LINKEDIN TAB */}
        {activeSubTab === "linkedin" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-stone-100">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-stone-500 uppercase tracking-wider">LinkedIn DM</span>
                <span className="text-xs font-semibold px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200">
                  {linkedInDM.length} characters (Ideal &lt; 300)
                </span>
              </div>
              <button
                onClick={() => handleCopy(linkedInDM, "linkedin")}
                className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-stone-900 hover:bg-stone-800 text-white transition-colors flex items-center gap-1.5"
              >
                {copiedKey === "linkedin" ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                {copiedKey === "linkedin" ? "Copied!" : "Copy Message"}
              </button>
            </div>

            <div className="bg-stone-50/60 p-5 rounded-xl border border-stone-200 text-stone-900 text-sm font-sans leading-relaxed">
              {linkedInDM}
            </div>

            <div className="text-xs text-stone-500 bg-stone-100 p-3 rounded-lg">
              💡 <strong>Outreach Strategy:</strong> Connect on LinkedIn with a blank invite first. Once accepted, send this message within 4 hours while they are active.
            </div>
          </div>
        )}

        {/* LETTER OF INTENT (LOI) TAB */}
        {activeSubTab === "loi" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-stone-100">
              <div>
                <span className="text-xs font-bold text-stone-500 uppercase tracking-wider block">
                  Charter Customer Agreement
                </span>
                <span className="text-xs text-emerald-700 font-medium">
                  Use this to get signatures before writing a single line of backend code.
                </span>
              </div>
              <button
                onClick={() => handleCopy(loiText, "loi")}
                className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-stone-900 hover:bg-stone-800 text-white transition-colors flex items-center gap-1.5"
              >
                {copiedKey === "loi" ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                {copiedKey === "loi" ? "Copied LOI!" : "Copy Agreement"}
              </button>
            </div>

            <div className="bg-stone-50 p-6 rounded-xl border border-stone-200 text-stone-800 text-xs font-mono whitespace-pre-wrap leading-relaxed">
              {loiText}
            </div>
          </div>
        )}

        {/* DISCOVERY SCRIPT TAB */}
        {activeSubTab === "discovery" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-stone-100">
              <span className="text-xs font-bold text-stone-500 uppercase tracking-wider">
                15-Minute Interview Guide
              </span>
              <button
                onClick={() => handleCopy(discoveryScript, "discovery")}
                className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-stone-900 hover:bg-stone-800 text-white transition-colors flex items-center gap-1.5"
              >
                {copiedKey === "discovery" ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                {copiedKey === "discovery" ? "Copied Script!" : "Copy Script"}
              </button>
            </div>

            <div className="bg-stone-50/60 p-5 rounded-xl border border-stone-200 text-stone-800 text-xs sm:text-sm font-sans whitespace-pre-wrap leading-relaxed">
              {discoveryScript}
            </div>
          </div>
        )}

        {/* LANDING PAGE COPY TAB */}
        {activeSubTab === "landing" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-stone-100">
              <span className="text-xs font-bold text-stone-500 uppercase tracking-wider">
                1-Page Smoke-Test Website Copy
              </span>
              <button
                onClick={() => handleCopy(landingPageCopy, "landing")}
                className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-stone-900 hover:bg-stone-800 text-white transition-colors flex items-center gap-1.5"
              >
                {copiedKey === "landing" ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                {copiedKey === "landing" ? "Copied Copy!" : "Copy Landing Copy"}
              </button>
            </div>

            <div className="bg-stone-50 p-5 rounded-xl border border-stone-200 text-stone-800 text-xs sm:text-sm font-mono whitespace-pre-wrap leading-relaxed">
              {landingPageCopy}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
