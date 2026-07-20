import React from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { Server, Settings, Cpu, ShieldCheck, Home, Sun, ArrowRight, Sparkles, Bot } from "lucide-react";

export default function ServicesMainPage() {
  const services = [
    {
      id: "digital-transformation",
      path: "/digital-transformation",
      title: "Digital Transformation Solutions",
      desc: "Modernize your organization with digital-first strategies, cloud adoption, and AI integration plans.",
      icon: <Server className="w-6 h-6 text-[#E5AF2B]" />,
      badge: "Strategy & Advisory",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "business-automation",
      path: "/business-automation",
      title: "Business Automation Solutions",
      desc: "Automate repetitive manual processes across departments to increase productivity and reduce costs.",
      icon: <Settings className="w-6 h-6 text-[#E5AF2B]" />,
      badge: "Automation Core",
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "ai-solutions",
      path: "/artificial-intelligence",
      title: "Artificial Intelligence Solutions",
      desc: "Unlock the power of neural engines, Generative AI models, and custom Agentic systems.",
      icon: <Bot className="w-6 h-6 text-[#E5AF2B]" />,
      badge: "Cognitive AI",
      image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "blockchain-crypto",
      path: "/blockchain-solutions",
      title: "Blockchain & Crypto Solutions",
      desc: "Secure, transparent, decentralized ledger integrations, Web3 portals, and audited smart contracts.",
      icon: <ShieldCheck className="w-6 h-6 text-[#E5AF2B]" />,
      badge: "Distributed Web3",
      image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "smart-home",
      path: "/smart-home-installation-services",
      title: "Smart Home Installation",
      desc: "Transform your residential or commercial space into a secure, responsive, intelligent living environment.",
      icon: <Home className="w-6 h-6 text-[#E5AF2B]" />,
      badge: "Intelligent IoT",
      image: "https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "solar-energy",
      path: "/solar-panel-installation",
      title: "Solar Panel Installation",
      desc: "Reduce overhead utility expenses and transition to modern carbon-negative operations.",
      icon: <Sun className="w-6 h-6 text-[#E5AF2B]" />,
      badge: "Clean Tech",
      image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=800&q=80"
    }
  ];

  return (
    <div className="pt-28 pb-20 bg-white">
      {/* Services Hero Section */}
      <section className="relative py-32 bg-[#06183B] text-white overflow-hidden">
        {/* Futuristic dark blue and purple digital landscape of a holographic neural network */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1507668077129-56e32842fceb?auto=format&fit=crop&w=1600&q=80" 
            alt="Futuristic cyber technology network background" 
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover opacity-25 mix-blend-screen scale-105"
          />
          {/* Glowing blue and purple ambient overlay */}
          <div className="absolute inset-0 bg-gradient-to-tr from-[#06183B] via-[#0A224E]/90 to-[#2A0E4E]/80 mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#06183B]/50 to-white" />
        </div>

        {/* High-tech subtle grid lines */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(229,175,43,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(229,175,43,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] z-0" />
        <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl -translate-y-1/2 -z-10" />
        <div className="absolute top-1/3 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl -z-10" />

        <div className="max-w-[1320px] mx-auto px-6 relative z-10 text-center flex flex-col items-center gap-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/15 text-xs text-[#E5AF2B] font-semibold tracking-wide uppercase">
            <Sparkles className="w-3.5 h-3.5 animate-spin" />
            <span>OUR SOLUTIONS</span>
          </div>
          <h1 className="font-serif text-4xl md:text-6xl font-bold tracking-tight">
            Our Comprehensive Technology Solutions
          </h1>
          <p className="text-white/80 text-lg md:text-xl max-w-3xl leading-relaxed mt-2">
            Techno-Solutions offers high-performance digital architectures, intelligent automation systems, and state-of-the-art clean energy integrations tailored for your operations.
          </p>
        </div>
      </section>

      {/* Services Grid Section */}
      <section className="py-20 max-w-[1320px] mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ 
                y: -10, 
                boxShadow: "0 20px 40px rgba(15, 45, 99, 0.08)",
                borderColor: "rgba(15, 45, 99, 0.15)"
              }}
              className="bg-white rounded-[24px] p-6 border border-[#ECECEC] flex flex-col justify-between transition-all duration-300 group cursor-pointer"
            >
              <div>
                {/* Image header with relative badge */}
                <div className="relative w-full h-44 rounded-xl overflow-hidden mb-6">
                  <img
                    src={service.image}
                    alt={service.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-[#0F2D63]/20 mix-blend-multiply" />
                  <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-xs text-[#0F2D63] text-[10px] font-bold px-2.5 py-1 rounded-full shadow-xs">
                    {service.badge}
                  </span>
                </div>

                {/* Service Icon and Title */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2.5 rounded-xl bg-[#0F2D63]/5 text-[#0F2D63] transition-colors duration-300 group-hover:bg-[#0F2D63] group-hover:text-white">
                    {service.icon}
                  </div>
                  <h3 className="font-serif font-bold text-lg text-[#1B1B1B] group-hover:text-[#0F2D63] transition-colors duration-300">
                    {service.title}
                  </h3>
                </div>

                {/* Brief description */}
                <p className="text-[#5B6470] text-sm leading-relaxed mb-6 text-left">
                  {service.desc}
                </p>
              </div>

              {/* Action Link */}
              <Link 
                to={service.path}
                className="w-full inline-flex items-center justify-between text-xs font-semibold text-[#0F2D63] group-hover:text-[#E5AF2B] transition-colors mt-auto pt-4 border-t border-[#F8F9FC]"
              >
                Learn More
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
