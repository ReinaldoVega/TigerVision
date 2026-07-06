import { Activity, Target, Flame, CircleDot, Trophy } from "lucide-react";

import { MetricCard } from "@/components/common/metriccard";

export default function KPIRow() {
  return (
    <div className="grid grid-cols-5 gap-5">

      <MetricCard
        icon={Activity}
        title="Charted ABs"
        value="24"
        subtitle="Today's Game"
      />

      <MetricCard
        icon={Target}
        title="Hard Hit %"
        value="42%"
        subtitle="Excellent"
      />

      <MetricCard
        icon={Flame}
        title="Quality Contact"
        value="68%"
        subtitle="Above Avg"
      />

      <MetricCard
        icon={CircleDot}
        title="Chase %"
        value="18%"
        subtitle="Very Good"
      />

      <MetricCard
        icon={Trophy}
        title="Runs"
        value="6"
        subtitle="Current"
      />

    </div>
  );
}