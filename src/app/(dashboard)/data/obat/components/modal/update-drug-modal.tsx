import { Edit3Icon } from "lucide-react";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/common/components/dialog/dialog";
import useUpdateDrug from "../../hooks/useUpdateDrug";
import { TDrugFormSchema } from "../../hooks/useDrugForm";
import { Button } from "@/common/components/button/button";
import DrugForm from "../form/drug-form";

export default function UpdateDrugModal({
  id,
  defaultValues,
}: {
  id: number;
  defaultValues: TDrugFormSchema;
}) {
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
        <DrugForm
          onSubmit={onSubmit}
          isLoading={isPending}
          defaultValues={defaultValues}
        />
      </DialogContent>
    </Dialog>
  );
}
