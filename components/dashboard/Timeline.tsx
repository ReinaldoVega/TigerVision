const abs = [
  { ab: "AB 1", result: "1B", color: "bg-green-500" },
  { ab: "AB 2", result: "GO", color: "bg-slate-500" },
  { ab: "AB 3", result: "HR", color: "bg-orange-500" },
  { ab: "AB 4", result: "-", color: "bg-slate-200" },
];

export default function Timeline() {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
      <h2 className="mb-4 text-xl font-black text-[#0C2340]">AB Timeline</h2>

      <div className="flex flex-wrap gap-3">
        {abs.map((item) => (
          <div
            key={item.ab}
            className="flex h-16 w-16 flex-col items-center justify-center rounded-full border border-slate-200 bg-slate-50"
          >
            <div className={`mb-1 h-3 w-3 rounded-full ${item.color}`} />
            <p className="text-xs font-black text-[#0C2340]">{item.ab}</p>
            <p className="text-xs font-bold text-slate-500">{item.result}</p>
          </div>
        ))}
      </div>
    </div>
  );
}