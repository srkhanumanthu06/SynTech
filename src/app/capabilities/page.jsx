"use client";

import { motion } from "framer-motion";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Cpu, Cloud, Code2, Network, Brain, Database, Shield, Zap, Globe, CpuIcon, Layers, Orbit } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

const CAPABILITIES_DETAILS = [
  {
    title: "Artificial Intelligence",
    description: "Architecting autonomous systems that learn, adapt, and drive unprecedented efficiency through neural precision.",
    icon: <Cpu className="w-10 h-10 text-primary" />,
    gradient: "from-blue-500 to-cyan-400",
    features: [
      { name: "Deep Learning", desc: "Multi-layered neural networks for complex pattern recognition and predictive modeling." },
      { name: "NLP Platforms", desc: "Advanced language models for semantic understanding and human-like interaction." },
      { name: "Computer Vision", desc: "Real-time visual processing for autonomous navigation and quality control." }
    ]
  },
  {
    title: "Cloud Infrastructure",
    description: "Engineering resilient, multi-cloud environments that scale horizontally across global regions.",
    icon: <Cloud className="w-10 h-10 text-secondary" />,
    gradient: "from-purple-500 to-indigo-400",
    features: [
      { name: "Serverless Compute", desc: "Event-driven architectures that eliminate infrastructure management overhead." },
      { name: "Global Mesh", desc: "High-speed network connectivity ensuring low latency for worldwide users." },
      { name: "Edge Computing", desc: "Processing data at the network edge for instantaneous response times." }
    ]
  },
  {
    title: "Enterprise Systems",
    description: "Building the backbone of modern business with high-concurrency, low-latency software architectures.",
    icon: <Code2 className="w-10 h-10 text-accent" />,
    gradient: "from-blue-500 to-purple-500",
    features: [
      { name: "Microservices", desc: "Decoupled service architectures for independent scaling and rapid deployment." },
      { name: "Modern UX", desc: "Immersive, high-performance interfaces built with cutting-edge frontend frameworks." },
      { name: "API Gateways", desc: "Centralized routing and security for high-traffic enterprise integrations." }
    ]
  },
  {
    title: "Data Intelligence",
    description: "Transforming vast streams of raw data into strategic assets using petabyte-scale analytics pipelines.",
    icon: <Network className="w-10 h-10 text-secondary" />,
    gradient: "from-cyan-400 to-blue-600",
    features: [
      { name: "Real-time Analytics", desc: "Streaming data processing for immediate business visibility and action." },
      { name: "Data Lakehouse", desc: "Unified storage and compute for both structured and unstructured data assets." },
      { name: "Automated ETL", desc: "Self-healing data pipelines that ensure high data quality and availability." }
    ]
  }
];

export default function CapabilitiesPage() {
  return (
    <main className="min-h-screen pt-32 pb-24 bg-background overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />
      <div className="absolute -top-[10%] -right-[10%] w-[40%] h-[40%] bg-secondary/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="max-w-4xl mx-auto text-center mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6"
          >
            <Orbit className="w-4 h-4 animate-spin-slow" />
            Platform Capabilities
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-black text-white mb-8 tracking-tighter"
          >
            Empowering the <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-secondary">Next Era</span> of Enterprise
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-400 leading-relaxed max-w-2xl mx-auto"
          >
            We deploy the most advanced computing paradigms to architect resilient, intelligent, and scalable digital foundations for global leaders.
          </motion.p>
        </div>

        <div className="space-y-32">
          {CAPABILITIES_DETAILS.map((cap, i) => (
            <section key={cap.title} className="relative">
              <div className={`grid grid-cols-1 lg:grid-cols-2 gap-16 items-center ${i % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
                <motion.div
                  initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className={i % 2 === 1 ? 'lg:order-2' : ''}
                >
                  <div className={`w-20 h-20 rounded-3xl bg-gradient-to-br ${cap.gradient} flex items-center justify-center text-white mb-8 shadow-[0_0_30px_rgba(0,195,255,0.3)]`}>
                    {cap.icon}
                  </div>
                  <h2 className="text-4xl font-bold text-white mb-6 tracking-tight">{cap.title}</h2>
                  <p className="text-lg text-gray-400 leading-relaxed mb-10 max-w-xl">
                    {cap.description}
                  </p>
                  
                  <div className="space-y-6">
                    {cap.features.map((feature, fIdx) => (
                      <div key={feature.name} className="flex gap-4 group">
                        <div className={`w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 group-hover:border-primary/50 transition-colors`}>
                           <Zap className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <h4 className="text-white font-bold mb-1">{feature.name}</h4>
                          <p className="text-sm text-gray-500 leading-relaxed">{feature.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className={`relative ${i % 2 === 1 ? 'lg:order-1' : ''}`}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${cap.gradient} opacity-20 blur-[100px] rounded-full`} />
                  <div className="aspect-square rounded-[4rem] bg-white/5 border border-white/10 flex items-center justify-center overflow-hidden relative group">
                    <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:32px_32px]" />
                    {/* Abstract visual representation */}
                    <div className="relative z-10 animate-pulse-slow">
                       {i === 0 && <Brain className="w-48 h-48 text-primary opacity-50" />}
                       {i === 1 && <Layers className="w-48 h-48 text-secondary opacity-50" />}
                       {i === 2 && <CpuIcon className="w-48 h-48 text-accent opacity-50" />}
                       {i === 3 && <Database className="w-48 h-48 text-primary opacity-50" />}
                    </div>
                  </div>
                </motion.div>
              </div>
            </section>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-32 p-12 rounded-[3rem] bg-gradient-to-br from-white/10 to-transparent border border-white/10 text-center relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 blur-[100px] pointer-events-none" />
          <h3 className="text-4xl font-bold text-white mb-6">Ready to upgrade your infrastructure?</h3>
          <p className="text-gray-400 mb-10 max-w-xl mx-auto">Our architects are ready to help you navigate the complexities of modern enterprise technology.</p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link href="/book-consultation">
              <Button size="lg" className="px-10 h-14 text-lg">
                Book a Consultation
              </Button>
            </Link>
            <Link href="/contact-strategy">
              <Button variant="outline" size="lg" className="px-10 h-14 text-lg">
                Contact Strategy Team
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
