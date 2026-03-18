"use client";

import { motion } from "framer-motion";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { CheckCircle2 } from "lucide-react";

export function About() {
  const stats = [
    { label: "Years Experience", value: "15+" },
    { label: "Enterprise Clients", value: "500+" },
    { label: "Global Offices", value: "12" },
    { label: "AI Models Deployed", value: "1M+" },
  ];

  const highlights = [
    "Pioneering artificial intelligence research and integration.",
    "Architecting resilient cloud-native infrastructures.",
    "Driving digital transformation for Fortune 500 companies.",
  ];

  return (
    <section id="about" className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <SectionHeader 
              highlight="About Us"
              title="Engineering the Impossible"
              align="left"
              className="mb-8"
            />
            <p className="text-gray-400 text-lg md:text-xl leading-relaxed mb-8">
              At SynTech Consulting, we don&apos;t just adapt to the future; we build it. Born from a vision to demystify complex technologies, we bridge the gap between theoretical computer science and practical business applications.
            </p>
            
            <ul className="space-y-4 mb-10">
              {highlights.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-primary shrink-0" />
                  <span className="text-gray-300 text-lg">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-2 gap-6"
          >
            {stats.map((stat, idx) => (
              <div 
                key={idx} 
                className="p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md flex flex-col items-center justify-center text-center hover:bg-white/10 transition-colors"
              >
                <span className="text-4xl md:text-5xl font-black text-white mb-2">{stat.value}</span>
                <span className="text-sm md:text-base text-gray-400 font-medium uppercase tracking-wider">{stat.label}</span>
              </div>
            ))}
          </motion.div>

        </div>
      </div>
    </section>
  );
}
