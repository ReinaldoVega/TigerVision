"use client";

import { DESIGN } from "@/lib/design";
import { useChartContext } from "@/context/ChartContext";

type DashboardProps = {
  header: React.ReactNode;
  context: React.ReactNode;
  left: React.ReactNode;
  center: React.ReactNode;
  right: React.ReactNode;
  footer: React.ReactNode;
};

export default function Dashboard({
  header,
  context,
  left,
  center,
  right,
  footer,
}: DashboardProps) {
  const { isLightMode } = useChartContext();

  return (
    <main
      className={`h-screen overflow-hidden p-3 font-sans ${
        isLightMode ? "bg-slate-100" : "bg-[#07111F]"
      }`}
    >
      <div
        className="mx-auto grid h-full"
        style={{
          maxWidth: DESIGN.pageWidth,
          gridTemplateRows: `${DESIGN.headerHeight}px ${DESIGN.contextHeight}px 1fr ${DESIGN.footerHeight}px`,
          rowGap: DESIGN.gap,
        }}
      >
        <div className="min-h-0">{header}</div>
        <div className="min-h-0">{context}</div>

        <div
          className="grid min-h-0"
          style={{
            gridTemplateColumns: `${DESIGN.leftWidth}px ${DESIGN.centerWidth}px ${DESIGN.rightWidth}px`,
            columnGap: DESIGN.gap,
          }}
        >
          <div className="min-h-0 overflow-hidden">{left}</div>
          <div className="min-h-0 overflow-hidden">{center}</div>
          <div className="min-h-0 overflow-hidden">{right}</div>
        </div>

        <div className="min-h-0">{footer}</div>
      </div>
    </main>
  );
}