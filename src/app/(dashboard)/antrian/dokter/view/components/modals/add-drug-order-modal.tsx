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
import { cn } from "@/common/lib/utils";
import { IDrugOrder } from "@/common/models/drug.model";
import { useState } from "react";
import useDrugOrderForm, {
  TDrugOrderFormSchema,
} from "../../../hooks/useDrugOrderForm";
import useQueryDrugs from "../../../hooks/useQueryDrug";
import DrugOrderForm from "../form/add-drug-order-form";

export default function AddDrugOrderModal({
  onAdd,
}: {
  onAdd: (_drugOrder: IDrugOrder) => void;
}) {
  const [open, setOpen] = useState(false);

  const form = useDrugOrderForm();

  const { res, searchInput, handleOnSearchChange } = useQueryDrugs();

  const drugData = res.data?.data;

  const handleAdd = (drug: IDrugOrder) => {
    form.setValue("id", drug.id);
    form.setValue("name", drug.name);
    form.setValue("unit", drug.unit || "Unit");
  };

  const handleFormSubmit = (values: TDrugOrderFormSchema) => {
    onAdd(values);
    setOpen(false);
    form.reset();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size={"sm"} variant={"outline"}>
          <PlusIcon size={20} />
          <span>Tambah obat</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[75vh] min-w-[750px] overflow-auto">
        <DialogTitle className="text-xl font-bold">
          Tambah Resep Obat
        </DialogTitle>
        <div className="flex gap-5">
          <div className="flex h-full shrink-0 basis-[50%] flex-col gap-5">
            <SearchBar
              onChange={handleOnSearchChange}
              onResetSearch={() => {}}
              placeholder="Cari Obat"
              containerClassName="basis-auto h-14"
            />
            <p>
              <span className="font-semibold">{drugData?.length || 0}</span>{" "}
              Hasil Pencarian
            </p>
            <div className="flex h-full grow flex-col gap-2">
              {drugData?.map(({ id, name, unit }) => (
                <div
                  key={id}
                  className={`${cn("borderp-2 flex items-center justify-between gap-3 rounded-lg border px-3 py-2", form.watch("id") === id ? "border-secondary-500 bg-secondary-100" : "bg-white")}`}
                >
                  <p className="font-medium">
                    {highlightMatch(name, searchInput)}
                  </p>
                  <Button
                    onClick={() =>
                      handleAdd({ id, name, dose: "", quantity: 0, unit: unit })
                    }
                    disabled={form.watch("id") === id}
                    size={"icon"}
                    variant={"outline"}
                  >
                    <PlusIcon />
                  </Button>
                </div>
              ))}

              {res.isLoading && (
                <div className="flex h-32 w-full items-center justify-center">
                  <LoadingSpinner className="border-primary-500" />
                </div>
              )}
              {drugData?.length === 0 && !res.isLoading && (
                <div className="flex w-full items-center justify-center">
                  <EmptyDataState />
                </div>
              )}
              {searchInput === "" &&
                !res.isLoading &&
                drugData?.length !== 0 && (
                  <div className="flex h-[80%] w-full flex-col items-center justify-center">
                    <SearchGif className="opacity-70" />
                    <p className="text-neutral-400">
                      Cari nama obat untuk menambahkan resep
                    </p>
                  </div>
                )}
            </div>
          </div>
          <div className="basis-[50%]">
            <DrugOrderForm
              form={form}
              onSubmit={handleFormSubmit}
              isLoading={false}
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
