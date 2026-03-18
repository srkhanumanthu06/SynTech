"use client";

import { motion } from "framer-motion";
import { ArrowRight, Bot, Database, Lock, Globe2, Smartphone, TerminalSquare, Search, Filter } from "lucide-react";
import { SERVICES } from "@/data/services";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { useState } from "react";

export default function ServicesPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredServices = SERVICES.filter(service => 
    service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    service.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main className="min-h-screen pt-32 pb-24 bg-background overflow-hidden">
      {/* Immersive Background */}
      <div className="absolute top-0 left-0 w-full h-[600px] bg-gradient-to-b from-primary/10 via-background to-transparent pointer-events-none" />
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-secondary/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        {/* Header */}
        <div className="max-w-4xl mx-auto text-center mb-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-widest mb-6"
          >
            Digital Excellence
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-black text-white mb-8 tracking-tighter"
          >
            Our Full <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Service Suite</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-400 leading-relaxed max-w-2xl mx-auto"
          >
            Explore our end-to-end technical capabilities. We engineer the foundations that power the next generation of global enterprises.
          </motion.p>
        </div>

        {/* Search & Filter Bar */}
        <div className="max-w-xl mx-auto mb-16 relative">
          <div className="flex items-center gap-4 p-2 pl-6 bg-white/5 border border-white/10 rounded-full focus-within:border-primary/50 transition-all">
            <Search className="w-5 h-5 text-gray-500" />
            <input 
              type="text" 
              placeholder="Search services (e.g. AI, Cloud, App)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-transparent border-none text-white focus:outline-none flex-1 text-sm md:text-base font-medium"
            />
            <div className="p-3 rounded-full bg-primary text-background">
               <Filter className="w-4 h-4" />
            </div>
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredServices.map((service, idx) => (
            <motion.div
              key={service.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              layout
            >
              <Link
                href={`/services/${service.slug}`}
                className="group relative p-10 rounded-[2.5rem] bg-white/5 border border-white/10 hover:border-primary/30 hover:bg-white/10 transition-all flex flex-col h-full overflow-hidden"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
                
                <div className="flex items-center justify-between mb-8 relative z-10">
                  <div className={`w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white scale-100 group-hover:scale-110 group-hover:bg-gradient-to-br group-hover:${service.gradient} transition-all duration-500 shadow-2xl`}>
                    {service.icon}
                  </div>
                  <div className="p-2 rounded-full border border-white/10 opacity-40 group-hover:opacity-100 group-hover:bg-primary/20 group-hover:border-primary/40 transition-all">
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>

                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-primary transition-colors relative z-10">{service.title}</h3>
                <p className="text-gray-400 leading-relaxed mb-10 flex-1 relative z-10 group-hover:text-gray-300 transition-colors">
                  {service.description}
                </p>

                <div className="flex items-center gap-3 relative z-10">
                   <div className="text-[10px] uppercase tracking-[0.3em] text-gray-500 font-black group-hover:text-primary transition-colors">Strategic Deployment</div>
                   <div className="h-px flex-1 bg-white/10 group-hover:bg-primary/20 transition-colors" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {filteredServices.length === 0 && (
          <div className="text-center py-32">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white/5 mb-6">
              <Bot className="w-10 h-10 text-gray-600" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">No matching service found</h3>
            <p className="text-gray-500">Try searching for generic terms like "AI" or "Web"</p>
          </div>
        )}

        {/* Bottom CTA */}
        <motion.div
           initial={{ opacity: 0, y: 40 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           className="mt-32 p-12 rounded-[3.5rem] bg-gradient-to-br from-primary/10 via-transparent to-secondary/10 border border-white/10 text-center relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:32px_32px]" />
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tight">Don't see what you need?</h2>
          <p className="text-gray-400 mb-10 max-w-xl mx-auto">Our custom engineering teams specialize in building bespoke solutions for non-standard enterprise challenges.</p>
          <Link href="/speak-tech-lead">
            <Button size="lg" className="px-12 h-16 text-lg rounded-2xl group">
              Speak with a Technical Lead
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </main>
  );
}
