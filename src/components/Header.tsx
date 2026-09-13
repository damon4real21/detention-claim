import React from "react";
import { Truck, Clock, Smartphone, FileText, BarChart3, Settings, Plus, ShieldCheck, Building2 } from "lucide-react";
import { CarrierProfile } from "../types";

export type ActiveNavTab = "dispatcher" | "driver" | "claims" | "facilities";

interface HeaderProps {
  activeTab: ActiveNavTab;
  setActiveTab: (tab: ActiveNavTab) => void;
  carrier: CarrierProfile;
  onOpenSettings: () => void;
  onOpenNewLoad: () => void;
  detentionActiveCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  carrier,
  onOpenSettings,
  onOpenNewLoad,
  detentionActiveCount,
}) => {
  return (
    <header className="border-b border-stone-200 bg-white/95 backdrop-blur-md sticky top-0 z-40 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-4">
          {/* Logo & Carrier Status */}
          <div className="flex items-center space-x-3 cursor-pointer select-none" onClick={() => setActiveTab("dispatcher")}>
            <div className="w-10 h-10 rounded-xl bg-stone-900 text-white flex items-center justify-center font-bold text-lg shadow-sm border border-stone-800">
              <Truck className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-display font-black text-lg sm:text-xl text-stone-900 tracking-tight">
                  Detention<span className="text-emerald-700">Claim</span>
                </span>
                <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                  <ShieldCheck className="w-3 h-3 mr-1 text-emerald-600" />
                  FMCSA / TIA Audited
                </span>
              </div>
              <p className="text-xs text-stone-500 hidden md:block">
                Automated freight dwell-time logging, GPS gate audit & broker claim recovery
              </p>
            </div>
          </div>

          {/* Center Navigation Tabs */}
          <nav className="hidden lg:flex items-center space-x-1 p-1 bg-stone-100 rounded-2xl border border-stone-200/80">
            <button
              id="nav-tab-dispatcher"
              onClick={() => setActiveTab("dispatcher")}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-colors flex items-center space-x-1.5 ${
                activeTab === "dispatcher"
                  ? "bg-white text-stone-900 shadow-xs"
                  : "text-stone-600 hover:text-stone-900 hover:bg-stone-200/60"
              }`}
            >
              <Truck className="w-3.5 h-3.5 text-stone-700" />
              <span>Dispatch Command</span>
              {detentionActiveCount > 0 && (
                <span className="ml-1 px-1.5 py-0.2 rounded-full text-[10px] bg-rose-600 text-white animate-pulse">
                  {detentionActiveCount}
                </span>
              )}
            </button>

            <button
              id="nav-tab-driver"
              onClick={() => setActiveTab("driver")}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-colors flex items-center space-x-1.5 ${
                activeTab === "driver"
                  ? "bg-stone-900 text-white shadow-xs"
                  : "text-stone-600 hover:text-stone-900 hover:bg-stone-200/60"
              }`}
            >
              <Smartphone className="w-3.5 h-3.5 text-amber-400" />
              <span>Driver Gate Terminal</span>
            </button>

            <button
              id="nav-tab-claims"
              onClick={() => setActiveTab("claims")}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-colors flex items-center space-x-1.5 ${
                activeTab === "claims"
                  ? "bg-white text-stone-900 shadow-xs"
                  : "text-stone-600 hover:text-stone-900 hover:bg-stone-200/60"
              }`}
            >
              <FileText className="w-3.5 h-3.5 text-emerald-600" />
              <span>Claim Audit Packets</span>
            </button>

            <button
              id="nav-tab-facilities"
              onClick={() => setActiveTab("facilities")}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-colors flex items-center space-x-1.5 ${
                activeTab === "facilities"
                  ? "bg-white text-stone-900 shadow-xs"
                  : "text-stone-600 hover:text-stone-900 hover:bg-stone-200/60"
              }`}
            >
              <BarChart3 className="w-3.5 h-3.5 text-blue-600" />
              <span>Facility Delay Index</span>
            </button>
          </nav>

          {/* Right Actions: Carrier Info & Dispatch Button */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            {/* Carrier Info Badge & Settings Trigger */}
            <button
              onClick={onOpenSettings}
              title="Carrier & Detention Settings"
              className="hidden sm:flex items-center space-x-2 px-3 py-1.5 rounded-xl border border-stone-200 bg-stone-50 hover:bg-stone-100 transition-colors text-left"
            >
              <div className="w-7 h-7 rounded-lg bg-stone-200 flex items-center justify-center text-stone-700">
                <Building2 className="w-4 h-4" />
              </div>
              <div className="text-left leading-tight pr-1">
                <div className="text-xs font-bold text-stone-900 truncate max-w-[130px] xl:max-w-[160px]">
                  {carrier.name}
                </div>
                <div className="text-[10px] text-stone-500 font-mono">
                  {carrier.dotNumber}
                </div>
              </div>
              <Settings className="w-3.5 h-3.5 text-stone-400" />
            </button>

            {/* Mobile Settings Icon */}
            <button
              onClick={onOpenSettings}
              className="sm:hidden p-2 rounded-xl border border-stone-200 bg-stone-50 text-stone-700"
              title="Settings"
            >
              <Settings className="w-4 h-4" />
            </button>

            {/* Dispatch New Load Button */}
            <button
              id="btn-dispatch-new-load"
              onClick={onOpenNewLoad}
              className="px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-bold flex items-center space-x-1.5 shadow-md shadow-emerald-700/20 transition-all active:scale-95"
            >
              <Plus className="w-4 h-4" />
              <span className="hidden sm:inline">Dispatch New Load</span>
              <span className="sm:hidden">New Load</span>
            </button>
          </div>
        </div>

        {/* Mobile Sub-Navigation Bar */}
        <div className="lg:hidden flex items-center justify-between overflow-x-auto py-2.5 border-t border-stone-100 gap-1 scrollbar-none">
          <button
            onClick={() => setActiveTab("dispatcher")}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-colors flex items-center space-x-1 ${
              activeTab === "dispatcher"
                ? "bg-stone-900 text-white"
                : "text-stone-600 hover:bg-stone-100"
            }`}
          >
            <Truck className="w-3.5 h-3.5" />
            <span>Dispatch</span>
            {detentionActiveCount > 0 && (
              <span className="ml-1 px-1.5 py-0.2 rounded-full text-[9px] bg-rose-600 text-white font-mono">
                {detentionActiveCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab("driver")}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-colors flex items-center space-x-1 ${
              activeTab === "driver"
                ? "bg-stone-900 text-white"
                : "text-stone-600 hover:bg-stone-100"
            }`}
          >
            <Smartphone className="w-3.5 h-3.5 text-amber-400" />
            <span>Driver Gate</span>
          </button>

          <button
            onClick={() => setActiveTab("claims")}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-colors flex items-center space-x-1 ${
              activeTab === "claims"
                ? "bg-stone-900 text-white"
                : "text-stone-600 hover:bg-stone-100"
            }`}
          >
            <FileText className="w-3.5 h-3.5 text-emerald-600" />
            <span>Claims</span>
          </button>

          <button
            onClick={() => setActiveTab("facilities")}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-colors flex items-center space-x-1 ${
              activeTab === "facilities"
                ? "bg-stone-900 text-white"
                : "text-stone-600 hover:bg-stone-100"
            }`}
          >
            <BarChart3 className="w-3.5 h-3.5 text-blue-600" />
            <span>Facility Index</span>
          </button>
        </div>
      </div>
    </header>
  );
};
