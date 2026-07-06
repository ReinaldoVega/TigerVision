import { BarChart3, CalendarDays, FileText, Target, Users } from "lucide-react";
import { DESIGN } from "@/lib/design";

const kpis = [
  { icon: CalendarDays, title: "Games Charted", value: "42", sub: "This Season" },
  { icon: Users, title: "Players", value: "31", sub: "Active Roster" },
  { icon: FileText, title: "Reports", value: "18", sub: "Generated" },
  { icon: BarChart3, title: "Avg. At-Bat Grade", value: "3.8", sub: "★★★★☆" },
  { icon: Target, title: "Team Hard Hit %", value: "38%", sub: "This Season" },
];

export default function KPIRow() {
  return (
    <section
      className="grid grid-cols-5 gap-4"
      style={{ height: DESIGN.kpiHeight }}
    >
      {kpis.map(({ icon: Icon, title, value, sub }) => (
        <div
          key={title}
          className="rounded-2xl border border-slate-200 bg-white px-6 py-4 shadow-[0_8px_24px_rgba(15,23,42,.12)]"
        >
          <div className="flex h-full items-center gap-5">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl text-[#0C2340]">
              <Icon className="h-7 w-7" />
            </div>

            <div>
              <p className="text-xs font-black uppercase tracking-wide text-[#0C2340]">
                {title}
              </p>
              <p className="mt-1 text-4xl font-black leading-none text-[#0C2340]">
                {value}
              </p>
              <p className="mt-1 text-sm font-medium text-slate-500">{sub}</p>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}