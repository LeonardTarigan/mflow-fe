import { Button } from "@/common/components/button/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
} from "@/common/components/dialog/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";
import { useState } from "react";
import useCreateEmployee from "../../../hooks/useCreateEmployee";
import EmployeeForm from "../form/employee-form";
import { PlusIcon } from "@phosphor-icons/react";

export default function AddEmployeeModal() {
  const [open, setOpen] = useState(false);

  const { onSubmit, isPending } = useCreateEmployee(setOpen);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size={"sm"}>
          <PlusIcon size={22} weight="bold" />
          <span>Tambah Karyawan</span>
        </Button>
      </DialogTrigger>
      <DialogContent
        aria-describedby={"Form to add new employee data"}
        className="max-h-[90vh] overflow-auto sm:max-w-[425px]"
      >
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            Tambah Data Karyawan
          </DialogTitle>
          <DialogDescription />
        </DialogHeader>

        <EmployeeForm onSubmit={onSubmit} isLoading={isPending} />
      </DialogContent>
    </Dialog>
  );
}
