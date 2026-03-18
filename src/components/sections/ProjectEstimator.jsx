"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import { Loader2, Sparkles, Clock, DollarSign, Layers, AlertTriangle, ChevronRight, Zap } from "lucide-react";

const INDUSTRIES = ["SaaS / Software", "FinTech", "HealthTech", "E-Commerce", "EdTech", "Logistics", "Enterprise", "AI / ML", "Other"];
const SCALES = ["Solo / Freelancer", "Small (2-10)", "Medium (11-50)", "Large (50+)"];

const COMPLEXITY_COLOR = {
  Low: "text-emerald-400 border-emerald-400/30 bg-emerald-400/10",
  Medium: "text-amber-400 border-amber-400/30 bg-amber-400/10",
  High: "text-orange-400 border-orange-400/30 bg-orange-400/10",
  Enterprise: "text-rose-400 border-rose-400/30 bg-rose-400/10",
};

export function ProjectEstimator() {
  const [description, setDescription] = useState("");
  const [industry, setIndustry] = useState("");
  const [scale, setScale] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleEstimate = async () => {
    if (!description.trim()) { setError("Please describe your project."); return; }
    setError(null); setIsLoading(true); setResult(null);
    try {
      const res = await fetch("/api/estimate-project", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ description, industry, scale }),
      });
      const data = await res.json();
      if (res.ok) setResult(data);
      else setError(data.error || "Failed to generate estimate.");
    } catch { setError("A network error occurred."); }
    finally { setIsLoading(false); }
  };

  return (
    <section className="container mx-auto px-6 md:px-12">
      <SectionHeader
        highlight="AI Project Estimator"
        title="Intelligent Project Scoping"
        subtitle="Describe your vision and our AI will generate a full breakdown — timeline, budget, tech stack, and project phases."
      />
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-7xl mx-auto">
        {/* Input Panel */}
        <div className="lg:col-span-4 flex flex-col gap-5 bg-white/5 border border-white/10 rounded-3xl p-6 md:p-8 backdrop-blur-xl">
          <div>
            <label className="text-white font-medium text-sm mb-2 block">Project Description *</label>
            <textarea
              rows={6}
              placeholder="e.g. A SaaS platform for small law firms to manage client cases, billing, and court scheduling with AI-powered contract review..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-gray-300 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none"
            />
          </div>
          <div>
            <label className="text-white font-medium text-sm mb-2 block">Industry</label>
            <div className="relative">
              <select value={industry} onChange={(e) => setIndustry(e.target.value)} className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white appearance-none focus:outline-none focus:ring-2 focus:ring-primary/50 cursor-pointer">
                <option value="">Select industry...</option>
                {INDUSTRIES.map(i => <option key={i} value={i} className="bg-gray-900">{i}</option>)}
              </select>
              <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none"><svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg></div>
            </div>
          </div>
          <div>
            <label className="text-white font-medium text-sm mb-2 block">Team Scale</label>
            <div className="relative">
              <select value={scale} onChange={(e) => setScale(e.target.value)} className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white appearance-none focus:outline-none focus:ring-2 focus:ring-primary/50 cursor-pointer">
                <option value="">Select scale...</option>
                {SCALES.map(s => <option key={s} value={s} className="bg-gray-900">{s}</option>)}
              </select>
              <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none"><svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg></div>
            </div>
          </div>

          {error && <p className="text-red-400 text-sm font-medium">{error}</p>}
          <Button onClick={handleEstimate} disabled={isLoading || !description} className="w-full h-12 mt-auto">
            {isLoading ? <span className="flex items-center gap-2"><Loader2 className="w-4 h-4 animate-spin" /> Analyzing...</span>
              : <span className="flex items-center gap-2"><Sparkles className="w-4 h-4" /> Generate Estimate</span>}
          </Button>
        </div>

        {/* Results Panel */}
        <div className="lg:col-span-8 bg-black/20 border border-white/10 rounded-3xl p-6 md:p-8 relative overflow-hidden min-h-[500px] flex flex-col">
          <div className="absolute top-0 right-0 w-96 h-96 bg-secondary/10 rounded-full blur-[100px] pointer-events-none" />

          {!result && !isLoading && (
            <div className="flex-1 flex flex-col items-center justify-center text-center opacity-50 py-20">
              <Layers className="w-16 h-16 mb-6 opacity-20" />
              <h3 className="text-xl font-medium text-white mb-2">Awaiting Project Brief</h3>
              <p className="max-w-sm text-sm text-gray-400">Describe your project idea to generate a full scoping document in seconds.</p>
            </div>
          )}

          {isLoading && (
            <div className="flex-1 flex flex-col items-center justify-center py-20">
              <div className="relative w-20 h-20">
                <div className="absolute inset-0 border-4 border-white/10 rounded-full" />
                <div className="absolute inset-0 border-4 border-secondary rounded-full border-t-transparent animate-spin" />
              </div>
              <p className="mt-6 text-secondary animate-pulse font-medium">Processing project architecture...</p>
            </div>
          )}

          <AnimatePresence>
            {result && !isLoading && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col gap-8 relative z-10">
                {/* Summary + KPIs */}
                <div>
                  <p className="text-gray-300 leading-relaxed text-sm bg-white/5 p-4 rounded-xl border border-white/5 mb-5">{result.summary}</p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                      { icon: <Clock className="w-5 h-5 text-primary" />, label: "Timeline", value: result.timeline },
                      { icon: <DollarSign className="w-5 h-5 text-emerald-400" />, label: "Budget Range", value: result.budgetRange },
                      { icon: <Zap className="w-5 h-5 text-amber-400" />, label: "Complexity", value: result.complexity, colored: true },
                      { icon: <Layers className="w-5 h-5 text-secondary" />, label: "Phases", value: `${result.phases?.length || 0} phases` },
                    ].map((kpi) => (
                      <div key={kpi.label} className="bg-white/5 border border-white/5 rounded-xl p-4 flex flex-col gap-1">
                        {kpi.icon}
                        <p className="text-xs text-gray-500 mt-1">{kpi.label}</p>
                        <p className={`font-bold text-sm ${kpi.colored ? COMPLEXITY_COLOR[kpi.value] : "text-white"}`}>{kpi.value}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tech Stack */}
                <div>
                  <h3 className="text-white font-bold text-lg mb-3">Recommended Tech Stack</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {result.techStack && Object.entries(result.techStack).map(([key, val]) => (
                      <div key={key} className="bg-gradient-to-br from-primary/10 to-transparent border border-primary/10 rounded-xl p-3">
                        <p className="text-xs text-gray-500 capitalize mb-1">{key}</p>
                        <p className="text-white font-semibold text-sm">{val}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Phases */}
                <div>
                  <h3 className="text-white font-bold text-lg mb-3">Project Phases</h3>
                  <div className="space-y-3">
                    {result.phases?.map((phase, i) => (
                      <div key={i} className="flex gap-4 bg-white/5 border border-white/5 p-4 rounded-xl">
                        <div className="w-7 h-7 rounded-full bg-primary/20 border border-primary/30 text-primary text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">{i + 1}</div>
                        <div>
                          <div className="flex items-center gap-2 mb-1"><p className="text-white font-semibold text-sm">{phase.name}</p><span className="text-xs text-primary bg-primary/10 px-2 py-0.5 rounded-full">{phase.duration}</span></div>
                          <p className="text-gray-400 text-xs leading-relaxed">{phase.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Risks */}
                {result.risks?.length > 0 && (
                  <div>
                    <h3 className="text-white font-bold text-lg mb-3 flex items-center gap-2"><AlertTriangle className="w-4 h-4 text-amber-400" /> Key Risks</h3>
                    <ul className="space-y-2">
                      {result.risks.map((risk, i) => (
                        <li key={i} className="text-sm text-gray-300 flex items-start gap-3">
                          <ChevronRight className="w-4 h-4 text-amber-400 mt-0.5 shrink-0" />{risk}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
