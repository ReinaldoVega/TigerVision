"use client";

import { useState } from "react";
import AppCard from "@/components/common/AppCard";
import SectionTitle from "@/components/common/SectionTitle";

type Zone = number | "UP" | "IN" | "AWAY" | "DOWN" | null;

export default function StrikeZone() {
  const [selected, setSelected] = useState<Zone>(null);

  return (
    <AppCard>
      <SectionTitle title="Strike Zone" subtitle="Tap final pitch location." />

      <div className="flex flex-col items-center gap-3">
        <button
          onClick={() => setSelected("UP")}
          className={chaseClass(selected === "UP")}
        >
          Chase Up
        </button>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setSelected("IN")}
            className={sideClass(selected === "IN")}
          >
            In
          </button>

          <svg width="260" height="260" viewBox="0 0 300 300">
            {[...Array(9)].map((_, i) => {
              const row = Math.floor(i / 3);
              const col = i % 3;
              const zone = i + 1;
              const x = col * 90 + 15;
              const y = row * 90 + 15;
              const active = selected === zone;

              return (
                <g key={zone} onClick={() => setSelected(zone)}>
                  <rect
                    x={x}
                    y={y}
                    width={90}
                    height={90}
                    rx={14}
                    className="cursor-pointer transition-all"
                    fill={active ? "#FA4616" : "#F8FAFC"}
                    stroke={active ? "#FA4616" : "#CBD5E1"}
                    strokeWidth="3"
                  />
                  <text
                    x={x + 45}
                    y={y + 55}
                    textAnchor="middle"
                    fontWeight="1000"
                    fontSize="26"
                    fill={active ? "#FFFFFF" : "#0C2340"}
                  >
                    {zone}
                  </text>
                </g>
              );
            })}
          </svg>

          <button
            onClick={() => setSelected("AWAY")}
            className={sideClass(selected === "AWAY")}
          >
            Away
          </button>
        </div>

        <button
          onClick={() => setSelected("DOWN")}
          className={chaseClass(selected === "DOWN")}
        >
          Chase Down
        </button>

        <div className="mt-2 rounded-2xl bg-slate-50 px-5 py-3 text-center">
          <p className="text-xs font-black uppercase tracking-widest text-slate-500">
            Selected
          </p>
          <p className="text-xl font-black text-[#0C2340]">
            {selected ?? "None"}
          </p>
        </div>
      </div>
    </AppCard>
  );
}

function chaseClass(active: boolean) {
  return [
    "w-44 rounded-2xl px-4 py-3 text-sm font-black uppercase tracking-widest transition-all",
    active
      ? "bg-[#FA4616] text-white shadow-lg"
      : "bg-slate-100 text-[#0C2340] hover:bg-orange-50",
  ].join(" ");
}

function sideClass(active: boolean) {
  return [
    "h-24 w-20 rounded-2xl text-sm font-black uppercase tracking-widest transition-all",
    active
      ? "bg-[#FA4616] text-white shadow-lg"
      : "bg-slate-100 text-[#0C2340] hover:bg-orange-50",
  ].join(" ");
}