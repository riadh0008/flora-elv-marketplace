import React, { useState, useEffect, useRef } from 'react';
import {
  Camera,
  ShieldAlert,
  KeyRound,
  CarFront,
  Upload,
  FileText,
  Image as ImageIcon,
  CheckCircle2,
  Clock,
  MapPin,
  Building2,
  Award,
  ArrowRight,
  Plus,
  X,
  Eye,
  Send,
  UserCheck,
  Briefcase,
  Search,
  ChevronRight,
  Sparkles,
  Phone,
  Mail,
  ShieldCheck,
  SlidersHorizontal
} from 'lucide-react';

// --- Service Definitions ---
const SERVICES = [
  {
    id: 'cctv',
    title: 'CCTV Installation & Maintenance',
    shortTitle: 'CCTV Systems',
    description: 'IP surveillance cameras, NVR/VMS setup, MOI compliance upgrades, and preventative AMC maintenance.',
    icon: Camera,
    badge: 'MOI Approved Specs',
    popularTags: ['4K IP Cameras', 'NVR Storage', 'Annual Maintenance', 'Remote Viewing']
  },
  {
    id: 'scanners',
    title: 'Scanners & Walk-Through Installation & Maintenance',
    shortTitle: 'Scanners & Walk-Through',
    description: 'X-ray baggage inspection scanners, walk-through metal detectors, under-vehicle surveillance, and turnstiles.',
    icon: ShieldAlert,
    badge: 'High Security',
    popularTags: ['X-Ray Baggage', 'Walk-Through Gate', 'Handheld Wands', 'Calibration & AMC']
  },
  {
    id: 'access',
    title: 'Access Control Installation & Maintenance',
    shortTitle: 'Access Control',
    description: 'Biometric facial/fingerprint readers, RFID smart card doors, magnetic locks, and visitor management.',
    icon: KeyRound,
    badge: 'Enterprise ELV',
    popularTags: ['Biometric Readers', 'RFID Doors', 'Time Attendance', 'Mag-Locks & Controllers']
  },
  {
    id: 'parking',
    title: 'Parking System Installation & Maintenance',
    shortTitle: 'Parking Systems',
    description: 'ANPR license plate recognition, automated boom barriers, RFID long-range tags, and parking guidance.',
    icon: CarFront,
    badge: 'Smart Mobility',
    popularTags: ['ANPR Cameras', 'Boom Barriers', 'UHF Long-Range', 'Ticketing Kiosks']
  }
];

// --- Sample Blueprint SVG Data URIs for Instant Demo ---
const SAMPLE_DRAWING_1 =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" width="800" height="500" viewBox="0 0 800 500">
  <rect width="800" height="500" fill="#0f172a"/>
  <g stroke="#1e293b" stroke-width="1">
    <path d="M0 50 H800 M0 100 H800 M0 150 H800 M0 200 H800 M0 250 H800 M0 300 H800 M0 350 H800 M0 400 H800 M0 450 H800"/>
    <path d="M50 0 V500 M100 0 V500 M150 0 V500 M200 0 V500 M250 0 V500 M300 0 V500 M350 0 V500 M400 0 V500 M450 0 V500 M500 0 V500 M550 0 V500 M600 0 V500 M650 0 V500 M700 0 V500 M750 0 V500"/>
  </g>
  <rect x="60" y="60" width="680" height="360" fill="none" stroke="#38bdf8" stroke-width="3"/>
  <rect x="60" y="60" width="220" height="160" fill="none" stroke="#38bdf8" stroke-width="2"/>
  <rect x="520" y="60" width="220" height="160" fill="none" stroke="#38bdf8" stroke-width="2"/>
  <rect x="280" y="290" width="240" height="130" fill="none" stroke="#38bdf8" stroke-width="2"/>
  <circle cx="80" cy="80" r="10" fill="#ef4444"/>
  <text x="98" y="85" fill="#f8fafc" font-family="monospace" font-size="13">CAM-01 (4K DOME)</text>
  <circle cx="720" cy="80" r="10" fill="#ef4444"/>
  <text x="560" y="85" fill="#f8fafc" font-family="monospace" font-size="13">CAM-02 (4K DOME)</text>
  <circle cx="400" cy="310" r="10" fill="#10b981"/>
  <text x="330" y="340" fill="#10b981" font-family="monospace" font-size="13">MAIN LOBBY ACCESS + X-RAY</text>
  <text x="60" y="455" fill="#94a3b8" font-family="monospace" font-size="14">FLORA.ELV CAD LAYOUT — GROUND FLOOR SECURITY &amp; CCTV PLAN (REV 2.1)</text>
