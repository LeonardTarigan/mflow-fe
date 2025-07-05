import { ScrollTextIcon } from "lucide-react";

import { Button } from "@/common/components/button/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/common/components/dialog/dialog";
import formatToRupiah from "@/common/helpers/formatToRupiah";
import { ISessionDrugOrderDetail } from "@/common/models/drug.model";
import { ICareSessionTreatment } from "@/common/models/treatment.model";
import { useState } from "react";

export default function PaymentDetailModal({
  date,
  queueNumber,
  totalPrice,
  treatments,
  drugOrders,
}: {
  date: string;
  queueNumber: string;
  totalPrice: number;
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
          className="bg-emerald-500 hover:bg-emerald-600"
        >
          <ScrollTextIcon className="text-white" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] min-w-[600px] overflow-auto sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            Detail Pembayaran
          </DialogTitle>
          <DialogDescription />
        </DialogHeader>
        <div className="space-y-5">
          <div className="flex items-center justify-between pb-3">
            <p className="text-primary-gradient text-2xl font-black">
              #{queueNumber}
            </p>
            <p>{date} </p>
          </div>
          <div className="space-y-3">
            <h3 className="text-lg font-bold">Biaya Penanganan</h3>
            {treatments?.map(({ id, name, applied_price, quantity }) => (
              <div key={id} className="flex items-center justify-between gap-1">
                <p>
                  {name} (x{quantity})
                </p>
                <div className="grow translate-y-1 border border-dashed border-neutral-500"></div>
                <p>{formatToRupiah(applied_price * quantity)}</p>
              </div>
            ))}
          </div>
          {drugOrders.length > 0 && (
            <div className="space-y-2">
              <h3 className="text-lg font-bold">Resep Obat</h3>
              {drugOrders.map(({ id, name, quantity, price }) => (
                <div
                  key={id}
                  className="flex items-center justify-between gap-1"
                >
                  <p>
                    {name} (x{quantity})
                  </p>
                  <div className="grow translate-y-1 border border-dashed border-neutral-500"></div>
                  <p>{formatToRupiah(price * quantity)}</p>
                </div>
              ))}
            </div>
          )}
          <div className="flex items-center justify-between gap-3 pt-5 font-semibold">
            <p>Subtotal</p>
            <p className="text-xl">{formatToRupiah(totalPrice)}</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
