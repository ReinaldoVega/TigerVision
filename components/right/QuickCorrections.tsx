"use client";

import { useState } from "react";
import { useChartContext } from "@/context/ChartContext";
import {
  ContactQuality,
  ContactType,
  FieldDirection,
  PitchType,
  ResultType,
  ZoneType,
} from "@/types/chart";

const results: ResultType[] = [
  "1B",
  "2B",
  "3B",
  "HR",
  "BB",
  "HBP",
  "K",
  "GO",
  "FO",
  "LO",
  "PO",
  "FC",
  "GDP",
  "SAC",
  "SF",
  "Other",
];

const pitches: PitchType[] = ["FB", "SI", "CT", "SL", "CH", "SP", "CU", "KN", "Other"];

const contacts: ContactType[] = ["GB", "LD", "FB", "PU"];

const qualities: ContactQuality[] = ["Soft", "Medium", "Hard", "Barrel"];

const directions: FieldDirection[] = ["LF", "CF", "RF", "3B", "SS", "2B", "1B", "P", "C"];

const zones: ZoneType[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, "UP", "IN", "AWAY", "DOWN"];

export default function QuickCorrections() {
  const { savedAtBats, updateLastAtBat, undoLastAtBat } = useChartContext();
  const [open, setOpen] = useState(false);

  const last = savedAtBats[savedAtBats.length - 1];

  if (!last) {
    return (
      <button
        disabled
        className="h-10 w-full rounded-xl border border-[#25476D] bg-[#07111F] text-xs font-black uppercase text-slate-500"
      >
        Quick Corrections
      </button>
    );
  }

  return (
    <div>
      <button
        onClick={() => setOpen(true)}
        className="h-10 w-full rounded-xl bg-[#FA4616] text-xs font-black uppercase text-white"
      >
        ✎ Quick Corrections
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-5">
          <div className="max-h-[90vh] w-full max-w-245 overflow-y-auto rounded-3xl border border-[#25476D] bg-[#081A33] p-5 text-white shadow-2xl">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <p className="text-xs font-black uppercase tracking-[3px] text-slate-400">
                  Editing Last Saved At-Bat
                </p>
                <h2 className="text-2xl font-black">
                  AB {last.abNumber} — {last.batter}
                </h2>
              </div>

              <button
                onClick={() => setOpen(false)}
                className="rounded-xl border border-[#25476D] px-4 py-2 text-xs font-black uppercase text-white"
              >
                Close
              </button>
            </div>

            <div className="grid grid-cols-2 gap-5">
              <CorrectionGroup title="Result">
                {results.map((item) => (
                  <Chip
                    key={item}
                    active={last.result === item}
                    onClick={() => updateLastAtBat("result", item)}
                  >
                    {item}
                  </Chip>
                ))}
              </CorrectionGroup>

              <CorrectionGroup title="Pitch">
                {pitches.map((item) => (
                  <Chip
                    key={item}
                    active={last.pitch === item}
                    onClick={() => updateLastAtBat("pitch", item)}
                  >
                    {item}
                  </Chip>
                ))}

                <input
                  value={last.velo}
                  onChange={(e) => updateLastAtBat("velo", e.target.value)}
                  placeholder="Velo"
                  className="mt-3 h-10 w-full rounded-xl border border-[#25476D] bg-[#07111F] px-3 text-sm font-black text-white"
                />
              </CorrectionGroup>

              <CorrectionGroup title="Zone">
                {zones.map((item) => (
                  <Chip
                    key={String(item)}
                    active={last.zone === item}
                    onClick={() => updateLastAtBat("zone", item)}
                  >
                    {String(item)}
                  </Chip>
                ))}
              </CorrectionGroup>

              <CorrectionGroup title="Contact">
                {contacts.map((item) => (
                  <Chip
                    key={item}
                    active={last.contact === item}
                    onClick={() => updateLastAtBat("contact", item)}
                  >
                    {item}
                  </Chip>
                ))}
              </CorrectionGroup>

              <CorrectionGroup title="Quality">
                {qualities.map((item) => (
                  <Chip
                    key={item}
                    active={last.quality === item}
                    onClick={() => updateLastAtBat("quality", item)}
                  >
                    {item}
                  </Chip>
                ))}
              </CorrectionGroup>

              <CorrectionGroup title="Direction">
                {directions.map((item) => (
                  <Chip
                    key={item}
                    active={last.direction === item}
                    onClick={() => updateLastAtBat("direction", item)}
                  >
                    {item}
                  </Chip>
                ))}
              </CorrectionGroup>
            </div>

            <div className="mt-5 grid grid-cols-[1fr_180px] gap-4">
              <input
                value={last.comment}
                onChange={(e) => updateLastAtBat("comment", e.target.value)}
                placeholder="Correction note / comment"
                className="h-12 rounded-xl border border-[#25476D] bg-[#07111F] px-4 text-sm font-bold text-white"
              />

              <button
                onClick={() => {
                  undoLastAtBat();
                  setOpen(false);
                }}
                className="h-12 rounded-xl border border-red-500 text-sm font-black uppercase text-red-400"
              >
                Undo PA
              </button>
            </div>

            <button
              onClick={() => setOpen(false)}
              className="mt-5 h-12 w-full rounded-xl bg-[#FA4616] text-sm font-black uppercase text-white"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function CorrectionGroup({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-[#25476D] bg-[#07111F] p-4">
      <p className="mb-3 text-xs font-black uppercase tracking-[3px] text-slate-400">
        {title}
      </p>

      <div className="grid grid-cols-4 gap-2">{children}</div>
    </div>
  );
}

function Chip({
  children,
  active,
  onClick,
}: {
  children: React.ReactNode;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`h-9 rounded-lg border text-xs font-black ${
        active
          ? "border-[#FA4616] bg-[#FA4616] text-white"
          : "border-[#25476D] bg-[#081A33] text-white"
      }`}
    >
      {children}
    </button>
  );
}