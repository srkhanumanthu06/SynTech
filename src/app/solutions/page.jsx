"use client";

import { motion } from "framer-motion";
import { ArrowRight, Brain, Cloud, Shield, Database, Layout, Terminal } from "lucide-react";
import Link from "next/link";

const SOLUTIONS = [
  {
    id: "enterprise-ai",
    title: "Enterprise AI & Machine Learning",
    description: "Production-grade AI systems that transform operations, automate workflows, and unlock deep insights from unstructured data.",
    icon: <Brain className="w-8 h-8 text-primary" />,
    gradient: "from-blue-500 to-cyan-400",
    features: ["Custom LLM Fine-Tuning", "Retrieval-Augmented Generation (RAG)", "Predictive Analytics", "Computer Vision Pipelines"],
  },
  {
    id: "cloud-infrastructure",
    title: "Cloud Infrastructure & DevOps",
    description: "Resilient, auto-scaling cloud architectures engineered for 99.99% uptime and zero-downtime deployments.",
    icon: <Cloud className="w-8 h-8 text-secondary" />,
    gradient: "from-purple-500 to-indigo-400",
    features: ["Multi-Cloud Architecture", "Kubernetes Orchestration", "CI/CD Pipeline Automation", "Serverless Migration"],
  },
  {
    id: "data-engineering",
    title: "Data Engineering & Analytics",
    description: "Petabyte-scale data pipelines and real-time streaming architectures that turn raw data into strategic assets.",
    icon: <Database className="w-8 h-8 text-teal-400" />,
    gradient: "from-teal-500 to-emerald-400",
    features: ["Real-time Stream Processing", "Data Warehouse Design", "ETL Automation", "Interactive BI Dashboards"],
  },
  {
    id: "cybersecurity",
    title: "Zero-Trust Cybersecurity",
    description: "Military-grade security architectures that protect enterprise assets from edge to core without compromising velocity.",
    icon: <Shield className="w-8 h-8 text-red-400" />,
    gradient: "from-red-500 to-orange-400",
    features: ["Identity & Access Management", "Automated Threat Detection", "Compliance Automation", "Penetration Testing"],
  },
  {
    id: "custom-software",
    title: "Custom Software Engineering",
    description: "High-performance, scalable web and mobile applications built with modern frameworks and impeccable code quality.",
    icon: <Terminal className="w-8 h-8 text-amber-400" />,
    gradient: "from-amber-500 to-yellow-400",
    features: ["Web Application Development", "React Native Mobile Apps", "Microservices Architecture", "API Gateway Design"],
  },
  {
    id: "ui-ux",
    title: "Digital Experience Design",
    description: "Stunning, user-centric interfaces that combine gorgeous aesthetics with frictionless, intuitive user journeys.",
    icon: <Layout className="w-8 h-8 text-pink-400" />,
    gradient: "from-pink-500 to-rose-400",
    features: ["Design Systems", "User Research & Testing", "Interactive Prototyping", "Accessibility (WCAG) Compliance"],
  }
];

export default function SolutionsPage() {
  return (
    <div className="min-h-screen pt-32 pb-24">
      <div className="container mx-auto px-6 md:px-12">
        
        <div className="max-w-4xl mx-auto text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            Our Capabilities
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight"
          >
            Engineering the <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Future</span> of Enterprise
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto"
          >
            We deliver end-to-end technology solutions that drive unprecedented scale, security, and intelligence for ambitious organizations.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {SOLUTIONS.map((solution, i) => (
            <motion.div
              key={solution.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group relative bg-white/5 border border-white/10 rounded-3xl p-8 overflow-hidden hover:border-white/20 transition-colors"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${solution.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
              
              <div className="relative z-10">
                <div className={`w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 shadow-lg`}>
                  {solution.icon}
                </div>
                
                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-400 transition-all">
                  {solution.title}
                </h3>
                
                <p className="text-gray-400 text-sm leading-relaxed mb-8 h-20">
                  {solution.description}
                </p>

                <div className="space-y-3 mb-8">
                  {solution.features.map((feature, j) => (
                    <div key={j} className="flex items-center gap-3 text-sm text-gray-300">
                      <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${solution.gradient}`} />
                      {feature}
                    </div>
                  ))}
                </div>

                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 text-sm font-bold text-white/50 hover:text-white transition-colors group/link"
                >
                  Discuss this solution <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-32 max-w-4xl mx-auto text-center bg-gradient-to-br from-primary/10 to-secondary/10 border border-white/10 rounded-3xl p-12 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 blur-[100px] rounded-full pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/20 blur-[100px] rounded-full pointer-events-none" />
          
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4 relative z-10">Ready to transform your business?</h2>
          <p className="text-gray-400 mb-8 max-w-xl mx-auto relative z-10">Schedule a free strategy session with our technical architects to map out your digital transformation roadmap.</p>
          
          <Link href="/book-consultation" className="relative z-10 inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-black rounded-xl font-bold text-lg hover:bg-gray-200 transition-colors shadow-xl">
            Book a Consultation <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>

      </div>
    </div>
  );
}
