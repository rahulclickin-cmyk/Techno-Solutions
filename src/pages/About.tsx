import React from "react";
import { motion } from "motion/react";
import { Shield, Target, Eye, Award, Clock, Users, Mail, Phone, MapPin, Sparkles } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="pt-28 pb-20 bg-white">
      {/* Page Header Banner */}
      <section className="relative py-20 bg-gradient-to-br from-[#06183B] via-[#0A224E] to-[#113069] text-white overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(229,175,43,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(229,175,43,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem]" />
        <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl -translate-y-1/2 -z-10" />
        <div className="absolute top-1/3 right-10 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl -z-10" />

        <div className="max-w-[1320px] mx-auto px-6 relative text-center flex flex-col items-center gap-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/15 text-xs text-[#E5AF2B] font-semibold tracking-wide uppercase">
            <Sparkles className="w-3.5 h-3.5 animate-spin" />
            <span>WHO WE ARE</span>
          </div>
          <h1 className="font-serif text-4xl md:text-6xl font-bold tracking-tight">
            About Techno-Solutions
          </h1>
          <p className="text-white/80 text-lg md:text-xl max-w-2xl leading-relaxed">
            Your Trusted Technology Partner in driving world-class Digital Transformation & Business Automation.
          </p>
        </div>
      </section>

      {/* Core Company Intro */}
      <section className="py-20 max-w-[1320px] mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          {/* Left Column: text */}
          <div className="lg:col-span-7 flex flex-col gap-6 text-left">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#1B1B1B] leading-tight">
              Empowering Enterprises with Intelligence & Performance
            </h2>
            <p className="text-[#5B6470] text-base md:text-lg leading-relaxed">
              Techno-Solutions is a leading Digital Transformation company helping organizations embrace the future through intelligent technology solutions. We specialize in designing robust, scalable ecosystems that optimize manual overhead and automate complex architectures.
            </p>
            <p className="text-[#5B6470] text-base leading-relaxed">
              We combine business consulting, automation, Artificial Intelligence, blockchain technologies, IoT, renewable energy, and smart infrastructure to deliver measurable business outcomes. Whether you are a startup, SME, enterprise, educational institution, or government organization, we deliver innovative solutions that improve efficiency, reduce costs, and accelerate digital transformation.
            </p>

            <div className="bg-[#F8F9FC] border-l-4 border-[#E5AF2B] p-6 rounded-r-2xl my-4">
              <h4 className="font-serif font-bold text-lg text-[#0F2D63] mb-2">Our Mission</h4>
              <p className="text-[#5B6470] text-base italic leading-relaxed">
                "Our mission is simple: Helping organizations become faster, smarter, and more profitable through technology."
              </p>
            </div>
          </div>

          {/* Right Column: Visual / Details cards */}
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-[#F8F9FC] border border-[#ECECEC] flex flex-col gap-3 text-left">
              <div className="w-10 h-10 rounded-xl bg-[#0F2D63]/5 text-[#0F2D63] flex items-center justify-center">
                <Shield className="w-5 h-5 text-[#E5AF2B]" />
              </div>
              <h3 className="font-serif font-bold text-base text-[#1B1B1B]">Security-First</h3>
              <p className="text-xs text-[#5B6470] leading-relaxed">
                Military-grade security and robust architecture incorporated inside every line of custom code.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#F8F9FC] border border-[#ECECEC] flex flex-col gap-3 text-left">
              <div className="w-10 h-10 rounded-xl bg-[#0F2D63]/5 text-[#0F2D63] flex items-center justify-center">
                <Target className="w-5 h-5 text-[#E5AF2B]" />
              </div>
              <h3 className="font-serif font-bold text-base text-[#1B1B1B]">Result Oriented</h3>
              <p className="text-xs text-[#5B6470] leading-relaxed">
                We design within direct client budget boundaries to provide realistic and tangible returns.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#F8F9FC] border border-[#ECECEC] flex flex-col gap-3 text-left">
              <div className="w-10 h-10 rounded-xl bg-[#0F2D63]/5 text-[#0F2D63] flex items-center justify-center">
                <Eye className="w-5 h-5 text-[#E5AF2B]" />
              </div>
              <h3 className="font-serif font-bold text-base text-[#1B1B1B]">Forward Vision</h3>
              <p className="text-xs text-[#5B6470] leading-relaxed">
                Continuous upskilling with Generative AI, blockchain, and high-efficiency clean energy models.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#F8F9FC] border border-[#ECECEC] flex flex-col gap-3 text-left">
              <div className="w-10 h-10 rounded-xl bg-[#0F2D63]/5 text-[#0F2D63] flex items-center justify-center">
                <Users className="w-5 h-5 text-[#E5AF2B]" />
              </div>
              <h3 className="font-serif font-bold text-base text-[#1B1B1B]">Client Partnership</h3>
              <p className="text-xs text-[#5B6470] leading-relaxed">
                SLA-backed 24/7 client desk and hands-on corporate onboarding models.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership & Corporate Hub Section */}
      <section className="py-20 bg-[#F8F9FC]">
        <div className="max-w-[1320px] mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16 flex flex-col gap-4">
            <span className="text-xs font-bold text-[#0F2D63] tracking-wider uppercase">OUR LEADERSHIP</span>
            <h2 className="font-serif text-3xl md:text-5xl font-bold text-[#1B1B1B] leading-tight">
              Guided by Industry Veterans
            </h2>
            <p className="text-[#5B6470] text-base">
              Our steering committee and technology architects bring decades of combined industrial experience to your operations.
            </p>
          </div>

          <div className="max-w-xl mx-auto bg-white rounded-3xl border border-[#ECECEC] p-8 shadow-sm text-center flex flex-col items-center gap-6 group hover:shadow-md transition-all">
            <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-[#0F2D63]/10 group-hover:border-[#E5AF2B]/40 transition-all duration-300">
              <img 
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=300&q=80" 
                alt="Sanjeev Goel" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-col gap-1">
              <h3 className="font-serif font-bold text-2xl text-[#1B1B1B]">Sanjeev Goel</h3>
              <p className="text-sm font-semibold text-[#0F2D63] uppercase tracking-wider">Founder & Chief Consultant</p>
              <p className="text-xs text-[#5B6470] mt-2 max-w-sm">
                Sanjeev Goel guides digital strategies, renewable solar designs, and enterprise systems implementation across regional branches.
              </p>
            </div>

            <div className="w-full pt-6 border-t border-[#ECECEC] grid grid-cols-1 gap-4 text-left">
              <div className="flex items-center gap-3 text-xs text-[#5B6470]">
                <MapPin className="w-4 h-4 text-[#E5AF2B] shrink-0" />
                <span>218 AGCR Enclave, Near Karkardoma Metro Station, Delhi 110092 | India</span>
              </div>
              <div className="flex items-center gap-3 text-xs text-[#5B6470]">
                <Phone className="w-4 h-4 text-[#E5AF2B] shrink-0" />
                <span>+91 9811841782</span>
              </div>
              <div className="flex items-center gap-3 text-xs text-[#5B6470]">
                <Mail className="w-4 h-4 text-[#E5AF2B] shrink-0" />
                <span>info2sanjeev@gmail.com</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
