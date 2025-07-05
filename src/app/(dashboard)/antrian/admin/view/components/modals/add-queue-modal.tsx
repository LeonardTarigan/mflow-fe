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
import useCreateQueue from "../../../hooks/useCreateQueue";
import useQueryRooms from "../../../hooks/useQueryRoom";
import useQueryDoctors from "../../../hooks/useQueryDoctor";

export default function AddQueueModal() {
  const [open, setOpen] = useState(false);
  const { isPending, onSubmit } = useCreateQueue(setOpen);
  const { res: doctorData } = useQueryDoctors();
  const { res: roomData } = useQueryRooms();

  const doctorList = doctorData.data?.data;
  const roomList = roomData.data?.data;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size={"sm"} className="w-full">
          <PlusIcon size={20} />
          <span>Tambah Antrian</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] w-full overflow-auto xl:max-w-[700px]">
        <DialogTitle className="text-xl font-bold">Tambah Antrian</DialogTitle>
        <AddQueueForm
          onSubmit={onSubmit}
          isLoading={isPending}
          doctorList={doctorList}
          roomList={roomList}
        />
      </DialogContent>
    </Dialog>
  );
}
