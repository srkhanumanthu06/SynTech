"use client";

import { motion } from "framer-motion";
import { SectionHeader } from "@/components/ui/SectionHeader";

export function TechStack() {
  const technologies = [
    "Next.js", "React", "TypeScript", "Node.js", "Python", 
    "TensorFlow", "PyTorch", "Kubernetes", "Docker", "AWS", 
    "Azure", "GCP", "PostgreSQL", "MongoDB", "Redis", "Kafka"
  ];

  // Duplicate the array to create a seamless infinite marquee effect
  const marqueeItems = [...technologies, ...technologies, ...technologies];

  return (
    <section className="py-20 relative bg-black/80 border-t border-white/5 overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 mb-12">
        <SectionHeader 
          highlight="Our Stack"
          title="Powered by Modern Tech"
          className="mb-0"
        />
      </div>

      <div className="relative w-full flex overflow-hidden">
        {/* Gradient Masks for smooth fading edges */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-black/80 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-black/80 to-transparent z-10 pointer-events-none" />

        <motion.div
          animate={{ x: [0, -2000] }}
          transition={{
            repeat: Infinity,
            ease: "linear",
            duration: 30, // Adjust speed here
          }}
          className="flex gap-6 items-center whitespace-nowrap min-w-max px-4"
        >
          {marqueeItems.map((tech, idx) => (
            <div 
              key={idx}
              className="px-8 py-4 rounded-full bg-white/5 border border-white/10 text-gray-300 font-medium text-lg md:text-xl backdrop-blur-sm"
            >
              {tech}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
