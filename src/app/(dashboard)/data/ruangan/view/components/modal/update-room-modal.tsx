import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/common/components/dialog/dialog";
import { Edit3Icon } from "lucide-react";
import { useState } from "react";

import { Button } from "@/common/components/button/button";
import { TRoomFormSchema } from "../../../hooks/useRoomForm";
import useUpdateRoom from "../../../hooks/useUpdateDrug";
import RoomForm from "../form/room-form";

export default function UpdateRoomModal({
  id,
  defaultValues,
}: {
  id: number;
  defaultValues: TRoomFormSchema;
}) {
  const [open, setOpen] = useState(false);

  const { onSubmit, isPending } = useUpdateRoom(id, setOpen);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size={"icon"} variant={"secondary"}>
          <Edit3Icon size={20} />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-auto sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            Edit Data Ruangan
          </DialogTitle>
          <DialogDescription />
        </DialogHeader>
        <RoomForm
          onSubmit={onSubmit}
          isLoading={isPending}
          defaultValues={defaultValues}
        />
      </DialogContent>
    </Dialog>
  );
}
