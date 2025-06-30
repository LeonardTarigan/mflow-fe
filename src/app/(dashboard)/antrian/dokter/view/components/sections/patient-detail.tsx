import useUpdateQueue from "@/app/(dashboard)/antrian/admin/hooks/useUpdateQueue";
import { Button } from "@/common/components/button/button";
import DoctorGif from "@/common/components/gif/doctor-gif";
import DrugGif from "@/common/components/gif/drug-gif";
import EmptyListGif from "@/common/components/gif/empty-list-gif";
import { IAddSessionDiagnosisPayload } from "@/common/models/diagnosis.model";
import { IAddSessionDrugOrderPayload } from "@/common/models/drug.model";
import { IDoctorQueueDetail } from "@/common/models/queue.model";
import { format } from "date-fns";
import { id as localeId } from "date-fns/locale/id";
import { CheckIcon, TrashIcon } from "lucide-react";
import useCreateSessionDiagnosis from "../../../hooks/useCreateSessionDiagnosis";
import useCreateSessionDrugOrder from "../../../hooks/useCreateSessionDrugOrder";
import useManageDiagnoses from "../../../hooks/useManageDiagnoses";
import useManageDrugOrders from "../../../hooks/useManageDrugOrders";
import AddDiagnosisModal from "../modals/add-diagnosis-modal";
import AddDrugOrderModal from "../modals/add-drug-order-modal";
import DoneConfirmationModal from "../modals/done-confirmation-modal";

export default function PatientDetail({
  data,
}: {
  data: IDoctorQueueDetail | undefined;
}) {
  const { diagnoses, addDiagnosis, removeDiagnosis, setDiagnoses } =
    useManageDiagnoses();
  const { drugOrders, addDrug, removeDrug, setDrugOrders } =
    useManageDrugOrders();

  const { mutateAsync: mutateUpdateQueue, isPending: isUpdateQueuePending } =
    useUpdateQueue(data?.id ?? 0);

  const {
    mutateAsync: mutateCreateSessionDiagnosis,
    isPending: isCreateSessionDiagnosisPending,
  } = useCreateSessionDiagnosis();

  const {
    mutateAsync: mutateCreateSessionDrugOrder,
    isPending: isCreateSessionDrugOrderPending,
  } = useCreateSessionDrugOrder();

  const isPending =
    isUpdateQueuePending ||
    isCreateSessionDiagnosisPending ||
    isCreateSessionDrugOrderPending;

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

  const { patient, queue_number, complaints, vital_sign } = data;

  const handleFinish = async () => {
    const createSessionDiagnosisPayload: IAddSessionDiagnosisPayload = {
      care_session_id: data.id,
      diagnosis_ids: diagnoses.map(({ id }) => id),
    };

    const createSessionDrugOrderPayload: IAddSessionDrugOrderPayload = {
      care_session_id: data.id,
      drugs: drugOrders.map(({ id, quantity, dose }) => ({
        drug_id: id,
        quantity,
        dose,
      })),
    };

    await mutateCreateSessionDiagnosis(createSessionDiagnosisPayload);

    if (drugOrders.length === 0) {
      await mutateUpdateQueue({ status: "WAITING_PAYMENT" });
    } else {
      await mutateCreateSessionDrugOrder(createSessionDrugOrderPayload);
      await mutateUpdateQueue({ status: "WAITING_MEDICATION" });
    }

    setDiagnoses([]);
    setDrugOrders([]);
  };

  return (
    <section className="basis-[60%] space-y-5 divide-y rounded-xl bg-white p-5">
      <div className="flex items-center justify-between gap-2">
        <h2 className="text-primary-gradient text-4xl font-black">
          #{queue_number}
        </h2>
        <DoneConfirmationModal
          isPending={isPending}
          disabled={diagnoses.length === 0}
          onConfirm={handleFinish}
        />
      </div>
      <div className="py-5">
        <h3 className="mb-3 text-xl font-bold">Informasi Pasien</h3>
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
        <h3 className="mb-3 text-xl font-bold">Keluhan</h3>
        <p>{complaints}</p>
      </div>
      <div className="space-y-3 py-5">
        <h3 className="mb-3 text-xl font-bold">Hasil Pemeriksaan Vital Sign</h3>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <h5 className="text-neutral-400">Tinggi Badan:</h5>
            <p className="font-semibold">{vital_sign.height_cm} cm</p>
          </div>
          <div>
            <h5 className="text-neutral-400">Berat Badan:</h5>
            <p className="font-semibold">{vital_sign.weight_kg} kg</p>
          </div>
          <div>
            <h5 className="text-neutral-400">Suhu Badan:</h5>
            <p className="font-semibold">{vital_sign.body_temperature_c} °C</p>
          </div>
          <div>
            <h5 className="text-neutral-400">Tekanan Darah:</h5>
            <p className="font-semibold">{vital_sign.blood_pressure} mmHg</p>
          </div>
          <div>
            <h5 className="text-neutral-400">Denyut Jantung:</h5>
            <p className="font-semibold">{vital_sign.heart_rate_bpm} bpm</p>
          </div>
          <div>
            <h5 className="text-neutral-400">Frekuensi Pernafasan:</h5>
            <p className="font-semibold">
              {vital_sign.respiratory_rate_bpm} bpm
            </p>
          </div>
        </div>
      </div>
      <div className="space-y-3 py-5">
        <h3 className="mb-3 text-xl font-bold">Diagnosis</h3>
        <div className="space-y-2">
          {diagnoses.length === 0 && (
            <div className="flex flex-col items-center justify-center py-5">
              <DoctorGif className="h-52 opacity-50 grayscale" />
              <p className="-mt-8 text-center text-neutral-400">
                Belum ada diagnosis yang ditambahkan
              </p>
            </div>
          )}
          {diagnoses.map(({ id, name }) => (
            <div
              key={id}
              className="flex items-center justify-between gap-3 rounded-lg border border-yellow-400 bg-yellow-100 p-5"
            >
              <div>
                <p className="text-sm">{id}</p>
                <p className="font-semibold">{name}</p>
              </div>
              <div className="space-y-2">
                <Button
                  onClick={() => removeDiagnosis(id)}
                  variant={"destructive"}
                  size={"icon"}
                >
                  <TrashIcon />
                </Button>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-center">
          <AddDiagnosisModal onAdd={addDiagnosis} />
        </div>
      </div>
      <div className="space-y-3 py-5">
        <h3 className="mb-3 text-xl font-bold">Resep Obat</h3>
        <div className="space-y-2">
          {drugOrders.length === 0 && (
            <div className="flex flex-col items-center justify-center py-5">
              <DrugGif className="opacity-50 grayscale" />
              <p className="text-center text-neutral-400">
                Belum ada resep obat yang ditambahkan
              </p>
            </div>
          )}
          {drugOrders.map(({ id, name, dose, unit, quantity }) => (
            <div
              key={id}
              className="flex items-center justify-between gap-3 rounded-lg border border-secondary-500 bg-secondary-100 p-5"
            >
              <div>
                <p className="font-semibold">
                  {name}, {quantity} {unit}
                </p>
                <p>{dose}</p>
              </div>
              <div className="space-y-2">
                <Button
                  onClick={() => removeDrug(id)}
                  variant={"destructive"}
                  size={"icon"}
                >
                  <TrashIcon />
                </Button>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-center">
          <AddDrugOrderModal onAdd={addDrug} />
        </div>
      </div>
    </section>
  );
}
