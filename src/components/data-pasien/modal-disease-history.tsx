"use client";
import { FileTextIcon } from "lucide-react";
import { Button } from "../shared/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "../shared/dialog";
import EmptyDataState from "../shared/empty-data-state";

export default function ModalDiseaseHistory({ id }: { id: string }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size={"icon"} className="bg-amber-500 hover:bg-amber-600">
          <FileTextIcon size={20} />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader className="font-bold text-2xl">
          Riwayat Pasien
        </DialogHeader>
        <EmptyDataState />
      </DialogContent>
    </Dialog>
  );
}
