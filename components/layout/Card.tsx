import TVCard from "@/components/tv/TVCard";

type CardProps = {
  title?: string;
  dark?: boolean;
  action?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  bodyClassName?: string;
  style?: React.CSSProperties;
};

export default function Card({
  title,
  dark = false,
  action,
  children,
  className,
  bodyClassName,
  style,
}: CardProps) {
  return (
    <TVCard
      title={title}
      dark={dark}
      right={action}
      className={className}
      bodyClassName={bodyClassName}
      style={style}
    >
      {children}
    </TVCard>
  );
}