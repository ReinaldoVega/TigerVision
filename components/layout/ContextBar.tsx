"use client";

import { useChartContext } from "@/context/ChartContext";

export default function ContextBar() {
  const {
    currentAtBat,
    progress,
    nextStep,
    gameInfo,
    outs,
    savedAtBats,
  } = useChartContext();

  const items = [
    ["Batter", currentAtBat.batter],
    ["AB", String(currentAtBat.abNumber)],
    ["Pitch #", String(currentAtBat.pitchNumber)],
    ["Hand", `${currentAtBat.batterHand}HH`],
    ["Count", currentAtBat.count || "-"],
    ["Outs", String(outs)],
    ["Runners", currentAtBat.runners || "Empty"],
    ["Inning", gameInfo.inning],
    ["Next", nextStep],
    ["Charted", String(savedAtBats.length)],
    ["Progress", `${progress}%`],
  ];

  return (
    <div className="grid h-full grid-cols-11 overflow-hidden rounded-2xl border border-[#25476D] bg-[#081A33] text-white shadow-[0_10px_24px_rgba(0,0,0,.25)]">
      {items.map(([label, value]) => (
        <div
          key={label}
          className="flex items-center justify-center border-r border-[#25476D] last:border-r-0"
        >
          <div className="text-center">
            <p className="text-[9px] font-black uppercase tracking-[2px] text-slate-400">
              {label}
            </p>
            <p className="mt-1 text-xs font-black text-white">{value}</p>
          </div>
        </div>
      ))}
    </div>
  );
}