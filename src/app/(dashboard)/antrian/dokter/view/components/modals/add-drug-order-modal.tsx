import { Button } from "@/common/components/button/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/common/components/dialog/dialog";
import { Input } from "@/common/components/input/input";
import { PlusIcon } from "lucide-react";

import { IDrugOrder } from "@/common/models/drug.model";
import { useState } from "react";

export default function AddDrugOrderModal({
  onAdd,
}: {
  onAdd: (_diagnosis: IDrugOrder) => void;
}) {
  const [open, setOpen] = useState(false);

  const handleAdd = () => {
    onAdd({ id: 1, name: "Amoxicilin", dose: "3x sehari", quantity: 2 });
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size={"sm"} variant={"outline"}>
          <PlusIcon size={20} />
          <span>Tambah obat</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-auto">
        <DialogTitle className="text-xl font-bold">
          Tambah Resep Obat
        </DialogTitle>
        <div className="space-y-5">
          <Input placeholder="Cari obat" />
          <Input placeholder="" />
          <Input placeholder="" />

          <div className="space-y-5">
            {[...Array(5)].map((index) => (
              <div key={index} className="flex justify-between gap-3">
                <p>Pilek</p>
                <Button onClick={handleAdd} size={"icon"} variant={"outline"}>
                  <PlusIcon />
                </Button>
              </div>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
