import { CalendarDays, Clock, MapPin, Save } from "lucide-react";
import AppCard from "@/components/common/AppCard";

export default function DashboardFooter() {
  return (
    <AppCard className="bg-[#07111F] text-white">
      <div className="flex items-center justify-between gap-6">
        <div className="flex items-center gap-8">
          <FooterItem icon={<CalendarDays />} label="Date" value="Jul 2, 2026" />
          <FooterItem icon={<Clock />} label="Game Time" value="7:05 PM" />
          <FooterItem icon={<MapPin />} label="Location" value="Tigers Academy" />
          <FooterItem icon={<Save />} label="Status" value="Auto Saved" />
        </div>

        <button className="rounded-2xl bg-[#FA4616] px-8 py-4 font-black text-white shadow-lg transition hover:bg-[#ff6a2a]">
          End Game
        </button>
      </div>
    </AppCard>
  );
}

function FooterItem({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 text-[#FA4616]">
        {icon}
      </div>

      <div>
        <p className="text-xs font-black uppercase tracking-widest text-slate-400">
          {label}
        </p>
        <p className="font-black text-white">{value}</p>
      </div>
    </div>
  );
}