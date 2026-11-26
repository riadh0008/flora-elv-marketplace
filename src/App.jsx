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
  const [role, setRole] = useState('client');
  const [activeTab, setActiveTab] = useState('home');
  const [activeSupplierId, setActiveSupplierId] = useState('sup-1');

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

  const [selectedRfqId, setSelectedRfqId] = useState(null);
  const [previewAttachment, setPreviewAttachment] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

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
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 bg-slate-900 text-white px-5 py-3.5 rounded-xl shadow-2xl border border-slate-700 flex items-center gap-3 animate-bounce">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span className="text-sm font-medium">{toastMessage}</span>
        </div>
      )}

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

      <header className="bg-white border-b border-slate-200 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-18 py-3.5 flex items-center justify-between gap-4">
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

      <main className="flex-1">
        {activeTab === 'home' && (
          <div>
            <section className="bg-gradient-to-b from-emerald-50/80 via-white to-slate-50 border-b border-slate-200/80 pt-12 pb-16 px-4 sm:px-6">
              <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-10 items-center">
                <div className="lg:col-span-7 space-y-6">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-emerald-200 shadow-xs text-xs font-semibold text-emerald-800">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    Certified ELV & MOI-Approved Contractors Network
                  </div>

                  <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.15]">
                    One Request. Multiple Quotes from{' '}
                    <span className="text-emerald-600">Certified ELV Suppliers.</span>
                  </h1>

                  <p className="text-base sm:text-lg text-slate-600 max-w-2xl leading-relaxed">
                    Select your security or ELV service, upload site photos or CAD drawings, and broadcast your RFQ to pre-vetted contractors. Compare competing offers side-by-side and award the best fit.
                  </p>

                  <div className="bg-white p-2.5 rounded-2xl shadow-lg shadow-slate-200/70 border border-slate-200 flex flex-col sm:flex-row gap-2.5 max-w-2xl">
                    <div className="flex-1 flex items-center gap-2.5 px-3 py-2 bg-slate-50 rounded-xl border border-slate-200/80">
                      <SlidersHorizontal className="w-4 h-4 text-emerald-600 shrink-0" />
                      <select
                        value={rfqForm.serviceId}
                        onChange={(e) =>
                          setRfqForm((prev) => ({ ...prev, serviceId: e.target.value }))
                        }
                        className="w-full bg-transparent text-sm font-semibold text-slate-800 focus:outline-none"
                      >
                        {SERVICES.map((srv) => (
                          <option key={srv.id} value={srv.id}>
                            {srv.title}
                          </option>
                        ))}
                      </select>
                    </div>
                    <button
                      onClick={() => handleStartRfqWithService(rfqForm.serviceId)}
                      className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm px-6 py-3.5 rounded-xl flex items-center justify-center gap-2 transition shrink-0 shadow-md shadow-emerald-600/20"
                    >
                      <span>Send RFQ to Suppliers</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="pt-2 grid grid-cols-3 gap-4 max-w-lg">
                    <div>
                      <div className="text-2xl font-extrabold text-slate-900">100%</div>
                      <div className="text-xs text-slate-500">Vetted ELV Vendors</div>
                    </div>
                    <div>
                      <div className="text-2xl font-extrabold text-slate-900">CAD & Photos</div>
                      <div className="text-xs text-slate-500">Direct Blueprint Upload</div>
                    </div>
                    <div>
                      <div className="text-2xl font-extrabold text-slate-900">3+ Bids</div>
                      <div className="text-xs text-slate-500">Avg. Offers per RFQ</div>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-5">
                  <div className="bg-white rounded-2xl border border-slate-200 shadow-xl p-6 space-y-5">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                      <div>
                        <span className="text-xs font-bold uppercase tracking-wider text-emerald-600">
                          Live Bidding Activity
                        </span>
                        <h3 className="text-base font-bold text-slate-900">
                          Recent Commercial RFQs
                        </h3>
                      </div>
                      <button
                        onClick={() => setActiveTab('my-rfqs')}
                        className="text-xs font-semibold text-emerald-600 hover:underline flex items-center gap-1"
                      >
                        View All <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="space-y-3">
                      {rfqs.slice(0, 2).map((rfq) => {
                        const srv = getServiceMeta(rfq.serviceId);
                        const Icon = srv.icon;
                        return (
                          <div
                            key={rfq.id}
                            onClick={() => {
                              setSelectedRfqId(rfq.id);
                              setActiveTab(role === 'client' ? 'my-rfqs' : 'supplier-board');
                            }}
                            className="p-4 rounded-xl border border-slate-200/90 hover:border-emerald-400 bg-slate-50/70 hover:bg-emerald-50/30 transition cursor-pointer group"
                          >
                            <div className="flex items-start justify-between gap-3">
                              <div className="flex items-center gap-2.5">
                                <div className="w-9 h-9 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-emerald-600 shrink-0">
                                  <Icon className="w-5 h-5" />
                                </div>
                                <div>
                                  <span className="text-[11px] font-bold text-slate-400">
                                    {rfq.id} • {rfq.location}
                                  </span>
                                  <h4 className="text-sm font-bold text-slate-900 group-hover:text-emerald-700 line-clamp-1">
                                    {rfq.title}
                                  </h4>
                                </div>
                              </div>
                            </div>
                            <div className="mt-3 pt-2.5 border-t border-slate-200/60 flex items-center justify-between text-xs">
                              <span className="text-slate-500 flex items-center gap-1">
                                <FileText className="w-3.5 h-3.5 text-slate-400" />
                                {rfq.attachments.length} Drawing/Photo
                              </span>
                              <span className="font-bold text-emerald-700 bg-emerald-100/80 px-2.5 py-0.5 rounded-full">
                                {rfq.bids.length} Supplier Offer{rfq.bids.length !== 1 ? 's' : ''}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    <div className="bg-slate-900 text-white rounded-xl p-4 flex items-center justify-between gap-3">
                      <div>
                        <p className="text-xs text-slate-300">Are you an ELV Contractor?</p>
                        <p className="text-sm font-bold">Bid on open tenders today</p>
                      </div>
                      <button
                        onClick={() => {
                          setRole('supplier');
                          setActiveTab('supplier-board');
                        }}
                        className="px-3.5 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-xs font-semibold transition shrink-0"
                      >
                        Supplier Portal
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-600">
                    Specialized ELV & Security Categories
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
                    Choose a Service to Broadcast Your RFQ
                  </h2>
                </div>
                <p className="text-sm text-slate-500 max-w-md">
                  Every request is automatically distributed to all verified suppliers specializing in your selected system.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {SERVICES.map((service) => {
                  const Icon = service.icon;
                  return (
                    <div
                      key={service.id}
                      className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-7 hover:shadow-xl hover:border-emerald-300 transition flex flex-col justify-between group"
                    >
                      <div>
                        <div className="flex items-start justify-between gap-4 mb-4">
                          <div className="w-14 h-14 rounded-2xl bg-emerald-50 border border-emerald-100 text-emerald-600 flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition">
                            <Icon className="w-7 h-7" />
                          </div>
                          <span className="text-xs font-semibold px-3 py-1 rounded-full bg-slate-100 text-slate-700">
                            {service.badge}
                          </span>
                        </div>

                        <h3 className="text-xl font-bold text-slate-900 mb-2">
                          {service.title}
                        </h3>
                        <p className="text-sm text-slate-600 leading-relaxed mb-5">
                          {service.description}
                        </p>

                        <div className="flex flex-wrap gap-2 mb-6">
                          {service.popularTags.map((tag) => (
                            <span
                              key={tag}
                              className="text-xs font-medium px-2.5 py-1 rounded-lg bg-slate-50 border border-slate-200/80 text-slate-600"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                        <span className="text-xs text-slate-500">
                          Supports CAD Drawings & Site Photos
                        </span>
                        <button
                          onClick={() => handleStartRfqWithService(service.id)}
                          className="inline-flex items-center gap-1.5 text-sm font-bold text-emerald-600 hover:text-emerald-700"
                        >
                          Request Quotes
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>

            <section className="bg-white border-t border-slate-200 py-16 px-4 sm:px-6">
              <div className="max-w-7xl mx-auto">
                <div className="text-center max-w-2xl mx-auto mb-12">
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                    How Flora.elv Works
                  </h2>
                  <p className="text-sm text-slate-600 mt-2">
                    Streamlined B2B procurement from site survey drawings to final contractor award.
                  </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                  <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80">
                    <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white font-extrabold flex items-center justify-center mb-4">
                      1
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 mb-2">
                      Select Service & Upload Drawings
                    </h3>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      Choose CCTV, Scanners, Access Control, or Parking Systems. Attach floor plans, CAD layouts, or site photos and send to all suppliers in one click.
                    </p>
                  </div>

                  <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80">
                    <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white font-extrabold flex items-center justify-center mb-4">
                      2
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 mb-2">
                      Receive Competing Supplier Bids
                    </h3>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      Verified ELV contractors review your technical drawings and submit itemized offers with pricing, equipment brands, delivery timeline, and warranty terms.
                    </p>
                  </div>

                  <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80">
                    <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white font-extrabold flex items-center justify-center mb-4">
                      3
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 mb-2">
                      Compare Offers & Choose Winner
                    </h3>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      Evaluate multiple quotes side-by-side based on price, MOI certification, and AMC coverage, then award the contract directly on the platform.
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}

        {activeTab === 'create-rfq' && (
          <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
            <button
              onClick={() => setActiveTab('home')}
              className="text-sm font-semibold text-slate-500 hover:text-slate-900 mb-4 inline-flex items-center gap-1"
            >
              ← Back to Services
            </button>

            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="bg-slate-900 text-white px-6 sm:px-8 py-6">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                  Client RFQ Broadcast
                </span>
                <h1 className="text-2xl font-extrabold mt-1">
                  Request Quotations from All Certified Suppliers
                </h1>
                <p className="text-sm text-slate-300 mt-1">
                  Fill in your project scope and attach site photos or CAD drawings for accurate pricing.
                </p>
              </div>

              <form onSubmit={handleCreateRfqSubmit} className="p-6 sm:p-8 space-y-6">
                <div>
                  <label className="block text-sm font-bold text-slate-800 mb-2.5">
                    1. Select ELV / Security Service Category *
                  </label>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {SERVICES.map((srv) => {
                      const Icon = srv.icon;
                      const isSelected = rfqForm.serviceId === srv.id;
                      return (
                        <button
                          type="button"
                          key={srv.id}
                          onClick={() =>
                            setRfqForm((prev) => ({ ...prev, serviceId: srv.id }))
                          }
                          className={`p-3.5 rounded-xl border text-left flex items-center gap-3 transition ${
                            isSelected
                              ? 'border-emerald-600 bg-emerald-50/70 ring-2 ring-emerald-600/20'
                              : 'border-slate-200 hover:border-slate-300 bg-white'
                          }`}
                        >
                          <div
                            className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${
                              isSelected
                                ? 'bg-emerald-600 text-white'
                                : 'bg-slate-100 text-slate-600'
                            }`}
                          >
                            <Icon className="w-5 h-5" />
                          </div>
                          <div>
                            <div className="text-sm font-bold text-slate-900">
                              {srv.shortTitle}
                            </div>
                            <div className="text-[11px] text-slate-500 line-clamp-1">
                              {srv.title}
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-bold text-slate-800 mb-1.5">
                      2. Project / RFQ Title *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g., Installation of 24 IP Cameras & Access Control for Warehouse"
                      value={rfqForm.title}
                      onChange={(e) =>
                        setRfqForm((prev) => ({ ...prev, title: e.target.value }))
                      }
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-emerald-600"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-slate-800 mb-1.5">
                      Company / Organization Name
                    </label>
                    <input
                      type="text"
                      value={rfqForm.clientName}
                      onChange={(e) =>
                        setRfqForm((prev) => ({ ...prev, clientName: e.target.value }))
                      }
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-emerald-600"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-slate-800 mb-1.5">
                      Project Location
                    </label>
                    <input
                      type="text"
                      placeholder="e.g., West Bay, Lusail, Industrial Area"
                      value={rfqForm.location}
                      onChange={(e) =>
                        setRfqForm((prev) => ({ ...prev, location: e.target.value }))
                      }
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-emerald-600"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-slate-800 mb-1.5">
                      Estimated Budget Range (QAR)
                    </label>
                    <select
                      value={rfqForm.budgetRange}
                      onChange={(e) =>
                        setRfqForm((prev) => ({ ...prev, budgetRange: e.target.value }))
                      }
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm bg-white focus:outline-none focus:border-emerald-600"
                    >
                      <option>Under 15,000 QAR (Maintenance / Small Setup)</option>
                      <option>15,000 – 25,000 QAR</option>
                      <option>25,000 – 40,000 QAR</option>
                      <option>40,000 – 75,000 QAR</option>
                      <option>75,000+ QAR (Enterprise Turnkey)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-slate-800 mb-1.5">
                      Target Execution Timeline
                    </label>
                    <select
                      value={rfqForm.urgency}
                      onChange={(e) =>
                        setRfqForm((prev) => ({ ...prev, urgency: e.target.value }))
                      }
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm bg-white focus:outline-none focus:border-emerald-600"
                    >
                      <option>Urgent (Within 7 Days)</option>
                      <option>Within 2 Weeks</option>
                      <option>Within 1 Month</option>
                      <option>Annual Maintenance Contract (AMC)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-800 mb-1.5">
                    3. Technical Scope & Requirements *
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Specify quantities (e.g., number of cameras, doors, barriers, X-ray machines), cabling distance, MOI requirements, or maintenance schedule..."
                    value={rfqForm.description}
                    onChange={(e) =>
                      setRfqForm((prev) => ({ ...prev, description: e.target.value }))
                    }
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-emerald-600"
                  />
                </div>

                <div className="bg-slate-50 p-5 rounded-2xl border border-dashed border-slate-300">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                    <div>
                      <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                        <Upload className="w-4 h-4 text-emerald-600" />
                        4. Upload Site Photos & Engineering Drawings (CAD / PDF / Images)
                      </h4>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Suppliers inspect these drawings to calculate accurate BOQ quantities and cable runs.
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => handleAttachSampleDrawing(1)}
                        className="text-xs font-semibold px-2.5 py-1.5 rounded-lg bg-white border border-slate-200 hover:border-emerald-400 text-slate-700 transition"
                      >
                        + Sample CCTV CAD
                      </button>
                      <button
                        type="button"
                        onClick={() => handleAttachSampleDrawing(2)}
                        className="text-xs font-semibold px-2.5 py-1.5 rounded-lg bg-white border border-slate-200 hover:border-emerald-400 text-slate-700 transition"
                      >
                        + Sample Gate Plan
                      </button>
                    </div>
                  </div>

                  <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    accept="image/*,.pdf,.dwg,.dxf,.svg"
                    onChange={handleFileUpload}
                    className="hidden"
                  />

                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full py-6 rounded-xl bg-white border border-slate-200 hover:border-emerald-500 hover:bg-emerald-50/30 transition flex flex-col items-center justify-center gap-1.5 text-center"
                  >
                    <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center">
                      <ImageIcon className="w-5 h-5" />
                    </div>
                    <span className="text-sm font-bold text-slate-800">
                      Click to upload site photos or floor plan drawings
                    </span>
                    <span className="text-xs text-slate-400">
                      Supports PNG, JPG, SVG, PDF, or CAD exports
                    </span>
                  </button>

                  {rfqForm.attachments.length > 0 && (
                    <div className="mt-4 grid sm:grid-cols-2 gap-3">
                      {rfqForm.attachments.map((file, idx) => (
                        <div
                          key={idx}
                          className="flex items-center justify-between gap-3 bg-white p-2.5 rounded-xl border border-slate-200"
                        >
                          <div className="flex items-center gap-2.5 min-w-0">
                            {file.url && file.url.startsWith('data:image') ? (
                              <img
                                src={file.url}
                                alt={file.name}
                                className="w-10 h-10 rounded-lg object-cover border border-slate-200 shrink-0"
                              />
                            ) : (
                              <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                                <FileText className="w-5 h-5" />
                              </div>
                            )}
                            <div className="min-w-0">
                              <p className="text-xs font-bold text-slate-800 truncate">
                                {file.name}
                              </p>
                              <p className="text-[11px] text-slate-400 uppercase">
                                {file.type} • {file.size}
                              </p>
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={() => handleRemoveAttachment(idx)}
                            className="p-1 text-slate-400 hover:text-red-500"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-100">
                  <p className="text-xs text-slate-500">
                    Your RFQ will be broadcast immediately to{' '}
                    <strong className="text-slate-800">
                      {INITIAL_SUPPLIERS.length} verified ELV service providers
                    </strong>
                    .
                  </p>
                  <button
                    type="submit"
                    className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm px-8 py-3.5 rounded-xl shadow-lg shadow-emerald-600/20 flex items-center justify-center gap-2 transition"
                  >
                    <Send className="w-4 h-4" />
                    Broadcast RFQ to All Suppliers
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {activeTab === 'my-rfqs' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-600">
                  Client Procurement Dashboard
                </span>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                  My Sent RFQs & Received Supplier Offers
                </h1>
              </div>
              <button
                onClick={() => setActiveTab('create-rfq')}
                className="bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold px-4 py-2.5 rounded-xl flex items-center gap-2 shadow-sm"
              >
                <Plus className="w-4 h-4" /> New RFQ
              </button>
            </div>

            <div className="grid lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-4 space-y-3">
                {rfqs.map((rfq) => {
                  const srv = getServiceMeta(rfq.serviceId);
                  const isSelected = selectedRfq?.id === rfq.id;
                  return (
                    <div
                      key={rfq.id}
                      onClick={() => setSelectedRfqId(rfq.id)}
                      className={`p-4 rounded-2xl border cursor-pointer transition ${
                        isSelected
                          ? 'bg-white border-emerald-600 ring-2 ring-emerald-600/15 shadow-md'
                          : 'bg-white border-slate-200 hover:border-emerald-300'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2 mb-1.5">
                        <span className="text-xs font-bold text-slate-400">{rfq.id}</span>
                        {rfq.status === 'awarded' ? (
                          <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 flex items-center gap-1">
                            <Award className="w-3 h-3" /> Awarded
                          </span>
                        ) : (
                          <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800">
                            Receiving Bids
                          </span>
                        )}
                      </div>

                      <h3 className="text-sm font-bold text-slate-900 line-clamp-2 mb-2">
                        {rfq.title}
                      </h3>

                      <div className="text-xs text-slate-500 flex items-center gap-1.5 mb-3">
                        <span className="font-semibold text-emerald-700">{srv.shortTitle}</span>
                        <span>•</span>
                        <span>{rfq.createdAt}</span>
                      </div>

                      <div className="pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs">
                        <span className="text-slate-500">
                          {rfq.attachments.length} file(s)
                        </span>
                        <span className="font-extrabold text-slate-900">
                          {rfq.bids.length} Offer{rfq.bids.length !== 1 ? 's' : ''} Received
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="lg:col-span-8">
                {!selectedRfq ? (
                  <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
                    <Search className="w-10 h-10 text-slate-300 mx-auto mb-3" />
                    <h3 className="text-base font-bold text-slate-800">
                      Select an RFQ from the left to compare supplier quotes
                    </h3>
                    <p className="text-sm text-slate-500 mt-1">
                      You can review technical proposals, inspect uploaded drawings, and award the winning bidder.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="bg-white rounded-2xl border border-slate-200 p-6">
                      <div className="flex flex-wrap items-start justify-between gap-4 pb-4 border-b border-slate-100">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-xs font-bold px-2.5 py-0.5 rounded-md bg-slate-100 text-slate-700">
                              {selectedRfq.id}
                            </span>
                            <span className="text-xs font-semibold text-emerald-700">
                              {getServiceMeta(selectedRfq.serviceId).title}
                            </span>
                          </div>
                          <h2 className="text-xl font-extrabold text-slate-900">
                            {selectedRfq.title}
                          </h2>
                        </div>

                        <div className="text-right">
                          <div className="text-xs text-slate-400">Target Budget</div>
                          <div className="text-sm font-bold text-slate-900">
                            {selectedRfq.budgetRange}
                          </div>
                        </div>
                      </div>

                      <p className="text-sm text-slate-600 leading-relaxed mt-4">
                        {selectedRfq.description}
                      </p>

                      <div className="flex flex-wrap gap-4 mt-4 text-xs text-slate-500">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-slate-400" />
                          {selectedRfq.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-slate-400" />
                          {selectedRfq.urgency}
                        </span>
                      </div>

                      {selectedRfq.attachments.length > 0 && (
                        <div className="mt-5 pt-4 border-t border-slate-100">
                          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2.5">
                            Attached Site Drawings & Photos ({selectedRfq.attachments.length})
                          </h4>
                          <div className="flex flex-wrap gap-3">
                            {selectedRfq.attachments.map((att, i) => (
                              <button
                                key={i}
                                onClick={() => setPreviewAttachment(att)}
                                className="flex items-center gap-2.5 px-3 py-2 rounded-xl border border-slate-200 hover:border-emerald-500 bg-slate-50 text-left transition group"
                              >
                                <Eye className="w-4 h-4 text-emerald-600" />
                                <div>
                                  <div className="text-xs font-bold text-slate-800 group-hover:text-emerald-700">
                                    {att.name}
                                  </div>
                                  <div className="text-[10px] text-slate-400">
                                    Click to inspect drawing
                                  </div>
                                </div>
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-extrabold text-slate-900">
                          Supplier Offers Received ({selectedRfq.bids.length})
                        </h3>
                        {selectedRfq.bids.length === 0 && (
                          <button
                            onClick={() => {
                              setRole('supplier');
                              setActiveTab('supplier-board');
                            }}
                            className="text-xs font-bold text-blue-600 hover:underline"
                          >
                            Switch to Supplier Portal to simulate a bid →
                          </button>
                        )}
                      </div>

                      {selectedRfq.bids.length === 0 ? (
                        <div className="bg-white rounded-2xl border border-dashed border-slate-300 p-8 text-center">
                          <Clock className="w-8 h-8 text-amber-500 mx-auto mb-2" />
                          <h4 className="text-sm font-bold text-slate-800">
                            Broadcasted to all suppliers — awaiting quotations
                          </h4>
                          <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto">
                            Use the top switcher to toggle into the <strong>Supplier Portal</strong> and submit offers from multiple ELV vendors to see them compared here.
                          </p>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          {selectedRfq.bids
                            .slice()
                            .sort((a, b) => a.price - b.price)
                            .map((bid, index) => {
                              const isWinner = selectedRfq.awardedBidId === bid.id;
                              return (
                                <div
                                  key={bid.id}
                                  className={`bg-white rounded-2xl border p-6 transition ${
                                    isWinner
                                      ? 'border-emerald-600 ring-2 ring-emerald-600/20 bg-emerald-50/20'
                                      : 'border-slate-200'
                                  }`}
                                >
                                  <div className="flex flex-wrap items-start justify-between gap-4 pb-4 border-b border-slate-100">
                                    <div>
                                      <div className="flex flex-wrap items-center gap-2">
                                        <h4 className="text-base font-extrabold text-slate-900">
                                          {bid.supplierName}
                                        </h4>
                                        <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                                          {bid.supplierBadge}
                                        </span>
                                        {index === 0 && selectedRfq.bids.length > 1 && (
                                          <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                                            Lowest Price
                                          </span>
                                        )}
                                      </div>
                                      <p className="text-xs text-slate-500 mt-1">
                                        Submitted {bid.submittedAt} • Vendor Rating: ★ {bid.rating}/5.0
                                      </p>
                                    </div>

                                    <div className="text-right">
                                      <div className="text-2xl font-extrabold text-slate-900">
                                        {bid.price.toLocaleString()}{' '}
                                        <span className="text-xs font-bold text-slate-500">
                                          QAR
                                        </span>
                                      </div>
                                      <div className="text-xs font-semibold text-emerald-700">
                                        Delivery: {bid.timeline}
                                      </div>
                                    </div>
                                  </div>

                                  <div className="grid sm:grid-cols-2 gap-4 py-4 text-xs">
                                    <div className="bg-slate-50 p-3 rounded-xl">
                                      <span
