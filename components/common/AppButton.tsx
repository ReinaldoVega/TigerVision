import { cn } from "@/lib/utils";

type Props = {
  children: React.ReactNode;
  active?: boolean;
  onClick?: () => void;
};

export default function AppButton({ children, active, onClick }: Props) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "h-12 rounded-xl border px-4 font-black transition-all",
        active
          ? "border-[#FA4616] bg-[#FA4616] text-white shadow-lg"
          : "border-slate-200 bg-slate-100 text-[#0C2340] hover:border-[#FA4616] hover:bg-orange-50"
      )}
    >
      {children}
    </button>
  );
}