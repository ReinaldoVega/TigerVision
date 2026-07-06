"use client";

import Card from "@/components/layout/Card";
import { useChartContext } from "@/context/ChartContext";
import { buildAtBatReceipt } from "@/core/chart/summary";

export default function LiveAB() {
  const { currentAtBat } = useChartContext();

  const receipt = buildAtBatReceipt(currentAtBat);

  return (
    <Card
      title="At-Bat Summary"
      dark
      className="h-full"
      bodyClassName="h-[calc(100%-46px)] overflow-hidden p-4"
      action={
        <span className="text-xs font-black text-slate-300">
          AB {currentAtBat.abNumber}
        </span>
      }
    >
      <div className="flex h-full flex-col text-white">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[3px] text-slate-400">
              Now Charting
            </p>
            <h3 className="mt-1 text-lg font-black">
              {currentAtBat.batter}
            </h3>
          </div>

          <div className="rounded-xl bg-[#FA4616] px-4 py-2 text-sm font-black uppercase">
            {currentAtBat.result || "--"}
          </div>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-2">
          <Mini label="Pitch" value={`${currentAtBat.pitch || "-"} ${currentAtBat.velo || ""}`} />
          <Mini label="Zone" value={currentAtBat.zone ? String(currentAtBat.zone) : "-"} />
          <Mini label="Count" value={currentAtBat.count || "-"} />
          <Mini label="Outs" value={currentAtBat.outs || "-"} />
          <Mini label="Contact" value={currentAtBat.contact || "-"} />
          <Mini label="Direction" value={currentAtBat.direction || "-"} />
        </div>

        <div className="mt-4 flex-1 rounded-xl border border-[#25476D] bg-[#07111F] p-3">
          <p className="text-[9px] font-black uppercase tracking-[2px] text-slate-400">
            Receipt
          </p>

          <p className="mt-2 text-xs font-semibold leading-5 text-white">
            {receipt.length ? receipt.join(" → ") : "Start charting this at-bat."}
          </p>
        </div>
      </div>
    </Card>
  );
}

function Mini({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-[#25476D] bg-[#07111F] p-2">
      <p className="text-[9px] font-black uppercase text-slate-400">
        {label}
      </p>
      <p className="text-xs font-black text-white">{value}</p>
    </div>
  );
}