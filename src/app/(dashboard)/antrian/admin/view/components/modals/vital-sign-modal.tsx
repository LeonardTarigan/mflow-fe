import { Button } from "@/common/components/button/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/common/components/dialog/dialog";
import { ActivityIcon } from "lucide-react";
import { useState } from "react";
import VitalSignForm from "../forms/vital-sign-form";
import useCreateVitalSign from "../../../hooks/useCreateVitalSign";

export default function VitalSignModal({
  queueId,
  queueNumber,
  doctorName,
  patientName,
  roomName,
}: {
  queueId: number;
  queueNumber: string;
  patientName: string;
  doctorName: string;
  roomName: string;
}) {
  const [open, setOpen] = useState(false);
  const { onSubmit, isPending } = useCreateVitalSign(queueId, setOpen);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size={"sm"}>
          <ActivityIcon size={15} />
          <span>Isi Vital Sign</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-auto">
        <DialogTitle className="text-xl font-bold">
          Tambah Data Vital Sign
        </DialogTitle>
        <div className="mb-5 grid grid-cols-2 gap-2 border-y py-5 text-sm">
          <div>
            <h4 className="text-xs">Kode Antrian:</h4>
            <p className="font-semibold">{queueNumber}</p>
          </div>
          <div>
            <h4 className="text-xs">Pasien:</h4>
            <p className="font-semibold">{patientName}</p>
          </div>
          <div>
            <h4 className="text-xs">Dokter:</h4>
            <p className="font-semibold">{doctorName}</p>
          </div>

          <div>
            <h4 className="text-xs">Ruangan:</h4>
            <p className="font-semibold">{roomName}</p>
          </div>
        </div>
        <VitalSignForm onSubmit={onSubmit} isLoading={isPending} />
      </DialogContent>
    </Dialog>
  );
}
