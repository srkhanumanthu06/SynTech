"use client";

import { motion } from "framer-motion";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Stethoscope, Landmark, Plane, ShoppingBag, Factory, Zap } from "lucide-react";

export function Industries() {
  const industries = [
    { name: "Healthcare & Life Sciences", icon: <Stethoscope className="w-8 h-8" /> },
    { name: "Financial Services", icon: <Landmark className="w-8 h-8" /> },
    { name: "Aerospace & Defense", icon: <Plane className="w-8 h-8" /> },
    { name: "Retail & E-Commerce", icon: <ShoppingBag className="w-8 h-8" /> },
    { name: "Manufacturing & Supply Chain", icon: <Factory className="w-8 h-8" /> },
    { name: "Energy & Utilities", icon: <Zap className="w-8 h-8" /> },
  ];

  return (
    <section id="industries" className="py-24 relative bg-black/60 border-t border-white/5">
      <div className="container mx-auto px-6 md:px-12">
        <SectionHeader 
          highlight="Industries Served"
          title="Sector-Specific Innovation"
          subtitle="Tailored technological solutions that address the unique challenges and regulatory requirements of diverse global industries."
        />

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8 max-w-5xl mx-auto">
          {industries.map((ind, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="group flex flex-col items-center justify-center p-8 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 hover:border-primary/30 transition-all cursor-pointer h-48"
            >
              <div className="text-gray-400 group-hover:text-primary group-hover:scale-110 transition-all duration-300 mb-4">
                {ind.icon}
              </div>
              <h3 className="text-white font-medium text-center text-sm md:text-base">{ind.name}</h3>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
