import { Button } from "@/common/components/button/button";
import EmptyBookingGif from "@/common/components/gif/empty-booking-gif";
import { CheckIcon, TrashIcon } from "lucide-react";
import useManageDiagnoses from "../../../hooks/useManageDiagnoses";
import useManageDrugOrders from "../../../hooks/useManageDrugOrders";
import AddDiagnosisModal from "../modals/add-diagnosis-modal";
import AddDrugOrderModal from "../modals/add-drug-order-modal";
import { IDoctorQueueDetail } from "@/common/models/queue.model";
import useUpdateQueue from "@/app/(dashboard)/antrian/admin/hooks/useUpdateQueue";
import { format } from "date-fns";
import EmptyListGif from "@/common/components/gif/empty-list-gif";
import { id as localeId } from "date-fns/locale/id";
import DoneConfirmationModal from "../modals/done-confirmation-modal";

export default function PatientDetail({
  data,
}: {
  data: IDoctorQueueDetail | undefined;
}) {
  const { diagnoses, addDiagnosis, removeDiagnosis } = useManageDiagnoses();
  const { drugOrders, addDrug, removeDrug } = useManageDrugOrders();

  const { mutateAsync, isPending } = useUpdateQueue(data?.id ?? 0);

  if (!data)
    return (
      <section className="basis-[60%] space-y-5 divide-y rounded-xl bg-white p-5">
        <div className="flex items-center justify-between gap-2">
          <h2 className="text-4xl font-black text-neutral-400">#U0000</h2>
          <Button disabled className="bg-emerald-500">
            <CheckIcon />
            <span>Selesaikan Sesi</span>
          </Button>
        </div>
        <div className="flex h-96 flex-col items-center justify-center">
          <EmptyListGif className="h-72" />
          <p className="text-neutral-400">Tidak ada sesi aktif saat ini</p>
        </div>
      </section>
    );

  const { patient, queue_number, complaints } = data;

  const handleFinish = () => {
    if (drugOrders.length === 0) {
      mutateAsync({ status: "WAITING_PAYMENT" });
    } else {
      mutateAsync({ status: "WAITING_MEDICATION" });
    }
  };

  return (
    <section className="basis-[60%] space-y-5 divide-y rounded-xl bg-white p-5">
      <div className="flex items-center justify-between gap-2">
        <h2 className="text-primary-gradient text-4xl font-black">
          #{queue_number}
        </h2>
        {/* <Button
          onClick={() => mutateAsync({ status: "WAITING_PAYMENT" })}
          isLoading={isPending}
          disabled={diagnoses.length === 0}
          className="bg-emerald-500 hover:bg-emerald-600"
        >
          <CheckIcon />
          <span>Selesaikan Sesi</span>
        </Button> */}
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
        <h3 className="mb-3 text-xl font-bold">Diagnosis</h3>
        <div className="space-y-2">
          {diagnoses.length === 0 && (
            <div className="flex flex-col items-center justify-center py-5">
              <EmptyBookingGif />
              <p className="text-center text-neutral-400">
                Belum ada diagnosis yang ditambahkan
              </p>
            </div>
          )}
          {diagnoses.map(({ id, name }) => (
            <div
              key={id}
              className="flex items-center justify-between gap-3 rounded-lg border border-yellow-400 bg-yellow-100 p-5"
            >
              <p className="font-semibold">{name}</p>
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
              <EmptyBookingGif />
              <p className="text-center text-neutral-400">
                Belum ada resep obat yang ditambahkan
              </p>
            </div>
          )}
          {drugOrders.map(({ id }) => (
            <div
              key={id}
              className="flex items-center justify-between gap-3 rounded-lg border border-secondary-500 bg-secondary-100 p-5"
            >
              <div>
                <p className="font-semibold">Duoxal</p>
                <p>6 tetes, 2x sehari</p>
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
