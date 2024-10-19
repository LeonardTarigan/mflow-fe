import { PlusIcon } from "lucide-react";
import { Button } from "../shared/button";
import { Dialog, DialogContent, DialogTrigger } from "../shared/dialog";
import FormDrug from "./form-drug";
import { DialogTitle } from "@radix-ui/react-dialog";
import { useState } from "react";

export default function ModalAddDrug() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size={"sm"}>
          <PlusIcon size={20} />
          <span>Tambah Obat</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-auto sm:max-w-[425px]">
        <DialogTitle className="font-bold text-xl">
          Tambah Data Obat
        </DialogTitle>
        <FormDrug onOpenChange={setOpen} />
      </DialogContent>
    </Dialog>
  );
}
