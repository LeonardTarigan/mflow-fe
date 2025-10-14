import { Button } from "@/common/components/button/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/common/components/dialog/dialog";

import { PlusIcon } from "@phosphor-icons/react";
import { useState } from "react";
import AddQueueModalContent from "../contents/add-queue-modal-content";

export default function AddQueueModal() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog modal={false} open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size={"sm"} className="w-full">
          <PlusIcon size={22} weight="bold" />
          <span>Tambah Antrian</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] w-full overflow-auto xl:max-w-[700px]">
        <DialogTitle className="text-xl font-bold">Tambah Antrian</DialogTitle>
        <AddQueueModalContent setOpen={setOpen} />
      </DialogContent>
    </Dialog>
  );
}
