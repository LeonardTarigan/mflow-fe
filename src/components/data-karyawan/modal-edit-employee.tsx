import { Edit3Icon } from "lucide-react";
import { useState } from "react";
import { Button } from "../shared/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "../shared/dialog";
import type { TEmployeeFormSchema } from "@/hooks/data-karyawan/useEmployeeForm";
import FormEmployee from "./form-employee";

export default function ModalEditEmployee({
  defaultValues,
}: { defaultValues: TEmployeeFormSchema }) {
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
          Edit Data Karyawan
        </DialogTitle>
        <FormEmployee onOpenChange={setOpen} defaultValues={defaultValues} />
      </DialogContent>
    </Dialog>
  );
}
