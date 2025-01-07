import type { TDrugFormSchema } from "@/hooks/data-obat/useDrugForm";
import { Edit3Icon } from "lucide-react";
import { useState } from "react";
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
import useUpdateDrug from "@/hooks/data-obat/useUpdateDrug";

export default function ModalUpdateDrug({
  id,
  defaultValues,
}: { id: number; defaultValues: TDrugFormSchema }) {
  const [open, setOpen] = useState(false);

  const { onSubmit, isPending } = useUpdateDrug(id, setOpen);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size={"icon"} variant={"secondary"}>
          <Edit3Icon size={20} />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-auto sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="font-bold text-xl">
            Edit Data Obat
          </DialogTitle>
          <DialogDescription />
        </DialogHeader>
        <FormDrug
          onSubmit={onSubmit}
          isLoading={isPending}
          defaultValues={defaultValues}
        />
      </DialogContent>
    </Dialog>
  );
}
