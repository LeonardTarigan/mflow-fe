import useUpdateQueue from "@/app/(dashboard)/antrian/admin/hooks/useUpdateQueue";
import { Button } from "@/common/components/button/button";
import EmptyListGif from "@/common/components/gif/empty-list-gif";
import formatToRupiah from "@/common/helpers/formatToRupiah";
import { IPharmacyQueueDetail } from "@/common/models/queue.model";
import { format } from "date-fns";
import { id as localeId } from "date-fns/locale/id";
import { CheckIcon } from "lucide-react";
import DoneConfirmationModal from "../modals/done-confirmation-modal";

export default function OrderDetail({
  data,
}: {
  data: IPharmacyQueueDetail | undefined;
}) {
  const { mutateAsync, isPending } = useUpdateQueue(data?.id ?? 0);

  if (!data)
    return (
      <section className="basis-[60%] space-y-5 divide-y rounded-xl bg-white p-5">
        <div className="flex items-center justify-between gap-2">
          <h2 className="text-4xl font-black text-neutral-300">#U0000</h2>
          <Button disabled className="bg-emerald-500">
            <CheckIcon />
            <span>Selesaikan Pesanan</span>
          </Button>
        </div>
        <div className="flex h-96 flex-col items-center justify-center">
          <EmptyListGif className="h-72 opacity-50 grayscale" />
          <p className="text-neutral-400">Tidak ada pesanan aktif saat ini</p>
        </div>
      </section>
    );

  const { patient, queue_number, complaints, diagnoses, drug_orders, doctor } =
    data;

  return (
    <section className="basis-[60%] space-y-5 divide-y rounded-xl bg-white p-5">
      <div className="flex items-center justify-between gap-2">
        <h2 className="text-primary-gradient text-4xl font-black">
          #{queue_number} {!queue_number && "U0000"}
        </h2>
        <DoneConfirmationModal
          isPending={isPending}
          onConfirm={() => mutateAsync({ status: "WAITING_PAYMENT" })}
        />
      </div>
      <div className="pt-5">
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
            <h5 className="text-neutral-400">Tanggal lahir:</h5>
            <p className="font-semibold">
              {format(new Date(patient.birth_date), "dd MMMM yyyy", {
                locale: localeId,
              })}
            </p>
          </div>
          <div>
            <h5 className="text-neutral-400">Dokter Jaga:</h5>
            <p className="font-semibold">{doctor.username}</p>
          </div>
        </div>
      </div>
      <div className="space-y-3 pt-5">
        <h3 className="mb-3 text-xl font-bold">Keluhan</h3>
        <p>{complaints}</p>
      </div>
      <div className="space-y-3 pt-5">
        <h3 className="mb-3 text-xl font-bold">Diagnosis</h3>
        <p>{diagnoses.map(({ name }) => name).join(", ")}</p>
      </div>
      <div className="space-y-3 pt-5">
        <h3 className="mb-3 text-xl font-bold">Resep Obat</h3>
        {drug_orders.map(({ id, name, quantity, price, dose }) => (
          <div key={id} className="flex items-end justify-between gap-2">
            <div className="flex gap-5">
              <p>{quantity}</p>
              <div>
                <p className="font-semibold">{name}</p>
                <p className="max-w-2/3">{dose}</p>
              </div>
            </div>
            <div className="min-w-20 grow -translate-y-2 border-b-2 border-dotted border-neutral-500"></div>
            <div className="shrink-0">
              <p>{formatToRupiah(price * quantity)}</p>
            </div>
          </div>
        ))}
        <div className="flex items-center justify-between gap-3 pt-5 font-semibold">
          <p>Subtotal</p>
          <p className="text-xl">
            {formatToRupiah(
              drug_orders.reduce(
                (total, order) => total + order.quantity * order.price,
                0,
              ),
            )}
          </p>
        </div>
      </div>
    </section>
  );
}
