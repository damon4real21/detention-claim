import React, { useState, useEffect } from "react";
import { FreightLoad, CarrierProfile, FreightLoadStatus } from "../types";
import { DEFAULT_CARRIER_PROFILE, INITIAL_FREIGHT_LOADS } from "../data/freightLoads";
import { DetentionClaimPacket } from "./DetentionClaimPacket";
import { DriverMobileView } from "./DriverMobileView";
import { NewLoadModal } from "./NewLoadModal";
import { 
  Truck, 
  Clock, 
  DollarSign, 
  ShieldCheck, 
  MapPin, 
  AlertTriangle, 
  FileText, 
  CheckCircle2, 
  Plus, 
  Search, 
  Filter, 
  Smartphone, 
  BarChart3, 
  Send, 
  Printer, 
  ExternalLink,
  ChevronRight,
  ArrowUpRight,
  Building2,
  HelpCircle
} from "lucide-react";

interface FreightDetentionAppProps {
  currentTab?: "dispatcher" | "driver" | "claims" | "facilities";
  onTabChange?: (tab: "dispatcher" | "driver" | "claims" | "facilities") => void;
  carrier?: CarrierProfile;
  onUpdateCarrier?: (carrier: CarrierProfile) => void;
  isNewLoadModalOpen?: boolean;
  setIsNewLoadModalOpen?: (open: boolean) => void;
  onDetentionCountChange?: (count: number) => void;
}

