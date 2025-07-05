import { Button } from "@/common/components/button/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/common/components/dialog/dialog";
import { CheckIcon } from "lucide-react";

import { useState } from "react";

export default function DoneConfirmationModal({
  isPending,
  onConfirm,
  disabled = false,
}: {
  isPending: boolean;
  onConfirm: () => void;
  disabled?: boolean;
}) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          isLoading={isPending}
          disabled={disabled}
          className="bg-emerald-500 hover:bg-emerald-600"
        >
          <CheckIcon />
          <span>Selesaikan Pesanan</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-auto">
        <DialogTitle className="text-xl font-bold">
          Konfirmasi Menyelesaikan Pesanan
        </DialogTitle>
        <p>
          Apakah kamu yakin ingin menyelesaikan pesanan ini? Status pesanan
          tidak dapat diubah setelah pesanan ini selesai.
        </p>
        <div className="flex justify-end gap-2 pt-5">
          <Button onClick={() => setOpen(false)} variant={"outline"}>
            Cek Ulang
          </Button>
          <Button
            onClick={() => {
              onConfirm();
              setOpen(false);
            }}
            className="bg-emerald-500 hover:bg-emerald-600"
          >
            Lanjut
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
