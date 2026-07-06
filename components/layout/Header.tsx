"use client";

import { Settings, SunMedium, Moon } from "lucide-react";
import { DESIGN } from "@/lib/design";
import { useChartContext } from "@/context/ChartContext";
import GameControls from "./GameControls";

export default function Header() {
  const { gameInfo, newGame, toggleTheme, isLightMode } = useChartContext();

  const [ourScore = "0", oppScore = "0"] = gameInfo.score.split("-");

  return (
    <header
      className="grid items-center overflow-hidden"
      style={{
        height: DESIGN.headerHeight,
        gridTemplateColumns: "300px 1fr 64px 64px 240px",
        columnGap: 14,
      }}
    >
      <div className="flex h-full items-center">
        <img
          src="/tigervision-logo.png"
          alt="TigerVision"
          className="h-26 w-auto object-contain"
        />
      </div>

      <div className="flex h-full items-center justify-center">
        <div className="flex h-18 w-full max-w-180 items-center justify-center rounded-[18px] border border-[#25476D] bg-[#081A33] px-5 shadow-[0_14px_30px_rgba(0,0,0,.25)]">
          <div className="flex h-12 items-center rounded-[14px] bg-[#0C2340] px-5 text-base font-black uppercase text-white">
            {gameInfo.inning}
          </div>

          <div className="mx-6 h-10 w-px bg-[#25476D]" />

          <div className="flex items-center gap-4">
            <span className="text-[24px] font-black uppercase tracking-tight text-white">
              {gameInfo.team}
            </span>

            <span className="text-[50px] font-black leading-none text-[#FA4616]">
              {ourScore}
            </span>

            <span className="text-xs font-black uppercase text-slate-400">
              VS
            </span>

            <span className="text-[50px] font-black leading-none text-white">
              {oppScore}
            </span>

            <span className="text-[24px] font-black uppercase tracking-tight text-white">
              {gameInfo.opponent || "Opponent"}
            </span>
          </div>
        </div>
      </div>

      <button
        onClick={toggleTheme}
        className="flex h-14 w-14 items-center justify-center rounded-2xl border border-[#25476D] bg-[#081A33] text-white"
      >
        {isLightMode ? (
          <Moon className="h-6 w-6 text-white" />
        ) : (
          <SunMedium className="h-6 w-6 text-[#FA4616]" />
        )}
      </button>

      <div className="flex h-14 items-center">
        <GameControls />
      </div>

      <div className="flex h-14 items-center justify-between rounded-2xl border border-[#25476D] bg-[#081A33] px-4">
        <div>
          <p className="text-base font-black leading-tight text-white">
            Reinaldo Vega
          </p>
          <p className="text-xs font-medium text-slate-400">
            Tigers DR Academy
          </p>
        </div>

        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#FA4616] text-sm font-black text-white">
          RV
        </div>
      </div>
    </header>
  );
}