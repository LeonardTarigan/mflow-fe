import { Button } from "@/common/components/button/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/common/components/dialog/dialog";
import { PlusIcon } from "lucide-react";

import SearchGif from "@/common/components/gif/search-gif";
import LoadingSpinner from "@/common/components/loader/loading-spinner";
import SearchBar from "@/common/components/search/search-bar";
import EmptyDataState from "@/common/components/table/empty-data-state";
import highlightMatch from "@/common/helpers/highlightMatch";
import { useState } from "react";
import { IDiagnosis } from "../../../hooks/useManageDiagnoses";
import useQueryDiagnosis from "../../../hooks/useQueryDiagnosis";

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
          <SearchBar
            onChange={handleOnSearchChange}
            onResetSearch={() => {}}
            placeholder="Cari diagnosis"
            containerClassName="h-12"
          />
          <div className="space-y-5">
            <p className="pb-2">
              <span className="font-semibold">
                {diagnosesData?.length || 0}
              </span>{" "}
              Hasil Pencarian
            </p>
            <div className="space-y-3 divide-y">
              {diagnosesData?.map(({ id, name, type }) => (
                <div
                  key={id}
                  className="flex items-center justify-between gap-3 pt-3"
                >
                  <div>
                    <p className="text-sm">{highlightMatch(id, searchInput)}</p>
                    <p className="font-semibold">
                      {highlightMatch(name, searchInput)}
                    </p>
                  </div>
                  <Button
                    onClick={() => handleAdd({ id, name, type })}
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
            {searchInput === "" &&
              !res.isLoading &&
              diagnosesData?.length !== 0 && (
                <div className="flex h-[80%] w-full flex-col items-center justify-center pb-5">
                  <SearchGif className="opacity-70" />
                  <p className="text-neutral-400">
                    Cari kode atau nama untuk menambahkan diagnosis
                  </p>
                </div>
              )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
