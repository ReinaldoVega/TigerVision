import { cn } from "@/lib/utils";

type TVCardProps = {
  title?: string;
  dark?: boolean;
  right?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  bodyClassName?: string;
  style?: React.CSSProperties;
};

export default function TVCard({
  title,
  dark = false,
  right,
  children,
  className,
  bodyClassName,
  style,
}: TVCardProps) {
  return (
    <div
      style={style}
      className={cn(
        "overflow-hidden rounded-[22px] border shadow-[0_12px_30px_rgba(15,23,42,.12)]",
        dark
          ? "border-[#25476D] bg-[#081A33] text-white"
          : "border-slate-200 bg-white text-[#0C2340]",
        className
      )}
    >
      {title && (
        <div
          className={cn(
            "flex h-11.5 items-center justify-between px-5",
            dark ? "bg-[#0C2340] text-white" : "bg-[#0C2340] text-white"
          )}
        >
          <h2 className="text-[15px] font-black uppercase tracking-wide">
            {title}
          </h2>

          {right}
        </div>
      )}

      <div className={cn("p-5", bodyClassName)}>{children}</div>
    </div>
  );
}