</svg>`);

const SAMPLE_DRAWING_2 =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" width="800" height="500" viewBox="0 0 800 500">
  <rect width="800" height="500" fill="#111827"/>
  <rect x="40" y="40" width="720" height="420" fill="none" stroke="#60a5fa" stroke-width="2" stroke-dasharray="8 4"/>
  <rect x="120" y="180" width="560" height="120" fill="#1f2937" stroke="#93c5fd" stroke-width="2"/>
  <line x1="260" y1="150" x2="260" y2="330" stroke="#f59e0b" stroke-width="6"/>
  <line x1="540" y1="150" x2="540" y2="330" stroke="#f59e0b" stroke-width="6"/>
  <circle cx="220" cy="140" r="12" fill="#3b82f6"/>
  <text x="150" y="120" fill="#e5e7eb" font-family="monospace" font-size="13">ENTRY ANPR + BOOM BARRIER</text>
  <circle cx="580" cy="140" r="12" fill="#3b82f6"/>
  <text x="510" y="120" fill="#e5e7eb" font-family="monospace" font-size="13">EXIT ANPR + LOOP SENSOR</text>
  <text x="50" y="485" fill="#9ca3af" font-family="monospace" font-size="14">SITE GATEWAY DIAGRAM — BASEMENT PARKING AUTOMATION</text>
</svg>`);

// --- Initial Seed Data ---
const INITIAL_SUPPLIERS = [
  {
    id: 'sup-1',
    name: 'Flora Technology ELV Systems',
    badge: 'MOI SSD Certified Tier-1',
    rating: 4.9,
    completedProjects: 142,
    location: 'West Bay, Doha'
  },
  {
    id: 'sup-2',
    name: 'Al-Noor Security & Automation WLL',
    badge: 'MOI Approved Contractor',
    rating: 4.7,
    completedProjects: 98,
    location: 'Industrial Area, Doha'
  },
  {
    id: 'sup-3',
    name: 'Gulf Shield Smart Systems',
    badge: 'Certified ELV Partner',
    rating: 4.8,
    completedProjects: 115,
    location: 'Lusail Marina'
  }
];

const INITIAL_RFQS = [
  {
    id: 'RFQ-2026-104',
    serviceId: 'cctv',
    title: '32-Channel 4K IP CCTV Upgrade & MOI Compliance for Commercial Tower',
    clientName: 'Al-Dafna Property Management',
    location: 'Al Dafna, West Bay, Doha',
    budgetRange: '45,000 – 65,000 QAR',
    urgency: 'Within 2 Weeks',
    status: 'open',
    awardedBidId: null,
    createdAt: '2 hours ago',
    description:
      'Supply, installation, and commissioning of 32x 4K Dome/Bullet IP cameras, 64-ch NVR with 90-day retention per MOI SSD guidelines, Cat6A structured cabling, and 1-year comprehensive AMC.',
    attachments: [
      {
        name: 'Ground_Floor_CCTV_Layout.svg',
        type: 'drawing',
        size: '1.4 MB',
        url: SAMPLE_DRAWING_1
      }
    ],
    bids: [
      {
        id: 'BID-901',
        supplierId: 'sup-1',
        supplierName: 'Flora Technology ELV Systems',
        supplierBadge: 'MOI SSD Certified Tier-1',
        rating: 4.9,
        price: 52800,
        timeline: '10 Working Days',
        brands: 'Hikvision / Axis + Belden Cat6A',
        warranty: '24 Months Full Warranty + 1 Yr Free AMC',
        notes:
          'Includes full MOI SSD approval documentation, rack dressing, UPS backup sizing, and on-site operator training.',
        submittedAt: '1 hour ago'
      },
      {
        id: 'BID-902',
        supplierId: 'sup-2',
        supplierName: 'Al-Noor Security & Automation WLL',
        supplierBadge: 'MOI Approved Contractor',
        rating: 4.7,
        price: 49500,
        timeline: '14 Working Days',
        brands: 'Dahua Pro Series + D-Link Cat6',
        warranty: '12 Months Standard Warranty',
        notes:
          'Complete supply and installation during off-peak hours. Civil conduit works included.',
        submittedAt: '35 mins ago'
      }
    ]
  },
  {
    id: 'RFQ-2026-103',
    serviceId: 'parking',
    title: 'Dual-Lane ANPR & High-Speed Boom Barrier System',
    clientName: 'Pearl Logistics Hub',
    location: 'Birkat Al Awamer',
    budgetRange: '30,000 – 45,000 QAR',
    urgency: 'Flexible (1 Month)',
    status: 'open',
    awardedBidId: null,
    createdAt: '1 day ago',
    description:
      'Installation of 2 entry and 2 exit high-speed boom barriers (1.5s opening), ANPR license plate cameras, inductive loop detectors, and central guardhouse software.',
    attachments: [
      {
        name: 'Gate_Barrier_Site_Plan.svg',
        type: 'drawing',
        size: '980 KB',
        url: SAMPLE_DRAWING_2
      }
    ],
    bids: [
      {
        id: 'BID-884',
        supplierId: 'sup-3',
        supplierName: 'Gulf Shield Smart Systems',
        supplierBadge: 'Certified ELV Partner',
        rating: 4.8,
        price: 38900,
        timeline: '12 Working Days',
        brands: 'FAAC Barriers + Hikvision ANPR',
        warranty: '24 Months Parts & Labor',
        notes:
          'Includes concrete civil islands, loop cutting, and integration with your existing visitor database.',
        submittedAt: '18 hours ago'
      }
    ]
  }
];

