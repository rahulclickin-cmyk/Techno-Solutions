import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());

const PORT = 3000;

// Initialize GoogleGenAI with named parameters as required by the SDK guidelines
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      "User-Agent": "aistudio-build",
    },
  },
});

// Seed system prompt from your data or custom training
const SYSTEM_INSTRUCTION = `You are "Techno-Solutions Assistant", a highly professional, polite, 24/7 AI Chatbot for Techno-Solutions.
Your goal is to assist customers and convert leads by answering questions about our services, process, contact information, and why clients should choose us.

Company Details:
- Name: Techno-Solutions
- Phone: +91 9811841782
- Email: contact@techno-solutions.in (or via contact form)
- Address: 218 AGCR Enclave, Near Karkardoma Metro Station, Delhi 110092, India
- Website services we offer:
  1. Digital Transformation Solutions: Enterprise digitization, cloud adoption, AI integration, process optimization.
  2. Business Automation Solutions: Workflow automation, CRM, HR, Finance automation, AI Chatbots, ERP integration, RPA.
  3. Artificial Intelligence Solutions: AI strategy, Generative AI, ChatGPT/Gemini API integration, predictive analytics, intelligent document processing, computer vision.
  4. Blockchain & Crypto Solutions: Token & Coin Development, Smart Contract Development, Staking Platforms, MLM Platforms, ICO/IDO/IEO Platforms, NFT Marketplaces, Metaverse, Crypto Wallets, dApp Development, and Blockchain Consulting.
  5. Smart Home Installation: Smart lighting, security, CCTV, smart door locks, automated climate, voice control, home automation.
  6. Solar Panel Installation: Residential, Commercial, and Industrial solar rooftops, battery backups, hybrid solar systems, energy audits.

Process & Milestones:
1. Business Consultation
2. Requirement Analysis
3. Solution Design
4. Implementation & Quality checks
5. Team Training
6. Support & Optimization (24/7 SLA-backed monitoring)

Why Choose Us:
- Innovation-Focused (stay ahead with future-ready tech)
- Expert Teams (specialists in Blockchain, AI, and full-stack engineering)
- End-to-End Delivery (from consulting to deployment and maintenance)
- Security & Scalability (enterprise-grade security & performance)
- Business-Driven Results (we align technology with your business goals)

Tone Guidelines:
- Be highly polite, professional, concise, and helpful.
- Gently guide potential clients towards filling out the contact form or reaching out to us via telephone (+91 9811841782) or emailing us.
- Never make up information. If unsure, politely ask them to connect with our experts via phone or form.
- Keep responses clean, beautifully structured, and friendly. Use short paragraphs or clear bullet points. No markdown headings like # or ## inside small chat messages, prefer simple bold styling.`;

app.post("/api/chat", async (req, res) => {
  try {
    const { message, history } = req.body;
    if (!message) {
      return res.status(400).json({ error: "Message is required." });
    }

    // Prepare contents array for generating content
    const contents: any[] = [];
    
    // Add history if any
    if (history && Array.isArray(history)) {
      for (const turn of history) {
        contents.push({
          role: turn.role, // 'user' or 'model'
          parts: [{ text: turn.text }]
        });
      }
    }

    // Add current user message
    contents.push({
      role: "user",
      parts: [{ text: message }]
    });

    let aiResponseText = "";
    try {
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: contents,
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
          temperature: 0.7,
        },
      });
      aiResponseText = response.text || "";
    } catch (apiError: any) {
      console.warn("Gemini API call failed, falling back to smart local responder:", apiError);
      aiResponseText = getLocalFallbackResponse(message);
    }

    res.json({ text: aiResponseText });
  } catch (error: any) {
    console.error("Gemini Chat API Error:", error);
    res.status(500).json({ error: error?.message || "An error occurred during chat processing." });
  }
});

