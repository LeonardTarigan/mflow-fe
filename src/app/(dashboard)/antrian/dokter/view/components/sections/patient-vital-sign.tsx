import { IVitalSign } from "@/common/models/care-history.model";
import { HeartbeatIcon } from "@phosphor-icons/react";
import React from "react";

export default function PatientVitalSign({
  vitalSign,
}: {
  vitalSign: IVitalSign;
}) {
  return (
    <div className="space-y-3 py-5">
      <div className="mb-3 flex items-center gap-2">
        <HeartbeatIcon size={24} weight="fill" />
        <h3 className="text-xl font-bold">Hasil Pemeriksaan Vital Sign</h3>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <h5 className="text-neutral-400">Tinggi Badan:</h5>
          <p className="font-semibold">{vitalSign.height_cm} cm</p>
        </div>
        <div>
          <h5 className="text-neutral-400">Berat Badan:</h5>
          <p className="font-semibold">{vitalSign.weight_kg} kg</p>
        </div>
        <div>
          <h5 className="text-neutral-400">Suhu Badan:</h5>
          <p className="font-semibold">{vitalSign.body_temperature_c} °C</p>
        </div>
        <div>
          <h5 className="text-neutral-400">Tekanan Darah:</h5>
          <p className="font-semibold">{vitalSign.blood_pressure} mmHg</p>
        </div>
        <div>
          <h5 className="text-neutral-400">Denyut Jantung:</h5>
          <p className="font-semibold">{vitalSign.heart_rate_bpm} bpm</p>
        </div>
        <div>
          <h5 className="text-neutral-400">Frekuensi Pernafasan:</h5>
          <p className="font-semibold">{vitalSign.respiratory_rate_bpm} bpm</p>
        </div>
      </div>
    </div>
  );
}
