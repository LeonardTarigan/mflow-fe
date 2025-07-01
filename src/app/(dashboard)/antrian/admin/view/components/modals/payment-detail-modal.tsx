import { Button } from "@/common/components/button/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/common/components/dialog/dialog";
import formatToRupiah from "@/common/helpers/formatToRupiah";
import { ISessionDrugOrderDetail } from "@/common/models/drug.model";
import { ICareSessionTreatment } from "@/common/models/treatment.model";
import { BadgeDollarSignIcon } from "lucide-react";
import { useState } from "react";

export default function PaymentDetailModal({
  onFinish,
  patientName,
  doctorName,
  drugOrders,
  treatments,
  isPending = false,
}: {
  onFinish: () => void;
  patientName: string;
  doctorName: string;
  drugOrders: ISessionDrugOrderDetail[];
  treatments: ICareSessionTreatment[];
  isPending?: boolean;
}) {
  const [open, setOpen] = useState(false);

  const totalDrugOrderPrice = drugOrders.reduce(
    (total, order) => total + order.quantity * order.price,
    0,
  );
  const totalTreatmentPrice = treatments.reduce(
    (total, treatment) => total + treatment.quantity * treatment.applied_price,
    0,
  );

  const totalPrice = totalDrugOrderPrice + totalTreatmentPrice;

  const handleFinish = () => {
    onFinish();
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-emerald-500 hover:bg-emerald-600">
          <BadgeDollarSignIcon />
          <span>Pembayaran</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-auto">
        <DialogTitle className="text-xl font-bold">
          Konfirmasi Pembayaran
        </DialogTitle>
        <div className="space-y-3">
          <div className="space-y-3 border-b border-dashed border-neutral-500 pb-5">
            <h3 className="text-primary-gradient text-2xl font-black">#U002</h3>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <h5 className="text-neutral-400">Pasien:</h5>
                <p className="font-semibold">{patientName}</p>
              </div>
              <div>
                <h5 className="text-neutral-400">Dokter Jaga:</h5>
                <p className="font-semibold">{doctorName}</p>
              </div>
            </div>
          </div>

          {treatments.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-lg font-bold">Penanganan</h3>
              {treatments.map(({ id, name, applied_price, quantity }) => (
                <div
                  key={id}
                  className="flex items-center justify-between gap-1"
                >
                  <p>
                    {name} ({quantity}x)
                  </p>
                  <div className="grow translate-y-[5px] border-b-2 border-dotted border-neutral-500"></div>
                  <p>{formatToRupiah(applied_price * quantity)}</p>
                </div>
              ))}
            </div>
          )}
          {drugOrders.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-lg font-bold">Pesanan Obat</h3>
              {drugOrders.map(({ id, name, price, quantity }) => (
                <div
                  key={id}
                  className="flex items-center justify-between gap-1"
                >
                  <p>
                    {name} ({quantity}x)
                  </p>
                  <div className="grow translate-y-[5px] border-b-2 border-dotted border-neutral-500"></div>
                  <p>{formatToRupiah(price * quantity)}</p>
                </div>
              ))}
            </div>
          )}
          <div className="flex items-center justify-between pt-5 text-lg">
            <h3>Total</h3>
            <p className="font-bold">{formatToRupiah(totalPrice)}</p>
          </div>
          <div className="flex justify-end pt-5">
            <Button
              onClick={handleFinish}
              isLoading={isPending}
              className="bg-emerald-500 hover:bg-emerald-600"
            >
              <span>Selesai</span>
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
