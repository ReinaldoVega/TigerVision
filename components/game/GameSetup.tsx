"use client";

import { useState } from "react";
import { GameInfo, Player } from "@/types/chart";
import { useChartContext } from "@/context/ChartContext";

const positions = ["C", "1B", "2B", "3B", "SS", "LF", "CF", "RF", "DH"];

export default function GameSetup() {
  const { startGame } = useChartContext();

  const [gameInfo, setGameInfo] = useState<GameInfo>({
    team: "DSL Tigers",
    opponent: "",
    inning: "Top 1",
    score: "0-0",
    date: new Date().toISOString().slice(0, 10),
  });

  const [lineup, setLineup] = useState<Player[]>(
    Array.from({ length: 9 }, (_, i) => ({
      spot: i + 1,
      name: "",
      position: positions[i] || "",
      bats: "R",
    }))
  );

  function updatePlayer(index: number, key: keyof Player, value: string) {
    setLineup((prev) =>
      prev.map((player, i) =>
        i === index ? { ...player, [key]: value } : player
      )
    );
  }

  return (
    <main className="min-h-screen bg-[#07111F] p-5 text-white">
      <div className="mx-auto max-w-300">
        <div className="mb-6 flex items-center justify-between">
          <img src="/tigervision-logo.png" alt="TigerVision" className="h-24 w-auto" />

          <div className="text-right">
            <p className="text-xs font-black uppercase tracking-[4px] text-[#FA4616]">
              Game Setup
            </p>
            <h1 className="text-4xl font-black">Start New Chart</h1>
          </div>
        </div>

        <div className="grid grid-cols-[360px_1fr] gap-5">
          <section className="rounded-3xl border border-[#25476D] bg-[#081A33] p-5">
            <h2 className="mb-4 text-xl font-black">Game Info</h2>

            <Input
              label="Team"
              value={gameInfo.team}
              onChange={(value) => setGameInfo({ ...gameInfo, team: value })}
            />

            <Input
              label="Opponent"
              value={gameInfo.opponent}
              onChange={(value) => setGameInfo({ ...gameInfo, opponent: value })}
            />

            <Input
              label="Date"
              value={gameInfo.date}
              onChange={(value) => setGameInfo({ ...gameInfo, date: value })}
            />

            <Input
              label="Score"
              value={gameInfo.score}
              onChange={(value) => setGameInfo({ ...gameInfo, score: value })}
            />

            <Input
              label="Inning"
              value={gameInfo.inning}
              onChange={(value) => setGameInfo({ ...gameInfo, inning: value })}
            />

            <button
              onClick={() => startGame(gameInfo, lineup)}
              className="mt-6 h-14 w-full rounded-2xl bg-[#FA4616] text-base font-black uppercase text-white"
            >
              Start Game
            </button>
          </section>

          <section className="rounded-3xl border border-[#25476D] bg-white p-5 text-[#0C2340]">
            <h2 className="mb-4 text-xl font-black">Lineup</h2>

            <div className="space-y-2">
              {lineup.map((player, index) => (
                <div
                  key={player.spot}
                  className="grid grid-cols-[44px_1fr_90px_80px] gap-3"
                >
                  <div className="flex h-11 items-center justify-center rounded-xl bg-orange-50 font-black text-[#FA4616]">
                    {player.spot}
                  </div>

                  <input
                    value={player.name}
                    onChange={(e) => updatePlayer(index, "name", e.target.value)}
                    placeholder="Player name"
                    className="h-11 rounded-xl border border-slate-200 px-3 font-bold"
                  />

                  <select
                    value={player.position}
                    onChange={(e) => updatePlayer(index, "position", e.target.value)}
                    className="h-11 rounded-xl border border-slate-200 px-3 font-black"
                  >
                    {positions.map((pos) => (
                      <option key={pos} value={pos}>
                        {pos}
                      </option>
                    ))}
                  </select>

                  <select
                    value={player.bats}
                    onChange={(e) => updatePlayer(index, "bats", e.target.value)}
                    className="h-11 rounded-xl border border-slate-200 px-3 font-black"
                  >
                    <option value="R">R</option>
                    <option value="L">L</option>
                    <option value="S">S</option>
                  </select>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </main>
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
    <label className="mb-4 block">
      <p className="mb-2 text-xs font-black uppercase tracking-[2px] text-slate-400">
        {label}
      </p>

      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-12 w-full rounded-xl border border-[#25476D] bg-[#07111F] px-4 font-bold text-white"
      />
    </label>
  );
}