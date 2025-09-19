import { Button } from "@/common/components/button/button";
import EmptyListGif from "@/common/components/gif/empty-list-gif";
import { ICareSessionDetail } from "@/common/models/care-session.model";
import { BandaidsIcon, UserIcon } from "@phosphor-icons/react";
import { format } from "date-fns";
import { id as localeId } from "date-fns/locale/id";
import { CheckIcon } from "lucide-react";
import DoneConfirmationModal from "../modals/done-confirmation-modal";
import PatientTreatment from "./patient-treatment";
import PatientVitalSign from "./patient-vital-sign";
import PatientDiagnosis from "./patient-diagnosis";
import PatientPrescription from "./patient-prescription";
import useUpdateQueue from "@/app/(dashboard)/antrian/admin/hooks/useUpdateQueue";

export default function PatientDetail({
  data,
}: {
  data: ICareSessionDetail | undefined;
}) {
  const { mutateAsync, isPending } = useUpdateQueue(data?.id || 0);

  if (!data)
    return (
      <section className="basis-[60%] space-y-5 divide-y rounded-xl bg-white p-5">
        <div className="flex items-center justify-between gap-2">
          <h2 className="text-4xl font-black text-neutral-300">#U0000</h2>
          <Button disabled className="bg-emerald-500">
            <CheckIcon />
            <span>Selesaikan Sesi</span>
          </Button>
        </div>
        <div className="flex h-96 flex-col items-center justify-center">
          <EmptyListGif className="h-72 opacity-50 grayscale" />
          <p className="-mt-5 text-neutral-400">
            Tidak ada sesi aktif saat ini
          </p>
        </div>
      </section>
    );

  const {
    id,
    patient,
    queue_number,
    complaints,
    vital_sign,
    treatments,
    diagnoses,
    drug_orders,
  } = data;

  return (
    <section className="basis-[60%] space-y-5 divide-y rounded-xl bg-white p-5">
      <div className="flex items-center justify-between gap-2">
        <h2 className="text-primary-gradient text-4xl font-black">
          #{queue_number}
        </h2>
        <DoneConfirmationModal
          isPending={isPending}
          disabled={diagnoses.length === 0 || treatments.length === 0}
          onConfirm={() =>
            mutateAsync({
              status:
                drug_orders.length > 0
                  ? "WAITING_MEDICATION"
                  : "WAITING_PAYMENT",
            })
          }
        />
      </div>
      <div className="py-5">
        <div className="mb-3 flex items-center gap-2">
          <UserIcon size={24} weight="fill" />
          <h3 className="text-xl font-bold">Informasi Pasien</h3>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <h5 className="text-neutral-400">Nama Pasien:</h5>
            <p className="font-semibold">{patient.name}</p>
          </div>
          <div>
            <h5 className="text-neutral-400">Jenis Kelamin:</h5>
            <p className="font-semibold">
              {patient.gender === "MALE" ? "Laki-laki" : "Perempuan"}
            </p>
          </div>
          <div>
            <h5 className="text-neutral-400">Pekerjaan:</h5>
            <p className="font-semibold">{patient.occupation}</p>
          </div>
          <div>
            <h5 className="text-neutral-400">Tanggal lahir:</h5>
            <p className="font-semibold">
              {format(new Date(patient.birth_date), "dd MMMM yyyy", {
                locale: localeId,
              })}
            </p>
          </div>
        </div>
      </div>
      <div className="space-y-3 py-5">
        <div className="mb-3 flex items-center gap-2">
          <BandaidsIcon size={24} weight="fill" />
          <h3 className="text-xl font-bold">Keluhan</h3>
        </div>
        <p>{complaints}</p>
      </div>
      {vital_sign && <PatientVitalSign vitalSign={vital_sign} />}
      <PatientTreatment careSessionId={id} treatments={treatments} />
      <PatientDiagnosis careSessionId={id} diagnoses={diagnoses} />
      <PatientPrescription careSessionId={id} drugOrders={drug_orders} />
    </section>
  );
}
