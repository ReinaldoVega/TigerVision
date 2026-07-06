type TVBadgeProps = {
  children: React.ReactNode;
  color?: "green" | "orange" | "red" | "navy";
};

export default function TVBadge({ children, color = "green" }: TVBadgeProps) {
  const colors = {
    green: "bg-green-600",
    orange: "bg-[#FA4616]",
    red: "bg-red-600",
    navy: "bg-[#0C2340]",
  };

  return (
    <span
      className={`rounded-full px-3 py-1 text-[10px] font-black uppercase text-white ${colors[color]}`}
    >
      {children}
    </span>
  );
}