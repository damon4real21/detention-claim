import { CarrierProfile, FreightLoad } from "../types";

export const DEFAULT_CARRIER_PROFILE: CarrierProfile = {
  name: "IronGate Logistics LLC",
  dotNumber: "USDOT 3948210",
  mcNumber: "MC-1489201",
  billingEmail: "claims@irongatelogistics.com",
  phone: "(317) 555-0194",
  address: "8420 Commerce Park Blvd, Suite 210",
  cityStateZip: "Indianapolis, IN 46268",
  defaultDetentionRate: 75, // $75 / hr
  defaultFreeTimeHours: 2,   // 2 hrs standard
};

// Compute dynamic timestamps relative to now so live timers work immediately
const now = new Date();

// Load 1: arrived 3 hours and 22 minutes ago (82 minutes into detention!)
const load1Arrival = new Date(now.getTime() - (3 * 60 + 22) * 60 * 1000);

// Load 2: arrived 1 hour and 15 minutes ago (45 mins free time remaining)
const load2Arrival = new Date(now.getTime() - 75 * 60 * 1000);

// Load 3: completed yesterday (departed with 2h 45m billable detention)
const yesterday = new Date(now.getTime() - 24 * 60 * 60 * 1000);
const load3Arrival = new Date(yesterday.setHours(8, 15, 0, 0));
const load3Departure = new Date(yesterday.setHours(13, 0, 0, 0)); // 4h 45m total dwell

