"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar as CalendarIcon, Clock, ArrowRight, CheckCircle2, User, Mail, Building, FileText, Globe } from "lucide-react";
import Link from "next/link";

const TIME_SLOTS = [
  "09:00 AM", "10:00 AM", "11:30 AM", "01:00 PM",
  "02:30 PM", "04:00 PM", "05:00 PM"
];

export default function BookConsultationPage() {
  const [step, setStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 2); // Default to 2 days from now
    return d;
  });
  const [selectedTime, setSelectedTime] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    project: ""
  });

  const handleNextStep = () => {
    if (step === 1 && selectedTime) setStep(2);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API Call
    setTimeout(() => {
      setIsSubmitting(false);
      setStep(3);
    }, 1500);
  };

  return (
    <div className="min-h-screen pt-32 pb-24 relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-primary/10 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-secondary/10 blur-[150px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 md:px-12 max-w-6xl relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
          
          {/* Left Column: Context */}
          <div className="lg:col-span-2 space-y-8">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/10 border border-secondary/20 text-secondary text-sm font-medium mb-6">
                Discovery Call
              </div>
              <h1 className="text-4xl md:text-5xl font-black text-white mb-6 leading-tight">
                Let's architect your next <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-cyan-400">breakthrough.</span>
              </h1>
              <p className="text-gray-400 text-lg leading-relaxed mb-8">
                Book a complimentary 45-minute strategy session with our senior engineering architects.
              </p>

              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                    <Globe className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold mb-1">What to expect</h3>
                    <p className="text-sm text-gray-400 leading-relaxed">A deep dive into your technical challenges, architecture review, and a roadmap for scalable solutions.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-5 h-5 text-secondary" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold mb-1">Who you'll meet</h3>
                    <p className="text-sm text-gray-400 leading-relaxed">Direct access to Principal Engineers and Technical Founders, not sales representatives.</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Booking Interface */}
          <div className="lg:col-span-3">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-[#0f0f13] border border-white/10 rounded-3xl p-6 md:p-10 shadow-2xl relative overflow-hidden completely-custom-scrollbar"
            >
              {/* Step indicator */}
              {step < 3 && (
                <div className="flex items-center gap-4 mb-10 border-b border-white/5 pb-6">
                  <div className={`flex items-center gap-2 ${step === 1 ? 'text-white' : 'text-gray-500'}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${step === 1 ? 'bg-primary text-black' : 'bg-white/10'}`}>1</div>
                    <span className="font-medium text-sm">Date & Time</span>
                  </div>
                  <div className="h-px w-12 bg-white/10" />
                  <div className={`flex items-center gap-2 ${step === 2 ? 'text-white' : 'text-gray-500'}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${step === 2 ? 'bg-primary text-black' : 'bg-white/10'}`}>2</div>
                    <span className="font-medium text-sm">Your Details</span>
                  </div>
                </div>
              )}

              <AnimatePresence mode="wait">
                {/* STEP 1: Date & Time */}
                {step === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="space-y-8"
                  >
                    <div>
                      <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                        <CalendarIcon className="w-5 h-5 text-primary" /> Select Date
                      </h3>
                      {/* Fake stylized calendar row */}
                      <div className="grid grid-cols-4 sm:grid-cols-7 gap-3">
                        {Array.from({ length: 7 }).map((_, i) => {
                          const date = new Date();
                          date.setDate(date.getDate() + i + 1);
                          const isSelected = selectedDate.getDate() === date.getDate();
                          const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
                          const dayNum = date.getDate();
                          // Skip weekends for business realism
                          if (date.getDay() === 0 || date.getDay() === 6) return null;

                          return (
                            <button
                              key={i}
                              onClick={() => setSelectedDate(date)}
                              className={`flex flex-col items-center justify-center py-4 rounded-2xl border transition-all ${
                                isSelected
                                  ? "border-primary bg-primary/10 text-primary shadow-[0_0_15px_rgba(0,212,255,0.2)]"
                                  : "border-white/10 bg-white/5 text-gray-400 hover:bg-white/10 hover:border-white/20 hover:text-white"
                              }`}
                            >
                              <span className="text-xs font-medium uppercase mb-1">{dayName}</span>
                              <span className="text-xl font-bold">{dayNum}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                        <Clock className="w-5 h-5 text-secondary" /> Select Time (EST)
                      </h3>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        {TIME_SLOTS.map((time) => (
                          <button
                            key={time}
                            onClick={() => setSelectedTime(time)}
                            className={`py-3 rounded-xl border font-medium text-sm transition-all focus:outline-none ${
                              selectedTime === time
                                ? "border-secondary bg-secondary/10 text-secondary shadow-[0_0_15px_rgba(123,47,247,0.3)]"
                                : "border-white/10 bg-white/5 text-gray-300 hover:bg-white/10 hover:border-white/20"
                            }`}
                          >
                            {time}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="pt-6">
                      <button
                        onClick={handleNextStep}
                        disabled={!selectedTime}
                        className={`w-full py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all ${
                          selectedTime
                            ? "bg-white text-black hover:bg-gray-200 cursor-pointer shadow-lg"
                            : "bg-white/5 text-gray-500 cursor-not-allowed border border-white/10"
                        }`}
                      >
                        Continue <ArrowRight className="w-5 h-5" />
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* STEP 2: Details Form */}
                {step === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                  >
                    <div className="mb-8 p-4 bg-primary/5 border border-primary/20 rounded-xl flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                        <CalendarIcon className="w-6 h-6" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">Selected Session</p>
                        <p className="text-white font-bold">{selectedDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })} at {selectedTime}</p>
                      </div>
                      <button onClick={() => setStep(1)} className="ml-auto text-xs text-primary hover:underline">Change</button>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-gray-300 ml-1">Full Name</label>
                          <div className="relative">
                            <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                            <input required type="text" className="w-full h-12 bg-white/5 border border-white/10 text-white rounded-xl pl-12 pr-4 focus:outline-none focus:border-primary focus:bg-white/10 transition-colors" placeholder="Jane Doe" onChange={e => setFormData({...formData, name: e.target.value})} />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-gray-300 ml-1">Work Email</label>
                          <div className="relative">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                            <input required type="email" className="w-full h-12 bg-white/5 border border-white/10 text-white rounded-xl pl-12 pr-4 focus:outline-none focus:border-primary focus:bg-white/10 transition-colors" placeholder="jane@company.com" onChange={e => setFormData({...formData, email: e.target.value})} />
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-300 ml-1">Company Name</label>
                        <div className="relative">
                          <Building className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                          <input required type="text" className="w-full h-12 bg-white/5 border border-white/10 text-white rounded-xl pl-12 pr-4 focus:outline-none focus:border-primary focus:bg-white/10 transition-colors" placeholder="Acme Inc." onChange={e => setFormData({...formData, company: e.target.value})} />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-300 ml-1">Project Overview</label>
                        <div className="relative">
                          <FileText className="absolute left-4 top-4 w-5 h-5 text-gray-500" />
                          <textarea required className="w-full min-h-[120px] bg-white/5 border border-white/10 text-white rounded-xl pl-12 pr-4 py-4 focus:outline-none focus:border-primary focus:bg-white/10 transition-colors resize-none" placeholder="Briefly describe what you're looking to build or solve..." onChange={e => setFormData({...formData, project: e.target.value})} />
                        </div>
                      </div>

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full h-14 bg-gradient-to-r from-primary to-secondary text-white rounded-xl font-bold text-lg hover:opacity-90 transition-opacity mt-6 flex items-center justify-center gap-2 shadow-[0_0_30px_rgba(0,212,255,0.3)] relative overflow-hidden"
                      >
                        {isSubmitting ? (
                          <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        ) : (
                          <>Confirm Booking <CheckCircle2 className="w-5 h-5" /></>
                        )}
                      </button>
                    </form>
                  </motion.div>
                )}

                {/* STEP 3: Success */}
                {step === 3 && (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center text-center py-10"
                  >
                    <div className="w-24 h-24 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-6 relative">
                      <div className="absolute inset-0 rounded-full bg-emerald-500/20 animate-ping" />
                      <CheckCircle2 className="w-12 h-12 text-emerald-400 relative z-10" />
                    </div>
                    
                    <h2 className="text-3xl font-black text-white mb-4">You're Confirmed!</h2>
                    <p className="text-gray-400 text-base leading-relaxed max-w-sm mb-8">
                      We've sent a calendar invitation to <span className="text-white font-medium">{formData.email}</span> with a Google Meet link for <strong>{selectedDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })} at {selectedTime}</strong>.
                    </p>

                    <Link href="/" className="px-8 py-3 bg-white/10 hover:bg-white/20 border border-white/10 text-white rounded-full font-medium transition-colors">
                      Return to Homepage
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>

        </div>
      </div>
    </div>
  );
}
