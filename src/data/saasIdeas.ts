import { SaasIdea } from "../types";

export const VETTED_SAAS_IDEAS: SaasIdea[] = [
  {
    id: "subcontractor-lien-sentinel",
    title: "LienSentinel: Subcontractor Lien Waiver & COI Automator",
    tagline: "Prevent construction payment stop notices and insurance lapses before payroll checks clear.",
    category: "B2B Trade & Construction",
    saturationScore: 1,
    targetBuyer: "Mid-Market General Contractors ($3M - $25M annual volume)",
    decisionMakerTitle: "Construction Controller / VP of Project Accounting",
    targetBusinessSize: "10-70 employees (subcontracting 15-50 trade crews)",
    problemStatement: "If a general contractor pays a plumbing sub who didn't pay their drywall supplier, the supplier files a mechanic's lien on the commercial property owner, freezing owner funds and halting the job. Controllers currently spend 15+ hours every draw cycle chasing signed PDF waivers and checking whether Certificate of Insurance (COI) policies expired.",
    whyUnsaturated: "Procore and Autodesk Build cost $15,000+/yr and are too complex for mid-sized GCs; generic e-sign tools (DocuSign) do not validate conditional vs. unconditional statutory state waiver templates (e.g., California Civil Code § 8132 vs. Texas Property Code).",
    moatFactor: "State-specific legal statutory form engine and direct sync with QuickBooks Desktop / Sage 100 Contractor.",
    spreadsheetReplaced: "Multi-tab shared Excel master sheet with 100+ PDF email attachments per monthly draw.",
    pricingMonthly: {
      starter: 249,
      pro: 499,
      enterprise: 899
    },
    estimatedACV: "$3,000 - $6,000 / year",
    salesCycleDays: "10 - 20 days",
    difficultyLevel: "Medium (Full-stack CRUD)",
    keyRisks: [
      "Must guarantee legal compliance of statutory waiver language across target states.",
      "Requires clean mobile e-signature flow for subcontractors on jobsites."
    ],
    presellPlaybook: {
      hook: "Reconcile subcontractor lien releases in 60 seconds before issuing progress checks.",
      coldEmailSubject: "Subcontractor lien waiver chasing at {{Company}}?",
      coldEmailBody: "Hi {{FirstName}},\n\nSaw that {{Company}} is handling several active commercial builds right now. Quick question:\n\nWhen your project managers prepare monthly draw applications, how much time does your team lose chasing unconditional lien waivers and verifying that subcontractor worker's comp hasn't expired before disbursing funds?\n\nMost controllers we speak with spend 12-15 hours a week in Excel and email follow-ups to avoid property lien claims.\n\nWe are building a 1-click portal where subs sign their state-compliant waiver right from their phone before the check prints. I'm not selling software today—just doing 12-minute workflow interviews with 10 commercial controllers.\n\nCould I steal 12 minutes this Thursday? In return, you'll get lifetime founding member pricing (50% off) if you ever choose to use it.\n\nBest,\n[Your Name]",
      linkedInDM: "Hi {{FirstName}} - noticed your team at {{Company}} manages multiple trade subs. Are you guys still chasing monthly lien waivers via email/PDF scans? We're prototyping a 1-click mobile waiver collector for GCs. Would love 10 min of your feedback in exchange for free early access.",
      discoveryQuestions: [
        "What happens when a subcontractor submits an invoice without an executed waiver? Do you hold payment or manually track it?",
        "Have you ever had a supplier threaten a mechanic's lien because a second-tier sub didn't disburse funds?",
        "How do you currently verify that an active sub's worker's compensation insurance hasn't lapsed mid-project?",
        "If a tool automatically blocked check release until all signed waivers were verified, what would that be worth each month?"
      ],
      earlyBirdOffer: "$199/month locked forever (regularly $499) + free data migration of current active subs for the first 5 charter GCs.",
      letterOfIntentSummary: "Non-binding pilot agreement where GC agrees to run 1 active project draw cycle through the tool in exchange for white-glove onboarding and 50% discount.",
      mmpScope: [
        "State-specific conditional and unconditional waiver generator",
        "SMS/Email signing link for trade subs (no account required for sub)",
        "Dashboard showing Signed vs. Pending waivers per project draw",
        "PDF export bundle for bank financing inspection"
      ]
    }
  },
  {
    id: "freight-detention-recovery",
    title: "DetentionClaim: Truckload Waiting Time Proof & Recovery",
    tagline: "Recover $2,000+/mo in unpaid freight detention charges with geo-stamped warehouse dwell proof.",
    category: "Operations & Logistics",
    saturationScore: 1,
    targetBuyer: "Independent Freight Dispatchers & Small Fleet Owners (3 to 25 trucks)",
    decisionMakerTitle: "Head of Dispatch / Fleet Owner-Operator",
    targetBusinessSize: "3-25 trucks ($500K - $4M revenue)",
    problemStatement: "Freight brokers contractually owe drivers $50-$100/hr after 2 hours of loading/unloading delay ('detention'). However, brokers routinely reject detention requests claiming the driver arrived late or didn't get the bill of lading (BOL) signed with an in-and-out timestamp. A 5-truck fleet loses $2,000 to $4,500 every month in unpaid detention.",
    whyUnsaturated: "Enterprise TMS solutions (McLeod, TMW) are built for 500-truck mega carriers and cost $20k+ to deploy. Dispatchers currently rely on blurry WhatsApp photos of handwritten paper BOLs.",
    moatFactor: "Geofenced arrival/departure verification paired with automated broker claims email templates compliant with broker detention policies (e.g. C.H. Robinson, TQL).",
    spreadsheetReplaced: "WhatsApp chat history, driver text logs, and lost paper paper receipts.",
    pricingMonthly: {
      starter: 99,
      pro: 199,
      enterprise: 349
    },
    estimatedACV: "$1,500 - $3,000 / year",
    salesCycleDays: "3 - 7 days (ultra-fast decisions by fleet owners)",
    difficultyLevel: "Low (No-code / Fast MVP)",
    keyRisks: [
      "Must make driver check-in as simple as a 1-tap mobile button or automated geofence.",
      "Brokers occasionally push back on electronic timestamps unless standardized."
    ],
    presellPlaybook: {
      hook: "Turn rejected detention claims into recovered cash with automated GPS timestamps.",
      coldEmailSubject: "Unpaid detention recovery for {{Company}} fleet?",
      coldEmailBody: "Hi {{FirstName}},\n\nI see you run dispatch for {{Company}}'s trucks. A quick question:\n\nHow many hours of warehouse detention are your drivers getting stiffed on each month because brokers claim 'the paper BOL timestamp is missing' or 'the driver was late'?\n\nWe spoke to dispatchers who lose $2,000+ per month simply because brokers reject claims on technicalities.\n\nWe built a dead-simple driver link that creates a tamper-proof arrival/departure receipt and auto-emails the detention invoice to the broker before the driver even leaves the gate.\n\nIf you're open to recovering just 1 detention fee this week ($150-$300), let's jump on a 10-minute call. No setup fees, and we guarantee it pays for itself on load #1.\n\nBest,\n[Your Name]",
      linkedInDM: "Hey {{FirstName}}, noticed you run dispatch at {{Company}}. Are brokers still disputing your drivers' detention hours? We built an instant GPS arrival timestamp that forces brokers to approve detention pay. Want to test it on your next delayed load?",
      discoveryQuestions: [
        "How much detention money did your drivers earn last month that brokers refused to pay out?",
        "What is the most common reason brokers give when denying your detention requests?",
        "How do drivers currently submit their signed BOLs and arrival times to dispatch?",
        "If an app recovered just $500 of lost detention every month for $99, would you swipe your card right now?"
      ],
      earlyBirdOffer: "Free 14-day trial on first 10 loads, followed by $79/mo founder pricing.",
      letterOfIntentSummary: "Simple sign-up promise: dispatch team agrees to test on 3 loads experiencing 2+ hour delays.",
      mmpScope: [
        "Driver 1-tap web check-in with GPS verification",
        "In-app photo scanner for signed BOL with stamped time watermark",
        "Automated broker detention demand PDF with pre-filled rate confirmation",
        "Fleet recovery dashboard tracking collected vs. pending claims"
      ]
    }
  },
  {
    id: "vet-anesthesia-records",
    title: "VitalsVet: Paperless Veterinary Anesthesia & Surgical Audit Log",
    tagline: "Ditch paper anesthesia charts and stay 100% compliant with State Veterinary Medical Board audits.",
    category: "Specialized Healthcare",
    saturationScore: 1,
    targetBuyer: "Independent Veterinary Clinics & Animal Hospitals",
    decisionMakerTitle: "Practice Manager / Lead Veterinary Surgeon",
    targetBusinessSize: "1-4 doctors (10-25 clinic staff)",
    problemStatement: "During pet surgeries and dental procedures, technicians must record patient vitals (heart rate, SpO2, EtCO2, blood pressure, temperature, anesthesia gas %) every 5 minutes on a physical paper sheet. Paper records are smeared with fluids, lost, or improperly filed, leading to severe fines during state licensing board inspections and malpractice disputes.",
    whyUnsaturated: "Legacy veterinary software (Cornerstone, AVImark, IDEXX) runs on local Windows servers from the 2000s and has unusable digital anesthesia modules that freeze; cloud PMS tools don't support real-time 5-minute interval tablet charting.",
    moatFactor: "Purpose-built tablet touch interface designed for sterile gloved hands with pre-set drug dose calculators by species/weight.",
    spreadsheetReplaced: "Clipboards with laminated paper grids and illegible pen scratches.",
    pricingMonthly: {
      starter: 149,
      pro: 279,
      enterprise: 449
    },
    estimatedACV: "$2,000 - $4,000 / year",
    salesCycleDays: "14 - 30 days",
    difficultyLevel: "Medium (Full-stack CRUD)",
    keyRisks: [
      "Must function reliably even during intermittent clinic Wi-Fi drops.",
      "High usability requirement: vet techs have wet or gloved hands."
    ],
    presellPlaybook: {
      hook: "Touchscreen anesthesia monitoring compliant with state vet boards in under 3 taps.",
      coldEmailSubject: "Surgical vitals charting at {{Company}}?",
      coldEmailBody: "Hi {{FirstName}},\n\nI hope your surgical schedule isn't too chaotic today. Reaching out because we're researching clinical workflows in private veterinary practices:\n\nAre your technicians still recording anesthesia vitals every 5 minutes on physical clipboards during dental and soft-tissue procedures?\n\nPractices tell us that scanning paper charts into {{PMS_Name}} takes 20 minutes per case, and missing entries are a constant stress during state board inspections.\n\nWe designed a streamlined iPad charting flow specifically for veterinary technicians (big tap targets, instant species drug calculators, 1-click export to your patient files).\n\nI'm seeking 5 practice managers for a 15-minute workflow review. In exchange, I'm providing our comprehensive 2026 Vet Anesthesia Compliance Audit Checklist free.\n\nOpen to a quick screen share this week?\n\nBest,\n[Your Name]",
      linkedInDM: "Hi {{FirstName}} - saw your clinic {{Company}} does extensive surgical & dental care. Are your techs still using paper clipboards for 5-minute anesthesia vitals? We built an iPad-first vitals log tailored for vet practices. Would love your 10-minute feedback.",
      discoveryQuestions: [
        "How do you currently ensure technicians don't miss the 5-minute vitals recording intervals during long surgical cases?",
        "How much time does staff spend scanning and uploading paper surgical logs into your practice management software?",
        "When was your last state board audit, and did record-keeping compliance cause any headaches?",
        "If this saved 15 minutes of tech time per surgery and guaranteed compliance, what would be an easy monthly budget?"
      ],
      earlyBirdOffer: "$129/mo (normally $279) with free tablet stand and 1-on-1 team onboarding.",
      letterOfIntentSummary: "Practice agrees to trial digital tablet charting alongside paper for 2 surgical days to benchmark time savings.",
      mmpScope: [
        "iPad/Tablet-optimized 5-minute timer and rapid vitals entry grid",
        "Species-specific emergency drug dose calculator (emergency dosages by weight)",
        "1-click PDF surgical summary generation",
        "Anesthesia technician digital signature capture"
      ]
    }
  },
  {
    id: "brewery-ttb-excise-tax",
    title: "BrewTax: Craft Brewery TTB Excise & Fermentation Loss Reporter",
    tagline: "Eliminate Federal TTB Form 5130.9 and state excise alcohol calculation nightmares in 1 click.",
    category: "Compliance & RegTech",
    saturationScore: 1,
    targetBuyer: "Independent Craft Breweries & Microbreweries (500 - 15,000 barrels/yr)",
    decisionMakerTitle: "Head Brewer / Brewery Operations Director / Co-Owner",
    targetBusinessSize: "5-30 employees (production brewery with taproom)",
    problemStatement: "Breweries must file federal TTB (Alcohol and Tobacco Tax and Trade Bureau) reports quarterly or monthly. They must account for every gallon mashed, fermented, transferred, packaged into kegs/cans, poured in the taproom, and lost in trub/filtration. Miscalculating excise tax invites federal audits, penalties, and liquor license suspension.",
    whyUnsaturated: "Ekos Brewery Management is expensive ($600+/mo), plagued by slow interface complaints, and enforces massive annual contracts. Microbrewers who just want clean tax compliance and tank batch logs hate it.",
    moatFactor: "Pre-configured federal TTB Form 5130.9 generator matching exact line items (e.g. Line 14 Taproom Pours, Line 22 Fermentation Loss).",
    spreadsheetReplaced: "Nightmarish Excel files with broken formulas tracking tank volume measurements and batch gravity readings.",
    pricingMonthly: {
      starter: 119,
      pro: 229,
      enterprise: 399
    },
    estimatedACV: "$1,500 - $3,000 / year",
    salesCycleDays: "7 - 15 days",
    difficultyLevel: "Medium (Full-stack CRUD)",
    keyRisks: [
      "Must keep up with federal and state alcohol tax rate variations.",
      "Must accurately handle packaging conversions (barrels vs. half-barrels vs. cases of cans)."
    ],
    presellPlaybook: {
      hook: "Generate your TTB Form 5130.9 report in 5 minutes without an expensive $600/mo ERP.",
      coldEmailSubject: "TTB 5130.9 reporting at {{Company}}?",
      coldEmailBody: "Hi {{FirstName}},\n\nI love {{Company}}'s beers. Quick question for your brew team:\n\nAre you still spending the first weekend of every month wrestling with spreadsheets to calculate TTB barrel production, cellar loss, and taproom sales for federal excise reporting?\n\nMost independent brewers we talk to don't want a bloated $700/mo ERP—they just want clean batch tracking that spits out their official TTB report without stress.\n\nWe built a focused tool that tracks tank turns and exports your exact TTB Form 5130.9 line-by-line.\n\nI'd love to show you a 5-minute demo and get your honest feedback. In exchange, I'll send you our Excel TTB reconciliation template completely free.\n\nHave 10 minutes this Wednesday?\n\nCheers,\n[Your Name]",
      linkedInDM: "Hey {{FirstName}}! Quick question: does your team at {{Company}} hate doing the monthly TTB excise tax filings as much as every other head brewer we talk to? We built a lightweight 1-click TTB 5130.9 generator. Would love 8 minutes of your thoughts!",
      discoveryQuestions: [
        "How many hours do you or your accountant spend reconciling barrel loss and taproom volume before submitting TTB returns?",
        "Have you evaluated tools like Ekos, and why did you decide against them (cost, complexity, support)?",
        "What is your biggest fear when submitting your state and federal alcohol excise reports?",
        "If a tool cost $119/mo and did your federal and state filings automatically, would you switch from Excel?"
      ],
      earlyBirdOffer: "$99/mo lifetime license for the first 10 microbreweries, including state excise format customization.",
      letterOfIntentSummary: "Brewery agrees to test their previous quarter's numbers in the tool to compare against their filed return.",
      mmpScope: [
        "Tank cellar batch log (Volume In, Gravity, Cellar Loss, Volume Packaged)",
        "Federal TTB Form 5130.9 line-by-line auto-calculator",
        "Taproom keg depletion reconciler",
        "Exportable tax audit package"
      ]
    }
  },
  {
    id: "trade-school-apprenticeship-hours",
    title: "ApprenticeLog: DOL Registered Apprenticeship & OJT Hour Tracker",
    tagline: "Verify on-the-job training (OJT) competencies and journeyman hours for Department of Labor certification.",
    category: "Vertical SaaS",
    saturationScore: 1,
    targetBuyer: "Vocational Schools, Trade Academies & Union Apprenticeship Programs (Electrical, Plumbing, HVAC)",
    decisionMakerTitle: "Director of Apprenticeship / Training Coordinator",
    targetBusinessSize: "50 - 500 active trade apprentices",
    problemStatement: "State licensing boards and the Federal Department of Labor (RAPIDS) require apprentices to complete 2,000 to 8,000 hours of on-the-job training (OJT) categorized by specific work processes (e.g. 500 hours conduit bending, 300 hours motor controls). Apprentices submit crumpled paper timecards signed by jobsite journeymen. Programs fail state audits due to missing signatures and unverified work categories.",
    whyUnsaturated: "Standard higher-ed LMS software (Canvas, Blackboard) has zero concept of jobsite wage steps, DOL wage progressions, or journeyman geo-signatures; existing trade software is 20-year-old on-premise databases.",
    moatFactor: "Compliance mapping to Department of Labor (DOL) Standard Occupational Classification (SOC) work processes with automated wage progression alerts.",
    spreadsheetReplaced: "Monthly carbon-copy paper booklets and binders stored in filing cabinets.",
    pricingMonthly: {
      starter: 199,
      pro: 399,
      enterprise: 799
    },
    estimatedACV: "$3,500 - $9,000 / year",
    salesCycleDays: "15 - 45 days",
    difficultyLevel: "Medium (Full-stack CRUD)",
    keyRisks: [
      "Must align with state-specific apprenticeship council (SAC) and federal RAPIDS reporting specs.",
      "Apprentice mobile app must work offline in basements and construction jobsites."
    ],
    presellPlaybook: {
      hook: "End paper apprentice timecards and automate DOL RAPIDS wage advancement reports.",
      coldEmailSubject: "Apprentice OJT hour tracking at {{Company}}?",
      coldEmailBody: "Hi {{FirstName}},\n\nI noticed {{Company}} trains top-tier apprentices across {{Trade_Name}} programs.\n\nQuick question: How is your staff currently collecting and approving monthly on-the-job training (OJT) hours and work process competencies from employer jobsites?\n\nMost program directors we speak with are buried in paper booklets, manually tallying hours into spreadsheets, and stressing about state apprentice council audits.\n\nWe built a 30-second mobile check-in where apprentices log hours by category and journeymen sign right on their phone screen.\n\nI'm looking for 3 training coordinators to share feedback on our workflow prototype. We're offering founding member institutions free onboarding and locked pricing for 3 years.\n\nWould you have 15 minutes next Tuesday?\n\nBest,\n[Your Name]",
      linkedInDM: "Hi {{FirstName}} - saw your leadership at {{Company}}'s apprenticeship academy. Are your instructors still manually tallying paper timecards for DOL hour verification? We built a modern mobile OJT tracking platform. Would love 10 minutes to show you the mockups.",
      discoveryQuestions: [
        "How do you currently verify that an apprentice actually performed the specific work process (e.g., pipe fitting vs. general cleanup) reported on their timecard?",
        "How many staff hours does your administrative team spend preparing for annual state apprenticeship audits?",
        "How do employer partners react when you request supervisor sign-offs on apprentice hours?",
        "What is the single biggest hassle when uploading apprentice progress to the state or federal RAPIDS database?"
      ],
      earlyBirdOffer: "$199/month for up to 100 apprentices (50% discount) with free historical student data import.",
      letterOfIntentSummary: "Training director signs non-binding LOI to trial 1 cohort of 25 apprentices during their next semester.",
      mmpScope: [
        "Mobile web log for apprentices (Select Jobsite, Work Process Code, Hours)",
        "Journeyman/Foreman SMS signature approval",
        "Administrator dashboard displaying progress toward 2,000-hour journeyman milestones",
        "Automated DOL RAPIDS-compliant CSV export"
      ]
    }
  },
  {
    id: "hoa-arb-portal",
    title: "BoardPass: Self-Managed HOA Architectural Review (ARB) Portal",
    tagline: "Resolve homeowner renovation requests before the 30-day legal deadline without messy email threads.",
    category: "Vertical SaaS",
    saturationScore: 1,
    targetBuyer: "Self-Managed Homeowners Associations (50 to 400 doors)",
    decisionMakerTitle: "HOA Board President / Architectural Review Committee Chair",
    targetBusinessSize: "50-400 homes (Volunteer-run board, $50K - $300K annual budget)",
    problemStatement: "When homeowners want to install solar panels, paint their house, or build a fence, state law dictates that the HOA board must formally respond within 30-45 days. In self-managed communities, volunteer board members lose attachments in personal Gmail accounts, miss statutory deadlines, and accidentally trigger automatic legal approval or contentious neighbor lawsuits.",
    whyUnsaturated: "AppFolio and Buildium cost thousands and are only sold to commercial property management corporations, leaving over 150,000 self-managed HOAs relying entirely on personal email inboxes.",
    moatFactor: "Statutory deadline countdown timer with automated neighbor notification and community guideline checklist.",
    spreadsheetReplaced: "Disjointed volunteer email threads, Google Drive folders, and paper forms dropped in mailboxes.",
    pricingMonthly: {
      starter: 79,
      pro: 149,
      enterprise: 249
    },
    estimatedACV: "$1,000 - $2,000 / year",
    salesCycleDays: "7 - 21 days (simple board approval vote)",
    difficultyLevel: "Low (No-code / Fast MVP)",
    keyRisks: [
      "Board members change every 1-2 years during annual elections.",
      "Must be intuitive enough for non-technical 65+ year-old volunteer members."
    ],
    presellPlaybook: {
      hook: "Protect volunteer HOA boards from missed 30-day architectural review lawsuits.",
      coldEmailSubject: "Architectural review requests for {{Company}} HOA?",
      coldEmailBody: "Hi {{FirstName}},\n\nI see you serve on the board for {{Company}} community. Thank you for your volunteer service.\n\nA quick question: When homeowners submit architectural requests (solar, paint, roofing, fences), how is your board tracking the mandatory statutory review deadlines?\n\nVolunteer boards frequently tell us that requests get buried in personal email accounts, leading to missed 30-day deadlines and disputes between neighbors.\n\nWe built a lightweight portal where homeowners submit plans online, committee members vote with 1 click, and approval letters are archived automatically.\n\nIt requires zero software installation and costs less than $79/mo for the whole community.\n\nCould I share a 3-minute video or quick demo with you and your board?\n\nWarmly,\n[Your Name]",
      linkedInDM: "Hi {{FirstName}} - noticed you're active on the board at {{Company}}. Does your ARB committee still manage homeowner renovation submissions via email attachments? We built a simple portal that automates the 30-day deadline clock. Would love to send a quick 2-min preview!",
      discoveryQuestions: [
        "What happens when a homeowner submits a request right before a committee member goes on vacation?",
        "Have you ever had a resident claim their project was automatically approved because the board took more than 30 days?",
        "Where are historical architectural approval letters stored when new board members take office after elections?",
        "If a tool cost $79/mo and solved all homeowner review tracking, would your board approve it at your next meeting?"
      ],
      earlyBirdOffer: "$59/mo locked for 2 years + free upload of community bylaws and architectural guidelines.",
      letterOfIntentSummary: "Board president agrees to put the proposal on the agenda for the upcoming monthly HOA meeting.",
      mmpScope: [
        "Homeowner submission form with file upload (drawings, paint swatches)",
        "30-day statutory countdown timer with automatic reminder alerts",
        "Board member voting and private comments",
        "1-click formal approval / denial letter with official community seal"
      ]
    }
  },
  {
    id: "crane-rig-inspection-cert",
    title: "RigCert: Mobile Crane & Rigging Equipment OSHA Annual Log",
    tagline: "Pass OSHA & Cal/OSHA annual crane inspections with digital hook-to-boom equipment tracking.",
    category: "Compliance & RegTech",
    saturationScore: 1,
    targetBuyer: "Crane Rental Companies & Heavy Equipment Rigging Contractors",
    decisionMakerTitle: "Safety Director / Fleet Maintenance Superintendent",
    targetBusinessSize: "5 - 40 heavy equipment assets ($2M - $20M revenue)",
    problemStatement: "Under OSHA 1926.1412, commercial mobile cranes and wire rope slings require daily shift inspections, monthly documented inspections, and comprehensive annual third-party certifications. If an OSHA inspector steps onto a jobsite and the operator cannot produce the stamped annual certificate or sling inspection tag, the jobsite is immediately shut down with fines exceeding $15,000 per day.",
    whyUnsaturated: "Heavy machinery telematics (Caterpillar, Komatsu) focus on engine GPS and fuel burn, not OSHA 1926 crane cert paperwork and synthetic sling load-capacity derating calculations.",
    moatFactor: "QR code equipment stickers linking directly to OSHA certification PDF repository accessible instantly by safety officers on jobsites.",
    spreadsheetReplaced: "Torn plastic binders in crane operator cabs and lost paper inspection tags.",
    pricingMonthly: {
      starter: 189,
      pro: 349,
      enterprise: 699
    },
    estimatedACV: "$2,500 - $5,000 / year",
    salesCycleDays: "10 - 25 days",
    difficultyLevel: "Medium (Full-stack CRUD)",
    keyRisks: [
      "Rigging hardware gets covered in grease and dirt (requires rugged QR tags).",
      "Must follow strict OSHA regulatory inspection terminology."
    ],
    presellPlaybook: {
      hook: "Instant QR-code OSHA crane certification proof to prevent jobsite red-tag shutdowns.",
      coldEmailSubject: "Crane inspection records and OSHA documentation at {{Company}}?",
      coldEmailBody: "Hi {{FirstName}},\n\nSaw {{Company}}'s rigs working on major regional projects. Quick safety question:\n\nWhen a general contractor or OSHA compliance officer asks your operator for their crane's annual third-party certification and monthly wire rope log, can your crew pull it up in 10 seconds?\n\nWe talk to safety directors who lose sleep over operators having misplaced paper certs in the cab when an audit happens.\n\nWe created a weatherproof QR tag system: the operator scans the sticker on the crane outrigger, and the certified OSHA paperwork pops up instantly on any phone.\n\nI'm seeking 5 equipment safety directors for a quick 12-minute feedback review. Would you be open to checking out the prototype next week?\n\nBest,\n[Your Name]",
      linkedInDM: "Hey {{FirstName}}, noticed you lead safety at {{Company}}. Are your crane operators still keeping paper annual certs and sling inspection logs in gloveboxes? We built a 1-second QR tag system for OSHA proof on jobsites. Open to a quick look?",
      discoveryQuestions: [
        "Have you ever had a general contractor delay a crane setup because your paperwork was missing from the cab?",
        "How do you currently track the expiration dates of annual third-party certifications across your mobile fleet?",
        "What happens when a synthetic rigging sling tag wears off or gets damaged in the field?",
        "If an app eliminated lost inspection certs across your fleet for $189/mo, what would that save you in downtime?"
      ],
      earlyBirdOffer: "$149/mo lifetime price + 50 free rugged industrial QR asset stickers mailed to your shop.",
      letterOfIntentSummary: "Safety director commits to pilot QR asset tags on 5 active crane units for 30 days.",
      mmpScope: [
        "Asset registry with expiration alert engine (30, 60, 90 days out)",
        "Public QR code link displaying certified PDF and daily checklist status",
        "Mobile operator pre-shift inspection checklist",
        "Safety manager dashboard with red-flag overdue alerts"
      ]
    }
  },
  {
    id: "residential-care-med-records",
    title: "CareMAR: Assisted Living Medication & Shift Ratio Compliance",
    tagline: "Pass Department of Social Services state inspections with paperless Medication Administration Records (eMAR).",
    category: "Specialized Healthcare",
    saturationScore: 1,
    targetBuyer: "Small Residential Care Facilities for the Elderly (RCFE) & Adult Group Homes (6 to 30 beds)",
    decisionMakerTitle: "Facility Administrator / Licensee Owner",
    targetBusinessSize: "1-4 residential homes (6-24 residents each)",
    problemStatement: "Small 6-bed senior residential homes are heavily audited by state licensing boards for medication errors. Caregivers currently log pills on paper binder sheets (MARs). One missed medication signature or misplaced narcotic dosage log can trigger immediate citations, probation, or facility license revocation.",
    whyUnsaturated: "PointClickCare and MatrixCare are built for 300-bed nursing home chains and cost $2,000+/mo with mandatory 3-year contracts. Small 6-bed residential home owners are priced out and forced to use dangerous paper binders.",
    moatFactor: "Ultra-simple tablet pill photo verification and automated state-specific Incident Report (LIC 622) generator.",
    spreadsheetReplaced: "Thick three-ring paper binders with handwritten signatures and high error rates.",
    pricingMonthly: {
      starter: 129,
      pro: 249,
      enterprise: 499
    },
    estimatedACV: "$1,800 - $3,500 / year",
    salesCycleDays: "7 - 18 days",
    difficultyLevel: "Medium (Full-stack CRUD)",
    keyRisks: [
      "Must adhere strictly to state health privacy and controlled substance count rules.",
      "High caregiver turnover: software must require zero tech training."
    ],
    presellPlaybook: {
      hook: "Zero-error digital medication records designed for 6-bed senior care homes.",
      coldEmailSubject: "eMAR and state licensing audits for {{Company}}?",
      coldEmailBody: "Hi {{FirstName}},\n\nI admire the compassionate care {{Company}} provides to your residents.\n\nQuick question: Are your night and weekend caregivers still signing paper medication sheets (MARs) by hand in three-ring binders?\n\nMany facility administrators tell us that paper MARs are their #1 source of anxiety during surprise state licensing audits because one missed signature means a citation.\n\nWe built an eMAR system tailored specifically for small 6-to-15 bed care homes—large pill photos, audible dosage reminders, and automated narcotic counts—at a fraction of the cost of nursing home enterprise software.\n\nI'd love to show you a 10-minute demo and get your administrator feedback. In return, I'll send you our 2026 RCFE State Audit Preparation Checklist.\n\nCould we connect briefly this Thursday?\n\nBest,\n[Your Name]",
      linkedInDM: "Hi {{FirstName}} - saw you operate senior care at {{Company}}. Are your caregivers still logging medications on paper binder sheets? We built a simple tablet eMAR designed specifically for small 6-bed residential homes. Would love 10 minutes of your feedback!",
      discoveryQuestions: [
        "What is your biggest fear when state licensing inspectors ask to review your medication binders and narcotic counts?",
        "How do you currently find out if a caregiver missed administering a 2:00 PM dose before the next shift starts?",
        "Have you looked at enterprise nursing software, and why was it a bad fit for your smaller home?",
        "If this prevented medication citations and gave you remote visibility from home, what would it be worth?"
      ],
      earlyBirdOffer: "$99/mo per home (locked for life) with free medication profile setup for your current residents.",
      letterOfIntentSummary: "Administrator agrees to test digital pill sign-off for 1 week alongside paper in 1 home.",
      mmpScope: [
        "Resident profile with medication schedule and pill photograph",
        "Caregiver 1-tap 'Given' / 'Refused' record with timestamp",
        "Dual-signature shift-to-shift narcotic count verifier",
        "Instant state audit report generator"
      ]
    }
  }
];
