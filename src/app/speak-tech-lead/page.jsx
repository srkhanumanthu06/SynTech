"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { UserCheck, Shield, Zap, MessageSquare, Terminal, Globe, ArrowRight, CheckCircle2 } from "lucide-react";
import { useState } from "react";

export default function SpeakTechLeadPage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    technicalNeed: "",
  });

  const nextStep = () => setStep(prev => prev + 1);

  return (
    <main className="min-h-screen pt-32 pb-24 bg-background overflow-hidden">
      {/* Absolute design elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[800px] bg-gradient-to-b from-primary/5 via-transparent to-transparent pointer-events-none" />
      <div className="absolute top-40 right-10 w-[400px] h-[400px] bg-accent/5 blur-[100px] rounded-full pointer-events-none" />
      
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-widest mb-8">
                <UserCheck className="w-4 h-4" />
                Direct Architect Access
              </div>
              <h1 className="text-5xl md:text-6xl font-black text-white mb-8 tracking-tighter leading-tight">
                Architecting the <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Future</span> Together
              </h1>
              <p className="text-xl text-gray-400 mb-12 leading-relaxed">
                Connect directly with our senior technical leadership. No sales layers—just pure engineering strategy and architectural excellence.
              </p>

              <div className="space-y-6">
                {[
                  { icon: <Shield className="w-5 h-5" />, title: "NDA Protected", desc: "All discussions are strictly confidential." },
                  { icon: <Zap className="w-5 h-5" />, title: "Rapid Handoff", desc: "Get technical feasibility in 24 hours." },
                  { icon: <Terminal className="w-5 h-5" />, title: "Code First", desc: "Direct engineering-to-engineering dialogue." }
                ].map((item, i) => (
                  <div key={i} className="flex gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-primary/20 transition-all group">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="text-white font-bold">{item.title}</h4>
                      <p className="text-xs text-gray-500">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Right Form / Interactive Section */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-white/5 border border-white/10 rounded-[3rem] p-8 md:p-12 backdrop-blur-xl relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 blur-3xl pointer-events-none" />
              
              {step === 1 && (
                <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 transition-all duration-500">
                  <div className="text-center mb-10">
                    <h3 className="text-2xl font-bold text-white mb-2">Initialize Consultation</h3>
                    <p className="text-gray-500 text-sm">Step 1 of 2: Basic Information</p>
                  </div>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-2">Full Name</label>
                      <input 
                        className="w-full bg-black/40 border border-white/10 rounded-2xl p-4 text-white focus:border-primary transition-all outline-none" 
                        placeholder="John Doe"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-2">Professional Email</label>
                      <input 
                        type="email"
                        className="w-full bg-black/40 border border-white/10 rounded-2xl p-4 text-white focus:border-primary transition-all outline-none" 
                        placeholder="j.doe@enterprise.com"
                      />
                    </div>
                  </div>
                  <Button onClick={nextStep} className="w-full h-16 text-lg font-bold group">
                    Continue Discovery
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-8 animate-in fade-in slide-in-from-right-4 transition-all duration-500">
                  <div className="text-center mb-10">
                    <h3 className="text-2xl font-bold text-white mb-2">Technical Objective</h3>
                    <p className="text-gray-500 text-sm">Step 2 of 2: Requirement Analysis</p>
                  </div>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-2">Primary Technical Hurdle</label>
                      <textarea 
                        className="w-full h-40 bg-black/40 border border-white/10 rounded-2xl p-4 text-white focus:border-primary transition-all outline-none resize-none" 
                        placeholder="Describe your architecture scale, data complexity, or AI integration goals..."
                      />
                    </div>
                  </div>
                  <Button onClick={nextStep} className="w-full h-16 text-lg font-bold group">
                    Request Secure Connection
                    <Zap className="ml-2 w-5 h-5 group-hover:scale-125 transition-transform" />
                  </Button>
                </div>
              )}

              {step === 3 && (
                <div className="text-center py-20 animate-in zoom-in transition-all duration-700">
                  <div className="w-24 h-24 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center mx-auto mb-8 shadow-[0_0_50px_rgba(16,185,129,0.2)]">
                    <CheckCircle2 className="w-12 h-12 text-emerald-400" />
                  </div>
                  <h3 className="text-3xl font-bold text-white mb-4 tracking-tight">Signal Received</h3>
                  <p className="text-gray-400 mb-10 max-w-sm mx-auto leading-relaxed">
                    Our lead architect has been notified. We are currently analyzing your request for a strategic handoff.
                  </p>
                  <Button onClick={() => setStep(1)} variant="outline" className="px-10">
                    Back to Services
                  </Button>
                </div>
              )}
            </motion.div>
          </div>
        </div>

        {/* Branding Footer */}
        <div className="mt-32 pt-12 border-t border-white/5 flex flex-wrap justify-center gap-12 opacity-30">
           <div className="flex items-center gap-2"><Globe className="w-4 h-4" /><span className="text-xs font-bold tracking-widest uppercase">Global Node Network</span></div>
           <div className="flex items-center gap-2"><MessageSquare className="w-4 h-4" /><span className="text-xs font-bold tracking-widest uppercase">Direct Lead Access</span></div>
           <div className="flex items-center gap-2"><Shield className="w-4 h-4" /><span className="text-xs font-bold tracking-widest uppercase">Encrypted Handoff</span></div>
        </div>
      </div>
    </main>
  );
}
