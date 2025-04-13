import { cn } from "@/common/lib/utils";
import { TQueueStatus } from "@/common/models/queue.model";

const STATUS_CONFIG: Record<
  TQueueStatus,
  { label: string; textColor: string; bgColor: string }
> = {
  "waiting-consultation": {
    label: "Menunggu Konsultasi",
    textColor: "text-yellow-500",
    bgColor: "bg-yellow-100",
  },
  "in-constultation": {
    label: "Sedang Konsultasi",
    textColor: "text-secondary-500",
    bgColor: "bg-secondary-100",
  },
  "waiting-prescription": {
    label: "Menunggu Obat",
    textColor: "text-rose-500",
    bgColor: "bg-rose-100",
  },
  "waiting-payment": {
    label: "Menunggu Pembayaran",
    textColor: "text-indigo-500",
    bgColor: "bg-indigo-100",
  },
  completed: {
    label: "Selesai",
    textColor: "text-emerald-500",
    bgColor: "bg-emerald-100",
  },
};

export default function QueueStatusChip({ status }: { status: TQueueStatus }) {
  const { label, textColor, bgColor } = STATUS_CONFIG[status];

  return (
    <div
      className={cn(
        "w-fit rounded-full px-3 py-1 text-xs font-semibold",
        textColor,
        bgColor,
      )}
    >
      {label}
    </div>
  );
}
