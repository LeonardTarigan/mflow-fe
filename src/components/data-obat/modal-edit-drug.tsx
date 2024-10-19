import type { TDrugFormSchema } from "@/hooks/data-obat/useDrugForm";
import { Edit3Icon } from "lucide-react";
import { useState } from "react";
import { Button } from "../shared/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "../shared/dialog";
import FormDrug from "./form-drug";

export default function ModalEditDrug({
  defaultValues,
}: { defaultValues: TDrugFormSchema }) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size={"icon"} variant={"secondary"}>
          <Edit3Icon size={20} />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-auto sm:max-w-[425px]">
        <DialogTitle className="font-bold text-xl">Edit Data Obat</DialogTitle>
        <FormDrug defaultValues={defaultValues} onOpenChange={setOpen} />
      </DialogContent>
    </Dialog>
  );
}
