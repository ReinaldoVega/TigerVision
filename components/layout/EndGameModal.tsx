"use client";

import { useState } from "react";
import { useChartContext } from "@/context/ChartContext";
import { buildAtBatsCsv, downloadCsv } from "@/core/chart/exportCsv";
import { exportGameChartPdf } from "@/core/chart/exportPdf";

export default function EndGameModal() {
  const { gameInfo, lineup, savedAtBats, newGame } = useChartContext();
  const [open, setOpen] = useState(false);

  function exportCsv() {
    const safeTeam = gameInfo.team.replace(/\s+/g, "-").toLowerCase();
    const safeOpp = (gameInfo.opponent || "opponent")
      .replace(/\s+/g, "-")
      .toLowerCase();

    const csv = buildAtBatsCsv(gameInfo, savedAtBats);
    downloadCsv(`${gameInfo.date}-${safeTeam}-vs-${safeOpp}.csv`, csv);
  }

  function exportPdf() {
  exportGameChartPdf({
    gameInfo,
    lineup,
    atBats: savedAtBats,
  });
}

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="h-11 rounded-xl border border-[#FA4616] px-5 text-sm font-black uppercase text-[#FA4616]"
      >
        End Game
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-5">
          <div className="w-full max-w-140 rounded-3xl border border-[#25476D] bg-[#081A33] p-5 text-white shadow-2xl">
            <p className="text-xs font-black uppercase tracking-[3px] text-[#FA4616]">
              Finish Game
            </p>

            <h2 className="mt-2 text-3xl font-black">
              {gameInfo.team} vs {gameInfo.opponent || "Opponent"}
            </h2>

            <div className="mt-5 grid grid-cols-3 gap-3">
              <Stat label="Date" value={gameInfo.date} />
              <Stat label="Inning" value={gameInfo.inning} />
              <Stat label="PA Saved" value={String(savedAtBats.length)} />
            </div>

            <div className="mt-6 grid grid-cols-3 gap-3">
              <button
  onClick={exportCsv}
  className="h-12 rounded-xl bg-[#FA4616] text-sm font-black uppercase text-white"
>
  Export CSV
</button>

<button
  onClick={exportPdf}
  className="h-12 rounded-xl bg-white text-sm font-black uppercase text-[#0C2340]"
>
  Export PDF
</button>

<button
  onClick={() => setOpen(false)}
  className="h-12 rounded-xl border border-[#25476D] text-sm font-black uppercase text-white"
>
  Continue
</button>
            </div>

            <button
              onClick={newGame}
              className="mt-3 h-12 w-full rounded-xl border border-red-500 text-sm font-black uppercase text-red-400"
            >
              Finish & Start New Game
            </button>
          </div>
        </div>
      )}
    </>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-[#25476D] bg-[#07111F] p-4">
      <p className="text-[10px] font-black uppercase tracking-[2px] text-slate-400">
        {label}
      </p>
      <p className="mt-2 text-lg font-black">{value}</p>
    </div>
  );
}