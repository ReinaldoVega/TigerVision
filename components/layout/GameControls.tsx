"use client";

import { useState } from "react";
import { useChartContext } from "@/context/ChartContext";

export default function GameControls() {
  const {
    gameInfo,
    outs,
    updateGameInfo,
    setManualOuts,
    setManualInning,
    previousBatter,
    nextBatter,
    undoLastAtBat,
    savedAtBats,
  } = useChartContext();

  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="h-11 rounded-xl bg-[#FA4616] px-5 text-xs font-black uppercase text-white"
      >
        ⚙ Game
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/60">
          <div className="h-full w-107.5 overflow-y-auto border-l border-[#25476D] bg-[#081A33] p-5 text-white shadow-2xl">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <p className="text-xs font-black uppercase tracking-[3px] text-[#FA4616]">
                  Game Control Center
                </p>
                <h2 className="text-2xl font-black">Live Game</h2>
              </div>

              <button
                onClick={() => setOpen(false)}
                className="rounded-xl border border-[#25476D] px-4 py-2 text-xs font-black uppercase"
              >
                Close
              </button>
            </div>

            <Section title="Score">
              <Input
                label="Team"
                value={gameInfo.team}
                onChange={(value) => updateGameInfo("team", value)}
              />

              <Input
                label="Opponent"
                value={gameInfo.opponent}
                onChange={(value) => updateGameInfo("opponent", value)}
              />

              <Input
                label="Score"
                value={gameInfo.score}
                onChange={(value) => updateGameInfo("score", value)}
              />
            </Section>

            <Section title="Inning">
              <div className="grid grid-cols-2 gap-3">
                {["Top 1", "Bottom 1", "Top 2", "Bottom 2", "Top 3", "Bottom 3", "Top 4", "Bottom 4", "Top 5", "Bottom 5", "Top 6", "Bottom 6", "Top 7", "Bottom 7", "Top 8", "Bottom 8", "Top 9", "Bottom 9"].map(
                  (inning) => (
                    <button
                      key={inning}
                      onClick={() => setManualInning(inning)}
                      className={`h-10 rounded-xl border text-xs font-black ${
                        gameInfo.inning === inning
                          ? "border-[#FA4616] bg-[#FA4616]"
                          : "border-[#25476D] bg-[#07111F]"
                      }`}
                    >
                      {inning}
                    </button>
                  )
                )}
              </div>
            </Section>

            <Section title="Outs">
              <div className="grid grid-cols-3 gap-3">
                {[0, 1, 2].map((out) => (
                  <button
                    key={out}
                    onClick={() => setManualOuts(out as 0 | 1 | 2)}
                    className={`h-12 rounded-xl border text-sm font-black ${
                      outs === out
                        ? "border-[#FA4616] bg-[#FA4616]"
                        : "border-[#25476D] bg-[#07111F]"
                    }`}
                  >
                    {out} OUT
                  </button>
                ))}
              </div>
            </Section>

            <Section title="Batter">
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={previousBatter}
                  className="h-12 rounded-xl border border-[#25476D] bg-[#07111F] text-sm font-black uppercase"
                >
                  ← Previous
                </button>

                <button
                  onClick={nextBatter}
                  className="h-12 rounded-xl border border-[#25476D] bg-[#07111F] text-sm font-black uppercase"
                >
                  Next →
                </button>
              </div>
            </Section>

            <Section title="Corrections">
              <button
                disabled={!savedAtBats.length}
                onClick={undoLastAtBat}
                className="h-12 w-full rounded-xl border border-red-500 text-sm font-black uppercase text-red-400 disabled:cursor-not-allowed disabled:opacity-30"
              >
                Undo Last PA
              </button>
            </Section>
          </div>
        </div>
      )}
    </>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mb-6 rounded-2xl border border-[#25476D] bg-[#07111F] p-4">
      <p className="mb-4 text-xs font-black uppercase tracking-[3px] text-slate-400">
        {title}
      </p>
      {children}
    </section>
  );
}

function Input({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="mb-4 block last:mb-0">
      <p className="mb-2 text-xs font-black uppercase tracking-[2px] text-slate-400">
        {label}
      </p>

      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-11 w-full rounded-xl border border-[#25476D] bg-[#081A33] px-3 text-sm font-bold text-white"
      />
    </label>
  );
}