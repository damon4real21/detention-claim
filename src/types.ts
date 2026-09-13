export interface PresellPlaybook {
  hook: string;
  coldEmailSubject: string;
  coldEmailBody: string;
  linkedInDM: string;
  discoveryQuestions: string[];
  earlyBirdOffer: string;
  letterOfIntentSummary: string;
  mmpScope: string[]; // Minimum Monetizable Product features (Week 1-3)
}

export interface SaasIdea {
  id: string;
  title: string;
  tagline: string;
  category: "Vertical SaaS" | "Compliance & RegTech" | "Operations & Logistics" | "Specialized Healthcare" | "B2B Trade & Construction";
  saturationScore: number; // 1 to 5 (1 = highly unsaturated, 5 = saturated)
  targetBuyer: string;
  decisionMakerTitle: string;
  targetBusinessSize: string;
  problemStatement: string;
  whyUnsaturated: string;
  moatFactor: string;
  spreadsheetReplaced: string;
  pricingMonthly: {
    starter: number;
    pro: number;
    enterprise?: number;
  };
  estimatedACV: string; // e.g. "$2,500 - $6,000 / yr"
  salesCycleDays: string; // e.g. "7 - 21 days"
  difficultyLevel: "Low (No-code / Fast MVP)" | "Medium (Full-stack CRUD)" | "High (Heavy Integrations)";
  keyRisks: string[];
  presellPlaybook: PresellPlaybook;
}

export interface ScorecardInputs {
  budgetAuthority: number; // 1-10
  painFrequency: number; // 1-10
  spreadsheetFriction: number; // 1-10
  regulatoryOrFinancialRisk: number; // 1-10
  reachabilityOfICP: number; // 1-10
}

export interface GeneratedIdea {
  title: string;
  industry: string;
  summary: string;
  saturationLevel: string;
  saturationScore: number;
  targetBuyer: string;
  pricingTier: string;
  spreadsheetReplaced: string;
  presellAngle: string;
  pilotDepositRecommendation: string;
}

export type FreightLoadStatus = 
  | "scheduled" 
  | "arrived_free_time" 
  | "in_detention" 
  | "departed_pending_claim" 
  | "claim_submitted" 
  | "paid" 
  | "disputed";

export interface CarrierProfile {
  name: string;
  dotNumber: string;
  mcNumber: string;
  billingEmail: string;
  phone: string;
  address: string;
  cityStateZip: string;
  defaultDetentionRate: number; // e.g. 75
  defaultFreeTimeHours: number; // e.g. 2
}

export interface FreightLoad {
  id: string;
  loadNumber: string;
  rateConNumber: string;
  status: FreightLoadStatus;
  broker: {
    name: string;
    mcNumber: string;
    billingEmail: string;
    phone: string;
    contactPerson: string;
  };
  driver: {
    name: string;
    phone: string;
    truckNumber: string;
    trailerNumber: string;
  };
  facility: {
    name: string;
    type: "shipper" | "receiver";
    address: string;
    city: string;
    state: string;
    zip: string;
    dockNumber?: string;
  };
  terms: {
    freeTimeHours: number;
    hourlyRate: number;
    incrementMinutes: number; // 15 or 30 mins
    advanceNoticeSent: boolean;
    advanceNoticeTime?: string;
  };
  arrival: {
    timestamp: string; // ISO string
    latitude?: number;
    longitude?: number;
    accuracyMeters?: number;
    method: "gps_automatic" | "manual_entry";
    notes?: string;
  };
  departure?: {
    timestamp: string; // ISO string
    latitude?: number;
    longitude?: number;
    accuracyMeters?: number;
    receiverSignatureName?: string;
  };
  bolDocument?: {
    imageUrl?: string;
    bolNumber: string;
    inTimeOnBol?: string;
    outTimeOnBol?: string;
    hasSignature: boolean;
    uploadedAt: string;
  };
  calculations: {
    totalDwellMinutes: number;
    freeTimeMinutes: number;
    detentionMinutes: number;
    billableHours: number;
    totalClaimAmount: number;
  };
  claimHistory?: {
    submittedAt?: string;
    recipientEmail?: string;
    claimReference?: string;
    statusNotes?: string;
    paidAmount?: number;
    paidDate?: string;
  };
  createdAt: string;
}

