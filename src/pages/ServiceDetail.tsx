import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { 
  ArrowRight, Check, Send, Sparkles, AlertCircle, CheckCircle, 
  Settings, Server, Cpu, ShieldCheck, Home, Sun, HelpCircle, ArrowLeft,
  ChevronDown, BarChart, Clock, Award
} from "lucide-react";

interface ServiceContent {
  title: string;
  badge: string;
  heroDesc: string;
  longDesc: string;
  icon: string;
  image: string;
  highlights: string[];
  subServices: string[];
  metrics: { value: string; label: string }[];
  accentColor: string;
  faq: { q: string; a: string }[];
}

const SERVICES_DATA: Record<string, ServiceContent> = {
  "digital-transformation": {
    title: "Digital Transformation Solutions",
    badge: "Enterprise Modernization",
    heroDesc: "Modernize your organization with secure, cloud-enabled, and digital-first strategies.",
    longDesc: "At Techno-Solutions, we help businesses transition their legacy infrastructures into responsive, digital-first ecosystems. Our custom-engineered digital strategies build high-efficiency pipelines, ensuring startups, SMEs, and large scale enterprises can grow, adapt, and scale securely without manual setbacks.",
    icon: "Server",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80",
    highlights: [
      "Digital Transformation Consulting",
      "Enterprise Digitization",
      "Cloud Adoption & Secure Migrations",
      "AI System Integrations",
      "Process Bottleneck Optimization",
      "Customer Experience (CX) Transformation",
      "Strategic Digital Roadmaps & Audits"
    ],
    subServices: [
      "Operational Readiness Assessment",
      "AWS/Azure/GCP Infrastructure Provisioning",
      "Corporate Upskilling Strategy Development",
      "SLA & Disaster Recovery Architectural Audits"
    ],
    metrics: [
      { value: "3.2x", label: "Speed to Market Boost" },
      { value: "40%", label: "Operational Cost Reduction" },
      { value: "99.99%", label: "Cloud Ingress SLA uptime" }
    ],
    accentColor: "from-blue-600 to-indigo-700",
    faq: [
      { q: "What is Digital Consulting?", a: "It's an exhaustive strategic assessment of your current technological setup to construct a safe cloud roadmap matching your operational budgets." },
      { q: "How long does a digital transition audit take?", a: "A standard preliminary blueprint is dispatched within 24-48 hours. Comprehensive migration execution is milestone-based." }
    ]
  },
  "business-automation": {
    title: "Business Automation Solutions",
    badge: "Workflow Optimization",
    heroDesc: "Automate repetitive corporate tasks and exponentially increase employee productivity.",
    longDesc: "Free your talented personnel from exhausting manual workflows. Our business automation solutions integrate custom CRM, ERP, and database pipelines with low-code and RPA platforms, reducing operational error rates to absolute zero.",
    icon: "Settings",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80",
    highlights: [
      "Workflow Automation",
      "CRM & Sales Automation",
      "HR & Finance Streamlining",
      "Automated Inventory Management",
      "Intelligent Document Management (IDP)",
      "ERP System Integration",
      "AI-Powered Customer Support Chatbots",
      "Robotic Process Automation (RPA)"
    ],
    subServices: [
      "Custom Microsoft Power Platform Integration",
      "Automated Invoice Approval Pipelines",
      "Zapier & Make Custom Connector Infrastructure",
      "HubSpot & Salesforce Synchronization"
    ],
    metrics: [
      { value: "85%", label: "Manual Overhead Saved" },
      { value: "10x", label: "Invoice Processing Speed" },
      { value: "0%", label: "Filing & Entry Error Rates" }
    ],
    accentColor: "from-purple-600 to-pink-700",
    faq: [
      { q: "Can automation connect with our existing ERP?", a: "Yes. We design and compile custom secure API gateways to connect modern automated flows directly to legacy SAP, Tally, or custom databases." },
      { q: "What is Robotic Process Automation?", a: "RPA uses software bots to mimic human desktop interactions (such as copying data between windows) to handle repetitive work rapidly." }
    ]
  },
  "ai-solutions": {
    title: "Artificial Intelligence Solutions",
    badge: "Cognitive Intelligence",
    heroDesc: "Unlock the next layer of business intelligence with Generative and Agentic AI models.",
    longDesc: "Integrate cognitive decision-making directly into your products. From deploying self-guided smart agents to ChatGPT/Gemini custom integrations, we build high-converting predictive solutions that understand text, images, and user intents in real-time.",
    icon: "Cpu",
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=800&q=80",
    highlights: [
      "AI Strategy & Implementation Planning",
      "Generative AI & LLM Finetuning",
      "ChatGPT & Gemini API Integration",
      "Agentic AI Custom Workflows",
      "Predictive Data Analytics Models",
      "Intelligent Document Processing (OCR)",
      "Computer Vision & Pattern Recognition",
      "Machine Learning Algorithm Training"
    ],
    subServices: [
      "Vector Database Setup & RAG Architectures",
      "Autonomous Multi-Agent Collaboration Networks",
      "Sentiment and Behavioral Data Classifiers",
      "Speech-to-Text & Custom TTS Voice Integrations"
    ],
    metrics: [
      { value: "95%", label: "Customer Query Resolution" },
      { value: "18x", label: "Faster Data Mining Audits" },
      { value: "50%", label: "Customer Retention Increase" }
    ],
    accentColor: "from-teal-600 to-cyan-700",
    faq: [
      { q: "Is our proprietary data secure with AI?", a: "Yes. We configure safe enterprise-only API keys and local hosting frameworks where your training data is never shared with public model pools." },
      { q: "What is Agentic AI?", a: "Agentic AI refers to autonomous systems capable of executing multi-step complex workflows, reasoning, and using tools to achieve goals independently." }
    ]
  },
  "blockchain-crypto": {
    title: "Blockchain & Crypto Solutions",
    badge: "Decentralized Trust",
    heroDesc: "Establish secure, transparent, and immutable digital transactions with Web3 networks.",
    longDesc: "Mitigate double-spending, secure sensitive supplies, and develop robust consensus structures. We build customized decentralized smart contract nodes, encrypted wallets, and identity managers to optimize absolute digital trust.",
    icon: "ShieldCheck",
    image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=800&q=80",
    highlights: [
      "Blockchain Advisory & Consulting",
      "Audited Smart Contracts Development",
      "Crypto Wallet & Ledger Integration",
      "Custom Token Development (ERC-20/721/1155)",
      "Enterprise NFT Platforms",
      "Secure Web3 Product Solutions",
      "Supply Chain Traceability Blockchain",
      "Decentralized Identity Management (DID)"
    ],
    subServices: [
      "Solidity & Rust Smart Contract Development",
      "IPFS Decentralized File Hosting Solutions",
      "Web3.js & Ethers.js Frontend Integrations",
      "Ethereum, Polygon, & Solana Layer 2 Solutions"
    ],
    metrics: [
      { value: "100%", label: "Immutable Transaction Logs" },
      { value: "$0", label: "Intermediary Settlement Fees" },
      { value: "0ms", label: "Double-spending Latency" }
    ],
    accentColor: "from-amber-600 to-orange-700",
    faq: [
      { q: "Can we use blockchain privately?", a: "Absolutely. We develop private consortium blockchains (Hyperledger, private EVM) with custom access control lists specifically for secure B2B tracking." },
      { q: "Are your smart contracts audited?", a: "Yes. Every contract we construct goes through automated testing rigs and manual audits to guarantee secure and error-free deployments." }
    ]
  },
  "smart-home": {
    title: "Smart Home Installation",
    badge: "Intelligent Living",
    heroDesc: "Transform your residential and corporate spaces into secure, responsive smart nodes.",
    longDesc: "Achieve unprecedented luxury, absolute convenience, and maximum energy conservation. We design and install high-security mesh smart systems in Delhi NCR, integrating climate control, biometrics, and voice commands.",
    icon: "Home",
    image: "https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=800&q=80",
    highlights: [
      "Smart Lighting & Ambience Presets",
      "Military-Grade Smart Security Networks",
      "High-Definition CCTV Monitoring",
      "Encrypted Smart Door Locks & Biometrics",
      "Video Door Phones & Intercom Meshes",
      "Full Home Automation Hubs",
      "Siri, Alexa, & Google Assistant Voice Controls",
      "Smart Energy & Utility Management"
    ],
    subServices: [
      "Zigbee & Z-Wave Mesh Grid Deployment",
      "Central Touch Panel and App Interface Syncing",
      "Intelligent Motion & Leak Sensor Integrations",
      "Custom Home Theatre and Audio Multizone Control"
    ],
    metrics: [
      { value: "100%", label: "Connected Living Coverage" },
      { value: "28%", label: "HVAC Energy Conservation" },
      { value: "256-bit", label: "Local Device Encryption" }
    ],
    accentColor: "from-violet-600 to-indigo-700",
    faq: [
      { q: "Can I manage my smart home when away?", a: "Yes. All security, CCTV feeds, and lock controls are securely accessible via your personalized encrypted smartphone application." },
      { q: "What happens during a power failure?", a: "Our installations are equipped with fallback local memory and automated offline triggers to maintain physical lock security." }
    ]
  },
  "solar-energy": {
    title: "Solar Panel Installation",
    badge: "Clean Energy Grids",
    heroDesc: "Save money on electricity bills while reducing your carbon footprint.",
    longDesc: "Harness high-conversion clean telemetry. We plan, execute, and maintain residential, commercial, and industrial solar rooftop setups in Delhi and NCR, combining high-yield monocrystalline panels with hybrid backup net-metering structures.",
    icon: "Sun",
    image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=800&q=80",
    highlights: [
      "Residential Solar Panel Fitting",
      "Commercial Rooftop Solar Arrays",
      "Industrial High-Yield Clean Energy Solutions",
      "Custom Rooftop Grid Planning",
      "Post-Install Solar Maintenance & Cleans",
      "High-Capacity Battery Backup Integration",
      "Hybrid Solar Grid Systems",
      "Comprehensive Energy Audits & Sizing"
    ],
    subServices: [
      "Monocrystalline PERC Panel Sizing",
      "Net-Metering Regional Approval Assistance",
      "On-Grid, Off-Grid, and Hybrid Inverter Setups",
      "Structural Load and Shading Analysis Audits"
    ],
    metrics: [
      { value: "up to 85%", label: "Electricity Bill Reduction" },
      { value: "4.5 Years", label: "Average ROI Payback Period" },
      { value: "25 Years", label: "Linear Power SLA Guarantee" }
    ],
    accentColor: "from-emerald-600 to-green-700",
    faq: [
      { q: "What is Net-Metering?", a: "Net-metering allows you to route surplus solar energy back into the local grid, earning utility bill credits for negative usage." },
      { q: "Does solar work during cloudy days?", a: "Yes. High-performance monocrystalline cells capture scattered ambient light, producing power even during overcast weather." }
    ]
  }
};

