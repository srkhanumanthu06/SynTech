"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Maximize2, Minimize2, Sparkles, Brain, Target, Calculator } from "lucide-react";
import { useAiSuite } from "@/context/AiSuiteContext";
import { ProjectEstimator } from "@/components/sections/ProjectEstimator";
import { TechAdvisor } from "@/components/sections/TechAdvisor";
import { HiringAssistant } from "@/components/sections/HiringAssistant";
import { SolutionRecommender } from "@/components/sections/SolutionRecommender";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

const TOOLS = {
  estimator: {
    component: ProjectEstimator,
    title: "AI Project Estimator",
    icon: <Calculator className="w-5 h-5" />,
    color: "from-blue-500 to-cyan-500"
  },
  advisor: {
    component: TechAdvisor,
    title: "AI Tech Advisor",
    icon: <Brain className="w-5 h-5" />,
    color: "from-purple-500 to-pink-500"
  },
  hiring: {
    component: HiringAssistant,
    title: "AI Hiring Assistant",
    icon: <Target className="w-5 h-5" />,
    color: "from-emerald-500 to-teal-500"
  },
  solutions: {
    component: SolutionRecommender,
    title: "AI Solution Recommender",
    icon: <Sparkles className="w-5 h-5" />,
    color: "from-amber-500 to-orange-500"
  }
};

export function AiSuitePortal() {
  const { activeTool, closeTool } = useAiSuite();
  const [isMaximized, setIsMaximized] = useState(false);

  // Prevent scroll when portal is open
  useEffect(() => {
    if (activeTool) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [activeTool]);

  const toolData = activeTool ? TOOLS[activeTool] : null;
  const ToolComponent = toolData?.component;

  return (
    <AnimatePresence>
      {activeTool && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeTool}
            className="absolute inset-0 bg-background/60 backdrop-blur-xl"
          />

          {/* Panel */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ 
              opacity: 1, 
              scale: 1, 
              y: 0,
              width: isMaximized ? "100%" : "90%",
              height: isMaximized ? "100%" : "90%",
              maxWidth: isMaximized ? "none" : "1400px",
              maxHeight: isMaximized ? "none" : "900px"
            }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300, mass: 0.5 }}
            className={cn(
               "relative bg-[#0A0A0A] border border-white/10 rounded-[2.5rem] shadow-[0_0_100px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col",
               isMaximized ? "rounded-none" : ""
            )}
          >
             {/* Header */}
             <div className="flex items-center justify-between px-8 py-6 border-b border-white/5 relative z-10 bg-black/40 backdrop-blur-md">
                <div className="flex items-center gap-4">
                   <div className={cn("p-3 rounded-2xl bg-gradient-to-br text-white shadow-lg", toolData.color)}>
                      {toolData.icon}
                   </div>
                   <div>
                      <h2 className="text-xl font-bold text-white tracking-tight">{toolData.title}</h2>
                      <div className="flex items-center gap-2">
                         <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                         <span className="text-[10px] text-gray-500 uppercase tracking-widest font-black text-white/40">Secure AI Instance Active</span>
                      </div>
                   </div>
                </div>

                <div className="flex items-center gap-2">
                   <button 
                    onClick={() => setIsMaximized(!isMaximized)}
                    className="p-3 rounded-xl hover:bg-white/5 text-gray-400 hover:text-white transition-all hidden md:block"
                   >
                      {isMaximized ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}
                   </button>
                   <button 
                    onClick={closeTool}
                    className="p-3 rounded-xl bg-white/5 hover:bg-rose-500/20 text-gray-400 hover:text-rose-400 transition-all border border-white/5"
                   >
                      <X className="w-5 h-5" />
                   </button>
                </div>
             </div>

             {/* Content Area */}
             <div className="flex-1 overflow-y-auto custom-scrollbar p-8 md:p-12 relative">
                {/* Background Details */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 blur-[150px] rounded-full pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-secondary/5 blur-[150px] rounded-full pointer-events-none" />
                
                <div className="relative z-10 w-full mb-20">
                    <ToolComponent />
                </div>
             </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
