import { PlusIcon } from "lucide-react";

import { Button } from "@/common/components/button/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/common/components/dialog/dialog";
import { useState } from "react";
import useCreateRoom from "../../../hooks/useCreateRoom";
import RoomForm from "../form/room-form";

export default function AddRoomModal() {
  const [open, setOpen] = useState(false);

  const { onSubmit, isPending } = useCreateRoom(setOpen);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size={"sm"}>
          <PlusIcon size={20} />
          <span>Tambah Ruangan</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-auto sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            Tambah Data Ruangan
          </DialogTitle>
          <DialogDescription />
        </DialogHeader>
        <RoomForm onSubmit={onSubmit} isLoading={isPending} />
      </DialogContent>
    </Dialog>
  );
}
