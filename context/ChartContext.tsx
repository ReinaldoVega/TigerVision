"use client";

import React, { createContext, useContext } from "react";
import { useChart } from "@/hooks/useChart";

type ChartContextValue = ReturnType<typeof useChart>;

const ChartContext = createContext<ChartContextValue | null>(null);

export function ChartProvider({ children }: { children: React.ReactNode }) {
  const chart = useChart();

  return (
    <ChartContext.Provider value={chart}>
      {children}
    </ChartContext.Provider>
  );
}

export function useChartContext() {
  const context = useContext(ChartContext);

  if (!context) {
    throw new Error("useChartContext must be used inside ChartProvider");
  }

  return context;
}