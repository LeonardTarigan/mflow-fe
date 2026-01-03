import { TrendingUpIcon } from "lucide-react";
import { ReactNode } from "react";

export default function QuickStatSection({
  title,
  value,
  percentage,
  description,
  icon,
}: {
  title: string;
  value: number;
  percentage: number;
  description: string;
  icon: ReactNode;
}) {
  return (
    <section className="flex basis-1/2 flex-col justify-between gap-5 rounded-xl bg-white p-5">
      <div className="flex items-center gap-2">
        <div className="flex items-center justify-center rounded-full bg-secondary-100 p-2">
          {icon}
        </div>
        <h3 className="text-lg font-semibold">{title}</h3>
      </div>
      <div className="flex items-center gap-3">
        <p className="text-5xl font-bold">{value}</p>
        <div className="flex items-center gap-1 rounded-full bg-success-100 px-4 py-1 text-sm font-semibold text-success-600">
          <TrendingUpIcon size={18} />
          <p>{percentage}%</p>
        </div>
      </div>
      <p className="text-xs leading-tight text-neutral-400">{description}</p>
    </section>
  );
}
