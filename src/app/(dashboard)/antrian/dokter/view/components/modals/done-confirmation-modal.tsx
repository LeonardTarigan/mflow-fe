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
  disabled,
  onConfirm,
}: {
  isPending: boolean;
  disabled: boolean;
  onConfirm: () => void;
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
          <span>Selesaikan Sesi</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-auto">
        <DialogTitle className="text-xl font-bold">
          Konfirmasi Mengakhiri Sesi
        </DialogTitle>
        <p>
          Apakah kamu yakin ingin menyelesaikan sesi ini? Data{" "}
          <span className="font-bold">diagnosis</span> dan{" "}
          <span className="font-bold">resep obat</span> tidak dapat diganti
          setelah sesi ini selesai.
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
