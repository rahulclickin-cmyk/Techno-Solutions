import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Mail, Phone, MapPin, Send, CheckCircle, Clock, ShieldCheck, UserCheck, Sparkles, Building2, User } from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1200);
  };

  return (
    <div className="pt-28 pb-20 bg-white">
      {/* Contact Page Header */}
      <section className="relative py-20 bg-gradient-to-br from-[#06183B] via-[#0A224E] to-[#113069] text-white overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(229,175,43,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(229,175,43,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem]" />
        <div className="absolute top-10 right-20 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl -z-10" />

        <div className="max-w-[1320px] mx-auto px-6 relative text-center flex flex-col items-center gap-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/15 text-xs text-[#E5AF2B] font-semibold tracking-wide uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            <span>DISCOVERY DESK</span>
          </div>
          <h1 className="font-serif text-4xl md:text-6xl font-bold tracking-tight">
            Get In Touch
          </h1>
          <p className="text-white/80 text-lg md:text-xl max-w-2xl leading-relaxed">
            Contact Sanjeev Goel and our expert consultants today to design a tailored business solution blueprint.
          </p>
        </div>
      </section>

      {/* Main Form and details grid */}
      <section className="py-20 max-w-[1320px] mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          {/* Left Column: contact information cards */}
          <div className="lg:col-span-5 flex flex-col gap-8 text-left">
            <div className="flex flex-col gap-3">
              <span className="text-xs font-bold text-[#0F2D63] tracking-widest uppercase">OUR HEADQUARTERS</span>
              <h2 className="font-serif text-3xl font-bold text-[#1B1B1B] leading-tight">
                Connect Directly with Sanjeev Goel
              </h2>
              <p className="text-[#5B6470] text-sm leading-relaxed">
                We design within your strategic budget requirements. Reach out directly for project audits, smart home installation consultation, solar net-metering reviews, or cognitive workflow automations.
              </p>
            </div>

            {/* Direct Cards */}
            <div className="flex flex-col gap-5">
              {/* Contact Person */}
              <div className="p-6 rounded-2xl bg-[#F8F9FC] border border-[#ECECEC] flex items-start gap-4">
                <div className="p-3.5 rounded-xl bg-white text-[#0F2D63] border border-[#ECECEC]">
                  <User className="w-5 h-5 text-[#E5AF2B]" />
                </div>
                <div>
                  <h4 className="text-[10px] font-bold text-[#5B6470] uppercase tracking-wider">Contact Person</h4>
                  <p className="text-base font-bold text-[#1B1B1B] mt-0.5">Sanjeev Goel</p>
                  <p className="text-xs text-[#5B6470] mt-0.5">Founder & Digital Strategist</p>
                </div>
              </div>

              {/* Office Address */}
              <div className="p-6 rounded-2xl bg-[#F8F9FC] border border-[#ECECEC] flex items-start gap-4">
                <div className="p-3.5 rounded-xl bg-white text-[#0F2D63] border border-[#ECECEC]">
                  <MapPin className="w-5 h-5 text-[#E5AF2B]" />
                </div>
                <div>
                  <h4 className="text-[10px] font-bold text-[#5B6470] uppercase tracking-wider">Office Address</h4>
                  <p className="text-sm font-semibold text-[#1B1B1B] mt-1 leading-relaxed">
                    218 AGCR Enclave,<br />
                    Near Karkardoma Metro Station,<br />
                    Delhi 110092 | India
                  </p>
                </div>
              </div>

              {/* Call Number */}
              <div className="p-6 rounded-2xl bg-[#F8F9FC] border border-[#ECECEC] flex items-start gap-4">
                <div className="p-3.5 rounded-xl bg-white text-[#0F2D63] border border-[#ECECEC]">
                  <Phone className="w-5 h-5 text-[#E5AF2B]" />
                </div>
                <div>
                  <h4 className="text-[10px] font-bold text-[#5B6470] uppercase tracking-wider">Mobile Number</h4>
                  <a href="tel:+919811841782" className="text-base font-bold text-[#0F2D63] hover:text-[#E5AF2B] transition-colors block mt-0.5">
                    +91 9811841782
                  </a>
                </div>
              </div>

              {/* Email Address */}
              <div className="p-6 rounded-2xl bg-[#F8F9FC] border border-[#ECECEC] flex items-start gap-4">
                <div className="p-3.5 rounded-xl bg-white text-[#0F2D63] border border-[#ECECEC]">
                  <Mail className="w-5 h-5 text-[#E5AF2B]" />
                </div>
                <div>
                  <h4 className="text-[10px] font-bold text-[#5B6470] uppercase tracking-wider">Direct Email</h4>
                  <a href="mailto:info2sanjeev@gmail.com" className="text-base font-bold text-[#0F2D63] hover:text-[#E5AF2B] transition-colors block mt-0.5">
                    info2sanjeev@gmail.com
                  </a>
                </div>
              </div>
            </div>

            {/* Direct Assurance Badges */}
            <div className="p-6 rounded-2xl border border-dashed border-[#ECECEC] flex flex-col gap-3">
              <div className="flex items-center gap-2 text-xs font-bold text-[#1B1B1B]">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                <span>Response SLA Guarantee</span>
              </div>
              <p className="text-xs text-[#5B6470] leading-relaxed">
                All digital inquiries are directly routed to Sanjeev Goel's consultancy queue and processed with a guaranteed deep-discovery call within 24 working hours.
              </p>
            </div>
          </div>

          {/* Right Column: Contact form container */}
          <div className="lg:col-span-7 bg-white border border-[#ECECEC] rounded-[32px] p-8 md:p-10 shadow-xs text-left">
            <AnimatePresence mode="wait">
              {!submitted ? (
                <motion.form
                  key="contact-form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="flex flex-col gap-6"
                >
                  <div className="flex flex-col gap-1.5">
                    <h3 className="font-serif font-bold text-2xl text-[#1B1B1B]">Submit Your Project Parameters</h3>
                    <p className="text-xs text-[#5B6470]">
                      All submit fields are encrypted directly in compliance with security guidelines.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Name input */}
                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-bold text-[#1B1B1B] uppercase tracking-wider">Your Name *</label>
                      <input
                        required
                        type="text"
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-[#F8F9FC] border border-[#ECECEC] text-sm focus:outline-hidden focus:border-[#0F2D63] focus:ring-1 focus:ring-[#0F2D63] transition-all"
                      />
                    </div>

                    {/* Email input */}
                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-bold text-[#1B1B1B] uppercase tracking-wider">Your Email *</label>
                      <input
                        required
                        type="email"
                        placeholder="johndoe@gmail.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-[#F8F9FC] border border-[#ECECEC] text-sm focus:outline-hidden focus:border-[#0F2D63] focus:ring-1 focus:ring-[#0F2D63] transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Phone Input */}
                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-bold text-[#1B1B1B] uppercase tracking-wider">Phone Number</label>
                      <input
                        type="tel"
                        placeholder="+91 98765 43210"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-[#F8F9FC] border border-[#ECECEC] text-sm focus:outline-hidden focus:border-[#0F2D63] focus:ring-1 focus:ring-[#0F2D63] transition-all"
                      />
                    </div>

                    {/* Subject Input */}
                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-bold text-[#1B1B1B] uppercase tracking-wider">Subject</label>
                      <input
                        type="text"
                        placeholder="Business Automation Inquiry"
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-[#F8F9FC] border border-[#ECECEC] text-sm focus:outline-hidden focus:border-[#0F2D63] focus:ring-1 focus:ring-[#0F2D63] transition-all"
                      />
                    </div>
                  </div>

                  {/* Message Input */}
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-bold text-[#1B1B1B] uppercase tracking-wider">Detailed Message *</label>
                    <textarea
                      required
                      rows={5}
                      placeholder="Please specify your operational requirements, approximate timeline, and any custom questions for Sanjeev Goel..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-[#F8F9FC] border border-[#ECECEC] text-sm focus:outline-hidden focus:border-[#0F2D63] focus:ring-1 focus:ring-[#0F2D63] transition-all resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    disabled={loading}
                    type="submit"
                    className="w-full py-4 rounded-xl bg-[#0F2D63] text-white font-bold text-sm transition-all duration-300 hover:bg-[#1a448c] active:scale-95 disabled:opacity-75 flex items-center justify-center gap-2 cursor-pointer group hover:shadow-lg hover:shadow-blue-900/10"
                  >
                    {loading ? (
                      <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <>
                        Send Inquiry
                        <Send className="w-4 h-4 text-[#E5AF2B] transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5" />
                      </>
                    )}
                  </button>
                </motion.form>
              ) : (
                <motion.div
                  key="contact-success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="flex flex-col items-center text-center py-10 gap-6"
                >
                  <div className="w-20 h-20 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100">
                    <CheckCircle className="w-10 h-10 stroke-[2px]" />
                  </div>
                  
                  <div className="flex flex-col gap-2">
                    <h3 className="font-serif font-bold text-2xl text-[#0F2D63]">Inquiry Dispatched Successfully</h3>
                    <p className="text-sm text-[#5B6470] max-w-sm leading-relaxed">
                      Thank you <span className="font-bold text-[#1b1b1b]">{formData.name}</span>. Your requirements have been safely transmitted to Sanjeev Goel.
                    </p>
                  </div>

                  <div className="p-4 bg-[#F8F9FC] border border-[#ECECEC] rounded-2xl text-left w-full text-xs font-mono flex flex-col gap-1.5 text-slate-600">
                    <p><strong>SENDER:</strong> {formData.email}</p>
                    <p><strong>SUBJECT:</strong> {formData.subject || "General Consultation Request"}</p>
                    <p><strong>ROUTING_KEY:</strong> info2sanjeev@gmail.com</p>
                    <p><strong>DISPATCH_SLA:</strong> response_within_24_hours</p>
                  </div>

                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
                    }}
                    className="px-6 py-3 rounded-xl border border-[#ECECEC] text-[#0F2D63] text-xs font-semibold hover:bg-[#F8F9FC] transition-colors"
                  >
                    Submit New Inquiry
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
