import { Button } from "@/common/components/button/button";
import QueueStatusChip from "@/common/components/chip/queue-status-chip";
import { getSocket } from "@/common/lib/socket";
import { cn } from "@/common/lib/utils";
import { IVitalSign } from "@/common/models/care-history.model";
import { ISessionDrugOrderDetail } from "@/common/models/drug.model";
import { TQueueStatus } from "@/common/models/queue.model";
import { useQueryClient } from "@tanstack/react-query";
import { MicVocalIcon, PlayIcon } from "lucide-react";
import useUpdateQueue from "../../../hooks/useUpdateQueue";
import PaymentDetailModal from "../modals/payment-detail-modal";
import VitalSignModal from "../modals/vital-sign-modal";
import { ICareSessionTreatment } from "@/common/models/treatment.model";

const STATUS_CONFIG: Record<TQueueStatus, string> = {
  WAITING_CONSULTATION: "border-l-yellow-400",
  IN_CONSULTATION: "border-l-secondary-400",
  WAITING_MEDICATION: "border-l-indigo-400",
  WAITING_PAYMENT: "border-l-emerald-500",
  COMPLETED: "border-l-emerald-400",
};

export default function QueueCard({
  status,
  queueId,
  queueNumber,
  patientName,
  doctorName,
  roomName,
  date,
  vitalSign,
  drugOrders,
  treatments,
}: {
  status: TQueueStatus;
  queueId: number;
  queueNumber: string;
  patientName: string;
  patientId: string;
  doctorName: string;
  date: string;
  roomName: string;
  drugOrders: ISessionDrugOrderDetail[];
  treatments: ICareSessionTreatment[];
  vitalSign?: IVitalSign;
}) {
  const borderColor = STATUS_CONFIG[status];

  const queryClient = useQueryClient();

  const { mutateAsync, isPending } = useUpdateQueue(queueId);

  const socket = getSocket();

  return (
    <div
      className={cn(
        "relative z-0 flex w-full flex-col gap-4 overflow-hidden rounded-lg border border-l-4 border-neutral-200 bg-white p-5",
        borderColor,
      )}
    >
      <div className="absolute -top-16 right-2 -z-10 select-none text-[200px] font-black text-neutral-100">
        #
      </div>
      <div className="flex items-center justify-between gap-2">
        <h4 className="text-primary-gradient text-xl font-black">
          {queueNumber}
        </h4>
        <QueueStatusChip status={status} />
      </div>
      <div className="grid grid-cols-2 gap-2 text-sm">
        <div>
          <h5 className="text-neutral-400">Pasien:</h5>
          <p className="font-semibold">{patientName}</p>
        </div>
        <div>
          <h5 className="text-neutral-400">Dokter:</h5>
          <p className="font-semibold">{doctorName}</p>
        </div>
        <div>
          <h5 className="text-neutral-400">Ruangan:</h5>
          <p className="font-semibold">{roomName}</p>
        </div>
        <div>
          <h5 className="text-neutral-400">Waktu Registrasi:</h5>
          <p className="font-semibold">{date}</p>
        </div>
      </div>
      <div className="flex w-full justify-end gap-2 pt-3">
        {!vitalSign && (
          <VitalSignModal
            {...{ doctorName, patientName, queueNumber, roomName, queueId }}
          />
        )}
        {vitalSign && status === "WAITING_CONSULTATION" && (
          <Button
            onClick={() => {
              mutateAsync({ status: "IN_CONSULTATION" });
              queryClient.invalidateQueries({
                queryKey: ["admin-queue-data"],
              });
            }}
            isLoading={isPending}
            className="bg-secondary-500 hover:bg-secondary-600"
          >
            <PlayIcon />
            <span>Lanjut Konsultasi</span>
          </Button>
        )}
        {status === "IN_CONSULTATION" && (
          <Button
            onClick={() =>
              socket.emit("trigger_called_queue_update", {
                id: queueId,
                queue_number: queueNumber,
              })
            }
            isLoading={isPending}
            className="bg-secondary-500 hover:bg-secondary-600"
          >
            <MicVocalIcon />
            <span>Panggil</span>
          </Button>
        )}
        {status === "WAITING_PAYMENT" && (
          <PaymentDetailModal
            onFinish={() => mutateAsync({ status: "COMPLETED" })}
            isPending={isPending}
            drugOrders={drugOrders}
            treatments={treatments}
            patientName={patientName}
            doctorName={doctorName}
          />
        )}
      </div>
    </div>
  );
}
