import { AtBat, ChartStep } from "@/types/chart";
import { getActiveStep, isStepDone } from "@/core/chart/engine";

const steps: { key: ChartStep; label: string }[] = [
  { key: "result", label: "Result" },
  { key: "pitch", label: "Pitch" },
  { key: "zone", label: "Zone" },
  { key: "count", label: "Count" },
  { key: "contact", label: "Contact" },
  { key: "finish", label: "Save" },
];

export default function ProgressTracker({ atBat }: { atBat: AtBat }) {
  const active = getActiveStep(atBat);

  return (
    <div className="mb-4 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
      <div className="grid grid-cols-6 gap-2">
        {steps.map((step) => {
          const done = isStepDone(atBat, step.key);
          const isActive = active === step.key;

          return (
            <div key={step.key} className="flex items-center gap-2">
              <div
                className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-black text-white ${
                  done
                    ? "bg-green-600"
                    : isActive
                    ? "bg-[#FA4616]"
                    : "bg-slate-300"
                }`}
              >
                {done ? "✓" : isActive ? "●" : "○"}
              </div>

              <span
                className={`text-xs font-black uppercase ${
                  isActive ? "text-[#FA4616]" : "text-[#0C2340]"
                }`}
              >
                {step.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}