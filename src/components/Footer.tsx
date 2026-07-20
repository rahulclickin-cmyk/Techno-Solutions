import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Cpu, Phone, Mail, MapPin, Facebook, Linkedin, Instagram, Youtube, ArrowRight, CheckCircle } from "lucide-react";

export default function Footer() {
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    setSubscribed(true);
    setNewsletterEmail("");
  };

  const currentYear = new Date().getFullYear();

  const servicesLinks = [
    { name: "Digital Transformation", path: "/digital-transformation" },
    { name: "Business Automation", path: "/business-automation" },
    { name: "AI Solutions", path: "/artificial-intelligence" },
    { name: "Blockchain & Crypto", path: "/blockchain-solutions" },
    { name: "Smart Home", path: "/smart-home-installation-services" },
    { name: "Solar Installation", path: "/solar-panel-installation" }
  ];

  return (
    <footer className="bg-[#0F2D63] text-white pt-20 pb-10 border-t border-white/10 relative overflow-hidden">
      {/* Footer background sparkles */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-blue-900/30 rounded-full blur-3xl -z-10" />

      <div className="max-w-[1320px] mx-auto px-6">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16 border-b border-white/10">
          
          {/* Column 1: Brand Info */}
          <div className="lg:col-span-4 flex flex-col items-start gap-6 text-left">
            <Link to="/" className="flex items-center gap-3 group transition-transform duration-300 hover:scale-[1.03] active:scale-95">
              <div className="relative flex items-center justify-center h-18 px-6 rounded-2xl bg-[#06183B] shadow-md border border-white/15">
                <img 
                  src="https://lh3.googleusercontent.com/d/1K1FUxdlG_9p-DY3utDu7pqDkR670Ekt_" 
                  alt="Techno Solutions Footer Logo" 
                  className="h-13 md:h-15 w-auto object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>
            </Link>

            <p className="text-white/60 text-xs leading-relaxed max-w-sm">
              An elite technology partner offering custom-engineered business automation, enterprise cloud systems, digital transformation, secure Web3 blockchain consensus, and high-conversion solar energy grids.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-3">
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-white/5 border border-white/10 text-white/70 hover:text-[#E5AF2B] hover:bg-white/10 transition-all" aria-label="LinkedIn">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-white/5 border border-white/10 text-white/70 hover:text-[#E5AF2B] hover:bg-white/10 transition-all" aria-label="Facebook">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-white/5 border border-white/10 text-white/70 hover:text-[#E5AF2B] hover:bg-white/10 transition-all" aria-label="Instagram">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-white/5 border border-white/10 text-white/70 hover:text-[#E5AF2B] hover:bg-white/10 transition-all" aria-label="YouTube">
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="lg:col-span-2 text-left">
            <h3 className="font-serif font-bold text-sm tracking-wider uppercase mb-6 text-[#E5AF2B]">Quick Links</h3>
            <ul className="flex flex-col gap-3 text-xs text-white/60">
              <li>
                <Link to="/" className="hover:text-white transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white transition-colors">About Us</Link>
              </li>
              <li>
                <Link to="/blog" className="hover:text-white transition-colors">Blog</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white transition-colors">Contact</Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Services Sub-links */}
          <div className="lg:col-span-3 text-left">
            <h3 className="font-serif font-bold text-sm tracking-wider uppercase mb-6 text-[#E5AF2B]">Our Services</h3>
            <ul className="flex flex-col gap-3 text-xs text-white/60">
              {servicesLinks.map((sl) => (
                <li key={sl.path}>
                  <Link to={sl.path} className="hover:text-white transition-colors">{sl.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact Parameters (Sanjeev Goel, Noida / Delhi) */}
          <div className="lg:col-span-3 text-left flex flex-col gap-4">
            <h3 className="font-serif font-bold text-sm tracking-wider uppercase text-[#E5AF2B]">Contact Desk</h3>
            <div className="text-white/80 font-bold text-xs">Sanjeev Goel</div>
            <ul className="flex flex-col gap-4 text-xs text-white/60">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#E5AF2B] shrink-0" />
                <span>218 AGCR Enclave, Near Karkardoma Metro Station, Delhi 110092 | India</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-[#E5AF2B] shrink-0" />
                <a href="tel:+919811841782" className="hover:text-white transition-colors">+91 9811841782</a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-[#E5AF2B] shrink-0" />
                <a href="mailto:mail@techno-solutions.tech" className="hover:text-white transition-colors">mail@techno-solutions.tech</a>
              </li>
            </ul>
          </div>

        </div>

        {/* Lower Footer Area */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/40">
          <div>
            <p>© {currentYear} Techno-Solutions. All Rights Reserved.</p>
            <p className="mt-1 text-[11px] text-white/35">Website designed & developed by <span className="text-[#E5AF2B] font-medium">Clickin DMA by Rahul Singh</span></p>
          </div>
          <div className="flex items-center gap-6">
            <Link to="/contact" className="hover:text-white transition-colors">SLA Assurance</Link>
            <Link to="/contact" className="hover:text-white transition-colors">Privacy Shield</Link>
            <Link to="/contact" className="hover:text-white transition-colors">Terms of Node Deployment</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
