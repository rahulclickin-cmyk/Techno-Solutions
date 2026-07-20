import { ServiceItem, StatItem, ProcessStep, ProjectItem, TestimonialItem, BlogPost } from "./types";

export const SERVICES: ServiceItem[] = [
  {
    id: "digital-transformation",
    title: "Digital Transformation Solutions",
    description: "Modernize your organization with digital-first strategies, cloud adoption, and AI integration plans.",
    longDescription: "In today’s rapidly evolving digital landscape, businesses must adapt, innovate, and transform to stay competitive. Our Digital Transformation Consulting & Training Services assess your current digital maturity, identify technological gaps, and build tailored strategic roadmaps for sustainable corporate upskilling and modern deployment.",
    iconName: "Monitor",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
    badge: "Strategy & Advisory",
    details: [
      "Digital Transformation Consulting & Mature Audits",
      "Enterprise Digitization and Cloud Adoption Models",
      "AI Integration & Predictive Analytics Implementation",
      "Process Optimization & Technology Selection Roadmaps",
      "Customer Experience (CX) Transformation Consulting",
      "Corporate Digital Upskilling & Training Programs"
    ]
  },
  {
    id: "business-automation",
    title: "Business Automation Solutions",
    description: "Automate repetitive manual processes across departments to increase productivity and reduce costs.",
    longDescription: "TECHNO-SOLUTIONS is a leading provider of Business Automation Solutions. We streamline operations, eliminate paper-based processes, and accelerate workflows. By connecting low-code platforms and custom ERPs, we help startups, SMEs, and large enterprises transition into zero-bottleneck organizations.",
    iconName: "Settings",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80",
    badge: "Automation Core",
    details: [
      "Workflow & CRM Automation (HubSpot, Zoho, Salesforce)",
      "HR, leave, and Onboarding Automation",
      "Finance, Expense, and Invoice Approvals Routing",
      "Inventory Management and Sales Automation",
      "Robotic Process Automation (RPA) & AI Chatbots",
      "ERP Integration (SAP, Oracle, Odoo, Zoho, Tally)"
    ]
  },
  {
    id: "ai-solutions",
    title: "Artificial Intelligence Solutions",
    description: "Unlock the power of neural engines, Generative AI models, and custom Agentic systems.",
    longDescription: "Bridge manual operational gaps with the power of modern artificial intelligence. We develop customized strategies, implement ChatGPT/Gemini APIs, deploy self-guided AI agents, build intelligent document parsers (OCR), and configure deep computer-vision models tailored to your industry's telemetry.",
    iconName: "Cpu",
    image: "https://images.unsplash.com/photo-1527474305487-b87b222841cc?auto=format&fit=crop&w=800&q=80",
    badge: "Cognitive AI",
    details: [
      "AI Strategy Advisory & Implementation Support",
      "Generative AI & ChatGPT/Gemini API Integrations",
      "Intelligent Autonomous AI Agents & Custom Workflows",
      "Predictive Analytics & Real-time KPI Telemetry",
      "Intelligent Document Processing & Advanced OCR",
      "Computer Vision & Industrial Machine Learning Models"
    ]
  },
  {
    id: "blockchain-crypto",
    title: "Blockchain & Crypto Solutions",
    description: "Secure, transparent, decentralized ledger integrations, Web3 portals, and audited smart contracts.",
    longDescription: "Construct private trustless transaction systems, automate multi-party compliance protocols, audit complex smart contracts, and build resilient distributed logistics networks with optimized security to prevent vulnerabilities and eliminate single-point operational failures.",
    iconName: "Database",
    image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=800&q=80",
    badge: "Distributed Web3",
    details: [
      "Strategic Blockchain Consulting & Web3 Architecture",
      "Secure Smart Contracts Auditing & Execution Protocols",
      "Crypto Wallet & Custom Token Development",
      "Decentralized NFT Platforms & Asset Tokenization",
      "Supply Chain Traceability Blockchain Integrations",
      "Secured Decentralized Identity & Access Management"
    ]
  },
  {
    id: "smart-home",
    title: "Smart Home Installation",
    description: "Transform your residential or commercial space into a secure, responsive, intelligent living environment.",
    longDescription: "Deploy unified IoT meshes that sense, adapt, and respond dynamically. We integrate voice assistants, smart CCTV arrays, advanced biometric locks, automated HVAC climate routines, and tailored building dashboard monitors that help save substantial energy overhead.",
    iconName: "Home",
    image: "https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=800&q=80",
    badge: "Intelligent IoT",
    details: [
      "Smart Lighting & Automated Ambience Control",
      "High-Definition Security, CCTV, & Video Door Phones",
      "End-to-End Encrypted Biometric Door Lock Integration",
      "Voice Controls & Smart Centralized Touchscreens",
      "Intelligent Energy Management & HVAC Controls",
      "Custom Wireless Mesh IoT Infrastructure Setup"
    ]
  },
  {
    id: "solar-energy",
    title: "Solar Panel Installation",
    description: "Reduce overhead utility expenses and transition to modern carbon-negative operations.",
    longDescription: "Design, construct, and balance high-conversion rooftop solar arrays tailored for residential, commercial, or industrial architectures. Our solutions include high-capacity battery bank integration, net-metering telemetry tracking, and comprehensive carbon-offset reporting.",
    iconName: "Sun",
    image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=800&q=80",
    badge: "Clean Tech",
    details: [
      "Residential, Commercial, and Industrial Solar Grids",
      "Rooftop Solar Structural Feasibility Analysis",
      "Intelligent Battery Storage & Power Backup Systems",
      "Hybrid Solar Integration & Peak Load Balancing",
      "Comprehensive Sustainability Audits & Carbon Offsets",
      "Ongoing Maintenance, Safety Diagnostics & Calibration"
    ]
  }
];

