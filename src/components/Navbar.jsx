"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown, Sparkles, Cpu, Calculator, Users, Lightbulb } from "lucide-react";
import { SynTechLogo } from "@/components/ui/SynTechLogo";
import { cn } from "@/lib/utils";
import { useAiSuite } from "@/context/AiSuiteContext";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { openTool } = useAiSuite();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "About", href: "/#about" },
    { name: "Capabilities", href: "/capabilities" },
    { name: "Services", href: "/#services" },
    { name: "Tech Explorer", href: "/tech-explorer" },
  ];

  const aiSuiteLinks = [
    { 
      id: "estimator",
      name: "AI Estimator", 
      icon: <Calculator className="w-4 h-4" />, 
      desc: "Instant project scope & budget analysis" 
    },
    { 
      id: "advisor",
      name: "AI Tech Advisor", 
      icon: <Lightbulb className="w-4 h-4" />, 
      desc: "Personalized architecture recommendations" 
    },
    { 
      id: "hiring",
      name: "AI Hiring", 
      icon: <Users className="w-4 h-4" />, 
      desc: "Smart resume analysis & fit scoring" 
    },
    { 
      id: "solutions",
      name: "AI Solutions", 
      icon: <Sparkles className="w-4 h-4" />, 
      desc: "Custom industry strategy generation" 
    },
  ];

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-background/80 backdrop-blur-md border-b border-white/10 py-3"
          : "bg-transparent py-5"
      )}
    >
      <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <SynTechLogo className="h-8 w-auto group-hover:scale-105 transition-transform" />
          <span className="text-xl font-bold tracking-tight text-white">
            SynTech
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-gray-300 hover:text-primary transition-colors"
            >
              {link.name}
            </Link>
          ))}

          {/* AI Suite Dropdown */}
          <div 
            className="relative"
            onMouseEnter={() => setIsDropdownOpen(true)}
            onMouseLeave={() => setIsDropdownOpen(false)}
          >
            <button className="flex items-center gap-1.5 text-sm font-medium text-gray-300 hover:text-primary transition-colors cursor-pointer outline-none">
              AI Suite
              <ChevronDown className={cn("w-4 h-4 transition-transform duration-300", isDropdownOpen ? "rotate-180" : "")} />
            </button>

            <AnimatePresence>
              {isDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-72 bg-background/95 backdrop-blur-xl border border-white/10 rounded-2xl p-2 shadow-2xl overflow-hidden"
                >
                  <div className="absolute inset-0 bg-primary/5 pointer-events-none" />
                  <div className="relative z-10 space-y-1">
                    {aiSuiteLinks.map((link) => (
                      <button
                        key={link.id}
                        onClick={() => {
                          openTool(link.id);
                          setIsDropdownOpen(false);
                        }}
                        className="w-full flex items-start gap-3 p-3 rounded-xl hover:bg-white/5 transition-all group text-left"
                      >
                        <div className="mt-1 p-2 rounded-lg bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors">
                          {link.icon}
                        </div>
                        <div>
                          <div className="text-sm font-bold text-white group-hover:text-primary transition-colors">
                            {link.name}
                          </div>
                          <div className="text-[10px] text-gray-400 leading-tight mt-0.5">
                            {link.desc}
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <Link
            href="/contact-strategy"
            className="px-5 py-2.5 rounded-full bg-primary/10 text-primary border border-primary/30 hover:bg-primary/20 hover:border-primary/50 transition-all text-sm font-medium"
          >
            Get in Touch
          </Link>
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-white hover:text-primary transition-colors"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="absolute top-full left-0 right-0 bg-background/95 backdrop-blur-xl border-b border-white/10 shadow-2xl md:hidden overflow-hidden"
          >
            <div className="container mx-auto px-6 py-8 flex flex-col gap-8 text-center">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-lg font-medium text-gray-300 hover:text-primary transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}

              {/* Mobile AI Suite Section */}
              <div className="space-y-4">
                <div className="text-[10px] uppercase tracking-[0.3em] text-primary font-black">AI Suite Tools</div>
                <div className="grid grid-cols-2 gap-4">
                   {aiSuiteLinks.map((link) => (
                    <button
                      key={link.id}
                      onClick={() => {
                        openTool(link.id);
                        setIsMobileMenuOpen(false);
                      }}
                      className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-white/5 border border-white/10"
                    >
                      <div className="text-primary">{link.icon}</div>
                      <span className="text-xs font-bold text-white">{link.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              <Link
                href="/contact-strategy"
                className="px-8 py-4 rounded-full bg-primary/10 text-primary border border-primary/30 hover:bg-primary/20 transition-all text-lg font-bold"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Get in Touch
              </Link>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
