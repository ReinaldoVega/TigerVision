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

import PitchingChart from "@/components/pitching/PitchingChart";
import PitchSequence from "@/components/pitching/PitchSequence";

import {
  ChartProvider,
  useChartContext,
} from "@/context/ChartContext";

import {
  PitchingChartProvider,
} from "@/context/PitchingChartContext";

function OffenseMode() {
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

function PitchingMode() {
  return (
    <PitchingChartProvider>
      <Dashboard
        header={<Header />}
        context={<ContextBar />}
        left={
          <div className="grid h-full grid-rows-[1fr_220px] gap-4">
            <Lineup />
            <Timeline />
          </div>
        }
        center={<PitchingChart />}
        right={<PitchSequence />}
        footer={<Footer />}
      />
    </PitchingChartProvider>
  );
}

function AppContent() {
  const { hasGame, gameInfo } = useChartContext();

  if (!hasGame) {
    return <GameSetup />;
  }

  return gameInfo.chartMode === "pitching"
    ? <PitchingMode />
    : <OffenseMode />;
}

export default function Home() {
  return (
    <ChartProvider>
      <AppContent />
    </ChartProvider>
  );
}