export const STATS: StatItem[] = [
  {
    count: 450,
    label: "Projects Completed",
    suffix: "+",
    iconName: "Briefcase"
  },
  {
    count: 220,
    label: "Enterprise Clients",
    suffix: "+",
    iconName: "Users"
  },
  {
    count: 12,
    label: "Years Experience",
    suffix: "+",
    iconName: "Award"
  },
  {
    count: 24,
    label: "Support Desk",
    suffix: "/7",
    iconName: "Headset"
  }
];

export const PROCESS_STEPS: ProcessStep[] = [
  {
    step: "01",
    title: "Business Consultation",
    description: "We host deep-discovery workshops to map out your core current-state challenges and establish automation opportunities.",
    iconName: "Search"
  },
  {
    step: "02",
    title: "Requirement Analysis",
    description: "Our business consultants and technical architects audit your legacy software systems, security guidelines, and bottleneck structures.",
    iconName: "Clipboard"
  },
  {
    step: "03",
    title: "Solution Design",
    description: "We model tailored systems blueprints, cloud structures, dynamic dashboards, and high-security network architectures.",
    iconName: "Settings"
  },
  {
    step: "04",
    title: "Implementation",
    description: "Our elite engineers build, integrate, and deploy custom workflows, cognitive AI APIs, or solar arrays with strict quality checks.",
    iconName: "Settings"
  },
  {
    step: "05",
    title: "Hands-on Training",
    description: "We run customized corporate workshops, hands-on tutorials, and documentation walkthroughs to ensure seamless adoption by all teams.",
    iconName: "Award"
  },
  {
    step: "06",
    title: "Support & Optimization",
    description: "We provide 24/7 SLA-backed monitoring, software upgrade cycles, system recalibrations, and proactive enhancements.",
    iconName: "Headset"
  }
];

export const PROJECTS: ProjectItem[] = [
  {
    id: "p1",
    title: "Automated Invoice Control Center",
    category: "Business Automation",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
    description: "An end-to-end accounts payable automation module tracking financial receipts and routing approvals across multiple regional departments.",
    link: "#"
  },
  {
    id: "p2",
    title: "Hyperledger Logistics Ledger",
    category: "Blockchain Network",
    image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=800&q=80",
    description: "Decentralized consensus framework for a commercial shipping corporate, managing component transparency and identity metrics.",
    link: "#"
  },
  {
    id: "p3",
    title: "Cognitive AGV Assembler",
    category: "AI Solutions",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=800&q=80",
    description: "A custom real-time computer vision algorithm coordinating automated robotic assembly arms inside an ISO-certified factory.",
    link: "#"
  },
  {
    id: "p4",
    title: "Smart Highrise IoT Mesh",
    category: "Smart Home",
    image: "https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=800&q=80",
    description: "Seamless wireless mesh coordinating automated lighting networks, electronic access points, and security alarms in an urban real estate development.",
    link: "#"
  },
  {
    id: "p5",
    title: "High-Conversion Commercial Rooftop Solar",
    category: "Solar Installation",
    image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=800&q=80",
    description: "High-capacity hybrid solar array providing net-metering telemetry tracking and backup storage for a 120kW healthcare clinic.",
    link: "#"
  },
  {
    id: "p6",
    title: "Digital Strategy & Enterprise Upskilling",
    category: "Digital Transformation",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80",
    description: "Complete corporate digitization consulting and advanced leadership workshop series for a banking conglomerate.",
    link: "#"
  }
];

