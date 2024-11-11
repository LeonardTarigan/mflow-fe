import type { TQueueStatus } from "@/model/queue-types";
import ChipQueueStatus from "./chip-queue-status";

interface ICardQueue {
  status: TQueueStatus;
}

export default function CardQueue({ status }: ICardQueue) {
  return (
    <div className="relative z-0 flex flex-col gap-6 rounded-lg bg-white p-5">
      <div className="-z-10 -top-10 absolute right-0 font-black text-[11rem] text-neutral-100">
        #
      </div>
      <div className="flex items-center justify-between gap-4">
        <h3 className="font-black text-2xl text-primary-gradient">U01</h3>
        <ChipQueueStatus status={status} />
      </div>
      <div className="grid grid-cols-2 gap-2 text-sm">
        <div>
          <h4 className="text-xs">Pasien:</h4>
          <p className="font-semibold">Johan Sutardjo</p>
        </div>
        <div>
          <h4 className="text-xs">Dokter:</h4>
          <p className="font-semibold">Dr. Hendra Wijaya</p>
        </div>
        <div>
          <h4 className="text-xs">Ruangan:</h4>
          <p className="font-semibold">Poli Umum</p>
        </div>
        <div>
          <h4 className="text-xs">Waktu Registrasi:</h4>
          <p className="font-semibold">16 Okt 2024, 13:34</p>
        </div>
      </div>
    </div>
  );
}
