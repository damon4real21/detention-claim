import express, { Request, Response } from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy-initialized Gemini client helper
function getGeminiClient(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return null;
  }
  return new GoogleGenAI({
    apiKey: apiKey,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });
}

// Health check endpoint
app.get("/api/health", (_req: Request, res: Response) => {
  res.json({ status: "ok", hasApiKey: !!process.env.GEMINI_API_KEY });
});

// Endpoint: Evaluate custom SaaS idea for saturation and pre-sellability
app.post("/api/ai/evaluate-idea", async (req: Request, res: Response) => {
  try {
    const { ideaTitle, industry, description } = req.body;
    if (!ideaTitle && !description) {
      res.status(400).json({ error: "Please provide an idea title or description." });
      return;
    }

    const ai = getGeminiClient();
    if (!ai) {
      // Fallback heuristics if API key is not configured
      res.json({
        saturationScore: 3, // 1 to 10 (lower is less saturated)
        saturationVerdict: "Moderately Unsaturated - Vertical specialization required",
        whyUnsaturated: "Broad competitors ignore narrow sub-workflows with distinct data structures and regulatory nuances.",
        idealCustomerProfile: "Operations Managers and Owners at 5-50 person companies in " + (industry || "this sector"),
        typicalBudget: "$150 - $450 / month",
        manualCompetitor: "Clunky Excel sheets with shared Dropbox/OneDrive folders and email chains",
        moatFactor: "Bespoke compliance outputs and specialized integration to industry systems of record",
        presellPitch: `Hi [Name], I noticed most [Role]s are spending 4+ hours every week manually reconciling [Problem] in spreadsheets. We are building a lightweight 1-click tool that automates this and eliminates audit errors. Would you be open to a 10-min feedback call in exchange for 6 months free access upon early release?`,
        risks: [
          "Ensure the buyer has discretionary card budget under $500/mo without needing procurement committee",
          "Avoid building generic features before securing 3 signed LOIs or early deposits"
        ]
      });
      return;
    }

    const prompt = `Analyze this B2B SaaS idea for market saturation and provide a rigorous "Sell Before You Build" pre-sale plan:
Idea Title: ${ideaTitle || "Untitled"}
Industry / Niche: ${industry || "General B2B"}
Description: ${description || ""}

Return a JSON object with:
- saturationScore: number from 1 to 10 (1 = completely blue ocean / unsaturated, 10 = saturated red ocean like generic CRM)
- saturationVerdict: string summary of market saturation
- whyUnsaturated: string explaining why Salesforce, HubSpot, or generic AI wrappers cannot easily crush this
- idealCustomerProfile: string title and business size with budget
- typicalBudget: string expected monthly or annual contract value
- manualCompetitor: string (e.g. what Excel sheet or paper process this kills)
- moatFactor: string (data moat, regulatory anchor, or workflow lock-in)
- presellPitch: string (a crisp 3-sentence cold email/LinkedIn DM to test demand and get 15-min discovery calls)
- risks: array of strings (2-3 honest traps to avoid during validation)`;

    const response = await ai.models.generateContent({
      model: "gemini-3.8-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            saturationScore: { type: Type.NUMBER },
            saturationVerdict: { type: Type.STRING },
            whyUnsaturated: { type: Type.STRING },
            idealCustomerProfile: { type: Type.STRING },
            typicalBudget: { type: Type.STRING },
            manualCompetitor: { type: Type.STRING },
            moatFactor: { type: Type.STRING },
            presellPitch: { type: Type.STRING },
            risks: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            }
          },
          required: ["saturationScore", "saturationVerdict", "whyUnsaturated", "idealCustomerProfile", "typicalBudget", "manualCompetitor", "moatFactor", "presellPitch", "risks"]
        }
      }
    });

    const parsed = JSON.parse(response.text || "{}");
    res.json(parsed);
  } catch (err: any) {
    console.error("Evaluation error:", err);
    res.status(500).json({ error: err.message || "Failed to evaluate idea" });
  }
});

