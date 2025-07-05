import { HeartPulseIcon } from "lucide-react";

import { IDiagnosis } from "@/app/(dashboard)/antrian/dokter/hooks/useManageDiagnoses";
import { Button } from "@/common/components/button/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/common/components/dialog/dialog";
import { IVitalSign } from "@/common/models/care-history.model";
import { ISessionDrugOrderDetail } from "@/common/models/drug.model";
import { ICareSessionTreatment } from "@/common/models/treatment.model";
import { useState } from "react";

export default function TreatmentDetailModal({
  date,
  room,
  queueNumber,
  complaints,
  diagnoses,
  treatments,
  vitalSign,
  drugOrders,
}: {
  date: string;
  room: string;
  queueNumber: string;
  complaints: string;
  vitalSign?: IVitalSign;
  diagnoses: IDiagnosis[];
  treatments: ICareSessionTreatment[];
  drugOrders: ISessionDrugOrderDetail[];
}) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          size={"icon"}
          variant={"outline"}
          className="bg-secondary-500 hover:bg-secondary-600"
        >
          <HeartPulseIcon className="text-white" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] min-w-[500px] overflow-auto sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            Detail Pemeriksaan Pasien
          </DialogTitle>
          <DialogDescription />
        </DialogHeader>
        <div className="space-y-5">
          <div className="flex justify-between pb-3">
            <p className="text-primary-gradient text-2xl font-black">
              #{queueNumber}
            </p>
            <div className="text-end text-sm">
              <p>{room} </p>
              <p>{date} </p>
            </div>
          </div>
          <div>
            {!vitalSign && (
              <p className="text-neutral-400">Tidak ada data vital sign</p>
            )}
            {vitalSign && (
              <div className="grid grid-cols-2 gap-2">
                <div className="flex flex-col items-center justify-center rounded-lg border p-3">
                  <p className="text-sm">Tinggi Badan</p>
                  <p className="font-semibold">{vitalSign.height_cm} cm</p>
                </div>
                <div className="flex flex-col items-center justify-center rounded-lg border p-3">
                  <p className="text-sm">Berat Badan</p>
                  <p className="font-semibold">{vitalSign.weight_kg} kg</p>
                </div>
                <div className="flex flex-col items-center justify-center rounded-lg border p-3">
                  <p className="text-sm">Suhu Badan</p>
                  <p className="font-semibold">
                    {vitalSign.body_temperature_c} °C
                  </p>
                </div>
                <div className="flex flex-col items-center justify-center rounded-lg border p-3">
                  <p className="text-sm">Tekanan Darah</p>
                  <p className="font-semibold">
                    {vitalSign.blood_pressure} mmHg
                  </p>
                </div>
                <div className="flex flex-col items-center justify-center rounded-lg border p-3">
                  <p className="text-sm">Denyut Jantung</p>
                  <p className="font-semibold">
                    {vitalSign.heart_rate_bpm} bpm
                  </p>
                </div>
                <div className="flex flex-col items-center justify-center rounded-lg border p-3">
                  <p className="text-sm">Frekuensi Pernafasan</p>
                  <p className="font-semibold">
                    {vitalSign.respiratory_rate_bpm} bpm
                  </p>
                </div>
              </div>
            )}
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-bold">Keluhan</h3>
            <p className="">{complaints}</p>
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-bold">Diagnosis</h3>
            <div className="space-y-2">
              {diagnoses.length === 0 && (
                <p className="italic text-neutral-400">
                  Tidak ada diagnosis yang ditambahkan
                </p>
              )}
              {diagnoses?.map(({ id, name }) => (
                <div
                  key={id}
                  className="flex items-center justify-between rounded-lg border border-amber-400 bg-amber-100 p-3 font-medium text-amber-700"
                >
                  <p>{name}</p>
                  <p>{id}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-bold">Penanganan</h3>
            <div className="space-y-2">
              {treatments.length === 0 && (
                <p className="italic text-neutral-400">
                  Tidak ada penanganan yang ditambahkan
                </p>
              )}
              {treatments?.map(({ id, name }) => (
                <div
                  key={id}
                  className="flex items-center justify-between rounded-lg border border-violet-400 bg-violet-100 p-3 font-medium text-violet-700"
                >
                  <p>{name}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-bold">Resep Obat</h3>
            <div className="space-y-2">
              {drugOrders.length === 0 && (
                <p className="italic text-neutral-400">
                  Tidak ada resep obat yang diberikan
                </p>
              )}
              {drugOrders?.map(({ id, name, dose, quantity, unit }) => (
                <div
                  key={id}
                  className="space-y-2 rounded-lg border border-secondary-400 bg-secondary-100 p-3 font-medium text-secondary-700"
                >
                  <div className="flex items-center justify-between">
                    <p>{name}</p>
                    <p>
                      {quantity} {unit}
                    </p>
                  </div>
                  <p>{dose}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
