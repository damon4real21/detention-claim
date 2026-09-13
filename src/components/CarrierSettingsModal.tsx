import React, { useState } from "react";
import { CarrierProfile } from "../types";
import { X, ShieldCheck, DollarSign, Building2, Mail, Phone, MapPin, Clock, Save, CheckCircle2 } from "lucide-react";

interface CarrierSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  carrier: CarrierProfile;
  onSaveCarrier: (updated: CarrierProfile) => void;
}

export const CarrierSettingsModal: React.FC<CarrierSettingsModalProps> = ({
  isOpen,
  onClose,
  carrier,
  onSaveCarrier,
}) => {
  const [formData, setFormData] = useState<CarrierProfile>(carrier);
  const [savedSuccess, setSavedSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveCarrier(formData);
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-stone-200 overflow-hidden my-8">
        {/* Header */}
        <div className="p-6 bg-stone-900 text-white flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center font-bold">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white font-display">Carrier & Detention Profile</h2>
              <p className="text-xs text-stone-400">Configure USDOT/MC legal entity and standard detention terms</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-stone-400 hover:text-white hover:bg-stone-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-stone-700 uppercase mb-1">
                Motor Carrier Name
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 text-sm bg-stone-50 border border-stone-300 rounded-xl focus:ring-2 focus:ring-stone-900 focus:outline-hidden"
                placeholder="e.g., Eagle Trans Express LLC"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase mb-1">
                USDOT Number
              </label>
              <input
                type="text"
                required
                value={formData.dotNumber}
                onChange={(e) => setFormData({ ...formData, dotNumber: e.target.value })}
                className="w-full px-3 py-2 text-sm bg-stone-50 border border-stone-300 rounded-xl focus:ring-2 focus:ring-stone-900 focus:outline-hidden font-mono"
                placeholder="e.g., USDOT 3819201"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase mb-1">
                MC / FF Number
              </label>
              <input
                type="text"
                required
                value={formData.mcNumber}
                onChange={(e) => setFormData({ ...formData, mcNumber: e.target.value })}
                className="w-full px-3 py-2 text-sm bg-stone-50 border border-stone-300 rounded-xl focus:ring-2 focus:ring-stone-900 focus:outline-hidden font-mono"
                placeholder="e.g., MC 1294810"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase mb-1">
                Billing & Claims Email
              </label>
              <input
                type="email"
                required
                value={formData.billingEmail}
                onChange={(e) => setFormData({ ...formData, billingEmail: e.target.value })}
                className="w-full px-3 py-2 text-sm bg-stone-50 border border-stone-300 rounded-xl focus:ring-2 focus:ring-stone-900 focus:outline-hidden"
                placeholder="claims@carrier.com"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase mb-1">
                Dispatch Phone Number
              </label>
              <input
                type="text"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-3 py-2 text-sm bg-stone-50 border border-stone-300 rounded-xl focus:ring-2 focus:ring-stone-900 focus:outline-hidden"
                placeholder="(800) 555-0199"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-stone-700 uppercase mb-1">
                Remittance Address (Printed on Claim Invoices)
              </label>
              <input
                type="text"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="w-full px-3 py-2 text-sm bg-stone-50 border border-stone-300 rounded-xl focus:ring-2 focus:ring-stone-900 focus:outline-hidden"
                placeholder="100 Freight Way, Suite 400, Chicago, IL 60601"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase mb-1">
                Standard Hourly Detention Rate ($)
              </label>
              <div className="relative">
                <span className="absolute left-3 top-2 text-sm font-bold text-stone-400">$</span>
                <input
                  type="number"
                  min="50"
                  max="250"
                  step="5"
                  required
                  value={formData.defaultHourlyRate}
                  onChange={(e) => setFormData({ ...formData, defaultHourlyRate: parseFloat(e.target.value) || 75 })}
                  className="w-full pl-8 pr-3 py-2 text-sm bg-stone-50 border border-stone-300 rounded-xl focus:ring-2 focus:ring-stone-900 focus:outline-hidden font-mono font-bold"
                />
              </div>
              <span className="text-[11px] text-stone-500">Standard market rate is $75 - $100/hr</span>
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase mb-1">
                Standard Free Time Allowance (Hours)
              </label>
              <div className="relative">
                <input
                  type="number"
                  min="1"
                  max="4"
                  step="0.5"
                  required
                  value={formData.defaultFreeTimeHours}
                  onChange={(e) => setFormData({ ...formData, defaultFreeTimeHours: parseFloat(e.target.value) || 2 })}
                  className="w-full px-3 py-2 text-sm bg-stone-50 border border-stone-300 rounded-xl focus:ring-2 focus:ring-stone-900 focus:outline-hidden font-mono font-bold"
                />
              </div>
              <span className="text-[11px] text-stone-500">Standard Rate Confirmation is 2.0 hours</span>
            </div>
          </div>

          <div className="pt-4 border-t border-stone-200 flex items-center justify-between">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-stone-600 hover:text-stone-900 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all shadow-md shadow-emerald-600/20 flex items-center gap-1.5"
            >
              {savedSuccess ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-white" />
                  <span>Saved!</span>
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  <span>Save Carrier Profile</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
