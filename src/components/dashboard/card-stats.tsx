import { cn } from "@/lib/utils";
import { TrendingDownIcon, TrendingUpIcon } from "lucide-react";

interface IComparison {
  type: "increase" | "decrease" | null;
  value: string;
}

interface IStatsCard {
  label: string;
  children: React.ReactNode;
  containerClassName?: string;
  contentClassName?: string;
  comparison?: IComparison;
}

export default function CardStats({
  label,
  children,
  containerClassName,
  contentClassName,
  comparison,
}: IStatsCard) {
  return (
    <div
      className={cn(
        "flex h-full min-h-44 w-full flex-col overflow-hidden",
        containerClassName,
      )}
    >
      <div className="rounded-t-xl bg-primary-500 px-4 py-2 text-neutral-100">
        <h3 className="line-clamp-1 font-semibold md:text-lg">{label}</h3>
      </div>
      <div
        className={cn(
          "flex h-full flex-col items-center justify-center gap-1 rounded-b-xl bg-white p-5",
          contentClassName,
        )}
      >
        {children}
        {Boolean(comparison) && (
          <div
            className={`flex items-center gap-2 rounded-full px-4 py-1 font-bold ${comparison?.type === "increase" ? "bg-success-100 text-success-700" : "bg-error-100 text-error-600"}`}
          >
            <p className="whitespace-nowrap text-xs md:text-sm">
              {comparison?.type === "increase" ? "Naik" : "Turun"}{" "}
              {comparison?.value}
            </p>
            {comparison?.type === "increase" && (
              <TrendingUpIcon className="size-4" />
            )}
            {comparison?.type === "decrease" && (
              <TrendingDownIcon className="size-4" />
            )}
          </div>
        )}
      </div>
    </div>
  );
}
