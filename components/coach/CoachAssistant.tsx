import Card from "@/components/layout/Card";

export default function CoachAssistant() {
  return (
    <Card
      title="Coach Assistant"
      dark
      action={
        <button className="text-xs text-slate-300">
          Hide ^
        </button>
      }
    >
      <div className="mb-2 flex justify-between text-sm font-black">
        <span>Progress</span>

        <span>83%</span>
      </div>

      <div className="h-3 overflow-hidden rounded-full bg-white/20">
        <div className="h-full w-[83%] rounded-full bg-green-500" />
      </div>

      <div className="mt-4 grid grid-cols-2 gap-4">
        <div>
          <p className="text-xs font-black uppercase text-slate-400">
            Next Step
          </p>

          <p className="mt-1 text-base font-black text-white">
            Select Contact Type
          </p>
        </div>

        <div className="rounded-xl border border-[#25476D] bg-[#07111F] p-3">
          <p className="text-xs font-black uppercase text-[#FA4616]">
            💡 TIP
          </p>

          <p className="mt-1 text-xs font-semibold leading-5 text-white">
            Ground balls normally require field direction.
          </p>
        </div>
      </div>
    </Card>
  );
}