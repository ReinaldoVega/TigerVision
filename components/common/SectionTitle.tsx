type Props = {
  title: string;
  subtitle?: string;
};

export default function SectionTitle({ title, subtitle }: Props) {
  return (
    <div className="mb-4">
      <h2 className="text-xl font-black text-[#0C2340]">{title}</h2>
      {subtitle && <p className="text-sm font-medium text-slate-500">{subtitle}</p>}
    </div>
  );
}