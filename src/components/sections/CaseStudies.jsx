"use client";

import { motion } from "framer-motion";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Card } from "@/components/ui/Card";
import { ArrowUpRight } from "lucide-react";

export function CaseStudies() {
  const cases = [
    {
      client: "Global FinTech Corp",
      title: "Real-time Fraud Detection AI",
      metric: "99.9%",
      metricLabel: "Accuracy Rate",
      description: "Deployed a deep learning model to analyze transaction patterns, reducing false positives and blocking anomalous transactions within milliseconds.",
      tags: ["Machine Learning", "AWS", "Python"],
    },
    {
      client: "National Health Systems",
      title: "Cloud Migration & Data Lake",
      metric: "40%",
      metricLabel: "Cost Reduction",
      description: "Architected a HIPAA-compliant cloud infrastructure, migrating 50TB of legacy data to a scalable, easily queryable AWS data lake.",
      tags: ["Cloud Architecture", "Data Engineering", "Security"],
    },
  ];

  return (
    <section id="case-studies" className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-20 gap-8">
          <SectionHeader 
            highlight="Case Studies"
            title="Proven Enterprise Impact"
            align="left"
            className="mb-0"
          />
          <p className="text-gray-400 max-w-md text-lg leading-relaxed">
            Explore how we&apos;ve transformed complex operational challenges into measurable business value.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {cases.map((cs, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.2 }}
            >
              <Card className="h-full flex flex-col group/card p-8 md:p-10 cursor-pointer">
                <div className="flex justify-between items-start mb-8">
                  <div className="text-primary font-semibold text-sm tracking-wider uppercase">
                    {cs.client}
                  </div>
                  <div className="p-2 bg-white/5 rounded-full group-hover/card:bg-primary group-hover/card:text-black transition-colors">
                    <ArrowUpRight className="w-5 h-5" />
                  </div>
                </div>

                <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 line-clamp-2">
                  {cs.title}
                </h3>
                
                <p className="text-gray-400 leading-relaxed mb-8 flex-grow">
                  {cs.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-8">
                  {cs.tags.map((tag) => (
                    <span key={tag} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs font-medium text-gray-300">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="pt-6 border-t border-white/10 flex items-baseline gap-4">
                  <span className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
                    {cs.metric}
                  </span>
                  <span className="text-sm font-semibold text-gray-400 uppercase tracking-wider">
                    {cs.metricLabel}
                  </span>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
