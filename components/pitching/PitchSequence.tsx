"use client";

import Card from "@/components/layout/Card";
import { usePitchingChartContext } from "@/context/PitchingChartContext";

export default function PitchSequence() {
  const {
    currentPA,
    count,
    currentPitch,
  } = usePitchingChartContext();

  return (
    <Card
      title="Pitch Sequence"
      dark
      className="h-full"
      action={
        <span className="text-xs font-black text-slate-300">
          {currentPA.pitches.length} Pitches
        </span>
      }
    >
      <div className="flex h-full flex-col">
        <div className="mb-4 grid grid-cols-3 gap-2">
          <Summary label="Count" value={count} />
          <Summary
            label="Current"
            value={currentPitch.pitchType || "-"}
          />
          <Summary
            label="Velo"
            value={currentPitch.velocity || "-"}
          />
        </div>

        <div className="min-h-0 flex-1 space-y-2 overflow-y-auto">
          {currentPA.pitches.length ? (
            currentPA.pitches.map((pitch) => (
              <div
                key={pitch.id}
                className="grid grid-cols-[34px_42px_50px_46px_1fr] items-center gap-2 rounded-xl border border-[#25476D] bg-[#07111F] p-2"
              >
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#FA4616] text-xs font-black text-white">
                  {pitch.pitchNumber}
                </div>

                <div className="text-xs font-black text-white">
                  {pitch.pitchType}
                </div>

                <div className="text-xs font-black text-white">
                  {pitch.velocity || "-"}
                </div>

                <div className="text-xs font-black text-white">
                  {pitch.zone ? String(pitch.zone) : "-"}
                </div>

                <div className="truncate text-xs font-semibold text-slate-300">
                  {pitch.call}
                </div>
              </div>
            ))
          ) : (
            <div className="flex h-full items-center justify-center rounded-2xl border border-dashed border-[#25476D] bg-[#07111F] p-5 text-center">
              <p className="text-sm font-semibold text-slate-400">
                Save the first pitch to begin the sequence.
              </p>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}

function Summary({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl border border-[#25476D] bg-[#07111F] p-3">
      <p className="text-[9px] font-black uppercase tracking-[2px] text-slate-400">
        {label}
      </p>
      <p className="mt-1 text-sm font-black text-white">
        {value}
      </p>
    </div>
  );
}