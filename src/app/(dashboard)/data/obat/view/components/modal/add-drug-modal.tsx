import { PlusIcon } from "lucide-react";

import { Button } from "@/common/components/button/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/common/components/dialog/dialog";
import { useState } from "react";
import useCreateDrug from "../../../hooks/useCreateDrug";
import DrugForm from "../form/drug-form";

export default function AddDrugModal() {
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
        <DrugForm onSubmit={onSubmit} isLoading={isPending} />
      </DialogContent>
    </Dialog>
  );
}
