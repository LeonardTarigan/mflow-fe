import { ActivityIcon } from "lucide-react";
import { useState } from "react";
import { Button } from "../shared/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "../shared/dialog";
import FormVitalSign from "./form-vital-sign";

export default function ModalVitalSign() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size={"sm"} className="w-full">
          <ActivityIcon size={15} />
          <span>Vital Sign</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-auto">
        <DialogTitle className="font-bold text-xl">
          Tambah Data Vital Sign
        </DialogTitle>
        <FormVitalSign onOpenChange={setOpen} />
      </DialogContent>
    </Dialog>
  );
}
