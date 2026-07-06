"use client";

type Props = {
  children: React.ReactNode;
  active?: boolean;
  disabled?: boolean;
  onClick?: () => void;
};

export default function TVButton({
  children,
  active = false,
  disabled = false,
  onClick,
}: Props) {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`h-10 rounded-xl border text-xs font-black transition-all duration-150

      ${
        active
          ? "border-[#FA4616] bg-[#FA4616] text-white shadow-lg"
          : "border-slate-200 bg-white text-[#0C2340]"
      }

      ${
        disabled
          ? "cursor-not-allowed opacity-30"
          : "hover:scale-[1.03] hover:border-[#FA4616]"
      }
      `}
    >
      {children}
    </button>
  );
}