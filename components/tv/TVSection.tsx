"use client";

type Status = "pending" | "active" | "done";

export default function TVSection({
  number,
  title,
  status,
  children,
}: {
  number: number;
  title: string;
  status: Status;
  children: React.ReactNode;
}) {
  const colors = {
    active: "bg-[#FA4616] text-white",
    done: "bg-[#1DB954] text-white",
    pending: "bg-[#0C2340] text-white",
  };

  return (
    <section className="mb-5">
      <div className="mb-3 flex items-center gap-3">
        <div
          className={`flex h-9 w-9 items-center justify-center rounded-full text-base font-black transition-all ${colors[status]}`}
        >
          {status === "done" ? "✓" : number}
        </div>

        <h2 className="text-lg font-black text-[#0C2340]">
          {title}
        </h2>

        <div className="ml-auto">
          {status === "active" && (
            <div className="h-3 w-3 rounded-full bg-[#FA4616] animate-pulse" />
          )}

          {status === "done" && (
            <div className="h-3 w-3 rounded-full bg-[#1DB954]" />
          )}

          {status === "pending" && (
            <div className="h-3 w-3 rounded-full border border-slate-300" />
          )}
        </div>
      </div>

      {children}
    </section>
  );
}