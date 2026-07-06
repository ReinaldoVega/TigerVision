"use client";

import Image from "next/image";
import fieldBg from "@/components/svg/field-bg.png";
import Card from "@/components/layout/Card";
import { useChartContext } from "@/context/ChartContext";
import { FieldDirection } from "@/types/chart";

const positions: { id: FieldDirection; x: string; y: string }[] = [
  { id: "LF", x: "25%", y: "28%" },
  { id: "CF", x: "50%", y: "17%" },
  { id: "RF", x: "75%", y: "28%" },

  { id: "3B", x: "35%", y: "55%" },
  { id: "SS", x: "43%", y: "40%" },
  { id: "2B", x: "57%", y: "40%" },
  { id: "1B", x: "65%", y: "55%" },

  { id: "P", x: "50%", y: "63%" },
  { id: "C", x: "50%", y: "86%" },
];

export default function FieldCard({ compact = false }: { compact?: boolean }) {
  const { currentAtBat, updateAtBat } = useChartContext();

  const content = (
    <div className="h-full">
      <div className="relative h-full overflow-hidden rounded-2xl border border-[#25476D] bg-[#07111F]">
        <Image
          src={fieldBg}
          alt="Field"
          fill
          priority
          className="object-contain object-center p-0"
        />

        {positions.map((pos) => {
          const active = currentAtBat.direction === pos.id;

          return (
            <button
              key={pos.id}
              onClick={() => updateAtBat("direction", pos.id)}
              className={`absolute flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 text-sm font-black text-white shadow-lg transition-all duration-150 ${
                active
                  ? "scale-150 border-white bg-[#FA4616] shadow-[0_0_24px_rgba(250,70,22,.65)]"
                  : "border-white bg-[#07111F] hover:scale-150 hover:bg-[#FA4616] hover:shadow-[0_0_22px_rgba(250,70,22,.55)]"
              }`}
              style={{
                left: pos.x,
                top: pos.y,
              }}
            >
              {pos.id}
            </button>
          );
        })}
      </div>
    </div>
  );

  if (compact) return content;

  return (
    <Card title="Field" dark className="h-full">
      {content}
    </Card>
  );
}