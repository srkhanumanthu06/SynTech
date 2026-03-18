"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import { Loader2, Sparkles, Code2, AlertTriangle, TrendingUp, BookOpen, Timer } from "lucide-react";

const EXPERIENCE_LEVELS = ["Beginner", "Intermediate", "Advanced", "Mixed Team"];
const PRIORITIES = ["Speed to Market", "Scalability", "Cost Efficiency", "Developer Experience", "Security"];

const CURVE_STYLES = {
  Easy: "text-emerald-400",
  Moderate: "text-amber-400",
  Steep: "text-rose-400",
};

export function TechAdvisor() {
  const [description, setDescription] = useState("");
  const [experience, setExperience] = useState("");
  const [priority, setPriority] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleAdvise = async () => {
    if (!description.trim()) { setError("Please describe your product."); return; }
    setError(null); setIsLoading(true); setResult(null);
    try {
      const res = await fetch("/api/tech-advisor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ description, experience, priority }),
      });
      const data = await res.json();
      if (res.ok) setResult(data);
      else setError(data.error || "Failed to generate tech stack.");
    } catch { setError("A network error occurred."); }
    finally { setIsLoading(false); }
  };

  return (
    <section className="container mx-auto px-6 md:px-12">
      <SectionHeader
        highlight="AI Tech Stack Advisor"
        title="Architecture Intelligence"
        subtitle="Describe your product and our AI recommends the perfect tech stack — with reasoning, alternatives, and pitfall warnings."
      />
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-7xl mx-auto">
        {/* Input Panel */}
        <div className="lg:col-span-4 flex flex-col gap-5 bg-white/5 border border-white/10 rounded-3xl p-6 md:p-8 backdrop-blur-xl">
          <div>
            <label className="text-white font-medium text-sm mb-2 block">Product Description *</label>
            <textarea
              rows={6}
              placeholder="e.g. A real-time multiplayer collaboration tool like Figma but for 3D design, targeting enterprise creative teams..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-gray-300 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-secondary/50 transition-all resize-none"
            />
          </div>
          <div>
            <label className="text-white font-medium text-sm mb-2 block">Team Experience</label>
            <div className="relative">
              <select value={experience} onChange={(e) => setExperience(e.target.value)} className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white appearance-none focus:outline-none focus:ring-2 focus:ring-secondary/50 cursor-pointer">
                <option value="">Select level...</option>
                {EXPERIENCE_LEVELS.map(l => <option key={l} value={l} className="bg-gray-900">{l}</option>)}
              </select>
              <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none"><svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg></div>
            </div>
          </div>
          <div>
            <label className="text-white font-medium text-sm mb-2 block">Primary Priority</label>
            <div className="relative">
              <select value={priority} onChange={(e) => setPriority(e.target.value)} className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white appearance-none focus:outline-none focus:ring-2 focus:ring-secondary/50 cursor-pointer">
                <option value="">Select priority...</option>
                {PRIORITIES.map(p => <option key={p} value={p} className="bg-gray-900">{p}</option>)}
              </select>
              <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none"><svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg></div>
            </div>
          </div>

          {error && <p className="text-red-400 text-sm font-medium">{error}</p>}
          <Button onClick={handleAdvise} disabled={isLoading || !description} className="w-full h-12 mt-auto" variant="secondary" style={{ background: "linear-gradient(135deg, #7B2FF7, #00D4FF)" }}>
            {isLoading ? <span className="flex items-center gap-2"><Loader2 className="w-4 h-4 animate-spin" /> Thinking...</span>
              : <span className="flex items-center gap-2"><Sparkles className="w-4 h-4" /> Generate Stack</span>}
          </Button>
        </div>

        {/* Results Panel */}
        <div className="lg:col-span-8 bg-black/20 border border-white/10 rounded-3xl p-6 md:p-8 relative overflow-hidden min-h-[500px] flex flex-col">
          <div className="absolute top-0 left-0 w-96 h-96 bg-primary/10 rounded-full blur-[120px] pointer-events-none" />

          {!result && !isLoading && (
            <div className="flex-1 flex flex-col items-center justify-center text-center opacity-50 py-20">
              <Code2 className="w-16 h-16 mb-6 opacity-20" />
              <h3 className="text-xl font-medium text-white mb-2">Awaiting Product Brief</h3>
              <p className="max-w-sm text-sm text-gray-400">Describe your product to receive a curated architecture blueprint.</p>
            </div>
          )}

          {isLoading && (
            <div className="flex-1 flex flex-col items-center justify-center py-20">
              <div className="relative w-20 h-20">
                <div className="absolute inset-0 border-4 border-white/10 rounded-full" />
                <div className="absolute inset-0 border-4 border-primary rounded-full border-t-transparent animate-spin" />
              </div>
              <p className="mt-6 text-primary animate-pulse font-medium">Architecting your stack...</p>
            </div>
          )}

          <AnimatePresence>
            {result && !isLoading && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col gap-8 relative z-10">
                {/* Header */}
                <div>
                  <h2 className="text-2xl font-black text-white mb-2">{result.headline}</h2>
                  <p className="text-gray-300 text-sm leading-relaxed bg-white/5 p-4 rounded-xl border border-white/5">{result.rationale}</p>
                  <div className="flex gap-4 mt-4">
                    {[
                      { icon: <TrendingUp className="w-4 h-4" />, label: "Scalability", value: `${result.scalabilityScore}/10`, color: "text-primary" },
                      { icon: <BookOpen className="w-4 h-4" />, label: "Learning Curve", value: result.learningCurve, color: CURVE_STYLES[result.learningCurve] || "text-white" },
                      { icon: <Timer className="w-4 h-4" />, label: "Setup Time", value: result.estimatedSetupTime, color: "text-emerald-400" },
                    ].map(m => (
                      <div key={m.label} className="flex-1 bg-white/5 border border-white/5 rounded-xl p-3 text-center">
                        <div className={`flex justify-center mb-1 ${m.color}`}>{m.icon}</div>
                        <p className="text-xs text-gray-500 mb-1">{m.label}</p>
                        <p className={`text-sm font-bold ${m.color}`}>{m.value}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Stack breakdown */}
                <div>
                  <h3 className="text-white font-bold text-lg mb-3">Stack Breakdown</h3>
                  <div className="space-y-3">
                    {result.stack?.map((item, i) => (
                      <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }} className="bg-white/5 border border-white/5 p-4 rounded-xl">
                        <div className="flex items-start justify-between gap-2 mb-1">
                          <div>
                            <span className="text-xs text-gray-500 uppercase tracking-widest">{item.category}</span>
                            <p className="text-white font-bold">{item.technology}</p>
                          </div>
                          <div className="flex gap-1">
                            {item.alternatives?.map((alt, j) => (
                              <span key={j} className="text-xs bg-white/5 border border-white/10 px-2 py-0.5 rounded-full text-gray-400">{alt}</span>
                            ))}
                          </div>
                        </div>
                        <p className="text-gray-400 text-xs leading-relaxed">{item.reason}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Warnings */}
                {result.warnings?.length > 0 && (
                  <div>
                    <h3 className="text-amber-400 font-bold text-sm mb-3 flex items-center gap-2"><AlertTriangle className="w-4 h-4" /> Watch Out For</h3>
                    <ul className="space-y-2">
                      {result.warnings.map((w, i) => (
                        <li key={i} className="text-sm text-gray-300 flex items-start gap-3">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0" />{w}
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
