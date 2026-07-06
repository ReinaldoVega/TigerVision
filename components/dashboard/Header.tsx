import AppCard from "@/components/common/AppCard";

export default function Header() {
  return (
    <AppCard className="bg-[#07111F] p-5">
      <div className="flex items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <img
            src="/tigervision-logo.png"
            alt="TigerVision"
            className="h-auto w-65"
          />
        </div>

        <div className="rounded-2xl border border-[#25476D] bg-[#0B1B2E] px-8 py-4">
          <div className="mb-2 text-center text-xs font-black uppercase tracking-[3px] text-slate-400">
            Top 3
          </div>

          <div className="flex items-center gap-6">
            <div className="text-2xl font-black uppercase text-white">
              DSL Tigers
            </div>

            <div className="text-6xl font-black leading-none text-[#FA4616]">
              2
            </div>

            <div className="text-sm font-black uppercase text-slate-400">
              VS
            </div>

            <div className="text-6xl font-black leading-none text-white">
              1
            </div>

            <div className="text-2xl font-black uppercase text-white">
              DSL Yankees
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button className="rounded-2xl border border-[#25476D] bg-[#0B1B2E] p-4 text-white">
            ☀️
          </button>

          <button className="rounded-2xl border border-[#25476D] bg-[#0B1B2E] p-4 text-white">
            ⚙️
          </button>

          <div className="rounded-2xl border border-[#25476D] bg-[#0B1B2E] px-5 py-4 text-right">
            <div className="text-lg font-black text-white">Coach Reinaldo</div>
            <div className="text-sm text-slate-400">Tigers Academy</div>
          </div>

          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#FA4616] text-xl font-black text-white">
            RV
          </div>
        </div>
      </div>
    </AppCard>
  );
}