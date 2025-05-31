import { Button } from "@/common/components/button/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/common/components/dialog/dialog";
import { ActivityIcon } from "lucide-react";
import { useState } from "react";
import VitalSignForm from "../forms/vital-sign-form";

export default function VitalSignModal() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size={"sm"}>
          <ActivityIcon size={15} />
          <span>Vital Sign</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-auto">
        <DialogTitle className="text-xl font-bold">
          Tambah Data Vital Sign
        </DialogTitle>
        <VitalSignForm onOpenChange={setOpen} />
      </DialogContent>
    </Dialog>
  );
}
