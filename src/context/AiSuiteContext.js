"use client";

import { createContext, useContext, useState } from "react";

const AiSuiteContext = createContext();

export function AiSuiteProvider({ children }) {
  const [activeTool, setActiveTool] = useState(null); // 'estimator', 'advisor', 'hiring', 'solutions'

  const openTool = (tool) => setActiveTool(tool);
  const closeTool = () => setActiveTool(null);

  return (
    <AiSuiteContext.Provider value={{ activeTool, openTool, closeTool }}>
      {children}
    </AiSuiteContext.Provider>
  );
}

export function useAiSuite() {
  const context = useContext(AiSuiteContext);
  if (!context) {
    throw new Error("useAiSuite must be used within an AiSuiteProvider");
  }
  return context;
}
