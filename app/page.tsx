"use client";

import Dashboard from "@/components/layout/Dashboard";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ContextBar from "@/components/layout/ContextBar";

import Lineup from "@/components/lineup/Lineup";
import Timeline from "@/components/lineup/Timeline";
import QuickChart from "@/components/quickchart/QuickChart";
import RightPanel from "@/components/right/RightPanel";
import GameSetup from "@/components/game/GameSetup";

import { ChartProvider, useChartContext } from "@/context/ChartContext";

function AppContent() {
  const { hasGame } = useChartContext();

  if (!hasGame) {
    return <GameSetup />;
  }

  return (
    <Dashboard
      header={<Header />}
      context={<ContextBar />}
      left={
        <div className="grid h-full grid-rows-[1fr_220px] gap-4">
          <Lineup />
          <Timeline />
        </div>
      }
      center={<QuickChart />}
      right={<RightPanel />}
      footer={<Footer />}
    />
  );
}

export default function Home() {
  return (
    <ChartProvider>
      <AppContent />
    </ChartProvider>
  );
}
