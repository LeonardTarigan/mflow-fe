import { IPatient } from "@/common/models/patient.model";
import { UserCircleCheckIcon } from "@phosphor-icons/react";
import { format } from "date-fns";
import { id } from "date-fns/locale";

export default function PatientData({
  patient,
  title,
}: {
  patient: IPatient;
  title: string;
}) {
  return (
    <div className="space-y-3 rounded-lg border border-success-400 bg-success-100 p-3">
      <div className="flex items-center gap-1 font-medium text-success-600">
        <UserCircleCheckIcon size={24} />
        <h3>{title}</h3>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <div>
          <p className="text-sm text-neutral-400">No. MR:</p>
          <p className="font-semibold">{patient.medical_record_number}</p>
        </div>
        <div>
          <p className="text-sm text-neutral-400">Nama:</p>
          <p className="font-semibold">{patient.name}</p>
        </div>
        <div>
          <p className="text-sm text-neutral-400">NIK:</p>
          <p className="font-semibold">{patient.nik}</p>
        </div>
        <div>
          <p className="text-sm text-neutral-400">No. Telepon:</p>
          <p className="font-semibold">{patient.phone_number}</p>
        </div>
        <div>
          <p className="text-sm text-neutral-400">Jenis Kelamin:</p>
          <p className="font-semibold">
            {patient.gender === "FEMALE" ? "Perempuan" : "Laki-laki"}
          </p>
        </div>
        <div>
          <p className="text-sm text-neutral-400">Tanggal lahir:</p>
          <p className="font-semibold">
            {format(new Date(patient.birth_date), "dd MMM yyyy", {
              locale: id,
            })}
          </p>
        </div>
      </div>
    </div>
  );
}
