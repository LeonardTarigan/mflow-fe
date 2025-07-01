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
import useCreateTreatment from "../../../hooks/useCreateTreatment";
import TreatmentForm from "../form/treatment-form";

export default function AddTreatmentModal() {
  const [open, setOpen] = useState(false);

  const { onSubmit, isPending } = useCreateTreatment(setOpen);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size={"sm"}>
          <PlusIcon size={20} />
          <span>Tambah Penanganan</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-auto sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            Tambah Data Penanganan
          </DialogTitle>
          <DialogDescription />
        </DialogHeader>
        <TreatmentForm onSubmit={onSubmit} isLoading={isPending} />
      </DialogContent>
    </Dialog>
  );
}
