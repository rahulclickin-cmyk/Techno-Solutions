import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { SERVICES } from "../data";
import { ServiceItem } from "../types";
import { Monitor, Database, Settings, Home, Sun, Cpu, ArrowRight, CheckCircle, Sparkles, X, Bot } from "lucide-react";

export default function ServicesGrid() {
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);

  // Map icon name string to Lucide React components
  const renderIcon = (name: string, className: string = "w-6 h-6") => {
    switch (name) {
      case "Monitor":
        return <Monitor className={className} />;
      case "Database":
        return <Database className={className} />;
      case "Settings":
        return <Settings className={className} />;
      case "Home":
        return <Home className={className} />;
      case "Sun":
        return <Sun className={className} />;
      case "Cpu":
        return <Bot className={className} />;
      default:
        return <Monitor className={className} />;
    }
  };

  const navigate = useNavigate();

  const getServicePath = (id: string) => {
    switch (id) {
      case "digital-transformation": return "/digital-transformation";
      case "business-automation": return "/business-automation";
      case "ai-solutions": return "/artificial-intelligence";
      case "blockchain-crypto": return "/blockchain-solutions";
      case "smart-home": return "/smart-home-installation-services";
      case "solar-energy": return "/solar-panel-installation";
      default: return `/services/${id}`;
    }
  };

  return (
    <section id="services" className="py-24 bg-[#F8F9FC] relative overflow-hidden">
      {/* Background accents */}
      <div className="absolute top-0 right-1/4 w-80 h-80 bg-blue-50 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-amber-50/50 rounded-full blur-3xl -z-10" />

      <div className="max-w-[1320px] mx-auto px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 flex flex-col gap-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E5AF2B]/10 border border-[#E5AF2B]/20 text-[#0F2D63] text-xs font-bold tracking-wider uppercase self-center">
            <Sparkles className="w-3.5 h-3.5 text-[#E5AF2B]" />
            <span>OUR SERVICES</span>
          </div>
          <h2 className="font-serif text-3xl md:text-5xl font-bold text-[#1B1B1B] leading-tight">
            Intelligent Solutions for Modern Organizations
          </h2>
          <p className="text-[#5B6470] text-lg">
            We deliver innovative technologies to improve efficiency, reduce costs, and accelerate sustainable digital transformation.
          </p>
        </div>

        {/* 3-Column Balanced Grid with hover-lift */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES.map((service, index) => (
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
              className="bg-white rounded-[20px] p-6 border border-[#ECECEC] flex flex-col justify-between transition-all duration-300 group cursor-pointer h-full"
              onClick={() => navigate(getServicePath(service.id))}
            >
              <div>
                {/* Image header with relative badge */}
                <div className="relative w-full h-32 rounded-xl overflow-hidden mb-6">
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
                    {renderIcon(service.iconName, "w-5 h-5")}
                  </div>
                  <h3 className="font-serif font-bold text-base text-[#1B1B1B] group-hover:text-[#0F2D63] transition-colors duration-300">
                    {service.title}
                  </h3>
                </div>

                {/* Brief description */}
                <p className="text-[#5B6470] text-xs leading-relaxed mb-6">
                  {service.description}
                </p>
              </div>

              {/* Action Button */}
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(getServicePath(service.id));
                }}
                className="w-full inline-flex items-center justify-between text-xs font-semibold text-[#0F2D63] group-hover:text-[#E5AF2B] transition-colors mt-auto pt-4 border-t border-[#F8F9FC]"
              >
                Learn More
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Pop-up Interactive Modal to see Full Enterprise Description */}
      <AnimatePresence>
        {selectedService && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedService(null)}
              className="absolute inset-0 bg-slate-950/60 backdrop-blur-xs"
            />

            {/* Modal Body */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="relative w-full max-w-3xl bg-white rounded-3xl overflow-hidden shadow-2xl z-10 grid grid-cols-1 md:grid-cols-12"
            >
              {/* Left Column: Visual Image */}
              <div className="md:col-span-5 relative h-48 md:h-full bg-slate-900">
                <img
                  src={selectedService.image}
                  alt={selectedService.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-[#0F2D63]/80 via-[#0F2D63]/50 to-transparent" />
                <div className="absolute bottom-6 left-6 text-white text-left">
                  <span className="text-[10px] tracking-wider bg-[#E5AF2B] text-slate-950 font-bold px-3 py-1 rounded-full uppercase">
                    {selectedService.badge}
                  </span>
                  <h4 className="font-serif font-bold text-xl mt-3">{selectedService.title}</h4>
                </div>
              </div>

              {/* Right Column: Detailed Contents */}
              <div className="md:col-span-7 p-8 flex flex-col justify-between text-left">
                {/* Close Button */}
                <button
                  onClick={() => setSelectedService(null)}
                  className="absolute top-4 right-4 p-2 rounded-full hover:bg-slate-100 transition-colors text-slate-400 hover:text-slate-700"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>

                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2.5 rounded-xl bg-[#0F2D63] text-white">
                      {renderIcon(selectedService.iconName, "w-5 h-5")}
                    </div>
                    <span className="text-xs font-semibold text-[#0F2D63] tracking-wide uppercase">Core Architecture details</span>
                  </div>

                  <p className="text-[#1B1B1B] text-sm font-medium mb-4 leading-relaxed">
                    {selectedService.longDescription}
                  </p>

                  <h5 className="text-xs font-bold text-[#0F2D63] uppercase tracking-wider mb-3">Enterprise Features & SLAs:</h5>
                  <ul className="space-y-2.5 mb-6">
                    {selectedService.details.map((detail, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs text-[#5B6470] leading-normal">
                        <CheckCircle className="w-4 h-4 text-[#E5AF2B] shrink-0 mt-0.5" />
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex justify-end pt-4 border-t border-[#ECECEC] gap-3">
                  <button
                    onClick={() => setSelectedService(null)}
                    className="px-5 py-2.5 rounded-xl border border-[#ECECEC] text-[#5B6470] text-xs font-semibold hover:bg-slate-50 transition-all active:scale-95"
                  >
                    Close Panel
                  </button>
                  <a
                    href="#contact"
                    onClick={() => setSelectedService(null)}
                    className="px-5 py-2.5 rounded-xl bg-[#0F2D63] text-white text-xs font-semibold hover:bg-[#1a448c] flex items-center gap-1.5 transition-all active:scale-95"
                  >
                    Discuss Deployment
                    <ArrowRight className="w-3.5 h-3.5 text-[#E5AF2B]" />
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
