const players = [
  { spot: 1, name: "Rodriguez", pos: "SS", bats: "R", abs: ["🟢", "⚫", "🟠"] },
  { spot: 2, name: "Perez", pos: "CF", bats: "L", abs: ["⚫", "🟢"] },
  { spot: 3, name: "Diaz", pos: "3B", bats: "R", abs: ["🟢", "🟢"] },
  { spot: 4, name: "Medina", pos: "1B", bats: "R", abs: ["🔴"] },
  { spot: 5, name: "Santos", pos: "RF", bats: "L", abs: ["⚪"] },
];

export default function LineupPanel() {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
      <h2 className="mb-4 text-xl font-black text-[#0C2340]">Lineup</h2>

      <div className="space-y-3">
        {players.map((p) => (
          <div
            key={p.spot}
            className="rounded-2xl border border-slate-200 bg-slate-50 p-4"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-lg font-black text-[#0C2340]">
                  {p.spot}. {p.name}
                </p>
                <p className="text-xs font-bold text-slate-500">
                  {p.pos} • {p.bats}
                </p>
              </div>

              <div className="text-sm">{p.abs.join(" ")}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}