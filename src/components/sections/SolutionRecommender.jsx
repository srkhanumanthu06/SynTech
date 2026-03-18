"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import { Brain, Sparkles, Loader2, ArrowRight, Zap, TrendingUp, Clock, Terminal } from "lucide-react";

export function SolutionRecommender() {
  const [industry, setIndustry] = useState("");
  const [challenge, setChallenge] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const INDUSTRIES = [
    "Healthcare & Life Sciences",
    "Financial Services & Banking",
    "Retail & E-Commerce",
    "Manufacturing & Logistics",
    "SaaS & Technology",
    "Education & EdTech",
    "Real Estate & PropTech"
  ];

  const handleAnalyze = async () => {
    if (!industry || !challenge) {
      setError("Please select an industry and describe your core challenge.");
      return;
    }
    setError(null);
    setIsLoading(true);
    setResult(null);

    try {
      const response = await fetch("/api/solution-recommender", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ industry, challenge })
      });

      const data = await response.json();

      if (response.ok) {
        setResult(data);
      } else {
        setError(data.error || "Failed to generate AI recommendations.");
      }
    } catch (err) {
      setError("A network error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="container mx-auto px-6 md:px-12 py-24 relative overflow-hidden">
      {/* Glow effects */}
      <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-primary/10 blur-[150px] rounded-full pointer-events-none -translate-y-1/2" />
      
      <SectionHeader 
        highlight="AI Solution Recommender"
        title="Personalized Architecture Strategy"
        subtitle="Input your industry and core business challenge to generate a bespoke, highly actionable AI and digital transformation roadmap."
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-7xl mx-auto items-start">
        
        {/* Left Column: Form Input */}
        <div className="lg:col-span-5 bg-white/5 border border-white/10 rounded-3xl p-6 md:p-8 backdrop-blur-xl sticky top-24">
          <div className="mb-8">
            <h3 className="text-xl font-bold text-white flex items-center gap-2 mb-2">
              <Brain className="w-5 h-5 text-primary" /> Architecture Discovery
            </h3>
            <p className="text-sm text-gray-400">Tell our Principal AI exactly what you're trying to solve.</p>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2 ml-1">Your Industry</label>
              <div className="relative">
                <select 
                  value={industry}
                  onChange={(e) => setIndustry(e.target.value)}
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3.5 text-white appearance-none focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all font-medium cursor-pointer"
                >
                  <option value="" disabled className="text-gray-500 bg-gray-900">Select an industry...</option>
                  {INDUSTRIES.map(ind => (
                    <option key={ind} value={ind} className="bg-gray-900">{ind}</option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none">
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2 ml-1">Primary Business Challenge</label>
              <textarea 
                value={challenge}
                onChange={(e) => setChallenge(e.target.value)}
                placeholder="e.g. We spend too much time manually processing invoices, and our legacy database is too slow to query reporting metrics."
                className="w-full h-32 bg-black/40 border border-white/10 text-white rounded-xl px-4 py-3.5 focus:outline-none focus:border-primary focus:bg-white/5 transition-colors resize-none placeholder-gray-600 text-sm leading-relaxed"
              />
            </div>

            {error && <p className="text-red-400 text-sm font-medium px-1">{error}</p>}

            <Button 
              onClick={handleAnalyze} 
              disabled={isLoading || !industry || !challenge} 
              className="w-full h-14 text-lg mt-2 relative overflow-hidden group"
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="w-5 h-5 animate-spin" /> Synthesizing Strategy...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-white" /> Generate Solutions
                </span>
              )}
            </Button>
          </div>
        </div>

        {/* Right Column: Dynamic Results */}
        <div className="lg:col-span-7">
          <AnimatePresence mode="wait">
            {!result && !isLoading && (
              <motion.div 
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="h-full min-h-[400px] flex flex-col items-center justify-center text-center p-8 bg-black/20 border border-white/5 rounded-3xl"
              >
                <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mb-6">
                  <Terminal className="w-8 h-8 text-gray-500" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Awaiting Context</h3>
                <p className="text-gray-500 max-w-sm text-sm leading-relaxed">
                  Provide your industry and challenge to receive three deeply customized, enterprise-grade AI technical solutions.
                </p>
              </motion.div>
            )}

            {isLoading && (
              <motion.div 
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="h-full min-h-[500px] flex flex-col items-center justify-center bg-black/20 border border-white/5 rounded-3xl"
              >
                <div className="relative w-24 h-24 mb-6">
                  <div className="absolute inset-0 border-4 border-white/10 rounded-full"></div>
                  <div className="absolute inset-0 border-4 border-primary rounded-full border-t-transparent animate-spin duration-1000"></div>
                </div>
                <p className="text-primary font-medium animate-pulse">Running architectural analysis loops...</p>
                <p className="text-gray-500 text-xs mt-2">Connecting to Qwen 2.5 72B Instruct</p>
              </motion.div>
            )}

            {result && !isLoading && (
              <motion.div 
                key="results"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="space-y-6"
              >
                {/* Industry Context Banner */}
                <div className="bg-gradient-to-r from-primary/10 to-transparent border-l-2 border-primary p-5 rounded-r-2xl mb-8">
                  <p className="text-gray-300 text-sm leading-relaxed italic">
                    "{result.industryContext}"
                  </p>
                </div>

                {/* Recommendations Grid */}
                <div className="space-y-6">
                  {result.recommendations?.map((rec, i) => (
                    <motion.div 
                      key={i}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: i * 0.15 }}
                      className="bg-[#0f0f13] border border-white/10 rounded-3xl p-6 md:p-8 hover:border-white/20 transition-colors relative overflow-hidden group"
                    >
                      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-[50px] group-hover:bg-primary/10 transition-colors pointer-events-none" />
                      
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                          <span className="text-primary font-black font-mono">{i + 1}</span>
                        </div>
                        <h4 className="text-xl font-bold text-white leading-tight">{rec.name}</h4>
                      </div>

                      <p className="text-gray-400 text-sm leading-relaxed mb-6">
                        {rec.description}
                      </p>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                        <div className="bg-emerald-500/5 border border-emerald-500/10 p-4 rounded-xl">
                          <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-2">
                            <TrendingUp className="w-3.5 h-3.5" /> Expected Impact
                          </div>
                          <p className="text-emerald-100 text-sm leading-snug">{rec.impact}</p>
                        </div>
                        <div className="bg-white/5 border border-white/5 p-4 rounded-xl">
                          <div className="flex items-center gap-2 text-gray-400 text-xs font-bold uppercase tracking-wider mb-2">
                            <Clock className="w-3.5 h-3.5" /> Time to Value
                          </div>
                          <p className="text-white text-sm leading-snug">{rec.timeToValue}</p>
                        </div>
                      </div>

                      <div>
                        <div className="flex items-center gap-2 text-gray-400 text-xs font-bold uppercase tracking-wider mb-3">
                          <Zap className="w-3.5 h-3.5" /> Recommended Tech Stack
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {rec.technologies?.map((tech, tIdx) => (
                            <span key={tIdx} className="px-3 py-1 bg-white/5 border border-white/10 text-gray-300 text-xs font-medium rounded-lg">
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
