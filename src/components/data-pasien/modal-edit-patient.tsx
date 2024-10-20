import { Edit3Icon } from "lucide-react";
import { useState } from "react";
import { Button } from "../shared/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "../shared/dialog";
import type { TPatientFormSchema } from "@/hooks/data-pasien/usePatientForm";
import FormPatient from "./form-patient";

export default function ModalEditPatient({
  defaultValues,
}: { defaultValues: TPatientFormSchema }) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size={"icon"} variant={"secondary"}>
          <Edit3Icon size={20} />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-auto sm:max-w-[425px]">
        <DialogTitle className="font-bold text-xl">
          Edit Data Pasien
        </DialogTitle>
        <FormPatient onOpenChange={setOpen} defaultValues={defaultValues} />
      </DialogContent>
    </Dialog>
  );
}
