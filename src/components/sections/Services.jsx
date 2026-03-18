"use client";

import { motion } from "framer-motion";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import { ArrowRight, Bot, Database, Lock, Globe2, Smartphone, TerminalSquare } from "lucide-react";

import { SERVICES } from "@/data/services";
import Link from "next/link";

export function Services() {
  return (
    <section id="services" className="py-24 relative overflow-hidden">
      <div className="absolute top-1/2 left-0 w-full h-[500px] bg-secondary/5 blur-[150px] -translate-y-1/2 pointer-events-none" />

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <SectionHeader 
          highlight="Our Services"
          title="End-to-End Digital Solutions"
          subtitle="From conceptualization to deployment, our specialized teams deliver comprehensive software and infrastructure services."
          align="left"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {SERVICES.map((service, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              <Link 
                href={`/services/${service.slug}`}
                className="group relative p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 hover:bg-white/10 transition-all flex flex-col h-full overflow-hidden block"
              >
                {/* Subtle gradient glow on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300 pointer-events-none`} />

                <div className="flex items-center gap-4 mb-4 relative z-10">
                  <div className={`p-3 rounded-xl bg-white/5 border border-white/10 group-hover:bg-gradient-to-br group-hover:${service.gradient} transition-all duration-300 shadow-lg`}>
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-400 transition-colors">{service.title}</h3>
                </div>
                <p className="text-gray-400 text-sm leading-relaxed mb-8 flex-1 relative z-10">
                  {service.description}
                </p>
                
                <div className="mt-auto pt-4 border-t border-white/5 text-gray-500 group-hover:text-white transition-colors flex items-center justify-between text-sm font-bold relative z-10">
                  Learn more <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <Link href="/services">
            <Button variant="outline" size="lg" className="w-full md:w-auto hover:bg-white hover:text-black transition-all">
              View All Services
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
