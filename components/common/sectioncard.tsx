import { LucideIcon } from "lucide-react";

type MetricCardProps = {
  icon: LucideIcon;
  title: string;
  value: string | number;
  subtitle?: string;
};

export function MetricCard({
  icon: Icon,
  title,
  value,
  subtitle,
}: MetricCardProps) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <Icon className="mb-3 h-7 w-7 text-[#FA4616]" />
      <p className="text-xs font-black uppercase tracking-wide text-slate-500">
        {title}
      </p>
      <p className="mt-2 text-4xl font-black text-[#0C2340]">{value}</p>
      {subtitle && <p className="mt-1 text-sm text-slate-500">{subtitle}</p>}
    </div>
  );
}