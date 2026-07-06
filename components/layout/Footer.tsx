"use client";

import { CalendarDays, Clock, FileText, Shield } from "lucide-react";
import { DESIGN } from "@/lib/design";
import { useChartContext } from "@/context/ChartContext";
import EndGameModal from "@/components/layout/EndGameModal";

function FooterItem({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <div className="text-[#FA4616]">{icon}</div>
      <div>
        <p className="text-xs font-black text-slate-400">{label}:</p>
        <p className="text-sm font-bold text-white">{value}</p>
      </div>
    </div>
  );
}

export default function Footer() {
  const { gameInfo, savedAtBats, currentAtBat, outs } = useChartContext();

  return (
    <footer
      className="grid grid-cols-[1fr_1fr_1fr_1fr_180px] items-center gap-4 rounded-2xl border border-[#25476D] bg-[#07111F] px-6 text-white"
      style={{ height: DESIGN.footerHeight }}
    >
      <FooterItem
        icon={<FileText className="h-5 w-5" />}
        label="Game"
        value={`${gameInfo.team} vs ${gameInfo.opponent || "Opponent"}`}
      />

      <FooterItem
        icon={<CalendarDays className="h-5 w-5" />}
        label="Date"
        value={gameInfo.date}
      />

      <FooterItem
        icon={<Clock className="h-5 w-5" />}
        label="Current"
        value={`${gameInfo.inning} | ${outs} Outs`}
      />

      <FooterItem
        icon={<Shield className="h-5 w-5" />}
        label="Charting"
        value={`${currentAtBat.batter} | ${savedAtBats.length} PA saved`}
      />

      <EndGameModal />
    </footer>
  );
}