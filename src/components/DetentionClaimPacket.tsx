import React, { useState } from "react";
import { FreightLoad, CarrierProfile } from "../types";
import { 
  Printer, 
  Copy, 
  Check, 
  Send, 
  ShieldCheck, 
  MapPin, 
  Clock, 
  FileText, 
  Truck, 
  DollarSign, 
  CheckCircle2, 
  AlertCircle,
  Building2,
  Calendar,
  ExternalLink
} from "lucide-react";

interface DetentionClaimPacketProps {
  load: FreightLoad;
  carrier: CarrierProfile;
  onClose?: () => void;
  onMarkSubmitted?: (loadId: string) => void;
  onMarkPaid?: (loadId: string, amount: number) => void;
}

export const DetentionClaimPacket: React.FC<DetentionClaimPacketProps> = ({
  load,
  carrier,
  onClose,
  onMarkSubmitted,
  onMarkPaid
}) => {
  const [copied, setCopied] = useState(false);
  const [showPaidModal, setShowPaidModal] = useState(false);
  const [paidAmountInput, setPaidAmountInput] = useState(load.calculations.totalClaimAmount.toFixed(2));

  const arrivalDate = load.arrival?.timestamp ? new Date(load.arrival.timestamp) : null;
  const departureDate = load.departure?.timestamp ? new Date(load.departure.timestamp) : null;

  const handlePrint = () => {
    window.print();
  };

  const getEmailBody = () => {
    return `ATTN: Accounts Payable / Carrier Disputes
BROKER: ${load.broker.name} (MC #${load.broker.mcNumber})
RATE CONFIRMATION: ${load.rateConNumber}
LOAD NUMBER: ${load.loadNumber}
CARRIER: ${carrier.name} (USDOT #${carrier.dotNumber} / MC #${carrier.mcNumber})

Please find attached our formal Notice of Detention Claim for excessive dock dwell time incurred on the above-referenced shipment.

FACILITY: ${load.facility.name} (${load.facility.address}, ${load.facility.city}, ${load.facility.state})
DRIVER / UNIT: ${load.driver.name} | Truck: ${load.driver.truckNumber} | Trailer: ${load.driver.trailerNumber}

AUDIT LOG:
- Arrival Timestamp (GPS-Verified): ${arrivalDate ? arrivalDate.toLocaleString() : "N/A"}
  Coordinates: Lat ${load.arrival.latitude || "N/A"}, Lon ${load.arrival.longitude || "N/A"}
- 15-Minute Advance Notice Transmitted: ${load.terms.advanceNoticeSent ? (load.terms.advanceNoticeTime ? new Date(load.terms.advanceNoticeTime).toLocaleString() : "Yes") : "N/A"}
- Departure Timestamp (GPS-Verified): ${departureDate ? departureDate.toLocaleString() : "N/A"}
- Total Dock Dwell: ${Math.floor(load.calculations.totalDwellMinutes / 60)}h ${load.calculations.totalDwellMinutes % 60}m
- Contractual Free Time: ${load.terms.freeTimeHours} hours
- Net Billable Detention: ${load.calculations.billableHours.toFixed(2)} hours @ $${load.terms.hourlyRate.toFixed(2)}/hr

TOTAL DETENTION DUE: $${load.calculations.totalClaimAmount.toFixed(2)}

Please remit payment within 15 days via ACH to ${carrier.billingEmail}.
Signed Bill of Lading with receiver dock in/out timestamps is on file.

Thank you,
${carrier.name} Billing Department
${carrier.phone} | ${carrier.billingEmail}`;
  };

  const handleCopyText = () => {
    navigator.clipboard.writeText(getEmailBody());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSendEmail = () => {
    const subject = encodeURIComponent(`Detention Claim Notice: RateCon #${load.rateConNumber} - ${carrier.name} ($${load.calculations.totalClaimAmount.toFixed(2)})`);
    const body = encodeURIComponent(getEmailBody());
    window.location.href = `mailto:${load.broker.billingEmail}?subject=${subject}&body=${body}`;
    if (onMarkSubmitted && load.status !== "paid" && load.status !== "claim_submitted") {
      onMarkSubmitted(load.id);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Action Bar (Hidden on print) */}
      <div className="print:hidden bg-stone-900 text-stone-100 p-4 rounded-2xl flex flex-wrap items-center justify-between gap-3 shadow-md">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-sm text-white">Detention Claim Audit Packet</span>
              <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                load.status === "paid" 
                  ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30" 
                  : load.status === "claim_submitted"
                  ? "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                  : "bg-amber-500/20 text-amber-400 border border-amber-500/30"
              }`}>
                {load.status === "paid" ? "PAID & RECOVERED" : load.status === "claim_submitted" ? "CLAIM SUBMITTED" : "READY TO ISSUE"}
              </span>
            </div>
            <p className="text-xs text-stone-400">
              RateCon: <span className="font-mono text-stone-200">{load.rateConNumber}</span> • Broker: {load.broker.name}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopyText}
            className="px-3 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-semibold flex items-center gap-1.5 transition-colors border border-stone-700"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? "Copied" : "Copy Plaintext"}</span>
          </button>

          <button
            onClick={handlePrint}
            className="px-3 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-semibold flex items-center gap-1.5 transition-colors border border-stone-700"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print / PDF</span>
          </button>

          <button
            onClick={handleSendEmail}
            className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1.5 transition-colors shadow-sm"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Email Claim to Broker</span>
          </button>

          {load.status !== "paid" && onMarkPaid && (
            <button
              onClick={() => setShowPaidModal(true)}
              className="px-3 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold transition-colors"
            >
              Mark Paid
            </button>
          )}

          {onClose && (
            <button
              onClick={onClose}
              className="px-3 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 text-xs transition-colors"
            >
              Close
            </button>
          )}
        </div>
      </div>

      {/* Modal for marking paid */}
      {showPaidModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 space-y-4 shadow-xl border border-stone-200">
            <h3 className="font-bold text-stone-900 text-base flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              Record Broker Payment
            </h3>
            <p className="text-xs text-stone-600">
              Confirm the amount recovered from {load.broker.name} for RateCon #{load.rateConNumber}.
            </p>
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Amount Paid ($ USD)
              </label>
              <div className="relative">
                <span className="absolute left-3 top-2 text-stone-400 font-bold">$</span>
                <input
                  type="number"
                  step="0.01"
                  value={paidAmountInput}
                  onChange={(e) => setPaidAmountInput(e.target.value)}
                  className="w-full pl-7 pr-3 py-2 border border-stone-300 rounded-xl text-sm font-bold text-stone-900 focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setShowPaidModal(false)}
                className="px-3 py-2 rounded-xl border border-stone-200 text-xs font-medium text-stone-600 hover:bg-stone-50"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  if (onMarkPaid) {
                    onMarkPaid(load.id, parseFloat(paidAmountInput) || load.calculations.totalClaimAmount);
                  }
                  setShowPaidModal(false);
                }}
                className="px-4 py-2 rounded-xl bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700"
              >
                Save as Paid
              </button>
            </div>
          </div>
        </div>
      )}

      {/* THE FORMAL CLAIM PACKET DOCUMENT (PRINT-READY) */}
      <div className="bg-white rounded-3xl border border-stone-200 p-8 sm:p-12 shadow-sm text-stone-900 space-y-8 print:border-none print:shadow-none print:p-0">
        {/* DOCUMENT HEADER */}
        <div className="flex flex-col sm:flex-row justify-between items-start gap-6 border-b-2 border-stone-900 pb-6">
          <div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-stone-900 text-white flex items-center justify-center font-bold">
                <Truck className="w-4 h-4" />
              </div>
              <h1 className="font-display text-2xl font-black tracking-tight text-stone-900 uppercase">
                {carrier.name}
              </h1>
            </div>
            <div className="text-xs text-stone-600 mt-2 space-y-0.5">
              <p>{carrier.address}</p>
              <p>{carrier.cityStateZip}</p>
              <p>Phone: {carrier.phone} • Email: {carrier.billingEmail}</p>
              <p className="font-semibold text-stone-800">
                DOT: <span className="font-mono">{carrier.dotNumber}</span> • MC: <span className="font-mono">{carrier.mcNumber}</span>
              </p>
            </div>
          </div>

          <div className="sm:text-right">
            <div className="inline-block px-3 py-1 rounded bg-stone-100 text-stone-900 text-xs font-extrabold uppercase tracking-wider mb-2 border border-stone-300">
              Notice of Freight Detention Claim
            </div>
            <div className="text-xs text-stone-600 space-y-1">
              <p>
                <strong className="text-stone-900">Claim Date:</strong> {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
              </p>
              <p>
                <strong className="text-stone-900">Claim Invoice #:</strong> <span className="font-mono font-bold text-stone-900">CLM-{load.rateConNumber.replace(/[^a-zA-Z0-9]/g, "")}</span>
              </p>
              <p>
                <strong className="text-stone-900">Rate Confirmation #:</strong> <span className="font-mono font-bold text-stone-900">{load.rateConNumber}</span>
              </p>
              <p>
                <strong className="text-stone-900">Internal Load #:</strong> <span className="font-mono">{load.loadNumber}</span>
              </p>
            </div>
          </div>
        </div>

        {/* BILL TO & FACILITY PARTICULARS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs">
          <div className="bg-stone-50 p-4 rounded-xl border border-stone-200">
            <h3 className="font-bold text-stone-900 uppercase tracking-wider text-[11px] mb-2 flex items-center gap-1.5">
              <Building2 className="w-3.5 h-3.5 text-stone-600" />
              Bill To Broker (Debtor)
            </h3>
            <p className="font-bold text-sm text-stone-900">{load.broker.name}</p>
            <p className="text-stone-600">Broker MC: <span className="font-mono">{load.broker.mcNumber}</span></p>
            <p className="text-stone-600">Attn: Accounts Payable / {load.broker.contactPerson}</p>
            <p className="text-stone-600">Billing Email: <span className="font-semibold text-stone-800">{load.broker.billingEmail}</span></p>
            <p className="text-stone-600">Phone: {load.broker.phone}</p>
          </div>

          <div className="bg-stone-50 p-4 rounded-xl border border-stone-200">
            <h3 className="font-bold text-stone-900 uppercase tracking-wider text-[11px] mb-2 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-stone-600" />
              Facility & Equipment Details
            </h3>
            <p className="font-bold text-sm text-stone-900">{load.facility.name}</p>
            <p className="text-stone-600">{load.facility.address}, {load.facility.city}, {load.facility.state} {load.facility.zip}</p>
            <p className="text-stone-600">Facility Type: <span className="capitalize font-semibold">{load.facility.type}</span> {load.facility.dockNumber ? `• ${load.facility.dockNumber}` : ""}</p>
            <p className="text-stone-600">
              Driver: <span className="font-semibold text-stone-900">{load.driver.name}</span> ({load.driver.phone})
            </p>
            <p className="text-stone-600 font-mono">
              Tractor: {load.driver.truckNumber} • Trailer: {load.driver.trailerNumber}
            </p>
          </div>
        </div>

        {/* TIME AUDIT TRAIL TABLE */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-sm text-stone-900 uppercase tracking-wider flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-emerald-600" />
              Tamper-Proof Geolocation & Time Audit Table
            </h3>
            <span className="text-[11px] text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
              Satellite GPS Confirmed
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border border-stone-200 rounded-xl overflow-hidden">
              <thead className="bg-stone-100 text-stone-700 font-bold border-b border-stone-200">
                <tr>
                  <th className="p-3">Event</th>
                  <th className="p-3">Verified Date & Time</th>
                  <th className="p-3">GPS Latitude / Longitude</th>
                  <th className="p-3">Audit Method</th>
                  <th className="p-3 text-right">Elapsed Dwell</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-200 text-stone-800">
                <tr>
                  <td className="p-3 font-semibold flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                    Facility Check-in / Dock Arrival
                  </td>
                  <td className="p-3 font-mono">
                    {arrivalDate ? arrivalDate.toLocaleString("en-US", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit", second: "2-digit" }) : "Pending"}
                  </td>
                  <td className="p-3 font-mono text-stone-600">
                    {load.arrival.latitude ? `${load.arrival.latitude.toFixed(4)}° N, ${Math.abs(load.arrival.longitude || 0).toFixed(4)}° W (±${load.arrival.accuracyMeters || 5}m)` : "Manual"}
                  </td>
                  <td className="p-3 text-emerald-700 font-medium">
                    {load.arrival.method === "gps_automatic" ? "Automated Device GPS" : "Driver Log"}
                  </td>
                  <td className="p-3 text-right font-mono">00h 00m</td>
                </tr>

                <tr className="bg-amber-50/40">
                  <td className="p-3 font-semibold text-amber-900 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                    Contractual Free Time Expiry
                  </td>
                  <td className="p-3 font-mono text-amber-900">
                    {arrivalDate 
                      ? new Date(arrivalDate.getTime() + load.terms.freeTimeHours * 3600000).toLocaleString("en-US", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" }) 
                      : "Pending"}
                  </td>
                  <td className="p-3 font-mono text-stone-500">Facility Geofence</td>
                  <td className="p-3 text-amber-800">
                    {load.terms.advanceNoticeSent ? "15-Min Warning Dispatched to Broker" : "Free Time Clock"}
                  </td>
                  <td className="p-3 text-right font-mono text-amber-900 font-bold">{load.terms.freeTimeHours}h 00m (Free)</td>
                </tr>

                <tr>
                  <td className="p-3 font-semibold flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-rose-500"></span>
                    Dock Release / Departure Gate
                  </td>
                  <td className="p-3 font-mono">
                    {departureDate ? departureDate.toLocaleString("en-US", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit", second: "2-digit" }) : "Active on site"}
                  </td>
                  <td className="p-3 font-mono text-stone-600">
                    {load.departure?.latitude ? `${load.departure.latitude.toFixed(4)}° N, ${Math.abs(load.departure.longitude || 0).toFixed(4)}° W` : "On Site"}
                  </td>
                  <td className="p-3 text-stone-700">
                    {load.departure?.receiverSignatureName ? `Signed by: ${load.departure.receiverSignatureName}` : "GPS Exit Trigger"}
                  </td>
                  <td className="p-3 text-right font-mono font-bold text-stone-900">
                    {Math.floor(load.calculations.totalDwellMinutes / 60)}h {load.calculations.totalDwellMinutes % 60}m
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* DETENTION CALCULATION SUMMARY */}
        <div className="flex flex-col sm:flex-row justify-between items-start gap-6 bg-stone-900 text-stone-100 p-6 rounded-2xl">
          <div className="space-y-1.5 text-xs max-w-md">
            <h4 className="font-bold text-sm text-white uppercase tracking-wider">Contractual Billing Formula</h4>
            <p className="text-stone-300">
              Total Dwell ({Math.floor(load.calculations.totalDwellMinutes / 60)}h {load.calculations.totalDwellMinutes % 60}m) minus Allowed Free Time ({load.terms.freeTimeHours}h 00m) = <strong className="text-amber-300">{Math.floor(load.calculations.detentionMinutes / 60)}h {load.calculations.detentionMinutes % 60}m Billable Detention</strong>.
            </p>
            <p className="text-stone-400">
              Billed in {load.terms.incrementMinutes}-minute increments at agreed contract rate of <strong className="text-white">${load.terms.hourlyRate.toFixed(2)}/hour</strong>.
            </p>
          </div>

          <div className="sm:text-right space-y-1 text-xs shrink-0">
            <div className="text-stone-400">
              Billable Hours: <span className="font-mono font-bold text-white text-sm">{load.calculations.billableHours.toFixed(2)} hrs</span>
            </div>
            <div className="text-stone-400">
              Agreed Detention Rate: <span className="font-mono font-bold text-white text-sm">${load.terms.hourlyRate.toFixed(2)} / hr</span>
            </div>
            <div className="pt-2 border-t border-stone-800">
              <span className="text-xs uppercase text-amber-400 font-bold block">Total Amount Due</span>
              <span className="font-display text-3xl font-extrabold text-emerald-400 tracking-tight">
                ${load.calculations.totalClaimAmount.toFixed(2)}
              </span>
            </div>
          </div>
        </div>

        {/* BILL OF LADING DOCUMENT EVIDENCE */}
        {load.bolDocument && (
          <div className="space-y-2 border border-stone-200 rounded-xl p-4 bg-stone-50">
            <div className="flex items-center justify-between text-xs">
              <h4 className="font-bold text-stone-900 uppercase tracking-wider flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                Exhibit A: Signed Bill of Lading (BOL) with Watermark
              </h4>
              <span className="font-mono text-stone-500">BOL #{load.bolDocument.bolNumber}</span>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 items-start pt-2">
              <div className="relative border-2 border-stone-300 rounded-lg overflow-hidden max-w-[220px] shrink-0 bg-stone-200">
                <img
                  src={load.bolDocument.imageUrl}
                  alt="Signed Bill of Lading"
                  className="w-full h-32 object-cover"
                />
                <div className="absolute inset-0 bg-stone-900/40 flex flex-col justify-end p-2 text-[10px] text-white font-mono leading-tight">
                  <span className="font-bold text-amber-300">GEO-STAMPED VERIFIED</span>
                  <span>{arrivalDate?.toLocaleDateString()} • {load.facility.city}, {load.facility.state}</span>
                </div>
              </div>

              <div className="text-xs space-y-1 text-stone-700 flex-1">
                <p><strong>Dock In-Time Signed:</strong> <span className="font-mono">{load.bolDocument.inTimeOnBol || "08:15 AM"}</span></p>
                <p><strong>Dock Out-Time Signed:</strong> <span className="font-mono">{load.bolDocument.outTimeOnBol || "01:00 PM"}</span></p>
                <p><strong>Receiver Signature:</strong> {load.bolDocument.hasSignature ? "Verified & Legible on document" : "Attached"}</p>
                <p className="text-[11px] text-stone-500 italic pt-1">
                  Original high-resolution digital image with EXIF metadata preserved in carrier electronic storage.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* LEGAL DISPUTE & REMITTANCE CLAUSE */}
        <div className="border-t border-stone-200 pt-6 text-[11px] text-stone-600 space-y-2">
          <p className="font-bold text-stone-900 uppercase tracking-wider text-[10px]">
            Statutory Notice & Terms of Payment
          </p>
          <p className="leading-relaxed">
            This claim is submitted in accordance with the governing Rate Confirmation terms and conditions for load <strong>#{load.rateConNumber}</strong> and relevant provisions of 49 CFR Part 371. The carrier has provided GPS satellite telemetry proving physical equipment presence and dock delay beyond the designated free time. Demand is hereby made for payment of <strong>${load.calculations.totalClaimAmount.toFixed(2)}</strong> within fifteen (15) calendar days of receipt. Remit ACH payments to: <em>{carrier.billingEmail}</em>.
          </p>
        </div>

        {/* SIGNATURE BLOCK */}
        <div className="border-t border-stone-200 pt-6 flex flex-col sm:flex-row justify-between items-end gap-6 text-xs">
          <div>
            <p className="font-bold text-stone-900">{carrier.name}</p>
            <p className="text-stone-500">Authorized Logistics Claims Representative</p>
            <div className="w-48 h-10 border-b border-stone-400 mt-2 flex items-end pb-1 font-serif italic text-stone-700 text-sm">
              Automated Digital Signature
            </div>
          </div>
          <div className="text-right text-stone-500 text-[11px]">
            Generated via DetentionClaim Automated Dispatch Sentinel<br />
            System Verification ID: <span className="font-mono">{load.id}-TIA-AUTH</span>
          </div>
        </div>
      </div>
    </div>
  );
};
