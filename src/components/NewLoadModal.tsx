import React, { useState } from "react";
import { FreightLoad, FreightLoadStatus } from "../types";
import { X, Truck, Building2, Clock, DollarSign, MapPin, CheckCircle2 } from "lucide-react";

interface NewLoadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddLoad: (load: FreightLoad) => void;
}

export const NewLoadModal: React.FC<NewLoadModalProps> = ({ isOpen, onClose, onAddLoad }) => {
  const [loadNumber, setLoadNumber] = useState(`LD-2026-${Math.floor(1000 + Math.random() * 9000)}`);
  const [rateConNumber, setRateConNumber] = useState(`RC-TQL-${Math.floor(10000 + Math.random() * 90000)}`);
  
  // Broker details
  const [brokerName, setBrokerName] = useState("Total Quality Logistics (TQL)");
  const [brokerMc, setBrokerMc] = useState("MC-248887");
  const [brokerEmail, setBrokerEmail] = useState("detentionclaims@tql.com");
  const [brokerPhone, setBrokerPhone] = useState("(800) 580-3101");
  const [contactPerson, setContactPerson] = useState("Carrier Exceptions Desk");

  // Driver details
  const [driverName, setDriverName] = useState("Marcus Reynolds");
  const [driverPhone, setDriverPhone] = useState("(317) 555-8812");
  const [truckNumber, setTruckNumber] = useState("Unit #104");
  const [trailerNumber, setTrailerNumber] = useState("Reefer #5309");

  // Facility details
  const [facilityName, setFacilityName] = useState("Americold Cold Storage - Gateway");
  const [facilityType, setFacilityType] = useState<"shipper" | "receiver">("receiver");
  const [facilityAddress, setFacilityAddress] = useState("3850 Tradeport Blvd");
  const [facilityCity, setFacilityCity] = useState("Atlanta");
  const [facilityState, setFacilityState] = useState("GA");
  const [facilityZip, setFacilityZip] = useState("30354");
  const [dockNumber, setDockNumber] = useState("Door 42");

  // Terms
  const [freeTimeHours, setFreeTimeHours] = useState(2);
  const [hourlyRate, setHourlyRate] = useState(75);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newLoad: FreightLoad = {
      id: `load-${Date.now()}`,
      loadNumber,
      rateConNumber,
      status: "scheduled" as FreightLoadStatus,
      broker: {
        name: brokerName,
        mcNumber: brokerMc,
        billingEmail: brokerEmail,
        phone: brokerPhone,
        contactPerson
      },
      driver: {
        name: driverName,
        phone: driverPhone,
        truckNumber,
        trailerNumber
      },
      facility: {
        name: facilityName,
        type: facilityType,
        address: facilityAddress,
        city: facilityCity,
        state: facilityState,
        zip: facilityZip,
        dockNumber
      },
      terms: {
        freeTimeHours: Number(freeTimeHours),
        hourlyRate: Number(hourlyRate),
        incrementMinutes: 15,
        advanceNoticeSent: false
      },
      arrival: {
        timestamp: "",
        method: "gps_automatic"
      },
      calculations: {
        totalDwellMinutes: 0,
        freeTimeMinutes: Number(freeTimeHours) * 60,
        detentionMinutes: 0,
        billableHours: 0,
        totalClaimAmount: 0
      },
      createdAt: new Date().toISOString()
    };

    onAddLoad(newLoad);
    onClose();
  };

  const handleSelectBrokerPreset = (name: string, mc: string, email: string) => {
    setBrokerName(name);
    setBrokerMc(mc);
    setBrokerEmail(email);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-2xl border border-stone-200 my-8">
        <div className="flex items-center justify-between border-b border-stone-200 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-display text-lg font-bold text-stone-900">
                Dispatch New Load & Detention Monitor
              </h2>
              <p className="text-xs text-stone-500">
                Set contract detention terms and assign driver mobile gate access.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-stone-100 flex items-center justify-center text-stone-400 hover:text-stone-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 text-xs">
          {/* Quick Presets for Common Freight Brokers */}
          <div>
            <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wider block mb-1.5">
              Quick Broker Presets:
            </span>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => handleSelectBrokerPreset("Total Quality Logistics (TQL)", "MC-248887", "detentionclaims@tql.com")}
                className="px-2.5 py-1 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 font-semibold"
              >
                TQL (MC-248887)
              </button>
              <button
                type="button"
                onClick={() => handleSelectBrokerPreset("C.H. Robinson Worldwide", "MC-120002", "detention@chrobinson.com")}
                className="px-2.5 py-1 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 font-semibold"
              >
                C.H. Robinson (MC-120002)
              </button>
              <button
                type="button"
                onClick={() => handleSelectBrokerPreset("Coyote Logistics", "MC-561380", "carrieraccess@coyote.com")}
                className="px-2.5 py-1 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 font-semibold"
              >
                Coyote (MC-561380)
              </button>
              <button
                type="button"
                onClick={() => handleSelectBrokerPreset("Echo Global Logistics", "MC-500139", "detention@echo.com")}
                className="px-2.5 py-1 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 font-semibold"
              >
                Echo Global (MC-500139)
              </button>
            </div>
          </div>

          {/* Identification */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="font-bold text-stone-700 block mb-1">Internal Load #</label>
              <input
                type="text"
                required
                value={loadNumber}
                onChange={(e) => setLoadNumber(e.target.value)}
                className="w-full p-2.5 border border-stone-300 rounded-xl font-mono text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
              />
            </div>
            <div>
              <label className="font-bold text-stone-700 block mb-1">Rate Confirmation #</label>
              <input
                type="text"
                required
                value={rateConNumber}
                onChange={(e) => setRateConNumber(e.target.value)}
                className="w-full p-2.5 border border-stone-300 rounded-xl font-mono text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
              />
            </div>
          </div>

          {/* Broker Details */}
          <div className="bg-stone-50 p-3.5 rounded-2xl border border-stone-200 space-y-3">
            <span className="font-bold text-stone-900 flex items-center gap-1.5 text-xs">
              <Building2 className="w-3.5 h-3.5 text-stone-700" />
              Brokerage Billing Information
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              <div>
                <label className="text-stone-600 block mb-1">Broker Company Name</label>
                <input
                  type="text"
                  required
                  value={brokerName}
                  onChange={(e) => setBrokerName(e.target.value)}
                  className="w-full p-2 border border-stone-300 rounded-lg text-xs bg-white"
                />
              </div>
              <div>
                <label className="text-stone-600 block mb-1">Broker MC #</label>
                <input
                  type="text"
                  required
                  value={brokerMc}
                  onChange={(e) => setBrokerMc(e.target.value)}
                  className="w-full p-2 border border-stone-300 rounded-lg text-xs bg-white font-mono"
                />
              </div>
              <div>
                <label className="text-stone-600 block mb-1">Billing / Claims Email</label>
                <input
                  type="email"
                  required
                  value={brokerEmail}
                  onChange={(e) => setBrokerEmail(e.target.value)}
                  className="w-full p-2 border border-stone-300 rounded-lg text-xs bg-white font-mono"
                />
              </div>
            </div>
          </div>

          {/* Driver & Equipment */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            <div>
              <label className="text-stone-700 font-semibold block mb-1">Driver Name</label>
              <input
                type="text"
                required
                value={driverName}
                onChange={(e) => setDriverName(e.target.value)}
                className="w-full p-2 border border-stone-300 rounded-lg text-xs"
              />
            </div>
            <div>
              <label className="text-stone-700 font-semibold block mb-1">Driver Phone</label>
              <input
                type="text"
                value={driverPhone}
                onChange={(e) => setDriverPhone(e.target.value)}
                className="w-full p-2 border border-stone-300 rounded-lg text-xs"
              />
            </div>
            <div>
              <label className="text-stone-700 font-semibold block mb-1">Truck #</label>
              <input
                type="text"
                value={truckNumber}
                onChange={(e) => setTruckNumber(e.target.value)}
                className="w-full p-2 border border-stone-300 rounded-lg text-xs font-mono"
              />
            </div>
            <div>
              <label className="text-stone-700 font-semibold block mb-1">Trailer #</label>
              <input
                type="text"
                value={trailerNumber}
                onChange={(e) => setTrailerNumber(e.target.value)}
                className="w-full p-2 border border-stone-300 rounded-lg text-xs font-mono"
              />
            </div>
          </div>

          {/* Facility Location */}
          <div className="bg-stone-50 p-3.5 rounded-2xl border border-stone-200 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-bold text-stone-900 flex items-center gap-1.5 text-xs">
                <MapPin className="w-3.5 h-3.5 text-stone-700" />
                Dock / Facility Location
              </span>
              <div className="flex items-center gap-3">
                <label className="flex items-center gap-1 font-semibold text-stone-700 cursor-pointer">
                  <input
                    type="radio"
                    name="facilityType"
                    checked={facilityType === "receiver"}
                    onChange={() => setFacilityType("receiver")}
                  />
                  <span>Receiver (Delivery)</span>
                </label>
                <label className="flex items-center gap-1 font-semibold text-stone-700 cursor-pointer">
                  <input
                    type="radio"
                    name="facilityType"
                    checked={facilityType === "shipper"}
                    onChange={() => setFacilityType("shipper")}
                  />
                  <span>Shipper (Pickup)</span>
                </label>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              <div className="sm:col-span-2">
                <label className="text-stone-600 block mb-1">Facility Name</label>
                <input
                  type="text"
                  required
                  value={facilityName}
                  onChange={(e) => setFacilityName(e.target.value)}
                  className="w-full p-2 border border-stone-300 rounded-lg text-xs bg-white"
                />
              </div>
              <div>
                <label className="text-stone-600 block mb-1">Dock / Door # (Optional)</label>
                <input
                  type="text"
                  value={dockNumber}
                  onChange={(e) => setDockNumber(e.target.value)}
                  className="w-full p-2 border border-stone-300 rounded-lg text-xs bg-white font-mono"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
              <div className="col-span-2 sm:col-span-2">
                <label className="text-stone-600 block mb-1">Address</label>
                <input
                  type="text"
                  value={facilityAddress}
                  onChange={(e) => setFacilityAddress(e.target.value)}
                  className="w-full p-2 border border-stone-300 rounded-lg text-xs bg-white"
                />
              </div>
              <div>
                <label className="text-stone-600 block mb-1">City</label>
                <input
                  type="text"
                  value={facilityCity}
                  onChange={(e) => setFacilityCity(e.target.value)}
                  className="w-full p-2 border border-stone-300 rounded-lg text-xs bg-white"
                />
              </div>
              <div>
                <label className="text-stone-600 block mb-1">State & Zip</label>
                <div className="flex gap-1">
                  <input
                    type="text"
                    value={facilityState}
                    onChange={(e) => setFacilityState(e.target.value)}
                    className="w-12 p-2 border border-stone-300 rounded-lg text-xs bg-white uppercase font-bold"
                  />
                  <input
                    type="text"
                    value={facilityZip}
                    onChange={(e) => setFacilityZip(e.target.value)}
                    className="flex-1 p-2 border border-stone-300 rounded-lg text-xs bg-white font-mono"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Detention Terms */}
          <div className="grid grid-cols-2 gap-3 bg-amber-50/60 p-3.5 rounded-2xl border border-amber-200">
            <div>
              <label className="font-bold text-stone-900 block mb-1 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-amber-700" />
                Agreed Free Time (Hours)
              </label>
              <select
                value={freeTimeHours}
                onChange={(e) => setFreeTimeHours(Number(e.target.value))}
                className="w-full p-2 border border-amber-300 rounded-lg text-xs bg-white font-bold"
              >
                <option value={1}>1 Hour</option>
                <option value={2}>2 Hours (Industry Standard)</option>
                <option value={3}>3 Hours</option>
                <option value={4}>4 Hours</option>
              </select>
            </div>

            <div>
              <label className="font-bold text-stone-900 block mb-1 flex items-center gap-1">
                <DollarSign className="w-3.5 h-3.5 text-emerald-700" />
                Agreed Hourly Detention Rate
              </label>
              <div className="relative">
                <span className="absolute left-2.5 top-2 text-stone-500 font-bold">$</span>
                <input
                  type="number"
                  step="5"
                  value={hourlyRate}
                  onChange={(e) => setHourlyRate(Number(e.target.value))}
                  className="w-full pl-6 pr-2 py-2 border border-amber-300 rounded-lg text-xs bg-white font-bold text-emerald-700"
                />
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pt-3 border-t border-stone-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl border border-stone-300 text-stone-700 font-semibold hover:bg-stone-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold shadow-md shadow-emerald-600/20 transition-all"
            >
              Dispatch Load & Start Monitoring
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
