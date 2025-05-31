import { Button } from "@/common/components/button/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/common/components/dialog/dialog";
import { PlusIcon } from "lucide-react";

import { useState } from "react";
import AddQueueForm from "../forms/add-queue-form";
export default function AddQueueModal() {
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
        <DialogTitle className="text-xl font-bold">Tambah Antrian</DialogTitle>
        <AddQueueForm onOpenChange={setOpen} />
      </DialogContent>
    </Dialog>
  );
}
