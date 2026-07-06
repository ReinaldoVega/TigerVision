"use client";

import Card from "@/components/layout/Card";
import { useChartContext } from "@/context/ChartContext";

export default function Timeline() {
  const { savedAtBats, currentAtBat } = useChartContext();

  const recent = savedAtBats.slice(-5);

  return (
    <Card title="At-Bat Timeline" className="h-full">
      <div className="flex h-full flex-col">
        <div className="flex items-center justify-between gap-2">
          {recent.map((ab, index) => (
            <div key={`${ab.abNumber}-${index}`} className="text-center">
              <p className="mb-2 text-xs font-black text-[#0C2340]">
                AB {ab.abNumber}
              </p>

              <div className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-green-500 text-xs font-black text-green-600">
                {ab.result || "-"}
              </div>
            </div>
          ))}

          <div className="text-center">
            <p className="mb-2 text-xs font-black text-[#0C2340]">
              AB {currentAtBat.abNumber}
            </p>

            <div className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-[#FA4616] bg-[#FA4616] text-xs font-black text-white">
              ●
            </div>
          </div>
        </div>

        <div className="mt-auto rounded-xl bg-orange-50 p-3">
          <p className="text-xs font-black uppercase tracking-[2px] text-slate-500">
            Current Batter
          </p>
          <p className="mt-1 text-sm font-black text-[#0C2340]">
            {currentAtBat.batter}
          </p>
        </div>
      </div>
    </Card>
  );
}