import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/common/components/dialog/dialog";
import { Edit3Icon } from "lucide-react";
import { useState } from "react";

import { Button } from "@/common/components/button/button";
import { TTreatmentFormSchema } from "../../../hooks/useTreatmentForm";
import useUpdateTreatment from "../../../hooks/useUpdateTreatment";
import TreatmentForm from "../form/treatment-form";

export default function UpdateTreatmentModal({
  id,
  defaultValues,
}: {
  id: number;
  defaultValues: TTreatmentFormSchema;
}) {
  const [open, setOpen] = useState(false);

  const { onSubmit, isPending } = useUpdateTreatment(id, setOpen);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size={"icon"} variant={"secondary"}>
          <Edit3Icon size={20} />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-auto sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            Edit Data Penanganan
          </DialogTitle>
          <DialogDescription />
        </DialogHeader>
        <TreatmentForm
          onSubmit={onSubmit}
          isLoading={isPending}
          defaultValues={defaultValues}
        />
      </DialogContent>
    </Dialog>
  );
}
