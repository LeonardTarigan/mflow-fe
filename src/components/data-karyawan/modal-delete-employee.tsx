"use client";

import useDeleteEmployee from "@/hooks/data-karyawan/useDeleteEmployee";
import { DialogDescription } from "@radix-ui/react-dialog";
import { Trash2Icon } from "lucide-react";
import { useState } from "react";
import { Button } from "../shared/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../shared/dialog";

interface IModalDeleteEmployee {
  id: string;
  name: string;
}

export default function ModalDeleteEmployee({
  id,
  name,
}: IModalDeleteEmployee) {
  const [open, setOpen] = useState(false);

  const { mutateAsync, isPending } = useDeleteEmployee(setOpen);

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
            Apakah Anda yakin ingin menghapus data{" "}
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
