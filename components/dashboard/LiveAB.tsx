import AppCard from "@/components/common/AppCard";

const rows = [
  ["Pitch", "FB 95.2"],
  ["Count", "2-1"],
  ["Zone", "5"],
  ["Direction", "CF"],
  ["Contact", "LD"],
  ["Quality", "Hard Hit"],
];

export default function LiveAB() {
  return (
    <AppCard>
      <p className="text-xs font-black uppercase tracking-widest text-slate-500">
        Current At-Bat
      </p>

      <h2 className="mt-2 text-2xl font-black text-[#0C2340]">Rodriguez</h2>
      <p className="text-sm font-bold text-slate-500">AB 2</p>

      <div className="my-5 rounded-2xl bg-orange-50 p-4">
        <p className="text-4xl font-black text-[#FA4616]">🟢 SINGLE</p>
      </div>

      <div className="space-y-3">
        {rows.map(([label, value]) => (
          <div
            key={label}
            className="flex items-center justify-between border-b border-slate-100 pb-2"
          >
            <span className="text-sm font-black text-slate-500">{label}</span>
            <span className="text-sm font-black text-[#0C2340]">{value}</span>
          </div>
        ))}
      </div>

      <div className="mt-5 rounded-2xl bg-slate-50 p-4">
        <p className="text-xs font-black uppercase tracking-widest text-slate-500">
          Comment
        </p>
        <p className="mt-2 text-sm font-semibold text-slate-700">
          Stayed through the middle. Good swing decision.
        </p>
      </div>
    </AppCard>
  );
}