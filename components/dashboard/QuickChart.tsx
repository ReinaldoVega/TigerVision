"use client";

import { useState } from "react";
import AppCard from "@/components/common/AppCard";
import AppButton from "@/components/common/AppButton";
import SectionTitle from "@/components/common/SectionTitle";

const results = ["1B", "2B", "3B", "HR", "K", "BB", "HBP", "Out"];
const pitches = ["FB", "SI", "CT", "SL", "CB", "CH", "SP"];
const counts = ["0-0", "1-0", "0-1", "1-1", "2-1", "1-2", "2-2", "3-2"];
const contacts = ["GB", "LD", "FB", "PU"];
const quality = ["Weak", "Solid", "Hard Hit", "Barrel"];

export default function QuickChart() {
  const [result, setResult] = useState("");
  const [pitch, setPitch] = useState("");
  const [count, setCount] = useState("");
  const [contact, setContact] = useState("");
  const [q, setQ] = useState("");

  return (
    <AppCard className="space-y-6">
      <SectionTitle
        title="Quick Chart"
        subtitle="Capture the at-bat quickly and cleanly."
      />

      <ButtonSection title="Result" options={results} value={result} setValue={setResult} />
      <ButtonSection title="Pitch" options={pitches} value={pitch} setValue={setPitch} />
      <ButtonSection title="Count" options={counts} value={count} setValue={setCount} />
      <ButtonSection title="Contact" options={contacts} value={contact} setValue={setContact} />
      <ButtonSection title="Quality" options={quality} value={q} setValue={setQ} />

      <div className="rounded-2xl bg-slate-50 p-4">
        <p className="text-xs font-black uppercase tracking-widest text-slate-500">
          Current Input
        </p>
        <p className="mt-2 text-lg font-black text-[#0C2340]">
          {result || "-"} · {pitch || "-"} · {count || "-"} · {contact || "-"} · {q || "-"}
        </p>
      </div>
    </AppCard>
  );
}

function ButtonSection({
  title,
  options,
  value,
  setValue,
}: {
  title: string;
  options: string[];
  value: string;
  setValue: (v: string) => void;
}) {
  return (
    <div>
      <h3 className="mb-3 text-sm font-black uppercase tracking-widest text-slate-500">
        {title}
      </h3>

      <div className="grid grid-cols-4 gap-3">
        {options.map((option) => (
          <AppButton
            key={option}
            active={value === option}
            onClick={() => setValue(option)}
          >
            {option}
          </AppButton>
        ))}
      </div>
    </div>
  );
}