export const INITIAL_FREIGHT_LOADS: FreightLoad[] = [
  {
    id: "load-001",
    loadNumber: "LD-2026-8819",
    rateConNumber: "RC-TQL-99214",
    status: "in_detention",
    broker: {
      name: "Total Quality Logistics (TQL)",
      mcNumber: "MC-248887",
      billingEmail: "detention@tql.com",
      phone: "(800) 580-3101",
      contactPerson: "Jordan Miller (Carrier Rep)"
    },
    driver: {
      name: "Marcus Reynolds",
      phone: "(317) 555-8812",
      truckNumber: "Unit #104",
      trailerNumber: "Reefer #5309"
    },
    facility: {
      name: "Americold Cold Storage - Gateway Hub",
      type: "receiver",
      address: "3850 Tradeport Blvd",
      city: "Atlanta",
      state: "GA",
      zip: "30354",
      dockNumber: "Door 42"
    },
    terms: {
      freeTimeHours: 2,
      hourlyRate: 75,
      incrementMinutes: 15,
      advanceNoticeSent: true,
      advanceNoticeTime: new Date(load1Arrival.getTime() + 105 * 60 * 1000).toISOString()
    },
    arrival: {
      timestamp: load1Arrival.toISOString(),
      latitude: 33.6391,
      longitude: -84.3822,
      accuracyMeters: 4.8,
      method: "gps_automatic",
      notes: "Checked in at security guard shack. Guard signed paper gate pass."
    },
    calculations: {
      totalDwellMinutes: 202,
      freeTimeMinutes: 120,
      detentionMinutes: 82,
      billableHours: 1.5,
      totalClaimAmount: 112.50
    },
    createdAt: new Date(now.getTime() - 4 * 60 * 60 * 1000).toISOString()
  },
  {
    id: "load-002",
    loadNumber: "LD-2026-8824",
    rateConNumber: "RC-CHR-44102",
    status: "arrived_free_time",
    broker: {
      name: "C.H. Robinson Worldwide",
      mcNumber: "MC-120002",
      billingEmail: "detentionclaims@chrobinson.com",
      phone: "(800) 323-7587",
      contactPerson: "Dispatch Team Central"
    },
    driver: {
      name: "Darius Vance",
      phone: "(317) 555-4421",
      truckNumber: "Unit #112",
      trailerNumber: "Dry Van #5320"
    },
    facility: {
      name: "Lineage Logistics Distribution Hub",
      type: "shipper",
      address: "2400 Meacham Blvd",
      city: "Fort Worth",
      state: "TX",
      zip: "76106",
      dockNumber: "Door 18"
    },
    terms: {
      freeTimeHours: 2,
      hourlyRate: 85,
      incrementMinutes: 15,
      advanceNoticeSent: false
    },
    arrival: {
      timestamp: load2Arrival.toISOString(),
      latitude: 32.7932,
      longitude: -97.3325,
      accuracyMeters: 6.2,
      method: "gps_automatic",
      notes: "Staging in yard. Facility stated lumper crew delayed."
    },
    calculations: {
      totalDwellMinutes: 75,
      freeTimeMinutes: 120,
      detentionMinutes: 0,
      billableHours: 0,
      totalClaimAmount: 0
    },
    createdAt: new Date(now.getTime() - 2 * 60 * 60 * 1000).toISOString()
  },
  {
    id: "load-003",
    loadNumber: "LD-2026-8802",
    rateConNumber: "RC-COY-77192",
    status: "departed_pending_claim",
    broker: {
      name: "Coyote Logistics",
      mcNumber: "MC-561380",
      billingEmail: "carrieraccess@coyote.com",
      phone: "(877) 626-9683",
      contactPerson: "Load Exceptions Desk"
    },
    driver: {
      name: "Elena Rostova",
      phone: "(317) 555-9014",
      truckNumber: "Unit #108",
      trailerNumber: "Reefer #5388"
    },
    facility: {
      name: "Tyson Fresh Meats Distribution",
      type: "receiver",
      address: "2200 Don Tyson Pkwy",
      city: "Springdale",
      state: "AR",
      zip: "72762",
      dockNumber: "Dock #09"
    },
    terms: {
      freeTimeHours: 2,
      hourlyRate: 75,
      incrementMinutes: 15,
      advanceNoticeSent: true,
      advanceNoticeTime: new Date(load3Arrival.getTime() + 105 * 60 * 1000).toISOString()
    },
    arrival: {
      timestamp: load3Arrival.toISOString(),
      latitude: 36.1689,
      longitude: -94.1298,
      accuracyMeters: 3.5,
      method: "gps_automatic",
      notes: "Checked in on-time for 08:30 appointment. Forklift breakdown delayed unload."
    },
    departure: {
      timestamp: load3Departure.toISOString(),
      latitude: 36.1691,
      longitude: -94.1301,
      accuracyMeters: 4.1,
      receiverSignatureName: "Jim Hawkins (Receiving Lead)"
    },
    bolDocument: {
      imageUrl: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80",
      bolNumber: "BOL-TYSON-94812",
      inTimeOnBol: "08:15 AM",
      outTimeOnBol: "01:00 PM",
      hasSignature: true,
      uploadedAt: new Date(load3Departure.getTime() + 5 * 60 * 1000).toISOString()
    },
    calculations: {
      totalDwellMinutes: 285, // 4 hrs 45 mins
      freeTimeMinutes: 120,   // 2 hrs
      detentionMinutes: 165,  // 2 hrs 45 mins
      billableHours: 2.75,
      totalClaimAmount: 206.25 // 2.75 * $75
    },
    createdAt: new Date(now.getTime() - 30 * 60 * 60 * 1000).toISOString()
  },
  {
    id: "load-004",
    loadNumber: "LD-2026-8770",
    rateConNumber: "RC-ECHO-55201",
    status: "paid",
    broker: {
      name: "Echo Global Logistics",
      mcNumber: "MC-500139",
      billingEmail: "accounting@echo.com",
      phone: "(800) 354-7993",
      contactPerson: "Billing Disputes"
    },
    driver: {
      name: "Marcus Reynolds",
      phone: "(317) 555-8812",
      truckNumber: "Unit #104",
      trailerNumber: "Reefer #5309"
    },
    facility: {
      name: "Sysco Central Pennsylvania",
      type: "receiver",
      address: "3905 Corey Rd",
      city: "Harrisburg",
      state: "PA",
      zip: "17109",
      dockNumber: "Door 31"
    },
    terms: {
      freeTimeHours: 2,
      hourlyRate: 80,
      incrementMinutes: 15,
      advanceNoticeSent: true
    },
    arrival: {
      timestamp: new Date(now.getTime() - 4 * 24 * 60 * 60 * 1000).toISOString(),
      latitude: 40.2732,
      longitude: -76.8867,
      accuracyMeters: 5.0,
      method: "gps_automatic"
    },
    departure: {
      timestamp: new Date(now.getTime() - (4 * 24 * 60 * 60 - 5 * 60 * 60) * 1000).toISOString(),
      latitude: 40.2735,
      longitude: -76.8869,
      accuracyMeters: 5.5,
      receiverSignatureName: "Dave K. (Sysco Dock)"
    },
    bolDocument: {
      imageUrl: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80",
      bolNumber: "BOL-SYSCO-22910",
      inTimeOnBol: "07:00 AM",
      outTimeOnBol: "12:00 PM",
      hasSignature: true,
      uploadedAt: new Date(now.getTime() - 4 * 24 * 60 * 60 * 1000).toISOString()
    },
    calculations: {
      totalDwellMinutes: 300,
      freeTimeMinutes: 120,
      detentionMinutes: 180,
      billableHours: 3.0,
      totalClaimAmount: 240.00
    },
    claimHistory: {
      submittedAt: new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000).toISOString(),
      recipientEmail: "accounting@echo.com",
      claimReference: "CLM-ECHO-88412",
      statusNotes: "Approved without dispute. Payment issued via direct ACH.",
      paidAmount: 240.00,
      paidDate: new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000).toISOString()
    },
    createdAt: new Date(now.getTime() - 5 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: "load-005",
    loadNumber: "LD-2026-8830",
    rateConNumber: "RC-LND-33910",
    status: "scheduled",
    broker: {
      name: "Landstar Ranger Inc",
      mcNumber: "MC-166960",
      billingEmail: "carrierpay@landstar.com",
      phone: "(800) 872-9400",
      contactPerson: "Agent Greg B."
    },
    driver: {
      name: "Mike Johnson",
      phone: "(317) 555-3211",
      truckNumber: "Unit #119",
      trailerNumber: "Dry Van #5345"
    },
    facility: {
      name: "UNFI (United Natural Foods) Distribution",
      type: "receiver",
      address: "14800 Heacock St",
      city: "Moreno Valley",
      state: "CA",
      zip: "92553"
    },
    terms: {
      freeTimeHours: 2,
      hourlyRate: 75,
      incrementMinutes: 15,
      advanceNoticeSent: false
    },
    arrival: {
      timestamp: "",
      method: "gps_automatic"
    },
    calculations: {
      totalDwellMinutes: 0,
      freeTimeMinutes: 120,
      detentionMinutes: 0,
      billableHours: 0,
      totalClaimAmount: 0
    },
    createdAt: new Date(now.getTime() - 1 * 60 * 60 * 1000).toISOString()
  }
];