// A highly intelligent, keyword-matching rule-based local assistant fallback
function getLocalFallbackResponse(userMessage: string): string {
  const msg = userMessage.toLowerCase();

  // Blockchain and Crypto
  if (
    msg.includes("blockchain") ||
    msg.includes("crypto") ||
    msg.includes("token") ||
    msg.includes("coin") ||
    msg.includes("smart contract") ||
    msg.includes("nft") ||
    msg.includes("wallet") ||
    msg.includes("dapp") ||
    msg.includes("staking") ||
    msg.includes("solidity") ||
    msg.includes("rust")
  ) {
    return `**Blockchain & Cryptocurrency Solutions**\n\nTechno-Solutions is your expert Web3 and ledger engineering partner. We specialize in:\n\n1. **Token & Coin Development**: Custom token design and deployment using Solidity & Rust on Ethereum, Solana, BSC, Polygon, etc.\n2. **Smart Contract Development**: Audited, secure execution codes developed using Truffle and Hardhat.\n3. **Staking & MLM Platforms**: APY calculators, multi-tier automated payouts, and real-time trackers.\n4. **ICO/IDO/IEO Platforms**: Investor dashboards and secure KYC/AML integration.\n5. **NFT Marketplaces**: Support for ERC-721/1155 tokens, minting, trading, and wallet connection.\n6. **Metaverse & dApp Development**: User-centric decentralized apps for DeFi, supply chain, and interactive spaces.\n\nHow can we help build your next decentralized project? Let us know or connect with us at **+91 9811841782**!`;
  }

  // Artificial Intelligence and ML
  if (
    msg.includes("ai") ||
    msg.includes("artificial intelligence") ||
    msg.includes("machine learning") ||
    msg.includes("deep learning") ||
    msg.includes("nlp") ||
    msg.includes("computer vision") ||
    msg.includes("predictive analytics") ||
    msg.includes("chatbot") ||
    msg.includes("chatgpt") ||
    msg.includes("gemini")
  ) {
    return `**AI & Machine Learning Solutions**\n\nWe build intelligent systems that drive business automation and rich analytics:\n\n- **AI & ML Systems**: Models built using TensorFlow, PyTorch, Scikit-learn, and OpenCV.\n- **Deep Learning**: Advanced neural networks including CNNs (images), RNNs & LSTMs (sequence/time-series), and GANs (content generation).\n- **Natural Language Processing (NLP)**: Intelligent chatbots, text summarization, translation, and sentiment analysis engines.\n- **Computer Vision**: Face recognition, OCR, object detection, and smart surveillance automation.\n- **AI-Powered Blockchain**: Smart contract fraud detection, trading bots, and market predictors.\n- **Applications & Gaming**: Voice-enabled apps, adaptive NPCs, and personalized user experiences.\n\nWould you like to schedule an AI consultation? Speak to our experts directly or call us at **+91 9811841782**!`;
  }

  // Smart Home
  if (
    msg.includes("smart home") ||
    msg.includes("home automation") ||
    msg.includes("cctv") ||
    msg.includes("lighting") ||
    msg.includes("automation") ||
    msg.includes("climate") ||
    msg.includes("lock")
  ) {
    return `**Smart Home Automation Solutions**\n\nTechno-Solutions installs robust and integrated smart systems:\n\n- **Smart Lighting & CCTV**: Custom-themed automated scenes and 24/7 security surveillance systems.\n- **Smart Access & Comfort**: Biometric smart door locks and automated climate/HVAC control.\n- **Unified Voice Control**: Hands-free voice commands via Alexa, Google Assistant, or Apple HomeKit.\n\nWould you like a custom quote to automate your home or office space? Contact us on **+91 9811841782**!`;
  }

  // Solar Energy
  if (
    msg.includes("solar") ||
    msg.includes("panel") ||
    msg.includes("energy") ||
    msg.includes("rooftop") ||
    msg.includes("battery")
  ) {
    return `**Solar Panel Installation Solutions**\n\nWe provide turnkey solar setups to help you switch to clean energy and slash bills:\n\n- **Solar Rooftops**: Specialized installations for Residential, Commercial, and Industrial sites.\n- **Battery Backup & Hybrid setups**: Uninterrupted green power around the clock.\n- **Professional Energy Audits**: Evaluating power consumption to design the perfect cost-effective solution.\n\nLet us help you transition to solar power! Give us a call at **+91 9811841782** to discuss installation.`;
  }

  // Web & Mobile Development
  if (
    msg.includes("web") ||
    msg.includes("mobile") ||
    msg.includes("website") ||
    msg.includes("app") ||
    msg.includes("flutter") ||
    msg.includes("react") ||
    msg.includes("kotlin") ||
    msg.includes("laravel") ||
    msg.includes("php") ||
    msg.includes("node")
  ) {
    return `**Web & Mobile Application Development**\n\nWe construct high-performance, beautiful, and secure software applications:\n\n- **Web Development**: Responsive platforms built using React.js, Node.js, Laravel, PHP, HTML5, and CSS3.\n- **Mobile App Development**: Scalable native apps (Kotlin, Swift, Java) and cross-platform solutions (Flutter, React Native) for iOS and Android.\n\nDo you have a web or app concept? Let's turn your vision into reality! Let us know your requirements.`;
  }

  // Contact info
  if (
    msg.includes("contact") ||
    msg.includes("phone") ||
    msg.includes("email") ||
    msg.includes("number") ||
    msg.includes("call") ||
    msg.includes("reach") ||
    msg.includes("address") ||
    msg.includes("where") ||
    msg.includes("location") ||
    msg.includes("office")
  ) {
    return `**Contact Techno-Solutions**\n\nWe are here 24/7 to help you with your tech requirements! You can easily connect with us:\n\n- **Phone**: +91 9811841782\n- **Email**: contact@techno-solutions.in\n- **Headquarters**: 218 AGCR Enclave, Near Karkardoma Metro Station, Delhi 110092, India\n- **Online Form**: You can also submit an inquiry directly through our website's **Contact Page**.\n\nWe look forward to partnering with you!`;
  }

  // Process & steps
  if (
    msg.includes("process") ||
    msg.includes("how do you work") ||
    msg.includes("steps") ||
    msg.includes("milestone") ||
    msg.includes("method")
  ) {
    return `**Our 6-Step Development Process**\n\nWe maintain a transparent and structured engineering process:\n\n1. **Business Consultation**: Discussing project ideas and goals.\n2. **Requirement Analysis**: Outlining details and scope specifications.\n3. **Solution Design**: Shaping intuitive wireframes and secure system architecture.\n4. **Implementation & Quality**: Development using premium codebases accompanied by rigorous testing.\n5. **Team Training**: Ensuring a smooth system handover.\n6. **Support & Optimization**: Round-the-clock proactive SLA monitoring.\n\nLet's get started on Step 1 today! Give us a call at **+91 9811841782**.`;
  }

  // Why choose us / benefits
  if (msg.includes("why") || msg.includes("choose") || msg.includes("benefit") || msg.includes("advantage")) {
    return `**Why Choose Techno-Solutions?**\n\n- **Innovation-Focused**: We use future-ready tech stack to keep you ahead.\n- **Expert Teams**: Seasoned Blockchain, AI, and full-stack engineering specialists.\n- **End-to-End Delivery**: Complete support from consulting to deployment and maintenance.\n- **Security & Scalability**: Enterprise-grade performance with zero single-point failures.\n- **Business-Driven Results**: We design technology specifically to align with your business goals.\n\nLet us elevate your technological capabilities today!`;
  }

  // Default Welcoming Assistant message
  return `**Welcome to Techno-Solutions!** 👋\n\nI am your 24/7 digital assistant. I can guide you through our major tech capabilities:\n\n1. **Blockchain & Cryptocurrency Solutions**\n2. **AI & Machine Learning Development**\n3. **Web & Mobile Application Development**\n4. **Smart Home Automation & CCTV Installations**\n5. **Solar Panel setups**\n\nFeel free to ask me anything about our services, office location, process, or contact details. You can also reach our main office directly at **+91 9811841782** or fill out our contact form!`;
}

// Vite middleware setup
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
