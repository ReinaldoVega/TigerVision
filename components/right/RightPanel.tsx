"use client";

import { useState } from "react";
import FieldCard from "@/components/field/FieldCard";
import LiveAB from "@/components/live/LiveAB";
import Card from "@/components/layout/Card";
import QuickCorrections from "@/components/right/QuickCorrections";
import { useChartContext } from "@/context/ChartContext";
import { generateAtBatText } from "@/core/chart/summary";

export default function RightPanel() {
  const [tab, setTab] = useState<"field" | "ai">("field");

  return (
    <Card
      title="Chart Panel"
      dark
      className="h-full"
      bodyClassName="flex h-[calc(100%-46px)] flex-col p-4"
      action={
        <div className="flex gap-2">
          <Tab label="Field" active={tab === "field"} onClick={() => setTab("field")} />
          <Tab label="AI" active={tab === "ai"} onClick={() => setTab("ai")} />
        </div>
      }
    >
      {tab === "field" && (
        <div className="grid h-full grid-rows-[335px_1fr] gap-4">
          <FieldCard compact />

          <div className="grid min-h-0 grid-rows-[1fr_40px] gap-3">
             <LiveAB />
             <QuickCorrections />
        </div>
        </div>
      )}

      {tab === "ai" && <AISummary />}
    </Card>
  );
}

function Tab({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`rounded-lg px-4 py-1 text-[10px] font-black uppercase ${
        active ? "bg-[#FA4616] text-white" : "bg-[#07111F] text-slate-300"
      }`}
    >
      {label}
    </button>
  );
}

function AISummary() {
  const { currentAtBat } = useChartContext();

  return (
    <div className="h-full rounded-2xl border border-[#25476D] bg-[#07111F] p-5">
      <p className="text-xs font-black uppercase tracking-[3px] text-slate-400">
        AI Game Note
      </p>

      <p className="mt-4 text-sm font-semibold leading-6 text-white">
        {generateAtBatText(currentAtBat)}
      </p>

      <button className="mt-6 h-11 w-full rounded-xl bg-[#FA4616] text-sm font-black uppercase text-white">
        Generate Game Summary
      </button>
    </div>
  );
}