"use client";

import Card from "@/components/layout/Card";
import TVButton from "@/components/tv/TVButton";
import TVSection from "@/components/tv/TVSection";
import ProgressTracker from "@/components/quickchart/ProgressTracker";
import { useRef } from "react";
import { useChartContext } from "@/context/ChartContext";
import { getActiveStep, getStepStatus } from "@/core/chart/engine";
import {
  ContactQuality,
  ContactType,
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

const pitches: PitchType[] = [
  "FB",
  "SI",
  "CT",
  "SL",
  "CH",
  "SP",
  "CU",
  "KN",
  "Other",
];

const counts = [
  "0-0",
  "0-1",
  "0-2",
  "1-0",
  "1-1",
  "1-2",
  "2-0",
  "2-1",
  "2-2",
  "3-0",
  "3-1",
  "3-2",
  "Full",
];

const contacts: ContactType[] = ["GB", "LD", "FB", "PU"];
const qualities: ContactQuality[] = ["Soft", "Medium", "Hard", "Barrel"];

export default function QuickChart() {
  const { currentAtBat, updateAtBat, saveAtBat, resetAtBat } =
    useChartContext();

const activeStep = getActiveStep(currentAtBat);

const hasMountedRef = useRef(false);
const previousStepRef = useRef(activeStep);

const resultRef = useRef<HTMLDivElement>(null);
const pitchRef = useRef<HTMLDivElement>(null);
const zoneRef = useRef<HTMLDivElement>(null);
const countRef = useRef<HTMLDivElement>(null);
const contactRef = useRef<HTMLDivElement>(null);
const finishRef = useRef<HTMLDivElement>(null);
function scrollTo(ref: React.RefObject<HTMLDivElement | null>) {
  setTimeout(() => {
    ref.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }, 120);
}

  return (
    <Card
      title={`Quick Chart — ${currentAtBat.abNumber}. ${currentAtBat.batter}`}
      className="h-full"
      bodyClassName="h-[calc(100%-46px)] overflow-hidden p-5"
      action={
        <button
           onClick={() => {
           resetAtBat();
           scrollTo(resultRef);
        }}
          className="text-sm font-black text-[#FA4616]"
        >
        ↶ Reset
        </button>
      }
    >
      <ProgressTracker atBat={currentAtBat} />

      <div className="mb-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
        <p className="text-xs font-black uppercase tracking-[3px] text-slate-500">
          Current Input
        </p>

        <p className="mt-2 text-lg font-black text-[#0C2340]">
          {currentAtBat.result || "-"} · {currentAtBat.pitch || "-"}{" "}
          {currentAtBat.velo || ""} · Zone{" "}
          {currentAtBat.zone ? String(currentAtBat.zone) : "-"} ·{" "}
          {currentAtBat.count || "-"}
        </p>
      </div>

    <div ref={resultRef}>
      <TVSection
        number={1}
        title="Result"
        status={getStepStatus(currentAtBat, "result")}
      >
        <ButtonGrid
          items={results}
          value={currentAtBat.result}
          onSelect={(value) => {
              updateAtBat("result", value);
              scrollTo(pitchRef);
          }}
          cols="grid-cols-8"
          disabled={false}
          />
      </TVSection>
      </div>

    <div ref={resultRef}>
      <TVSection
        number={2}
        title="Pitch"
        status={getStepStatus(currentAtBat, "pitch")}
      >
        <div className="mb-3 grid grid-cols-[1fr_110px_60px] gap-3">
          <select
            disabled={activeStep !== "pitch"}
            value={currentAtBat.pitch}
            onChange={(e) => {
                updateAtBat("pitch", e.target.value as PitchType);
                scrollTo(zoneRef);
            }}
            className="h-10 rounded-xl border border-slate-200 bg-white px-3 text-sm font-black text-[#0C2340] disabled:cursor-not-allowed disabled:opacity-30"
          >
            <option value="">Select Pitch</option>

            {pitches.map((pitch) => (
              <option key={pitch} value={pitch}>
                {pitch}
              </option>
            ))}
          </select>

          <input
            disabled={activeStep !== "pitch"}
            value={currentAtBat.velo}
            onChange={(e) => updateAtBat("velo", e.target.value)}
            className="h-10 rounded-xl border border-slate-200 px-3 text-sm font-black text-[#0C2340] disabled:cursor-not-allowed disabled:opacity-30"
            placeholder="95.2"
          />

          <div className="flex items-center text-sm font-black text-[#0C2340]">
            MPH
          </div>
        </div>

        <ButtonGrid
          items={pitches}
          value={currentAtBat.pitch}
          onSelect={(value) => {
               updateAtBat("pitch", value);
               scrollTo(zoneRef);
         }}
         cols="grid-cols-9"
         disabled={activeStep !== "pitch"}
    />
      </TVSection>
      </div>

    <div ref={zoneRef}>
  <TVSection
    number={3}
    title="Strike Zone"
    status={getStepStatus(currentAtBat, "zone")}
  >
    <div className="mx-auto grid max-w-130 grid-rows-[44px_190px_44px] gap-3">
      <div className="flex justify-center">
        <button
          disabled={activeStep !== "zone"}
          onClick={() => {
            updateAtBat("zone", "UP");
            scrollTo(countRef);
          }}
          className={zoneButton(
            currentAtBat.zone === "UP",
            activeStep !== "zone"
          )}
        >
          ↑ Chase Up
        </button>
      </div>

      <div className="grid grid-cols-[110px_190px_110px] items-center justify-center gap-3">
        <button
          disabled={activeStep !== "zone"}
          onClick={() => {
            updateAtBat("zone", "IN");
            scrollTo(countRef);
          }}
          className={zoneButton(
            currentAtBat.zone === "IN",
            activeStep !== "zone"
          )}
        >
          ← Chase In
        </button>

        <div className="flex justify-center">
          <svg width="190" height="190" viewBox="0 0 300 300">
            {[...Array(9)].map((_, i) => {
              const zone = (i + 1) as ZoneType;
              const row = Math.floor(i / 3);
              const col = i % 3;
              const x = col * 90 + 15;
              const y = row * 90 + 15;
              const active = currentAtBat.zone === zone;
              const disabled = activeStep !== "zone";

              return (
                <g
                  key={String(zone)}
                  onClick={() => {
                    if (!disabled) {
                      updateAtBat("zone", zone);
                      scrollTo(countRef);
                    }
                  }}
                  className={disabled ? "cursor-not-allowed opacity-30" : ""}
                >
                  <rect
                    x={x}
                    y={y}
                    width={90}
                    height={90}
                    rx={8}
                    fill={active ? "#FA4616" : "#EEF2F6"}
                    stroke="#FFFFFF"
                    strokeWidth="2"
                    className={disabled ? "" : "cursor-pointer"}
                  />

                  <text
                    x={x + 45}
                    y={y + 56}
                    textAnchor="middle"
                    fontSize="28"
                    fontWeight="1000"
                    fill={active ? "white" : "#0C2340"}
                  >
                    {String(zone)}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        <button
          disabled={activeStep !== "zone"}
          onClick={() => {
            updateAtBat("zone", "AWAY");
            scrollTo(countRef);
          }}
          className={zoneButton(
            currentAtBat.zone === "AWAY",
            activeStep !== "zone"
          )}
        >
          Chase Away →
        </button>
      </div>

      <div className="flex justify-center">
        <button
          disabled={activeStep !== "zone"}
          onClick={() => {
            updateAtBat("zone", "DOWN");
            scrollTo(countRef);
          }}
          className={zoneButton(
            currentAtBat.zone === "DOWN",
            activeStep !== "zone"
          )}
        >
          ↓ Chase Down
        </button>
      </div>
    </div>
  </TVSection>
</div>

    <div ref={resultRef}>
      <TVSection
        number={4}
        title="Count"
        status={getStepStatus(currentAtBat, "count")}
      >
        <ButtonGrid
            items={counts}
            value={currentAtBat.count}
            onSelect={(value) => {
                updateAtBat("count", value);
                scrollTo(contactRef);
           }}
           cols="grid-cols-7"
           disabled={activeStep !== "count"}
/>
      </TVSection>
      </div>

    <div ref={resultRef}>
      <TVSection
        number={5}
        title="Contact"
        status={getStepStatus(currentAtBat, "contact")}
      >
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="mb-2 text-xs font-black uppercase tracking-[2px] text-slate-500">
              Contact Type
            </p>

            <ButtonGrid
              items={contacts}
              value={currentAtBat.contact}
              onSelect={(value) => {
                  updateAtBat("contact", value);
     }}
              cols="grid-cols-4"
              disabled={activeStep !== "contact"}
            />
          </div>

          <div>
            <p className="mb-2 text-xs font-black uppercase tracking-[2px] text-slate-500">
              Quality
            </p>

            <ButtonGrid
              items={qualities}
              value={currentAtBat.quality}
              onSelect={(value) => {
                   updateAtBat("quality", value);
                   scrollTo(finishRef);
              }}
              cols="grid-cols-4"
              disabled={activeStep !== "contact"}
            />
          </div>
        </div>
      </TVSection>
      </div>

      <TVSection
        number={6}
        title="Situation"
        status={getStepStatus(currentAtBat, "finish")}
      >
        <div className="grid grid-cols-3 gap-4">
          <select
            disabled={activeStep !== "finish"}
            value={currentAtBat.outs}
            onChange={(e) =>
              updateAtBat("outs", e.target.value as "0" | "1" | "2" | "")
            }
            className="h-11 rounded-xl border border-slate-200 bg-white px-3 text-sm font-black disabled:cursor-not-allowed disabled:opacity-30"
          >
            <option value="0">0 OUTS</option>
            <option value="1">1 OUT</option>
            <option value="2">2 OUTS</option>
          </select>

          <select
            disabled={activeStep !== "finish"}
            value={currentAtBat.runners}
            onChange={(e) => updateAtBat("runners", e.target.value)}
            className="h-11 rounded-xl border border-slate-200 bg-white px-3 text-sm font-black disabled:cursor-not-allowed disabled:opacity-30"
          >
            <option value="Empty">Empty</option>
            <option value="1B">Runner: 1st</option>
            <option value="2B">Runner: 2nd</option>
            <option value="3B">Runner: 3rd</option>
            <option value="RISP">RISP</option>
            <option value="Loaded">Bases Loaded</option>
          </select>

          <input
            disabled={activeStep !== "finish"}
            value={currentAtBat.comment}
            onChange={(e) => updateAtBat("comment", e.target.value)}
            className="h-11 rounded-xl border border-slate-200 bg-white px-3 text-sm font-black disabled:cursor-not-allowed disabled:opacity-30"
            placeholder="Comment"
          />
        </div>

        <div className="mt-5 grid grid-cols-[1fr_180px] items-center gap-4">
          <button
             disabled={activeStep !== "finish"}
             onClick={() => {
               saveAtBat();
               scrollTo(resultRef);
            }}
             className={`h-12 rounded-xl text-sm font-black uppercase text-white ${
                activeStep === "finish"
                  ? "bg-[#FA4616]"
                  : "cursor-not-allowed bg-slate-300"
            }`}
           >
            Save At-Bat →
           </button>

          <div className="text-sm font-black text-[#0C2340]">
            {activeStep === "finish" ? "Ready to save" : "Complete steps first"}
          </div>
        </div>
      </TVSection>
    </Card>
  );
}

function ButtonGrid<T extends string>({
  items,
  value,
  onSelect,
  cols,
  disabled = false,
}: {
  items: T[];
  value: string;
  onSelect: (v: T) => void;
  cols: string;
  disabled?: boolean;
}) {
  return (
    <div className={`grid ${cols} gap-2`}>
      {items.map((item) => (
        <TVButton
          key={item}
          active={value === item}
          disabled={disabled}
          onClick={() => onSelect(item)}
        >
          {item}
        </TVButton>
      ))}
    </div>
  );
}

function zoneButton(active: boolean, disabled = false) {
  return `h-10 rounded-lg border px-3 text-xs font-black ${
    active
      ? "border-[#FA4616] bg-[#FA4616] text-white"
      : "border-slate-200 bg-white text-[#0C2340]"
  } ${disabled ? "cursor-not-allowed opacity-30" : "hover:border-[#FA4616]"}`;
}