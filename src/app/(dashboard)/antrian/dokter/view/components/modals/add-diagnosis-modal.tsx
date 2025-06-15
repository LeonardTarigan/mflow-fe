import { Button } from "@/common/components/button/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/common/components/dialog/dialog";
import { Input } from "@/common/components/input/input";
import { PlusIcon } from "lucide-react";

import { useState } from "react";
import { IDiagnosis } from "../../../hooks/useManageDiagnoses";

export default function AddDiagnosisModal({
  onAdd,
}: {
  onAdd: (_diagnosis: IDiagnosis) => void;
}) {
  const [open, setOpen] = useState(false);

  const handleAdd = () => {
    onAdd({ id: 1, name: "Demam Berdarah" });
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size={"sm"} variant={"outline"}>
          <PlusIcon size={20} />
          <span>Tambah diagnosis</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-auto">
        <DialogTitle className="text-xl font-bold">
          Tambah Diagnosis
        </DialogTitle>
        <div className="space-y-5">
          <Input placeholder="Cari diagnosis" />
          <div className="space-y-5">
            {[...Array(20)].map((index) => (
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
