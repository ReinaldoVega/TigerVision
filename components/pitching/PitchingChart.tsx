"use client";

import Card from "@/components/layout/Card";
import TVButton from "@/components/tv/TVButton";
import { usePitchingChartContext } from "@/context/PitchingChartContext";
import {
  ContactQuality,
  ContactType,
  PitchCall,
  PitchType,
  ResultType,
  ZoneType,
} from "@/types/chart";

const pitchTypes: PitchType[] = [
  "FB",
  "SI",
  "CT",
  "SL",
  "SW",
  "CH",
  "SP",
  "CU",
  "KN",
  "Other",
];

const pitchCalls: PitchCall[] = [
  "Ball",
  "Called Strike",
  "Swinging Strike",
  "Foul",
  "In Play",
  "HBP",
];

const contacts: ContactType[] = ["GB", "LD", "FB", "PU"];

const qualities: ContactQuality[] = [
  "Soft",
  "Medium",
  "Hard",
  "Barrel",
];

const paResults: ResultType[] = [
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

export default function PitchingChart() {
  const {
    count,
    currentPitch,
    currentPA,
    updateCurrentPitch,
    updateCurrentPA,
    savePitch,
    removeLastPitch,
    finishPlateAppearance,
    resetCurrentPA,
  } = usePitchingChartContext();

  const needsContact = currentPitch.call === "In Play";

  function handleSavePitch() {
    const result = savePitch();

    if (!result.success) {
      alert(result.message);
      return;
    }

    if (result.plateAppearanceEnded && result.automaticResult) {
      finishPlateAppearance(result.automaticResult);
    }
  }

  function handleFinishPA() {
    const result = finishPlateAppearance();

    if (!result.success) {
      alert(result.message);
    }
  }

  return (
    <Card
      title={`Pitching Chart — PA ${currentPA.paNumber}`}
      className="h-full"
      bodyClassName="h-[calc(100%-46px)] overflow-y-auto"
      action={
        <button
          onClick={resetCurrentPA}
          className="text-sm font-black text-[#FA4616]"
        >
          ↶ Reset PA
        </button>
      }
    >
      <div className="mb-4 grid grid-cols-4 gap-3 rounded-2xl bg-slate-50 p-4">
        <Info label="Pitcher" value={currentPA.pitcher} />
        <Info label="Batter" value={currentPA.batter} />
        <Info label="Hand" value={`${currentPA.batterHand}HH`} />
        <Info label="Count" value={count} />
      </div>

      <Section number={1} title="Pitch Type">
        <ButtonGrid
          items={pitchTypes}
          value={currentPitch.pitchType}
          onSelect={(value) =>
            updateCurrentPitch("pitchType", value)
          }
          cols="grid-cols-5"
        />
      </Section>

      <Section number={2} title="Velocity">
        <div className="grid grid-cols-[1fr_90px] gap-3">
          <input
            value={currentPitch.velocity}
            onChange={(e) =>
              updateCurrentPitch("velocity", e.target.value)
            }
            inputMode="decimal"
            placeholder="95.2"
            className="h-12 rounded-xl border border-slate-200 px-4 text-lg font-black text-[#0C2340]"
          />

          <div className="flex items-center justify-center rounded-xl bg-slate-100 text-sm font-black text-[#0C2340]">
            MPH
          </div>
        </div>
      </Section>

      <Section number={3} title="Location">
        <PitchingZone
          value={currentPitch.zone}
          onSelect={(zone) =>
            updateCurrentPitch("zone", zone)
          }
        />
      </Section>

      <Section number={4} title="Pitch Result">
        <ButtonGrid
          items={pitchCalls}
          value={currentPitch.call}
          onSelect={(value) =>
            updateCurrentPitch("call", value)
          }
          cols="grid-cols-3"
        />
      </Section>

      {needsContact && (
        <Section number={5} title="Contact">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="mb-2 text-xs font-black uppercase tracking-[2px] text-slate-500">
                Contact Type
              </p>

              <ButtonGrid
                items={contacts}
                value={currentPitch.contact}
                onSelect={(value) =>
                  updateCurrentPitch("contact", value)
                }
                cols="grid-cols-4"
              />
            </div>

            <div>
              <p className="mb-2 text-xs font-black uppercase tracking-[2px] text-slate-500">
                Quality
              </p>

              <ButtonGrid
                items={qualities}
                value={currentPitch.quality}
                onSelect={(value) =>
                  updateCurrentPitch("quality", value)
                }
                cols="grid-cols-4"
              />
            </div>
          </div>
        </Section>
      )}

      <Section number={needsContact ? 6 : 5} title="Save Pitch">
        <div className="grid grid-cols-[1fr_160px] gap-3">
          <button
            onClick={handleSavePitch}
            className="h-13 rounded-xl bg-[#FA4616] text-sm font-black uppercase text-white"
          >
            Save Pitch →
          </button>

          <button
            disabled={!currentPA.pitches.length}
            onClick={removeLastPitch}
            className="h-13 rounded-xl border border-slate-300 text-sm font-black uppercase text-[#0C2340] disabled:opacity-30"
          >
            Undo Pitch
          </button>
        </div>
      </Section>

      <Section number={needsContact ? 7 : 6} title="End Plate Appearance">
        <ButtonGrid
          items={paResults}
          value={currentPA.result}
          onSelect={(value) =>
            updateCurrentPA("result", value)
          }
          cols="grid-cols-8"
        />

        <button
          onClick={handleFinishPA}
          className="mt-4 h-12 w-full rounded-xl bg-[#0C2340] text-sm font-black uppercase text-white"
        >
          End PA
        </button>
      </Section>
    </Card>
  );
}

function Section({
  number,
  title,
  children,
}: {
  number: number;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mb-7">
      <div className="mb-4 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#0C2340] text-sm font-black text-white">
          {number}
        </div>

        <h2 className="text-xl font-black text-[#0C2340]">
          {title}
        </h2>
      </div>

      {children}
    </section>
  );
}

function Info({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div>
      <p className="text-[10px] font-black uppercase tracking-[2px] text-slate-500">
        {label}
      </p>
      <p className="mt-1 text-sm font-black text-[#0C2340]">
        {value}
      </p>
    </div>
  );
}

function ButtonGrid<T extends string>({
  items,
  value,
  onSelect,
  cols,
}: {
  items: T[];
  value: string;
  onSelect: (value: T) => void;
  cols: string;
}) {
  return (
    <div className={`grid ${cols} gap-2`}>
      {items.map((item) => (
        <TVButton
          key={item}
          active={value === item}
          onClick={() => onSelect(item)}
        >
          {item}
        </TVButton>
      ))}
    </div>
  );
}

function PitchingZone({
  value,
  onSelect,
}: {
  value: ZoneType;
  onSelect: (zone: ZoneType) => void;
}) {
  return (
    <div className="mx-auto grid max-w-[520px] grid-rows-[44px_190px_44px] gap-3">
      <div className="flex justify-center">
        <ZoneButton
          active={value === "UP"}
          onClick={() => onSelect("UP")}
        >
          ↑ Chase Up
        </ZoneButton>
      </div>

      <div className="grid grid-cols-[110px_190px_110px] items-center justify-center gap-3">
        <ZoneButton
          active={value === "IN"}
          onClick={() => onSelect("IN")}
        >
          ← Chase In
        </ZoneButton>

        <svg width="190" height="190" viewBox="0 0 300 300">
          {[...Array(9)].map((_, i) => {
            const zone = (i + 1) as ZoneType;
            const row = Math.floor(i / 3);
            const col = i % 3;
            const x = col * 90 + 15;
            const y = row * 90 + 15;
            const active = value === zone;

            return (
              <g
                key={String(zone)}
                onClick={() => onSelect(zone)}
                className="cursor-pointer"
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

        <ZoneButton
          active={value === "AWAY"}
          onClick={() => onSelect("AWAY")}
        >
          Chase Away →
        </ZoneButton>
      </div>

      <div className="flex justify-center">
        <ZoneButton
          active={value === "DOWN"}
          onClick={() => onSelect("DOWN")}
        >
          ↓ Chase Down
        </ZoneButton>
      </div>
    </div>
  );
}

function ZoneButton({
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
      className={`h-10 rounded-xl border px-3 text-xs font-black ${
        active
          ? "border-[#FA4616] bg-[#FA4616] text-white"
          : "border-slate-200 bg-white text-[#0C2340]"
      }`}
    >
      {children}
    </button>
  );
}