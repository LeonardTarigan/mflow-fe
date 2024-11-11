import type { TQueueStatus } from "@/model/queue-types";

export default function ChipQueueStatus({ status }: { status: TQueueStatus }) {
  let formattedStatus = "";
  let color = "bg-warning-100/55 text-warning-600";

  switch (status) {
    case "waiting":
      formattedStatus = "Menunggu";
      break;
    case "on-progress":
      formattedStatus = "Sedang Konsultasi";
      color = "bg-secondary-100/55 text-secondary-600";
      break;
    case "done":
      formattedStatus = "Selesai";
      color = "bg-green-100/55 text-green-600";
      break;
  }

  return (
    <div
      className={`rounded-full px-4 py-1 text-center font-medium text-xs ${color}`}
    >
      {formattedStatus}
    </div>
  );
}
