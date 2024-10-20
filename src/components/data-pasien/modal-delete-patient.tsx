"use client";

import { useState } from "react";
import { Trash2Icon } from "lucide-react";
import { Button } from "../shared/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "../shared/dialog";
import toast from "react-hot-toast";

interface IModalDeletePatient {
  id: string;
  name: string;
}

export default function ModalDeletePatient({ name }: IModalDeletePatient) {
  const [open, setOpen] = useState(false);

  const handleDelete = () => {
    toast.success("Data obat berhasil dihapus!");
    setOpen(false);
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
        <DialogHeader className="font-bold text-2xl text-error-500">
          Konfirmasi Hapus Data
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
          <Button variant={"outline"} onClick={() => setOpen(false)}>
            Batal
          </Button>
          <Button variant={"destructive"} onClick={handleDelete}>
            Hapus
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
