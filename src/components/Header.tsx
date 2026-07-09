import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { 
  Menu, X, ArrowRight, Cpu, ChevronDown, Sparkles, 
  Settings, Server, ShieldCheck, Home, Sun, Mail 
} from "lucide-react";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menus on page navigation
  useEffect(() => {
    setIsOpen(false);
    setIsDropdownOpen(false);
    setIsMobileServicesOpen(false);
  }, [location.pathname]);

  // Handle outside clicks to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const services = [
    {
      id: "digital-transformation",
      name: "Digital Transformation",
      desc: "Cloud migration & strategic roadmap",
      icon: <Server className="w-4 h-4 text-[#E5AF2B]" />
    },
    {
      id: "business-automation",
      name: "Business Automation",
      desc: "CRM, ERP & workflow automations",
      icon: <Settings className="w-4 h-4 text-[#E5AF2B]" />
    },
    {
      id: "ai-solutions",
      name: "AI Solutions",
      desc: "Generative AI, LLMs & Smart Agents",
      icon: <Cpu className="w-4 h-4 text-[#E5AF2B]" />
    },
    {
      id: "blockchain-crypto",
      name: "Blockchain & Crypto",
      desc: "Smart contracts & consensus ledgers",
      icon: <ShieldCheck className="w-4 h-4 text-[#E5AF2B]" />
    },
    {
      id: "smart-home",
      name: "Smart Home",
      desc: "IoT secure mesh & biometrics fitting",
      icon: <Home className="w-4 h-4 text-[#E5AF2B]" />
    },
    {
      id: "solar-energy",
      name: "Solar Installation",
      desc: "Commercial rooftop & green telemetry",
      icon: <Sun className="w-4 h-4 text-[#E5AF2B]" />
    }
  ];

  const isLinkActive = (path: string) => {
    if (path === "/" && location.pathname === "/") return true;
    if (path !== "/" && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <motion.header
      id="header-navigation"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled || location.pathname !== "/"
          ? "bg-white/95 backdrop-blur-md shadow-md border-b border-[#ECECEC]/70 py-4" 
          : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-[1320px] mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-[#0F2D63] text-white shadow-lg transition-transform duration-300 group-hover:scale-105">
            <Cpu className="w-5 h-5 text-[#E5AF2B] animate-pulse" />
            <div className="absolute -inset-0.5 rounded-xl border border-[#E5AF2B]/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
          <span className="font-serif font-bold text-lg md:text-xl text-[#0F2D63] tracking-tight whitespace-nowrap">
            TECHNO-SOLUTIONS<span className="text-[#E5AF2B]">.</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8">
          {/* Home Link */}
          <Link
            to="/"
            className={`font-medium text-sm py-1 relative group transition-colors duration-200 ${
              isLinkActive("/") ? "text-[#0F2D63] font-bold" : "text-[#5B6470] hover:text-[#0F2D63]"
            }`}
          >
            Home
            <span className={`absolute bottom-0 left-0 h-[2px] bg-[#E5AF2B] transition-all duration-300 ${
              isLinkActive("/") ? "w-full" : "w-0 group-hover:w-full"
            }`} />
          </Link>

          {/* About Link */}
          <Link
            to="/about"
            className={`font-medium text-sm py-1 relative group transition-colors duration-200 ${
              isLinkActive("/about") ? "text-[#0F2D63] font-bold" : "text-[#5B6470] hover:text-[#0F2D63]"
            }`}
          >
            About Us
            <span className={`absolute bottom-0 left-0 h-[2px] bg-[#E5AF2B] transition-all duration-300 ${
              isLinkActive("/about") ? "w-full" : "w-0 group-hover:w-full"
            }`} />
          </Link>

          {/* Services Dropdown Trigger */}
          <div 
            className="relative" 
            ref={dropdownRef}
            onMouseEnter={() => setIsDropdownOpen(true)}
            onMouseLeave={() => setIsDropdownOpen(false)}
          >
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className={`flex items-center gap-1 font-medium text-sm py-1 transition-colors duration-200 focus:outline-hidden ${
                location.pathname.startsWith("/services") ? "text-[#0F2D63] font-bold" : "text-[#5B6470] hover:text-[#0F2D63]"
              }`}
            >
              <span>Services</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${isDropdownOpen ? "rotate-180" : ""}`} />
            </button>

            {/* Dropdown Card */}
            <AnimatePresence>
              {isDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-[450px] bg-white border border-[#ECECEC] shadow-xl rounded-2xl p-4 grid grid-cols-2 gap-2 text-left z-50"
                >
                  <div className="col-span-2 px-3 pb-2 border-b border-[#F8F9FC] flex justify-between items-center mb-1">
                    <span className="text-[10px] font-bold text-[#5B6470] uppercase tracking-wider">Our Solutions</span>
                    <Sparkles className="w-3.5 h-3.5 text-[#E5AF2B]" />
                  </div>
                  {services.map((srv) => (
                    <Link
                      key={srv.id}
                      to={`/services/${srv.id}`}
                      className="p-2.5 rounded-xl hover:bg-[#F8F9FC] border border-transparent hover:border-[#ECECEC]/30 transition-all flex items-start gap-3 group/item"
                    >
                      <div className="p-2 rounded-lg bg-[#0F2D63]/5 text-[#0F2D63] group-hover/item:bg-[#0F2D63] group-hover/item:text-white transition-all">
                        {srv.icon}
                      </div>
                      <div className="flex flex-col">
                        <span className="text-xs font-bold text-[#1B1B1B] group-hover/item:text-[#0F2D63] transition-colors leading-tight">
                          {srv.name}
                        </span>
                        <span className="text-[10px] text-[#5B6470] mt-0.5 leading-tight">
                          {srv.desc}
                        </span>
                      </div>
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Blog Link */}
          <Link
            to="/blog"
            className={`font-medium text-sm py-1 relative group transition-colors duration-200 ${
              isLinkActive("/blog") ? "text-[#0F2D63] font-bold" : "text-[#5B6470] hover:text-[#0F2D63]"
            }`}
          >
            Blog
            <span className={`absolute bottom-0 left-0 h-[2px] bg-[#E5AF2B] transition-all duration-300 ${
              isLinkActive("/blog") ? "w-full" : "w-0 group-hover:w-full"
            }`} />
          </Link>

          {/* Contact Link */}
          <Link
            to="/contact"
            className={`font-medium text-sm py-1 relative group transition-colors duration-200 ${
              isLinkActive("/contact") ? "text-[#0F2D63] font-bold" : "text-[#5B6470] hover:text-[#0F2D63]"
            }`}
          >
            Contact Us
            <span className={`absolute bottom-0 left-0 h-[2px] bg-[#E5AF2B] transition-all duration-300 ${
              isLinkActive("/contact") ? "w-full" : "w-0 group-hover:w-full"
            }`} />
          </Link>
        </nav>

        {/* CTA Button (Desktop Nav Link to Contact) */}
        <div className="hidden lg:block">
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#0F2D63] text-white font-semibold text-sm transition-all duration-300 hover:bg-[#1a448c] hover:shadow-lg hover:shadow-blue-950/10 active:scale-95 group"
          >
            Book Consultation
            <ArrowRight className="w-4 h-4 text-[#E5AF2B] transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden p-2 rounded-xl text-[#0F2D63] hover:bg-[#F8F9FC] transition-colors"
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-white border-t border-[#ECECEC] overflow-hidden"
          >
            <div className="px-6 py-6 flex flex-col gap-3 text-left">
              {/* Home */}
              <Link
                to="/"
                className="text-[#1B1B1B] font-semibold text-base hover:text-[#0F2D63] py-2.5 transition-colors border-b border-[#F8F9FC]"
              >
                Home
              </Link>

              {/* About */}
              <Link
                to="/about"
                className="text-[#1B1B1B] font-semibold text-base hover:text-[#0F2D63] py-2.5 transition-colors border-b border-[#F8F9FC]"
              >
                About Us
              </Link>

              {/* Services Accordion */}
              <div className="border-b border-[#F8F9FC]">
                <button
                  onClick={() => setIsMobileServicesOpen(!isMobileServicesOpen)}
                  className="w-full flex justify-between items-center text-[#1B1B1B] font-semibold text-base hover:text-[#0F2D63] py-2.5 focus:outline-hidden"
                >
                  <span>Services</span>
                  <ChevronDown className={`w-4 h-4 text-[#5B6470] transition-transform ${isMobileServicesOpen ? "rotate-180" : ""}`} />
                </button>
                <AnimatePresence>
                  {isMobileServicesOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="pl-4 flex flex-col gap-2 pb-3 overflow-hidden"
                    >
                      {services.map((srv) => (
                        <Link
                          key={srv.id}
                          to={`/services/${srv.id}`}
                          className="text-sm font-medium text-[#5B6470] hover:text-[#0F2D63] py-1.5 transition-colors block"
                        >
                          {srv.name}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Blog */}
              <Link
                to="/blog"
                className="text-[#1B1B1B] font-semibold text-base hover:text-[#0F2D63] py-2.5 transition-colors border-b border-[#F8F9FC]"
              >
                Blog
              </Link>

              {/* Contact */}
              <Link
                to="/contact"
                className="text-[#1B1B1B] font-semibold text-base hover:text-[#0F2D63] py-2.5 transition-colors border-b border-[#F8F9FC]"
              >
                Contact Us
              </Link>

              {/* Action */}
              <Link
                to="/contact"
                className="mt-4 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#0F2D63] text-white font-semibold text-sm transition-colors hover:bg-[#1a448c] text-center"
              >
                Book Consultation
                <ArrowRight className="w-4 h-4 text-[#E5AF2B]" />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
