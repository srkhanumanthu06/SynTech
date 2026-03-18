"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send, Bot, User, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: "bot", text: "Hello! I am the SynTech AI Consultant. How can I transform your business today?" }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef(null);

  // Auto-scroll to bottom
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleSend = async (e) => {
    e?.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMsg = input.trim();
    setInput("");
    
    // Optimistic UI update
    const newHistory = [...messages, { role: "user", text: userMsg }];
    setMessages(newHistory);
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // Pass all previous messages (except the very first static greeting) as history
        body: JSON.stringify({ 
          message: userMsg, 
          history: newHistory.slice(1, -1) 
        }),
      });

      const data = await response.json();

      if (response.ok && data.reply) {
        setMessages((prev) => [...prev, { role: "bot", text: data.reply }]);
      } else {
        setMessages((prev) => [...prev, { role: "bot", text: "I'm having trouble connecting to my neural network. Please try again later or ensure the API key is set." }]);
      }
    } catch (error) {
      setMessages((prev) => [...prev, { role: "bot", text: "A system error occurred. Communication failed." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={cn(
          "fixed bottom-6 right-6 z-50 p-4 rounded-full shadow-2xl transition-all",
          "bg-gradient-to-r from-primary to-secondary text-white border border-white/20 hover:shadow-[0_0_20px_rgba(123,47,247,0.5)]",
          isOpen ? "opacity-0 pointer-events-none scale-50" : "opacity-100 scale-100"
        )}
      >
        <MessageSquare className="w-6 h-6" />
      </motion.button>

      {/* Chat Window - Full Screen Floating Tab */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed inset-0 md:inset-6 lg:inset-10 z-[100] bg-background/80 backdrop-blur-3xl border border-white/10 md:rounded-[2.5rem] shadow-[0_0_100px_rgba(0,0,0,0.5)] flex flex-col overflow-hidden"
          >
            {/* Background Accent Glows */}
            <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-primary/20 blur-[150px] rounded-full pointer-events-none -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-secondary/10 blur-[150px] rounded-full pointer-events-none translate-x-1/2 translate-y-1/2" />

            {/* Header */}
            <div className="flex items-center justify-between p-6 md:p-8 border-b border-white/5 bg-white/5 relative z-10">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white shadow-lg">
                  <Bot className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl md:text-2xl font-black text-white tracking-tight">SynTech AI Consultant</h3>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                    <span className="text-xs font-bold text-emerald-500 tracking-widest uppercase">Direct Neural Link Active</span>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-3 rounded-full bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:bg-white/10 transition-all shadow-xl"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-6 md:p-12 space-y-8 custom-scrollbar relative z-10">
              <div className="max-w-4xl mx-auto space-y-8">
                {messages.map((msg, idx) => (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    key={idx} 
                    className={cn(
                      "flex flex-col gap-2 max-w-[90%] md:max-w-[75%]",
                      msg.role === "user" ? "ml-auto items-end" : "mr-auto items-start"
                    )}
                  >
                    <div className={cn(
                      "flex items-center gap-2 mb-1",
                      msg.role === "user" ? "flex-row-reverse" : ""
                    )}>
                      <div className={cn("w-6 h-6 rounded-lg flex items-center justify-center", msg.role === "user" ? "bg-primary/20" : "bg-white/10")}>
                        {msg.role === "user" ? <User className="w-3 h-3 text-primary" /> : <Bot className="w-3 h-3 text-white" />}
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500">
                        {msg.role === "user" ? "Client" : "SynTech Architect"}
                      </span>
                    </div>
                    <div className={cn(
                      "px-6 py-4 rounded-3xl text-sm md:text-base leading-relaxed shadow-xl",
                      msg.role === "user" 
                        ? "bg-primary text-background rounded-tr-none font-medium" 
                        : "bg-white/5 border border-white/10 text-gray-200 rounded-tl-none backdrop-blur-md"
                    )}>
                      {msg.text}
                    </div>
                  </motion.div>
                ))}
                
                {isLoading && (
                  <div className="mr-auto flex flex-col items-start gap-2">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-6 h-6 rounded-lg bg-white/10 flex items-center justify-center">
                        <Bot className="w-3 h-3 text-white" />
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-primary animate-pulse">Syncing...</span>
                    </div>
                    <div className="bg-white/5 border border-white/10 rounded-3xl rounded-tl-none px-6 py-4 flex items-center gap-3 text-primary shadow-xl">
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span className="text-sm font-medium">Analyzing technical requirements...</span>
                    </div>
                  </div>
                )}
                <div ref={chatEndRef} />
              </div>
            </div>

            {/* Input Area */}
            <div className="p-6 md:p-12 border-t border-white/5 bg-white/5 relative z-10">
              <form onSubmit={handleSend} className="max-w-4xl mx-auto flex items-center gap-4 relative">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Inquire about enterprise architecture, AI integration, or strategy..."
                  className="flex-1 bg-black/40 border border-white/10 rounded-[2rem] px-8 py-5 text-base md:text-lg text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all shadow-2xl"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className="absolute right-2 p-4 bg-primary rounded-full text-background hover:bg-white transition-all shadow-xl disabled:opacity-50 disabled:cursor-not-allowed group"
                >
                  <Send className="w-6 h-6 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </button>
              </form>
              <p className="text-center mt-6 text-[10px] uppercase tracking-[0.2em] text-gray-600 font-bold">
                End-to-End Enterprise Encryption Active
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
