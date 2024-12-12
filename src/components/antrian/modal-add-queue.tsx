import { PlusIcon } from "lucide-react";
import { Button } from "../shared/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "../shared/dialog";
import { useState } from "react";
import FormAddQueue from "./form-add-queue";

export default function ModalAddQueue() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size={"sm"} className="w-full">
          <PlusIcon size={20} />
          <span>Tambah Antrian</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] w-full overflow-auto sm:max-w-[70%] xl:max-w-[850px]">
        <DialogTitle className="font-bold text-xl">Tambah Antrian</DialogTitle>
        <FormAddQueue onOpenChange={setOpen} />
      </DialogContent>
    </Dialog>
  );
}
