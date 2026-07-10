"use client";

import React, { createContext, useContext } from "react";
import { usePitchingChart } from "@/hooks/usePitchingChart";

type PitchingChartContextValue = ReturnType<typeof usePitchingChart>;

const PitchingChartContext =
  createContext<PitchingChartContextValue | null>(null);

export function PitchingChartProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const chart = usePitchingChart();

  return (
    <PitchingChartContext.Provider value={chart}>
      {children}
    </PitchingChartContext.Provider>
  );
}

export function usePitchingChartContext() {
  const context = useContext(PitchingChartContext);

  if (!context) {
    throw new Error(
      "usePitchingChartContext must be used inside PitchingChartProvider"
    );
  }

  return context;
}