export const TESTIMONIALS: TestimonialItem[] = [
  {
    id: "t1",
    name: "Rajesh Kumar",
    role: "Chief Operating Officer",
    company: "Vortex Logistics Solutions",
    quote: "Techno-Solutions transformed our manual operations into a completely automated workflow. The transition was incredibly seamless, and our inventory processing cycle times dropped by more than 40%.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&h=200&q=80",
    rating: 5
  },
  {
    id: "t2",
    name: "Sunita Sharma",
    role: "Director of Digital Strategy",
    company: "Apex Enterprise Group",
    quote: "Their AI and automation expertise significantly improved our business productivity. Integrating their customized neural document parser cut our data entry workflows down from 3 days to under 15 minutes.",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&h=200&q=80",
    rating: 5
  },
  {
    id: "t3",
    name: "Manish Goel",
    role: "Managing Director",
    company: "Goel Housing & Infrastructure",
    quote: "Deploying their localized smart building controls and high-conversion rooftop solar array has cut our monthly utilities overhead by 32%. Techno-Solutions delivers unparalleled engineering and clear ROI.",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&h=200&q=80",
    rating: 5
  }
];

export const INDUSTRIES = [
  { name: "Healthcare", desc: "Patient registration, appointment schedules, medical billing, and telemedicine automation." },
  { name: "Education", desc: "Smart learning management, automated examinations, and e-governance workflows." },
  { name: "Manufacturing", desc: "Production scheduling, predictive telemetry audits, and quality control vision systems." },
  { name: "Banking", desc: "Secured decentralized transactions, KYC validation, fraud triggers, and fintech tools." },
  { name: "Retail", desc: "Automated inventory management, POS integrations, and loyalty tracking." },
  { name: "Telecom", desc: "High-speed network architecture support, automated billing routing, and customer operations." },
  { name: "Government", desc: "Citizen portals, secure database integration, and transparent e-office filing." },
  { name: "Logistics", desc: "Real-time shipment telemetry, automated warehousing, and blockchain component chains." },
  { name: "Hospitality", desc: "Smart booking platforms, property management tools, and automated guest operations." },
  { name: "Real Estate", desc: "Smart lighting mesh, thermal management, and encrypted access hubs." },
  { name: "Energy", desc: "High-conversion solar energy grid management and intelligent battery monitoring." },
  { name: "SMEs", desc: "Affordable, customized business packages designed within budget boundaries." }
];

export const WHY_CHOOSE_US = [
  {
    title: "Experienced Professionals",
    desc: "Technology experts with decades of industry experience across business, renewable grid modeling, and blockchain paradigms."
  },
  {
    title: "Customized Solutions",
    desc: "Every business has unique workflows. We build tailored architectures that integrate perfectly into your legacy operations."
  },
  {
    title: "End-to-End Services",
    desc: "We manage the entire lifecycle—from first blueprint consulting workshops to coding, deployment, and ongoing 24/7 SLA support."
  },
  {
    title: "Latest Technologies (AI, ML, Generative AI, Blockchain, Cloud, IoT, RPA etc.)",
    desc: "We stay on the absolute cutting edge, deploying Generative AI models, Agentic AI loops, high-conversion clean energy, and robust low-code tools."
  },
  {
    title: "Affordable Pricing",
    desc: "We engineer enterprise-quality, ISO-level software structures optimized safely within your project’s financial parameters."
  },
  {
    title: "Customer First Approach",
    desc: "We focus heavily on measurable business value, transparent documentation, and long-term retainer partnerships."
  }
];

