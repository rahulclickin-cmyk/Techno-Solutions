import React from "react";
import { motion } from "motion/react";
import { ArrowRight, Sparkles, Cpu, Settings, Server, ShieldCheck, Home, Sun } from "lucide-react";

export default function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { y: 25, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100, damping: 15 }
    }
  };

  return (
    <section id="home" className="relative min-h-screen pt-36 pb-20 flex items-center bg-gradient-to-br from-[#06183B] via-[#0A224E] to-[#113069] text-white overflow-hidden">
      {/* Decorative Glowing Background Gradients */}
      <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-3xl -z-10 pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-[600px] h-[600px] bg-amber-500/10 rounded-full blur-3xl -z-10 pointer-events-none" />
      
      {/* High-tech subtle cybergrid background pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(229,175,43,0.025)_1px,transparent_1px),linear-gradient(to_bottom,rgba(229,175,43,0.025)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] -z-10 pointer-events-none" />

      <div className="max-w-[1320px] mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
        {/* Left-Side Contents */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="lg:col-span-7 flex flex-col gap-6 text-left"
        >
          {/* Subtle Accent Gold Sparkle Badge */}
          <motion.div variants={itemVariants} className="inline-flex">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/12 text-xs text-[#E5AF2B] font-semibold tracking-wider font-mono uppercase">
              <Sparkles className="w-3.5 h-3.5 text-[#E5AF2B] animate-pulse" />
              <span>TRANSFORM YOUR BUSINESS</span>
            </div>
          </motion.div>

          {/* Majestic Hero Primary Heading */}
          <motion.h1 
            variants={itemVariants}
            className="font-serif text-4xl sm:text-5xl md:text-[54px] text-white font-extrabold leading-[1.12] tracking-tight"
          >
            Digital Transformation Consulting and Training
          </motion.h1>

          {/* Subheading */}
          <motion.h2 
            variants={itemVariants}
            className="font-sans text-xl sm:text-2xl text-[#E5AF2B] font-semibold tracking-wide"
          >
            Transform Your Business with Intelligent Digital Solutions
          </motion.h2>

          {/* Primary Text */}
          <motion.p 
            variants={itemVariants}
            className="text-white/85 text-base md:text-lg leading-relaxed max-w-2xl font-sans"
          >
            At Techno-Solutions, we help businesses modernize, automate, and grow using cutting-edge technologies. Whether you are a startup, SME, enterprise, educational institution, or government organization, we deliver innovative solutions that improve efficiency, reduce costs, and accelerate digital transformation.
          </motion.p>

          {/* Supportive Subtext */}
          <motion.p 
            variants={itemVariants}
            className="text-white/60 text-xs sm:text-sm font-mono tracking-wide leading-relaxed border-l-2 border-[#E5AF2B]/40 pl-4 max-w-xl"
          >
            Digital Transformation | Business Automation | Artificial Intelligence | Blockchain & Crypto | Smart Home Installation | Solar Panel Installation
          </motion.p>

          {/* Action Buttons */}
          <motion.div 
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mt-2"
          >
            <a
              href="#contact"
              className="px-8 py-4 rounded-xl bg-[#E5AF2B] text-[#06183B] font-bold text-base transition-all duration-300 hover:bg-amber-400 hover:shadow-lg hover:shadow-amber-500/15 active:scale-97 text-center flex items-center justify-center gap-2 group"
            >
              Book a Free Consultation
              <ArrowRight className="w-4 h-4 text-[#06183B] transition-transform duration-300 group-hover:translate-x-1" />
            </a>
            <a
              href="#services"
              className="px-8 py-4 rounded-xl bg-white/5 text-white border border-white/15 font-semibold text-base transition-all duration-300 hover:bg-white/10 hover:border-white/30 active:scale-97 text-center flex items-center justify-center gap-2"
            >
              Explore Our Services
            </a>
          </motion.div>

          {/* Brand/Trust Section */}
          <motion.div 
            variants={itemVariants}
            className="pt-6 mt-4 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center gap-4"
          >
            <span className="text-[10px] text-white/50 font-semibold tracking-wider uppercase font-mono">TRUSTED BY LEADING BRANDS:</span>
            <div className="flex flex-wrap items-center gap-6 text-white/40 font-bold font-serif text-xs">
              <span className="hover:text-white transition-colors">VORTEX CORP</span>
              <span className="hover:text-white transition-colors">APEX LOGICS</span>
              <span className="hover:text-white transition-colors">INNOVA SMART</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Right-Side Image with Continuous Floating Animation */}
        <div className="lg:col-span-5 relative flex items-center justify-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.75, ease: "easeOut" }}
            className="relative w-full max-w-[460px] aspect-square"
          >
            {/* Glowing Center Core */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-tr from-[#E5AF2B]/15 to-blue-500/15 rounded-full blur-3xl pointer-events-none" />

            {/* Premium Animated Glass Card Wrapping the Image */}
            <motion.div 
              animate={{ y: [0, -15, 0] }}
              transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
              className="absolute inset-2 rounded-3xl bg-white/5 backdrop-blur-md border border-white/15 p-3.5 shadow-[0_25px_60px_rgba(0,0,0,0.35)] overflow-hidden flex items-center justify-center group"
            >
              {/* Inner Glossy Light Glow Effect */}
              <div className="absolute -inset-x-20 top-0 h-40 bg-gradient-to-b from-white/10 to-transparent -rotate-12 transform pointer-events-none group-hover:translate-y-full transition-transform duration-1000" />

              <div className="relative w-full h-full rounded-2xl overflow-hidden border border-white/10 shadow-inner">
                <img 
                  src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80" 
                  alt="Digital Transformation Consulting & Training" 
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                
                {/* Dark Vignette Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#06183B]/80 via-transparent to-transparent pointer-events-none" />

                {/* Micro Tech HUD Label */}
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between bg-black/40 backdrop-blur-md rounded-xl p-3 border border-white/10">
                  <div className="flex items-center gap-2.5">
                    <div className="p-1.5 rounded-lg bg-[#E5AF2B]/20 text-[#E5AF2B]">
                      <Cpu className="w-4 h-4" />
                    </div>
                    <div className="text-left">
                      <p className="text-[9px] uppercase tracking-wider font-semibold text-white/50 font-mono">SYSTEM METRICS</p>
                      <p className="font-serif font-bold text-[11px] text-white">Techno-Solutions Core</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono text-[#E5AF2B] font-semibold bg-[#E5AF2B]/10 px-2 py-0.5 rounded border border-[#E5AF2B]/20">
                    ACTIVE
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Mini Floating Tech Icon Accent 1 */}
            <motion.div
              animate={{ y: [0, 8, 0], x: [0, -4, 0] }}
              transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut" }}
              className="absolute -top-4 left-6 p-2.5 rounded-xl bg-[#0A224E]/90 border border-white/12 shadow-lg flex items-center gap-2.5 backdrop-blur-sm pointer-events-none"
            >
              <div className="p-1.5 rounded-lg bg-[#E5AF2B]/15 text-[#E5AF2B]">
                <Settings className="w-4 h-4 animate-spin-slow" />
              </div>
              <div className="text-left pr-1.5">
                <p className="text-[9px] text-white/50 font-bold font-mono">AUTOMATE</p>
                <p className="text-[11px] font-bold text-white">Workflows</p>
              </div>
            </motion.div>

            {/* Mini Floating Tech Icon Accent 2 */}
            <motion.div
              animate={{ y: [0, -10, 0], x: [0, 6, 0] }}
              transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 0.5 }}
              className="absolute top-28 -right-4 p-2.5 rounded-xl bg-[#0A224E]/90 border border-white/12 shadow-lg flex items-center gap-2.5 backdrop-blur-sm pointer-events-none"
            >
              <div className="p-1.5 rounded-lg bg-emerald-500/15 text-emerald-400">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div className="text-left pr-1.5">
                <p className="text-[9px] text-white/50 font-bold font-mono">SECURITY</p>
                <p className="text-[11px] font-bold text-white">Smart Nodes</p>
              </div>
            </motion.div>

            {/* Mini Floating Tech Icon Accent 3 */}
            <motion.div
              animate={{ y: [0, 6, 0], x: [0, 5, 0] }}
              transition={{ repeat: Infinity, duration: 5.5, ease: "easeInOut", delay: 1 }}
              className="absolute bottom-8 -left-4 p-2.5 rounded-xl bg-[#0A224E]/90 border border-white/12 shadow-lg flex items-center gap-2.5 backdrop-blur-sm pointer-events-none"
            >
              <div className="p-1.5 rounded-lg bg-amber-500/15 text-amber-400">
                <Sun className="w-4 h-4" />
              </div>
              <div className="text-left pr-1.5">
                <p className="text-[9px] text-white/50 font-bold font-mono">ENERGY</p>
                <p className="text-[11px] font-bold text-white">Solar Grid</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
