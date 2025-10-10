import useUpdateQueue from "@/app/(dashboard)/antrian/admin/hooks/useUpdateQueue";
import { Button } from "@/common/components/button/button";
import EmptyListGif from "@/common/components/gif/empty-list-gif";
import formatToRupiah from "@/common/helpers/formatToRupiah";
import { IPharmacyQueueDetail } from "@/common/models/queue.model";
import { format } from "date-fns";
import { id as localeId } from "date-fns/locale/id";

import {
  BandaidsIcon,
  CheckIcon,
  HeartbeatIcon,
  PrescriptionIcon,
  UserIcon,
} from "@phosphor-icons/react";
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
            <CheckIcon size={22} weight="fill" />
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
        <div className="mb-3 flex items-center gap-2">
          <UserIcon size={22} weight="fill" />
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
        <div className="mb-3 flex items-center gap-2">
          <BandaidsIcon size={22} weight="fill" />
          <h3 className="text-xl font-bold">Keluhan</h3>
        </div>
        <p>{complaints}</p>
      </div>
      <div className="space-y-3 pt-5">
        <div className="mb-3 flex items-center gap-2">
          <HeartbeatIcon size={22} weight="fill" />
          <h3 className="text-xl font-bold">Diagnosis</h3>
        </div>
        <div className="flex flex-col gap-2">
          {diagnoses.map(({ name, id }) => (
            <div
              key={id}
              className="flex justify-between gap-2 rounded-lg border border-amber-400 bg-amber-100 p-3 font-medium text-amber-600"
            >
              <p>{name}</p>
              <p>{id}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="space-y-3 pt-5">
        <div className="mb-3 flex items-center gap-2">
          <PrescriptionIcon size={22} weight="fill" />
          <h3 className="text-xl font-bold">Resep Obat</h3>
        </div>
        <div className="space-y-2">
          {drug_orders.map(({ id, drug, quantity, applied_price, dose }) => (
            <div key={id} className="space-y-1">
              <div className="flex items-end justify-between gap-2">
                <div className="flex gap-5">
                  <p>{quantity}</p>

                  <p className="font-semibold">{drug.name}</p>
                </div>
                <div className="min-w-20 grow -translate-y-2 border-b-2 border-dotted border-neutral-500"></div>
                <div className="shrink-0">
                  <p>{formatToRupiah(applied_price * quantity)}</p>
                </div>
              </div>
              <p className="max-w-2/3 pl-9">{dose}</p>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-between gap-3 pt-5 font-semibold">
          <p>Subtotal</p>
          <p className="text-xl">
            {formatToRupiah(
              drug_orders.reduce(
                (total, order) => total + order.quantity * order.applied_price,
                0,
              ),
            )}
          </p>
        </div>
      </div>
    </section>
  );
}
