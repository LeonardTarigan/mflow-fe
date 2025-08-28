import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/common/components/dialog/dialog";
import { useState } from "react";

import { Button } from "@/common/components/button/button";
import { PencilSimpleLineIcon } from "@phosphor-icons/react";
import { DialogDescription } from "@radix-ui/react-dialog";
import { TEmployeeFormSchema } from "../../../hooks/useEmployeeForm";
import useUpdateEmployee from "../../../hooks/useUpdateEmployee";
import EmployeeForm from "../form/employee-form";

export default function UpdateEmployeeModal({
  id,
  defaultValues,
  disabled = false,
}: {
  id: string;
  defaultValues: TEmployeeFormSchema;
  disabled?: boolean;
}) {
  const [open, setOpen] = useState(false);

  const { onSubmit, isPending } = useUpdateEmployee(id, setOpen);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button disabled={disabled} size={"icon"} variant={"secondary"}>
          <PencilSimpleLineIcon size={22} weight="fill" />
        </Button>
      </DialogTrigger>
      <DialogContent
        aria-describedby={"Form to update employee data"}
        className="max-h-[90vh] overflow-auto sm:max-w-[425px]"
      >
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
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
