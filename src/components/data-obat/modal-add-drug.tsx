import { PlusIcon } from "lucide-react";
import { Button } from "../shared/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../shared/dialog";
import FormDrug from "./form-drug";
import { useState } from "react";
import useCreateDrug from "@/hooks/data-obat/useCreateDrug";

export default function ModalAddDrug() {
  const [open, setOpen] = useState(false);

  const { onSubmit, isPending } = useCreateDrug(setOpen);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size={"sm"}>
          <PlusIcon size={20} />
          <span>Tambah Obat</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-auto sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="font-bold text-xl">
            Tambah Data Obat
          </DialogTitle>
          <DialogDescription />
        </DialogHeader>
        <FormDrug onSubmit={onSubmit} isLoading={isPending} />
      </DialogContent>
    </Dialog>
  );
}
