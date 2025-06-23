import { Button } from "@/common/components/button/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/common/components/dialog/dialog";
import { Input } from "@/common/components/input/input";
import { PlusIcon } from "lucide-react";

import EmptyDataState from "@/common/components/table/empty-data-state";
import { useState } from "react";
import { IDiagnosis } from "../../../hooks/useManageDiagnoses";
import useQueryDiagnosis from "../../../hooks/useQueryDiagnosis";
import LoadingSpinner from "@/common/components/loader/loading-spinner";

export default function AddDiagnosisModal({
  onAdd,
}: {
  onAdd: (_diagnosis: IDiagnosis) => void;
}) {
  const [open, setOpen] = useState(false);

  const handleAdd = (diagnosis: IDiagnosis) => {
    onAdd(diagnosis);
    setOpen(false);
  };

  const { res, searchInput, handleOnSearchChange } = useQueryDiagnosis();

  const diagnosesData = res.data?.data;

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
          <Input
            onChange={handleOnSearchChange}
            value={searchInput}
            placeholder="Cari diagnosis"
          />
          <div className="space-y-5">
            <p className="pb-5">
              <span className="font-semibold">
                {diagnosesData?.length || 0}
              </span>{" "}
              Hasil Pencarian
            </p>
            <div className="space-y-3 divide-y">
              {diagnosesData?.map(({ id, name }) => (
                <div
                  key={id}
                  className="flex items-center justify-between gap-3 pt-3"
                >
                  <div>
                    <p className="text-sm">{id}</p>
                    <p className="font-semibold">{name}</p>
                  </div>
                  <Button
                    onClick={() => handleAdd({ id, name })}
                    size={"icon"}
                    variant={"outline"}
                  >
                    <PlusIcon />
                  </Button>
                </div>
              ))}
            </div>
            {res.isLoading && (
              <div className="flex h-32 w-full items-center justify-center">
                <LoadingSpinner className="border-primary-500" />
              </div>
            )}
            {diagnosesData?.length === 0 && !res.isLoading && (
              <div className="flex w-full items-center justify-center">
                <EmptyDataState />
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
