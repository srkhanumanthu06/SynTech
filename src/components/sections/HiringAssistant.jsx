"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import { FileText, Target, Loader2, TargetIcon, Sparkles, AlertTriangle, HelpCircle, Upload, CheckCircle2, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export function HiringAssistant() {
  const [resumeFile, setResumeFile] = useState(null);
  const [roleTarget, setRoleTarget] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleAnalyze = async () => {
    if (!resumeFile || !roleTarget) {
      setError("Please provide both a Resume (PDF/Image) and a target role.");
      return;
    }
    setError(null);
    setIsLoading(true);
    setResult(null);

    try {
      const formData = new FormData();
      formData.append("resumeFile", resumeFile);
      formData.append("roleTarget", roleTarget);

      const response = await fetch("/api/analyze-resume", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        setResult(data);
      } else {
        setError(data.error || "Failed to analyze candidate.");
      }
    } catch (err) {
      setError("A network error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="container mx-auto px-6 md:px-12">
      <SectionHeader 
        highlight="AI Hiring Assistant"
        title="Intelligent Talent Analytics"
        subtitle="Leverage our proprietary LLM architecture to evaluate resumes, score candidates, and generate dynamic interview paths in seconds."
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-7xl mx-auto">
        {/* Input Form Column */}
        <div className="lg:col-span-5 flex flex-col gap-6 bg-white/5 border border-white/10 rounded-3xl p-6 md:p-8 backdrop-blur-xl">
          <div>
            <label className="flex items-center gap-2 text-white font-medium mb-3">
              <Target className="w-5 h-5 text-primary" /> Open Roles
            </label>
            <div className="relative">
              <select 
                value={roleTarget}
                onChange={(e) => setRoleTarget(e.target.value)}
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white appearance-none focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all font-medium cursor-pointer"
              >
                <option value="" disabled className="text-gray-500 bg-gray-900">Select an open position...</option>
                <option value="Senior Machine Learning Engineer" className="bg-gray-900">Senior Machine Learning Engineer</option>
                <option value="Cloud Solutions Architect" className="bg-gray-900">Cloud Solutions Architect</option>
                <option value="Full Stack Software Engineer" className="bg-gray-900">Full Stack Software Engineer</option>
                <option value="Data Scientist (AI/NLP)" className="bg-gray-900">Data Scientist (AI/NLP)</option>
                <option value="DevOps & Reliability Engineer" className="bg-gray-900">DevOps & Reliability Engineer</option>
                <option value="Frontend UX Engineer" className="bg-gray-900">Frontend UX Engineer</option>
              </select>
              {/* Custom dropdown arrow */}
              <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none">
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          <div className="flex-1 flex flex-col justify-center min-h-[220px]">
            <label className="flex items-center gap-2 text-white font-medium mb-3">
              <FileText className="w-5 h-5 text-secondary" /> Resume Upload (PDF / Image)
            </label>
            <label className={cn(
                  "flex-1 flex flex-col items-center justify-center p-6 border-2 border-dashed rounded-xl cursor-pointer transition-all",
                  resumeFile ? "border-primary bg-primary/5" : "border-white/20 bg-black/40 hover:border-white/40 hover:bg-white/5"
                )}>
              <div className="flex flex-col items-center justify-center pt-5 pb-6 text-center">
                <Upload className={cn("w-10 h-10 mb-4", resumeFile ? "text-primary" : "text-gray-400")} />
                {resumeFile ? (
                  <>
                    <p className="text-sm text-white font-medium mb-1">{resumeFile.name}</p>
                    <p className="text-xs text-secondary">Ready for Analysis</p>
                  </>
                ) : (
                  <>
                    <p className="text-sm text-gray-300 font-medium mb-1">Click to upload a PDF or Image</p>
                    <p className="text-xs text-gray-500">Supports .pdf, .png, .jpg, .webp</p>
                  </>
                )}
              </div>
              <input 
                type="file" 
                accept="application/pdf,image/png,image/jpeg,image/webp"
                onChange={(e) => {
                  if (e.target.files?.[0]) {
                    setResumeFile(e.target.files[0]);
                  }
                }}
                className="hidden"
              />
            </label>
          </div>

          {error && <p className="text-red-400 text-sm font-medium">{error}</p>}

          <Button 
            onClick={handleAnalyze} 
            disabled={isLoading || !resumeFile || !roleTarget} 
            className="w-full h-14 text-lg mt-2 relative overflow-hidden group"
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <Loader2 className="w-5 h-5 animate-spin" /> Processing Data...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <Sparkles className="w-5 h-5" /> Run AI Analysis
              </span>
            )}
          </Button>
        </div>

        {/* Results Column */}
        <div className="lg:col-span-7 bg-black/20 border border-white/10 rounded-3xl p-6 md:p-8 flex flex-col relative overflow-hidden">
          {/* Subtle background glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-[100px] pointer-events-none" />

          {!result && !isLoading && (
            <div className="flex-1 flex flex-col items-center justify-center text-center text-gray-400 opacity-60 px-4 py-20">
              <TargetIcon className="w-16 h-16 mb-6 opacity-30" />
              <h3 className="text-xl font-medium text-white mb-2">Awaiting Candidate Data</h3>
              <p className="max-w-sm text-sm leading-relaxed">Input a role and paste a resume to generate an automated candidate profile, score, and interview matrix.</p>
            </div>
          )}

          {isLoading && (
            <div className="flex-1 flex flex-col items-center justify-center py-20">
              <div className="relative w-24 h-24 flex items-center justify-center">
                <div className="absolute inset-0 border-4 border-white/10 rounded-full"></div>
                <div className="absolute inset-0 border-4 border-primary rounded-full border-t-transparent animate-spin"></div>
              </div>
              <p className="mt-6 text-primary animate-pulse font-medium">Cross-referencing neural profiles...</p>
            </div>
          )}

          <AnimatePresence>
            {result && !isLoading && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col gap-8 relative z-10"
              >
                {/* Score & Main Analysis */}
                <div className="flex flex-col md:flex-row gap-8 items-start">
                  <div className="shrink-0 flex items-center justify-center relative w-32 h-32">
                    <svg className="w-full h-full transform -rotate-90">
                      <circle cx="64" cy="64" r="56" fill="transparent" stroke="rgba(255,255,255,0.1)" strokeWidth="12" />
                      <circle 
                        cx="64" cy="64" r="56" fill="transparent" 
                        stroke={result.score >= 80 ? "#2dd4bf" : result.score >= 50 ? "#facc15" : "#f87171"} 
                        strokeWidth="12" 
                        strokeDasharray={351} 
                        strokeDashoffset={351 - (351 * result.score) / 100} 
                        strokeLinecap="round"
                        className="transition-all duration-1000 ease-out"
                      />
                    </svg>
                    <div className="absolute flex flex-col items-center justify-center">
                      <span className="text-4xl font-black text-white">{result.score}</span>
                      <span className="text-xs text-gray-400 font-medium">/ 100</span>
                    </div>
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <h3 className="text-xl font-bold text-white">Overall Analysis</h3>
                      {result.isEligible !== undefined && (
                        result.isEligible ? (
                          <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5" /> Eligible for Role</span>
                        ) : (
                          <span className="px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-bold flex items-center gap-1.5"><XCircle className="w-3.5 h-3.5" /> Not Eligible</span>
                        )
                      )}
                    </div>
                    {result.eligibilityReason && (
                      <div className={`p-3 rounded-lg border mb-4 text-sm ${result.isEligible ? 'bg-emerald-500/5 border-emerald-500/10 text-emerald-200' : 'bg-red-500/5 border-red-500/10 text-red-200'}`}>
                        <strong className={result.isEligible ? "text-emerald-400" : "text-red-400"}>Verdict:</strong> {result.eligibilityReason}
                      </div>
                    )}
                    <p className="text-gray-300 leading-relaxed text-sm bg-white/5 p-4 rounded-xl border border-white/5">
                      {result.analysis}
                    </p>
                  </div>
                </div>

                {/* Role Matching Pros/Cons */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white/5 border border-white/5 p-5 rounded-xl">
                    <h4 className="text-green-400 font-semibold mb-4 flex items-center gap-2 text-sm">
                      <Sparkles className="w-4 h-4" /> Core Strengths
                    </h4>
                    <ul className="space-y-3">
                      {result.roleMatching?.pros?.map((pro, i) => (
                        <li key={i} className="text-sm text-gray-300 leading-relaxed flex items-start gap-3">
                          <span className="w-1.5 h-1.5 rounded-full bg-green-500 mt-1.5 shrink-0" /> {pro}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="bg-white/5 border border-white/5 p-5 rounded-xl">
                    <h4 className="text-amber-400 font-semibold mb-4 flex items-center gap-2 text-sm">
                      <AlertTriangle className="w-4 h-4" /> Potential Risks
                    </h4>
                    <ul className="space-y-3">
                      {result.roleMatching?.cons?.map((con, i) => (
                        <li key={i} className="text-sm text-gray-300 leading-relaxed flex items-start gap-3">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0" /> {con}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Intelligent Interview Questions */}
                <div>
                  <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                    <HelpCircle className="w-5 h-5 text-primary" /> Generated Interview Path
                  </h3>
                  <div className="space-y-4">
                    {result.questions?.map((q, i) => (
                      <div key={i} className="bg-gradient-to-r from-primary/10 to-transparent border-l-2 border-primary p-4 rounded-r-xl">
                        <p className="text-sm font-medium text-gray-200">{q}</p>
                      </div>
                    ))}
                  </div>
                </div>

              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