// Endpoint: Generate niche unsaturated ideas based on user background/interest
app.post("/api/ai/generate-niche-ideas", async (req: Request, res: Response) => {
  try {
    const { background, preferences } = req.body;
    const ai = getGeminiClient();

    if (!ai) {
      res.json({
        ideas: [
          {
            title: "Subcontractor Lien Waiver & Insurance Expiry Sentinel",
            industry: "Commercial Construction & Subcontracting",
            summary: "Automates collection and verification of state-specific unconditional lien waivers before payroll disbursal.",
            saturationLevel: "Low (Unsaturated)",
            saturationScore: 2,
            targetBuyer: "Construction Project Controller / Office Manager ($2M-$15M revenue GCs)",
            pricingTier: "$249 - $599 / month",
            spreadsheetReplaced: "Massive color-coded Excel tracker with 30+ tabs of PDF scans",
            presellAngle: "Prevent catastrophic project work stoppages and subcontractor payment disputes with automatic vendor signing.",
            pilotDepositRecommendation: "$250 refundable pilot deposit for 50% lifetime discount."
          },
          {
            title: "Independent Truck Dispatcher Detention Fee Auditor",
            industry: "Freight Logistics & Trucking",
            summary: "Generates geo-timestamped proof of warehouse wait times to recover thousands in unpaid broker detention charges.",
            saturationLevel: "Low (Unsaturated)",
            saturationScore: 2,
            targetBuyer: "Independent Freight Dispatchers & Fleet Owners (3-20 trucks)",
            pricingTier: "$149 - $349 / month",
            spreadsheetReplaced: "Text message screenshots and driver paper logbooks",
            presellAngle: "Pays for itself by recovering just 1-2 missed detention fees ($150-$300) in the first week.",
            pilotDepositRecommendation: "Signed LOI for 30-day pilot with no upfront risk."
          }
        ]
      });
      return;
    }

    const prompt = `You are a world-class Micro-SaaS investor and bootstrapper expert.
Generate 3 deeply unsaturated, high-ticket B2B Micro-SaaS ideas tailored to this founder background/interest:
Founder Background or Target Interest: "${background || "Operations, logistics, or specialized service businesses"}"
Founder Preferences: "${preferences || "High willingness to pay, replacing manual spreadsheets, easy to pre-sell with cold outreach"}"

Rules for selection:
1. Must NOT be saturated (no generic CRM, generic AI social media writer, generic habit tracker, or generic project manager).
2. Must solve a painful, recurring problem where businesses currently lose money or waste hours in spreadsheets.
3. Must be sellable via direct outreach (LinkedIn / email / phone) to an identifiable buyer with discretionary budget.
4. Must be viable for a solo founder or small team to build an MVP in 3-4 weeks.

Return a JSON object containing an 'ideas' array.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.8-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            ideas: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  title: { type: Type.STRING },
                  industry: { type: Type.STRING },
                  summary: { type: Type.STRING },
                  saturationLevel: { type: Type.STRING },
                  saturationScore: { type: Type.NUMBER, description: "1 to 10 (1 is least saturated)" },
                  targetBuyer: { type: Type.STRING },
                  pricingTier: { type: Type.STRING },
                  spreadsheetReplaced: { type: Type.STRING },
                  presellAngle: { type: Type.STRING },
                  pilotDepositRecommendation: { type: Type.STRING }
                },
                required: [
                  "title", "industry", "summary", "saturationLevel",
                  "saturationScore", "targetBuyer", "pricingTier",
                  "spreadsheetReplaced", "presellAngle", "pilotDepositRecommendation"
                ]
              }
            }
          },
          required: ["ideas"]
        }
      }
    });

    const parsed = JSON.parse(response.text || '{"ideas":[]}');
    res.json(parsed);
  } catch (err: any) {
    console.error("Idea generation error:", err);
    res.status(500).json({ error: err.message || "Failed to generate ideas" });
  }
});

// Endpoint: Generate personalized pre-sell kit (Cold Email, LinkedIn, LOI, Interview Script)
app.post("/api/ai/generate-presell-kit", async (req: Request, res: Response) => {
  try {
    const { ideaTitle, targetBuyer, coreProblem, pricing } = req.body;
    const ai = getGeminiClient();

    if (!ai) {
      res.json({
        coldEmail: {
          subject: `Quick question regarding ${coreProblem || "your workflow"} at {{Company}}?`,
          body: `Hi {{FirstName}},\n\nI noticed you oversee operations at {{Company}}. I'm currently researching how companies in your space handle ${coreProblem || "this workflow"}.\n\nFrom our interviews with other leaders, we found teams lose 5-10 hours a week juggling manual spreadsheets and chasing missing paperwork.\n\nWe are prototyping a purpose-built tool to eliminate this entirely. I am not trying to sell you anything today—I just want to make sure we are solving the real headache.\n\nWould you be open to a 12-minute feedback conversation next Tuesday? In exchange, I'll give your team 6 months of free founding member access when we launch.\n\nBest,\n[Your Name]`
        },
        linkedInDM: `Hi {{FirstName}} - saw your impressive work leading operations at {{Company}}. We're building a lightweight tool to replace the manual spreadsheets teams use for ${coreProblem || "this process"}. Would love 10 minutes of your feedback in exchange for lifetime founding member perks. Open to a quick chat?`,
        letterOfIntentText: `PILOT LETTER OF INTENT (NON-BINDING)\n\nDate: [Current Date]\nCompany: [Prospective Customer Name]\nVendor: [Your Company / Founder Name]\n\nRE: Early Adopter Pilot Agreement for ${ideaTitle || "SaaS Solution"}\n\n1. Purpose: [Company] agrees to participate as a Charter Founding Partner in testing the beta release of ${ideaTitle || "the software"}.\n2. Pilot Terms: A 30-day testing period with direct access to founding engineering team.\n3. Founding Pricing: Upon successful pilot, [Company] receives a guaranteed 50% discount on standard tier (${pricing || "$199/mo"}) locked for 24 months.\n4. Non-Binding: This LOI expresses mutual intent to validate product-market fit without capital commitment until beta delivery.\n\nSignatures: ____________________`,
        discoveryQuestions: [
          "Can you walk me through the last time you had to deal with this problem? What made it so painful?",
          "How are you solving this right now? Which spreadsheets or third-party tools do you use?",
          "What is the cost of doing nothing or making an error in this process (in hours, penalties, or lost revenue)?",
          "If a tool could fix this tomorrow with zero training, what would be a no-brainer monthly price you wouldn't need a board approval for?"
        ]
      });
      return;
    }

    const prompt = `You are a SaaS pre-sales expert who specializes in "The Mom Test" and pre-selling B2B software before writing code.
Generate a complete, ready-to-use Pre-Sell Kit for this SaaS concept:
Product Name / Concept: ${ideaTitle}
Target Buyer / ICP: ${targetBuyer}
Core Problem Being Solved: ${coreProblem}
Target Price: ${pricing}

Return a JSON object with:
- coldEmail: { subject: string, body: string } (Natural, non-salesy, low-friction, offering early adopter advantage)
- linkedInDM: string (Under 300 characters, high conversion)
- letterOfIntentText: string (Formal yet accessible 1-page Charter Customer Pilot LOI to collect signatures before coding)
- discoveryQuestions: array of strings (4-5 "Mom Test" style questions to uncover true willingness to pay)`;

    const response = await ai.models.generateContent({
      model: "gemini-3.8-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            coldEmail: {
              type: Type.OBJECT,
              properties: {
                subject: { type: Type.STRING },
                body: { type: Type.STRING }
              },
              required: ["subject", "body"]
            },
            linkedInDM: { type: Type.STRING },
            letterOfIntentText: { type: Type.STRING },
            discoveryQuestions: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            }
          },
          required: ["coldEmail", "linkedInDM", "letterOfIntentText", "discoveryQuestions"]
        }
      }
    });

    const parsed = JSON.parse(response.text || "{}");
    res.json(parsed);
  } catch (err: any) {
    console.error("Presell kit generation error:", err);
    res.status(500).json({ error: err.message || "Failed to generate presell kit" });
  }
});

// Vite middleware setup
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req: Request, res: Response) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