export default function ServiceDetailPage() {
  const { id } = useParams<{ id: string }>();
  const serviceId = id || "digital-transformation";
  const service = SERVICES_DATA[serviceId];

  // Form submission state
  const [formData, setFormData] = useState({ name: "", email: "", selectedRequirements: [] as string[], text: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
    setSubmitted(false);
    setFormData({ name: "", email: "", selectedRequirements: [], text: "" });
  }, [serviceId]);

  if (!service) {
    return (
      <div className="pt-36 pb-24 text-center">
        <h1 className="font-serif text-3xl font-bold mb-4">Service Not Found</h1>
        <p className="text-slate-500 mb-8">The requested service page does not exist.</p>
        <Link to="/" className="px-6 py-2.5 rounded-xl bg-[#0F2D63] text-white font-bold text-sm">
          Return Home
        </Link>
      </div>
    );
  }

  const renderIcon = (name: string) => {
    const cls = "w-10 h-10 text-[#E5AF2B]";
    switch (name) {
      case "Server": return <Server className={cls} />;
      case "Settings": return <Settings className={cls} />;
      case "Cpu": return <Cpu className={cls} />;
      case "ShieldCheck": return <ShieldCheck className={cls} />;
      case "Home": return <Home className={cls} />;
      case "Sun": return <Sun className={cls} />;
      default: return <Server className={cls} />;
    }
  };

  const handleCheckboxChange = (sub: string) => {
    setFormData(prev => {
      const exists = prev.selectedRequirements.includes(sub);
      if (exists) {
        return { ...prev, selectedRequirements: prev.selectedRequirements.filter(x => x !== sub) };
      } else {
        return { ...prev, selectedRequirements: [...prev.selectedRequirements, sub] };
      }
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1200);
  };

  return (
    <div className="pt-28 pb-20 bg-white">
      {/* Service Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-[#06183B] via-[#0A224E] to-[#113069] text-white overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(229,175,43,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(229,175,43,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem]" />
        <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl -translate-y-1/2 -z-10" />

        <div className="max-w-[1320px] mx-auto px-6 relative text-left">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs text-white/60 mb-6 font-semibold">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span className="text-white">Services</span>
            <span>/</span>
            <span className="text-[#E5AF2B]">{service.title}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 flex flex-col gap-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-[#E5AF2B] font-bold tracking-wider uppercase self-start">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{service.badge}</span>
              </div>
              <h1 className="font-serif text-3xl md:text-5xl font-bold leading-tight">
                {service.title}
              </h1>
              <p className="text-white/80 text-base md:text-lg leading-relaxed max-w-xl">
                {service.heroDesc}
              </p>
              
              {/* Quick metrics badges for desktop */}
              <div className="hidden sm:flex items-center gap-8 mt-4 pt-6 border-t border-white/10">
                {service.metrics.map((met, i) => (
                  <div key={i} className="flex flex-col gap-1">
                    <span className="text-2xl font-serif font-bold text-[#E5AF2B]">{met.value}</span>
                    <span className="text-[10px] text-white/60 font-bold uppercase tracking-wider">{met.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right cover image */}
            <div className="lg:col-span-5">
              <div className="aspect-video lg:aspect-square w-full rounded-2xl overflow-hidden border border-white/10 shadow-2xl relative">
                <img 
                  src={service.image} 
                  alt={service.title} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Details and Calculator Panel */}
      <section className="py-20 max-w-[1320px] mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* Detailed Content */}
          <div className="lg:col-span-7 flex flex-col gap-10 text-left">
            <div className="flex flex-col gap-4">
              <h2 className="font-serif text-2xl md:text-3xl font-bold text-[#1B1B1B]">
                Overview & Methodology
              </h2>
              <p className="text-[#5B6470] text-sm md:text-base leading-relaxed">
                {service.longDesc}
              </p>
            </div>

            {/* Highlights Grid */}
            <div className="flex flex-col gap-5">
              <h3 className="font-serif font-bold text-lg text-[#0F2D63]">What We Provide:</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {service.highlights.map((hl, i) => (
                  <div key={i} className="flex items-start gap-3 p-4 bg-[#F8F9FC] border border-[#ECECEC] rounded-xl hover:bg-slate-50 transition-colors">
                    <div className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center shrink-0 mt-0.5 text-emerald-600">
                      <Check className="w-3 h-3 stroke-[3px]" />
                    </div>
                    <span className="text-xs font-semibold text-[#1B1B1B]">{hl}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Mobile Metrics view */}
            <div className="sm:hidden grid grid-cols-3 gap-4 border-y border-[#ECECEC] py-6">
              {service.metrics.map((met, i) => (
                <div key={i} className="flex flex-col items-center text-center gap-1">
                  <span className="text-xl font-serif font-bold text-[#0F2D63]">{met.value}</span>
                  <span className="text-[9px] text-[#5B6470] font-bold uppercase tracking-wide leading-none">{met.label}</span>
                </div>
              ))}
            </div>

            {/* Interactive FAQs */}
            <div className="flex flex-col gap-4 pt-4">
              <h3 className="font-serif font-bold text-lg text-[#0F2D63]">Frequently Asked Questions</h3>
              <div className="flex flex-col gap-3">
                {service.faq.map((f, i) => (
                  <div key={i} className="border border-[#ECECEC] rounded-xl overflow-hidden bg-white">
                    <button
                      onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                      className="w-full px-5 py-4 text-left flex justify-between items-center bg-[#F8F9FC] hover:bg-slate-50 transition-colors font-semibold text-xs md:text-sm text-[#1B1B1B]"
                    >
                      <span>{f.q}</span>
                      <ChevronDown className={`w-4 h-4 text-[#5B6470] transition-transform duration-300 ${activeFaq === i ? "rotate-180" : ""}`} />
                    </button>
                    <AnimatePresence initial={false}>
                      {activeFaq === i && (
                        <motion.div
                          initial={{ height: 0 }}
                          animate={{ height: "auto" }}
                          exit={{ height: 0 }}
                          className="overflow-hidden"
                        >
                          <p className="px-5 py-4 text-xs md:text-sm text-[#5B6470] leading-relaxed border-t border-[#ECECEC]">
                            {f.a}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Interactive Specification & Discovery Blueprint Request Form */}
          <div className="lg:col-span-5 bg-white border border-[#ECECEC] rounded-[32px] p-8 shadow-xs text-left">
            <AnimatePresence mode="wait">
              {!submitted ? (
                <motion.form
                  key="spec-form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="flex flex-col gap-5"
                >
                  <div className="flex flex-col gap-1">
                    <span className="text-[9px] font-bold text-[#E5AF2B] uppercase tracking-widest">INTERACTIVE SELECTION</span>
                    <h3 className="font-serif font-bold text-xl text-[#0F2D63]">Select Parameters</h3>
                    <p className="text-xs text-[#5B6470]">
                      Check the sub-services you require. Our systems will estimate customized SLA benchmarks for your blueprint.
                    </p>
                  </div>

                  {/* Checkable Sub-services */}
                  <div className="flex flex-col gap-2.5 bg-[#F8F9FC] border border-[#ECECEC] p-4 rounded-xl">
                    <span className="text-[10px] font-bold text-[#1B1B1B] uppercase tracking-wider block mb-1">Target Areas:</span>
                    {service.subServices.map((sub, i) => (
                      <label key={i} className="flex items-start gap-2.5 cursor-pointer select-none group">
                        <input
                          type="checkbox"
                          checked={formData.selectedRequirements.includes(sub)}
                          onChange={() => handleCheckboxChange(sub)}
                          className="w-4 h-4 rounded-sm accent-[#0F2D63] border-[#ECECEC] mt-0.5 cursor-pointer"
                        />
                        <span className="text-xs text-slate-700 font-medium group-hover:text-[#0F2D63] transition-colors">
                          {sub}
                        </span>
                      </label>
                    ))}
                  </div>

                  {/* Estimation Panel (Dynamic calculation depending on checkboxes!) */}
                  <div className="p-4 rounded-xl bg-[#0F2D63]/5 border border-[#ECECEC] text-xs text-slate-700 flex flex-col gap-2">
                    <div className="flex justify-between font-bold text-[#0F2D63] border-b border-[#ECECEC] pb-1.5">
                      <span>PROJECT METRIC</span>
                      <span>ESTIMATION</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Selected Focus Areas:</span>
                      <span className="font-semibold text-[#1B1B1B]">{formData.selectedRequirements.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Delivery Priority:</span>
                      <span className="font-semibold text-emerald-600">Standard SLA</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Estimated Initial Audit:</span>
                      <span className="font-semibold text-[#E5AF2B]">Within 24 Hours</span>
                    </div>
                  </div>

                  {/* Name and Email inputs */}
                  <div className="flex flex-col gap-3">
                    <div className="flex flex-col gap-1">
                      <label className="text-xs font-bold text-[#1B1B1B] uppercase tracking-wider">Your Name *</label>
                      <input
                        required
                        type="text"
                        placeholder="Name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-[#F8F9FC] border border-[#ECECEC] text-xs focus:outline-hidden focus:border-[#0F2D63]"
                      />
                    </div>
                    
                    <div className="flex flex-col gap-1">
                      <label className="text-xs font-bold text-[#1B1B1B] uppercase tracking-wider">Your Email *</label>
                      <input
                        required
                        type="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-[#F8F9FC] border border-[#ECECEC] text-xs focus:outline-hidden focus:border-[#0F2D63]"
                      />
                    </div>
                  </div>

                  {/* CTA Submit Button */}
                  <button
                    disabled={loading}
                    type="submit"
                    className="w-full py-3.5 bg-[#0F2D63] text-white font-bold text-xs rounded-xl hover:bg-[#1a448c] active:scale-95 transition-all flex items-center justify-center gap-1.5 cursor-pointer group"
                  >
                    {loading ? (
                      <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <>
                        Request Service Blueprint
                        <ArrowRight className="w-3.5 h-3.5 text-[#E5AF2B] transition-transform duration-300 group-hover:translate-x-1" />
                      </>
                    )}
                  </button>
                </motion.form>
              ) : (
                <motion.div
                  key="spec-success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="flex flex-col items-center text-center py-6 gap-5"
                >
                  <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100">
                    <CheckCircle className="w-8 h-8 stroke-[2px]" />
                  </div>
                  
                  <div className="flex flex-col gap-1">
                    <h3 className="font-serif font-bold text-xl text-[#0F2D63]">Parameters Received</h3>
                    <p className="text-xs text-[#5B6470] max-w-sm leading-relaxed">
                      Thank you <span className="font-bold text-[#1b1b1b]">{formData.name}</span>. Your custom selection is now being audited by Sanjeev Goel.
                    </p>
                  </div>

                  <div className="p-3 bg-[#F8F9FC] border border-[#ECECEC] rounded-xl text-left w-full text-[10px] font-mono flex flex-col gap-1 text-slate-600">
                    <p><strong>RECIPIENT:</strong> info2sanjeev@gmail.com</p>
                    <p><strong>SERVICE_TYPE:</strong> {serviceId}</p>
                    <p><strong>ITEMS:</strong> {formData.selectedRequirements.length || "Standard Full Package"}</p>
                    <p><strong>SLA:</strong> compilation_in_progress...</p>
                  </div>

                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({ name: "", email: "", selectedRequirements: [], text: "" });
                    }}
                    className="px-5 py-2 rounded-xl border border-[#ECECEC] text-[#0F2D63] text-xs font-semibold hover:bg-[#F8F9FC] transition-colors"
                  >
                    Adjust Parameters
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>
    </div>
  );
}
