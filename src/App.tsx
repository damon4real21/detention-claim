import React, { useState, useEffect } from "react";
import { Header, ActiveNavTab } from "./components/Header";
import { FreightDetentionApp } from "./components/FreightDetentionApp";
import { CarrierSettingsModal } from "./components/CarrierSettingsModal";
import { CarrierProfile } from "./types";
import { DEFAULT_CARRIER_PROFILE } from "./data/freightLoads";
import { Truck, ShieldCheck, Clock, CheckCircle2 } from "lucide-react";

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveNavTab>("dispatcher");
  const [carrier, setCarrier] = useState<CarrierProfile>(() => {
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

  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isNewLoadModalOpen, setIsNewLoadModalOpen] = useState(false);
  const [detentionActiveCount, setDetentionActiveCount] = useState(1);

  // Sync carrier to localStorage
  useEffect(() => {
    localStorage.setItem("carrier_profile_v1", JSON.stringify(carrier));
  }, [carrier]);

  return (
    <div className="min-h-screen bg-[#fafaf9] text-stone-900 flex flex-col font-sans selection:bg-emerald-100 selection:text-emerald-900">
      {/* Clean, Dedicated Freight Detention Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        carrier={carrier}
        onOpenSettings={() => setIsSettingsOpen(true)}
        onOpenNewLoad={() => setIsNewLoadModalOpen(true)}
        detentionActiveCount={detentionActiveCount}
      />

      {/* Main Freight Detention Application */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <FreightDetentionApp
          currentTab={activeTab}
          onTabChange={setActiveTab}
          carrier={carrier}
          onUpdateCarrier={setCarrier}
          isNewLoadModalOpen={isNewLoadModalOpen}
          setIsNewLoadModalOpen={setIsNewLoadModalOpen}
          onDetentionCountChange={setDetentionActiveCount}
        />
      </main>

      {/* Carrier & Rate Settings Modal */}
      <CarrierSettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        carrier={carrier}
        onSaveCarrier={(updated) => setCarrier(updated)}
      />

      {/* Clean Logistics Footer */}
      <footer className="border-t border-stone-200 bg-white py-6 mt-12 text-center text-xs text-stone-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center space-x-2">
            <Truck className="w-4 h-4 text-emerald-600" />
            <span className="font-bold text-stone-800">DetentionClaim</span>
            <span>• Built for North American Motor Carriers & Owner-Operators</span>
          </div>

          <div className="flex items-center space-x-4 text-[11px] text-stone-500">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              TIA & OOIDA Compliant Notices
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-amber-500" />
              Automatic 15-Min Broker Alerts
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
