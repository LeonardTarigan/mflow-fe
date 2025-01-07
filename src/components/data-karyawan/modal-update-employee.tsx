import { Edit3Icon } from "lucide-react";
import { useState } from "react";
import { Button } from "../shared/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../shared/dialog";
import type { TEmployeeFormSchema } from "@/hooks/data-karyawan/useEmployeeForm";
import FormEmployee from "./form-employee";
import useUpdateEmployee from "@/hooks/data-karyawan/useUpdateEmployee";
import { DialogDescription } from "@radix-ui/react-dialog";

export default function ModalUpdateEmployee({
  id,
  defaultValues,
}: { id: string; defaultValues: TEmployeeFormSchema }) {
  const [open, setOpen] = useState(false);

  const { onSubmit, isPending } = useUpdateEmployee(id, setOpen);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size={"icon"} variant={"secondary"}>
          <Edit3Icon size={20} />
        </Button>
      </DialogTrigger>
      <DialogContent
        aria-describedby={"Form to update employee data"}
        className="max-h-[90vh] overflow-auto sm:max-w-[425px]"
      >
        <DialogHeader>
          <DialogTitle className="font-bold text-xl">
            Edit Data Karyawan
          </DialogTitle>
          <DialogDescription />
        </DialogHeader>
        <FormEmployee
          onSubmit={onSubmit}
          isLoading={isPending}
          defaultValues={defaultValues}
        />
      </DialogContent>
    </Dialog>
  );
}
