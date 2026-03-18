"use client";

import { motion } from "framer-motion";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Card } from "@/components/ui/Card";
import { Cpu, Cloud, Code2, Network } from "lucide-react";

export function Capabilities() {
  const capabilities = [
    {
      title: "Artificial Intelligence",
      description: "Custom machine learning models, natural language processing, and computer vision systems designed to automate complex decision-making.",
      icon: <Cpu className="w-8 h-8 text-primary" />,
      color: "from-primary/20 to-transparent",
    },
    {
      title: "Cloud Architecture",
      description: "Scalable, secure, and highly available cloud infrastructures built on AWS, Azure, and GCP for modern enterprise workloads.",
      icon: <Cloud className="w-8 h-8 text-secondary" />,
      color: "from-secondary/20 to-transparent",
    },
    {
      title: "Enterprise Software",
      description: "Bespoke full-stack applications with microservices architecture, ensuring high performance, low latency, and infinite scalability.",
      icon: <Code2 className="w-8 h-8 text-accent" />,
      color: "from-primary/20 to-transparent",
    },
    {
      title: "Data & Automation",
      description: "Robotic process automation and big data analytics pipelines that transform raw data into actionable enterprise intelligence.",
      icon: <Network className="w-8 h-8 text-secondary" />,
      color: "from-secondary/20 to-transparent",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section id="capabilities" className="py-24 relative bg-black/40 border-y border-white/5">
      <div className="container mx-auto px-6 md:px-12">
        <SectionHeader 
          highlight="Core Capabilities"
          title="Technology that Empowers"
          subtitle="We leverage the absolute state-of-the-art in modern computing to solve the world's most complex enterprise challenges."
        />

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {capabilities.map((cap, idx) => (
            <motion.div key={idx} variants={itemVariants}>
              <Card className="h-full flex flex-col items-start p-8">
                <div className={`p-4 rounded-2xl bg-gradient-to-br ${cap.color} mb-6 border border-white/5`}>
                  {cap.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-4">{cap.title}</h3>
                <p className="text-gray-400 leading-relaxed text-sm flex-grow">
                  {cap.description}
                </p>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
