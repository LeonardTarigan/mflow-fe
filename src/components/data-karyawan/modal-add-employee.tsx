import { PlusIcon } from "lucide-react";
import { Button } from "../shared/button";
import { Dialog, DialogContent, DialogTrigger } from "../shared/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";
import { useState } from "react";
import FormEmployee from "./form-employee";

export default function ModalAddEmployee() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size={"sm"}>
          <PlusIcon size={20} />
          <span>Tambah Karyawan</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-auto sm:max-w-[425px]">
        <DialogTitle className="font-bold text-xl">
          Tambah Data Karyawan
        </DialogTitle>
        <FormEmployee onOpenChange={setOpen} />
      </DialogContent>
    </Dialog>
  );
}
