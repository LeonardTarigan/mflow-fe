"use client";

import { Button } from "@/common/components/button/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/common/components/dialog/dialog";
import { DialogDescription } from "@radix-ui/react-dialog";
import { Trash2Icon } from "lucide-react";
import { useState } from "react";
import useDeleteEmployee from "../../../hooks/useDeleteEmployee";

export default function DeleteEmployeeModal({
  id,
  name,
  disabled = false,
}: {
  id: string;
  name: string;
  disabled?: boolean;
}) {
  const [open, setOpen] = useState(false);

  const { mutateAsync, isPending } = useDeleteEmployee(setOpen);

  const handleDelete = () => {
    mutateAsync(id);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          disabled={disabled}
          size={"icon"}
          variant={"destructive"}
          onClick={() => setOpen(true)}
        >
          <Trash2Icon size={20} />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-error-500">
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
