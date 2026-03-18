"use client";

import { motion } from "framer-motion";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import { Mail, Phone, MapPin, Send, MessageSquare, Users, ShieldCheck, Zap } from "lucide-react";
import { useState } from "react";

export default function ContactStrategyPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 2000);
  };

  return (
    <main className="min-h-screen pt-32 pb-24 bg-background overflow-hidden">
      {/* Dynamic Background */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-secondary/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="max-w-4xl mx-auto text-center mb-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6"
          >
            <Users className="w-4 h-4" />
            Strategy Architecture Team
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-6xl font-black text-white mb-8 tracking-tighter"
          >
            Connect with our <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Technical Architects</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-400 leading-relaxed max-w-2xl mx-auto"
          >
            Skip the sales pitch. Speak directly with the engineers and strategists building the future of enterprise software.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-7xl mx-auto">
          {/* Contact Info Sidebar */}
          <div className="lg:col-span-4 space-y-8">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-sm"
            >
              <h3 className="text-xl font-bold text-white mb-8">Direct Channels</h3>
              <div className="space-y-6">
                <div className="flex gap-4 group">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                    <Mail className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-sm">Strategy Inquiries</h4>
                    <p className="text-gray-500 text-sm">strategy@syntech.ai</p>
                  </div>
                </div>
                <div className="flex gap-4 group">
                  <div className="w-12 h-12 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center shrink-0 group-hover:bg-accent/20 transition-colors">
                    <Phone className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-sm">Technical Support</h4>
                    <p className="text-gray-500 text-sm">+91 9876543210</p>
                  </div>
                </div>
                <div className="flex gap-4 group">
                  <div className="w-12 h-12 rounded-xl bg-secondary/10 border border-secondary/20 flex items-center justify-center shrink-0 group-hover:bg-secondary/20 transition-colors">
                    <MapPin className="w-5 h-5 text-secondary" />
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-sm">Innovation Hub</h4>
                    <p className="text-gray-500 text-sm">Chennai, India</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-gradient-to-br from-primary/10 to-transparent border border-primary/20 rounded-3xl p-8"
            >
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-primary" /> NDA Ready
              </h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                We understand enterprise privacy. All strategy discussions are covered by our standard pre-signed mutual NDA.
              </p>
            </motion.div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/5 border border-white/10 rounded-[2.5rem] p-8 md:p-12 backdrop-blur-md relative"
            >
              {isSubmitted ? (
                <div className="text-center py-20">
                  <div className="w-20 h-20 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center mx-auto mb-8">
                    <Zap className="w-10 h-10 text-emerald-400 fill-emerald-400" />
                  </div>
                  <h3 className="text-3xl font-bold text-white mb-4">Message Transmitted</h3>
                  <p className="text-gray-400 max-w-sm mx-auto mb-10">
                    A technical lead has been assigned to your inquiry. Expect a response within 4 business hours.
                  </p>
                  <Button onClick={() => setIsSubmitted(false)} variant="outline">
                    Send another message
                  </Button>
                </div>
              ) : (
                <>
                  <div className="flex items-center gap-3 mb-10">
                    <MessageSquare className="w-6 h-6 text-primary" />
                    <h2 className="text-2xl font-bold text-white">Strategy Request</h2>
                  </div>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-300 ml-1">Full Name</label>
                        <input
                          required
                          type="text"
                          className="w-full bg-black/40 border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-primary focus:bg-white/5 transition-all"
                          placeholder="John Doe"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-300 ml-1">Work Email</label>
                        <input
                          required
                          type="email"
                          className="w-full bg-black/40 border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-primary focus:bg-white/5 transition-all"
                          placeholder="john@enterprise.com"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-300 ml-1">Company / Organization</label>
                      <input
                        required
                        type="text"
                        className="w-full bg-black/40 border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-primary focus:bg-white/5 transition-all"
                        placeholder="Organization Name"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-300 ml-1">Strategic Objective</label>
                      <textarea
                        required
                        className="w-full h-40 bg-black/40 border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-primary focus:bg-white/5 transition-all resize-none"
                        placeholder="Briefly describe your technical objectives or challenges..."
                      />
                    </div>
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full h-16 text-lg font-bold group"
                    >
                      {isSubmitting ? (
                        <span className="flex items-center gap-2">
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          >
                            <Send className="w-5 h-5" />
                          </motion.div>
                          Processing...
                        </span>
                      ) : (
                        <span className="flex items-center gap-2">
                          Initialize Handoff <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                        </span>
                      )}
                    </Button>
                  </form>
                </>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </main>
  );
}
