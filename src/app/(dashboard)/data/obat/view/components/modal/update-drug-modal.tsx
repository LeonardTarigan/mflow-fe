import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/common/components/dialog/dialog";
import { useState } from "react";

import { Button } from "@/common/components/button/button";
import { PencilSimpleLineIcon } from "@phosphor-icons/react";
import { TDrugFormSchema } from "../../../hooks/useDrugForm";
import useUpdateDrug from "../../../hooks/useUpdateDrug";
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
          <PencilSimpleLineIcon size={22} weight="fill" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-auto sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
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
