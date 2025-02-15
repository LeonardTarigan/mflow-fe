import { Edit3Icon } from "lucide-react";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/common/components/dialog/dialog";

import { DialogDescription } from "@radix-ui/react-dialog";
import useUpdateEmployee from "../../../hooks/useUpdateEmployee";
import { TEmployeeFormSchema } from "../../../hooks/useEmployeeForm";
import { Button } from "@/common/components/button/button";
import EmployeeForm from "../form/employee-form";

export default function UpdateEmployeeModal({
  id,
  defaultValues,
}: {
  id: string;
  defaultValues: TEmployeeFormSchema;
}) {
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
        <EmployeeForm
          onSubmit={onSubmit}
          isLoading={isPending}
          defaultValues={defaultValues}
        />
      </DialogContent>
    </Dialog>
  );
}