export const FreightDetentionApp: React.FC<FreightDetentionAppProps> = ({
  currentTab = "dispatcher",
  onTabChange,
  carrier: propCarrier,
  onUpdateCarrier,
  isNewLoadModalOpen: propIsNewLoadModalOpen,
  setIsNewLoadModalOpen: propSetIsNewLoadModalOpen,
  onDetentionCountChange
}) => {
  // Load state from localStorage or initial defaults
  const [loads, setLoads] = useState<FreightLoad[]>(() => {
    const saved = localStorage.getItem("freight_loads_v1");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error("Failed to parse saved loads", e);
      }
    }
    return INITIAL_FREIGHT_LOADS;
  });

  const [internalCarrier, setInternalCarrier] = useState<CarrierProfile>(() => {
    const saved = localStorage.getItem("carrier_profile_v1");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error("Failed to parse carrier profile", e);
      }
    }
    return DEFAULT_CARRIER_PROFILE;
  });

  const carrier = propCarrier || internalCarrier;
  const setCarrier = (newCarrier: CarrierProfile) => {
    setInternalCarrier(newCarrier);
    if (onUpdateCarrier) onUpdateCarrier(newCarrier);
  };

  // Active sub-tab inside the freight app
  const [viewMode, setViewMode] = useState<"dispatcher" | "driver" | "claims" | "facilities">(currentTab);
  const [selectedLoadForPacket, setSelectedLoadForPacket] = useState<FreightLoad | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [internalNewLoadModalOpen, setInternalNewLoadModalOpen] = useState<boolean>(false);
  const [notificationToast, setNotificationToast] = useState<string | null>(null);

  const isNewLoadModalOpen = propIsNewLoadModalOpen !== undefined ? propIsNewLoadModalOpen : internalNewLoadModalOpen;
  const setIsNewLoadModalOpen = propSetIsNewLoadModalOpen || setInternalNewLoadModalOpen;

  // Keep viewMode synced with prop
  useEffect(() => {
    if (currentTab) {
      setViewMode(currentTab);
      if (currentTab !== "claims" && currentTab !== "dispatcher") {
        setSelectedLoadForPacket(null);
      }
    }
  }, [currentTab]);

  const switchView = (newMode: "dispatcher" | "driver" | "claims" | "facilities") => {
    setViewMode(newMode);
    setSelectedLoadForPacket(null);
    if (onTabChange) {
      onTabChange(newMode);
    }
  };

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem("freight_loads_v1", JSON.stringify(loads));
  }, [loads]);

  useEffect(() => {
    localStorage.setItem("carrier_profile_v1", JSON.stringify(carrier));
  }, [carrier]);

  // Live timer update every 5 seconds for calculating live detention on active loads
  useEffect(() => {
    const interval = setInterval(() => {
      setLoads(prevLoads => {
        return prevLoads.map(load => {
          if (load.status === "arrived_free_time" || load.status === "in_detention") {
            const arrivalTime = new Date(load.arrival.timestamp).getTime();
            const now = Date.now();
            const totalDwellMinutes = Math.max(0, Math.floor((now - arrivalTime) / (60 * 1000)));
            const freeMinutes = load.terms.freeTimeHours * 60;
            const detentionMinutes = Math.max(0, totalDwellMinutes - freeMinutes);
            const billableHours = Math.round((detentionMinutes / 60) * 100) / 100;
            const totalClaimAmount = Math.round(billableHours * load.terms.hourlyRate * 100) / 100;

            const newStatus: FreightLoadStatus = detentionMinutes > 0 ? "in_detention" : "arrived_free_time";

            return {
              ...load,
              status: newStatus,
              calculations: {
                totalDwellMinutes,
                freeTimeMinutes: freeMinutes,
                detentionMinutes,
                billableHours,
                totalClaimAmount
              }
            };
          }
          return load;
        });
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const showToast = (msg: string) => {
    setNotificationToast(msg);
    setTimeout(() => setNotificationToast(null), 3500);
  };

  // Dispatcher actions
  const handleAddNewLoad = (newLoad: FreightLoad) => {
    setLoads(prev => [newLoad, ...prev]);
    showToast(`Load ${newLoad.loadNumber} dispatched to ${newLoad.driver.name}!`);
  };

  const handleDriverCheckIn = (loadId: string, gps: { lat: number; lon: number; accuracy: number; notes?: string }) => {
    const now = new Date();
    setLoads(prev => prev.map(load => {
      if (load.id === loadId) {
        return {
          ...load,
          status: "arrived_free_time",
          arrival: {
            timestamp: now.toISOString(),
            latitude: gps.lat,
            longitude: gps.lon,
            accuracyMeters: gps.accuracy,
            method: "gps_automatic",
            notes: gps.notes
          },
          calculations: {
            totalDwellMinutes: 0,
            freeTimeMinutes: load.terms.freeTimeHours * 60,
            detentionMinutes: 0,
            billableHours: 0,
            totalClaimAmount: 0
          }
        };
      }
      return load;
    }));
    showToast(`Driver check-in logged with GPS! 2-hour free time clock started.`);
  };

  const handleDriverCheckOut = (loadId: string, gps: { lat: number; lon: number; accuracy: number; signatureName: string }) => {
    const now = new Date();
    setLoads(prev => prev.map(load => {
      if (load.id === loadId) {
        const arrivalTime = new Date(load.arrival.timestamp).getTime();
        const totalDwellMinutes = Math.max(0, Math.floor((now.getTime() - arrivalTime) / (60 * 1000)));
        const freeMinutes = load.terms.freeTimeHours * 60;
        const detentionMinutes = Math.max(0, totalDwellMinutes - freeMinutes);
        const billableHours = Math.round((detentionMinutes / 60) * 100) / 100;
        const totalClaimAmount = Math.round(billableHours * load.terms.hourlyRate * 100) / 100;

        return {
          ...load,
          status: "departed_pending_claim",
          departure: {
            timestamp: now.toISOString(),
            latitude: gps.lat,
            longitude: gps.lon,
            accuracyMeters: gps.accuracy,
            receiverSignatureName: gps.signatureName
          },
          calculations: {
            totalDwellMinutes,
            freeTimeMinutes: freeMinutes,
            detentionMinutes,
            billableHours,
            totalClaimAmount
          }
        };
      }
      return load;
    }));
    showToast(`Departure confirmed. Claim packet compiled with $${loads.find(l => l.id === loadId)?.calculations.totalClaimAmount.toFixed(2)} due.`);
  };

  const handleUploadBol = (loadId: string, bolNumber: string, imageUrl: string) => {
    setLoads(prev => prev.map(load => {
      if (load.id === loadId) {
        return {
          ...load,
          bolDocument: {
            imageUrl,
            bolNumber,
            inTimeOnBol: load.arrival.timestamp ? new Date(load.arrival.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) : "08:00 AM",
            outTimeOnBol: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
            hasSignature: true,
            uploadedAt: new Date().toISOString()
          }
        };
      }
      return load;
    }));
    showToast(`BOL #${bolNumber} uploaded and geo-watermarked!`);
  };

  const handleSendAdvanceNotice = (loadId: string) => {
    setLoads(prev => prev.map(load => {
      if (load.id === loadId) {
        return {
          ...load,
          terms: {
            ...load.terms,
            advanceNoticeSent: true,
            advanceNoticeTime: new Date().toISOString()
          }
        };
      }
      return load;
    }));
    const targetLoad = loads.find(l => l.id === loadId);
    if (targetLoad) {
      const subject = encodeURIComponent(`URGENT DETENTION NOTICE: Unit #${targetLoad.driver.truckNumber} - RateCon #${targetLoad.rateConNumber}`);
      const body = encodeURIComponent(`ATTN DISPATCH: Truck #${targetLoad.driver.truckNumber} has been waiting at ${targetLoad.facility.name} for 1 hr 45 min under Load #${targetLoad.loadNumber}. Free time will expire in 15 minutes. Detention will begin billing at $${targetLoad.terms.hourlyRate}/hr. Please contact the shipping dock to expedite.`);
      window.location.href = `mailto:${targetLoad.broker.billingEmail}?subject=${subject}&body=${body}`;
    }
    showToast(`15-Minute Advance Notice transmitted to broker dispatch.`);
  };

  const handleMarkSubmitted = (loadId: string) => {
    setLoads(prev => prev.map(load => {
      if (load.id === loadId) {
        return {
          ...load,
          status: "claim_submitted",
          claimHistory: {
            submittedAt: new Date().toISOString(),
            recipientEmail: load.broker.billingEmail,
            claimReference: `CLM-${load.rateConNumber.replace(/[^a-zA-Z0-9]/g, "")}`
          }
        };
      }
      return load;
    }));
    showToast(`Claim marked as SUBMITTED to ${loads.find(l => l.id === loadId)?.broker.name}.`);
  };

  const handleMarkPaid = (loadId: string, amount: number) => {
    setLoads(prev => prev.map(load => {
      if (load.id === loadId) {
        return {
          ...load,
          status: "paid",
          claimHistory: {
            ...load.claimHistory,
            paidAmount: amount,
            paidDate: new Date().toISOString()
          }
        };
      }
      return load;
    }));
    showToast(`Recorded $${amount.toFixed(2)} payment from broker!`);
  };

  // Metrics calculations
  const totalRecoveredDollars = loads
    .filter(l => l.status === "paid")
    .reduce((sum, l) => sum + (l.claimHistory?.paidAmount || l.calculations.totalClaimAmount), 0);

  const pendingClaimsDollars = loads
    .filter(l => l.status === "claim_submitted" || l.status === "departed_pending_claim" || l.status === "in_detention")
    .reduce((sum, l) => sum + l.calculations.totalClaimAmount, 0);

  const trucksInDetentionCount = loads.filter(l => l.status === "in_detention").length;
  const trucksAtDockCount = loads.filter(l => l.status === "arrived_free_time").length;

  // Filter loads
  const filteredLoads = loads.filter(load => {
    const matchesStatus = 
      statusFilter === "all" ? true :
      statusFilter === "detention" ? load.status === "in_detention" :
      statusFilter === "at_dock" ? load.status === "arrived_free_time" :
      statusFilter === "pending" ? (load.status === "departed_pending_claim" || load.status === "claim_submitted") :
      statusFilter === "paid" ? load.status === "paid" : true;

    const matchesSearch = 
      load.loadNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      load.rateConNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      load.broker.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      load.facility.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      load.driver.name.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesStatus && matchesSearch;
  });

  return (
    <div className="space-y-8">
      {/* Toast Notification */}
      {notificationToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-stone-900 text-white px-4 py-3 rounded-2xl shadow-2xl border border-stone-700 flex items-center gap-2 text-xs font-bold animate-bounce">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{notificationToast}</span>
        </div>
      )}

      {/* TOP STATS & FLEET FINANCIAL METRICS */}
      <div className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-8 shadow-xs relative overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 pb-6 border-b border-stone-100">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-900 border border-emerald-200 mb-2">
              <Truck className="w-3.5 h-3.5 text-emerald-700" />
              DetentionClaim Sentinel • Live Fleet Operations
            </div>
            <h1 className="font-display text-2xl sm:text-3xl font-black text-stone-900 tracking-tight">
              Freight Detention & Dwell-Time Collector
            </h1>
            <p className="text-stone-600 text-xs sm:text-sm mt-1 max-w-2xl">
              Operating for <strong className="text-stone-900">{carrier.name}</strong> ({carrier.dotNumber} • {carrier.mcNumber}). Geo-stamped gate arrival, automatic 15-min broker warnings, and 1-click legal claim packets to recover every dollar owed.
            </p>
          </div>

          <div className="flex items-center gap-2.5 shrink-0">
            <button
              onClick={() => setIsNewLoadModalOpen(true)}
              className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-md shadow-emerald-600/20 transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>Dispatch New Load</span>
            </button>
          </div>
        </div>

        {/* METRICS GRID */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 pt-6">
          <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200/80">
            <div className="flex items-center justify-between text-xs text-stone-500 font-semibold mb-1">
              <span>Total Recovered (Paid)</span>
              <DollarSign className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="font-display text-2xl sm:text-3xl font-black text-emerald-600 tracking-tight">
              ${totalRecoveredDollars.toFixed(2)}
            </div>
            <span className="text-[11px] text-emerald-700 font-medium">
              100% collected from brokers
            </span>
          </div>

          <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200/80">
            <div className="flex items-center justify-between text-xs text-stone-500 font-semibold mb-1">
              <span>Pending Claims Owed</span>
              <FileText className="w-4 h-4 text-amber-600" />
            </div>
            <div className="font-display text-2xl sm:text-3xl font-black text-stone-900 tracking-tight">
              ${pendingClaimsDollars.toFixed(2)}
            </div>
            <span className="text-[11px] text-stone-500">
              Active detention + submitted
            </span>
          </div>

          <div className="bg-rose-50/70 p-4 rounded-2xl border border-rose-200">
            <div className="flex items-center justify-between text-xs text-rose-800 font-semibold mb-1">
              <span>Trucks in Detention NOW</span>
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping" />
            </div>
            <div className="font-display text-2xl sm:text-3xl font-black text-rose-900 tracking-tight">
              {trucksInDetentionCount} <span className="text-xs font-normal text-rose-700">Units</span>
            </div>
            <span className="text-[11px] text-rose-700 font-medium">
              Accruing $75+/hour right now
            </span>
          </div>

          <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200/80">
            <div className="flex items-center justify-between text-xs text-stone-500 font-semibold mb-1">
              <span>Trucks at Dock (Free Time)</span>
              <Clock className="w-4 h-4 text-amber-600" />
            </div>
            <div className="font-display text-2xl sm:text-3xl font-black text-stone-900 tracking-tight">
              {trucksAtDockCount} <span className="text-xs font-normal text-stone-600">Units</span>
            </div>
            <span className="text-[11px] text-stone-500">
              Within 2-hour standard window
            </span>
          </div>
        </div>
      </div>

      {/* VIEW SELECTOR TABS */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stone-200 pb-3">
        <div className="flex items-center gap-1.5 p-1 bg-stone-100 rounded-2xl border border-stone-200">
          <button
            onClick={() => switchView("dispatcher")}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 ${
              viewMode === "dispatcher" && !selectedLoadForPacket
                ? "bg-white text-stone-900 shadow-xs"
                : "text-stone-600 hover:text-stone-900"
            }`}
          >
            <Truck className="w-3.5 h-3.5" />
            <span>Dispatcher Command</span>
          </button>

          <button
            onClick={() => switchView("driver")}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 ${
              viewMode === "driver"
                ? "bg-stone-900 text-white shadow-xs"
                : "text-stone-600 hover:text-stone-900"
            }`}
          >
            <Smartphone className="w-3.5 h-3.5 text-amber-400" />
            <span>Driver Gate Terminal (1-Tap GPS)</span>
          </button>

          <button
            onClick={() => switchView("claims")}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 ${
              viewMode === "claims" && !selectedLoadForPacket
                ? "bg-white text-stone-900 shadow-xs"
                : "text-stone-600 hover:text-stone-900"
            }`}
          >
            <FileText className="w-3.5 h-3.5 text-emerald-600" />
            <span>Claim Packets</span>
          </button>

          <button
            onClick={() => switchView("facilities")}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 ${
              viewMode === "facilities"
                ? "bg-white text-stone-900 shadow-xs"
                : "text-stone-600 hover:text-stone-900"
            }`}
          >
            <BarChart3 className="w-3.5 h-3.5 text-blue-600" />
            <span>Facility Delay Index</span>
          </button>
        </div>

        {viewMode === "dispatcher" && !selectedLoadForPacket && (
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Search load, broker, driver..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8 pr-3 py-1.5 bg-white border border-stone-200 rounded-xl text-xs text-stone-800 placeholder-stone-400 focus:outline-hidden focus:ring-2 focus:ring-stone-400 w-48 sm:w-60"
              />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-2.5 py-1.5 bg-white border border-stone-200 rounded-xl text-xs font-semibold text-stone-700 focus:outline-hidden"
            >
              <option value="all">All Statuses ({loads.length})</option>
              <option value="detention">In Detention ({trucksInDetentionCount})</option>
              <option value="at_dock">At Dock / Free Time ({trucksAtDockCount})</option>
              <option value="pending">Pending Claim Packet</option>
              <option value="paid">Paid & Recovered</option>
            </select>
          </div>
        )}
      </div>

      {/* VIEW 1: FORMAL CLAIM AUDIT PACKET MODAL/VIEW */}
      {selectedLoadForPacket ? (
        <DetentionClaimPacket
          load={selectedLoadForPacket}
          carrier={carrier}
          onClose={() => setSelectedLoadForPacket(null)}
          onMarkSubmitted={handleMarkSubmitted}
          onMarkPaid={handleMarkPaid}
        />
      ) : viewMode === "driver" ? (
        /* VIEW 2: DRIVER MOBILE GATE TERMINAL */
        <DriverMobileView
          loads={loads}
          onCheckIn={handleDriverCheckIn}
          onCheckOut={handleDriverCheckOut}
          onUploadBol={handleUploadBol}
          onSendAdvanceNotice={handleSendAdvanceNotice}
        />
      ) : viewMode === "claims" ? (
        /* VIEW 3: DEDICATED CLAIM PACKETS & INVOICING PIPELINE */
        <div className="space-y-6">
          <div className="bg-white rounded-3xl border border-stone-200 p-6 shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-100 pb-4">
              <div>
                <h2 className="font-display text-lg font-bold text-stone-900 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-emerald-600" />
                  Broker Detention Claims & Remittance Ledger
                </h2>
                <p className="text-xs text-stone-500 mt-0.5">
                  Audit-ready packets with GPS timestamps, BOL exhibits, and formal legal remittance clauses.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-stone-500">
                  Total Claims Accrued: <strong className="text-stone-900 font-mono">${(pendingClaimsDollars + totalRecoveredDollars).toFixed(2)}</strong>
                </span>
              </div>
            </div>

            {/* Claims Table / Cards */}
            <div className="space-y-3">
              {loads
                .filter(l => l.calculations.totalClaimAmount > 0 || l.status === "in_detention" || l.status === "claim_submitted" || l.status === "paid")
                .map(load => {
                  const isPaid = load.status === "paid";
                  const isSubmitted = load.status === "claim_submitted";

                  return (
                    <div
                      key={load.id}
                      className="bg-stone-50/70 hover:bg-stone-50 rounded-2xl border border-stone-200 p-4 transition-all flex flex-col lg:flex-row lg:items-center justify-between gap-4"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-display font-bold text-stone-900 text-sm">
                            {load.loadNumber}
                          </span>
                          <span className="font-mono text-xs px-2 py-0.5 rounded bg-white border border-stone-200 text-stone-700 font-semibold">
                            {load.rateConNumber}
                          </span>
                          <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded uppercase ${
                            isPaid
                              ? "bg-emerald-100 text-emerald-800"
                              : isSubmitted
                              ? "bg-blue-100 text-blue-800"
                              : "bg-rose-100 text-rose-800"
                          }`}>
                            {isPaid ? "Paid & Cleared" : isSubmitted ? "Submitted to Broker" : "Ready to Submit"}
                          </span>
                        </div>
                        <p className="text-xs text-stone-600">
                          Broker: <strong className="text-stone-900">{load.broker.name}</strong> • Claims to: <span className="font-mono text-stone-800">{load.broker.billingEmail}</span>
                        </p>
                        <p className="text-xs text-stone-500">
                          {load.facility.name} ({load.facility.city}, {load.facility.state}) • Driver: {load.driver.name} (Truck #{load.driver.truckNumber})
                        </p>
                      </div>

                      <div className="flex flex-wrap items-center gap-4">
                        <div className="text-right">
                          <span className="text-[10px] uppercase font-bold text-stone-400 block">Claim Total</span>
                          <span className="font-display text-lg font-black text-emerald-700">
                            ${load.calculations.totalClaimAmount.toFixed(2)}
                          </span>
                          <span className="text-[11px] block text-stone-500 font-mono">
                            {load.calculations.billableHours.toFixed(2)}h @ ${load.terms.hourlyRate}/h
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setSelectedLoadForPacket(load)}
                            className="px-3.5 py-2 rounded-xl bg-stone-900 hover:bg-stone-800 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all"
                          >
                            <FileText className="w-3.5 h-3.5 text-amber-400" />
                            <span>Full Packet & PDF</span>
                          </button>

                          {!isPaid && (
                            <button
                              onClick={() => handleMarkPaid(load.id, load.calculations.totalClaimAmount)}
                              className="px-3 py-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 text-xs font-bold flex items-center gap-1 transition-all"
                              title="Mark Paid"
                            >
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                              <span>Record Paid</span>
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      ) : viewMode === "facilities" ? (
        /* VIEW 4: FACILITY DELAY LEADERBOARD / "BLACK-LIST" */
        <div className="space-y-6">
          <div className="bg-white rounded-3xl border border-stone-200 p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-stone-100 pb-4">
              <div>
                <h2 className="font-display text-lg font-bold text-stone-900 flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-rose-600" />
                  Facility Dwell-Time Intelligence & Delay Risk Index
                </h2>
                <p className="text-xs text-stone-500 mt-0.5">
                  Historical average dwell times across receiver facilities to negotiate higher detention rates on Rate Confirmations beforehand.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-rose-50/70 p-4 rounded-2xl border border-rose-200 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm text-stone-900">Americold Logistics</span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-rose-200 text-rose-800">
                    High Delay Risk
                  </span>
                </div>
                <p className="text-xs text-stone-600">Atlanta, GA • Refrigerated Hub</p>
                <div className="text-xs space-y-1 pt-1 border-t border-rose-200/60">
                  <div className="flex justify-between">
                    <span className="text-stone-500">Avg Dwell Time:</span>
                    <strong className="text-rose-900 font-mono">4h 15m</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-500">Detention Likelihood:</span>
                    <strong className="text-rose-900 font-bold">88% of loads</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-500">Avg Claim Recovered:</span>
                    <strong className="text-emerald-700 font-mono font-bold">$168.75</strong>
                  </div>
                </div>
              </div>

              <div className="bg-amber-50/70 p-4 rounded-2xl border border-amber-200 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm text-stone-900">Lineage Logistics</span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-200 text-amber-800">
                    Moderate Delay
                  </span>
                </div>
                <p className="text-xs text-stone-600">Fort Worth, TX • Cold Storage</p>
                <div className="text-xs space-y-1 pt-1 border-t border-amber-200/60">
                  <div className="flex justify-between">
                    <span className="text-stone-500">Avg Dwell Time:</span>
                    <strong className="text-amber-900 font-mono">2h 45m</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-500">Detention Likelihood:</span>
                    <strong className="text-amber-900 font-bold">45% of loads</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-500">Avg Claim Recovered:</span>
                    <strong className="text-emerald-700 font-mono font-bold">$75.00</strong>
                  </div>
                </div>
              </div>

              <div className="bg-emerald-50/70 p-4 rounded-2xl border border-emerald-200 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm text-stone-900">Sysco Foods Distribution</span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-200 text-emerald-800">
                    Fast Payout
                  </span>
                </div>
                <p className="text-xs text-stone-600">Harrisburg, PA • Grocery Hub</p>
                <div className="text-xs space-y-1 pt-1 border-t border-emerald-200/60">
                  <div className="flex justify-between">
                    <span className="text-stone-500">Avg Dwell Time:</span>
                    <strong className="text-emerald-900 font-mono">3h 30m</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-500">Broker Dispute Rate:</span>
                    <strong className="text-emerald-800 font-bold">&lt; 5% (Pays Clean)</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-500">Payment Velocity:</span>
                    <strong className="text-stone-800 font-mono">3-5 days ACH</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* VIEW 4: DISPATCHER COMMAND CENTER (DEFAULT) */
        <div className="space-y-4">
          {filteredLoads.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 text-center border border-stone-200 space-y-3">
              <Truck className="w-10 h-10 text-stone-300 mx-auto" />
              <p className="font-bold text-stone-700 text-sm">No loads found matching filter.</p>
              <button
                onClick={() => { setStatusFilter("all"); setSearchQuery(""); }}
                className="text-xs text-emerald-700 font-bold hover:underline"
              >
                Reset filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {filteredLoads.map(load => {
                const arrivalDate = load.arrival?.timestamp ? new Date(load.arrival.timestamp) : null;
                const isDetention = load.status === "in_detention";
                const isFreeTime = load.status === "arrived_free_time";

                return (
                  <div
                    key={load.id}
                    className={`bg-white rounded-2xl border transition-all p-5 shadow-xs space-y-4 ${
                      isDetention 
                        ? "border-rose-400/80 bg-rose-50/10" 
                        : isFreeTime 
                        ? "border-amber-300 bg-amber-50/5" 
                        : "border-stone-200"
                    }`}
                  >
                    {/* Load Card Top Header */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-100 pb-3">
                      <div className="flex items-center space-x-3">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold shrink-0 ${
                          isDetention ? "bg-rose-100 text-rose-700" :
                          isFreeTime ? "bg-amber-100 text-amber-700" :
                          load.status === "paid" ? "bg-emerald-100 text-emerald-700" :
                          "bg-stone-100 text-stone-700"
                        }`}>
                          <Truck className="w-5 h-5" />
                        </div>

                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-display font-bold text-base text-stone-900">{load.loadNumber}</span>
                            <span className="font-mono text-xs font-semibold px-2 py-0.5 rounded bg-stone-100 text-stone-600">
                              {load.rateConNumber}
                            </span>
                            {/* Status Pill */}
                            <span className={`text-[11px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider ${
                              isDetention 
                                ? "bg-rose-600 text-white animate-pulse" 
                                : isFreeTime 
                                ? "bg-amber-100 text-amber-800 border border-amber-300" 
                                : load.status === "paid"
                                ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                                : load.status === "claim_submitted"
                                ? "bg-blue-100 text-blue-800"
                                : "bg-stone-100 text-stone-700"
                            }`}>
                              {isDetention ? `DETENTION ACCRUING ($${load.calculations.totalClaimAmount.toFixed(2)})` :
                               isFreeTime ? `AT DOCK (${Math.max(0, 120 - load.calculations.totalDwellMinutes)}m FREE LEFT)` :
                               load.status === "departed_pending_claim" ? "CLAIM PACKET READY" :
                               load.status === "claim_submitted" ? "CLAIM SUBMITTED" :
                               load.status === "paid" ? "PAID & RECOVERED" : "SCHEDULED"}
                            </span>
                          </div>

                          <p className="text-xs text-stone-500 mt-0.5">
                            Broker: <strong className="text-stone-800">{load.broker.name}</strong> ({load.broker.mcNumber}) • Billing: {load.broker.billingEmail}
                          </p>
                        </div>
                      </div>

                      {/* Right Accrued Box */}
                      <div className="text-right shrink-0">
                        <span className="text-[10px] uppercase font-bold text-stone-400 block">Claim Due</span>
                        <span className={`font-display text-xl font-black ${
                          load.calculations.totalClaimAmount > 0 ? "text-emerald-600" : "text-stone-400"
                        }`}>
                          ${load.calculations.totalClaimAmount.toFixed(2)}
                        </span>
                        <span className="text-[11px] block text-stone-500">
                          {load.calculations.billableHours.toFixed(2)} hrs @ ${load.terms.hourlyRate}/hr
                        </span>
                      </div>
                    </div>

                    {/* Middle Info Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs bg-stone-50/70 p-3.5 rounded-xl border border-stone-100">
                      <div>
                        <span className="font-bold text-stone-500 uppercase text-[10px] block mb-0.5">Facility / Dock</span>
                        <p className="font-bold text-stone-900">{load.facility.name}</p>
                        <p className="text-stone-600 text-[11px] flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-stone-400" />
                          {load.facility.city}, {load.facility.state} {load.facility.dockNumber ? `• ${load.facility.dockNumber}` : ""}
                        </p>
                      </div>

                      <div>
                        <span className="font-bold text-stone-500 uppercase text-[10px] block mb-0.5">Driver & Tractor</span>
                        <p className="font-bold text-stone-900">{load.driver.name}</p>
                        <p className="text-stone-600 text-[11px] font-mono">
                          {load.driver.truckNumber} • {load.driver.trailerNumber}
                        </p>
                      </div>

                      <div>
                        <span className="font-bold text-stone-500 uppercase text-[10px] block mb-0.5">Time & Geofence Log</span>
                        <p className="font-mono text-stone-800">
                          In: {arrivalDate ? arrivalDate.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) : "En Route"}
                        </p>
                        <p className="text-[11px] text-stone-500">
                          Total Dwell: <strong className="text-stone-900">{Math.floor(load.calculations.totalDwellMinutes / 60)}h {load.calculations.totalDwellMinutes % 60}m</strong>
                        </p>
                      </div>
                    </div>

                    {/* Bottom Action Footer */}
                    <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                      <div className="flex items-center gap-2 text-xs">
                        {load.arrival?.latitude && (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 text-[11px] font-semibold border border-emerald-200">
                            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                            GPS: {load.arrival.latitude.toFixed(3)}, {load.arrival.longitude?.toFixed(3)}
                          </span>
                        )}

                        {load.terms.advanceNoticeSent ? (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-blue-50 text-blue-700 text-[11px] font-semibold border border-blue-200">
                            <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
                            15-Min Broker Notice Sent
                          </span>
                        ) : isFreeTime && load.calculations.totalDwellMinutes >= 90 ? (
                          <button
                            onClick={() => handleSendAdvanceNotice(load.id)}
                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-amber-500 hover:bg-amber-600 text-stone-950 text-xs font-bold transition-colors shadow-xs"
                          >
                            <Send className="w-3.5 h-3.5" />
                            <span>Send 15-Min Notice Now</span>
                          </button>
                        ) : null}

                        {load.bolDocument && (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-stone-100 text-stone-700 text-[11px] font-semibold">
                            <FileText className="w-3.5 h-3.5 text-stone-500" />
                            Signed BOL Attached
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-2">
                        {/* 1-Tap Driver Gate link simulator */}
                        {load.status === "scheduled" && (
                          <button
                            onClick={() => {
                              setViewMode("driver");
                            }}
                            className="px-3 py-1.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-semibold flex items-center gap-1 transition-colors"
                          >
                            <Smartphone className="w-3.5 h-3.5 text-amber-600" />
                            <span>Driver Check-in</span>
                          </button>
                        )}

                        {/* View Formal Claim Packet */}
                        <button
                          onClick={() => setSelectedLoadForPacket(load)}
                          className="px-4 py-1.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-white text-xs font-bold flex items-center gap-1.5 transition-colors shadow-xs"
                        >
                          <FileText className="w-3.5 h-3.5 text-amber-400" />
                          <span>View Claim Packet</span>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* New Load Modal */}
      <NewLoadModal
        isOpen={isNewLoadModalOpen}
        onClose={() => setIsNewLoadModalOpen(false)}
        onAddLoad={handleAddNewLoad}
      />
    </div>
  );
};
