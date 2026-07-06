"use client";

import { useState } from "react";
import Card from "@/components/layout/Card";
import { useChartContext } from "@/context/ChartContext";
import { Player } from "@/types/chart";

const positions = ["C", "1B", "2B", "3B", "SS", "LF", "CF", "RF", "DH"];

export default function Lineup() {
  const {
    lineup,
    currentBatterIndex,
    selectBatter,
    substituteBatter,
  } = useChartContext();

  const [subIndex, setSubIndex] = useState<number | null>(null);

  return (
    <Card
      title="Lineup"
      className="h-full"
      bodyClassName="h-[calc(100%-46px)] p-3"
      action={
        <button
          onClick={() => setSubIndex(currentBatterIndex)}
          className="text-sm font-black text-[#FA4616]"
        >
          Sub
        </button>
      }
    >
      <div className="flex h-full flex-col">
        <div className="space-y-1">
          {lineup.map((player, index) => (
            <button
              key={`${player.spot}-${player.name}-${index}`}
              onClick={() => selectBatter(index)}
              className={`grid h-8.5 w-full grid-cols-[28px_1fr_45px_36px] items-center gap-2 rounded-xl px-3 text-left transition ${
                index === currentBatterIndex
                  ? "bg-orange-50 ring-2 ring-[#FA4616]"
                  : "bg-white hover:bg-slate-50"
              }`}
            >
              <div className="text-center text-sm font-black text-[#FA4616]">
                {player.spot}
              </div>

              <div className="truncate text-sm font-black text-[#0C2340]">
                {player.name}
              </div>

              <div className="rounded-lg border border-slate-200 bg-white px-2 py-1 text-center text-[11px] font-black text-[#0C2340]">
                {player.position}
              </div>

              <div className="rounded-lg border border-slate-200 bg-white px-2 py-1 text-center text-[11px] font-black text-[#0C2340]">
                {player.bats}
              </div>
            </button>
          ))}
        </div>

        <div className="mt-auto grid grid-cols-2 gap-2">
          <button
            onClick={() => selectBatter((currentBatterIndex + 8) % lineup.length)}
            className="h-10 rounded-xl border border-slate-200 bg-white text-xs font-black uppercase text-[#0C2340]"
          >
            ← Previous
          </button>

          <button
            onClick={() => selectBatter((currentBatterIndex + 1) % lineup.length)}
            className="h-10 rounded-xl border border-slate-200 bg-white text-xs font-black uppercase text-[#0C2340]"
          >
            Next →
          </button>
        </div>
      </div>

      {subIndex !== null && (
        <SubModal
          player={lineup[subIndex]}
          onClose={() => setSubIndex(null)}
          onSave={(updatedPlayer) => {
            substituteBatter(subIndex, updatedPlayer);
            setSubIndex(null);
          }}
        />
      )}
    </Card>
  );
}

function SubModal({
  player,
  onClose,
  onSave,
}: {
  player: Player;
  onClose: () => void;
  onSave: (player: Player) => void;
}) {
  const [draft, setDraft] = useState<Player>(player);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-5">
      <div className="w-full max-w-130 rounded-3xl border border-[#25476D] bg-[#081A33] p-5 text-white shadow-2xl">
        <div className="mb-5 flex items-center justify-between">
          <div>
            <p className="text-xs font-black uppercase tracking-[3px] text-[#FA4616]">
              Substitution
            </p>
            <h2 className="text-2xl font-black">
              Lineup Spot {player.spot}
            </h2>
          </div>

          <button
            onClick={onClose}
            className="rounded-xl border border-[#25476D] px-4 py-2 text-xs font-black uppercase"
          >
            Close
          </button>
        </div>

        <label className="mb-4 block">
          <p className="mb-2 text-xs font-black uppercase tracking-[2px] text-slate-400">
            Player Name
          </p>
          <input
            value={draft.name}
            onChange={(e) => setDraft({ ...draft, name: e.target.value })}
            className="h-12 w-full rounded-xl border border-[#25476D] bg-[#07111F] px-4 text-sm font-bold text-white"
          />
        </label>

        <div className="grid grid-cols-2 gap-4">
          <label>
            <p className="mb-2 text-xs font-black uppercase tracking-[2px] text-slate-400">
              Position
            </p>
            <select
              value={draft.position}
              onChange={(e) => setDraft({ ...draft, position: e.target.value })}
              className="h-12 w-full rounded-xl border border-[#25476D] bg-[#07111F] px-4 text-sm font-bold text-white"
            >
              {positions.map((pos) => (
                <option key={pos} value={pos}>
                  {pos}
                </option>
              ))}
            </select>
          </label>

          <label>
            <p className="mb-2 text-xs font-black uppercase tracking-[2px] text-slate-400">
              Bats
            </p>
            <select
              value={draft.bats}
              onChange={(e) =>
                setDraft({ ...draft, bats: e.target.value as "R" | "L" | "S" })
              }
              className="h-12 w-full rounded-xl border border-[#25476D] bg-[#07111F] px-4 text-sm font-bold text-white"
            >
              <option value="R">R</option>
              <option value="L">L</option>
              <option value="S">S</option>
            </select>
          </label>
        </div>

        <button
          onClick={() => onSave(draft)}
          className="mt-6 h-12 w-full rounded-xl bg-[#FA4616] text-sm font-black uppercase text-white"
        >
          Save Substitution
        </button>
      </div>
    </div>
  );
}