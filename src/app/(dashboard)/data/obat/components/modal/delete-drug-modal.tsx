"use client";

import { Button } from "@/common/components/button/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/common/components/dialog/dialog";
import { Trash2Icon } from "lucide-react";
import { useState } from "react";
import useDeleteDrug from "../../hooks/useDeleteDrug";

interface IDeleteDrugModal {
  id: number;
  name: string;
}

export default function DeleteDrugModal({ id, name }: IDeleteDrugModal) {
  const [open, setOpen] = useState(false);

  const { mutateAsync, isPending } = useDeleteDrug(setOpen);

  const handleDelete = () => {
    mutateAsync(id);
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          size={"icon"}
          variant={"destructive"}
          onClick={() => setOpen(true)}
        >
          <Trash2Icon size={20} />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="font-bold text-2xl text-error-500">
            Konfirmasi Hapus Data
          </DialogTitle>
          <DialogDescription />
        </DialogHeader>
        <div>
          <p>
            Apakah Anda yakin ingin menghapus data obat{" "}
            <span className="font-semibold">{name}</span>? Data yang sudah
            dihapus{" "}
            <span className="font-medium text-error-500">
              tidak dapat dipulihkan kembali
            </span>
            .
          </p>
        </div>
        <DialogFooter>
          <Button
            disabled={isPending}
            variant={"outline"}
            onClick={() => setOpen(false)}
          >
            Batal
          </Button>
          <Button
            isLoading={isPending}
            variant={"destructive"}
            onClick={handleDelete}
          >
            Hapus
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