export default function App() {
  // Navigation & Role State
  const [role, setRole] = useState('client'); // 'client' | 'supplier'
  const [activeTab, setActiveTab] = useState('home'); // 'home' | 'create-rfq' | 'my-rfqs' | 'supplier-board'
  const [activeSupplierId, setActiveSupplierId] = useState('sup-1');

  // Persistent Data State
  const [rfqs, setRfqs] = useState(() => {
    try {
      const saved = localStorage.getItem('flora_elv_rfqs_v1');
      return saved ? JSON.parse(saved) : INITIAL_RFQS;
    } catch {
      return INITIAL_RFQS;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('flora_elv_rfqs_v1', JSON.stringify(rfqs));
    } catch {
      // Ignore storage quota errors
    }
  }, [rfqs]);

  // Modal & Inspection State
  const [selectedRfqId, setSelectedRfqId] = useState(null);
  const [previewAttachment, setPreviewAttachment] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

  // Create RFQ Form State
  const [rfqForm, setRfqForm] = useState({
    serviceId: 'cctv',
    title: '',
    clientName: 'Horizon Commercial Properties',
    location: 'West Bay, Doha',
    budgetRange: '25,000 – 40,000 QAR',
    urgency: 'Within 2 Weeks',
    description: '',
    attachments: []
  });

  // Supplier Bid Form State
  const [bidForm, setBidForm] = useState({
    price: '',
    timeline: '7 Working Days',
    brands: '',
    warranty: '24 Months Warranty + 1 Year AMC',
    notes: ''
  });

  const fileInputRef = useRef(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const currentSupplier =
    INITIAL_SUPPLIERS.find((s) => s.id === activeSupplierId) || INITIAL_SUPPLIERS[0];

  const selectedRfq = rfqs.find((r) => r.id === selectedRfqId) || null;

  // --- Handlers ---
  const handleStartRfqWithService = (serviceId) => {
    setRole('client');
    setRfqForm((prev) => ({ ...prev, serviceId }));
    setActiveTab('create-rfq');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files || []);
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (ev) => {
        const isDrawing =
          file.name.toLowerCase().endsWith('.dwg') ||
          file.name.toLowerCase().endsWith('.dxf') ||
          file.name.toLowerCase().endsWith('.pdf') ||
          file.name.toLowerCase().includes('plan') ||
          file.name.toLowerCase().includes('layout');

        setRfqForm((prev) => ({
          ...prev,
          attachments: [
            ...prev.attachments,
            {
              name: file.name,
              type: isDrawing ? 'drawing' : 'photo',
              size: `${Math.max(1, Math.round(file.size / 1024))} KB`,
              url: ev.target.result
            }
          ]
        }));
      };
      reader.readAsDataURL(file);
    });
    e.target.value = '';
  };

  const handleAttachSampleDrawing = (sampleIndex) => {
    const sample =
      sampleIndex === 1
        ? {
            name: 'Floor_Plan_Security_CAD.svg',
            type: 'drawing',
            size: '1.2 MB',
            url: SAMPLE_DRAWING_1
          }
        : {
            name: 'Site_Entrance_Barrier_Drawing.svg',
            type: 'drawing',
            size: '940 KB',
            url: SAMPLE_DRAWING_2
          };

    setRfqForm((prev) => ({
      ...prev,
      attachments: [...prev.attachments, sample]
    }));
    showToast(`Attached sample CAD drawing: ${sample.name}`);
  };

  const handleRemoveAttachment = (idx) => {
    setRfqForm((prev) => ({
      ...prev,
      attachments: prev.attachments.filter((_, i) => i !== idx)
    }));
  };

  const handleCreateRfqSubmit = (e) => {
    e.preventDefault();
    if (!rfqForm.title.trim() || !rfqForm.description.trim()) return;

    const newRfq = {
      id: `RFQ-2026-${Math.floor(105 + Math.random() * 890)}`,
      serviceId: rfqForm.serviceId,
      title: rfqForm.title.trim(),
      clientName: rfqForm.clientName.trim() || 'Enterprise Client',
      location: rfqForm.location.trim() || 'Doha, Qatar',
      budgetRange: rfqForm.budgetRange,
      urgency: rfqForm.urgency,
      status: 'open',
      awardedBidId: null,
      createdAt: 'Just now',
      description: rfqForm.description.trim(),
      attachments: rfqForm.attachments,
      bids: []
    };

    setRfqs([newRfq, ...rfqs]);
    setRfqForm({
      serviceId: 'cctv',
      title: '',
      clientName: rfqForm.clientName,
      location: rfqForm.location,
      budgetRange: '25,000 – 40,000 QAR',
      urgency: 'Within 2 Weeks',
      description: '',
      attachments: []
    });
    setActiveTab('my-rfqs');
    setSelectedRfqId(newRfq.id);
    showToast(`Broadcasted ${newRfq.id} to all verified ELV service providers!`);
  };

  const handleSupplierBidSubmit = (e) => {
    e.preventDefault();
    if (!selectedRfq || !bidForm.price) return;

    const newBid = {
      id: `BID-${Math.floor(100 + Math.random() * 899)}`,
      supplierId: currentSupplier.id,
      supplierName: currentSupplier.name,
      supplierBadge: currentSupplier.badge,
      rating: currentSupplier.rating,
      price: Number(bidForm.price),
      timeline: bidForm.timeline,
      brands: bidForm.brands || 'Tier-1 MOI Approved Equipment',
      warranty: bidForm.warranty,
      notes:
        bidForm.notes ||
        'Complete supply, installation, testing, and commissioning as per attached drawings.',
      submittedAt: 'Just now'
    };

    setRfqs((prev) =>
      prev.map((rfq) =>
        rfq.id === selectedRfq.id
          ? {
              ...rfq,
              bids: [
                ...rfq.bids.filter((b) => b.supplierId !== currentSupplier.id),
                newBid
              ]
            }
          : rfq
      )
    );

    setBidForm({
      price: '',
      timeline: '7 Working Days',
      brands: '',
      warranty: '24 Months Warranty + 1 Year AMC',
      notes: ''
    });

    showToast(`Quotation submitted by ${currentSupplier.name}!`);
  };

  const handleAwardBid = (rfqId, bidId) => {
    setRfqs((prev) =>
      prev.map((rfq) =>
        rfq.id === rfqId
          ? {
              ...rfq,
              status: 'awarded',
              awardedBidId: bidId
            }
          : rfq
      )
    );
    showToast('Offer accepted! Supplier has been notified to initiate mobilization.');
  };

  const handleResetDemo = () => {
    localStorage.removeItem('flora_elv_rfqs_v1');
    setRfqs(INITIAL_RFQS);
    setSelectedRfqId(null);
    showToast('Demo marketplace reset to initial sample RFQs.');
  };

  const getServiceMeta = (serviceId) =>
    SERVICES.find((s) => s.id === serviceId) || SERVICES[0];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 bg-slate-900 text-white px-5 py-3.5 rounded-xl shadow-2xl border border-slate-700 flex items-center gap-3 animate-bounce">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span className="text-sm font-medium">{toastMessage}</span>
        </div>
      )}

      {/* Top Role Switcher Banner (For Instant Testing of Both Sides) */}
      <div className="bg-slate-900 text-slate-200 border-b border-slate-800 px-4 py-2 text-xs">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-300 font-semibold">
              <Sparkles className="w-3.5 h-3.5" /> Interactive B2B Marketplace Mode
            </span>
            <span className="hidden sm:inline text-slate-400">
              Switch views anytime to post RFQs as a Client or submit bids as a Supplier:
            </span>
          </div>

          <div className="flex items-center gap-2">
            <div className="inline-flex rounded-lg bg-slate-800 p-0.5 border border-slate-700">
              <button
                onClick={() => {
                  setRole('client');
                  if (activeTab === 'supplier-board') setActiveTab('my-rfqs');
                }}
                className={`px-3 py-1 rounded-md font-semibold transition flex items-center gap-1.5 ${
                  role === 'client'
                    ? 'bg-emerald-600 text-white shadow'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                <Building2 className="w-3.5 h-3.5" />
                Client Portal
              </button>
              <button
                onClick={() => {
                  setRole('supplier');
                  setActiveTab('supplier-board');
                }}
                className={`px-3 py-1 rounded-md font-semibold transition flex items-center gap-1.5 ${
                  role === 'supplier'
                    ? 'bg-blue-600 text-white shadow'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                <Briefcase className="w-3.5 h-3.5" />
                Supplier Portal ({rfqs.filter((r) => r.status === 'open').length} Open RFQs)
              </button>
            </div>

            <button
              onClick={handleResetDemo}
              title="Reset sample data"
              className="text-slate-400 hover:text-white underline px-2 py-1"
            >
              Reset Demo
            </button>
          </div>
        </div>
      </div>

      {/* Main Header (Syaanh.com clean aesthetic) */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-18 py-3.5 flex items-center justify-between gap-4">
          {/* Logo */}
          <button
            onClick={() => {
              setActiveTab('home');
              setSelectedRfqId(null);
            }}
            className="flex items-center gap-2.5 text-left group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-600 to-teal-700 flex items-center justify-center text-white shadow-md shadow-emerald-600/20 group-hover:scale-105 transition">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xl font-extrabold tracking-tight text-slate-900">
                  Flora<span className="text-emerald-600">.elv</span>
                </span>
                <span className="text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
                  B2B
                </span>
              </div>
              <p className="text-[11px] text-slate-500 hidden sm:block">
                ELV & Security Systems Bidding Marketplace
              </p>
            </div>
          </button>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
            <button
              onClick={() => {
                setActiveTab('home');
                setSelectedRfqId(null);
              }}
              className={`hover:text-emerald-600 transition ${
                activeTab === 'home' ? 'text-emerald-600 font-semibold' : ''
              }`}
            >
              Services
            </button>
            <button
              onClick={() => {
                setRole('client');
                setActiveTab('my-rfqs');
                setSelectedRfqId(null);
              }}
              className={`hover:text-emerald-600 transition flex items-center gap-1.5 ${
                activeTab === 'my-rfqs' ? 'text-emerald-600 font-semibold' : ''
              }`}
            >
              Client RFQs & Offers
              <span className="px-1.5 py-0.2 text-xs rounded-full bg-slate-100 text-slate-700 font-bold">
                {rfqs.length}
              </span>
            </button>
            <button
              onClick={() => {
                setRole('supplier');
                setActiveTab('supplier-board');
                setSelectedRfqId(null);
              }}
              className={`hover:text-blue-600 transition flex items-center gap-1.5 ${
                activeTab === 'supplier-board' ? 'text-blue-600 font-semibold' : ''
              }`}
            >
              Supplier Bidding Board
              <span className="px-1.5 py-0.2 text-xs rounded-full bg-blue-50 text-blue-700 font-bold">
                {rfqs.filter((r) => r.status === 'open').length}
              </span>
            </button>
          </nav>

          {/* Primary CTA */}
          <div className="flex items-center gap-3">
            {role === 'client' ? (
              <button
                onClick={() => {
                  setActiveTab('create-rfq');
                  setSelectedRfqId(null);
                }}
                className="bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold px-4 py-2.5 rounded-xl shadow-sm shadow-emerald-600/20 flex items-center gap-2 transition"
              >
                <Plus className="w-4 h-4" />
                <span>Request Quotes</span>
              </button>
            ) : (
              <div className="flex items-center gap-2 bg-blue-50 border border-blue-200 px-3 py-1.5 rounded-xl">
                <UserCheck className="w-4 h-4 text-blue-600 shrink-0" />
                <select
                  value={activeSupplierId}
                  onChange={(e) => setActiveSupplierId(e.target.value)}
                  className="bg-transparent text-xs font-semibold text-blue-900 focus:outline-none cursor-pointer"
                >
                  {INITIAL_SUPPLIERS.map((sup) => (
                    <option key={sup.id} value={sup.id}>
                      Acting as: {sup.name}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1">
        {/* ================= VIEW 1: LANDING / SERVICES DIRECTORY (Syaanh.com Style) ================= */}
        {activeTab === 'home' && (
          <div>
            {/* Hero Section */}
            <section className="bg-gradient-to-b from-emerald-50/80 via-white to-slate-50 border-b border-slate-200/80 pt-12 pb-16 px-4 sm:px-6">
              <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-10 items-center">
                <div className="lg:col-span-7 space-y-6">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-emerald-200 shadow-xs text-xs font-semibold text-emerald-800">
                    <ShieldCheck className="w-4 h-4 text-emerald-6
