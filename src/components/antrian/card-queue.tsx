import type { TQueueStatus } from "@/model/queue-types";
import { FilePenLineIcon } from "lucide-react";
import { Button } from "../shared/button";
import ChipQueueStatus from "./chip-queue-status";
import ModalVitalSign from "./modal-vital-sign";

interface ICardQueue {
  status: TQueueStatus;
}

export default function CardQueue({ status }: ICardQueue) {
  return (
    <div className="relative z-0 flex flex-col gap-6 overflow-hidden rounded-lg bg-white p-5">
      <div className="-z-20 -top-20 absolute right-0 select-none font-black text-[15rem] text-neutral-100">
        #
      </div>
      <div className="flex items-center justify-between gap-4">
        <h3 className="font-black text-2xl text-primary-gradient">U2-10</h3>
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
      <div className="z-10 flex gap-2">
        <Button size={"sm"} variant={"outline"} className="w-full">
          <FilePenLineIcon size={15} />
          <span>Edit Data</span>
        </Button>
        <ModalVitalSign />
      </div>
    </div>
  );
}
