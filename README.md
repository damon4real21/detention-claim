# DetentionClaim 🚚⏱️

> Automated Freight Trucking Dwell-Time Tracker & Broker Detention Claim Collector

DetentionClaim helps motor carriers, dispatchers, and owner-operators recover unpaid detention fees from freight brokers. It captures tamper-proof satellite GPS timestamps upon dock arrival, counts down contractual free time, sends automated 15-minute advance broker notifications, and compiles audit-ready legal claim packets with geo-watermarked signed Bills of Lading (BOLs).

### Key Features
- **Dispatch Command Console**: Live fleet dwell tickers, billable detention calculations ($75+/hr in 15-min increments), and broker load status tracking.
- **Driver Mobile Gate Terminal**: 1-tap GPS check-in/check-out, live free-time countdown, and integrated camera scanner for receiver-stamped BOLs.
- **Automated Broker Advance Notices**: 1-click dispatch of the required 15-minute advance warning before free time expires.
- **Audit-Ready Claim Packets**: Generates formal, print-ready PDF invoices compliant with TIA/OOIDA standards, including GPS audit trails and statutory remittance terms.
- **Facility Delay Index**: Historical dwell times and detention likelihood ratings for major national distribution centers.
- **Carrier Profile Management**: Customization of carrier USDOT/MC numbers, billing emails, remit addresses, and contract terms.

### Tech Stack
- React 18 + TypeScript + Vite
- Tailwind CSS
- Browser Geolocation & MediaDevices APIs