export const TECHNOLOGIES = [
  { category: "Artificial Intelligence", items: ["Generative AI", "Agentic AI", "Machine Learning", "ChatGPT / Gemini APIs", "Intelligent OCR"] },
  { category: "Software & Web3", items: ["Python", "Java", "Node.js", "Blockchain Ledger", "Smart Contracts", "Web3 APIs"] },
  { category: "Cloud Infrastructure", items: ["AWS", "Microsoft Azure", "Google Cloud Platform", "CI/CD", "Secure API Gateway"] },
  { category: "Automation & Low-Code", items: ["Power Automate", "Power BI", "Copilot Studio", "Robotic Process Automation", "ERP/CRM APIs"] }
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: "b1",
    title: "The Ultimate Guide to Digital Transformation in Delhi NCR",
    slug: "digital-transformation-delhi",
    summary: "How top organizations in Delhi, Noida, and Gurgaon are leveraging digital consulting services to modernize their corporate upskilling and transition seamlessly to cloud operations.",
    category: "Digital Transformation",
    date: "June 28, 2026",
    readTime: "6 min read",
    author: "Sanjeev Goel",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
    keywords: ["Digital Transformation Company in Delhi", "Digital Consulting Services", "Enterprise Automation"],
    content: "In today’s rapidly evolving digital landscape, businesses in Delhi NCR must adapt, innovate, and transform to stay competitive. As a premier Digital Transformation Company in Delhi, Techno-Solutions is at the forefront of this revolution. Our Digital Consulting Services assess your current digital maturity, identify technological gaps, and build tailored strategic roadmaps for sustainable corporate upskilling and modern deployment.\n\n### Why Digital Transformation Matters Now\n\nMany legacy businesses struggle with siloed systems, manual operations, and outdated technology stacks. By embracing enterprise automation, firms can reduce operational bottlenecks and enhance customer experience.\n\n### Our Strategic Framework\n\n1. **Comprehensive Mature Audits:** We evaluate your business models against leading industry standards.\n2. **Cloud Adoption & Migration:** Move safely to modern cloud structures like AWS, Azure, or Google Cloud with zero downtime.\n3. **AI & Analytics Integration:** Inject intelligent prediction models into your daily CRM and core decision pipelines."
  },
  {
    id: "b2",
    title: "How Business Automation Solutions Drive Efficiency for Indian SMEs",
    slug: "business-automation-solutions-smes",
    summary: "Streamlining operations, eliminating manual bottlenecks, and integrating custom ERP/CRM APIs for high-efficiency, zero-bottleneck workflows.",
    category: "Automation",
    date: "June 15, 2026",
    readTime: "5 min read",
    author: "Sanjeev Goel",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80",
    keywords: ["Business Automation Solutions", "Workflow Automation", "Enterprise Automation"],
    content: "Techno-Solutions is a leading provider of Business Automation Solutions. We streamline operations, eliminate paper-based processes, and accelerate workflows. By connecting low-code platforms and custom ERPs, we help startups, SMEs, and large enterprises transition into highly productive organizations.\n\n### The Direct ROI of Workflow Automation\n\n- **Reduced Error Rates:** Manual data entry and file transfers are prone to human mistakes. Automation reduces this to near-zero.\n- **Faster Approvals:** Routing invoice, leave, and expense claims automatically ensures rapid decision-making.\n- **Optimized Resources:** Employees can focus on high-value strategy rather than repetitive copy-paste jobs.\n\n### Scaling with Microsoft Power Platform & Low-Code\n\nWe utilize Microsoft Power Automate, Copilot Studio, and custom APIs to bridge gaps between HubSpot, Zoho, Salesforce, and Tally, ensuring complete, end-to-end operational visibility."
  },
  {
    id: "b3",
    title: "The Rise of Generative AI: Choosing an AI Solutions Provider in India",
    slug: "ai-solutions-provider-india",
    summary: "Harnessing neural networks, Agentic AI, and Gemini/ChatGPT API custom setups to build real-world productivity gains and secure automation.",
    category: "AI",
    date: "May 22, 2026",
    readTime: "7 min read",
    author: "Sanjeev Goel",
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=800&q=80",
    keywords: ["AI Solutions Provider India", "Artificial Intelligence Consulting"],
    content: "AI has transitioned from a buzzword into a critical business driver. As an AI Solutions Provider India, Techno-Solutions helps corporate leaders design, implement, and audit cognitive solutions safely within their budget boundaries.\n\n### Key Pillars of Modern AI Implementation\n\n1. **Generative AI & LLM Integrations:** Connect the Gemini API or ChatGPT securely to parse corporate data, draft responses, or search documents.\n2. **Agentic AI & Custom Workflows:** Deploy autonomous, self-guided agents that trigger workflows, communicate across channels, and automate tasks.\n3. **Intelligent Document Processing (OCR):** Turn physical invoices, receipts, and forms into structured digital database entries in seconds."
  },
  {
    id: "b4",
    title: "Blockchain & Web3: Restructuring Security for Modern Enterprise Ledgers",
    slug: "blockchain-web3-enterprise-ledgers",
    summary: "Exploring audited smart contracts, decentralized consensus, and private ledger integrations for secure financial tracking and inventory validation.",
    category: "Blockchain",
    date: "May 05, 2026",
    readTime: "6 min read",
    author: "Sanjeev Goel",
    image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=800&q=80",
    keywords: ["Blockchain Solutions", "Smart Contracts Delhi", "Web3 Integration"],
    content: "Secure decentralized technology is redefining trust in business transactions. At Techno-Solutions, we design audited blockchain networks and custom private consensus models that protect corporate IP, prevent inventory fraud, and create unalterable system logs.\n\n### The Security Core of Modern Blockchain Systems\n\n- **Consensus Mechanisms:** Distributing verification authority ensures no single point of network failure exists.\n- **Immutability:** Once logged, audit metrics cannot be altered or deleted, securing financial history.\n- **Smart Contract Automation:** Standardize and automate vendor escrow terms, royalty splits, and supply chain handshakes."
  },
  {
    id: "b5",
    title: "Intelligent Living: Smart Home Installation and IoT Security",
    slug: "intelligent-living-smart-home-installation",
    summary: "Upgrade your residential or commercial space with biometrics, mesh networks, and integrated CCTV for a secure environment.",
    category: "Smart Home",
    date: "April 18, 2026",
    readTime: "5 min read",
    author: "Sanjeev Goel",
    image: "https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=800&q=80",
    keywords: ["Smart Home Installation Delhi", "IoT Security Mesh", "Home Automation"],
    content: "Modern residential and commercial systems demand state-of-the-art security, ease of access, and ambient efficiency. Techno-Solutions delivers custom IoT integrations, secure biometrics, and intelligent lighting networks that blend into your architecture seamlessly.\n\n### Designing the Smart Home Environment\n\n1. **Unified Mesh Controls:** Control all local subsystems via an isolated, encrypted wireless mesh network.\n2. **Smart Security Locks:** Say goodbye to physical keys. Biometrics and temporary passcodes keep access fully recorded and highly secure.\n3. **Voice & Sensor Control:** Automate lighting schedules, air conditioning cycles, and backup power grids to maximize energy conservation."
  },
  {
    id: "b6",
    title: "Solar Power Integration: Reducing Overhead Expenses in Corporate Parks",
    slug: "solar-panel-installation-carbon-negative",
    summary: "Reduce monthly utility bills by up to 32% with commercial-grade hybrid solar panels and net-metering telemetry dashboards.",
    category: "Solar",
    date: "March 30, 2026",
    readTime: "7 min read",
    author: "Sanjeev Goel",
    image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=800&q=80",
    keywords: ["Solar Panel Installation Services", "Green Tech Solutions", "Rooftop Solar Delhi"],
    content: "With rising energy tariffs, commercial and residential operations in Delhi NCR can significantly benefit from custom solar integration. Techno-Solutions provides comprehensive consulting, structural mapping, high-conversion panel configuration, and green energy monitoring.\n\n### Core Benefits of Solar Integration\n\n- **High Return on Investment:** Transitioning to clean tech saves direct utility costs and offers clean energy incentives.\n- **Carbon-Negative Footprint:** Do your part in global sustainability efforts by moving standard building consumption to renewable networks.\n- **Real-Time Telemetry:** Track every watt generated, stored, or back-fed into the local power grid through a secure dashboard."
  },
  {
    id: "b7",
    title: "2026 Enterprise Tech Trends: Adapting to the Digital Frontier",
    slug: "enterprise-tech-trends-2026",
    summary: "A deep dive into emerging tech paradigms, from agentic AI loops to decentralized web portals and green technology integrations.",
    category: "Industry Trends",
    date: "February 12, 2026",
    readTime: "8 min read",
    author: "Sanjeev Goel",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80",
    keywords: ["Enterprise Tech Trends 2026", "Corporate Digital Strategy", "Future Tech Solutions"],
    content: "The year 2026 marks a milestone in deep tech integration. From standard cloud systems to highly proactive agent-based architectures, businesses must adapt fast or risk operational stagnation. Let’s explore the top paradigms driving corporate success this year.\n\n### Top 3 Paradigms to Watch\n\n1. **Agentic Workflows:** Moving beyond passive chat prompts into active systems that can manage research, email, and process automation with minimal human intervention.\n2. **Decentralized Data Anchors:** Securing critical company files and client transaction histories using unalterable cryptographically signed ledgers.\n3. **Hybrid Energy Networks:** Powering local servers and smart office parks using smart, carbon-negative local microgrids."
  }
];

